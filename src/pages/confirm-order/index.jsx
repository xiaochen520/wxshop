import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Input, Switch, Picker, Textarea, Button } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import { setOrder, addCar } from "@/store/actions"
import api from "@/api";

import flowerLine from "@/imgs/order/flower-line.png"
import addrIcon from "@/imgs/order/addr-icon.png"

@connect(({ shopCar }) => ({
    shopCar
}), (dispatch) => ({
    setOrder(data) {
        dispatch(setOrder(data))
    },
    addCar(data) {
        dispatch(addCar(data))
    },
}))
class Index extends Component {
    state = {
        addrInfo: null,
        totalMoney: 0
    }

    orderType = 0;
    // onLoad
    componentWillMount() {

    }
    // onShow
    componentDidShow() {
        this.orderType = this.$router.params.type;
        this.getAddr();
        this.calcMoney();
    }
    // onUnload
    componentWillUnmount() {

    }

    //计算总金额
    calcMoney() {
        let shopArr = this.props.shopCar.confirmOrderArr;
        let money = 0;

        shopArr.forEach(e => {
            money += e.buyCounts * e.priceDiscount;
        })

        this.setState({ totalMoney: money });
    }

    // 去地址列表
    goAddr() {
        Taro.$util.gotoPage("/pages/address/index?order=1");
    }

    //取地址
    getAddr() {
        let defaultAddr = Taro.getStorageSync("address");
        if (defaultAddr) {
            this.setState({ addrInfo: defaultAddr });
            return;
        }

        Taro.$http.post(api.addrList).then(res => {
            if (res.code === 200) {
                let addr = res.data.find(e => e.isDefault === 1);
                if (addr) {
                    Taro.setStorage({
                        key: "address",
                        data: addr
                    });
                    this.setState({ addrInfo: addr })
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    //提交订单
    confirmOrder = () => {
        let shopArr = this.props.shopCar.confirmOrderArr;
        let { addrInfo } = this.state;
        let { shopCar, setOrder, addCar } = this.props;

        if (!addrInfo) {
            Taro.showToast({
                title: "请选择收获地址",
                icon: "none"
            })
            return;
        }

        let parms = {
            addressId: addrInfo.id,
            itemSpecIds: shopArr.map(e => e.specId).join(),
            leftMsg: '',
            payMethod: 1
        }

        if (this.orderType == 0) {
            parms.buyCounts = shopArr[0] && shopArr[0].buyCounts;
        }

        let url = this.orderType == 0 ? api.quickCreate : api.createOrder;

        Taro.$http.post(url, parms).then(res => {
            if (res.code === 200) {
                setOrder([]);
                if (this.orderType == 1) {
                    let arr = [];
                    shopCar.shopCarArr.forEach(e => {
                        let index = shopArr.findIndex(son => son.specId == e.specId);
                        if (index < 0) {
                            arr.push(e);
                        }
                    })
                    addCar(arr);
                }
                this.wxPay(res.data);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    // 微信支付
    wxPay(id) {
        let parms = {
            orderId: id
        }

        Taro.$http.get(api.wxPay, parms).then(res => {
            if (res.code === 200) {
                let { timeStamp, nonceStr, signType, packageStr, sign } = res.data;

                let parms = {
                    timeStamp, nonceStr, signType,
                    package: packageStr,
                    paySign: sign,
                    success: res => {
                        console.log(res);
                    },
                    fail: err => {
                        console.log(err);
                    }
                }
                console.log(parms)

                wx.requestPayment(parms);
            }
        });
    }

    render() {
        let { addrInfo, totalMoney } = this.state;
        let { shopCar } = this.props;
        return (
            <View className='confirm'>
                <View className="addr_info">
                    <View onClick={this.goAddr} className="addr_outer flex_middle">
                        <Image scaleToFill className="addr_icon" src={addrIcon}></Image>
                        {
                            addrInfo ? (
                                <View className="flex_1">
                                    <View className="receiver_info">
                                        {addrInfo.receiver + " " + addrInfo.mobile}</View>
                                    <View className="addr_detail">
                                        <View>{addrInfo.province + addrInfo.city + addrInfo.district + addrInfo.detail}</View>
                                    </View>
                                </View>
                            ) : (
                                    <View className="flex_1">
                                        <View className="receiver_info">请选择收获地址</View>
                                    </View>
                                )
                        }

                        <View className="iconfont iconarrow-down"></View>
                    </View>

                    <Image style="width: 100%" src={flowerLine} mode="widthFix"></Image>
                </View>
                <View className="shop_info">
                    {
                        shopCar.confirmOrderArr.map(e => (
                            <View className="s_item flex_middle">
                                <Image className="s_img" aspectFill src={e.itemImgUrl}></Image>
                                <View className="flex_1">
                                    <View className="si_name b">
                                        {e.itemName}
                                    </View>
                                    <View className="si_rule">{e.specName}</View>
                                    <View className="flex_middle">
                                        <View className="si_price flex_1">
                                            <Text>￥</Text>
                                            <Text className="s b">{e.priceDiscount}</Text>
                                        </View>
                                        <View className="si_count">X{e.buyCounts}</View>
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </View>

                <View className="money">
                    <View className="money_item flex_middle">
                        <View className="flex_1 m_label">商品金额</View>
                        <View className="m_total">￥{totalMoney}</View>
                    </View>
                </View>

                <View className="foot_bar flex_middle">
                    <View className="flex_1 fb_static">
                        <Text>合计：</Text>
                        <Text className="s b">{totalMoney}元</Text>
                    </View>
                    <Button onClick={this.confirmOrder} className="save_btn">提交订单</Button>
                </View>
            </View>
        )
    }
}

export default Index

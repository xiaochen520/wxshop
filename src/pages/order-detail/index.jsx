import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import api from "@/api";

import flowerLine from "@/imgs/order/flower-line.png"
import userIcon from "@/imgs/user"


class Index extends Component {
    state = {
        orderInfo: null
    }
    // onLoad
    componentDidMount() {
        this.getOrder();
    }

    getOrder() {
        let orderInfo = null;
        Taro.$http.get(api.orderInfo, { orderId: this.$router.params.id }).then(res => {
            if (res.code === 200) {
                orderInfo = res.data;
                this.setState({ orderInfo });
            }
        });
    }

    // //计算总金额
    // calcMoney() {
    //     let shopArr = this.props.shopCar.confirmOrderArr;
    //     let money = 0;

    //     shopArr.forEach(e => {
    //         money += e.buyCounts * e.priceDiscount;
    //     })

    //     this.setState({ totalMoney: money });
    // }

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
        let parms = {
            addressId: addrInfo.id,
            itemSpecIds: shopArr.map(e => e.specId).join(),
            leftMsg: '',
            payMethod: 1
        }

        Taro.$http.post(api.createOrder, parms).then(res => {
            if (res.code === 200) {
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
        let { totalMoney, orderInfo } = this.state;
        let { shopCar } = this.props;

        if (!orderInfo) return null;
        return (
            <View className='order'>
                {/* <View className="addr_info">
                    {
                        addrInfo ? (
                            <View className="addr_outer flex_middle">
                                <Image scaleToFill className="addr_icon" src={userIcon.addr}></Image>
                                <View className="flex_1">
                                    <View className="receiver_info">
                                        {addrInfo.receiver + " " + addrInfo.mobile}</View>
                                    <View className="addr_detail">
                                        <View>{addrInfo.province + addrInfo.city + addrInfo.district + addrInfo.detail}</View>
                                    </View>
                                </View>
                                <View className="iconfont iconarrow-down"></View>
                            </View>
                        ) : (
                                <View>选择地址</View>
                            )
                    }
                    <Image style="width: 100%" src={flowerLine} mode="widthFix"></Image>
                </View> */}

                <View className="order_menu">
                    <View className="order_menu_item flex_middle">
                        <View className="flex_1">订单编号</View>
                        <View></View>
                    </View>
                    <View className="order_menu_item flex_middle">
                        <View className="flex_1">下单时间</View>
                        <View></View>
                    </View>
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

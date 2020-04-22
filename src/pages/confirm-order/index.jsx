import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Input, Switch, Picker, Textarea, Button } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import api from "@/api";

@connect(({ shopCar }) => ({
    shopCar
}))
class Index extends Component {
    state = {
        addrInfo: null,
        totalMoney: 0
    }
    // onLoad
    componentWillMount() {

    }
    // onShow
    componentDidShow() {
        this.getAddr();
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
        
        this.setState({totalMoney: money});
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
        let parms = {
            addressId: addrInfo.id,
            itemSpecIds: shopArr.map(e => e.specId).join(),
            leftMsg: '',
            payMethod: 1
        }

        Taro.$http.post(api.createOrder, parms).then(res => {
            console.log(res);
            if(res.code === 200) {

            }
        }).catch(err => {

        });
    }

    render() {
        let { addrInfo, totalMoney } = this.state;
        let { shopCar } = this.props;
        return (
            <View className='confirm'>
                <View className="addr_info">
                    {
                        addrInfo ? (
                            <View>
                                <View>
                                    {addrInfo.receiver + " " + addrInfo.mobile}</View>
                                <View>
                                    <View>{addrInfo.province + addrInfo.city + addrInfo.district + addrInfo.detail}</View>
                                    <View className="iconfont iconarrow-down"></View>
                                </View>
                            </View>
                        ) : (
                                <View>选择地址</View>
                            )
                    }
                </View>
                <View className="shop_info">
                    {
                        shopCar.confirmOrderArr.map(e => (
                            <View className="s_item">
                                <Image src={e.itemImgUrl}></Image>
                                <View>
                                    <View>
                                        {e.itemName}
                                    </View>
                                    <View>￥
                                        {e.priceDiscount}
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </View>

                <View className="foot_bar flex_middle">
                    <View className="flex_1">
                        <View>共4件</View>
                        <View>
                            <View>合计：</View>
                            <View>{totalMoney}元</View>
                        </View>
                    </View>
                    <Button onClick={this.confirmOrder} className="save_btn">提交订单</Button>
                </View>
            </View>
        )
    }
}

export default Index

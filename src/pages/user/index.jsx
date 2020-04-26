import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { setToken, setUser } from "@/store/actions"
import './index.scss'

import icon from "@/imgs/user"
import api from "@/api";

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  setToken(data) {
    dispatch(setToken(data))
  },
  setUser(data) {
    dispatch(setUser(data))
  }
}))

class Index extends Component {
  config = {
    navigationBarTitleText: ''
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log(this.props)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  goPage(page) {
    if (!this.props.user.token) {
      Taro.$util.gotoPage("/pages/wx-author/index");
    }
    Taro.$util.gotoPage(page);
  }

  verify = () => {
    let { user } = this.props;

    if (!user.token) {
      this.goPage("/pages/wx-author/index");
    }
  }

  exit = () => {
    Taro.showModal({
      title: "确定退出？",
      content: "退出登录后将无法查看订单，重新登录即可查看"
    }).then(res => {
      if (res.confirm) {
        Taro.removeStorageSync("token");
        Taro.removeStorageSync("userInfo");
        Taro.removeStorageSync("address");
        this.props.setToken("");
        this.props.setUser(null);
      }
    });
  }

  render() {
    let { user } = this.props;
    return (
      <View className='my'>

        <View className='user flex_middle'>
          <Image className='user_head' onClick={this.verify} scaleToFill src={user.userInfo ? user.userInfo.avatarUrl : icon.head} />
          <View className="user_name b" onClick={this.verify}>
            {user.userInfo ? user.userInfo.nickName : "登录"}
          </View>
        </View>

        {/* <View className="flex_middle other_list">
          <View className="flex_1 o_item">
            <View className="oi_num">8</View>
            <View className="oi_label">优惠券</View>
          </View>
          <View className="flex_1 o_item">
            <View className="oi_num">8</View>
            <View className="oi_label">优惠券</View>
          </View>
          <View className="flex_1 o_item">
            <View className="oi_num">8</View>
            <View className="oi_label">优惠券</View>
          </View>
        </View> */}

        <View className='order'>
          <View className="o_head flex_middle">
            <View className="flex_1 b">我的订单</View>
            <View onClick={this.goPage.bind(this, "/pages/order/index")}>查看更多订单</View>
            <View className="iconfont iconarrow-down"></View>
          </View>
          <View className="o_list flex_middle">
            <View className='o_item' onClick={this.goPage.bind(this, "/pages/order/index?type=1")}>
              <Image className='o_icon' src={icon.unpay} />
              <View className='o_text'>待支付</View>
            </View>
            <View className='o_item' onClick={this.goPage.bind(this, "/pages/order/index?type=2")}>
              <Image className='o_icon' src={icon.undelivery} />
              <View className='o_text'>待发货</View>
            </View>
            <View className='o_item' onClick={this.goPage.bind(this, "/pages/order/index?type=3")}>
              <Image className='o_icon' src={icon.unreceive} />
              <View className='o_text'>待收货</View>
            </View>
            <View className='o_item' onClick={this.goPage.bind(this, "/pages/order/index?type=4")}>
              <Image className='o_icon' src={icon.receive} />
              <View className='o_text'>已完成</View>
            </View>
          </View>
        </View>

        <View className='menu'>
          <View className='m_item flex flex_v_c' onClick={this.goPage.bind(this, "/pages/coupon/index")}>
            <Image className='m_icon' scaleToFill src={icon.coupon} />
            <View className='m_text flex_1'>优惠券</View>
            <Text className="iconfont iconarrow-down" />
          </View>
          <View onClick={this.goPage.bind(this, "/pages/address/index")} className='m_item flex flex_v_c'>
            <Image className='m_icon' scaleToFill src={icon.addr} />
            <View className='m_text flex_1'>收货地址</View>
            <Text className="iconfont iconarrow-down" />
          </View>
          <View onClick={this.goPage.bind(this, "/pages/about-us/index")} className='m_item flex flex_v_c'>
            <Image className='m_icon' scaleToFill src={icon.us} />
            <View className='m_text flex_1'>关于我们</View>
            <Text className="iconfont iconarrow-down" />
          </View>
        </View>
        {
          user.token && (
            <View className='exit'>
              <Button className="exit_btn b" onClick={this.exit}>退出登录</Button>
            </View>
          )
        }
      </View >
    )
  }
}

export default Index

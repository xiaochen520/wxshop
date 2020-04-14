import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import './index.scss'

import icon from "@/imgs/user"

export default class Index extends Component {

  config = {
    navigationBarTitleText: ''
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  goPage(page) {
    Taro.$util.gotoPage(page);
  }

  render() {
    return (
      <View className='my'>

        <View className='user flex_middle'>
          <Image className='user_head' scaleToFill src='http://img2.imgtn.bdimg.com/it/u=3074623371,2087844897&fm=26&gp=0.jpg' />
          <View className="user_name b">陈佳迪</View>
        </View>

        <View className="flex_middle other_list">
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
        </View>

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
        </View>
      </View >
    )
  }
}

import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: ''
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  goOrderList() {
    Taro.$util.gotoPage("/pages/order/index");
  }

  goPage(page) {
    Taro.$util.gotoPage(page);
  }

  render() {
    return (
      <View className='my'>

        <View className='user'>
          <View className="user_outer">
            <View className="flex_middle">
              <View>
                <Image className='u_photo' scaleToFill src='http://img2.imgtn.bdimg.com/it/u=3074623371,2087844897&fm=26&gp=0.jpg' />
              </View>
              <View className="flex_1 u_r_content">
                <View className="flex_middle">
                  <View className="name">陈佳迪</View>
                  <View className="type">普通会员</View>
                </View>
                <View>
                  <Button className="btn_account">
                    <Text>账号管理</Text>
                    <Text className="iconfont iconarrow-down" />
                  </Button>
                </View>
              </View>
            </View>
            <View className="flex_middle other_list">
              <View className="flex_1 o_item">
                <View className="num">8</View>
                <View>优惠券</View>
              </View>
              <View className="flex_1 o_item">
                <View className="num">8</View>
                <View>优惠券</View>
              </View>
            </View>
          </View>

        </View>

        <View className='order'>
          <View className="o_head flex_middle">
            <View className="flex_1">我的订单</View>
            <View onClick={this.goOrderList.bind(this)}>查看更多订单</View>
          </View>
          <View className="o_list flex_middle">
            <View className='o_item'>
              <View className='o_text'>待支付</View>
            </View>
            <View className='o_item'>
              <View className='o_text'>代发货</View>
            </View>
            <View className='o_item'>
              <View className='o_text'>待收货</View>
            </View>
            <View className='o_item'>
              <View className='o_text'>已完成</View>
            </View>
          </View>
        </View>

        <View className='menu'>
          <View className='m_item flex flex_v_c' onClick={this.goPage.bind(this, "/pages/coupon/index")}>
            <Image className='m_icon' scaleToFill src='http://img2.imgtn.bdimg.com/it/u=3074623371,2087844897&fm=26&gp=0.jpg' />
            <View className='m_text flex_1'>优惠券</View>
            <Text className="iconfont iconarrow-down" />
          </View>
          <View onClick={this.goPage.bind(this, "/pages/address/index")} className='m_item flex flex_v_c'>
            <Image className='m_icon' scaleToFill src='http://img2.imgtn.bdimg.com/it/u=3074623371,2087844897&fm=26&gp=0.jpg' />
            <View className='m_text flex_1'>收货地址</View>
            <Text className="iconfont iconarrow-down" />
          </View>
        </View>
      </View>
    )
  }
}

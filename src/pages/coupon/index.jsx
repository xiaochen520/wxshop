import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Button, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {

  }

  state = {
    couponList: [
      {
        name: "满500减100",
        type: "全场无门槛卷",
        price: 0.5
      },
      {
        name: "满500减100",
        type: "全场无门槛卷",
        price: 0.5
      },
      {
        name: "满500减100",
        type: "全场无门槛卷",
        price: 0.5
      }
    ]
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let { couponList } = this.state;
    return (
      <View className='coupon'>
        {
          couponList.map(e => (
            <View className="c_item flex_middle">
              <View className="flex_1 c_left tc">
                <View className='cl_name'>特定商品优惠券</View>
                <View className="cl_time">有效期截止2020.06.20</View>
              </View>
              <View className="c_right tc">
                <View className="cr_amount">
                  <Text className="s b">85</Text>
                  <Text>元</Text>
                </View>
                <View className="cr_get">
                  <Text>立即领取</Text>
                  <Text className="iconfont iconarrow-down"></Text>
                </View>
              </View>
            </View>
          ))
        }
      </View>
    )
  }
}

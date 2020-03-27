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
                <View className='c_desc'>
                  <Text className="s b">￥{e.price}</Text>
                  <Text>{e.name}</Text>
                </View>
                <View className="c_type">{e.type}</View>
              </View>
              <View className="c_right tc">
                <View className="c_get_btn">
                  立即领劵
                </View>
                <View className="c_time">
                  2020-01-05-2020-01-05
                </View>
              </View>
            </View>
          ))
        }
      </View>
    )
  }
}

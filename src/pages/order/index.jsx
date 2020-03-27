import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import TabBar from "@/components/common/tab-bar"
import OrderItem from "@/components/order/order-item"
import './index.scss'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  tabBarClick(item) {
    console.log(item)
  }

  render() {
    // let { topicArr } = this.state;
    let list = [
      {
        label: "待支付"
      },

      {
        label: "待发货"
      },

      {
        label: "待收货"
      }
    ]
    return (
      <View className='order flex flex_v'>
        <View>
          <TabBar onChange={this.tabBarClick.bind(this)} current={1} list={list}></TabBar>
        </View>

        <View className="flex_1 order_outer">
          <ScrollView className="order_list">
            <View className="oi_outer">
              <OrderItem></OrderItem>
            </View>
            
            <View className="oi_outer">
              <OrderItem></OrderItem>
            </View>
            <View className="oi_outer">
              <OrderItem></OrderItem>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

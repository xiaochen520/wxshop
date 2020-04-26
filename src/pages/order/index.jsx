import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView, Icon } from '@tarojs/components'

import './index.scss'
import api from "@/api"

import TabBar from "@/components/common/tab-bar"
import OrderItem from "@/components/order/order-item"

export default class Index extends Component {

  state = {

  }

  page = 1;
  pageSize = 10;

  tabList = [
    {
      label: "全部"
    },
    {
      label: "待支付"
    },
    {
      label: "待发货"
    },
    {
      label: "待收货"
    },
    {
      label: "已完成"
    }
  ]

  componentDidMount() {
    this.getOrder();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  tabBarClick(item) {
    console.log(item)
  }

  // 获取订单
  getOrder() {
    let parms = {
      orderStatus: 1,
      page: this.page,
      pageSize: this.pageSize
    }

    Taro.$http.post(api.myOrders, parms).then(res => {
      if(res.code === 200) {

      }
    });
  }

  render() {

    return (
      <View className='order flex flex_v'>
        <View>
          <TabBar onChange={this.tabBarClick.bind(this)} current={this.$router.params.type} list={this.tabList}></TabBar>
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

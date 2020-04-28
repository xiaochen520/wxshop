import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView, Icon } from '@tarojs/components'

import './index.scss'
import api from "@/api"

import TabBar from "@/components/common/tab-bar"
import OrderItem from "@/components/order/order-item"

export default class Index extends Component {

  state = {
    orderArr: []
  }

  page = 1;
  pageSize = 10;
  hasMore = true;

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
  getOrder = () => {
    let { orderArr } = this.state;

    if (!this.hasMore) return;
    let parms = {
      orderStatus: 50,
      page: this.page,
      pageSize: this.pageSize
    }

    Taro.$http.get(api.myOrders, parms).then(res => {
      if (res.code === 200) {
        orderArr = [...orderArr, ...res.data.rows];
        this.setState({ orderArr });
        this.page++;
        if (res.data.rows < this.pageSize) {
          this.hasMore = false;
        }
      }
    });
  }

  render() {
    let { orderArr } = this.state;
    return (
      <View className='order flex flex_v'>
        <View>
          <TabBar onChange={this.tabBarClick.bind(this)} current={this.$router.params.type} list={this.tabList}></TabBar>
        </View>

        <View className="flex_1 flex order_outer">
          <ScrollView onScrollToLower={this.getOrder} scrollY lowerThreshold={50} className="order_list">
            <View className="order_inner">
            {
              orderArr.map(e => (
                <View className="oi_outer">
                  <OrderItem data={e}></OrderItem>
                </View>
              ))
            }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView, Icon } from '@tarojs/components'

import './index.scss'
import api from "@/api"
import { orderStatus } from "@/util/constant"

import TabBar from "@/components/common/tab-bar"
import OrderItem from "@/components/order/order-item"
import Loading from "@/components/common/loading"
import LoadTip from "@/components/common/load-tip"
import NoData from '@/components/common/no-data';

export default class Index extends Component {

  state = {
    orderArr: [],
    showLoading: true,
    currentTab: 0
  }

  page = 1;
  pageSize = 10;
  hasMore = true;
  orderStatus = 0;

  tabList = [
    {
      label: "全部",
      status: 0
    },
    {
      label: "待支付",
      status: 10
    },
    {
      label: "待发货",
      status: 20
    },
    {
      label: "待收货",
      status: 30
    },
    {
      label: "已完成",
      status: 40
    }
  ]

  componentDidMount() {
    this.orderStatus = this.$router.params.status;
    let currentTab = orderStatus[this.orderStatus].id;
    this.setState({currentTab});
    this.getOrder();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  tabBarClick(item) {
    if(this.orderStatus == item.status) return;
    this.orderStatus = item.status;
    this.hasMore = true;
    this.page = 1;
    this.setState({orderArr: [], showLoading: true}, () => {
      this.getOrder();
    })
  }

  // 获取订单
  getOrder = () => {
    let { orderArr } = this.state;

    if (!this.hasMore) return;
    let parms = {
      orderStatus: this.orderStatus,
      page: this.page,
      pageSize: this.pageSize
    }

    Taro.$http.get(api.myOrders, parms).then(res => {
      this.setState({ showLoading: false });
      if (res.code === 200) {
        orderArr = [...orderArr, ...res.data.rows];
        this.setState({ orderArr });
        this.page++;
        if (res.data.rows.length < this.pageSize) {
          this.hasMore = false;
        }
      }
    });
  }

  render() {
    let { orderArr, showLoading, currentTab } = this.state;
    
    
    return (
      <View className='order flex flex_v'>
        <View>
          <TabBar onChange={this.tabBarClick.bind(this)} current={currentTab} list={this.tabList}></TabBar>
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
            {(!this.hasMore && orderArr.length) && <LoadTip></LoadTip>}
            </View>
            {
              !orderArr.length && <NoData></NoData>
            }

            <Loading show={showLoading}></Loading>
          </ScrollView>
        </View>
      </View>
    )
  }
}

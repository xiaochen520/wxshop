import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Button, Text } from '@tarojs/components'
import './index.scss'
import api from "@/api";
import { connect } from '@tarojs/redux'

import AddrItem from "@/components/address/addr-item"

@connect(({ user }) => ({
  user
}))
export default class Index extends Component {

  config = {

  }

  state = {

  }

  componentWillMount() { }

  componentDidMount() {
    this.getAddr();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getAddr() {
    Taro.$http.post(api.addrList, {}, {header: {Authorization: this.props.user.token}}).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  goAddressAdd = () => {
    Taro.$util.gotoPage("/pages/add-address/index");
  }

  render() {

    return (
      <View className='addr'>
        <View className="addr_inner">
          <AddrItem></AddrItem>
        </View>
        <View className="addr_inner">
          <AddrItem></AddrItem>
        </View>
        <View className="addr_inner">
          <AddrItem></AddrItem>
        </View>
        <View className="addr_inner">
          <AddrItem></AddrItem>
        </View>
        <View className="addr_inner">
          <AddrItem></AddrItem>
        </View>
        <View className="addr_inner">
          <AddrItem></AddrItem>
        </View>

        <View className="foot_btn" onClick={this.goAddressAdd}>添加地址</View>
      </View>
    )
  }
}

import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Button, Text } from '@tarojs/components'
import './index.scss'

import AddrItem from "@/components/address/addr-item"

export default class Index extends Component {

  config = {

  }

  state = {
    
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

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

          <View className="foot_btn" onClick={Taro.$util.gotoPage("/pages/add-address/index")}>添加地址</View>
      </View>
    )
  }
}

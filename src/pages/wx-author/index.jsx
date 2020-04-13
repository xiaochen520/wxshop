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

  getUserInfo = res => {
    let data = res.detail;
    if(data.errMsg === "getUserInfo:ok") {
      Taro.$util.gotoPage("/pages/author-login/index");
    }
  }

  render() {
    
    return (
      <View className='login'>
          <Button openType="getUserInfo" onGetUserInfo={this.getUserInfo}>微信授权</Button>
      </View>
    )
  }
}

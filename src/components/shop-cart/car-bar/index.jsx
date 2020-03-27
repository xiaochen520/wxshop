import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import "../../../font/iconfont.css";
import "../../../style/common.scss";

export default class Index extends Component {

  config = {

  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='car_bar flex flex_v_c'>
        <View className='iconfont iconpass_Flat_icons'></View>
        <View>全选</View>
        <View className='flex_1 tr'>合计</View>
        <View className='flex price flex_v_b'>
          <View>￥</View>
          <View className='s'>9999</View>
        </View>
        <View className='btn tc'>结算(5)</View>
      </View>
    )
  }
}

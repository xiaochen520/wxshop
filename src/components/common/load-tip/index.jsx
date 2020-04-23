import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import "../../../style/common.scss";

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {

    return (
      <View className='tip flex_middle flex_h_c'>
        <View className="line line_left"></View>
        <View className="tip_text">Hi，您已看完了</View>
        <View className="line line_right"></View>
      </View>
    )
  }
}

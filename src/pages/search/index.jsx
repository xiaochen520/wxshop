import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
  }

  componentWillMount() { }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='search'>
        <View className="nav flex_middle">
          <View className="input_box flex_1 flex_middle">
            <Text className="iconfont iconpass_Line_icons"></Text>
            <Input className="flex_1" placeholder="搜索单品"></Input>
          </View>
          <View className="cancel_btn">取消</View>
        </View>
        <View className="topic">
          <View className="t_head flex_middle">
            <View className="flex_1 title">历史搜索</View>
            <Text className="iconfont iconpass_Line_icons"></Text>
          </View>
          <View className="t_c_list flex_list">
            <View className="t_c_item flex_item">沙发</View>
            <View className="t_c_item flex_item">沙发aaa</View>
            <View className="t_c_item flex_item">沙发fdg</View>
            <View className="t_c_item flex_item">沙发dgfgf</View>
            <View className="t_c_item flex_item">沙发gfdg</View>
          </View>
        </View>
      </View>
    )
  }
}

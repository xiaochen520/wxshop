import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import "../../../font/iconfont.css";
import "../../../style/common.scss";
import './index.scss'


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
      <View className='addr'>
        <Text className="close iconfont iconadd"></Text>
        <View className="addr_head">
          <Text className="name">陈佳迪</Text>
          <Text>15226085502</Text>
        </View>
        <View className="addr_desc b">河南省郑州市金水区金城时代广场7好扣</View>
        <View className="addr_foot flex_middle">
          <View className="flex_1 a_f_left">
            <Text className="iconfont iconadd"></Text>
            <Text>设为默认</Text>
          </View>
          <View className="a_f_right">
            <Text className="a_f_right-btn">编辑</Text>
            <Text className="a_f_right-btn">置顶</Text>
          </View>
        </View>
      </View>
    )
  }
}

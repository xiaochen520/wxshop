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
    let { data, onSetDefault, onDelete } = this.props;
    return (
      <View className='addr'>
        <Text onClick={ onDelete } className="close iconfont iconsearchclose-"></Text>
        <View className="addr_head">
          <Text className="name">
            {data.receiver}
          </Text>
          <Text>
            {data.mobile}
          </Text>
        </View>
        <View className="addr_desc b">
          {data.province + data.city + data.district + data.detail}
        </View>
        <View className="addr_foot flex_middle">
          <View onClick={ onSetDefault } className="flex_1 a_f_left">
            <Text className={data.isDefault === 1 ? "iconfont iconpass_Flat_icons" : "iconfont iconpass_Line_icons"}></Text>
            <Text>设为默认</Text>
          </View>
          <View className="a_f_right">
            <Text className="a_f_right-btn">编辑</Text>
          </View>
        </View>
      </View>
    )
  }
}

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

  clickDefault = e => {
    e.stopPropagation();
    this.onSetDefault();
  }

  clickAddr = () => {
    this.props.onAddrTap();
  }
  

  render() {
    let { data, onDelete } = this.props;
    return (
      <View onClick={this.clickAddr} className='addr'>
        
        <View className="addr_desc flex_middle">
          <View className="flex_1">{data.province + data.city + data.district + data.detail}</View>
          <Text onClick={ onDelete } className="close iconfont iconsearchclose-"></Text>
        </View>
        <View className="addr_head">
          <Text className="name">
            {data.receiver + " " + data.mobile}
          </Text>
        </View>
        <View className="addr_foot flex_middle">
          <View onClick={ this.clickDefault } className="flex_1 flex_middle a_f_left">
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

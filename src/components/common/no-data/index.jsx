import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let { title, children } = this.props;

    return (
      <View className='shop_item'>
        <Image></Image>
        <View>{title}</View>
        <View>{children}</View>
      </View>
    )
  }
}

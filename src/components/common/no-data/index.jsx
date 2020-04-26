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
    let { title, children, img } = this.props;
    return (
      <View className='shop_item'>
        <Image mode="widthFix" className="img" src={img}></Image>
        <View className="other">{children}</View>
        <View className="desc">{title}</View>
      </View>
    )
  }
}

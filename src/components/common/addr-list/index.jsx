import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import "../../../style/mixin.scss";

export default class Index extends Component {

  static defaultProps = {
    show: true
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let { show } = this.props;

    return show ?
      (
        <View className='loading'>
          <View class="spin">
            <View class="bounce bounce1"></View>
            <View class="bounce bounce2"></View>
          </View>
        </View>
      )
      :
      null
  }
}

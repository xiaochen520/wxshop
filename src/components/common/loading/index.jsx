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
          <View className="spin">
							<View className="s_item"></View>
							<View className="s_item"></View>
							<View className="s_item"></View>
							<View className="s_item"></View>
							<View className="s_item"></View>
							<View className="s_item"></View>
							<View className="s_item"></View>
							<View className="s_item"></View>
						</View>
        </View>
      )
      :
      null
  }
}

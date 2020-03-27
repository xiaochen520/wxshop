import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import "../../../font/iconfont.css";
import "../../../style/common.scss";

export default class Index extends Component {

  config = {

  }

  static defaultProps = {
    theme: '#5482F5'
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let { theme } = this.props;

    const borderStyle = {
      borderColor: theme
    };

    return (
      <View style={borderStyle} className='num_handle flex flex_v_c'>
        <View style={{color: theme}} className='iconfont iconremove'></View>
        <View className='num'>0</View>
        <View style={{color: theme}} className='iconfont iconadd'></View>
      </View>
    )
  }
}

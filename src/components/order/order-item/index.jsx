import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import "../../../style/common.scss";

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let { data } = this.props;
    return (
      <View className='order_item'>
        <View className="o_head flex_middle">
    <View className="oh_num flex_1">订单编号： {data.orderId}</View>
          <View className="oh_status">待发货</View>
        </View>
        <View className="o_content flex_middle">
          <Image className="oc_pic" aspectFill src="http://img4.imgtn.bdimg.com/it/u=1383098442,3460005632&fm=26&gp=0.jpg"></Image>
          <View className="oc_aside flex_1">
            <View className="oc_name">商品名称</View>
            <View className="oc_desc">描述</View>
          </View>
        </View>
        <View className="o_foot flex_middle">
          <View className="flex_1 tr">共计1件商品，实际支付</View>
          <View className="of_pay">￥0.2</View>
        </View>
      </View>
    )
  }
}

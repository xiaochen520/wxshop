import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import "../../../font/iconfont.css";
import "../../../style/common.scss";

export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  goGoodDetail(id) {
    Taro.$util.gotoPage(`/pages/good-detail/index?id=${id}`);
  }

  render() {
    let { data } = this.props;

    return (
      <View onClick={this.goGoodDetail.bind(this, data.itemId)} className='shop_item'>
        <Image className='t2_img' mode='widthFix' src={data.imgUrl} />
        <View className='t2_item_box'>
          <View className='t2_name'>{data.itemName}</View>
          <View className='t2_price flex flex_v_c'>
            <View className='price_symbol'>￥</View>
            <View className='price_num'>{data.price}</View>
          </View>
          <View className='t2_desc'>{"已销" + data.sellCounts + "件"}</View>
        </View>
      </View>
    )
  }
}

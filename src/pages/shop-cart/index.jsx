import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import classNames from 'classnames'

import NumHandle from '@/components/shop-cart/num-handle/index.jsx';
import NoData from '@/components/common/no-data';

@connect(({ shopCar, user }) => ({
  shopCar, user
}))
export default class Index extends Component {

  config = {

  }

  state = {
    isSelectAll: false
  }

  hasClickTap = false

  componentWillMount() { }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() {
    this.hasClickTap = false;
  }

  componentDidHide() { }

  onTabItemTap(parms) {

    if (!this.hasClickTap) {
      this.hasClickTap = true;
      if (Taro.getStorageSync("token")) {
        this.setState({ isLogin: true });
      } else {
        this.setState({ isLogin: false });
      }
    }

  }

  render() {
    let { user, shopCar } = this.props;
    let { isSelectAll } = this.state;
    console.log(shopCar.shopCarArr)

    let content = user.token && shopCar.shopCarArr.length ? (
      <View className='shop_cart'>
        <View>
          <View className='s_list'>
            {
              shopCar.shopCarArr.map(e => (
                <View className='s_item flex flex_v_c'>
                  <View className='iconfont iconpass_Line_icons'></View>
                  <View className='flex flex_1'>
                    <Image className='s_photo' mode='aspectFit' src={e.itemImgUrl} />
                    <View className='flex_1'>
                      <View className='s_name'>
                        {e.itemName}
                      </View>
                      <View className='s_label'>
                        {e.specName}
                      </View>
                      <View className='flex'>
                        <View className='s_price flex flex_v_c flex_1'>
                          <View>￥</View>
                          <View className='s'>
                            {e.priceDiscount}
                          </View>
                        </View>
                        <NumHandle count={e.buyCounts} className='flex_1'></NumHandle>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            }
          </View>
          <View className='car_bar flex flex_v_c'>
            <View className={classNames("iconfont", isSelectAll ? "iconpass_Flat_icons" : "iconpass_Line_icons")}></View>
            <View>全选</View>
            <View className='flex_1 tr'>合计</View>
            <View className='flex price flex_v_b'>
              <View>￥</View>
              <View className='s'>9999</View>
            </View>
            <View className='btn tc'>结算(5)</View>
          </View>
        </View>
      </View>
    ) : (
        <NoData title="aaaa"></NoData>
      )
    return content
  }
}

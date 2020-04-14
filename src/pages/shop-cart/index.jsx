import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

import NumHandle from '@/components/shop-cart/num-handle/index.jsx';
import CarBar from '@/components/shop-cart/car-bar';
import NoData from '@/components/common/no-data';

export default class Index extends Component {

  config = {

  }

  state = {
    isLogin: false
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
    let { isLogin } = this.state;
    return (
      <View className='shop_cart'>
        {
          isLogin ?
            (
              <View>
                <View className='s_list'>
                  <View className='s_item flex flex_v_c'>
                    <View className='iconfont iconpass_Line_icons'></View>
                    <View className='flex flex_1'>
                      <Image className='s_photo' mode='aspectFit' src='http://img3.imgtn.bdimg.com/it/u=378824344,1185609431&fm=26&gp=0.jpg' />
                      <View className='flex_1'>
                        <View className='s_name'>大苹果</View>
                        <View className='s_label'>水果</View>
                        <View className='flex'>
                          <View className='s_price flex flex_v_c flex_1'>
                            <View>￥</View>
                            <View className='s'>20</View>
                          </View>
                          <NumHandle className='flex_1'></NumHandle>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className='s_item flex flex_v_c'>
                    <View className='iconfont iconpass_Flat_icons'></View>
                    <View className='flex flex_1'>
                      <Image className='s_photo' mode='aspectFit' src='http://img3.imgtn.bdimg.com/it/u=378824344,1185609431&fm=26&gp=0.jpg' />
                      <View className='flex_1'>
                        <View className='s_name'>大苹果</View>
                        <View className='s_label'>水果</View>
                        <View className='flex'>
                          <View className='s_price flex flex_v_c flex_1'>
                            <View>￥</View>
                            <View className='s'>20</View>
                          </View>
                          <NumHandle className='flex_1'></NumHandle>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View className='foot'>
                  <CarBar></CarBar>
                </View>
              </View>
            ) : (
              <NoData title="aaaa"></NoData>
            )
        }
      </View>
    )
  }
}

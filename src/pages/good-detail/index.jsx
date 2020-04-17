import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Button, Text } from '@tarojs/components'
import './index.scss'
import NumHandle from '@/components/shop-cart/num-handle';
import GoodModal from '@/components/good-detail/good-modal';
import Loading from "@/components/common/loading"

import api from "@/api"

export default class Index extends Component {

  config = {

  }

  state = {
    isShowGoodModal: false,
    showLoading: true,
    bannerArr: [],
    shopInfo: null,
    shopSpecArr: []
  }

  componentDidMount() {
    this.setState({ showLoading: true });
    this.getGoodInfo();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  //获取详情
  getGoodInfo() {
    let bannerArr = [],
      shopInfo = null,
      shopSpecArr = [];
    Taro.$http.get(api.goodInfo + this.$router.params.id).then(res => {
      if (res.code === 200) {
        bannerArr = res.data.itemImgs;
        shopInfo = res.data.item;
        shopSpecArr = res.data.itemSpecs;

        shopSpecArr.sort((a, b) => (a.priceNormal - b.priceNormal));
        shopInfo.price = shopSpecArr[0].priceDiscount;
        shopInfo.originPrice = shopSpecArr[0].priceNormal;
      }

      this.setState({
        bannerArr, shopInfo, shopSpecArr,
        showLoading: false
      });
    });
  }

  // 预览图片
  previewPic() {
    Taro.previewImage({
      urls: ["http://img4.imgtn.bdimg.com/it/u=1383098442,3460005632&fm=26&gp=0.jpg", "http://img4.imgtn.bdimg.com/it/u=1383098442,3460005632&fm=26&gp=0.jpg"]
    })
  }

  showGoodModal() {
    this.setState({
      isShowGoodModal: true
    })
  }

  closeGoodModal() {
    this.setState({
      isShowGoodModal: false
    })
  }

  render() {
    let { isShowGoodModal, bannerArr, shopInfo, showLoading } = this.state;

    let content = showLoading ? (
      < Loading />
    ) : (
        <View className='good_detail'>
          <Swiper
            indicatorColor='#666'
            indicatorActiveColor='#ED5353'
            indicatorDots
            className='swipper'
          >
            {
              bannerArr.map(e => (
                <SwiperItem key={e.id}>
                  <Image onClick={this.previewPic} className='s_img' mode='aspectFill' src={e.url} />
                </SwiperItem>
              ))
            }

          </Swiper>

          <View className='good_desc flex_middle'>
            <View className='flex_1 gd_left'>
              <View className='g_name'>
                {shopInfo.itemName}
              </View>
              {/* <View className='g_desc'>大苹果描述</View> */}
              <View className='g_price'>
                <Text>￥</Text>
                <Text className='s'>
                  {shopInfo.price}
                </Text>
                <Text className='origin_price'>
                  ￥{shopInfo.originPrice}
                </Text>
              </View>
            </View>

            <View className="gd_right b iconfont iconArtboardCopy"></View>

          </View>

          {/* 商品规格 */}
          <View className='good_standard'>
            <View onClick={this.showGoodModal.bind(this)} className='gs_item flex flex_v_c'>
              <View className='flex_1'>规格选择</View>
              <View className='gs_style'>已选择：至尊款（超超超VIP）</View>
              <View className='iconfont iconarrow-down'></View>
            </View>

            {/* <View className='gs_item flex'>
              <View className='gs_item_label'>服务</View>
              <View className='flex_1 flex_middle'>
                <View className='gs_radio_list flex_1 flex_list'>
                  <View className='flex_item flex flex_v_c gs_r_item'>
                    <View className='iconfont iconradio-unchecked'></View>
                    <View>7天无理由退换</View>
                  </View>
                  <View className='flex_item flex flex_v_c gs_r_item'>
                    <View className='iconfont iconradio-unchecked'></View>
                    <View>7天无理由退换</View>
                  </View>
                  <View className='flex_item flex flex_v_c gs_r_item'>
                    <View className='iconfont iconradio-unchecked'></View>
                    <View>7天无理由退换</View>
                  </View>
                  <View className='flex_item flex flex_v_c gs_r_item'>
                    <View className='iconfont iconradio-unchecked'></View>
                    <View>7天无理由退换</View>
                  </View>
                </View>
                <View className='iconfont iconarrow-down'></View>
              </View>
            </View> */}
          </View>

          {/* 商品评价 */}
          <View className='good_eval'>
            <View className='ge_head flex flex_v_c'>
              <View className='flex_1'>用户评价（25万+）</View>
              <View>查看全部</View>
              <View className='iconfont iconarrow-down'></View>
            </View>
            <View className='ge_item'>
              <View className='flex flex_v_c'>
                <Image mode='aspectFill' src='http://img1.imgtn.bdimg.com/it/u=2034740944,4251903193&fm=26&gp=0.jpg' className='ge_i_photo'></Image>
                <View className='ge_i_name'>陈佳迪</View>
              </View>
              <View className='ge_i_desc'>尊贵奢华，是我此生不换的产品~</View>
              <View className='ge_i_time'>2020-01-15 22:59:59 陈佳迪</View>
            </View>
          </View>

          {/* 商品描述 */}
          <View className='good_info'>
            <View className='gi_head'>商品参数</View>
            <View className='gi_desc_item flex'>
              <View className='gi_desc_label'>品牌</View>
              <View>劳力士</View>
            </View>
            <View className='gi_desc_item flex'>
              <View className='gi_desc_label'>名称</View>
              <View>劳力士</View>
            </View>
            <View className='gi_desc_item flex'>
              <View className='gi_desc_label'>规格</View>
              <View>劳力士</View>
            </View>
          </View>

          <GoodModal onClose={this.closeGoodModal.bind(this)} isOpen={isShowGoodModal}></GoodModal>
        </View>
      )

    return content;
  }
}

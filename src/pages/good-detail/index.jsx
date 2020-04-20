import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Text } from '@tarojs/components'
import './index.scss'
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
    shopSpecArr: [],
    goodModalType: "",
    goodModalDefaultVal: {
      id: 0,
      url: "",
      name: "",
      price: 0,
      originPrice: 0
    }
  }

  componentDidMount() {
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
        shopSpecArr = res.data.itemSpecInfo;

        shopSpecArr[0].itemSpecs.sort((a, b) => (a.priceNormal - b.priceNormal));
        shopInfo.price = shopSpecArr[0].itemSpecs[0].priceDiscount;
        shopInfo.originPrice = shopSpecArr[0].itemSpecs[0].priceNormal;
      }

      this.setState({
        bannerArr, shopInfo, shopSpecArr,
        showLoading: false,
        goodModalDefaultVal: {
          id: shopInfo.id,
          url: bannerArr[0].url,
          name: shopInfo.itemName,
          price: shopInfo.price,
          originPrice: shopInfo.originPrice
        }
      });
    });
  }

  // 预览图片
  previewPic() {
    Taro.previewImage({
      urls: ["http://img4.imgtn.bdimg.com/it/u=1383098442,3460005632&fm=26&gp=0.jpg", "http://img4.imgtn.bdimg.com/it/u=1383098442,3460005632&fm=26&gp=0.jpg"]
    })
  }

  showGoodModal(type = 1) {
    this.setState({
      isShowGoodModal: true,
      goodModalType: type
    })
  }

  closeGoodModal() {
    this.setState({
      isShowGoodModal: false
    })
  }

  render() {
    let { isShowGoodModal, bannerArr, shopInfo, showLoading, shopSpecArr, goodModalType, goodModalDefaultVal } = this.state;

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
              <View className='gs_style'>请选择商品规格</View>
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
          {/* <View className='good_eval'>
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
          </View> */}

          {/* 商品描述 */}
          <View className='good_info'>
            <View className='gi_head'>商品详情</View>

            <RichText nodes={shopInfo.content} />
          </View>

          {/* 底部操作栏 */}
          <View className="bottom_bar flex_middle">
            <View className="aside_m flex_1">
              <View className="iconfont iconhome_n"></View>
              <View>首页</View>
            </View>
            <View className="aside_m flex_1">
              <View className="iconfont iconshop_car"></View>
              <View>购物车</View>
            </View>
            <View className="flex car_btn">
              <View onClick={this.showGoodModal.bind(this, 0)} className="flex_1 car_btn_item car_btn_car">加入购物车</View>
              <View className="flex_1 car_btn_item">立即购买</View>
            </View>
          </View>

          <GoodModal defaultVal={goodModalDefaultVal} type={goodModalType} data={shopSpecArr} onClose={this.closeGoodModal.bind(this)} isOpen={isShowGoodModal}></GoodModal>
        </View>
      )

    return content;
  }
}

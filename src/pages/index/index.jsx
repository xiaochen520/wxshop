import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView, Text } from '@tarojs/components'
import './index.scss'

import api from "@/api";
import { connect } from '@tarojs/redux'
import WaterFall from "@/components/common/water-fall"
import Loading from "@/components/common/loading"
import LoadTip from "@/components/common/load-tip"

@connect(({ shopCar }) => ({
  shopCar
}))
export default class Index extends Component {

  config = {

  }

  state = {
    topicArr: [],
    bannerArr: [],
    hotCateArr: [],
    showLoading: true
  }

  page = 1
  pageSize = 10
  hasMore = true

  componentDidMount() {
    this.getData();
  }

  componentDidShow() { 
    // 更新购物车数量
    if(this.props.shopCar.shopCarArr.length) {
      wx.setTabBarBadge({
        index: 2,
        text: this.props.shopCar.shopCarArr.length + ""
      });
    }
  }

  componentDidHide() { }

  //获取所有数据
  getData() {
    let { bannerArr, topicArr, hotCateArr } = this.state;
    let reqArr = [
      Taro.$http.get(api.carousel),
      Taro.$http.get(api.hotCategory),
      Taro.$http.get(api.recommends, { page: this.page, pageSize: this.pageSize })
    ];
    Taro.$http.all(reqArr).then(([carousel, cate, recommends]) => {
      bannerArr = carousel.data;
      hotCateArr = cate.data;
      topicArr = recommends.data.rows;
      this.page++;
      this.setState({ bannerArr, topicArr, hotCateArr, showLoading: false });
      if(topicArr.length < this.pageSize) {
        this.hasMore = false;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  //下拉获取热门商品
  getRecommends = () => {
    let { topicArr } = this.state;
    if(!this.hasMore) {
      return;
    }
    Taro.$http.get(api.recommends, { page: this.page, pageSize: this.pageSize }).then(res => {
      if (res.code == 200) {
        this.page++;
        if(res.data.rows.length < this.pageSize) {
          this.hasMore = false;
        }
        this.setState({
          topicArr: [...res.data.rows, ...topicArr]
        });
      }
    });
  }

  goPage(page) {
    Taro.$util.gotoPage(page);
  }

  render() {
    let { topicArr, showLoading, hotCateArr } = this.state;

    let content = showLoading ? (
      < Loading />
    ) : (
        <ScrollView scroll-anchoring onScrollToLower={this.getRecommends} lowerThreshold="50" scrollY className='index'>
          <Swiper
            indicatorColor='#666'
            indicatorActiveColor='#333'
            indicatorDots
            className='swipper'
          >
            {
              bannerArr.map(e => {
                return (
                  <SwiperItem key={e.id}>
                    <Image onClick={this.goPage.bind(this, "/pages/good-detail/index?id=" + e.targetId)} className='s_img' mode='widthFix' src={e.imageUrl} />
                  </SwiperItem>
                )
              })
            }

          </Swiper>

          <View className='nav'>
            <View className='flex_list nav_list'>
              {
                hotCateArr.map(e => (
                  <View key={e.id} className='nav_item flex_item' onClick={this.goPage.bind(this, "/pages/shop-list/index?cateName=" + e.name + "&cateId=" + e.id)}>
                    <Image className='nav_icon' mode='aspectFill' src={e.catImage} />
                    <View className='nav_name'>{e.name}</View>
                  </View>
                ))
              }
            </View>
          </View>

          {/* <View className='model'>
        <Image onClick={this.goPage.bind(this, "/pages/coupon/index")} className='m_img' mode='widthFix' src='http://img3.imgtn.bdimg.com/it/u=3687769604,3837233009&fm=26&gp=0.jpg' />
      </View> */}

          {/* <View className='topic topic1'>
        <View className='t_title_outer'>
          <View className='t_title'>每周上新</View>
        </View>
        <ScrollView className='t_scroll' scroll-x>
          <View onClick={this.goPage.bind(this, "/pages/good-detail/index")} className='flex t_scroll_outer'>
            <View className='t_s_item'>
              <Image className='t_s_item_img' mode='aspectFill' src='http://img4.imgtn.bdimg.com/it/u=1383098442,3460005632&fm=26&gp=0.jpg' />
              <View className='t_s_item_name'>商品名称</View>
            </View>
          </View>
        </ScrollView>
      </View> */}

          <View className='topic topic2'>
            <View className='t_title_outer'>
              <Text className='t_title'>为你推荐</Text>
              <Text className="t_title_sub">Recommend</Text>
            </View>
            <View className='t2_list flex_list'>
              <WaterFall gutter="15" list={topicArr}></WaterFall>
            </View>
            {
              !this.hasMore && <LoadTip></LoadTip>
            }
          </View>
        </ScrollView>
      )

    return content;
  }
}

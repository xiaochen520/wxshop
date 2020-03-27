import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import './index.scss'

import api from "@/api";

import WaterFall from "@/components/common/water-fall"
import Loading from "@/components/common/loading"

export default class Index extends Component {

  config = {

  }

  state = {
    topicArr: [],
    bannerArr: [],
    showLoad: true
  }

  topicPage = 1
  topicPageSize = 20

  componentDidMount() {
    this.getData();
  }

  componentDidShow() { }

  componentDidHide() { }

  onReachBottom() {
    this.getRecommends();
  }

  //获取所有数据
  getData() {
    let { showLoad, bannerArr, topicArr } = this.state;
    let reqArr = [
      Taro.$http.get(api.carousel),
      Taro.$http.get(api.recommends, { page: this.topicPage, pageSize: this.topicPageSize })
    ];
    Taro.$http.all(reqArr).then(res => {
      bannerArr = res[0].data;
      topicArr = res[1].data.rows;
      this.topicPage++;
      this.setState({ bannerArr, topicArr, showLoad: false });
    }).catch(err => {
      console.log(err);
    });
  }

  //下拉获取热门商品
  getRecommends() {
    Taro.$http.get(api.recommends, { page: this.topicPage, pageSize: this.topicPageSize }).then(res => {
      if(res.code == 200) {
        this.topicPage++;
        this.setState({
          topicArr: res.data.rows
        });
      }
    });
  }

  goPage(page) {
    Taro.$util.gotoPage(page);
  }

  render() {
    let { topicArr, showLoad } = this.state;
    console.log(topicArr)
    return (
      <ScrollView scrollY className='index'>
        <Swiper
          indicatorColor='#666'
          indicatorActiveColor='#333'
          indicatorDots
          className='swipper'
        >
          {
            bannerArr.map(e => {
              return (
                <SwiperItem>
                  <Image onClick={this.goPage.bind(this, "/pages/good-detail/index")} className='s_img' mode='widthFix' src={e.imageUrl} />
                </SwiperItem>
              )
            })
          }

        </Swiper>

        {/* <View className='nav'>
          <View className='flex nav_list'>
            <View className='nav_item' onClick={this.goPage.bind(this, "/pages/shop-list/index")}>
              <Image className='nav_icon' mode='aspectFill' src='http://img5.imgtn.bdimg.com/it/u=3302417983,3672424730&fm=26&gp=0.jpg' />
              <View className='nav_name'>箱包</View>
            </View>
            <View className='nav_item' onClick={this.goPage.bind(this, "/pages/shop-list/index")}>
              <Image className='nav_icon' mode='aspectFill' src='http://img0.imgtn.bdimg.com/it/u=1550589518,1427910466&fm=26&gp=0.jpg' />
              <View className='nav_name'>箱包</View>
            </View>
            <View className='nav_item' onClick={this.goPage.bind(this, "/pages/shop-list/index")}>
              <Image className='nav_icon' mode='aspectFill' src='http://img5.imgtn.bdimg.com/it/u=3794497864,3256030445&fm=26&gp=0.jpg' />
              <View className='nav_name'>箱包</View>
            </View>
            <View className='nav_item' onClick={this.goPage.bind(this, "/pages/shop-list/index")}>
              <Image className='nav_icon' mode='aspectFill' src='http://img3.imgtn.bdimg.com/it/u=378824344,1185609431&fm=26&gp=0.jpg' />
              <View className='nav_name'>箱包</View>
            </View>
          </View>
        </View> */}

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
            <View className='t_title'>为你推荐</View>
          </View>
          <View className='t2_list flex_list'>
            <WaterFall gutter="15" list={topicArr}></WaterFall>
          </View>
        </View>

        {/* loading */}
        {/* <Loading show={showLoad}></Loading> */}
      </ScrollView>
    )
  }
}

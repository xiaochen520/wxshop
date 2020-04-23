import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import './index.scss'
import WaterFall from "@/components/common/water-fall"
import Loading from "@/components/common/loading"
import LoadTip from "@/components/common/load-tip"
import api from "@/api";
export default class Index extends Component {
  
  state = {
    shopArr: [],
    cateName: "",
    cateId: "",
    showLoading: true
  }

  page = 1;
  pageSize = 10;
  hasMore = true;

  componentDidMount() {
    let { cateName, cateId } = this.$router.params;
    Taro.setNavigationBarTitle({
      title: cateName
    });

    this.getGoods(cateId);
  }

  componentWillUnmount() { }

  componentDidShow() { 
  }

  componentDidHide() { }

  //获取商品
  getGoods(catId) {
    let { shopArr } = this.state;
    let parms = {
      catId: catId,
      catType: 0,	//分类类型:0代表根分类,1代表其他分类	query	true	
      page: this.page,
      pageSize: this.pageSize
    }

    Taro.$http.get(api.searchByCate, parms).then(res => {
      if(res.code === 200) {
        shopArr = res.data.rows;

        if(shopArr.length < this.pageSize) {
          this.hasMore = false;
        }
      }
      this.setState({shopArr, showLoading: false});
    });
  }

  tabBarClick(item) {
    console.log(item)
  }

  inputChange = e => {
    this.setState({cateName: e.detail.value});
  }

  render() {
    let { shopArr, showLoading } = this.state;

    let content = showLoading ? (
      <Loading></Loading>
    ) : (
      <View className='shop_list'>
        <WaterFall gutter="15" list={shopArr}></WaterFall>
        {
          !this.hasMore && <LoadTip></LoadTip>
        }
      </View>
    );

    return content;
  }
}

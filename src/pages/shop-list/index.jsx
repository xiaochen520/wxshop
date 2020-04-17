import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import './index.scss'
import WaterFall from "@/components/common/water-fall"

import api from "@/api";
export default class Index extends Component {
  
  state = {
    shopArr: [],
    cateName: "",
    cateId: ""
  };

  componentDidMount() {
    let { cateName, cateId } = this.$router.params;
    this.setState({
      cateName, cateId
    });
  }

  componentWillUnmount() { }

  componentDidShow() { 
    let { cateId, shopArr } = this.state;
    let parms = {
      catId: this.$router.params.cateId,
      catType: 0,	//分类类型:0代表根分类,1代表其他分类	query	true	
      page: 1,
      pageSize: 10
    }
    Taro.$http.get(api.searchByCate, parms).then(res => {
      console.log(res);
      if(res.code === 200) {
        shopArr = res.data.rows;
      }
    });
  }

  componentDidHide() { }

  tabBarClick(item) {
    console.log(item)
  }

  inputChange = e => {
    this.setState({cateName: e.detail.value});
  }

  render() {
    let { shopArr, cateName } = this.state;
    return (
      <View className='shop_list'>
        <WaterFall gutter="15" list={shopArr}></WaterFall>
      </View>
    )
  }
}

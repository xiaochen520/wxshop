import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import './index.scss'

import api from "@/api"

export default class Index extends Component {

  config = {
    disableScroll: true
  }

  state = {
    categoryArr: [],
    categoryId: 0,
    subCategoryArr: [],
    cateLogo: ""
  }

  componentDidMount() {
    this.getCategory(0);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  //获取分类
  getCategory(id) {
    let { categoryArr, categoryId, subCategoryArr, cateLogo } = this.state;
    Taro.$http.get(api.catgorys + id).then(res => {
      if (res.code === 200) {
        if(id === 0) {
          //当前是一级分类
          categoryArr = res.data;
          if(categoryArr.length) {
            categoryId = res.data[0].id;
            cateLogo = res.data[0].logo;
            this.getCategory(categoryId);
          }
          this.setState({categoryArr, categoryId, cateLogo});
        } else {
          //二级分类
          subCategoryArr = res.data;
          this.setState({subCategoryArr});
        }
      }
      
    }).catch(err => {
      console.log(err);
    });
  }

  goSearch() {
    Taro.$util.gotoPage("/pages/search/index");
  }

  clickCategory(e) {
    if(this.state.categoryId === e.id) {
      return;
    }
    this.setState({
      categoryId: e.id,
      cateLogo: e.logo
    });

    this.getCategory(e.id);
  }

  render() {
    let { categoryArr, categoryId, subCategoryArr, cateLogo } = this.state;
    return (
      <View class="cate flex flex_v">
        <View onClick={this.goSearch} class="search flex flex_h_c">
          <View></View>
          <View>搜索商品</View>
        </View>
        <View class="flex cate_wrap flex_1">
          <ScrollView scrollY class="cate_l">
            <View class="cl_list">
              {
                categoryArr.map(e => {
                  let categoryClass = e.id === categoryId ? "cl_item active" : "cl_item";
                  return (
                    <View key={e.id} className='cl_item_box'>
                      <View onClick={this.clickCategory.bind(this, e)} class={categoryClass}>{e.name}</View>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
          <ScrollView scrollY class="cate_r flex_1">
            {
              cateLogo && (
                <Image className='cr_top_img' mode='widthFix' src={cateLogo} />
              )
            }
            <View className='cr_top_title tc'>
              <View className='title_line cr_top_title_text'>全部分类</View>
            </View>
            <View class="cr_list flex_list">
              {
                subCategoryArr.map(e => {
                  return (
                    <View key={e.id} class="cr_item">
                      <Image className='cr_icon' mode='aspectFill' src={e.catImage} />
                      <View class="cr_name">{e.name}</View>
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

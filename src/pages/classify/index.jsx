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
  }

  componentDidMount() {
    this.getCategory();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  //获取分类
  getCategory() {
    let { categoryArr, categoryId } = this.state;
    Taro.$http.get(api.catgorys).then(res => {
      if (res.code == 200) {
        categoryArr = res.data;
        categoryId = res.data[0] && res.data[0].id
        if (categoryId) {
          this.getSubCategory(categoryId);
        }
      }
      this.setState({ categoryArr, categoryId });
    }).catch(err => {
      console.log(err);
    });
  }

  //获取二级分类
  getSubCategory(id) {
    let { subCategoryArr } = this.state;
    Taro.$http.get(api.subCategory + id).then(res => {
      if (res.code == 200) {
        subCategoryArr = res.data;
      }
      this.setState({ subCategoryArr });
    }).catch(err => {
      console.log(err);
    });

  }

  goSearch() {
    Taro.$util.gotoPage("/pages/search/index");
  }

  clickCategory(id) {
    this.setState({
      categoryId: id
    })
  }

  render() {
    let { categoryArr, categoryId, subCategoryArr } = this.state;
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
                    <View className='cl_item_box'>
                      <View onClick={this.clickCategory.bind(this, e.id)} class={categoryClass}>{e.name}</View>
                    </View>
                  )
                })
              }

            </View>
          </ScrollView>
          <ScrollView scrollY class="cate_r flex_1">
            <Image className='cr_top_img' mode='widthFix' src='http://img3.imgtn.bdimg.com/it/u=2065785368,1854943927&fm=26&gp=0.jpg' />
            <View className='cr_top_title tc'>
              <View className='title_line cr_top_title_text'>全部分类</View>
            </View>
            <View class="cr_list flex_list">
              {
                subCategoryArr.map(e => {
                  return (
                    <View class="cr_item">
                      <Image className='cr_icon' mode='aspectFill' src='http://img5.imgtn.bdimg.com/it/u=3302417983,3672424730&fm=26&gp=0.jpg' />
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

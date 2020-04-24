import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input, Text } from '@tarojs/components'
import './index.scss'
import api from "@/api"
import WaterFall from "@/components/common/water-fall"
import Loading from "@/components/common/loading"
import LoadTip from "@/components/common/load-tip"

export default class Index extends Component {

  config = {
  }

  state = {
    historyArr: [],
    searchVal: "",
    isSearch: false, //是否搜索中
    goodArr: []
  }
  page = 1;
  pageSize = 10;
  hasMore = true;

  componentWillMount() { }

  componentDidMount() {
    this.getHistory();
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 历史搜索
  getHistory() {
    let historyArr = Taro.getStorageSync("historySearch");

    if (historyArr) {
      this.setState({ historyArr });
    }
  }

  beginSearch = () => {
    let { searchVal, historyArr } = this.state;
    if (!searchVal) return;
    this.getGoods();

    let hasHistory = historyArr.findIndex(e => e === searchVal);
    if(hasHistory === -1) {
      historyArr.unshift(searchVal);
      Taro.setStorageSync("historySearch", historyArr);
    }
    this.setState({ historyArr, isSearch: true });
  }

  // 获取商品
  getGoods = () => {
    let { searchVal, goodArr } = this.state;
    let parms = {
      keywords: searchVal,
      sort: "",
      page: this.page,
      pageSize: this.pageSize
    }
    Taro.$http.get(api.searchGood, parms).then(res => {
      if (res.code === 200) {
        goodArr = [...res.data.rows, ...goodArr];
        this.page++;

        if(res.data.rows.length < this.pageSize) {
          this.hasMore = false;
        }
      }
      this.setState({goodArr});
    });
  }

  // 清空历史记录
  clearHistory = () => {
    Taro.removeStorageSync("historySearch");
    this.setState({ historyArr: [] });
  }

  // 清空input
  clearInput = () => {
    this.setState({searchVal: "", isSearch: false, goodArr: []});
  }

  inputChange = e => {
    this.setState({ searchVal: e.target.value });
  }

  clickHistory(e) {
    this.setState({ searchVal: e, isSearch: true });
    this.getGoods();
  }

  render() {
    let { historyArr, searchVal, isSearch, goodArr } = this.state;
    return (
      <View className='search'>
        <View className="nav flex_middle">
          <View className="input_box flex_1 flex_middle">
            <Text className="iconfont iconsearch"></Text>
            <Input value={searchVal} onInput={this.inputChange} className="flex_1" placeholder="搜索单品"></Input>
            {
              searchVal && <Text onClick={this.clearInput} className="iconfont iconsearchclose-"></Text>
            }
          </View>
          <View className="cancel_btn" onClick={this.beginSearch}>搜索</View>
        </View>
        <View className="result">
          <WaterFall gutter="15" list={goodArr}></WaterFall>
          {
            !this.hasMore && <LoadTip></LoadTip>
          }
          
        </View>
        {/* 历史搜索 */}
        {
          !isSearch && (
            <View className="topic">
              <View className="t_head flex_middle">
                <View className="flex_1 title">历史搜索</View>
                <Text onClick={this.clearHistory} className="iconfont icondelete"></Text>
              </View>
              <View className="t_c_list flex_list">
                {
                  historyArr.map(e => (
                    <View onClick={this.clickHistory.bind(this, e)} className="t_c_item flex_item">{e}</View>
                  ))
                }
              </View>
            </View>
          )
        }
      </View>
    )
  }
}

import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input, Text } from '@tarojs/components'
import './index.scss'
import api from "@/api"

export default class Index extends Component {

  config = {
  }

  state = {
    historyArr: [],
    searchVal: "",
    isSearch: false, //是否搜索中
  }
  page = 1;
  pageSize = 10;

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
    historyArr.unshift(searchVal);

    let parms = {
      keywords: searchVal,
      sort: "",
      page: this.page,
      pageSize: this.pageSize
    }
    Taro.$http.get(api.searchGood, parms).then(res => {
      console.log(res);
      if(res.code === 200) {
        
      }
    });


    Taro.setStorageSync("historySearch", historyArr);
    this.setState({ historyArr, isSearch: true });
  }

  clearHistory = () => {
    Taro.removeStorageSync("historySearch");
    this.setState({ historyArr: [] });
  }

  inputChange = e => {
    this.setState({ searchVal: e.target.value });
  }

  render() {
    let { historyArr, searchVal, isSearch } = this.state;
    return (
      <View className='search'>
        <View className="nav flex_middle">
          <View className="input_box flex_1 flex_middle">
            <Text className="iconfont iconsearch"></Text>
            <Input value={searchVal} onChange={this.inputChange} className="flex_1" placeholder="搜索单品"></Input>
          </View>
          <View className="cancel_btn" onClick={this.beginSearch}>搜索</View>
        </View>
        {/* 历史搜索 */}
        {
          !isSearch && (
            <View className="topic">
              <View className="t_head flex_middle">
                <View className="flex_1 title">历史搜索</View>
                <Text onClick={this.clearHistory} className="iconfont iconpass_Line_icons"></Text>
              </View>
              <View className="t_c_list flex_list">
                {
                  historyArr.map(e => (
                    <View className="t_c_item flex_item">{e}</View>
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

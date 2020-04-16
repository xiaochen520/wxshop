import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import './index.scss'
import WaterFall from "@/components/common/water-fall"

export default class Index extends Component {
  
  state = {
    topicArr: [],
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

  componentDidShow() { }

  componentDidHide() { }

  tabBarClick(item) {
    console.log(item)
  }

  inputChange = e => {
    this.setState({cateName: e.detail.value});
  }

  render() {
    let { topicArr, cateName } = this.state;
    return (
      <View className='shop_list'>
        <View className="nav flex_middle">
          <View className="input_box flex_1 flex_middle">
            <Text className="iconfont iconsearch"></Text>
            <Input value={cateName} onChange={this.inputChange} className="flex_1" placeholder="搜索单品"></Input>
          </View>
          <View className="cancel_btn">取消</View>
        </View>
        <WaterFall gutter="15" list={topicArr}></WaterFall>
      </View>
    )
  }
}

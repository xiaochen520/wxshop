import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Button, Text } from '@tarojs/components'
import './index.scss'
import logo from "@/imgs/common/logo.png"
import greet from "@/imgs/author/author.png"

export default class Index extends Component {

  config = {
    disableScroll: true
  }

  state = {

  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getUserInfo = res => {
    console.log(res)
    let data = res.detail;
    if (data.errMsg === "getUserInfo:ok") {
      Taro.$util.gotoPage("/pages/author-login/index");
    }
  }

  render() {

    return (
      <View className='author'>
        <View>
          <Image className="logo" mode="widthFix" src={logo}></Image>
        </View>
        <View>
          <Image className="greet" mode="widthFix" src={greet}></Image>
        </View>
        <Button className="author_btn" openType="getUserInfo" onGetUserInfo={this.getUserInfo}>微信授权</Button>
      </View>
    )
  }
}

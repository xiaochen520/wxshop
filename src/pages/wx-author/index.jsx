import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Button, Text } from '@tarojs/components'
import './index.scss'
import logo from "@/imgs/common/logo.png"
import greet from "@/imgs/author/author.png"

import api from "@/api";

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

      Taro.showLoading({
        mask: true
      });

      wx.login({
        success: res => {
          if (res.code) {
            //发起网络请求
            const parms = {
              code: res.code,
              encryptedData: data.encryptedData,
              iv: data.iv,
              rawData: data.rawData
            }

            Taro.$http.post(api.login, parms).then(res => {
              console.log(res);
              Taro.hideLoading();
            });
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
        fail: _ => {

        }
      })



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
        <Button className="author_btn" openType="getUserInfo" onGetUserInfo={this.getUserInfo}>微信登录</Button>
      </View>
    )
  }
}

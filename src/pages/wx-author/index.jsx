import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Button, Text } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import { setToken, setUser } from "@/store/actions"

import logo from "@/imgs/common/logo.png"
import greet from "@/imgs/author/author.png"

import api from "@/api";
@connect(({ user }) => ({
  user
}), (dispatch) => ({
  setToken(data) {
    dispatch(setToken(data))
  },
  setUser(data) {
    dispatch(setUser(data))
  }
}))

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
    let { setToken, setUser } = this.props;

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
              iv: data.iv
            }

            Taro.$http.post(api.login, parms).then(res => {
              if (res.code === 200) {
                setToken(res.data.token);
                setUser(data.userInfo);
                Taro.setStorageSync("token", res.data.token);
                Taro.setStorageSync("userInfo", data.userInfo);
                Taro.navigateBack({
                  delta: 1
                });
              }
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

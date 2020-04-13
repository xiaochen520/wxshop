import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import "./font/iconfont.css"
import './app.scss'

import http from "@/api/request.js";
import util from '@/util'
Taro.$util = util;
Taro.$http = http;

//请求相关配置
http.defaults.baseURL = "https://api.langyiquan.com";

http.interceptors.request(config => {
//请求拦截器
return config;
});

http.interceptors.response(config => {
  //响应拦截器
  // console.log(config);
  return config;
});

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    "pages": [
      "pages/index/index", //首页
      "pages/classify/index", //分类
      "pages/shop-cart/index", //购物车
      "pages/user/index", //个人中心
      "pages/good-detail/index", //商品详情
      "pages/search/index", //搜索页
      "pages/order/index", //订单列表
      "pages/shop-list/index", //商品列表
      "pages/coupon/index", //优惠券
      "pages/address/index", //地址管理
      "pages/add-address/index", //新增地址
      "pages/wx-author/index", //授权页面
      "pages/author-login/index", //登录页面
    ],
    "window": {
      "navigationBarBackgroundColor": "#fff",
      "navigationBarTitleText": "cookbook",
      "navigationBarTextStyle": "black",
      "navigationBarTitleText": '浪一圈',
      onReachBottomDistance: 50
    },
    "tabBar": {
      "color": "#999",
      "selectedColor": "#5482F5",
      "backgroundColor": "#fff",
      "borderStyle": "black",
      "list": [
        {
          "pagePath": "pages/index/index",
          "text": "首页",
          "iconPath": "./imgs/tabs/home.png",
          "selectedIconPath": "./imgs/tabs/home-active.png"
        },
        {
          "pagePath": "pages/classify/index",
          "text": "分类",
          "iconPath": "./imgs/tabs/cate.png",
          "selectedIconPath": "./imgs/tabs/cate-active.png"
        },
        {
          "pagePath": "pages/shop-cart/index",
          "text": "购物车",
          "iconPath": "./imgs/tabs/cart.png",
          "selectedIconPath": "./imgs/tabs/cart-active.png"
        },
        {
          "pagePath": "pages/user/index",
          "text": "我的",
          "iconPath": "./imgs/tabs/user.png",
          "selectedIconPath": "./imgs/tabs/user-active.png"
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

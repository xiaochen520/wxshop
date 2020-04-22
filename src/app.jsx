import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import configStore from './store'
import Index from './pages/index'
import api from "@/api"

const store = configStore()

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
  let token = store.getState().user.token;
  if (token) {
    config.header = {
      Authorization: token
    };
  }

  return config;
});

http.interceptors.response(config => {
  //响应拦截器
  // console.log("config", config);

  if (config.code === 1004) {
    util.gotoPage("pages/wx-author/index");
  }
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
      "pages/about-us/index", //关于我们
      "pages/confirm-order/index", //确认订单
    ],
    "window": {
      "navigationBarBackgroundColor": "#fff",
      "navigationBarTitleText": "cookbook",
      "navigationBarTextStyle": "black",
      "navigationBarTitleText": '美妆馆',
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

  componentDidMount() {
    this.initData();
  }

  initData() {
    let userStore = store.getState().user;
    let token = Taro.getStorageSync("token");
    let userInfo = Taro.getStorageSync("userInfo");
    
    if (!userStore.token && token) {
      store.dispatch({
        type: 'SET_TOKEN',
        data: token
      });

      store.dispatch({
        type: 'SET_USER',
        data: userInfo
      });
    }
    
    if(store.getState().user.token) {
      //获取购物车
      this.getShopCar();
    }
  }

  //获取购物车
  getShopCar() {
    Taro.$http.get(api.shopCar).then(res => {
      if(res.code === 200 && res.data.length) {
        res.data.forEach(e => {e.select = false});
        store.dispatch({
          type: 'Add_CAR',
          data: res.data
        });
      }
    });
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

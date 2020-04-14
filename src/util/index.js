import Taro from '@tarojs/taro'
export default {
  //跳转页面
  gotoPage(path, type = 'navigateTo') {
    Taro[type]({
      url: path
    });
  },
  isLogin() {
      if(Taro.getStorageSync("token")) {
        return true;
      } else {
        return false;
      }
  }
}

import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Button, Text } from '@tarojs/components'
import './index.scss'
import api from "@/api";
import { connect } from '@tarojs/redux'

import AddrItem from "@/components/address/addr-item"

@connect(({ user }) => ({
  user
}))
export default class Index extends Component {

  config = {

  }

  state = {
    addrArr: []
  }

  componentWillUnmount() { }

  componentDidShow() {
    this.getAddr();
  }

  componentDidHide() { }

  getAddr() {
    Taro.$http.post(api.addrList).then(res => {
      if (res.code === 200) {
        this.setState({ addrArr: res.data });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  goAddressAdd = () => {
    Taro.$util.gotoPage("/pages/add-address/index");
  }

  //设置默认地址
  setDefaule(item, index) {
    let { addrArr } = this.state;
    Taro.$http.get(api.setDefalutAddr, { addressId: item.id }).then(res => {
      if (res.code === 200) {
        addrArr.forEach(e => { e.isDefault = 0 });
        addrArr[index].isDefault = 1;

        this.setState({ addrArr });
        Taro.showToast({
          title: "设置成功",
          icon: "none"
        })
      }
    });
  }

  // 删除地址
  deleteAddr(item, index) {
    let { addrArr } = this.state;
    Taro.$http.get(api.deleteAddr, {addressId: item.id}).then(res => {
      
      if(res.code === 200) {
        Taro.showToast({
          title: "删除成功",
          icon: "none"
        })
        addrArr.splice(index, 1);
      }
      this.setState({addrArr});
    });
  }

  render() {
    let { addrArr } = this.state;
    return (
      <View className='addr'>
        {
          addrArr.map((e, i) => (
            <View key={e.id} className="addr_inner">
              <AddrItem onDelete={this.deleteAddr.bind(this, e, i)} onSetDefault={this.setDefaule.bind(this, e, i)} data={e}></AddrItem>
            </View>
          ))
        }
        <View className="foot_btn" onClick={this.goAddressAdd}>+添加地址</View>
      </View>
    )
  }
}

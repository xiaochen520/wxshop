import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './index.scss'
import api from "@/api"

import { connect } from '@tarojs/redux'
import { addCar, setOrder } from "@/store/actions"
import classNames from 'classnames'

import NumHandle from '@/components/shop-cart/num-handle/index.jsx';
import NoData from '@/components/common/no-data';

import icon from "@/imgs/shop-car";

@connect(({ shopCar, user }) => ({
  shopCar, user
}), (dispatch) => ({
  addCar(data) {
    dispatch(addCar(data))
  },
  setOrder(data) {
    dispatch(setOrder(data))
  }
}))
export default class Index extends Component {

  config = {

  }

  state = {
    isSelectAll: false,
    selectGoodArr: [],
    totalMoney: 0,
    editMode: false, //编辑模式是否打开
  }

  componentDidMount() {}

  componentDidShow() {}

  // 编辑
  changeEdit = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  // 去登陆
  goLogin = () => {
    Taro.$util.gotoPage("/pages/wx-author/index");
  }

  // 确认按钮
  confirm = () => {
    let { editMode, selectGoodArr } = this.state;

    if (!selectGoodArr.length) {
      Taro.showToast({
        title: "请先选择商品",
        icon: "none"
      })
      return;
    }

    if (editMode) {
      // 删除操作
      Taro.showLoading();
      this.removeGoodByCar();
    } else {
      //去结算
      this.props.setOrder(selectGoodArr);
      Taro.$util.gotoPage("/pages/confirm-order/index");
    }
  }

  // 移除购物车
  removeGoodByCar = () => {
    let shopArr = this.props.shopCar.shopCarArr;
    let { selectGoodArr } = this.state;
    let parms = {
      itemSpecIds: selectGoodArr.map(e => e.specId).join()
    }

    Taro.$http.get(api.delShopCar, parms).then(res => {
      Taro.hideLoading()
      if(res.code === 200) {
        let arr = [];
        shopArr.forEach(e => {
          let index = selectGoodArr.findIndex(son => son.specId === e.specId);
          if(index < 0) {
            arr.push(e);
          }
        })

        this.props.addCar(arr);
      }
    });
  }

  // 计算价格
  calcMoney(arr) {
    let price = 0;
    arr.forEach(e => {
      price += e.priceDiscount * e.buyCounts;
    });

    return price;
  }

  // 全选商品
  selectAll = () => {
    let { selectGoodArr, isSelectAll, totalMoney } = this.state;
    let shopArr = this.props.shopCar.shopCarArr;

    if (!isSelectAll) {
      shopArr.forEach(e => e.select = true);
      selectGoodArr = shopArr;
      isSelectAll = true;
    } else {
      shopArr.forEach(e => e.select = false);
      selectGoodArr = [];
      isSelectAll = false;
    }
    totalMoney = this.calcMoney(selectGoodArr);
    this.props.addCar(shopArr);
    this.setState({ selectGoodArr, isSelectAll, totalMoney });
  }

  // 选择商品
  chooseGood(index) {
    let { selectGoodArr, isSelectAll, totalMoney } = this.state;
    let shopArr = this.props.shopCar.shopCarArr;

    if (!shopArr[index].select) {
      selectGoodArr.push(shopArr[index]);
    } else {
      selectGoodArr.splice(selectGoodArr.findIndex(e => e.itemId === shopArr[index].itemId), 1);
    }

    totalMoney = this.calcMoney(selectGoodArr);
    shopArr[index].select = !shopArr[index].select;

    if (selectGoodArr.length === shopArr.length) {
      isSelectAll = true;
    } else {
      isSelectAll = false;
    }
    this.props.addCar(shopArr);
    this.setState({ selectGoodArr, isSelectAll, totalMoney });
  }

  render() {
    let { user, shopCar } = this.props;
    let { isSelectAll, selectGoodArr, totalMoney, editMode } = this.state;

    let content = user.token && shopCar.shopCarArr.length ? (
      <View className='shop_cart'>
        <View>
          <View className="top_menu flex_middle">
            <View className="flex_1 top_menu_label">商品数量有限，请尽快结算哦</View>
            <View onClick={this.changeEdit} className="top_menu_btn">
              {editMode ? "完成" : "编辑"}
            </View>
          </View>
          <View className='s_list'>
            {
              shopCar.shopCarArr.map((e, i) => (
                <View className='s_item flex flex_v_c'>
                  <View onClick={this.chooseGood.bind(this, i)} className={classNames("iconfont", e.select ? "iconpass_Flat_icons" : "iconpass_Line_icons")}></View>
                  <View className='flex flex_1'>
                    <Image className='s_photo' mode='aspectFit' src={e.itemImgUrl} />
                    <View className='flex_1'>
                      <View className='s_name'>
                        {e.itemName}
                      </View>
                      <View className='s_label'>
                        {e.specName}
                      </View>
                      <View className='flex'>
                        <View className='s_price flex flex_v_c flex_1'>
                          <View>￥</View>
                          <View className='s'>
                            {e.priceDiscount}
                          </View>
                        </View>
                        <NumHandle count={e.buyCounts} className='flex_1'></NumHandle>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            }
          </View>
          <View className='car_bar flex flex_v_c'>
            <View className="flex_1 flex_middle">
              <View onClick={this.selectAll} className={classNames("iconfont", isSelectAll ? "iconpass_Flat_icons" : "iconpass_Line_icons")}></View>
              <View>全选</View>
              {
                !editMode && (
                  <View className="flex_1 flex_middle flex_h_r">
                    <View className='tr'>合计</View>
                    <View className='price'>
                      ￥{selectGoodArr.length ? totalMoney : 0}
                    </View>
                  </View>
                )
              }
            </View>
            <View onClick={this.confirm} className='btn tc'>
              {editMode ? "删除" : "结算"}
            </View>
          </View>
        </View>
      </View>
    ) : (
        <NoData img={!user.token ? icon.unlogin : icon.cart} title={!user.token ? "请先登录后查看购物车~" : "购物车空空如也~"}>
          {
            !user.token && <Button onClick={this.goLogin} className="login_btn">登录查看购物车</Button>
          }
        </NoData>
      )
    return content
  }
}

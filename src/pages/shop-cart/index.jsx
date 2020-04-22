import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux'
import { addCar, setOrder } from "@/store/actions"
import classNames from 'classnames'

import NumHandle from '@/components/shop-cart/num-handle/index.jsx';
import NoData from '@/components/common/no-data';

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
    totalMoney: 0
  }

  hasClickTap = false

  componentWillMount() { }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() {
    this.hasClickTap = false;
    console.log(11111111)
    console.log(this.props.shopCar.shopCarArr);
  }

  componentDidHide() { }

  onTabItemTap(parms) {

    if (!this.hasClickTap) {
      this.hasClickTap = true;
      if (Taro.getStorageSync("token")) {
        this.setState({ isLogin: true });
      } else {
        this.setState({ isLogin: false });
      }
    }

  }

  confirm = () => {
    this.props.setOrder(this.state.selectGoodArr);
    Taro.$util.gotoPage("/pages/confirm-order/index");
  }

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

    if(!isSelectAll) {
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
    this.setState({selectGoodArr, isSelectAll, totalMoney});
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
    console.log(shopArr)
    shopArr[index].select = !shopArr[index].select;

    if(selectGoodArr.length === shopArr.length) {
      isSelectAll = true;
    } else {
      isSelectAll = false;
    }
    this.props.addCar(shopArr);
    this.setState({selectGoodArr, isSelectAll, totalMoney});
  }

  render() {
    let { user, shopCar } = this.props;
    let { isSelectAll, selectGoodArr, totalMoney } = this.state;

    let content = user.token && shopCar.shopCarArr.length ? (
      <View className='shop_cart'>
        <View>
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
            <View onClick={this.selectAll} className={classNames("iconfont", isSelectAll ? "iconpass_Flat_icons" : "iconpass_Line_icons")}></View>
            <View>全选</View>
            <View className='flex_1 tr'>合计</View>
            <View className='flex price flex_v_b'>
              <View>￥</View>
              <View className='s'>
                {selectGoodArr.length ? totalMoney : 0}
              </View>
            </View>
            <View onClick={this.confirm} className='btn tc'>结算</View>
          </View>
        </View>
      </View>
    ) : (
        <NoData title="aaaa"></NoData>
      )
    return content
  }
}

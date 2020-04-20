import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, ScrollView } from '@tarojs/components'
import classNames from 'classnames'
import api from "@/api"
import './index.scss'
import "../../../style/common.scss";
import "../../../style/mixin.scss";

import NumHandle from "@/components/shop-cart/num-handle";

export default class Index extends Component {

  static defaultProps = {
    isOpen: false,
    type: 1,
    data: []
  }

  state = {
    currentItem: null,
    selectedRule: null,
    count: 1
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  close = () => {
    this.props.onClose();
  }

  clickRule(item) {
    this.setState({ currentItem: item });
  }

  changeGood = e => {
    this.setState({ count: e });
  }

  save = () => {
    let { count, currentItem } = this.state;
    if(!currentItem) {
      Taro.showToast({
        title: '请选择商品',
        icon: 'none'
      })

      return;
    }
    
    if (!this.props.type) {
      //购物车
      let parms = {
        buyCounts: count,
        itemId: this.props.defaultVal.id,
        itemImgUrl: "",
        itemName: this.props.defaultVal.name,
        priceDiscount: currentItem.priceDiscount,
        priceNormal: currentItem.priceNormal,
        specId: currentItem.id,
        specName: currentItem.specName
      }
      Taro.$http.post(api.addShopCar, parms).then(res => {
        if(res.code === 200) {
          this.close();
          Taro.showToast({
            title: '添加成功，在购物车等您~',
            icon: 'none'
          })
        }
      });
    } else {

    }
  }

  render() {
    // type: 0购物车  1购买
    let { isOpen, type, data, defaultVal } = this.props;
    let { currentItem, count } = this.state;

    return (
      <View onClick={this.close} className={isOpen ? "modal active" : "modal"}>
        <View onClick={e => { e.stopPropagation() }} className="modal_box flex_v">
          <View className="close iconfont iconarrow-down"></View>
          <View className="modal_head flex_middle">
            <Image className="modal_head_pic" mode="aspectFill" src={currentItem ? currentItem.specImg : defaultVal.url}></Image>
            <View className="flex_1">
              <View className="modal_head_price">￥
                {
                  currentItem ? currentItem.priceNormal : defaultVal.price
                }
              </View>
              <View className="modal_head_name">{defaultVal.name}</View>
              <View className="modal_head_type">请选择：
                {
                  data.map(e => e.specKey).join("、")
                }
              </View>
            </View>
          </View>
          <ScrollView scrollY className="flex_1 modal_content">
            <View className="mc_rule">
              {
                data.map(e => (
                  <View className="rule_item">
                    <View className="mc_rule_title">
                      {e.specKey}
                    </View>
                    <View className="mc_rule_list flex_list">
                      {
                        e.itemSpecs.map(son => (
                          <View onClick={this.clickRule.bind(this, son)} className={classNames("mc_rule_unit", "flex_item", (currentItem && currentItem.id === son.id) ? "active" : "")}>
                            <View className="unit">{son.specName}</View>
                          </View>
                        ))
                      }
                    </View>
                  </View>
                ))
              }

            </View>
            <View className="flex_middle mc_calc">
              <View className="flex_1">数量</View>
              <NumHandle count={count} onChange={this.changeGood}></NumHandle>
            </View>
          </ScrollView>
          <View className="modal_foot">
            <Button onClick={this.save} className="btn">
              {type ? "立即购买" : "加入购物车"}
            </Button>
          </View>
        </View>

      </View>
    )
  }
}

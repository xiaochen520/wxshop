import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, ScrollView } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'
import "../../../style/common.scss";
import "../../../style/mixin.scss";

import NumHandle from "@/components/shop-cart/num-handle";

export default class Index extends Component {

  static defaultProps = {
    isOpen: false,
    type: 1
  }

  state = {
    currentItem: null,
    selectedRule: null,
    count: 0
  }

  componentWillMount() { }

  componentDidMount() {}

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  close = () => {
    this.props.onClose();
  }

  clickRule(item) {
    this.setState({currentItem: item});
  }

  changeGood = e => {
    this.setState({count: e});
  }

  render() {
    // type: 0购物车  1购买
    let { isOpen, type, data } = this.props;
    let { currentItem, count } = this.state;

    return (
      <View onClick={this.close} className={isOpen ? "modal active" : "modal"}>
        <View onClick={e => { e.stopPropagation() }} className="modal_box flex_v">
          <View className="close iconfont iconarrow-down"></View>
          <View className="modal_head flex_middle">
            <Image className="modal_head_pic" mode="aspectFill" src="http://img5.imgtn.bdimg.com/it/u=3302417983,3672424730&fm=26&gp=0.jpg"></Image>
            <View className="flex_1">
              <View className="modal_head_price">￥9.9</View>
              <View className="modal_head_name">苹果</View>
              <View className="modal_head_type">请选择：重量型号</View>
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
              <NumHandle onChange={this.changeGood}></NumHandle>
            </View>
          </ScrollView>
          <View className="modal_foot">
            <Button className="btn">
              {type ? "立即购买" : "加入购物车"}
            </Button>
          </View>
        </View>

      </View>
    )
  }
}

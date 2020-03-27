import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button, ScrollView } from '@tarojs/components'
import './index.scss'
import "../../../style/common.scss";
import "../../../style/mixin.scss";

import NumHandle from "@/components/shop-cart/num-handle";

export default class Index extends Component {

  static defaultProps = {
    isOpen: false
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  close() {
    this.props.onClose();
  }

  render() {
    let { isOpen } = this.props;
    return (
      <View onClick={this.close.bind(this)} className={isOpen ? "modal active" : "modal"}>
        <View onClick={e => {e.stopPropagation()}} className="modal_box flex_v">
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
              <View className="rule_item">
                <View className="mc_rule_title">重量</View>
                <View className="mc_rule_list flex_list">
                  <View className="mc_rule_unit active flex_item">
                    <View className="unit">一斤装</View>
                  </View>
                  <View className="mc_rule_unit flex_item">
                    <View className="unit">三斤装</View>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex_middle mc_calc">
              <View className="flex_1">数量</View>
              <NumHandle></NumHandle>
            </View>
          </ScrollView>
          <View className="modal_foot">
            <Button className="btn">确定</Button>
          </View>
        </View>

      </View>
    )
  }
}

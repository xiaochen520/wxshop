import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Button } from '@tarojs/components'
import { orderStatus } from "@/util/constant"
import './index.scss'
import "../../../style/common.scss";

export default class Index extends Component {


  goDeatil = () => {
    Taro.$util.gotoPage("/pages/order-detail/index?id=" + this.props.data.orderId);
  }

  render() {
    let { data } = this.props;
    if(!data) return null;
    return (
      <View onClick={this.goDeatil} className='order_item'>
        <View className="o_head flex_middle">
          <View className="oh_num flex_1">订单编号： {data.orderId}</View>
          <View className="oh_status">
            {orderStatus[data.orderStatus].label}
          </View>
        </View>
        {
          data.subOrderItemList.length === 1 ? (
            <View className="o_content flex">
              <Image className="oc_pic" aspectFill src={data.subOrderItemList[0].itemImg}></Image>
              <View className="oc_aside flex_1">
                <View className="oc_name b">{data.subOrderItemList[0].itemName}</View>
                <View className="oc_desc">{data.subOrderItemList[0].itemSpecName}</View>
                <View className="oc_price flex_middle">
                  <View className="oc_money flex_1">
                    <Text>￥</Text>
                    <Text className="s b">{data.subOrderItemList[0].price}</Text>
                  </View>
                  <View className="oc_count">x{data.subOrderItemList[0].buyCounts}</View>
                </View>
              </View>
            </View>
          ) : (
              <View className="o_content_mul flex">
                {
                  data.subOrderItemList.map((e, i) => {
                    if (i <= 3) {
                      return (
                        <Image className="oc_pic" aspectFill src={e.itemImg}></Image>
                      )
                    }
                  })
                }
                {/* <View>
                  <View className="iconfont iconellipsis"></View>
                </View> */}
              </View>
            )
        }
        <View className="o_foot flex_middle">
          <View className="flex_1 tr">共计{data.subOrderItemList.length}种商品，{data.orderStatus == 10 ? "待支付" : "实际支付"}</View>
          <View className="of_pay">￥{data.realPayAmount}</View>
          {
            data.orderStatus == 10 && <Button className="of_btn">去付款</Button>
          }
        </View>
      </View>
    )
  }
}

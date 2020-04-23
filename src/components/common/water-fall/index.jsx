import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { View } from '@tarojs/components'
import ShopItem from "../shop-item"
import './index.scss'
import "../../../style/common.scss"

export default class Index extends Component {
  static defaultProps = {
    list: []
  }
  state = {
    leftArr: [],
    rightArr: [],
    leftHeight: 0,
    rightHeight: 0
  }

  componentDidMount() {
    if(this.props.list.length) {
      this.calcHeight();
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.list !== this.props.list) {
      this.calcHeight();
    }
  }

  async calcHeight() {
    let { list } = this.props;
    let { leftArr, rightArr } = this.state;
    let query = Taro.createSelectorQuery().in(this.$scope);

    for (let i = 0; i < list.length; i++) {
      if (this.state.leftHeight <= this.state.rightHeight) {
        leftArr.push(list[i]);
      } else {
        rightArr.push(list[i]);
      }

      await this.getBoxHeight(query, leftArr, rightArr);
    }
  }

  getBoxHeight(query, leftArr, rightArr) {
    let { leftHeight, rightHeight } = this.state;
    return new Promise((resolve, reject) => {
      this.setState({ leftArr, rightArr }, () => {
        query.select('.left_list').boundingClientRect();
        query.select('.right_list').boundingClientRect();
        query.exec((res) => {
          leftHeight = res[0].height;
          rightHeight = res[1].height;
          this.setState({ leftHeight, rightHeight }, () => {
            resolve();
          })
        });
      });
    });
  }

  render() {
    let { gutter } = this.props;
    let { leftArr, rightArr } = this.state;

    const gutterStyle = {
      marginLeft: gutter + "px"
    }

    return (
      <View className="container flex">
        <View className="left">
          <View className="left_list">
            {
              leftArr.map(e => (
                <ShopItem key={e.itemId} data={e}></ShopItem>
              ))
            }
          </View>
        </View>
        <View style={gutterStyle} className="right">
          <View className="right_list">
            {
              rightArr.map(e => (
                <ShopItem key={e.itemId} data={e}></ShopItem>
              ))
            }
          </View>
        </View>
      </View >
    )
  }
}

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
    currentList: [], //当前渲染的数组
    leftArr: [],
    rightArr: []
  }

  leftHeight = 0;
  rightHeight = 0;

  componentDidMount() {
    if (this.props.list.length) {
      this.setState({ currentList: this.props.list }, () => {
        this.calcHeight();
      });
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidUpdate(prevProps) {

    let { list } = this.props;
    let { leftArr, rightArr, currentList } = this.state;

    if (prevProps.list === list) return;

    if (!prevProps.list.length) {
      //第一次渲染为空
      this.setState({ currentList: list }, () => {
        this.calcHeight();
      });
    } else {
      // 第n次渲染
      if (!list.length || (list.length < (leftArr.length + rightArr.length))) {
        // 重新渲染
        this.setState({ leftArr: [], rightArr: [] });
        this.leftHeight = 0;
        this.rightHeight = 0;
        this.setState({ currentList: list }, () => {
          this.calcHeight();
        });
      } else {
        // 连续渲染
        let arr = [];
        list.forEach(e => {
          let item = [...leftArr, ...rightArr].find(son => son.itemId === e.itemId);
          if (!item) {
            arr.push(e);
          }
        });
        this.setState({ currentList: arr }, () => {
          this.calcHeight();
        });
      }
    }
  }

  async calcHeight() {
    let { leftArr, rightArr, currentList } = this.state;
    let query = Taro.createSelectorQuery().in(this.$scope);

    for (let i = 0; i < currentList.length; i++) {
      if (this.leftHeight <= this.rightHeight) {
        leftArr.push(currentList[i]);
      } else {
        rightArr.push(currentList[i]);
      }
      await this.getBoxHeight(query, leftArr, rightArr);
    }
  }

  getBoxHeight(query, leftArr, rightArr) {
    return new Promise((resolve, reject) => {
      this.setState({ leftArr, rightArr }, () => {
        query.select('.left_list').boundingClientRect();
        query.select('.right_list').boundingClientRect();
        query.exec((res) => {
          this.leftHeight = res[0].height;
          this.rightHeight = res[1].height;
          resolve();
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

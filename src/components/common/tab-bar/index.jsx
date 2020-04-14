import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import "@/style/common.scss"

export default class Index extends Component {

  state = {
    curItem: null
  }

  componentDidMount() {
    let { list, current } = this.props
    this.setState({
      curItem: list[current || 0] || null
    })
  }

  clickTab(index) {
    let { list } = this.props;
    this.setState({
      curItem: list[index]
    })
    this.props.onChange(list[index]);
  }

  render() {
    let { list } = this.props;
    let { curItem } = this.state;

    return (
      <View className='tab_group flex'>
        {
          list.map((e, index) => (
            <View onClick={this.clickTab.bind(this, index)} className={e.label === curItem.label ? "tab_item flex_1 tc active" : "tab_item flex_1 tc"}>{e.label}</View>
          ))
        }
      </View>
    )
  }
}

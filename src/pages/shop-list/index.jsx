import Taro, { Component } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import './index.scss'
import WaterFall from "@/components/common/water-fall"

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topicArr: [
        {
          name: "复古沙发",
          type: "家具",
          price: 3900,
          pic: "http://img4.imgtn.bdimg.com/it/u=2204136921,1389041167&fm=26&gp=0.jpg",
          desc: "这是一个最牛逼的复古沙发，没有什么沙发比它还牛逼，它最牛逼，他最无敌，奥利给！！"
        },
        {
          name: "复古沙发",
          type: "家具",
          price: 3900,
          pic: "http://img0.imgtn.bdimg.com/it/u=3339283041,1060972795&fm=11&gp=0.jpg",
          desc: "这是一个最牛逼的复古沙发，没有什么沙发比它还牛逼，它最牛逼，他最无敌，奥利给！！"
        },
        {
          name: "复古沙发",
          type: "家具",
          price: 3900,
          pic: "http://img2.imgtn.bdimg.com/it/u=1393704475,565303279&fm=26&gp=0.jpg",
          desc: "这是一个最牛逼的复古沙发，没有什么沙发比它还牛逼，它最牛逼，他最无敌，奥利给！！"
        },
        {
          name: "复古沙发",
          type: "家具",
          price: 3900,
          pic: "http://img5.imgtn.bdimg.com/it/u=384227651,4131775936&fm=26&gp=0.jpg",
          desc: "这是一个最牛逼的复古沙发，没有什么沙发比它还牛逼，它最牛逼，他最无敌，奥利给！！"
        },
        {
          name: "复古沙发",
          type: "家具",
          price: 3900,
          pic: "http://img5.imgtn.bdimg.com/it/u=405605572,2967293131&fm=11&gp=0.jpg",
          desc: "这是一个最牛逼的复古沙发，没有什么沙发比它还牛逼，它最牛逼，他最无敌，奥利给！！"
        }
      ]
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  tabBarClick(item) {
    console.log(item)
  }

  render() {
    let { topicArr } = this.state;
    return (
      <View className='shop_list'>
        <WaterFall gutter="15" list={topicArr}></WaterFall>
      </View>
    )
  }
}

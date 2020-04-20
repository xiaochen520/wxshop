import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Switch, Picker, Textarea } from '@tarojs/components'
import './index.scss'
import api from "@/api";

class Index extends Component {
    state = {

    }
    // onLoad
    componentWillMount() {

    }
    // onShow
    componentDidShow() {

    }
    // onUnload
    componentWillUnmount() {

    }

    render() {
        return (
            <View className='confirm'>
                <View className="user_info">
                    <View>陈佳迪 15226085502</View>
                    <View>
                        <View>大概几点积分管理科客户该烦了离开的风格理发鬼地方开了个辅导机构凉快地方了</View>
                        <View className="iconfont iconarrow-down"></View>
                    </View>
                </View>
                <View className="shop_info">

                </View>
                
                <View className="foot_bar">
                    <View>

                    </View>
                    <View>
                        
                    </View>
                </View>
            </View>
        )
    }
}

export default Index

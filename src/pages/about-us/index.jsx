import Taro, { Component } from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import './index.scss'
import logo from "@/imgs/common/logo.png"

class Index extends Component {

    gitUrl = "https://github.com/xiaochen520/"

    fastCopy = () => {
        Taro.setClipboardData({
            data: this.gitUrl
        })
    }

    render() {
        return (
            <View className='about-us'>
                <View className="nav">
                    <Image mode="widthFix" className="logo" src={logo}></Image>
                    <View className="us">
                        <View className="us_item flex_middle">
                            <View className="label b">作者</View>
                            <View>浪一圈</View>
                        </View>
                        <View className="us_item flex_middle">
                            <View className="label b">设计</View>
                            <View>张君宝爱喝君乐宝</View>
                        </View>
                    </View>
                </View>

                <View className="link flex_middle">
                    <View className="flex_1 l_left">
                        <View className="l_label">代码地址</View>
                        <View className="l_code">
                            {this.gitUrl}
                        </View>
                    </View>
                    <Button onClick={this.fastCopy} className="copy_btn">复制</Button>
                </View>
            </View>
        )
    }
}

export default Index

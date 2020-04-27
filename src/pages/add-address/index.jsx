import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Switch, Picker, Textarea } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'
import api from "@/api";
// import {
//     rightArrow,
// } from '@/static/address';
// import {
//     nameIcon,
//     telIcon,
//     posIcon,
//     tabletIcon,
//     floorIcon,
//     shopIcon,
// } from '@/static/add-address'

// import { post, get, msg } from '@/utils/index'
// import { authPhone } from '@/utils/validate'
// import RegionList from '@/components/region-list'

class Index extends Component {
    // constructor(props) {
    //     super(props)
    //     let { fromType, addressId } = this.$router.params;
    //     this.setState({
    //   
    //         fromType: fromType || 0,
    //         addressId: addressId || 0,
    //     })
    // }
    // config = {
    //     navigationBarTitleText: '',
    //     navigationBarTextStyle: 'black',
    //     navigationBarBackgroundColor: '#fff',
    //     navigationStyle: 'custom'
    // }
    state = {
        addressInfo: {
            city: "",
            detail: '',
            district: '',
            mobile: '',
            province: '',
            receiver: '',
        },
        isBlock: false,//城市列表显示
        selectText: '',//自定义区域选择弹窗
        selectShop: '',//店铺选择
        pickerIndex: 0,
        pickerList: [],
        pickerId: -1,//选择项
        pickerIdList: [],//id集合
    }
    // onLoad
    componentWillMount() {
        // let { fromType, addressId } = this.$router.params;
        // if (addressId) {//修改地址
        //     if (fromType == 0) {
        //         let { AddressNote, Id, ReceiverName, ReceiverPhone, RegionalismId, RegionalismName } = Taro.getStorageSync('editAddress') || {};
        //         this.setState({
        //             addressInfo: Object.assign({}, ...this.state.addressInfo, {
        //                 Id,
        //                 MarketRegionId: RegionalismId,
        //                 AddressNote,
        //                 LinkMan: ReceiverName,
        //                 LinkPhone: ReceiverPhone
        //             }),
        //             selectText: RegionalismName.replace(/\(\$\)|@@/g, ' ')
        //         }, _ => {
        //             // console.log(this.state.addressInfo)
        //         })
        //     } else {
        //         let { Id, RegionId, LinkName, LinkPhone, IsDefault, ShopName, HouseNum, Address } = Taro.getStorageSync('editAddress') || {};
        //         this.setState({
        //             addressInfo: Object.assign({}, ...this.state.addressInfo, {
        //                 Id,
        //                 MarketRegionId: RegionId,
        //                 LinkMan: LinkName,
        //                 LinkPhone,
        //                 IsDefault,
        //                 HouseNum,
        //                 ShopName
        //             }),
        //             selectText: Address.split('($)')[1].replace(/\(\$\)|@@/g, ' '),
        //             selectShop: Address.split('($)')[0]
        //         }, _ => {
        //             // console.log(this.state.addressInfo)
        //         })
        //     }

        // } else {
        //     Taro.removeStorageSync('address')
        // }
    }
    // onShow
    componentDidShow() {

    }
    // onUnload
    componentWillUnmount() {
        // Taro.removeStorageSync('address')
    }
    // handleInfo(type, e) {
    //     let { value } = e.detail;
    //     let { addressInfo } = this.state;
    //     switch (type) {
    //         case 1:
    //             this.setState({
    //                 addressInfo: Object.assign({}, addressInfo, { LinkMan: value })
    //             })
    //             break;
    //         case 2:
    //             this.setState({
    //                 addressInfo: Object.assign({}, addressInfo, { LinkPhone: value })
    //             })
    //             break;
    //         case 3:
    //             this.setState({
    //                 addressInfo: Object.assign({}, addressInfo, { AddressNote: value })
    //             })
    //             break;
    //         case 4:
    //             this.setState({
    //                 addressInfo: Object.assign({}, addressInfo, { HouseNum: value })
    //             })
    //             break;
    //         case 5:
    //             this.setState({
    //                 addressInfo: Object.assign({}, addressInfo, { ShopName: value })
    //             })
    //     }
    // }
    // handleAddress() {
    //     let { addressInfo } = this.state;
    //     // console.log(addressInfo)
    //     this.setState({
    //         addressInfo: Object.assign({}, addressInfo, { IsDefault: addressInfo.IsDefault == 0 ? 1 : 0 })
    //     })
    // }
    handleSave() {
        //fromType 0 客户 1我的
        // setTimeout(_ => {//解决state更新问题
        //     let { addressInfo, fromType, selectText, addressId } = this.state;
        //     if (!addressInfo.LinkMan) {
        //         msg(`请填写${fromType == 0 ? '收货人' : ''}姓名`)
        //         return;
        //     }
        //     if (!authPhone(addressInfo.LinkPhone)) {
        //         return;
        //     }
        //     if (!selectText) {
        //         msg(`请选择${fromType == 0 ? '收货' : '店铺'}地址`)
        //         return;
        //     }
        //     if (fromType == 0) {
        //         if (!addressInfo.AddressNote) {
        //             msg('请输入详细地址')
        //             return;
        //         }
        //     }
        //     if (fromType == 1) {
        //         if (!addressInfo.HouseNum) {
        //             msg('请输入店铺门牌号')
        //             return;
        //         }
        //         if (!addressInfo.ShopName) {
        //             msg('请输入店铺名称')
        //             return;
        //         }
        //     }
        //     console.log(addressInfo)
        //     let data;
        //     let { MarketRegionId, AddressNote, LinkMan, LinkPhone, IsDefault, HouseNum, ShopName, Id } = addressInfo;
        //     if (fromType == 0) {
        //         data = {
        //             Id,
        //             RegionalismId: MarketRegionId,
        //             AddressNote,
        //             ReceiverName: LinkMan,
        //             ReceiverPhone: LinkPhone
        //         }
        //     } else {
        //         data = {
        //             Id,
        //             MarketRegionId,
        //             LinkMan,
        //             LinkPhone,
        //             IsDefault,
        //             HouseNum,
        //             ShopName
        //         }
        //     }
        //     post({
        //         url: fromType == 0 ? '/hcapi/Address/EditCustomerAddress' : '/hcapi/Address/EditShopAddress',
        //         data,
        //     }).then(res => {
        //         if (res.State == 1) {
        //             msg(res.Msg)
        //             if (addressId) {//修改地址删除缓存
        //                 Taro.removeStorageSync('editAddress')
        //             }

        //             if (fromType == 1 && data.IsDefault) {
        //                 Taro.removeStorageSync('myAddr');
        //             }

        //             Taro.navigateBack({
        //                 delta: 1
        //             })
        //         }
        //     }).catch(err => {
        //         msg(err.Msg)
        //     })
        // }, 20)
    }

    inputChange(key, e) {
        let { addressInfo } = this.state;
        addressInfo[key] = e.detail.value;
        this.setState({ addressInfo });
    }

    changeAddr = e => {
        let { addressInfo } = this.state;
        addressInfo.province = e.detail.value[0];
        addressInfo.city = e.detail.value[1];
        addressInfo.district = e.detail.value[2];
        this.setState({addressInfo});
    }

    saveAddr = () => {
        Taro.$http.post(api.addAddr, this.state.addressInfo).then(res => {
            if(res.code === 200) {
                setTimeout(() => {
                    Taro.navigateBack({
                        delta: 1
                    })
                }, 1000);

                Taro.showToast({
                    title: "添加成功",
                    duration: 1000,
                    icon: "none"
                })
            }
        });
    }

    render() {
        let { addressInfo, title, fromType, isBlock, selectText, selectShop, pickerIndex, pickerList, pickerIdList, pickerId } = this.state;
        return (
            <View className='add_addr'>

                <View className="address_info">
                    <View className="address_info_options flex_middle hairline-bottom">
                        <View className="iconfont iconziyuan"></View>
                        <Input className="options_input"
                            type='text'
                            placeholder="请填写收货人姓名"
                            placeholderClass="placeholderColor_big"
                            maxLength="5"
                            value={addressInfo.receiver}
                            onInput={this.inputChange.bind(this, "receiver")}
                        />
                        {/* <View className="iconfont iconziyuan"></View> */}
                    </View>
                    <View className="address_info_options flex_middle hairline-bottom">
                        <View className="iconfont iconziyuan1"></View>
                        <Input className="options_input"
                            type='number'
                            placeholder="请填写手机号"
                            placeholderClass="placeholderColor_big"
                            maxLength="11"
                            value={addressInfo.mobile}
                            onInput={this.inputChange.bind(this, "mobile")}
                        />
                    </View>
                    <View className="address_info_options flex_middle hairline-bottom">
                        <View className="iconfont iconziyuan2"></View>

                        <Picker className="options_picker flex_1" mode='region' onChange={this.changeAddr}>
                            <View className='picker'>
                                {
                                    addressInfo.province ? `当前选择：${addressInfo.province}-${addressInfo.city}-${addressInfo.district}` : "请选择收货地址"
                                }
                            </View>
                        </Picker>

                        <View className="iconfont iconarrow-down"></View>
                    </View>
                    <View className="address_info_options flex_middle">
                        <View className="iconfont iconxiangxidizhi"></View>
                        <Input className="options_input"
                            type='text'
                            placeholder='详细地址'
                            placeholderClass="placeholderColor_big"
                            maxLength="30"
                            value={addressInfo.detail}
                            onInput={this.inputChange.bind(this, "detail")}
                        />
                    </View>
                </View>
                <View className="bottom_btn">
                    <Button onClick={this.saveAddr} className="button_save" hoverClass="none">保存</Button>
                </View>
            </View>
        )
    }
}

export default Index

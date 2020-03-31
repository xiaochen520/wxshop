import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Switch, Picker, Textarea } from '@tarojs/components'
import classNames from 'classnames'
import './index.less'
import {
    rightArrow,
} from '@/static/address';
import {
    nameIcon,
    telIcon,
    posIcon,
    tabletIcon,
    floorIcon,
    shopIcon,
} from '@/static/add-address'

import { post, get, msg } from '@/utils/index'
import { authPhone } from '@/utils/validate'
import NavBar from '@/components/nav-bar'
import RegionList from '@/components/region-list'

class Index extends Component {
    constructor(props) {
        super(props)
        let { fromType, addressId } = this.$router.params;
        this.setState({
            title: fromType == 0 ? `${addressId ? '编辑' : '新增'}客户地址` : `${addressId ? '编辑' : '新增'}我的地址`,
            fromType: fromType || 0,
            addressId: addressId || 0,
        })
    }
    config = {
        navigationBarTitleText: '',
        navigationBarTextStyle: 'black',
        navigationBarBackgroundColor: '#fff',
        navigationStyle: 'custom'
    }
    state = {
        addressInfo: {
            Id: 0,//地址id
            MarketRegionId: 0,//区域编号 
            LinkMan: '',
            LinkPhone: '',
            AddressNote: '',//地址备注
            HouseNum: '',//门牌号
            ShopName: '',//店铺名字
            IsDefault: 1,//是否默认
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
        let { fromType, addressId } = this.$router.params;
        if (addressId) {//修改地址
            if (fromType == 0) {
                let { AddressNote, Id, ReceiverName, ReceiverPhone, RegionalismId, RegionalismName } = Taro.getStorageSync('editAddress') || {};
                this.setState({
                    addressInfo: Object.assign({}, ...this.state.addressInfo, {
                        Id,
                        MarketRegionId: RegionalismId,
                        AddressNote,
                        LinkMan: ReceiverName,
                        LinkPhone: ReceiverPhone
                    }),
                    selectText: RegionalismName.replace(/\(\$\)|@@/g, ' ')
                }, _ => {
                    // console.log(this.state.addressInfo)
                })
            } else {
                let { Id, RegionId, LinkName, LinkPhone, IsDefault, ShopName, HouseNum, Address } = Taro.getStorageSync('editAddress') || {};
                this.setState({
                    addressInfo: Object.assign({}, ...this.state.addressInfo, {
                        Id,
                        MarketRegionId: RegionId,
                        LinkMan: LinkName,
                        LinkPhone,
                        IsDefault,
                        HouseNum,
                        ShopName
                    }),
                    selectText: Address.split('($)')[1].replace(/\(\$\)|@@/g, ' '),
                    selectShop: Address.split('($)')[0]
                }, _ => {
                    // console.log(this.state.addressInfo)
                })
            }

        } else {
            Taro.removeStorageSync('address')
        }
    }
    // onReady
    componentDidMount() { }
    // onShow
    componentDidShow() {
        if (this.state.fromType == 1) {
            this.getMarkets()
        }
    }
    // onHide
    componentDidHide() { }
    // onUnload
    componentWillUnmount() {
        Taro.removeStorageSync('address')
    }
    handleInfo(type, e) {
        let { value } = e.detail;
        let { addressInfo } = this.state;
        switch (type) {
            case 1:
                this.setState({
                    addressInfo: Object.assign({}, addressInfo, { LinkMan: value })
                })
                break;
            case 2:
                this.setState({
                    addressInfo: Object.assign({}, addressInfo, { LinkPhone: value })
                })
                break;
            case 3:
                this.setState({
                    addressInfo: Object.assign({}, addressInfo, { AddressNote: value })
                })
                break;
            case 4:
                this.setState({
                    addressInfo: Object.assign({}, addressInfo, { HouseNum: value })
                })
                break;
            case 5:
                this.setState({
                    addressInfo: Object.assign({}, addressInfo, { ShopName: value })
                })
        }
    }
    handleAddress() {
        let { addressInfo } = this.state;
        // console.log(addressInfo)
        this.setState({
            addressInfo: Object.assign({}, addressInfo, { IsDefault: addressInfo.IsDefault == 0 ? 1 : 0 })
        })
    }
    handleSave() {
        //fromType 0 客户 1我的
        setTimeout(_ => {//解决state更新问题
            let { addressInfo, fromType, selectText, addressId } = this.state;
            if (!addressInfo.LinkMan) {
                msg(`请填写${fromType == 0 ? '收货人' : ''}姓名`)
                return;
            }
            if (!authPhone(addressInfo.LinkPhone)) {
                return;
            }
            if (!selectText) {
                msg(`请选择${fromType == 0 ? '收货' : '店铺'}地址`)
                return;
            }
            if (fromType == 0) {
                if (!addressInfo.AddressNote) {
                    msg('请输入详细地址')
                    return;
                }
            }
            if (fromType == 1) {
                if (!addressInfo.HouseNum) {
                    msg('请输入店铺门牌号')
                    return;
                }
                if (!addressInfo.ShopName) {
                    msg('请输入店铺名称')
                    return;
                }
            }
            console.log(addressInfo)
            let data;
            let { MarketRegionId, AddressNote, LinkMan, LinkPhone, IsDefault, HouseNum, ShopName, Id } = addressInfo;
            if (fromType == 0) {
                data = {
                    Id,
                    RegionalismId: MarketRegionId,
                    AddressNote,
                    ReceiverName: LinkMan,
                    ReceiverPhone: LinkPhone
                }
            } else {
                data = {
                    Id,
                    MarketRegionId,
                    LinkMan,
                    LinkPhone,
                    IsDefault,
                    HouseNum,
                    ShopName
                }
            }
            post({
                url: fromType == 0 ? '/hcapi/Address/EditCustomerAddress' : '/hcapi/Address/EditShopAddress',
                data,
            }).then(res => {
                if (res.State == 1) {
                    msg(res.Msg)
                    if (addressId) {//修改地址删除缓存
                        Taro.removeStorageSync('editAddress')
                    }

                    if (fromType == 1 && data.IsDefault) {
                        Taro.removeStorageSync('myAddr');
                    }

                    Taro.navigateBack({
                        delta: 1
                    })
                }
            }).catch(err => {
                msg(err.Msg)
            })
        }, 20)
    }
    handleGoBack() {
        let { addressId } = this.$router.params;
        Taro.showModal({
            title: '',
            content: `确定要放弃该地址的${addressId ? '编辑' : '添加'}吗？`,
            cancelText: `放弃${addressId ? '编辑' : '添加'}`,
            cancelColor: '#333',
            confirmText: `继续${addressId ? '编辑' : '添加'}`,
            confirmColor: '#FF8B03',
        }).then(res => {
            let { confirm, cancel } = res;
            if (confirm) {//确认

            }
            if (cancel) {
                Taro.navigateBack({
                    delta: 1
                })
            }
        })

    }
    handleSelect = (e) => {

        this.setState({
            isBlock: !this.state.isBlock
        }, _ => {
            if (e) {
                let { id, text } = e;
                this.setState({
                    addressInfo: { ...this.state.addressInfo, MarketRegionId: id },
                    selectText: text
                })
            }
        })
    }
    handleShop(e) {
        let { value } = e.detail;
        this.setState({
            pickerIndex: Number(value),
            pickerId: Number(value),
            selectShop: this.state.pickerList[Number(value)]
        })
    }
    getMarkets() {
        get({
            url: '/hcapi/BaseService/GetMarkets'
        }).then(res => {
            this.setState({
                pickerList: res.Body.length ? res.Body.map(e => e.Name) : [],
                pickerIdList: res.Body.length ? res.Body.map(e => e.Id) : [],
            })
        })
    }
    render() {
        let { addressInfo, title, fromType, isBlock, selectText, selectShop, pickerIndex, pickerList, pickerIdList, pickerId } = this.state;
        return (
            <View className='index'>
                <NavBar title={title} onGoBackClick={this.handleGoBack.bind(this)} toBack={false}></NavBar>
                <View className="address_info">
                    <View className="address_info_options hairline-bottom">
                        <Image src={nameIcon} />
                        <Input className="options_input"
                            type='text'
                            placeholder={`请填写${fromType == 0 ? '收货人' : ''}姓名`}
                            placeholderClass="placeholderColor_big"
                            maxLength="5"
                            value={addressInfo.LinkMan}
                            onInput={this.handleInfo.bind(this, 1)}
                        />
                    </View>
                    <View className="address_info_options hairline-bottom">
                        <Image src={telIcon} />
                        <Input className="options_input"
                            type='number'
                            placeholder={`请填写${fromType == 0 ? '收货人' : ''}手机号`}
                            placeholderClass="placeholderColor_big"
                            maxLength="11"
                            value={addressInfo.LinkPhone}
                            onInput={this.handleInfo.bind(this, 2)}
                        />
                    </View>
                    {fromType == 1 && <View className="address_info_options hairline-bottom">
                        <Image src={floorIcon} />
                        <Picker className="options_picker"
                            mode="selector"
                            value={pickerIndex}
                            range={pickerList}
                            onChange={this.handleShop.bind(this)}>
                            <View className={classNames('picker_text',
                                { 'picker_text__active': selectShop })}
                            >{selectShop ? selectShop : '请选择店铺所在商场'}</View>
                        </Picker>
                        <Image className="address_info_arrow" src={rightArrow} />
                    </View>}
                    {(fromType == 0 || (fromType == 1 && pickerId >= 0)) && <View className="address_info_options hairline-bottom">
                        <Image src={posIcon} />
                        <View className="options_picker"
                            onClick={this.handleSelect.bind(this, 0)}>
                            <View className={classNames('picker_text',
                                { 'picker_text__active': selectText })}
                            >{selectText ? selectText : fromType == 0 ? '请选择收货地址' : '请选择店铺地址'}</View>
                        </View>
                        <Image className="address_info_arrow" src={rightArrow} />
                    </View>}
                    {fromType == 0 && <View className="address_info_options hairline-bottom">
                        <Image src={floorIcon} />
                        <Input className="options_input"
                            type='text'
                            placeholder='详细地址，例1号楼2层201室'
                            placeholderClass="placeholderColor_big"
                            maxLength="30"
                            value={addressInfo.AddressNote}
                            onInput={this.handleInfo.bind(this, 3)}
                        />
                    </View>}
                    {fromType == 1 && <View><View className="address_info_options hairline-bottom">
                        <Image src={tabletIcon} />
                        <Input className="options_input"
                            type='text'
                            placeholder='请填写店铺门牌号'
                            placeholderClass="placeholderColor_big"
                            maxLength="20"
                            value={addressInfo.HouseNum}
                            onInput={this.handleInfo.bind(this, 4)}
                        />
                    </View>
                        <View className="address_info_options hairline-bottom">
                            <Image src={shopIcon} />
                            <Input className="options_input"
                                type='text'
                                placeholder='请填写店铺名称'
                                placeholderClass="placeholderColor_big"
                                maxLength="20"
                                value={addressInfo.ShopName}
                                onInput={this.handleInfo.bind(this, 5)}
                            />
                        </View></View>}
                </View>
                {fromType == 1 && <View className="default_address" onClick={this.handleAddress.bind(this)}>
                    <Text className="default_address__text">设为默认地址</Text>
                    <Switch color="#FF7A07" checked={addressInfo.IsDefault == 0 ? false : true} />
                </View>}
                <View className="bottom_btn">
                    <Button className="button_ele" hoverClass="none" onClick={this.handleSave.bind(this)}>保存</Button>
                </View>
                <RegionList isBlock={isBlock} fromType={fromType} shopId={pickerIdList[pickerId]} onHandleCancel={this.handleSelect}></RegionList>
            </View>
        )
    }
}

export default Index

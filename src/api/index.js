
export default {
    login: "/passport/miniProgramLogin", //登录

    //首页
    carousel: "/index/carousel", //轮播图
    recommends: "/index/recommends", //每日推荐
    hotCategory: "/index/hot-catgorys", //热门分类

    //分类
    catgorys: "/category/subCat/", //分类
    searchByCate: "/category/getItems", //按分类搜索

    //地址
    addrList: "/address/list", //地址列表
    setDefalutAddr: "/address/setDefalut", //设置默认地址
    addAddr: "/address/add", //新增地址
    deleteAddr: "/address/delete",

    //商品
    goodInfo: "/items/info/",
    searchGood: "/items/search", //搜索
    goodComments: "/items/comments", //评论

    //购物车
    shopCar: "/shopcart/get",
    addShopCar: "/shopcart/sync",
    delShopCar: "/shopcart/del", //删除购物车

    //订单
    createOrder: "/orders/create",
    myOrders: "/orders/myOrders", //订单列表
    wxPay: "/payment/getMiniProgramWXPay", //获取微信支付参数
    orderInfo: "/orders/orderInfo", //订单详情
    quickCreate: "/orders/quickCreate", //直接下单

}
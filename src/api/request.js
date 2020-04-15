import Taro from '@tarojs/taro'

function deleteObjKey(obj, arr) {
  arr.forEach(e => {
    delete obj[e];
  });
}

let http = {
  //默认配置项
  extraConfig: ["baseURL", "showLoading"],
  defaults: {
    method: "get",
    baseURL: "",
    showLoading: false
  },
  //拦截器
  interceptors: {
    request: callback => {
      const interceptor = chain => {
        const requestParams = chain.requestParams
        let backParms = callback(requestParams);
        if (backParms) {
          return chain.proceed(callback(requestParams));
        }
      };
      Taro.addInterceptor(interceptor);
    },
    response: function (callback) {
      this.resCallback = callback;
    },
    resCallback: null
  },

  //请求
  request: function (url, parms = {}, option = {}) {
    if (option.showLoading || this.defaults.showLoading) {
      Taro.showLoading({
        mask: true
      });
    }
    let config = Object.assign({}, this.defaults, option, {
      url: this.defaults.baseURL + url,
      data: parms
    });
    deleteObjKey(config, this.extraConfig);

    return new Promise((resolve, reject) => {
      Taro.request(config).then(res => {
        if (option.showLoading || this.defaults.showLoading) {
          Taro.hideLoading();
        }
        let data = this.interceptors.resCallback ? this.interceptors.resCallback(res.data) : res.data;
        return resolve(data);
      }).catch(err => {
        return reject(err);
      });
    });
  },

  //get请求
  get: function (url, parms = {}, option = {}) {
    option = Object.assign(option, {
      method: "get"
    });
    return this.request(url, parms, option);
  },

  //post请求
  post: function (url, parms = {}, option = {}) {
    option = Object.assign(option, {
      method: "post"
    });
    return this.request(url, parms, option);
  },

  //发多个请求
  all: function (reqArr) {
    let arr = new Array(reqArr.length);

    return new Promise((resolve, reject) => {
      for (let i = 0; i < reqArr.length; i++) {
        reqArr[i].then(res => {
          arr[i] = res;
          if (arr.findIndex(e => !e) < 0) {
            resolve(arr);
          }
        }).catch(err => {
          reject(err);
        });
      }
    });
  }
};

export default http;

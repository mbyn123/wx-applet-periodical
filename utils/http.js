import {
  config
} from "../config.js"

const tips = {
  1002: "找不到资源",
  1005: "不正确的开发者key",
  3000: "该期内容不存在",
  1: '抱歉出现了一个错误'
}

//封装http请求函数
class HTTP {
  request(params) {
    if (!params.methods) {
      params.methods = "GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith("2")) {
          //没有传success参数时该如何执行
        params.success &&  params.success(res.data)
        } else {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        this._show_error(1)
      }
    })
  }

  //错误提示信息
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip=tips[error_code]
    wx.showToast({
      title:tip?tip:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}
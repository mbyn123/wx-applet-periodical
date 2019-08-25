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
  //使用promis的方法调用函数
  request({ url, data = {},  method = "GET"}) {//设置method,data的默认值
   return new Promise((resolve,reject)=>{
     this._request(url, resolve, reject, method, data)
   }) 
}      //传入project中的resolve和reject变量
  _request(url,resolve,reject,method="GET",data={}) {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data:data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith("2")) {
          resolve(res.data)//处理成功状态时使用resolve
        } else {
          reject() //处理失败的时候使用reject
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject() // 处理失败的时候使用reject
        this._show_error(1)
      }
    })
  }

  //错误提示信息
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
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
import {
  HTTP
} from '../utils/http.js'
//请求classic页面最新一期的数据
class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        callback(res)
        this._setclassicindex(res.index)
        let key = this._getkey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }

  //发送请求获取上一期,下一期的数据
  getclassic(index, ss, callback) {
    //将获取的数据写入本地缓存
    let key = ss == "next" ? this._getkey(index + 1) : this._getkey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: "classic/" + index + "/" + ss,
        success: (res) => {
          callback(res)
          wx.setStorageSync(this._getkey(res.index), res)
        }
      })
    } else {
      callback(classic)
    }
  }

  //获取喜欢的期刊
  getMyLikePeriodical(success) {
    this.request({
      url: 'classic/favor',
      success: success
    })
  }
  //获取某一期期刊
  getByID(type,cid,success) {
   this.request({
     url:`classic/${type}/${cid}`,
     success:success
   })
  }
  isFirst(index) {
    return index == 1 ? true : false
  }
  isLast(index) {
    let lastindex = this._getclassicindex()
    return lastindex == index ? true : false
  }
  //将最新一期页面的数据的index 存入缓存
  _setclassicindex(index) {
    wx.setStorageSync('lastindex', index)
  }
  //获取 缓存
  _getclassicindex() {
    let index = wx.getStorageSync("lastindex")
    return index
  }

  //设值写入缓存的值
  _getkey(index) {
    let key = 'classic-' + index
    return key
  }












  // //请求classic页面上一期的数据
  // getlast(index, ss,callback) {
  //   this.request({
  //     url: "classic/" + index + "/" + ss,
  //     success: (res) => {
  //       callback(res)
  //     }
  //   })
  // }
  // //请求classic页面下一期的数据
  // getnext(index,ss,callback) {
  //   this.request({
  //     url: "classic/" + index + "/"+ss,
  //     success: (res) => {
  //       callback(res)
  //     }
  //   })
  // }


}


export {
  ClassicModel
}
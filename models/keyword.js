import {
  HTTP
} from "../utils/http-p.js"

class KeywordModel extends HTTP{

  //获取缓存的搜索记录
  key = 'q'
  maxLength = 10
  gethistory() {
    const word = wx.getStorageSync(this.key)
    //判断缓存是否存在 确保缓存数据结构为数组
    if (!word) {
      return []
    }
    return word
  }

  //热门搜索 请求获取数据
  gethot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }

  //将搜索关键字写入缓存
  getaddhistory(keyword) {
    //获取缓存历史记录
    let word = this.gethistory()
    //判断输入的关键字是否已存在
    const has = word.includes(keyword)
    if (!has) { //不存在加入缓存数组
      //限制缓存数组长度 超过 删除末尾
      const length = word.length
      if (length >= this.maxLength) {
        word.pop()
      }
      word.unshift(keyword)
      wx.setStorageSync(this.key, word)
    }
  }
}

export {
  KeywordModel
}
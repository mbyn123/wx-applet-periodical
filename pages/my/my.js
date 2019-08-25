// pages/my/my.js

import {
  ClassicModel
} from "../../models/classic.js"

import {
  BookModel
} from "../../models/book.js"

let classicModel = new ClassicModel()
let bookModel = new BookModel
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classic:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    //获取用户是否已授权,记录授权状态
    userAuthorized: {
      wx.getSetting({
        success: data => {
          if (data.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: data => {
                this.setData({
                  authorized: true,
                  userInfo: data.userInfo
                })
              }
            })
          }
        }
      })
    }
    //获取喜欢书籍的数量
    getmybookcount:{
      bookModel.getMyBookCount()
        .then(res => {
          this.setData({
            bookCount: res.count
          })
        })
    }
    //获取已喜欢的期刊
    classicModel.getMyLikePeriodical(res=>{
      this.setData({
         classic:res
      })
    })
  },

  //点击获取用户信息
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        authorized: true
      })
    }
  

  },
  //跳转到期刊详情界面
  onclassicDetail(event) {
   const cid=event.detail.cid
   const type=event.detail.type
    console.log(cid,type)
   wx.navigateTo({
     url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`,
   })
  }

})
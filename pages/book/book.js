// pages/book/book.js

import {
  BookModel
} from "../../models/book.js"

import {random} from "../../utils/common.js"

let bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: ''//数据绑定变量more 传递给search组件
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    bookModel.getHostlist()
      .then(res => {
        this.setData({
          books: res
        })
      })
  },

  //触底加载更多 给search组件传值 more
  onReachBottom() {
    this.setData({
      more: random(16)//随机生成16位字符串
    })
  },

  onshowSearch() {
    this.setData({
      searching: true
    })
  },

  onCancel() {
    this.setData({
      searching: false
    })
  },



  // onLoad: function(options) {
  //   API调用嵌套 链式调用 发送多个请求 回调地狱
  //   const hostlist = bookModel.getHostlist()
  //   hostlist.then(res => {
  //     console.log(res)
  //     bookModel.getMyBooklist()
  //       .then(res => {
  //         console.log(res)
  //         bookModel.getMyBooklist()
  //           .then(res => {
  //             console.log(res)
  //           })
  //       })
  //   })
  // },

  //使用promise发送请求 平行发送请求 不嵌套
  // onLoad(options){
  //  bookModel.getHostlist()
  //  .then(res=>{
  //    console.log(res)//在发送完上一个请求后
  //    return bookModel.getMyBooklist()//使用retrun调用下一个请求方法
  //  })
  //  .then(res=>{
  //    console.log(res)//在发送完上一个请求后
  //    return bookModel.getMyBooklist()//使用retrun调用下一个请求方法
  //  })
  //  .then(res=>{
  //    console.log(res)
  //  })
  // }


})
// pages/book-detail/book-detail.js
import {
  BookModel
} from "../../models/book.js"
import {
  LikeModel
} from "../../models/like.js"
let bookmodel = new BookModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    likecount: 0,
    likestates: false,
    bookdetail: null,
    comments: [],
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //发送请求 获取本页数据
  onLoad: function(options) {
     wx.showLoading()
    const bid = options.bid
    const like = bookmodel.getDetailLike(bid)
    const detail = bookmodel.getDetail(bid)
    const comments = bookmodel.getDetailComment(bid)
    //promise all 当所有请求都完成后才执行 .then回调函数
    //promise race 子请求中率先完成的请求的 执行它的回调函数
    Promise.all([like, detail, comments])
    .then(res => {
      this.setData({
        likecount: res[0].fav_nums,
        likestates: res[0].like_status,
        bookdetail: res[1],
        comments: res[2].comments
      })
      wx.hideLoading()
    })

    //   //点赞数据
    //   like.then(res => {
    //     console.log(res)
    //     this.setData({
    //       likestates: res.like_status,
    //       likecount: res.fav_nums
    //     })
    //     console.log(this.data.likestates)
    //   })
    //   //书籍详情数据
    //   detail.then(res => {
    //     console.log(res)
    //     this.setData({
    //       bookdetail: res
    //     })
    //   })
    //   //短评数据
    //   comments.then(res => {
    //     console.log(res)
    //     this.setData({
    //       comments: res.comments
    //     })
    //   })
  },

  onshow() {
    this.setData({
      posting: true
    })
  },
  oncancel() {
    this.setData({
      posting: false
    })
  },

  //书籍点赞
  onlike(event) {
    const like_or_cancel = event.detail.state
    likeModel.like(like_or_cancel, this.data.bookdetail.id, 400)
  },

  //点击标签 输入 提交评论
  onPost(event) {
    wx.showLoading()
    const comment = event.detail.text || event.detail.value
    if (!comment) { //判断输入是否为空
      return
    }
    if (comment.length > 12) { //限制用户输入文本长度
      wx.showToast({
        title: '短评最多十二个字',
        icon: "none"
      })
      return //使用return停止请求
    }
    //向服务器发送短评内容
    bookmodel.postcomment(this.data.bookdetail.id, comment)
      .then(res => {
        wx.showToast({ //成功提示
          title: '+1',
          icon: "none"
        })
        //向短评内容数组,添加新增的端平内容
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        //更新短评数组内容
        this.setData({
          comments: this.data.comments,
          posting: false
        })
        wx.hideLoading()
      })

  }
})
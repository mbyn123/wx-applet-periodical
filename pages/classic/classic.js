// pages/classic/classic.js

import {
  ClassicModel
} from "../../models/classic.js"
import {
  LikeModel
} from "../../models/like.js"
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Component({
  properties: {
    cid: Number,
    type: Number
  },
  data: {
    classic: null,
    last: true,
    first: false,
    likecount: 0,
    likestates: false
  },

  /**
   * 生命周期函数--监听页面加载
   */

  //加载当前页面的数据
  attached: function(options) {
    const cid=this.properties.cid
    const type=this.properties.type
    if(!cid){
      classicModel.getLatest((res) => {
        this.setData({
          classic: res,
          likecount: res.fav_nums,
          likestates: res.like_status
        })
      })
    }else{
      classicModel.getByID(type,cid,res=>{
        this.getlikestates(res.id,res.type)
        this.setData({
          classic:res,
          last: classicModel.isLast(res.index),
          first: classicModel.isFirst(res.index)
        })
      })
    }
   

  },

  methods:{
  //点赞
  onlike(event) {
    let state = event.detail.state
    likeModel.like(state, this.data.classic.id, this.data.classic.type)
  },

  //获取下一期数据 更新当前页面数据
  onNext(event) {
    this.getclassic('next')
  },
  //获取上一期数据 更新当前页面数据
  onLast(event) {
    this.getclassic("previous")
  },
  //封装获取上下期数据的方法
  getclassic(ss) {
    let index = this.data.classic.index
    classicModel.getclassic(index, ss, (res) => {
      //调用独立更新like组件的状态的方法
      this.getlikestates(res.id, res.type)
      this.setData({
        classic: res,
        last: classicModel.isLast(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },
  //独立更新like组件的状态
  getlikestates(artID, category) {
    likeModel.getlike(artID, category, (res) => {
      this.setData({
        likecount: res.fav_nums,
        likestates: res.like_status
      })
    })
  },
  }
})
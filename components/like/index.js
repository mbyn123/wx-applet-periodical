// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean
    },
    count:{
      type:Number
    },
    readOnly:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeimg: "/images/icon/like.png",
    nolikeimg: "/images/icon/nolike.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onlike(event) {
      //禁止like 组件点击
      if(this.properties.readOnly){
        return
      }
     let like=this.properties.like
     let count=this.properties.count
     count = like?count-1:count+1
     this.setData({
       like:!like,
       count:count
     })
      //激活自定义事件
      let state = this.properties.like ? "like" : "cancel"
      this.triggerEvent('like', {state:state}, {})
    }
   
  }
})

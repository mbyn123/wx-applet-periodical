// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {//使用插槽要使用multipleSlots:true
    multipleSlots: true
  },
  properties: {
    openType:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
  getUserInfo(event){
    this.triggerEvent('getUserInfo',event.detail,{})
  }
  }
})

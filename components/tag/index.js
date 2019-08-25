// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  options: {//使用插槽要使用multipleSlots:true
    multipleSlots:true
  },
  properties: {
   text:String
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
  //监听事件 发送tag标签文本内容  
  ontag(event){
    this.triggerEvent('tapping',{
      text:this.properties.text
    },{})
  }
  }
})

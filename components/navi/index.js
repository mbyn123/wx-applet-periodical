// components/classic/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    last:Boolean,
    first:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    distleftimg: "images/triangle.dis@left.png",
    leftimg: "images/triangle@left.png",
    distrightimg: "images/triangle.dis@right.png",
    rightimg: "images/triangle@right.png"

  },

  /**
   * 组件的方法列表
   */
  methods: {

    onLeft(event){
      if (!this.properties.last) {//判断是否是最新一期,否则不执行
        this.triggerEvent('left', {}, {})
      }
    },
    onRight(event){
      if (!this.properties.first) {//判断是否是最后一期,否则不执行
        this.triggerEvent('right', {}, {})
      }
      
    }
  }
})
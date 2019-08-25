// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from "../../models/book.js"
import {
  pagination
} from "../behaviors/pagination.js"
let keywordmodel = new KeywordModel()
let bookmodel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [pagination],
  properties: {
    more: { //接收BOOK 传递的值more
      type: String,
      observer: 'loadMore' //监听用户下拉触底行为 响应 执行加载更多方法 loadmore
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWord: [],
    hotword: [],
    // dataArray:[],
    searching: false,
    value: '',
    loading: false,
    loadingCentergShow:false,
    loadingShow:false,
    noneResult:false,
    show:false
  },

  //组件生命周期 页面初始化
  attached() {
    const historyWord = keywordmodel.gethistory()
    this.setData({
      historyWord: historyWord
    })
    keywordmodel.gethot()
      .then(res => {
        this.setData({
          hotword: res.hot
        })
      })
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 滑动触底加载更多数据
    loadMore() {
      //定义input输入框的值
      const keys = this.data.value
      //搜索关键字为空 不执行请求
      if (!keys) {
        return
      }
      //使用锁防止数据重复加载  变量loading为true时不执行
      if (this.data.loading) {
        return
      }
      this.setData({
        loadingShow: true
      })
      //调用behavior 里面封装的方法 hasMore() 判断是否还发送请求
      if (this.hasMore()) { 
        //请求后锁loading的状态为true
        this.data.loading = true 
        //调用behavior 里面封装的方法 getArrayLength() 获取请求初始记录数值
        bookmodel.getSearchBook(this.getArrayLength(), keys)
          .then(res => {
            //调用behavior 里面封装的方法   合并请求的数据数组
            this.setMoreData(res.books)
            this.data.loading = false
            this.setData({
              loadingShow: false
            })
          }, () => {//请求失败 调用函数 锁loading的状态为false
            this.data.loading  =false
          })
       
      }

    },

    //输入搜索 点击标签搜索
    onConfirm(event) {
  
      this.setData({
        loadingCentergShow:true
      })
      const key = event.detail.value || event.detail.text
      this.setData({
        searching: true
      })
      bookmodel.getSearchBook(0, key)
        .then(res => {
          //调用behavior 里面封装的方法 进行数据绑定
          this.setMoreData(res.books)
          this.setToatl(res.total)
          this.setData({
            value: key
          })
          this.setData({
            loadingCentergShow: false
          })
          //搜索成功 才加入缓存
          keywordmodel.getaddhistory(key)

        })
    },

    //取消 退出搜索页
    onCancel(event) {
      this.triggerEvent('search', {}, {})
      //调用behavior 里面封装的方法 清空页面数据 初始化
      this.emptyData()
      this.setData({
        show: false
      })
    },

    //点击 x 取消当前搜索
    onDelet(event) {
      const comment = event.detail.value
      this.setData({
        searching: false,
        value: '',
        show: false
      })
      //调用behavior 里面封装的方法 清空页面数据 初始化
      this.emptyData()
    },


  }
})
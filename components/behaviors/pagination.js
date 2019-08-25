//定义公共 加载更多数据分页 的方法

const pagination = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult:false,
    loadingShow:false,
    show:false
  },
  methods: {
    //合并请求数组
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    //获取数组长度
    getArrayLength() {
      return this.data.dataArray.length
    },

    //获取请求数据数组的数量
    setToatl(total) {
      this.data.total = total
      if(this.data.total==0){
        this.setData({
          noneResult:true,
          
        })
      }
    },

    //判断是否加载更多数据
    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        this.setData({
          loadingShow: false,
           show: true
        })
        return false
      } else {
        return true
      }
     
    },

    //恢复页面初始值 清空数据 
    emptyData(){
      this.setData({
       dataArray :[],
       noneResult:false
      })
      
      this.data.total = null
    }
  }
})
export {
  pagination
}
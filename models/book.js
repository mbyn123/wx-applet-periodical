import {
  HTTP
} from "../utils/http-p.js"

class BookModel extends HTTP {
  //获取精选书籍数据
  getHostlist() {
    return this.request({
      url: 'book/hot_list',
      // method:'',
      // data:{
      //   xx:xx,
      //   xx:xx
      // }
    })
  }

  //获取书籍点赞数据
  getDetailLike(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

 //获取短评内容
  getDetailComment(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

 //获取书籍详情
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

 // 提交新增短评内容
  postcomment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

//获取搜索书籍数据
getSearchBook(start,q){
  return this.request({
    url:'book/search?summary=1',
    data:{
      q:q,
      start:start
    }
  })
}

//获取我喜欢的书籍数量
 getMyBookCount(){
   return this.request({
     url:"/book/favor/count"
   })
 }

  // 多个API调用 请求
  // getMyBooklist(){
  //   return this.request({
  //     url: 'book/favor/count'
  //   })
  // }

  // gethotbook(){
  //   return this.request({
  //     url: 'book/favor/count'
  //   })
  // }
}

export {
  BookModel
}
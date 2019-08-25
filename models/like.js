import {  HTTP } from "../utils/http.js"

//点赞组件，给服务器发送数据，修改点赞数据
class LikeModel extends HTTP {
like(state, artID, category) {
    let url = state == 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method:'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }
  //独立更新like组件的状态
  getlike(artID, category,callback) {
    this.request({
      // url: 'classic/' + category + '/' + artID+'/favor',
      url: `classic/${category}/${artID}/favor`,
      success:callback
    })
  }
}



export {
  LikeModel
}
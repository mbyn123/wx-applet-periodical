// components/classic/music/index.js.js
import {classicBeh} from "../behavior.js"

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
   src:String,
   title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playimg:false,
    play:"images/player@play.png",
    pause:"images/player@pause.png"
  },

 //切换页面时,在组件生命周期中执行监听音乐播放控制的方法
  attached(){
    this._musicState()
    this._monitorSwitch()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击播放 暂停
   onplay(){
     if(!this.data.playimg){
       this.setData({
         playimg: true
       })
       mMgr.src = this.properties.src
       mMgr.title = this.properties.title
     }else{
       this.setData({
         playimg: false
       })
       mMgr.pause()
     }
   },

 //监听音乐播放状态,控制播放图片
  _musicState(){
    if(mMgr.paused){
      this.setData({
        playimg:false
      })
      return
    }
    if (mMgr.src == this.properties.src){
      this.setData({
        playimg:true
      })
    }
  },

//监听总控开关,来控制音乐播放图片
_monitorSwitch(){
  mMgr.onPlay(()=>{
    this._musicState()
  })
  mMgr.onPause(() => {
    this._musicState()
  })
  mMgr.onStop(() => {
    this._musicState()
  })
  mMgr.onEnded(() => {
    this._musicState()
  })
}

   
  }
})

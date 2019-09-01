# 微信小程序 旧岛期刊

## 项目说明

* 基于微信小程序开发的一款阅读搜索程序
* 基于微信小程序原生框架 Es6 lin-ui组件库开发
* 项目以组件化思想实现,对各功能进行单独封装引用

## 功能

- [x] 电影/美文阅读
- [x] 在线音乐播放
- [x] 书籍详情简介
- [x] 书籍搜索
- [x] 点赞收藏
- [x] 在线点评

## 项目预览

![](https://graph.baidu.com/resource/11125b57f1b9d4c9d170501567328292.jpg)

![](https://graph.baidu.com/resource/1113b17f6ba54c7e32a1d01567328319.jpg)

![](https://graph.baidu.com/resource/111c5f08ed43c2d21806f01567328343.jpg)

![](https://graph.baidu.com/resource/111c38070e01215b0132101567329149.jpg)

![](https://graph.baidu.com/resource/111e9bc5bc750c034e5bb01567329121.jpg)

![](https://graph.baidu.com/resource/111b7fde602835860fa8d01567329191.jpg)


![](https://graph.baidu.com/resource/11137b5c8955c00b3c4ea01567328256.jpg)

![](https://s2.ax1x.com/2019/09/01/npBDOJ.jpg)

![](https://graph.baidu.com/resource/111e8498fe4cc87dae34701567330336.jpg)


![](https://graph.baidu.com/resource/111eee2d7b2c2b01cbb0501567330621.jpg)

![](https://graph.baidu.com/resource/1113eed2dbc9c35642cea01567330648.jpg)


![](https://graph.baidu.com/resource/111eea92de2e8a73ccb2e01567328221.jpg)



目录结构:

     components/                  #功能组件文件
       |-behaviors/               # 组件公用功能
       |- book/                   # 图书组件
       |- classic/                # 流行期刊页内容
         |-essay                  #  句子
         |-movie                  #  电影
         |-music                  #  音乐
         |-behavior.js            # 流行页公用功能
         |-common.wxss            # 流行页公用样式
       |-epsoide/                 # 日期组件
       |-like/                    # 点赞组件
       |-loading/                 # 过渡动画
       |-mask/                    # 遮罩样式
       |-navi/                    # 流行页导航切换
       |-preview/                 # 收藏期刊的标签与点赞
       |-search/                  # 书籍搜索组件
       |-tag/                     # 短评标签组件
    |-images/                        # 本地图片
    |-miniprogram_npm                 
      |-lin-ui                    # lin-ui组件库
    |-models/                     # 请求
       |- book.js                 # 书籍数据请求api
       |- classic.js              # 流行数据请求api
       |- keyword.js              # 历史/热门搜索api
       
    |-pages/                      # 小程序页面相关文件
      |- book                     # 书籍页
      |- book-detail              # 书籍详情
      |- classic                  # 流行页
      |- classic-detail           # 收藏流行页详情
      |- my                       # 我的页面
      
    |-utils                       # 请求方法封装
      |-common.js                 # 下滑获取更多图书数据触发方法
      |-filter.wxs                # 文本换行方法
      |-http-p.js                 # promise请求方法封装
    |-app.js                      # 小程序逻辑
    |-app.json                    #  小程序公共设置
    |-app.wxss                    # 小程序公共样式表
    |-config.js                   # 请求api公用url

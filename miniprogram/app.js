//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'talkbot-56sn5',
        traceUser: true,
      })
    }

    this.globalData = {}
  },
  globalData: {

    appstyleColor: '#0D7DA1',
    parameter : null,
    CurrentCourseObj:{}, // 当前选择的课程对象
    CurrentChapter:{}// 当前选择的章节对象
  },
})

     // {
      //   "selectedIconPath": "images/button/talk2.png",
      //   "iconPath": "images/button/talk1.png",
      //   "pagePath": "pages/train/train",
      //   "text": "小铭"
      // },

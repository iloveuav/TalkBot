//app.js
// npm install lottie-miniprogram
// var F6;
// var TreeGraph;

import 'weapp-cookie'
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
        env: 'bot-cloud1-7g30ztcr37ed0193',
        traceUser: true,
      })
    }
    console.log('APP la')
    // const antv = require('../../subpages/utils/@antv/')
    // import F6 from '../../subpages/utils/@antv/f6-wx';
    //  F6 = require('../miniprogram/subpages/utils/@antv/f6-wx')
    // import TreeGraph from '@antv/f6-wx/extends/graph/treeGraph';
    //  TreeGraph = require('../miniprogram/subpages/utils/@antv/f6-wx/extends/graph/treeGraph')

  },
  globalData: {

    appstyleColor: '#0D7DA1',
    parameter: null,

    //AKID和AKKEY不能上传到git否则会有泄露风险
    AKID: 'LTAI5tR6UJwz3PCPhjvxMfBM',
    AKKEY: 'E7LVH7kg22FcLXHHfSBBBi5oBRhzF3',
    CEAPPKEY: 'vZGa4IgAxYBX3TUQ',
    JPAPPKEY: 'r4dw1Se1lf9NFYvl',
    URL: "wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1",


    CurrentCourseObj: {}, // 当前选择的课程对象
    CurrentChapter: {}// 当前选择的章节对象





  },
})

     // {
      //   "selectedIconPath": "images/button/talk2.png",
      //   "iconPath": "images/button/talk1.png",
      //   "pagePath": "pages/train/train",
      //   "text": "小铭"
      // },

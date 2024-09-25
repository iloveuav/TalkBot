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
        env: 'talkbot-7gji40zbdf69e993',
        // traceUser: true,
      })
    }
    console.log('APP la')
    // const antv = require('../../subpages/utils/@antv/')
    // import F6 from '../../subpages/utils/@antv/f6-wx';
    //  F6 = require('../miniprogram/subpages/utils/@antv/f6-wx')
    // import TreeGraph from '@antv/f6-wx/extends/graph/treeGraph';
    //  TreeGraph = require('../miniprogram/subpages/utils/@antv/f6-wx/extends/graph/treeGraph')

  },

  /**
    * 设置监听器
    */
  setWatcher(data, watch) { // 接收index.js传过来的data对象和watch对象
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
      this.observe(data, v, watch[v]); // 监听data内的v属性，传入watch内对应函数以调用
    })
  },


  /**
     * 监听属性 并执行监听函数
     */
  observe(obj, key, watchFun) {
    var val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        val = value;
        watchFun(value, val); // 赋值(set)时，调用对应函数
      },
      get: function () {
        return val;
      }
    })
  },

  // 原文链接：https://blog.csdn.net/xuyangxinlei/article/details/81408200

  globalData: {

    appstyleColor: '#0D7DA1',
    parameter: null,

    //AKID和AKKEY不能上传到git否则会有泄露风险
    AKID: 'LTAI5tR6UJwz3PCPhjvxMfBM',
    AKKEY: 'E7LVH7kg22FcLXHHfSBBBi5oBRhzF3',
    CEAPPKEY: 'vZGa4IgAxYBX3TUQ',
    JPAPPKEY: 'r4dw1Se1lf9NFYvl',
    URL: "wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1",


    CurrentCourseObj: null, // 当前选择的课程对象
    CurrentChapter: null// 当前选择的章节对象





  },
})

     // {
      //   "selectedIconPath": "images/button/talk2.png",
      //   "iconPath": "images/button/talk1.png",
      //   "pagePath": "pages/train/train",
      //   "text": "小铭"
      // },

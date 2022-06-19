
var app = getApp();
var util = require("../../utils/util.js")
var time = require('../../utils/util.js');
var message = '';
var text = '';
var user = {};
var length;
var zx_info_id;
var openid_talk;

//引入插件：微信同声传译
const plugin = requirePlugin('WechatSI');
//获取全局唯一的语音识别管理器recordRecoManager
const manager = plugin.getRecordRecognitionManager();
// 设置采集声音参数
const options = {
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac'
}

Page({
  data: {
    userInfo: {},
    autoReadingAloud: true, //自动读开关

    news: '',
    scrollTop: 0,
    message: '',
    text: text,
    centendata: [],
    nickName: '',
    avatarUrl: '',
    news_input_val: '',
    tabdata: '',

    // 设置录音状态，按下为true，松开false,默认状态为false
    content: '', //输出内容
    recordState: false, //录音状态
  },
  onLoad: function (options) {

    openid_talk = options.openid_talk;
    zx_info_id = options.zx_info_id;
    console.log(openid_talk)
    //调用应用实例的方法获取全局数据
    this.setData({
      zx_info_id: zx_info_id,
      nickName: app.nickName,
      avatarUrl: app.avatarUrl,
    });
    this.loaddata()
    // this.template();
    this.getunReadcomNum();

    this.initRecord();

    var plugin = requirePlugin("QCloudTBP")
    plugin.SetQCloudSecret("AKIDVmJMEA8cgaKKDxnu0s6C4iBWL0UpnORH", "p4kBcLupY1TkxywgIkRs7LY8Y7Zry0pV") //设置腾讯云账号信息，重要！！


    plugin.GetBots({
      Version: '2019-03-11',
      PageNumber: 1,
      PageSize: 50,
      success: function (data) {
        console.log("获取robot列表成功：", data)
      },
      fail: function (err) {
        console.error("获取robot列表失败：", err)
      }
    })

    // plugin.PostText({

    //   Version: '2019-03-11',
    //   BotId: '3f1d2bd7-f55a-44dd-b4e3-18132281fe48',
    //   BotEnv: "release",
    //   InputText: '我想订机票',
    //   TerminalId: "300180199810091921",
    //   success: function (resData) {
    //     console.log("robot调用成功：", resData)
    //   },
    //   fail: function (err) {
    //     console.error("robot调用失败", err)
    //   }
    // })

    this.template();

  },

  onReady() {
    //创建内部 audio 上下文 InnerAudioContext 对象。
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function (res) {
      // console.log(res);
      wx.showToast({
        title: '语音播放失败',
        icon: 'none',
      })
    })
  },

  onShow: function () {
    this.getunReadcomNum();
  },

  /**
* 生命周期函数--监听页面卸载
*/
  onUnload: function () {
    this.end();
  },

  template: function (e) {
    var data = {
      // program_id: app.jtappid,
      // openid: app._openid,
      // zx_info_id: zx_info_id,
      content: "猜你想问：\n 1、在本小程序发布课程，有什么奖励吗？\n2、课程内容如何才能审核通过？\n 3、可以参考借鉴或者搬运其他人创作的内容上传吗？\n4、访问山村的具体流程？\n5、这个小程序是公益性质的吗？\n 9、随机英语短句 \n回复数字即可",


      // content: "猜你想问：\n 1、食堂的开关门时间？\n2、充饭卡的地点？\n 3、图书馆闭馆时间？\n4、普通话照片怎么上传？\n5、无课表哪里能看？\n 6、澡堂的开关门时间？\n7、选修课除了学习通哪里能看\n8、捐赠衣物\n 9、随机英语短句 \n回复数字即可",


      // openid_talk: openid_talk,
      // time: time.formatTime(new Date, 'Y/M/D'),
      is_show_right: 2,
    }
    this.data.centendata.push(data);
    this.setData({
      centendata: this.data.centendata
    })
  },



  response: function (e) {

    var that = this
    console.log(e.Response.ResponseText);
    var data = {
      program_id: app.jtappid,
      openid: app._openid,
      zx_info_id: zx_info_id,
      content: e.Response.ResponseText,
      openid_talk: openid_talk,
      time: time.formatTime(new Date, 'Y/M/D'),
      is_show_right: 2,
    }

    this.data.centendata.push(data);
    that.setData({
      // news_input_val: '',
      centendata: that.data.centendata
    })
    if (this.data.autoReadingAloud) {
      this.speach(data.content);
    }

    this.bottom();
  },

  speach(e) {
    console.log(e);
    let that = this
    let lto = '';
    let content = '';
    lto = 'en_US';
    // if (this.data.classCollection == 'otherClassContents' || this.data.classCollection == 'JaClassContents') {
    //   lto = 'zh_CN'
    // }
    // lto = 'zh_CN'
    lto = 'en_US';
    if (this.data.autoReadingAloud == true) {
      // console.log(e);
      content = e
      // console.log(e);
      // console.log(lto);
    } else {
      if (e.currentTarget.dataset.content !== undefined && this.data.autoReadingAloud === false) {
        content = e.currentTarget.dataset.content;
        console.log(content)
      }
    }
    // -------------下面是同声传译插件的-----------
    if (content && lto) {
      plugin.textToSpeech({
        lang: lto,
        content: content,
        success: resTrans => {
          console.log(resTrans);
          if (resTrans.retcode == 0) {
            // let tmpTranslate = Object.assign({}, item, {
            autoPlay: true, // 自动播放背景音乐
              that.setData({
                voicePath: resTrans.filename,
              })
            that.yuyinPlay();
          }
          else {
            // console.warn("语音合成失败", resTrans, item)
            console.warn("语音合成失败", resTrans, item)
          }
        },
        fail: function (resTrans) {
          console.warn("语音合成失败")
          wx.showToast({
            title: '取消自动朗读后重试',
            icon: 'none',
          })
        }
      })
    }
  },

  //播放语音
  yuyinPlay: function (e) {
    if (this.data.voicePath == '') {
      // console.log("暂无语音");
      return;
    }
    this.innerAudioContext.src = this.data.voicePath
    this.innerAudioContext.play();
  },

  // 结束语音
  end: function (e) {
    this.innerAudioContext.pause();
  },



  bindChange: function (e) {
    message = e.detail.value
  },

  TakeRandomNumber: function (m, n) {
    return Math.floor(Math.random() * (m - n) + n);
  },
  // TakeRandomNumber(1,100)；

  //事件处理函数
  add: function (e) {
    if (message == "1") {
      message = "食堂的开关门时间？"
    }
    if (message == "2") {
      message = "充饭卡的地点？"
    }
    if (message == "3") {
      message = "图书馆闭馆时间？"
    }
    if (message == "4") {
      message = "普通话照片怎么上传？"
    }
    if (message == "5") {
      message = "无课表哪里能看？"
    }
    if (message == "6") {
      message = "澡堂的开关门时间？"
    }
    if (message == "7") {
      message = "选修课除了学习通哪里能看"
    }
    if (message == "8") {
      message = "捐赠衣物"
    }
    //录入英语短句 下标2 到 1362
    if (message == "9") {
      message = this.TakeRandomNumber(3, 1361)
    }
    var that = this
    var data = {
      program_id: app.jtappid,
      openid: app._openid,
      zx_info_id: zx_info_id,
      content: message,
      openid_talk: openid_talk,
      time: time.formatTime(new Date, 'Y/M/D'),
      is_show_right: 1,
    }

    var plugin = requirePlugin("QCloudTBP")
    plugin.SetQCloudSecret("AKIDVmJMEA8cgaKKDxnu0s6C4iBWL0UpnORH", "p4kBcLupY1TkxywgIkRs7LY8Y7Zry0pV") //设置腾讯云账号信息，重要！！
    plugin.PostText({

      Version: '2019-03-11',
      BotId: '42f9105e-dc78-40f5-8604-d466d3339696',
      BotEnv: "release",
      InputText: message,
      TerminalId: "300180199810091921",
      success: function (resData) {
        console.log('message', message)
        console.log("robot调用成功：", resData)
        that.response(resData);
      },
      fail: function (err) {
        console.error("robot调用失败", err)
      }
    })

    this.data.centendata.push(data);
    that.setData({
      news_input_val: '',
      centendata: that.data.centendata
    })

    // that.loaddata(a);
    // util.request('/session_submit', 'post', data, '正在加载数据', function (res) {
    //   if (res.data.state == 1) {
    //     var a = true;
    //     that.loaddata(a);
    //     that.setData({
    //       news_input_val: ''
    //     })
    //     message = ''
    //   } else {
    //     wx.showToast({
    //       title: '网络错误,请稍后',
    //     })
    //   }
    // })
    message = ''
    this.bottom();
    message = ''
  },


  // 页面加载
  loaddata: function (a) {
    var that = this;
    var is_img = true;
    var data = {
      program_id: app.jtappid,
      openid: app._openid,
      zx_info_id: zx_info_id,
      openid_talk: openid_talk
    }
    // util.request('/session_page', 'post', data, '', function (res) {
    //   if (res.data.k1) {
    //     res.data.k1.time_agree = util.js_date_time(res.data.k1.time_agree)
    //   }
    //   for (var i = 0; i < res.data.k2.length; i++) {
    //     res.data.k2[i].time = util.js_date_time(res.data.k2[i].time)
    //     var n = res.data.k2[i].content.charAt(res.data.k2[i].content.length - 1);
    //     switch (n) {
    //       case 'g':
    //         res.data.k2[i].is_img = is_img
    //         break;
    //       default:
    //     }
    //   }
    //   that.setData({
    //     tabdata: res.data.k1,
    //     centendata: res.data.k2.reverse()
    //   })
    //   wx.setNavigationBarTitle({ title: that.data.tabdata.nickname });
    //   if (a) {
    //     setTimeout(function () {
    //       that.bottom()
    //     }, 500);
    //   }
    // })
    setTimeout(function () {
      if (that.data.centendata.length != length) {
        length = that.data.centendata.length
      }
      that.loaddata()
    }, 3000);

  },
  // 获取hei的id节点然后屏幕焦点调转到这个节点
  bottom: function () {
    var query = wx.createSelectorQuery()  // 创建节点查询器 query
    query.select('#hei').boundingClientRect()//获取节点位置信息的查询请求
    query.selectViewport().scrollOffset()//这段代码的意思是获取页面滑动位置的查询请求
    query.exec(function (res) {
      console.log("function-bottom:", res)
      console.log("function-bottom:", res[0].bottom)
      wx.pageScrollTo({
        // scrollTop: res[0].bottom  // #the-id节点的下边界坐标
        // scrollTop: res[0].bottom ,// #the-id节点的下边界坐标
        scrollTop: res[1].scrollHeight // 显示区域的竖直滚动位置
      })
      // res[1].scrollTop // 显示区域的竖直滚动位置
    })
  },

  toSysMessList() {
    wx.navigateTo({
      //这里传值
      url: '/pages/SystemMessageList/SystemMessageList',
    })
  },
  // 选择图片并把图片保存  
  upimg1: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var data = {
          program_id: app.jtappid,
          openid: app._openid,
          zx_info_id: zx_info_id,
        }
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: '/session_submit', //提交信息至后台
          filePath: tempFilePaths[0],
          name: 'content', //文件对应的参数名字(key)
          formData: data,  //其它的表单信息
          success: function (res) {
            var a = true;
            that.loaddata(a);
            message = ''
          }
        })
      }
    })
  },

  changeautoRA: function () {
    this.data.autoReadingAloud = !this.data.autoReadingAloud
  },

  getunReadcomNum: function (e) {
    let that = this
    // wx.cloud.callFunction({
    //   name: 'get_unReadSysMessNum',
    //   data: {
    //   },
    //   success: res => {
    //   },
    //   fail: err => {
    //     console.log('fail result: ', err)
    //   },
    //   complete: res => {
    //     console.log('unreadnum callFunction test result: ', res.result)
    //     // console.log('res.result.orderFlyers: ', res) 
    //     let unReadNum = res.result.unReadNum

    //     that.setData({
    //          unReadNum: unReadNum
    //     })
    //   }
    // })

  },


  //======================================语音识别【【=============================================//

  //语音  --按住说话
  touchStart: function (e) {
    wx.vibrateShort() //按键震动效果（15ms）
    manager.start(options)
    this.setData({
      recordState: true, //录音状态为真
      tips: '松开结束',
    })

  },
  //语音  --松开结束
  touchEnd: function (e) {
    // 语音结束识别
    manager.stop();
    this.setData({
      recordState: false,
    })

  },
  //识别语音 -- 初始化
  initRecord: function () {
    const that = this;
    // 有新的识别内容返回，则会调用此事件
    manager.onRecognize = function (res) {
      console.log(res)
    }
    // 正常开始录音识别时会调用此事件
    manager.onStart = function (res) {
      console.log("成功开始录音识别", res)
    }
    // 识别错误事件
    manager.onError = function (res) {
      console.error("error msg:", res.retcode, res.msg)
    }
    //识别结束事件
    manager.onStop = function (res) {
      console.log('..............结束录音')
      console.log('录音总时长 -->' + res.duration + 'ms');
      console.log('语音内容 --> ' + res.result);
      if (res.result == '') {
        wx.showModal({
          title: '提示',
          content: '听不清楚，请重新说一遍！',
          showCancel: false,
          success: function (res) { }
        })
        return;
      }
      that.setData({
        //去掉自动添加的句号
        news_input_val: message + (res.result).replace('。', ''),
      })
      message = message + (res.result).replace('。', '')
      // setTimeout(() => {
      //   that.add();
      // }, 500);

    }
  },
  //======================================语音识别】】=============================================//




})  

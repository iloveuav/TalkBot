var app = getApp();
var util = require("../../utils/util.js")
var time = require('../../utils/util.js');
var message = '';
var text = '';
var user = {};
var length;
var zx_info_id;
var openid_talk;
const formatTime = require("../../tts/util").formatTime
// import cookies from 'weapp-cookie'
import 'weapp-cookie'

import lottie from 'lottie-miniprogram'
import {
  uuid
} from '../../utils/util.js';


//阿里云tts
const SpeechSynthesizer = require("../../tts/tts")
const sleep = require("../../tts/util").sleep
const getToken = require("../../tts/token").getToken
const fs = wx.getFileSystemManager()
const ctx = wx.createInnerAudioContext()



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
    mode: 'talking',
    isVoicePlaying: false,

    news: '',
    scrollTop: 0,
    message: '',
    text: text,
    centendata: [],
    nickName: '',
    avatarUrl: '',
    news_input_val: '',
    tabdata: '',

    //拖拽相关
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: '',


    //发音人相关
    categoryCur: 2, //类别当前下标
    roleCur: 0,

    ttsStart: false,
    isSpeaking: false,
    ttsText: "",
    tts: {},

    curTTsRoleString: 'Lydia',
    curTTsTestText: '',


    autoReadingAloud: false,
    haveSpeakerFlag: true,
    multiVoiceArray: [

      [ //方言
        {
          name: '姗姗',
          intro: '(粤语女生)',
          value: 'shanshan',
          icon: 'voice_girl.png'
        },
        {
          name: '佳佳',
          intro: '(粤语女生)',
          value: 'jiajia',
          icon: 'voice_girl.png'
        },
        {
          name: '桃子',
          intro: '(粤语女生)',
          value: 'taozi',
          icon: 'voice_girl.png'
        },
        {
          name: '大虎',
          intro: '(东北话男声)',
          value: 'dahu',
          icon: 'voice_man.png'
        },
        {
          name: '老铁',
          intro: '(东北老铁)',
          value: 'laotie',
          icon: 'voice_man.png'
        },
        {
          name: '艾侃',
          intro: '(天津话)',
          value: 'aikan',
          icon: 'voice_man.png'
        },
        {
          name: '青青',
          intro: '(中国台湾话女声)',
          value: 'qingqing',
          icon: 'voice_girl.png'
        }
      ],

      [ //童声
        {
          name: '艾彤',
          intro: '(萝莉女声)',
          value: 'aitong',
          icon: 'girl.png'
        },
        {
          name: '思彤',
          intro: '(萝莉女声)',
          value: 'sitong',
          icon: 'girl.png'
        },
        {
          name: '小北',
          intro: '(萝莉女声)',
          value: 'xiaobei',
          icon: 'girl.png'
        },
        {
          name: '杰力豆',
          intro: '(治愈童声)',
          value: 'jielidou',
          icon: 'boy.png'
        }
      ],

      [ //美式发音
        {
          name: 'Lydia',
          intro: '(英中双语)',
          value: 'lydia',
          icon: 'voice_girl.png'
        },
        {
          name: 'Abby',
          intro: '(美音女声)',
          value: 'abby',
          icon: 'voice_girl.png'
        },
        {
          name: 'Wendy',
          intro: '(英音女声)',
          value: 'wendy',
          icon: 'voice_girl.png'
        },
        {
          name: 'Annie',
          intro: '(美语女声)',
          value: 'annie',
          icon: 'voice_girl.png'
        },
        {
          name: 'Emily',
          intro: '(英音女声)',
          value: 'emily',
          icon: 'voice_girl.png'
        },
        {
          name: 'Andy',
          intro: '(美音男声)',
          value: 'andy',
          icon: 'voice_man.png'
        },
        {
          name: 'William',
          intro: '(英音男声)',
          value: 'william',
          icon: 'voice_man.png'
        }
      ],

      [ //多语种
        {
          name: 'Tien',
          intro: '(越南语女声)',
          value: 'tien',
          icon: 'voice_girl.png'
        },
        {
          name: '智香',
          intro: '(日语女声)',
          value: 'tomoka',
          icon: 'voice_girl.png'
        },
        {
          name: '智也',
          intro: '(日语男声)',
          value: 'tomoya',
          icon: 'voice_man.png'
        },
        {
          name: 'Indah',
          intro: '(印尼女声)',
          value: 'indah',
          icon: 'voice_girl.png'
        },
        {
          name: 'Farah',
          intro: '(马来语女声)',
          value: 'farah',
          icon: 'voice_girl.png'
        }
      ]
    ],


    category: [{
      name: '方言',
      icon: '../../images/icon/china.jpeg'
    }, {
      name: '童声',
      icon: '../../images/icon/child.png'
    }, {
      name: '美式发音',
      icon: '../../images/icon/eng.png'
    }, {
      name: '多语种',
      icon: '../../images/icon/more_language.png'
    }],

    curmultiVoiceArray: [],


    gptConversationUUid: util.uuid(), //当前会话uuid

    allConversation: [],


    // 设置录音状态，按下为true，松开false,默认状态为false
    content: '', //输出内容
    recordState: false, //录音状态
  },
  onLoad: async function (options) {

    openid_talk = options.openid_talk;
    zx_info_id = options.zx_info_id;
    console.log(openid_talk)
    this.loaddata()
    const copyuserInfo = wx.getStorageSync('info')

    var SystemSetting = wx.getStorageSync("SystemSetting");
    var talkRead_switch = SystemSetting.talkRead_switch
    //调用应用实例的方法获取全局数据
    this.setData({
      userInfo: copyuserInfo,
      zx_info_id: zx_info_id,
      nickName: app.nickName,
      avatarUrl: app.avatarUrl,

      talkRead_switch: talkRead_switch, //控制是否显示语音朗读按钮
      //发音人初始化
      curmultiVoiceArray: this.data.multiVoiceArray[2],
      curTTsRoleString: this.data.multiVoiceArray[2][0].value
    });

    //跳转过来且是只读模式
    if (options && options.mode === 'onlyRead') {
      console.log("options", options)
      console.log("app.globalData.", app.globalData)
      this.setData({
        mode: 'onlyRead',
        gptConversationUUid: app.globalData.CurrentConversationUUid,
        centendata: app.globalData.CurrentConversationContent
      })
    } else {
      this.getunReadcomNum();
      this.getConvetsations();
      this.template(); //自动提示对话气泡  
    }
    this.initRecord();


    //阿里tts
    try {
      this.data.token = await getToken(app.globalData.AKID,
        app.globalData.AKKEY)
      // this.data.token = 'a9a57218797b40ca9c9414703128e456'//临时token
      console.log('token', this.data.token)
    } catch (e) {
      console.log("error on get token:", JSON.stringify(e))
      return
    }

    let tts = new SpeechSynthesizer({
      url: app.globalData.URL,
      appkey: app.globalData.JPAPPKEY, //JPAPPKEY   CEAPPKEY
      token: this.data.token
    })

    tts.on("meta", (msg) => {
      console.log("Client recv metainfo:", msg)
    })

    tts.on("data", (msg) => {
      //console.log(dumpFile.write(msg, "binary"))
      if (this.data.saveFile) {
        try {
          fs.appendFileSync(
            this.data.saveFile,
            msg,
            "binary"
          )
          // console.log(`append ${msg.byteLength}`)
        } catch (e) {
          console.error(e)
        }
      } else {
        console.log("save file empty")
      }
    })

    tts.on("completed", async (msg) => {
      console.log("Client recv completed:", msg)
      await sleep(500)
      fs.close({
        fd: this.data.saveFd,
        success: (res) => {
          // let ctx = wx.createInnerAudioContext()
          ctx.autoplay = true
          ctx.src = this.data.saveFile
          ctx.onPlay(() => {
            console.log('start playing..')
            this.data.isVoicePlaying = true
          })
          ctx.onError((res) => {
            console.log(res.errMsg)
            console.log(res.errCode)
            fs.unlink({
              filePath: this.data.saveFile,
              success: (res) => {
                console.log(`remove ${this.data.saveFile} done`)
                this.data.saveFile = null
                this.data.saveFd = null
              },
              failed: (res) => {
                console.log("remove failed:" + res.errMsg)
              }
            })
          })
          ctx.onEnded((res) => {
            console.log("play done...")
            this.setData({
              isSpeaking: false
            })
            this.data.isVoicePlaying = false
            fs.unlink({
              filePath: this.data.saveFile,
              success: (res) => {
                console.log(`remove ${this.data.saveFile} done`)
                this.data.saveFile = null
                this.data.saveFd = null
              },
              failed: (res) => {
                console.log("remove failed:" + res.errMsg)
              }
            })
          })
        },
        fail: (res) => {
          console.log("saved file error:" + res.errMsg)
        }
      })
    })

    tts.on("closed", () => {
      console.log("Client recv closed")
    })

    tts.on("failed", (msg) => {
      console.log("Client recv failed:", msg)
    })
    this.data.tts = tts
  },

  onReady() {
    //创建内部 audio 上下文 InnerAudioContext 对象。
    this.innerAudioContext = wx.createInnerAudioContext();
    // this.innerAudioContext.onError(function (res) {
    //   // console.log(res);
    //   wx.showToast({
    //     title: '语音播放失败',
    //     icon: 'none',
    //   })
    // })
  },

  onShow: function () {
    this.getunReadcomNum();
    this.lottieInit();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.end();
    ctx.pause();
    this.data.isVoicePlaying = false
  },

  template: function (e) {
    var data = {
      // program_id: app.jtappid,
      // openid: app._openid,
      // zx_info_id: zx_info_id,
      // content: "猜你想问：\n 1、在本小程序发布课程，有什么奖励吗？\n2、课程内容如何才能审核通过？\n 3、可以参考借鉴或者搬运其他人创作的内容上传吗？\n4、访问山村的具体流程？\n5、这个小程序是公益性质的吗？\n 9、随机英语短句 \n回复数字即可",

      content: 'hi，有什么问题尽管问我吧 \n\n（小提示：点击上面数字人可以设置发音人的声音、左下角开关按钮可以控制是否自动朗读、文字过多时语音合成较慢请耐心等待）',


      // content: "猜你想问：\n 1、食堂的开关门时间？\n2、充饭卡的地点？\n 3、图书馆闭馆时间？\n4、普通话照片怎么上传？\n5、无课表哪里能看？\n 6、澡堂的开关门时间？\n7、选修课除了学习通哪里能看\n8、捐赠衣物\n 9、随机英语短句 \n回复数字即可",


      // openid_talk: openid_talk,
      // time: time.formatTime(new Date, 'Y/M/D'),
      is_show_right: 2,
    }
    this.data.centendata.push(data);
    // this.addRecord(data);
    this.setData({
      centendata: this.data.centendata
    })
  },



  response: function (text) {
    var that = this
    // console.log(e.Response.ResponseText);
    var data = {
      program_id: app.jtappid,
      openid: app._openid,
      zx_info_id: zx_info_id,
      content: text,
      openid_talk: openid_talk,
      time: time.formatTime(new Date, 'Y/M/D'),
      is_show_right: 2,
      curTTsRoleString: this.data.curTTsRoleString
    }

    this.data.centendata.push(data);
    this.addRecord(data);
    that.setData({
      // news_input_val: '',
      centendata: that.data.centendata
    })
    if (this.data.autoReadingAloud) {
      // wx.showLoading({
      //   title: '正在合成语音',
      //   mask:true
      // })
      this.speach(data.content);
    }
    this.bottom()
  },

  //新的speach方法
  speach(e) {
    let content = ''
    if (this.data.autoReadingAloud == true) {
      content = e
    } else {
      if (e.currentTarget.dataset.content !== undefined && this.data.autoReadingAloud === false) {
        content = e.currentTarget.dataset.content;
        console.log(content)
      }
    }
    this.onTtsSpeach(content, 'autoSpeach')
  },

  //点击朗读
  clickSpeach(e) {
    let content = ''
    if (e.currentTarget.dataset.content !== undefined) {
      content = e.currentTarget.dataset.content;
      console.log(content)
    }
    this.onTtsSpeach(content, 'autoSpeach')
  },
  //取消朗读
  stopSpeach() {
    ctx.pause();
    this.data.isVoicePlaying = false
    this.end();
    this.setData({
      isSpeaking: false
    })
  },

  // ----------------朗读文本输入---------------
  getSpeachText(e) {
    if (e.detail.value) {
      let value = e.detail.value;
      this.setData({
        curTTsTestText: value,
      });
    }
  },

  //阿里tts
  onTtsSpeach: function (e, type) {
    let content = ''
    let that = this
    console.log('tts1', e);
    console.log('tts1-type', type);


    let islogin = wx.getStorageSync('islogin');
    if (islogin == false || islogin == undefined) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录，请在【我的】中进行微信登录后重试',
        showCancel: false
      })
    } else {
      if (type && type === 'autoSpeach') {
        content = e
      } else {
        if (e) {
          content = e
        }
        if (this.data.autoReadingAloud == true && e.currentTarget?.dataset?.content == undefined) {
          content = e
          // console.log(e);
        } else if (this.data.autoReadingAloud == true && e.currentTarget?.dataset?.content !== undefined) {
          content = e.currentTarget.dataset.content;
        } else {
          if (e.currentTarget.dataset.content != undefined && this.data.autoReadingAloud == false) {
            content = e.currentTarget.dataset.content;
            console.log(content)
          }
          if (e.currentTarget.dataset.content == undefined && this.data.autoReadingAloud == false) {
            content = e
          }
        }
      }



      console.log('tts', content)
      if (!content || !this.data.tts) {
        console.log("text empty")
        wx.showToast({
          title: "文本为空",
          icon: "error",
          duration: 1000,
          mask: true
        })
        return
      }

      if (this.data.isVoicePlaying) {
        ctx.pause();
      }

      if (this.data.ttsStart) {
        wx.showToast({
          title: "正在合成请稍候",
          icon: "error",
          duration: 1000,
          mask: true
        })
        return
      } else {
        // this.data.ttsStart = true
        this.setData({
          ttsStart: true,
        })
        wx.showToast({
          title: "正在合成请稍候",
          icon: "error",
          duration: 1000,
          mask: true
        })
      }
      console.log("try to synthesis:" + content)
      let save = formatTime(new Date()) + ".wav"
      let savePath = wx.env.USER_DATA_PATH + "/" + save
      console.log(`save to ${savePath}`)
      fs.open({
        filePath: savePath,
        flag: "a+",
        success: async (res) => {
          console.log(`open ${savePath} done`)
          this.data.saveFd = res.fd
          this.data.saveFile = savePath
          console.log("tts3", this.data.tts)
          console.log("tts3", that.data.tts)

          // voice 中英混女声 Rosa   日语女声 tomoka
          let param = this.data.tts.defaultStartParams('tomoka')
          // let param = this.data.tts.defaultStartParams('Rosa')
          param.text = content
          // param.voice = "tomoka"
          param.voice = this.data.curTTsRoleString
          try {
            await this.data.tts.start(param)
            console.log("tts done")
            // this.data.ttsStart = false
            // this.hideLoading();
            this.setData({
              ttsStart: false,
              isSpeaking: true,
              speakingContent: content
            })
          } catch (e) {
            console.log("tts start error:" + e)
          }
        },
        fail: (res) => {
          console.log(`open ${savePath} failed: ${res.errMsg}`)
        }
      })

    }


  },

  shareConvertsation() {
    const that = this
    wx.showModal({
      title: '是否分享对话到大厅列表',
      content: '对话内容在管理员审核后发布',
      cancelText: "取消",
      confirmText: "分享",
      success(res) {
        if (res.cancel == true) {
          return;
        }
        if (res.confirm == true) {

          // console.log('that.data.xx',that)
          // 点击确认分享
          wx.cloud.callFunction({
            name: 'operate_userInfo',
            data: {
              type: 'share_user_ques_record',
              params: {
                userInfo: that.data.userInfo,
                gptConversationUUid: that.data.gptConversationUUid,
                newConversation: that.data.centendata //对话记录对象
              },
            },
            success: res => {
              // console.log(res)
              console.log('callFunction test result: ', res)
            },
            fail: err => {
              // handle error
            },
            complete: res => {
              console.log(res)
            }
          })

        }
      }
    })
  },

  //同声传译插件的speach
  // speach(e) {
  //   console.log(e);
  //   let that = this
  //   let lto = '';
  //   let content = '';
  //   lto = 'en_US';
  //   // if (this.data.classCollection == 'otherClassContents' || this.data.classCollection == 'JaClassContents') {
  //   //   lto = 'zh_CN'
  //   // }
  //   // lto = 'zh_CN'
  //   lto = 'en_US';
  //   if (this.data.autoReadingAloud == true) {
  //     // console.log(e);
  //     content = e
  //     // console.log(e);
  //     // console.log(lto);
  //   } else {
  //     if (e.currentTarget.dataset.content !== undefined && this.data.autoReadingAloud === false) {
  //       content = e.currentTarget.dataset.content;
  //       console.log(content)
  //     }
  //   }
  //   // -------------下面是同声传译插件的-----------
  //   if (content && lto) {
  //     plugin.textToSpeech({
  //       lang: lto,
  //       content: content,
  //       success: resTrans => {
  //         console.log(resTrans);
  //         if (resTrans.retcode == 0) {
  //           // let tmpTranslate = Object.assign({}, item, {
  //           autoPlay: true, // 自动播放背景音乐
  //           that.setData({
  //             voicePath: resTrans.filename,
  //           })
  //           that.yuyinPlay();
  //         }
  //         else {
  //           // console.warn("语音合成失败", resTrans, item)
  //           console.warn("语音合成失败", resTrans, item)
  //         }
  //       },
  //       fail: function (resTrans) {
  //         console.warn("语音合成失败")
  //         wx.showToast({
  //           title: '取消自动朗读后重试',
  //           icon: 'none',
  //         })
  //       }
  //     })
  //   }
  // },

  // 播放语音
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
  //之前的add  没有调用chatGPT 用的腾讯对话机器人平台
  // add: function (e) {
  //   // content: "猜你想问：\n 1、在本小程序发布课程，有什么奖励吗？\n2、课程内容如何才能审核通过？\n 3、可以参考借鉴或者搬运其他人创作的内容上传吗？\n4、访问山村的具体流程？\n5、这个小程序是公益性质的吗？\n 9、随机英语短句 \n回复数字即可",

  //   if (message == "1") {
  //     message = "在本小程序发布课程，有什么奖励吗？"
  //   }
  //   if (message == "2") {
  //     message = "课程内容如何才能审核通过？"
  //   }
  //   if (message == "3") {
  //     message = "可以参考借鉴或者搬运其他人创作的内容上传吗？"
  //   }
  //   if (message == "4") {
  //     message = "访问山村的具体流程？"
  //   }
  //   if (message == "5") {
  //     message = "这个小程序是公益性质的吗？"
  //   }

  //   //录入英语短句 下标2 到 1362
  //   if (message == "9") {
  //     message = this.TakeRandomNumber(3, 1361)
  //   }
  //   var that = this
  //   var data = {
  //     program_id: app.jtappid,
  //     openid: app._openid,
  //     zx_info_id: zx_info_id,
  //     content: message,
  //     openid_talk: openid_talk,
  //     time: time.formatTime(new Date, 'Y/M/D'),
  //     is_show_right: 1,
  //   }

  //   var plugin = requirePlugin("QCloudTBP")
  //   plugin.PostText({

  //     Version: '2019-03-11',
  //     BotId: '42f9105e-dc78-40f5-8604-d466d3339696',
  //     BotEnv: "release",
  //     InputText: message,
  //     TerminalId: "300180199810091921",
  //     success: function (resData) {
  //       console.log('message', message)
  //       console.log("robot调用成功：", resData)
  //       that.response(resData);
  //     },
  //     fail: function (err) {
  //       console.error("robot调用失败", err)
  //     }
  //   })

  //   this.data.centendata.push(data);
  //   that.setData({
  //     news_input_val: '',
  //     centendata: that.data.centendata
  //   })

  //   // that.loaddata(a);
  //   // util.request('/session_submit', 'post', data, '正在加载数据', function (res) {
  //   //   if (res.data.state == 1) {
  //   //     var a = true;
  //   //     that.loaddata(a);
  //   //     that.setData({
  //   //       news_input_val: ''
  //   //     })
  //   //     message = ''
  //   //   } else {
  //   //     wx.showToast({
  //   //       title: '网络错误,请稍后',
  //   //     })
  //   //   }
  //   // })
  //   message = ''
  //   this.bottom();
  //   message = ''
  // },

  //记录用户提问
  addRecord(dataObj) {
    wx.cloud.callFunction({
      name: 'operate_userInfo',
      data: {
        type: 'add_user_ques_record',
        params: {
          gptConversationUUid: this.data.gptConversationUUid,
          newConversation: dataObj //对话记录对象
        },
      },
      success: res => {
        // console.log(res)
        console.log('callFunction test result: ', res)
      },
      fail: err => {
        // handle error
      },
      complete: res => {
        console.log(res)
      }
    })
  },
  //获取用户提问记录
  getConvetsations() {
    wx.cloud.callFunction({
      name: 'operate_userInfo',
      data: {
        type: 'get_user_ques_record',
      },
      success: res => {
        // console.log(res)
        const AIConversationsMap = res?.result?.data[0].AIConversationsMap || undefined
        if (AIConversationsMap) {
          console.log('getConversation-result: ', AIConversationsMap)
          // const AIConversationsArr = []
          const converKeysArr = Object.keys(AIConversationsMap)
          console.log('converKeysArr', converKeysArr)
          const conversationList = []
          converKeysArr.forEach(e => {
            conversationList.push({
              theme: AIConversationsMap[e][0].content,
              key: e
            })
          })
          console.log("conversationList", conversationList)
          this.setData({
            allConversation: conversationList,
            AIConversationsMap: AIConversationsMap
          })
        }
      },
      fail: err => {
        // handle error
      },
      complete: res => {
        // console.log(res)
      }
    })
  },
  //记录用户提问
  addRecord(dataObj) {
    wx.cloud.callFunction({
      name: 'operate_userInfo',
      data: {
        type: 'add_user_ques_record',
        params: {
          gptConversationUUid: this.data.gptConversationUUid,
          newConversation: dataObj //对话记录对象
        },
      },
      success: res => {
        // console.log(res)
        console.log('callFunction test result: ', res)
      },
      fail: err => {
        // handle error
      },
      complete: res => {
        console.log(res)
      }
    })
  },

  isJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },


  parseToJSON(str) {
    console.log("parseToJSON-str", str)
    // 检查是否是JSON格式,如果是直接返回
    if (this.isJSON(str)) return JSON.parse(str);

    // 如果不是JSON格式,则做以下处理
    str = str.trim(); // 去除字符串两边空格
    str = str.replace(/^\s*|\s*$/g, ''); // 去除每行两边空格

    // 如果字符串以{或者[开头,说明可能是对象或者数组,尝试解析
    if (str.startsWith('{') || str.startsWith('[')) {
      try {
        return JSON.parse(str);
      } catch (e) {}
    }

    // 否则按行分割,尝试构造对象或数组
    var lines = str.split('\n');
    var obj = {}; // 假定为对象
    var arr = []; // 假定为数组
    var isArray = false;

    // 遍历每行,解析键值对或者数组元素
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      line = line.trim();

      // 如果遇到{立即构造对象
      if (line.startsWith('{')) {
        obj = {};
        isArray = false;
        continue;
      }

      // 如果遇到[立即构造数组
      if (line.startsWith('[')) {
        arr = [];
        isArray = true;
        continue;
      }

      // 对象处理
      if (!isArray) {
        var keyValue = line.split(':');
        if (keyValue.length == 2) {
          var key = keyValue[0].trim();
          var value = keyValue[1].trim();
          obj[key] = value.startsWith('{') || value.startsWith('[') ? this.parseToJSON(value) : value;
        }
      } else { // 数组处理
        if (line) arr.push(line.startsWith('{') || line.startsWith('[') ? this.parseToJSON(line) : line);
      }
    }

    // 返回对象或数组
    return isArray ? arr : obj;
  },


  parseToArray(str) {
    var arr = [];
    var lines = str.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      if (line.startsWith('data:')) {
        var jsonStr = line.slice(6); // 从data:后面开始截取
        if (this.isJSON(jsonStr)) { // 检查是否JSON
          arr.push(JSON.parse(jsonStr)); // 是的话直接push
        } else {
          jsonStr = this.parseToJSON(jsonStr); // 否则解析成JSON
          arr.push(jsonStr);
        }
      }
    }

    return arr;
  },


  useMoonShotApi() {
    this.setData({
      // remind: true,
      remind: null,
    })
    wx.showLoading({
      title: '请稍等片刻',
    })
    var that = this
    // this.data.testStreamingInterval = setInterval(() => {
    wx.request({
      method: 'POST',
      url: 'https://api.moonshot.cn/v1/chat/completions',
      data: {
        "model": "moonshot-v1-8k",
        "messages": [
          { "role": "user", "content":message}]
        // "messages": "hi,who are you,我想了解一些海底知识"
      },
      header: {
        "Content-Type": "application/json",
        "X-Requested-With": 'XMLHttpRequest',
        "Authorization": "sk-G47fRSG91qhRyhPwMMzVtXA2EPDD6zanzkyySj3WqFzgccUh",
        'Same-Site': 'None',
      },
      success(result) {
        console.log("test_streaming_res", result)
        that.setData({
          // remind: true,
          isstarted: false,
          remind: null,
        })

        wx.hideLoading();
        that.response(result.data.choices[0].message.content);
        // var jsonArr = that.parseToArray(result.data);
        // console.log("jsonArr", jsonArr)
        // jsonArr.forEach(item => {
        //   console.log("item", item)
        //   console.log("alltext", alltext)
        //   if (item.length === 0) {
        //     isalltext = true;
        //     alltext = alltext.replace('\\\"', '\\\\\"');
        //     alltext = alltext.replace(/\n/g, "");
        //     console.log("alltext", alltext)

        //     // contextarray.push([prompt, alltext]);
        //     // contextarray = contextarray.slice(-12); //只保留最近5次对话作为上下文，以免超过最大tokens限制
        //     clearInterval(that.data.testStreamingInterval)
        //     that.setData({
        //       remind: null,
        //     })
        //     wx.hideLoading()

        //     that.response(alltext);
        //     that.setData({
        //       news_input_val: '',
        //       centendata: that.data.centendata,
        //       remind: null,
        //     })
        //     that.bottom();
        //     message = ''
        //     return;
        //     // that.handleResultConvertToChart(alltext)
        //   }

        //   if (item.choices && item.choices[0].delta.hasOwnProperty("content")) {
        //     if (item.choices[0].delta.content === '错误' || item.choices[0].delta.content.includes("Claude cannot look up any real-time information") || item.choices[0].delta.content.includes("This request may violate our Acceptable")) {
        //       console.log("Error")
        //       // error_layer=true
        //       // send_post();
        //       return;
        //     }

        //     if (alltext == "") {
        //       let tempText = item.choices[0].delta.content.replace(/^\n+/, ''); //去掉回复消息中偶尔开头就存在的连续换行符

        //       tempText = tempText.replace(/\\n/g, '[nlll]');
        //       tempText = tempText.replace(/\[nlll\]/g, '');
        //       alltext = tempText;
        //     } else {
        //       let tempText = item.choices[0].delta.content.replace(/^\n+/, ''); //去掉回复消息中偶尔开头就存在的连续换行符
        //       tempText

        //       tempText = tempText.replace(/\\n/g, '[nlll]');
        //       tempText = tempText.replace(/\[nlll\]/g, '');
        //       alltext += tempText;
        //     }
        //   }
        // })
      }
    })
    // }, 3000);
  },


  //新的add 调用chatGPT进行回答
  add() {

    let islogin = wx.getStorageSync('islogin');
    let isVip = wx.getStorageSync('isVip');
    let UserQuesRecordArr = wx.getStorageSync('UserQuesRecordArr');
    var SystemSetting = wx.getStorageSync("SystemSetting");
    var allCanTalk = SystemSetting.allCanTalk

    if (islogin == false || islogin == undefined) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录，请在【我的】中进行微信登录后重试',
        showCancel: false
      })
    } else if (!isVip && !allCanTalk) {
      // else if (!isVip && UserQuesRecordArr.length >= 12) {
      wx.showModal({
        title: '下线提醒',
        content: '此功能暂不开放，有疑问请联系管理员',
        showCancel: false
      })
    } else {

      if (message === '') {
        wx.showModal({
          title: '文本内容为空',
          content: '输入内容后重试',
          showCancel: false
        })
        return
      }

      var data = {
        program_id: app.jtappid,
        openid: app._openid,
        zx_info_id: zx_info_id,
        content: message,
        openid_talk: openid_talk,
        time: time.formatTime(new Date, 'Y/M/D'),
        is_show_right: 1,
        curTTsRoleString: this.data.curTTsRoleString
      }
      this.addRecord(data);

      var that = this
      this.data.centendata.push(data);
      console.log("this.data.centendata", this.data.centendata)
      this.setData({
        news_input_val: '',
        remind: '加载中',
        centendata: this.data.centendata
      })
      const SystemSetting = wx.getStorageSync("SystemSetting")
      const urlForTalk = SystemSetting.urlForTalk || ''
      const canNotTalkMessage = SystemSetting.canNotTalkMessage || ''
      let frontUrl = ''
      if (urlForTalk) {
        frontUrl = urlForTalk
        // let url = frontUrl + message
        let url = frontUrl

        this.useMoonShotApi()
      } else {
        that.setData({
          news_input_val: '',
          remind: null,
        })
        if (canNotTalkMessage) {
          that.response(canNotTalkMessage);
        } else {
          that.response('服务正在维护更新中，给您带来不便十分抱歉，我们将尽快恢复，如有紧急情况请联系管理员');

        }

        this.bottom();
      }
    }

    message = ''
  },

  changeConversation(e) {
    console.log(e)
    if (e.currentTarget.dataset.content !== undefined) {
      const key = e.currentTarget.dataset.content
      this.setData({
        gptConversationUUid: key,
        centendata: this.data.AIConversationsMap[key]
      })
      this.toConversationList()
    }
  },

  initNewConversation(e) {
    this.setData({
      gptConversationUUid: util.uuid(),
      centendata: [{
        content: 'hi，有什么问题尽管问我吧~',
        is_show_right: 2
      }]
    })
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
    var query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('#hei').boundingClientRect() //获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() //这段代码的意思是获取页面滑动位置的查询请求
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

  viewCopyTextClick: function (e) {
    let content = ''
    if (e.currentTarget.dataset.content !== undefined) {
      content = e.currentTarget.dataset.content;
      console.log(content)
    }
    wx.setClipboardData({
      data: content,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  toConversationList() {
    // wx.navigateTo({
    //   //这里传值
    //   // url: "../../pages/AddEngClassContent/AddEngClassContent",
    //   url: "../../pages/conversationHistory/index",
    // })

    if (this.data.translate === 'transform: translateX(-250px)') {
      this.setData({
        translate: 'transform: translateX(-0px)',
        top_human_translate: 'transform: translateX(-0px)'
      })
    } else {
      this.setData({
        translate: 'transform: translateX(-250px)',
        top_human_translate: 'transform: translateX(-250px)'
      })
    }



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
          formData: data, //其它的表单信息
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
    wx.showToast({
      title: this.data.autoReadingAloud ? '自动朗读已开启' : '自动朗读已关闭',
      icon: "error",
      duration: 1000,
      mask: true
    })
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
          content: '听不太清，请靠近麦克风重新说一遍~',
          showCancel: false,
          success: function (res) {}
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



  // 编辑抽屉拖拽
  tap_start: function (e) {
    this.data.mark = this.data.newmark = e.touches[0].pageX;
    if (this.data.staus == 1) {
      // staus = 1指默认状态
      this.data.startmark = e.touches[0].pageX;
    } else {
      // staus = 2指屏幕滑动到右边的状态
      this.data.startmark = e.touches[0].pageX;
    }

  },
  tap_drag: function (e) {
    /*
     * 正在用日期组件时 不执行
     * 
     */
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if (this.data.mark < this.data.newmark) {
      if (this.data.staus == 1) {
        if (this.data.windowWidth * 0.2 > Math.abs(this.data.newmark - this.data.startmark)) {
          this.setData({
            translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
          })
        }
      }

    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      if (this.data.staus == 1 && (this.data.newmark - this.data.startmark) > 0) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
        })
      } else if (this.data.staus == 2 && Math.abs(this.data.startmark - this.data.newmark) > this.data.windowWidth * 0.2) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark + this.data.windowWidth * 0.4 - this.data.startmark) + 'px)'
        })
      }
    }
    this.data.mark = this.data.newmark;
  },
  tap_end: function (e) {
    if (this.data.staus == 1 && this.data.startmark < this.data.newmark) {
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.2)) {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      } else {
        this.setData({
          translate: 'transform: translateX(' + this.data.windowWidth * 0.4 + 'px)'
        })
        this.data.staus = 2;
      }
    } else {
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.2)) {
        this.setData({
          // translate: 'transform: translateX(' + this.data.windowWidth * 0.4 + 'px)'  //注掉 避免触发菜单
        })
        this.data.staus = 2;
      } else {
        // 左边向右边滑动
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      }
    }
    this.data.mark = 0;
    this.data.newmark = 0;
  },

  // 、、、、设置发言人模态框弹出
  setVoiceRole() {
    this.setData({
      setVoiceRole: true,
      btnDie: true,
    });
    this.bottom();
  },
  // 、、、、设置发言人模态框关闭
  close(e) {
    this.setData({
      setwait: false,
      setTextImg: false,
      btnDie: false,
      setFrontImg: false,
      editStatus: false,

      curTextImg: {
        index: 0
      },
      textImgArray: [{

      }],
      setVoiceRole: false

    });
  },

  changeHaveSpeakerFlag: function () {
    this.setData({
      haveSpeakerFlag: !this.data.haveSpeakerFlag
    })
  },



  swiperCategoryChange: function (e) {
    console.log(e)
    this.setData({
      categoryCur: e.detail.current,
      curmultiVoiceArray: this.data.multiVoiceArray[e.detail.current],
      curTTsRoleString: this.data.multiVoiceArray[e.detail.current][0].value
    })
  },
  swiperRoleChange: function (e) {
    console.log('role', this.data.curmultiVoiceArray[e.detail.current])
    const roleObj = this.data.curmultiVoiceArray[e.detail.current]
    this.setData({
      roleCur: e.detail.current,
      curTTsRoleString: roleObj.value
    })
  },


  // lottie动画相关

  lottieInit() {
    if (this._inited) {
      return
    }
    wx.createSelectorQuery().selectAll('#c1').node(res => {
      const canvas = res[0].node
      const context = canvas.getContext('2d')

      canvas.width = 150
      canvas.height = 150

      lottie.setup(canvas)
      this.ani = lottie.loadAnimation({
        loop: true,
        autoplay: true,
        // animationData: require('../../json/catrim'),
        animationData: require('../../json/man'),
        // path: 'https://assets3.lottiefiles.com/packages/lf20_2cbmucbb.json',
        // path:'https://assets1.lottiefiles.com/packages/lf20_mu5qmj4m.json',
        // path:'https://assets10.lottiefiles.com/packages/lf20_oibkdzf3.json',
        rendererSettings: {
          context,
        },
      })
      this._inited = true
    }).exec()
  },
  play() {
    this.ani.play()
  },
  pause() {
    this.ani.pause()
  },


  toCreateChart() {
    wx.navigateTo({
      //这里传值
      url: "../chartBox/index",
    })
  }




})
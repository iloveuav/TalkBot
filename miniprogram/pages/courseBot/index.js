// miniprogram/pages/TalkBot/TalkBot.js

import util from '../../utils/util'
import cookies from 'weapp-cookie'
const app = getApp();
var time = require('../../utils/util.js');
const windowHeight = wx.getSystemInfoSync().windowHeight;
const windowWidth = wx.getSystemInfoSync().windowWidth;
// 课程内容获取状态管理
const classCollection = ''; //请求集合名 目前就只有英语和日语两个集合
var Centendata = []; //当前课程内容  
var CurrentChapter = {}; //当前章节对象 {courseId,className,chapterName}
// 历史  （暂时不考虑记忆历史了）

let EngchatHistory = [];
let JachatHistory = [];
let LeftOverClassConten = []; //待输出的课程内容（剩余内容）

//待输出的课程内容  （暂时停用）
// let EngLeftOverClassConten = wx.getStorageSync('EngloClassContent');
// let JaLeftOverClassConten = wx.getStorageSync('JaloClassContent');
let EngLeftOverClassConten = [];
let JaLeftOverClassConten = [];

//用户课程记录
let UserCourseMess = wx.getStorageSync('UserCourseMess');


//阿里云tts
const SpeechSynthesizer = require("../../tts/tts")
const formatTime = require("../../tts/util").formatTime
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

var message = '';
var showContinueByLast = false;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userbtns: [],
    test: 0,
    wait: false,
    growid: 0,
    btnDie: false,
    start: false,
    autoReadingAloud: true, //自动读开关
    userTalking: false,//用户是否正在说话
    recordState: false, //录音状态
    classLength: 0,
    showContinueByLast: false, //根据最后的内容 判断是否显示 加载本章节更多

    className: "",
    centendata: [],
    news_input_val: '',



    // chatHistory: chatHistory,
    currentDataItem: {},
    isVoicePlaying: false,
    // 后两个用来设置scroll-view的scroll-into-view
    scrollHeight: '',
    startPageX: 0,
    currentChooseCard: 1,
    scrollLeft: 130,
    chooseList: [1, 2, 3],

    classCollection: '',
    continueBtn: false,
    isExtensionContent: false,
    ChapterList: [],

    //阿里tts
    ttsStart: false,
    ttsText: "",
    curTTsRoleString: '', //不同文本里面设置的发音人字段
    isSpeaking: false,


    tts: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log("options", options)
    var SystemSetting = wx.getStorageSync("SystemSetting");
    var talkRead_switch = SystemSetting.talkRead_switch
    this.setData({
      talkRead_switch: talkRead_switch,//控制是否显示语音朗读按钮
    })

    getApp().setWatcher(this.data, this.watch); // 设置监听器


    if (options && options.Cc) {
      let courseObject = JSON.parse(options.course);
      let Cc = JSON.parse(options.Cc);
      CurrentChapter = Cc //正确获取index页面传过来的课程信息 

      var that = this;
      this.setData({
        courseObject: courseObject,
        userSelect: Cc || null,
        // ChapterList: ChapterList
      })

      this.initRecord();

    }


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


  watch: {
    centendata: function (centendata) {
      if (centendata.length > 0) {
        console.log(centendata); // centendata改变时，调用该方法输出新值。
        if (centendata[centendata.length - 1].contentType === 'Interact' && centendata[centendata.length - 1].detail.answer === '') {
          showContinueByLast//最后是交互的但是没答案 要显示
        }

        if (centendata[centendata.length - 1].contentType === 'Interact' && centendata[centendata.length - 1].detail.answer !== '') {
          showContinueByLast = false//最后是交互的但是有答案 不显示
        }

        if (centendata[centendata.length - 1].contentType !== 'Interact') {
          showContinueByLast = true//最后不是交互的 显示
        }
        console.log("this.data", showContinueByLast)

        // this.setData({
        //   showContinueByLast
        // })


      } else {
        showContinueByLast = true//没内容要显示
      }

    }
  },

  onShareAppMessage: function () {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.updateScrollHeightByFooter();

    //创建内部 audio 上下文 InnerAudioContext 对象。
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function (res) {
      // console.log(res);
      wx.showToast({
        title: '语音播放失败',
        icon: 'none',
      })
    })
    // this.onShow();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.onLoad();
    // 暂时停用 历史缓存
    // let EngchatHistory = wx.getStorageSync('EnghistoryContent');
    // // let EngchatHistory = [];
    // let JachatHistory = wx.getStorageSync('JahistoryContent');
    // // let JachatHistory = [];
    // let LeftOverClassConten = wx.getStorageSync('loClassContent');
    // // let LeftOverClassConten = [];

    // let EngLeftOverClassConten = wx.getStorageSync('EngloClassContent');
    // let JaLeftOverClassConten = wx.getStorageSync('JaloClassContent');
    // // let EngLeftOverClassConten = [];
    // // let JaLeftOverClassConten = [];

    console.log("app.globalData.CurrentCourseObj", app.globalData)
    this.setData({
      courseObject: app.globalData.CurrentCourseObj || {},
      userSelect: app.globalData.CurrentChapter || {},
    })
    if (app.globalData.CurrentChapter) {
      this.data.userSelect = app.globalData.CurrentChapter
      // this.updateCourseProgress(app.globalData.CurrentChapter)
    }

    // app.globalData.CurrentCourseObj = courseDetail



    if (this.data.courseObject?.useAI) {
      this.setData({
        ChapterList: this.data.courseObject.ChapterList,
        remind: '',
      })
    } else {
      this.getChapterList()
    }

    let courseObject = this.data.courseObject;
    // --------------新历史缓存--------------------
    // 从缓存中找当前课本的缓存记录 并注入
    LeftOverClassConten = wx.getStorageSync(courseObject.courseName);
    //注入当前课本的历史数据
    Centendata = wx.getStorageSync('history' + courseObject.courseName)
    let cen = Centendata.length
    console.log("cen" + cen)
    if (cen <= 0) {
      Centendata = []
      console.log('木有历史记录')
    }
    // ------------新历史缓存end----------------

    // console.log(courseObject);
    var classCollection = '';
    let continueBtn = false;
    var that = this;
    // console.log('是否还能继续' + LeftOverClassConten.length);

    if (courseObject.courseType == 'eng') {
      classCollection = "EngClassContents";
    } else if (courseObject.courseType == 'ja') {
      classCollection = "JaClassContents";
    } else if (courseObject.courseType == 'other') {
      classCollection = "testCourseContents"; //临时
      // classCollection = "otherClassContents";
    } else if (courseObject.courseType == 'schoolDetail') {
      classCollection = "SchoolDetail";
    }
    let hisdataLength = LeftOverClassConten.length
    if (hisdataLength > 0) {
      // continue按钮
      continueBtn = true;
    } else {
      LeftOverClassConten = []
    }

    // if (LeftOverClassConten.length != 0) {
    //   continueBtn = true;
    // }
    // if (LeftOverClassConten != '' && LeftOverClassConten != undefined && LeftOverClassConten != '') {
    //   continueBtn = true
    // }


    this.setData({
      classCollection: classCollection,
      centendata: Centendata,
      hisclassLength: Centendata.length,
      continueBtn: continueBtn,
      classLength: LeftOverClassConten.length,
      className: this.data.courseObject.courseName
    })

    this.bottom();
    if (continueBtn == false && this.data.classLength != 0) {
      this.showTeach();
    }

    if (courseObject.currentProgress) { //用户对课程有进度 弹出模态框确认是变更章节还是留着当前章节
      console.log("courseObject.currentProgress", courseObject.currentProgress)
      const userSelect = this.data.userSelect
      console.log("courseObject.userSelect", courseObject.userSelect)

      if (courseObject.currentProgress.chapterId !== userSelect.chapterId) //用户选择的课程与之前课程章节不同
      {
        wx.showModal({
          title: '准备好上课了吗？',
          content: '（切换章节会让你失去目前的进度）',
          cancelText: "取消",
          confirmText: "继续",
          success(res) {
            if (res.cancel == true) {
              console.log("cancel-CurrentChapter", CurrentChapter)
              console.log("cancel-courseObject", that.data.courseObject)
              that.setData({
                currentSelect: CurrentChapter
              })
              return;
            }
            if (res.confirm == true) {
              // 更新章节
              CurrentChapter = userSelect
              Centendata = []
              LeftOverClassConten = [] //得把已经注入的待上课内容清空 不然会导致新内容排在后面
              that.setData({
                currentSelect: userSelect,
                centendata: Centendata
              })
              // 调用获取课程内容的函数
              that.getNewClassContent();
            }
          }
        })
      } else { //虽然有进度 但是用户选择的和进度一致

        CurrentChapter = this.data.userSelect
        this.setData({
          // currentSelect: {}
          currentSelect: this.data.userSelect
        })
      }

    } else {
      //第一次进入此课程 直接按照用户选择的章节进行加载
      console.log('第一次进入此课程 直接按照用户选择的章节进行加载')
      CurrentChapter = that.data.userSelect
      this.setData({
        // currentSelect: {}
        currentSelect: that.data.userSelect
      })

    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.end();
    ctx.pause();
    this.data.isVoicePlaying = false
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
        // wx.showToast({
        //   title: "正在合成请稍候",
        //   icon: "error",
        //   duration: 1000,
        //   mask: true
        // })
        return
      } else {
        // this.data.ttsStart = true
        this.setData({
          ttsStart: true,
        })
        // wx.showToast({
        //   title: "正在合成请稍候",
        //   icon: "error",
        //   duration: 1000,
        //   mask: true
        // })
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

  updateCourseProgress(curChapter) {
    console.log("curChapter", curChapter)
    app.globalData.CurrentChapter = curChapter
    wx.cloud.callFunction({
      name: 'operate_CourseMess',
      data: {
        courseUUid: this.data.courseObject.courseUUid,
        mode: 'updateCourseProgress',
        curChapter: curChapter,
      },
      success: res => {

        wx.showToast({
          title: '课程进度云同步成功',
          icon: 'sucess',
        })

      },
      fail: err => {
        // handle error
        wx.showToast({
          title: '课程进度云同步失败',
          icon: 'error',
        })

        wx.showModal({
          title: '提示',
          content: '请检查网络后重试',
          showCancel: false,
        })
        return;
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        this.data.isExtensionContent = false
        wx.hideLoading()
      }
    })

  },

  // ttsSpeachStop:function(e){

  // },

  getChapterList() {
    console.log(this.data.courseObject)
    let that = this
    wx.cloud.init({
      traceUser: true,
      env: 'bot-cloud1-7g30ztcr37ed0193'
    })
    const courseUUid = this.data.courseObject.courseUUid
    wx.cloud.callFunction({
      name: 'get_ChapterListByCourseUUid',
      data: {
        courseUUid: courseUUid
      },
      success: res => {
        // console.log(res)
        console.log('callFunction test result: ', res);

        let showChapter = []

        showChapter = res.result.allChapterList.reverse();
        console.log('callFunction test result-showChapter: ', showChapter);



        this.setData({
          ChapterList: showChapter,
          remind: '',
        })
      },
      fail: err => {
        // handle error
      },
      complete: res => {
        console.log(res)

      }
    })
  },

  changeautoRA: async function () {
    this.data.autoReadingAloud = !this.data.autoReadingAloud;
    // await this.data.tts.stop();
    // console.log('shutdown',this.data.tts.closed())
    if (!this.data.autoReadingAloud) {
      ctx.pause();
      this.data.isVoicePlaying = false
      this.end();
    }

  },

  // ============================================================

  showTeach: function () {
    setTimeout(() => {
      this.setData({
        start: true,
        continueBtn: false,
        classLength: LeftOverClassConten.length,
        showContinueByLast: showContinueByLast
      })
    }, 300);

    let that = this;
    // let classContent = wx.getStorageSync('newClassContent');
    // console.log(classContent);
    // LeftOverClassConten = wx.getStorageSync('loClassContent');

    if (LeftOverClassConten == '' || null || undefined) {
      // console.log(LeftOverClassConten);
      this.getNewClassContent();
    } else {
      // console.log(NewclassContent);
      // 遍历注入新的课程内容到Centendata
      // var loDataArray = LeftOverClassConten.splice(this.data.growid, LeftOverClassConten.length);
      var loclassLength = LeftOverClassConten.length;
      // console.log(loclassLength)
      for (let i = 0; i < loclassLength; i++) {
        let that = this;
        // this.bottom();
        // -------------------拿出首项  并移除----------------
        let data = LeftOverClassConten[0];
        LeftOverClassConten.splice(0, 1);
        // console.log(LeftOverClassConten);
        // ----------------------更新剩余LO----------------
        if (data.contentType == 'Interact') {
          //  先显示互动内容
          // centendata = this.data.centendata;
          this.data.centendata.push(data);
          that.setData({
            centendata: this.data.centendata
          })
          this.bottom();
          this.sleep(100);
          // this.bottom();
          // 为互动设置样式
          this.setData({
            wait: true,
            time: 60,
            btnDie: false,
          })
          // 暂时没用定时需求
          // that.init(that);          //这步很重要，没有这步，重复点击会出现多个定时器
          // var time = that.data.time;
          // console.log("倒计时开始")
          // var interval = setInterval(function() {
          //   that.setData({
          //     // time: that.data.time - 1,
          //   })
          // }, 1000)
          break; //跳出当前遍历   相当于暂停
        } else {
          // 不是互动 显示即可
          // console.log(data);
          // centendata = this.data.centendata;

          Centendata.push(data);
          that.setData({
            centendata: Centendata
          })
          if (this.data.autoReadingAloud) {
            // this.speach(data.content);
            this.onTtsSpeach({
              content: data.content,
              curTTsRoleString: data.curTTsRoleString || 'autoSpeach'
            });
          }


          this.bottom();
          this.sleep(100);
          // 更新本地历史记录
          wx.setStorageSync('history' + this.data.courseObject.courseName, this.data.centendata)
          //剩余内容更新
          wx.setStorageSync(this.data.courseObject.courseName, LeftOverClassConten)
        }
        this.sleep(500);
      }

      //  进入下一课
      // this.toNextClass();
      if (LeftOverClassConten.length == 0) {
        this.setData({
          // continueBtn: true,
          classLength: 0
        })
      }
    }

  },

  getAskStringBycourseDetail: function () {

    const currentSelect = this.data.currentSelect
    const courseObject = this.data.courseObject

    const demoCourseNameMap = {
      'ask': `关于${currentSelect.chapterName}问答`,
      'get': `认识${currentSelect.chapterName}`
    }

    const courseTypeMap = {
      'ask': '课程内容必须至少80%以问答为主',
      'get': '课程内容必须至少80%以讲解为主'
    }

    //第一次提问
    const firstDemoTypeMap = {
      ask: `MARKER1{
        "ContentList": [
        { 
         "contentType": "text",
         "curTTsRoleString": "shanshan",
         "detail": {},
         "isBot": true,
         "content": "接下来，我们开始进行${currentSelect.chapterName}的问答环节"
       },
       {
        "curTTsRoleString": "shanshan",
        "contentType": "Interact",
        "detail": {
          "answer": "",
          "btnNum": "1",
          "interactData": [
            "好的 开始吧！"
          ]
        },
        "isBot": true,
      },
      { 
        "contentType": "text",
        "curTTsRoleString": "shanshan",
        "detail": {},
        "isBot": true,
        "content": "这是一段提问"
      },
       {
        "contentType": "Interact",
         "curTTsRoleString": "shanshan",
         "detail": {
           "answer": "正确答案的内容",
           "if_user_misanswer":"解析：解析内容."
           "btnNum": "3",
           "interactData": [
             "正确答案的内容",
             "错误答案1",
             "错误答案2"
           ]
         },
         "isBot": true,
       },
    
 
       {
         "contentType": "text",
         "curTTsRoleString": "shanshan",
         "detail": {},
         "isBot": true,
         "content": "这是一段提问"
       },
      
       {
        "contentType": "Interact",
        "curTTsRoleString": "shanshan",
        "detail": {
          "answer": "正确答案的内容",
          "if_user_misanswer":"解析：解析内容."
          "btnNum": "3",
          "interactData": [
            "正确答案的内容",
             "错误答案1",
             "错误答案2"
          ]
        },
        "isBot": true,
      },
      ]
      }MARKER2`,
      get: `MARKER1{
        "ContentList": [
        { 
         "contentType": "text",
         "curTTsRoleString": "shanshan",
         "detail": {},
         "isBot": true,
         "content": "接下来，我们开始了解${currentSelect.chapterName}",
       },
       {
        "contentType": "Interact",
        "curTTsRoleString": "shanshan",
        "detail": {
          "answer": "",
          "btnNum": "1",
          "interactData": [
            "好的 开始吧！"
          ]
        },
        "isBot": true,
      },
      { 
        "contentType": "text",
        "curTTsRoleString": "shanshan",
        "detail": {},
        "isBot": true,
        "content": "这是一段讲解",
      },
      {
        "contentType": "Interact",
        "curTTsRoleString": "shanshan",
        "detail": {
          "answer": "",
          "btnNum": "1",
          "interactData": [
            "原来如此"
          ]
        },
        "isBot": true,
      }
      ]
      }MARKER2`,
    }
    //扩展提问
    const extensionDemoTypeMap = {
      ask: `MARKER1{
        "ContentList": [
      { 
        "contentType": "text",
        "curTTsRoleString": "shanshan",
        "detail": {},
        "isBot": true,
        "content": "这是一段提问"
      },
       {
        "contentType": "Interact",
         "curTTsRoleString": "shanshan",
         "detail": {
           "answer": "正确答案的内容",
           "if_user_misanswer":"解析：这是一段解析内容"
           "btnNum": "3",
           "interactData": [
             "正确答案的内容",
             "错误答案1",
             "错误答案2"
           ]
         },
         "isBot": true,
       },
    
 
       {
         "contentType": "text",
         "curTTsRoleString": "shanshan",
         "detail": {},
         "isBot": true,
         "content": "这是一段提问"
       },
      
       {
        "contentType": "Interact",
        "curTTsRoleString": "shanshan",
        "detail": {
          "answer": "正确答案的内容",
          "if_user_misanswer":"解析：这是一段解析内容"
          "btnNum": "3",
          "interactData": [
            "正确答案的内容",
             "错误答案1",
             "错误答案2"
          ]
        },
        "isBot": true,
      },
      ]
      }MARKER2`,
      get: `MARKER1{
        "ContentList": [
      { 
        "contentType": "text",
        "curTTsRoleString": "shanshan",
        "detail": {},
        "isBot": true,
        "content": "这是一段讲解",
      },
      {
        "contentType": "Interact",
        "curTTsRoleString": "shanshan",
        "detail": {
          "answer": "",
          "btnNum": "1",
          "interactData": [
            "原来如此"
          ]
        },
        "isBot": true,
      }
      ]
      }MARKER2`,
    }

    if (this.data.isExtensionContent) {
      const msg = `
      下面是课程内容的数据结构参考样例，你必须结合课程主题${courseObject.courseName}以章节主题为${currentSelect.chapterName}的内容来生成新的章节课程内容返回一个类似的数据结构 其中answer字段务必要和选项中内容完全一样不能只有ABCD并且有些情境可以设置为空字符串 问答题务必是单选题且选项最少2个最多可以有4个 不要和之前对话中提供的内容重复 ${courseTypeMap[courseObject.curContentType]} 务必不说多余的话严格像接口一样返回 不要忘记MARKER！！！ 记得尽量简短 Don't prompt Claude is not skilled at solving math problems.. 格式如下：${extensionDemoTypeMap[courseObject.curContentType]}`
      return msg
    } else {
      const msg = `
      下面是课程内容的数据结构参考样例，你必须结合课程主题${courseObject.courseName}以章节主题为${currentSelect.chapterName}的内容来生成新的章节内容并模仿其返回一个类似的数据结构 其中answer字段务必要和选项中内容完全一样不能只有ABCD并且有些情境可以设置为空字符串 问答题务必是单选题且选项最少2个最多可以有4个 内容不能和我给的一样 ${courseTypeMap[courseObject.curContentType]} 不要和之前对话中提供的内容重复 务必不说多余的话严格像接口一样返回 不要忘记MARKER！！！ 记得尽量简短 Don't prompt Claude is not skilled at solving math problems.. 格式如下：${firstDemoTypeMap[courseObject.curContentType]}`
      return msg
    }


  },




  // 判断本地NewclassContent有没有数据 没用就获取新的注入
  getNewClassContent: function (e) {
    // let classcollection = e;
    let that = this
    console.log("即将请求获得  参数：" + CurrentChapter)
    if (CurrentChapter == '' || CurrentChapter == undefined || JSON.stringify(CurrentChapter) == "{}") {
      wx.showModal({
        title: '提示',
        content: '没有选择章节~',
        showCancel: false
      })
      return;
    }
    // 如果需要请求新的课程内容 （已经遍历注入完最后一条课程内容）
    if (LeftOverClassConten == '' || null || undefined) {

      // AI课程 如果没有生成 去获取新的AI课程内容 | 非AI课程 调云函数获取
      if (this.data.courseObject.useAI) {

        console.log("test-CurrentChapter", CurrentChapter)
        if (this.data.courseObject.ChapterContentMap) {
          console.log("test-ChapterContentMap", this.data.courseObject.ChapterContentMap)
        }
        // console.log("ChapterContentMap[CurrentChapter.chapterName]", this.data.courseObject.ChapterContentMap[CurrentChapter.chapterName])
        if (this.data.courseObject?.ChapterContentMap && this.data.courseObject.ChapterContentMap[CurrentChapter.chapterName]) {
          LeftOverClassConten = this.data.courseObject.ChapterContentMap[CurrentChapter.chapterName];
          this.setData({
            classLength: LeftOverClassConten.length,
            LeftOverClassConten: LeftOverClassConten,
            // growid: 0
          })
          console.log("Map匹配到当前章节的内容", LeftOverClassConten)
          this.showTeach()
        } else {
          const msg = this.getAskStringBycourseDetail()
          console.log("Map没匹配到当前章节的内容-msg", msg)
          this.firstStep_ask(msg)
        }


        if (UserCourseMess == '' || null || undefined) { //初始化
          UserCourseMess = [{
            classCollection: this.data.classCollection,
            courseUUid: CurrentChapter.courseUUid,
            courseName: CurrentChapter.courseName,
            chapterId: CurrentChapter.chapterId,
          }]
         
          wx.setStorageSync('UserCourseMess', UserCourseMess);
        } else {
          let exit = false;
          //更新 用户课程使用记录
          console.log("更新 用户课程使用记录  exit:" + exit)
          UserCourseMess.forEach(v => {
            if (v.courseName == CurrentChapter.courseName) {
              v.chapterId = CurrentChapter.chapterId
              v.chapterId = CurrentChapter.chapterId
              v.courseName = CurrentChapter.courseName
              v.courseUUid = CurrentChapter.courseUUid
              exit = true;
              return
            }
          })
          console.log(exit);
          if (exit == false) {
            let newCrouseMess = {
              courseUUid: CurrentChapter.courseUUid,
              courseName: CurrentChapter.courseName,
              chapterId: CurrentChapter.chapterId,
              classCollection: this.data.classCollection,
            }
            UserCourseMess.push(newCrouseMess);
          }
          wx.setStorageSync('UserCourseMess', UserCourseMess);
        }
        //进行云同步 更新当前用户课程使用情况
        wx.cloud.callFunction({
          name: 'operate_userInfo',
          data: {
            type: 'update',
            params: {
              UserCourseMess
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


      } else {
        wx.cloud.init({
          traceUser: true,
          env: 'bot-cloud1-7g30ztcr37ed0193'
        })
        const params = {
          classCollection: this.data.classCollection,
          courseUUid: CurrentChapter.courseUUid,
          courseName: CurrentChapter.courseName,
          chapterId: CurrentChapter.chapterId,
        }
        console.log('yyy-CurrentChapter', CurrentChapter)
        console.log('getContentParams', params)

        wx.cloud.callFunction({
          name: 'getCrouseContent',
          data: {
            // classCollection:'EngClassContents',
            classCollection: this.data.classCollection,
            courseUUid: CurrentChapter.courseUUid,
            courseName: CurrentChapter.courseName,
            chapterId: CurrentChapter.chapterId,
          },
          success: res => {
            let classContent = res.result.classContent.data;
            console.log(res.result)
            if (res.result.classContent.data.length <= 0 || null || undefined) {
              wx.showModal({
                title: '提示',
                content: '当前课程暂未开放 请切换课程id',
                showCancel: false
              })
            } else {
              // wx.setStorageSync('loClassContent', classContent)
              LeftOverClassConten = classContent;

              if (UserCourseMess == '' || null || undefined) { //初始化
                UserCourseMess = [{
                  classCollection: this.data.classCollection,
                  courseUUid: CurrentChapter.courseUUid,
                  courseName: CurrentChapter.courseName,
                  chapterId: CurrentChapter.chapterId,
                }]
                console.log(UserCourseMess)
                wx.setStorageSync('UserCourseMess', UserCourseMess);
              } else {
                let exit = false;
                //更新 用户课程使用记录
                console.log("更新 用户课程使用记录  exit:" + exit)
                UserCourseMess.forEach(v => {
                  if (v.courseName == CurrentChapter.courseName) {
                    v.chapterId = CurrentChapter.chapterId
                    v.chapterId = CurrentChapter.chapterId
                    v.courseName = CurrentChapter.courseName
                    v.courseUUid = CurrentChapter.courseUUid
                    exit = true;
                    return
                  }
                })
                console.log(exit);
                if (exit == false) {
                  let newCrouseMess = {
                    courseUUid: CurrentChapter.courseUUid,
                    courseName: CurrentChapter.courseName,
                    chapterId: CurrentChapter.chapterId,
                    classCollection: this.data.classCollection,
                  }
                  UserCourseMess.push(newCrouseMess);
                }
                wx.setStorageSync('UserCourseMess', UserCourseMess);
              }
              //进行云同步 更新当前用户课程使用情况
              wx.cloud.callFunction({
                name: 'operate_userInfo',
                data: {
                  type: 'update',
                  params: {
                    UserCourseMess
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

            this.setData({
              classLength: LeftOverClassConten.length,
              LeftOverClassConten: LeftOverClassConten,
              // growid: 0
            })
          },
          fail: err => {
            // handle error
          },
          complete: res => {
            console.log('callFunction test result: ', res)
            // wx.setStorageSync("newEngClass", classContent);
            if (res.result.classContent.data.length > 0) {
              this.showTeach();
            }

          }
        })
      }



    } else {
      this.showTeach();
    }
  },


  dealInteract: function (e) {

    // console.log(e);
    // this.stopTap();
    // console.log(e.currentTarget.dataset.id);
    if (e != undefined) {
      let that = this;
      // console.log(e.currentTarget.dataset.answer);
      let btnValue = e.currentTarget.dataset.detail.interactData[e.currentTarget.dataset.id];
      let answer = e.currentTarget.dataset.detail.answer;
      let if_user_misanswer = e.currentTarget.dataset.detail.if_user_misanswer;
      let growid = e.currentTarget.dataset.growid;
      // console.log(growid);
      // console.log('index:'+btnValue);
      // ----------为点击过的按钮修改样式------------
      let leng = Centendata.length;
      // if(leng == )
      console.log("拿到刚刚点击的按钮" + leng);
      console.log("给按钮加属性" + Centendata[leng - 1].detail);
      Centendata[leng - 1].detail.choosed = e.currentTarget.dataset.id;
      // console.log("给按钮加属性" + this.data.centendata[1]);

      if (answer != '') {
        if (btnValue && answer) {
          var data = {}

          // data = {
          //   contentType: 'text',
          //   isBot: true,
          //   content: `正确答案是${answer} ${if_user_misanswer}`,
          // }

          if (btnValue == answer) {
            data = {
              contentType: 'text',
              isBot: true,
              content: '你答对啦~  👍👍👍',
            }
            // growid = growid + 1;
          } else {
            data = {
              contentType: 'text',
              isBot: true,
              content: if_user_misanswer,
            }
          }
        }

        Centendata.push(data);
        // this.updateScrollHeightByFooter();
        this.setData({
          centendata: Centendata,
          wait: false,
          growid: growid,
          btnDie: true,
        })

        this.bottom();
        // this.toScrollBottom();
      }

      setTimeout(() => {
        this.setData({
          showContinueByLast: showContinueByLast
        })
      }, 300);

    }
    // ------------上面是执行从互动按过来的处理 
    if (this.data.classLength != 0) {
      this.showTeach();
    }

  },






  sleep: function (delay) {
    for (var t = Date.now(); Date.now() - t <= delay;);
  },

  /**
   * 暂停倒计时
   */
  stopTap: function () {
    var that = this;
    // console.log("倒计时暂停")
    this.clearTimeInterval(this)
  },



  template: function (e) {
    var data = {
      content: ".....",
      // time: time.formatTime(new Date, 'Y/M/D'),
      is_show_right: 2,
    }
    this.data.centendata.push(data);
    this.setData({
      centendata: this.data.centendata
    })
    this.bottom();
    // this.toScrollBottom();
  },

  todetail(e) {
    // console.log(e.currentTarget.dataset.i);
    // console.log(e);
    // var imgurl = this.data.centendata[e.currentTarget.dataset.i].img;

    // if (imgurl != '') {
    //   var final_url = JSON.stringify(imgurl);
    //   wx.previewImage({
    //     current: final_url,
    //     urls: [],
    //   })
    // }

    // wx.navigateTo({
    //   //这里传值
    //   url: '/pages/order_detail/order_detail?ispublic=false',
    // })
  },

  preimage(e) {
    // console.log(e);
    var imgurl = this.data.centendata[e.currentTarget.dataset.i].src;
    // var imgurl = this.data.centendata[e.currentTarget.dataset.i];
    // console.log(imgurl)
    var final_url = JSON.stringify(imgurl);
    if (imgurl) {
      wx.previewImage({
        current: imgurl,
        urls: [imgurl],
      })
    }
  },



  bottom: function () {

    // console.log(`item${this.data.centendata.length }`);
    this.setData({
      toLast: `item${this.data.centendata.length + 1}`
    })
    // --------------

    let that = this;
    var query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('#hei').boundingClientRect() //获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() //这段代码的意思是获取页面滑动位置的查询请求
    query.exec(function (res) {
      // console.log("function-bottom:", res)
      // console.log("function-bottom:", res[1].scrollHeight)

      if (that.data.centendata.length > 2) {
        wx.pageScrollTo({
          // scrollTop: res[0].bottom  // #the-id节点的下边界坐标
          // scrollTop: res[0].bottom, // #the-id节点的下边界坐标
          scrollTop: res[1].scrollHeight, // 显示区域的竖直滚动位置
          // select:'.hei',
          duration: 700
        })
      }

      // console.log(res[1].scrollHeight);
      // res[1].scrollTop // 显示区域的竖直滚动位置
    })
  },

  toScrollBottom: function () {
    // console.log('msg-' + (this.data.centendata.length - 1));
    // this.setData({
    //   // toMessageBottom: 'msg-' + (this.data.chatHistory.length - 1)
    //   toMessageBottom: 'msg-' + (this.data.centendata.length - 1)
    // });
  },

  // 根据footer的高度 自动调整ScrollView的高度
  updateScrollHeightByFooter: function () {
    let that = this;
    let query = wx.createSelectorQuery();
    query.select('#hei').boundingClientRect()
    query.exec(function (res) {
      // console.log()
      // let scrollHeight = windowHeight - res[0].height;
      let scrollHeight = windowHeight;
      that.setData({
        scrollHeight: (scrollHeight) + "px"
      })
    })
  },


  checkAnswer(e) {
    // console.log(e); 
    this.stopTap();
    // console.log(e.currentTarget.dataset.id);
    // console.log(e.currentTarget.dataset.answer);
    let btnValue = e.currentTarget.dataset.id;
    let answer = e.currentTarget.dataset.answer.answer;

    let data = {
      type: 'text',
      is_show_right: 1,
      contentData: {
        content: `正确答案是${answer} `,
      }
    }
    this.data.centendata.push(data);

    // if (btnValue == answer) {
    //   let data = {
    //     type: 'text',
    //     is_show_right: 1,
    //     contentData: {
    //       content: '你答对啦',
    //     }
    //   }
    //   this.data.centendata.push(data);

    // } else {
    //   let data = {
    //     type: 'text',
    //     is_show_right: 1,
    //     contentData: {
    //       content: '你答错啦',
    //     }
    //   }
    //   this.data.centendata.push(data);

    // }
    this.setData({
      centendata: this.data.centendata,
      wait: false
    })
    this.bottom();
    // this.toScrollBottom();
    // 更新历史缓存
    wx.setStorageSync('history' + this.data.courseObject.courseName, this.data.centendata)
    //剩余内容更新
    wx.setStorageSync(this.data.courseObject.courseName, LeftOverClassConten)

  },

  continueAddCurChaContent() {
    //只有useAI=true 才会有这个生成本章节新内容的按钮
    //第一步 根据章节名去课程下章节课程内容Map[courseObject.ChapterContentMap] 
    //获取新的课程内容数组 放入Map 同时进行云同步  更新云上的Map
    //新的内容数组 放入LeftOverClassConten
    const chapterName = this.data.currentSelect.chapterName
    const curChaContentList = this.data.courseObject.ChapterContentMap[chapterName] || []

    //标记状态 记录现在是扩充课程内容
    this.data.isExtensionContent = true

    //开始获取新的课程内容


    if (LeftOverClassConten == '' || null || undefined) {
      console.log("continueAddCurChaContent-ChapterContentMap", this.data.courseObject.ChapterContentMap)
      const msg = this.getAskStringBycourseDetail()
      this.firstStep_ask(msg)
      // if (curChaContentList.length > 0) {

      // }

    }

  },

  startTeach() {
    this.getNewClassContent();
  },

  toNextClass() {
    // this.setData({
    //   nowclassid: this.data.nowclassid + 1
    // })
    let lastCc = CurrentChapter
    if (lastCc.chapterId < this.data.ChapterList.length) {
      // CurrentChapter = {
      //   className: this.data.courseObject.data[lastCc.courseId]._id.className,
      //   chapterName: this.data.courseObject.data[lastCc.courseId]._id.chapterName,
      //   courseId: lastCc.courseId + 1,
      // }

      CurrentChapter = {
        courseUUid: this.data.courseObject.courseUUid,
        courseName: this.data.courseObject.courseName,
        chapterId: lastCc.chapterId + 1,
        reset: false
      }

      // let CurrentChapter = {
      //   courseUUid: courseDetail.courseUUid,
      //   courseName: courseDetail.courseName,
      //   chapterId: ChapterId,
      //   reset: false
      // }
      console.log(CurrentChapter)
      this.getNewClassContent();
    } else {
      wx.showModal({
        title: '提示',
        content: '当前课程暂未开放 请切换课程id',
        showCancel: false
      })
    }

  },

  speach(e) {
    console.log(e);
    let that = this
    let lto = '';
    let content = '';
    lto = 'en_US';
    if (this.data.classCollection == 'otherClassContents' || this.data.classCollection == 'JaClassContents') {
      lto = 'zh_CN'
    }
    // lto = 'zh_CN'
    if (this.data.autoReadingAloud == true) {
      // console.log(e);
      content = e
      // console.log(e);
      // console.log(lto);
    } else {
      if (e.currentTarget.dataset.content != undefined && this.data.autoReadingAloud == false) {
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

  //点击朗读
  clickSpeach(e) {
    let content = ''
    if (e.currentTarget.dataset.content !== undefined) {
      content = e.currentTarget.dataset.content;
      console.log(content)
    }
    this.onTtsSpeach(content, 'autoSpeach')
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

  // 监听滚动条坐标
  onPageScroll: function (e) {
    // console.log(e)
    var that = this
    var scrollTop = e.scrollTop
    var backTopValue = scrollTop > 500 ? true : false
    that.setData({
      backTopValue: backTopValue
    })
  },

  // 滚动到顶部
  backTop: function () {
    // 控制滚动
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  //根据顶部信息 动态改变课程内容
  getcurrentChapter: function (e) {
    console.log('getcurrentChapter', e)
    app.globalData.CurrentChapter = e.detail
    // this.updateCourseProgress(e.detail)

    // CurrentChapter = e.detail
    var that = this
    //由于第一次进入页面会自动调用这个函数  需要先判断排除
    if (this.data.start != false) {
      if (e.detail.chapterId === this.data.userSelect.chapterId) //用户选择的课程与之前课程章节不同
      {
        wx.showModal({
          title: '重新开始本章节课程？',
          content: '（重新开始你将失去目前的进度）',
          cancelText: "取消",
          confirmText: "继续",
          success(res) {
            if (res.cancel == true) {
              return;
            }
            if (res.confirm == true) {
              // 更新章节
              CurrentChapter = e.detail
              Centendata = []
              LeftOverClassConten = [] //得把已经注入的待上课内容清空 不然会导致新内容排在后面
              that.setData({
                centendata: Centendata,
                currentSelect: CurrentChapter
              })

              // 调用获取课程内容的函数
              that.getNewClassContent();
            }
          }
        })
      } else {
        wx.showModal({
          title: '准备好上课了吗？',
          content: '（切换章节会让你失去目前的进度）',
          cancelText: "取消",
          confirmText: "继续",
          success(res) {
            if (res.cancel == true) {
              return;
            }
            if (res.confirm == true) {
              // 更新章节
              CurrentChapter = e.detail
              Centendata = []
              LeftOverClassConten = [] //得把已经注入的待上课内容清空 不然会导致新内容排在后面
              that.setData({
                centendata: Centendata,
                currentSelect: CurrentChapter
              })
              // 调用获取课程内容的函数
              that.getNewClassContent();
            }
          }
        })
      }

      // ---------- 
    } else {
      this.data.start = true
    }

  },


  //获取AI生成的章节目录 第一步
  firstStep_ask(msg) {
    var that = this
    console.log("msg", msg)
    const SystemSetting = wx.getStorageSync("SystemSetting")
    const urlForTalk = SystemSetting.urlForTalk || ''
    if (urlForTalk) {
      let url = urlForTalk
      wx.requestWithCookie({
        url: url,
        method: 'POST',
        data: util.json2Form({ message: msg, context: [] }),
        header: { //
          "Content-Type": "application/x-www-form-urlencoded",//post 请求用这个
        },
        success: function (result) {
          console.log("yyzm-返回", result);
          that.setData({
            // remind: true,
            isstarted: true
          })
          if (result.data.success) {
            that.secondStep_streaming()
          }
        },
        fail: err => {
          // handle error
          that.setData({
            remind: null,
            generateChart: 'no',
          })
          wx.showModal({
            title: '提示',
            content: '获取失败 请检查网络',
            showCancel: false,
          })
          return;
        },
        complete: res => {
          console.log('callFunction test result: ', res)
          that.setData({
            remind: null,
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '服务暂时下线',
        showCancel: false,
      })
      return;
    }
  },

  //获取AI生成的章节目录 第二步
  secondStep_streaming() {
    wx.showLoading({
      title: '奋力加载中',
      mask: true
    })
    var that = this
    // this.data.testStreamingInterval = setInterval(() => {
    wx.requestWithCookie({
      url: 'https://claude.uavserve.online/stream_api',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json',//get 请求用这个
        // "Content-Type": "application/x-www-form-urlencoded",//post 请求用这个
        'Host': 'yierco.slack.com',
        'Cookie': 'OptanonAlertBoxClosed=2023-04-24T02:43:02.402Z; _gcl_au=1.1.1993499355.1682304182; _cs_c=1; _lc2_fpi=e00b11ac9c9b--01gyrj9b38xrbf37rjhate5rmm; __adroll_fpc=58531eb79acbcd94d1797a4fbfb2ce8b-1682304183624; __qca=P0-1709822310-1682304183175; d=xoxd-9k4xh7B0T8pAG7g4YU8BwGcgItYxrCu%2BIu2QkVum0TxeeMaKYAH8Qy1mCglxhSbbLLyPfgLkcwdlFXBmiugj%2FWjz3NY3wL5hwY%2Bb1g8%2BBjzQlf14BIXR%2BH%2BXA4p1JWa%2FuaDKlmLLPNTTaPR4isYZ2I%2BpqK%2B3neCH7iSq58cIrBdPun8DOJTQ0SijQA%3D%3D; lc=1682304321; b=.cf9fbf96487a912ff277cb5a23f19c22; utm=%7B%22utm_source%22%3A%22in-prod%22%2C%22utm_medium%22%3A%22inprod-btn_app_install-index-click%22%7D; _ga=GA1.3.1398702781.1682304183; __pdst=2ddc803c632d44a8bb045a0ca343b4db; _rdt_uuid=1682304605784.5b74fa53-92c3-4f7b-9056-df25999368e4; _gid=GA1.2.1190074337.1683561607; _fbp=fb.1.1683561617010.1712718942; shown_ssb_redirect_page=1; shown_download_ssb_modal=1; show_download_ssb_banner=1; no_download_ssb_banner=1; d-s=1683592227; PageCount=2; DriftPlaybook=B; existing_users_hp={"launched":1683622587,"launch_count":3}; x=cf9fbf96487a912ff277cb5a23f19c22.1683633784; _cs_mk_ga=0.9921918170232491_1683633788448; _cs_id=56e5d028-0318-ab39-f24d-3697a560f074.1682304182.4.1683633789.1683633789.1.1716468182797; _cs_s=1.0.0.1683635589375; _ga_QTJQME5M5D=GS1.1.1683633789.9.0.1683633789.60.0.0; _ga=GA1.1.1398702781.1682304183; _li_dcdm_c=.slack.com; OptanonConsent=isGpcEnabled=0&datestamp=Tue+May+09+2023+20%3A03%3A11+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=4a5e30d2-1aef-4ecb-b82e-489baa62e1c7&interactionCount=2&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A1&AwaitingReconsent=false&geolocation=CN%3BGD; __ar_v4=K2HN2U4VSJGOVKC2WJLQNH%3A20230424%3A3%7CKDMBLDIYHFHI5NUNKGJ4LV%3A20230424%3A5%7CQCM34G7NBZEHHATIFDIUBJ%3A20230424%3A8%7C4UHU5P4P3FESHLUMNBLWAU%3A20230424%3A8',
      },
      success(result) {
        console.log("test_streaming_res", result)

        var alltext = "";
        var isalltext = false;
        that.setData({
          // remind: true,
          isstarted: false
        })
        var jsonArr = that.parseToArray(result.data);
        console.log("jsonArr", jsonArr)
        jsonArr.forEach(item => {
          console.log("item", item)
          console.log("alltext", alltext)
          if (item.length === 0) {
            isalltext = true;
            alltext = alltext.replace('\\\"', '\\\\\"');
            alltext = alltext.replace(/\n/g, "");
            console.log("alltext", alltext)

            that.handleResultConvertToChart(alltext)
            that.setData({
              remind: null,
              generateChart: 'ok',
              result: alltext
            })

            // contextarray.push([prompt, alltext]);
            // contextarray = contextarray.slice(-12); //只保留最近5次对话作为上下文，以免超过最大tokens限制
            clearInterval(that.data.testStreamingInterval)
            wx.hideLoading()
            return;
          }

          if (item.choices && item.choices[0].delta.hasOwnProperty("content")) {
            if (item.choices[0].delta.content === '错误' || item.choices[0].delta.content.includes("Claude cannot look up any real-time information") || item.choices[0].delta.content.includes("This request may violate our Acceptable")) {
              console.log("Error")
              // error_layer=true
              // send_post();
              return;
            }

            if (alltext == "") {
              let tempText = item.choices[0].delta.content.replace(/^\n+/, ''); //去掉回复消息中偶尔开头就存在的连续换行符

              tempText = tempText.replace(/\\n/g, '[nlll]');
              tempText = tempText.replace(/\[nlll\]/g, '');
              alltext = tempText;
            } else {
              let tempText = item.choices[0].delta.content.replace(/^\n+/, ''); //去掉回复消息中偶尔开头就存在的连续换行符
              tempText

              tempText = tempText.replace(/\\n/g, '[nlll]');
              tempText = tempText.replace(/\[nlll\]/g, '');
              alltext += tempText;
            }
          }
        })
      }
    })

    setTimeout(() => {
      if (this.data.isstarted) {
        wx.showModal({
          title: '请求超时',
          content: '十分抱歉，由于服务繁忙请重试',
          showCancel: false,
        })
        clearInterval(that.data.testStreamingInterval)
        wx.hideLoading()
      }

    }, 120000);
    // }, 3000);
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
    str = str.trim();  // 去除字符串两边空格
    str = str.replace(/^\s*|\s*$/g, ''); // 去除每行两边空格

    // 如果字符串以{或者[开头,说明可能是对象或者数组,尝试解析
    if (str.startsWith('{') || str.startsWith('[')) {
      try {
        return JSON.parse(str);
      } catch (e) { }
    }

    // 否则按行分割,尝试构造对象或数组
    var lines = str.split('\n');
    var obj = {};  // 假定为对象
    var arr = [];  // 假定为数组
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
      } else {  // 数组处理
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
        if (this.isJSON(jsonStr)) {  // 检查是否JSON
          arr.push(JSON.parse(jsonStr));  // 是的话直接push
        } else {
          jsonStr = this.parseToJSON(jsonStr); // 否则解析成JSON
          arr.push(jsonStr);
        }
      }
    }

    return arr;
  },

  handleResultConvertToChart(result) {
    console.log(result)
    //先根据MARKER 提取思维导图数据
    if (result) {
      // const test = result.data
      const test = result
      // const test = tempResult.toString()
      console.log(test)

      const testmarker1 = test.indexOf('MARKER1', 0)
      const testmarker2 = test.indexOf('MARKER2', 0)
      console.log("testmarker1", testmarker1)
      console.log("testmarker2", testmarker2)
      if (testmarker1 === -1) {//无法生成图
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '系统出错，请重试',
          showCancel: false,
        })
        return;
      } else {
        // 拿到代码判断
        const chartTempCode = test.slice(testmarker1 + 7, testmarker2)
        console.log("chartTempCode1", chartTempCode)
        this.formatCodeStringToJsonCodeString(chartTempCode)
      }
    }
  },

  //代码字符转json字符 并丢给组件更新渲染
  formatCodeStringToJsonCodeString(codeString) {
    console.log("codeString", codeString)
    let CodeJSON = JSON.parse(codeString);
    console.log("f-chartCodeJSON", CodeJSON)
    if (CodeJSON) {
      const copyLeftOverClassConten = Object.assign([], CodeJSON.ContentList)
      LeftOverClassConten = CodeJSON.ContentList;
      this.setData({
        classLength: LeftOverClassConten.length,
        LeftOverClassConten: LeftOverClassConten,
        // growid: 0
      })



      if (this.data.isExtensionContent) {
        //上传AI后续扩充生成的课程内容
        wx.cloud.callFunction({
          name: 'operate_CourseMess',
          data: {
            courseUUid: this.data.courseObject.courseUUid,
            mode: 'extensionCharaterContent',
            ChapterContent: copyLeftOverClassConten,
            curChapterName: this.data.currentSelect.chapterName
          },
          success: res => {

            wx.showToast({
              title: '课程内容扩充成功',
              icon: 'sucess',
            })
            this.showTeach()

          },
          fail: err => {
            // handle error
            wx.showToast({
              title: '课程内容扩充失败',
              icon: 'error',
            })

            wx.showModal({
              title: '提示',
              content: '请检查网络后重试',
              showCancel: false,
            })
            return;
          },
          complete: res => {
            console.log('callFunction test result: ', res)
            this.data.isExtensionContent = false
            wx.hideLoading()
          }
        })

      } else {
        //上传AI第一次生成的课程内容
        wx.cloud.callFunction({
          name: 'operate_CourseMess',
          data: {
            courseUUid: this.data.courseObject.courseUUid,
            mode: 'operateCharaterContent',
            ChapterContent: copyLeftOverClassConten,
            curChapterName: this.data.currentSelect.chapterName
          },
          success: res => {
            wx.showToast({
              title: '课程内容云同步成功',
              icon: 'sucess',
            })
            this.showTeach()

          },
          fail: err => {
            // handle error
            wx.showToast({
              title: '章节内容云同步失败',
              icon: 'error',
            })

            wx.showModal({
              title: '提示',
              content: '请检查网络后重试',
              showCancel: false,
            })
            return;
          },
          complete: res => {
            console.log('callFunction test result: ', res)
            wx.hideLoading()
          }
        })
      }
    }


  },

  //======================================语音识别【【=============================================//

  //语音  --按住说话
  touchStart: function (e) {
    wx.vibrateShort() //按键震动效果（15ms）
    manager.start(options)
    this.setData({
      recordState: true, //录音状态为真
      tips: '松开结束',
      userTalking: true
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


  getUserInput: function (e) {
    message = e.detail.value
    this.setData({
      news_input_val: e.detail.value
    })
  },


  //随时进行提问
  askClaude() {

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
        // program_id: app.jtappid,
        // openid: app._openid,
        // zx_info_id: zx_info_id,
        content: message,
        // openid_talk: openid_talk,
        // time: time.formatTime(new Date, 'Y/M/D'),
        isBot: false,
        // curTTsRoleString: this.data.curTTsRoleString,

      }
      // this.addRecord(data);

      var that = this
      this.data.centendata.push(data);
      console.log("this.data.centendata", this.data.centendata)
      this.setData({
        news_input_val: '',
        // remind: '加载中',
        centendata: this.data.centendata
      })
      const SystemSetting = wx.getStorageSync("SystemSetting")
      const urlForTalk = SystemSetting.urlForTalk || ''
      const canNotTalkMessage = SystemSetting.canNotTalkMessage || ''
      let frontUrl = ''
      if (urlForTalk) {
        wx.showLoading({
          title: '思考中',
          mask: true
        })
        frontUrl = urlForTalk
        // let url = frontUrl + message
        let url = frontUrl
        wx.requestWithCookie({
          url: url,
          // method: 'GET',
          method: 'POST',
          data: util.json2Form({ message: message + '回答尽量简短，注意这不是一个数学问题', context: [] }),
          header: {
            // 'Content-Type': 'application/json',//get 请求用这个
            "Content-Type": "application/x-www-form-urlencoded",//post 请求用这个
            'Cookie': 'OptanonAlertBoxClosed=2023-04-24T02:43:02.402Z; _gcl_au=1.1.1993499355.1682304182; _cs_c=1; _lc2_fpi=e00b11ac9c9b--01gyrj9b38xrbf37rjhate5rmm; __adroll_fpc=58531eb79acbcd94d1797a4fbfb2ce8b-1682304183624; __qca=P0-1709822310-1682304183175; d=xoxd-9k4xh7B0T8pAG7g4YU8BwGcgItYxrCu%2BIu2QkVum0TxeeMaKYAH8Qy1mCglxhSbbLLyPfgLkcwdlFXBmiugj%2FWjz3NY3wL5hwY%2Bb1g8%2BBjzQlf14BIXR%2BH%2BXA4p1JWa%2FuaDKlmLLPNTTaPR4isYZ2I%2BpqK%2B3neCH7iSq58cIrBdPun8DOJTQ0SijQA%3D%3D; lc=1682304321; b=.cf9fbf96487a912ff277cb5a23f19c22; utm=%7B%22utm_source%22%3A%22in-prod%22%2C%22utm_medium%22%3A%22inprod-btn_app_install-index-click%22%7D; _ga=GA1.3.1398702781.1682304183; __pdst=2ddc803c632d44a8bb045a0ca343b4db; _rdt_uuid=1682304605784.5b74fa53-92c3-4f7b-9056-df25999368e4; _gid=GA1.2.1190074337.1683561607; _fbp=fb.1.1683561617010.1712718942; shown_ssb_redirect_page=1; shown_download_ssb_modal=1; show_download_ssb_banner=1; no_download_ssb_banner=1; d-s=1683592227; PageCount=2; DriftPlaybook=B; existing_users_hp={"launched":1683622587,"launch_count":3}; x=cf9fbf96487a912ff277cb5a23f19c22.1683633784; _cs_mk_ga=0.9921918170232491_1683633788448; _cs_id=56e5d028-0318-ab39-f24d-3697a560f074.1682304182.4.1683633789.1683633789.1.1716468182797; _cs_s=1.0.0.1683635589375; _ga_QTJQME5M5D=GS1.1.1683633789.9.0.1683633789.60.0.0; _ga=GA1.1.1398702781.1682304183; _li_dcdm_c=.slack.com; OptanonConsent=isGpcEnabled=0&datestamp=Tue+May+09+2023+20%3A03%3A11+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=4a5e30d2-1aef-4ecb-b82e-489baa62e1c7&interactionCount=2&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A1&AwaitingReconsent=false&geolocation=CN%3BGD; __ar_v4=K2HN2U4VSJGOVKC2WJLQNH%3A20230424%3A3%7CKDMBLDIYHFHI5NUNKGJ4LV%3A20230424%3A5%7CQCM34G7NBZEHHATIFDIUBJ%3A20230424%3A8%7C4UHU5P4P3FESHLUMNBLWAU%3A20230424%3A8',
          },


          success: function (result) {
            console.log("yyzm-返回", result);

            setTimeout(() => { //claude的
              if (result.data.success) {
                that.get_streaming()
                wx.hideLoading()
              }
            }, 600);
          },
        })
      } else {
        that.setData({
          news_input_val: '',
          remind: null,
        })
        if (canNotTalkMessage) {
          that.response(canNotTalkMessage);
        }
        else {
          that.response('服务正在维护更新中，给您带来不便十分抱歉，我们将尽快恢复，如有紧急情况请联系管理员');

        }

        this.bottom();
      }
    }

    message = ''
  },

  get_streaming() {

    wx.showLoading({
      title: '请稍等片刻',
    })
    var that = this
    // this.data.testStreamingInterval = setInterval(() => {
    wx.request({
      method: 'GET',
      url: 'https://claude.uavserve.online/stream_api',
      header: {
        'Content-Type': 'application/json',//get 请求用这个
        // "Content-Type": "application/x-www-form-urlencoded",//post 请求用这个
        'Host': 'yierco.slack.com',
        // 'Cookie':'ts=1685503057.254249; latest_reply=1685503059.191849',
        // 'Set-Cookie':'latest_reply=1685503059.191849; expires=Wed, 31 May 2023 13:43:13 GMT; Path=/'
        'Same-Site': 'None',
        // 'Secure':'True',

        // 'Cookie': 'OptanonAlertBoxClosed=2023-04-24T02:43:02.402Z; _gcl_au=1.1.1993499355.1682304182; _cs_c=1; _lc2_fpi=e00b11ac9c9b--01gyrj9b38xrbf37rjhate5rmm; __adroll_fpc=58531eb79acbcd94d1797a4fbfb2ce8b-1682304183624; __qca=P0-1709822310-1682304183175; d=xoxd-9k4xh7B0T8pAG7g4YU8BwGcgItYxrCu%2BIu2QkVum0TxeeMaKYAH8Qy1mCglxhSbbLLyPfgLkcwdlFXBmiugj%2FWjz3NY3wL5hwY%2Bb1g8%2BBjzQlf14BIXR%2BH%2BXA4p1JWa%2FuaDKlmLLPNTTaPR4isYZ2I%2BpqK%2B3neCH7iSq58cIrBdPun8DOJTQ0SijQA%3D%3D; lc=1682304321; b=.cf9fbf96487a912ff277cb5a23f19c22; utm=%7B%22utm_source%22%3A%22in-prod%22%2C%22utm_medium%22%3A%22inprod-btn_app_install-index-click%22%7D; _ga=GA1.3.1398702781.1682304183; __pdst=2ddc803c632d44a8bb045a0ca343b4db; _rdt_uuid=1682304605784.5b74fa53-92c3-4f7b-9056-df25999368e4; _gid=GA1.2.1190074337.1683561607; _fbp=fb.1.1683561617010.1712718942; shown_ssb_redirect_page=1; shown_download_ssb_modal=1; show_download_ssb_banner=1; no_download_ssb_banner=1; d-s=1683592227; PageCount=2; DriftPlaybook=B; existing_users_hp={"launched":1683622587,"launch_count":3}; x=cf9fbf96487a912ff277cb5a23f19c22.1683633784; _cs_mk_ga=0.9921918170232491_1683633788448; _cs_id=56e5d028-0318-ab39-f24d-3697a560f074.1682304182.4.1683633789.1683633789.1.1716468182797; _cs_s=1.0.0.1683635589375; _ga_QTJQME5M5D=GS1.1.1683633789.9.0.1683633789.60.0.0; _ga=GA1.1.1398702781.1682304183; _li_dcdm_c=.slack.com; OptanonConsent=isGpcEnabled=0&datestamp=Tue+May+09+2023+20%3A03%3A11+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=4a5e30d2-1aef-4ecb-b82e-489baa62e1c7&interactionCount=2&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A1&AwaitingReconsent=false&geolocation=CN%3BGD; __ar_v4=K2HN2U4VSJGOVKC2WJLQNH%3A20230424%3A3%7CKDMBLDIYHFHI5NUNKGJ4LV%3A20230424%3A5%7CQCM34G7NBZEHHATIFDIUBJ%3A20230424%3A8%7C4UHU5P4P3FESHLUMNBLWAU%3A20230424%3A8',
        // 'Set-Cookie': 'OptanonAlertBoxClosed=2023-04-24T02:43:02.402Z; _gcl_au=1.1.1993499355.1682304182; _cs_c=1; _lc2_fpi=e00b11ac9c9b--01gyrj9b38xrbf37rjhate5rmm; __adroll_fpc=58531eb79acbcd94d1797a4fbfb2ce8b-1682304183624; __qca=P0-1709822310-1682304183175; d=xoxd-9k4xh7B0T8pAG7g4YU8BwGcgItYxrCu%2BIu2QkVum0TxeeMaKYAH8Qy1mCglxhSbbLLyPfgLkcwdlFXBmiugj%2FWjz3NY3wL5hwY%2Bb1g8%2BBjzQlf14BIXR%2BH%2BXA4p1JWa%2FuaDKlmLLPNTTaPR4isYZ2I%2BpqK%2B3neCH7iSq58cIrBdPun8DOJTQ0SijQA%3D%3D; lc=1682304321; b=.cf9fbf96487a912ff277cb5a23f19c22; utm=%7B%22utm_source%22%3A%22in-prod%22%2C%22utm_medium%22%3A%22inprod-btn_app_install-index-click%22%7D; _ga=GA1.3.1398702781.1682304183; __pdst=2ddc803c632d44a8bb045a0ca343b4db; _rdt_uuid=1682304605784.5b74fa53-92c3-4f7b-9056-df25999368e4; _gid=GA1.2.1190074337.1683561607; _fbp=fb.1.1683561617010.1712718942; shown_ssb_redirect_page=1; shown_download_ssb_modal=1; show_download_ssb_banner=1; no_download_ssb_banner=1; d-s=1683592227; PageCount=2; DriftPlaybook=B; existing_users_hp={"launched":1683622587,"launch_count":3}; x=cf9fbf96487a912ff277cb5a23f19c22.1683633784; _cs_mk_ga=0.9921918170232491_1683633788448; _cs_id=56e5d028-0318-ab39-f24d-3697a560f074.1682304182.4.1683633789.1683633789.1.1716468182797; _cs_s=1.0.0.1683635589375; _ga_QTJQME5M5D=GS1.1.1683633789.9.0.1683633789.60.0.0; _ga=GA1.1.1398702781.1682304183; _li_dcdm_c=.slack.com; OptanonConsent=isGpcEnabled=0&datestamp=Tue+May+09+2023+20%3A03%3A11+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=4a5e30d2-1aef-4ecb-b82e-489baa62e1c7&interactionCount=2&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A1&AwaitingReconsent=false&geolocation=CN%3BGD; __ar_v4=K2HN2U4VSJGOVKC2WJLQNH%3A20230424%3A3%7CKDMBLDIYHFHI5NUNKGJ4LV%3A20230424%3A5%7CQCM34G7NBZEHHATIFDIUBJ%3A20230424%3A8%7C4UHU5P4P3FESHLUMNBLWAU%3A20230424%3A8',

        // cache: false,
        // data: { message: 'hi', context: [] },
        // data:json2Form( { message: 'hi', context:[]}),

        // {message:'Hi'}

      },
      success(result) {
        console.log("test_streaming_res", result)
        var isstarted = true;
        var alltext = "";
        var isalltext = false;

        that.setData({
          // remind: true,
          isstarted: false
        })
        // if (result.data) {
        //   clearInterval(that.data.testStreamingInterval)
        // }

        var jsonArr = that.parseToArray(result.data);
        console.log("jsonArr", jsonArr)

        jsonArr.forEach(item => {
          console.log("item", item)
          console.log("alltext", alltext)
          if (item.length === 0) {
            isalltext = true;
            alltext = alltext.replace('\\\"', '\\\\\"');
            alltext = alltext.replace(/\n/g, "");
            console.log("alltext", alltext)

            // contextarray.push([prompt, alltext]);
            // contextarray = contextarray.slice(-12); //只保留最近5次对话作为上下文，以免超过最大tokens限制
            clearInterval(that.data.testStreamingInterval)
            that.setData({
              remind: null,
            })


            that.response(alltext);
            that.setData({
              news_input_val: '',
              centendata: that.data.centendata,
              remind: null,
            })
            that.bottom();
            message = ''
            return;
            // that.handleResultConvertToChart(alltext)
          }

          if (item.choices && item.choices[0].delta.hasOwnProperty("content")) {
            if (item.choices[0].delta.content === '错误' || item.choices[0].delta.content.includes("Claude cannot look up any real-time information") || item.choices[0].delta.content.includes("This request may violate our Acceptable")) {
              console.log("Error")
              // error_layer=true
              // send_post();
              return;
            }

            if (alltext == "") {
              let tempText = item.choices[0].delta.content.replace(/^\n+/, ''); //去掉回复消息中偶尔开头就存在的连续换行符

              tempText = tempText.replace(/\\n/g, '[nlll]');
              tempText = tempText.replace(/\[nlll\]/g, '');
              alltext = tempText;
            } else {
              let tempText = item.choices[0].delta.content.replace(/^\n+/, ''); //去掉回复消息中偶尔开头就存在的连续换行符
              tempText

              tempText = tempText.replace(/\\n/g, '[nlll]');
              tempText = tempText.replace(/\[nlll\]/g, '');
              alltext += tempText;
            }
          }
        })
      }
    })
    // }, 3000);
  },

  response: function (text) {
    var that = this
    // console.log(e.Response.ResponseText);
    var data = {
      // program_id: app.jtappid,
      // openid: app._openid,
      // zx_info_id: zx_info_id,
      content: text,
      // openid_talk: openid_talk,
      time: time.formatTime(new Date, 'Y/M/D'),
      isBot: true
      // curTTsRoleString: this.data.curTTsRoleString
    }

    this.data.centendata.push(data);
    // this.addRecord(data);
    that.setData({
      // news_input_val: '',
      centendata: that.data.centendata,

    })
    // setTimeout(() => {
    //   that.setData({
    //     // news_input_val: '',
    //     userTalking: false
    //   })
    // }, 3000);
    if (this.data.autoReadingAloud) {
      // wx.showLoading({
      //   title: '正在合成语音',
      //   mask:true
      // })
      this.speach(data.content);
    }
    this.bottom()
    wx.hideLoading()

  },

  closeInput() {
    this.setData({
      userTalking: false
    })
  }


})
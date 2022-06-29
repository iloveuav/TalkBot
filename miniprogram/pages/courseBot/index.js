// miniprogram/pages/TalkBot/TalkBot.js

const app = getApp();
const plugin = requirePlugin("WechatSI")
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

    classLength: 0,

    className: "",
    centendata: [],



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
    ChapterList: [],

    //阿里tts
    ttsStart: false,
    ttsText: "",
    curTTsRoleString: '',//不同文本里面设置的发音人字段

    tts: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let courseObject = JSON.parse(options.course);
    let Cc = JSON.parse(options.Cc);
    CurrentChapter = Cc //正确获取index页面传过来的课程信息 

    var that = this;
    this.setData({
      courseObject: courseObject,
      userSelect: Cc || null
      // ChapterList: ChapterList
    })

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
      appkey: app.globalData.JPAPPKEY,//JPAPPKEY   CEAPPKEY
      token: this.data.token
    })

    tts.on("meta", (msg) => {
      console.log("Client recv metainfo:", msg)
    })

    tts.on("data", (msg) => {
      console.log(`recv size: ${msg.byteLength}`)
      //console.log(dumpFile.write(msg, "binary"))
      if (this.data.saveFile) {
        try {
          fs.appendFileSync(
            this.data.saveFile,
            msg,
            "binary"
          )
          console.log(`append ${msg.byteLength}`)
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
          //  ctx = wx.createInnerAudioContext()
          ctx.autoplay = true
          ctx.play();
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
            this.data.isVoicePlaying = false
            if (this.data.autoReadingAloud && !this.data.wait) {
              this.showTeach()
            }
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

      console.log("Client recv closed1111")
    })

    tts.on("failed", (msg) => {
      console.log("Client recv failed:", msg)
    })

    this.data.tts = tts

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
    this.getChapterList()

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
      classCollection = "testCourseContents";//临时
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

    if (courseObject.currentProgress) {//用户对课程有进度 弹出模态框确认是变更章节还是留着当前章节
      console.log("courseObject.currentProgress", courseObject.currentProgress)
      const userSelect = this.data.userSelect
      if (courseObject.currentProgress.chapterId !== userSelect.chapterId)//用户选择的课程与之前课程章节不同
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
      } else {//虽然有进度 但是用户选择的和进度一致

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
  onHide: function () {
  },

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
  onTtsSpeach: function (e) {
    let content = ''//获取文本内容
    let curTTsRoleString = ''//获取文本发音人
    console.log("curTTsRoleString---e", e);
    if (this.data.autoReadingAloud == true && e.currentTarget?.dataset?.content == undefined) {//自动朗读
      content = e.content
      curTTsRoleString = e.curTTsRoleString || "Rosa"
      this.data.curTTsRoleString = curTTsRoleString
      // console.log(e);
    } else if (this.data.autoReadingAloud == true && e.currentTarget?.dataset?.content !== undefined) {
      content = e.currentTarget.dataset.content;

    } else {
      if (e.currentTarget.dataset.content != undefined && this.data.autoReadingAloud == false) {
        content = e.currentTarget.dataset.content;
        console.log(content)
      }
      if (e.currentTarget.dataset.content == undefined && this.data.autoReadingAloud == false) {//关闭了自动朗读
        content = e.content
        curTTsRoleString = e.curTTsRoleString || "Rosa"
        this.data.curTTsRoleString = curTTsRoleString
      }
    }
    if (e.currentTarget?.dataset?.curttsrolestring !== undefined) {//如果是用户点击文本朗读
      curTTsRoleString = e.currentTarget?.dataset?.curttsrolestring
      this.data.curTTsRoleString = curTTsRoleString
    }
    // if (e.currentTarget?.dataset?.curttsrolestring !== undefined) {//如果是系统自动朗读
    //   curTTsRoleString = e.currentTarget?.dataset?.curttsrolestring|| "Rosa"
    //   this.data.curTTsRoleString = curTTsRoleString
    // }

    console.log('curTTsRoleString', e.currentTarget?.dataset?.curttsrolestring)
    console.log('curTTsRoleString2', this.data.curTTsRoleString)


    var that = this
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
    // if (this.data.ttsStart) {
    //   wx.showToast({
    //     title: "正在合成请稍候",
    //     icon: "error",
    //     duration: 1000,
    //     mask: true
    //   })
    //   return
    // } else {
    //   this.data.ttsStart = true
    // }

    if (this.data.isVoicePlaying) {
      ctx.pause();
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
        // voice 中英混女声 Rosa/Lydia   日语女声 tomoka
        let param = this.data.tts.defaultStartParams('tomoka')
        // let param = this.data.tts.defaultStartParams('Rosa')
        param.text = content
        param.voice = this.data.curTTsRoleString || "Rosa"
        try {
          console.log('this.data.tts', this.data.tts)
          await this.data.tts.start(param)

          console.log("tts done")
          this.data.ttsStart = false

        } catch (e) {
          console.log("tts start error:" + e)
        }
      },
      fail: (res) => {
        console.log(`open ${savePath} failed: ${res.errMsg}`)
      }
    })

    // else{
    //    this.data.tts.
    // }
  },

  // ttsSpeachStop:function(e){

  // },

  getChapterList() {
    console.log(this.data.courseObject)
    let that = this
    wx.cloud.init({
      env: 'huixue-3g4h1ydg1dedcaf3'
    })
    const courseUUid = this.data.courseObject.courseUUid
    wx.cloud.callFunction({
      name: 'get_ChapterListByCourseUUid',
      data: { courseUUid: courseUUid },
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
      })
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
              this.onTtsSpeach({ content: data.content, curTTsRoleString: data.curTTsRoleString });
              break;
            }
            this.bottom();
            this.sleep(500);
            // 更新本地历史记录
            wx.setStorageSync('history' + this.data.courseObject.courseName, this.data.centendata)
            //剩余内容更新
            wx.setStorageSync(this.data.courseObject.courseName, LeftOverClassConten)
            this.setTimeout(() => {
              this.showTeach()
            }, 1000);
            break;
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




    }, 1000);

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
      // console.log("get class----" + e);
      wx.cloud.init({
        env: 'huixue-3g4h1ydg1dedcaf3'
      })
      // wx.cloud.init()
      //  下面是云函数的调用
      // console.log(wx.getStorageSync("openid"));
      // console.log(this.data.classCollection);

      // let CurrentChapter = {
      //   courseUUid: courseDetail.courseUUid,
      //   courseName: courseDetail.courseName,
      //   chapterId: ChapterId,
      //   reset: false
      // }
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

            if (UserCourseMess == '' || null || undefined) {//初始化
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
            wx.cloud.init({
              env: 'huixue-3g4h1ydg1dedcaf3'
            })
            wx.cloud.callFunction({
              name: 'operate_userInfo',
              data: {
                type: 'update',
                params: { UserCourseMess },
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
              content: '呐，正确答案是：' + answer,
            }
          }
        }

        Centendata.push(data);
        // this.updateScrollHeightByFooter();
        // this.setData({
        //   centendata: Centendata,
        //   wait: false,
        //   growid: growid,
        //   btnDie: true,
        // })

        this.bottom();
        // this.toScrollBottom();
      }

      this.setData({
        centendata: Centendata,
        wait: false,
        growid: growid,
        btnDie: true,
      })
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
    if (btnValue == answer) {
      let data = {
        type: 'text',
        is_show_right: 1,
        contentData: {
          content: '你答对啦',
        }
      }
      this.data.centendata.push(data);

    } else {
      let data = {
        type: 'text',
        is_show_right: 1,
        contentData: {
          content: '你答错啦',
        }
      }
      this.data.centendata.push(data);

    }
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
    this.setData({

    })
    // CurrentChapter = e.detail
    var that = this
    //由于第一次进入页面会自动调用这个函数  需要先判断排除
    if (this.data.start != false) {
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
      // ---------- 
    } else {
      this.data.start = true
    }

  },

})
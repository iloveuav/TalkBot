const time = require('../../utils/util.js');
const qiniuUploader = require("../../utils/qiniuUploader");

let ClassCollection = 'testCourseContents';

//阿里云tts
const SpeechSynthesizer = require("../../tts/tts")
const formatTime = require("../../tts/util").formatTime
const sleep = require("../../tts/util").sleep
const getToken = require("../../tts/token").getToken
const fs = wx.getFileSystemManager()
const app = getApp();

Page({
  data: {
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],


    multiIndex: [0, 0, 0],
    message: null,
    edit_id: null,
    chapterId: '',
    className: '',
    chapterName: '',
    value: '',
    imgUrl: null,
    textimgTitle: '',
    curTextImg: {},
    curTextImgIndex: 0,
    uptoken: '',
    centendata: [],
    interactData: [],
    textImgArray: [{
    }],
    answer: '',
    btnNum: '',
    editStatus: false,
    editIndex: '',

    crouseDetail: {},
    chapterList: [],
    curChapter: {},

    tempimg: [], //临时数组  等点击发送的时候一起走

    //拖拽相关
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: '',

    //发音人相关
    categoryCur: 0,
    roleCur: 0,

    ttsStart: false,
    ttsText: "",
    tts: {},

    curTTsRoleString: 'Lydia',
    curTTsTestText: '',


    autoReadingAloud: false,
    haveSpeakerFlag: true,
    multiVoiceArray: [

      [//方言
        { name: '姗姗', intro: '(粤语女生)', value: 'shanshan', icon: 'voice_girl.png' },
        { name: '佳佳', intro: '(粤语女生)', value: 'jiajia', icon: 'voice_girl.png' },
        { name: '桃子', intro: '(粤语女生)', value: 'taozi', icon: 'voice_girl.png' },
        { name: '大虎', intro: '(东北话男声)', value: 'dahu', icon: 'voice_man.png' },
        { name: '老铁', intro: '(东北老铁)', value: 'laotie', icon: 'voice_man.png' },
        { name: '艾侃', intro: '(天津话)', value: 'aikan', icon: 'voice_man.png' },
        { name: '青青', intro: '(中国台湾话女声)', value: 'qingqing', icon: 'voice_girl.png' }
      ],

      [//童声
        { name: '艾彤', intro: '(萝莉女声)', value: 'aitong', icon: 'girl.png' },
        { name: '思彤', intro: '(萝莉女声)', value: 'sitong', icon: 'girl.png' },
        { name: '小北', intro: '(萝莉女声)', value: 'xiaobei', icon: 'girl.png' },
        { name: '杰力豆', intro: '(治愈童声)', value: 'jielidou', icon: 'boy.png' }
      ],

      [//美式发音
        { name: 'Lydia', intro: '(英中双语)', value: 'lydia', icon: 'voice_girl.png' },
        { name: 'Abby', intro: '(美音女声)', value: 'abby', icon: 'voice_girl.png' },
        { name: 'Wendy', intro: '(英音女声)', value: 'wendy', icon: 'voice_girl.png' },
        { name: 'Annie', intro: '(美语女声)', value: 'annie', icon: 'voice_girl.png' },
        { name: 'Emily', intro: '(英音女声)', value: 'emily', icon: 'voice_girl.png' },
        { name: 'Andy', intro: '(美音男声)', value: 'andy', icon: 'voice_man.png' },
        { name: 'William', intro: '(英音男声)', value: 'william', icon: 'voice_man.png' }
      ],

      [//多语种
        { name: 'Tien', intro: '(越南语女声)', value: 'tien', icon: 'voice_girl.png' },
        { name: '智香', intro: '(日语女声)', value: 'tomoka', icon: 'voice_girl.png' },
        { name: '智也', intro: '(日语男声)', value: 'tomoya', icon: 'voice_man.png' },
        { name: 'Indah', intro: '(印尼女声)', value: 'indah', icon: 'voice_girl.png' },
        { name: 'Farah', intro: '(马来语女声)', value: 'farah', icon: 'voice_girl.png' }
      ]
    ],


    category: [{ name: '方言', icon: '../../images/icon/china.jpeg' }, { name: '童声', icon: '../../images/icon/child.png' }, { name: '美式发音', icon: '../../images/icon/eng.png' }, { name: '多语种', icon: '../../images/icon/more_language.png' }],

    curmultiVoiceArray: []


  },

  onLoad: async function (options) {
    console.log(options)
    const pageType = options.pageType ? options.pageType : 'course'

    // console.log("111",this.data.multiVoiceArray[0][0])
    this.setData({
      curmultiVoiceArray: this.data.multiVoiceArray[0],
      curTTsRoleString: this.data.multiVoiceArray[0][0].value
    })

    //选择集合
    if (pageType === 'course') {
      // if (options.currentChooseCard == "0") {
      //   ClassCollection = 'EngClassContents'
      // } else if (options.currentChooseCard == "1") {
      //   ClassCollection = 'JaClassContents'
      // } else if (options.currentChooseCard == "2") {
      //   //其他课程
      //   ClassCollection = 'otherClassContents'
      // }
      ClassCollection = 'testCourseContents'
    } else if (pageType === 'narrate') {
      ClassCollection = 'NarrateContents'
    }

    //新增章节
    if (options && options.type === 'add' && options.courseMess) {
      let crouseDetail = JSON.parse(options.courseMess);
      let chapterList = JSON.parse(options.chapterList);
      this.setData({
        crouseDetail: crouseDetail,
        className: crouseDetail.courseName,
        chapterList: chapterList,
        chapterId: chapterList.length + 1,

        curChapter: {},
        pageType: pageType,
      })
    }
    //编辑章节
    if (options && options.type === 'edit' && options.chapterobj) {
      let crouseDetail = JSON.parse(options.courseMess);
      let chapterList = JSON.parse(options.chapterList);
      let chapterobj = JSON.parse(options.chapterobj);
      this.setData({
        crouseDetail: crouseDetail,

        className: crouseDetail.courseName,
        chapterName: chapterobj.chapterName || '',
        chapterList: chapterList,
        chapterId: chapterobj.chapterId || chapterList.length + 1,

        curChapter: chapterobj,
        pageType: pageType
      })



      wx.cloud.init({
        env: 'huixue-3g4h1ydg1dedcaf3'
      })
      const courseUUid = JSON.parse(options.chapterobj).courseUUid
      wx.cloud.callFunction({
        name: 'getCrouseContent',
        data: {
          // classCollection:'EngClassContents',
          classCollection: 'testCourseContents',
          courseUUid: courseUUid,
          courseName: JSON.parse(options.chapterobj).courseName,
          chapterId: JSON.parse(options.chapterobj).chapterId,
        },
        success: res => {
          this.setData({
            centendata: res.result.classContent.data.map(item => {
              return { ...item, is_show_right: 1 }
            })
          })
        }
      })

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
          let ctx = wx.createInnerAudioContext()
          ctx.autoplay = true
          ctx.src = this.data.saveFile
          ctx.onPlay(() => {
            console.log('start playing..')
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

  // ----------------上传图文准备---------------
  getSpeachText(e) {
    if (e.detail.value) {
      let value = e.detail.value;
      this.setData({
        curTTsTestText: value,
      });
    }
  },

  //阿里tts
  onTtsSpeach: function (e) {
    let content = ''
    let that = this
    console.log('tts1', e);

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
    if (this.data.ttsStart) {
      wx.showToast({
        title: "正在合成请稍候",
        icon: "error",
        duration: 1000,
        mask: true
      })
      return
    } else {
      this.data.ttsStart = true
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
          this.data.ttsStart = false
        } catch (e) {
          console.log("tts start error:" + e)
        }
      },
      fail: (res) => {
        console.log(`open ${savePath} failed: ${res.errMsg}`)
      }
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

  bindChangeChapterName: function (e) {
    this.data.chapterName = e.detail.value;
  },

  delChapter() {
    if (this.data.chapterName == '') {
      wx.showModal({
        title: '提示',
        content: '章节名不能为空',
        showCancel: false
      })
      return;
    } else {
      wx.showModal({
        title: "确认删除？",
        content: "本次删除不可恢复~",
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            //调用云函数
            wx.cloud.init({
              env: 'huixue-3g4h1ydg1dedcaf3'
            })
            wx.cloud.callFunction({
              name: 'del_chapter',
              data: {
                classCollection: ClassCollection,
                chapterId: parseInt(this.data.chapterId),
                className: this.data.className,
                chapterName: this.data.chapterName,
              },
              success: res => {
                wx.showModal({
                  title: '提示',
                  content: '已根据章节Id删除对应章节数据~',
                  showCancel: false,
                })
                wx.navigateBack({
                  delta: 2//返回的页面数
                });
                return;
              },
              fail: err => {
                wx.showModal({
                  title: '提示',
                  content: '删除失败 请检查网络~',
                  showCancel: false,
                })
                return;
              },
            })
            // ----------- 云函数 end---------------
          }
        }
      })
    }
  },

  leftTextImg: function () {
    const curTextImgIndex = this.data.curTextImgIndex
    this.setData({
      curTextImgIndex: curTextImgIndex - 1
      // curTextImg: this.data.textImgArray[curTextImg.index - 1]
    })
  },

  rightTextImg: function () {
    const curTextImgIndex = this.data.curTextImgIndex
    this.setData({
      curTextImgIndex: curTextImgIndex + 1
      // curTextImg: this.data.textImgArray[curTextImg.index - 1]
    })
  },

  // 初始化一个图文放入数组
  addOneItem: function (e) {
    const textImgArray = this.data.textImgArray
    textImgArray.push({//初始化一个新的
      textimgTitle: '',
      chapterName: this.data.chapterName,
      content: '',
      src: '',
      index: textImgArray.length
    });
    // textImgArray.push({
    //   textimgTitle: this.data.curTextImg.textimgTitle,
    //   chapterName: this.data.chapterName,
    //   content: this.data.curTextImg.content,
    //   src: this.data.curTextImg.src || this.data.imgUrl,
    //   index: this.data.textImgArray.length
    // });


    this.setData({
      textImgArray: textImgArray,
      textimgTitle: '',
      message: '',
      imgUrl: '',
      imageObject: '',
      answer: '',
      curTextImgIndex: textImgArray.length - 1

    })
  },

  selectedAnswer(e) {
    this.setData({
      answer: e.currentTarget.dataset.answer
    })
  },


  //  ------------------addText & addImg & addTextImg -------------
  //事件处理函数
  add: function (e) {
    var that = this;
    const { editStatus, editIndex, message, centendata, setTextImg, imgUrl, textimgTitle } = this.data;
    if (editStatus) {
      if (!setTextImg) {
        let newValue = centendata;
        newValue[editIndex]['content'] = message;
        this.setData({
          // editStatus: false,
          centendata: newValue,
          // message: ''
        })
      } else {
        let newValue = centendata;
        newValue[editIndex]['content'] = message;
        newValue[editIndex]['textimgTitle'] = textimgTitle;
        newValue[editIndex]['src'] = imgUrl;
        this.setData({
          // editStatus: false,
          centendata: newValue,
          // message: '',//和新增一致云函数调用后再置空
          // setTextImg: false
        })
      }
      // return;
    }

    console.log("进入add函数")
    // 设置封面
    if (this.data.setFrontImg) {
      if (this.data.className == '') {
        wx.showModal({
          title: '提示',
          content: '课程名不能为空',
          showCancel: false
        })
        return;
      }
      if (this.data.textimgTitle != this.data.className) {
        wx.showModal({
          title: '提示',
          content: '课程名不一致~',
          showCancel: false
        })
        return;
      }
      let courseMess = {
        name: this.data.className,
        frontImg: this.data.imgUrl,
      }
      wx.cloud.init({
        env: 'huixue-3g4h1ydg1dedcaf3'
      })
      // wx.cloud.init()
      //  下面是云函数的调用
      wx.cloud.callFunction({
        name: 'update_allCourseMess',
        data: {
          courseMess: courseMess,
        },
        success: res => {
          let mess = {
            content: '成功设置封面'
          }
          wx.showModal({
            title: '操作成功',
            content: '课程封面已上传',
            showCancel: false,
          })
          return;
        },
        fail: err => {
          // handle error
          wx.showModal({
            title: '提示',
            content: '课程内容上传出错 请检查网络',
            showCancel: false,
          })
          return;
        },
        complete: res => {
          console.log('callFunction test result: ', res)
        }
      })
    } else { //这个else一直到最后

      console.log("this.data.message", this.data.message)
      // --------设置封面end-----------------------
      if (this.data.chapterId == '') {
        wx.showModal({
          title: '提示',
          content: '课程id不能为空',
          showCancel: false
        })
        return;
      } else if (this.data.className == '') {
        wx.showModal({
          title: '提示',
          content: '课程名不能为空~',
          showCancel: false
        })
        return;
      } else if ((this.data.message == '' || this.data.message == null || !this.data.message) && this.data.imgUrl == null) {
        wx.showModal({
          title: '提示',
          content: '课程内容不能为空~',
          showCancel: false
        })
        return;
      } else if (this.data.chapterName == '') {
        wx.showModal({
          title: '提示',
          content: '章节名不能为空~',
          showCancel: false
        })
        return;
      }

      else {
        let imgobj = this.data.imageObject;
        console.log('imgobj', imgobj)
        if (imgobj != '' && imgobj != undefined) {
          this.setData({
            imgUrl: 'http://' + imgobj.imageURL
          })
        }
        let newcontentType;
        // if (that.data.textImgArray.length <= 0) {
        //   newcontentType = that.data.imgUrl == '' ? 'text' : 'img';
        // } else {
        //   newcontentType = 'textImg';
        // }

        //add函数 只给上传文字、图片、图文使用
        if (that.data.setTextImg) {
          newcontentType = 'textImg';
        } else {
          newcontentType = that.data.imgUrl == null ? 'text' : 'img';
        }

        var newData = {
          contentType: newcontentType,
          isBot: true,
          classCollection: 'testCourseContents',
          chapterId: parseInt(that.data.chapterId),
          className: that.data.className,
          classType: ClassCollection,
          chapterName: this.data.chapterName,

          chapterId: parseInt(that.data.chapterId),
          courseUUid: this.data.crouseDetail.courseUUid || '',

          detail: {},
          textimgTitle: that.data.textimgTitle,
          textImgArray: that.data.textImgArray,
          content: that.data.message,
          src: that.data.imgUrl,
          imgfile: that.data.tempimg,
          time: time.formatTime(new Date, 'Y/M/D'),
          is_show_right: 1,
          curTTsRoleString: this.data.haveSpeakerFlag ? this.data.curTTsRoleString : null
        }

        this.setData({
          newData: newData,
        })

        if (!this.data.editStatus) {
          this.bottom();
        }

        console.log('this.add cloud params', {
          contentData: that.data.newData,
          edit_id: this.data.edit_id
        })

        //  下面是云函数的调用
        wx.cloud.init({
          env: 'huixue-3g4h1ydg1dedcaf3'
        })
        wx.cloud.callFunction({
          name: 'operate_courseContent',
          data: {
            contentData: that.data.newData,
            edit_id: this.data.edit_id
          },
          success: res => {
            if (!this.data.editStatus) {
              that.data.centendata.push(this.data.newData);
            }

            this.setData({
              centendata: that.data.centendata,
            })
            if (!this.data.editStatus) {
              this.bottom();
            }
            this.setData({
              imgUrl: null,
              imageObject: '',
              message: '',
              setTextImg: false,
              textimgTitle: '',
              imgfile: '',
              btnDie: false,
              textImgArray: [{}],
              answer: '',
              setFrontImg: '',
              editStatus: false,//编辑状态关闭

              edit_id: null//编辑id置空
            })



          },
          fail: err => {
            // handle error
            wx.showModal({
              title: '提示',
              content: '课程内容上传出错 请检查网络',
              showCancel: false,
            })
            return;
          },
          complete: res => {
            console.log('callFunction test result: ', res)
          }
        })

      }

    }
  },


  useTecentCloud() {
    let timestamp = (new Date()).valueOf();
    var cloudimgs = [];
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: timestamp + '.png',
      // 指定要上传的文件的小程序临时文件路径
      filePath: this.data.tempimg,

      // 成功回调
      success: res => {
        console.log('腾讯云上传成功', res)
        if (res.fileID) {
          cloudimgs.push(res.fileID);
          this.setData({
            zhaopian: '图片如下',
            imgUrl: res.fileID,
            cloudimgs: cloudimgs,
          })

          wx.hideLoading()
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 1000
          })
          console.log('that.data.textimgTitle');
          console.log(this.data.textimgTitle);
          // 设置封面
          if (this.data.setFrontImg) {
            if (this.data.className == '') {
              wx.showModal({
                title: '提示',
                content: '课程名不能为空',
                showCancel: false
              })
              return;
            } else {
              this.add();
            }

          }
          //图文 
          else if (this.data.setTextImg) {
            console.log("图文 this.data.curTextImg", this.data.curTextImg)
            this.data.textImgArray[this.data.curTextImgIndex].src = this.data.imgUrl
            this.setData({
              textImgArray: this.data.textImgArray
            })
            // this.addOneItem();
          }
          //单个图片
          else {
            this.add();
          }
          return;
        }
      },
    })
  },

  // ----------------上传图片上传src  返回-------------

  addimgToCloud() {
    wx.showLoading({
      title: '上传中',
    })
    var that = this;
    // ===============上传图片==================
    // 方式一 用七牛云  上传到自己的仓库------------------

    /**
     * 上传七牛返回key
     */
    // ---------------
    let url = 'http://localhost:8080/qiniu/getToken'
    wx.request({
      url: url,
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: {},

      success: function (result) {
        console.log("初始化七牛返回token:", result); //token: 后端返回的上传验证信息
        that.setData({
          uptoken: result.data.uptoken,
        })
        initQiniu(result.data);
        qiniuUploader.upload(that.data.tempimg, (res) => {
          var obj = JSON.stringify(res.imageURL)
          that.setData({
            'imageObject': res,
          })

          let imgobj = that.data.imageObject;
          if (imgobj != '') {
            that.setData({
              imgUrl: 'http://' + imgobj.imageURL
            })
          }

          if (that.data.setTextImg) {
            that.addOneItem();
          } else {
            that.add();
          }

          // //对象存储中外链默认域名 http://p2mksxx.bkt.clouddn.com/
        },
          (error) => {
            //   console.error('error: ' + JSON.stringify(error));
          }, {
          region: 'SCN', // 华南
          // ECN, SCN, NCN, NA, ASG，分别对应七牛的：华东，华南，华北，北美，新加坡 5 个区域
          qiniuUploadToken: that.data.uptoken,
          domain: 'imgchatbot.uavserve.online', // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接。
          shouldUseQiniuFileName: false,
        },
          // null, // 可以使用上述参数，或者使用 null 作为参数占位符
          progress => {
            that.log = "上传进度" + progress.progress;
          },
        );

        wx.hideLoading()
        wx.showToast({
          title: '上传成功2',
          icon: 'success',
          duration: 1000
        })

      },
      fail: err => {
        // handle error
        wx.showModal({
          title: '提示',
          content: '七牛token获取失败 转腾讯云备用上传',
          showCancel: false
        })
        that.useTecentCloud();
      },
    })

    // ------------七牛官方sdk--------------
    // // 初始化七牛相关参数
    function initQiniu(res) {
      var options = {
        region: 'SCN', // 华南
        // ECN, SCN, NCN, NA, ASG，分别对应七牛的：华东，华南，华北，北美，新加坡 5 个区域
        uptoken: res.uptoken,
        // uptokenURL: 'https://[yourserver.com]/api/uptoken',
        // uptoken: 'xxxx',
        domain: 'imgchatbot.uavserve.online', // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接。
        shouldUseQiniuFileName: false
      };
      qiniuUploader.init(options);
    }
  },


  // ----------------选择图片 ----------------
  uploadimg() {
    if (this.data.chapterId == '' && !this.data.setFrontImg) {//上传封面的时候可以不需要输入章节id
      wx.showModal({
        title: '提示',
        content: '章节id不能为空',
        showCancel: false
      })
      return;
    } else if (this.data.className == '') {
      wx.showModal({
        title: '提示',
        content: '课程名不能为空',
        showCancel: false
      })
      return;
    }
    var that = this;
    wx.chooseImage({
      count: 1,
      //最多4个
      //         原图           压缩     相册   相机
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var imgs = res.tempFilePaths[0];

        that.setData({
          tempimg: imgs, //临时数组
          imgnum: imgs.length
        });

        that.addimgToCloud();
      }
    })
  },

  // --------------- 左侧 上传特殊类型功能方法集

  setInteract() {
    this.setData({
      setwait: true,
      btnDie: true,
      btnNum: null,
      answer: '',
      interactData: []
    });
    this.bottom();
  },

  //、、、、、设置图文
  setTextImg() {
    console.log('setimg')
    this.setData({
      setTextImg: true,
      btnDie: true,
      textimgTitle: '',
      imgUrl: null,
      content: ''
    });
    this.bottom();
  },
  // 、、、、设置封面
  setFrontImg() {
    this.setData({
      setFrontImg: true,
      btnDie: true,
    });
    this.bottom();
  },
  // 、、、、设置发言人模态框弹出
  setVoiceRole() {
    this.setData({
      setVoiceRole: true,
      btnDie: true,
    });
    this.bottom();
  },

  getbtnNum: function (e) {
    // this.data.interactData = [] //先清空

    var regNum = new RegExp('[0-9]', 'g');
    var rsNum = regNum.exec(e.detail.value);


    // if(!rsNum){
    //     setTimeout(()=>{
    //         wx.showToast({
    //             title: '输入数字',
    //             icon: 'none'
    //         })
    //     },1000);
    //     return
    //   }

    let btnNum = e.detail.value
    if (btnNum > 4) {
      wx.showModal({
        title: '超额了',
        content: '暂时最多支持4个互动按钮',
        showCancel: false
      })
      this.setData({
        btnNum: null,
      });
      return;
    }
    else {
      this.setData({
        btnNum: btnNum,
        interactData: [],
        answer: ''
      });
    }
  },

  getAnswer(e) {
    if (e.detail.value) {
      let answer = e.detail.value;
      this.setData({
        answer: answer,
      });
    }
  },

  getInputValue(e) {
    if (e.detail.value) {
      let interactData = this.data.interactData;
      interactData[this.data.btnIndex] = e.detail.value;
      this.setData({
        interactData: interactData,
      });
    }
  },

  updateInteractData(e) {
    let index = e.currentTarget.dataset.i;
    this.setData({
      btnIndex: index,
    });
  },

  // ----------------上传图文准备---------------
  getTitle(e) {
    const curTextImgIndex = this.data.curTextImgIndex
    if (e.detail.value) {
      let value = e.detail.value;
      this.data.textImgArray[curTextImgIndex].textimgTitle = value
      this.setData({
        textImgArray: this.data.textImgArray
      });
    }
  },

  getContent(e) {
    const curTextImgIndex = this.data.curTextImgIndex
    if (e.detail.value) {
      let value = e.detail.value;
      this.data.textImgArray[curTextImgIndex].content = value
      this.setData({
        textImgArray: this.data.textImgArray
      });
    }
  },

  getSrc(e) {
    const curTextImgIndex = this.data.curTextImgIndex
    if (e.detail.value) {
      let value = e.detail.value;
      this.data.textImgArray[curTextImgIndex].src = value
      this.setData({
        textImgArray: this.data.textImgArray
      });
    }

  },

  // ----------  上传互动  -----------------
  submitInteract() {
    if (this.data.chapterId == '') {
      wx.showModal({
        title: '提示',
        content: '课程id不能为空',
        showCancel: false
      })
      return;
    } else if (this.data.className == '') {
      wx.showModal({
        title: '提示',
        content: '课程名不能为空',
        showCancel: false
      })
      return;
    } else if (this.data.btnNum == null || this.data.btnNum == 0 || this.data.interactData.length <= 0) {
      wx.showModal({
        title: '提示',
        content: '不能没有任何互动按钮',
        showCancel: false
      })
      return;
    }

    if (this.data.editStatus) {
      const { editIndex, centendata, answer, btnNum, interactData } = this.data;
      let newValue = centendata;
      newValue[editIndex] = {
        ...centendata[editIndex],
        detail: {
          answer,
          btnNum,
          interactData
        }
      }
      this.setData({
        centendata: newValue,
      })
    }

    wx.cloud.init({
      env: 'huixue-3g4h1ydg1dedcaf3'
    })
    var btnNum = this.data.btnNum;
    let contentData = {
      contentType: 'Interact',
      courseUUid: this.data.crouseDetail.courseUUid || '',
      isBot: true,
      classCollection: ClassCollection,
      chapterId: parseInt(this.data.chapterId),
      className: this.data.className,
      chapterName: this.data.chapterName,

      curTTsRoleString:this.data.haveSpeakerFlag ? this.data.curTTsRoleString : null,

      detail: {
        btnNum: this.data.btnNum,
        interactData: this.data.interactData,
        answer: this.data.answer,
      },
      time: time.formatTime(new Date, 'Y/M/D'),

    }
    let that = this;

    var newInteract = {
      content: 'this is a newInteract which have' + btnNum + '个Btn',
      src: '',
      imgfile: '',
      time: time.formatTime(new Date, 'Y/M/D'),
      is_show_right: 1,
    }
    this.setData({
      contentData: contentData,
      interactData: [],
      btnNum: null,
      newData: newInteract
    })


    wx.cloud.callFunction({
      name: 'operate_courseContent',
      data: {
        contentData: that.data.contentData,
        edit_id: this.data.edit_id
      },
      success: res => {
        if (!this.data.editStatus) {
          that.data.centendata.push({ ...contentData, is_show_right: 1 });
          this.bottom();
        }
        this.setData({
          centendata: that.data.centendata,
        })

        this.setData({
          imgUrl: null,
          message: '',
          setwait: false,
          btnDie: false,
          answer: '',

          editStatus: false,//编辑状态关闭

          edit_id: null//编辑id置空
        })

      },
      fail: err => {
        // handle error
        wx.showModal({
          title: '提示',
          content: '课程内容上传出错 请检查网络',
          showCancel: false
        })
        return;
      },
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })
  },

  close(e) {
    this.setData({
      setwait: false,
      setTextImg: false,
      btnDie: false,
      setFrontImg: false,
      editStatus: false,

      curTextImg: { index: 0 },
      textImgArray: [{

      }],
      setVoiceRole: false

    });
  },

  // -------------辅助交互 自动化调用方法------------
  // 获取hei的id节点然后屏幕焦点调转到这个节点
  bottom: function () {
    var query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('#hei').boundingClientRect() //获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() //这段代码的意思是获取页面滑动位置的查询请求
    query.exec(function (res) {
      wx.pageScrollTo({
        scrollTop: res[1].scrollHeight + 50 // 显示区域的竖直滚动位置
      })
    })
  },

  bindChangeMessage: function (e) {
    this.data.message = e.detail.value
  },

  preimage(e) {
    const contentIndex = e.currentTarget.dataset.index;
    const contentItem = this.data.centendata[contentIndex];
    const contentType = contentItem['contentType']
    const edit_id = contentItem['_id']
    console.log('edit_id', edit_id)
    if (edit_id == undefined) {
      wx.showModal({
        title: '提示',
        content: '刚刚新增的课程内容暂时无法编辑，开发人员后续将进行优化',
        showCancel: false
      })
      return;
    }

    if (contentType == 'text') {
      const { content } = contentItem;
      this.setData({
        message: content,
        editStatus: true
      })
    } else if (contentType == 'Interact') {
      const { btnNum, answer, interactData } = contentItem.detail;
      this.setInteract();
      this.setData({
        btnNum,
        answer,
        interactData,
        editStatus: true,
        message: '',
        edit_id: edit_id//云函数通过判断当前是否有这个属性来告诉云函数是编辑还是新增
      })
    } else if (contentType == 'img') {
      const { textimgTitle, src, content } = contentItem;
      this.setTextImg();
      this.setData({
        textimgTitle,
        message: content,
        imgUrl: src,
        editStatus: true,
        edit_id: edit_id//云函数通过判断当前是否有这个属性来告诉云函数是编辑还是新增
      })
    }
    else if (contentType == 'textImg') {
      const { textimgTitle, src, content, textImgArray } = contentItem;
      this.setTextImg();
      this.setData({
        textimgTitle,
        message: content,
        imgUrl: src,

        curTextImg: textImgArray[0],
        textImgArray: textImgArray,
        editStatus: true,
        edit_id: edit_id//云函数通过判断当前是否有这个属性来告诉云函数是编辑还是新增
      })
    }
    this.setData({
      editIndex: contentIndex,
      edit_id: edit_id//云函数通过判断当前是否有这个属性来告诉云函数是编辑还是新增
    })
  },

  // --------------- 左侧 上传特殊类型功能方法集
  setInteract() {
    this.setData({
      setwait: true,
      btnDie: true,
    });
    this.bottom();
  },

  // 设置图文
  setTextImg() {
    this.setData({
      setTextImg: true,
      btnDie: true,
    });
    this.bottom();
  },
  // 设置封面
  setFrontImg() {
    this.setData({
      setFrontImg: true,
      btnDie: true,
    });
    this.bottom();
  },

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

  changeHaveSpeakerFlag: function () {
    this.setData({
      haveSpeakerFlag: !this.data.haveSpeakerFlag
    })
  },

  //设置当前为新增课程内容模式
  changeautoRA: function () {
    this.setData({
      imgUrl: null,
      imageObject: '',
      message: '', // 目前普通文本 图文的文  都是这个字段 后期优化掉变成两个字段 不然容易出现bug
      setTextImg: false,
      textimgTitle: '',
      imgfile: '',
      btnDie: false,
      textImgArray: [{}],
      answer: '',
      setFrontImg: '',
      editStatus: false,//编辑状态关闭

      edit_id: null//编辑id置空
    })
  },

  bindMultiPickerChange(e) {
    console.log(e.detail.value)
  },
  bindcolumnchange(e) {
    console.log("bindcolumnchange", e.detail.value)
  }
})
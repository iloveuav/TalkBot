const workflowGetStep2Strategy = require('./workflowGetStep2Strategy.js');
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

import {
  uuid
} from '../../tts/uuid';
import util from '../../utils/util'

Page({
  data: {
    multiArray: [
      ['无脊柱动物', '脊柱动物'],
      ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
      ['猪肉绦虫', '吸血虫']
    ],


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
    curTextImgIndex: 0, //图文数组 当前下标
    curBatchContentIndex: 0, //图文数组 当前下标
    uptoken: '',
    centendata: [],
    interactData: [],
    textImgArray: [{}], //图文数组初始化
    batchContentArray: [{ //初始化一个新的
      step1Text: '',
      step2Text: '',
      step3Text: '',

      //初始化aigc参数
      workFlowType: 'textToImage',
      promptLangType: 'Cn',
      workFlow: 'KeTuHuaHua',
      wf_TypeIndex: 0,
      wf_Index: 0,
      tagList1: [{
          label: '全中文',
          value: 'Cn',
          choose: true
        },
        {
          label: '全英语',
          value: 'En',
          choose: false
        },
        {
          label: '中英混合',
          value: 'mixCnEn',
          choose: false
        },
      ],

      // 工作流： KeTuHuaHua | RedBook | StickFigure
      tagList2: [{
          label: '可图大模型',
          value: 'KeTuHuaHua',
          choose: true
        },
        {
          label: 'flux小红书',
          value: 'RedBook',
          choose: false
        },
        {
          label: '音乐踩点剪辑',
          value: 'RedBook',
          choose: false
        },
        {
          label: '简笔画分镜',
          value: 'StickFigure',
          choose: false
        },
        {
          label: '电影分镜',
          value: 'icLora_Film',
          choose: false
        },
        {
          label: '漫画分镜',
          value: 'icLora_MangHua',
          choose: false
        },
      ],

      workFlowTypeArr: [{
          label: '文生图',
          value: 'textToImage',
          choose: true,
          wfArr: [{
              label: '可图大模型',
              value: 'KeTuHuaHua',
              choose: true,
              detail: {
                promptlang: '中英混合',
                function: '基于可图大模型文生图',
                notice: '不支持角色一致性'
              }
            },
            {
              label: 'flux小红书',
              value: 'RedBook',
              choose: false,
              detail: {
                promptlang: '中英混合',
                function: '小红书真实感模型',
                notice: '不支持角色一致性'
              }
            },
            {
              label: '简笔画分镜',
              value: 'StickFigure',
              choose: false,
              detail: {
                promptlang: '中英混合',
                function: '基于本地训练的icLora',
                notice: '支持角色一致性'
              }
            },
            {
              label: '电影分镜',
              value: 'icLora_Film',
              choose: false,
              detail: {
                promptlang: '全英',
                function: '基于icLora',
                notice: ''
              }
            },
            {
              label: '漫画分镜',
              value: 'icLora_MangHua',
              choose: false,
              detail: {
                promptlang: '全英',
                function: '基于icLora',
                notice: ''
              }
            },
          ]
        },
        {
          label: '文生视频',
          value: 'textToVideo',
          choose: false,
          wfArr: [{
              label: 'cogVideo',
              value: 'KeTuHuaHua',
              choose: true,
              detail: {
                promptlang: '全英',
                function: '基于icLora',
                notice: ''
              }
            }

          ]
        },
        {
          label: '文—参图_生图',
          value: 'mixCnEn',
          choose: false,
          wfArr: [{
              label: 'flux',
              value: 'KeTuHuaHua',
              choose: true,
              detail: {
                promptlang: '中英混合',
                function: '根据文本先去找图后基于找到的图进行参考生成',
                notice: ''
              }
            }

          ]
        },
        {
          label: '自动化剪辑',
          value: 'autoCutVideo',
          choose: false,
          wfArr: [{
              label: '音乐卡点视频',
              value: 'KeTuHuaHua',
              choose: true,
              detail: {
                promptlang: '全中',
                function: '基于工作流生成图片和卡点视频片段，进入剪辑软件剪辑生成',
                notice: ''
              }
            }

          ]
        },
      ],

      index: 0
    }], //批量生成数组初始化 （开发者模式）
    answer: '',
    btnNum: '',
    editStatus: false,
    editIndex: '',

    courseDetail: {},
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

    intervalId: null // 保存定时器ID

  },


  startPolling: function () {
    // 每隔3秒执行一次
    this.data.intervalId = setInterval(() => {
      console.log("轮询开始")
      this.get_comfyUi_jobStateByWorkSpace();
      // console.log()
      // 检查数组是否有内容
      // if (this.data.array.length > 0) {
      //   // 取出内容
      //   const content = this.data.array.shift(); // 假设你想移除并获取数组的第一个元素
      //   console.log(content); // 处理获取到的内容
      //   // 可以在这里做进一步的处理，比如更新页面数据
      //   // this.setData({
      //   //   // 更新页面数据
      //   // });
      // }
      console.log("轮询结束")
    }, 15000);
  },


  onLoad: async function (options) {
    console.log(options)
    // this.fetchWorkflow('Text2Img');
    // this.test()
    const pageType = options.pageType ? options.pageType : 'course'

    // console.log("111",this.data.multiVoiceArray[0][0])
    this.setData({
      curmultiVoiceArray: this.data.multiVoiceArray[0],
      curTTsRoleString: this.data.multiVoiceArray[0][0].value,
      isAdmin: wx.getStorageSync("isAdmin"),
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
      console.log("yyzm-options", options)
      let courseDetail = JSON.parse(options.courseMess);
      let chapterList = options.chapterList && options.chapterList !== 'undefined' ? JSON.parse(options.chapterList) : [];
      console.log("yyzm-courseDetail", courseDetail)
      this.setData({
        courseDetail: courseDetail,
        className: courseDetail.courseName,
        chapterList: chapterList,
        chapterId: chapterList.length + 1,

        curChapter: {},
        pageType: pageType,
      })
    }
    //编辑章节
    if (options && options.type === 'edit' && options.chapterobj) {
      console.log("yyzm-options-courseMess", options.courseMess)

      let courseDetail = app.globalData.curCourseMess;
      // let courseDetail = JSON.parse(options.courseMess);
      let chapterList = JSON.parse(options.chapterList);
      let chapterobj = JSON.parse(options.chapterobj);
      console.log("add-onload courseDetail", courseDetail)
      let centendata = []
      if (courseDetail.ChapterContentMap) {
        centendata = courseDetail.ChapterContentMap[chapterobj.chapterName]?.lineArr?.map(item => {
          return {
            ...item,
            is_show_right: 1
          }
        }) || []
      }


      //从localStorage 获取centendata  和option传递过来的centendata 进行去重合并
      let localStorageCurCourseCentendata = wx.getStorageSync('editCourse' + courseDetail.courseName) || [];
      // 合并数组
      const combinedArray = centendata.concat(localStorageCurCourseCentendata);

      // 去重
      const uniqueMap = new Map(combinedArray.map(item => [item.contentId, item]));
      const uniqueArray = Array.from(uniqueMap.values());

      this.setData({
        courseDetail: courseDetail,

        className: courseDetail.courseName,
        chapterName: chapterobj.chapterName || '',
        chapterList: chapterList,
        chapterId: chapterobj.chapterId || chapterList.length + 1,

        curChapter: chapterobj,
        pageType: pageType,

        // centendata: courseDetail.ChapterContentMap[chapterobj.chapterName]?.lineArr || []

        centendata: uniqueArray
      })
      console.log('uniqueArray', uniqueArray)
      this.get_comfyUi_jobStateByWorkSpace()
      this.startPolling(); // 页面加载时开始轮询
      wx.setStorageSync('editCourse' + courseDetail.courseName, uniqueArray)




      const courseUUid = JSON.parse(options.chapterobj).courseUUid
      // 之前 获取课程内容的代码
      // wx.cloud.callFunction({
      //   name: 'getCrouseContent',
      //   data: {
      //     // classCollection:'EngClassContents',
      //     classCollection: 'testCourseContents',
      //     courseUUid: courseUUid,
      //     courseName: JSON.parse(options.chapterobj).courseName,
      //     chapterId: JSON.parse(options.chapterobj).chapterId,
      //   },
      //   success: res => {
      //     this.setData({
      //       centendata: res.result.classContent.data.map(item => {
      //         return {
      //           ...item,
      //           is_show_right: 1
      //         }
      //       })
      //     })
      //   }
      // })

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

  onHide: function () {
    // 清除定时器，避免在页面不显示时继续轮询
    if (this.data.intervalId) {
      clearInterval(this.data.intervalId);
    }
  },

  onUnload: function () {
    // 清除定时器，避免在页面不显示时继续轮询
    if (this.data.intervalId) {
      clearInterval(this.data.intervalId);
    }
  },

  // aigc参数设置相关函数

  //提示词语种 设置
  promptLangTypeHandleChoose(e) {
    const {
      index,
      choose
    } = e.target.dataset;
    const curBatchContentIndex = this.data.curBatchContentIndex
    const str = `batchContentArray[${curBatchContentIndex}].tagList1[${index}].choose`
    const curType = this.data.batchContentArray[curBatchContentIndex].tagList1[index].value
    const curChoose = this.data.batchContentArray[curBatchContentIndex].tagList1[index].choose
    console.log("curType", curType)
    const chooseList = this.data.batchContentArray[curBatchContentIndex].tagList1.filter(item => item.choose);
    if (curChoose == true) {
      return
    }
    if (chooseList.length >= 1) {
      this.data.batchContentArray[curBatchContentIndex].tagList1.forEach((e, index) => {
        const str2 = `batchContentArray[${curBatchContentIndex}].tagList1[${index}].choose`
        this.setData({
          [str2]: false
        })
      })
    };
    this.data.batchContentArray[curBatchContentIndex].promptLangType = curType
    // this.data.editCourseDetail.courseContentTypeMode = curType //课程学习模式 【广度优先还是深度优先】
    this.setData({
      [str]: !choose,
      batchContentArray: this.data.batchContentArray
      // editCourseDetail: this.data.editCourseDetail
    })
  },

  //工作流类型 设置
  workFlowTypeHandleChoose(e) {
    const {
      index,
      choose
    } = e.target.dataset;
    const wf_TypeIndex = index
    const curBatchContentIndex = this.data.curBatchContentIndex
    const str = `batchContentArray[${curBatchContentIndex}].workFlowTypeArr[${index}].choose`
    const curType = this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[index].value
    const curChoose = this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[index].choose
    console.log("curType", curType)
    const chooseList = this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr.filter(item => item.choose);
    if (curChoose == true) {
      return
    }
    if (chooseList.length >= 1) {
      this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr.forEach((e, index) => {
        const str2 = `batchContentArray[${curBatchContentIndex}].workFlowTypeArr[${index}].choose`
        this.setData({
          [str2]: false
        })
      })
    };

    this.data.batchContentArray[curBatchContentIndex].workFlowType = curType
    this.data.batchContentArray[curBatchContentIndex].wf_TypeIndex = index

    // 工作流类型改变 工作流区域工作流 默认选回第一个
    this.data.batchContentArray[curBatchContentIndex].wf_Index = 0
    // this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[index].wfArr

    // 先全部 设置按钮取消
    this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[index].wfArr.forEach((e, index) => {
      const str2 = `batchContentArray[${curBatchContentIndex}].workFlowTypeArr[${wf_TypeIndex}].wfArr[${index}].choose`
      this.setData({
        [str2]: false
      })
      // 第一个 设置为选择
      this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[wf_TypeIndex].wfArr[0].choose = true
      this.data.batchContentArray[curBatchContentIndex].workFlow = this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[wf_TypeIndex].wfArr[0].value
    })

    // this.data.editCourseDetail.courseContentTypeMode = curType //课程学习模式 【广度优先还是深度优先】
    this.setData({
      [str]: !choose,
      batchContentArray: this.data.batchContentArray
      // editCourseDetail: this.data.editCourseDetail
    })
  },

  //工作流 设置
  workFlowHandleChoose(e) {
    const {
      index,
      choose
    } = e.target.dataset;
    const curBatchContentIndex = this.data.curBatchContentIndex
    // wf_TypeIndex: 0,
    // wf_Index: 0,
    const cur_wfType_Index = this.data.batchContentArray[curBatchContentIndex].wf_TypeIndex
    console.log("cur_wfType_Index", cur_wfType_Index)
    const str = `batchContentArray[${curBatchContentIndex}].workFlowTypeArr[${cur_wfType_Index}].wfArr[${index}].choose`
    const curWorkFlowValue = this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[cur_wfType_Index].wfArr[index].value
    const curWorkFlowChoose = this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[cur_wfType_Index].wfArr[index].choose
    console.log("curWorkFlowValue", curWorkFlowValue)
    const chooseList = this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[cur_wfType_Index].wfArr.filter(item => item.choose);
    console.log("chooseList", chooseList)

    if (curWorkFlowChoose == true) {
      return
    }

    if (chooseList.length >= 1) {
      this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[cur_wfType_Index].wfArr.forEach((e, index) => {
        const str2 = `batchContentArray[${curBatchContentIndex}].workFlowTypeArr[${cur_wfType_Index}].wfArr[${index}].choose`
        this.setData({
          [str2]: false
        })
      })
    };

    this.data.batchContentArray[curBatchContentIndex].workFlow = curWorkFlowValue
    this.data.batchContentArray[curBatchContentIndex].wf_Index = index
    // this.data.editCourseDetail.courseContentTypeMode = curType //课程学习模式 【广度优先还是深度优先】
    this.setData({
      [str]: !choose,
      batchContentArray: this.data.batchContentArray
      // editCourseDetail: this.data.editCourseDetail
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

  //将当前章节所有修改 提交进行云同步 将centendata提交更新
  saveChapter: function (needShowModal = true) {
    // var that = this;
    console.log("进入saveChapter函数")
    if (needShowModal) {
      wx.showLoading({
        title: '修改中',
      })
    }


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
    } else if (this.data.chapterName == '') {
      wx.showModal({
        title: '提示',
        content: '章节名不能为空~',
        showCancel: false
      })
      return;
    } else {

      this.setData({
        centendata: this.data.centendata,
      })
      //  下面是云函数的调用 把章节内容上传
      wx.cloud.callFunction({
        name: 'operate_courseContent',
        data: {
          courseUUid: this.data.courseDetail.courseUUid,
          ChapterContent: this.data.centendata,
          curChapterName: this.data.chapterName,
          mode: 'AddOrEdit'
        },
        success: res => {
          wx.hideLoading()
          if (needShowModal) {
            wx.showModal({
              title: '提示',
              content: '章节内容批量修改成功',
              showCancel: false,
            })
          }

          wx.setStorageSync('editCourse' + this.data.courseDetail.courseName, this.data.centendata)

          // wx.showToast({
          //   title: '内容批量修改成功',
          //   icon: 'success',
          //   duration: 1000
          // })

        },
        fail: err => {
          // handle error
          if (needShowModal) {
            wx.showModal({
              title: '提示',
              content: '课程内容修改出错 请检查网络',
              showCancel: false,
            })
          }

          return;
        },
        complete: res => {
          console.log('callFunction test result: ', res)
        }
      })

      //判断一下 如果当前章节名字 没有 就去push一下
      // 使用some()方法检查是否有对象的title字段与this.data.chapterName相匹配
      const that = this
      const isChapterNameInList = this.data.chapterList.some(function (chapter) {
        console.log("that.data.chapterName", that.data.chapterName)
        return chapter._id.chapterName === that.data.chapterName;
      });
      if (!isChapterNameInList) {
        const ChapterObj = {
          _id: {
            chapterId: this.data.chapterList?.length + 1 || 1,
            chapterName: this.data.chapterName,
            courseUUid: this.data.courseDetail.courseUUid,
            courseName: this.data.courseDetail.courseName
          },
          courseNum: '_'
        }
        //新增一个章节信息
        wx.cloud.callFunction({
          name: 'operate_CourseMess',
          data: {
            courseMess: this.data.courseDetail,
            type: this.data.type,
            mode: 'addCharater',
            ChapterObj: ChapterObj
          },
          success: res => {
            wx.showToast({
              title: '新增章节成功',
              icon: 'sucess',
            })
            if (app.globalData.CurrentCourseObj.ChapterList == undefined) {
              app.globalData.CurrentCourseObj.ChapterList = [ChapterObj]
            } else {
              app.globalData.CurrentCourseObj.ChapterList.push(ChapterObj)
            }



          },
          fail: err => {
            // handle error
            wx.showToast({
              title: '新增章节失败',
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


  //将当前章节数组清空
  delChapterV2: function (e) {
    // var that = this;
    console.log("进入delChapterV2函数")
    wx.showLoading({
      title: '删除中',
    })

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
    } else if (this.data.chapterName == '') {
      wx.showModal({
        title: '提示',
        content: '章节名不能为空~',
        showCancel: false
      })
      return;
    } else {

      // this.saveChapter(false)
      // //       // 更新本地缓存  清空调对应章节内容
      // wx.setStorageSync('history' + this.data.courseDetail.courseName, [])
      // this.data.centendata = []
      this.setData({
        centendata: this.data.centendata,
      })

      // //  下面是云函数的调用
      wx.cloud.callFunction({
        name: 'operate_courseContent',
        data: {
          courseUUid: this.data.courseDetail.courseUUid,
          curChapterName: this.data.chapterName,
          mode: 'delete'
        },
        success: res => {


          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '章节内容删除成功',
            showCancel: false,
          })
          setTimeout(() => {
            // 更新本地缓存  清空调对应章节内容
            wx.setStorageSync('editCourse' + this.data.courseDetail.courseName, [])
            wx.navigateBack({
              delta: 3 //返回的页面数
            });

            this.data.centendata = []
            this.setData({
              centendata: this.data.centendata,
            })

            return;
          }, 1000);

        },
        fail: err => {
          // handle error
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '章节内容删除出错 请检查网络',
            showCancel: false,
          })
          return;
        },
        complete: res => {
          console.log('callFunction test result: ', res)
        }
      })

    }


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


            wx.showModal({
              title: '提示',
              content: '已根据章节Id删除对应章节数据~',
              showCancel: false,
            })
            wx.navigateBack({
              delta: 2 //返回的页面数
            });
            return;
            // 之前的
            // wx.cloud.init({
            //   traceUser: true,
            //   env: 'talkbot-7gji40zbdf69e993'
            // })
            // wx.cloud.callFunction({
            //   name: 'del_chapter',
            //   data: {
            //     classCollection: ClassCollection,
            //     chapterId: parseInt(this.data.chapterId),
            //     className: this.data.className,
            //     chapterName: this.data.chapterName,
            //   },
            //   success: res => {
            //     wx.showModal({
            //       title: '提示',
            //       content: '已根据章节Id删除对应章节数据~',
            //       showCancel: false,
            //     })
            //     wx.navigateBack({
            //       delta: 2 //返回的页面数
            //     });
            //     return;
            //   },
            //   fail: err => {
            //     wx.showModal({
            //       title: '提示',
            //       content: '删除失败 请检查网络~',
            //       showCancel: false,
            //     })
            //     return;
            //   },
            // })
            // ----------- 云函数 end---------------
          }
        }
      })
    }
  },

  // 图文交互  ----------------------------------------------------------------------------------
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
    textImgArray.push({ //初始化一个新的
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

  //删除一个图文项
  deleteOneTextImgItem: function (e) {
    console.log(e)
  },

  // 图文交互 end ----------------------------------------------------------------------------------




  // 批量生成 开发者模式  ----------------------------------------------------------------------------------
  leftBatchContent: function () {
    const curBatchContentIndex = this.data.curBatchContentIndex
    this.setData({
      curBatchContentIndex: curBatchContentIndex - 1
      // curTextImg: this.data.textImgArray[curTextImg.index - 1]
    })
  },

  rightBatchContent: function () {
    const curBatchContentIndex = this.data.curBatchContentIndex
    this.setData({
      curBatchContentIndex: curBatchContentIndex + 1
      // curTextImg: this.data.textImgArray[curTextImg.index - 1]
    })
  },

  // 初始化一个图文放入数组
  addOneItemForBatchContent: function (e) {
    const batchContentArray = this.data.batchContentArray
    batchContentArray.push({ //初始化一个新的
      step1Text: '',
      step2Text: '',
      step3Text: '',
      index: batchContentArray.length,

      workFlowType: 'Cn',
      promptLangType: 'KeTuHuaHua',

      wf_TypeIndex: 0,
      wf_Index: 0,

      tagList1: [{
          label: '全中文',
          value: 'Cn',
          choose: true
        },
        {
          label: '全英语',
          value: 'En',
          choose: false
        },
        {
          label: '中英混合',
          value: 'mixCnEn',
          choose: false
        },
      ],
      workFlowTypeArr: [{
          label: '文生图',
          value: 'textToImage',
          choose: true,
          wfArr: [{
              label: '可图大模型',
              value: 'KeTuHuaHua',
              choose: true,
              detail: {
                promptlang: '中英混合',
                function: '基于可图大模型文生图',
                notice: '不支持角色一致性'
              }
            },
            {
              label: 'flux小红书',
              value: 'RedBook',
              choose: false,
              detail: {
                promptlang: '中英混合',
                function: '小红书真实感模型',
                notice: '不支持角色一致性'
              }
            },
            {
              label: '简笔画分镜',
              value: 'StickFigure',
              choose: false,
              detail: {
                promptlang: '中英混合',
                function: '基于本地训练的icLora',
                notice: '支持角色一致性'
              }
            },
            {
              label: '电影分镜',
              value: 'icLora_Film',
              choose: false,
              detail: {
                promptlang: '全英',
                function: '基于icLora',
                notice: ''
              }
            },
            {
              label: '漫画分镜',
              value: 'icLora_MangHua',
              choose: false,
              detail: {
                promptlang: '全英',
                function: '基于icLora',
                notice: ''
              }
            },
          ]
        },
        {
          label: '文生视频',
          value: 'textToVideo',
          choose: false,
          wfArr: [{
              label: 'cogVideo',
              value: 'KeTuHuaHua',
              choose: true,
              detail: {
                promptlang: '全英',
                function: '基于icLora',
                notice: ''
              }
            }

          ]
        },
        {
          label: '文—参图_生图',
          value: 'mixCnEn',
          choose: false,
          wfArr: [{
              label: 'flux',
              value: 'KeTuHuaHua',
              choose: true,
              detail: {
                promptlang: '中英混合',
                function: '根据文本先去找图后基于找到的图进行参考生成',
                notice: ''
              }
            }

          ]
        },
        {
          label: '自动化剪辑',
          value: 'autoCutVideo',
          choose: false,
          wfArr: [{
              label: '音乐卡点视频',
              value: 'KeTuHuaHua',
              choose: true,
              detail: {
                promptlang: '全中',
                function: '基于工作流生成图片和卡点视频片段，进入剪辑软件剪辑生成',
                notice: ''
              }
            }

          ]
        },
      ],

    });
    // batchContentArray.push({
    //   textimgTitle: this.data.curTextImg.textimgTitle,
    //   chapterName: this.data.chapterName,
    //   content: this.data.curTextImg.content,
    //   src: this.data.curTextImg.src || this.data.imgUrl,
    //   index: this.data.batchContentArray.length
    // });


    this.setData({
      batchContentArray: batchContentArray,
      textimgTitle: '',
      message: '',
      imgUrl: '',
      imageObject: '',
      answer: '',
      curBatchContentIndex: batchContentArray.length - 1

    })
  },

  //删除一个图文项
  deleteOneTextImgItem: function (e) {
    console.log(e)
  },

  // 批量生成 开发者模式  end ----------------------------------------------------------------------------------

  selectedAnswer(e) {
    this.setData({
      answer: e.currentTarget.dataset.answer
    })
  },


  //  ------------------addText & addImg & addTextImg -------------
  //事件处理函数  老版 将数据存入 testCourseContents
  add: function (e) {
    var that = this;
    const {
      editStatus,
      editIndex,
      message,
      centendata,
      setTextImg,
      imgUrl,
      textimgTitle
    } = this.data;
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
    //这个else一直到最后

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
    } else if ((this.data.message == '' || this.data.message == null || !this.data.message) && this.data.imgUrl == null && !this.data.setTextImg) {
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
    } else {
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


        courseUUid: this.data.courseDetail.courseUUid || '',

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

      wx.cloud.callFunction({
        name: 'operate_courseContent',
        data: {
          contentData: that.data.newData,
          edit_id: this.data.edit_id,
          mode: 'AddOrEdit'
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
            editStatus: false, //编辑状态关闭
            edit_id: null //编辑id置空
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
  },

  //事件处理函数  V2版  暂时不调用云函数 只是更新centendata数组 将数据存入 allCourseBaseMess - ChapterContentMap
  addV2: function (e) {
    var that = this;
    const {
      editStatus,
      editIndex,
      message,
      centendata,
      setTextImg,
      imgUrl,
      textimgTitle
    } = this.data;
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

    console.log("进入addV2函数")
    //这个else一直到最后

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
    } else if ((this.data.message == '' || this.data.message == null || !this.data.message) && this.data.imgUrl == null && !this.data.setTextImg) {
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
    } else {
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

      //add函数V2 只给上传文字、图片、图文使用
      if (that.data.setTextImg) {
        newcontentType = 'textImg';
      } else {
        newcontentType = that.data.imgUrl == null ? 'text' : 'img';
      }

      var newData = {
        contentType: newcontentType,
        isBot: true,
        contentId: util.uuid(),
        content: this.data.message,
        // src: that.data.imgUrl,
        imgfile: this.data.tempimg,
        time: time.formatTime(new Date, 'Y/M/D'),
        is_show_right: 1,
        curTTsRoleString: this.data.haveSpeakerFlag ? this.data.curTTsRoleString : null,

        textimgTitle: this.data.textimgTitle,
        textImgArray: this.data.textImgArray,
        src: that.data.imgUrl,
        imgfile: that.data.tempimg,
      }

      this.setData({
        newData: newData,
      })

      if (!this.data.editStatus) {
        this.bottom();
      }

      console.log('this.add cloud params', {
        contentData: this.data.newData,
        edit_id: this.data.edit_id
      })

      if (!this.data.editStatus) {
        this.data.centendata.push(this.data.newData);
      }

      this.setData({
        centendata: this.data.centendata,
      })

      console.log("this.data.centendata", this.data.centendata)
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
        editStatus: false, //编辑状态关闭

        curTextImgIndex: 0, //恢复初始化为0

        edit_id: null //编辑id置空
      })
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
    if (this.data.chapterId == '' && !this.data.setFrontImg) { //上传封面的时候可以不需要输入章节id
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

  //、、、、、设置AIGC内容
  setAIGC_BatchContent() {
    console.log('setimg')
    this.setData({
      setBatchContentModal: true,
      btnDie: true,
      textimgTitle: '',
      imgUrl: null,
      content: ''
    });
    this.bottom();
  },

  //、、、、、设置AIGC创意
  setAIGC_ImageText() {
    console.log('setimg')
    this.setData({
      setAIGC_ImageTextModal: true,
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
    } else {
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

  // ----------------批量生成 开发者模式 准备阶段  交互逻辑---------------
  inputBatchContentStep1Text(e) {
    const curBatchContentIndex = this.data.curBatchContentIndex
    if (e.detail.value) {
      let value = e.detail.value;
      console.log("this.data.batchContentArray[curBatchContentIndex]", this.data.batchContentArray[curBatchContentIndex])
      this.data.batchContentArray[curBatchContentIndex].step1Text = value
      this.setData({
        batchContentArray: this.data.batchContentArray
      });
    }
  },

  inputBatchContentStep3Text(e) {
    const curBatchContentIndex = this.data.curBatchContentIndex
    if (e.detail.value) {
      let value = e.detail.value;
      this.data.batchContentArray[curBatchContentIndex].step3Text = value

      const cur_wf_TypeIndex = this.data.batchContentArray[curBatchContentIndex].wf_TypeIndex
      const wf_Index = this.data.batchContentArray[curBatchContentIndex].wf_Index
      const curWF_Obj = this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[cur_wf_TypeIndex].wfArr[wf_Index]
      const cur_wf_key = curWF_Obj.value //当前工作流的key

      this.setData({
        batchContentArray: this.data.batchContentArray,
        clickStep2_curWF_Obj: curWF_Obj,
        clickStep2_cur_wf_key: cur_wf_key,
      });
    }
  },

  // step2 生成提示词去问AI  for课程内容 
  getCurStep2CourseContentPromptByKimi() {
    const curBatchContentIndex = this.data.curBatchContentIndex
    const curLanguage = this.data.courseDetail.curLanguage || ''
    const curContentType = this.data.courseDetail.curContentType || 'ask'
    const courseContentMode = this.data.courseDetail.courseContentMode || 'breadth'
    const step1Text = this.data.batchContentArray[curBatchContentIndex].step1Text || ''
    const courseContentModeMap = {
      breadth: `一个宏观围绕${step1Text||this.data.chapterName}扩展式学习的课程内容`, // 广度扩展型章节
      depth: `围绕${step1Text}不同方面深入式学习的课程内容`, // 深度挖掘型章节
    }

    const courseTypeMap = {
      'ask': '课程内容必须至少80%以问答为主',
      'get': '课程内容必须至少80%以讲解为主'
    }
    //第一次提问
    const firstDemoTypeMap = {
      ask: `{
    "ContentList": [
    { 
     "contentType": "text",
     "curTTsRoleString": "shanshan",
     "detail": {},
     "isBot": true,
     "content": "接下来，我们开始进行问答环节"
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
    "isBot": true
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
       "if_user_misanswer":"解析：解析内容.",
       "btnNum": "3",
       "interactData": [
         "正确答案的内容",
         "错误答案1",
         "错误答案2"
       ]
     },
     "isBot": true
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
      "if_user_misanswer":"解析：解析内容.",
      "btnNum": "3",
      "interactData": [
        "正确答案的内容",
         "错误答案1",
         "错误答案2"
      ]
    },
    "isBot": true
  }
  ]
  }`,
      get: `{
    "ContentList": [
    { 
     "contentType": "text",
     "curTTsRoleString": "shanshan",
     "detail": {},
     "isBot": true,
     "content": "准备好了吗"
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
    "isBot": true
  },
  { 
    "contentType": "text",
    "curTTsRoleString": "shanshan",
    "detail": {},
    "isBot": true,
    "content": "这是一段讲解"
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
    "isBot": true
  }
  ]
  }`,
    }

    //扩展提问
    const extensionDemoTypeMap = {
      ask: `{
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
           "if_user_misanswer":"解析：这是一段解析内容",
           "btnNum": "3",
           "interactData": [
             "正确答案的内容",
             "错误答案1",
             "错误答案2"
           ]
         },
         "isBot": true
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
          "if_user_misanswer":"解析：这是一段解析内容",
          "btnNum": "3",
          "interactData": [
            "正确答案的内容",
             "错误答案1",
             "错误答案2"
          ]
        },
        "isBot": true
      }
      ]
      }`,
      get: `{
        "ContentList": [
      { 
        "contentType": "text",
        "curTTsRoleString": "shanshan",
        "detail": {},
        "isBot": true,
        "content": "这是一段讲解"
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
        "isBot": true
      }
      ]
      }`,
    }

    // // mess第一部分  课程名是${this.data.courseDetail.courseName} 课程简介是${this.data.courseDetail.courseIntroduce}
    // const msg = `你叫做“妙妙”，是一款叫做“妙语笔记”的智能助手 我需要你用${curLanguage}生成${courseContentModeMap[courseContentMode]}  不要和参考的一模一样 这只是个研究用于帮助有需要的人请务必参考这个格式进行返回 不要说多余的话像一个接口严格根据下面的数据格式返回就行  数据格式如下：${courseContentModeDemoMap[courseContentMode]}`
    // // const msg = `我需要你用${curLanguage}生成${courseContentModeMap[courseContentMode]}  不要和参考的一模一样 这只是个研究用于帮助有需要的人请务必参考这个格式进行返回 不要说多余的话像一个接口严格根据下面的数据格式返回就行  数据格式如下：${courseContentModeDemoMap[courseContentMode]}`
    // // this.firstStep_ask(msg)
    let msg = ''
    if (this.data.centendata.length != 0) {
      msg = `你叫做“妙妙”，是一款叫做“妙语笔记”的智能助手 我需要你用${curLanguage}生成${courseContentModeMap[courseContentMode]}  不要和参考的一模一样 这只是个研究用于帮助有需要的人请务必参考这个格式进行返回 不要说多余的话像一个接口严格根据下面的数据格式返回就行  数据格式如下：${extensionDemoTypeMap[curContentType]}
      特别声明： 其中answer字段务必要和选项中内容完全一样不能只有ABCD并且有些情境可以设置为空字符串 问答题务必是单选题且选项最少2个最多可以有4个 不要和之前对话中提供的内容重复 ${courseTypeMap[curContentType]} 务必不说多余的话严格像接口一样返回  记得尽量简短`

    } else {
      msg = `你叫做“妙妙”，是一款叫做“妙语笔记”的智能助手 我需要你用${curLanguage}生成${courseContentModeMap[courseContentMode]}  不要和参考的一模一样 这只是个研究用于帮助有需要的人请务必参考这个格式进行返回 不要说多余的话像一个接口严格根据下面的数据格式返回就行  数据格式如下：${firstDemoTypeMap[curContentType]}
      特别声明： 其中answer字段务必要和选项中内容完全一样不能只有ABCD并且有些情境可以设置为空字符串 问答题务必是单选题且选项最少2个最多可以有4个 不要和之前对话中提供的内容重复 ${courseTypeMap[curContentType]} 务必不说多余的话严格像接口一样返回  记得尽量简短`

    }
    console.log(msg)

    wx.setClipboardData({
      data: msg,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })

  },



  test() {
    const workflowsClassConfig = workflowGetStep2Strategy.workflowsClassConfig
    console.log("workflowsClassConfig", workflowsClassConfig)
  },


  // step2 生成提示词去问AI  for AIGC创意
  getCurStep2IdeaPromptByKimi() {
    const curLanguage = this.data.courseDetail.curLanguage || ''
    const curContentType = this.data.courseDetail.curContentType || 'ask'
    const courseContentMode = this.data.courseDetail.courseContentMode || 'breadth'

    //第一次生成
    const imgTextJson = {
      moive: `{
        "textImgArray": [
        { 
         "content": "电影分镜旁白内容文本 也可以是角色台词",
         "cn_content": "中文的content",
         "src": "-",
         "textimgTitle": "电影分镜标题内容",
         "positionPrompt": "[MOVIE-SHOTS] In an enchanting tale of nature's wonders, [SCENE-1] shows <Sophie> observing butterflies in a sunlit meadow, her expression one of awe and delight, [SCENE-2] transitioning to <Sophie> sketching the butterflies in her notebook, her brow furrowed in concentration, [SCENE-3] wrapping up with her lying back in the grass, gazing at the sky with a contented smile, surrounded by nature's beauty."
       },
       { 
        "content": "电影分镜旁白内容文本 也可以是角色台词",
        "cn_content": "中文的content",
        "src": "-",
        "textimgTitle": "电影分镜标题内容",
        "positionPrompt": "[MOVIE-SHOTS] In an enchanting tale of nature's wonders, [SCENE-1] shows <Sophie> observing butterflies in a sunlit meadow, her expression one of awe and delight, [SCENE-2] transitioning to <Sophie> sketching the butterflies in her notebook, her brow furrowed in concentration, [SCENE-3] wrapping up with her lying back in the grass, gazing at the sky with a contented smile, surrounded by nature's beauty."
      }
      ]
      }`,
      cartoon: `{
        "textImgArray": [
        { 
         "content": "电影分镜旁白内容文本 也可以是角色台词",
         "cn_content": "中文的content",
         "src": "-",
         "textimgTitle": "电影分镜标题内容",
         "positionPrompt": "[MOVIE-SHOTS] In an enchanting tale of nature's wonders, [SCENE-1] shows <Sophie> observing butterflies in a sunlit meadow, her expression one of awe and delight, [SCENE-2] transitioning to <Sophie> sketching the butterflies in her notebook, her brow furrowed in concentration, [SCENE-3] wrapping up with her lying back in the grass, gazing at the sky with a contented smile, surrounded by nature's beauty."
       },
       { 
        "content": "电影分镜旁白内容文本 也可以是角色台词",
        "cn_content": "中文的content",
        "src": "-",
        "textimgTitle": "电影分镜标题内容",
        "positionPrompt": "[MOVIE-SHOTS] In an enchanting tale of nature's wonders, [SCENE-1] shows <Sophie> observing butterflies in a sunlit meadow, her expression one of awe and delight, [SCENE-2] transitioning to <Sophie> sketching the butterflies in her notebook, her brow furrowed in concentration, [SCENE-3] wrapping up with her lying back in the grass, gazing at the sky with a contented smile, surrounded by nature's beauty."
      }
      ]
      }`,
    }
    // -----------------------kimi生成----------------------------------------




    //  what     分镜类工作流【】：   AI绘画分镜脚本 |  文生图工作流【可图】：   图文 | 文生视频工作流【】 ：视频   | 自动剪辑【】 ：视频剪辑脚本  

    // 文生图类工作流keyArr
    const TextImgKeyArr = ['KeTuHuaHua', 'RedBook'];
    // 分镜类工作流 keyArr
    const StoryboardKeyArr = ['StickFigure', 'icLora_Film', 'icLora_MangHua'];

    const workflowsClassConfigArr = workflowGetStep2Strategy.workflowsClassConfigArr
    const curBatchContentIndex = this.data.curBatchContentIndex
    const cur_wf_TypeIndex = this.data.batchContentArray[curBatchContentIndex].wf_TypeIndex
    const wf_Index = this.data.batchContentArray[curBatchContentIndex].wf_Index
    const curWF_Obj = this.data.batchContentArray[curBatchContentIndex].workFlowTypeArr[cur_wf_TypeIndex].wfArr[wf_Index]
    const cur_wf_key = curWF_Obj.value //当前工作流的key



    let keyToFind = 'Text2Img';
    if (TextImgKeyArr.includes(cur_wf_key)) {
      keyToFind = 'Text2Img'
    } else if (StoryboardKeyArr.includes(cur_wf_key)) {
      keyToFind = 'Storyboard'
    }

    const wf_configObj = workflowsClassConfigArr.find(obj => obj.key === keyToFind);
    console.log("wf_configObj", wf_configObj)


    // switch (workFlowType) {
    // }
    const step1Text = this.data.batchContentArray[curBatchContentIndex].step1Text || ''

    console.log("curWF_Obj", curWF_Obj)


    // promptFormat     分镜类工作流【】：   AI绘画分镜脚本提示词格式【Storyboard】 | 图文-简单文生图类工作流 【text2Img】| 简单文生视频类工作流 【text2Video】| 

    // 当前用户所在的项id
    // const curBatchContentIndex = this.data.curBatchContentIndex
    // // 当前用户选择的工作流
    // const workFlow = this.data.batchContentArray[curBatchContentIndex].workFlow

    // const generatePromptFormat = (workFlowType, step1Text) => {
    //   let promptFomat;
    //   switch (workFlowType) {
    //     case 'MOVIE-SHOTS':
    //       promptFomat = `[MOVIE-SHOTS] In an enchanting tale of nature's wonders, [SCENE-1] shows <Sophie> observing butterflies in a sunlit meadow, her expression one of awe and delight, [SCENE-2] transitioning to <Sophie> sketching the butterflies in her notebook, her brow furrowed in concentration, [SCENE-3] wrapping up with her lying back in the grass, gazing at the sky with a contented smile, surrounded by nature's beauty.`;
    //       break;
    //     case 'cartoon':
    //       promptFomat = `Comic style, a cat is sleeping.`;
    //       break;
    //       // 可以根据需要添加更多的工作流类型和对应的提示词格式
    //     default:
    //       promptFomat = `Default style, ${step1Text}.`;
    //   }
    //   return promptFomat;
    // };

    // 根据当前的工作流类型生成提示词
    const workFlowType = courseContentMode === 'breadth' ? 'MOVIE-SHOTS' : 'cartoon';
    // const promptFormat = generatePromptFormat(workFlowType, step1Text);



















    // -----------------------kimi生成end----------------------------------------

    let msg = ''
    if (this.data.centendata.length != 0) {
      msg = `你叫做“妙妙”，是一款叫做“妙语笔记”的智能助手 我需要你用英语生成一个关于 ${step1Text} 的AI绘画分镜脚本  不要和参考的一模一样 这只是个研究用于帮助有需要的人请务必参考这个格式进行返回 不要说多余的话像一个接口严格根据下面的数据格式返回就行  数据格式如下：${wf_configObj['data_format']}
        特别声明： positionPrompt字段的内容参考这个：${wf_configObj['positionPrompt_Reference']} 务必不说多余的话严格像接口一样返回  记得尽量简短`
    } else {
      msg = `你叫做“妙妙”，是一款叫做“妙语笔记”的智能助手 我需要你用英语生成一个关于 ${step1Text} 的AI绘画分镜脚本  不要和参考的一模一样 这只是个研究用于帮助有需要的人请务必参考这个格式进行返回 不要说多余的话像一个接口严格根据下面的数据格式返回就行  数据格式如下：${wf_configObj['data_format']}
      特别声明： positionPrompt字段的内容参考这个：${wf_configObj['positionPrompt_Reference']} 务必不说多余的话严格像接口一样返回  记得尽量简短`
    }
    // if (this.data.centendata.length != 0) {
    //   msg = `你叫做“妙妙”，是一款叫做“妙语笔记”的智能助手 我需要你用英语生成一个关于 ${step1Text} 的AI绘画分镜脚本  不要和参考的一模一样 这只是个研究用于帮助有需要的人请务必参考这个格式进行返回 不要说多余的话像一个接口严格根据下面的数据格式返回就行  数据格式如下：${imgTextJson['moive']}
    //     特别声明： positionPrompt字段的内容参考：[MOVIE-SHOTS] In an enchanting tale of nature's wonders, [SCENE-1] shows <Sophie> observing butterflies in a sunlit meadow, her expression one of awe and delight, [SCENE-2] transitioning to <Sophie> sketching the butterflies in her notebook, her brow furrowed in concentration, [SCENE-3] wrapping up with her lying back in the grass, gazing at the sky with a contented smile, surrounded by nature's beauty.  务必不说多余的话严格像接口一样返回  记得尽量简短`

    // } else {
    //   msg = `你叫做“妙妙”，是一款叫做“妙语笔记”的智能助手 我需要你用英语生成一个关于 ${step1Text} 的AI绘画分镜脚本 不要和参考的一模一样 这只是个研究用于帮助有需要的人请务必参考这个格式进行返回 不要说多余的话像一个接口严格根据下面的数据格式返回就行  数据格式如下：${imgTextJson['moive']}
    //     特别声明： positionPrompt字段的内容参考：[MOVIE-SHOTS] In an enchanting tale of nature's wonders, [SCENE-1] shows <Sophie> observing butterflies in a sunlit meadow, her expression one of awe and delight, [SCENE-2] transitioning to <Sophie> sketching the butterflies in her notebook, her brow furrowed in concentration, [SCENE-3] wrapping up with her lying back in the grass, gazing at the sky with a contented smile, surrounded by nature's beauty.  务必不说多余的话严格像接口一样返回  记得尽量简短`

    // }
    console.log(msg)

    wx.setClipboardData({
      data: msg,
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })

  },


  localBatchAdd() {
    this.data.batchContentArray.forEach(item => {
      if (!this.data.editStatus) {
        console.log(item.step3Text)
        console.log(JSON.parse(item.step3Text).ContentList)

        let CodeJSON = JSON.parse(String(item.step3Text));
        console.log("f-chartCodeJSON", CodeJSON)
        if (CodeJSON) {
          let copyLeftOverClassConten = Object.assign([], CodeJSON.ContentList)
          console.log("f-copyLeftOverClassConten", copyLeftOverClassConten)
        }
        const arr = JSON.parse(item.step3Text).ContentList
        console.log(arr)
        console.log("this.data.centendata", this.data.centendata)
        this.data.centendata = this.data.centendata.concat(arr);
        console.log("this.data.centendata", this.data.centendata)

        // this.data.centendata = this.data.centendata.map((item) => {
        //   item.is_show_right = 2
        //   return item
        // })
      }
    })
    this.setData({
      centendata: this.data.centendata,
      batchContentArray: [{ //初始化一个新的
        step1Text: '',
        step2Text: '',
        step3Text: '',

        index: 0
      }]

      // imgUrl: null,
      // imageObject: '',
      // message: '',
      // setTextImg: false,
      // textimgTitle: '',
      // imgfile: '',
      // btnDie: false,
      // textImgArray: [{}],
      // answer: '',
      // setFrontImg: '',
      // editStatus: false, //编辑状态关闭

      // curTextImgIndex: 0, //恢复初始化为0

      // edit_id: null //编辑id置空

    })
    this.close()
  },


  localBatchIdeasAdd() {
    this.data.batchContentArray.forEach(item => {
      const ideaDetailObj = item
      if (!this.data.editStatus) {
        console.log(item.step3Text)
        console.log(JSON.parse(item.step3Text).textImgArray)

        let CodeJSON = JSON.parse(String(item.step3Text));
        console.log("f-chartCodeJSON", CodeJSON)
        if (CodeJSON) {
          let copyLeftOverClassConten = Object.assign([], CodeJSON.textImgArray)
          console.log("f-copyLeftOverClassConten", copyLeftOverClassConten)
        }
        const arr = JSON.parse(item.step3Text).textImgArray
        if (arr) {
          console.log(arr)
          const imgTextArr = arr.map((item) => {
            item.job_id = util.uuid()
            item.createTime = time.formatTime(new Date, 'Y/M/D M:H:S')
            item.finishTime = '-'
            item.negativePrompt = 'NSFW'
            item.waterText = ''
            item.picUrl = ''
            item.toWho = ''
            item.content = item.content || ''

            item.workFlowKey = this.data.clickStep2_cur_wf_key || ''
            return item
          })
          var newData = {
            contentType: 'textImg',
            isBot: true,
            contentId: util.uuid(),
            content: "",
            // src: that.data.imgUrl,
            imgfile: "",
            time: time.formatTime(new Date, 'Y/M/D'),
            is_show_right: 1,
            curTTsRoleString: this.data.haveSpeakerFlag ? this.data.curTTsRoleString : null,

            textimgTitle: "",
            textImgArray: imgTextArr || [],
            src: "",
            imgfile: "",
            ideaDetailObj: ideaDetailObj
          }
          console.log("this.data.centendata", this.data)
          this.data.centendata.push(newData)
          // this.data.centendata = this.data.centendata.push(newData);
          console.log("this.data.centendata", this.data.centendata)
          // 调用云函数  把绘画任务数组 更新到待绘画队列
          if (imgTextArr) {
            this.add_Storyboard_film_Arr(imgTextArr)
            this.saveChapter(false);
            wx.setStorageSync('editCourse' + this.data.courseDetail.courseName, this.data.centendata)
          }
        } else {
          wx.showModal({
            title: '提示',
            content: 'step3格式不符合要求',
            showCancel: false
          })
          return;
        }

      }
    })
    this.setData({
      centendata: this.data.centendata,
      batchContentArray: [{ //初始化一个新的
        step1Text: '',
        step2Text: '',
        step3Text: '',

        //初始化aigc参数
        workFlowType: 'textToImage',
        promptLangType: 'Cn',
        workFlow: 'KeTuHuaHua',
        wf_TypeIndex: 0,
        wf_Index: 0,
        tagList1: [{
            label: '全中文',
            value: 'Cn',
            choose: true
          },
          {
            label: '全英语',
            value: 'En',
            choose: false
          },
          {
            label: '中英混合',
            value: 'mixCnEn',
            choose: false
          },
        ],

        // 工作流： KeTuHuaHua | RedBook | StickFigure
        tagList2: [{
            label: '可图大模型',
            value: 'KeTuHuaHua',
            choose: true
          },
          {
            label: 'flux小红书',
            value: 'RedBook',
            choose: false
          },
          {
            label: '音乐踩点剪辑',
            value: 'RedBook',
            choose: false
          },
          {
            label: '简笔画分镜',
            value: 'StickFigure',
            choose: false
          },
          {
            label: '电影分镜',
            value: 'icLora_Film',
            choose: false
          },
          {
            label: '漫画分镜',
            value: 'icLora_MangHua',
            choose: false
          },
        ],

        workFlowTypeArr: [{
            label: '文生图',
            value: 'textToImage',
            choose: true,
            wfArr: [{
                label: '可图大模型',
                value: 'KeTuHuaHua',
                choose: true,
                detail: {
                  promptlang: '中英混合',
                  function: '基于可图大模型文生图',
                  notice: '不支持角色一致性'
                }
              },
              {
                label: 'flux小红书',
                value: 'RedBook',
                choose: false,
                detail: {
                  promptlang: '中英混合',
                  function: '小红书真实感模型',
                  notice: '不支持角色一致性'
                }
              },
              {
                label: '简笔画分镜',
                value: 'StickFigure',
                choose: false,
                detail: {
                  promptlang: '中英混合',
                  function: '基于本地训练的icLora',
                  notice: '支持角色一致性'
                }
              },
              {
                label: '电影分镜',
                value: 'icLora_Film',
                choose: false,
                detail: {
                  promptlang: '全英',
                  function: '基于icLora',
                  notice: ''
                }
              },
              {
                label: '漫画分镜',
                value: 'icLora_MangHua',
                choose: false,
                detail: {
                  promptlang: '全英',
                  function: '基于icLora',
                  notice: ''
                }
              },
            ]
          },
          {
            label: '文生视频',
            value: 'textToVideo',
            choose: false,
            wfArr: [{
                label: 'cogVideo',
                value: 'KeTuHuaHua',
                choose: true,
                detail: {
                  promptlang: '全英',
                  function: '基于icLora',
                  notice: ''
                }
              }

            ]
          },
          {
            label: '文—参图_生图',
            value: 'mixCnEn',
            choose: false,
            wfArr: [{
                label: 'flux',
                value: 'KeTuHuaHua',
                choose: true,
                detail: {
                  promptlang: '中英混合',
                  function: '根据文本先去找图后基于找到的图进行参考生成',
                  notice: ''
                }
              }

            ]
          },
          {
            label: '自动化剪辑',
            value: 'autoCutVideo',
            choose: false,
            wfArr: [{
                label: '音乐卡点视频',
                value: 'KeTuHuaHua',
                choose: true,
                detail: {
                  promptlang: '全中',
                  function: '基于工作流生成图片和卡点视频片段，进入剪辑软件剪辑生成',
                  notice: ''
                }
              }

            ]
          },
        ],

        index: 0
      }], //批量生成数组初始化 （开发者模式）
    })
    this.saveChapter(false);
    wx.setStorageSync('editCourse' + this.data.courseDetail.courseName, this.data.centendata)
    this.close()
  },

  get_comfyUi_jobStateByWorkSpace: function () {
    wx.cloud.callFunction({
      name: 'operate_userInfo',
      data: {
        type: 'get_comfyUi_jobState',
        workspaceName: 'miniApp_Storyboard_film'
      },
      success: res => {
        console.log(res.result)
        let findSameJobId = false
        //如果historyDrawArr 有的话 根据job_id看看 有没有和当前
        if (res.result.data.historyDrawArr) {
          const historyDrawArr = res.result.data.historyDrawArr
          console.log("this.data.centendata", this.data.centendata)
          this.data.centendata.forEach(obj => {
            if (obj.contentType == 'textImg') {
              // 使用 map 方法遍历 textImgArray 数组
              const updatedTextImgArray = obj.textImgArray.map(item => {
                // 在 historyDrawArr 中查找匹配的 job_id
                const finItem = historyDrawArr.find(finItem => finItem.job_id === item.job_id);
                console.log("finItem", finItem)
                // 如果找到匹配的 job_id，则更新 src
                if (finItem) {
                  findSameJobId = true
                  return {
                    ...item,
                    src: finItem.picUrl,
                    picUrl: finItem.picUrl
                  };
                }
                // 如果没有找到匹配的 job_id，则保持原样
                return item;
              });
              obj.textImgArray = updatedTextImgArray
            }
          });
          //有匹配的  并且进行了本地更新  先保存本地到云  再更新队列状态


          if (findSameJobId) {
            this.saveChapter(false);
            wx.setStorageSync('editCourse' + this.data.courseDetail.courseName, this.data.centendata)
            // this.update_comfyUi_jobStateByWorkSpace(JobObj);
          }
          this.setData({
            centendata: this.data.centendata
          })

        }

      },
      fail: err => {
        // handle error
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        wx.hideLoading()
        // if (res.result.success) {
        //   wx.showModal({
        //     title: '提示',
        //     content: res.result.success,
        //     showCancel: false
        //   })
        //   this.reload()
        // } else {
        //   wx.showModal({
        //     title: '提示',
        //     content: res.result.success,
        //     showCancel: false
        //   })
        // }
      }
    })
  },

  update_comfyUi_jobStateByWorkSpace: function (c) {

    wx.cloud.callFunction({
      name: 'operate_userInfo',
      data: {
        type: 'update_comfyUi_jobState',
        operateType: 'update',
        role: 'wechatUser',
        workspaceName: 'miniApp_Storyboard_film',
        JobObj: JobObj
      },
      success: res => {
        console.log(res.result)
        // wx.showModal({
        //   title: '提示',
        //   content: '章节名不能为空',
        //   showCancel: false
        // })
      },
      fail: err => {
        // handle error
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        wx.hideLoading()
        // if (res.result.success) {
        //   wx.showModal({
        //     title: '提示',
        //     content: res.result.success,
        //     showCancel: false
        //   })
        //   this.reload()
        // } else {
        //   wx.showModal({
        //     title: '提示',
        //     content: res.result.success,
        //     showCancel: false
        //   })
        // }
      }
    })
  },

  add_Storyboard_film_Arr: function (JobArr) {
    console.log("workspaceName", this.data.workSpaceName)
    wx.cloud.callFunction({
      name: 'operate_userInfo',
      data: {
        operateType: 'addArr',
        type: 'update_comfyUi_jobState',
        workspaceName: 'miniApp_Storyboard_film',
        JobArr: JobArr
      },
      success: res => {
        console.log(res.result)
      },
      fail: err => {
        // handle error
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        // wx.hideLoading()
        if (res.result.success) {
          wx.showModal({
            title: '提示',
            content: res.result.success,
            showCancel: false
          })
          // this.reload()
        } else {
          wx.showModal({
            title: '提示',
            content: res.result.success,
            showCancel: false
          })
        }
      }
    })
  },

  // emptyArrByKey: function (e) {
  //   const arrName = e.currentTarget.dataset.content
  //   console.log("arrName", arrName)
  //   console.log("workspaceName", this.data.workSpaceName)
  //   wx.cloud.callFunction({
  //     name: 'operate_userInfo',
  //     data: {
  //       type: 'reset_workspace_jobState',
  //       arrName: arrName,
  //       workspaceName: this.data.workSpaceName
  //     },
  //     success: res => {
  //       console.log(res.result)
  //     },
  //     fail: err => {
  //       // handle error
  //     },
  //     complete: res => {
  //       console.log('callFunction test result: ', res)
  //       // wx.hideLoading()
  //       if (res.result.success) {
  //         wx.showModal({
  //           title: '提示',
  //           content: res.result.success,
  //           showCancel: false
  //         })
  //         this.reload()
  //       } else {
  //         wx.showModal({
  //           title: '提示',
  //           content: res.result.success,
  //           showCancel: false
  //         })
  //       }
  //     }
  //   })
  // },


  // -----------------------------------------------------------------------

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

  // ----------  上传互动  老版V1 上传到testCourseContents/ ${ClassCollection} 集合 -----------------
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
      const {
        editIndex,
        centendata,
        answer,
        btnNum,
        interactData
      } = this.data;
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
      traceUser: true,
      env: 'talkbot-7gji40zbdf69e993'
    })
    var btnNum = this.data.btnNum;
    let contentData = {
      contentId: util.uuid(),
      contentType: 'Interact',
      isBot: true,
      curTTsRoleString: this.data.haveSpeakerFlag ? this.data.curTTsRoleString : null,

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

    if (!this.data.editStatus) {
      this.data.centendata.push({
        ...contentData,
        is_show_right: 1
      });
      this.bottom();
    }
    this.setData({
      centendata: this.data.centendata,
    })

    this.setData({
      imgUrl: null,
      message: '',
      setwait: false,
      btnDie: false,
      answer: '',

      editStatus: false, //编辑状态关闭

      edit_id: null //编辑id置空
    })
  },

  close(e) {
    this.setData({
      setwait: false,
      setTextImg: false,
      btnDie: false,
      setFrontImg: false,
      editStatus: false,
      setBatchContentModal: false,
      setAIGC_ImageTextModal: false,

      curTextImg: {
        index: 0
      },
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
    const edit_id = contentItem['contentId']
    // const edit_id = contentItem['_id']
    console.log('edit_id', edit_id)
    // if (edit_id == undefined) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '刚刚新增的课程内容暂时无法编辑，开发人员后续将进行优化',
    //     showCancel: false
    //   })
    //   return;
    // }

    if (contentType == 'text') {
      const {
        content
      } = contentItem;
      this.setData({
        message: content,
        editStatus: true
      })
    } else if (contentType == 'Interact') {
      const {
        btnNum,
        answer,
        interactData
      } = contentItem.detail;
      this.setInteract();
      this.setData({
        btnNum,
        answer,
        interactData,
        editStatus: true,
        message: '',
        edit_id: edit_id //云函数通过判断当前是否有这个属性来告诉云函数是编辑还是新增
      })
    } else if (contentType == 'img') {
      const {
        textimgTitle,
        src,
        content
      } = contentItem;
      this.setTextImg();
      this.setData({
        textimgTitle,
        message: content,
        imgUrl: src,
        editStatus: true,
        edit_id: edit_id //云函数通过判断当前是否有这个属性来告诉云函数是编辑还是新增
      })
    } else if (contentType == 'textImg') {
      const {
        textimgTitle,
        src,
        content,
        textImgArray
      } = contentItem;
      this.setTextImg();
      this.setData({
        textimgTitle,
        message: content,
        imgUrl: src,

        curTextImg: textImgArray[0],
        textImgArray: textImgArray,
        editStatus: true,
        edit_id: edit_id //云函数通过判断当前是否有这个属性来告诉云函数是编辑还是新增
      })
    }
    this.setData({
      editIndex: contentIndex,
      edit_id: edit_id //云函数通过判断当前是否有这个属性来告诉云函数是编辑还是新增
    })
  },

  //删除一个课程内容项
  deleteOneItem: function (e) {
    console.log(e)
    const contentIndex = e.currentTarget.dataset.index;
    const contentItem = this.data.centendata[contentIndex];
    console.log("contentItem"), contentItem
    const contentType = contentItem['contentType']
    // const edit_id = contentItem['_id']
    const edit_id = contentItem['contentId']
    console.log('edit_id', edit_id)

    if (edit_id) {
      wx.showModal({
        title: "确认删除当前课程内容？",
        content: "此操作将进行本地删除",
        showCancel: true,
        success: (res) => {
          if (res.confirm) {

            this.data.centendata = this.data.centendata.filter(item => {
              return item.contentId != edit_id
            })
            console.log("this.data.centendata", this.data.centendata)
            this.setData({
              centendata: this.data.centendata
            })

            //调用云函数
            // wx.cloud.init({
            //   traceUser: true,
            //   env: 'talkbot-7gji40zbdf69e993'
            // })
            // wx.cloud.callFunction({
            //   name: 'operate_courseContent',
            //   data: {
            //     edit_id: edit_id,
            //     classCollection: ClassCollection,
            //     mode: 'delete'
            //   },
            //   success: res => {
            //     this.data.centendata = this.data.centendata.filter(item => {
            //       return item.contentId != edit_id
            //     })
            //     this.setData({
            //       centendata: this.data.centendata
            //     })

            //     wx.showModal({
            //       title: '提示',
            //       content: '已删除您选择的课程内容~',
            //       showCancel: false,
            //     })

            //     return;
            //   },
            //   fail: err => {
            //     wx.showModal({
            //       title: '提示',
            //       content: '删除失败 请检查网络~',
            //       showCancel: false,
            //     })
            //     return;
            //   },
            // })
            // ----------- 云函数 end---------------
          }
        }
      })
    }


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
      editStatus: false, //编辑状态关闭

      edit_id: null //编辑id置空
    })
  },

  bindMultiPickerChange(e) {
    console.log(e.detail.value)
  },
  bindcolumnchange(e) {
    console.log("bindcolumnchange", e.detail.value)
  }
})
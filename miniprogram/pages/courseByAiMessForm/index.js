var app = getApp();
var util = require("../../utils/util.js")
var time = require('../../utils/util.js');

const qiniuUploader = require("../../utils/qiniuUploader");
const ImgUrl = '';
let ClassCollection = '';

var message = '';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '',
    classId: '',
    courseName: '',
    courseIntroduce: '',
    value: '',
    imgUrl: '',
    textimgTitle: '',
    uptoken: '',
    centendata: [],
    interactData: [],
    textImgArray: [],

    editCourseDetail: {
      courseContentMode: 'breadth',
      courseContentTypeMode: 'useAI',
      curContentType: 'ask',
      courseTagList: [],

      step1Text: '',
      step2Text: '',
      step3Text: '',

      BqbSettin: 'noEmoj'

    },

    tempimg: [], //临时数组  等点击发送的时候一起走
    courseUUid: util.uuid(),

    type: 'course',
    isPageEdit: false,

    pageTitle: '课程信息',
    pageRowText: '课程内容需要结果审核后才会公开哦',
    firstPlaceholder: '请输入课程名称',
    secondPlaceholder: '课程封面（粘贴url或点击右侧上传）',
    thirdPlaceholder: '请输入课程简介',
    bottomTitle: '课程标签',


    tagList: [{
        label: '理论',
        value: 1,
        choose: false
      },
      {
        label: '入门',
        value: 2,
        choose: false
      },
      {
        label: '进阶',
        value: 3,
        choose: false
      },
      {
        label: '实用',
        value: 4,
        choose: false
      },
      {
        label: '情景模拟',
        value: 5,
        choose: false
      },
      {
        label: '趣味学习',
        value: 6,
        choose: false
      },
    ],

    tagList1: [{
        label: '答题互动',
        value: 'ask',
        choose: true
      },
      {
        label: '了解知识',
        value: 'get',
        choose: false
      },
    ],
    tagList2: [{
        label: '广度扩展式学习',
        value: 'breadth',
        choose: true
      },
      {
        label: '深度优先学习',
        value: 'depth',
        choose: false
      },
    ],

    tagList3: [{
        label: '英语（English）',
        value: 'English',
        choose: true
      },
      {
        label: '中文（Chinese）',
        value: 'Chinese',
        choose: false
      },
      {
        label: '日语（Japanese）',
        value: 'Japanese',
        choose: false
      },
      {
        label: '德语（german）',
        value: 'German',
        choose: false
      },

    ],

    tagList4: [{
        label: 'AI生成',
        value: 'useAI',
        choose: true
      },
      {
        label: '人工生成',
        value: 'manual',
        choose: false
      },
      {
        label: '开发者模式',
        value: 'devMode',
        choose: false
      },
    ],
    tagList5: [{
        label: '无表情包',
        value: 'noEmoj',
        choose: true
      },
      {
        label: '随机模式',
        value: 'manual',
        choose: false
      },
      {
        label: '仅柴犬',
        value: 'CQdog',
        choose: false
      },
    ],
    courseContentMode: 'breadth', // breadth广度  depth深度
    curLanguage: 'English' // 广度扩展式学习的语言

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.currentChooseCard == "0") {
      ClassCollection = 'EngClassContents'
    } else if (options.currentChooseCard == "1") {
      ClassCollection = 'JaClassContents'
    } else if (options.currentChooseCard == "2") {
      //其他课程
      ClassCollection = 'otherClassContents'
    }


    if (options && options.courseMess) {
      let crouseDetail = JSON.parse(options.courseMess);
      if (crouseDetail) {
        this.setData({
          editCourseDetail: crouseDetail,
          type: options.type,
          isPageEdit: true
        })
      }
    }

    let islogin = wx.getStorageSync('islogin');
    if (islogin == false || islogin == undefined) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录，课程作者将标记为匿名，为避免您的课程数据丢失，建议您在【我的】中进行登录',
        showCancel: false
      })
    }

    if (options && options.type) {
      const type = options.type
      if (type === 'course') {
        this.setData({
          pageTitle: '课程信息',
          pageRowText: '课程内容需要通过审核后才会公开哦',
          firstPlaceholder: '请输入课程名称',
          secondPlaceholder: '课程封面（粘贴url或点击右侧上传）',
          thirdPlaceholder: '请输入课程简介',
          bottomTitle: '课程标签',
        })
      } else if (type === 'narrate') {
        this.setData({
          pageTitle: '基本信息',
          pageRowText: '内容需要通过审核后才会公开哦',
          firstPlaceholder: '请输入介绍的山村名称',
          secondPlaceholder: '山村封面（粘贴url或点击右侧上传）',
          thirdPlaceholder: '请输入山村简介',
          bottomTitle: '山村标签',
        })

      }
      let isVip = wx.getStorageSync('isVip');
      this.setData({
        type: options.type,
        isVip: isVip
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  // 把当前图文Data放到数组中  等待触发submit一起上传
  addOneItem: function (e) {
    var newData = {
      textimgTitle: this.data.textimgTitle,
      courseIntroduce: this.data.courseIntroduce,
      content: this.data.message,
      src: this.data.imgUrl,
    }
    let textImgArray = this.data.textImgArray;
    textImgArray.push(newData);

    this.setData({
      textImgArray: textImgArray,
      textimgTitle: '',
      message: '',
      imgUrl: '',
      imageObject: '',
      answer: '',
    })
  },



  clickFinish: function (e) {
    if (this.data.editCourseDetail.courseName == '') { //上传封面的时候可以不需要输入章节id
      wx.showModal({
        title: '提示',
        content: '给取个名字吧~',
        showCancel: false
      })
      return;
    } else if (this.data.editCourseDetail.courseFrontImgUrl == '') {
      wx.showModal({
        title: '提示',
        content: '不要忘记上传封面哦~',
        showCancel: false
      })
      return;
    } else if (this.data.editCourseDetail.courseIntroduce == '') {
      wx.showModal({
        title: '提示',
        content: '简单介绍下吧~',
        showCancel: false
      })
      return;
    }

    const chooseList = this.data.tagList.filter(item => item.choose);
    const courseTagList = chooseList.map(item => {
      return item.label
    });
    this.data.editCourseDetail.courseTagList = courseTagList //选中的课程标签

    console.log("this.data.editCourseDetail", this.data.editCourseDetail)
    const courseMess = {
      courseUUid: this.data.editCourseDetail.courseUUid || this.data.courseUUid,
      courseName: this.data.editCourseDetail.courseName,
      courseFrontImgUrl: this.data.editCourseDetail.courseFrontImgUrl,
      courseIntroduce: this.data.editCourseDetail.courseIntroduce,
      courseType: 'other',
      creatTime: time.formatTime(new Date, 'Y/M/D'),
      courseContentTypeMode: this.data.editCourseDetail.courseContentTypeMode, // AI  人工生成  开发者模式

      // 开发者模式需要的
      step1Text: this.data.editCourseDetail.step1Text,
      step2Text: this.data.editCourseDetail.step2Text,
      step3Text: this.data.editCourseDetail.step3Text,
      BqbSettin: this.data.editCourseDetail.BqbSettin,


      //AI需要的部分
      useAI: true,
      courseContentMode: this.data.editCourseDetail.courseContentMode || 'breadth',
      curLanguage: this.data.editCourseDetail.curLanguage || 'English',
      learnContent: this.data.editCourseDetail.learnContent || '',
      curContentType: this.data.editCourseDetail.curContentType || 'ask',
      courseTagList: this.data.editCourseDetail.courseTagList || []
    }
    const info = wx.getStorageSync("info") || {
      'nickName': '匿名',
      avatarUrl: "http://imgchatbot.uavserve.online/talkBotDoor.gif",
      language: "zh_CN"
    };
    courseMess.createrInfo = info
    // wx.showLoading({
    //   title: '处理中',
    //   mask: true
    // })
    // let collection = 'operate_CourseMess'
    // if(this.data.type==='course'){
    //   collection = 'operate_CourseMess'
    // }else if(this.data.type==='narrate'){
    //   collection = 'operate_CourseMess'
    // }

    console.log("courseMess", courseMess)
    wx.cloud.callFunction({
      name: 'operate_CourseMess',
      data: {
        courseMess: courseMess,
        type: this.data.type,
        mode: 'operateDetail'
      },
      success: res => {
        if (this.data.isPageEdit) {
          wx.navigateBack({
            delta: 2 //返回的页面数
          });
          return;
        } else {
          const crouseDetail = courseMess
          app.globalData.CurrentCourseObj = crouseDetail
          wx.navigateTo({
            //这里传值
            url: "../../pages/courseCatalogue/index?btnType=" + 'edit' + "&type=" + this.data.type,
            // url: "../../pages/courseCatalogue/index?courseMess=" + str + "&btnType=" + btnType,
            // url: "../../pages/courseCatalogue/index?courseMess=" + str + "&Cc=" + Cc,
          })
          return;
        }

      },
      fail: err => {
        // handle error
        wx.showModal({
          title: '提示',
          content: '课程信息上传出错 请检查网络',
          showCancel: false,
        })
        return;
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        wx.hideLoading()
      }
    })
  },

  useTecentCloud() {
    // wx.cloud.init()
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
          this.data.editCourseDetail.courseFrontImgUrl = res.fileID
          this.setData({
            zhaopian: '图片如下',
            imgUrl: res.fileID,
            cloudimgs: cloudimgs,
            editCourseDetail: this.data.editCourseDetail
          })


          wx.hideLoading()
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 1000
          })

          return;
        }
      },
    })
  },

  // ----------------上传图片上传src  返回-------------

  addimgToCloud() {
    //init!!!!!!!!!!!!!!!!

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
            // let that = this
            var obj = JSON.stringify(res.imageURL)
            that.setData({
              'imageObject': res,
            })

            let imgobj = that.data.imageObject;
            // console.log(imgobj);
            if (imgobj != '') {
              that.setData({
                imgUrl: 'http://' + imgobj.imageURL
              })
            }

            if (that.data.textimgTitle == '') {
              that.add();
            } else {
              that.addOneItem();
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
            console.log("上传进度", progress.progress);
            console.log("已经上传的数据长度", progress.totalBytesSent);
            console.log(
              "预期需要上传的数据总长度",
              progress.totalBytesExpectedToSend
            );
            that.log = "上传进度" + progress.progress;
          },
          cancelTask => {
            // that.setData({ cancelTask });
            // this.cancelTask = cancelTask;
          }
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
        return;
      },
      complete: res => {

        // that.add();
      }
    })



    // ------------七牛官方sdk--------------

    // var url = app.globalData.url
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

    var that = this;
    // that.data.imgnum
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



  // ----------------上传图文准备---------------

  getTitle(e) {
    if (e.detail.value) {
      let value = e.detail.value;
      this.setData({
        textimgTitle: value,
      });
    }
  },

  getContent(e) {
    if (e.detail.value) {
      let value = e.detail.value;
      this.setData({
        message: value,
      });
    }
  },

  getSrc(e) {
    if (e.detail.value) {
      let value = e.detail.value;
      this.setData({
        imgUrl: value,
      });
    }
  },

  close(e) {
    this.setData({
      setwait: false,
      setTextImg: false,
      btnDie: false,
      setFrontImg: false,
    });
  },




  // -------------辅助交互 自动化调用方法------------

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
        scrollTop: res[1].scrollHeight + 50 // 显示区域的竖直滚动位置
      })
      // res[1].scrollTop // 显示区域的竖直滚动位置
    })
  },

  bindChange1: function (e) {
    // this.data.imgUrl = e.detail.value
    this.data.editCourseDetail.courseFrontImgUrl = e.detail.value
  },

  bindChange2: function (e) {
    // this.data.courseName = e.detail.value
    this.data.editCourseDetail.courseName = e.detail.value
  },
  bindChange3: function (e) {
    this.data.editCourseDetail.courseIntroduce = e.detail.value
  },
  //学习内容
  bindChange4: function (e) {
    this.data.editCourseDetail.learnContent = e.detail.value
  },

  //编辑 Step1Text
  bindChangeStep1Text: function (e) {
    // console.log("bindChangeStep1Text", e.detail.value)
    this.data.editCourseDetail.step1Text = e.detail.value
  },

  //编辑 Step2Text
  bindChangeStep2Text: function (e) {
    this.data.editCourseDetail.step2Text = e.detail.value
  },

  //编辑 Step1Text
  bindChangeStep3Text: function (e) {
    this.data.editCourseDetail.step3Text = e.detail.value
  },

  preimage(e) {
    var imgurl = this.data.centendata[e.currentTarget.dataset.i];
    var final_url = JSON.stringify(imgurl);
    if (this.data.tempimg.length != 0) {
      wx.previewImage({
        current: imgurl,
        urls: [this.data.tempimg],
      })
    }
  },

  del() {

    let that = this;
    if (this.data.courseName == '') {
      wx.showModal({
        title: '提示',
        content: '课程名不能为空',
        showCancel: false
      })
      return;
    } else if (this.data.classId == '') {
      wx.showModal({
        title: '提示',
        content: '章节ID不能为空',
        showCancel: false
      })
      return;
    } else if (this.data.courseIntroduce == '') {
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
        success: function (res) {
          if (res.confirm) {
            // wx.showModal({
            //   title: '提示',
            //   content: '没有权限',
            //   showCancel: false
            // })
            // return;


            //调用云函数
            wx.cloud.init({
              traceUser: true,
              env: 'talkbot-7gji40zbdf69e993'
            })

            wx.cloud.callFunction({
              name: 'del_chapter',
              data: {
                classCollection: ClassCollection,
                classId: parseInt(that.data.classId),
                courseName: that.data.courseName,
                courseIntroduce: that.data.courseIntroduce,
              },
              success: res => {
                wx.showModal({
                  title: '提示',
                  content: '成功删除该章节~',
                  showCancel: false,
                })
                return;
              },
              fail: err => {
                // handle error
                wx.showModal({
                  title: '提示',
                  content: '删除失败 请检查网络~',
                  showCancel: false,
                })
                return;
              },
              complete: res => {
                console.log('callFunction test result: ', res)
              }
            })

            // ----------- 云函数 end---------------

          } else {
            console.log('用户点击取消')
          }
        }
      })
    }

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
    // if(useselectByDate)x
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

  toChartDetail() {
    console.log(1111)
    wx.navigateTo({
      //这里传值
      url: "../chartBox/package-tree-graph/basic-dendrogram/index",
    })
  },


  handleChoose(e) {
    const {
      index,
      choose
    } = e.target.dataset;
    const str = `tagList[${index}].choose`
    const chooseList = this.data.tagList.filter(item => item.choose);
    if (chooseList.length >= 3 && !choose) return;
    this.setData({
      [str]: !choose,
    })
  },


  //课程内容交互模式单选
  ContentControlhandleChoose(e) {
    const {
      index,
      choose
    } = e.target.dataset;
    const str = `tagList1[${index}].choose`
    const curContentType = this.data.tagList1[index].value
    const chooseList = this.data.tagList1.filter(item => item.choose);

    if (chooseList.length >= 1) {
      this.data.tagList1.forEach((e, index) => {
        const str2 = `tagList1[${index}].choose`
        this.setData({
          [str2]: false
        })
      })
    };

    this.data.editCourseDetail.curContentType = curContentType //默认答题模式
    this.setData({
      [str]: !choose,
      editCourseDetail: this.data.editCourseDetail
    })
  },

  //语言单选Change
  languageHandleChoose(e) {
    const {
      index,
      choose
    } = e.target.dataset;
    const str = `tagList3[${index}].choose`
    const curLanguage = this.data.tagList3[index].value
    const chooseList = this.data.tagList3.filter(item => item.choose);

    if (chooseList.length >= 1) {
      this.data.tagList3.forEach((e, index) => {
        const str2 = `tagList3[${index}].choose`
        this.setData({
          [str2]: false
        })
      })
    };

    this.data.editCourseDetail.curLanguage = curLanguage //广度 选择的语言
    this.setData({
      [str]: !choose,
      editCourseDetail: this.data.editCourseDetail
    })
  },
  //学习模式单选Change
  ModeHandleChoose(e) {
    const {
      index,
      choose
    } = e.target.dataset;
    const str = `tagList2[${index}].choose`
    const curMode = this.data.tagList2[index].value
    console.log("curMode", curMode)
    const chooseList = this.data.tagList2.filter(item => item.choose);


    if (chooseList.length >= 1) {
      this.data.tagList2.forEach((e, index) => {
        const str2 = `tagList2[${index}].choose`
        this.setData({
          [str2]: false
        })
      })
    };

    this.data.editCourseDetail.courseContentMode = curMode //课程学习模式 【广度优先还是深度优先】
    this.setData({
      [str]: !choose,
      editCourseDetail: this.data.editCourseDetail
    })
  },

  //内容生成类型 单选Change
  ContentTypeHandleChoose(e) {
    const {
      index,
      choose
    } = e.target.dataset;
    const str = `tagList4[${index}].choose`
    const curMode = this.data.tagList4[index].value
    console.log("curMode", curMode)
    const chooseList = this.data.tagList4.filter(item => item.choose);


    if (chooseList.length >= 1) {
      this.data.tagList4.forEach((e, index) => {
        const str2 = `tagList4[${index}].choose`
        this.setData({
          [str2]: false
        })
      })
    };

    this.data.editCourseDetail.courseContentTypeMode = curMode //课程学习模式 【广度优先还是深度优先】
    this.setData({
      [str]: !choose,
      editCourseDetail: this.data.editCourseDetail
    })
  },

  //表情包设置 单选Change
  BqbSettingHandleChoose(e) {
    const {
      index,
      choose
    } = e.target.dataset;
    const str = `tagList5[${index}].choose`
    const bqbSetting = this.data.tagList5[index].value
    const chooseList = this.data.tagList4.filter(item => item.choose);


    if (chooseList.length >= 1) {
      this.data.tagList4.forEach((e, index) => {
        const str2 = `tagList5[${index}].choose`
        this.setData({
          [str2]: false
        })
      })
    };

    this.data.editCourseDetail.BqbSetting = bqbSetting //课程学习模式 【广度优先还是深度优先】
    this.setData({
      [str]: !choose,
      editCourseDetail: this.data.editCourseDetail
    })
  },


  getChapterListPromptByKimi() {
    // wx.showLoading({
    //   title: '正在生成章节目录中',
    // })

    //参考章节结构如下：第一章节：英语的特点，文化背景，学习英语有什么优势
    // 第二章节：英语的语法特点  基础语法
    // 第三章节：基础英语的简单应用 结合小任务小游戏
    // 第四章节：高阶进阶语法
    // 第五章节：高阶语法应用  听力、小作文训练
    // 第六章节：冒险阶段 随机生成各种场景模拟、小游戏等  

    const curLanguage = this.data.curLanguage || ''
    const courseContentMode = this.data.editCourseDetail.courseContentMode || 'breadth'
    const step1Text = this.data.editCourseDetail.step1Text || ''
    const courseContentModeMap = {
      breadth: `一个宏观围绕${step1Text}扩展式学习的章节目录`,// 广度扩展型章节
      depth: `围绕${step1Text}不同方面深入式学习的章节目录`,// 深度挖掘型章节
    }



    const courseContentModeDemoMap = {
      breadth: `{
        "ChapterList": [
          {
            "courseNum": "-"
"_id": {
        "chapterId": 1,
        "chapterName": "第一个章节名（eg:xx前世今生）"
      }
          },  {
            "courseId": "1",
            "courseNum": "-",
"_id": {
        "chapterId": 2,
        "chapterName": "第二个章节名（eg:xx快速入门）"
      }
    }
    ]
      }`,// 广度扩展型章节
      depth: `{
        "ChapterList": [
          {
            "courseNum": "-"
"_id": {
        "chapterId": 1,
        "chapterName": "第一个章节名"
      }
          },  {
            "courseId": "1",
            "courseNum": "-"
"_id": {
        "chapterId": 2,
        "chapterName": "第二个章节名"
      }
    }
    ]
      }`,// 深度挖掘型章节
    }


    // mess第一部分  课程名是${this.data.crouseDetail.courseName} 课程简介是${this.data.crouseDetail.courseIntroduce}
    const msg = `你叫做“妙妙”，是一款叫做“妙语笔记”的智能助手 我需要你用${curLanguage}生成${courseContentModeMap[courseContentMode]}  不要和参考的一模一样 这只是个研究用于帮助有需要的人请务必参考这个格式进行返回 不要说多余的话像一个接口严格根据下面的数据格式返回就行  数据格式如下：${courseContentModeDemoMap[courseContentMode]}`

    // const msg = `我需要你用${curLanguage}生成${courseContentModeMap[courseContentMode]}  不要和参考的一模一样 这只是个研究用于帮助有需要的人请务必参考这个格式进行返回 不要说多余的话像一个接口严格根据下面的数据格式返回就行  数据格式如下：${courseContentModeDemoMap[courseContentMode]}`
  
    // this.firstStep_ask(msg)

    console.log(msg)

    wx.setClipboardData({
      data: msg,
      success (res) {
        wx.getClipboardData({
          success (res) {
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
})
//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
const urlForTalk = ''
Page({
  data: {
    remind: '加载中',
    islogin: false,
    login: false,
    currentSwiperIndex: 0,
    showListType: 'talkList',
    "bnrUrl": [{
      "url": "cloud://uav-001-9213ca.7561-uav-001-9213ca/images.jpg"
    }, {
      "url": "img/1242x366_djj_0706-1530871651.jpg"
    }, {
      "url": "img/1242x366_lyx_0709-1531122892.jpg"
    }, {
      "url": "img/14540040236323_1_o.jpg"
    }],



    swiperMargin: wx.getSystemInfoSync().windowWidth > 380 ? '60rpx' : '50rpx',

    swiperCurrent: 0,
    swiperList: [],



    currentIndex: 0,
  },
  swiperBindchange(e) {
    this.setData({
      currentSwiperIndex: e.detail.current
    })
  },

  unopen: function () {
    this.setData({
      messageTitle: "程序员已被祭天",
      message: "功能开发中，请耐心等待"
    }),
      this.showMessage()
  },

  showMessage: function () {
    wx.showModal({
      title: this.data.messageTitle,
      content: this.data.message,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },

  onLoad: function (options) {
    var that = this
    var picList = []

    // picList.push("http://imgchatbot.uavserve.online/6.webp")
    // picList.push("http://imgchatbot.uavserve.online/7.webp")
    // picList.push("http://imgchatbot.uavserve.online/5.webp")
    // picList.push("http://imgchatbot.uavserve.online/1.webp")
    // picList.push("http://imgchatbot.uavserve.online/2.webp")
    // picList.push("http://imgchatbot.uavserve.online/3.webp")



    picList.push("cloud://huixue-3g4h1ydg1dedcaf3.6875-huixue-3g4h1ydg1dedcaf3-1312399818/粤语真的很有意思.png")
    picList.push("cloud://huixue-3g4h1ydg1dedcaf3.6875-huixue-3g4h1ydg1dedcaf3-1312399818/1656511698886.png")
    picList.push("cloud://huixue-3g4h1ydg1dedcaf3.6875-huixue-3g4h1ydg1dedcaf3-1312399818/1654701789977.png")


    // swiperList.push({

    //   productId: 0,
    //   imgUrl: 'cloud://huixue-3g4h1ydg1dedcaf3.6875-huixue-3g4h1ydg1dedcaf3-1312399818/粤语真的很有意思.png'
    // })


    let login = wx.getStorageSync("islogin")
    console.log(login)
    // ----------------------------这里判断数据库中Member集合里有没有这个用户返回给isnew-----
    var identity = wx.getStorageSync("useridentity");
    console.log(identity);
    var icon2;
    if (identity == 1) {
      icon2 = '/Images/txl.png'
    } else {
      icon2 = "/Images/icon_release.png"
    }
    // ---------全部读取话题--------------
    // wx.cloud.init()
    // //  下面是云函数的调用
    // // console.log(wx.getStorageSync("openid"));
    // wx.cloud.callFunction({
    //   name: 'get_AllTopics',
    //   data: {
    //   },
    //   success: res => {
    //     // console.log(res.result)
    //     // wx.setStorageSync("my", items);
    //   },
    //   fail: err => {
    //     // handle error
    //   },
    //   complete: res => {
    //     console.log('callFunction test result: ', res)
    //     wx.setStorageSync("alltopics", res.result.alltopics);
    //   }
    // })
    this.setData({
      picList: picList,
      identity: identity,
      icon2: icon2,
      islogin: wx.getStorageSync("islogin"),
      pageType: 'studyPage'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onShow: function () {
    var identity = wx.getStorageSync("useridentity");
    let that = this;
    console.log(identity)
    this.data.pageType = 'studyPage'
    this.getAllCourseList('studyPage');
    this.getConvetsations();

    wx.cloud.callFunction({
      name: 'operate_userInfo',
      data: {
        type: 'get',
        info: {},
      },
      success: res => {
        // console.log(res)
        console.log('callFunction test result: ', res)
        const userInfo = res.result.data['userInfo'][0]
        const SystemSetting = res.result.data['SystemSetting'][0]
        console.log("userInfo", userInfo)
        if (userInfo && userInfo.isAdmin) {
          wx.setStorageSync("isAdmin", true);
          this.setData({
            isAdmin: true
          })
        } else {
          wx.setStorageSync("isAdmin", false);
          this.setData({
            isAdmin: false
          })
        }
        //如果有 密钥激活记录
        if (userInfo && userInfo.curUserSecretkeyInfo) {
          wx.setStorageSync("curUserSecretkeyInfo", userInfo.curUserSecretkeyInfo);
        }
        //如果有 永久VIP申请记录
        if (userInfo && userInfo.applyVipObj) {
          wx.setStorageSync("applyVipObj", userInfo.applyVipObj);
        }

        setTimeout(() => {
          const applyVipObj = wx.getStorageSync("applyVipObj")
          const curUserSecretkeyInfo = wx.getStorageSync("curUserSecretkeyInfo")
          const permanentVIP = applyVipObj.permanentVIP || false
          let pastDays = 0
          //当前用户有 激活信息
          if (curUserSecretkeyInfo && curUserSecretkeyInfo.isActivation) {
            const curDate = util.formatTime(new Date, 'Y/M/D');
            const ActivationDate = curUserSecretkeyInfo.ActivationDate

            let start_num = new Date(ActivationDate.replace(/-/g, "/"))
            let end_num = new Date(curDate.replace(/-/g, "/"))
            pastDays = parseInt((end_num.getTime() - start_num.getTime()) / (1000 * 60 * 60 * 24)) + 1
            console.log('pastDays', pastDays)
            if (pastDays <= curUserSecretkeyInfo.indate) {
              wx.setStorageSync("isVip", true);
            } else {
              if (!permanentVIP) { //不是永久会员且有效期已过
                wx.setStorageSync("isVip", false);
              } else {
                wx.setStorageSync("isVip", false);
              }
            }
          }

          if (permanentVIP) {
            wx.setStorageSync("isVip", true);
          }

          console.log('SystemSetting', SystemSetting)
          if (SystemSetting) {
            wx.setStorageSync("SystemSetting", SystemSetting);
            // wx.setStorageSync("allCanTalk", SystemSetting.allCanTalk);
            // wx.setStorageSync("urlForTalk", SystemSetting.urlForTalk);
          }

          setTimeout(() => {
            this.setData({
              identity: identity,
              info: wx.getStorageSync("info"),
              islogin: wx.getStorageSync("islogin"),
              isAdmin: wx.getStorageSync("isAdmin"),
              isVip: wx.getStorageSync("isVip"),
              curUserSecretkeyInfo: curUserSecretkeyInfo,
              applyVipObj: applyVipObj,
              // indateTag: permanentVIP ? '永久VIP' : `剩余${indate}天`
            })
          }, 600);

        }, 600);

        // if (result && result.isVip) {
        //   wx.setStorageSync("isVip", true);
        //   this.setData({
        //     isVip: true
        //   })
        // } else {
        //   wx.setStorageSync("isVip", false);
        //   this.setData({
        //     isVip: false
        //   })
        // }

        // if (result && result.UserQuesRecordArr) {
        //   wx.setStorageSync("UserQuesRecordArr", result.UserQuesRecordArr);
        // } else {
        //   wx.setStorageSync("UserQuesRecordArr", []);
        // }

      },
      fail: err => {
        // handle error
      },
      complete: res => {
        console.log(res)
      }
    })


    this.setData({
      remind: '',
      identity: identity,
      islogin: wx.getStorageSync("islogin")
    })
  },

  getAllCourseList(pageType) {
    wx.cloud.init({
      traceUser: true,
      env: 'bot-cloud1-7g30ztcr37ed0193'
    })
    wx.cloud.callFunction({
      name: 'get_CourseList',
      data: {
        pageType: pageType
      },
      success: res => {
        // console.log(res)
        console.log('callFunction test result: ', res);
        // wx.setStorageSync('allCourseMess', res.result.allCourse);
        // console.log("testCourseContents",res.result.testCourseContents)
        const allChapter = res.result.testCourseContents.list.map(item => {
          return item._id
        })
        console.log("testCourseContents", allChapter)


        const userCourseProgressObj = res.result.UserCourseMess || [];
        const resultCourse = res.result.allCourse.data
        if (userCourseProgressObj[0] && userCourseProgressObj[0].UserCourseMess) { //有云缓存记录
          const progressArr = userCourseProgressObj[0].UserCourseMess
          resultCourse.forEach(courseItem => {
            progressArr.forEach(progressItem => {
              if (courseItem.courseUUid === progressItem.courseUUid) { //根据课程UUid 赋值进度
                let progressChapter = {}
                allChapter.forEach(item => {
                  if (item.courseUUid === progressItem.courseUUid && item.chapterId === progressItem.chapterId) {
                    progressChapter = item
                  }
                })
                courseItem.currentProgress = progressItem
              }
            })


          });
        }

        let showCourse = []
        // showCourse = resultCourse

        resultCourse.forEach(item => {
          if (pageType === 'studyPage' && item.state === '审核通过') {
            showCourse.push(item)
          }

          if ((item.isMineCourse === undefined && pageType === 'mineCoursePage') || item.isMineCourse && pageType === 'mineCoursePage') {
            showCourse.push(item)
          }

          if ((item.userCollectedFlag && pageType === 'collectCoursePage' && (item.isMineCourse || item.state === '审核通过'))) {
            showCourse.push(item)
          }
        })
        this.setData({
          allCourse: showCourse,
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



  // 监听swiper切换
  swiperChange: function (e) {
    let current = e.detail.current;
    this.setData({
      swiperCurrent: current
    });
  },


  tonew() {
    console.log("tonew login:", this.data.login)
    if (this.data.islogin == false) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录',
        showCancel: false
      })
      return;
    }
    wx.setStorageSync("isdetail", false);
    wx.navigateTo({
      //这里传值
      url: '/pages/release/ToRelease',
    })
  },

  touchAddVisitorApply: function () {
    this.setData({
      // pageFlag: 3,
      translate: 'transform: translateX(0px)'
    })
    wx.navigateTo({
      url: '../../pages/mysel/superAdmin/visitorFromList/visitorFromList',
      // url: '../superAdmin/visitorFromList/visitorFromList',
    })
  },

  toCrouseBot() {
    wx.navigateTo({
      //这里传值
      url: '/pages/courseBotIndex/index?pageType=' + 'studyPage',
    })
  },
  toSendNarrate() {
    // wx.navigateTo({
    //   //这里传值
    //   url: '/pages/sendNarrate/index',
    // })
  },

  toCreateMessForm(e) {
    console.log(e.currentTarget.dataset.type)
    let isVip = wx.getStorageSync('isVip');
    // let UserQuesRecordArr = wx.getStorageSync('UserQuesRecordArr');
    var SystemSetting = wx.getStorageSync("SystemSetting");
    var allCanCreatCourse = SystemSetting.allCanCreatCourse
    if (!isVip && !allCanCreatCourse) {
      wx.showModal({
        title: '提示',
        content: '由于您不是VIP，暂无权限创建课程，请申请成为VIP后重试',
        showCancel: false
      })
    } else {
      const type = e.currentTarget.dataset.type || 'course'
      wx.navigateTo({
        //这里传值
        // url: '/pages/courseMessForm/index?type=' + type,//之前的手动创建课程url
        url: '/pages/courseByAiMessForm/index?type=' + type,
        // url: '/pages/mysel/admin/admin',
        // url: '/pages/AddEngClassContent/AddEngClassContent',
      })
    }
  },
  toHelper() {
    let isVip = wx.getStorageSync('isVip');
    let UserQuesRecordArr = wx.getStorageSync('UserQuesRecordArr');
    var SystemSetting = wx.getStorageSync("SystemSetting");

    var allCanTalk = SystemSetting.allCanTalk
    if (!isVip && !allCanTalk) {
      // if (!isVip && UserQuesRecordArr.length >= 12) {
      wx.showModal({
        title: '下线提醒',
        content: '此功能暂不开放，有疑问请联系管理员',
        showCancel: false
      })
    } else {
      wx.navigateTo({
        //这里传值
        url: '/pages/notification/notification',
      })
    }

  },

  toExtend() {
    // this.setData({
    //   remind: '加载中'
    // })
    wx.navigateTo({
      //这里传值
      url: '/pages/train/train',
    })
  },

  toNarrate() {
    // this.setData({
    //   remind: '加载中'
    // })
    wx.navigateTo({
      //这里传值
      url: '/pages/narrate/index',
    })
  },

  totopic() {
    // this.setData({
    //   remind: '加载中'
    // })
    wx.navigateTo({
      //这里传值
      url: '/pages/topics/topics',
    })
  },

  preimage(e) {
    var imgurl = this.data.picList[e.currentTarget.dataset.i];
    var final_url = JSON.stringify(imgurl);
    if (this.data.picList.length != 0) {
      wx.previewImage({
        current: imgurl,
        urls: [this.data.picList[0], this.data.picList[1], this.data.picList[2], this.data.picList[3], this.data.picList[4]],
      })
    }
  },

  showShareTalkList() {
    this.setData({
      showListType: 'talkList'
    })
  },

  showCourseList() {
    this.setData({
      showListType: 'courseList'
    })
  },

  //获取待审核用户提问记录
  getConvetsations() {
    wx.cloud.callFunction({
      name: 'operate_userInfo',
      data: {
        type: 'get_share_user_ques_record',
      },
      success: res => {
        const AIConversationsMap = res?.result?.data[0].ShareConversationMap || undefined
        if (AIConversationsMap) {
          const converKeysArr = Object.keys(AIConversationsMap)
          const conversationList = []
          converKeysArr.forEach(e => {
            conversationList.push({
              theme: AIConversationsMap[e]['conversationContent'][0].content,
              key: e
            })
          })
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
});
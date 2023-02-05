//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    remind: '加载中',
    islogin: false,
    login: false,
    currentSwiperIndex: 0,
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
    this.setData({ messageTitle: "程序员已被祭天", message: "功能开发中，请耐心等待" }),
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
    }
    else {
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

    wx.cloud.callFunction({
      name: 'operate_userInfo',
      data: {
        type: 'get',
        info: {},
      },
      success: res => {
        // console.log(res)
        console.log('callFunction test result: ', res)
        const result = res.result.data[0]
        console.log("result", result)
        if (result && result.isAdmin) {
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
        if (result && result.isVip) {
          wx.setStorageSync("isVip", true);
          this.setData({
            isVip: true
          })
        } else {
          wx.setStorageSync("isVip", false);
          this.setData({
            isVip: false
          })
        }
        if (result && result.UserQuesRecordArr) {
          wx.setStorageSync("UserQuesRecordArr", result.UserQuesRecordArr);
        } else {
          wx.setStorageSync("UserQuesRecordArr", []);
        }

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
      data: { pageType: pageType },
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
        if (userCourseProgressObj[0] && userCourseProgressObj[0].UserCourseMess) {//有云缓存记录
          const progressArr = userCourseProgressObj[0].UserCourseMess
          resultCourse.forEach(courseItem => {
            progressArr.forEach(progressItem => {
              if (courseItem.courseUUid === progressItem.courseUUid) {//根据课程UUid 赋值进度
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
    wx.navigateTo({
      //这里传值
      url: '/pages/sendNarrate/index',
    })
  },

  toCreateMessForm(e) {
    console.log(e.currentTarget.dataset.type)
    const type = e.currentTarget.dataset.type || 'course'
    wx.navigateTo({
      //这里传值
      url: '/pages/courseMessForm/index?type=' + type,

      // url: '/pages/mysel/admin/admin',
      // url: '/pages/AddEngClassContent/AddEngClassContent',
    })
  },
  toHelper() {
    let isVip = wx.getStorageSync('isVip');
    let UserQuesRecordArr = wx.getStorageSync('UserQuesRecordArr');
    if (!isVip && UserQuesRecordArr.length >= 15) {
      wx.showModal({
        title: '提问次数超额提示',
        content: '由于您不是VIP，提问次数超过15次将不可继续提问，请申请成为VIP后重试',
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
});
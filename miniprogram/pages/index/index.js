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
    }]
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
    picList.push("cloud://huixue-3g4h1ydg1dedcaf3.6875-huixue-3g4h1ydg1dedcaf3-1312399818/首页轮播图1.png")
    picList.push("cloud://huixue-3g4h1ydg1dedcaf3.6875-huixue-3g4h1ydg1dedcaf3-1312399818/1654701789977.png")

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
      isFlyer: wx.getStorageInfoSync("isFlyer"),
      identity: identity,
      icon2: icon2,
      islogin: wx.getStorageSync("islogin"),
    })
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },

  onShow: function () {
    var identity = wx.getStorageSync("useridentity");
    console.log(identity)
    this.setData({
      remind: '',
      identity: identity,
      islogin: wx.getStorageSync("islogin")
    })
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
    wx.navigateTo({
      //这里传值
      url: '/pages/notification/notification',
    })
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
var util = require('../../utils/util.js');
Page({
  // "navigationStyle": "custom",
  /**
   * 页面的初始数据
   */
  data: {
    motto: "作者：bjm",
    top_height: 200,
    confirmText: "功能介绍",
    funshow: false,
    remind: '加载中',
    animation: '',
    flag: 1,
    getUserInfo: false,
    transformX:0,
    transformY:0,
    fun: [
      "一键快速约飞（毕业照、婚庆、私人定制）",
      "分享无人机话题、观点、diy制作等",
      "认证飞手or商家  轻松接单赚钱",
      "多种输入方式（文字、语音、图片）",
      "连接蓝牙设备diy个性灯光秀等",
      
    ],

    showBtn:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let islogin = wx.getStorageSync(islogin)
    // if (islogin != true) {
    //   wx.setStorageSync("islogin", false);
    // }
    // this.data.showBtn = false
    // setTimeout(() => {
    //   this.setData({
    //     showBtn:true
    //   })
    // }, 3000);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var arr = [];
    arr.push();
    var that = this
    var timeout = setTimeout(function(){
      that.setData({
        remind: ''
      })
    },1000)

    this.data.showBtn = false
    setTimeout(() => {
      this.setData({
        showBtn:true
      })
    }, 3000);
   

    let obj = this;
    var transformX = obj.data.transformX;
    var transformY = obj.data.transformY;  //Y轴平移
    wx.onAccelerometerChange(function (res) {
      // console.log(res.x)
      // console.log(res.y)
      // console.log(res.z)
      if (res.x > 0) {
        transformX += 10;
      }
      else if (res.x < 0) {
        transformX -= 10;
      }
      if (res.y > 0) {                     //Y轴平移
        transformY -= 10;
      }
      else if (res.y < 0) {
        transformY += 10;
      }
      if (transformY > 220) {    //限定下边界
        transformY -= 10;
      }else if (transformY < -300) {  //限定上边界
        transformY += 10;
      }
      if (transformX > 200) {            //限定右边界
        transformX -= 10;
      } else if (transformX < -100) {   //限定左边界
        transformX += 10;
      }
      obj.setData({
        transformX: transformX,
        transformY:transformY
      })
    })
  },
  onReady: function () {
    // 页面渲染完成
    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 1000,
      /**
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: 100,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: 'center center',
      success: function (res) {
        // console.log(res)
      }
    })
  },
  scale() {
    if (this.data.flag == 0) {
      this.animation.scale(1, 1);
      this.animation.translateY(0).step();
      this.setData({
        //输出动画
        flag: 1,
        animation: this.animation.export()
      })
    }
    else {
      this.animation.scale(1.3, 1.3);
      this.animation.translateY(20).step();
      this.setData({
        //输出动画
        flag: 0,
        animation: this.animation.export()
      })
    }
  },

  init1() {
    // let that = this;
    // wx.setStorageSync("useridentity", 1) 
    wx.switchTab({
      url: '../index/index',
    })
    //  wx.navigateTo({
    //   //这里传值
    //   url: '../index/index',
    // })
  },
  init2() {

    wx.switchTab({
      url: '../index/index',
    })

    // let that = this;
    // wx.setStorageSync("useridentity",2) 
    // wx.switchTab({
    //   url: '../index/index?identity=2',
    // })
    // wx.navigateTo({
    //   //这里传值
    //   url: '../index/index?identity=2',
    // })
  },

  onShareAppMessage: function () {

  },

  updateUserInfo: function (userInfo) {
    wx.cloud.callFunction({
      name: 'updateuserInfo',
      data: {
        _userInfo: userInfo,

      },
      success: (res) => {
        wx.switchTab({
          url: "../index/index",
        })
      },
      fail: (res) => {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '服务器错误,点击重试',
          showCancel: false,
          success: (res) => {
            this.onLoad()
          }
        })
      }
    })
  },

   onUnload: function () {
    //销毁定时器
    // console.log("+++++++++onUnload++++++++++")
    clearInterval(this.data.timer);
  }
})
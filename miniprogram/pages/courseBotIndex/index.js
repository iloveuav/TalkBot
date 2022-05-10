// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',


    // -------------用户卡片本地假数据--------
    user: {
      userName: "明月清风", //用户名
      userRank: 3, //用户等级
      integral: 5620000, //积分
      clockDays: 25, //连续打卡天数
      weekClock: 5, //本周学习天数
      rankIcon: 'https://one.zzux.net/image/level.png' //根据用户级别显示Icon
    },
    engcourseArray: [
    ],

    jacorseArray: [
    ],


    currentIndex: 0,
    pageType: 'studyPage'//当前页面类型 studyPage为公开课程页  mineCoursePage为个人上传课程页


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      remind: '加载中',
      pageType: options.pageType || 'studyPage'
    })
    if (options && options.pageType) {
      this.getAllCourse(options.pageType);
    }
    // this.getAllCourse();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // if (this.data.pageType) {
    //   this.getAllCourse(this.data.pageType);
    // }

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

  getcurrentCourse: function (e) {
    console.log(e.detail)
  },


  getAllCourse(pageType) {
    wx.cloud.init({
      env: 'talkbot-56sn5'
    })
    wx.cloud.callFunction({
      name: 'get_allCourseMess',
      data: {},
      success: res => {
        // console.log(res)
        console.log('callFunction test result: ', res);
        wx.setStorageSync('allCourseMess', res.result.allCourse);

        let showCourse = []
        showCourse = pageType === 'studyPage' ? res.result.allCourseMess.data : res.result.MineCrouseList
        this.setData({
          showCourseList: showCourse,
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

})
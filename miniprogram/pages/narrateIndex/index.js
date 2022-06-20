// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',


    // -------------用户卡片本地假数据--------
    currentIndex: 0,
    pageType: 'publicPage'//当前页面类型 publicPage为公开课程页  mineNarratePage为个人上传课程页


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      remind: '加载中',
      pageType: options.pageType || 'publicPage'
    })
    if (options && options.pageType) {
      this.getAllCourseList(options.pageType);
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
  onShow: function (options) {
    if (this.data.pageType) {
      this.getAllCourseList(this.data.pageType);
      // this.getAllCourse(this.data.pageType);
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


  // getAllCourse(pageType) {
  //   wx.cloud.init({
  //     env: 'huixue-3g4h1ydg1dedcaf3'
  //   })
  //   wx.cloud.callFunction({
  //     name: 'get_allCourseMess',
  //     data: {},
  //     success: res => {
  //       // console.log(res)
  //       console.log('callFunction test result: ', res);
  //       wx.setStorageSync('allCourseMess', res.result.allCourse);

  //       let showCourse = []
  //       if (pageType === 'publicPage') {
  //         showCourse = res.result.allCourse
  //       } else {
  //         showCourse = res.result.allCourse
  //       }
  //       this.setData({
  //         allCourse: showCourse,
  //         remind: '',
  //       })
  //     },
  //     fail: err => {
  //       // handle error
  //     },
  //     complete: res => {
  //       console.log(res)
  //     }
  //   })
  // },

  getAllCourseList(pageType) {
    wx.cloud.init({
      env: 'huixue-3g4h1ydg1dedcaf3'
    })
    wx.cloud.callFunction({
      name: 'get_CourseList',
      data: { pageType: pageType},
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
        if (pageType === 'publicPage') {
          showCourse = resultCourse
        } else {
          showCourse = resultCourse
        }
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

})
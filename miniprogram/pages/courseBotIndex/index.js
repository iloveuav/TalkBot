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
      //   {
      //   courseName: "英语入门", //课程名称
      //   courseId: -1, //课程Id
      //   courseType: 'eng', //课程类型
      //   courseProgress: "Grammar - 课程 1 / 4", //课程进度
      //   courseSrc: "https://one.zzux.net/image/engcover.jpg" //课程封面
      // }, 
      // {
      //   courseName: "英语初级", //课程名称
      //   courseId: 9, //课程Id
      //   courseType: 'eng', //课程类型
      //   courseProgress: "Vocabulary - 课程 1 / 3", //课程进度
      //   courseSrc: "https://one.zzux.net/image/engcover.jpg" //课程封面
      // }, {
      //   courseName: "英语高级", //课程名称
      //   courseId: 19, //课程Id
      //   courseType: 'eng', //课程类型
      //   courseProgress: "Vocabulary - 课程 1 / 2", //课程进度
      //   courseSrc: "https://one.zzux.net/image/engcover.jpg" //课程封面
      // }, 
    ],

    jacorseArray: [
      //   {
      //   courseName: "日语入门", //课程名称
      //   courseId: -1, //课程Id
      //   courseType: 'ja', //课程类型
      //   courseProgress: "Grammar - 课程 1 / 4", //课程进度
      //   courseSrc: "http://imgchatbot.uavserve.online/%E8%AF%BE%E6%9C%AC%E5%B0%81%E9%9D%A2.png" //课程封面
      // }, {
      //   courseName: "日语初级", //课程名称
      //   courseId: 9, //课程Id
      //   courseType: 'ja', //课程类型
      //   courseProgress: "Vocabulary - 课程 1 / 2", //课程进度
      //   courseSrc: "http://imgchatbot.uavserve.online/%E8%AF%BE%E6%9C%AC%E5%B0%81%E9%9D%A2.png" //课程封面
      // }, {
      //   courseName: "日语高级", //课程名称
      //   courseId: 19, //课程Id
      //   courseType: 'ja', //课程类型
      //   courseProgress: "Vocabulary - 课程 1 / 2", //课程进度
      //   courseSrc: "http://imgchatbot.uavserve.online/%E8%AF%BE%E6%9C%AC%E5%B0%81%E9%9D%A2.png" //课程封面
      // },
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
  //       if (pageType === 'studyPage') {
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
        // showCourse = resultCourse

        resultCourse.forEach(item=>{
          if (pageType ==='studyPage'&&item.state==='审核通过') {
            showCourse.push(item)
          }

          if((item.isMineCourse===undefined&&pageType ==='mineCoursePage')||item.isMineCourse&&pageType ==='mineCoursePage'){
            showCourse.push(item)
          }

          if((item.userCollectedFlag&&pageType ==='collectCoursePage'&&(item.isMineCourse||item.state==='审核通过'))){
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

})
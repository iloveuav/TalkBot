// components/superAdmin/courseAudit.js
var app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    courseInfo: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    preview() {
      console.log('预览');
    },
    edit() {
      console.log('编辑');
    },
    updateCrouseState: function (e) {
      const state = e.currentTarget.dataset.content
      // console.log('this.data.courseInfo', this.data.courseInfo)
      wx.cloud.callFunction({
        name: 'update_adminOperation',
        data: {
          _id: this.data.courseInfo._id,
          state: state,
          operateType: 'updateCourseState'
        },
        success: res => {
          console.log(res.result)
        },
        fail: err => {
          // handle error
        },
        complete: res => {
          console.log('callFunction test result: ', res)
          wx.hideLoading()
          if (res.result.mess.sucess) {
            wx.showToast({
              title: res.result.mess.sucess,
              icon: 'success',
              duration: 1000
            })
            this.reload()
          }

        }
      })
    },


    toEditCourse(e) {
      const courseDetail = this.data.courseInfo
      let btnType = 'edit'
      // let btnType = e.currentTarget.dataset.content
      // let corseArray = this.data.corseArray;
      // let currentSwiperIndex = this.data.currentSwiperIndex;
      // const courseDetail = this.data.courseDetail
      console.log("courseDetail", courseDetail)
      let str = JSON.stringify(courseDetail);

      //试着用全局变量传递参数
      app.globalData.CurrentCourseObj = courseDetail
      wx.navigateTo({
        //这里传值
        url: "../../../pages/courseCatalogue/index?btnType=" + btnType,
        // url: "../../pages/courseCatalogue/index?courseMess=" + str + "&btnType=" + btnType,
      })
    },

    toCourse(e) {
      const courseDetail = this.data.courseInfo
      let CurrentChapter = {
        courseUUid: courseDetail.courseUUid,
        courseName: courseDetail.courseName,
        chapterId: 1,
        reset: false
      }
      let str = JSON.stringify(courseDetail);
      let Cc = JSON.stringify(CurrentChapter);
      wx.navigateTo({
        //这里传值
        url: "../../../pages/courseBot/index?course=" + str + "&Cc=" + Cc,
      })
    },

    reload: function () {
      this.triggerEvent('Reload')
    },
  }
})

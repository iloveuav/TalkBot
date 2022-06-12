// components/index/indexCourseCard/courseCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    courseDetail: {
      type: Object,
      value: '数据加载有误',
    },
    currentIndex: {
      type: Number,
      value: '数据加载有误',
    },
    remind: {
      type: String,
    },
    pageType: {
      type: String
    }


  },

  /**
   * 组件的初始数据
   */
  data: {
    currentSwiperIndex: 0,
    remind: '',
    crouseTypeMap: {
      'ja': '日语课程',
      'other': '其他课程',
      'eng': '英语课程'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {


    swiperBindchange(e) {
      this.setData({

        currentSwiperIndex: e.detail.current,
        courseDetail: this.data.corseArray[e.detail.current]
      })
      let currentCourse = {
        currentIndex: e.detail.current,
        courseDetail: this.data.corseArray[e.detail.current]
      }
      this.triggerEvent('changeCourse', currentCourse)
    },

    toCourse(e) {
      // console.log(this.data.corseArray);
      let corseArray = this.data.corseArray;
      let currentSwiperIndex = this.data.currentSwiperIndex;

      const courseDetail = this.data.courseDetail
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
        url: "../../pages/courseBot/index?course=" + str + "&Cc=" + Cc,
      })
    },

    updateCrouseState: function (e) {

      let that = this
      console.log('e', e.currentTarget.dataset.content)
      console.log('e', this.data.courseDetail)
      const state = e.currentTarget.dataset.content

      wx.cloud.callFunction({
        name: 'update_adminOperation',
        data: {
          _id: this.data.courseDetail._id,
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


          }

        }
      })
    },

    toCourseChapterPage(e) {
      let btnType = e.currentTarget.dataset.content || e
      let corseArray = this.data.corseArray;
      let currentSwiperIndex = this.data.currentSwiperIndex;

      const courseDetail = this.data.courseDetail
      console.log("courseDetail", courseDetail)
      // console.log(corseArray[currentSwiperIndex].data)
      // console.log(corseArray[currentSwiperIndex].data[0]._id)
      // let CurrentChapter = {
      //   courseId: courseDetail.data[0].courseId,
      //   className: courseDetail.data[0]._id.className,
      //   chapterName: courseDetail.data[0]._id.chapterName,
      //   id : courseDetail.data[0].id,
      //   reset : false
      // }
      // console.log(CurrentChapter)

      let str = JSON.stringify(courseDetail);
      // let Cc = JSON.stringify(CurrentChapter);
      // wx.navigateTo({
      //   //这里传值
      //   url: "../../pages/courseBot/index?course=" + str + "&Cc=" + Cc,
      // })

      wx.navigateTo({
        //这里传值
        url: "../../pages/courseCatalogue/index?courseMess=" + str + "&btnType=" + btnType,
        // url: "../../pages/courseCatalogue/index?courseMess=" + str + "&Cc=" + Cc,
      })
    },

    toCrouseMessForm() {

      console.log("courseDetail111",this.data.courseDetail)
      // wx.navigateTo({
      //   //这里传值
      //   url: '/pages/courseMessForm/index',

      //   // url: '/pages/mysel/admin/admin',
      //   // url: '/pages/AddEngClassContent/AddEngClassContent',
      // })
    },

    toEditCourse(e) {
      let btnType = e.currentTarget.dataset.content
      let corseArray = this.data.corseArray;
      let currentSwiperIndex = this.data.currentSwiperIndex;

      const courseDetail = this.data.courseDetail
      console.log("courseDetail", courseDetail)
      // console.log(corseArray[currentSwiperIndex].data)
      // console.log(corseArray[currentSwiperIndex].data[0]._id)
      // let CurrentChapter = {
      //   courseId: courseDetail.data[0].courseId,
      //   className: courseDetail.data[0]._id.className,
      //   chapterName: courseDetail.data[0]._id.chapterName,
      //   id : courseDetail.data[0].id,
      //   reset : false
      // }
      // console.log(CurrentChapter)

      let str = JSON.stringify(courseDetail);
      // let Cc = JSON.stringify(CurrentChapter);
      // wx.navigateTo({
      //   //这里传值
      //   url: "../../pages/courseBot/index?course=" + str + "&Cc=" + Cc,
      // })

      wx.navigateTo({
        //这里传值
        url: "../../pages/courseCatalogue/index?courseMess=" + str + "&btnType=" + btnType,
        // url: "../../pages/courseCatalogue/index?courseMess=" + str + "&Cc=" + Cc,
      })
    }
  }
})
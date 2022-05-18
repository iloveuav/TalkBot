// components/index/indexCourseCard/courseCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    crouseDetail: {
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
    crouseTypeMap:{
      'ja':'日语课程',
      'other':'其他课程',
      'eng':'英语课程'
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

      const crouseDetail = this.data.crouseDetail
      // console.log(corseArray[currentSwiperIndex].data)
      // console.log(corseArray[currentSwiperIndex].data[0]._id)
      let CurrentChapter = {
        courseId: crouseDetail.data[0].courseId,
        className: crouseDetail.data[0]._id.className,
        chapterName: crouseDetail.data[0]._id.chapterName,
        id: crouseDetail.data[0].id,
        reset: false
      }
      // console.log(CurrentChapter)

      let str = JSON.stringify(crouseDetail);
      let Cc = JSON.stringify(CurrentChapter);
      wx.navigateTo({
        //这里传值
        url: "../../pages/courseBot/index?course=" + str + "&Cc=" + Cc,
      })

      // let userEngCId = 1;
      // let userJaCId = 1;
      // let cid = 1;
      // if (wx.getStorageSync('userEngclassId')) {
      //   userEngCId = wx.getStorageSync('userEngclassId');
      // }
      // if (wx.getStorageSync('userJaclassId')) {
      //   userJaCId = wx.getStorageSync('userJaclassId');
      // }
      // if (corseArray[currentSwiperIndex].courseType=='eng')
      // {
      //   cid = userEngCId
      // }
      // else
      // {
      // cid = userJaCId
      // }


      // let cid = currentChooseCard == 0 ? userEngCId : userJaCId;

    },

    updateCrouseState: function (e) {

      let that = this
      console.log('e', e.currentTarget.dataset.content)
      console.log('e', this.data.crouseDetail)
      const state = e.currentTarget.dataset.content

      wx.cloud.callFunction({
        name: 'update_adminOperation',
        data: {
          _id: this.data.crouseDetail._id,
          state:state,
          operateType:'updateCourseState'
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
    }
  }
})
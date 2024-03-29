// components/superAdmin/courseAudit.js

var time = require('../../../utils/util.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: Object
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
    updateUserVIPState: function (e) {
      const state = e.currentTarget.dataset.content
      const openid = e.currentTarget.dataset.openid
      // console.log('this.data.userInfo', this.data.userInfo)
      wx.cloud.callFunction({
        name: 'operate_FeedBack',
        data: {
          type: 'operate_apply',
          state: state,
          operateTime: time.formatTime(new Date, 'Y/M/D'),
          userOpenid: openid
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
          if (res.result.mess.text) {
            wx.showToast({
              title: res.result.mess.text,
              icon: 'success',
              duration: 1000
            })
            this.reload()
          }

        }
      })
    },

    toCourse(e) {
      // console.log(this.data.corseArray);
      // let corseArray = this.data.userInfo;
      const courseDetail = this.data.userInfo

      // let CurrentChapter = {
      //   courseUUid: courseDetail.courseUUid,
      //   courseName: courseDetail.courseName,
      //   chapterId: ChapterId,
      //   reset: false
      // }

      let CurrentChapter = {
        courseUUid: courseDetail.courseUUid,
        courseName: courseDetail.courseName,
        chapterId: 1,
        reset: false
      }
      // let CurrentChapter = {
      //   courseId: crouseDetail.data[0].courseId,
      //   className: crouseDetail.data[0]._id.className,
      //   chapterName: crouseDetail.data[0]._id.chapterName,
      //   id: crouseDetail.data[0].id,
      //   reset: false
      // }
      // console.log(CurrentChapter)

      let str = JSON.stringify(courseDetail);
      let Cc = JSON.stringify(CurrentChapter);
      wx.navigateTo({
        //这里传值
        url: "../../../pages/courseBot/index?course=" + str + "&Cc=" + Cc,
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
    reload: function () {
      this.triggerEvent('Reload')
    },
  }
})
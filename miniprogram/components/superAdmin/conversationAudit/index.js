// components/superAdmin/courseAudit.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    conversationInfo: Object,
    theme:String,
    userInfo:Object,
    gptConversationUUid:String,
    scene:'superAdmin'  //使用这个组件的场景 superAdmin||homeShareConv||myShareConv
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

    updateConvertsationState: function (e) {
      const state = e.currentTarget.dataset.content
      wx.cloud.callFunction({
        name: 'update_adminOperation',
        data: {
          gptConversationUUid: this.data.gptConversationUUid,
          state: state,
          operateType: 'updateShareConversationState'
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

    toCourse(e) {
      const courseDetail = this.data.conversationInfo
      let str = JSON.stringify(courseDetail);
      let Cc = JSON.stringify(CurrentChapter);
      wx.navigateTo({
        //这里传值
        url: "../../../pages/courseBot/index?course=" + str + "&Cc=" + Cc,
      })
    },

    toShowShareConvertsation(){
      console.log("toShowShareConvertsation")
      app.globalData.CurrentConversationUUid = this.data.gptConversationUUid
      app.globalData.CurrentConversationContent= this.data.conversationInfo.conversationContent
      wx.navigateTo({
        //这里传值
        url: "/pages/notification/notification?mode=onlyRead",
      })
      // wx.navigateTo({
      //   //这里传值
      //   url: "../../../pages/notification/notification?mode=onlyRead",
      // })
    },
    reload: function () {
      this.triggerEvent('Reload')
    },
  }
})

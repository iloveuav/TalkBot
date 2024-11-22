// components/superAdmin/courseAudit.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    secretkeyInfo: Object,
    scene: String //'superAdmin'
  },

  /**
   * 组件的初始数据
   */
  data: {
    showKey: ''
  },

  observers: {
    // 监听属性str的变化
    'secretkeyInfo': function (newVal) {
      if (newVal.secretkey) {
        this.setData({
          showKey: this.truncateString(newVal.secretkey)
        })
        // this.truncateString(newVal.secretkey);
      }
    }
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


    // 截取字符串的方法
    truncateString: function (str) {
      if (str.length <= 10) { // 10 = 5（前）+ 5（后）
        return str;
      } else {
        return str.substring(0, 5) + '...' + str.substring(str.length - 5);
      }
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

    copySecretKey: function (e) {
      let content = ''
      if (e.currentTarget.dataset.content !== undefined) {
        content = e.currentTarget.dataset.content;
        console.log(content)
      }
      wx.setClipboardData({
        data: content,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制成功'
              })
            }
          })
        }
      })
    },

    reload: function () {
      this.triggerEvent('Reload')
    },
  }
})
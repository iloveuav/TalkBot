// Images/components/grid/Grid.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    icon1: {
      type: String,
      value: '/Images/love.png',
    },
    icon2: {
      type: String,
      value: '/Images/txl.png',
    },
    icon3: {
      type: String,
      value: '/Images/pacman.png',
    },
    icon4: {
      type: String,
      value: '/Images/AOPA.png',
    },
    icon5: {
      type: String,
      value: '/Images/ghost.png',
    },
    icon6: {
      type: String,
      value: '/Images/logo.png',
    },

    isFlyer: {
      type: Boolean,
      value: wx.getStorageInfoSync("isFlyer"),
    },
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

    tonearby() {

    this.setData({
      remind: '加载中'
    })

    wx.navigateTo({
      //这里传值
      url: '/pages/nearby/nearby',
    })
  },

  toEquipment() {
    this.setData({
      remind: '加载中'
    })
    wx.navigateTo({
      //这里传值
      url: '/pages/AboutEquipment/ConnectEquipment',
    })
  },

    tonew() {
      wx.setStorageSync("isdetail", false);

      wx.navigateTo({
        //这里传值
        url: '/pages/release/ToRelease',

      })
    },

  toAllorder() {
    this.setData({
      remind: '加载中'
    })
    wx.navigateTo({
      //这里传值
      url: '/pages/AllOrder/AllOrder',

    })
  },

  totopic() {
    this.setData({
      remind: '加载中'
    })
    wx.navigateTo({
      //这里传值
      url: '/pages/topics/topics',

    })
  },

    unopen: function () {

      this.setData({ messageTitle: "程序员已被祭天", message: "功能开发中，请耐心等待" }),
        this.showMessage()
    },

    showMessage: function () {
      wx.showModal({
        title: this.data.messageTitle,
        content: this.data.message,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
            console.log('用户点击取消')
          }
        }
      })
    },

  }
})

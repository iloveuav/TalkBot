// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remind: '加载中',
    list: [],
    currentIndex: 0,

    showVisitorDetail: false,
    list_index: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      remind: '加载中',
      showVisitorDetail: false,
    })
    this.queryMineVisitorList();


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
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


  queryMineVisitorList() {
    // wx.showLoading({
    //   title: '查询中',
    //   mask: true
    // })
    const params = {
      isQueryForUser: true,
      isWaitCheck: false
      // select_flag: this.data.dialogFlag || '',
    }
    console.log("test-params", params)
   wx.cloud.init({
  traceUser: true,
  env: 'talkbot-7gji40zbdf69e993'
})
    wx.cloud.callFunction({
      name: "query_visitorRecord",
      data: params
    }).then(res => {
      console.log(res)
      wx.hideLoading({
      })
      this.setData({
        list: res.result.listData.data,
        remind: ''
      })
      if (this.data.list.length <= 0) {
        wx.showModal({
          title: '没有对应数据',
          content: '',
          showCancel: false
        })
      }
    })
  },

  click(e) {
    console.log("按了：", e.currentTarget.id);
    this.setData({
      showVisitorDetail: true,
      list_index: this.data.list[e.currentTarget.id]
    })
    console.log(this.data.list_index)
  },

  delete(e) {
    let that = this;
    wx.showModal({
      cancelColor: 'cancelColor',
      cancelText: '放弃',
      confirmColor: 'red',
      confirmText: '删除',
      content: '你确定要删除 ' + that.data.list[e.currentTarget.id].visitorName + " 这条记录吗？",
      showCancel: true,
      title: '警告',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '删除中',
            mask: true
          })
          wx.cloud.callFunction({
            name: 'update_userOperation',
            data: {
              _id: that.data.list[e.currentTarget.id]._id
            },
            success(res) {
              console.log(res)
              console.log(that.data.list)
              wx.hideLoading({
              })
              wx.showToast({
                title: '删除成功',
              })
              that.data.list.splice(e.currentTarget.id, 1)
              that.setData({
                list: that.data.list
              })
            },
            fail(err) {
              wx.hideLoading({
              })
              console.log(err)
              wx.showToast({
                title: '删除失败',
              })
            }
          })
        } else if (res.cancel) {

        }

      }
    })
  },


  changePage(e) {
    console.log(e)
    this.setData({
      pageFlag: e.detail.pageflag,
      showVisitorDetail: false
    })
  },

})
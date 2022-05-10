
// miniprogram/pages/courseCatalogue/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnType: 'priview'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let crouseDetail = JSON.parse(options.courseMess);
    console.log("corseObject", crouseDetail)
    let btnType = options.btnType
    console.log("btnType", btnType)
    console.log("corseObject", crouseDetail)
    // let Cc = JSON.parse(options.Cc);
    // CurrentChapter = Cc //正确获取index页面传过来的课程信息 
    this.setData({
      crouseDetail: crouseDetail,
      btnType: btnType
    })
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

  toAddChapter: function () {
    let str = JSON.stringify(this.data.crouseDetail);
    wx.navigateTo({
      //这里传值
      url: "../../../../AddCourseContent/AddCourseContent?currentChooseCard=" + 0+ "&courseMess="+str,
    })
  }
})
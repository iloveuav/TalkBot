// miniprogram/pages/FeedBack/FeedBack.js

const util = require('../../../utils/util.js');
var time = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e) {
    if (e.detail.value.secretKey == "") {
      wx.showModal({
        title: '提示',
        content: '请填写秘钥码后重试',
        showCancel: false
      })
      return;
    } else {
      const secretKey = e.detail.value.secretKey
      const keyInfo = this.data.GenerateVipKeysMap[secretKey]
      //匹配到秘钥
      if (keyInfo && keyInfo.isActivation !== '已激活') {
        wx.showModal({
          title: '确认激活',
          content: `当前秘钥状态：[${keyInfo.state}] \n密钥有效天数：[${keyInfo.indate}天] \n密钥激活状态：[${keyInfo.isActivation}]`,
          //  [密钥激活信息：'+keyInfo.ActivationDate+']',
          // content: '111\n222',

          cancelText: "取消",
          confirmText: "确认激活",
          success(res) {
            if (res.cancel == true) {
              return;
            }
            if (res.confirm == true) {

              console.log('operate_userInfo')
              // 点击确认分享
              wx.cloud.callFunction({
                name: 'operate_userInfo',
                data: {
                  type: 'updateSecretKeyInfo',
                  params: {
                    operateType: 'activate',
                    secretKeyInfo: {
                      ...keyInfo,

                      ActivationDate: util.formatTime(new Date, 'Y/M/D'),
                      isActivation: '已激活',
                      state: '有效',
                      // indate: event.indate, // 有效期天数
                      // certigier: wxContext.OPENID,
                      // generatedTime: event.generatedTime,
                      // remark:event.remark,
                      // secretKey:event.secretKey
                    }
                  },
                },
                success: res => {
                  // console.log(res)
                  console.log('callFunction test result: ', res)
                  if (res.result.sucess) {
                    wx.showToast({
                      title: res.result.sucess,
                      icon: 'success',
                      duration: 1000
                    })
                    if (res.result.sucess === '激活成功') {
                      wx.showModal({
                        title: res.result.sucess,
                        content: '激活成功后请重新进入小程序',
                        confirmText: "确认",
                        success(res) {
                          if (res.confirm == true) {
                            return;
                          }
                        }
                      })
                    }
                    // this.onShow();
                  }

                },
                fail: err => {
                  // handle error
                },
                complete: res => {
                  console.log(res)
                }
              })

            }
          }
        })
      } else if (keyInfo && keyInfo.isActivation === '已激活') {
        wx.showModal({
          title: '提示',
          content: '秘钥已被激活，不可重复激活，请联系管理员重新获取密钥',
          confirmText: "联系管理",
          success(res) {
            if (res.cancel == true) {
              return;
            }
            if (res.confirm == true) {
              wx.showModal({
                title: '联系方式',
                content: '管理员微信号：benjamin-YZM',
                confirmText: "关闭",
                success(res) {
                  if (res.cancel == true) {
                    return;
                  }
                  if (res.confirm == true) {
                    return
                  }
                }
              })
              return;
            }
          }
        })
      } else {
        //没有匹配到
        wx.showModal({
          title: '秘钥无效',
          content: '秘钥不正确或已无效，请联系管理员确认正确的秘钥后重试',
          confirmText: "联系管理",
          success(res) {
            if (res.cancel == true) {
              return;
            }
            if (res.confirm == true) {
              wx.showModal({
                title: '联系方式',
                content: '管理员微信号：benjamin-YZM',
                confirmText: "关闭",
                success(res) {
                  if (res.cancel == true) {
                    return;
                  }
                  if (res.confirm == true) {
                    return
                  }
                }
              })
              return;
            }
          }
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getAllVipSecretKeyList();
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

  //获取Vip秘钥列表
  getAllVipSecretKeyList() {
    wx.cloud.callFunction({
      name: 'operate_userInfo',
      data: {
        type: 'get_all_VIP_secretkey_record',
      },
      success: res => {
        const GenerateVipKeysMap = res?.result?.data[0].GenerateVipKeysMap || undefined
        if (GenerateVipKeysMap) {
          const converKeysArr = Object.keys(GenerateVipKeysMap)
          const conversationList = []
          converKeysArr.forEach(e => {
            conversationList.push({
              ...GenerateVipKeysMap[e],
              secretkey: e
            })
          })
          this.setData({
            allVipSecretkeyList: conversationList,
            GenerateVipKeysMap: GenerateVipKeysMap
          })
        }
      },
      fail: err => {
        // handle error
      },
      complete: res => {
        // console.log(res)
      }
    })
  },

  //获取一个 Vip秘钥的信息
  // formSubmit(e) {

  //   if (e.detail.value.secretKey == "") {
  //     wx.showModal({
  //       title: '提示',
  //       content: '请填写秘钥码后重试',
  //       showCancel: false
  //     })
  //     return;
  //   } else {
  //     const secretKey = e.detail.value.secretKey

  //     wx.cloud.callFunction({
  //       name: 'operate_userInfo',
  //       data: {
  //         type: 'get_one_VIP_secretkey_record',
  //         akey: secretKey
  //       },
  //       success: res => {
  //         console.log("test1111", res)
  //         const GenerateVipKeysMap = res?.result?.data.GenerateVipKeysMap || undefined
  //         if (GenerateVipKeysMap) {
  //           const converKeysArr = Object.keys(GenerateVipKeysMap)
  //           const conversationList = []
  //           converKeysArr.forEach(e => {
  //             conversationList.push({
  //               ...GenerateVipKeysMap[e],
  //               secretkey: e
  //             })
  //           })
  //           this.setData({
  //             allVipSecretkeyList: conversationList,
  //             GenerateVipKeysMap: GenerateVipKeysMap
  //           })
  //         }
  //       },
  //       fail: err => {
  //         // handle error
  //       },
  //       complete: res => {
  //         // console.log(res)
  //       }
  //     })
  //   }
  // },

  // 激活VIP
  activateVIP() {
    var text = e.detail.value.text;
    var number = e.detail.value.number;
    // var openid = wx.getStorageInfoSync("openid");

    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'operate_FeedBack',
      data: {
        type: 'applyVIP',
        text: text,
        number: number,
        useropenid: openid,
        applyTime: time.formatTime(new Date, 'Y/M/D'),
      },
      success: res => {
        console.log(res.result)
      },
      fail: err => {

      },
      complete: res => {
        console.log('callFunction test result: ', res)
        wx.showToast({ //提交成功的提示框
            title: '提交成功',
            duration: 1100
          }),
          setTimeout(function () { //延时执行函数
            wx.navigateBack({
              delta: 1
            })
          }, 1200) //延迟时间 这里是1.5秒
      },
    })
  }
})
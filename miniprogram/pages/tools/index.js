// pages/mysel/mysel.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: false,
    funshow: false,
    avatarUrl: defaultAvatarUrl,
    info: {},
    fun: [

    ]
  },



  toadmin() {
    if (this.data.islogin == false) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录',
        showCancel: false
      })
      return;
    }
    wx.navigateTo({
      //这里传值
      // url: "../../pages/AddEngClassContent/AddEngClassContent",
      url: "./admin/admin",
    })
  },

  toSuperAdmin: function (e) {
    if (this.data.islogin == false) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录',
        showCancel: false
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.setStorageSync("useridentity", 2)
    wx.navigateTo({
      url: '/pages/mysel/superAdmin/index?identity=2',
    })
    wx.hideLoading()
  },

  changeidentity() {
    wx.navigateTo({
      //这里传值
      url: '/pages/door/door',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    // this.init();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var identity = wx.getStorageSync("useridentity");
    console.log(identity)
    this.init();
    this.setData({
      // remind: '',
      identity: identity,
      islogin: wx.getStorageSync("islogin")
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  init(){
    var identity = wx.getStorageSync("useridentity");
    const applyVipObj = wx.getStorageSync("applyVipObj")
    const curUserSecretkeyInfo = wx.getStorageSync("curUserSecretkeyInfo")
    const permanentVIP = applyVipObj.permanentVIP || false
    let pastDays = 0
    //当前用户有 激活信息
    if (curUserSecretkeyInfo && curUserSecretkeyInfo.isActivation) {
      const curDate = util.formatTime(new Date, 'Y/M/D');
      const ActivationDate = curUserSecretkeyInfo.ActivationDate

      let start_num = new Date(ActivationDate.replace(/-/g, "/"))
      let end_num = new Date(curDate.replace(/-/g, "/"))
      pastDays = parseInt((end_num.getTime() - start_num.getTime()) / (1000 * 60 * 60 * 24)) + 1
      console.log('pastDays',pastDays)
      if (pastDays <= curUserSecretkeyInfo.indate) {
        wx.setStorageSync("isVip", true);
      } else {
        if (!permanentVIP) { //不是永久会员且有效期已过
          wx.setStorageSync("isVip", false);
        }else{
          wx.setStorageSync("isVip", true);
        }
      }
    }

    if(permanentVIP){
      wx.setStorageSync("isVip", true);
    }
    setTimeout(() => {
      this.setData({
        identity: identity,
        info: wx.getStorageSync("info"),
        islogin: wx.getStorageSync("islogin"),
        isAdmin: wx.getStorageSync("isAdmin"),
        isVip: wx.getStorageSync("isVip"),
        curUserSecretkeyInfo: curUserSecretkeyInfo,
        applyVipObj: applyVipObj,
        indateTag: permanentVIP ? '永久VIP' : `剩余${curUserSecretkeyInfo.indate - pastDays +1 }天`
      })
    }, 500);

    // this.getAllCourse();
  },

  toCollectCourseList: function (e) {
    wx.navigateTo({
      //这里传值
      url: '/pages/courseBotIndex/index?pageType=' + 'collectCoursePage',
    })
    // this.queryMineCourseList();
  },



  toRoiComputerTool: function (e) {
    wx.navigateTo({
      //这里传值
      url: '/pages/RoiComputerTool/index',
    })
    // this.queryMineCourseList();
  },
  toMineNarrateList: function (e) {
    wx.navigateTo({
      //这里传值
      url: '/pages/narrateIndex/index?pageType=' + 'mineNarratePage',
    })
    // this.queryMineCourseList();
  },

  queryMineCourseList() {
    // wx.showLoading({
    //   title: '查询中',
    //   mask: true
    // })
    const params = {
      isQueryForUser: true,
      isWaitCheck: false
      // select_flag: this.data.dialogFlag || '',
    }
    
    wx.cloud.callFunction({
      name: "get_allCourseMess",
      data: {}
    }).then(res => {
      console.log(res)
      // wx.hideLoading({
      // })
      // this.setData({
      //   list: res.result.listData.data
      // })
      // if (this.data.list.length <= 0) {
      //   wx.showModal({
      //     title: '没有对应数据',
      //     content: '',
      //     showCancel: false
      //   })
      // }
    })
  },


  toconfigTeacher: function (e) {
    if (this.data.islogin == false) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录',
        showCancel: false
      })
      return;
    }

    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '/pages/ConfigFlyer/ConfigFlyer',
    })
    wx.hideLoading()
  },

  unopen: function () {
    this.setData({
        messageTitle: "程序员已被祭天",
        message: "功能开发中，请耐心等待"
      }),
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


  // oldinit() {
  //   let that = this;
  //   wx.showModal({
  //     title: '欢迎使用',
  //     content: '目前功能正在开发中，敬请期待！',
  //     cancelText: "我再看看",
  //     confirmText: "开始使用",
  //     success(res) {
  //       if (res.cancel == true) {
  //         return;
  //         // if (that.data.funshow == false) {
  //         //   that.setData({
  //         //     top_height: 80,
  //         //     confirmText: "关闭功能",
  //         //     funshow: true
  //         //   })
  //         // }
  //         // else {
  //         //   that.setData({
  //         //     top_height: 200,
  //         //     confirmText: "取消",
  //         //     funshow: false
  //         //   })
  //         // }
  //       }
  //       if (res.confirm == true) {
  //         wx.getSetting({
  //           success(res) {
  //             if (res.authSetting['scope.userInfo']) {
  //               wx.getUserInfo({
  //                 success(res) {
  //                   console.log(res)
  //                   wx.setStorageSync("info", res.userInfo);
  //                   wx.setStorageSync("islogin", true);
  //                   // that.updateUserInfo(res.userInfo);
  //                   that.setData({
  //                     remind: '加载中',
  //                     islogin: true
  //                   })
  //                   that.onLoad();
  //                   that.onShow();

  //                   // wx.cloud.init()
  //                   // wx.cloud.callFunction({
  //                   //   name: 'login',
  //                   //   data: {

  //                   //   },
  //                   //   success: res => {
  //                   //     // output: res.result === 3
  //                   //     // console.log(res.result)
  //                   //     wx.setStorageSync("openid", res.result.openid);
  //                   //     wx.setStorageSync("islogin", true);
  //                   //     that.onLoad();
  //                   //     that.onShow();

  //                   //   },
  //                   //   fail: err => {
  //                   //     // handle error
  //                   //   },
  //                   //   complete: res => {
  //                   //     console.log('callFunction test result: ', res)
  //                   //   }
  //                   // })
  //                 }
  //               })
  //             } else {
  //               wx.showModal({
  //                 title: '提示',
  //                 content: '为了数据安全和合规，需要你的个人信息做绑定，否则将无法使用。',
  //                 showCancel: false
  //               })
  //             }
  //           }
  //         })
  //       }


  //     }
  //   })
  // },


  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail;
    console.log(" this.info", this.data.info)
    this.data.info.avatarUrl = avatarUrl
    this.setData({
      info: this.data.info,
    })
    wx.setStorageSync("info", this.data.info);
  },

  getUserProfile(e) {
    let that = this;
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    if (wx.getUserProfile) {
      wx.getUserProfile({
        desc: '获取你的昵称、头像、地区及性别', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          wx.setStorageSync("info", res.userInfo);
          wx.setStorageSync("islogin", true);
          that.setData({
            remind: '加载中',
            islogin: true,
            userInfo: res.userInfo,
            hasUserInfo: true
          })

          wx.cloud.callFunction({
            name: 'operate_userInfo',
            data: {
              type: 'login',
              info: res.userInfo,
            },
            success: res => {
              // console.log(res)
              console.log('callFunction test result: ', res)
              const result = res.result.data[0]
              console.log("result", result)
              if (result && result.isAdmin) {
                wx.setStorageSync("isAdmin", true);
                this.setData({
                  isAdmin: true
                })
              }

            },
            fail: err => {
              // handle error
            },
            complete: res => {
              console.log(res)
              that.onLoad();
              that.onShow();
            }
          })


          // // that.updateUserInfo(res.userInfo);


        }
      })
    }

  },


  tosetconnectway: function (e) {
    if (this.data.islogin == false) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录',
        showCancel: false
      })
      return;
    }
    // wx.showLoading({
    //   title: '加载中',
    // })
    // wx.navigateTo({
    //   url: '/pages/mysel/setConnectWay/setConnectWay?flyercome=false',
    // })
    // wx.hideLoading()
  },

  feedBack: function (e) {
    if (this.data.islogin == false) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录',
        showCancel: false
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '/pages/mysel/FeedBack/FeedBack',
    })
    wx.hideLoading()
  },

  toApplyVIP: function (e) {
    if (this.data.islogin == false) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录',
        showCancel: false
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '/pages/mysel/applyVIP/index',
    })
    wx.hideLoading()
  },

  toActivateVIP: function (e) {
    if (this.data.islogin == false) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录',
        showCancel: false
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '/pages/mysel/activateVIP/index',
    })
    wx.hideLoading()
  },

  logout() {
    wx.setStorageSync('islogin', false);
    this.setData({
      islogin: false
    })
  },

  tomy_TakeOrder() {
    if (this.data.islogin == false) {
      wx.showModal({
        title: '提示',
        content: '您还没有登录',
        showCancel: false
      })
      return;
    }
    // wx.showLoading({
    //   title: '加载中',
    // })

    // wx.navigateTo({
    //   url: '/pages/mysel/my_TakeOrder/takeorder_list',
    // })
    // wx.hideLoading()
  },

  getAllCourse() {
    
    wx.cloud.init()
    //  下面是云函数的调用
    // console.log(wx.getStorageSync("openid"));
    // console.log(this.data.classCollection);
    // console.log(this.data.nowclassid*1);
    wx.cloud.callFunction({
      name: 'get_allCourseMess',
      data: {},
      success: res => {
        console.log(res)
        console.log('callFunction test result: ', res)
        let allCourse = []

        let courseFrontImgArray = res.result.allCourseMess.data
        let UserCourseMess = wx.getStorageSync('UserCourseMess')
        let progress
        let num = 0
        // 处理日语
        let children = res.result.jaAllCourse.list
        // 因为后面需要echart数据可视化 属性名改一下
        children.forEach(v => {
          v.name = v._id;
          v.value = v.courseNum;
          v.courseType = 'ja'
          v.courseId = num++
          // console.log(UserCourseMess=='')
          if (UserCourseMess == '') {
            let progress = 0
            v.courseProgress = "课程进度 -  " + progress + '%';
            v.progress = 1
          } else {
            UserCourseMess.forEach(v2 => {
              let progress = 0
              v.courseProgress = "课程进度 -  " + progress + '%';
              if (v.name == v2.name) {
                let progress = (v2.courseId / v.courseNum) * 100;
                v.courseProgress = "课程进度 -  " + progress + '%';
                v.progress = v2.courseId
              }
            })
          }
        })
        let jaCourse = {
          value: res.result.jaAllCourse.list.length,
          id: 'jacourse',
          name: '日语课程',
          children: children
        }
        allCourse.push(jaCourse)

        //处理英语----------------------------------------------------------------------------------------
        children = res.result.engAllCourse.list
        // 因为后面需要echart数据可视化 属性名改一下 对children进行章节分组

        var map = {},
          nList = []
        //对章节按照课程分组--------------------------------------------------------------------------------
        children.forEach(v => {
          let item = v
          // console.log(!map[item])
          // console.log(item._id.className)
          if (!map[item._id.className]) {
            nList.push({
              name: item._id.className,
              value: item.courseNum,
              courseType: 'eng',
              data: [item]
            })
            map[item._id.className] = item
          } else {
            //遍历nList
            for (var j = 0; j < nList.length; j++) {
              var nItem = nList[j]
              //如查找到date符合则添加
              if (nItem.name == item._id.className) {
                nItem.data.push(item)
                //跳出循环
                break
              }
            }
          }
        })
        //对章节按照课程分组end----------------------------------------------------------------------
        num = 0
        let courseMess = nList
        // console.log(courseMess)
        courseMess.forEach(v => {
          // 进一步处理 加上课程进度 课程封面 并且将章节数组根据classId排序
          // 设置为升序
          function compare(key) {
            return function (value1, value2) {
              var val1 = value1[key];
              var val2 = value2[key];
              return val1 - val2;
            }
          }
          v.data.sort(compare('courseId'));

          // v.forEach(ch=>{
          if (UserCourseMess == '') {
            v.progress = 1
            let progress = 0
            v.courseProgress = "课程进度 -  " + progress + '%';
          } else {
            UserCourseMess.forEach(v2 => {
              let progress = 0
              v.courseProgress = "课程进度 -  " + progress + '%';
              v.progress = 1
              if (v.name == v2.className) {
                progress = Number((v2.courseId / v.data.length)).toFixed(2) * 100;
                // console.log(v)
                v.courseProgress = "课程进度 -  " + progress + '%';
                v.progress = v2.courseId
              }
            })
          }
          // })

          courseFrontImgArray.forEach(v3 => {
            if (v.name == v3.courseMess.name) {
              v.frontImg = v3.courseMess.frontImg
            }
          })
          v.courseId = num++;
        })

        // console.log(nList)
        let engCourse = {
          value: res.result.engAllCourse.list.length,
          id: 'engcourse',
          name: '英语课程',
          children: nList
        }
        allCourse.push(engCourse)
        this.setData({
          allCourse: allCourse
        })

        wx.setStorageSync('allCourseMess', allCourse);
        // wx.setStorageSync('usercourseMess', allCourse);
        this.setData({
          allCourseMess: allCourse
        })
      },
      fail: err => {
        // handle error
      },
      complete: res => {

      }
    })
  },

  toCreateMessForm(e) {
    const type = e.currentTarget.dataset.type || 'course'
    wx.navigateTo({
      //这里传值
      url: '/pages/courseMessForm/index?type=' + type,
      // url: '/pages/mysel/admin/admin',
      // url: '/pages/AddEngClassContent/AddEngClassContent',
    })
  },
  toMineVisitorFormList() {
    wx.navigateTo({
      //这里传值
      url: '/pages/mysel/mineVisitorFromList/index',
      // url: '/pages/AddEngClassContent/AddEngClassContent',
    })
  },

})
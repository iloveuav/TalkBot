var app = getApp();
var util = require("../../utils/util.js")
var time = require('../../utils/util.js');

const qiniuUploader = require("../../utils/qiniuUploader");
const ImgUrl = '';
let ClassCollection = '';

var message = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '',
    classId: '',
    courseName: '',
    courseIntroduce: '',
    value: '',
    imgUrl: '',
    textimgTitle: '',
    uptoken: '',
    centendata: [],
    interactData: [],
    textImgArray: [],

    editCourseDetail: {},

    tempimg: [], //临时数组  等点击发送的时候一起走
    courseUUid: util.uuid(),

    tagList: [
      { label: '成长', value: 1, choose: false },
      { label: '辅导', value: 2, choose: false },
      { label: '防疫', value: 3, choose: false },
      { label: '习惯', value: 4, choose: false },
      { label: '故事', value: 5, choose: false },
      { label: '情景', value: 6, choose: false },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.currentChooseCard == "0") {
      ClassCollection = 'EngClassContents'
    } else if (options.currentChooseCard == "1") {
      ClassCollection = 'JaClassContents'
    } else if (options.currentChooseCard == "2") {
      //其他课程
      ClassCollection = 'otherClassContents'
    }


    if (options && options.courseMess) {
      let crouseDetail = JSON.parse(options.courseMess);

      console.log("crouseDetail-edit", crouseDetail);
      if (crouseDetail) {
        this.setData({
          editCourseDetail: crouseDetail
        })
      }
    }

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

  // 把当前图文Data放到数组中  等待触发submit一起上传
  addOneItem: function (e) {
    var newData = {
      textimgTitle: this.data.textimgTitle,
      courseIntroduce: this.data.courseIntroduce,
      content: this.data.message,
      src: this.data.imgUrl,
    }
    let textImgArray = this.data.textImgArray;
    textImgArray.push(newData);

    this.setData({
      textImgArray: textImgArray,
      textimgTitle: '',
      message: '',
      imgUrl: '',
      imageObject: '',
      answer: '',
    })
  },



  clickFinish: function (e) {
    // const crouseDetail = { name: '111' }
    // let str = JSON.stringify(crouseDetail);
    // wx.navigateTo({
    //   //这里传值
    //   url: "../../pages/courseCatalogue/index?courseMess=" + str + "&btnType=" + 'edit',
    //   // url: "../../pages/courseCatalogue/index?courseMess=" + str + "&btnType=" + btnType,
    //   // url: "../../pages/courseCatalogue/index?courseMess=" + str + "&Cc=" + Cc,
    // })


    if (this.data.editCourseDetail.courseName == '') {//上传封面的时候可以不需要输入章节id
      wx.showModal({
        title: '提示',
        content: '给课程取个名字吧~',
        showCancel: false
      })
      return;
    } else if (this.data.editCourseDetail.courseFrontImgUrl == '') {
      wx.showModal({
        title: '提示',
        content: '不要忘记上传封面哦~',
        showCancel: false
      })
      return;
    } else if (this.data.editCourseDetail.courseIntroduce == '') {
      wx.showModal({
        title: '提示',
        content: '简单介绍下课程吧~',
        showCancel: false
      })
      return;
    }

    const courseMess = {
      courseUUid: this.data.editCourseDetail.courseUUid || this.data.courseUUid,
      courseName: this.data.editCourseDetail.courseName,
      courseFrontImgUrl: this.data.editCourseDetail.courseFrontImgUrl,
      courseIntroduce: this.data.editCourseDetail.courseIntroduce,
      courseType: 'other',
      creatTime: time.formatTime(new Date, 'Y/M/D'),
    }
    console.log("courseMess", courseMess)
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    wx.cloud.init({
      env: 'huixue-3g4h1ydg1dedcaf3'
    })
    wx.cloud.callFunction({
      name: 'operate_CourseMess',
      data: {
        courseMess: courseMess,
      },
      success: res => {
        // wx.showModal({
        //   title: '课程添加成功',
        //   content: '可以开始添加章节数据了~',
        //   showCancel: false,
        // })

        const crouseDetail = courseMess
        let str = JSON.stringify(crouseDetail);
        wx.navigateTo({
          //这里传值
          url: "../../pages/courseCatalogue/index?courseMess=" + str + "&btnType=" + 'edit',
          // url: "../../pages/courseCatalogue/index?courseMess=" + str + "&btnType=" + btnType,
          // url: "../../pages/courseCatalogue/index?courseMess=" + str + "&Cc=" + Cc,
        })
        return;
      },
      fail: err => {
        // handle error
        wx.showModal({
          title: '提示',
          content: '课程信息上传出错 请检查网络',
          showCancel: false,
        })
        return;
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        wx.hideLoading()
      }
    })
  },

  useTecentCloud() {
    // wx.cloud.init()
    let timestamp = (new Date()).valueOf();
    var cloudimgs = [];
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: timestamp + '.png',
      // 指定要上传的文件的小程序临时文件路径
      filePath: this.data.tempimg,

      // 成功回调
      success: res => {
        console.log('腾讯云上传成功', res)
        if (res.fileID) {
          cloudimgs.push(res.fileID);
          this.setData({
            zhaopian: '图片如下',
            imgUrl: res.fileID,
            cloudimgs: cloudimgs,

          })
          this.data.editCourseDetail.courseFrontImgUrl = res.fileID

          wx.hideLoading()
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 1000
          })
          console.log('that.data.textimgTitle');
          console.log(this.data.textimgTitle);
          // 设置封面
          if (this.data.setFrontImg) {
            if (this.data.courseName == '') {
              wx.showModal({
                title: '提示',
                content: '课程名不能为空',
                showCancel: false
              })
              return;
            } else {
              this.add();
            }

          }
          //单个图片
          else if (this.data.textimgTitle == '' || this.data.textimgTitle == undefined) {
            console.log("上传单个图片或封面");
            this.add();
          }
          //图文 
          else {
            this.addOneItem();
          }
          return;
        }
      },
    })
  },

  // ----------------上传图片上传src  返回-------------

  addimgToCloud() {
    //init!!!!!!!!!!!!!!!!

    wx.showLoading({
      title: '上传中',
    })
    var that = this;
    // ===============上传图片==================


    // 方式一 用七牛云  上传到自己的仓库------------------

    /**
     * 上传七牛返回key
     */
    // ---------------
    let url = 'http://localhost:8080/qiniu/getToken'
    wx.request({
      url: url,
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json'
      },
      data: {},

      success: function (result) {
        console.log("初始化七牛返回token:", result); //token: 后端返回的上传验证信息
        that.setData({
          uptoken: result.data.uptoken,
        })
        initQiniu(result.data);
        qiniuUploader.upload(that.data.tempimg, (res) => {
          // let that = this
          var obj = JSON.stringify(res.imageURL)
          that.setData({
            'imageObject': res,
          })

          let imgobj = that.data.imageObject;
          // console.log(imgobj);
          if (imgobj != '') {
            that.setData({
              imgUrl: 'http://' + imgobj.imageURL
            })
          }

          if (that.data.textimgTitle == '') {
            that.add();
          } else {
            that.addOneItem();
          }

          // //对象存储中外链默认域名 http://p2mksxx.bkt.clouddn.com/
        },
          (error) => {
            //   console.error('error: ' + JSON.stringify(error));
          }, {
          region: 'SCN', // 华南
          // ECN, SCN, NCN, NA, ASG，分别对应七牛的：华东，华南，华北，北美，新加坡 5 个区域
          qiniuUploadToken: that.data.uptoken,
          domain: 'imgchatbot.uavserve.online', // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接。
          shouldUseQiniuFileName: false,
        },
          // null, // 可以使用上述参数，或者使用 null 作为参数占位符
          progress => {
            console.log("上传进度", progress.progress);
            console.log("已经上传的数据长度", progress.totalBytesSent);
            console.log(
              "预期需要上传的数据总长度",
              progress.totalBytesExpectedToSend
            );
            that.log = "上传进度" + progress.progress;
          },
          cancelTask => {
            // that.setData({ cancelTask });
            // this.cancelTask = cancelTask;
          }
        );

        wx.hideLoading()
        wx.showToast({
          title: '上传成功2',
          icon: 'success',
          duration: 1000
        })

      },
      fail: err => {
        // handle error
        wx.showModal({
          title: '提示',
          content: '七牛token获取失败 转腾讯云备用上传',
          showCancel: false
        })

        that.useTecentCloud();
        return;
      },
      complete: res => {

        // that.add();
      }
    })



    // ------------七牛官方sdk--------------

    // var url = app.globalData.url
    // // 初始化七牛相关参数
    function initQiniu(res) {
      var options = {
        region: 'SCN', // 华南
        // ECN, SCN, NCN, NA, ASG，分别对应七牛的：华东，华南，华北，北美，新加坡 5 个区域
        uptoken: res.uptoken,
        // uptokenURL: 'https://[yourserver.com]/api/uptoken',
        // uptoken: 'xxxx',
        domain: 'imgchatbot.uavserve.online', // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接。
        shouldUseQiniuFileName: false
      };
      qiniuUploader.init(options);
    }
  },


  // ----------------选择图片 ----------------
  uploadimg() {

    var that = this;
    // that.data.imgnum
    wx.chooseImage({
      count: 1,
      //最多4个
      //         原图           压缩     相册   相机
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var imgs = res.tempFilePaths[0];

        that.setData({
          tempimg: imgs, //临时数组
          imgnum: imgs.length
        });

        that.addimgToCloud();
      }
    })
  },



  // ----------------上传图文准备---------------

  getTitle(e) {
    if (e.detail.value) {
      let value = e.detail.value;
      this.setData({
        textimgTitle: value,
      });
    }
  },

  getContent(e) {
    if (e.detail.value) {
      let value = e.detail.value;
      this.setData({
        message: value,
      });
    }
  },

  getSrc(e) {
    if (e.detail.value) {
      let value = e.detail.value;
      this.setData({
        imgUrl: value,
      });
    }
  },

  close(e) {
    this.setData({
      setwait: false,
      setTextImg: false,
      btnDie: false,
      setFrontImg: false,
    });
  },




  // -------------辅助交互 自动化调用方法------------

  // 获取hei的id节点然后屏幕焦点调转到这个节点
  bottom: function () {
    var query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('#hei').boundingClientRect() //获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() //这段代码的意思是获取页面滑动位置的查询请求
    query.exec(function (res) {
      console.log("function-bottom:", res)
      console.log("function-bottom:", res[0].bottom)
      wx.pageScrollTo({
        // scrollTop: res[0].bottom  // #the-id节点的下边界坐标
        // scrollTop: res[0].bottom ,// #the-id节点的下边界坐标
        scrollTop: res[1].scrollHeight + 50 // 显示区域的竖直滚动位置
      })
      // res[1].scrollTop // 显示区域的竖直滚动位置
    })
  },

  bindChange1: function (e) {
    // this.data.imgUrl = e.detail.value
    this.data.editCourseDetail.courseFrontImgUrl = e.detail.value
  },

  bindChange2: function (e) {
    // this.data.courseName = e.detail.value
    this.data.editCourseDetail.courseName = e.detail.value
  },
  bindChange3: function (e) {
    this.data.editCourseDetail.courseIntroduce = e.detail.value
  },

  preimage(e) {
    var imgurl = this.data.centendata[e.currentTarget.dataset.i];
    var final_url = JSON.stringify(imgurl);
    if (this.data.tempimg.length != 0) {
      wx.previewImage({
        current: imgurl,
        urls: [this.data.tempimg],
      })
    }
    // console.log(final_url);
    // console.log(e);
    // console.log(this.data.tempimg[e.currentTarget.dataset.i]);
  },

  del() {

    let that = this;
    if (this.data.courseName == '') {
      wx.showModal({
        title: '提示',
        content: '课程名不能为空',
        showCancel: false
      })
      return;
    } else if (this.data.classId == '') {
      wx.showModal({
        title: '提示',
        content: '章节ID不能为空',
        showCancel: false
      })
      return;
    } else if (this.data.courseIntroduce == '') {
      wx.showModal({
        title: '提示',
        content: '章节名不能为空',
        showCancel: false
      })
      return;
    } else {
      wx.showModal({
        title: "确认删除？",
        content: "本次删除不可恢复~",
        showCancel: true,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')

            // wx.showModal({
            //   title: '提示',
            //   content: '没有权限',
            //   showCancel: false
            // })
            // return;


            //调用云函数
            wx.cloud.init({
              env: 'huixue-3g4h1ydg1dedcaf3'
            })

            console.log(that.data.courseName)
            console.log(ClassCollection)
            wx.cloud.callFunction({
              name: 'del_chapter',
              data: {
                classCollection: ClassCollection,
                classId: parseInt(that.data.classId),
                courseName: that.data.courseName,
                courseIntroduce: that.data.courseIntroduce,
              },
              success: res => {
                wx.showModal({
                  title: '提示',
                  content: '成功删除该章节~',
                  showCancel: false,
                })
                return;
              },
              fail: err => {
                // handle error
                wx.showModal({
                  title: '提示',
                  content: '删除失败 请检查网络~',
                  showCancel: false,
                })
                return;
              },
              complete: res => {
                console.log('callFunction test result: ', res)
              }
            })

            // ----------- 云函数 end---------------

          } else {
            console.log('用户点击取消')
          }
        }
      })
    }

  },

  // 编辑抽屉拖拽
  tap_start: function (e) {
    this.data.mark = this.data.newmark = e.touches[0].pageX;
    if (this.data.staus == 1) {
      // staus = 1指默认状态
      this.data.startmark = e.touches[0].pageX;
    } else {
      // staus = 2指屏幕滑动到右边的状态
      this.data.startmark = e.touches[0].pageX;
    }

  },
  tap_drag: function (e) {
    /*
     * 正在用日期组件时 不执行
     * 
     */
    // if(useselectByDate)x
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if (this.data.mark < this.data.newmark) {
      if (this.data.staus == 1) {
        if (this.data.windowWidth * 0.2 > Math.abs(this.data.newmark - this.data.startmark)) {
          this.setData({
            translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
          })
        }
      }

    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      if (this.data.staus == 1 && (this.data.newmark - this.data.startmark) > 0) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
        })
      } else if (this.data.staus == 2 && Math.abs(this.data.startmark - this.data.newmark) > this.data.windowWidth * 0.2) {
        // console.log( Math.abs(this.data.startmark - this.data.newmark))
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark + this.data.windowWidth * 0.4 - this.data.startmark) + 'px)'
        })
      }

    }

    this.data.mark = this.data.newmark;

  },
  tap_end: function (e) {
    if (this.data.staus == 1 && this.data.startmark < this.data.newmark) {
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.2)) {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      } else {
        this.setData({
          translate: 'transform: translateX(' + this.data.windowWidth * 0.4 + 'px)'
        })
        this.data.staus = 2;
      }
    } else {
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.2)) {
        this.setData({
          // translate: 'transform: translateX(' + this.data.windowWidth * 0.4 + 'px)'  //注掉 避免触发菜单
        })
        this.data.staus = 2;
      } else {
        // 左边向右边滑动
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      }
    }

    this.data.mark = 0;
    this.data.newmark = 0;
  },

  handleChoose(e) {
    const { index, choose } = e.target.dataset;
    const str = `tagList[${index}].choose`
    const chooseList = this.data.tagList.filter(item => item.choose);
    if (chooseList.length >= 3 && !choose) return;
    this.setData({
      [str]: !choose
    })
  }
})
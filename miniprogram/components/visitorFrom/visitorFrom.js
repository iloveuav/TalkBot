// components/visitorFrom/visitorFrom.js

Component({
  /**
   * 组件的属性列表
   */


  properties: {
    pageMess: {
      type: Object,
      value: '数据加载有误',
    },
    nowNdaUrl: {
      type: String,
      value: '数据加载有误',
    },
    visitorPhoto: {
      type: String,
      value: '数据加载有误',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

    instructions: "",
    //可以通过hidden是否掩藏弹出框的属性
    hiddenmodalput: true,
    checked: false,
    // “继续”按钮的点击事件
    bindconfirm: "",

    tempFilePaths: '',//合成后本地url

    fourteenValues: '',
    fourteenDayList: [{
      value: '居住/途经高风险地区',
      selected: false,
      title: '居住/途经高风险地区'
    }, {
      value: '接触过发热伴有呼吸道症状患者',
      selected: false,
      title: '接触过发热伴有呼吸道症状患者'
    }, {
      value: '接触过新冠病毒感染的肺炎疑似/确诊患者',
      selected: false,
      title: '接触过新冠病毒感染的肺炎疑似/确诊患者'
    }, {
      value: '无上述情况',
      selected: false,
      title: '无上述情况'
    }],

    healthValues: '',
    healthList: [{
      value: '发热/咳嗽',
      selected: false,
      title: '发热/咳嗽'
    }, {
      value: '咳嗽/咽疼',
      selected: false,
      title: '咳嗽/咽疼'
    }, {
      value: '胸痛/肌肉关节痛',
      selected: false,
      title: '胸痛/肌肉关节痛'
    }, {
      value: '气促',
      selected: false,
      title: '气促'
    }, {
      value: '腹泻',
      selected: false,
      title: '腹泻'
    },
    {
      value: '无上述情况',
      selected: false,
      title: '无上述情况'
    }
    ],

    newVisitor: {},
    visitorName: '',
    visitorPhone: '',
    visitorIdCard: '',
    visitorTeamName: '',
    visitorEmail: '',
    Interviewee: '',
    Cause: '',

    images: [],
    cloudimgs: [],
    hint: "点击方框上传照片",

    takePhoto: false, //默认不自动拍照 点击触发后才自动拍照

    mountainVillageArr: ["辽宁省新宾满族自治县小学", "辽宁省昌图县小学", "辽宁省康平县小学", "辽宁省法库县小学"],
    mountainVillage_selected: ''


  },

  /**
   * 组件的方法列表
   */
  methods: {

    //选择山村
    selectMountainVillage(e) {
      let that = this;
      console.log(e.detail.value)
      that.setData({
        mountainVillage_selected: this.data.mountainVillageArr[e.detail.value],
      })
    },

    //点击选中事件，再次点击取消选中  事件
    checked: function (e) {
      var check = this.data.checked;
      var bindconfirm = this.data.bindconfirm;
      if (check) { // 当check=true时，即当前为选中，那么我们点击之后就是取消选中
        this.data.checked = false;
        // 取消选中之后，“继续”按钮无效
        this.data.bindconfirm = "";
        console.log("已取消选中");
      } else { // check=false时，即当前为没有选中，那么我们点击之后就是选中
        this.data.checked = true;
        // 选中之后，点击“继续”按钮执行confirm事件
        this.data.bindconfirm = "addVisitor";
        console.log("已选中");
      }
      this.setData({
        "checked": this.data.checked,
        "bindconfirm": this.data.bindconfirm,
      });
    },

    //取消按钮  跳转到指定页面
    cancel: function () {
      // wx.switchTab({
      //   url: '../personal/personal',
      //   success: function(res) {},
      //   fail: function(res) {},
      //   complete: function(res) {},
      // })
      this.setData({
        // 掩藏弹出框
        hiddenmodalput: true
      })
    },

    //确认  
    confirm: function () {
      this.setData({
        // 掩藏弹出框
        hiddenmodalput: true
      })
    },

    toConfirm: function () {
      this.setData({
        hiddenmodalput: false
      });
    },

    //14天多选框
    fourtityboxChange(e) {
      console.log('checkboxChange e:', e);

      let string = "fourteenDayList[" + e.target.dataset.index + "].selected"
      this.setData({
        [string]: !this.data.fourteenDayList[e.target.dataset.index].selected
      })
      let detailValue = this.data.fourteenDayList.filter(it => it.selected).map(it => it.value)
      console.log('所有选中的值为：', detailValue)
      if (detailValue.indexOf("无上述情况") >= 0) {
        this.data.fourteenDayList.forEach(v => {
          if (v.title != "无上述情况") {
            v.selected = false
          }
        })
      }

      this.setData({
        fourteenDayList: this.data.fourteenDayList
      })
      detailValue = this.data.fourteenDayList.filter(it => it.selected).map(it => it.value)
      this.data.fourteenValues = detailValue;
    },

    //健康状况多选框
    healthyChange(e) {
      console.log('checkboxChange e:', e);
      let string = "healthList[" + e.target.dataset.index + "].selected"
      this.setData({
        [string]: !this.data.healthList[e.target.dataset.index].selected
      })
      let detailValue = this.data.healthList.filter(it => it.selected).map(it => it.value)
      console.log('所有选中的值为：', detailValue)
      this.data.healthValues = detailValue;

      if (detailValue.indexOf("无上述情况") >= 0) {
        this.data.healthList.forEach(v => {
          if (v.title != "无上述情况") {
            v.selected = false
          }
        })
      }

      this.setData({
        healthList: this.data.healthList
      })
      detailValue = this.data.healthList.filter(it => it.selected).map(it => it.value)
      this.data.healthValues = detailValue;
    },


    // -------------------------------以下关于图片的方法---------------------------------
    removeImage(e) {
      const idx = e.target.dataset.idx
      this.data.images.splice(idx, 1)
      this.hint();
      this.setData({
        images: [],
        localImage: '',
        imgUrl: ""
      })
      // $digest(this)
    },


    looknowNDA(e) {
      // console.log(e)
      const arr = []
      const image = this.data.nowNdaUrl
      arr.push(image);
      wx.previewImage({
        current: arr[0],
        urls: arr,
      })
    },

    handleImagePreview(e) {
      const idx = e.target.dataset.idx
      const images = this.data.images
      wx.previewImage({
        current: images[idx],
        urls: images,
      })
    },


    takePhoto() {
      this.setData({
        takePhoto: true
      })
      console.log('1')
      wx.navigateTo({
        url: '../../takePhoto/index',
      })
    },

    uploadimg() {
      let that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          let imgUrl = res.tempFilePaths[0];
          let imgs2 = that.data.images;
          imgs2.push(imgUrl)

          that.setData({
            images: imgs2,
            localImage: imgUrl,
          })
          that.uploadImgweb(imgUrl)
          // 左边向右边滑动 (调用父方法)
          var myEventDetail = {} // detail对象，提供给事件监听函数
          var myEventOption = {} // 触发事件的选项
          that.triggerEvent('callHelp', myEventDetail, myEventOption) //成功解决bug
        },
        fail(res) {
          var myEventDetail = {} // detail对象，提供给事件监听函数
          var myEventOption = {} // 触发事件的选项
          that.triggerEvent('callHelp', myEventDetail, myEventOption) //成功解决bug
        }
      })
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      that.triggerEvent('callHelp', myEventDetail, myEventOption) //成功解决bug


    },

    uploadImgweb(imgUrl) {
      wx.showLoading({
        title: '上传中请稍等~',
        mask: true
      })
      let that = this;
      wx.cloud.uploadFile({
        cloudPath: 'visitorImages/' + imgUrl.slice(imgUrl.length - 20, imgUrl.length),
        filePath: imgUrl,
        success: res => {
          wx.hideLoading();
          that.setData({
            imgUrl: res.fileID,
          })
        },
        fail: err => {
          wx.hideLoading();
          console.log("上传失败", err)
        }
      })

      // that.onLoad();
    },

    // 检查表单手机号格式
    blurPhone: function (phone) {
      // var phone = this.data;
      // console.log(e);
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        return false;
        if (phone.length >= 11) {
          // wx.showToast({
          //   title: '手机号有误',
          //   icon: 'success',
          //   duration: 2000
          // })
          return false;
        }
      } else {
        return true;

      }
    },

    // input双向绑定的方法

    getName(e) {
      // console.log(e);
      this.setData({
        visitorName: e.detail.value,
      })
    },
    getID(e) {
      // console.log(e);
      this.setData({
        visitorIdCard: e.detail.value,
      })
    },
    getEmail(e) {
      this.setData({
        visitorEmail: e.detail.value,
      })
    },
    getPhoneNum(e) {
      this.setData({
        visitorPhone: e.detail.value,
      })
    },
    getTeamName(e) {
      this.setData({
        visitorTeamName: e.detail.value,
      })
    },
    getInterviewee(e) {
      this.setData({
        Interviewee: e.detail.value,
      })
    },
    getCause(e) {
      this.setData({
        Cause: e.detail.value,
      })
    },

    tostep2(e) {
      // 先检查step1中是否信息都填了
      // console.log(this.data.visitorName)

      if (this.data.mountainVillage_selected == undefined || this.data.mountainVillage_selected == "") {
        wx.showModal({
          title: '提示',
          content: '您还没有选择山村，请重试',
          showCancel: false
        })
        return;
      }

      if (this.data.visitorName == "") {
        wx.showModal({
          title: '提示',
          content: '您没有填写姓名，请重试',
          showCancel: false
        })
        return;
      }

      if (this.data.visitorIdCard == "") {
        wx.showModal({
          title: '提示',
          content: '您没有输入身份证号，请重试',
          showCancel: false
        })
        return;
      }
      if (this.data.visitorEmail == "") {
        wx.showModal({
          title: '提示',
          content: '您没有输入您的Email，请重试',
          showCancel: false
        })
        return;
      }

      if (this.data.visitorPhone == "" || this.blurPhone(this.data.visitorPhone) != true) {
        wx.showModal({
          title: '提示',
          content: '手机号为空或格式有误，请重试',
          showCancel: false
        })
        return;
      }

      if (this.data.visitorTeamName == "") {
        wx.showModal({
          title: '提示',
          content: '请输入您所在的公司（团队）',
          showCancel: false
        })
        return;
      }
      if (this.data.Interviewee == "") {
        wx.showModal({
          title: '提示',
          content: '请输入被访人的姓名',
          showCancel: false
        })
        return;
      }
      if (this.data.Cause == "") {
        wx.showModal({
          title: '提示',
          content: '请输入您来访事由',
          showCancel: false
        })
        return;
      }




      if (this.data.fourteenValues == "") {
        wx.showModal({
          title: '提示',
          content: '14天内多选框请选择您的情况',
          showCancel: false
        })
        return;
      }

      if (this.data.healthValues == "") {
        wx.showModal({
          title: '提示',
          content: '健康状况多选框请选择您的情况',
          showCancel: false
        })
        return;
      }

      //初始化visitor step1 获取的数据  打包成对象
      let newVisitor = {};
      newVisitor.name = this.data.visitorName
      newVisitor.id_num = this.data.visitorIdCard

      newVisitor.email = this.data.visitorEmail  //新增 邮箱
      newVisitor.phonenum = this.data.visitorPhone
      newVisitor.teamName = this.data.visitorTeamName

      newVisitor.Interviewee = this.data.Interviewee  //新增 被访人
      newVisitor.cause = this.data.Cause  //新增 事由
      newVisitor.fourteenValues = this.data.fourteenValues
      newVisitor.healthValues = this.data.healthValues
      newVisitor.mountainVillage_selected = this.data.mountainVillage_selected
      // newVisitor.image = this.data.imgUrl;

      this.triggerEvent('getStep1', newVisitor);

    },


    toStep3(e) {

      this.triggerEvent('toStep3', "toStep3");
    },

    // -----------------到手写板页面----------------------

    signature() {
      wx.navigateTo({
        url: '/pages/signature/signature',
      })
    },

    formSubmit(e) {
      console.log(e)
      //表单提交在父组件里
    },


    addVisitor: function () {
      this.setData({
        hiddenmodalput: true
      });

      console.log(this.data.newVisitor)

      wx.showLoading({
        title: '系统提交中~',
        mask: true
      })
      wx.cloud.init()

      // var mynotes = wx.getStorageSync("openid");
      let teamName = this.data.newVisitor.teamName
      var that = this;
      let allimgs = []
      let timestamp = (new Date()).valueOf();

      var waittime = setTimeout(function () {

        var time = require('../../utils/util');
        let nowtime = time.formatTime(new Date, 'Y/M/D h:m:s');
        wx.cloud.callFunction({
          name: 'add_visitor',
          data: {
            newVisitor: that.data.newVisitor,
            visitorName: that.data.newVisitor.name,
            visitorPhonenum: that.data.newVisitor.phonenum,
            visitorId_num: that.data.newVisitor.id_num,
            visitorTeamName: that.data.newVisitor.teamName,
            visitData: nowtime,
          },
          success(res) {
            console.log(res.result);
            wx.hideLoading();
            if (res.result.mess.state == "上传成功") {
              wx.showModal({
                title: '提交成功',
                content: '欢迎参观，祝您一切顺利',
                cancelText: "返回首页",
                confirmText: "继续新增",
                success(res) {
                  if (res.cancel == true) {
                    //执行父方法 回到首页
                    var myEventDetail = {} // detail对象，提供给事件监听函数
                    var myEventOption = {} // 触发事件的选项
                    that.triggerEvent('toHome', myEventDetail, myEventOption) //成功回到首页
                    return;
                  }
                  if (res.confirm == true) {
                    //清空数据 遍历多选按钮
                    that.data.fourteenDayList.forEach(v => {
                      v.selected = false
                    })
                    that.data.healthList.forEach(v => {
                      v.selected = false
                    })
                  }
                  that.setData({
                    newVisitor: {},
                    visitorName: '',
                    visitorPhone: '',
                    visitorId: '',
                    visitorTeamName: '',
                    fourteenDayList: that.data.fourteenDayList,
                    healthList: that.data.healthList,

                    images: [],
                    cloudimgs: [],
                  })
                }

              })

            }
            else {
              wx.showModal({
                title: '提交失败',
                content: '请检查网络后重新提交',
                showCancel: false
              })
            }

          },
          fail(err) {
            console.log(err);
            wx.showModal({
              title: '网络错误',
              content: '网络出现问题，请稍后再试!',
            })
            wx.hideLoading();
          }
        })
      }, 2500)

    },



  }
})
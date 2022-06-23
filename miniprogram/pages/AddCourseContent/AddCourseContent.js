const time = require('../../utils/util.js');
const qiniuUploader = require("../../utils/qiniuUploader");

let ClassCollection = 'testCourseContents';

Page({
  data: {
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
 

    multiIndex: [0, 0, 0],
    message: '',
    edit_id: null,
    chapterId: '',
    className: '',
    chapterName: '',
    value: '',
    imgUrl: '',
    textimgTitle: '',
    uptoken: '',
    centendata: [],
    interactData: [],
    textImgArray: [],
    answer: '',
    btnNum: '',
    editStatus: false,
    editIndex: '',

    crouseDetail: {},
    chapterList: [],
    curChapter: {},

    tempimg: [], //临时数组  等点击发送的时候一起走

    //拖拽相关
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: '',
  
    //发音人相关
    categoryCur:0,
    roleCur:0,

    multiVoiceArray: [
      [{ name: '方言', value: 'fy', id: 0 }, { name: '治愈童声', value: 'ts', id: 1 }, { name: '美式发音', value: 'ms', id: 2 }, { name: '其他语种', value: 'qt', id: 3 }],


      [//方言
        { name: '姗姗(粤语女生)', value: 'shanshan', id: 0 },
        { name: '佳佳(粤语女生)', value: 'jiajia', id: 1 },
        { name: '桃子(粤语女生)', value: 'taozi', id: 12 },
        { name: '大虎(东北话男声)', value: 'dahu', id: 3 },
        { name: '老铁(东北老铁)', value: 'laotie', id: 4 },
        { name: '艾侃(天津话)', value: 'aikan', id: 5 },
        { name: '青青(中国台湾话女声)', value: 'qingqing', id: 6 }
      ],

      [//童声
        { name: '艾彤(萝莉女声)', value: 'aitong' },
        { name: '思彤(萝莉女声)', value: 'sitong' },
        { name: '小北(萝莉女声)', value: 'xiaobei' },
        { name: '杰力豆(治愈童声)', value: 'jielidou' }
      ],

      [//美式发音
        { name: 'Lydia(英中双语)', value: 'lydia' },
        { name: 'Abby(美音女声)', value: 'abby' },
        { name: 'Wendy(英音女声)', value: 'wendy' },
        { name: 'Annie(美语女声)', value: 'annie' },
        { name: 'Emily(英音女声)', value: 'emily' },
        { name: 'Andy(美音男声)', value: 'andy' },
        { name: 'William(英音男声)', value: 'william' }
      ],

      [//多语种
        { name: 'Tien(越南语女声)', value: 'tien' },
        { name: '智香(日语女声)', value: 'tomoka' },
        { name: '智也(日语男声)', value: 'tomoya' },
        { name: 'Indah(印尼女声)', value: 'indah' },
        { name: 'Farah(马来语女声)', value: 'farah' }
      ]
    ],


    category:[{name:'方言'},{name:'童声'},{name:'美式发音'},{name:'多语种'}]
  },

  onLoad: function (options) {
    console.log(options)
    const pageType = options.pageType ? options.pageType : 'course'

    //选择集合
    if (pageType === 'course') {
      // if (options.currentChooseCard == "0") {
      //   ClassCollection = 'EngClassContents'
      // } else if (options.currentChooseCard == "1") {
      //   ClassCollection = 'JaClassContents'
      // } else if (options.currentChooseCard == "2") {
      //   //其他课程
      //   ClassCollection = 'otherClassContents'
      // }
      ClassCollection = 'testCourseContents'
    } else if (pageType === 'narrate') {
      ClassCollection = 'NarrateContents'
    }

    //新增章节
    if (options && options.type === 'add' && options.courseMess) {
      let crouseDetail = JSON.parse(options.courseMess);
      let chapterList = JSON.parse(options.chapterList);
      this.setData({
        crouseDetail: crouseDetail,
        className: crouseDetail.courseName,
        chapterList: chapterList,
        chapterId: chapterList.length + 1,

        curChapter: {},
        pageType: pageType,
      })
    }
    //编辑章节
    if (options && options.type === 'edit' && options.chapterobj) {
      let crouseDetail = JSON.parse(options.courseMess);
      let chapterList = JSON.parse(options.chapterList);
      let chapterobj = JSON.parse(options.chapterobj);
      this.setData({
        crouseDetail: crouseDetail,

        className: crouseDetail.courseName,
        chapterName: chapterobj.chapterName || '',
        chapterList: chapterList,
        chapterId: chapterobj.chapterId || chapterList.length + 1,

        curChapter: chapterobj,
        pageType: pageType
      })



      wx.cloud.init({
        env: 'huixue-3g4h1ydg1dedcaf3'
      })
      const courseUUid = JSON.parse(options.chapterobj).courseUUid
      wx.cloud.callFunction({
        name: 'getCrouseContent',
        data: {
          // classCollection:'EngClassContents',
          classCollection: 'testCourseContents',
          courseUUid: courseUUid,
          courseName: JSON.parse(options.chapterobj).courseName,
          chapterId: JSON.parse(options.chapterobj).chapterId,
        },
        success: res => {
          this.setData({
            centendata: res.result.classContent.data.map(item => {
              return { ...item, is_show_right: 1 }
            })
          })
        }
      })

    }
  },

  swiperCategoryChange: function (e) {
    console.log(e)
    this.setData({
      categoryCur: e.detail.current
    })
  },
  swiperRoleChange: function (e) {
    console.log(e)
    this.setData({
      roleCur: e.detail.current
    })
  },

  bindChangeChapterName: function (e) {
    this.data.chapterName = e.detail.value;
  },

  delChapter() {
    if (this.data.chapterName == '') {
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
        success: (res) => {
          if (res.confirm) {
            //调用云函数
            wx.cloud.init({
              env: 'huixue-3g4h1ydg1dedcaf3'
            })
            wx.cloud.callFunction({
              name: 'del_chapter',
              data: {
                classCollection: ClassCollection,
                chapterId: parseInt(this.data.chapterId),
                className: this.data.className,
                chapterName: this.data.chapterName,
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
                wx.showModal({
                  title: '提示',
                  content: '删除失败 请检查网络~',
                  showCancel: false,
                })
                return;
              },
            })
            // ----------- 云函数 end---------------
          }
        }
      })
    }
  },

  // 把当前图文Data放到数组中  等待触发submit一起上传
  addOneItem: function (e) {
    let textImgArray = this.data.textImgArray;
    textImgArray.push({
      textimgTitle: this.data.textimgTitle,
      chapterName: this.data.chapterName,
      content: this.data.message,
      src: this.data.imgUrl,
    });

    this.setData({
      textImgArray: textImgArray,
      textimgTitle: '',
      message: '',
      imgUrl: '',
      imageObject: '',
      answer: '',
    })
  },

  selectedAnswer(e) {
    this.setData({
      answer: e.currentTarget.dataset.answer
    })
  },


  //  ------------------addText & addImg & addTextImg -------------
  //事件处理函数
  add: function (e) {
    var that = this;
    const { editStatus, editIndex, message, centendata, setTextImg, imgUrl, textimgTitle } = this.data;
    if (editStatus) {
      if (!setTextImg) {
        let newValue = centendata;
        newValue[editIndex]['content'] = message;
        this.setData({
          // editStatus: false,
          centendata: newValue,
          // message: ''
        })
      } else {
        let newValue = centendata;
        newValue[editIndex]['content'] = message;
        newValue[editIndex]['textimgTitle'] = textimgTitle;
        newValue[editIndex]['src'] = imgUrl;
        this.setData({
          // editStatus: false,
          centendata: newValue,
          // message: '',//和新增一致云函数调用后再置空
          // setTextImg: false
        })
      }
      // return;
    }

    console.log("进入add函数")
    // 设置封面
    if (this.data.setFrontImg) {
      if (this.data.className == '') {
        wx.showModal({
          title: '提示',
          content: '课程名不能为空',
          showCancel: false
        })
        return;
      }
      if (this.data.textimgTitle != this.data.className) {
        wx.showModal({
          title: '提示',
          content: '课程名不一致~',
          showCancel: false
        })
        return;
      }
      let courseMess = {
        name: this.data.className,
        frontImg: this.data.imgUrl,
      }
      wx.cloud.init({
        env: 'huixue-3g4h1ydg1dedcaf3'
      })
      // wx.cloud.init()
      //  下面是云函数的调用
      wx.cloud.callFunction({
        name: 'update_allCourseMess',
        data: {
          courseMess: courseMess,
        },
        success: res => {
          let mess = {
            content: '成功设置封面'
          }
          wx.showModal({
            title: '操作成功',
            content: '课程封面已上传',
            showCancel: false,
          })
          return;
        },
        fail: err => {
          // handle error
          wx.showModal({
            title: '提示',
            content: '课程内容上传出错 请检查网络',
            showCancel: false,
          })
          return;
        },
        complete: res => {
          console.log('callFunction test result: ', res)
        }
      })
    } else { //这个else一直到最后

      // --------设置封面end-----------------------
      if (this.data.chapterId == '') {
        wx.showModal({
          title: '提示',
          content: '课程id不能为空',
          showCancel: false
        })
        return;
      } else if (this.data.className == '') {
        wx.showModal({
          title: '提示',
          content: '课程名不能为空~',
          showCancel: false
        })
        return;
      } else if (this.data.message == '' && this.data.imgUrl == null) {
        wx.showModal({
          title: '提示',
          content: '课程内容不能为空~',
          showCancel: false
        })
        return;
      } else if (this.data.chapterName == '' && this.data.imgUrl == null) {
        wx.showModal({
          title: '提示',
          content: '章节名不能为空~',
          showCancel: false
        })
        return;
      } else {
        let imgobj = this.data.imageObject;
        if (imgobj != '' && imgobj != undefined) {
          this.setData({
            imgUrl: 'http://' + imgobj.imageURL
          })
        }
        let newcontentType;
        if (that.data.textImgArray.length <= 0) {
          newcontentType = that.data.imgUrl == '' ? 'text' : 'img';
        } else {
          newcontentType = 'textImg';
        }
        var newData = {
          contentType: newcontentType,
          isBot: true,
          classCollection: 'testCourseContents',
          chapterId: parseInt(that.data.chapterId),
          className: that.data.className,
          classType: ClassCollection,
          chapterName: this.data.chapterName,

          chapterId: parseInt(that.data.chapterId),
          courseUUid: this.data.crouseDetail.courseUUid || '',

          detail: {},
          textimgTitle: that.data.textimgTitle,
          textImgArray: that.data.textImgArray,
          content: that.data.message,
          src: that.data.imgUrl,
          imgfile: that.data.tempimg,
          time: time.formatTime(new Date, 'Y/M/D'),
          is_show_right: 1,
        }

        this.setData({
          newData: newData,
        })

        if (!this.data.editStatus) {
          this.bottom();
        }

        //  下面是云函数的调用
        wx.cloud.init({
          env: 'huixue-3g4h1ydg1dedcaf3'
        })
        wx.cloud.callFunction({
          name: 'operate_courseContent',
          data: {
            contentData: that.data.newData,
            edit_id: this.data.edit_id
          },
          success: res => {
            if (!this.data.editStatus) {
              that.data.centendata.push(this.data.newData);
            }

            this.setData({
              centendata: that.data.centendata,
            })
            if (!this.data.editStatus) {
              this.bottom();
            }
            this.setData({
              imgUrl: '',
              imageObject: '',
              message: '',
              setTextImg: false,
              textimgTitle: '',
              imgfile: '',
              btnDie: false,
              textImgArray: [],
              answer: '',
              setFrontImg: '',
              editStatus: false,//编辑状态关闭

              edit_id: null//编辑id置空


            })



          },
          fail: err => {
            // handle error
            wx.showModal({
              title: '提示',
              content: '课程内容上传出错 请检查网络',
              showCancel: false,
            })
            return;
          },
          complete: res => {
            console.log('callFunction test result: ', res)
          }
        })

      }

    }
  },


  useTecentCloud() {
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
            if (this.data.className == '') {
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
          var obj = JSON.stringify(res.imageURL)
          that.setData({
            'imageObject': res,
          })

          let imgobj = that.data.imageObject;
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
            that.log = "上传进度" + progress.progress;
          },
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
      },
    })

    // ------------七牛官方sdk--------------
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
    if (this.data.chapterId == '' && !this.data.setFrontImg) {//上传封面的时候可以不需要输入章节id
      wx.showModal({
        title: '提示',
        content: '章节id不能为空',
        showCancel: false
      })
      return;
    } else if (this.data.className == '') {
      wx.showModal({
        title: '提示',
        content: '课程名不能为空',
        showCancel: false
      })
      return;
    }
    var that = this;
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

  // --------------- 左侧 上传特殊类型功能方法集

  setInteract() {
    this.setData({
      setwait: true,
      btnDie: true,
      btnNum: 0,
      answer: '',
      interactData: []
    });
    this.bottom();
  },

  //、、、、、设置图文
  setTextImg() {
    console.log('setimg')
    this.setData({
      setTextImg: true,
      btnDie: true,
      textimgTitle: '',
      imgUrl: '',
      content: ''
    });
    this.bottom();
  },
  // 、、、、设置封面
  setFrontImg() {
    this.setData({
      setFrontImg: true,
      btnDie: true,
    });
    this.bottom();
  },

  getbtnNum: function (e) {
    // this.data.interactData = [] //先清空

    var regNum = new RegExp('[0-9]', 'g');
    var rsNum = regNum.exec(e.detail.value);


    // if(!rsNum){
    //     setTimeout(()=>{
    //         wx.showToast({
    //             title: '输入数字',
    //             icon: 'none'
    //         })
    //     },1000);
    //     return
    //   }

    let btnNum = e.detail.value
    if (btnNum > 4) {
      wx.showModal({
        title: '超额了',
        content: '暂时最多支持4个互动按钮',
        showCancel: false
      })
      this.setData({
        btnNum: 0,
      });
      return;
    }
    else {
      this.setData({
        btnNum: btnNum,
        interactData: [],
        answer: ''
      });
    }
  },

  getAnswer(e) {
    if (e.detail.value) {
      let answer = e.detail.value;
      this.setData({
        answer: answer,
      });
    }
  },

  getInputValue(e) {
    if (e.detail.value) {
      let interactData = this.data.interactData;
      interactData[this.data.btnIndex] = e.detail.value;
      this.setData({
        interactData: interactData,
      });
    }
  },

  updateInteractData(e) {
    let index = e.currentTarget.dataset.i;
    this.setData({
      btnIndex: index,
    });
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

  // ----------  上传互动  -----------------
  submitInteract() {
    if (this.data.chapterId == '') {
      wx.showModal({
        title: '提示',
        content: '课程id不能为空',
        showCancel: false
      })
      return;
    } else if (this.data.className == '') {
      wx.showModal({
        title: '提示',
        content: '课程名不能为空',
        showCancel: false
      })
      return;
    } else if (this.data.btnNum == null || this.data.btnNum == 0 || this.data.interactData.length <= 0) {
      wx.showModal({
        title: '提示',
        content: '不能没有任何互动按钮',
        showCancel: false
      })
      return;
    }

    if (this.data.editStatus) {
      const { editIndex, centendata, answer, btnNum, interactData } = this.data;
      let newValue = centendata;
      newValue[editIndex] = {
        ...centendata[editIndex],
        detail: {
          answer,
          btnNum,
          interactData
        }
      }
      this.setData({
        centendata: newValue,
      })
    }

    wx.cloud.init({
      env: 'huixue-3g4h1ydg1dedcaf3'
    })
    var btnNum = this.data.btnNum;
    let contentData = {
      contentType: 'Interact',
      courseUUid: this.data.crouseDetail.courseUUid || '',
      isBot: true,
      classCollection: ClassCollection,
      chapterId: parseInt(this.data.chapterId),
      className: this.data.className,
      chapterName: this.data.chapterName,

      detail: {
        btnNum: this.data.btnNum,
        interactData: this.data.interactData,
        answer: this.data.answer,
      },
      time: time.formatTime(new Date, 'Y/M/D'),

    }
    let that = this;

    var newInteract = {
      content: 'this is a newInteract which have' + btnNum + '个Btn',
      src: '',
      imgfile: '',
      time: time.formatTime(new Date, 'Y/M/D'),
      is_show_right: 1,
    }
    this.setData({
      contentData: contentData,
      interactData: [],
      btnNum: 0,
      newData: newInteract
    })


    wx.cloud.callFunction({
      name: 'operate_courseContent',
      data: {
        contentData: that.data.contentData,
        edit_id: this.data.edit_id
      },
      success: res => {
        if (!this.data.editStatus) {
          that.data.centendata.push({ ...contentData, is_show_right: 1 });
          this.bottom();
        }
        this.setData({
          centendata: that.data.centendata,
        })

        this.setData({
          imgUrl: '',
          message: '',
          setwait: false,
          btnDie: false,
          answer: '',

          editStatus: false,//编辑状态关闭

          edit_id: null//编辑id置空
        })

      },
      fail: err => {
        // handle error
        wx.showModal({
          title: '提示',
          content: '课程内容上传出错 请检查网络',
          showCancel: false
        })
        return;
      },
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })
  },

  close(e) {
    this.setData({
      setwait: false,
      setTextImg: false,
      btnDie: false,
      setFrontImg: false,
      editStatus: false
    });
  },

  // -------------辅助交互 自动化调用方法------------
  // 获取hei的id节点然后屏幕焦点调转到这个节点
  bottom: function () {
    var query = wx.createSelectorQuery() // 创建节点查询器 query
    query.select('#hei').boundingClientRect() //获取节点位置信息的查询请求
    query.selectViewport().scrollOffset() //这段代码的意思是获取页面滑动位置的查询请求
    query.exec(function (res) {
      wx.pageScrollTo({
        scrollTop: res[1].scrollHeight + 50 // 显示区域的竖直滚动位置
      })
    })
  },

  bindChangeMessage: function (e) {
    this.data.message = e.detail.value
  },

  preimage(e) {
    const contentIndex = e.currentTarget.dataset.index;
    const contentItem = this.data.centendata[contentIndex];
    const contentType = contentItem['contentType']
    const edit_id = contentItem['_id']
    if (contentType == 'text') {
      const { content } = contentItem;
      this.setData({
        message: content,
        editStatus: true
      })
    } else if (contentType == 'Interact') {
      const { btnNum, answer, interactData } = contentItem.detail;
      this.setInteract();
      this.setData({
        btnNum,
        answer,
        interactData,
        editStatus: true,
        message: '',
        edit_id: edit_id//云函数通过判断当前是否有这个属性来告诉云函数是编辑还是新增
      })
    } else if (contentType == 'img') {
      const { textimgTitle, src, content } = contentItem;
      this.setTextImg();
      this.setData({
        textimgTitle,
        message: content,
        imgUrl: src,
        editStatus: true,
        edit_id: edit_id//云函数通过判断当前是否有这个属性来告诉云函数是编辑还是新增
      })
    }
    this.setData({
      editIndex: contentIndex,
      edit_id: edit_id//云函数通过判断当前是否有这个属性来告诉云函数是编辑还是新增
    })
  },

  // --------------- 左侧 上传特殊类型功能方法集
  setInteract() {
    this.setData({
      setwait: true,
      btnDie: true,
    });
    this.bottom();
  },

  // 设置图文
  setTextImg() {
    this.setData({
      setTextImg: true,
      btnDie: true,
    });
    this.bottom();
  },
  // 设置封面
  setFrontImg() {
    this.setData({
      setFrontImg: true,
      btnDie: true,
    });
    this.bottom();
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

  bindMultiPickerChange(e) {
    console.log(e.detail.value)
  },
  bindcolumnchange(e) {
    console.log("bindcolumnchange",e.detail.value)
  }
})
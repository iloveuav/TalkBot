var app = getApp();
import util from '../../utils/util'
import cookies from 'weapp-cookie'

const json2Form = require("../../utils/util").json2Form

Page({
  data: {
    btnType: 'priview',
    courseInfo: {
      coverImage: 'cloud://uav-001-9213ca.7561-uav-001-9213ca/images.jpg',
      title: '课程名称',
      desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
      state: '审核中'
    },
    chapterList: [{
      title: '开始学习啦~',
      id: 1
    },
    {
      title: '开始学习啦~',
      id: 2
    },
    {
      title: '开始学习啦~',
      id: 3
    },
    {
      title: '开始学习啦~',
      id: 4
    },
    {
      title: '开始学习啦~',
      id: 5
    },
    {
      title: '开始学习啦~',
      id: 6
    },
    {
      title: '开始学习啦~',
      id: 7
    },
    {
      title: '开始学习啦~',
      id: 8
    },
    {
      title: '开始学习啦~',
      id: 9
    },
    ],

    //拖拽相关
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: '',
  },

  onLoad: function (options) {
    if (options.btnType) {
      // let crouseDetail = JSON.parse(options.courseMess);
      let crouseDetail = app.globalData.CurrentCourseObj;
      console.log("globalData-crouseDetail", crouseDetail)
      let btnType = options.btnType
      this.setData({
        crouseDetail: crouseDetail,
        btnType: btnType,
        pageType: options.type ? options.type : 'course'
      })
      if (crouseDetail.useAI) {
        console.log("crouseDetail", crouseDetail)
        if (crouseDetail.ChapterList) {
          this.setData({
            ChapterList: crouseDetail.ChapterList
          })
        } else {
          this.getChapterListByClaude()
        }
      } else {
        this.getChapterList(btnType);
      }
    }
    this.getCollectState();



  },

  getChapterListByClaude() {
    wx.showLoading({
      title: '正在生成章节目录中',
    })

    //参考章节结构如下：第一章节：英语的特点，文化背景，学习英语有什么优势
    // 第二章节：英语的语法特点  基础语法
    // 第三章节：基础英语的简单应用 结合小任务小游戏
    // 第四章节：高阶进阶语法
    // 第五章节：高阶语法应用  听力、小作文训练
    // 第六章节：冒险阶段 随机生成各种场景模拟、小游戏等  
    const msg = `请按照接口格式返回数据  我需要你生成一个生动有趣的课程的章节架构 课程名是${this.data.crouseDetail.courseName} 课程简介是${this.data.crouseDetail.courseIntroduce} 不要和参考的一模一样 返回的格式参考这个返回 不要说多余的话像一个接口严格根据下面的数据格式返回就行  数据格式如下：MARKER1{
            "ChapterList": [
              {
                "courseId": "1",
                "courseNum": "16",
    "_id": {
            "chapterId": 1,
            "chapterName": "JS基础知识",
            "className": "深入浅出Javascript",
            "courseUUid": "c3ed5828-bd84-4785-8788-d31d26796613"
          }
              },  {
                "courseId": "1",
                "courseNum": "16",
    "_id": {
            "chapterId": 2,
            "chapterName": "Javascript闭包",
            "className": "深入浅出Javascript",
            "courseUUid": "c3ed5828-bd84-4785-8788-d31d26796613"
          }
        ]
          }MARKER2`
    this.firstStep_ask(msg)



  },

  //获取AI生成的章节目录 第一步
  firstStep_ask(msg) {
    var that = this
    console.log("msg", msg)
    const SystemSetting = wx.getStorageSync("SystemSetting")
    const urlForTalk = SystemSetting.urlForTalk || ''
    if (urlForTalk) {
      let url = urlForTalk
      wx.requestWithCookie({
        url: url,
        method: 'POST',
        data: util.json2Form({ message: msg, context: [] }),
        header: { //
          "Content-Type": "application/x-www-form-urlencoded",//post 请求用这个
        },
        success: function (result) {
          console.log("yyzm-返回", result);
          if (result.data.success) {
            that.secondStep_streaming()
          }
        },
        fail: err => {
          // handle error
          that.setData({
            remind: null,
            generateChart: 'no',
          })
          wx.showModal({
            title: '提示',
            content: '获取失败 请检查网络',
            showCancel: false,
          })
          return;
        },
        complete: res => {
          console.log('callFunction test result: ', res)
          that.setData({
            remind: null,
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '服务暂时下线',
        showCancel: false,
      })
      return;
    }
  },

  //获取AI生成的章节目录 第二步
  secondStep_streaming() {
    wx.showLoading({
      title: '处理中，请稍等片刻',
    })
    var that = this
    // this.data.testStreamingInterval = setInterval(() => {
    wx.requestWithCookie({
      url: 'https://claude.uavserve.online/stream_api',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json',//get 请求用这个
        // "Content-Type": "application/x-www-form-urlencoded",//post 请求用这个
        'Host': 'yierco.slack.com',
        'Cookie': 'OptanonAlertBoxClosed=2023-04-24T02:43:02.402Z; _gcl_au=1.1.1993499355.1682304182; _cs_c=1; _lc2_fpi=e00b11ac9c9b--01gyrj9b38xrbf37rjhate5rmm; __adroll_fpc=58531eb79acbcd94d1797a4fbfb2ce8b-1682304183624; __qca=P0-1709822310-1682304183175; d=xoxd-9k4xh7B0T8pAG7g4YU8BwGcgItYxrCu%2BIu2QkVum0TxeeMaKYAH8Qy1mCglxhSbbLLyPfgLkcwdlFXBmiugj%2FWjz3NY3wL5hwY%2Bb1g8%2BBjzQlf14BIXR%2BH%2BXA4p1JWa%2FuaDKlmLLPNTTaPR4isYZ2I%2BpqK%2B3neCH7iSq58cIrBdPun8DOJTQ0SijQA%3D%3D; lc=1682304321; b=.cf9fbf96487a912ff277cb5a23f19c22; utm=%7B%22utm_source%22%3A%22in-prod%22%2C%22utm_medium%22%3A%22inprod-btn_app_install-index-click%22%7D; _ga=GA1.3.1398702781.1682304183; __pdst=2ddc803c632d44a8bb045a0ca343b4db; _rdt_uuid=1682304605784.5b74fa53-92c3-4f7b-9056-df25999368e4; _gid=GA1.2.1190074337.1683561607; _fbp=fb.1.1683561617010.1712718942; shown_ssb_redirect_page=1; shown_download_ssb_modal=1; show_download_ssb_banner=1; no_download_ssb_banner=1; d-s=1683592227; PageCount=2; DriftPlaybook=B; existing_users_hp={"launched":1683622587,"launch_count":3}; x=cf9fbf96487a912ff277cb5a23f19c22.1683633784; _cs_mk_ga=0.9921918170232491_1683633788448; _cs_id=56e5d028-0318-ab39-f24d-3697a560f074.1682304182.4.1683633789.1683633789.1.1716468182797; _cs_s=1.0.0.1683635589375; _ga_QTJQME5M5D=GS1.1.1683633789.9.0.1683633789.60.0.0; _ga=GA1.1.1398702781.1682304183; _li_dcdm_c=.slack.com; OptanonConsent=isGpcEnabled=0&datestamp=Tue+May+09+2023+20%3A03%3A11+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=4a5e30d2-1aef-4ecb-b82e-489baa62e1c7&interactionCount=2&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A1&AwaitingReconsent=false&geolocation=CN%3BGD; __ar_v4=K2HN2U4VSJGOVKC2WJLQNH%3A20230424%3A3%7CKDMBLDIYHFHI5NUNKGJ4LV%3A20230424%3A5%7CQCM34G7NBZEHHATIFDIUBJ%3A20230424%3A8%7C4UHU5P4P3FESHLUMNBLWAU%3A20230424%3A8',
      },
      success(result) {
        console.log("test_streaming_res", result)
        var isstarted = true;
        var alltext = "";
        var isalltext = false;
        that.setData({
          // remind: true,
          isstarted: false
        })
        var jsonArr = that.parseToArray(result.data);
        console.log("jsonArr", jsonArr)
        jsonArr.forEach(item => {
          console.log("item", item)
          console.log("alltext", alltext)
          if (item.length === 0) {
            isalltext = true;
            alltext = alltext.replace('\\\"', '\\\\\"');
            alltext = alltext.replace(/\n/g, "");
            console.log("alltext", alltext)

            that.handleResultConvertToChart(alltext)
            that.setData({
              remind: null,
              generateChart: 'ok',
              result: alltext
            })

            // contextarray.push([prompt, alltext]);
            // contextarray = contextarray.slice(-12); //只保留最近5次对话作为上下文，以免超过最大tokens限制
            clearInterval(that.data.testStreamingInterval)
            wx.hideLoading()
            return;
          }

          if (item.choices && item.choices[0].delta.hasOwnProperty("content")) {
            if (item.choices[0].delta.content === '错误' || item.choices[0].delta.content.includes("Claude cannot look up any real-time information") || item.choices[0].delta.content.includes("This request may violate our Acceptable")) {
              console.log("Error")
              // error_layer=true
              // send_post();
              return;
            }

            if (alltext == "") {
              let tempText = item.choices[0].delta.content.replace(/^\n+/, ''); //去掉回复消息中偶尔开头就存在的连续换行符

              tempText = tempText.replace(/\\n/g, '[nlll]');
              tempText = tempText.replace(/\[nlll\]/g, '');
              alltext = tempText;
            } else {
              let tempText = item.choices[0].delta.content.replace(/^\n+/, ''); //去掉回复消息中偶尔开头就存在的连续换行符
              tempText

              tempText = tempText.replace(/\\n/g, '[nlll]');
              tempText = tempText.replace(/\[nlll\]/g, '');
              alltext += tempText;
            }
          }
        })
      }
    })
    // }, 3000);
  },


  isJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },

  parseToJSON(str) {
    console.log("parseToJSON-str", str)
    // 检查是否是JSON格式,如果是直接返回
    if (this.isJSON(str)) return JSON.parse(str);

    // 如果不是JSON格式,则做以下处理
    str = str.trim();  // 去除字符串两边空格
    str = str.replace(/^\s*|\s*$/g, ''); // 去除每行两边空格

    // 如果字符串以{或者[开头,说明可能是对象或者数组,尝试解析
    if (str.startsWith('{') || str.startsWith('[')) {
      try {
        return JSON.parse(str);
      } catch (e) { }
    }

    // 否则按行分割,尝试构造对象或数组
    var lines = str.split('\n');
    var obj = {};  // 假定为对象
    var arr = [];  // 假定为数组
    var isArray = false;

    // 遍历每行,解析键值对或者数组元素
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      line = line.trim();

      // 如果遇到{立即构造对象
      if (line.startsWith('{')) {
        obj = {};
        isArray = false;
        continue;
      }

      // 如果遇到[立即构造数组
      if (line.startsWith('[')) {
        arr = [];
        isArray = true;
        continue;
      }

      // 对象处理
      if (!isArray) {
        var keyValue = line.split(':');
        if (keyValue.length == 2) {
          var key = keyValue[0].trim();
          var value = keyValue[1].trim();
          obj[key] = value.startsWith('{') || value.startsWith('[') ? this.parseToJSON(value) : value;
        }
      } else {  // 数组处理
        if (line) arr.push(line.startsWith('{') || line.startsWith('[') ? this.parseToJSON(line) : line);
      }
    }

    // 返回对象或数组
    return isArray ? arr : obj;
  },


  parseToArray(str) {
    var arr = [];
    var lines = str.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      if (line.startsWith('data:')) {
        var jsonStr = line.slice(6); // 从data:后面开始截取
        if (this.isJSON(jsonStr)) {  // 检查是否JSON
          arr.push(JSON.parse(jsonStr));  // 是的话直接push
        } else {
          jsonStr = this.parseToJSON(jsonStr); // 否则解析成JSON
          arr.push(jsonStr);
        }
      }
    }

    return arr;
  },

  handleResultConvertToChart(result) {
    console.log(result)
    //先根据MARKER 提取思维导图数据
    if (result) {
      // const test = result.data
      const test = result
      // const test = tempResult.toString()
      console.log(test)

      const testmarker1 = test.indexOf('MARKER1', 0)
      const testmarker2 = test.indexOf('MARKER2', 0)
      console.log("testmarker1", testmarker1)
      console.log("testmarker2", testmarker2)
      if (testmarker1 === -1) {//无法生成图
        this.hideLoading
        wx.showModal({
          title: '提示',
          content: '系统出错，请重试',
          showCancel: false,
        })
        return;
      } else {
        // 拿到代码判断
        const chartTempCode = test.slice(testmarker1 + 7, testmarker2)
        console.log("chartTempCode1", chartTempCode)
        this.formatCodeStringToJsonCodeString(chartTempCode)
      }
    }
  },


  //代码字符转json字符 并丢给组件更新渲染
  formatCodeStringToJsonCodeString(codeString) {
    console.log("codeString", codeString)
    let chartCodeJSON = JSON.parse(codeString);
    //除了流程图  都要检查id是否重复
    // if (this.data.categoryCur !== 4) {
    //   chartCodeJSON = this.handleDuplicateIds(chartCodeJSON)
    // }
    console.log("f-chartCodeJSON", chartCodeJSON)
    if (chartCodeJSON) {
      //上传AI生成的课程章节结构
      wx.cloud.callFunction({
        name: 'operate_CourseMess',
        data: {
          courseMess: this.data.crouseDetail,
          type: this.data.type,
          mode: 'operateCharaterList',
          ChapterList: chartCodeJSON.ChapterList
        },
        success: res => {
          wx.showToast({
            title: '章节目录云同步成功',
            icon: 'sucess',
          })
          this.setData({
            ChapterList: chartCodeJSON.ChapterList
          })

        },
        fail: err => {
          // handle error
          wx.showToast({
            title: '章节目录云同步失败',
            icon: 'error',
          })

          wx.showModal({
            title: '提示',
            content: '请检查网络后重试',
            showCancel: false,
          })
          return;
        },
        complete: res => {
          console.log('callFunction test result: ', res)
          wx.hideLoading()
        }
      })
    }





    // app.globalData.CurrentChartCode = chartCodeJSON

    // setTimeout(() => {
    //   app.globalData.CurrentChartCode = chartCodeJSON
    //   this.toChartDetail(true);
    // }, 500);
    // this.$emit('updateChartOption', test);
  },







  toAddChapter: function () {
    let str = JSON.stringify(this.data.crouseDetail);
    let chapterList = JSON.stringify(this.data.ChapterList);
    const pageType = this.data.pageType
    wx.navigateTo({
      //这里传值
      url: "../../../../AddCourseContent/AddCourseContent?type=" + 'add' + "&courseMess=" + str + "&chapterList=" + chapterList + "&pageType=" + pageType
    })

  },
  toEditChapter: function (e) {
    let chapterobj = JSON.stringify(e.target.dataset.chapterobj)
    let str = JSON.stringify(this.data.crouseDetail);
    let chapterList = JSON.stringify(this.data.ChapterList);
    const pageType = this.data.pageType
    wx.navigateTo({
      //这里传值
      url: "../../../../AddCourseContent/AddCourseContent?type=" + 'edit' + "&courseMess=" + str + "&chapterList=" + chapterList + "&chapterobj=" + chapterobj + "&pageType=" + pageType,
    })

  },

  up(x, y) {
    return x._id.chapterId - y._id.chapterId
  },


  getCollectState: function () {
    wx.cloud.callFunction({
      name: 'operate_courseUserStatus',
      data: {
        mode: 'getStatus',
        courseUUid: this.data.crouseDetail.courseUUid
      }
    }).then(res => {
      console.log(res)
      this.setData({
        isLiked: res.result.userIsLike,
        isCollected: res.result.userIsCollect,
        isShared: res.result.userIsShare,
      })
      // return res.result.data.collectd
    })
      .catch(err => {
        console.error('getCollectd', err)
      })

  },



  like: function (e) {
    console.log(e)
    const mode = e.currentTarget.dataset.content
    if (mode === 'like') {
      if (this.data.crouseDetail.likeCount || this.data.crouseDetail.likeCount === 0) {
        this.data.crouseDetail.likeCount++;
      } else {
        this.data.crouseDetail.likeCount = 1
      }
    } else {
      if (this.data.crouseDetail.likeCount && this.data.crouseDetail.likeCount > 0) {
        this.data.crouseDetail.likeCount--;
      } else {
        this.data.crouseDetail.likeCount = 0
      }
    }

    wx.cloud.callFunction({
      name: 'operate_courseUserStatus',
      data: {
        // type: 'course',
        // mode: 'cancelLike',
        mode: mode,
        courseUUid: this.data.crouseDetail.courseUUid
      },
      success: res => {
        console.log(res)
        this.setData({
          crouseDetail: this.data.crouseDetail,
          isLiked: !this.data.isLiked
        })

      },
      fail: err => {
        // handle error
        wx.showModal({
          title: '提示',
          content: '点赞失败 请检查网络',
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

  courseShare: function (e) {
    const mode = 'share'

    if (this.data.crouseDetail.shareCount || this.data.crouseDetail.shareCount === 0) {
      this.data.crouseDetail.shareCount++;
    } else {
      this.data.crouseDetail.shareCount = 1
    }

    this.onShareAppMessage();

    wx.cloud.callFunction({
      name: 'operate_courseUserStatus',
      data: {
        // mode:'cancelCollect',//'cancelCollect'
        // mode:'collect',//'cancelCollect'
        mode: mode,
        courseUUid: this.data.crouseDetail.courseUUid
      },
      success: res => {
        console.log(res)
        this.setData({
          crouseDetail: this.data.crouseDetail,
          isShared: true
        })

      },
      fail: err => {
        // handle error
        wx.showModal({
          title: '提示',
          content: '操作失败 请检查网络',
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
  courseCollect: function (e) {
    const mode = e.currentTarget.dataset.content
    if (mode === 'collect') {
      if (this.data.crouseDetail.collectCount || this.data.crouseDetail.collectCount === 0) {
        this.data.crouseDetail.collectCount++;
      } else {
        this.data.crouseDetail.collectCount = 1
      }
    } else {
      if (this.data.crouseDetail.collectCount && this.data.crouseDetail.collectCount >= 0) {
        this.data.crouseDetail.collectCount--;
      } else {
        this.data.crouseDetail.collectCount = 0
      }
    }


    wx.cloud.callFunction({
      name: 'operate_courseUserStatus',
      data: {
        // mode:'cancelCollect',//'cancelCollect'
        // mode:'collect',//'cancelCollect'
        mode: mode,
        courseUUid: this.data.crouseDetail.courseUUid
      },
      success: res => {
        console.log(res)
        this.setData({
          crouseDetail: this.data.crouseDetail,
          isCollected: !this.data.isCollected
        })

      },
      fail: err => {
        // handle error
        wx.showModal({
          title: '提示',
          content: '操作失败 请检查网络',
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

  onShareAppMessage() {
    console.log('Share')

    // this.courseShare();
    // wx.navigateTo({
    //   //这里传值
    //   url: '/pages/courseBotIndex/index?pageType=' + 'studyPage',
    // })
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '朋友，给你看个好东西',
        })
      }, 100);
    })
    return {
      title: '一聊就会的学习小程序',
      path: '/pages/courseBotIndex/index?pageType=' + 'studyPage',
      promise
    }
  },



  getChapterList(pageType) {
    wx.cloud.init({
      traceUser: true,
      env: 'bot-cloud1-7g30ztcr37ed0193'
    })
    const courseUUid = this.data.crouseDetail.courseUUid
    wx.cloud.callFunction({
      name: 'get_ChapterListByCourseUUid',
      data: {
        courseUUid: courseUUid,
        type: 'course'
      },
      success: res => {
        let showChapter = []
        if (pageType === 'studyPage') {
          showChapter = res.result.allChapterList
        } else {
          showChapter = res.result.allChapterList
        }
        this.setData({
          ChapterList: showChapter.sort(this.up),
          remind: '',
        })
      },
      fail: err => {
        // handle error
      },
      complete: res => {
        console.log(res)
      }
    })
  },
  handleChapterItem(e) {
    console.log(e)
    const {
      chapterId,
      chapterName
    } = e.currentTarget.dataset.clickchapter._id;
    const crouseDetail = this.data.crouseDetail

    let CurrentChapter = {
      courseUUid: crouseDetail.courseUUid,
      courseName: crouseDetail.courseName,
      chapterId: chapterId,
      chapterName: chapterName,
      reset: false,
    }

    app.globalData.CurrentChapter = CurrentChapter
    
    let str = JSON.stringify(crouseDetail);
    let Cc = JSON.stringify(CurrentChapter);
    let ChapterList = JSON.stringify(this.data.ChapterList);
    console.log("ChapterList", ChapterList)
    console.log("crouseDetail", str)
    console.log("CurrentChapter", Cc)

    wx.navigateTo({
      //这里传值
      url: "../../pages/courseBot/index?course=" + str + "&Cc=" + Cc + "&ChapterList=" + ChapterList,
    })

  },
  deleteCourse() {
    const crouseDetail = this.data.crouseDetail
    wx.showModal({
      title: "确认删除？",
      content: "本次删除不可恢复~",
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          //调用云函数
          wx.cloud.init({
            env: 'bot-cloud1-7g30ztcr37ed0193'
          })
          wx.cloud.callFunction({
            name: 'del_course',
            data: {
              courseUUid: crouseDetail.courseUUid,
              classCollection: 'testCourseContents'

            },
            success: res => {
              wx.showModal({
                title: '提示',
                content: '成功删除该课程~',
                showCancel: false,
              })
              wx.navigateBack({
                delta: 1 //返回的页面数
              });
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

  },
  editCourse() {
    console.log('编辑课程');
    const crouseDetail = this.data.crouseDetail
    let str = JSON.stringify(crouseDetail);
    wx.navigateTo({
      //这里传值
      url: '/pages/courseMessForm/index?courseMess=' + str,

      // url: '/pages/mysel/admin/admin',
      // url: '/pages/AddEngClassContent/AddEngClassContent',
    })
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
})
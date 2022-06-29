var app = getApp();

Page({
  data: {
    btnType: 'priview',
    courseInfo: {
      coverImage: 'cloud://uav-001-9213ca.7561-uav-001-9213ca/images.jpg',
      title: '课程名称',
      desc: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
      state: '审核中'
    },
    chapterList: [
      { title: '开始学习啦~', id: 1 },
      { title: '开始学习啦~', id: 2 },
      { title: '开始学习啦~', id: 3 },
      { title: '开始学习啦~', id: 4 },
      { title: '开始学习啦~', id: 5 },
      { title: '开始学习啦~', id: 6 },
      { title: '开始学习啦~', id: 7 },
      { title: '开始学习啦~', id: 8 },
      { title: '开始学习啦~', id: 9 },
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
      this.getChapterList(btnType);

    }

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


  getChapterList(pageType) {
    wx.cloud.init({
      env: 'huixue-3g4h1ydg1dedcaf3'
    })
    const courseUUid = this.data.crouseDetail.courseUUid
    wx.cloud.callFunction({
      name: 'get_ChapterListByCourseUUid',
      data: {
        courseUUid: courseUUid,
        type: this.data.type
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
    const { chapterId, chapterName } = e.currentTarget.dataset.clickchapter._id;
    const crouseDetail = this.data.crouseDetail

    let CurrentChapter = {
      courseUUid: crouseDetail.courseUUid,
      courseName: crouseDetail.courseName,
      chapterId: chapterId,
      chapterName: chapterName,
      reset: false,
    }

    let str = JSON.stringify(crouseDetail);
    let Cc = JSON.stringify(CurrentChapter);
    let ChapterList = JSON.stringify(this.data.ChapterList);
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
            env: 'huixue-3g4h1ydg1dedcaf3'
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
                delta: 1//返回的页面数
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
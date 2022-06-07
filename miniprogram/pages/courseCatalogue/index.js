Page({
  data: {
    btnType: 'priview',
    courseInfo: {
      coverImage: 'cloud://uav-001-9213ca.7561-uav-001-9213ca/images/start1.jpg',
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
    ]
  },

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

    this.getChapterList(btnType);
  },
  toAddChapter: function () {
    let str = JSON.stringify(this.data.crouseDetail);
    wx.navigateTo({
      //这里传值
      url: "../../../../AddCourseContent/AddCourseContent?currentChooseCard=" + 0 + "&courseMess=" + str,
    })

  },


  getChapterList(pageType) {
    console.log(this.data.crouseDetail)
    wx.cloud.init({
      env: 'talkbot-56sn5'
    })
    const CourseUUid = this.data.crouseDetail.courseUUid
    wx.cloud.callFunction({
      name: 'get_ChapterListByCourseUUid',
      data: { CourseUUid: CourseUUid },
      success: res => {
        // console.log(res)
        console.log('callFunction test result: ', res);

        let showChapter = []
        if (pageType === 'studyPage') {
          showChapter = res.result.allChapterList
        } else {
          showChapter = res.result.allChapterList
        }
        this.setData({
          ChapterList: showChapter,
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
    const { ChapterId } = e.currentTarget.dataset;
    const crouseDetail = this.data.crouseDetail
    console.log('点击章节啦~快跳转', ChapterId);
    console.log('点击章节啦~crouseDetail', this.data.crouseDetail);


    let CurrentChapter = {
      courseUUId: crouseDetail.courseUUid,
      courseName: crouseDetail.courseName,
      chapterId: ChapterId,
      reset: false
    }
    // let CurrentChapter = {
    //   courseId: crouseDetail.data[0].courseId,
    //   className: crouseDetail.data[0]._id.className,
    //   chapterName: crouseDetail.data[0]._id.chapterName,
    //   id: crouseDetail.data[0].id,
    //   reset: false
    // }
    // console.log(CurrentChapter)

    let str = JSON.stringify(crouseDetail);
    let Cc = JSON.stringify(CurrentChapter);
    let ChapterList = JSON.stringify(this.data.ChapterList);
    wx.navigateTo({
      //这里传值
      url: "../../pages/courseBot/index?course=" + str + "&Cc=" + Cc + "&ChapterList=" + ChapterList,
    })


    // wx.navigateTo({
    //   url: 'url',
    // })
  },
  deleteCourse() {
    console.log('删除课程');
    const crouseDetail = this.data.crouseDetail
    console.log("crouseDetail", crouseDetail);
    wx.showModal({
      title: "确认删除？",
      content: "本次删除不可恢复~",
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          //调用云函数
          wx.cloud.init({
            env: 'talkbot-56sn5'
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
  }
})
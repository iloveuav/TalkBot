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
      {title: '开始学习啦~', id: 1},
      {title: '开始学习啦~', id: 2},
      {title: '开始学习啦~', id: 3},
      {title: '开始学习啦~', id: 4},
      {title: '开始学习啦~', id: 5},
      {title: '开始学习啦~', id: 6},
      {title: '开始学习啦~', id: 7},
      {title: '开始学习啦~', id: 8},
      {title: '开始学习啦~', id: 9},
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
  },
  toAddChapter: function () {
    let str = JSON.stringify(this.data.crouseDetail);
    wx.navigateTo({
      //这里传值
      url: "../../../../AddCourseContent/AddCourseContent?currentChooseCard=" + 0+ "&courseMess="+str,
    })
  },
  handleChapterItem(e){
    const { id } = e.currentTarget.dataset;
    console.log('点击章节啦~快跳转');
    // wx.navigateTo({
    //   url: 'url',
    // })
  },
  deleteCourse() {
    console.log('删除课程');
  },
  editCourse() {
    console.log('编辑课程');
  }
})
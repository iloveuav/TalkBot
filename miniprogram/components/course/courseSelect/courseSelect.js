// components/course/courseSelect/courseSelect.js
let CurrentChapter = {}  //当前章节对象

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propArray: {
      type: Object,
    },

    courseObject: {
      type: Object,
      value: '数据加载有误',
    },
    ChapterList: {
      type: Array,
      value: '数据加载有误',
    },

  },


  // ---------------生命周期=---------------
  lifetimes: {
    ready() {
      // console.log('1111')
    
      let ChapterList = this.data.ChapterList || []
      console.log('ChapterList', ChapterList)
      // let CurrentChapter = {
      //   courseUUId: crouseDetail.courseUUid,
      //   courseName: crouseDetail.courseName,
      //   chapterId: ChapterId,
      //   reset: false
      // }
      this.getChapterList()
   

    },
    detached() {

    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    selectShow: false, //初始option不显示
    animationData: {}, //右边箭头的动画,
    reset: false,

    // propArray: [{
    //   "id": "10",
    //   "text": "会计类"
    // }, {
    //   "id": "21",
    //   "text": "工程类"
    // }],

    // selectArray: [{
    //   "id": "10",
    //   "text": "会计类"
    // }, {
    //   "id": "21",
    //   "text": "工程类"
    // }]
  },
  /**
   * 组件的方法列表
   */
  methods: {


    //option的显示与否
    selectToggle: function () {
      // console.log(this.data.selectArray);
      var nowShow = this.data.selectShow; //获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },

    //reset
    reset: function () {
      this.data.reset = true
      this.setText();
    },


    //设置内容
    setText: function (e) {
      // 要通知父组建 reset
      if (this.data.reset == true) {
        this.setData({
          reset: true
        })
        CurrentChapter.reset = true
      } else {
        var nowData = this.data.courseObject; //课程对象
        // console.log(nowData);
        var nowIdx = e.currentTarget.dataset.index; //当前点击的索引
        // console.log(nowIdx);
        // var nowText = nowData[nowIdx]._id.chapterName; //当前点击的内容
        //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
        this.animation.rotate(0).step();


        let crouseDetail = this.data.courseObject
        let ChapterList = this.data.ChapterList

        // let CurrentChapter = {
        //   courseUUId: crouseDetail.courseUUid,
        //   courseName: crouseDetail.courseName,
        //   chapterId: ChapterId,
        //   reset: false
        // }

        CurrentChapter = {
          courseUUId: crouseDetail.courseUUid,
          courseName: crouseDetail.courseName,
          chapterId: ChapterList[nowIdx]._id.chapterId,
          chapterName: ChapterList[nowIdx]._id.chapterName,
          reset: this.data.reset
        }
        // CurrentChapter = {
        //   courseId: nowData[nowIdx].courseId,
        //   className: nowData[nowIdx]._id.className,
        //   chapterName: nowData[nowIdx]._id.chapterName,
        //   reset: this.data.reset
        // }

        this.setData({
          selectShow: false,
          CurrentChapter: CurrentChapter,
          animationData: this.animation.export(),
          reset: this.data.reset
        })
      }

      this.triggerEvent('changeChapter', CurrentChapter)
      this.data.reset = false
    },

    //获取章节信息
    getChapterList() {
      wx.cloud.init({
        env: 'huixue-3g4h1ydg1dedcaf3'
      })
      const CourseUUid = this.data.courseObject.courseUUid
      wx.cloud.callFunction({
        name: 'get_ChapterListByCourseUUid',
        data: { CourseUUid: CourseUUid },
        success: res => {
          // console.log(res)
          console.log('callFunction test result: ', res);
          
  
          let showChapter = []
  
          showChapter = res.result.allChapterList

          let crouseDetail = this.data.courseObject || {}
          if (crouseDetail && showChapter.length >= 1) {
           
            CurrentChapter = {
              courseUUId: crouseDetail.courseUUid,
              courseName: crouseDetail.courseName,
              chapterId: showChapter[0]._id.chapterId,
              chapterName: showChapter[0]._id.chapterName,
            }
            this.setData({
              CurrentChapter: CurrentChapter,
              reset: true
            })
            this.setText();
          }

          console.log('callFunction test result-showChapter: ', showChapter);
  
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
  }
})
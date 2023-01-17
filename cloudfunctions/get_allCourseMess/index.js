// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'bot-cloud1-7g30ztcr37ed0193'
})
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
// 云函数入口函数

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var engAllCourse = await db.collection('EngClassContents').aggregate()
    .group({
      // 按 category 字段分组
      _id: {
        className: '$className',
        chapterName: '$chapterName',
      },
      courseNum: $.sum(1),
      courseId: $.first('$classId'),
    })
    .end()
  // engAllCourse.forEach(v=>{

  // })


  var jaAllCourse = await db.collection('JaClassContents').aggregate()
    .group({
      // 按 category 字段分组
      _id: {
        className: '$className',
        chapterName: '$chapterName',
      },
      courseNum: $.sum(1),
      courseId: $.first('$classId'),
    })
    .end()


  var otherAllCourse = await db.collection('otherClassContents').aggregate()
    .group({
      // 按 category 字段分组
      _id: {
        className: '$className',
        chapterName: '$chapterName',
      },
      courseNum: $.sum(1),
      courseId: $.first('$classId'),
    })
    .end()

  var schoolDetail = await db.collection('SchoolDetail').aggregate()
    .group({
      // 按 category 字段分组
      _id: {
        className: '$className',
        chapterName: '$chapterName',
      },
      courseNum: $.sum(1),
      courseId: $.first('$classId'),
    })
    .end()

  var allCourseMess = await db.collection('allCourseMess')
    .get()

  var tempUserCourseMess = await db.collection('user-info').where({
    openid: wxContext.OPENID
  }).get()
  var UserCourseMess = tempUserCourseMess.data

  //之前前端的处理逻辑 放入云函数

  let courseFrontImgArray = allCourseMess.data
  let allCourse = []
  let progress = 0
  let num = 1
  // 处理日语------------------------------------------------------------------------------------
  let children = jaAllCourse.list
  // 因为后面需要echart数据可视化 属性名改一下

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
        courseType: 'ja',
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
  num = 1
  // let courseMess = nList
  // console.log(courseMess)
  nList.forEach(v => {
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
    v.courseProgress = "进度 -  " + '0%';
    v.progress = v.data[0].courseId
    v.progressValue = 0
    // v.forEach(ch=>{
    if (!UserCourseMess || UserCourseMess.length <= 0) {
      v.progress = v.data[0].courseId
      let progress = 0
      v.courseProgress = "进度 -  " + progress + '%';
      v.progressValue = 0
    } else {
      UserCourseMess.forEach(v2 => {
        let progress = 0

        if (v.name == v2.className) {
          progress = Number((v2.courseId / v.data.length)).toFixed(2) * 100;
          console.log(progress)
          // console.log(v)
          v.courseProgress = "进度 -  " + progress.toFixed(2) + '%';
          v.progressId = v2.courseId
          v.progressValue = v2.courseId
        }
      })
    }
    // })

    courseFrontImgArray.forEach(v3 => {
      if (v.name == v3.courseMess.name) {
        //根据名字匹配上后根据有值的进行更新
        if (v3.courseMess.frontImg) {
          v.frontImg = v3.courseMess.frontImg
        }
        if (v3.createrOpenid) {
          v.createrOpenid = v3.createrOpenid
          if (v3.createrOpenid === wxContext.OPENID) {
            v.isMineCourse = true
          } else {
            v.isMineCourse = false
          }
        }
        //课程审核状态更新
        if (v3.state) {
          v.state = v3.state
        }
        if(v3._id){
          v._id = v3._id
        }
      }
      //创作者


    })
    v.id = num++;
  })
  let jaCourse = {
    value: jaAllCourse.list.length,
    id: 'jacourse',
    name: '日语课程',
    children: nList
  }
  allCourse.push(jaCourse)
  //处理日语end-----------------------------------------------------------------------------------
  //处理英语------------------------------------------------------------------------------------
  children = engAllCourse.list
  // 因为后面需要echart数据可视化 属性名改一下 对children进行章节分组


  map = {},
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
  num = 1
  // courseMess = nList
  // console.log(courseMess)
  nList.forEach(v => {
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
    // 初始化 
    v.progress = v.data[0].courseId
    v.progressValue = 0
    v.courseProgress = "课程进度 -  " + '0%';
    // v.forEach(ch=>{
    if (!UserCourseMess || UserCourseMess.length <= 0) {
      v.progress = v.data[0].courseId
      let progress = 0
      v.courseProgress = "课程进度 -  " + progress + '%';
    } else {
      UserCourseMess.forEach(v2 => {
        if (v.name == v2.className) {

          progress = Number((v2.courseId / v.data.length)).toFixed(2) * 100;
          console.log(v.name + v2.className + v2.courseId)
          console.log('progress', progress)
          v.courseProgress = "课程进度 -  " + progress.toFixed(2) + '%';
          v.progress = v2.courseId
          v.progressValue = v2.courseId
        }
      })
    }
    // })

    courseFrontImgArray.forEach(v3 => {
      if (v.name == v3.courseMess.name) {
        //根据名字匹配上后根据有值的进行更新
        if (v3.courseMess.frontImg) {
          v.frontImg = v3.courseMess.frontImg
        }
        if (v3.createrOpenid) {
          v.createrOpenid = v3.createrOpenid
          if (v3.createrOpenid === wxContext.OPENID) {
            v.isMineCourse = true
          } else {
            v.isMineCourse = false
          }
        }
        //课程审核状态更新
        if (v3.state) {
          v.state = v3.state
        }
        if(v3._id){
          v._id = v3._id
        }
      }

    })
    v.id = num++;
  })

  // console.log(nList)
  let engCourse = {
    value: engAllCourse.list.length,
    id: 'engcourse',
    name: '英语课程',
    children: nList
  }
  allCourse.push(engCourse)
  // 处理英语end---------------------------------------------------------------------------------

  // 处理其他课程-----------------------------------------------------------------------------
  children = otherAllCourse.list
  // 因为后面需要echart数据可视化 属性名改一下

  map = {},
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
        courseType: 'other',
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
  num = 1
  // let courseMess = nList
  // console.log(courseMess)
  nList.forEach(v => {
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
    v.courseProgress = "课程进度 -  " + progress + '%';
    // v.forEach(ch=>{
    if (!UserCourseMess || UserCourseMess.length <= 0) {
      v.progress = v.data[0].courseId
      let progress = 0
      v.courseProgress = "课程进度 -  " + progress + '%';
      v.progressValue = 0
    } else {
      UserCourseMess.forEach(v2 => {
        let progress = 0
        v.courseProgress = "课程进度 -  " + progress + '%';
        v.progress = v.data[0].courseId
        v.progressValue = 0
        if (v.name == v2.className) {
          progress = Number((v2.courseId / v.data.length)).toFixed(2) * 100;
          // console.log(v)
          v.courseProgress = "课程进度 -  " + progress.toFixed(2) + '%';
          v.progress = v2.courseId
          v.progressValue = v2.courseId
          console.log(v.name + v2.className + v2.courseId)
          console.log('progress', progress.toFixed(2))
          console.log("v", v)
        }
      })
    }
    // })

    courseFrontImgArray.forEach(v3 => {
      if (v.name == v3.courseMess.name) {
        v.frontImg = v3.courseMess.frontImg
        //根据名字匹配上后根据有值的进行更新
        if (v3.courseMess.frontImg) {
          v.frontImg = v3.courseMess.frontImg
        }
        if (v3.createrOpenid) {
          v.createrOpenid = v3.createrOpenid
          if (v3.createrOpenid === wxContext.OPENID) {
            v.isMineCourse = true
          } else {
            v.isMineCourse = false
          }
        }
        //课程审核状态更新
        if (v3.state) {
          v.state = v3.state
        } if(v3._id){
          v._id = v3._id
        }
      }
    })
    v.id = num++;
  })
  let otherCourse = {
    value: jaAllCourse.list.length,
    id: 'othercourse',
    name: '其他课程',
    children: nList
  }
  allCourse.push(otherCourse)
  //处理其他课程end------------------------------------------------------------------------------

  //end

  return {
    engAllCourse,
    jaAllCourse,
    otherAllCourse,
    allCourseMess,
    schoolDetail,
    allCourse,
    UserCourseMess,
    currentOpenid: wxContext.OPENID,
    courseFrontImgArray
  }
}
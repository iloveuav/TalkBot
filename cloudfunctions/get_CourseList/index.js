// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'talkbot-56sn5'
})
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
// 云函数入口函数

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var testCourseContents = await db.collection('testCourseContents').aggregate()
    .group({
      // 按 category 字段分组
      _id: {
        courseUUid: '$courseUUid',
        className: '$className',
        chapterName: '$chapterName',
      },
      courseNum: $.sum(1),
      courseId: $.first('$courseUUid'),
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

  var allCourseBaseMess = await db.collection('allCourseBaseMess')
    .get()

  var tempUserCourseMess = await db.collection('user-info').where({
    openid: wxContext.OPENID
  }).get()
  var UserCourseMess = tempUserCourseMess.data

  allCourse = []

  allCourseBaseMess.data.forEach(item => {
    testCourseContents.list.forEach(mess => {
      if (item.courseUUid === mess._id.courseUUid) {
        item.courseNum = mess.courseNum
      }
    })

    if (item.createrOpenid === wxContext.OPENID) {
      item.isMineCourse = true
    } else {
      item.isMineCourse = false
    }
  });

  allCourse = allCourseBaseMess




  return {
    testCourseContents,
    allCourseBaseMess,
    schoolDetail,
    allCourse,
    UserCourseMess,
    currentOpenid: wxContext.OPENID,

  }
}
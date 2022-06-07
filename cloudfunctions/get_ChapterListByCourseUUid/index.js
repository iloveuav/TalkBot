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
        chapterId: '$chapterId',
      },
      courseNum: $.sum(1),
      courseId: $.first('$courseUUid'),
    })
    .end()



  var tempUserCourseMess = await db.collection('user-info').where({
    openid: wxContext.OPENID
  }).get()
  var UserCourseMess = tempUserCourseMess.data

  allChapterList = []


    testCourseContents.list.forEach(mess => {
      if (event.CourseUUid === mess._id.courseUUid) {
        allChapterList.push(mess)
      }
    })





  return {
    testCourseContents,
    allChapterList,
    UserCourseMess,
    currentOpenid: wxContext.OPENID,
    courseUUid:event.CourseUUid

  }
}
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

  var userCourseMess = await db.collection('allUser')
    .get()

  return {
    engAllCourse,
    jaAllCourse,
    otherAllCourse,
    allCourseMess,
    schoolDetail
  }
}
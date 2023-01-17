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

  if (event.type === 'course') {
    Collection = 'testCourseContents'
  } else if (event.type === 'narrate') {
    Collection = 'testNarrateContents'
  }

  var testCourseContents = await db.collection(Collection).aggregate()
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
      // chapterName:'$chapterName',
      // chapterId: '$chapterId',
    })
    .end()



  var tempUserCourseMess = await db.collection('user-info').where({
    openid: wxContext.OPENID
  }).get()
  var UserCourseMess = tempUserCourseMess.data

  allChapterList = []


  testCourseContents.list.forEach(mess => {
    if (event.courseUUid === mess._id.courseUUid) {
      allChapterList.push(mess)
    }
  })





  return {
    testCourseContents,
    allChapterList,
    UserCourseMess,
    currentOpenid: wxContext.OPENID,
    courseUUid: event.courseUUid

  }
}
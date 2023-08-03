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
  let contentCollection = 'testCourseContents'
  let baseMessCollection = 'allCourseBaseMess'
  if (event.pageType && event.pageType === 'studyPage' || event.pageType === 'mineCoursePage') {
    contentCollection = 'testCourseContents'
    baseMessCollection = 'allCourseBaseMess'
  }

  if (event.pageType && event.pageType === 'publicPage' || event.pageType === 'mineNarratePage') {
    contentCollection = 'NarrateContents'
    baseMessCollection = 'allNarrateBaseMess'
  }

  var testCourseContents = await db.collection(contentCollection).aggregate()
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

  var allCourseBaseMess = await db.collection(baseMessCollection)
    .get()

  var tempUserCourseMess = await db.collection('user-info').where({
    openid: wxContext.OPENID
  }).get()

  var curUserCollectCourse = await db.collection('userCourseCollect').where({
    _openid: wxContext.OPENID
  }).get()
  var UserCourseMess = tempUserCourseMess.data


  allCourse = []

  allCourseBaseMess.data.forEach(item => {
    testCourseContents.list.forEach(mess => {
      if (item.courseUUid === mess._id.courseUUid) {
        item.courseNum = mess.courseNum
      }
    })

    curUserCollectCourse.data.forEach(record => {
      if (item.courseUUid === record.courseUUid) {//标记为用户收藏
        item.userCollectedFlag = true
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

    curUserCollectCourse

  }
}
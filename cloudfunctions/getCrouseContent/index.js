// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'bot-cloud1-7g30ztcr37ed0193'
})
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  // wxContext.OPENID
  var classContent = await db.collection(event.classCollection)
    .where({
      courseUUid: event.courseUUid,
        chapterId: event.chapterId,
    })
    .get()

    // let CurrentChapter = {
      //   courseUUid: crouseDetail.courseUUid,
      //   courseName: crouseDetail.courseName,
      //   chapterId: ChapterId,
      //   reset: false
      // }

  return {
    // event,
    classContent:classContent,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  }
}
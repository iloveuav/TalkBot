// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'bot-cloud1-7g30ztcr37ed0193'
})
const db = cloud.database()
const _ = db.command
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  try {
    await db.collection(event.classCollection).where({
      courseUUid: event.courseUUid,
    }).remove()
  } catch (e) {
    console.error(e)
  }

  try {
    await db.collection('allCourseBaseMess').where({
      courseUUid: event.courseUUid,
    }).remove()
  } catch (e) {
    console.error(e)
  }

  return {
    event
  }
}
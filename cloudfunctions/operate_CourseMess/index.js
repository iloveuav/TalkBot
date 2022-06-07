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

  try {
    return db.collection('allCourseBaseMess').where({
      courseUUid: event.courseMess.courseUUid,
    }).count()
      .then(res => {
        console.log('count', res)
        if (res.total <= 0) {
          return db.collection('allCourseBaseMess').add({
            data: {
              courseName: event.courseMess.courseName,
              courseUUid: event.courseMess.courseUUid,
              courseFrontImgUrl: event.courseMess.courseFrontImgUrl,
              courseIntroduce: event.courseMess.courseIntroduce,
              courseType: event.courseMess.courseType,
              creatTime: event.courseMess.creatTime,
              createrOpenid: wxContext.OPENID,
              state: '待审核'
            }
          })
        } else {
          return db.collection('allCourseBaseMess').where({
            courseUUid: event.courseMess.courseUUid
          }).update({
            data: {
              courseName: event.courseMess.courseName,
              courseFrontImgUrl: event.courseMess.courseFrontImgUrl,
              courseIntroduce: event.courseMess.courseIntroduce,
              courseType: event.courseMess.courseType,
              creatTime: event.courseMess.creatTime,
              state: event.courseMess.state || '待审核',
              createrOpenid: wxContext.OPENID,
            },
          })
        }
      })

  } catch (e) {
    console.error(e)
  }


}
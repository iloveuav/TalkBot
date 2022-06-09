// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'huixue-3g4h1ydg1dedcaf3'
})
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const params = {
    courseName: event.courseMess.name,
    courseMess: event.courseMess,
    createrOpenid: wxContext.OPENID,
  }
  try {
    return db.collection('allCourseMess').where({
      courseName: event.courseMess.name
    }).count()
      .then(res => {
        console.log('count', res)
        if (res.total <= 0) {
          return db.collection('allCourseMess').add({
            data: {
              ...params,
              state: '待审核'
            }
          })
        } else {
          if (event.state) {
            params = { ...params, state: event.state }
          }
          return db.collection('allCourseMess').where({
            courseName: event.courseMess.name
          }).update({
            data: {
              ...params
            },
          })
        }
      })

  } catch (e) {
    console.error(e)
  }


}
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

  let Collection = 'allCourseBaseMess'
  if (event.type === 'course') {
    Collection = 'allCourseBaseMess'
  } else if (event.type === 'narrate') {
    Collection = 'allNarrateBaseMess'
  }


  if (event.mode === 'like') {
    try {
      return db.collection(Collection).where({
        courseUUid: event.courseMess.courseUUid,
      }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            return {

            }
          } else {
            return db.collection(Collection).where({
              courseUUid: event.courseMess.courseUUid
            }).update({
              data: {
                like: event.like
              },
            })
          }
        })

    } catch (e) {
      console.error(e)
    }
  }

  if (event.mode === 'operateDetail') {
    try {
      return db.collection(Collection).where({
        courseUUid: event.courseMess.courseUUid,
      }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            return db.collection(Collection).add({
              data: {
                courseName: event.courseMess.courseName,
                courseUUid: event.courseMess.courseUUid,
                courseFrontImgUrl: event.courseMess.courseFrontImgUrl,
                courseIntroduce: event.courseMess.courseIntroduce,
                courseType: event.courseMess.courseType,
                creatTime: event.courseMess.creatTime,
                createrOpenid: wxContext.OPENID,
                createrInfo: event.courseMess.createrInfo,
                state: '待审核'
              }
            })
          } else {
            return db.collection(Collection).where({
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



}
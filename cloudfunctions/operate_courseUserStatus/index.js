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

  let userIsLike = false
  let userIsCollect = false

  if (event.mode == 'collect') {
    return db.collection('userCourseCollect')
      .add({
        data: {
          _openid: wxContext.OPENID,
          courseUUid: event.courseUUid
        }
      })
      .then(res => {
        return db.collection('allCourseBaseMess').where({
          courseUUid: event.courseUUid
        }).update({
          data: {
            collectCount: _.inc(1)
          }
        })
      })
      .then(res => {
        return handleSuccess(res)
      })
      .catch(err => {
        return handleErr(err)
      })
  }

  else if(event.mode == 'cancelCollect'){
    return db.collection('userCourseCollect')
      .where({
        _openid: wxContext.OPENID,
        courseUUid: event.courseUUid
      })
      .remove()
      .then(res => {
        console.log(res)
        if (res.stats.removed) {
          return db.collection('allCourseBaseMess')
            .where({
              courseUUid: event.courseUUid
            }).update({
              data: {
                collectCount: _.inc(-1)
              }
            })
        }
      })
      .then(res => {
        return handleSuccess(res)
      })
      .catch(err => {
        return handleErr(err)
      })
  }

  else if(event.mode == 'like') {
    return db.collection('userCourseLike')
      .add({
        data: {
          _openid: wxContext.OPENID,
          courseUUid: event.courseUUid
        }
      })
      .then(res => {
        return db.collection('allCourseBaseMess').where({
          courseUUid: event.courseUUid
        }).update({
          data: {
            likeCount: _.inc(1)
          }
        })
      })
      .then(res => {
        return handleSuccess(res)
      })
      .catch(err => {
        return handleErr(err)
      })
  }

  else if(event.mode == 'cancelLike'){
    return db.collection('userCourseLike')
      .where({
        _openid: wxContext.OPENID,
        courseUUid: event.courseUUid
      })
      .remove()
      .then(res => {
        console.log(res)
        if (res.stats.removed) {
          return db.collection('allCourseBaseMess')
            .where({
              courseUUid: event.courseUUid
            }).update({
              data: {
                likeCount: _.inc(-1)
              }
            })
        }
      })
      .then(res => {
        return handleSuccess(res)
      })
      .catch(err => {
        return handleErr(err)
      })
  }


  if (event.mode == 'share') {
    return db.collection('userCourseShare')
      .add({
        data: {
          _openid: wxContext.OPENID,
          courseUUid: event.courseUUid
        }
      })
      .then(res => {
        return db.collection('allCourseBaseMess').where({
          courseUUid: event.courseUUid
        }).update({
          data: {
            shareCount: _.inc(1)
          }
        })
      })
      .then(res => {
        return handleSuccess(res)
      })
      .catch(err => {
        return handleErr(err)
      })
  }


  else if(event.mode =='getStatus'){
     userIsLike = await db.collection('userCourseLike').where({
      _openid: wxContext.OPENID,
      courseUUid: event.courseUUid
    }).count()
    .then(res => {
      if (res.total > 0) {
        return true
      } else {
        return false
      }
    })
    .catch(err => {
      return handleErr(err)
    })

    userIsCollect = await db.collection('userCourseCollect').where({
      _openid: wxContext.OPENID,
      courseUUid: event.courseUUid
    }).count()
    .then(res => {
      if (res.total > 0) {
        return true
      } else {
        return false
      }
    })
    .catch(err => {
      return handleErr(err)
    })

    userIsShare = await db.collection('userCourseShare').where({
      _openid: wxContext.OPENID,
      courseUUid: event.courseUUid
    }).count()
    .then(res => {
      if (res.total > 0) {
        return true
      } else {
        return false
      }
    })
    .catch(err => {
      return handleErr(err)
    })


    return {
      userIsLike,
      userIsCollect,
      userIsShare
    }

  }


}


function handleSuccess(data = {}) {
  return {
    success: true,
    data: data
  }
}

function handleErr(err) {
  return {
    success: false,
    err: err
  }
}
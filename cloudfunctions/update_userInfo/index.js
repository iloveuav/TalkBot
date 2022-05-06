// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'talkbot-56sn5'
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.type === 'update') {
    try {
      return db.collection('user-info').where({
        openid: wxContext.OPENID
      }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            return db.collection('user-info').add({
              data: {
                openid: wxContext.openid,
                ...event.params
              }
            })
          } else {
            return db.collection('user-info').where({
              openid: wxContext.OPENID
            }).update({
              data: {
                openid: wxContext.openid,
                ...event.params
              }
            })
          }
        })
        .then(res => {
          return db.collection('user-info').where({
            openid: wxContext.OPENID
          }).get()
        })
        .then(res => {
          return handleSuccess(res.data)
        })
    } catch (err) {
      return handleErr(err)
    }
  } else {
    const data = db.collection('user-info').where({
      openid: wxContext.OPENID
    }).get()
    return { success: true, data }

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
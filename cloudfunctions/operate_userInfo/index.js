// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'bot-cloud1-7g30ztcr37ed0193'
})

const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const mess = {}
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
  } else if (event.type === 'get' || event.type === 'login') {
    let userInfo = {}
    let SystemSetting = {}

    try {
      return db.collection('user-info').where({
          openid: wxContext.OPENID
        }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            db.collection('user-info').add({
              data: {
                openid: wxContext.OPENID,
                info: event.info
              }
            })
            return {
              success: true,
              isNewUser: true
            }
          } else {
           return  db.collection('user-info').where({
              openid: wxContext.OPENID
            }).get()
          }
        })
        .then(res => {
          userInfo = res.data
         return  db.collection('SurperAdmin').where({
            objKey: 'SystemSetting'
          }).get()
        })
        .then(res => {
          SystemSetting = res.data
          return handleSuccess({userInfo,SystemSetting})
        })
    } catch (err) {
      return handleErr(err)
    }

  } else if (event.type === 'add_user_ques_record') {
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
                // UserQuesRecordArr: [],
                AIConversationsMap: {}
              }
            })
          } else {
            return db.collection('user-info').where({
              openid: wxContext.OPENID
            }).update({
              data: {
                openid: wxContext.openid,
                // UserQuesRecordArr: db.command.push([event.params.newUserQuestString]),
                AIConversationsMap: {
                  [event.params.gptConversationUUid]: db.command.push([event.params.newConversation]),
                }
                // AIConversationsArr:db.command.push([event.params.newConversation]),

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
  } else if (event.type === 'get_user_ques_record') {
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
                // UserQuesRecordArr: [],
                AIConversationsMap: {}
              }
            })
          } else {
            return db.collection('user-info').where({
              openid: wxContext.OPENID
            }).get()
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
  } else if (event.type === 'share_user_ques_record') {
    try {
      return db.collection('SurperAdmin').where({
          objKey: 'ShareConversations'
        }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            return db.collection('SurperAdmin').add({
              data: {
                objKey: 'ShareConversations',
                ShareConversationMap: {}
              }
            })
          } else {
            return db.collection('SurperAdmin').where({
              objKey: 'ShareConversations'
            }).update({
              data: {
                ShareConversationMap: {
                  [event.params.gptConversationUUid]: {
                    userInfo: event.params.userInfo,
                    conversationContent: event.params.newConversation,
                    opeanid: wxContext.OPENID,
                    state: '待审核'
                  }
                }
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
  } else if (event.type === 'get_share_user_ques_record') {
    try {
      return db.collection('SurperAdmin').where({
          objKey: 'ShareConversations'
        }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            return db.collection('SurperAdmin').add({
              data: {
                objKey: 'ShareConversations',
                ShareConversationMap: {}
              }
            })
          } else {
            return db.collection('SurperAdmin').where({
              objKey: 'ShareConversations'
            }).get()
          }
        })
        .then(res => {
          return db.collection('SurperAdmin').where({
            objKey: 'ShareConversations'
          }).get()
        })
        .then(res => {
          return handleSuccess(res.data)
        })
    } catch (err) {
      return handleErr(err)
    }
  } else if (event.type === 'get_all_VIP_secretkey_record') {
    try {
      return db.collection('SurperAdmin').where({
          objKey: 'GenerateVipKey'
        }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            return db.collection('SurperAdmin').add({
              data: {
                objKey: 'GenerateVipKey',
                GenerateVipKeysMap: {}
              }
            })
          } else {
            return db.collection('SurperAdmin').where({
              objKey: 'GenerateVipKey'
            }).get()
          }
        })
        .then(res => {
          return db.collection('SurperAdmin').where({
            objKey: 'GenerateVipKey'
          }).get()
        })
        .then(res => {
          return handleSuccess(res.data)
        })
    } catch (err) {
      return handleErr(err)
    }
  } else if (event.type === 'updateSecretKeyInfo') {
 
    const operateType = event.params.operateType; //激活或销毁 activate||destroy
    try {
      //先更新密钥状态
      await db.collection('SurperAdmin').where({
        objKey: 'GenerateVipKey'
      }).update({
        data: {
          GenerateVipKeysMap: {
            [event.params.secretKeyInfo.secretKey]: event.params.secretKeyInfo
          }
        }
      })
      if (operateType === 'activate') {
        await db.collection('user-info').where({
          openid: wxContext.OPENID
        }).update({
          data: {
            isVip: true, //激活 并记录进userSecretkeyInfoMap  并更新当前密钥info
            userSecretkeyInfoMap: {
              [event.params.secretKeyInfo.secretKey]: event.params.secretKeyInfo
            },
            curUserSecretkeyInfo: event.params.secretKeyInfo
          }
        });
        mess.sucess = "激活成功"
        return mess
      }
    
    } catch (err) {
      if (operateType === 'activate') {
        mess.sucess = "激活失败"
        return mess
      }
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
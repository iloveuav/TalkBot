// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  traceUser: true,
  env: 'talkbot-7gji40zbdf69e993'
})

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  var mess = {};
  const wxContext = cloud.getWXContext()
  var IDCard = {};


  if (event.operateType === 'updateVisitorState') {
    if (event.state == "pass") {
      try {
        await db.collection('visitorInfo').where({
          _id: event._id
        }).update({
          data: {
            state: "同意访校",
          }
        });

        mess.sucess = "修改为同意访校成功"
      } catch (e) {
        mess.sucess = "修改为同意访校失败"
      }
    } else if (event.state == "cancel") {
      try {
        await db.collection('visitorInfo').where({
          _id: event._id
        }).update({
          data: {
            state: "暂缓访校",
          }
        });

        mess.sucess = "修改为暂缓访校成功"
      } catch (e) {
        mess.sucess = "修改为暂缓访校失败"
      }
    }

  } else if (event.operateType === 'updateCourseState') {
    if (event.state == "pass") {
      try {
        await db.collection('allCourseBaseMess').where({
          _id: event._id
        }).update({
          data: {
            state: "审核通过",
          }
        });

        mess.sucess = "修改为审核通过成功"
      } catch (e) {
        mess.sucess = "修改为审核通过失败"
      }
    } else if (event.state == "repulse") {
      try {
        await db.collection('allCourseBaseMess').where({
          _id: event._id
        }).update({
          data: {
            state: "审核不通过",
          }
        });

        mess.sucess = "修改为审核不通过成功"
      } catch (e) {
        mess.sucess = "修改为审核不通过失败"
      }
    }
  } else if (event.operateType === 'updateShareConversationState') {
    if (event.state == "pass") {
      try {
        await db.collection('SurperAdmin').where({
          objKey: 'ShareConversations'
        }).update({
          data: {
            ShareConversationMap: {
              [event.gptConversationUUid]: {
                state: '审核通过'
              }
            }
          }
        })


        mess.sucess = "修改为审核通过成功"
      } catch (e) {
        mess.sucess = "修改为审核通过失败"
      }
    } else if (event.state == "repulse") {
      try {
        await db.collection('SurperAdmin').where({
          objKey: 'ShareConversations'
        }).update({
          data: {
            ShareConversationMap: {
              [event.gptConversationUUid]: {
                state: '审核不通过'
              }
            }
          }
        });

        mess.sucess = "修改为审核不通过成功"
      } catch (e) {
        mess.sucess = "修改为审核不通过失败"
      }
    }
  } else if (event.operateType === 'generateVipKey') {
    try {
      await db.collection('SurperAdmin').where({
        objKey: 'GenerateVipKey'
      }).update({
        data: {
          GenerateVipKeysMap: {
            [event.secretKey]: {
              indate: event.indate, // 有效期天数
              ActivationDate: '未激活',
              isActivation:'未激活',
              certigier: wxContext.OPENID,
              generatedTime: event.generatedTime,
              state: '有效',
              remark:event.remark,
              secretKey:event.secretKey
            }
          }
        }
      })
      mess.sucess = "VIP秘钥已生成"
    } catch (err) {
      mess.sucess = "VIP秘钥生成失败"
        }
  }
  else if (event.operateType === 'updateAdminSetting') {
    if (event.params) {
      try {

        await db.collection('SurperAdmin').where({
          objKey: 'SystemSetting'
        }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            return db.collection('SurperAdmin').add({
              data: {
                objKey: 'SystemSetting',
                ...event.params
              }
            })
          } else {
            return db.collection('SurperAdmin').where({
              objKey: 'ShareConversations'
            }).update({
              data: {
                ...event.params
              }
            })
          }
        })

        // await db.collection('SurperAdmin').where({
        //   objKey: 'SystemSetting'
        // }).update({
        //   data: {
        //     ...event.params
        //   }
        // })
        mess.sucess = "更新成功"
      } catch (e) {
        mess.sucess = "更新失败"
      }
    } 
    // else if (event.type == "updateUrlForTalk") {
    //   try {
    //     await db.collection('SurperAdmin').where({
    //       objKey: 'ShareConversations'
    //     }).update({
    //       data: {
    //         ShareConversationMap: {
    //           [event.gptConversationUUid]: {
    //             state: '审核不通过'
    //           }
    //         }
    //       }
    //     });

    //     mess.sucess = "修改为审核不通过成功"
    //   } catch (e) {
    //     mess.sucess = "修改为审核不通过失败"
    //   }
    // }
  }





  return {
    mess
  }
}


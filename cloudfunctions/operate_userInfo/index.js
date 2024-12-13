// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'talkbot-7gji40zbdf69e993'
})
const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {

  const now = new Date();
  // 可以格式化时间，例如输出为 YYYY-MM-DD HH:mm:ss 格式
  const formattedTime = now.getFullYear() + '-' +
    (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
    now.getDate().toString().padStart(2, '0') + ' ' +
    now.getHours().toString().padStart(2, '0') + ':' +
    now.getMinutes().toString().padStart(2, '0') + ':' +
    now.getSeconds().toString().padStart(2, '0');
  currentTime = formattedTime

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
            return db.collection('user-info').where({
              openid: wxContext.OPENID
            }).get()
          }
        })
        .then(res => {
          userInfo = res.data
          return db.collection('SurperAdmin').where({
            objKey: 'SystemSetting'
          }).get()
        })
        .then(res => {
          SystemSetting = res.data
          return handleSuccess({
            userInfo,
            SystemSetting
          })
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
  } else if (event.type === 'get_one_VIP_secretkey_record') {
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
          }
        })
        .then(res => {
          return db.collection('SurperAdmin').where({
            objKey: 'GenerateVipKey'
          }).get()
        })
        .then(res => {
          return handleSuccess(res.data[0].GenerateVipKeysMap[event.akey])
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
  } else if (event.type === 'get_comfyUi_jobState') {
    try {
      return db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            return db.collection('SurperAdmin').add({
              data: {
                objKey: 'forComfyUI'
              }
            })
          }
        })
        .then(res => {
          return db.collection('SurperAdmin').where({
            objKey: 'forComfyUI'
          }).get()
        })
        .then(res => {
          return handleSuccess(res.data[0][event.workspaceName])
        })
    } catch (err) {
      return handleErr(err)
    }
  } else if (event.type === 'get_allws_jobState') {
    try {
      return db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            return db.collection('SurperAdmin').add({
              data: {
                objKey: 'forComfyUI'
              }
            })
          }
        })
        .then(res => {
          return db.collection('SurperAdmin').where({
            objKey: 'forComfyUI'
          }).get()
        })
        .then(res => {
          return handleSuccess(res.data[0])
        })
    } catch (err) {
      return handleErr(err)
    }
  } else if (event.type === 'reset_workspace_jobState') {
    // const arrName = event.arrName; //数组名
    try {
      await db.collection('SurperAdmin').where({
        objKey: 'forComfyUI'
      }).update({
        data: {
          [event.workspaceName]: {
            [event.arrName]: [],
          }
        }
      })
      mess.success = "重置成功"
      return mess
    } catch (err) {
      mess.success = "重置失败" + err
      return mess
    }
  } else if (event.type === 'update_comfyUi_jobState') {

    const operateType = event.operateType; //  add||update
    try {
      if (operateType === 'add') {
        db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              ['waitToDrawArr']: db.command.push([event.JobObj]),
              lastRunTime: currentTime
            }
          }
        })
        mess.success = "新增成功"
        return mess
      } else if (operateType === 'addArr') {
        db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              ['waitToDrawArr']: db.command.push(event.JobArr),
              lastRunTime: currentTime
            }
          }
        })
        mess.success = "新增成功"
        return mess
      } else if (operateType === 'update') {
        addTargetKeyName = 'finishDrawArr'
        deleteTargetKeyName = 'waitToDrawArr'

        if (event.role === 'comfyUI') {
          addTargetKeyName = 'finishDrawArr'
          deleteTargetKeyName = 'waitToDrawArr'
        } else { //微信小程序 或者 影刀 的更新
          addTargetKeyName = 'historyDrawArr'
          deleteTargetKeyName = 'finishDrawArr'
        }

        await db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              [addTargetKeyName]: db.command.push([event.JobObj]),
              lastRunTime: currentTime
            }
          }
        })


        await db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              [deleteTargetKeyName]: db.command.pull({
                "job_id": event.JobObj.job_id
              })
            }
          }
        })
        mess.success = "更新成功"
        return mess
      } else if (operateType === 'delete') {
        // 删除任务
        await db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              ['waitToDrawArr']: db.command.pull({
                "job_id": event.JobObj.job_id
              })
            }
          }
        })
      }
    } catch (err) {
      if (operateType === 'add') {
        mess.success = "新增失败" + err
        return mess
      } else if (operateType === 'update') {
        mess.success = "更新失败" + err
        return mess
      } else if (operateType === 'delete') {
        mess.success = "删除失败" + err
        return mess
      }
    }
  } else if (event.type === 'update_workSpace_anyTask') {

    const operateType = event.operateType; //  add||update
    try {
      if (operateType === 'add' || operateType === 'reset') {
        db.collection('SurperAdmin').where({
          objKey: 'forAutoTask'
        }).update({
          data: {
            [event.workspaceName]: {
              ['waitToDoArr']: [],
              ['finishArr']: [],
              ['historyArr']: [],
              lastRunTime: currentTime
            }
          }
        })
        mess.success = "新增成功"
        return mess
      } else if (operateType === 'addArr') {
        db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              ['waitToDrawArr']: db.command.push(event.JobArr),
              lastRunTime: currentTime
            }
          }
        })
        mess.success = "新增成功"
        return mess
      } else if (operateType === 'update') {
        addTargetKeyName = 'finishDrawArr'
        deleteTargetKeyName = 'waitToDrawArr'

        if (event.role === 'comfyUI') {
          addTargetKeyName = 'finishDrawArr'
          deleteTargetKeyName = 'waitToDrawArr'
        } else { //微信小程序 或者 影刀 的更新
          addTargetKeyName = 'historyDrawArr'
          deleteTargetKeyName = 'finishDrawArr'
        }

        await db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              [addTargetKeyName]: db.command.push([event.JobObj]),
              lastRunTime: currentTime
            }
          }
        })


        await db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              [deleteTargetKeyName]: db.command.pull({
                "job_id": event.JobObj.job_id
              })
            }
          }
        })
        mess.success = "更新成功"
        return mess
      } else if (operateType === 'delete') {
        // 删除任务
        await db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              ['waitToDrawArr']: db.command.pull({
                "job_id": event.JobObj.job_id
              })
            }
          }
        })
      }
    } catch (err) {
      if (operateType === 'add') {
        mess.success = "新增失败" + err
        return mess
      } else if (operateType === 'update') {
        mess.success = "更新失败" + err
        return mess
      } else if (operateType === 'delete') {
        mess.success = "删除失败" + err
        return mess
      }
    }
  } else if (event.type === 'update_waitCheckTransfer') {

    const operateType = event.operateType; //  add||update
    try {
      if (operateType === 'add') {
        db.collection('SurperAdmin').where({
          objKey: 'forTransfer'
        }).update({
          data: {
            [event.TaskObj.videoPlatformEnName]: db.command.push(event.TaskObj),
            lastRunTime: currentTime
          }
        })
        mess.success = "新增成功"
        return mess
      } else if (operateType === 'addArr') {
        db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              ['waitToDrawArr']: db.command.push(event.JobArr),
              lastRunTime: currentTime
            }
          }
        })
        mess.success = "新增成功"
        return mess
      } else if (operateType === 'update') {
        addTargetKeyName = 'finishDrawArr'
        deleteTargetKeyName = 'waitToDrawArr'

        if (event.role === 'comfyUI') {
          addTargetKeyName = 'finishDrawArr'
          deleteTargetKeyName = 'waitToDrawArr'
        } else { //微信小程序 或者 影刀 的更新
          addTargetKeyName = 'historyDrawArr'
          deleteTargetKeyName = 'finishDrawArr'
        }

        await db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              [addTargetKeyName]: db.command.push([event.JobObj]),
              lastRunTime: currentTime
            }
          }
        })


        await db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              [deleteTargetKeyName]: db.command.pull({
                "job_id": event.JobObj.job_id
              })
            }
          }
        })
        mess.success = "更新成功"
        return mess
      } else if (operateType === 'delete') {
        // 删除任务
        await db.collection('SurperAdmin').where({
          objKey: 'forComfyUI'
        }).update({
          data: {
            [event.workspaceName]: {
              ['waitToDrawArr']: db.command.pull({
                "job_id": event.JobObj.job_id
              })
            }
          }
        })
      }
    } catch (err) {
      if (operateType === 'add') {
        mess.success = "新增失败" + err
        return mess
      } else if (operateType === 'update') {
        mess.success = "更新失败" + err
        return mess
      } else if (operateType === 'delete') {
        mess.success = "删除失败" + err
        return mess
      }
    }
  } else {
    return handleErr('无响应 请检查网络或联系管理员')
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
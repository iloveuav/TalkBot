// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()


cloud.init({
  traceUser: true,
  env: 'bot-cloud1-7g30ztcr37ed0193'
})
const db = cloud.database()
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var mess = {};
  if (event.type === 'addFeedBack') {
    await db.collection('feedBack').add({
      data: {
        text: event.text,
        number: event.number,
        useropenid: event.useropenid,
      }
    });
  } else if (event.type === 'applyVIP') {
    try {
      await db.collection('user-info').where({
        openid: wxContext.OPENID
      }).update({
        data: {
          applyVipObj: {
            text: event.text,
            number: event.number,
            applyTime: event.applyTime
          }
        }
      });
      mess.text = "申请成功"

    } catch (e) {
      mess.text = "申请失败"
    }
  } else if (event.type === 'getApplyVipList') {
    try {
      return await db.collection('user-info').where({
        applyVipObj: _.exists(true)
      }).get();
    } catch (e) {
      mess.text = "获取失败"
    }
  } else if (event.type === 'operate_apply') {
    if (event.state === 'pass') {
      try {
        await db.collection('user-info').where({
          openid: event.userOpenid
        }).update({
          data: {
            isVip: true,
            applyVipObj: {
              permanentVIP:true,
              operateTime: event.operateTime
            }
          }
        });
        mess.text = "同意操作成功"
      } catch (e) {
        mess.text = "同意操作失败"
      }
    } else if (event.state === 'repulse') {

      try {
        await db.collection('user-info').where({
          openid: wxContext.OPENID
        }).update({
          data: {
            isVip: false,
            applyVipObj: {
              permanentVIP:false,
              operateTime: event.operateTime
            }
          }
        });
        mess.text = "拒绝操作成功"
      } catch (e) {
        mess.text = "拒绝操作失败"
      }

    }
  }
  return { mess }
}


// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  traceUser: true,
  env: 'bot-cloud1-7g30ztcr37ed0193'
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
        console.log(err);
        mess.sucess = "修改为同意访校失败"
      }
    }
    else if (event.state == "cancel") {
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
        console.log(err);
        mess.sucess = "修改为暂缓访校失败"
      }
    }

  }else if(event.operateType === 'updateCourseState'){
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
        console.log(err);
        mess.sucess = "修改为审核通过失败"
      }
    }
    else if (event.state == "repulse") {
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
        console.log(err);
        mess.sucess = "修改为审核不通过失败"
      }
    }
  }





  return { mess }
}
// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  traceUser: true,
  env: 'talkbot-56sn5'
})

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  var mess = {};
  const wxContext = cloud.getWXContext()
  var IDCard = {};

  if(event.state=="pass")
  {
    try {
      await db.collection('visitorInfo').where({
       _id:event._id
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
  else if (event.state == "cancel")
  {
    try {
      await db.collection('visitorInfo').where({
        _id:event._id
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




  return { mess }
}
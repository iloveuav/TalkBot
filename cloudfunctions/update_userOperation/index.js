// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init({
  traceUser: true,
  env: 'talkbot-56sn5'
})

const db = cloud.database();
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  var mess = {}
  try{
    var result = await db.collection('visitorInfo').where({
      _id: event._id
    }).remove();
    mess.result = result
    mess.code = 0
  }
  catch(e){
    mess.err = e
    mess.code = -1
  }
  return mess
}
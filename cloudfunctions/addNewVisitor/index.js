// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'talkbot-56sn5'
})
const db = cloud.database()
const _ = db.command
cloud.init()


exports.main = async (event, context) => {
  var mess = {};
  const wxContext = cloud.getWXContext()
  try {

    await db.collection('visitorInfo').add({
      data: {
        visitData: event.visitData,
        visitorName: event.visitorName,
        visitorPhonenum: event.visitorPhonenum,
        visitorId_num: event.visitorId_num,

        ndaSignPath: event.ndaSignPath,
        visitorPhoto: event.visitorPhoto,


        VisitorInfo: event.newVisitor,
        state: event.state,
        openid: wxContext.OPENID
      }
    });

    mess.state = "上传成功"

  } catch (e) {
    console.log(err);
    mess.state = "上传失败"

  }

  return {
    mess
  }
}
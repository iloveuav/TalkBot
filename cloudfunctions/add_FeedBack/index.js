// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()


cloud.init({
  env: "bot-cloud1-7g30ztcr37ed0193"//默认环境配置，传入字符串形式的环境 ID 可以指定所有服务的默认环境，传入对象可以分别指定各个服务的默认环境
})
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  await db.collection('feedBack').add({
    data: {
      text: event.text,
      number:event.number,
      useropenid: event.useropenid,
    }
  });

}
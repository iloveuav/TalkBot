// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'talkbot-7gji40zbdf69e993'
})
const db = cloud.database();
const $ = db.command.aggregate
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var mess = {}
  let listData
  try { 
    const params = {}
    if (event.visitorName && event.visitorName !== '') {
      params['visitorName'] = event.visitorName
    }
    if (event.visitorPhonenum && event.visitorPhonenum !== '') {
      params['visitorPhonenum'] = event.visitorPhonenum
    }
    if (event.visitorTeamName && event.visitorTeamName !== '') {
      params['visitorTeamName'] = event.visitorTeamName
    }
    if (event.isWaitCheck) {
      params['state'] = '待审核'
    }
    if(event.isQueryForUser){
      params['openid'] = wxContext.OPENID
    }

    var visitorList = await db.collection('visitorInfo')
      .where(params)
      .get()
    mess.code = 0
    mess.listData = visitorList
    mess.openid = wxContext.OPENID
  }
  catch (e) {
    mess.code = -1
    mess.err = e
  }
  return mess
}
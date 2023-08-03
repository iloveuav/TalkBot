// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'bot-cloud1-7g30ztcr37ed0193'
})
const db = cloud.database();
const $ = db.command.aggregate
const _ = db.command



// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let allVisitorNumber = 0;
  let todayVisitorNumber = 0;
  let allCourseNumber = 0;
  let waitCheckCourseNumber = 0;
  let appSetting;
  var result = {}
  try {

    //顺便拿一下appSetting的值
    // await db.collection('admin').where({
    //   appSetting: true
    // }).get().then(res => {
    //   // console.log(res.total)
    //   appSetting = res
    // })

    // 获取访客相关数据
    await db.collection('visitorInfo').count().then(res => {
      // console.log(res.total)
      allVisitorNumber = res.total
    })

    await db.collection('visitorInfo').where({
      visitData: db.RegExp({
        regexp: event.today,
        //从搜索栏中获取的value作为规则进行匹配。
        options: 'i',
        //大小写不区分
      })
    }).count().then(res => {
      // console.log(res.total)
      todayVisitorNumber = res.total
    })

    // 获取课程相关数据
    await db.collection('allCourseMess').count().then(res => {
      // console.log(res.total)
      allCourseNumber = res.total
    })

    await db.collection('allCourseMess').where({
      courseState: _.neq('审核通过')
    }).count().then(res => {
      // console.log(res.total)
      waitCheckCourseNumber = res.total
    })

  }
  catch (e) {
    console.log(e)
  }
  result = {
    allVisitorNumber,
    todayVisitorNumber,
    allCourseNumber,
    waitCheckCourseNumber,
    appSetting,
    test: 1,
  }
  return result
}
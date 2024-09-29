// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  traceUser: true,
  env: 'talkbot-7gji40zbdf69e993'
})
const db = cloud.database()
const _ = db.command
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  let Collection = 'allCourseBaseMess'
  // if (event.type === 'course') {
  //   Collection = 'allCourseBaseMess'
  // } else if (event.type === 'narrate') {
  //   Collection = 'allNarrateBaseMess'
  // }

  const wxContext = cloud.getWXContext()
  let sucess = {
    state: '200'
  }

  if (event.mode == 'delete') {
    try {
      return db.collection(Collection).where({
          courseUUid: event.courseUUid,
        }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            return;
          } else {
            return db.collection(Collection).where({
              courseUUid: event.courseUUid
            }).update({
              data: {
                ChapterContentMap: {
                  [event.curChapterName]: {
                    contentType: null,
                  }
                }
              },
            })
          }
        })

    } catch (e) {
      console.error(e)
    }
    // 之前
    // if (event.edit_id) {
    //   await db.collection(event.classCollection).where({
    //     _id: event.edit_id
    //   }).remove()
    // }
  } else {
    // if (event.edit_id) {

    try {
      return db.collection(Collection).where({
          courseUUid: event.courseUUid,
        }).count()
        .then(res => {
          console.log('count', res)
          if (res.total <= 0) {
            return;
          } else {
            return db.collection(Collection).where({
              courseUUid: event.courseUUid
            }).update({
              data: {
                ChapterContentMap: {
                  [event.curChapterName]: {
                    contentType: 'line',
                    lineArr: event.ChapterContent,
                    // lineArr: db.command.push(event.ChapterContent),
                  }
                }
              },
            })
          }
        })

    } catch (e) {
      console.error(e)
    }
  }
  // }




  return {
    sucess
  }
}
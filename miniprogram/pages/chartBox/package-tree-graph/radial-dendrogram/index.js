import F6 from '@antv/f6-wx';
import TreeGraph from '@antv/f6-wx/extends/graph/treeGraph';

import data from './data';
var app = getApp();
/**
 * 生态辐射树
 */

Page({
  canvas: null,
  ctx: null,
  renderer: '', // mini、mini-native等，F6需要，标记环境
  isCanvasInit: false, // canvas是否准备好了
  graph: null,

  data: {
    width: 375,
    height: 600,
    pixelRatio: 1,
    forceMini: false,
  },

  onLoad() {
    // 注册自定义树，节点等
    F6.registerGraph('TreeGraph', TreeGraph);

    // 同步获取window的宽高
    const { windowWidth, windowHeight, pixelRatio } = wx.getSystemInfoSync();

    this.setData({
      width: windowWidth,
      height: windowHeight,
      pixelRatio,
    });
  },

  /**
   * 初始化cnavas回调，缓存获得的context
   * @param {*} ctx 绘图context
   * @param {*} rect 宽高信息
   * @param {*} canvas canvas对象，在render为mini时为null
   * @param {*} renderer 使用canvas 1.0还是canvas 2.0，mini | mini-native
   */
  handleInit(event) {
    const { ctx, canvas, renderer } = event.detail;
    this.isCanvasInit = true;
    this.ctx = ctx;
    this.renderer = renderer;
    this.canvas = canvas;
    this.updateChart();
  },

  /**
   * canvas派发的事件，转派给graph实例
   */
  handleTouch(e) {
    this.graph && this.graph.emitEvent(e.detail);
  },

  updateChart() {
    const { width, height, pixelRatio } = this.data;

    // 创建F6实例
    this.graph = new F6.TreeGraph({
      context: this.ctx,
      renderer: this.renderer,
      width,
      height,
      linkCenter: true,
      pixelRatio,
      fitView: true,
      modes: {
        default: [
          {
            type: 'collapse-expand',
            onChange: function onChange(item, collapsed) {
              const model = item.getModel();
              model.collapsed = collapsed;
              return true;
            },
          },
          'drag-canvas',
          'zoom-canvas',
        ],
      },
      defaultNode: {
        size: 26,
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR',
        nodeSep: 20,
        rankSep: 100,
        radial: true,
      },
    });

    this.graph.node((node) => {
      return {
        label: node.id,
      };
    });

    if(app.globalData.CurrentChartCode){
      this.graph.data(app.globalData.CurrentChartCode);
    }else{
      this.graph.data(data);
    }
    this.graph.render();
    this.graph.fitView();
  },

  onUnload() {
    this.graph && this.graph.destroy();
  },

    /**
 * @description: canvas生成图片
 *               生成图片后存入本地，一天缓存；用户如果点击过保存图片则自动保存；
 *               如果已经有过当天的环境图片路径，则直接保存
 * @return {*}
 */
saveImg() {
  wx.showLoading({
    title: '保存中',
  })

  let that = this

  const dpr = wx.getSystemInfoSync().pixelRatio

  const model_width = wx.getSystemInfoSync().screenWidth;
  const model_height = wx.getSystemInfoSync().screenHeight;
  const canvas_width = 600;
  const canvas_height = 1000;


  // posterPath 是临时图片的地址，如果已经有过地址，直接保存即可；没有再调用api生成临时地址
  if (!this.data.posterPath) {
    // canvas生成图片
    wx.canvasToTempFilePath({
      // 由于我canvas标签直接设置了2D，所以直接将节点传过去即可。
      canvas: this.canvas,
      width: canvas_width,
      height: canvas_height,
      // 输出的宽高设置了4倍，一定程度上解决了canvas模糊的问题
      destWidth: model_width * dpr * 4,
      destHeight: (model_width * dpr * 4) * (canvas_height / canvas_width),
      fileType: 'png',
      success: (res) => {
        if (res) {
          that.setData({
            posterPath: res.tempFilePath,
            canvasSign: true
          })
          // 将生成的图片临时地址保存到storage中
          let pathArr = [res.tempFilePath]
          wx.setStorageSync('punchPoster_cl', pathArr)

          that.downImg(res.tempFilePath)
        }

        // 图片未生成之前用户点击过“保存图片”按钮，则图片生成后自动下载到本地
        if (that.data.userSaved) {
          that.downImg(res.tempFilePath)
        }
        
      },
      fail: (err) => {
        console.log(err, 'err--canvasToTempFilePath');
      }
    })
  } else {
    // 下载图片到本地
    that.downImg(that.data.posterPath)
  }
},


/**
* @description: 保存canvas生成的图片，将部分变量恢复初始值
* @param {string} path
* @return {*}
*/
downImg(path) {
  let that = this
  wx.saveImageToPhotosAlbum({
    filePath: path,
    success: (res) => {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1000
      })
      that.setData({
        saveSign: true // 用户保存图片成功标识
      })
    },
    fail: (err) => {
      wx.showToast({
        title: '保存失败',
        icon: 'none',
        duration: 2000
      })
    },
    complete: (res) => {
      // 将部分状态标识给初始化
      that.setData({
        userSaved: false,
        haveSaved: false
      })
    }
  })
}

});

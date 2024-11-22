import F6 from '@antv/f6-wx';
import TreeGraph from '@antv/f6-wx/extends/graph/treeGraph';
import util from '../../../utils/util'
import cookies from 'weapp-cookie'

// const json2Form = require("../../utils/util").json2Form
const json2Form = require("../../../utils/util").json2Form


var app = getApp();
Page({
  canvas: null,
  ctx: null, // 延迟获取的2d context
  renderer: '', // mini、mini-native等，F6需要，标记环境
  isCanvasInit: false, // canvas是否准备好了
  graph: null,

  data: {
    width: 375,
    height: 600,
    pixelRatio: 2,
    forceMini: false,
    tagList1: [
      { label: '自动补充', value: '思维导图的内容要帮我进行扩展补充,', choose: false },
      { label: '内容精简', value: '内容不要太多，尽量帮我精简', choose: false },
      { label: '多点细节', value: '内容要尽可能多一点，细节不要遗漏', choose: false },
      // { label: '总结概要', value: '同时生成总结概要的句子数组 数组格式 SStart[这是一句总结概要，这是第二句总结概要]SSEnd', choose: false },

    ],
    tagList2: [
      { label: '生态树', value: 2, choose: false },
      { label: '生态辐射树', value: 3, choose: false },
      { label: '决策树', value: 4, choose: false },
      { label: '知识图谱', value: 4, choose: false },
      { label: '甜甜圈转账图', value: 4, choose: false },
      { label: '缩进树-文件系统', value: 4, choose: false },
      { label: '缩进树-顶部对齐', value: 4, choose: false },
      { label: '缩进树-子节点两侧分布', value: 4, choose: false },
      { label: '流程图', value: 4, choose: false },
    ],
    tagList3: [
      // { label: '底部缩放轴', value: 2, choose: false },
      // { label: '迷你地图', value: 3, choose: false },
      // { label: '下载按钮', value: 4, choose: false },
    ],


    // 表单
    generateChart: 'no',
    editMindMapObject: {},
    selectChartPath: '',//当前选择的图表

    curGenerateChartCategoryKey: '',
    lastGenerateChartCategoryKey: '',

    chartFormatMap: {
      zstp_fs: `{
        "id": "root",
        "children": [
          {
            "id": "a",
            "children": [
              { "id": "a1" }
            ]
          },
          {
            "id": "b",
            "children": [
              {
                "id": "b1",
                "children": [
                  { "id": "b11" },
                  { "id": "b12" }
                ]
              },
              {
                "id": "b2"
              }
            ]
          }
        ]
      }`,



      sj: `{
        "id": "root",
        "name": "category",
        "children": [
          {
            "id": "a",
            "name": "category1",
            "children": []
          },
          {
            "id": "b",
            "name": "category2",
            "children": [
              {
                "id": "b1",
                "name": "category2-1",
                "children": [
                  { "id": "b11"，"name": "category2-1-1", "children": []},
                  { "id": "b12"，"name": "category2-1-2", "children": []}
                ],
              }
            ],
          }
        ],
      }`,

      lc: `{
        "nodes": [
          {
          "id": "0",
          "label": "0"
        },
        {
          "id": "1",
          "label": "1"
        }
      ],
        "edges":[{
          "source": "0",
          "target": "1"
        }]
      }MARKER2`,
    },


    category: [{
      name: '知识图谱',
      icon: '/images/antv_icon/dendrogram.png'
    }, {
      name: '缩进类',
      icon: '/images/antv_icon/indent.png'
    }, {
      name: '辐射类',
      icon: '/images/antv_icon/radial.png'
    }, {
      name: '流程类',
      icon: '/images/antv_icon/dagre.png'
    }],


    multiChartArrayArray: [

      [
        {
          name: '知识图谱',
          intro: '普通',
          value: 'zstp',
          icon: '/images/antv_icon/dendrogram.png',
          path: '../chartBox/package-tree-graph/basic-dendrogram/index',
          formatKey: 'zstp_fs',//控制数据格式
          categorykey: 'zstp_fs'//控制类别辨别 点击查看时要校验 不是同一类的需要点击重新生成按钮
        },
        {
          name: '脑图树',
          intro: '子节点自动两侧分布',
          value: 'zstp',
          icon: '/images/antv_icon/dendrogram.png',
          path: '../chartBox/package-tree-graph/mind-map/index',
          formatKey: 'zstp_fs',
          categorykey: 'zstp_fs'
        },
        {
          name: '生态树',
          intro: '自上而下',
          value: 'zstp',
          icon: '/images/antv_icon/dendrogram.png',
          path: '../chartBox/package-tree-graph/tb-dendrogram/index',
          formatKey: 'zstp_fs',
          categorykey: 'zstp_fs'
        },

      ],

      [
        {
          name: '缩进树',
          intro: '文件系统',
          value: 'wjxt',
          icon: '/images/antv_icon/indent.png',
          path: '../chartBox/package-tree-graph/file-system/index',
          formatKey: 'sj',
          categorykey: 'sj'
        },
        {
          name: '缩进树',
          intro: '顶部对齐',
          value: 'wjxt',
          icon: '/images/antv_icon/indent.png',
          path: '../chartBox/package-tree-graph/intend-align-top/index',
          formatKey: 'sj',
          categorykey: 'sj'
        },
        {
          name: '缩进树',
          intro: '子节点两侧分布',
          value: 'wjxt',
          icon: '/images/antv_icon/indent.png',
          path: '../chartBox/package-tree-graph/h-intended/index',
          formatKey: 'sj',
          categorykey: 'sj'
        },

      ],

      [
        {
          name: '生态辐射树',
          intro: '普通',
          value: 'stfss',
          icon: '/images/antv_icon/radial.png',
          path: '../chartBox/package-tree-graph/radial-dendrogram/index',
          formatKey: 'zstp_fs',
          categorykey: 'zstp_fs'
        },
        {
          name: '辐射树',
          intro: '紧凑',
          value: 'stfss',
          icon: '/images/antv_icon/radial.png',
          path: '../chartBox/package-tree-graph/radial-compact-box/index',
          formatKey: 'zstp_fs',
          categorykey: 'zstp_fs'
        },
        // {
        //   name: '辐射布局图',
        //   intro: '节点不重叠',
        //   value: 'stfss',
        //   icon: '../../images/antv_icon/radial.png',
        //   path:'../chartBox/package-tree-graph/file-system/index',
        // },

      ],

      [
        {
          name: '流程图',
          intro: '普通',
          value: 'lct',
          icon: '/images/antv_icon/dagre.png',
          path: '../chartBox/package-general-graph/basic-dagre/index',
          formatKey: 'lc',
          categorykey: 'lc'
        },
        {
          name: '流程图',
          intro: '带自动框选',
          value: 'lct',
          icon: '/images/antv_icon/dagre.png',
          path: '../chartBox/package-general-graph/dagre-combo/index',
          formatKey: 'lc',
          categorykey: 'lc'
        },
        {
          name: '流程图',
          intro: '自左向右',
          value: 'lct',
          icon: '/images/antv_icon/dagre.png',
          path: '../chartBox/package-general-graph/dagre/index',
          formatKey: 'lc',
          categorykey: 'lc'
        },
        {
          name: '流程图',
          intro: '自左向右且对齐',
          value: 'lct',
          icon: '/images/antv_icon/dagre.png',
          path: '../chartBox/package-general-graph/dagre-UL/index',
          formatKey: 'lc',
          categorykey: 'lc'
        }
      ]
    ],
  },

  onLoad() {
    // 注册自定义树，节点等
    F6.registerGraph('TreeGraph', TreeGraph);
    // 同步获取window的宽高
    const { windowWidth, windowHeight, pixelRatio } = wx.getSystemInfoSync();

    this.setData({
      width: windowWidth * pixelRatio,
      height: windowHeight * pixelRatio,
      pixelRatio,
      generateChart: 'no',

      //默认选中一个图
      categoryCur: 0,
      chartIndexCur: 0,
      curChartArray: this.data.multiChartArrayArray[0],


      curGenerateChartCategoryKey: '',
      lastGenerateChartCategoryKey: '',
    });

    // this.handleResultConvertToChart('test')
    // this.formatCodeStringToJsonCodeString('1');

  },

  /**
   * 初始化canvas回调，缓存获得的context
   * @param {*} ctx 绘图context
   * @param {*} rect 宽高信息
   * @param {*} canvas canvas对象，在render为mini时为null
   * @param {*} renderer 使用canvas 1.0还是canvas 2.0，mini | mini-native
   */
  handleInit(event) {
    const { ctx, rect, canvas, renderer } = event.detail;
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
      pixelRatio,
      fitView: true,
      modes: {
        default: [
          {
            type: 'collapse-expand', // 点击后展开/收缩
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
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        type: 'cubic-horizontal',
      },
      layout: {
        type: 'compactBox',
        direction: 'LR',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
      },
    });

    this.graph.node(function (node) {
      return {
        label: node.id,
        labelCfg: {
          offset: 10,
          position: node.children && node.children.length > 0 ? 'left' : 'right',
        },
      };
    });

    const data = {
      // 点集
      nodes: [
        {
          id: 'node1', // String，该节点存在则必须，节点的唯一标识
          x: 100, // Number，可选，节点位置的 x 值
          y: 200, // Number，可选，节点位置的 y 值
        },
        {
          id: 'node2', // String，该节点存在则必须，节点的唯一标识
          x: 300, // Number，可选，节点位置的 x 值
          y: 200, // Number，可选，节点位置的 y 值
        },
      ],
      // 边集
      edges: [
        {
          source: 'node1', // String，必须，起始点 id
          target: 'node2', // String，必须，目标点 id
        },
      ],
    };

    this.graph.data(data);
    this.graph.render();
    this.graph.fitView();
  },



  swiperCategoryChange: function (e) {
    console.log(e)
    const curChartArray = this.data.multiChartArrayArray[e.detail.current]

    this.setData({
      //类别变更
      categoryCur: e.detail.current,
      curChartArray: curChartArray,

      //类别下 图表重新选中新类别下的第一个
      // chartIndexCur: 0,
      // selectChartPath: curChartArray[0].path,
    })

    this.swiperChartChange({ detail: { current: 0 } })


  },

  swiperChartChange: function (e) {
    console.log('role', this.data.curChartArray[e.detail.current])
    // const roleObj = this.data.curChartArray[e.detail.current]
    setTimeout(() => {
      this.setData({
        chartIndexCur: e.detail.current,
        selectChartPath: this.data.curChartArray[e.detail.current].path,
        curGenerateChartCategoryKey: this.data.curChartArray[e.detail.current].categorykey
      })
    }, 300);

  },




  // 关于表单的change方法
  nameChange: function (e) {
    // this.data.courseName = e.detail.value
    this.data.editMindMapObject.MindMapName = e.detail.value
  },

  mindMapContentChange: function (e) {
    // this.data.courseName = e.detail.value
    this.data.editMindMapObject.mindMapContent = e.detail.value
  },

  //内容控制多选Change
  ContentControlhandleChoose(e) {
    const { index, choose } = e.target.dataset;
    const str = `tagList1[${index}].choose`
    const chooseList = this.data.tagList1.filter(item => item.choose);
    // if (chooseList.length >= 3 && !choose) return;
    this.setData({
      [str]: !choose
    })
  },

  viewControlhandleChoose(e) {
    const { index, choose } = e.target.dataset;
    const str = `tagList3[${index}].choose`
    const chooseList = this.data.tagList3.filter(item => item.choose);
    // if (chooseList.length >= 3 && !choose) return;
    this.setData({
      [str]: !choose
    })
  },


  startGetChartCode() {
    console.log(this.data.editMindMapObject) //MindMapName 
    // this.data.chartIndexCur 当前选中的图表类型 
    // this.data.tagList1   内容控制数组
    // this.data.tagList3   图表视图控制数组

    //更新
    const chartIndexCur = this.data.chartIndexCur
    const lastGenerateChartCategoryKey = this.data.curGenerateChartCategoryKey
    console.log("this.data.curChartArray[chartIndexCur].categorykey", this.data.curChartArray[chartIndexCur].categorykey)
    setTimeout(() => {
      this.setData({
        curGenerateChartCategoryKey: this.data.curChartArray[chartIndexCur].categorykey,
        lastGenerateChartCategoryKey: lastGenerateChartCategoryKey || this.data.curChartArray[chartIndexCur].categorykey
      })
    }, 100);


    this.getClaudeApiBack();
  },
  toChartDetail(isAuto) {
    //isAuto为true 代表当前是生成后自动跳转 不用校验
    if (this.data.selectChartPath) {
      console.log("app.globalData.CurrentChartCode", app.globalData.CurrentChartCode)
      console.log("this.data.curGenerateChartCategoryKey", this.data.curGenerateChartCategoryKey)
      console.log("this.data.lastGenerateChartCategoryKey", this.data.lastGenerateChartCategoryKey)
      if (this.data.curGenerateChartCategoryKey != this.data.lastGenerateChartCategoryKey && this.data.lastGenerateChartCategoryKey !== '' && !isAuto) {
        wx.showModal({
          title: '提示',
          content: '图表数据格式不同 请重新生成后点击查看',
          showCancel: false
        })
        return
      } else {
        wx.navigateTo({
          //这里传值
          url: this.data.selectChartPath,
        })
      }

    } else {
      wx.navigateTo({
        //这里传值
        url: "../chartBox/package-tree-graph/basic-dendrogram/index",
      })
    }

  },

  handleDuplicateIds(json) {
    console.log("handleDuplicateIds", json)
    let idMap = new Map();

    function traverse(node) {
      console.log("traverse-node", node)
      console.log("traverse-idMap", idMap)
      if (idMap.has(node.id)) {
        let count = idMap.get(node.id);
        node.id = node.id + '-' + count;
        idMap.set(node.id, count + 1);
        // idMap.set(node.id+count + 1, 1);
      } else {
        idMap.set(node.id, 1);
      }

      if (node.children) {
        node.children.forEach(child => traverse(child));
      }
    }

    traverse(json);

    // 重要的一步,需要重新遍历,将重复id的计数清零
    idMap.clear();
    traverse(json);

    return json;
  },



  Trim(str, isGlobal) {
    let result;
    result = str.replace(/(^\s+)|(\s+$)/g, '');
    if (isGlobal.toLowerCase() == 'g') {
      result = result.replace(/\s/g, '');
    }
    return result;
  },

  //代码字符转json字符 并丢给组件更新渲染
  formatCodeStringToJsonCodeString(codeString) {

    // const testString = `{  
    //   "id": "root",  
    //   "name": "游戏开发", 
    //   "children": [
    //      {
    //        "id": "a",  
    //        "name": "构思",
    //        "children": [],  
    //      },
    //      {
    //        "id": "b",  
    //        "name": "企划",
    //        "children": [
    //          {        
    //            "id": "b1",  
    //            "name": "确定游戏内容",
    //            "children": [  
    //              { "id": "b11","name": "主线剧情", "children": []},
    //              { "id": "b12","name": "支线剧情", "children": []},
    //            ]
    //          }
    //        ]
    //      },
    //      {
    //        "id": "c",  
    //        "name": "开发",
    //        "children": []
    //      },
    //      {
    //        "id": "d",  
    //        "name": "测试",
    //        "children": []
    //      },  
    //      {
    //        "id": "e",  
    //        "name": "发布",
    //        "children": []
    //      }
    //    ] 
    //   }`

    // for (let i = 0; i <= codeString.length; i++) {
    //   if (codeString.charAt(i) === '{') {
    //     let newstring = codeString.slice(0, i + 1);
    //     const tail = codeString.slice(i + 1, codeString.length + 1);
    //     newstring = newstring + '"';
    //     codeString = newstring.concat(tail);
    //   }
    //   if (
    //     codeString.charAt(i) === ',' &&
    //     codeString.charAt(i + 1) !== '{' &&
    //     codeString.charAt(i + 1) !== ']'
    //   ) {
    //     let newstring = codeString.slice(0, i + 1);
    //     const tail = codeString.slice(i + 1, codeString.length + 1);
    //     newstring = newstring + '"';
    //     codeString = newstring.concat(tail);
    //   }

    //   if (codeString.charAt(i) === ':') {
    //     let newstring = codeString.slice(0, i);
    //     const tail = codeString.slice(i, codeString.length + 1);
    //     newstring = newstring + '"';
    //     codeString = newstring.concat(tail);
    //     i++;
    //   }
    // }




    console.log("codeString", codeString)
    let chartCodeJSON = JSON.parse(codeString);
    //除了流程图  都要检查id是否重复
    if (this.data.categoryCur !== 4) {
      chartCodeJSON = this.handleDuplicateIds(chartCodeJSON)
    }

    console.log("f-chartCodeJSON", chartCodeJSON)

    
    // app.globalData.CurrentChartCode = chartCodeJSON

    setTimeout(() => {
      app.globalData.CurrentChartCode = chartCodeJSON
      this.toChartDetail(true);
    }, 500);


    // this.$emit('updateChartOption', test);
  },


  handleResultConvertToChart(result) {
    console.log(result)
    const tempResult = `" 这里是学习俄语知识图谱,内容涵盖学习俄语各个方面:
    MARKER
    {       
     id: 'root',
     children: [        
       {            
         id: '字母',            
         children: [              
           { id: '俄语字母表' },    
           { id: '发音规则' }           
         ]        
       },        
       {            
         id: '词汇',            
         children: [              
           { id: '名词' },  
           {               
             id: '动词',               
             children: [                 
               { id: '一类动词' },                 
               { id: '二类动词' }               
             ]             
           },
           {id: '形容词'},
           {id: '数词'},
           {id: '代词'},
           {id: '副词'}
         ]        
       },  
       {            
         id: '语法',            
         children: [              
           { id: '名词性词类' },  
           { id: '动词的种类与变化'},
           {id: '句子结构'},
           {id: '句法'}
                 ]        
       },  
         {            
         id: '发音',            
         children: [              
           { id: '元音字母的发音'}, 
           { id: '辅音字母的发音' },
           {id: '音标译读'}          
         ]        
       },   
     ] 
    }
    MARKER
    扩展内容主要涉及学习俄语需要掌握的知识点,如俄语字母表、词汇、语法和发音等。请让我知道如果您需要任何补充或修改,我很乐意继续完善这个知识图谱。"`
    //先根据MARKER 提取思维导图数据
    if (result) {
      // const test = result.data
      const test = result
      // const test = tempResult.toString()
      console.log(test)

      const testmarker1 = test.indexOf('MARKER1', 0)
      const testmarker2 = test.indexOf('MARKER2', 0)
      console.log("testmarker1", testmarker1)
      console.log("testmarker2", testmarker2)
      if (testmarker1 === -1) {//无法生成图
        this.hideLoading
        wx.showModal({
          title: '提示',
          content: '系统出错，请重试',
          showCancel: false,
        })
        return;
      } else {
        // 拿到代码判断
        const chartTempCode = test.slice(testmarker1 + 7, testmarker2)
        console.log("chartTempCode1", chartTempCode)
        this.formatCodeStringToJsonCodeString(chartTempCode)
      }

    }


  },

  isJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },

  parseToJSON(str) {
    console.log("parseToJSON-str", str)
    // 检查是否是JSON格式,如果是直接返回
    if (this.isJSON(str)) return JSON.parse(str);

    // 如果不是JSON格式,则做以下处理
    str = str.trim();  // 去除字符串两边空格
    str = str.replace(/^\s*|\s*$/g, ''); // 去除每行两边空格

    // 如果字符串以{或者[开头,说明可能是对象或者数组,尝试解析
    if (str.startsWith('{') || str.startsWith('[')) {
      try {
        return JSON.parse(str);
      } catch (e) { }
    }

    // 否则按行分割,尝试构造对象或数组
    var lines = str.split('\n');
    var obj = {};  // 假定为对象
    var arr = [];  // 假定为数组
    var isArray = false;

    // 遍历每行,解析键值对或者数组元素
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      line = line.trim();

      // 如果遇到{立即构造对象
      if (line.startsWith('{')) {
        obj = {};
        isArray = false;
        continue;
      }

      // 如果遇到[立即构造数组
      if (line.startsWith('[')) {
        arr = [];
        isArray = true;
        continue;
      }

      // 对象处理
      if (!isArray) {
        var keyValue = line.split(':');
        if (keyValue.length == 2) {
          var key = keyValue[0].trim();
          var value = keyValue[1].trim();
          obj[key] = value.startsWith('{') || value.startsWith('[') ? this.parseToJSON(value) : value;
        }
      } else {  // 数组处理
        if (line) arr.push(line.startsWith('{') || line.startsWith('[') ? this.parseToJSON(line) : line);
      }
    }

    // 返回对象或数组
    return isArray ? arr : obj;
  },


  parseToArray(str) {
    var arr = [];
    var lines = str.split('\n');

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      if (line.startsWith('data:')) {
        var jsonStr = line.slice(6); // 从data:后面开始截取
        if (this.isJSON(jsonStr)) {  // 检查是否JSON
          arr.push(JSON.parse(jsonStr));  // 是的话直接push
        } else {
          jsonStr = this.parseToJSON(jsonStr); // 否则解析成JSON
          arr.push(jsonStr);
        }
      }
    }

    return arr;
  },

  test_streaming() {

    wx.showLoading({
      title: '处理中，请稍等片刻',
    })
    var that = this
    // this.data.testStreamingInterval = setInterval(() => {
    wx.requestWithCookie({
      url: 'https://claude.uavserve.online/stream_api',
      header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
        'Content-Type': 'application/json',//get 请求用这个
        // "Content-Type": "application/x-www-form-urlencoded",//post 请求用这个
        'Host': 'yierco.slack.com',
        'Cookie': 'OptanonAlertBoxClosed=2023-04-24T02:43:02.402Z; _gcl_au=1.1.1993499355.1682304182; _cs_c=1; _lc2_fpi=e00b11ac9c9b--01gyrj9b38xrbf37rjhate5rmm; __adroll_fpc=58531eb79acbcd94d1797a4fbfb2ce8b-1682304183624; __qca=P0-1709822310-1682304183175; d=xoxd-9k4xh7B0T8pAG7g4YU8BwGcgItYxrCu%2BIu2QkVum0TxeeMaKYAH8Qy1mCglxhSbbLLyPfgLkcwdlFXBmiugj%2FWjz3NY3wL5hwY%2Bb1g8%2BBjzQlf14BIXR%2BH%2BXA4p1JWa%2FuaDKlmLLPNTTaPR4isYZ2I%2BpqK%2B3neCH7iSq58cIrBdPun8DOJTQ0SijQA%3D%3D; lc=1682304321; b=.cf9fbf96487a912ff277cb5a23f19c22; utm=%7B%22utm_source%22%3A%22in-prod%22%2C%22utm_medium%22%3A%22inprod-btn_app_install-index-click%22%7D; _ga=GA1.3.1398702781.1682304183; __pdst=2ddc803c632d44a8bb045a0ca343b4db; _rdt_uuid=1682304605784.5b74fa53-92c3-4f7b-9056-df25999368e4; _gid=GA1.2.1190074337.1683561607; _fbp=fb.1.1683561617010.1712718942; shown_ssb_redirect_page=1; shown_download_ssb_modal=1; show_download_ssb_banner=1; no_download_ssb_banner=1; d-s=1683592227; PageCount=2; DriftPlaybook=B; existing_users_hp={"launched":1683622587,"launch_count":3}; x=cf9fbf96487a912ff277cb5a23f19c22.1683633784; _cs_mk_ga=0.9921918170232491_1683633788448; _cs_id=56e5d028-0318-ab39-f24d-3697a560f074.1682304182.4.1683633789.1683633789.1.1716468182797; _cs_s=1.0.0.1683635589375; _ga_QTJQME5M5D=GS1.1.1683633789.9.0.1683633789.60.0.0; _ga=GA1.1.1398702781.1682304183; _li_dcdm_c=.slack.com; OptanonConsent=isGpcEnabled=0&datestamp=Tue+May+09+2023+20%3A03%3A11+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=4a5e30d2-1aef-4ecb-b82e-489baa62e1c7&interactionCount=2&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A1&AwaitingReconsent=false&geolocation=CN%3BGD; __ar_v4=K2HN2U4VSJGOVKC2WJLQNH%3A20230424%3A3%7CKDMBLDIYHFHI5NUNKGJ4LV%3A20230424%3A5%7CQCM34G7NBZEHHATIFDIUBJ%3A20230424%3A8%7C4UHU5P4P3FESHLUMNBLWAU%3A20230424%3A8',

        // cache: true,
        // data: { message: 'hi', context: [] },
        // data:json2Form( { message: 'hi', context:[]}),

        // {message:'Hi'}

      },
      success(result) {
        console.log("test_streaming_res", result)
        var isstarted = true;
        var alltext = "";
        var isalltext = false;

        that.setData({
          // remind: true,
          isstarted: false
        })
        // if (result.data) {
        //   clearInterval(that.data.testStreamingInterval)
        // }

        var jsonArr = that.parseToArray(result.data);
        console.log("jsonArr", jsonArr)

        jsonArr.forEach(item => {
          console.log("item", item)
          console.log("alltext", alltext)
          if (item.length === 0) {
            isalltext = true;
            alltext = alltext.replace('\\\"', '\\\\\"');
            alltext = alltext.replace(/\n/g, "");
            console.log("alltext", alltext)

            that.handleResultConvertToChart(alltext)
            that.setData({
              remind: null,
              generateChart: 'ok',
              result: alltext
            })

            // contextarray.push([prompt, alltext]);
            // contextarray = contextarray.slice(-12); //只保留最近5次对话作为上下文，以免超过最大tokens限制
            clearInterval(that.data.testStreamingInterval)
            wx.hideLoading()
            return;
          }

          if (item.choices && item.choices[0].delta.hasOwnProperty("content")) {
            if (item.choices[0].delta.content === '错误' || item.choices[0].delta.content.includes("Claude cannot look up any real-time information") || item.choices[0].delta.content.includes("This request may violate our Acceptable")) {
              console.log("Error")
              // error_layer=true
              // send_post();
              return;
            }

            if (alltext == "") {
              let tempText = item.choices[0].delta.content.replace(/^\n+/, ''); //去掉回复消息中偶尔开头就存在的连续换行符

              tempText = tempText.replace(/\\n/g, '[nlll]');
              tempText = tempText.replace(/\[nlll\]/g, '');
              alltext = tempText;
            } else {
              let tempText = item.choices[0].delta.content.replace(/^\n+/, ''); //去掉回复消息中偶尔开头就存在的连续换行符
              tempText

              tempText = tempText.replace(/\\n/g, '[nlll]');
              tempText = tempText.replace(/\[nlll\]/g, '');
              alltext += tempText;
            }
          }
        })
      }
    })
    // }, 3000);
  },


  useMoonShotApi(msg) {
    this.setData({
      // remind: true,
      remind: null,
    })
    wx.showLoading({
      title: '请稍等片刻',
    })
    var that = this
    // this.data.testStreamingInterval = setInterval(() => {
    wx.request({
      method: 'POST',
      url: 'https://api.moonshot.cn/v1/chat/completions',
      data: {
        "model": "moonshot-v1-32k",
        "messages": [{
          "role": "user",
          "content": msg
        }]
        // "messages": "hi,who are you,我想了解一些海底知识"
      },
      header: {
        "Content-Type": "application/json",
        "X-Requested-With": 'XMLHttpRequest',
        "Authorization": "sk-G47fRSG91qhRyhPwMMzVtXA2EPDD6zanzkyySj3WqFzgccUh",
        'Same-Site': 'None',
      },
      success(result) {
        console.log("test_streaming_res", result)
        wx.hideLoading();
        var alltext = result.data.choices[0].message.content

        that.formatCodeStringToJsonCodeString(alltext)

        // that.handleResultConvertToChart(alltext)
        that.setData({
          // remind: true,
          isstarted: false,
          result: alltext
        })
        // that.response(result.data.choices[0].message.content);
      },
      fail: err => {
        // handle error
        that.setData({
          remind: null,
          generateChart: 'no',
        })
        wx.showModal({
          title: '提示',
          content: '获取失败 请检查网络',
          showCancel: false,
        })
        wx.hideLoading();
        return;
      },
      complete: res => {
        console.log('callFunction test result: ', res)
        that.setData({
          remind: null,
          generateChart: 'ok',
        })
        wx.hideLoading();

        // contextarray.push([prompt, alltext]);
        // contextarray = contextarray.slice(-12); //只保留最近5次对话作为上下文，以免超过最大tokens限制
        // clearInterval(that.data.testStreamingInterval)
      }
    })
    // }, 3000);
  },

  testClaudeApiByWebPy(msg) {
    var that = this
    console.log("msg", msg)
    // frontUrl = urlForTalk
    // let url = frontUrl + requestMess
    // let url = 'https://claudeapi.uavserve.online/setsession'
    // let url = 'https://claude.uavserve.online/setsession_api'
    const SystemSetting = wx.getStorageSync("SystemSetting")
    const urlForTalk = SystemSetting.urlForTalk || ''
    if (urlForTalk) {
      let url = urlForTalk
      wx.requestWithCookie({
        url: url,
        method: 'POST',
        // method: 'get',
        data: util.json2Form({ message: msg, context: [] }),
        // data: util.json2Form({ message: encodeURIComponent(msg), context: [] }),
        header: { //
          // 'Content-Type': 'application/json',//get 请求用这个
          "Content-Type": "application/x-www-form-urlencoded",//post 请求用这个
          // data: { message: encodeURIComponent(msg), context: [] },
          //  data:util.json2Form( { message: msg, context:[]}),
        },
        success: function (result) {
          console.log("yyzm-返回", result);
          if (result.data.success) {
            that.test_streaming()
          }
          // that.response(result.data);
          // that.handleResultConvertToChart(result)
          // that.setData({
          //   remind: null,
          //   generateChart: 'ok',
          //   result: result
          // })

        },
        fail: err => {
          // handle error
          that.setData({
            remind: null,
            generateChart: 'no',
          })
          wx.showModal({
            title: '提示',
            content: '获取失败 请检查网络',
            showCancel: false,
          })
          return;
        },
        complete: res => {
          console.log('callFunction test result: ', res)
          that.setData({
            remind: null,
          })
        }
      })
    } else {

      wx.showModal({
        title: '提示',
        content: '服务暂时下线',
        showCancel: false,
      })
      return;
    }

  },


  //之前的  不能并发使用的接口方案
  old_flask_claudeApi() {
    var that = this

    this.setData({
      // remind: '加载中',
      generateChart: 'generating'
    })
    const SystemSetting = wx.getStorageSync("SystemSetting")
    const urlForTalk = SystemSetting.urlForTalk || ''
    const canNotTalkMessage = SystemSetting.canNotTalkMessage || ''
    let frontUrl = ''
    if (urlForTalk) {
      frontUrl = urlForTalk
      // let url = frontUrl + requestMess
      // let url = 'https://claudeapi.uavserve.online/setsession'
      let url = 'https://claude.uavserve.online/setsession_api'
      wx.request({
        url: url,
        method: 'post',
        // method: 'post',
        header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
          // 'Content-Type': 'application/json',//get 请求用这个
          "Content-Type": "application/x-www-form-urlencoded",//post 请求用这个
          // 'Host': 'yierco.slack.com',
          // 'Cookie': 'OptanonAlertBoxClosed=2023-04-24T02:43:02.402Z; _gcl_au=1.1.1993499355.1682304182; _cs_c=1; _lc2_fpi=e00b11ac9c9b--01gyrj9b38xrbf37rjhate5rmm; __adroll_fpc=58531eb79acbcd94d1797a4fbfb2ce8b-1682304183624; __qca=P0-1709822310-1682304183175; d=xoxd-9k4xh7B0T8pAG7g4YU8BwGcgItYxrCu%2BIu2QkVum0TxeeMaKYAH8Qy1mCglxhSbbLLyPfgLkcwdlFXBmiugj%2FWjz3NY3wL5hwY%2Bb1g8%2BBjzQlf14BIXR%2BH%2BXA4p1JWa%2FuaDKlmLLPNTTaPR4isYZ2I%2BpqK%2B3neCH7iSq58cIrBdPun8DOJTQ0SijQA%3D%3D; lc=1682304321; b=.cf9fbf96487a912ff277cb5a23f19c22; utm=%7B%22utm_source%22%3A%22in-prod%22%2C%22utm_medium%22%3A%22inprod-btn_app_install-index-click%22%7D; _ga=GA1.3.1398702781.1682304183; __pdst=2ddc803c632d44a8bb045a0ca343b4db; _rdt_uuid=1682304605784.5b74fa53-92c3-4f7b-9056-df25999368e4; _gid=GA1.2.1190074337.1683561607; _fbp=fb.1.1683561617010.1712718942; shown_ssb_redirect_page=1; shown_download_ssb_modal=1; show_download_ssb_banner=1; no_download_ssb_banner=1; d-s=1683592227; PageCount=2; DriftPlaybook=B; existing_users_hp={"launched":1683622587,"launch_count":3}; x=cf9fbf96487a912ff277cb5a23f19c22.1683633784; _cs_mk_ga=0.9921918170232491_1683633788448; _cs_id=56e5d028-0318-ab39-f24d-3697a560f074.1682304182.4.1683633789.1683633789.1.1716468182797; _cs_s=1.0.0.1683635589375; _ga_QTJQME5M5D=GS1.1.1683633789.9.0.1683633789.60.0.0; _ga=GA1.1.1398702781.1682304183; _li_dcdm_c=.slack.com; OptanonConsent=isGpcEnabled=0&datestamp=Tue+May+09+2023+20%3A03%3A11+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=4a5e30d2-1aef-4ecb-b82e-489baa62e1c7&interactionCount=2&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A1&AwaitingReconsent=false&geolocation=CN%3BGD; __ar_v4=K2HN2U4VSJGOVKC2WJLQNH%3A20230424%3A3%7CKDMBLDIYHFHI5NUNKGJ4LV%3A20230424%3A5%7CQCM34G7NBZEHHATIFDIUBJ%3A20230424%3A8%7C4UHU5P4P3FESHLUMNBLWAU%3A20230424%3A8',

          cache: true,
          data: { message: 'hi', context: [] },
          // data:util.json2Form( { message: 'hi', context:[]}),

          // {message:'Hi'}

        },
        // wx.request({
        //   url: url,
        //   method: 'GET',
        //   header: { 
        //     'Content-Type': 'application/json'
        //   },

        success: function (result) {
          console.log("yyzm-返回", result);
          // that.response(result.data);
          that.handleResultConvertToChart(result)
          that.setData({
            remind: null,
            generateChart: 'ok',
            result: result
          })

        },
        fail: err => {
          // handle error
          that.setData({
            remind: null,
            generateChart: 'no',
          })
          wx.showModal({
            title: '提示',
            content: '获取失败 请检查网络',
            showCancel: false,
          })
          return;
        },
        complete: res => {
          console.log('callFunction test result: ', res)
          that.setData({
            remind: null,
          })
        }
      })

    } else {
      that.setData({
        news_input_val: '',
        remind: null,
      })
      if (canNotTalkMessage) {
        that.response(canNotTalkMessage);
      }
      else {
        that.response('服务正在维护更新中，给您带来不便十分抱歉，我们将尽快恢复，如有紧急情况请联系管理员');
      }
    }
  },

  getClaudeApiBack() {

    // var that = this
    if (this.data.editMindMapObject.MindMapName === undefined || this.data.editMindMapObject.MindMapName === '') {
      wx.showModal({
        title: '名字为空',
        content: '填写名字后重试',
        showCancel: false
      })
      return
    }
    if (this.data.editMindMapObject.mindMapContent === undefined || this.data.editMindMapObject.mindMapContent === '') {
      wx.showModal({
        title: '内容为空',
        content: '填写内容后重试',
        showCancel: false
      })
      return
    }

    this.setData({
      // remind: '加载中',
      generateChart: 'generating'
    })

    const MindMapName = this.data.editMindMapObject.MindMapName
    const mindMapContent = this.data.editMindMapObject.mindMapContent
    const chartObject = this.data.curChartArray[this.data.chartIndexCur]
    const chartName = chartObject.name
    const chartFormatMap = this.data.chartFormatMap

    let contentRequire = ''
    this.data.tagList1.forEach(e => {
      if (e.choose && e.label === '自动补充') {
        contentRequire += e.value
        contentRequire += '内容基于' + mindMapContent
      } else if (!e.choose && e.label === '自动补充') {
        contentRequire += '思维导图的内容不要帮我进行扩展补充，尽可能把我提供的内容填充到图中'
      }
      else if (e.choose) {
        contentRequire += e.value
      }
    })

    const chartViewControl = {}
    //视图控件 全局状态更新
    this.data.tagList3.forEach(e => {
      if (e.label === '底部缩放轴') {
        chartViewControl.bottomdataZoom = e.choose
      } else if (e.label === '迷你地图') {
        chartViewControl.miniMap = e.choose
      } else if (e.label === '下载按钮') {
        chartViewControl.downloadBtn = e.choose
      }
    })
    app.globalData.chartViewControl = chartViewControl

    //开始整合 requestMess  
    // eg: 我需要制作一个名为{{MindMapName}} 的 {{chartName}}，内容关于{{mindMapContent}}，要求按照如下格式返回 {{chartFormatMap[chartObject.key]}}  {{contentRequire}}

    const requestMess = `我需要制作一个${chartName}，内容是${mindMapContent}，图的数据格式严格按照如下格式${chartFormatMap[chartObject.formatKey]} ${contentRequire}    像接口数据一样返回就行，不要有任何多余的话 控制全部内容字节数在1200 避免过多内容无法一次返回 不要出现json的markdown符号 返回纯文本`
    console.log(requestMess)
    // this.testClaudeApiByWebPy(requestMess)
    this.useMoonShotApi(requestMess)
  },



})
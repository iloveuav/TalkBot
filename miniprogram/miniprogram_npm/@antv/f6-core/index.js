module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1685504765322, function(require, module, exports) {


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  registerNode: true,
  registerCombo: true,
  registerEdge: true,
  registerBehavior: true,
  BaseGlobal: true,
  AbstractGraph: true,
  Shape: true,
  Arrow: true,
  Marker: true,
  Util: true,
  AbstractLayout: true,
  AbstractEvent: true,
  Node: true,
  Edge: true,
  Hull: true,
  Combo: true
};
Object.defineProperty(exports, "AbstractGraph", {
  enumerable: true,
  get: function get() {
    return _graph.default;
  }
});
Object.defineProperty(exports, "Shape", {
  enumerable: true,
  get: function get() {
    return _element.default;
  }
});
Object.defineProperty(exports, "Arrow", {
  enumerable: true,
  get: function get() {
    return _element.Arrow;
  }
});
Object.defineProperty(exports, "Marker", {
  enumerable: true,
  get: function get() {
    return _element.Marker;
  }
});
Object.defineProperty(exports, "Util", {
  enumerable: true,
  get: function get() {
    return _util.default;
  }
});
Object.defineProperty(exports, "AbstractLayout", {
  enumerable: true,
  get: function get() {
    return _layout.default;
  }
});
Object.defineProperty(exports, "AbstractEvent", {
  enumerable: true,
  get: function get() {
    return _event.default;
  }
});
Object.defineProperty(exports, "Node", {
  enumerable: true,
  get: function get() {
    return _node.default;
  }
});
Object.defineProperty(exports, "Edge", {
  enumerable: true,
  get: function get() {
    return _edge.default;
  }
});
Object.defineProperty(exports, "Hull", {
  enumerable: true,
  get: function get() {
    return _hull.default;
  }
});
Object.defineProperty(exports, "Combo", {
  enumerable: true,
  get: function get() {
    return _combo.default;
  }
});
exports.default = exports.BaseGlobal = exports.registerBehavior = exports.registerEdge = exports.registerCombo = exports.registerNode = void 0;

var _behavior = _interopRequireDefault(require("./behavior"));

var _graph = _interopRequireDefault(require("./graph/graph"));

var _element = _interopRequireWildcard(require("./element"));

var _global = _interopRequireDefault(require("./global"));

var _util = _interopRequireDefault(require("./util"));

var _layout = _interopRequireDefault(require("./graph/controller/layout"));

var _event = _interopRequireDefault(require("./graph/controller/event"));

var _node = _interopRequireDefault(require("./item/node"));

var _edge = _interopRequireDefault(require("./item/edge"));

var _hull = _interopRequireDefault(require("./item/hull"));

var _combo = _interopRequireDefault(require("./item/combo"));

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 用于 PC 和 Mobile 端分别实现 layout 和 updateLayoutCfg 方法
var registerNode = _element.default.registerNode;
exports.registerNode = registerNode;
var registerEdge = _element.default.registerEdge;
exports.registerEdge = registerEdge;
var registerCombo = _element.default.registerCombo;
exports.registerCombo = registerCombo;
var registerBehavior = _behavior.default.registerBehavior;
exports.registerBehavior = registerBehavior;
var BaseGlobal = _global.default;
exports.BaseGlobal = BaseGlobal;
var _default = {
  version: _global.default.version,
  AbstractGraph: _graph.default,
  BaseGlobal: BaseGlobal,
  Util: _util.default,
  Shape: _element.default,
  Node: _node.default,
  Edge: _edge.default,
  Combo: _combo.default,
  Hull: _hull.default,
  registerNode: _element.default.registerNode,
  registerEdge: _element.default.registerEdge,
  registerCombo: _element.default.registerCombo,
  registerBehavior: _behavior.default.registerBehavior,
  Arrow: _element.Arrow,
  Marker: _element.Marker,
  AbstractLayout: _layout.default,
  AbstractEvent: _event.default
};
exports.default = _default;
}, function(modId) {var map = {"./behavior":1685504765323,"./graph/graph":1685504765326,"./element":1685504765349,"./global":1685504765330,"./util":1685504765363,"./graph/controller/layout":1685504765365,"./graph/controller/event":1685504765366,"./item/node":1685504765342,"./item/edge":1685504765338,"./item/hull":1685504765345,"./item/combo":1685504765343,"./types":1685504765367}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765323, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _behavior = _interopRequireDefault(require("./behavior"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _behavior.default;
exports.default = _default;
}, function(modId) { var map = {"./behavior":1685504765324}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765324, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("@antv/util");

var _behaviorOption = _interopRequireDefault(require("./behaviorOption"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Behavior =
/** @class */
function () {
  function Behavior() {}
  /**
   * 自定义 Behavior
   * @param type Behavior 名称
   * @param behavior Behavior 定义的方法集合
   */


  Behavior.registerBehavior = function (type, behavior) {
    if (!behavior) {
      throw new Error("please specify handler for this behavior: " + type);
    }

    var prototype = (0, _util.clone)(_behaviorOption.default);
    Object.assign(prototype, behavior); // eslint-disable-next-line func-names

    var base = function base(cfg) {
      var _this = this;

      Object.assign(this, this.getDefaultCfg(), cfg);
      var events = this.getEvents();
      this.events = null;
      var eventsToBind = {};

      if (events) {
        (0, _util.each)(events, function (handle, event) {
          eventsToBind[event] = (0, _util.wrapBehavior)(_this, handle);
        });
        this.events = eventsToBind;
      }
    };

    base.prototype = prototype;
    Behavior.types[type] = base;
  };

  Behavior.hasBehavior = function (type) {
    return !!Behavior.types[type];
  };

  Behavior.getBehavior = function (type) {
    return Behavior.types[type];
  }; // 所有自定义的 Behavior 的实例


  Behavior.types = {};
  return Behavior;
}();

var _default = Behavior;
exports.default = _default;
}, function(modId) { var map = {"./behaviorOption":1685504765325}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765325, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("@antv/util");

// 自定义 Behavior 时候共有的方法
var _default = {
  getDefaultCfg: function getDefaultCfg() {
    return {};
  },

  /**
   * register event handler, behavior will auto bind events
   * for example:
   * return {
   *  click: 'onClick'
   * }
   */
  getEvents: function getEvents() {
    return {};
  },
  updateCfg: function updateCfg(cfg) {
    Object.assign(this, cfg);
    return true;
  },
  shouldBegin: function shouldBegin() {
    return true;
  },
  shouldUpdate: function shouldUpdate() {
    return true;
  },
  shouldEnd: function shouldEnd() {
    return true;
  },

  /**
   * auto bind events when register behavior
   * @param graph Graph instance
   */
  bind: function bind(graph) {
    var _this = this;

    var events = this.events;
    this.graph = graph;

    if (this.type === 'drag-canvas' || this.type === 'brush-select' || this.type === 'lasso-select') {
      graph.get('canvas').set('draggable', true);
    }

    (0, _util.each)(events, function (handler, event) {
      graph.on(event, handler);
    }); // To avoid the tabs switching makes the keydown related behaviors disable

    document.addEventListener('visibilitychange', function () {
      _this.keydown = false;
    });
  },
  unbind: function unbind(graph) {
    var events = this.events;

    if (this.type === 'drag-canvas' || this.type === 'brush-select' || this.type === 'lasso-select') {
      graph.get('canvas').set('draggable', false);
    }

    (0, _util.each)(events, function (handler, event) {
      graph.off(event, handler);
    });
  },
  get: function get(val) {
    return this[val];
  },
  set: function set(key, val) {
    this[key] = val;
    return this;
  }
};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765326, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tslib = require("tslib");

var _eventEmitter = _interopRequireDefault(require("@antv/event-emitter"));

var _matrixUtil = require("@antv/matrix-util");

var _util = require("@antv/util");

var _algorithm = require("@antv/algorithm");

var _math = require("../util/math");

var _validation = require("../util/validation");

var _global = _interopRequireDefault(require("../global"));

var _controller = require("./controller");

var _graphic = require("../util/graphic");

var _hull = _interopRequireDefault(require("../item/hull"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transform = _matrixUtil.ext.transform;
var NODE = 'node';

var AbstractGraph =
/** @class */
function (_super) {
  (0, _tslib.__extends)(AbstractGraph, _super);

  function AbstractGraph(cfg) {
    var _this = _super.call(this) || this;

    _this.cfg = (0, _util.deepMix)(_this.getDefaultCfg(), cfg);

    _this.init();

    _this.animating = false;
    _this.destroyed = false; // 启用 stack 后，实例化 undoStack 和 redoStack

    if (_this.cfg.enabledStack) {
      // 实例化 undo 和 redo 栈
      _this.undoStack = new _algorithm.Stack(_this.cfg.maxStep);
      _this.redoStack = new _algorithm.Stack(_this.cfg.maxStep);
    }

    return _this;
  }

  AbstractGraph.prototype.init = function () {
    this.initCanvas(); // instance controller

    var viewController = new _controller.ViewController(this);
    var modeController = new _controller.ModeController(this);
    var itemController = new _controller.ItemController(this);
    var stateController = new _controller.StateController(this);
    this.set({
      viewController: viewController,
      modeController: modeController,
      itemController: itemController,
      stateController: stateController
    }); // 初始化布局机制

    this.initLayoutController(); // 初始化事件机制

    this.initEventController();
    this.initGroups();
    /** 初始化插件 */

    this.initPlugins();
  }; // 初始化所有 Group


  AbstractGraph.prototype.initGroups = function () {
    var canvas = this.get('canvas');
    var el = this.get('canvas').get('el');
    var id = el.id;
    var group = canvas.addGroup({
      id: id + "-root",
      className: _global.default.rootContainerClassName
    });

    if (this.get('groupByTypes')) {
      var edgeGroup = group.addGroup({
        id: id + "-edge",
        className: _global.default.edgeContainerClassName
      });
      var nodeGroup = group.addGroup({
        id: id + "-node",
        className: _global.default.nodeContainerClassName
      });
      var comboGroup = group.addGroup({
        id: id + "-combo",
        className: _global.default.comboContainerClassName
      }); // 用于存储自定义的群组

      comboGroup.toBack();
      this.set({
        nodeGroup: nodeGroup,
        edgeGroup: edgeGroup,
        comboGroup: comboGroup
      });
    }

    var delegateGroup = group.addGroup({
      id: id + "-delegate",
      className: _global.default.delegateContainerClassName
    });
    this.set({
      delegateGroup: delegateGroup
    });
    this.set('group', group);
  }; // eslint-disable-next-line class-methods-use-this


  AbstractGraph.prototype.getDefaultCfg = function () {
    return {
      /**
       * Container could be dom object or dom id
       */
      container: undefined,

      /**
       * Canvas width
       * unit pixel if undefined force fit width
       */
      width: undefined,

      /**
       * Canvas height
       * unit pixel if undefined force fit height
       */
      height: undefined,

      /**
       * renderer canvas or svg
       * @type {string}
       */
      renderer: 'canvas',

      /**
       * control graph behaviors
       */
      modes: {},

      /**
       * 注册插件
       */
      plugins: [],

      /**
       * source data
       */
      data: {},

      /**
       * Fit view padding (client scale)
       */
      fitViewPadding: 10,

      /**
       * Minimum scale size
       */
      minZoom: 0.2,

      /**
       * Maxmum scale size
       */
      maxZoom: 10,

      /**
       *  capture events
       */
      event: true,

      /**
       * group node & edges into different graphic groups
       */
      groupByTypes: true,

      /**
       * determine if it's a directed graph
       */
      directed: false,

      /**
       * when data or shape changed, should canvas draw automatically
       */
      autoPaint: true,

      /**
       * store all the node instances
       */
      nodes: [],

      /**
       * store all the edge instances
       */
      edges: [],

      /**
       * store all the combo instances
       */
      combos: [],

      /**
       * store all the edge instances which are virtual edges related to collapsed combo
       */
      vedges: [],

      /**
       * all the instances indexed by id
       */
      itemMap: {},

      /**
       * 边直接连接到节点的中心，不再考虑锚点
       */
      linkCenter: false,

      /**
       * 默认的节点配置，data 上定义的配置会覆盖这些配置。例如：
       * defaultNode: {
       *  type: 'rect',
       *  size: [60, 40],
       *  style: {
       *    //... 样式配置项
       *  }
       * }
       * 若数据项为 { id: 'node', x: 100, y: 100 }
       * 实际创建的节点模型是 { id: 'node', x: 100, y: 100， type: 'rect', size: [60, 40] }
       * 若数据项为 { id: 'node', x: 100, y: 100, type: 'circle' }
       * 实际创建的节点模型是 { id: 'node', x: 100, y: 100， type: 'circle', size: [60, 40] }
       */
      defaultNode: {},

      /**
       * 默认边配置，data 上定义的配置会覆盖这些配置。用法同 defaultNode
       */
      defaultEdge: {},

      /**
       * 节点默认样式，也可以添加状态样式
       * 例如：
       * const graph = new G6.Graph({
       *  nodeStateStyles: {
       *    selected: { fill: '#ccc', stroke: '#666' },
       *    active: { lineWidth: 2 }
       *  },
       *  ...
       * });
       *
       */
      nodeStateStyles: {},

      /**
       * 边默认样式，用法同nodeStateStyle
       */
      edgeStateStyles: {},

      /**
       * graph 状态
       */
      states: {},

      /**
       * 是否启用全局动画
       */
      animate: false,

      /**
       * 动画设置,仅在 animate 为 true 时有效
       */
      animateCfg: {
        /**
         * 帧回调函数，用于自定义节点运动路径，为空时线性运动
         */
        onFrame: undefined,

        /**
         * 动画时长(ms)
         */
        duration: 500,

        /**
         * 指定动画动效
         */
        easing: 'easeLinear'
      },
      callback: undefined,
      // 默认不启用 undo & redo 功能
      enabledStack: false,
      // 只有当 enabledStack 为 true 时才起作用
      maxStep: 10,
      // 存储图上的 tooltip dom，方便销毁
      tooltips: []
    };
  };
  /**
   * 将值设置到 this.cfg 变量上面
   * @param key 键 或 对象值
   * @param val 值
   */


  AbstractGraph.prototype.set = function (key, val) {
    if ((0, _util.isPlainObject)(key)) {
      this.cfg = (0, _tslib.__assign)((0, _tslib.__assign)({}, this.cfg), key);
    } else {
      this.cfg[key] = val;
    }

    return this;
  };
  /**
   * 获取 this.cfg 中的值
   * @param key 键
   */


  AbstractGraph.prototype.get = function (key) {
    return this.cfg[key];
  };
  /**
   * 获取 graph 的根图形分组
   * @return 根 group
   */


  AbstractGraph.prototype.getGroup = function () {
    return this.get('group');
  };
  /**
   * 获取 graph 的 DOM 容器
   * @return DOM 容器
   */


  AbstractGraph.prototype.getContainer = function () {
    return this.get('container');
  };
  /**
   * 获取 graph 的最小缩放比例
   * @return minZoom
   */


  AbstractGraph.prototype.getMinZoom = function () {
    return this.get('minZoom');
  };
  /**
   * 设置 graph 的最小缩放比例
   * @return minZoom
   */


  AbstractGraph.prototype.setMinZoom = function (ratio) {
    return this.set('minZoom', ratio);
  };
  /**
   * 获取 graph 的最大缩放比例
   * @param maxZoom
   */


  AbstractGraph.prototype.getMaxZoom = function () {
    return this.get('maxZoom');
  };
  /**
   * 设置 graph 的最大缩放比例
   * @param maxZoom
   */


  AbstractGraph.prototype.setMaxZoom = function (ratio) {
    return this.set('maxZoom', ratio);
  };
  /**
   * 获取 graph 的宽度
   * @return width
   */


  AbstractGraph.prototype.getWidth = function () {
    return this.get('width');
  };
  /**
   * 获取 graph 的高度
   * @return width
   */


  AbstractGraph.prototype.getHeight = function () {
    return this.get('height');
  };
  /**
   * 清理元素多个状态
   * @param {string|Item} item 元素id或元素实例
   * @param {string[]} states 状态
   */


  AbstractGraph.prototype.clearItemStates = function (item, states) {
    if ((0, _util.isString)(item)) {
      item = this.findById(item);
    }

    var itemController = this.get('itemController');

    if (!states) {
      states = item.get('states');
    }

    itemController.clearItemStates(item, states);
    var stateController = this.get('stateController');
    stateController.updateStates(item, states, false);
  };
  /**
   * 设置各个节点样式，以及在各种状态下节点 keyShape 的样式。
   * 若是自定义节点切在各种状态下
   * graph.node(node => {
   *  return {
   *    type: 'rect',
   *    label: node.id,
   *    style: { fill: '#666' },
   *    stateStyles: {
   *       selected: { fill: 'blue' },
   *       custom: { fill: 'green' }
   *     }
   *   }
   * });
   * @param {function} nodeFn 指定每个节点样式
   */


  AbstractGraph.prototype.node = function (nodeFn) {
    if (typeof nodeFn === 'function') {
      this.set('nodeMapper', nodeFn);
    }
  };
  /**
   * 设置各个边样式
   * @param {function} edgeFn 指定每个边的样式,用法同 node
   */


  AbstractGraph.prototype.edge = function (edgeFn) {
    if (typeof edgeFn === 'function') {
      this.set('edgeMapper', edgeFn);
    }
  };
  /**
   * 设置各个 combo 的配置
   * @param comboFn
   */


  AbstractGraph.prototype.combo = function (comboFn) {
    if (typeof comboFn === 'function') {
      this.set('comboMapper', comboFn);
    }
  };
  /**
   * 根据 ID 查询图元素实例
   * @param id 图元素 ID
   */


  AbstractGraph.prototype.findById = function (id) {
    return this.get('itemMap')[id];
  };
  /**
   * 根据对应规则查找单个元素
   * @param {ITEM_TYPE} type 元素类型(node | edge | group)
   * @param {(item: T, index: number) => T} fn 指定规则
   * @return {T} 元素实例
   */


  AbstractGraph.prototype.find = function (type, fn) {
    var result;
    var items = this.get(type + "s"); // eslint-disable-next-line consistent-return

    (0, _util.each)(items, function (item, i) {
      if (fn(item, i)) {
        result = item;
        return result;
      }
    });
    return result;
  };
  /**
   * 查找所有满足规则的元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} fn 指定规则
   * @return {array} 元素实例
   */


  AbstractGraph.prototype.findAll = function (type, fn) {
    var result = [];
    (0, _util.each)(this.get(type + "s"), function (item, i) {
      if (fn(item, i)) {
        result.push(item);
      }
    });
    return result;
  };
  /**
   * 查找所有处于指定状态的元素
   * @param {string} type 元素类型(node|edge)
   * @param {string} state 状态
   * @return {object} 元素实例
   */


  AbstractGraph.prototype.findAllByState = function (type, state) {
    return this.findAll(type, function (item) {
      return item.hasState(state);
    });
  };
  /**
   * 平移画布
   * @param dx 水平方向位移
   * @param dy 垂直方向位移
   */


  AbstractGraph.prototype.translate = function (dx, dy) {
    var group = this.get('group');
    var matrix = (0, _util.clone)(group.getMatrix());

    if (!matrix) {
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }

    matrix = transform(matrix, [['t', dx, dy]]);
    group.setMatrix(matrix);
    this.emit('viewportchange', {
      action: 'translate',
      matrix: group.getMatrix()
    });
    this.autoPaint();
  };
  /**
   * 平移画布到某点
   * @param {number} x 水平坐标
   * @param {number} y 垂直坐标
   */


  AbstractGraph.prototype.moveTo = function (x, y) {
    var group = this.get('group');
    (0, _math.move)(group, {
      x: x,
      y: y
    });
    this.emit('viewportchange', {
      action: 'move',
      matrix: group.getMatrix()
    });
  };
  /**
   * 调整视口适应视图
   * @param {object} padding 四周围边距
   */


  AbstractGraph.prototype.fitView = function (padding) {
    if (padding) {
      this.set('fitViewPadding', padding);
    }

    var viewController = this.get('viewController');
    viewController.fitView();
    this.autoPaint();
  };
  /**
   * 调整视口适应视图，不缩放，仅将图 bbox 中心对齐到画布中心
   */


  AbstractGraph.prototype.fitCenter = function () {
    var viewController = this.get('viewController');
    viewController.fitCenter();
    this.autoPaint();
  };
  /**
   * 新增行为
   * @param {string | ModeOption | ModeType[]} behaviors 添加的行为
   * @param {string | string[]} modes 添加到对应的模式
   * @return {Graph} Graph
   */


  AbstractGraph.prototype.addBehaviors = function (behaviors, modes) {
    var modeController = this.get('modeController');
    modeController.manipulateBehaviors(behaviors, modes, true);
    return this;
  };
  /**
   * 移除行为
   * @param {string | ModeOption | ModeType[]} behaviors 移除的行为
   * @param {string | string[]} modes 从指定的模式中移除
   * @return {Graph} Graph
   */


  AbstractGraph.prototype.removeBehaviors = function (behaviors, modes) {
    var modeController = this.get('modeController');
    modeController.manipulateBehaviors(behaviors, modes, false);
    return this;
  };
  /**
   * 更新行为参数
   * @param {string | ModeOption | ModeType} behavior 需要更新的行为
   * @param {string | string[]} modes 指定的模式中的行为，不指定则为 default
   * @return {Graph} Graph
   */


  AbstractGraph.prototype.updateBehavior = function (behavior, newCfg, mode) {
    var modeController = this.get('modeController');
    modeController.updateBehavior(behavior, newCfg, mode);
    return this;
  };
  /**
   * 伸缩窗口
   * @param ratio 伸缩比例
   * @param center 以center的x, y坐标为中心缩放
   */


  AbstractGraph.prototype.zoom = function (ratio, center) {
    var group = this.get('group');
    var matrix = (0, _util.clone)(group.getMatrix());
    var minZoom = this.get('minZoom');
    var maxZoom = this.get('maxZoom');

    if (!matrix) {
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }

    if (center) {
      matrix = transform(matrix, [['t', -center.x, -center.y], ['s', ratio, ratio], ['t', center.x, center.y]]);
    } else {
      matrix = transform(matrix, [['s', ratio, ratio]]);
    }

    if (minZoom && matrix[0] < minZoom || maxZoom && matrix[0] > maxZoom) {
      return;
    } // matrix = [2, 0, 0, 0, 2, 0, -125, -125, 1];


    group.setMatrix(matrix);
    this.emit('viewportchange', {
      action: 'zoom',
      matrix: matrix
    });
    this.autoPaint();
  };
  /**
   * 伸缩视口到一固定比例
   * @param {number} toRatio 伸缩比例
   * @param {Point} center 以center的x, y坐标为中心缩放
   */


  AbstractGraph.prototype.zoomTo = function (toRatio, center) {
    var ratio = toRatio / this.getZoom();
    this.zoom(ratio, center);
  };
  /**
   * 将元素移动到视口中心
   * @param {Item} item 指定元素
   * @param {boolean} animate 是否带有动画地移动
   * @param {GraphAnimateConfig} animateCfg 若带有动画，动画的配置项
   */


  AbstractGraph.prototype.focusItem = function (item, animate, animateCfg) {
    var viewController = this.get('viewController');
    var isAnimate = false;
    if (animate) isAnimate = true;else if (animate === undefined) isAnimate = this.get('animate');
    var curAniamteCfg = {};
    if (animateCfg) curAniamteCfg = animateCfg;else if (animateCfg === undefined) curAniamteCfg = this.get('animateCfg');
    viewController.focus(item, isAnimate, curAniamteCfg);
    this.autoPaint();
  };
  /**
   * 自动重绘
   * @internal 仅供内部更新机制调用，外部根据需求调用 render 或 paint 接口
   */


  AbstractGraph.prototype.autoPaint = function () {
    if (this.get('autoPaint')) {
      this.paint();
    }
  };
  /**
   * 仅画布重新绘制
   */


  AbstractGraph.prototype.paint = function () {
    this.emit('beforepaint');
    this.get('canvas').draw();
    this.emit('afterpaint');
  };
  /**
   * 将屏幕坐标转换为视口坐标
   * @param {number} clientX 屏幕x坐标
   * @param {number} clientY 屏幕y坐标
   * @return {Point} 视口坐标
   */


  AbstractGraph.prototype.getPointByClient = function (clientX, clientY) {
    var viewController = this.get('viewController');
    return viewController.getPointByClient(clientX, clientY);
  };
  /**
   * 将绘制坐标转换为屏幕坐标
   * @param {number} x 绘制坐标 x
   * @param {number} y 绘制坐标 y
   * @return {Point} 绘制坐标
   */


  AbstractGraph.prototype.getClientByPoint = function (x, y) {
    var viewController = this.get('viewController');
    return viewController.getClientByPoint(x, y);
  };
  /**
   * 将画布坐标转换为绘制坐标
   * @param {number} canvasX 画布 x 坐标
   * @param {number} canvasY 画布 y 坐标
   * @return {object} 绘制坐标
   */


  AbstractGraph.prototype.getPointByCanvas = function (canvasX, canvasY) {
    var viewController = this.get('viewController');
    return viewController.getPointByCanvas(canvasX, canvasY);
  };
  /**
   * 将绘制坐标转换为画布坐标
   * @param {number} x 绘制坐标 x
   * @param {number} y 绘制坐标 y
   * @return {object} 画布坐标
   */


  AbstractGraph.prototype.getCanvasByPoint = function (x, y) {
    var viewController = this.get('viewController');
    return viewController.getCanvasByPoint(x, y);
  };
  /**
   * 获取图内容的中心绘制坐标
   * @return {object} 中心绘制坐标
   */


  AbstractGraph.prototype.getGraphCenterPoint = function () {
    var bbox = this.get('group').getCanvasBBox();
    return {
      x: (bbox.minX + bbox.maxX) / 2,
      y: (bbox.minY + bbox.maxY) / 2
    };
  };
  /**
   * 获取视口中心绘制坐标
   * @return {object} 视口中心绘制坐标
   */


  AbstractGraph.prototype.getViewPortCenterPoint = function () {
    return this.getPointByCanvas(this.get('width') / 2, this.get('height') / 2);
  };
  /**
   * 显示元素
   * @param {Item} item 指定元素
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */


  AbstractGraph.prototype.showItem = function (item, stack) {
    if (stack === void 0) {
      stack = true;
    }

    var itemController = this.get('itemController');
    var object = itemController.changeItemVisibility(item, true);

    if (stack && this.get('enabledStack')) {
      var id = object.getID();
      var type = object.getType();
      var before = {};
      var after = {};

      switch (type) {
        case 'node':
          before.nodes = [{
            id: id,
            visible: false
          }];
          after.nodes = [{
            id: id,
            visible: true
          }];
          break;

        case 'edge':
          before.nodes = [{
            id: id,
            visible: false
          }];
          after.edges = [{
            id: id,
            visible: true
          }];
          break;

        case 'combo':
          before.nodes = [{
            id: id,
            visible: false
          }];
          after.combos = [{
            id: id,
            visible: true
          }];
          break;

        default:
          break;
      }

      this.pushStack('visible', {
        before: before,
        after: after
      });
    }
  };
  /**
   * 隐藏元素
   * @param {Item} item 指定元素
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */


  AbstractGraph.prototype.hideItem = function (item, stack) {
    if (stack === void 0) {
      stack = true;
    }

    var itemController = this.get('itemController');
    var object = itemController.changeItemVisibility(item, false);

    if (stack && this.get('enabledStack')) {
      var id = object.getID();
      var type = object.getType();
      var before = {};
      var after = {};

      switch (type) {
        case 'node':
          before.nodes = [{
            id: id,
            visible: true
          }];
          after.nodes = [{
            id: id,
            visible: false
          }];
          break;

        case 'edge':
          before.nodes = [{
            id: id,
            visible: true
          }];
          after.edges = [{
            id: id,
            visible: false
          }];
          break;

        case 'combo':
          before.nodes = [{
            id: id,
            visible: true
          }];
          after.combos = [{
            id: id,
            visible: false
          }];
          break;

        default:
          break;
      }

      this.pushStack('visible', {
        before: before,
        after: after
      });
    }
  };
  /**
   * 刷新元素
   * @param {string|object} item 元素id或元素实例
   */


  AbstractGraph.prototype.refreshItem = function (item) {
    var itemController = this.get('itemController');
    itemController.refreshItem(item);
  };
  /**
   * 设置是否在更新/刷新后自动重绘
   * @param {boolean} auto 自动重绘
   */


  AbstractGraph.prototype.setAutoPaint = function (auto) {
    var self = this;
    self.set('autoPaint', auto);
    var canvas = self.get('canvas');
    canvas.set('autoDraw', auto);
  };
  /**
   * 删除元素
   * @param {Item} item 元素id或元素实例
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */


  AbstractGraph.prototype.remove = function (item, stack) {
    if (stack === void 0) {
      stack = true;
    }

    this.removeItem(item, stack);
  };
  /**
   * 删除元素
   * @param {Item} item 元素id或元素实例
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */


  AbstractGraph.prototype.removeItem = function (item, stack) {
    if (stack === void 0) {
      stack = true;
    }

    var nodeItem = item;
    if ((0, _util.isString)(item)) nodeItem = this.findById(item);

    if (!nodeItem && (0, _util.isString)(item)) {
      console.warn('The item to be removed does not exist!');
    } else if (nodeItem) {
      var type = '';
      if (nodeItem.getType) type = nodeItem.getType(); // 将删除的元素入栈

      if (stack && this.get('enabledStack')) {
        var deletedModel = (0, _tslib.__assign)((0, _tslib.__assign)({}, nodeItem.getModel()), {
          itemType: type
        });
        var before = {};

        switch (type) {
          case 'node':
            {
              before.nodes = [deletedModel];
              before.edges = [];
              var edges = nodeItem.getEdges();

              for (var i = edges.length - 1; i >= 0; i--) {
                before.edges.push((0, _tslib.__assign)((0, _tslib.__assign)({}, edges[i].getModel()), {
                  itemType: 'edge'
                }));
              }

              break;
            }

          case 'edge':
            before.edges = [deletedModel];
            break;

          case 'combo':
            before.combos = [deletedModel];
            break;

          default:
            break;
        }

        this.pushStack('delete', {
          before: before,
          after: {}
        });
      }

      if (type === 'node') {
        var model = nodeItem.getModel(); // 如果删除的是节点，且该节点存在于某个 Combo 中，则需要先将 node 从 combo 中移除，否则删除节点后，操作 combo 会出错

        if (model.comboId) {
          this.updateComboTree(nodeItem);
        }
      }

      var itemController = this.get('itemController');
      itemController.removeItem(nodeItem);

      if (type === 'combo') {
        var newComboTrees = (0, _graphic.reconstructTree)(this.get('comboTrees'));
        this.set('comboTrees', newComboTrees);
      }
    }
  };
  /**
   * 新增元素
   * @param {ITEM_TYPE} type 元素类型(node | edge)
   * @param {ModelConfig} model 元素数据模型
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   * @param {boolean} sortCombo 本次操作是否需要更新 combo 层级顺序，内部参数，用户在外部使用 addItem 时始终时需要更新
   * @return {Item} 元素实例
   */


  AbstractGraph.prototype.addItem = function (type, model, stack, sortCombo) {
    if (stack === void 0) {
      stack = true;
    }

    if (sortCombo === void 0) {
      sortCombo = true;
    }

    var currentComboSorted = this.get('comboSorted');
    this.set('comboSorted', currentComboSorted && !sortCombo);
    var itemController = this.get('itemController'); // 添加节点、边或combo之前，先验证数据是否符合规范

    if (!(0, _validation.singleDataValidation)(type, model)) {
      return false;
    }

    if (model.id && this.findById(model.id)) {
      console.warn("This item exists already. Be sure the id %c" + model.id + "%c is unique.", 'font-size: 20px; color: red;', '');
      return;
    }

    var item;
    var comboTrees = this.get('comboTrees');
    if (!comboTrees) comboTrees = [];

    if (type === 'combo') {
      var itemMap_1 = this.get('itemMap');
      var foundParent_1 = false;
      comboTrees.forEach(function (ctree) {
        if (foundParent_1) return; // terminate the forEach after the tree containing the item is done

        (0, _graphic.traverseTreeUp)(ctree, function (child) {
          // find the parent
          if (model.parentId === child.id) {
            foundParent_1 = true;
            var newCombo = (0, _tslib.__assign)({
              id: model.id,
              depth: child.depth + 2
            }, model);
            if (child.children) child.children.push(newCombo);else child.children = [newCombo];
            model.depth = newCombo.depth;
            item = itemController.addItem(type, model);
          }

          var childItem = itemMap_1[child.id]; // after the parent is found, update all the ancestors

          if (foundParent_1 && childItem && childItem.getType && childItem.getType() === 'combo') {
            itemController.updateCombo(childItem, child.children);
          }

          return true;
        });
      }); // if the parent is not found, add it to the root

      if (!foundParent_1) {
        var newCombo = (0, _tslib.__assign)({
          id: model.id,
          depth: 0
        }, model);
        model.depth = newCombo.depth;
        comboTrees.push(newCombo);
        item = itemController.addItem(type, model);
      }

      this.set('comboTrees', comboTrees);
    } else if (type === 'node' && (0, _util.isString)(model.comboId) && comboTrees) {
      var parentCombo = this.findById(model.comboId);

      if (parentCombo && parentCombo.getType && parentCombo.getType() !== 'combo') {
        console.warn("'" + model.comboId + "' is not a id of a combo in the graph, the node will be added without combo.");
      }

      item = itemController.addItem(type, model);
      var itemMap_2 = this.get('itemMap');
      var foundParent_2 = false,
          foundNode_1 = false;
      (comboTrees || []).forEach(function (ctree) {
        if (foundNode_1 || foundParent_2) return; // terminate the forEach

        (0, _graphic.traverseTreeUp)(ctree, function (child) {
          if (child.id === model.id) {
            // if the item exists in the tree already, terminate
            foundNode_1 = true;
            return false;
          }

          if (model.comboId === child.id && !foundNode_1) {
            // found the parent, add the item to the children of its parent in the tree
            foundParent_2 = true;
            var cloneNode = (0, _util.clone)(model);
            cloneNode.itemType = 'node';
            if (child.children) child.children.push(cloneNode);else child.children = [cloneNode];
            cloneNode.depth = child.depth + 1;
          } // update the size of all the ancestors


          if (foundParent_2 && itemMap_2[child.id].getType && itemMap_2[child.id].getType() === 'combo') {
            itemController.updateCombo(itemMap_2[child.id], child.children);
          }

          return true;
        });
      });
    } else {
      item = itemController.addItem(type, model);
    }

    if (type === 'node' && model.comboId || type === 'combo' && model.parentId) {
      // add the combo to the parent's children array
      var parentCombo = this.findById(model.comboId || model.parentId);
      if (parentCombo && parentCombo.getType && parentCombo.getType() === 'combo') parentCombo.addChild(item);
    }

    var combos = this.get('combos');

    if (combos && combos.length > 0) {
      this.sortCombos();
    }

    this.autoPaint();

    if (stack && this.get('enabledStack')) {
      var addedModel = (0, _tslib.__assign)((0, _tslib.__assign)({}, item.getModel()), {
        itemType: type
      });
      var after = {};

      switch (type) {
        case 'node':
          after.nodes = [addedModel];
          break;

        case 'edge':
          after.edges = [addedModel];
          break;

        case 'combo':
          after.combos = [addedModel];
          break;

        default:
          break;
      }

      this.pushStack('add', {
        before: {},
        after: after
      });
    }

    return item;
  };
  /**
   * 新增元素
   * @param {ITEM_TYPE} type 元素类型(node | edge)
   * @param {ModelConfig} model 元素数据模型
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   * @return {Item} 元素实例
   */


  AbstractGraph.prototype.add = function (type, model, stack, sortCombo) {
    if (stack === void 0) {
      stack = true;
    }

    if (sortCombo === void 0) {
      sortCombo = true;
    }

    return this.addItem(type, model, stack, sortCombo);
  };
  /**
   * 更新元素
   * @param {Item} item 元素id或元素实例
   * @param {Partial<NodeConfig> | EdgeConfig} cfg 需要更新的数据
   */


  AbstractGraph.prototype.updateItem = function (item, cfg, stack) {
    var _this = this;

    if (stack === void 0) {
      stack = true;
    }

    var itemController = this.get('itemController');
    var currentItem;

    if ((0, _util.isString)(item)) {
      currentItem = this.findById(item);
    } else {
      currentItem = item;
    }

    var UnupdateModel = (0, _util.clone)(currentItem.getModel());
    var type = '';
    if (currentItem.getType) type = currentItem.getType();
    var states = (0, _tslib.__spreadArray)([], currentItem.getStates());

    if (type === 'combo') {
      (0, _util.each)(states, function (state) {
        return _this.setItemState(currentItem, state, false);
      });
    }

    itemController.updateItem(currentItem, cfg);

    if (type === 'combo') {
      (0, _util.each)(states, function (state) {
        return _this.setItemState(currentItem, state, true);
      });
    }

    if (stack && this.get('enabledStack')) {
      var before = {
        nodes: [],
        edges: [],
        combos: []
      };
      var after = {
        nodes: [],
        edges: [],
        combos: []
      };
      var afterModel = (0, _tslib.__assign)({
        id: UnupdateModel.id
      }, cfg);

      switch (type) {
        case 'node':
          before.nodes.push(UnupdateModel);
          after.nodes.push(afterModel);
          break;

        case 'edge':
          before.edges.push(UnupdateModel);
          after.edges.push(afterModel);
          break;

        case 'combo':
          before.combos.push(UnupdateModel);
          after.combos.push(afterModel);
          break;

        default:
          break;
      }

      if (type === 'node') {
        before.nodes.push(UnupdateModel);
      }

      this.pushStack('update', {
        before: before,
        after: after
      });
    }
  };
  /**
   * 更新元素
   * @param {Item} item 元素id或元素实例
   * @param {Partial<NodeConfig> | EdgeConfig} cfg 需要更新的数据
   * @param {boolean} stack 本次操作是否入栈，默认为 true
   */


  AbstractGraph.prototype.update = function (item, cfg, stack) {
    if (stack === void 0) {
      stack = true;
    }

    this.updateItem(item, cfg, stack);
  };
  /**
   * 设置元素状态
   * @param {Item} item 元素id或元素实例
   * @param {string} state 状态名称
   * @param {string | boolean} value 是否启用状态 或 状态值
   */


  AbstractGraph.prototype.setItemState = function (item, state, value) {
    if ((0, _util.isString)(item)) {
      item = this.findById(item);
    }

    var itemController = this.get('itemController');
    itemController.setItemState(item, state, value);
    var stateController = this.get('stateController');

    if ((0, _util.isString)(value)) {
      stateController.updateState(item, state + ":" + value, true);
    } else {
      stateController.updateState(item, state, value);
    }
  };
  /**
   * 将指定状态的优先级提升为最高优先级
   * @param {Item} item 元素id或元素实例
   * @param state 状态名称
   */


  AbstractGraph.prototype.priorityState = function (item, state) {
    var itemController = this.get('itemController');
    itemController.priorityState(item, state);
  };
  /**
   * 设置视图初始化数据
   * @param {GraphData} data 初始化数据
   */


  AbstractGraph.prototype.data = function (data) {
    (0, _validation.dataValidation)(data);
    this.set('data', data);
  };
  /**
   * 根据data接口的数据渲染视图
   */


  AbstractGraph.prototype.render = function () {
    var self = this;
    this.set('comboSorted', false);
    var data = this.get('data');

    if (this.get('enabledStack')) {
      // render 之前清空 redo 和 undo 栈
      this.clearStack();
    }

    if (!data) {
      throw new Error('data must be defined first');
    }

    var _a = data.nodes,
        nodes = _a === void 0 ? [] : _a,
        _b = data.edges,
        edges = _b === void 0 ? [] : _b,
        _c = data.combos,
        combos = _c === void 0 ? [] : _c;
    this.clear(true);
    this.emit('beforerender');
    (0, _util.each)(nodes, function (node) {
      self.add('node', node, false, false);
    }); // process the data to tree structure

    if (combos && combos.length !== 0) {
      var comboTrees = (0, _graphic.plainCombosToTrees)(combos, nodes);
      this.set('comboTrees', comboTrees); // add combos

      self.addCombos(combos);
    }

    (0, _util.each)(edges, function (edge) {
      self.add('edge', edge, false, false);
    });
    var animate = self.get('animate');

    if (self.get('fitView') || self.get('fitCenter')) {
      self.set('animate', false);
    } // layout


    var layoutController = self.get('layoutController');

    if (layoutController) {
      layoutController.layout(success);
      if (this.destroyed) return;
    } else {
      if (self.get('fitView')) {
        self.fitView();
      }

      if (self.get('fitCenter')) {
        self.fitCenter();
      }

      self.emit('afterrender');
      self.set('animate', animate);
    } // 将在 onLayoutEnd 中被调用


    function success() {
      // fitView 与 fitCenter 共存时，fitView 优先，fitCenter 不再执行
      if (self.get('fitView')) {
        self.fitView();
      } else if (self.get('fitCenter')) {
        self.fitCenter();
      }

      self.autoPaint();
      self.emit('afterrender');

      if (self.get('fitView') || self.get('fitCenter')) {
        self.set('animate', animate);
      }
    }

    if (!this.get('groupByTypes')) {
      if (combos && combos.length !== 0) {
        this.sortCombos();
      } else {
        // 为提升性能，选择数量少的进行操作
        if (data.nodes && data.edges && data.nodes.length < data.edges.length) {
          var nodesArr = this.getNodes(); // 遍历节点实例，将所有节点提前。

          nodesArr.forEach(function (node) {
            node.toFront();
          });
        } else {
          var edgesArr = this.getEdges(); // 遍历节点实例，将所有节点提前。

          edgesArr.forEach(function (edge) {
            edge.toBack();
          });
        }
      }
    }

    if (this.get('enabledStack')) {
      this.pushStack('render');
    }
  };
  /**
   * 接收数据进行渲染
   * @Param {Object} data 初始化数据
   */


  AbstractGraph.prototype.read = function (data) {
    this.data(data);
    this.render();
  }; // 比较item


  AbstractGraph.prototype.diffItems = function (type, items, models) {
    var self = this;
    var item;
    var itemMap = this.get('itemMap');
    (0, _util.each)(models, function (model) {
      item = itemMap[model.id];

      if (item) {
        if (self.get('animate') && type === NODE) {
          var containerMatrix = item.getContainer().getMatrix();
          if (!containerMatrix) containerMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          item.set('originAttrs', {
            x: containerMatrix[6],
            y: containerMatrix[7]
          });
        }

        self.updateItem(item, model, false);
      } else {
        item = self.addItem(type, model, false);
      }

      if (item) items[type + "s"].push(item);
    });
  };
  /**
   * 更改源数据，根据新数据重新渲染视图
   * @param {GraphData | TreeGraphData} data 源数据
   * @param {boolean} 是否入栈，默认为true
   * @return {object} this
   */


  AbstractGraph.prototype.changeData = function (data, stack) {
    if (stack === void 0) {
      stack = true;
    }

    var self = this;

    if (!(0, _validation.dataValidation)(data)) {
      return this;
    }

    if (stack && this.get('enabledStack')) {
      this.pushStack('changedata', {
        before: self.save(),
        after: data
      });
    }

    this.set('comboSorted', false); // 删除 hulls

    this.removeHulls(); // 更改数据源后，取消所有状态

    this.getNodes().map(function (node) {
      return self.clearItemStates(node);
    });
    this.getEdges().map(function (edge) {
      return self.clearItemStates(edge);
    });
    var canvas = this.get('canvas');
    var localRefresh = canvas.get('localRefresh');
    canvas.set('localRefresh', false);

    if (!self.get('data')) {
      self.data(data);
      self.render();
    }

    var itemMap = this.get('itemMap');
    var items = {
      nodes: [],
      edges: []
    };
    var combosData = data.combos;

    if (combosData) {
      var comboTrees = (0, _graphic.plainCombosToTrees)(combosData, data.nodes);
      this.set('comboTrees', comboTrees);
    }

    this.diffItems('node', items, data.nodes);
    (0, _util.each)(itemMap, function (item, id) {
      itemMap[id].getModel().depth = 0;
      if (item.getType && item.getType() === 'edge') return;

      if (item.getType && item.getType() === 'combo') {
        delete itemMap[id];
        item.destroy();
      } else if (items.nodes.indexOf(item) < 0) {
        delete itemMap[id];
        self.remove(item, false);
      }
    }); // clear the destroyed combos here to avoid removing sub nodes before removing the parent combo

    var comboItems = this.getCombos();
    var combosLength = comboItems.length;

    for (var i = combosLength - 1; i >= 0; i--) {
      if (comboItems[i].destroyed) {
        comboItems.splice(i, 1);
      }
    } // process the data to tree structure


    if (combosData) {
      // add combos
      self.addCombos(combosData);

      if (!this.get('groupByTypes')) {
        this.sortCombos();
      }
    }

    this.diffItems('edge', items, data.edges);
    (0, _util.each)(itemMap, function (item, id) {
      if (item.getType && (item.getType() === 'node' || item.getType() === 'combo')) return;

      if (items.edges.indexOf(item) < 0) {
        delete itemMap[id];
        self.remove(item, false);
      }
    });
    this.set({
      nodes: items.nodes,
      edges: items.edges
    });
    var layoutController = this.get('layoutController');

    if (layoutController) {
      layoutController.changeData();

      if (self.get('animate') && !layoutController.getLayoutType()) {
        // 如果没有指定布局
        self.positionsAnimate();
      } else {
        self.autoPaint();
      }
    }

    setTimeout(function () {
      canvas.set('localRefresh', localRefresh);
    }, 16);
    return this;
  };
  /**
   * 私有方法，在 render 和 changeData 的时候批量添加数据中所有平铺的 combos
   * @param {ComboConfig[]} combos 平铺的 combos 数据
   */


  AbstractGraph.prototype.addCombos = function (combos) {
    var self = this;
    var comboTrees = self.get('comboTrees');
    var itemController = this.get('itemController');
    itemController.addCombos(comboTrees, combos);
  };
  /**
   * 根据已经存在的节点或 combo 创建新的 combo
   * @param combo combo ID 或 Combo 配置
   * @param children 添加到 Combo 中的元素，包括节点和 combo
   */


  AbstractGraph.prototype.createCombo = function (combo, children) {
    var _this = this;

    this.set('comboSorted', false); // step 1: 创建新的 Combo

    var comboId = '';
    var comboConfig;
    if (!combo) return;

    if ((0, _util.isString)(combo)) {
      comboId = combo;
      comboConfig = {
        id: combo
      };
    } else {
      comboId = combo.id;

      if (!comboId) {
        console.warn('Create combo failed. Please assign a unique string id for the adding combo.');
        return;
      }

      comboConfig = combo;
    } // step2: 更新 children，根据类型添加 comboId 或 parentId


    var trees = children.map(function (elementId) {
      var item = _this.findById(elementId);

      var model = item.getModel();
      var type = '';
      if (item.getType) type = item.getType();
      var cItem = {
        id: item.getID(),
        itemType: type
      };

      if (type === 'combo') {
        cItem.parentId = comboId;
        model.parentId = comboId;
      } else if (type === 'node') {
        cItem.comboId = comboId;
        model.comboId = comboId;
      }

      return cItem;
    });
    comboConfig.children = trees; // step 3: 添加 Combo，addItem 时会将子将元素添加到 Combo 中

    this.addItem('combo', comboConfig, false);
    this.set('comboSorted', false); // step4: 更新 comboTrees 结构

    var comboTrees = this.get('comboTrees');
    (comboTrees || []).forEach(function (ctree) {
      (0, _graphic.traverseTreeUp)(ctree, function (child) {
        if (child.id === comboId) {
          child.itemType = 'combo';
          child.children = trees;
          return false;
        }

        return true;
      });
    });

    if (comboTrees) {
      this.sortCombos();
    }
  };
  /**
   * 解散 combo
   * @param {String | INode | ICombo} combo 需要被解散的 Combo item 或 id
   */


  AbstractGraph.prototype.uncombo = function (combo) {
    var _this = this;

    var self = this;
    var comboItem = combo;

    if ((0, _util.isString)(combo)) {
      comboItem = this.findById(combo);
    }

    if (!comboItem || comboItem.getType && comboItem.getType() !== 'combo') {
      console.warn('The item is not a combo!');
      return;
    }

    var parentId = comboItem.getModel().parentId;
    var comboTrees = self.get('comboTrees');
    if (!comboTrees) comboTrees = [];
    var itemMap = this.get('itemMap');
    var comboId = comboItem.get('id');
    var treeToBeUncombo;
    var brothers = [];
    var comboItems = this.get('combos');
    var parentItem = this.findById(parentId);
    comboTrees.forEach(function (ctree) {
      if (treeToBeUncombo) return; // terminate the forEach

      (0, _graphic.traverseTreeUp)(ctree, function (subtree) {
        // find the combo to be uncomboed, delete the combo from map and cache
        if (subtree.id === comboId) {
          treeToBeUncombo = subtree; // delete the related edges

          var edges = comboItem.getEdges();
          edges.forEach(function (edge) {
            _this.removeItem(edge, false);
          });
          var index = comboItems.indexOf(combo);
          comboItems.splice(index, 1);
          delete itemMap[comboId];
          comboItem.destroy();
        } // find the parent to remove the combo from the combo's brothers array and add the combo's children to the combo's brothers array in the tree


        if (parentId && treeToBeUncombo && subtree.id === parentId) {
          parentItem.removeCombo(comboItem);
          brothers = subtree.children; // the combo's brothers
          // remove the combo from its brothers array

          var index = brothers.indexOf(treeToBeUncombo);

          if (index !== -1) {
            brothers.splice(index, 1);
          } // append the combo's children to the combo's brothers array


          treeToBeUncombo.children.forEach(function (child) {
            var item = _this.findById(child.id);

            var childModel = item.getModel();

            if (item.getType && item.getType() === 'combo') {
              child.parentId = parentId;
              delete child.comboId;
              childModel.parentId = parentId; // update the parentId of the model

              delete childModel.comboId;
            } else if (item.getType && item.getType() === 'node') {
              child.comboId = parentId;
              childModel.comboId = parentId; // update the parentId of the model
            }

            parentItem.addChild(item);
            brothers.push(child);
          });
          return false;
        }

        return true;
      });
    }); // if the parentId is not found, remove the combo from the roots

    if (!parentId && treeToBeUncombo) {
      var index = comboTrees.indexOf(treeToBeUncombo);
      comboTrees.splice(index, 1); // modify the parentId of the children

      treeToBeUncombo.children.forEach(function (child) {
        child.parentId = undefined;

        var childModel = _this.findById(child.id).getModel();

        delete childModel.parentId; // update the parentId of the model

        delete childModel.comboId; // update the comboId of the model

        if (child.itemType !== 'node') comboTrees.push(child);
      });
    }
  };
  /**
   * 根据节点的 bbox 更新所有 combos 的绘制，包括 combos 的位置和范围
   */


  AbstractGraph.prototype.updateCombos = function () {
    var _this = this;

    var self = this;
    var comboTrees = this.get('comboTrees');
    var itemController = self.get('itemController');
    var itemMap = self.get('itemMap');
    (comboTrees || []).forEach(function (ctree) {
      (0, _graphic.traverseTreeUp)(ctree, function (child) {
        if (!child) {
          return true;
        }

        var childItem = itemMap[child.id];

        if (childItem && childItem.getType && childItem.getType() === 'combo') {
          // 更新具体的 Combo 之前先清除所有的已有状态，以免将 state 中的样式更新为 Combo 的样式
          var states = (0, _tslib.__spreadArray)([], childItem.getStates());
          (0, _util.each)(states, function (state) {
            return _this.setItemState(childItem, state, false);
          }); // 更新具体的 Combo

          itemController.updateCombo(childItem, child.children); // 更新 Combo 后，还原已有的状态

          (0, _util.each)(states, function (state) {
            return _this.setItemState(childItem, state, true);
          });
        }

        return true;
      });
    });
    self.sortCombos();
  };
  /**
   * 根据节点的 bbox 更新 combo 及其祖先 combos 的绘制，包括 combos 的位置和范围
   * @param {String | ICombo} combo 需要被更新的 Combo 或 id，若指定，则该 Combo 及所有祖先 Combod 都会被更新
   */


  AbstractGraph.prototype.updateCombo = function (combo) {
    var _this = this;

    var self = this;
    var comboItem = combo;
    var comboId;

    if ((0, _util.isString)(combo)) {
      comboItem = this.findById(combo);
    }

    if (!comboItem || comboItem.getType && comboItem.getType() !== 'combo') {
      console.warn('The item to be updated is not a combo!');
      return;
    }

    comboId = comboItem.get('id');
    var comboTrees = this.get('comboTrees');
    var itemController = self.get('itemController');
    var itemMap = self.get('itemMap');
    (comboTrees || []).forEach(function (ctree) {
      (0, _graphic.traverseTreeUp)(ctree, function (child) {
        if (!child) {
          return true;
        }

        var childItem = itemMap[child.id];

        if (comboId === child.id && childItem && childItem.getType && childItem.getType() === 'combo') {
          // 更新具体的 Combo 之前先清除所有的已有状态，以免将 state 中的样式更新为 Combo 的样式
          var states = (0, _tslib.__spreadArray)([], childItem.getStates()); // || !item.getStateStyle(stateName)

          (0, _util.each)(states, function (state) {
            if (childItem.getStateStyle(state)) {
              _this.setItemState(childItem, state, false);
            }
          }); // 更新具体的 Combo

          itemController.updateCombo(childItem, child.children); // 更新 Combo 后，还原已有的状态

          (0, _util.each)(states, function (state) {
            if (childItem.getStateStyle(state)) {
              _this.setItemState(childItem, state, true);
            }
          });
          if (comboId) comboId = child.parentId;
        }

        return true;
      });
    });
  };
  /**
   * 更新树结构，例如移动子树等
   * @param {String | INode | ICombo} item 需要被更新的 Combo 或 节点 id
   * @param {string | undefined} parentId 新的父 combo id，undefined 代表没有父 combo
   */


  AbstractGraph.prototype.updateComboTree = function (item, parentId, stack) {
    if (stack === void 0) {
      stack = true;
    }

    var self = this;
    this.set('comboSorted', false);
    var uItem;

    if ((0, _util.isString)(item)) {
      uItem = self.findById(item);
    } else {
      uItem = item;
    }

    var model = uItem.getModel();
    var oldParentId = model.comboId || model.parentId;
    var type = '';
    if (uItem.getType) type = uItem.getType(); // 若 item 是 Combo，且 parentId 是其子孙 combo 的 id，则警告并终止

    if (parentId && type === 'combo') {
      var comboTrees = this.get('comboTrees');
      var valid_1 = true;
      var itemSubTree_1;
      (comboTrees || []).forEach(function (ctree) {
        if (itemSubTree_1) return;
        (0, _graphic.traverseTree)(ctree, function (subTree) {
          if (itemSubTree_1) return; // 找到从 item 开始的子树

          if (subTree.id === uItem.getID()) {
            itemSubTree_1 = subTree;
          }

          return true;
        });
      }); // 在以 item 为根的子树中寻找与 parentId 相同的后继元素

      (0, _graphic.traverseTree)(itemSubTree_1, function (subTree) {
        if (subTree.id === parentId) {
          valid_1 = false;
          return false;
        }

        return true;
      }); // parentId 是 item 的一个后继元素，不能进行更新

      if (!valid_1) {
        console.warn('Failed to update the combo tree! The parentId points to a descendant of the combo!');
        return;
      }
    }

    if (stack && this.get('enabledStack')) {
      var beforeData = {},
          afterData = {};

      if (type === 'combo') {
        beforeData.combos = [{
          id: model.id,
          parentId: model.parentId
        }];
        afterData.combos = [{
          id: model.id,
          parentId: parentId
        }];
      } else if (type === 'node') {
        beforeData.nodes = [{
          id: model.id,
          parentId: model.comboId
        }];
        afterData.nodes = [{
          id: model.id,
          parentId: parentId
        }];
      }

      this.pushStack('updateComboTree', {
        before: beforeData,
        after: afterData
      });
    } // 当 combo 存在 parentId 或 comboId 时，才将其移除


    if (model.parentId || model.comboId) {
      var combo = this.findById(model.parentId || model.comboId);

      if (combo) {
        combo.removeChild(uItem);
      }
    }

    if (type === 'combo') {
      model.parentId = parentId;
    } else if (type === 'node') {
      model.comboId = parentId;
    } // 只有当移入到指定 combo 时才添加


    if (parentId) {
      var parentCombo = this.findById(parentId);

      if (parentCombo) {
        // 将元素添加到 parentCombo 中
        parentCombo.addChild(uItem);
      }
    } // 如果原先有父亲 combo，则从原父 combo 的子元素数组中删除


    if (oldParentId) {
      var parentCombo = this.findById(oldParentId);

      if (parentCombo) {
        // 将元素从 parentCombo 中移除
        parentCombo.removeChild(uItem);
      }
    }

    var newComboTrees = (0, _graphic.reconstructTree)(this.get('comboTrees'), model.id, parentId);
    this.set('comboTrees', newComboTrees);
    this.updateCombos();
  };
  /**
   * 导出图数据
   * @return {object} data
   */


  AbstractGraph.prototype.save = function () {
    var nodes = [];
    var edges = [];
    var combos = [];
    (0, _util.each)(this.get('nodes'), function (node) {
      nodes.push(node.getModel());
    });
    (0, _util.each)(this.get('edges'), function (edge) {
      edges.push(edge.getModel());
    });
    (0, _util.each)(this.get('combos'), function (combo) {
      combos.push(combo.getModel());
    });
    return {
      nodes: nodes,
      edges: edges,
      combos: combos
    };
  };
  /**
   * 改变画布大小
   * @param  {number} width  画布宽度
   * @param  {number} height 画布高度
   * @return {object} this
   */


  AbstractGraph.prototype.changeSize = function (width, height) {
    var viewController = this.get('viewController');
    viewController.changeSize(width, height);
    return this;
  };
  /**
   * 当源数据在外部发生变更时，根据新数据刷新视图。但是不刷新节点位置
   */


  AbstractGraph.prototype.refresh = function () {
    var self = this;
    self.emit('beforegraphrefresh');

    if (self.get('animate')) {
      self.positionsAnimate();
    } else {
      var nodes = self.get('nodes');
      var edges = self.get('edges');
      var vedges = self.get('edges');
      (0, _util.each)(nodes, function (node) {
        node.refresh();
      });
      (0, _util.each)(edges, function (edge) {
        edge.refresh();
      });
      (0, _util.each)(vedges, function (vedge) {
        vedge.refresh();
      });
    }

    self.emit('aftergraphrefresh');
    self.autoPaint();
  };
  /**
   * 获取当前图中所有节点的item实例
   * @return {INode} item数组
   */


  AbstractGraph.prototype.getNodes = function () {
    return this.get('nodes');
  };
  /**
   * 获取当前图中所有边的item实例
   * @return {IEdge} item数组
   */


  AbstractGraph.prototype.getEdges = function () {
    return this.get('edges');
  };
  /**
   * 获取图中所有的 combo 实例
   */


  AbstractGraph.prototype.getCombos = function () {
    return this.get('combos');
  };
  /**
   * 获取指定 Combo 中所有的节点
   * @param comboId combo ID
   */


  AbstractGraph.prototype.getComboChildren = function (combo) {
    if ((0, _util.isString)(combo)) {
      combo = this.findById(combo);
    }

    if (!combo || combo.getType && combo.getType() !== 'combo') {
      console.warn('The combo does not exist!');
      return;
    }

    return combo.getChildren();
  };
  /**
   * 根据 graph 上的 animateCfg 进行视图中节点位置动画接口
   */


  AbstractGraph.prototype.positionsAnimate = function () {
    var self = this;
    self.emit('beforeanimate');
    var animateCfg = self.get('animateCfg');
    var onFrame = animateCfg.onFrame;
    var nodes = self.getNodes();
    var toNodes = nodes.map(function (node) {
      var model = node.getModel();
      return {
        id: model.id,
        x: model.x,
        y: model.y
      };
    });

    if (self.isAnimating()) {
      self.stopAnimate();
    }

    var canvas = self.get('canvas');
    canvas.animate(function (ratio) {
      (0, _util.each)(toNodes, function (data) {
        var node = self.findById(data.id);

        if (!node || node.destroyed) {
          return;
        }

        var originAttrs = node.get('originAttrs');
        var model = node.get('model');

        if (!originAttrs) {
          var containerMatrix = node.getContainer().getMatrix();
          if (!containerMatrix) containerMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          originAttrs = {
            x: containerMatrix[6],
            y: containerMatrix[7]
          };
          node.set('originAttrs', originAttrs);
        }

        if (onFrame) {
          var attrs = onFrame(node, ratio, data, originAttrs);
          node.set('model', Object.assign(model, attrs));
        } else {
          model.x = originAttrs.x + (data.x - originAttrs.x) * ratio;
          model.y = originAttrs.y + (data.y - originAttrs.y) * ratio;
        }
      });
      self.refreshPositions();
    }, {
      duration: animateCfg.duration,
      easing: animateCfg.easing,
      callback: function callback() {
        (0, _util.each)(nodes, function (node) {
          node.set('originAttrs', null);
        });

        if (animateCfg.callback) {
          animateCfg.callback();
        }

        self.emit('afteranimate');
        self.animating = false;
      }
    });
  };
  /**
   * 当节点位置在外部发生改变时，刷新所有节点位置，重计算边
   */


  AbstractGraph.prototype.refreshPositions = function () {
    var self = this;
    self.emit('beforegraphrefreshposition');
    var nodes = self.get('nodes');
    var edges = self.get('edges');
    var vedges = self.get('vedges');
    var combos = self.get('combos');
    var model;
    var updatedNodes = {};
    (0, _util.each)(nodes, function (node) {
      model = node.getModel();
      var originAttrs = node.get('originAttrs');

      if (originAttrs && model.x === originAttrs.x && model.y === originAttrs.y) {
        return;
      }

      var changed = node.updatePosition({
        x: model.x,
        y: model.y
      });
      updatedNodes[model.id] = changed;
      if (model.comboId) updatedNodes[model.comboId] = updatedNodes[model.comboId] || changed;
    });

    if (combos && combos.length !== 0) {
      self.updateCombos();
    }

    (0, _util.each)(edges, function (edge) {
      var sourceModel = edge.getSource().getModel();
      var target = edge.getTarget(); // 避免 target 是纯对象的情况下调用 getModel 方法
      // 拖动生成边的时候 target 会是纯对象

      if (!(0, _util.isPlainObject)(target)) {
        var targetModel = target.getModel();

        if (updatedNodes[sourceModel.id] || updatedNodes[targetModel.id] || edge.getModel().isComboEdge) {
          edge.refresh();
        }
      }
    });
    (0, _util.each)(vedges, function (vedge) {
      vedge.refresh();
    });
    self.emit('aftergraphrefreshposition');
    self.autoPaint();
  };

  AbstractGraph.prototype.stopAnimate = function () {
    this.get('canvas').stopAnimate();
  };

  AbstractGraph.prototype.isAnimating = function () {
    return this.animating;
  };
  /**
   * 获取当前视口伸缩比例
   * @return {number} 比例
   */


  AbstractGraph.prototype.getZoom = function () {
    var matrix = this.get('group').getMatrix();
    return matrix ? matrix[0] : 1;
  };
  /**
   * 获取当前的行为模式
   * @return {string} 当前行为模式
   */


  AbstractGraph.prototype.getCurrentMode = function () {
    var modeController = this.get('modeController');
    return modeController.getMode();
  };
  /**
   * 切换行为模式
   * @param {string} mode 指定模式
   * @return {object} this
   */


  AbstractGraph.prototype.setMode = function (mode) {
    var modeController = this.get('modeController');
    modeController.setMode(mode);
    return this;
  };
  /**
   * 清除画布元素
   * @return {object} this
   */


  AbstractGraph.prototype.clear = function (avoidEmit) {
    if (avoidEmit === void 0) {
      avoidEmit = false;
    }

    var canvas = this.get('canvas');
    canvas.clear();
    this.initGroups(); // 清空画布时同时清除数据

    this.set({
      itemMap: {},
      nodes: [],
      edges: [],
      groups: [],
      combos: [],
      comboTrees: []
    });
    if (!avoidEmit) this.emit('afterrender');
    return this;
  };
  /**
   * 更换布局配置项
   * @param {object} cfg 新布局配置项
   * 若 cfg 含有 type 字段或为 String 类型，且与现有布局方法不同，则更换布局
   * 若 cfg 不包括 type ，则保持原有布局方法，仅更新布局配置项
   */


  AbstractGraph.prototype.updateLayout = function (cfg) {
    var layoutController = this.get('layoutController');

    if ((0, _util.isString)(cfg)) {
      cfg = {
        type: cfg
      };
    }

    var oriLayoutCfg = this.get('layout');
    var layoutCfg = {};
    Object.assign(layoutCfg, oriLayoutCfg, cfg);
    this.set('layout', layoutCfg);

    if (layoutController.isLayoutTypeSame(layoutCfg) && layoutCfg.gpuEnabled === oriLayoutCfg.gpuEnabled) {
      // no type or same type, or switch the gpu and cpu, update layout
      layoutController.updateLayoutCfg(layoutCfg);
    } else {
      // has different type, change layout
      layoutController.changeLayout(layoutCfg);
    }
  };
  /**
   * 销毁布局，changeData 时不会再使用原来的布局方法对新数据进行布局
   */


  AbstractGraph.prototype.destroyLayout = function () {
    var layoutController = this.get('layoutController');
    layoutController.destroyLayout();
  };
  /**
   * 重新以当前示例中配置的属性进行一次布局
   */


  AbstractGraph.prototype.layout = function () {
    var layoutController = this.get('layoutController');
    var layoutCfg = this.get('layout');
    if (!layoutCfg || !layoutController) return;

    if (layoutCfg.workerEnabled) {
      // 如果使用web worker布局
      layoutController.layout();
      return;
    }

    if (layoutController.layoutMethod) {
      layoutController.relayout(true);
    } else {
      layoutController.layout();
    }
  };
  /**
   * 收起指定的 combo
   * @param {string | ICombo} combo combo ID 或 combo item
   */


  AbstractGraph.prototype.collapseCombo = function (combo) {
    var _this = this;

    if ((0, _util.isString)(combo)) {
      combo = this.findById(combo);
    }

    if (!combo) {
      console.warn('The combo to be collapsed does not exist!');
      return;
    }

    this.emit('beforecollapseexpandcombo', {
      action: 'expand',
      item: combo
    });
    var comboModel = combo.getModel();
    var itemController = this.get('itemController');
    itemController.collapseCombo(combo);
    comboModel.collapsed = true; // add virtual edges

    var edges = this.getEdges().concat(this.get('vedges')); // find all the descendant nodes and combos

    var cnodes = [];
    var ccombos = [];
    var comboTrees = this.get('comboTrees');
    var found = false;
    (comboTrees || []).forEach(function (ctree) {
      if (found) return; // if the combo is found, terminate the forEach

      (0, _graphic.traverseTree)(ctree, function (subTree) {
        // if the combo is found and it is traversing the other branches, terminate
        if (found && subTree.depth <= comboModel.depth) return false; // if the combo is found

        if (comboModel.id === subTree.id) found = true;

        if (found) {
          // if the combo is found, concat the descendant nodes and combos
          var item = _this.findById(subTree.id);

          if (item && item.getType && item.getType() === 'combo') {
            cnodes = cnodes.concat(item.getNodes());
            ccombos = ccombos.concat(item.getCombos());
          }
        }

        return true;
      });
    });
    var edgeWeightMap = {};
    var addedVEdges = [];
    edges.forEach(function (edge) {
      if (edge.isVisible() && !edge.getModel().isVEdge) return;
      var source = edge.getSource();
      var target = edge.getTarget();

      if ((cnodes.includes(source) || ccombos.includes(source)) && !cnodes.includes(target) && !ccombos.includes(target) || source.getModel().id === comboModel.id) {
        var edgeModel = edge.getModel();

        if (edgeModel.isVEdge) {
          _this.removeItem(edge, false);

          return;
        }

        var targetModel = target.getModel();

        while (!target.isVisible()) {
          target = _this.findById(targetModel.parentId || targetModel.comboId);
          if (!target || !targetModel.parentId && !targetModel.comboId) return; // all the ancestors are hidden, then ignore the edge

          targetModel = target.getModel();
        }

        var targetId = targetModel.id;

        if (edgeWeightMap[comboModel.id + "-" + targetId]) {
          edgeWeightMap[comboModel.id + "-" + targetId] += edgeModel.size || 1;
          return;
        } // the source is in the combo, the target is not


        var vedge = _this.addItem('vedge', {
          source: comboModel.id,
          target: targetId,
          isVEdge: true
        }, false);

        edgeWeightMap[comboModel.id + "-" + targetId] = edgeModel.size || 1;
        addedVEdges.push(vedge);
      } else if (!cnodes.includes(source) && !ccombos.includes(source) && (cnodes.includes(target) || ccombos.includes(target)) || target.getModel().id === comboModel.id) {
        var edgeModel = edge.getModel();

        if (edgeModel.isVEdge) {
          _this.removeItem(edge, false);

          return;
        }

        var sourceModel = source.getModel();

        while (!source.isVisible()) {
          source = _this.findById(sourceModel.parentId || sourceModel.comboId);
          if (!source || !sourceModel.parentId && !sourceModel.comboId) return; // all the ancestors are hidden, then ignore the edge

          sourceModel = source.getModel();
        }

        var sourceId = sourceModel.id;

        if (edgeWeightMap[sourceId + "-" + comboModel.id]) {
          edgeWeightMap[sourceId + "-" + comboModel.id] += edgeModel.size || 1;
          return;
        } // the target is in the combo, the source is not


        var vedge = _this.addItem('vedge', {
          target: comboModel.id,
          source: sourceId,
          isVEdge: true
        }, false);

        edgeWeightMap[sourceId + "-" + comboModel.id] = edgeModel.size || 1;
        addedVEdges.push(vedge);
      }
    }); // update the width of the virtual edges, which is the sum of merged actual edges
    // be attention that the actual edges with same endpoints but different directions will be represented by two different virtual edges

    addedVEdges.forEach(function (vedge) {
      var vedgeModel = vedge.getModel();

      _this.updateItem(vedge, {
        size: edgeWeightMap[vedgeModel.source + "-" + vedgeModel.target]
      }, false);
    });
    this.emit('aftercollapseexpandcombo', {
      action: 'collapse',
      item: combo
    });
  };
  /**
   * 展开指定的 combo
   * @param {string | ICombo} combo combo ID 或 combo item
   */


  AbstractGraph.prototype.expandCombo = function (combo) {
    var _this = this;

    if ((0, _util.isString)(combo)) {
      combo = this.findById(combo);
    }

    if (!combo || combo.getType && combo.getType() !== 'combo') {
      console.warn('The combo to be collapsed does not exist!');
      return;
    }

    this.emit('beforecollapseexpandcombo', {
      action: 'expand',
      item: combo
    });
    var comboModel = combo.getModel();
    var itemController = this.get('itemController');
    itemController.expandCombo(combo);
    comboModel.collapsed = false; // add virtual edges

    var edges = this.getEdges().concat(this.get('vedges')); // find all the descendant nodes and combos

    var cnodes = [];
    var ccombos = [];
    var comboTrees = this.get('comboTrees');
    var found = false;
    (comboTrees || []).forEach(function (ctree) {
      if (found) return; // if the combo is found, terminate

      (0, _graphic.traverseTree)(ctree, function (subTree) {
        // if the combo is found and it is traversing the other branches, terminate
        if (found && subTree.depth <= comboModel.depth) return false;
        if (comboModel.id === subTree.id) found = true;

        if (found) {
          var item = _this.findById(subTree.id);

          if (item && item.getType && item.getType() === 'combo') {
            cnodes = cnodes.concat(item.getNodes());
            ccombos = ccombos.concat(item.getCombos());
          }
        }

        return true;
      });
    });
    var edgeWeightMap = {};
    var addedVEdges = {};
    edges.forEach(function (edge) {
      if (edge.isVisible() && !edge.getModel().isVEdge) return;
      var source = edge.getSource();
      var target = edge.getTarget();
      var sourceId = source.get('id');
      var targetId = target.get('id');

      if ((cnodes.includes(source) || ccombos.includes(source)) && !cnodes.includes(target) && !ccombos.includes(target) || sourceId === comboModel.id) {
        // the source is in the combo, the target is not
        // ignore the virtual edges
        if (edge.getModel().isVEdge) {
          _this.removeItem(edge, false);

          return;
        }

        var targetModel = target.getModel(); // find the nearest visible ancestor

        while (!target.isVisible()) {
          target = _this.findById(targetModel.comboId || targetModel.parentId);

          if (!target || !targetModel.parentId && !targetModel.comboId) {
            return; // if all the ancestors of the oppsite are all hidden, ignore the edge
          }

          targetModel = target.getModel();
        }

        targetId = targetModel.id;
        var sourceModel = source.getModel(); // find the nearest visible ancestor

        while (!source.isVisible()) {
          source = _this.findById(sourceModel.comboId || sourceModel.parentId);

          if (!source || !sourceModel.parentId && !sourceModel.comboId) {
            return; // if all the ancestors of the oppsite are all hidden, ignore the edge
          }

          if (sourceModel.comboId === comboModel.id || sourceModel.parentId === comboModel.id) {
            break; // if the next ancestor is the combo, break the while
          }

          sourceModel = source.getModel();
        }

        sourceId = sourceModel.id;

        if (targetId) {
          var vedgeId = sourceId + "-" + targetId; // update the width of the virtual edges, which is the sum of merged actual edges
          // be attention that the actual edges with same endpoints but different directions will be represented by two different virtual edges

          if (edgeWeightMap[vedgeId]) {
            edgeWeightMap[vedgeId] += edge.getModel().size || 1;

            _this.updateItem(addedVEdges[vedgeId], {
              size: edgeWeightMap[vedgeId]
            }, false);

            return;
          }

          var vedge = _this.addItem('vedge', {
            source: sourceId,
            target: targetId,
            isVEdge: true
          }, false);

          edgeWeightMap[vedgeId] = edge.getModel().size || 1;
          addedVEdges[vedgeId] = vedge;
        }
      } else if (!cnodes.includes(source) && !ccombos.includes(source) && (cnodes.includes(target) || ccombos.includes(target)) || targetId === comboModel.id) {
        // the target is in the combo, the source is not
        // ignore the virtual edges
        if (edge.getModel().isVEdge) {
          _this.removeItem(edge, false);

          return;
        }

        var sourceModel = source.getModel(); // find the nearest visible ancestor

        while (!source.isVisible()) {
          source = _this.findById(sourceModel.comboId || sourceModel.parentId);

          if (!source || !sourceModel.parentId && !sourceModel.comboId) {
            return; // if all the ancestors of the oppsite are all hidden, ignore the edge
          }

          sourceModel = source.getModel();
        }

        sourceId = sourceModel.id;
        var targetModel = target.getModel(); // find the nearest visible ancestor

        while (!target.isVisible()) {
          target = _this.findById(targetModel.comboId || targetModel.parentId);

          if (!target || !targetModel.parentId && !targetModel.comboId) {
            return; // if all the ancestors of the oppsite are all hidden, ignore the edge
          }

          if (targetModel.comboId === comboModel.id || targetModel.parentId === comboModel.id) {
            break; // if the next ancestor is the combo, break the while
          }

          targetModel = target.getModel();
        }

        targetId = targetModel.id;

        if (sourceId) {
          var vedgeId = sourceId + "-" + targetId; // update the width of the virtual edges, which is the sum of merged actual edges
          // be attention that the actual edges with same endpoints but different directions will be represented by two different virtual edges

          if (edgeWeightMap[vedgeId]) {
            edgeWeightMap[vedgeId] += edge.getModel().size || 1;

            _this.updateItem(addedVEdges[vedgeId], {
              size: edgeWeightMap[vedgeId]
            }, false);

            return;
          }

          var vedge = _this.addItem('vedge', {
            target: targetId,
            source: sourceId,
            isVEdge: true
          }, false);

          edgeWeightMap[vedgeId] = edge.getModel().size || 1;
          addedVEdges[vedgeId] = vedge;
        }
      } else if ((cnodes.includes(source) || ccombos.includes(source)) && (cnodes.includes(target) || ccombos.includes(target))) {
        // both source and target are in the combo, if the target and source are both visible, show the edge
        if (source.isVisible() && target.isVisible()) {
          edge.show();
        }
      }
    });
    this.emit('aftercollapseexpandcombo', {
      action: 'expand',
      item: combo
    });
  };

  AbstractGraph.prototype.collapseExpandCombo = function (combo) {
    if ((0, _util.isString)(combo)) {
      combo = this.findById(combo);
    }

    if (!combo || combo.getType && combo.getType() !== 'combo') return;
    var comboModel = combo.getModel(); // if one ancestor combo of the combo is collapsed, it should not be collapsed or expanded

    var parentItem = this.findById(comboModel.parentId);

    while (parentItem) {
      var parentModel = parentItem.getModel();

      if (parentModel.collapsed) {
        console.warn("Fail to expand the combo since it's ancestor combo is collapsed.");
        parentItem = undefined;
        return;
      }

      parentItem = this.findById(parentModel.parentId);
    }

    var collapsed = comboModel.collapsed; // 该群组已经处于收起状态，需要展开

    if (collapsed) {
      this.expandCombo(combo);
    } else {
      this.collapseCombo(combo);
    }

    this.updateCombo(combo);
  };
  /**
   * 根据 comboTree 结构整理 Combo 相关的图形绘制层级，包括 Combo 本身、节点、边
   * @param {GraphData} data 数据
   */


  AbstractGraph.prototype.sortCombos = function () {
    var _this = this;

    var comboSorted = this.get('comboSorted');
    if (comboSorted) return;
    this.set('comboSorted', true);
    var depthMap = [];
    var dataDepthMap = {};
    var comboTrees = this.get('comboTrees');
    (comboTrees || []).forEach(function (cTree) {
      (0, _graphic.traverseTree)(cTree, function (child) {
        if (depthMap[child.depth]) depthMap[child.depth].push(child.id);else depthMap[child.depth] = [child.id];
        dataDepthMap[child.id] = child.depth;
        return true;
      });
    });
    var edges = this.getEdges().concat(this.get('vedges'));
    (edges || []).forEach(function (edgeItem) {
      var edge = edgeItem.getModel();
      var sourceDepth = dataDepthMap[edge.source] || 0;
      var targetDepth = dataDepthMap[edge.target] || 0;
      var depth = Math.max(sourceDepth, targetDepth);
      if (depthMap[depth]) depthMap[depth].push(edge.id);else depthMap[depth] = [edge.id];
    });
    depthMap.forEach(function (array) {
      if (!array || !array.length) return;

      for (var i = array.length - 1; i >= 0; i--) {
        var item = _this.findById(array[i]);

        if (item) item.toFront();
      }
    });
  };
  /**
   * 获取节点所有的邻居节点
   *
   * @param {(string | INode)} node 节点 ID 或实例
   * @returns {INode[]}
   * @memberof IAbstractGraph
   */


  AbstractGraph.prototype.getNeighbors = function (node, type) {
    var item = node;

    if ((0, _util.isString)(node)) {
      item = this.findById(node);
    }

    return item.getNeighbors(type);
  };
  /**
   * 获取 node 的度数
   *
   * @param {(string | INode)} node 节点 ID 或实例
   * @param {('in' | 'out' | 'total' | 'all' | undefined)} 度数类型，in 入度，out 出度，total 总度数，all 返回三种类型度数的对象
   * @returns {Number | Object} 该节点的度数
   * @memberof IAbstractGraph
   */


  AbstractGraph.prototype.getNodeDegree = function (node, type, refresh) {
    if (type === void 0) {
      type = undefined;
    }

    if (refresh === void 0) {
      refresh = false;
    }

    var item = node;

    if ((0, _util.isString)(node)) {
      item = this.findById(node);
    }

    var degrees = this.get('degrees');

    if (!degrees || refresh) {
      degrees = (0, _algorithm.getDegree)(this.save());
      this.set('degrees', degrees);
    }

    var nodeDegrees = degrees[item.getID()];
    var res = 0; // 如果是通过 addItem 后面新增加的节点，此时它的所有度数都为 0

    if (!nodeDegrees) {
      return 0;
    }

    switch (type) {
      case 'in':
        res = nodeDegrees.inDegree;
        break;

      case 'out':
        res = nodeDegrees.outDegree;
        break;

      case 'all':
        res = nodeDegrees;
        break;

      default:
        res = nodeDegrees.degree;
        break;
    }

    return res;
  };

  AbstractGraph.prototype.getUndoStack = function () {
    return this.undoStack;
  };

  AbstractGraph.prototype.getRedoStack = function () {
    return this.redoStack;
  };
  /**
   * 获取 undo 和 redo 栈的数据
   */


  AbstractGraph.prototype.getStackData = function () {
    if (!this.get('enabledStack')) {
      return null;
    }

    return {
      undoStack: this.undoStack.toArray(),
      redoStack: this.redoStack.toArray()
    };
  };
  /**
   * 清空 undo stack & redo stack
   */


  AbstractGraph.prototype.clearStack = function () {
    if (this.get('enabledStack')) {
      this.undoStack.clear();
      this.redoStack.clear();
    }
  };
  /**
   * 将操作类型和操作数据入栈
   * @param action 操作类型
   * @param data 入栈的数据
   * @param stackType 栈的类型
   */


  AbstractGraph.prototype.pushStack = function (action, data, stackType) {
    if (action === void 0) {
      action = 'update';
    }

    if (stackType === void 0) {
      stackType = 'undo';
    }

    if (!this.get('enabledStack')) {
      console.warn('请先启用 undo & redo 功能，在实例化 Graph 时候配置 enabledStack: true !');
      return;
    }

    var stackData = data ? (0, _util.clone)(data) : {
      before: {},
      after: (0, _util.clone)(this.save())
    };

    if (stackType === 'redo') {
      this.redoStack.push({
        action: action,
        data: stackData
      });
    } else {
      this.undoStack.push({
        action: action,
        data: stackData
      });
    }

    this.emit('stackchange', {
      undoStack: this.undoStack,
      redoStack: this.redoStack
    });
  };
  /**
   * 获取邻接矩阵
   *
   * @param {boolean} cache 是否使用缓存的
   * @param {boolean} directed 是否是有向图，默认取 graph.directed
   * @returns {Matrix} 邻接矩阵
   * @memberof IAbstractGraph
   */


  AbstractGraph.prototype.getAdjMatrix = function (cache, directed) {
    if (cache === void 0) {
      cache = true;
    }

    if (directed === undefined) directed = this.get('directed');
    var currentAdjMatrix = this.get('adjMatrix');

    if (!currentAdjMatrix || !cache) {
      currentAdjMatrix = (0, _algorithm.getAdjMatrix)(this.save(), directed);
      this.set('adjMatrix', currentAdjMatrix);
    }

    return currentAdjMatrix;
  };
  /**
   * 获取最短路径矩阵
   *
   * @param {boolean} cache 是否使用缓存的
   * @param {boolean} directed 是否是有向图，默认取 graph.directed
   * @returns {Matrix} 最短路径矩阵
   * @memberof IAbstractGraph
   */


  AbstractGraph.prototype.getShortestPathMatrix = function (cache, directed) {
    if (cache === void 0) {
      cache = true;
    }

    if (directed === undefined) directed = this.get('directed');
    var currentAdjMatrix = this.get('adjMatrix');
    var currentShourtestPathMatrix = this.get('shortestPathMatrix');

    if (!currentAdjMatrix || !cache) {
      currentAdjMatrix = (0, _algorithm.getAdjMatrix)(this.save(), directed);
      this.set('adjMatrix', currentAdjMatrix);
    }

    if (!currentShourtestPathMatrix || !cache) {
      currentShourtestPathMatrix = (0, _algorithm.floydWarshall)(this.save(), directed);
      this.set('shortestPathMatrix', currentShourtestPathMatrix);
    }

    return currentShourtestPathMatrix;
  };
  /**
   * 重新定义监听函数，复写参数类型
   */


  AbstractGraph.prototype.on = function (eventName, callback, once) {
    return _super.prototype.on.call(this, eventName, callback, once);
  };
  /**
   * 销毁画布
   */


  AbstractGraph.prototype.destroy = function () {
    this.clear(); // 清空栈数据

    this.clearStack();
    this.get('itemController').destroy();
    this.get('modeController').destroy();
    this.get('viewController').destroy();
    this.get('stateController').destroy();
    this.get('canvas').destroy();
    this.cfg = null;
    this.destroyed = true;
    this.redoStack = null;
    this.undoStack = null;
  };
  /**
   * 创建凸包或凹包轮廓
   * @param cfg HullCfg 轮廓配置项
   */


  AbstractGraph.prototype.createHull = function (cfg) {
    if (!cfg.members || cfg.members.length < 1) {
      console.warn('Create hull failed! The members is empty.');
      return;
    }

    var parent = this.get('hullGroup');
    var hullMap = this.get('hullMap');

    if (!hullMap) {
      hullMap = {};
      this.set('hullMap', hullMap);
    }

    if (!parent || parent.get('destroyed')) {
      parent = this.get('group').addGroup({
        id: 'hullGroup'
      });
      parent.toBack();
      this.set('hullGroup', parent);
    }

    if (hullMap[cfg.id]) {
      console.warn('Existed hull id.');
      return hullMap[cfg.id];
    }

    var group = parent.addGroup({
      id: cfg.id + "-container"
    });
    var hull = new _hull.default(this, (0, _tslib.__assign)((0, _tslib.__assign)({}, cfg), {
      group: group
    }));
    var hullId = hull.id;
    hullMap[hullId] = hull;
    return hull;
  };
  /**
   * 获取当前 graph 中存在的包裹轮廓
   * @return {[key: string]: Hull} Hull 的 map，hullId 对应的 hull 实例
   */


  AbstractGraph.prototype.getHulls = function () {
    return this.get('hullMap');
  };
  /**
   * 根据 hullId 获取对应的 hull
   * @return Hull
   */


  AbstractGraph.prototype.getHullById = function (hullId) {
    return this.get('hullMap')[hullId];
  };

  AbstractGraph.prototype.removeHull = function (hull) {
    var hullInstance;

    if ((0, _util.isString)(hull)) {
      hullInstance = this.getHullById(hull);
    } else {
      hullInstance = hull;
    }

    var hullMap = this.get('hullMap');
    delete hullMap[hullInstance.id];
    hullInstance.destroy();
  };

  AbstractGraph.prototype.removeHulls = function () {
    var hulls = this.getHulls();
    if (!hulls || !Object.keys(hulls).length) return;
    Object.keys(hulls).forEach(function (key) {
      var hull = hulls[key];
      hull.destroy();
    });
    this.set('hullMap', {});
  };

  return AbstractGraph;
}(_eventEmitter.default);

var _default = AbstractGraph;
exports.default = _default;
}, function(modId) { var map = {"../util/math":1685504765327,"../util/validation":1685504765328,"../global":1685504765330,"./controller":1685504765332,"../util/graphic":1685504765329,"../item/hull":1685504765345}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765327, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointLineDistance = exports.pointRectSquareDist = exports.isPointsOverlap = exports.pointLineSquareDist = exports.squareDist = exports.getPointsCenter = exports.fractionToLine = exports.itemIntersectByLine = exports.getBBoxBoundLine = exports.Line = exports.isPolygonsIntersect = exports.intersectBBox = exports.isPointInPolygon = exports.getDegree = exports.rotate = exports.scale = exports.move = exports.translate = exports.getAdjMatrix = exports.floydWarshall = exports.scaleMatrix = exports.distance = exports.getCircleCenterByPoints = exports.invertMatrix = exports.applyMatrix = exports.getEllipseIntersectByPoint = exports.getCircleIntersectByPoint = exports.getRectIntersectByPoint = exports.getLineIntersect = exports.compare = void 0;

var _matrixUtil = require("@antv/matrix-util");

var _util = require("@antv/util");

var transform = _matrixUtil.ext.transform;
/**
 * 对比对象，用于对象数组排序
 * @param   {string}       attributeName  排序依据的字段名称
 * @param   {number}       min    最小值
 * @param   {number}       max    最大值
 * @return  {boolean}      bool   布尔
 */

var compare = function compare(attributeName) {
  return function (m, n) {
    return m[attributeName] - n[attributeName];
  };
};
/**
 * 是否在区间内
 * @param   {number}       value  值
 * @param   {number}       min    最小值
 * @param   {number}       max    最大值
 * @return  {boolean}      bool   布尔
 */


exports.compare = compare;

var isBetween = function isBetween(value, min, max) {
  return value >= min && value <= max;
};
/**
 * 获取两条线段的交点
 * @param  {Point}  p0 第一条线段起点
 * @param  {Point}  p1 第一条线段终点
 * @param  {Point}  p2 第二条线段起点
 * @param  {Point}  p3 第二条线段终点
 * @return {Point}  交点
 */


var getLineIntersect = function getLineIntersect(p0, p1, p2, p3) {
  var tolerance = 0.0001;
  var E = {
    x: p2.x - p0.x,
    y: p2.y - p0.y
  };
  var D0 = {
    x: p1.x - p0.x,
    y: p1.y - p0.y
  };
  var D1 = {
    x: p3.x - p2.x,
    y: p3.y - p2.y
  };
  var kross = D0.x * D1.y - D0.y * D1.x;
  var sqrKross = kross * kross;
  var invertKross = 1 / kross;
  var sqrLen0 = D0.x * D0.x + D0.y * D0.y;
  var sqrLen1 = D1.x * D1.x + D1.y * D1.y;

  if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
    var s = (E.x * D1.y - E.y * D1.x) * invertKross;
    var t = (E.x * D0.y - E.y * D0.x) * invertKross;
    if (!isBetween(s, 0, 1) || !isBetween(t, 0, 1)) return null;
    return {
      x: p0.x + s * D0.x,
      y: p0.y + s * D0.y
    };
  }

  return null;
};
/**
 * point and rectangular intersection point
 * @param  {IRect} rect  rect
 * @param  {Point} point point
 * @return {PointPoint} rst;
 */


exports.getLineIntersect = getLineIntersect;

var getRectIntersectByPoint = function getRectIntersectByPoint(rect, point) {
  var x = rect.x,
      y = rect.y,
      width = rect.width,
      height = rect.height;
  var cx = x + width / 2;
  var cy = y + height / 2;
  var points = [];
  var center = {
    x: cx,
    y: cy
  };
  points.push({
    x: x,
    y: y
  });
  points.push({
    x: x + width,
    y: y
  });
  points.push({
    x: x + width,
    y: y + height
  });
  points.push({
    x: x,
    y: y + height
  });
  points.push({
    x: x,
    y: y
  });
  var rst = null;

  for (var i = 1; i < points.length; i++) {
    rst = getLineIntersect(points[i - 1], points[i], center, point);

    if (rst) {
      break;
    }
  }

  return rst;
};
/**
 * get point and circle inIntersect
 * @param {ICircle} circle 圆点，x,y,r
 * @param {Point} point 点 x,y
 * @return {Point} applied point
 */


exports.getRectIntersectByPoint = getRectIntersectByPoint;

var getCircleIntersectByPoint = function getCircleIntersectByPoint(circle, point) {
  var cx = circle.x,
      cy = circle.y,
      r = circle.r;
  var x = point.x,
      y = point.y;
  var dx = x - cx;
  var dy = y - cy;
  var d = Math.sqrt(dx * dx + dy * dy);

  if (d < r) {
    return null;
  }

  var signX = Math.sign(dx);
  var signY = Math.sign(dy);
  var angle = Math.atan(dy / dx);
  return {
    x: cx + Math.abs(r * Math.cos(angle)) * signX,
    y: cy + Math.abs(r * Math.sin(angle)) * signY
  };
};
/**
 * get point and ellipse inIntersect
 * @param {Object} ellipse 椭圆 x,y,rx,ry
 * @param {Object} point 点 x,y
 * @return {object} applied point
 */


exports.getCircleIntersectByPoint = getCircleIntersectByPoint;

var getEllipseIntersectByPoint = function getEllipseIntersectByPoint(ellipse, point) {
  var a = ellipse.rx;
  var b = ellipse.ry;
  var cx = ellipse.x;
  var cy = ellipse.y;
  var dx = point.x - cx;
  var dy = point.y - cy; // 直接通过 x,y 求夹角，求出来的范围是 -PI, PI

  var angle = Math.atan2(dy / b, dx / a);

  if (angle < 0) {
    angle += 2 * Math.PI; // 转换到 0，2PI
  }

  return {
    x: cx + a * Math.cos(angle),
    y: cy + b * Math.sin(angle)
  };
};
/**
 * coordinate matrix transformation
 * @param  {number} point   coordinate
 * @param  {Matrix} matrix  matrix
 * @param  {number} tag     could be 0 or 1
 * @return {Point} transformed point
 */


exports.getEllipseIntersectByPoint = getEllipseIntersectByPoint;

var applyMatrix = function applyMatrix(point, matrix, tag) {
  if (tag === void 0) {
    tag = 1;
  }

  var vector = [point.x, point.y, tag];

  if (!matrix || isNaN(matrix[0])) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  _matrixUtil.vec3.transformMat3(vector, vector, matrix);

  return {
    x: vector[0],
    y: vector[1]
  };
};
/**
 * coordinate matrix invert transformation
 * @param  {number} point   coordinate
 * @param  {number} matrix  matrix
 * @param  {number} tag     could be 0 or 1
 * @return {object} transformed point
 */


exports.applyMatrix = applyMatrix;

var invertMatrix = function invertMatrix(point, matrix, tag) {
  if (tag === void 0) {
    tag = 1;
  }

  if (!matrix || isNaN(matrix[0])) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  var inversedMatrix = _matrixUtil.mat3.invert([1, 0, 0, 0, 1, 0, 0, 0, 1], matrix);

  if (!inversedMatrix) {
    inversedMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  var vector = [point.x, point.y, tag];

  _matrixUtil.vec3.transformMat3(vector, vector, inversedMatrix);

  return {
    x: vector[0],
    y: vector[1]
  };
};
/**
 *
 * @param p1 First coordinate
 * @param p2 second coordinate
 * @param p3 three coordinate
 */


exports.invertMatrix = invertMatrix;

var getCircleCenterByPoints = function getCircleCenterByPoints(p1, p2, p3) {
  var a = p1.x - p2.x;
  var b = p1.y - p2.y;
  var c = p1.x - p3.x;
  var d = p1.y - p3.y;
  var e = (p1.x * p1.x - p2.x * p2.x - p2.y * p2.y + p1.y * p1.y) / 2;
  var f = (p1.x * p1.x - p3.x * p3.x - p3.y * p3.y + p1.y * p1.y) / 2;
  var denominator = b * c - a * d;
  return {
    x: -(d * e - b * f) / denominator,
    y: -(a * f - c * e) / denominator
  };
};
/**
 * get distance by two points
 * @param p1 first point
 * @param p2 second point
 */


exports.getCircleCenterByPoints = getCircleCenterByPoints;

var distance = function distance(p1, p2) {
  var vx = p1.x - p2.x;
  var vy = p1.y - p2.y;
  return Math.sqrt(vx * vx + vy * vy);
};
/**
 * scale matrix
 * @param matrix [ [], [], [] ]
 * @param ratio
 */


exports.distance = distance;

var scaleMatrix = function scaleMatrix(matrix, ratio) {
  var result = [];
  matrix.forEach(function (row) {
    var newRow = [];
    row.forEach(function (v) {
      newRow.push(v * ratio);
    });
    result.push(newRow);
  });
  return result;
};
/**
 * Floyd Warshall algorithm for shortest path distances matrix
 * @param  {array} adjMatrix   adjacency matrix
 * @return {array} distances   shortest path distances matrix
 */


exports.scaleMatrix = scaleMatrix;

var floydWarshall = function floydWarshall(adjMatrix) {
  // initialize
  var dist = [];
  var size = adjMatrix.length;

  for (var i = 0; i < size; i += 1) {
    dist[i] = [];

    for (var j = 0; j < size; j += 1) {
      if (i === j) {
        dist[i][j] = 0;
      } else if (adjMatrix[i][j] === 0 || !adjMatrix[i][j]) {
        dist[i][j] = Infinity;
      } else {
        dist[i][j] = adjMatrix[i][j];
      }
    }
  } // floyd


  for (var k = 0; k < size; k += 1) {
    for (var i = 0; i < size; i += 1) {
      for (var j = 0; j < size; j += 1) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  return dist;
};
/**
 * get adjacency matrix
 * @param data graph data
 * @param directed whether it's a directed graph
 */


exports.floydWarshall = floydWarshall;

var getAdjMatrix = function getAdjMatrix(data, directed) {
  var nodes = data.nodes,
      edges = data.edges;
  var matrix = []; // map node with index in data.nodes

  var nodeMap = {};

  if (!nodes) {
    throw new Error('invalid nodes data!');
  }

  if (nodes) {
    nodes.forEach(function (node, i) {
      nodeMap[node.id] = i;
      var row = [];
      matrix.push(row);
    });
  }

  if (edges) {
    edges.forEach(function (e) {
      var source = e.source,
          target = e.target;
      var sIndex = nodeMap[source];
      var tIndex = nodeMap[target];
      matrix[sIndex][tIndex] = 1;

      if (!directed) {
        matrix[tIndex][sIndex] = 1;
      }
    });
  }

  return matrix;
};
/**
 * 平移group
 * @param group Group 实例
 * @param vec 移动向量
 */


exports.getAdjMatrix = getAdjMatrix;

var translate = function translate(group, vec) {
  group.translate(vec.x, vec.y);
};
/**
 * 移动到指定坐标点
 * @param group Group 实例
 * @param point 移动到的坐标点
 */


exports.translate = translate;

var move = function move(group, point) {
  var matrix = group.getMatrix();

  if (!matrix) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  var bbox = group.getCanvasBBox();
  var vx = point.x - bbox.minX;
  var vy = point.y - bbox.minY;
  var movedMatrix = transform(matrix, [['t', vx, vy]]);
  group.setMatrix(movedMatrix);
};
/**
 * 缩放 group
 * @param group Group 实例
 * @param point 在x 和 y 方向上的缩放比例
 */


exports.move = move;

var scale = function scale(group, ratio) {
  var matrix = group.getMatrix();

  if (!matrix) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  var scaleXY = ratio;

  if (!(0, _util.isArray)(ratio)) {
    scaleXY = [ratio, ratio];
  }

  if ((0, _util.isArray)(ratio) && ratio.length === 1) {
    scaleXY = [ratio[0], ratio[0]];
  }

  matrix = transform(matrix, [['s', scaleXY[0], scaleXY[1]]]);
  group.setMatrix(matrix);
};
/**
 *
 * @param group Group 实例
 * @param ratio 选择角度
 */


exports.scale = scale;

var rotate = function rotate(group, angle) {
  var matrix = group.getMatrix();

  if (!matrix) {
    matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  matrix = transform(matrix, [['r', angle]]);
  group.setMatrix(matrix);
};

exports.rotate = rotate;

var getDegree = function getDegree(n, nodeIdxMap, edges) {
  var degrees = [];

  for (var i = 0; i < n; i++) {
    degrees[i] = 0;
  }

  edges.forEach(function (e) {
    if (e.source) {
      degrees[nodeIdxMap[e.source]] += 1;
    }

    if (e.target) {
      degrees[nodeIdxMap[e.target]] += 1;
    }
  });
  return degrees;
}; // 判断点Q是否在p1和p2的线段上


exports.getDegree = getDegree;

function onSegment(p1, p2, q) {
  if ((q[0] - p1[0]) * (p2[1] - p1[1]) === (p2[0] - p1[0]) * (q[1] - p1[1]) && Math.min(p1[0], p2[0]) <= q[0] && q[0] <= Math.max(p1[0], p2[0]) && Math.min(p1[1], p2[1]) <= q[1] && q[1] <= Math.max(p1[1], p2[1])) {
    return true;
  }

  return false;
}
/**
 * 判断点P在多边形内-射线法. Borrow from https://github.com/antvis/util/blob/master/packages/path-util/src/point-in-polygon.ts
 * @param points
 * @param x
 * @param y
 */


var isPointInPolygon = function isPointInPolygon(points, x, y) {
  var isHit = false;
  var n = points.length; // 判断两个double在eps精度下的大小关系

  var tolerance = 1e-6;

  function dcmp(xValue) {
    if (Math.abs(xValue) < tolerance) {
      return 0;
    }

    return xValue < 0 ? -1 : 1;
  }

  if (n <= 2) {
    // svg 中点小于 3 个时，不显示，也无法被拾取
    return false;
  }

  for (var i = 0; i < n; i++) {
    var p1 = points[i];
    var p2 = points[(i + 1) % n];

    if (onSegment(p1, p2, [x, y])) {
      // 点在多边形一条边上
      return true;
    } // 前一个判断min(p1[1],p2[1])<P.y<=max(p1[1],p2[1])
    // 后一个判断被测点 在 射线与边交点 的左边


    if (dcmp(p1[1] - y) > 0 !== dcmp(p2[1] - y) > 0 && dcmp(x - (y - p1[1]) * (p1[0] - p2[0]) / (p1[1] - p2[1]) - p1[0]) < 0) {
      isHit = !isHit;
    }
  }

  return isHit;
}; // 判断两个BBox是否相交


exports.isPointInPolygon = isPointInPolygon;

var intersectBBox = function intersectBBox(box1, box2) {
  return !(box2.minX > box1.maxX || box2.maxX < box1.minX || box2.minY > box1.maxY || box2.maxY < box1.minY);
};

exports.intersectBBox = intersectBBox;

var lineIntersectPolygon = function lineIntersectPolygon(lines, line) {
  var isIntersect = false;
  (0, _util.each)(lines, function (l) {
    if (getLineIntersect(l.from, l.to, line.from, line.to)) {
      isIntersect = true;
      return false;
    }
  });
  return isIntersect;
};
/**
 * 判断两个polygon是否相交。
 * borrow from @antv/path-util
 * @param points1 polygon1的顶点数组
 * @param points2 polygon2的顶点数组
 */


var isPolygonsIntersect = function isPolygonsIntersect(points1, points2) {
  var getBBox = function getBBox(points) {
    var xArr = points.map(function (p) {
      return p[0];
    });
    var yArr = points.map(function (p) {
      return p[1];
    });
    return {
      minX: Math.min.apply(null, xArr),
      maxX: Math.max.apply(null, xArr),
      minY: Math.min.apply(null, yArr),
      maxY: Math.max.apply(null, yArr)
    };
  };

  var parseToLines = function parseToLines(points) {
    var lines = [];
    var count = points.length;

    for (var i = 0; i < count - 1; i++) {
      var point = points[i];
      var next = points[i + 1];
      lines.push({
        from: {
          x: point[0],
          y: point[1]
        },
        to: {
          x: next[0],
          y: next[1]
        }
      });
    }

    if (lines.length > 1) {
      var first = points[0];
      var last = points[count - 1];
      lines.push({
        from: {
          x: last[0],
          y: last[1]
        },
        to: {
          x: first[0],
          y: first[1]
        }
      });
    }

    return lines;
  }; // 空数组，或者一个点返回 false


  if (points1.length < 2 || points2.length < 2) {
    return false;
  }

  var bbox1 = getBBox(points1);
  var bbox2 = getBBox(points2); // 判定包围盒是否相交，比判定点是否在多边形内要快的多，可以筛选掉大多数情况

  if (!intersectBBox(bbox1, bbox2)) {
    return false;
  }

  var isIn = false; // 判定点是否在多边形内部，一旦有一个点在另一个多边形内，则返回

  (0, _util.each)(points2, function (point) {
    if (isPointInPolygon(points1, point[0], point[1])) {
      isIn = true;
      return false;
    }
  });

  if (isIn) {
    return true;
  }

  (0, _util.each)(points1, function (point) {
    if (isPointInPolygon(points2, point[0], point[1])) {
      isIn = true;
      return false;
    }
  });

  if (isIn) {
    return true;
  }

  var lines1 = parseToLines(points1);
  var lines2 = parseToLines(points2);
  var isIntersect = false;
  (0, _util.each)(lines2, function (line) {
    if (lineIntersectPolygon(lines1, line)) {
      isIntersect = true;
      return false;
    }
  });
  return isIntersect;
};

exports.isPolygonsIntersect = isPolygonsIntersect;

var Line =
/** @class */
function () {
  function Line(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  Line.prototype.getBBox = function () {
    var minX = Math.min(this.x1, this.x2);
    var minY = Math.min(this.y1, this.y2);
    var maxX = Math.max(this.x1, this.x2);
    var maxY = Math.max(this.y1, this.y2);
    var res = {
      x: minX,
      y: minY,
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY,
      width: maxX - minX,
      height: maxY - minY
    };
    return res;
  };

  return Line;
}();

exports.Line = Line;

var getBBoxBoundLine = function getBBoxBoundLine(bbox, direction) {
  var bounds = {
    top: [bbox.minX, bbox.minY, bbox.maxX, bbox.minY],
    left: [bbox.minX, bbox.minY, bbox.minX, bbox.maxY],
    bottom: [bbox.minX, bbox.maxY, bbox.maxX, bbox.maxY],
    right: [bbox.maxX, bbox.minY, bbox.maxX, bbox.maxY]
  };
  return bounds[direction];
};
/**
 * 计算两条线段相交时，相交点对第一条线段上的分割比例
 */


exports.getBBoxBoundLine = getBBoxBoundLine;

var fractionAlongLineA = function fractionAlongLineA(la, lb) {
  var uaT = (lb.x2 - lb.x1) * (la.y1 - lb.y1) - (lb.y2 - lb.y1) * (la.x1 - lb.x1);
  var ubT = (la.x2 - la.x1) * (la.y1 - lb.y1) - (la.y2 - la.y1) * (la.x1 - lb.x1);
  var uB = (lb.y2 - lb.y1) * (la.x2 - la.x1) - (lb.x2 - lb.x1) * (la.y2 - la.y1);

  if (uB) {
    var ua = uaT / uB;
    var ub = ubT / uB;

    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return ua;
    }
  }

  return Number.POSITIVE_INFINITY;
};

var itemIntersectByLine = function itemIntersectByLine(item, line) {
  var directions = ['top', 'left', 'bottom', 'right'];
  var bbox = item.getBBox();
  var countIntersections = 0;
  var intersections = [];

  for (var i = 0; i < 4; i++) {
    var _a = getBBoxBoundLine(bbox, directions[i]),
        x1 = _a[0],
        y1 = _a[1],
        x2 = _a[2],
        y2 = _a[3];

    intersections[i] = getLineIntersect({
      x: line.x1,
      y: line.y1
    }, {
      x: line.x2,
      y: line.y2
    }, {
      x: x1,
      y: y1
    }, {
      x: x2,
      y: y2
    });

    if (intersections[i]) {
      countIntersections += 1;
    }
  }

  return [intersections, countIntersections];
};

exports.itemIntersectByLine = itemIntersectByLine;

var fractionToLine = function fractionToLine(item, line) {
  var directions = ['top', 'left', 'bottom', 'right'];
  var bbox = item.getBBox();
  var minDistance = Number.POSITIVE_INFINITY;
  var countIntersections = 0;

  for (var i = 0; i < 4; i++) {
    var _a = getBBoxBoundLine(bbox, directions[i]),
        x1 = _a[0],
        y1 = _a[1],
        x2 = _a[2],
        y2 = _a[3];

    var testDistance = fractionAlongLineA(line, new Line(x1, y1, x2, y2));
    testDistance = Math.abs(testDistance - 0.5);

    if (testDistance >= 0 && testDistance <= 1) {
      countIntersections += 1;
      minDistance = testDistance < minDistance ? testDistance : minDistance;
    }
  }

  if (countIntersections === 0) return -1;
  return minDistance;
};

exports.fractionToLine = fractionToLine;

var getPointsCenter = function getPointsCenter(points) {
  var centerX = 0;
  var centerY = 0;

  if (points.length > 0) {
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
      var point = points_1[_i];
      centerX += point.x;
      centerY += point.y;
    }

    centerX /= points.length;
    centerY /= points.length;
  }

  return {
    x: centerX,
    y: centerY
  };
};

exports.getPointsCenter = getPointsCenter;

var squareDist = function squareDist(a, b) {
  return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
};

exports.squareDist = squareDist;

var pointLineSquareDist = function pointLineSquareDist(point, line) {
  var x1 = line.x1;
  var y1 = line.y1;
  var x2 = line.x2 - x1;
  var y2 = line.y2 - y1;
  var px = point.x - x1;
  var py = point.y - y1;
  var dotprod = px * x2 + py * y2;
  var projlenSq;

  if (dotprod <= 0) {
    projlenSq = 0;
  } else {
    px = x2 - px;
    py = y2 - py;
    dotprod = px * x2 + py * y2;

    if (dotprod <= 0) {
      projlenSq = 0;
    } else {
      projlenSq = dotprod * dotprod / (x2 * x2 + y2 * y2);
    }
  }

  var lenSq = px * px + py * py - projlenSq;

  if (lenSq < 0) {
    lenSq = 0;
  }

  return lenSq;
};

exports.pointLineSquareDist = pointLineSquareDist;

var isPointsOverlap = function isPointsOverlap(p1, p2, e) {
  if (e === void 0) {
    e = 1e-3;
  }

  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) < Math.pow(e, 2);
};
/**
 * 点到矩形的距离的平方：矩形内部点视作距离为0，外部的点若投影落在矩形边上则为点到矩形边的最近的垂直距离，否则为点到矩形顶点的距离，
 * @param point IPoint
 * @param rect IRect
 */


exports.isPointsOverlap = isPointsOverlap;

var pointRectSquareDist = function pointRectSquareDist(point, rect) {
  var isLeft = point.x < rect.x;
  var isRight = point.x > rect.x + rect.width;
  var isTop = point.y > rect.y + rect.height;
  var isBottom = point.y < rect.y;
  var isPointOutside = isLeft || isRight || isTop || isBottom;

  if (!isPointOutside) {
    return 0;
  }

  if (isTop && !isLeft && !isRight) {
    return Math.pow(rect.y + rect.height - point.y, 2);
  }

  if (isBottom && !isLeft && !isRight) {
    return Math.pow(point.y - rect.y, 2);
  }

  if (isLeft && !isTop && !isBottom) {
    return Math.pow(rect.x - point.x, 2);
  }

  if (isRight && !isTop && !isBottom) {
    return Math.pow(rect.x + rect.width - point.x, 2);
  }

  var dx = Math.min(Math.abs(rect.x - point.x), Math.abs(rect.x + rect.width - point.x));
  var dy = Math.min(Math.abs(rect.y - point.y), Math.abs(rect.y + rect.height - point.y));
  return dx * dx + dy * dy;
};
/**
 * point to line distance
 * @param  {array} line 线的四个顶点 [x1, y1, x2, y2]
 * @param  {object} point 坐标点 {x, y}
 * @return {Number|NaN} distance
 */


exports.pointRectSquareDist = pointRectSquareDist;

var pointLineDistance = function pointLineDistance(line, point) {
  var x1 = line[0],
      y1 = line[1],
      x2 = line[2],
      y2 = line[3];
  var x = point.x,
      y = point.y;
  var d = [x2 - x1, y2 - y1];

  if (_matrixUtil.vec2.exactEquals(d, [0, 0])) {
    return NaN;
  }

  var u = [-d[1], d[0]]; // @ts-ignore

  _matrixUtil.vec2.normalize(u, u);

  var a = [x - x1, y - y1]; // @ts-ignore

  return Math.abs(_matrixUtil.vec2.dot(a, u));
};

exports.pointLineDistance = pointLineDistance;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765328, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleDataValidation = exports.dataValidation = void 0;

var _tslib = require("tslib");

var _util = require("@antv/util");

var _graphic = require("./graphic");

/**
 * 验证关系图或树图数据的合法性，必须符合以下规则才会渲染图：
 * 1. 必须传入数据
 * 2. 节点的 ID 必须为字符串，暂不支持数字类型，如果支持数字类型，会出现类似 123 与 '123' 是否相等的问题
 * 3. 边的 source 和 target 值必须在节点 ID 中存在
 * @param data 关系图或树图数据
 * @return boolean 全部验证通过返回 true，否则返回 false
 */
var dataValidation = function dataValidation(data) {
  // 1. 必须传入数据
  if (!data) {
    console.error('G6 Error Tips: the data must be defined');
    return false;
  } // 2. 节点的 ID 必须为字符串或数字类型


  var nodes = data.nodes,
      edges = data.edges,
      _a = data.combos,
      combos = _a === void 0 ? [] : _a;

  if (!nodes && !edges) {
    var validated_1 = true; // 不存在 nodes 和 edges，则说明是 TreeGraphData，按 TreeGraphData 规则验证

    (0, _graphic.traverseTree)(data, function (param) {
      if (!(0, _util.isString)(param.id)) {
        validated_1 = false;
        return false;
      }

      return true;
    });
    return validated_1;
  }

  var nonNode = (nodes || []).find(function (node) {
    return !(0, _util.isString)(node.id);
  });

  if (nonNode) {
    console.warn("G6 Warning Tips: missing 'id' property, or %c" + nonNode.id + "%c is not a string.", 'font-size: 20px; color: red;', '');
    return false;
  } // 3. 边的 source 和 target 必须存在于节点 或 Combo中


  var nodeIds = (nodes || []).map(function (node) {
    return node.id;
  });
  var comboIds = combos.map(function (combo) {
    return combo.id;
  });
  var ids = (0, _tslib.__spreadArray)((0, _tslib.__spreadArray)([], nodeIds), comboIds);
  var nonEdges = (edges || []).find(function (edge) {
    return !ids.includes(edge.source) || !ids.includes(edge.target);
  });

  if (nonEdges) {
    console.warn("G6 Warning Tips: The source %c" + nonEdges.source + "%c or the target %c" + nonEdges.target + "%c of the edge do not exist in the nodes or combos.", 'font-size: 20px; color: red;', '', 'font-size: 20px; color: red;', '');
    return false;
  }

  return true;
};
/**
 * 验证添加节点、边或从combo时的数据
 * @param type 节点、边或从combo
 * @param data 添加的单条数据
 * @return boolean 全部验证通过返回 true，否则返回 false
 */


exports.dataValidation = dataValidation;

var singleDataValidation = function singleDataValidation(type, data) {
  if (type === 'node' || type === 'combo') {
    // 必须有 id 字段，且id必须为字符串类型
    if (data.id && !(0, _util.isString)(data.id)) {
      console.warn("G6 Warning Tips: missing 'id' property, or the 'id' %c" + data.id + "%c is not a string.", 'font-size: 20px; color: red;', '');
      return false;
    }
  } else if (type === 'edge') {
    // 必须有 source 和 target 字段
    if (!data.source || !data.target) {
      console.warn("G6 Warning Tips: missing 'source' or 'target' for the edge.");
      return false;
    }
  }

  return true;
};

exports.singleDataValidation = singleDataValidation;
}, function(modId) { var map = {"./graphic":1685504765329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765329, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneBesidesImg = exports.shouldRefreshEdge = exports.getComboBBox = exports.reconstructTree = exports.plainCombosToTrees = exports.getTextSize = exports.getLetterWidth = exports.traverseTreeUp = exports.traverseTree = exports.getLabelPosition = exports.getLoopCfgs = exports.getBBox = void 0;

var _tslib = require("tslib");

var _matrixUtil = require("@antv/matrix-util");

var _global = _interopRequireDefault(require("../global"));

var _math = require("./math");

var _letterAspectRatio = _interopRequireDefault(require("./letterAspectRatio"));

var _util = require("@antv/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PI = Math.PI,
    sin = Math.sin,
    cos = Math.cos; // 一共支持8个方向的自环，每个环占的角度是45度，在计算时再二分，为22.5度

var SELF_LINK_SIN = sin(PI / 8);
var SELF_LINK_COS = cos(PI / 8);

var getBBox = function getBBox(element, group) {
  var bbox = element.getBBox();
  var leftTop = {
    x: bbox.minX,
    y: bbox.minY
  };
  var rightBottom = {
    x: bbox.maxX,
    y: bbox.maxY
  }; // 根据父元素变换矩阵

  if (group) {
    var matrix = group.getMatrix();

    if (!matrix) {
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }

    leftTop = (0, _math.applyMatrix)(leftTop, matrix);
    rightBottom = (0, _math.applyMatrix)(rightBottom, matrix);
  }

  var lx = leftTop.x,
      ly = leftTop.y;
  var rx = rightBottom.x,
      ry = rightBottom.y;
  return {
    x: lx,
    y: ly,
    minX: lx,
    minY: ly,
    maxX: rx,
    maxY: ry,
    width: rx - lx,
    height: ry - ly
  };
};
/**
 * get loop edge config
 * @param cfg edge config
 */


exports.getBBox = getBBox;

var getLoopCfgs = function getLoopCfgs(cfg) {
  var item = cfg.sourceNode || cfg.targetNode;
  var container = item.get('group');
  var containerMatrix = container.getMatrix();
  if (!containerMatrix) containerMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  var keyShape = item.getKeyShape();
  var bbox = keyShape.getBBox();
  var loopCfg = cfg.loopCfg || {}; // 距离keyShape边的最高距离

  var dist = loopCfg.dist || Math.max(bbox.width, bbox.height) * 2; // 自环边与keyShape的相对位置关系

  var position = loopCfg.position || _global.default.defaultLoopPosition; // 中心取group上真实位置

  var center = [containerMatrix[6], containerMatrix[7]];
  var startPoint = [cfg.startPoint.x, cfg.startPoint.y];
  var endPoint = [cfg.endPoint.x, cfg.endPoint.y];
  var rstart = bbox.height / 2;
  var rend = bbox.height / 2;
  var sinDeltaStart = rstart * SELF_LINK_SIN;
  var cosDeltaStart = rstart * SELF_LINK_COS;
  var sinDeltaEnd = rend * SELF_LINK_SIN;
  var cosDeltaEnd = rend * SELF_LINK_COS; // 如果定义了锚点的，直接用锚点坐标，否则，根据自环的 cfg 计算

  if (startPoint[0] === endPoint[0] && startPoint[1] === endPoint[1]) {
    switch (position) {
      case 'top':
        startPoint = [center[0] - sinDeltaStart, center[1] - cosDeltaStart];
        endPoint = [center[0] + sinDeltaEnd, center[1] - cosDeltaEnd];
        break;

      case 'top-right':
        rstart = bbox.height / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + sinDeltaStart, center[1] - cosDeltaStart];
        endPoint = [center[0] + cosDeltaEnd, center[1] - sinDeltaEnd];
        break;

      case 'right':
        rstart = bbox.width / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + cosDeltaStart, center[1] - sinDeltaStart];
        endPoint = [center[0] + cosDeltaEnd, center[1] + sinDeltaEnd];
        break;

      case 'bottom-right':
        rstart = bbox.width / 2;
        rend = bbox.height / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + cosDeltaStart, center[1] + sinDeltaStart];
        endPoint = [center[0] + sinDeltaEnd, center[1] + cosDeltaEnd];
        break;

      case 'bottom':
        rstart = bbox.height / 2;
        rend = bbox.height / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] + sinDeltaStart, center[1] + cosDeltaStart];
        endPoint = [center[0] - sinDeltaEnd, center[1] + cosDeltaEnd];
        break;

      case 'bottom-left':
        rstart = bbox.height / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - sinDeltaStart, center[1] + cosDeltaStart];
        endPoint = [center[0] - cosDeltaEnd, center[1] + sinDeltaEnd];
        break;

      case 'left':
        rstart = bbox.width / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - cosDeltaStart, center[1] + sinDeltaStart];
        endPoint = [center[0] - cosDeltaEnd, center[1] - sinDeltaEnd];
        break;

      case 'top-left':
        rstart = bbox.width / 2;
        rend = bbox.height / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - cosDeltaStart, center[1] - sinDeltaStart];
        endPoint = [center[0] - sinDeltaEnd, center[1] - cosDeltaEnd];
        break;

      default:
        rstart = bbox.width / 2;
        rend = bbox.width / 2;
        sinDeltaStart = rstart * SELF_LINK_SIN;
        cosDeltaStart = rstart * SELF_LINK_COS;
        sinDeltaEnd = rend * SELF_LINK_SIN;
        cosDeltaEnd = rend * SELF_LINK_COS;
        startPoint = [center[0] - sinDeltaStart, center[1] - cosDeltaStart];
        endPoint = [center[0] + sinDeltaEnd, center[1] - cosDeltaEnd];
    } // 如果逆时针画，交换起点和终点


    if (loopCfg.clockwise === false) {
      var swap = [startPoint[0], startPoint[1]];
      startPoint = [endPoint[0], endPoint[1]];
      endPoint = [swap[0], swap[1]];
    }
  }

  var startVec = [startPoint[0] - center[0], startPoint[1] - center[1]];
  var scaleRateStart = (rstart + dist) / rstart;
  var scaleRateEnd = (rend + dist) / rend;

  if (loopCfg.clockwise === false) {
    scaleRateStart = (rend + dist) / rend;
    scaleRateEnd = (rstart + dist) / rstart;
  }

  var startExtendVec = _matrixUtil.vec2.scale([0, 0], startVec, scaleRateStart);

  var controlPoint1 = [center[0] + startExtendVec[0], center[1] + startExtendVec[1]];
  var endVec = [endPoint[0] - center[0], endPoint[1] - center[1]];

  var endExtendVec = _matrixUtil.vec2.scale([0, 0], endVec, scaleRateEnd);

  var controlPoint2 = [center[0] + endExtendVec[0], center[1] + endExtendVec[1]];
  cfg.startPoint = {
    x: startPoint[0],
    y: startPoint[1]
  };
  cfg.endPoint = {
    x: endPoint[0],
    y: endPoint[1]
  };
  cfg.controlPoints = [{
    x: controlPoint1[0],
    y: controlPoint1[1]
  }, {
    x: controlPoint2[0],
    y: controlPoint2[1]
  }];
  return cfg;
};
/**
 * 根据 label 所在线条的位置百分比，计算 label 坐标
 * @param {object}  pathShape  G 的 path 实例，一般是 Edge 实例的 keyShape
 * @param {number}  percent    范围 0 - 1 的线条百分比
 * @param {number}  refX     x 轴正方向为基准的 label 偏移
 * @param {number}  refY     y 轴正方向为基准的 label 偏移
 * @param {boolean} rotate     是否根据线条斜率旋转文本
 * @return {object} 文本的 x, y, 文本的旋转角度
 */


exports.getLoopCfgs = getLoopCfgs;

var getLabelPosition = function getLabelPosition(pathShape, percent, refX, refY, rotate) {
  var TAN_OFFSET = 0.0001;
  var vector = [];
  var point = pathShape.getPoint(percent);

  if (point === null) {
    return {
      x: 0,
      y: 0,
      angle: 0
    };
  } // 头尾最可能，放在最前面，使用 g path 上封装的方法


  if (percent < TAN_OFFSET) {
    vector = pathShape.getStartTangent().reverse();
  } else if (percent > 1 - TAN_OFFSET) {
    vector = pathShape.getEndTangent();
  } else {
    // 否则取指定位置的点,与少量偏移的点，做微分向量
    var offsetPoint = pathShape.getPoint(percent + TAN_OFFSET);
    vector.push([point.x, point.y]);
    vector.push([offsetPoint.x, offsetPoint.y]);
  }

  var rad = Math.atan2(vector[1][1] - vector[0][1], vector[1][0] - vector[0][0]);

  if (rad < 0) {
    rad += PI * 2;
  }

  if (refX) {
    point.x += cos(rad) * refX;
    point.y += sin(rad) * refX;
  }

  if (refY) {
    // 默认方向是 x 轴正方向，法线是 求出角度 - 90°
    var normal = rad - PI / 2; // 若法线角度在 y 轴负方向，切到正方向，保证 refY 相对于 y 轴正方向

    if (rad > 1 / 2 * PI && rad < 3 * 1 / 2 * PI) {
      normal -= PI;
    }

    point.x += cos(normal) * refY;
    point.y += sin(normal) * refY;
  }

  var result = {
    x: point.x,
    y: point.y,
    angle: rad
  };

  if (rotate) {
    if (rad > 1 / 2 * PI && rad < 3 * 1 / 2 * PI) {
      rad -= PI;
    }

    return (0, _tslib.__assign)({
      rotate: rad
    }, result);
  }

  return result;
};
/**
 * depth first traverse, from root to leaves, children in inverse order
 *  if the fn returns false, terminate the traverse
 */


exports.getLabelPosition = getLabelPosition;

var traverse = function traverse(data, fn) {
  if (fn(data) === false) {
    return false;
  }

  if (data && data.children) {
    for (var i = data.children.length - 1; i >= 0; i--) {
      if (!traverse(data.children[i], fn)) return false;
    }
  }

  return true;
};
/**
 * depth first traverse, from leaves to root, children in inverse order
 *  if the fn returns false, terminate the traverse
 */


var traverseUp = function traverseUp(data, fn) {
  if (data && data.children) {
    for (var i = data.children.length - 1; i >= 0; i--) {
      if (!traverseUp(data.children[i], fn)) return;
    }
  }

  if (fn(data) === false) {
    return false;
  }

  return true;
};
/**
 * depth first traverse, from root to leaves, children in inverse order
 *  if the fn returns false, terminate the traverse
 */


var traverseTree = function traverseTree(data, fn) {
  if (typeof fn !== 'function') {
    return;
  }

  traverse(data, fn);
};
/**
 * depth first traverse, from leaves to root, children in inverse order
 * if the fn returns false, terminate the traverse
 */


exports.traverseTree = traverseTree;

var traverseTreeUp = function traverseTreeUp(data, fn) {
  if (typeof fn !== 'function') {
    return;
  }

  traverseUp(data, fn);
};
/**
 *
 * @param letter the letter
 * @param fontSize
 * @return the letter's width
 */


exports.traverseTreeUp = traverseTreeUp;

var getLetterWidth = function getLetterWidth(letter, fontSize) {
  return fontSize * (_letterAspectRatio.default[letter] || 1);
};
/**
 *
 * @param text the text
 * @param fontSize
 * @return the text's size
 */


exports.getLetterWidth = getLetterWidth;

var getTextSize = function getTextSize(text, fontSize) {
  var width = 0;
  var pattern = new RegExp("[\u4E00-\u9FA5]+");
  text.split('').forEach(function (letter) {
    if (pattern.test(letter)) {
      // 中文字符
      width += fontSize;
    } else {
      width += getLetterWidth(letter, fontSize);
    }
  });
  return [width, fontSize];
};
/**
 * construct the trees from combos data
 * @param array the combos array
 * @param nodes the nodes array
 * @return the tree
 */


exports.getTextSize = getTextSize;

var plainCombosToTrees = function plainCombosToTrees(array, nodes) {
  var result = [];
  var addedMap = {};
  var modelMap = {};
  array.forEach(function (d) {
    modelMap[d.id] = d;
  });
  array.forEach(function (d, i) {
    var cd = (0, _util.clone)(d);
    cd.itemType = 'combo';
    cd.children = undefined;

    if (cd.parentId === cd.id) {
      console.warn("The parentId for combo " + cd.id + " can not be the same as the combo's id");
      delete cd.parentId;
    } else if (cd.parentId && !modelMap[cd.parentId]) {
      console.warn("The parent combo for combo " + cd.id + " does not exist!");
      delete cd.parentId;
    }

    var mappedObj = addedMap[cd.id];

    if (mappedObj) {
      cd.children = mappedObj.children;
      addedMap[cd.id] = cd;
      mappedObj = cd;

      if (!mappedObj.parentId) {
        result.push(mappedObj);
        return;
      }

      var mappedParent = addedMap[mappedObj.parentId];

      if (mappedParent) {
        if (mappedParent.children) mappedParent.children.push(cd);else mappedParent.children = [cd];
      } else {
        var parent_1 = {
          id: mappedObj.parentId,
          children: [mappedObj]
        };
        addedMap[mappedObj.parentId] = parent_1;
        addedMap[cd.id] = cd;
      }

      return;
    }

    if ((0, _util.isString)(d.parentId)) {
      var parent_2 = addedMap[d.parentId];

      if (parent_2) {
        if (parent_2.children) parent_2.children.push(cd);else parent_2.children = [cd];
        addedMap[cd.id] = cd;
      } else {
        var pa = {
          id: d.parentId,
          children: [cd]
        };
        addedMap[pa.id] = pa;
        addedMap[cd.id] = cd;
      }
    } else {
      result.push(cd);
      addedMap[cd.id] = cd;
    }
  }); // proccess the nodes

  var nodeMap = {};
  (nodes || []).forEach(function (node) {
    nodeMap[node.id] = node;
    var combo = addedMap[node.comboId];

    if (combo) {
      var cnode = {
        id: node.id,
        comboId: node.comboId
      };
      if (combo.children) combo.children.push(cnode);else combo.children = [cnode];
      cnode.itemType = 'node';
      addedMap[node.id] = cnode;
    }
  }); // assign the depth for each element

  var maxDepth = 0;
  result.forEach(function (tree) {
    tree.depth = maxDepth + 10;
    traverse(tree, function (child) {
      var parent;
      var itemType = addedMap[child.id].itemType;

      if (itemType === 'node') {
        parent = addedMap[child.comboId];
      } else {
        parent = addedMap[child.parentId];
      }

      if (parent) {
        if (itemType === 'node') child.depth = maxDepth + 1;else child.depth = maxDepth + 10;
      } else {
        child.depth = maxDepth + 10;
      }

      if (maxDepth < child.depth) maxDepth = child.depth;
      var oriNodeModel = nodeMap[child.id];

      if (oriNodeModel) {
        oriNodeModel.depth = child.depth;
      }

      return true;
    });
  });
  return result;
};

exports.plainCombosToTrees = plainCombosToTrees;

var reconstructTree = function reconstructTree(trees, subtreeId, newParentId) {
  var brothers = trees;
  var subtree;
  var comboChildsMap = {
    root: {
      children: trees
    }
  };
  var foundSubTree = false;
  var oldParentId = 'root';
  (trees || []).forEach(function (tree) {
    if (foundSubTree) return;

    if (tree.id === subtreeId) {
      subtree = tree;

      if (tree.itemType === 'combo') {
        subtree.parentId = newParentId;
      } else {
        subtree.comboId = newParentId;
      }

      foundSubTree = true;
      return;
    }

    traverseTree(tree, function (child) {
      comboChildsMap[child.id] = {
        children: child.children
      }; // store the old parent id to delete the subtree from the old parent's children in next recursion

      brothers = comboChildsMap[child.parentId || child.comboId || 'root'].children;

      if (child && (child.removed || subtreeId === child.id) && brothers) {
        oldParentId = child.parentId || child.comboId || 'root';
        subtree = child; // re-assign the parentId or comboId for the moved subtree

        if (child.itemType === 'combo') {
          subtree.parentId = newParentId;
        } else {
          subtree.comboId = newParentId;
        }

        foundSubTree = true;
        return false;
      }

      return true;
    });
  });
  brothers = comboChildsMap[oldParentId].children;
  var index = brothers ? brothers.indexOf(subtree) : -1;
  if (index > -1) brothers.splice(index, 1); // 如果遍历完整棵树还没有找到，说明之前就不在树中

  if (!foundSubTree) {
    subtree = {
      id: subtreeId,
      itemType: 'node',
      comboId: newParentId
    };
    comboChildsMap[subtreeId] = {
      children: undefined
    };
  } // append to new parent


  if (subtreeId) {
    var found_1 = false; // newParentId is undefined means the subtree will have no parent

    if (newParentId) {
      var newParentDepth_1 = 0;
      (trees || []).forEach(function (tree) {
        if (found_1) return; // terminate

        traverseTree(tree, function (child) {
          // append subtree to the new parent ans assign the depth to the subtree
          if (newParentId === child.id) {
            found_1 = true;
            if (child.children) child.children.push(subtree);else child.children = [subtree];
            newParentDepth_1 = child.depth;
            if (subtree.itemType === 'node') subtree.depth = newParentDepth_1 + 2;else subtree.depth = newParentDepth_1 + 1;
            return false; // terminate
          }

          return true;
        });
      });
    } else if ((!newParentId || !found_1) && subtree.itemType !== 'node') {
      // if the newParentId is undefined or it is not found in the tree, add the subTree to the root
      trees.push(subtree);
    } // update the depth of the subtree and its children from the subtree


    var currentDepth_1 = subtree.depth;
    traverseTree(subtree, function (child) {
      if (child.itemType === 'node') currentDepth_1 += 2;else currentDepth_1 += 1;
      child.depth = currentDepth_1;
      return true;
    });
  }

  return trees;
};

exports.reconstructTree = reconstructTree;

var getComboBBox = function getComboBBox(children, graph) {
  var comboBBox = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    centerX: undefined,
    centerY: undefined
  };

  if (!children || children.length === 0) {
    return comboBBox;
  }

  children.forEach(function (child) {
    var childItem = graph.findById(child.id);
    if (!childItem || !childItem.isVisible()) return; // ignore hidden children

    childItem.set('bboxCanvasCache', undefined);
    var childBBox = childItem.getCanvasBBox();
    if (childBBox.x && comboBBox.minX > childBBox.minX) comboBBox.minX = childBBox.minX;
    if (childBBox.y && comboBBox.minY > childBBox.minY) comboBBox.minY = childBBox.minY;
    if (childBBox.x && comboBBox.maxX < childBBox.maxX) comboBBox.maxX = childBBox.maxX;
    if (childBBox.y && comboBBox.maxY < childBBox.maxY) comboBBox.maxY = childBBox.maxY;
  });
  comboBBox.x = (comboBBox.minX + comboBBox.maxX) / 2;
  comboBBox.y = (comboBBox.minY + comboBBox.maxY) / 2;
  comboBBox.width = comboBBox.maxX - comboBBox.minX;
  comboBBox.height = comboBBox.maxY - comboBBox.minY;
  comboBBox.centerX = (comboBBox.minX + comboBBox.maxX) / 2;
  comboBBox.centerY = (comboBBox.minY + comboBBox.maxY) / 2;
  Object.keys(comboBBox).forEach(function (key) {
    if (comboBBox[key] === Infinity || comboBBox[key] === -Infinity) {
      comboBBox[key] = undefined;
    }
  });
  return comboBBox;
};

exports.getComboBBox = getComboBBox;

var shouldRefreshEdge = function shouldRefreshEdge(cfg) {
  var refreshEdge = (0, _util.isNumber)(cfg.x) || (0, _util.isNumber)(cfg.y) || cfg.type || cfg.anchorPoints || cfg.size;
  if (cfg.style) refreshEdge = refreshEdge || (0, _util.isNumber)(cfg.style.r) || (0, _util.isNumber)(cfg.style.width) || (0, _util.isNumber)(cfg.style.height) || (0, _util.isNumber)(cfg.style.rx) || (0, _util.isNumber)(cfg.style.ry);
  return refreshEdge;
};

exports.shouldRefreshEdge = shouldRefreshEdge;

var cloneBesidesImg = function cloneBesidesImg(obj) {
  var clonedObj = {};
  Object.keys(obj).forEach(function (key1) {
    var obj2 = obj[key1];

    if ((0, _util.isObject)(obj2)) {
      var clonedObj2_1 = {};
      Object.keys(obj2).forEach(function (key2) {
        var v = obj2[key2];
        if (key2 === 'img' && !(0, _util.isString)(v)) return;
        clonedObj2_1[key2] = (0, _util.clone)(v);
      });
      clonedObj[key1] = clonedObj2_1;
    } else {
      clonedObj[key1] = (0, _util.clone)(obj2);
    }
  });
  return clonedObj;
};

exports.cloneBesidesImg = cloneBesidesImg;
}, function(modId) { var map = {"../global":1685504765330,"./math":1685504765327,"./letterAspectRatio":1685504765331}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765330, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var subjectColor = 'rgb(95, 149, 255)';
var backColor = 'rgb(255, 255, 255)';
var textColor = 'rgb(0, 0, 0)';
var activeFill = 'rgb(247, 250, 255)';
var nodeMainFill = 'rgb(239, 244, 255)';
var comboFill = 'rgb(253, 253, 253)';
var disabledFill = 'rgb(250, 250, 250)';
var edgeMainStroke = 'rgb(224, 224, 224)';
var edgeInactiveStroke = 'rgb(234, 234, 234)';
var edgeDisablesStroke = 'rgb(245, 245, 245)';
var inactiveStroke = 'rgb(191, 213, 255)';
var highlightStroke = '#4572d9';
var highlightFill = 'rgb(223, 234, 255)';
var colorSet = {
  // for nodes
  mainStroke: subjectColor,
  mainFill: nodeMainFill,
  activeStroke: subjectColor,
  activeFill: activeFill,
  inactiveStroke: inactiveStroke,
  inactiveFill: activeFill,
  selectedStroke: subjectColor,
  selectedFill: backColor,
  highlightStroke: highlightStroke,
  highlightFill: highlightFill,
  disableStroke: edgeMainStroke,
  disableFill: disabledFill,
  // for edges
  edgeMainStroke: edgeMainStroke,
  edgeActiveStroke: subjectColor,
  edgeInactiveStroke: edgeInactiveStroke,
  edgeSelectedStroke: subjectColor,
  edgeHighlightStroke: subjectColor,
  edgeDisableStroke: edgeDisablesStroke,
  // for combos
  comboMainStroke: edgeMainStroke,
  comboMainFill: comboFill,
  comboActiveStroke: subjectColor,
  comboActiveFill: activeFill,
  comboInactiveStroke: edgeMainStroke,
  comboInactiveFill: comboFill,
  comboSelectedStroke: subjectColor,
  comboSelectedFill: comboFill,
  comboHighlightStroke: highlightStroke,
  comboHighlightFill: comboFill,
  comboDisableStroke: edgeInactiveStroke,
  comboDisableFill: disabledFill
};
var _default = {
  version: '0.3.0',
  rootContainerClassName: 'root-container',
  nodeContainerClassName: 'node-container',
  edgeContainerClassName: 'edge-container',
  comboContainerClassName: 'combo-container',
  delegateContainerClassName: 'delegate-container',
  defaultLoopPosition: 'top',
  nodeLabel: {
    style: {
      fill: '#000',
      fontSize: 12,
      textAlign: 'center',
      textBaseline: 'middle'
    },
    offset: 4 // 节点的默认文本不居中时的偏移量

  },
  defaultNode: {
    type: 'circle',
    style: {
      lineWidth: 1,
      stroke: colorSet.mainStroke,
      fill: nodeMainFill
    },
    size: 20,
    color: colorSet.mainStroke,
    linkPoints: {
      size: 8,
      lineWidth: 1,
      fill: colorSet.activeFill,
      stroke: colorSet.activeStroke
    }
  },
  // 节点应用状态后的样式，默认仅提供 active、selected、highlight、inactive、disable，用户可以自己扩展
  nodeStateStyles: {
    active: {
      fill: colorSet.activeFill,
      stroke: colorSet.activeStroke,
      lineWidth: 2,
      shadowColor: colorSet.mainStroke,
      shadowBlur: 10
    },
    selected: {
      fill: colorSet.selectedFill,
      stroke: colorSet.selectedStroke,
      lineWidth: 4,
      shadowColor: colorSet.selectedStroke,
      shadowBlur: 10,
      'text-shape': {
        fontWeight: 500
      }
    },
    highlight: {
      fill: colorSet.highlightFill,
      stroke: colorSet.highlightStroke,
      lineWidth: 2,
      'text-shape': {
        fontWeight: 500
      }
    },
    inactive: {
      fill: colorSet.inactiveFill,
      stroke: colorSet.inactiveStroke,
      lineWidth: 1
    },
    disable: {
      fill: colorSet.disableFill,
      stroke: colorSet.disableStroke,
      lineWidth: 1
    }
  },
  edgeLabel: {
    style: {
      fill: textColor,
      textAlign: 'center',
      textBaseline: 'middle',
      fontSize: 12
    }
  },
  defaultEdge: {
    type: 'line',
    size: 1,
    style: {
      stroke: colorSet.edgeMainStroke,
      lineAppendWidth: 2
    },
    color: colorSet.edgeMainStroke
  },
  // 边应用状态后的样式，默认仅提供 active、selected、highlight、inactive、disable，用户可以自己扩展
  edgeStateStyles: {
    active: {
      stroke: colorSet.edgeActiveStroke,
      lineWidth: 1
    },
    selected: {
      stroke: colorSet.edgeSelectedStroke,
      lineWidth: 2,
      shadowColor: colorSet.edgeSelectedStroke,
      shadowBlur: 10,
      'text-shape': {
        fontWeight: 500
      }
    },
    highlight: {
      stroke: colorSet.edgeHighlightStroke,
      lineWidth: 2,
      'text-shape': {
        fontWeight: 500
      }
    },
    inactive: {
      stroke: colorSet.edgeInactiveStroke,
      lineWidth: 1
    },
    disable: {
      stroke: colorSet.edgeDisableStroke,
      lineWidth: 1
    }
  },
  comboLabel: {
    style: {
      fill: textColor,
      // textAlign: 'center',
      textBaseline: 'middle',
      fontSize: 12
    },
    refY: 10,
    refX: 10 // Combo 的默认文本不居中时的偏移量

  },
  defaultCombo: {
    type: 'circle',
    style: {
      fill: colorSet.comboMainFill,
      lineWidth: 1,
      stroke: colorSet.comboMainStroke,
      r: 5,
      width: 20,
      height: 10
    },
    size: [20, 5],
    color: colorSet.comboMainStroke,
    padding: [25, 20, 15, 20]
  },
  // combo 应用状态后的样式，默认仅提供 active、selected、highlight、inactive、disable，用户可以自己扩展
  comboStateStyles: {
    active: {
      stroke: colorSet.comboActiveStroke,
      lineWidth: 1,
      fill: colorSet.comboActiveFill
    },
    selected: {
      stroke: colorSet.comboSelectedStroke,
      lineWidth: 2,
      fill: colorSet.comboSelectedFill,
      shadowColor: colorSet.comboSelectedStroke,
      shadowBlur: 10,
      'text-shape': {
        fontWeight: 500
      }
    },
    highlight: {
      stroke: colorSet.comboHighlightStroke,
      lineWidth: 2,
      fill: colorSet.comboHighlightFill,
      'text-shape': {
        fontWeight: 500
      }
    },
    inactive: {
      stroke: colorSet.comboInactiveStroke,
      fill: colorSet.comboInactiveFill,
      lineWidth: 1
    },
    disable: {
      stroke: colorSet.comboDisableStroke,
      fill: colorSet.comboDisableFill,
      lineWidth: 1
    }
  },
  delegateStyle: {
    fill: '#F3F9FF',
    fillOpacity: 0.5,
    stroke: '#1890FF',
    strokeOpacity: 0.9,
    lineDash: [5, 5]
  }
};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765331, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  ' ': 0.3329986572265625,
  a: 0.5589996337890625,
  A: 0.6569992065429687,
  b: 0.58599853515625,
  B: 0.6769989013671875,
  c: 0.5469985961914062,
  C: 0.7279998779296875,
  d: 0.58599853515625,
  D: 0.705999755859375,
  e: 0.554998779296875,
  E: 0.63699951171875,
  f: 0.37299957275390627,
  F: 0.5769989013671875,
  g: 0.5909988403320312,
  G: 0.7479995727539063,
  h: 0.555999755859375,
  H: 0.7199996948242188,
  i: 0.255999755859375,
  I: 0.23699951171875,
  j: 0.26699981689453123,
  J: 0.5169998168945312,
  k: 0.5289993286132812,
  K: 0.6899993896484375,
  l: 0.23499908447265624,
  L: 0.5879989624023437,
  m: 0.854998779296875,
  M: 0.8819992065429687,
  n: 0.5589996337890625,
  N: 0.7189987182617188,
  o: 0.58599853515625,
  O: 0.7669998168945312,
  p: 0.58599853515625,
  P: 0.6419998168945312,
  q: 0.58599853515625,
  Q: 0.7669998168945312,
  r: 0.3649993896484375,
  R: 0.6759994506835938,
  s: 0.504998779296875,
  S: 0.6319992065429687,
  t: 0.354998779296875,
  T: 0.6189987182617187,
  u: 0.5599990844726562,
  U: 0.7139999389648437,
  v: 0.48199920654296874,
  V: 0.6389999389648438,
  w: 0.754998779296875,
  W: 0.929998779296875,
  x: 0.5089996337890625,
  X: 0.63699951171875,
  y: 0.4959991455078125,
  Y: 0.66199951171875,
  z: 0.48699951171875,
  Z: 0.6239990234375,
  '0': 0.6,
  '1': 0.40099945068359377,
  '2': 0.6,
  '3': 0.6,
  '4': 0.6,
  '5': 0.6,
  '6': 0.6,
  '7': 0.5469985961914062,
  '8': 0.6,
  '9': 0.6,
  '[': 0.3329986572265625,
  ']': 0.3329986572265625,
  ',': 0.26399993896484375,
  '.': 0.26399993896484375,
  ';': 0.26399993896484375,
  ':': 0.26399993896484375,
  '{': 0.3329986572265625,
  '}': 0.3329986572265625,
  '\\': 0.5,
  '|': 0.19499969482421875,
  '=': 0.604998779296875,
  '+': 0.604998779296875,
  '-': 0.604998779296875,
  _: 0.5,
  '`': 0.3329986572265625,
  ' ~': 0.8329986572265625,
  '!': 0.3329986572265625,
  '@': 0.8579986572265625,
  '#': 0.6,
  $: 0.6,
  '%': 0.9699996948242188,
  '^': 0.517999267578125,
  '&': 0.7259994506835937,
  '*': 0.505999755859375,
  '(': 0.3329986572265625,
  ')': 0.3329986572265625,
  '<': 0.604998779296875,
  '>': 0.604998779296875,
  '/': 0.5,
  '?': 0.53699951171875
};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765332, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ModeController", {
  enumerable: true,
  get: function get() {
    return _mode.default;
  }
});
Object.defineProperty(exports, "ViewController", {
  enumerable: true,
  get: function get() {
    return _view.default;
  }
});
Object.defineProperty(exports, "ItemController", {
  enumerable: true,
  get: function get() {
    return _item.default;
  }
});
Object.defineProperty(exports, "StateController", {
  enumerable: true,
  get: function get() {
    return _state.default;
  }
});

var _mode = _interopRequireDefault(require("./mode"));

var _view = _interopRequireDefault(require("./view"));

var _item = _interopRequireDefault(require("./item"));

var _state = _interopRequireDefault(require("./state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
}, function(modId) { var map = {"./mode":1685504765333,"./view":1685504765334,"./item":1685504765337,"./state":1685504765344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765333, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("@antv/util");

var _behavior = _interopRequireDefault(require("../../behavior/behavior"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModeController =
/** @class */
function () {
  function ModeController(graph) {
    this.graph = graph;
    this.destroyed = false;
    this.modes = graph.get('modes') || {
      default: []
    };
    this.formatModes();
    this.mode = graph.get('defaultMode') || 'default';
    this.currentBehaves = [];
    this.setMode(this.mode);
  }

  ModeController.prototype.formatModes = function () {
    var modes = this.modes;
    (0, _util.each)(modes, function (mode) {
      (0, _util.each)(mode, function (behavior, i) {
        if ((0, _util.isString)(behavior)) {
          mode[i] = {
            type: behavior
          };
        }
      });
    });
  };

  ModeController.prototype.setBehaviors = function (mode) {
    var graph = this.graph;
    var behaviors = this.modes[mode];
    var behaves = [];
    var behave;
    (0, _util.each)(behaviors || [], function (behavior) {
      var BehaviorInstance = _behavior.default.getBehavior(behavior.type || behavior);

      if (!BehaviorInstance) {
        return;
      }

      behave = new BehaviorInstance(behavior);

      if (behave) {
        behave.bind(graph);
        behaves.push(behave);
      }
    });
    this.currentBehaves = behaves;
  };

  ModeController.mergeBehaviors = function (modeBehaviors, behaviors) {
    (0, _util.each)(behaviors, function (behavior) {
      if (modeBehaviors.indexOf(behavior) < 0) {
        if ((0, _util.isString)(behavior)) {
          behavior = {
            type: behavior
          };
        }

        modeBehaviors.push(behavior);
      }
    });
    return modeBehaviors;
  };

  ModeController.filterBehaviors = function (modeBehaviors, behaviors) {
    var result = [];
    modeBehaviors.forEach(function (behavior) {
      var type = '';

      if ((0, _util.isString)(behavior)) {
        type = behavior;
      } else {
        // eslint-disable-next-line prefer-destructuring
        type = behavior.type;
      }

      if (behaviors.indexOf(type) < 0) {
        result.push(behavior);
      }
    });
    return result;
  };

  ModeController.prototype.setMode = function (mode) {
    var _a = this,
        modes = _a.modes,
        graph = _a.graph;

    var current = mode;
    var behaviors = modes[current];

    if (!behaviors) {
      return;
    }

    graph.emit('beforemodechange', {
      mode: mode
    });
    (0, _util.each)(this.currentBehaves, function (behave) {
      if (behave.delegate) behave.delegate.remove();
      behave.unbind(graph);
    });
    this.setBehaviors(current);
    graph.emit('aftermodechange', {
      mode: mode
    });
    this.mode = mode;
  };

  ModeController.prototype.getMode = function () {
    return this.mode;
  };
  /**
   * 动态增加或删除 Behavior
   *
   * @param {ModeType[]} behaviors
   * @param {(ModeType[] | ModeType)} modes
   * @param {boolean} isAdd
   * @returns {Mode}
   * @memberof Mode
   */


  ModeController.prototype.manipulateBehaviors = function (behaviors, modes, isAdd) {
    var _this = this;

    var behaves;

    if (!(0, _util.isArray)(behaviors)) {
      behaves = [behaviors];
    } else {
      behaves = behaviors;
    }

    if ((0, _util.isArray)(modes)) {
      (0, _util.each)(modes, function (mode) {
        if (!_this.modes[mode]) {
          if (isAdd) {
            _this.modes[mode] = behaves;
          }
        } else if (isAdd) {
          _this.modes[mode] = ModeController.mergeBehaviors(_this.modes[mode] || [], behaves);
        } else {
          _this.modes[mode] = ModeController.filterBehaviors(_this.modes[mode] || [], behaves);
        }
      });
      return this;
    }

    var currentMode = modes;

    if (!modes) {
      currentMode = this.mode; // isString(this.mode) ? this.mode : this.mode.type
    }

    if (!this.modes[currentMode]) {
      if (isAdd) {
        this.modes[currentMode] = behaves;
      }
    }

    if (isAdd) {
      this.modes[currentMode] = ModeController.mergeBehaviors(this.modes[currentMode] || [], behaves);
    } else {
      this.modes[currentMode] = ModeController.filterBehaviors(this.modes[currentMode] || [], behaves);
    }

    this.setMode(this.mode);
    return this;
  };
  /**
   * 更新行为参数
   * @param {string | ModeOption | ModeType} behavior 需要更新的行为
   * @param {string | string[]} modes 指定的模式中的行为，不指定则为 default
   * @return {Graph} Graph
   */


  ModeController.prototype.updateBehavior = function (behavior, newCfg, mode) {
    if ((0, _util.isString)(behavior)) {
      behavior = {
        type: behavior
      };
    }

    var behaviorSet = [];

    if (!mode || mode === this.mode || mode === 'default') {
      behaviorSet = this.currentBehaves;

      if (!behaviorSet || !behaviorSet.length) {
        console.warn('Update behavior failed! There is no behaviors in this mode on the graph.');
        return this;
      }

      var length_1 = behaviorSet.length;

      for (var i = 0; i < length_1; i++) {
        var behave = behaviorSet[i];

        if (behave.type === behavior.type) {
          behave.updateCfg(newCfg);
          return this;
        }

        if (i === length_1 - 1) console.warn('Update behavior failed! There is no such behavior in the mode');
      }
    } else {
      behaviorSet = this.modes[mode];

      if (!behaviorSet || !behaviorSet.length) {
        console.warn('Update behavior failed! There is no behaviors in this mode on the graph.');
        return this;
      }

      var length_2 = behaviorSet.length;

      for (var i = 0; i < length_2; i++) {
        var behave = behaviorSet[i];

        if (behave.type === behavior.type || behave === behavior.type) {
          if (behave === behavior.type) behave = {
            type: behave
          };
          Object.assign(behave, newCfg);
          behaviorSet[i] = behave;
          return this;
        }

        if (i === length_2 - 1) console.warn('Update behavior failed! There is no such behavior in the mode');
      }
    }

    return this;
  };

  ModeController.prototype.destroy = function () {
    this.graph = null;
    this.modes = null;
    this.currentBehaves = null;
    this.destroyed = true;
  };

  return ModeController;
}();

var _default = ModeController;
exports.default = _default;
}, function(modId) { var map = {"../../behavior/behavior":1685504765324}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765334, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tslib = require("tslib");

var _util = require("@antv/util");

var _domUtil = require("@antv/dom-util");

var _base = require("../../util/base");

var _math = require("../../util/math");

var ViewController =
/** @class */
function () {
  function ViewController(graph) {
    this.destroyed = false;
    this.graph = graph;
    this.destroyed = false;
  } // get view center coordinate


  ViewController.prototype.getViewCenter = function () {
    var padding = this.getFormatPadding();
    var graph = this.graph;
    var width = this.graph.get('width');
    var height = graph.get('height');
    return {
      x: (width - padding[1] - padding[3]) / 2 + padding[3],
      y: (height - padding[0] - padding[2]) / 2 + padding[0]
    };
  };

  ViewController.prototype.fitCenter = function () {
    var graph = this.graph;
    var group = graph.get('group');
    group.resetMatrix();
    var bbox = group.getCanvasBBox();
    if (bbox.width === 0 || bbox.height === 0) return;
    var viewCenter = this.getViewCenter();
    var groupCenter = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
  }; // fit view graph


  ViewController.prototype.fitView = function () {
    var graph = this.graph;
    var padding = this.getFormatPadding();
    var width = graph.get('width');
    var height = graph.get('height');
    var group = graph.get('group');
    group.resetMatrix();
    var bbox = group.getCanvasBBox();
    if (bbox.width === 0 || bbox.height === 0) return;
    var viewCenter = this.getViewCenter();
    var groupCenter = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
    };
    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
    var w = (width - padding[1] - padding[3]) / bbox.width;
    var h = (height - padding[0] - padding[2]) / bbox.height;
    var ratio = w;

    if (w > h) {
      ratio = h;
    }

    graph.zoom(ratio, viewCenter);
  };

  ViewController.prototype.getFormatPadding = function () {
    var padding = this.graph.get('fitViewPadding');
    return (0, _base.formatPadding)(padding);
  };

  ViewController.prototype.focusPoint = function (point, animate, animateCfg) {
    var _this = this;

    var viewCenter = this.getViewCenter();
    var modelCenter = this.getPointByCanvas(viewCenter.x, viewCenter.y);
    var viewportMatrix = this.graph.get('group').getMatrix();
    if (!viewportMatrix) viewportMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    if (animate) {
      var dx_1 = (modelCenter.x - point.x) * viewportMatrix[0];
      var dy_1 = (modelCenter.y - point.y) * viewportMatrix[4];
      var lastX_1 = 0;
      var lastY_1 = 0;
      var newX_1 = 0;
      var newY_1 = 0; // 动画每次平移一点，直到目标位置

      this.graph.get('canvas').animate(function (ratio) {
        newX_1 = dx_1 * ratio;
        newY_1 = dy_1 * ratio;

        _this.graph.translate(newX_1 - lastX_1, newY_1 - lastY_1);

        lastX_1 = newX_1;
        lastY_1 = newY_1;
      }, (0, _tslib.__assign)({}, animateCfg));
    } else {
      this.graph.translate((modelCenter.x - point.x) * viewportMatrix[0], (modelCenter.y - point.y) * viewportMatrix[4]);
    }
  };
  /**
   * 将 Canvas 坐标转成视口坐标
   * @param canvasX canvas x 坐标
   * @param canvasY canvas y 坐标
   */


  ViewController.prototype.getPointByCanvas = function (canvasX, canvasY) {
    var viewportMatrix = this.graph.get('group').getMatrix();

    if (!viewportMatrix) {
      viewportMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }

    var point = (0, _math.invertMatrix)({
      x: canvasX,
      y: canvasY
    }, viewportMatrix);
    return point;
  };
  /**
   * 将页面坐标转成视口坐标
   * @param clientX 页面 x 坐标
   * @param clientY 页面 y 坐标
   */


  ViewController.prototype.getPointByClient = function (clientX, clientY) {
    var canvas = this.graph.get('canvas');
    var canvasPoint = canvas.getPointByClient(clientX, clientY);
    return this.getPointByCanvas(canvasPoint.x, canvasPoint.y);
  };
  /**
   * 将视口坐标转成页面坐标
   * @param x 视口 x 坐标
   * @param y 视口 y 坐标
   */


  ViewController.prototype.getClientByPoint = function (x, y) {
    var canvas = this.graph.get('canvas');
    var canvasPoint = this.getCanvasByPoint(x, y);
    var point = canvas.getClientByPoint(canvasPoint.x, canvasPoint.y);
    return {
      x: point.x,
      y: point.y
    };
  };
  /**
   * 将视口坐标转成 Canvas 坐标
   * @param x 视口 x 坐标
   * @param y 视口 y 坐标
   */


  ViewController.prototype.getCanvasByPoint = function (x, y) {
    var viewportMatrix = this.graph.get('group').getMatrix();

    if (!viewportMatrix) {
      viewportMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }

    return (0, _math.applyMatrix)({
      x: x,
      y: y
    }, viewportMatrix);
  };
  /**
   * 将元素移动到画布中心
   * @param item Item 实例或 id
   * @param {boolean} animate 是否带有动画地移动
   * @param {GraphAnimateConfig} animateCfg 若带有动画，动画的配置项
   */


  ViewController.prototype.focus = function (item, animate, animateCfg) {
    if ((0, _util.isString)(item)) {
      item = this.graph.findById(item);
    }

    if (item) {
      var x = 0,
          y = 0;

      if (item.getType && item.getType() === 'edge') {
        var sourceMatrix = item.getSource().get('group').getMatrix();
        var targetMatrix = item.getTarget().get('group').getMatrix();

        if (sourceMatrix && targetMatrix) {
          x = (sourceMatrix[6] + targetMatrix[6]) / 2;
          y = (sourceMatrix[7] + targetMatrix[7]) / 2;
        } else if (sourceMatrix || targetMatrix) {
          x = sourceMatrix ? sourceMatrix[6] : targetMatrix[6];
          y = sourceMatrix ? sourceMatrix[7] : targetMatrix[7];
        }
      } else {
        var group = item.get('group');
        var matrix = group.getMatrix();
        if (!matrix) matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        x = matrix[6];
        y = matrix[7];
      } // 用实际位置而不是model中的x,y,防止由于拖拽等的交互导致model的x,y并不是当前的x,y


      this.focusPoint({
        x: x,
        y: y
      }, animate, animateCfg);
    }
  };
  /**
   * 改变 canvas 画布的宽度和高度
   * @param width canvas 宽度
   * @param height canvas 高度
   */


  ViewController.prototype.changeSize = function (width, height) {
    var graph = this.graph;

    if (!(0, _util.isNumber)(width) || !(0, _util.isNumber)(height)) {
      throw Error('invalid canvas width & height, please make sure width & height type is number');
    }

    graph.set({
      width: width,
      height: height
    });
    var canvas = graph.get('canvas');
    canvas.changeSize(width, height); // change the size of grid plugin if it exists on graph

    var plugins = graph.get('plugins');
    plugins.forEach(function (plugin) {
      if (plugin.get('gridContainer')) {
        var minZoom = graph.get('minZoom');
        (0, _domUtil.modifyCSS)(plugin.get('container'), {
          width: width + "px",
          height: height + "px"
        });
        (0, _domUtil.modifyCSS)(plugin.get('gridContainer'), {
          width: width / minZoom + "px",
          height: height / minZoom + "px",
          left: 0,
          top: 0
        });
      }
    });
  };

  ViewController.prototype.destroy = function () {
    this.graph = null;
    this.destroyed = false;
  };

  return ViewController;
}();

var _default = ViewController;
exports.default = _default;
}, function(modId) { var map = {"../../util/base":1685504765335,"../../util/math":1685504765327}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765335, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processParallelEdges = exports.calculationItemsBBox = exports.isNaN = exports.isViewportChanged = exports.cloneEvent = exports.formatPadding = exports.uniqueId = void 0;

var _util = require("@antv/util");

var _behavior = require("../interface/behavior");

var uniqueId = function uniqueId(type) {
  return type + "-" + Math.random() + Date.now();
};
/**
 * turn padding into [top, right, bottom, right]
 * @param  {Number|Array} padding input padding
 * @return {array} output
 */


exports.uniqueId = uniqueId;

var formatPadding = function formatPadding(padding) {
  var top = 0;
  var left = 0;
  var right = 0;
  var bottom = 0;

  if ((0, _util.isNumber)(padding)) {
    top = left = right = bottom = padding;
  } else if ((0, _util.isString)(padding)) {
    var intPadding = parseInt(padding, 10);
    top = left = right = bottom = intPadding;
  } else if ((0, _util.isArray)(padding)) {
    top = padding[0];
    right = !(0, _util.isNil)(padding[1]) ? padding[1] : padding[0];
    bottom = !(0, _util.isNil)(padding[2]) ? padding[2] : padding[0];
    left = !(0, _util.isNil)(padding[3]) ? padding[3] : right;
  }

  return [top, right, bottom, left];
};
/**
 * clone event
 * @param e
 */


exports.formatPadding = formatPadding;

var cloneEvent = function cloneEvent(e) {
  var event = new _behavior.G6GraphEvent(e.type, e);
  event.clientX = e.clientX;
  event.clientY = e.clientY;
  event.x = e.x;
  event.y = e.y;
  event.target = e.target;
  event.currentTarget = e.currentTarget;
  event.bubbles = true;
  event.item = e.item;
  return event;
};
/**
 * 判断 viewport 是否改变，通过和单位矩阵对比
 * @param matrix Viewport 的 Matrix
 */


exports.cloneEvent = cloneEvent;

var isViewportChanged = function isViewportChanged(matrix) {
  // matrix 为 null， 则说明没有变化
  if (!matrix) {
    return false;
  }

  var MATRIX_LEN = 9;
  var ORIGIN_MATRIX = [1, 0, 0, 0, 1, 0, 0, 0, 1];

  for (var i = 0; i < MATRIX_LEN; i++) {
    if (matrix[i] !== ORIGIN_MATRIX[i]) {
      return true;
    }
  }

  return false;
};

exports.isViewportChanged = isViewportChanged;

var isNaN = function isNaN(input) {
  return Number.isNaN(Number(input));
};
/**
 * 计算一组 Item 的 BBox
 * @param items 选中的一组Item，可以是 node 或 combo
 */


exports.isNaN = isNaN;

var calculationItemsBBox = function calculationItemsBBox(items) {
  var minx = Infinity;
  var maxx = -Infinity;
  var miny = Infinity;
  var maxy = -Infinity; // 获取已节点的所有最大最小x y值

  for (var i = 0; i < items.length; i++) {
    var element = items[i];
    var bbox = element.getBBox();
    var minX = bbox.minX,
        minY = bbox.minY,
        maxX = bbox.maxX,
        maxY = bbox.maxY;

    if (minX < minx) {
      minx = minX;
    }

    if (minY < miny) {
      miny = minY;
    }

    if (maxX > maxx) {
      maxx = maxX;
    }

    if (maxY > maxy) {
      maxy = maxY;
    }
  }

  var x = Math.floor(minx);
  var y = Math.floor(miny);
  var width = Math.ceil(maxx) - Math.floor(minx);
  var height = Math.ceil(maxy) - Math.floor(miny);
  return {
    x: x,
    y: y,
    width: width,
    height: height,
    minX: minx,
    minY: miny,
    maxX: maxx,
    maxY: maxy
  };
};
/**
 * 若 edges 中存在两端点相同的边，使用 quadratic 边并自动计算 curveOffset 使它们不相互重叠
 * 文档: https://g6.antv.vision/en/docs/api/Util
 * @param edges 边数据集合
 * @param offsetDiff 相邻两边的 offset 之差
 * @param multiEdgeType
 * @param singleEdgeType
 * @param loopEdgeType
 */


exports.calculationItemsBBox = calculationItemsBBox;

var processParallelEdges = function processParallelEdges(edges, offsetDiff, multiEdgeType, singleEdgeType, loopEdgeType) {
  if (offsetDiff === void 0) {
    offsetDiff = 15;
  }

  if (multiEdgeType === void 0) {
    multiEdgeType = 'quadratic';
  }

  if (singleEdgeType === void 0) {
    singleEdgeType = undefined;
  }

  if (loopEdgeType === void 0) {
    loopEdgeType = undefined;
  }

  var len = edges.length;
  var cod = offsetDiff * 2;
  var loopPosition = ['top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'];
  var edgeMap = {};
  var tags = [];
  var reverses = {};

  for (var i = 0; i < len; i++) {
    var edge = edges[i];
    var source = edge.source,
        target = edge.target;
    var sourceTarget = source + "-" + target;
    if (tags[i]) continue;

    if (!edgeMap[sourceTarget]) {
      edgeMap[sourceTarget] = [];
    }

    tags[i] = true;
    edgeMap[sourceTarget].push(edge);

    for (var j = 0; j < len; j++) {
      if (i === j) continue;
      var sedge = edges[j];
      var src = sedge.source;
      var dst = sedge.target; // 两个节点之间共同的边
      // 第一条的source = 第二条的target
      // 第一条的target = 第二条的source

      if (!tags[j]) {
        if (source === dst && target === src) {
          edgeMap[sourceTarget].push(sedge);
          tags[j] = true;
          reverses[src + "|" + dst + "|" + (edgeMap[sourceTarget].length - 1)] = true;
        } else if (source === src && target === dst) {
          edgeMap[sourceTarget].push(sedge);
          tags[j] = true;
        }
      }
    }
  }

  for (var key in edgeMap) {
    var arcEdges = edgeMap[key];
    var length_1 = arcEdges.length;

    for (var k = 0; k < length_1; k++) {
      var current = arcEdges[k];

      if (current.source === current.target) {
        if (loopEdgeType) current.type = loopEdgeType; // 超过8条自环边，则需要重新处理

        current.loopCfg = {
          position: loopPosition[k % 8],
          dist: Math.floor(k / 8) * 20 + 50
        };
        continue;
      }

      if (length_1 === 1 && singleEdgeType && current.source !== current.target) {
        current.type = singleEdgeType;
        continue;
      }

      current.type = multiEdgeType;
      var sign = (k % 2 === 0 ? 1 : -1) * (reverses[current.source + "|" + current.target + "|" + k] ? -1 : 1);

      if (length_1 % 2 === 1) {
        current.curveOffset = sign * Math.ceil(k / 2) * cod;
      } else {
        current.curveOffset = sign * (Math.floor(k / 2) * cod + offsetDiff);
      }
    }
  }

  return edges;
};

exports.processParallelEdges = processParallelEdges;
}, function(modId) { var map = {"../interface/behavior":1685504765336}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765336, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.G6GraphEvent = void 0;

var _tslib = require("tslib");

var _gBase = require("@antv/g-base");

var G6GraphEvent =
/** @class */
function (_super) {
  (0, _tslib.__extends)(G6GraphEvent, _super);

  function G6GraphEvent(type, event) {
    var _this = _super.call(this, type, event) || this;

    _this.item = event.item;
    _this.canvasX = event.canvasX;
    _this.canvasY = event.canvasY;
    _this.wheelDelta = event.wheelDelta;
    _this.detail = event.detail;
    return _this;
  }

  return G6GraphEvent;
}(_gBase.Event);

exports.G6GraphEvent = G6GraphEvent;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765337, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tslib = require("tslib");

var _util = require("@antv/util");

var _edge = _interopRequireDefault(require("../../item/edge"));

var _node = _interopRequireDefault(require("../../item/node"));

var _combo = _interopRequireDefault(require("../../item/combo"));

var _graphic = require("../../util/graphic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NODE = 'node';
var EDGE = 'edge';
var VEDGE = 'vedge';
var COMBO = 'combo';
var CFG_PREFIX = 'default';
var MAPPER_SUFFIX = 'Mapper';
var STATE_SUFFIX = 'stateStyles';

var ItemController =
/** @class */
function () {
  function ItemController(graph) {
    this.graph = graph;
    this.destroyed = false;
  }
  /**
   * 增加 Item 实例
   *
   * @param {ITEM_TYPE} type 实例类型，node 或 edge
   * @param {(NodeConfig & EdgeConfig)} model 数据模型
   * @returns {(Item)}
   * @memberof ItemController
   */


  ItemController.prototype.addItem = function (type, model) {
    var graph = this.graph;
    var vType = type === VEDGE ? EDGE : type;
    var parent = graph.get(vType + "Group") || graph.get('group');
    var upperType = (0, _util.upperFirst)(vType);
    var item = null; // 获取 this.get('styles') 中的值

    var styles = graph.get(vType + (0, _util.upperFirst)(STATE_SUFFIX)) || {};
    var defaultModel = graph.get(CFG_PREFIX + upperType);

    if (model[STATE_SUFFIX]) {
      // 设置 this.get('styles') 中的值
      styles = model[STATE_SUFFIX];
    }

    if (defaultModel) {
      // 很多布局会直接修改原数据模型，所以不能用 merge 的形式，逐个写入原 model 中
      (0, _util.each)(defaultModel, function (val, cfg) {
        if ((0, _util.isObject)(val) && !(0, _util.isArray)(val)) {
          model[cfg] = (0, _util.deepMix)({}, val, model[cfg]);
        } else if ((0, _util.isArray)(val)) {
          model[cfg] = model[cfg] || (0, _util.clone)(defaultModel[cfg]);
        } else {
          model[cfg] = model[cfg] || defaultModel[cfg];
        }
      });
    }

    var mapper = graph.get(vType + MAPPER_SUFFIX);

    if (mapper) {
      var mappedModel_1 = mapper(model);

      if (mappedModel_1[STATE_SUFFIX]) {
        // 设置 this.get('styles') 中的值
        styles = mappedModel_1[STATE_SUFFIX];
        delete mappedModel_1[STATE_SUFFIX];
      } // 如果配置了 defaultEdge 或 defaultNode，则将默认配置的数据也合并进去


      (0, _util.each)(mappedModel_1, function (val, cfg) {
        if ((0, _util.isObject)(val) && !(0, _util.isArray)(val)) {
          model[cfg] = (0, _util.deepMix)({}, model[cfg], val);
        } else {
          model[cfg] = mappedModel_1[cfg] || model[cfg];
        }
      });
    }

    graph.emit('beforeadditem', {
      type: type,
      model: model
    });

    if (type === EDGE || type === VEDGE) {
      var source = void 0;
      var target = void 0;
      source = model.source; // eslint-disable-line prefer-destructuring

      target = model.target; // eslint-disable-line prefer-destructuring

      if (source && (0, _util.isString)(source)) {
        source = graph.findById(source);
      }

      if (target && (0, _util.isString)(target)) {
        target = graph.findById(target);
      }

      if (!source || !target) {
        console.warn("The source or target node of edge " + model.id + " does not exist!");
        return;
      }

      if (source.getType && source.getType() === 'combo') {
        model.isComboEdge = true; // graph.updateCombo(source as ICombo);
      }

      if (target.getType && target.getType() === 'combo') {
        model.isComboEdge = true; // graph.updateCombo(target as ICombo);
      }

      item = new _edge.default({
        model: model,
        source: source,
        target: target,
        styles: styles,
        linkCenter: graph.get('linkCenter'),
        group: parent.addGroup()
      });
    } else if (type === NODE) {
      item = new _node.default({
        model: model,
        styles: styles,
        group: parent.addGroup()
      });
    } else if (type === COMBO) {
      var children = model.children;
      var comboBBox = (0, _graphic.getComboBBox)(children, graph);
      if (!isNaN(comboBBox.x)) model.x = comboBBox.x;else if (isNaN(model.x)) model.x = Math.random() * 100;
      if (!isNaN(comboBBox.y)) model.y = comboBBox.y;else if (isNaN(model.y)) model.y = Math.random() * 100;
      var comboGroup = parent.addGroup();
      comboGroup.setZIndex(model.depth);
      item = new _combo.default({
        model: model,
        styles: styles,
        bbox: model.collapsed ? (0, _graphic.getComboBBox)([], graph) : comboBBox,
        group: comboGroup
      });
      var comboModel_1 = item.getModel();
      (children || []).forEach(function (child) {
        var childItem = graph.findById(child.id);
        item.addChild(childItem);
        child.depth = comboModel_1.depth + 2;
      }); // collapse the combo if the collapsed is true in the model

      if (model.collapsed) {
        setTimeout(function () {
          graph.collapseCombo(item);
        }, 16);
      }
    }

    if (item) {
      graph.get(type + "s").push(item);
      graph.get('itemMap')[item.get('id')] = item;
      graph.emit('afteradditem', {
        item: item,
        model: model
      }); // eslint-disable-next-line consistent-return

      return item;
    }
  };
  /**
   * 更新节点或边
   *
   * @param {Item} item ID 或 实例
   * @param {(EdgeConfig | Partial<NodeConfig>)} cfg 数据模型
   * @returns
   * @memberof ItemController
   */


  ItemController.prototype.updateItem = function (item, cfg) {
    var _a, _b;

    var graph = this.graph;

    if ((0, _util.isString)(item)) {
      item = graph.findById(item);
    }

    if (!item || item.destroyed) {
      return;
    } // 更新的 item 的类型


    var type = '';
    if (item.getType) type = item.getType();
    var mapper = graph.get(type + MAPPER_SUFFIX);
    var model = item.getModel();
    var isOnlyMove = item.isOnlyMove(cfg);

    if (mapper) {
      var result = (0, _util.deepMix)({}, model, cfg);
      var mappedModel = mapper(result); // 将 update 时候用户传入的参数与mapperModel做deepMix，以便复用之前设置的参数值

      var newModel = (0, _util.deepMix)({}, model, mappedModel, cfg);

      if (mappedModel[STATE_SUFFIX]) {
        item.set('styles', newModel[STATE_SUFFIX]);
        delete newModel[STATE_SUFFIX];
      }

      (0, _util.each)(newModel, function (val, key) {
        cfg[key] = val;
      });
    } else {
      // merge update传进来的对象参数，model中没有的数据不做处理，对象和字符串值也不做处理，直接替换原来的
      (0, _util.each)(cfg, function (val, key) {
        if (model[key]) {
          if ((0, _util.isObject)(val) && !(0, _util.isArray)(val)) {
            cfg[key] = (0, _tslib.__assign)((0, _tslib.__assign)({}, model[key]), cfg[key]);
          }
        }
      });
    } // emit beforeupdateitem 事件


    graph.emit('beforeupdateitem', {
      item: item,
      cfg: cfg
    });

    if (type === EDGE) {
      // 若是边要更新source || target, 为了不影响示例内部model，并且重新计算startPoint和endPoint，手动设置
      if (cfg.source) {
        var source = cfg.source;

        if ((0, _util.isString)(source)) {
          source = graph.findById(source);
        }

        item.setSource(source);
      }

      if (cfg.target) {
        var target = cfg.target;

        if ((0, _util.isString)(target)) {
          target = graph.findById(target);
        }

        item.setTarget(target);
      }

      item.update(cfg);
    } // item.update(cfg);


    if (type === NODE || type === COMBO) {
      item.update(cfg, isOnlyMove);
      var edges_1 = item.getEdges();
      var refreshEdge = (0, _graphic.shouldRefreshEdge)(cfg);
      if (refreshEdge && type === NODE) (0, _util.each)(edges_1, function (edge) {
        edge.refresh();
      });else if (refreshEdge && type === COMBO) {
        var shapeFactory = item.get('shapeFactory');
        var shapeType = model.type || 'circle';
        var comboAnimate = model.animate === undefined || cfg.animate === undefined ? (_b = (_a = shapeFactory[shapeType]) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.animate : model.animate || cfg.animate;

        if (comboAnimate) {
          setTimeout(function () {
            if (!item || item.destroyed) return;
            var keyShape = item.getKeyShape();
            if (!keyShape || keyShape.destroyed) return;
            (0, _util.each)(edges_1, function (edge) {
              if (edge && !edge.destroyed) edge.refresh();
            });
          }, 201);
        } else {
          (0, _util.each)(edges_1, function (edge) {
            edge.refresh();
          });
        }
      }
    }

    graph.emit('afterupdateitem', {
      item: item,
      cfg: cfg
    });
  };
  /**
   * 根据 combo 的子元素更新 combo 的位置及大小
   *
   * @param {ICombo} combo ID 或 实例
   * @returns
   * @memberof ItemController
   */


  ItemController.prototype.updateCombo = function (combo, children) {
    var _this = this;

    var _a, _b;

    var graph = this.graph;

    if ((0, _util.isString)(combo)) {
      combo = graph.findById(combo);
    }

    if (!combo || combo.destroyed) {
      return;
    }

    var model = combo.getModel();
    var comboBBox = (0, _graphic.getComboBBox)(model.collapsed ? [] : children, graph);
    combo.set('bbox', comboBBox);
    combo.update({
      x: comboBBox.x,
      y: comboBBox.y
    });
    var shapeFactory = combo.get('shapeFactory');
    var shapeType = model.type || 'circle';
    var comboAnimate = model.animate === undefined ? (_b = (_a = shapeFactory[shapeType]) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.animate : model.animate;

    if (comboAnimate) {
      setTimeout(function () {
        if (!combo || combo.destroyed) return;
        var keyShape = combo.getKeyShape();
        if (!keyShape || keyShape.destroyed) return;
        combo.getShapeCfg(model); // 更新 combo 缓存的 size

        _this.updateComboEdges(combo);
      }, 201);
    } else {
      this.updateComboEdges(combo);
    }
  };

  ItemController.prototype.updateComboEdges = function (combo) {
    var combEdges = combo.getEdges() || [];

    for (var i = 0; i < combEdges.length; i++) {
      var edge = combEdges[i];

      if (edge && !edge.destroyed) {
        var edgeSF = edge.get('shapeFactory');
        var edgeCfg = edge.getShapeCfg(edge.getModel());
        var edgeGroup = edge.getContainer();
        edgeGroup.clear();
        var keyShape = edgeSF.draw(edgeCfg.type, edgeCfg, edgeGroup);
        edge.set('keyShape', keyShape);
        keyShape.set('isKeyShape', true);
        keyShape.set('draggable', true);
        edge.setOriginStyle();
      }
    }
  };
  /**
   * 收起 combo，隐藏相关元素
   */


  ItemController.prototype.collapseCombo = function (combo) {
    var graph = this.graph;

    if ((0, _util.isString)(combo)) {
      combo = graph.findById(combo);
    }

    var children = combo.getChildren();
    children.nodes.forEach(function (node) {
      graph.hideItem(node);
    });
    children.combos.forEach(function (c) {
      graph.hideItem(c);
    });
  };
  /**
   * 展开 combo，相关元素出现
   * 若子 combo 原先是收起状态，则保持它的收起状态
   */


  ItemController.prototype.expandCombo = function (combo) {
    var graph = this.graph;

    if ((0, _util.isString)(combo)) {
      combo = graph.findById(combo);
    }

    var children = combo.getChildren();
    children.nodes.forEach(function (node) {
      graph.showItem(node);
    });
    children.combos.forEach(function (c) {
      if (c.getModel().collapsed) {
        c.show();
      } else {
        graph.showItem(c);
      }
    });
  };
  /**
   * 删除指定的节点或边
   *
   * @param {Item} item item ID 或实例
   * @returns {void}
   * @memberof ItemController
   */


  ItemController.prototype.removeItem = function (item) {
    var _this = this;

    var graph = this.graph;

    if ((0, _util.isString)(item)) {
      item = graph.findById(item);
    }

    if (!item || item.destroyed) {
      return;
    }

    var itemModel = (0, _util.clone)(item.getModel());
    graph.emit('beforeremoveitem', {
      item: itemModel
    });
    var type = '';
    if (item.getType) type = item.getType();
    var items = graph.get(type + "s");
    var index = items.indexOf(item);
    if (index > -1) items.splice(index, 1);

    if (type === EDGE) {
      var vitems = graph.get("v" + type + "s");
      var vindex = vitems.indexOf(item);
      if (vindex > -1) vitems.splice(vindex, 1);
    }

    var itemId = item.get('id');
    var itemMap = graph.get('itemMap');
    delete itemMap[itemId];
    var comboTrees = graph.get('comboTrees');
    var id = item.get('id');

    if (type === NODE) {
      var comboId = item.getModel().comboId;

      if (comboTrees && comboId) {
        var brothers_1 = comboTrees;
        var found_1 = false; // the flag to terminate the forEach circulation
        // remove the node from the children array of its parent fromt he tree

        comboTrees.forEach(function (ctree) {
          if (found_1) return;
          (0, _graphic.traverseTree)(ctree, function (combo) {
            if (combo.id === id && brothers_1) {
              var bidx = brothers_1.indexOf(combo);
              brothers_1.splice(bidx, 1);
              found_1 = true;
              return false; // terminate the traverse
            }

            brothers_1 = combo.children;
            return true;
          });
        });
      } // 若移除的是节点，需要将与之相连的边一同删除


      var edges = item.getEdges();

      for (var i = edges.length - 1; i >= 0; i--) {
        graph.removeItem(edges[i], false);
      }

      if (comboId) graph.updateCombo(comboId);
    } else if (type === COMBO) {
      var parentId = item.getModel().parentId;
      var comboInTree_1; // find the subtree rooted at the item to be removed

      var found_2 = false; // the flag to terminate the forEach circulation

      (comboTrees || []).forEach(function (ctree) {
        if (found_2) return;
        (0, _graphic.traverseTree)(ctree, function (combo) {
          if (combo.id === id) {
            comboInTree_1 = combo;
            found_2 = true;
            return false; // terminate the traverse
          }

          return true;
        });
      });
      comboInTree_1.removed = true;

      if (comboInTree_1 && comboInTree_1.children) {
        comboInTree_1.children.forEach(function (child) {
          _this.removeItem(child.id);
        });
      } // 若移除的是 combo，需要将与之相连的边一同删除


      var edges = item.getEdges();

      for (var i = edges.length; i >= 0; i--) {
        graph.removeItem(edges[i], false);
      }

      if (parentId) graph.updateCombo(parentId);
    }

    item.destroy();
    graph.emit('afterremoveitem', {
      item: itemModel
    });
  };
  /**
   * 更新 item 状态
   *
   * @param {Item} item Item 实例
   * @param {string} state 状态名称
   * @param {boolean} value 是否启用状态或状态值
   * @returns {void}
   * @memberof ItemController
   */


  ItemController.prototype.setItemState = function (item, state, value) {
    var graph = this.graph;
    var stateName = state;

    if ((0, _util.isString)(value)) {
      stateName = state + ":" + value;
    } // 已经存在要设置的 state，或不存在 state 的样式为 undefined


    if (item.hasState(stateName) === value && value || // 当该状态已经存在且现在需要设置为 true 时，不需要继续。当该状态不存在，且设置为 false 时，需要继续
    (0, _util.isString)(value) && item.hasState(stateName)) {
      // 当该状态 value 是字符串，且已经存在该状态，不需要继续
      return;
    }

    graph.emit('beforeitemstatechange', {
      item: item,
      state: stateName,
      enabled: value
    });
    item.setState(state, value);
    graph.autoPaint();
    graph.emit('afteritemstatechange', {
      item: item,
      state: stateName,
      enabled: value
    });
  };
  /**
   * 将指定状态的优先级提升为最高优先级
   * @param {Item} item 元素id或元素实例
   * @param state 状态名称
   */


  ItemController.prototype.priorityState = function (item, state) {
    var graph = this.graph;
    var currentItem = item;

    if ((0, _util.isString)(item)) {
      currentItem = graph.findById(item);
    } // 先取消已有的 state


    this.setItemState(currentItem, state, false); // 再设置state，则此时该优先级为最高

    this.setItemState(currentItem, state, true);
  };
  /**
   * 清除所有指定的状态
   *
   * @param {Item} item Item 实例
   * @param {string[]} states 状态名称集合
   * @memberof ItemController
   */


  ItemController.prototype.clearItemStates = function (item, states) {
    var graph = this.graph;

    if ((0, _util.isString)(item)) {
      item = graph.findById(item);
    }

    graph.emit('beforeitemstatesclear', {
      item: item,
      states: states
    });
    item.clearStates(states);
    graph.emit('afteritemstatesclear', {
      item: item,
      states: states
    });
  };
  /**
   * 刷新指定的 Item
   *
   * @param {Item} item Item ID 或 实例
   * @memberof ItemController
   */


  ItemController.prototype.refreshItem = function (item) {
    var graph = this.graph;

    if ((0, _util.isString)(item)) {
      item = graph.findById(item);
    }

    graph.emit('beforeitemrefresh', {
      item: item
    }); // 调用 Item 的 refresh 方法，实现刷新功能

    item.refresh();
    graph.emit('afteritemrefresh', {
      item: item
    });
  };
  /**
   * 根据 graph 上用 combos 数据生成的 comboTree 来增加所有 combos
   *
   * @param {ComboTree[]} comboTrees graph 上用 combos 数据生成的 comboTree
   * @param {ComboConfig[]} comboModels combos 数据
   * @memberof ItemController
   */


  ItemController.prototype.addCombos = function (comboTrees, comboModels) {
    var _this = this;

    var graph = this.graph;
    (comboTrees || []).forEach(function (ctree) {
      (0, _graphic.traverseTreeUp)(ctree, function (child) {
        var comboModel;
        comboModels.forEach(function (model) {
          if (model.id === child.id) {
            model.children = child.children;
            model.depth = child.depth;
            comboModel = model;
          }
        });

        if (comboModel) {
          _this.addItem('combo', comboModel);
        }

        return true;
      });
    });
    var comboGroup = graph.get('comboGroup');
    if (comboGroup) comboGroup.sort();
  };
  /**
   * 改变Item的显示状态
   *
   * @param {Item} item Item ID 或 实例
   * @param {boolean} visible 是否显示
   * @memberof ItemController
   */


  ItemController.prototype.changeItemVisibility = function (item, visible) {
    var _this = this;

    var graph = this.graph;

    if ((0, _util.isString)(item)) {
      item = graph.findById(item);
    }

    if (!item) {
      console.warn('The item to be shown or hidden does not exist!');
      return;
    }

    graph.emit('beforeitemvisibilitychange', {
      item: item,
      visible: visible
    });
    item.changeVisibility(visible);

    if (item.getType && item.getType() === NODE) {
      var edges = item.getEdges();
      (0, _util.each)(edges, function (edge) {
        // 若隐藏节点，则将与之关联的边也隐藏
        // 若显示节点，则将与之关联的边也显示，但是需要判断边两端的节点都是可见的
        if (visible && !(edge.get('source').isVisible() && edge.get('target').isVisible())) {
          return;
        }

        _this.changeItemVisibility(edge, visible);
      });
    } else if (item.getType && item.getType() === COMBO) {
      var comboTrees = graph.get('comboTrees');
      var id_1 = item.get('id');
      var children_1 = [];
      var found_3 = false; // flag the terminate the forEach

      (comboTrees || []).forEach(function (ctree) {
        if (found_3) return;
        if (!ctree.children || ctree.children.length === 0) return;
        (0, _graphic.traverseTree)(ctree, function (combo) {
          if (combo.id === id_1) {
            children_1 = combo.children;
            found_3 = true;
            return false; // terminate the traverse
          }

          return true;
        });
      });

      if (children_1 && (!visible || visible && !item.getModel().collapsed)) {
        children_1.forEach(function (child) {
          var childItem = graph.findById(child.id);

          _this.changeItemVisibility(childItem, visible);
        });
      }

      var edges = item.getEdges();
      (0, _util.each)(edges, function (edge) {
        // 若隐藏 combo，则将与 combo 本身关联的边也隐藏
        // 若显示 combo，则将与 combo 本身关联的边也显示，但是需要判断边两端的节点都是可见的
        if (visible && !(edge.get('source').isVisible() && edge.get('target').isVisible())) {
          return;
        }

        _this.changeItemVisibility(edge, visible);
      });
    }

    graph.emit('afteritemvisibilitychange', {
      item: item,
      visible: visible
    });
    return item;
  };

  ItemController.prototype.destroy = function () {
    this.graph = null;
    this.destroyed = true;
  };

  return ItemController;
}();

var _default = ItemController;
exports.default = _default;
}, function(modId) { var map = {"../../item/edge":1685504765338,"../../item/node":1685504765342,"../../item/combo":1685504765343,"../../util/graphic":1685504765329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765338, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tslib = require("tslib");

var _util = require("@antv/util");

var _item = _interopRequireDefault(require("./item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var END_MAP = {
  source: 'start',
  target: 'end'
};
var ITEM_NAME_SUFFIX = 'Node'; // 端点的后缀，如 sourceNode, targetNode

var POINT_NAME_SUFFIX = 'Point'; // 起点或者结束点的后缀，如 startPoint, endPoint

var ANCHOR_NAME_SUFFIX = 'Anchor';

var Edge =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Edge, _super);

  function Edge() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Edge.prototype.getDefaultCfg = function () {
    return {
      type: 'edge',
      sourceNode: null,
      targetNode: null,
      startPoint: null,
      endPoint: null,
      linkCenter: false
    };
  };

  Edge.prototype.setEnd = function (name, value) {
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var itemName = name + ITEM_NAME_SUFFIX;
    var preItem = this.get(itemName);

    if (preItem && !preItem.destroyed) {
      // 如果之前存在节点，则移除掉边
      preItem.removeEdge(this);
    }

    if ((0, _util.isPlainObject)(value)) {
      // 如果设置成具体的点，则清理节点
      this.set(pointName, value);
      this.set(itemName, null);
    } else {
      value.addEdge(this);
      this.set(itemName, value);
      this.set(pointName, null);
    }
  };
  /**
   * 获取连接点的坐标
   * @param name source | target
   * @param model 边的数据模型
   * @param controlPoints 控制点
   */


  Edge.prototype.getLinkPoint = function (name, model, controlPoints) {
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var itemName = name + ITEM_NAME_SUFFIX;
    var point = this.get(pointName);

    if (!point) {
      var item = this.get(itemName);
      var anchorName = name + ANCHOR_NAME_SUFFIX;
      var prePoint = this.getPrePoint(name, controlPoints);
      var anchorIndex = model[anchorName];

      if (!(0, _util.isNil)(anchorIndex)) {
        // 如果有锚点，则使用锚点索引获取连接点
        point = item.getLinkPointByAnchor(anchorIndex);
      } // 如果锚点没有对应的点或者没有锚点，则直接计算连接点


      point = point || item.getLinkPoint(prePoint);

      if (!(0, _util.isNil)(point.index)) {
        this.set(name + "AnchorIndex", point.index);
      }
    }

    return point;
  };
  /**
   * 获取同端点进行连接的点，计算交汇点
   * @param name
   * @param controlPoints
   */


  Edge.prototype.getPrePoint = function (name, controlPoints) {
    if (controlPoints && controlPoints.length) {
      var index = name === 'source' ? 0 : controlPoints.length - 1;
      return controlPoints[index];
    }

    var oppositeName = name === 'source' ? 'target' : 'source'; // 取另一个节点的位置

    return this.getEndPoint(oppositeName);
  };
  /**
   * 获取端点的位置
   * @param name
   */


  Edge.prototype.getEndPoint = function (name) {
    var itemName = name + ITEM_NAME_SUFFIX;
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var item = this.get(itemName); // 如果有端点，直接使用 model

    if (item) {
      return item.get('model');
    } // 否则直接使用点


    return this.get(pointName);
  };
  /**
   * 通过端点的中心获取控制点
   * @param model
   */


  Edge.prototype.getControlPointsByCenter = function (model) {
    var sourcePoint = this.getEndPoint('source');
    var targetPoint = this.getEndPoint('target');
    var shapeFactory = this.get('shapeFactory');
    var type = model.type;
    return shapeFactory.getControlPoints(type, {
      startPoint: sourcePoint,
      endPoint: targetPoint
    });
  };

  Edge.prototype.getEndCenter = function (name) {
    var itemName = name + ITEM_NAME_SUFFIX;
    var pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    var item = this.get(itemName); // 如果有端点，直接使用 model

    if (item) {
      var bbox = item.getBBox();
      return {
        x: bbox.centerX,
        y: bbox.centerY
      };
    } // 否则直接使用点


    return this.get(pointName);
  };

  Edge.prototype.init = function () {
    _super.prototype.init.call(this); // 初始化两个端点


    this.setSource(this.get('source'));
    this.setTarget(this.get('target'));
  };

  Edge.prototype.getShapeCfg = function (model) {
    var self = this;
    var linkCenter = self.get('linkCenter'); // 如果连接到中心，忽视锚点、忽视控制点

    var cfg = _super.prototype.getShapeCfg.call(this, model);

    if (linkCenter) {
      cfg.startPoint = self.getEndCenter('source');
      cfg.endPoint = self.getEndCenter('target');
    } else {
      var controlPoints = cfg.controlPoints || self.getControlPointsByCenter(cfg);
      cfg.startPoint = self.getLinkPoint('source', model, controlPoints);
      cfg.endPoint = self.getLinkPoint('target', model, controlPoints);
    }

    cfg.sourceNode = self.get('sourceNode');
    cfg.targetNode = self.get('targetNode');
    return cfg;
  };
  /**
   * 获取边的数据模型
   */


  Edge.prototype.getModel = function () {
    var out = this.get('model');
    var sourceItem = this.get("source" + ITEM_NAME_SUFFIX);
    var targetItem = this.get("target" + ITEM_NAME_SUFFIX);

    if (sourceItem) {
      delete out["source" + ITEM_NAME_SUFFIX];
    } else {
      out.source = this.get("start" + POINT_NAME_SUFFIX);
    }

    if (targetItem) {
      delete out["target" + ITEM_NAME_SUFFIX];
    } else {
      out.target = this.get("end" + POINT_NAME_SUFFIX);
    }

    if (!(0, _util.isString)(out.source) && !(0, _util.isPlainObject)(out.source)) {
      out.source = out.source.getID();
    }

    if (!(0, _util.isString)(out.target) && !(0, _util.isPlainObject)(out.target)) {
      out.target = out.target.getID();
    }

    return out;
  };

  Edge.prototype.setSource = function (source) {
    this.setEnd('source', source);
    this.set('source', source);
  };

  Edge.prototype.setTarget = function (target) {
    this.setEnd('target', target);
    this.set('target', target);
  };

  Edge.prototype.getSource = function () {
    return this.get('source');
  };

  Edge.prototype.getTarget = function () {
    return this.get('target');
  };

  Edge.prototype.updatePosition = function () {
    return false;
  };
  /**
   * 边不需要重计算容器位置，直接重新计算 path 位置
   * @param {object} cfg 待更新数据
   */


  Edge.prototype.update = function (cfg, onlyMove) {
    if (onlyMove === void 0) {
      onlyMove = false;
    }

    var model = this.get('model');
    var oriVisible = model.visible;
    var cfgVisible = cfg.visible;
    if (oriVisible !== cfgVisible && cfgVisible !== undefined) this.changeVisibility(cfgVisible);
    var styles = this.get('styles');

    if (cfg.stateStyles) {
      // 更新 item 时更新 this.get('styles') 中的值
      var stateStyles = cfg.stateStyles;
      (0, _util.mix)(styles, stateStyles);
      delete cfg.stateStyles;
    }

    Object.assign(model, cfg);
    this.updateShape();
    this.afterUpdate();
    this.clearCache();
  };

  Edge.prototype.destroy = function () {
    var sourceItem = this.get("source" + ITEM_NAME_SUFFIX);
    var targetItem = this.get("target" + ITEM_NAME_SUFFIX);

    if (sourceItem && !sourceItem.destroyed) {
      sourceItem.removeEdge(this);
    }

    if (targetItem && !targetItem.destroyed) {
      targetItem.removeEdge(this);
    }

    _super.prototype.destroy.call(this);
  };

  return Edge;
}(_item.default);

var _default = Edge;
exports.default = _default;
}, function(modId) { var map = {"./item":1685504765339}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765339, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tslib = require("tslib");

var _util = require("@antv/util");

var _shape = _interopRequireDefault(require("../element/shape"));

var _graphic = require("../util/graphic");

var _math = require("../util/math");

var _base = require("../util/base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CACHE_BBOX = 'bboxCache';
var CACHE_CANVAS_BBOX = 'bboxCanvasCache';
var ARROWS = ['startArrow', 'endArrow'];

var ItemBase =
/** @class */
function () {
  function ItemBase(cfg) {
    this._cfg = {};
    this.destroyed = false;
    var defaultCfg = {
      /**
       * id
       * @type {string}
       */
      id: undefined,

      /**
       * 类型
       * @type {string}
       */
      type: 'item',

      /**
       * data model
       * @type {object}
       */
      model: {},

      /**
       * g group
       * @type {G.Group}
       */
      group: undefined,

      /**
       * is open animate
       * @type {boolean}
       */
      animate: false,

      /**
       * visible - not group visible
       * @type {boolean}
       */
      visible: true,

      /**
       * locked - lock node
       * @type {boolean}
       */
      locked: false,

      /**
       * capture event
       * @type {boolean}
       */
      event: true,

      /**
       * key shape to calculate item's bbox
       * @type object
       */
      keyShape: undefined,

      /**
       * item's states, such as selected or active
       * @type Array
       */
      states: []
    };
    this._cfg = Object.assign(defaultCfg, this.getDefaultCfg(), cfg);
    var model = this.get('model');
    var id = model.id;
    var itemType = this.get('type');

    if (!id) {
      id = (0, _base.uniqueId)(itemType);
      this.get('model').id = id;
    }

    this.set('id', id);
    var group = cfg.group;

    if (group) {
      group.set('item', this);
      group.set('id', id);
    }

    this.init();
    this.draw();
    var shapeType = model.shape || model.type || (itemType === 'edge' ? 'line' : 'circle');
    var shapeFactory = this.get('shapeFactory');

    if (shapeFactory && shapeFactory[shapeType]) {
      var options = shapeFactory[shapeType].options; // merge the stateStyles from item and shape

      if (options && options.stateStyles) {
        var styles = this.get('styles') || model.stateStyles;
        styles = (0, _util.deepMix)({}, options.stateStyles, styles);
        this.set('styles', styles);
      }
    }
  }
  /**
   * 根据 keyshape 计算包围盒
   */


  ItemBase.prototype.calculateBBox = function () {
    var keyShape = this.get('keyShape');
    var group = this.get('group'); // 因为 group 可能会移动，所以必须通过父元素计算才能计算出正确的包围盒

    var bbox = (0, _graphic.getBBox)(keyShape, group);
    bbox.x = bbox.minX;
    bbox.y = bbox.minY;
    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    return bbox;
  };
  /**
   * 根据 keyshape 计算包围盒
   */


  ItemBase.prototype.calculateCanvasBBox = function () {
    var keyShape = this.get('keyShape');
    var group = this.get('group'); // 因为 group 可能会移动，所以必须通过父元素计算才能计算出正确的包围盒

    var bbox = (0, _graphic.getBBox)(keyShape, group);
    bbox.x = bbox.minX;
    bbox.y = bbox.minY;
    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    return bbox;
  };
  /**
   * draw shape
   */


  ItemBase.prototype.drawInner = function () {
    var self = this;
    var shapeFactory = self.get('shapeFactory');
    var group = self.get('group');
    var model = self.get('model');
    group.clear();
    var visible = model.visible;
    if (visible !== undefined && !visible) self.changeVisibility(visible);

    if (!shapeFactory) {
      return;
    }

    self.updatePosition(model);
    var cfg = self.getShapeCfg(model); // 可能会附加额外信息

    var shapeType = cfg.type;
    var keyShape = shapeFactory.draw(shapeType, cfg, group);

    if (keyShape) {
      self.set('keyShape', keyShape);
      keyShape.set('isKeyShape', true);
      keyShape.set('draggable', true);
    }

    this.setOriginStyle(); // 防止由于用户外部修改 model 中的 shape 导致 shape 不更新

    this.set('currentShape', shapeType);
    this.restoreStates(shapeFactory, shapeType);
  };
  /**
   * 设置图元素原始样式
   * @param keyShape 图元素 keyShape
   * @param group Group 容器
   */


  ItemBase.prototype.setOriginStyle = function () {
    var group = this.get('group');
    var children = group.get('children');
    var keyShape = this.getKeyShape();
    var self = this;
    var keyShapeName = keyShape.get('name');

    if (!this.get('originStyle')) {
      // 第一次 set originStyle，直接拿首次渲染所有图形的 attrs
      var originStyles_1 = {};
      (0, _util.each)(children, function (child) {
        var shapeType = child.get('type');
        var name = child.get('name');

        if (name && name !== keyShapeName) {
          originStyles_1[name] = shapeType !== 'image' ? (0, _util.clone)(child.attr()) : self.getShapeStyleByName(name);
        } else {
          // !name || name === keyShape
          var keyShapeStyle = self.getShapeStyleByName(); // 可优化，需要去除 child.attr 中其他 shape 名的对象

          if (keyShapeStyle.path) delete keyShapeStyle.path;
          if (keyShapeStyle.matrix) delete keyShapeStyle.matrix;

          if (!keyShapeName) {
            Object.assign(originStyles_1, keyShapeStyle);
          } else {
            // 若 keyShape 有 name 且 !name，这个图形不是 keyShape，给这个图形一个 name
            if (!name) {
              var shapeName = (0, _base.uniqueId)('shape');
              child.set('name', shapeName);
              originStyles_1[shapeName] = shapeType !== 'image' ? (0, _util.clone)(child.attr()) : self.getShapeStyleByName(name);
            } else originStyles_1[keyShapeName] = keyShapeStyle;
          }
        }
      });
      self.set('originStyle', originStyles_1);
    } else {
      // 第二次 set originStyles，需要找到不是 stateStyles 的样式，更新到 originStyles 中
      // 上一次设置的 originStyle，是初始的 shape attrs
      var styles_1 = this.getOriginStyle(); // let styles: ShapeStyle = {};

      if (keyShapeName && !styles_1[keyShapeName]) styles_1[keyShapeName] = {}; // 获取当前状态样式

      var currentStatesStyle_1 = this.getCurrentStatesStyle(); // 遍历当前所有图形的 attrs，找到不是 stateStyles 的样式更新到 originStyles 中

      (0, _util.each)(children, function (child) {
        var name = child.get('name');
        var shapeAttrs = child.attr();

        if (name && name !== keyShapeName) {
          // 有 name 的非 keyShape 图形
          var shapeStateStyle_1 = currentStatesStyle_1[name];
          if (!styles_1[name]) styles_1[name] = {};

          if (shapeStateStyle_1) {
            Object.keys(shapeAttrs).forEach(function (key) {
              var value = shapeAttrs[key];
              if (value !== shapeStateStyle_1[key]) styles_1[name][key] = value;
            });
          } else {
            styles_1[name] = child.get('type') !== 'image' ? (0, _util.clone)(shapeAttrs) : self.getShapeStyleByName(name);
          }
        } else {
          var shapeAttrs_1 = child.attr();
          var keyShapeStateStyles_1 = (0, _tslib.__assign)((0, _tslib.__assign)({}, currentStatesStyle_1), currentStatesStyle_1[keyShapeName]);
          Object.keys(shapeAttrs_1).forEach(function (key) {
            var value = shapeAttrs_1[key]; // 如果是对象且不是 arrow，则是其他 shape 的样式
            // if (isPlainObject(value) && ARROWS.indexOf(name) === -1) return;

            if (keyShapeStateStyles_1[key] !== value) {
              if (keyShapeName) styles_1[keyShapeName][key] = value;else styles_1[key] = value;
            }
          });
        }
      });
      if (styles_1.path) delete styles_1.path;
      if (styles_1.matrix) delete styles_1.matrix;
      if (styles_1.x) delete styles_1.x;
      if (styles_1.y) delete styles_1.y;
      if (styles_1[keyShapeName] && styles_1[keyShapeName].x) delete styles_1[keyShapeName].x;
      if (styles_1[keyShapeName] && styles_1[keyShapeName].y) delete styles_1[keyShapeName].y;
      self.set('originStyle', styles_1);
    }
  };
  /**
   * restore shape states
   * @param shapeFactory
   * @param shapeType
   */


  ItemBase.prototype.restoreStates = function (shapeFactory, shapeType) {
    var self = this;
    var states = self.get('states');
    (0, _util.each)(states, function (state) {
      shapeFactory.setState(shapeType, state, true, self);
    });
  };

  ItemBase.prototype.init = function () {
    var shapeFactory = _shape.default.getFactory(this.get('type'));

    this.set('shapeFactory', shapeFactory);
  };
  /**
   * 获取属性
   * @internal 仅内部类使用
   * @param  {String} key 属性名
   * @return {object | string | number} 属性值
   */


  ItemBase.prototype.get = function (key) {
    return this._cfg[key];
  };
  /**
   * 设置属性
   * @internal 仅内部类使用
   * @param {String|Object} key 属性名，也可以是对象
   * @param {object | string | number} val 属性值
   */


  ItemBase.prototype.set = function (key, val) {
    if ((0, _util.isPlainObject)(key)) {
      this._cfg = (0, _tslib.__assign)((0, _tslib.__assign)({}, this._cfg), key);
    } else {
      this._cfg[key] = val;
    }
  };

  ItemBase.prototype.getDefaultCfg = function () {
    return {};
  };
  /**
   * 更新/刷新等操作后，清除 cache
   */


  ItemBase.prototype.clearCache = function () {
    this.set(CACHE_BBOX, null);
    this.set(CACHE_CANVAS_BBOX, null);
  };
  /**
   * 渲染前的逻辑，提供给子类复写
   */


  ItemBase.prototype.beforeDraw = function () {};
  /**
   * 渲染后的逻辑，提供给子类复写
   */


  ItemBase.prototype.afterDraw = function () {};
  /**
   * 更新后做一些工作
   */


  ItemBase.prototype.afterUpdate = function () {};
  /**
   * draw shape
   */


  ItemBase.prototype.draw = function () {
    this.beforeDraw();
    this.drawInner();
    this.afterDraw();
  };

  ItemBase.prototype.getShapeStyleByName = function (name) {
    var group = this.get('group');
    var currentShape;

    if (name) {
      currentShape = group.find(function (element) {
        return element.get('name') === name;
      });
    } else {
      currentShape = this.getKeyShape();
    }

    if (currentShape) {
      var styles_2 = {};
      (0, _util.each)(currentShape.attr(), function (val, key) {
        // 修改 img 通过 updateItem 实现
        if (key !== 'img') {
          styles_2[key] = val;
        }
      });
      return styles_2;
    }

    return {};
  };

  ItemBase.prototype.getShapeCfg = function (model) {
    var styles = this.get('styles');

    if (styles) {
      // merge graph的item样式与数据模型中的样式
      var newModel = model;
      newModel.style = (0, _tslib.__assign)((0, _tslib.__assign)({}, styles), model.style);
      return newModel;
    }

    return model;
  };
  /**
   * 获取指定状态的样式，去除了全局样式
   * @param state 状态名称
   */


  ItemBase.prototype.getStateStyle = function (state) {
    var styles = this.get('styles');
    var stateStyle = styles && styles[state];
    return stateStyle;
  };
  /**
   * get keyshape style
   */


  ItemBase.prototype.getOriginStyle = function () {
    return this.get('originStyle');
  };

  ItemBase.prototype.getCurrentStatesStyle = function () {
    var self = this;
    var styles = {};
    var states = self.getStates();

    if (!states || !states.length) {
      return this.getOriginStyle();
    }

    (0, _util.each)(self.getStates(), function (state) {
      styles = Object.assign(styles, self.getStateStyle(state));
    });
    return styles;
  };
  /**
   * 更改元素状态， visible 不属于这个范畴
   * @internal 仅提供内部类 graph 使用
   * @param {String} state 状态名
   * @param {Boolean} value 节点状态值
   */


  ItemBase.prototype.setState = function (state, value) {
    var states = this.get('states');
    var shapeFactory = this.get('shapeFactory');
    var stateName = state;
    var filterStateName = state;

    if ((0, _util.isString)(value)) {
      stateName = state + ":" + value;
      filterStateName = state + ":";
    }

    var newStates = states;

    if ((0, _util.isBoolean)(value)) {
      var index = states.indexOf(filterStateName);

      if (value) {
        if (index > -1) {
          return;
        }

        states.push(stateName);
      } else if (index > -1) {
        states.splice(index, 1);
      }
    } else if ((0, _util.isString)(value)) {
      // 过滤掉 states 中 filterStateName 相关的状态
      var filterStates = states.filter(function (name) {
        return name.includes(filterStateName);
      });

      if (filterStates.length > 0) {
        this.clearStates(filterStates);
      }

      newStates = newStates.filter(function (name) {
        return !name.includes(filterStateName);
      });
      newStates.push(stateName);
      this.set('states', newStates);
    }

    if (shapeFactory) {
      var model = this.get('model');
      var type = model.type; // 调用 shape/shape.ts 中的 setState

      shapeFactory.setState(type, state, value, this);
    }
  };
  /**
   * 清除指定的状态，如果参数为空，则不做任务处理
   * @param states 状态名称
   */


  ItemBase.prototype.clearStates = function (states) {
    var self = this;
    var originStates = self.getStates();
    var shapeFactory = self.get('shapeFactory');
    var model = self.get('model');
    var shape = model.type;

    if (!states) {
      states = originStates;
    }

    if ((0, _util.isString)(states)) {
      states = [states];
    }

    var newStates = originStates.filter(function (state) {
      return states.indexOf(state) === -1;
    });
    self.set('states', newStates);
    states.forEach(function (state) {
      shapeFactory.setState(shape, state, false, self);
    });
  };
  /**
   * 节点的图形容器
   * @return {G.Group} 图形容器
   */


  ItemBase.prototype.getContainer = function () {
    return this.get('group');
  };
  /**
   * 节点的关键形状，用于计算节点大小，连线截距等
   * @return {IShapeBase} 关键形状
   */


  ItemBase.prototype.getKeyShape = function () {
    return this.get('keyShape');
  };
  /**
   * 节点数据模型
   * @return {Object} 数据模型
   */


  ItemBase.prototype.getModel = function () {
    return this.get('model');
  };
  /**
   * 节点类型
   * @return {string} 节点的类型
   */


  ItemBase.prototype.getType = function () {
    return this.get('type');
  };
  /**
   * 获取 Item 的ID
   */


  ItemBase.prototype.getID = function () {
    return this.get('id');
  };
  /**
   * 是否是 Item 对象，悬空边情况下进行判定
   */


  ItemBase.prototype.isItem = function () {
    return true;
  };
  /**
   * 获取当前元素的所有状态
   * @return {Array} 元素的所有状态
   */


  ItemBase.prototype.getStates = function () {
    return this.get('states');
  };
  /**
   * 当前元素是否处于某状态
   * @param {String} state 状态名
   * @return {Boolean} 是否处于某状态
   */


  ItemBase.prototype.hasState = function (state) {
    var states = this.getStates();
    return states.indexOf(state) >= 0;
  };
  /**
   * 刷新一般用于处理几种情况
   * 1. item model 在外部被改变
   * 2. 边的节点位置发生改变，需要重新计算边
   *
   * 因为数据从外部被修改无法判断一些属性是否被修改，直接走位置和 shape 的更新
   */


  ItemBase.prototype.refresh = function () {
    var model = this.get('model'); // 更新元素位置

    this.updatePosition(model); // 更新元素内容，样式

    this.updateShape(); // 做一些更新之后的操作

    this.afterUpdate(); // 清除缓存

    this.clearCache();
  };

  ItemBase.prototype.isOnlyMove = function (cfg) {
    return false;
  };
  /**
   * 将更新应用到 model 上，刷新属性
   * @internal 仅提供给 Graph 使用，外部直接调用 graph.update 接口
   * @param  {Object} cfg       配置项，可以是增量信息
   */


  ItemBase.prototype.update = function (cfg, onlyMove) {
    if (onlyMove === void 0) {
      onlyMove = false;
    }

    var model = this.get('model');
    var oriVisible = model.visible;
    var cfgVisible = cfg.visible;
    if (oriVisible !== cfgVisible && cfgVisible !== undefined) this.changeVisibility(cfgVisible);
    var originPosition = {
      x: model.x,
      y: model.y
    };
    cfg.x = isNaN(cfg.x) ? model.x : cfg.x;
    cfg.y = isNaN(cfg.y) ? model.y : cfg.y;
    var styles = this.get('styles');

    if (cfg.stateStyles) {
      // 更新 item 时更新 this.get('styles') 中的值
      var stateStyles = cfg.stateStyles;
      (0, _util.mix)(styles, stateStyles);
      delete cfg.stateStyles;
    } // 直接将更新合到原数据模型上，可以保证用户在外部修改源数据然后刷新时的样式符合期待。


    Object.assign(model, cfg); // isOnlyMove 仅用于node
    // const onlyMove = this.isOnlyMove(cfg);
    // 仅仅移动位置时，既不更新，也不重绘

    if (onlyMove) {
      this.updatePosition(cfg);
    } else {
      // 如果 x,y 有变化，先重置位置
      if (originPosition.x !== cfg.x || originPosition.y !== cfg.y) {
        this.updatePosition(cfg);
      }

      this.updateShape();
    }

    this.afterUpdate();
    this.clearCache();
  };
  /**
   * 更新元素内容，样式
   */


  ItemBase.prototype.updateShape = function () {
    var shapeFactory = this.get('shapeFactory');
    var model = this.get('model');
    var shape = model.type; // 判定是否允许更新
    // 1. 注册的节点允许更新
    // 2. 更新后的 shape 等于原先的 shape

    if (shapeFactory.shouldUpdate(shape) && shape === this.get('currentShape')) {
      var updateCfg = this.getShapeCfg(model);
      shapeFactory.baseUpdate(shape, updateCfg, this); // 更新完以后重新设置原始样式

      this.setOriginStyle();
    } else {
      // 如果不满足上面两种状态，重新绘制
      this.draw();
    } // 更新后重置节点状态


    this.restoreStates(shapeFactory, shape);
  };
  /**
   * 更新位置，避免整体重绘
   * @param {object} cfg 待更新数据
   */


  ItemBase.prototype.updatePosition = function (cfg) {
    var model = this.get('model');
    var x = (0, _util.isNil)(cfg.x) ? model.x : cfg.x;
    var y = (0, _util.isNil)(cfg.y) ? model.y : cfg.y;
    var group = this.get('group');

    if ((0, _util.isNil)(x) || (0, _util.isNil)(y)) {
      return false;
    }

    model.x = x;
    model.y = y;
    var matrix = group.getMatrix();
    if (matrix && matrix[6] === x && matrix[7] === y) return false;
    group.resetMatrix(); // G 4.0 element 中移除了矩阵相关方法，详见https://www.yuque.com/antv/blog/kxzk9g#4rMMV

    (0, _math.translate)(group, {
      x: x,
      y: y
    });
    this.clearCache(); // 位置更新后需要清除缓存

    return true;
  };
  /**
   * 获取 item 的包围盒，这个包围盒是相对于 item 自己，不会将 matrix 计算在内
   * @return {Object} 包含 x,y,width,height, centerX, centerY
   */


  ItemBase.prototype.getBBox = function () {
    // 计算 bbox 开销有些大，缓存
    var bbox = this.get(CACHE_BBOX);

    if (!bbox) {
      bbox = this.calculateBBox();
      this.set(CACHE_BBOX, bbox);
    }

    return bbox;
  };
  /**
   * 获取 item 相对于画布的包围盒，会将从顶层到当前元素的 matrix 都计算在内
   * @return {Object} 包含 x,y,width,height, centerX, centerY
   */


  ItemBase.prototype.getCanvasBBox = function () {
    // 计算 bbox 开销有些大，缓存
    var bbox = this.get(CACHE_CANVAS_BBOX);

    if (!bbox) {
      bbox = this.calculateCanvasBBox();
      this.set(CACHE_CANVAS_BBOX, bbox);
    }

    return bbox;
  };
  /**
   * 将元素放到最前面
   */


  ItemBase.prototype.toFront = function () {
    var group = this.get('group');
    group.toFront();
  };
  /**
   * 将元素放到最后面
   */


  ItemBase.prototype.toBack = function () {
    var group = this.get('group');
    group.toBack();
  };
  /**
   * 显示元素
   */


  ItemBase.prototype.show = function () {
    this.changeVisibility(true);
  };
  /**
   * 隐藏元素
   */


  ItemBase.prototype.hide = function () {
    this.changeVisibility(false);
  };
  /**
   * 更改是否显示
   * @param  {Boolean} visible 是否显示
   */


  ItemBase.prototype.changeVisibility = function (visible) {
    var group = this.get('group');

    if (visible) {
      group.show();
    } else {
      group.hide();
    }

    this.set('visible', visible);
  };
  /**
   * 元素是否可见
   * @return {Boolean} 返回该元素是否可见
   */


  ItemBase.prototype.isVisible = function () {
    return this.get('visible');
  };
  /**
   * 是否拾取及出发该元素的交互事件
   * @param {Boolean} enable 标识位
   */


  ItemBase.prototype.enableCapture = function (enable) {
    var group = this.get('group');

    if (group) {
      group.set('capture', enable);
    }
  };

  ItemBase.prototype.destroy = function () {
    if (!this.destroyed) {
      var animate = this.get('animate');
      var group = this.get('group');

      if (animate) {
        group.stopAnimate();
      }

      this.clearCache();
      group.remove();
      this._cfg = null;
      this.destroyed = true;
    }
  };

  return ItemBase;
}();

var _default = ItemBase;
exports.default = _default;
}, function(modId) { var map = {"../element/shape":1685504765340,"../util/graphic":1685504765329,"../util/math":1685504765327,"../util/base":1685504765335}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765340, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ShapeFactoryBase = void 0;

var _tslib = require("tslib");

var _util = require("@antv/util");

var _xml = require("./xml");

var cache = {}; // ucfirst 开销过大，进行缓存
// 首字母大写

function ucfirst(str) {
  if (!cache[str]) {
    cache[str] = (0, _util.upperFirst)(str);
  }

  return cache[str];
}
/**
 * 工厂方法的基类
 * @type Shape.FactoryBase
 */


var ShapeFactoryBase = {
  /**
   * 默认的形状，当没有指定/匹配 shapeType 时，使用默认的
   * @type {String}
   */
  defaultShapeType: 'defaultType',

  /**
   * 形状的 className，用于搜索
   * @type {String}
   */
  className: null,

  /**
   * 获取绘制 Shape 的工具类，无状态
   * @param  {String} type 类型
   * @return {Shape} 工具类
   */
  getShape: function getShape(type) {
    var self = this;
    var shape = self[type] || self[self.defaultShapeType] || self['simple-circle'];
    return shape;
  },

  /**
   * 绘制图形
   * @param  {String} type  类型
   * @param  {Object} cfg 配置项
   * @param  {G.Group} group 图形的分组
   * @return {IShape} 图形对象
   */
  draw: function draw(type, cfg, group) {
    var shape = this.getShape(type);
    var rst = shape.draw(cfg, group);

    if (shape.afterDraw) {
      shape.afterDraw(cfg, group, rst);
    }

    return rst;
  },

  /**
   * 更新
   * @param  {String} type  类型
   * @param  {Object} cfg 配置项
   * @param  {G6.Item} item 节点、边、分组等
   */
  baseUpdate: function baseUpdate(type, cfg, item) {
    var shape = this.getShape(type);

    if (shape.update) {
      // 防止没定义 update 函数
      shape.update(cfg, item);
    }

    if (shape.afterUpdate) {
      shape.afterUpdate(cfg, item);
    }
  },

  /**
   * 设置状态
   * @param {String} type  类型
   * @param {String} name  状态名
   * @param {String | Boolean} value 状态值
   * @param {G6.Item} item  节点、边、分组等
   */
  setState: function setState(type, name, value, item) {
    var shape = this.getShape(type); // 调用 shape/shapeBase.ts 中的 setState 方法

    shape.setState(name, value, item);
  },

  /**
   * 是否允许更新，不重新绘制图形
   * @param  {String} type 类型
   * @return {Boolean} 是否允许使用更新
   */
  shouldUpdate: function shouldUpdate(type) {
    var shape = this.getShape(type);
    return !!shape.update;
  },
  getControlPoints: function getControlPoints(type, cfg) {
    var shape = this.getShape(type);
    return shape.getControlPoints(cfg);
  },

  /**
   * 获取控制点
   * @param {String} type 节点、边类型
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getAnchorPoints: function getAnchorPoints(type, cfg) {
    var shape = this.getShape(type);
    return shape.getAnchorPoints(cfg);
  }
};
/**
 * 元素的框架
 */

exports.ShapeFactoryBase = ShapeFactoryBase;
var ShapeFramework = {
  // 默认样式及配置
  options: {},

  /**
   * 绘制
   */
  draw: function draw(cfg, group) {
    return this.drawShape(cfg, group);
  },

  /**
   * 绘制
   */
  drawShape: function drawShape()
  /* cfg, group */
  {},

  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   */
  afterDraw: function afterDraw()
  /* cfg, group */
  {},
  // update(cfg, item) // 默认不定义
  afterUpdate: function afterUpdate()
  /* cfg, item */
  {},

  /**
   * 设置节点、边状态
   */
  setState: function setState()
  /* name, value, item */
  {},

  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getControlPoints: function getControlPoints(cfg) {
    return cfg.controlPoints;
  },

  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getAnchorPoints: function getAnchorPoints(cfg) {
    var defaultAnchorPoints = this.options.anchorPoints;
    var anchorPoints = cfg.anchorPoints || defaultAnchorPoints;
    return anchorPoints;
  }
  /* 如果没定义 update 方法，每次都调用 draw 方法
  update(cfg, item) {
     }
  */

};

var Shape =
/** @class */
function () {
  function Shape() {}

  Shape.registerFactory = function (factoryType, cfg) {
    var className = ucfirst(factoryType);
    var factoryBase = ShapeFactoryBase;
    var shapeFactory = (0, _tslib.__assign)((0, _tslib.__assign)({}, factoryBase), cfg);
    Shape[className] = shapeFactory;
    shapeFactory.className = className;
    return shapeFactory;
  };

  Shape.getFactory = function (factoryType) {
    var className = ucfirst(factoryType);
    return Shape[className];
  };

  Shape.registerNode = function (shapeType, nodeDefinition, extendShapeType) {
    var shapeFactory = Shape.Node;
    var shapeObj;

    if (typeof nodeDefinition === 'string' || typeof nodeDefinition === 'function') {
      var autoNodeDefinition = (0, _xml.createNodeFromXML)(nodeDefinition);
      shapeObj = (0, _tslib.__assign)((0, _tslib.__assign)({}, shapeFactory.getShape('single-node')), autoNodeDefinition);
    } else if (nodeDefinition.jsx) {
      var jsx = nodeDefinition.jsx;
      var autoNodeDefinition = (0, _xml.createNodeFromXML)(jsx);
      shapeObj = (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, shapeFactory.getShape('single-node')), autoNodeDefinition), nodeDefinition);
    } else {
      shapeFactory.getShape(extendShapeType);
      var extendShape = extendShapeType ? shapeFactory.getShape(extendShapeType) : ShapeFramework;
      shapeObj = (0, _tslib.__assign)((0, _tslib.__assign)({}, extendShape), nodeDefinition);
    }

    shapeObj.type = shapeType;
    shapeObj.itemType = 'node';
    shapeFactory[shapeType] = shapeObj;
    return shapeObj;
  };

  Shape.registerEdge = function (shapeType, edgeDefinition, extendShapeType) {
    var shapeFactory = Shape.Edge;
    var extendShape = extendShapeType ? shapeFactory.getShape(extendShapeType) : ShapeFramework;
    var shapeObj = (0, _tslib.__assign)((0, _tslib.__assign)({}, extendShape), edgeDefinition);
    shapeObj.type = shapeType;
    shapeObj.itemType = 'edge';
    shapeFactory[shapeType] = shapeObj;
    return shapeObj;
  };

  Shape.registerCombo = function (shapeType, comboDefinition, extendShapeType) {
    var shapeFactory = Shape.Combo;
    var extendShape = extendShapeType ? shapeFactory.getShape(extendShapeType) : ShapeFramework;
    var shapeObj = (0, _tslib.__assign)((0, _tslib.__assign)({}, extendShape), comboDefinition);
    shapeObj.type = shapeType;
    shapeObj.itemType = 'combo';
    shapeFactory[shapeType] = shapeObj;
    return shapeObj;
  };

  return Shape;
}();

var _default = Shape; // 注册 Node 的工厂方法

exports.default = _default;
Shape.registerFactory('node', {
  defaultShapeType: 'circle'
}); // 注册 Edge 的工厂方法

Shape.registerFactory('edge', {
  defaultShapeType: 'line'
}); // 注册 Combo 的工厂方法

Shape.registerFactory('combo', {
  defaultShapeType: 'circle'
});
}, function(modId) { var map = {"./xml":1685504765341}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765341, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseXML = parseXML;
exports.getBBox = getBBox;
exports.generateTarget = generateTarget;
exports.compareTwoTarget = compareTwoTarget;
exports.createNodeFromXML = createNodeFromXML;
exports.xmlDataRenderer = void 0;

var _tslib = require("tslib");

var _util = require("@antv/util");

var _graphic = require("../util/graphic");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 一种更宽松的JSON 解析，如果遇到不符合规范的字段会直接转为字符串
 * @param text json 内容
 */
function looseJSONParse(text) {
  if (typeof text !== 'string') {
    return text;
  }

  var safeParse = function safeParse(str) {
    if (typeof str !== 'string') {
      return str;
    }

    try {
      return JSON.parse(str.trim());
    } catch (e) {
      return str.trim();
    }
  };

  var firstAttempt = safeParse(text);

  if (typeof firstAttempt !== 'string') {
    return firstAttempt;
  }

  var tail = function tail(arr) {
    return arr[arr.length - 1];
  };

  var str = text.trim();
  var objectStack = [];
  var syntaxStack = [];

  var isLastPair = function isLastPair() {
    var syntaxes = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      syntaxes[_i] = arguments[_i];
    }

    return syntaxes.some(function (syntax) {
      return tail(syntaxStack) === syntax;
    });
  };

  var getValueStore = function getValueStore() {
    return tail(objectStack);
  };

  var rst = null;
  var i = 0;
  var temp = '';

  while (i < str.length) {
    var nowChar = str[i];
    var isInString = isLastPair('"', "'");

    if (!isInString && !nowChar.trim()) {
      i += 1;
      continue;
    }

    var isLastTranslate = str[i - 1] === '\\';
    var isInObject = isLastPair('}');
    var isInArray = isLastPair(']');
    var isWaitingValue = isLastPair(',');
    var tempArr = getValueStore();

    if (isInString) {
      if (tail(syntaxStack) === nowChar && !isLastTranslate) {
        syntaxStack.pop();
        var value = safeParse(temp);
        tempArr.push(value);
        rst = value;
        temp = '';
      } else {
        temp += nowChar;
      }
    } else if (isInArray && nowChar === ',') {
      if (temp) {
        tempArr.push(safeParse(temp));
        temp = '';
      }
    } else if (isInObject && nowChar === ':') {
      syntaxStack.push(',');

      if (temp) {
        tempArr.push(temp);
        temp = '';
      }
    } else if (isWaitingValue && nowChar === ',') {
      if (temp) {
        tempArr.push(safeParse(temp));
        temp = '';
      }

      syntaxStack.pop();
    } else if (nowChar === '}' && (isInObject || isWaitingValue)) {
      if (temp) {
        tempArr.push(safeParse(temp));
        temp = '';
      }

      if (isWaitingValue) {
        syntaxStack.pop();
      }

      var obj = {};

      for (var c = 1; c < tempArr.length; c += 2) {
        obj[tempArr[c - 1]] = tempArr[c];
      }

      objectStack.pop();

      if (objectStack.length) {
        tail(objectStack).push(obj);
      }

      syntaxStack.pop();
      rst = obj;
    } else if (nowChar === ']' && isInArray) {
      if (temp) {
        tempArr.push(safeParse(temp));
        temp = '';
      }

      objectStack.pop();

      if (objectStack.length) {
        tail(objectStack).push(tempArr);
      }

      syntaxStack.pop();
      rst = tempArr;
    } else if (nowChar === '{') {
      objectStack.push([]);
      syntaxStack.push('}');
    } else if (nowChar === '[') {
      objectStack.push([]);
      syntaxStack.push(']');
    } else if (nowChar === '"') {
      syntaxStack.push('"');
    } else if (nowChar === "'") {
      syntaxStack.push("'");
    } else {
      temp += nowChar;
    }

    i += 1;
  }

  return rst || temp;
}

var keyConvert = function keyConvert(str) {
  return str.split('-').reduce(function (a, b) {
    return a + b.charAt(0).toUpperCase() + b.slice(1);
  });
};
/**
 * 简单的一个{{}}模板渲染，不包含任何复杂语法
 * @param xml
 */


var xmlDataRenderer = function xmlDataRenderer(xml) {
  return function (data) {
    var len = xml.length;
    var arr = [];
    var i = 0;
    var tmp = '';

    while (i < len) {
      if (xml[i] === '{' && xml[i + 1] === '{') {
        arr.push(tmp);
        tmp = '';
        i += 2;
      } else if (xml[i] === '}' && xml[i + 1] === '}') {
        if (arr.length) {
          var last = arr.pop();
          tmp = (0, _util.get)(data, tmp, last.endsWith('=') ? "\"{" + tmp + "}\"" : tmp);
          arr.push(last + tmp);
        }

        i += 2;
        tmp = '';
      } else {
        tmp += xml[i];
        i += 1;
      }
    }

    arr.push(tmp);
    return arr.map(function (e, index) {
      return arr[index - 1] && arr[index - 1].endsWith('=') ? "\"{" + e + "}\"" : e;
    }).join('');
  };
};
/**
 * 解析XML，并转化为相应的JSON结构
 * @param xml xml解析后的节点
 */


exports.xmlDataRenderer = xmlDataRenderer;

function parseXML(xml, cfg) {
  var attrs = {};
  var keys = xml.getAttributeNames && xml.getAttributeNames() || [];
  var children = xml.children && Array.from(xml.children).map(function (e) {
    return parseXML(e, cfg);
  });
  var rst = {};
  var tagName = xml.tagName ? xml.tagName.toLowerCase() : 'group';

  if (tagName === 'text') {
    attrs.text = xml.innerText;
  }

  rst.type = tagName;

  if (tagName === 'img') {
    rst.type = 'image';
  }

  Array.from(keys).forEach(function (k) {
    var key = keyConvert(k);
    var val = xml.getAttribute(k);

    try {
      if (key === 'style' || key === 'attrs') {
        var style = looseJSONParse(val);
        attrs = (0, _tslib.__assign)((0, _tslib.__assign)({}, attrs), style);
      } else {
        rst[key] = looseJSONParse(val);
      }
    } catch (e) {
      if (key === 'style') {
        throw e;
      }

      rst[key] = val;
    }
  });
  rst.attrs = attrs;

  if (cfg && cfg.style && rst.name && _typeof(cfg.style[rst.name]) === 'object') {
    rst.attrs = (0, _tslib.__assign)((0, _tslib.__assign)({}, rst.attrs), cfg.style[rst.name]);
  }

  if (cfg && cfg.style && rst.keyshape) {
    rst.attrs = (0, _tslib.__assign)((0, _tslib.__assign)({}, rst.attrs), cfg.style);
  }

  if (children.length) {
    rst.children = children;
  }

  return rst;
}
/**
 * 根据偏移量和内部节点最终的bounding box来得出该shape最终的bbox
 */


function getBBox(node, offset, chilrenBBox) {
  var _a = node.attrs,
      attrs = _a === void 0 ? {} : _a;
  var bbox = {
    x: offset.x || 0,
    y: offset.y || 0,
    width: chilrenBBox.width || 0,
    height: chilrenBBox.height || 0
  };
  var shapeHeight, shapeWidth;

  switch (node.type) {
    case 'maker':
    case 'circle':
      if (attrs.r) {
        shapeWidth = 2 * attrs.r;
        shapeHeight = 2 * attrs.r;
      }

      break;

    case 'text':
      if (attrs.text) {
        shapeWidth = (0, _graphic.getTextSize)(attrs.text, attrs.fontSize || 12)[0];
        shapeHeight = 16;
        bbox.y += shapeHeight;
        bbox.height = shapeHeight;
        bbox.width = shapeWidth;
        node.attrs = (0, _tslib.__assign)({
          fontSize: 12,
          fill: '#000'
        }, attrs);
      }

      break;

    default:
      if (attrs.width) {
        shapeWidth = attrs.width;
      }

      if (attrs.height) {
        shapeHeight = attrs.height;
      }

  }

  if (shapeHeight >= 0) {
    bbox.height = shapeHeight;
  }

  if (shapeWidth >= 0) {
    bbox.width = shapeWidth;
  }

  if (attrs.marginTop) {
    bbox.y += attrs.marginTop;
  }

  if (attrs.marginLeft) {
    bbox.x += attrs.marginLeft;
  }

  return bbox;
}
/**
 * 把从xml计算出的结构填上位置信息，补全attrs
 * @param target
 * @param lastOffset
 */


function generateTarget(target, lastOffset) {
  var _a;

  if (lastOffset === void 0) {
    lastOffset = {
      x: 0,
      y: 0
    };
  }

  var defaultBbox = (0, _tslib.__assign)({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }, lastOffset);

  if ((_a = target.children) === null || _a === void 0 ? void 0 : _a.length) {
    var _b = target.attrs,
        attrs = _b === void 0 ? {} : _b;
    var marginTop = attrs.marginTop;
    var offset = (0, _tslib.__assign)({}, lastOffset);

    if (marginTop) {
      offset.y += marginTop;
    }

    for (var index = 0; index < target.children.length; index++) {
      target.children[index].attrs.key = (attrs.key || 'root') + " -" + index + " ";
      var node = generateTarget(target.children[index], offset);

      if (node.bbox) {
        var bbox = node.bbox;

        if (node.attrs.next === 'inline') {
          offset.x += node.bbox.width;
        } else {
          offset.y += node.bbox.height;
        }

        if (bbox.width + bbox.x > defaultBbox.width) {
          defaultBbox.width = bbox.width + bbox.x;
        }

        if (bbox.height + bbox.y > defaultBbox.height) {
          defaultBbox.height = bbox.height + bbox.y;
        }
      }
    }
  }

  target.bbox = getBBox(target, lastOffset, defaultBbox);
  target.attrs = (0, _tslib.__assign)((0, _tslib.__assign)({}, target.attrs), target.bbox);
  return target;
}
/**
 * 对比前后两个最终计算出来的node，并对比出最小改动,
 * 动作： 'add' 添加节点 ｜ ’delete‘ 删除节点 ｜ ’change‘ 改变节点attrs ｜ 'restructure' 重构节点
 * @param nowTarget
 * @param formerTarget
 */


function compareTwoTarget(nowTarget, formerTarget) {
  var _a, _b, _c, _d;

  var type = (nowTarget || {}).type;
  var key = ((formerTarget === null || formerTarget === void 0 ? void 0 : formerTarget.attrs) || {}).key;

  if (key && nowTarget) {
    nowTarget.attrs.key = key;
  }

  if (!nowTarget && formerTarget) {
    return {
      action: 'delete',
      val: formerTarget,
      type: type,
      key: key
    };
  }

  if (nowTarget && !formerTarget) {
    return {
      action: 'add',
      val: nowTarget,
      type: type
    };
  }

  if (!nowTarget && !formerTarget) {
    return {
      action: 'same',
      type: type
    };
  }

  var children = [];

  if (((_a = nowTarget.children) === null || _a === void 0 ? void 0 : _a.length) > 0 || ((_b = formerTarget.children) === null || _b === void 0 ? void 0 : _b.length) > 0) {
    var length_1 = Math.max((_c = nowTarget.children) === null || _c === void 0 ? void 0 : _c.length, (_d = formerTarget.children) === null || _d === void 0 ? void 0 : _d.length);
    var formerChilren = formerTarget.children || [];
    var nowChilren = nowTarget.children || [];

    for (var index = 0; index < length_1; index += 1) {
      children.push(compareTwoTarget(nowChilren[index], formerChilren[index]));
    }
  }

  var formerKeys = Object.keys(formerTarget.attrs);
  var nowKeys = Object.keys(nowTarget.attrs);

  if (formerTarget.type !== nowTarget.type) {
    return {
      action: 'restructure',
      nowTarget: nowTarget,
      formerTarget: formerTarget,
      key: key,
      children: children
    };
  }

  if (formerKeys.filter(function (e) {
    return e !== 'children';
  }).some(function (e) {
    return nowTarget.attrs[e] !== formerTarget.attrs[e] || !nowKeys.includes(e);
  })) {
    return {
      action: 'change',
      val: nowTarget,
      children: children,
      type: type,
      key: key
    };
  }

  return {
    action: 'same',
    children: children,
    type: type,
    key: key
  };
}
/**
 * 根据xml或者返回xml的函数构建自定义节点的结构
 * @param gen
 */


function createNodeFromXML(gen) {
  var structures = {};

  var compileXML = function compileXML(cfg) {
    var rawStr = typeof gen === 'function' ? gen(cfg) : gen;
    var target = xmlDataRenderer(rawStr)(cfg);
    var xmlParser = document.createElement('div');
    xmlParser.innerHTML = target;
    var xml = xmlParser.children[0];
    var result = generateTarget(parseXML(xml, cfg));
    xmlParser.remove();
    return result;
  };

  return {
    draw: function draw(cfg, group) {
      var resultTarget = compileXML(cfg);
      var keyshape = group;

      var renderTarget = function renderTarget(target) {
        var _a = target.attrs,
            attrs = _a === void 0 ? {} : _a,
            bbox = target.bbox,
            type = target.type,
            children = target.children,
            rest = (0, _tslib.__rest)(target, ["attrs", "bbox", "type", "children"]);

        if (target.type !== 'group') {
          var shape = group.addShape(target.type, (0, _tslib.__assign)({
            attrs: attrs,
            origin: {
              bbox: bbox,
              type: type,
              children: children
            }
          }, rest));

          if (target.keyshape) {
            keyshape = shape;
          }
        }

        if (target.children) {
          target.children.forEach(function (n) {
            return renderTarget(n);
          });
        }
      };

      renderTarget(resultTarget);
      structures[cfg.id] = [resultTarget];
      return keyshape;
    },
    update: function update(cfg, node) {
      if (!structures[cfg.id]) {
        structures[cfg.id] = [];
      }

      var container = node.getContainer();
      var children = container.get('children');
      var newTarget = compileXML(cfg);
      var lastTarget = structures[cfg.id].pop();
      var diffResult = compareTwoTarget(newTarget, lastTarget);

      var addShape = function addShape(shape) {
        var _a;

        if (shape.type !== 'group') {
          container.addShape(shape.type, {
            attrs: shape.attrs
          });
        }

        if ((_a = shape.children) === null || _a === void 0 ? void 0 : _a.length) {
          shape.children.map(function (e) {
            return addShape(e);
          });
        }
      };

      var delShape = function delShape(shape) {
        var _a;

        var targetShape = children.find(function (e) {
          return e.attrs.key === shape.attrs.key;
        });

        if (targetShape) {
          container.removeChild(targetShape);
        }

        if ((_a = shape.children) === null || _a === void 0 ? void 0 : _a.length) {
          shape.children.map(function (e) {
            return delShape(e);
          });
        }
      };

      var updateTarget = function updateTarget(target) {
        var key = target.key;

        if (target.type !== 'group') {
          var targetShape = children.find(function (e) {
            return e.attrs.key === key;
          });

          switch (target.action) {
            case 'change':
              if (targetShape) {
                var originAttr = target.val.keyshape ? node.getOriginStyle() : {};
                targetShape.attr((0, _tslib.__assign)((0, _tslib.__assign)({}, originAttr), target.val.attrs));
              }

              break;

            case 'add':
              addShape(target.val);
              break;

            case 'delete':
              delShape(target.val);
              break;

            case 'restructure':
              delShape(target.formerTarget);
              addShape(target.nowTarget);
              break;

            default:
              break;
          }
        }

        if (target.children) {
          target.children.forEach(function (n) {
            return updateTarget(n);
          });
        }
      };

      updateTarget(diffResult);
      structures[cfg.id].push(newTarget);
    },
    getAnchorPoints: function getAnchorPoints() {
      return [[0, 0.5], [1, 0.5], [0.5, 1], [0.5, 0]];
    }
  };
}
}, function(modId) { var map = {"../util/graphic":1685504765329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765342, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tslib = require("tslib");

var _util = require("@antv/util");

var _math = require("../util/math");

var _item = _interopRequireDefault(require("./item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CACHE_ANCHOR_POINTS = 'anchorPointsCache';
var CACHE_BBOX = 'bboxCache';

var Node =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Node, _super);

  function Node() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Node.prototype.getNearestPoint = function (points, curPoint) {
    var index = 0;
    var nearestPoint = points[0];
    var minDistance = (0, _math.distance)(points[0], curPoint);

    for (var i = 0; i < points.length; i++) {
      var point = points[i];
      var dis = (0, _math.distance)(point, curPoint);

      if (dis < minDistance) {
        nearestPoint = point;
        minDistance = dis;
        index = i;
      }
    }

    nearestPoint.anchorIndex = index;
    return nearestPoint;
  };

  Node.prototype.getDefaultCfg = function () {
    return {
      type: 'node',
      edges: []
    };
  };
  /**
   * 获取从节点关联的所有边
   */


  Node.prototype.getEdges = function () {
    return this.get('edges');
  };
  /**
   * 获取所有的入边
   */


  Node.prototype.getInEdges = function () {
    var self = this;
    return this.get('edges').filter(function (edge) {
      return edge.get('target') === self;
    });
  };
  /**
   * 获取所有的出边
   */


  Node.prototype.getOutEdges = function () {
    var self = this;
    return this.get('edges').filter(function (edge) {
      return edge.get('source') === self;
    });
  };
  /**
   * 获取节点的邻居节点
   *
   * @returns {INode[]}
   * @memberof Node
   */


  Node.prototype.getNeighbors = function (type) {
    var _this = this;

    var edges = this.get('edges');

    if (type === 'target') {
      // 当前节点为 source，它所指向的目标节点
      var neighhborsConverter_1 = function neighhborsConverter_1(edge) {
        return edge.getSource() === _this;
      };

      return edges.filter(neighhborsConverter_1).map(function (edge) {
        return edge.getTarget();
      });
    }

    if (type === 'source') {
      // 当前节点为 target，它所指向的源节点
      var neighhborsConverter_2 = function neighhborsConverter_2(edge) {
        return edge.getTarget() === _this;
      };

      return edges.filter(neighhborsConverter_2).map(function (edge) {
        return edge.getSource();
      });
    } // 若未指定 type ，则返回所有邻居


    var neighhborsConverter = function neighhborsConverter(edge) {
      return edge.getSource() === _this ? edge.getTarget() : edge.getSource();
    };

    return edges.map(neighhborsConverter);
  };
  /**
   * 根据锚点的索引获取连接点
   * @param  {Number} index 索引
   */


  Node.prototype.getLinkPointByAnchor = function (index) {
    var anchorPoints = this.getAnchorPoints();
    return anchorPoints[index];
  };
  /**
   * 获取连接点
   * @param point
   */


  Node.prototype.getLinkPoint = function (point) {
    var keyShape = this.get('keyShape');
    var type = keyShape.get('type');
    var itemType = this.get('type');
    var centerX;
    var centerY;
    var bbox = this.getBBox();

    if (itemType === 'combo') {
      centerX = bbox.centerX || (bbox.maxX + bbox.minX) / 2;
      centerY = bbox.centerY || (bbox.maxY + bbox.minY) / 2;
    } else {
      centerX = bbox.centerX;
      centerY = bbox.centerY;
    }

    var anchorPoints = this.getAnchorPoints();
    var intersectPoint;

    switch (type) {
      case 'circle':
        intersectPoint = (0, _math.getCircleIntersectByPoint)({
          x: centerX,
          y: centerY,
          r: bbox.width / 2
        }, point);
        break;

      case 'ellipse':
        intersectPoint = (0, _math.getEllipseIntersectByPoint)({
          x: centerX,
          y: centerY,
          rx: bbox.width / 2,
          ry: bbox.height / 2
        }, point);
        break;

      default:
        intersectPoint = (0, _math.getRectIntersectByPoint)(bbox, point);
    }

    var linkPoint = intersectPoint; // 如果存在锚点，则使用交点计算最近的锚点

    if (anchorPoints.length) {
      if (!linkPoint) {
        // 如果计算不出交点
        linkPoint = point;
      }

      linkPoint = this.getNearestPoint(anchorPoints, linkPoint);
    }

    if (!linkPoint) {
      // 如果最终依然没法找到锚点和连接点，直接返回中心点
      linkPoint = {
        x: centerX,
        y: centerY
      };
    }

    return linkPoint;
  };
  /**
   * 获取锚点的定义
   * @return {array} anchorPoints
   */


  Node.prototype.getAnchorPoints = function () {
    var anchorPoints = this.get(CACHE_ANCHOR_POINTS);

    if (!anchorPoints) {
      anchorPoints = [];
      var shapeFactory = this.get('shapeFactory');
      var bbox_1 = this.getBBox();
      var model = this.get('model');
      var shapeCfg = this.getShapeCfg(model);
      var type = model.type;
      var points = shapeFactory.getAnchorPoints(type, shapeCfg) || [];
      (0, _util.each)(points, function (pointArr, index) {
        var point = {
          x: bbox_1.minX + pointArr[0] * bbox_1.width,
          y: bbox_1.minY + pointArr[1] * bbox_1.height,
          anchorIndex: index
        };
        anchorPoints.push(point);
      });
      this.set(CACHE_ANCHOR_POINTS, anchorPoints);
    }

    return anchorPoints;
  };
  /**
   * add edge
   * @param edge Edge instance
   */


  Node.prototype.addEdge = function (edge) {
    this.get('edges').push(edge);
  };
  /**
   * 锁定节点
   */


  Node.prototype.lock = function () {
    this.set('locked', true);
  };
  /**
   * 解锁锁定的节点
   */


  Node.prototype.unlock = function () {
    this.set('locked', false);
  };

  Node.prototype.hasLocked = function () {
    return this.get('locked');
  };
  /**
   * 移除边
   * @param {Edge} edge 边
   */


  Node.prototype.removeEdge = function (edge) {
    var edges = this.getEdges();
    var index = edges.indexOf(edge);

    if (index > -1) {
      edges.splice(index, 1);
    }
  };

  Node.prototype.clearCache = function () {
    this.set(CACHE_BBOX, null); // 清理缓存的 bbox

    this.set(CACHE_ANCHOR_POINTS, null);
  };
  /**
   * 是否仅仅移动节点，其他属性没变化
   * @param cfg 节点数据模型
   */


  Node.prototype.isOnlyMove = function (cfg) {
    if (!cfg) {
      return false;
    }

    var existX = !(0, _util.isNil)(cfg.x);
    var existY = !(0, _util.isNil)(cfg.y);
    var keys = Object.keys(cfg); // 仅有一个字段，包含 x 或者 包含 y
    // 两个字段，同时有 x，同时有 y

    return keys.length === 1 && (existX || existY) || keys.length === 2 && existX && existY;
  };

  return Node;
}(_item.default);

var _default = Node;
exports.default = _default;
}, function(modId) { var map = {"../util/math":1685504765327,"./item":1685504765339}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765343, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tslib = require("tslib");

var _node = _interopRequireDefault(require("./node"));

var _global = _interopRequireDefault(require("../global"));

var _graphic = require("../util/graphic");

var _util = require("@antv/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CACHE_BBOX = 'bboxCache';
var CACHE_CANVAS_BBOX = 'bboxCanvasCache';
var CACHE_SIZE = 'sizeCache';
var CACHE_ANCHOR_POINTS = 'anchorPointsCache';

var Combo =
/** @class */
function (_super) {
  (0, _tslib.__extends)(Combo, _super);

  function Combo() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Combo.prototype.getDefaultCfg = function () {
    return {
      type: 'combo',
      nodes: [],
      edges: [],
      combos: []
    };
  };

  Combo.prototype.getShapeCfg = function (model) {
    var styles = this.get('styles');
    var bbox = this.get('bbox');

    if (styles && bbox) {
      // merge graph的item样式与数据模型中的样式
      var newModel = model;
      var size = {
        r: Math.hypot(bbox.height, bbox.width) / 2 || _global.default.defaultCombo.size[0] / 2,
        width: bbox.width || _global.default.defaultCombo.size[0],
        height: bbox.height || _global.default.defaultCombo.size[1]
      };
      newModel.style = (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, styles), model.style), size);
      var padding = model.padding || _global.default.defaultCombo.padding;

      if ((0, _util.isNumber)(padding)) {
        size.r += padding;
        size.width += padding * 2;
        size.height += padding * 2;
      } else {
        size.r += padding[0];
        size.width += padding[1] + padding[3] || padding[1] * 2;
        size.height += padding[0] + padding[2] || padding[0] * 2;
      }

      this.set(CACHE_SIZE, size);
      return newModel;
    }

    return model;
  };
  /**
   * 根据 keyshape 计算包围盒
   */


  Combo.prototype.calculateCanvasBBox = function () {
    if (this.destroyed) return;
    var keyShape = this.get('keyShape');
    var group = this.get('group'); // 因为 group 可能会移动，所以必须通过父元素计算才能计算出正确的包围盒

    var bbox = (0, _graphic.getBBox)(keyShape, group);
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    var cacheSize = this.get(CACHE_SIZE);
    var cacheBBox = this.get(CACHE_BBOX) || {};
    var oriX = cacheBBox.x;
    var oriY = cacheBBox.x;

    if (cacheSize) {
      cacheSize.width = Math.max(cacheSize.width, bbox.width);
      cacheSize.height = Math.max(cacheSize.height, bbox.height);
      var type = keyShape.get('type');

      if (type === 'circle') {
        bbox.width = cacheSize.r * 2;
        bbox.height = cacheSize.r * 2;
      } else {
        bbox.width = cacheSize.width;
        bbox.height = cacheSize.height;
      }

      bbox.minX = bbox.centerX - bbox.width / 2;
      bbox.minY = bbox.centerY - bbox.height / 2;
      bbox.maxX = bbox.centerX + bbox.width / 2;
      bbox.maxY = bbox.centerY + bbox.height / 2;
    } else {
      bbox.width = bbox.maxX - bbox.minX;
      bbox.height = bbox.maxY - bbox.minY;
      bbox.centerX = (bbox.minX + bbox.maxX) / 2;
      bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    }

    bbox.x = bbox.minX;
    bbox.y = bbox.minY;
    if (bbox.x !== oriX || bbox.y !== oriY) this.set(CACHE_ANCHOR_POINTS, null);
    return bbox;
  };
  /**
   * 获取 Combo 中所有的子元素，包括 Combo、Node 及 Edge
   */


  Combo.prototype.getChildren = function () {
    var self = this;
    return {
      nodes: self.getNodes(),
      combos: self.getCombos()
    };
  };
  /**
   * 获取 Combo 中所有子节点
   */


  Combo.prototype.getNodes = function () {
    var self = this;
    return self.get('nodes');
  };
  /**
   * 获取 Combo 中所有子 combo
   */


  Combo.prototype.getCombos = function () {
    var self = this;
    return self.get('combos');
  };
  /**
   * 向 Combo 中增加子 combo 或 node
   * @param item Combo 或节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */


  Combo.prototype.addChild = function (item) {
    var self = this;
    var itemType = item.getType();

    switch (itemType) {
      case 'node':
        self.addNode(item);
        break;

      case 'combo':
        self.addCombo(item);
        break;

      default:
        console.warn('Only node or combo items are allowed to be added into a combo');
        return false;
    }

    return true;
  };
  /**
   * 向 Combo 中增加 combo
   * @param combo Combo 实例
   * @return boolean 添加成功返回 true，否则返回 false
   */


  Combo.prototype.addCombo = function (combo) {
    var self = this;
    self.get('combos').push(combo);
    return true;
  };
  /**
   * 向 Combo 中添加节点
   * @param node 节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */


  Combo.prototype.addNode = function (node) {
    var self = this;
    self.get('nodes').push(node);
    return true;
  };
  /**
   * 向 Combo 中增加子 combo 或 node
   * @param item Combo 或节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */


  Combo.prototype.removeChild = function (item) {
    var self = this;
    var itemType = item.getType();

    switch (itemType) {
      case 'node':
        self.removeNode(item);
        break;

      case 'combo':
        self.removeCombo(item);
        break;

      default:
        console.warn('Only node or combo items are allowed to be added into a combo');
        return false;
    }

    return true;
  };
  /**
   * 从 Combo 中移除指定的 combo
   * @param combo Combo 实例
   * @return boolean 移除成功返回 true，否则返回 false
   */


  Combo.prototype.removeCombo = function (combo) {
    if (!combo) return;
    var combos = this.getCombos();
    var index = combos.indexOf(combo);

    if (index > -1) {
      combos.splice(index, 1);
      return true;
    }

    return false;
  };
  /**
   * 向 Combo 中移除指定的节点
   * @param node 节点实例
   * @return boolean 移除成功返回 true，否则返回 false
   */


  Combo.prototype.removeNode = function (node) {
    if (!node) return;
    var nodes = this.getNodes();
    var index = nodes.indexOf(node);

    if (index > -1) {
      nodes.splice(index, 1);
      return true;
    }

    return false;
  };

  Combo.prototype.isOnlyMove = function (cfg) {
    return false;
  };
  /**
   * 获取 item 的包围盒，这个包围盒是相对于 item 自己，不会将 matrix 计算在内
   * @return {Object} 包含 x,y,width,height, centerX, centerY
   */


  Combo.prototype.getBBox = function () {
    this.set(CACHE_CANVAS_BBOX, null);
    var bbox = this.calculateCanvasBBox();
    return bbox;
  };

  Combo.prototype.clearCache = function () {
    this.set(CACHE_BBOX, null); // 清理缓存的 bbox

    this.set(CACHE_CANVAS_BBOX, null);
    this.set(CACHE_ANCHOR_POINTS, null);
  };

  Combo.prototype.destroy = function () {
    if (!this.destroyed) {
      var animate = this.get('animate');
      var group = this.get('group');

      if (animate) {
        group.stopAnimate();
      }

      this.clearCache();
      this.set(CACHE_SIZE, null);
      this.set('bbox', null);
      group.remove();
      this._cfg = null;
      this.destroyed = true;
    }
  };

  return Combo;
}(_node.default);

var _default = Combo;
exports.default = _default;
}, function(modId) { var map = {"./node":1685504765342,"../global":1685504765330,"../util/graphic":1685504765329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765344, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("@antv/util");

var timer = null;

var StateController =
/** @class */
function () {
  function StateController(graph) {
    this.graph = graph;
    /**
     * this.cachedStates = {
     *    enabled: {
     *        hover: [Node]
     *    },
     *     disabled: {}
     *  }
     */

    this.cachedStates = {
      enabled: {},
      disabled: {}
    };
    this.destroyed = false;
  }
  /**
   * 检查 cache 的可用性
   *
   * @private
   * @param {Item} item
   * @param {string} state
   * @param {object} cache
   * @returns
   * @memberof State
   */


  StateController.checkCache = function (item, state, cache) {
    if (!cache[state]) {
      return;
    }

    var index = cache[state].indexOf(item);

    if (index >= 0) {
      cache[state].splice(index, 1);
    }
  };
  /**
   * 缓存 state
   *
   * @private
   * @param {Item} item Item 实例
   * @param {string} state 状态名称
   * @param {object} states
   * @memberof State
   */


  StateController.cacheState = function (item, state, states) {
    if (!states[state]) {
      states[state] = [];
    }

    states[state].push(item);
  };
  /**
   * 更新 Item 的状态
   *
   * @param {Item} item Item实例
   * @param {string} state 状态名称
   * @param {boolean} enabled 状态是否可用
   * @memberof State
   */


  StateController.prototype.updateState = function (item, state, enabled) {
    var _this = this;

    var checkCache = StateController.checkCache,
        cacheState = StateController.cacheState;

    if (item.destroyed) {
      return;
    }

    var cachedStates = this.cachedStates;
    var enabledStates = cachedStates.enabled;
    var disabledStates = cachedStates.disabled;

    if (enabled) {
      checkCache(item, state, disabledStates);
      cacheState(item, state, enabledStates);
    } else {
      checkCache(item, state, enabledStates);
      cacheState(item, state, disabledStates);
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      timer = null;

      _this.updateGraphStates();
    }, 16);
  };
  /**
   * 批量更新 states，兼容 updateState，支持更新一个 state
   *
   * @param {Item} item
   * @param {(string | string[])} states
   * @param {boolean} enabled
   * @memberof State
   */


  StateController.prototype.updateStates = function (item, states, enabled) {
    var _this = this;

    if ((0, _util.isString)(states)) {
      this.updateState(item, states, enabled);
    } else {
      states.forEach(function (state) {
        _this.updateState(item, state, enabled);
      });
    }
  };
  /**
   * 更新 states
   *
   * @memberof State
   */


  StateController.prototype.updateGraphStates = function () {
    var states = this.graph.get('states');
    var cachedStates = this.cachedStates;
    (0, _util.each)(cachedStates.disabled, function (val, key) {
      if (states[key]) {
        states[key] = states[key].filter(function (item) {
          return val.indexOf(item) < 0 && !val.destroyed;
        });
      }
    });
    (0, _util.each)(cachedStates.enabled, function (val, key) {
      if (!states[key]) {
        states[key] = val;
      } else {
        var map_1 = {};
        states[key].forEach(function (item) {
          if (!item.destroyed) {
            map_1[item.get('id')] = true;
          }
        });
        val.forEach(function (item) {
          if (!item.destroyed) {
            var id = item.get('id');

            if (!map_1[id]) {
              map_1[id] = true;
              states[key].push(item);
            }
          }
        });
      }
    });
    this.graph.emit('graphstatechange', {
      states: states
    });
    this.cachedStates = {
      enabled: {},
      disabled: {}
    };
  };

  StateController.prototype.destroy = function () {
    this.graph = null;
    this.cachedStates = null;

    if (timer) {
      clearTimeout(timer);
    }

    timer = null;
    this.destroyed = true;
  };

  return StateController;
}();

var _default = StateController;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765345, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tslib = require("tslib");

var _util = require("@antv/util");

var _pathUtil = require("@antv/path-util");

var _path = require("../util/path");

var _math = require("../util/math");

var _convexHull = require("../element/hull/convexHull");

var _bubbleset = require("../element/hull/bubbleset");

/**
 * 用于包裹内部的成员的轮廓。
 * convex hull(凸包)：http://geomalgorithms.com/a10-_hull-1.html#Monotone%20Chain
 * bubble: 使用 bubbleset算法，refer: http://vialab.science.uoit.ca/wp-content/papercite-data/pdf/col2009c.pdf
 * 通过配置 padding 可以调节包裹轮廓对节点的松紧程度
 */
var Hull =
/** @class */
function () {
  function Hull(graph, cfg) {
    this.cfg = (0, _util.deepMix)(this.getDefaultCfg(), cfg);
    this.graph = graph;
    this.id = this.cfg.id;
    this.group = this.cfg.group;
    this.members = this.cfg.members.map(function (item) {
      return (0, _util.isString)(item) ? graph.findById(item) : item;
    });
    this.nonMembers = this.cfg.nonMembers.map(function (item) {
      return (0, _util.isString)(item) ? graph.findById(item) : item;
    });
    this.setPadding();
    this.setType();
    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  }

  Hull.prototype.getDefaultCfg = function () {
    return {
      id: 'g6-hull',
      type: 'round-convex',
      members: [],
      nonMembers: [],
      style: {
        fill: 'lightblue',
        stroke: 'blue',
        opacity: 0.2
      },
      padding: 10
    };
  };

  Hull.prototype.setPadding = function () {
    var nodeSize = this.members.length && this.members[0].getKeyShape().getCanvasBBox().width / 2;
    this.padding = this.cfg.padding > 0 ? this.cfg.padding + nodeSize : 10 + nodeSize;
    this.cfg.bubbleCfg = {
      nodeR0: this.padding - nodeSize,
      nodeR1: this.padding - nodeSize,
      morphBuffer: this.padding - nodeSize
    };
  };

  Hull.prototype.setType = function () {
    this.type = this.cfg.type;

    if (this.members.length < 3) {
      this.type = 'round-convex';
    }

    if (this.type !== 'round-convex' && this.type !== 'smooth-convex' && this.type !== 'bubble') {
      console.warn('The hull type should be either round-convex, smooth-convex or bubble, round-convex is used by default.');
      this.type = 'round-convex';
    }
  };

  Hull.prototype.calcPath = function (members, nonMembers) {
    var contour, path, hull;

    switch (this.type) {
      case 'round-convex':
        contour = (0, _convexHull.genConvexHull)(members);
        hull = (0, _path.roundedHull)(contour.map(function (p) {
          return [p.x, p.y];
        }), this.padding);
        path = (0, _pathUtil.parsePathString)(hull);
        break;

      case 'smooth-convex':
        contour = (0, _convexHull.genConvexHull)(members);

        if (contour.length === 2) {
          hull = (0, _path.roundedHull)(contour.map(function (p) {
            return [p.x, p.y];
          }), this.padding);
          path = (0, _pathUtil.parsePathString)(hull);
        } else if (contour.length > 2) {
          hull = (0, _path.paddedHull)(contour.map(function (p) {
            return [p.x, p.y];
          }), this.padding);
          path = (0, _path.getClosedSpline)(hull);
        }

        break;

      case 'bubble':
        contour = (0, _bubbleset.genBubbleSet)(members, nonMembers, this.cfg.bubbleCfg);
        path = contour.length >= 2 && (0, _path.getClosedSpline)(contour);
        break;

      default:
    }

    return path;
  };

  Hull.prototype.render = function () {
    this.group.addShape('path', {
      attrs: (0, _tslib.__assign)({
        path: this.path
      }, this.cfg.style),
      id: this.id,
      name: this.cfg.id
    });
    this.group.toBack();
  };
  /**
   * 增加hull的成员，同时如果该成员原先在nonMembers中，则从nonMembers中去掉
   * @param item 节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */


  Hull.prototype.addMember = function (item) {
    if (!item) return;
    if ((0, _util.isString)(item)) item = this.graph.findById(item);
    this.members.push(item);
    var index = this.nonMembers.indexOf(item);

    if (index > -1) {
      this.nonMembers.splice(index, 1);
    }

    this.updateData(this.members, this.nonMembers);
    return true;
  };
  /**
   * 增加hull需要排除的节点，同时如果该成员原先在members中，则从members中去掉
   * @param item 节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */


  Hull.prototype.addNonMember = function (item) {
    if (!item) return;
    if ((0, _util.isString)(item)) item = this.graph.findById(item);
    this.nonMembers.push(item);
    var index = this.members.indexOf(item);

    if (index > -1) {
      this.members.splice(index, 1);
    }

    this.updateData(this.members, this.nonMembers);
    return true;
  };
  /**
   * 移除hull中的成员
   * @param node 节点实例
   * @return boolean 移除成功返回 true，否则返回 false
   */


  Hull.prototype.removeMember = function (item) {
    if (!item) return;
    if ((0, _util.isString)(item)) item = this.graph.findById(item);
    var index = this.members.indexOf(item);

    if (index > -1) {
      this.members.splice(index, 1);
      this.updateData(this.members, this.nonMembers);
      return true;
    }

    return false;
  };
  /**
   * @param node 节点实例
   * @return boolean 移除成功返回 true，否则返回 false
   */


  Hull.prototype.removeNonMember = function (item) {
    if (!item) return;
    if ((0, _util.isString)(item)) item = this.graph.findById(item);
    var index = this.nonMembers.indexOf(item);

    if (index > -1) {
      this.nonMembers.splice(index, 1);
      this.updateData(this.members, this.nonMembers);
      return true;
    }

    return false;
  };

  Hull.prototype.updateData = function (members, nonMembers) {
    var _this = this;

    this.group.findById(this.id).remove();
    if (members) this.members = members.map(function (item) {
      return (0, _util.isString)(item) ? _this.graph.findById(item) : item;
    });
    if (nonMembers) this.nonMembers = nonMembers.map(function (item) {
      return (0, _util.isString)(item) ? _this.graph.findById(item) : item;
    });
    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  };

  Hull.prototype.updateStyle = function (cfg) {
    var path = this.group.findById(this.id);
    path.attr((0, _tslib.__assign)({}, cfg));
  };
  /**
   * 更新 hull
   * @param cfg hull 配置项
   */


  Hull.prototype.updateCfg = function (cfg) {
    var _this = this;

    this.cfg = (0, _util.deepMix)(this.cfg, cfg);
    this.id = this.cfg.id;
    this.group = this.cfg.group;

    if (cfg.members) {
      this.members = this.cfg.members.map(function (item) {
        return (0, _util.isString)(item) ? _this.graph.findById(item) : item;
      });
    }

    if (cfg.nonMembers) {
      this.nonMembers = this.cfg.nonMembers.map(function (item) {
        return (0, _util.isString)(item) ? _this.graph.findById(item) : item;
      });
    } // TODO padding 设置太大，会影响到 contain 结果


    this.setPadding();
    this.setType();
    this.path = this.calcPath(this.members, this.nonMembers);
    this.render();
  };
  /**
   * 判断是否在hull内部
   * @param item
   */


  Hull.prototype.contain = function (item) {
    var _this = this;

    var nodeItem;

    if ((0, _util.isString)(item)) {
      nodeItem = this.graph.findById(item);
    } else {
      nodeItem = item;
    }

    var shapePoints;
    var shape = nodeItem.getKeyShape();

    if (nodeItem.get('type') === 'path') {
      shapePoints = (0, _path.pathToPoints)(shape.attr('path'));
    } else {
      var shapeBBox = shape.getCanvasBBox();
      shapePoints = [[shapeBBox.minX, shapeBBox.minY], [shapeBBox.maxX, shapeBBox.minY], [shapeBBox.maxX, shapeBBox.maxY], [shapeBBox.minX, shapeBBox.maxY]];
    }

    shapePoints = shapePoints.map(function (canvasPoint) {
      var point = _this.graph.getPointByCanvas(canvasPoint[0], canvasPoint[1]);

      return [point.x, point.y];
    });
    return (0, _math.isPolygonsIntersect)(shapePoints, (0, _path.pathToPoints)(this.path));
  };

  Hull.prototype.destroy = function () {
    this.group.remove();
    this.cfg = null;
  };

  return Hull;
}();

var _default = Hull;
exports.default = _default;
}, function(modId) { var map = {"../util/path":1685504765346,"../util/math":1685504765327,"../element/hull/convexHull":1685504765347,"../element/hull/bubbleset":1685504765348}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765346, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundedHull = roundedHull;
exports.paddedHull = paddedHull;
exports.getClosedSpline = exports.pathToPoints = exports.pointsToPolygon = exports.getControlPoint = exports.getSpline = void 0;

var _matrixUtil = require("@antv/matrix-util");

var _pathUtil = require("@antv/path-util");

/**
 * 替换字符串中的字段
 * @param {String} str 模版字符串
 * @param {Object} o json data
 */
var substitute = function substitute(str, o) {
  if (!str || !o) {
    return str;
  }

  return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
    if (match.charAt(0) === '\\') {
      return match.slice(1);
    }

    var res = o[name];
    if (res === 0) res = '0';
    return res || '';
  });
};
/**
 * 给定坐标获取三次贝塞尔曲线的 M 及 C 值
 * @param points coordinate set
 */


var getSpline = function getSpline(points) {
  var data = [];

  if (points.length < 2) {
    throw new Error("point length must largn than 2, now it's " + points.length);
  }

  for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
    var point = points_1[_i];
    var x = point.x,
        y = point.y;
    data.push(x);
    data.push(y);
  }

  var spliePath = (0, _pathUtil.catmullRom2Bezier)(data);
  spliePath.unshift(['M', points[0].x, points[0].y]);
  return spliePath;
};
/**
 * 根据起始点、相对位置、偏移量计算控制点
 * @param  {IPoint} startPoint 起始点，包含 x,y
 * @param  {IPoint} endPoint  结束点, 包含 x,y
 * @param  {Number} percent   相对位置,范围 0-1
 * @param  {Number} offset    偏移量
 * @return {IPoint} 控制点，包含 x,y
 */


exports.getSpline = getSpline;

var getControlPoint = function getControlPoint(startPoint, endPoint, percent, offset) {
  if (percent === void 0) {
    percent = 0;
  }

  if (offset === void 0) {
    offset = 0;
  }

  var point = {
    x: (1 - percent) * startPoint.x + percent * endPoint.x,
    y: (1 - percent) * startPoint.y + percent * endPoint.y
  };
  var tangent = [0, 0];

  _matrixUtil.vec2.normalize(tangent, [endPoint.x - startPoint.x, endPoint.y - startPoint.y]);

  if (!tangent || !tangent[0] && !tangent[1]) {
    tangent = [0, 0];
  }

  var perpendicular = [-tangent[1] * offset, tangent[0] * offset]; // 垂直向量

  point.x += perpendicular[0];
  point.y += perpendicular[1];
  return point;
};
/**
 * 点集转化为Path多边形
 * @param {Array} points 点集
 * @param {Boolen} z 是否封闭
 * @return {Array} Path
 */


exports.getControlPoint = getControlPoint;

var pointsToPolygon = function pointsToPolygon(points, z) {
  var length = points.length;

  if (!length) {
    return '';
  }

  var path = '';
  var str = '';

  for (var i = 0; i < length; i++) {
    var item = points[i];

    if (i === 0) {
      str = 'M{x} {y}';
    } else {
      str = 'L{x} {y}';
    }

    path += substitute(str, item);
  }

  if (z) {
    path += 'Z';
  }

  return path;
};

exports.pointsToPolygon = pointsToPolygon;

var pathToPoints = function pathToPoints(path) {
  var points = [];
  path.forEach(function (seg) {
    var command = seg[0];

    if (command !== 'A') {
      for (var i = 1; i < seg.length; i = i + 2) {
        points.push([seg[i], seg[i + 1]]);
      }
    } else {
      var length_1 = seg.length;
      points.push([seg[length_1 - 2], seg[length_1 - 1]]);
    }
  });
  return points;
};
/**
 * 生成平滑的闭合曲线
 * @param points
 */


exports.pathToPoints = pathToPoints;

var getClosedSpline = function getClosedSpline(points) {
  if (points.length < 2) {
    throw new Error("point length must largn than 2, now it's " + points.length);
  }

  var first = points[0];
  var second = points[1];
  var last = points[points.length - 1];
  var lastSecond = points[points.length - 2];
  points.unshift(last);
  points.unshift(lastSecond);
  points.push(first);
  points.push(second);
  var closedPath = [];

  for (var i = 1; i < points.length - 2; i += 1) {
    var x0 = points[i - 1].x;
    var y0 = points[i - 1].y;
    var x1 = points[i].x;
    var y1 = points[i].y;
    var x2 = points[i + 1].x;
    var y2 = points[i + 1].y;
    var x3 = i !== points.length - 2 ? points[i + 2].x : x2;
    var y3 = i !== points.length - 2 ? points[i + 2].y : y2;
    var cp1x = x1 + (x2 - x0) / 6;
    var cp1y = y1 + (y2 - y0) / 6;
    var cp2x = x2 - (x3 - x1) / 6;
    var cp2y = y2 - (y3 - y1) / 6;
    closedPath.push(['C', cp1x, cp1y, cp2x, cp2y, x2, y2]);
  }

  closedPath.unshift(['M', last.x, last.y]);
  return closedPath;
};

exports.getClosedSpline = getClosedSpline;

var vecScaleTo = function vecScaleTo(v, length) {
  // Vector with direction of v with specified length
  return _matrixUtil.vec2.scale([0, 0], _matrixUtil.vec2.normalize([0, 0], v), length);
};

var unitNormal = function unitNormal(p0, p1) {
  // Returns the unit normal to the line segment from p0 to p1.
  var n = [p0[1] - p1[1], p1[0] - p0[0]];
  var nLength = Math.sqrt(n[0] * n[0] + n[1] * n[1]);

  if (nLength === 0) {
    throw new Error('p0 should not be equal to p1');
  }

  return [n[0] / nLength, n[1] / nLength];
};

var vecFrom = function vecFrom(p0, p1) {
  // Vector from p0 to p1
  return [p1[0] - p0[0], p1[1] - p0[1]];
};
/**
 * 传入的节点作为多边形顶点，生成有圆角的多边形
 * @param polyPoints 多边形顶点
 * @param padding 在原多边形基础上增加最终轮廓和原多边形的空白间隔
 */


function roundedHull(polyPoints, padding) {
  // The rounded hull path around a single point
  var roundedHull1 = function roundedHull1(points) {
    var p1 = [points[0][0], points[0][1] - padding];
    var p2 = [points[0][0], points[0][1] + padding];
    return "M " + p1 + " A " + padding + "," + padding + ",0,0,0," + p2 + " A " + padding + "," + padding + ",0,0,0," + p1;
  }; // The rounded hull path around two points


  var roundedHull2 = function roundedHull2(points) {
    var offsetVector = _matrixUtil.vec2.scale([0, 0], unitNormal(points[0], points[1]), padding);

    var invOffsetVector = _matrixUtil.vec2.scale([0, 0], offsetVector, -1);

    var p0 = _matrixUtil.vec2.add([0, 0], points[0], offsetVector);

    var p1 = _matrixUtil.vec2.add([0, 0], points[1], offsetVector);

    var p2 = _matrixUtil.vec2.add([0, 0], points[1], invOffsetVector);

    var p3 = _matrixUtil.vec2.add([0, 0], points[0], invOffsetVector);

    return "M " + p0 + " L " + p1 + " A " + [padding, padding, '0,0,0', p2].join(',') + " L " + p3 + " A " + [padding, padding, '0,0,0', p0].join(',');
  }; // 特殊情况处理：节点数小于等于2


  if (!polyPoints || polyPoints.length < 1) return '';
  if (polyPoints.length === 1) return roundedHull1(polyPoints);
  if (polyPoints.length === 2) return roundedHull2(polyPoints);
  var segments = new Array(polyPoints.length); // Calculate each offset (outwards) segment of the convex hull.

  for (var segmentIndex = 0; segmentIndex < segments.length; ++segmentIndex) {
    var p0 = segmentIndex === 0 ? polyPoints[polyPoints.length - 1] : polyPoints[segmentIndex - 1];
    var p1 = polyPoints[segmentIndex]; // Compute the offset vector for the line segment, with length = padding.

    var offset = _matrixUtil.vec2.scale([0, 0], unitNormal(p0, p1), padding);

    segments[segmentIndex] = [_matrixUtil.vec2.add([0, 0], p0, offset), _matrixUtil.vec2.add([0, 0], p1, offset)];
  }

  var arcData = "A " + [padding, padding, '0,0,0,'].join(',');
  segments = segments.map(function (segment, index) {
    var pathFragment = '';

    if (index === 0) {
      pathFragment = "M " + segments[segments.length - 1][1] + " ";
    }

    pathFragment += arcData + segment[0] + " L " + segment[1];
    return pathFragment;
  });
  return segments.join(' ');
}
/**
 * 传入的节点作为多边形顶点，生成平滑的闭合多边形
 * @param polyPoints
 * @param padding
 */


function paddedHull(polyPoints, padding) {
  var pointCount = polyPoints.length;

  var smoothHull1 = function smoothHull1(points) {
    // Returns the path for a circular hull around a single point.
    var p1 = [points[0][0], points[0][1] - padding];
    var p2 = [points[0][0], points[0][1] + padding];
    return "M " + p1 + " A " + [padding, padding, '0,0,0', p2].join(',') + " A " + [padding, padding, '0,0,0', p1].join(',');
  }; // Returns the path for a rounded hull around two points.


  var smoothHull2 = function smoothHull2(points) {
    var v = vecFrom(points[0], points[1]);
    var extensionVec = vecScaleTo(v, padding);

    var extension0 = _matrixUtil.vec2.add([0, 0], points[0], _matrixUtil.vec2.scale([0, 0], extensionVec, -1));

    var extension1 = _matrixUtil.vec2.add([0, 0], points[1], extensionVec);

    var tangentHalfLength = 1.2 * padding;
    var controlDelta = vecScaleTo(_matrixUtil.vec2.normalize([0, 0], v), tangentHalfLength);

    var invControlDelta = _matrixUtil.vec2.scale([0, 0], controlDelta, -1);

    var control0 = _matrixUtil.vec2.add([0, 0], extension0, invControlDelta);

    var control1 = _matrixUtil.vec2.add([0, 0], extension1, invControlDelta);

    var control3 = _matrixUtil.vec2.add([0, 0], extension0, controlDelta); // return [
    //   ['M', extension0[0], extension0[1]],
    //   ['C', control0, control1, extension1],
    //   ['S', control3, extension0],
    //   'Z',
    // ];


    return "M " + extension0 + " C " + [control0, control1, extension1].join(',') + " S " + [control3, extension0].join(',') + " Z";
  }; // Handle special cases


  if (!polyPoints || pointCount < 1) return '';
  if (pointCount === 1) return smoothHull1(polyPoints);
  if (pointCount === 2) return smoothHull2(polyPoints);
  var hullPoints = polyPoints.map(function (point, index) {
    var pNext = polyPoints[(index + 1) % pointCount];
    return {
      p: point,
      v: _matrixUtil.vec2.normalize([0, 0], vecFrom(point, pNext))
    };
  }); // Compute the expanded hull points, and the nearest prior control point for each.

  for (var i = 0; i < hullPoints.length; ++i) {
    var priorIndex = i > 0 ? i - 1 : pointCount - 1;

    var extensionVec = _matrixUtil.vec2.normalize([0, 0], _matrixUtil.vec2.add([0, 0], hullPoints[priorIndex].v, _matrixUtil.vec2.scale([0, 0], hullPoints[i].v, -1)));

    hullPoints[i].p = _matrixUtil.vec2.add([0, 0], hullPoints[i].p, _matrixUtil.vec2.scale([0, 0], extensionVec, padding));
  }

  return hullPoints.map(function (obj) {
    var point = obj.p;
    return {
      x: point[0],
      y: point[1]
    };
  });
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765347, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genConvexHull = exports.cross = void 0;

/**
 * Use cross product to judge the direction of the turn.
 * Returns a positive value, if OAB makes a clockwise turn,
 * negative for counter-clockwise turn, and zero if the points are collinear.
 */
var cross = function cross(a, b, o) {
  return (a.y - o.y) * (b.x - o.x) - (a.x - o.x) * (b.y - o.y);
};
/**
 * Generate a convex hull of given points. Andrew's monotone chain algorithm.
 * @param points An array of [x, y] representing the coordinates of points.
 * @return a list of vertices of the convex hull in counter-clockwise order,
 */


exports.cross = cross;

var genConvexHull = function genConvexHull(items) {
  var points = items.map(function (item) {
    return {
      x: item.getModel().x,
      y: item.getModel().y
    };
  });
  points.sort(function (a, b) {
    return a.x === b.x ? a.y - b.y : a.x - b.x;
  });

  if (points.length === 1) {
    return points;
  } // build the lower hull


  var lower = [];

  for (var i = 0; i < points.length; i++) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
      lower.pop();
    }

    lower.push(points[i]);
  } // build the upper hull


  var upper = [];

  for (var i = points.length - 1; i >= 0; i--) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
      upper.pop();
    }

    upper.push(points[i]);
  }

  upper.pop();
  lower.pop();
  var strictHull = lower.concat(upper);
  return strictHull;
};

exports.genConvexHull = genConvexHull;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765348, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genBubbleSet = void 0;

var _math = require("../../util/math");

var defaultOps = {
  maxRoutingIterations: 100,
  maxMarchingIterations: 100,
  pixelGroupSize: 2,
  edgeR0: 10,
  edgeR1: 10,
  nodeR0: 5,
  nodeR1: 10,
  morphBuffer: 5,
  threshold: 0.001,
  skip: 16,
  nodeInfluenceFactor: 1,
  edgeInfluenceFactor: 1,
  negativeNodeInfluenceFactor: -0.5
};
/**
 * Marching square algorithm for traching the contour of a pixel group
 * https://www.emanueleferonato.com/2013/03/01/using-marching-squares-algorithm-to-trace-the-contour-of-an-image/
 * @param potentialArea
 * @param threshold
 */

function MarchingSquares(contour, potentialArea, threshold) {
  var marched = false;

  var getVal = function getVal(x, y) {
    return potentialArea.cells[x + y * potentialArea.width];
  };

  var getState = function getState(x, y) {
    var squareVal = 0;

    if (getVal(x - 1, y - 1) >= threshold) {
      squareVal += 1;
    }

    if (getVal(x, y - 1) > threshold) {
      squareVal += 2;
    }

    if (getVal(x - 1, y) > threshold) {
      squareVal += 4;
    }

    if (getVal(x, y) > threshold) {
      squareVal += 8;
    }

    return squareVal;
  };

  var doMarch = function doMarch(xPos, yPos) {
    var x = xPos;
    var y = yPos;
    var prevX;
    var prevY;

    for (var i = 0; i < potentialArea.width * potentialArea.height; i++) {
      prevX = x;
      prevY = y;

      if (contour.findIndex(function (item) {
        return item.x === x && item.y === y;
      }) > -1) {
        if (contour[0].x !== x || contour[0].y !== y) {// encountered a loop but haven't returned to start: change direction using conditionals and continue back to start
        } else {
          return true;
        }
      } else {
        contour.push({
          x: x,
          y: y
        });
      }

      var state = getState(x, y); // assign the move direction according to state of the square

      switch (state) {
        case -1:
          console.warn('Marched out of bounds');
          return true;

        case 0:
        case 3:
        case 2:
        case 7:
          x++; // go right

          break;

        case 12:
        case 14:
        case 4:
          x--; // go left

          break;

        case 6:
          // go left if come from up else go right
          if (prevX === 0) {
            if (prevY === -1) {
              x -= 1;
            } else {
              x += 1;
            }
          }

          break;

        case 1:
        case 13:
        case 5:
          y--; // go up

          break;

        case 9:
          // go up if come from right else go down
          if (prevX === 1) {
            if (prevY === 0) {
              y -= 1;
            } else {
              y += 1;
            }
          }

          break;

        case 10:
        case 8:
        case 11:
          y++; // go down

          break;

        default:
          console.warn("Marching squares invalid state: " + state);
          return true;
      }
    }
  };

  this.march = function () {
    for (var x = 0; x < potentialArea.width && !marched; x += 1) {
      for (var y = 0; y < potentialArea.height && !marched; y += 1) {
        if (getVal(x, y) > threshold && getState(x, y) !== 15) {
          marched = doMarch(x, y);
        }
      }
    }

    return marched;
  };
}
/**
 * Space partition & assign value to each cell
 * @param points
 */


var initGridCells = function initGridCells(width, height, pixelGroupSize) {
  var scaleWidth = Math.ceil(width / pixelGroupSize);
  var scaleHeight = Math.ceil(height / pixelGroupSize);
  var gridCells = new Float32Array(Math.max(0, scaleWidth * scaleHeight)).fill(0);
  return {
    cells: gridCells,
    width: scaleWidth,
    height: scaleHeight
  };
};
/**
 * Find the optimal already visited member to item;
   Optimal: minimize cost(j) = distance(i,j) ∗ countObstacles(i,j)
 * @param item
 * @param visited
 */


var pickBestNeighbor = function pickBestNeighbor(item, visited, nonMembers) {
  var closestNeighbour = null;
  var minCost = Number.POSITIVE_INFINITY;
  visited.forEach(function (neighbourItem) {
    var itemP = {
      x: item.getModel().x,
      y: item.getModel().y
    };
    var neighbourItemP = {
      x: neighbourItem.getModel().x,
      y: neighbourItem.getModel().y
    };
    var dist = (0, _math.squareDist)(itemP, neighbourItemP);
    var directLine = new _math.Line(itemP.x, itemP.y, neighbourItemP.x, neighbourItemP.y);
    var numberObstacles = nonMembers.reduce(function (count, _item) {
      if ((0, _math.fractionToLine)(_item, directLine) > 0) {
        return count + 1;
      }

      return count;
    }, 0);

    if (dist * Math.pow(numberObstacles + 1, 2) < minCost) {
      closestNeighbour = neighbourItem;
      minCost = dist * Math.pow(numberObstacles + 1, 2);
    }
  });
  return closestNeighbour;
};
/**
 * 返回和线相交的item中，离边的起点最近的item
 * @param items
 * @param line
 */


var getIntersectItem = function getIntersectItem(items, line) {
  var minDistance = Number.POSITIVE_INFINITY;
  var closestItem = null;
  items.forEach(function (item) {
    var distance = (0, _math.fractionToLine)(item, line); // find closest intersection

    if (distance >= 0 && distance < minDistance) {
      closestItem = item;
      minDistance = distance;
    }
  });
  return closestItem;
};
/**
 * Modify the directLine and Route virtual edges around obstacles
 */


var computeRoute = function computeRoute(directLine, nonMembers, maxRoutingIterations, morphBuffer) {
  var checkedLines = [];
  var linesToCheck = [];
  linesToCheck.push(directLine);
  var hasIntersection = true;
  var iterations = 0;

  var pointExists = function pointExists(point, lines) {
    var flag = false;
    lines.forEach(function (line) {
      if (flag) return;

      if ((0, _math.isPointsOverlap)(point, {
        x: line.x1,
        y: line.y1
      }) || (0, _math.isPointsOverlap)(point, {
        x: line.x2,
        y: line.y2
      })) {
        flag = true;
      }
    });
    return flag;
  };

  var isPointInNonMembers = function isPointInNonMembers(point, _nonMembers) {
    for (var _i = 0, _nonMembers_1 = _nonMembers; _i < _nonMembers_1.length; _i++) {
      var item = _nonMembers_1[_i];
      var bbox = item.getBBox();
      var itemContour = [[bbox.x, bbox.y], [bbox.x + bbox.width, bbox.y], [bbox.x, bbox.y + bbox.height], [bbox.x + bbox.width, bbox.y + bbox.height]];

      if ((0, _math.isPointInPolygon)(itemContour, point.x, point.y)) {
        return true;
      }
    }

    return false;
  }; // outer loop end when no more intersections or out of iterations


  while (hasIntersection && iterations < maxRoutingIterations) {
    hasIntersection = false;

    var _loop_1 = function _loop_1() {
      var line = linesToCheck.pop();
      var closestItem = getIntersectItem(nonMembers, line);

      if (closestItem) {
        var _a = (0, _math.itemIntersectByLine)(closestItem, line),
            intersections_1 = _a[0],
            countIntersections = _a[1]; // if line passes through item


        if (countIntersections === 2) {
          var testReroute = function testReroute(isFirst) {
            var tempMorphBuffer = morphBuffer;
            var virtualNode = rerouteLine(closestItem, tempMorphBuffer, intersections_1, isFirst); // test the virtualNode already exists

            var exist = pointExists(virtualNode, linesToCheck) || pointExists(virtualNode, checkedLines);
            var pointInside = isPointInNonMembers(virtualNode, nonMembers);

            while (!exist && pointInside && tempMorphBuffer >= 1) {
              // try a smaller buffer
              tempMorphBuffer /= 1.5;
              virtualNode = rerouteLine(closestItem, tempMorphBuffer, intersections_1, isFirst);
              exist = pointExists(virtualNode, linesToCheck) || pointExists(virtualNode, checkedLines);
              pointInside = isPointInNonMembers(virtualNode, nonMembers);
            } // 第二次route时不要求pointInside


            if (virtualNode && !exist && (!isFirst || !pointInside)) {
              // add 2 rerouted lines to check
              linesToCheck.push(new _math.Line(line.x1, line.y1, virtualNode.x, virtualNode.y));
              linesToCheck.push(new _math.Line(virtualNode.x, virtualNode.y, line.x2, line.y2));
              hasIntersection = true;
            }
          };

          testReroute(true);

          if (!hasIntersection) {
            // if we didn't find a valid point around the first corner, try the second
            testReroute(false);
          }
        }
      } // no intersection found, mark this line as completed


      if (!hasIntersection) {
        checkedLines.push(line);
      }

      iterations += 1;
    }; // inner loop end when out of lines or found an intersection


    while (!hasIntersection && linesToCheck.length) {
      _loop_1();
    }
  } // 加入剩余的线


  while (linesToCheck.length) {
    checkedLines.push(linesToCheck.pop());
  }

  return checkedLines;
};
/**
 *  Connect item with visited members using direct line or virtual edges
 */


function getRoute(item, nonMembers, visited, maxRoutingIterations, morphBuffer) {
  var optimalNeighbor = pickBestNeighbor(item, visited, nonMembers);

  if (optimalNeighbor === null) {
    return [];
  } //  merge the consecutive lines


  var mergeLines = function mergeLines(checkedLines) {
    var finalRoute = [];

    while (checkedLines.length > 0) {
      var line1 = checkedLines.pop();

      if (checkedLines.length === 0) {
        finalRoute.push(line1);
        break;
      }

      var line2 = checkedLines.pop();
      var mergeLine = new _math.Line(line1.x1, line1.y1, line2.x2, line2.y2);
      var closestItem = getIntersectItem(nonMembers, mergeLine); // merge most recent line and previous line

      if (!closestItem) {
        checkedLines.push(mergeLine);
      } else {
        finalRoute.push(line1);
        checkedLines.push(line2);
      }
    }

    return finalRoute;
  };

  var directLine = new _math.Line(item.getModel().x, item.getModel().y, optimalNeighbor.getModel().x, optimalNeighbor.getModel().y);
  var checkedLines = computeRoute(directLine, nonMembers, maxRoutingIterations, morphBuffer);
  var finalRoute = mergeLines(checkedLines);
  return finalRoute;
}
/**
 * Calculate the countor that includes the  selected items and exclues the non-selected items
 * @param graph
 * @param members
 * @param nonMembers
 * @param options
 */


var genBubbleSet = function genBubbleSet(members, nonMembers, ops) {
  // eslint-disable-next-line no-redeclare
  var options = Object.assign(defaultOps, ops);
  var centroid = (0, _math.getPointsCenter)(members.map(function (item) {
    return {
      x: item.getModel().x,
      y: item.getModel().y
    };
  })); // 按照到中心距离远近排序

  members = members.sort(function (a, b) {
    return (0, _math.squareDist)({
      x: a.getModel().x,
      y: a.getModel().y
    }, centroid) - (0, _math.squareDist)({
      x: b.getModel().x,
      y: b.getModel().y
    }, centroid);
  });
  var visited = [];
  var virtualEdges = [];
  members.forEach(function (item) {
    var lines = getRoute(item, nonMembers, visited, options.maxRoutingIterations, options.morphBuffer);
    lines.forEach(function (l) {
      virtualEdges.push(l);
    });
    visited.push(item);
  }); // 由于edge也可以作为member和nonMember传入，暂时不考虑把edges作为参数传入genBubbleSet
  // edges && edges.forEach(e => {
  //   virtualEdges.push(new Line(e.getSource().getModel().x, e.getSource().getModel().y, e.getTarget().getModel().x, e.getTarget().getModel().y));
  // });

  var activeRegion = getActiveRregion(members, virtualEdges, options.nodeR0);
  var potentialArea = initGridCells(activeRegion.width, activeRegion.height, options.pixelGroupSize); // Use march squares to generate contour

  var contour = [];
  var hull = [];

  for (var iterations = 0; iterations < options.maxMarchingIterations; iterations++) {
    fillPotentialArea(members, nonMembers, virtualEdges, activeRegion, potentialArea, options);
    contour = [];
    hull = [];
    if (!new MarchingSquares(contour, potentialArea, options.threshold).march()) continue;
    var marchedPath = contour.map(function (point) {
      return {
        x: Math.round(point.x * options.pixelGroupSize + activeRegion.minX),
        y: Math.round(point.y * options.pixelGroupSize + activeRegion.minY)
      };
    }); // const marchedPath = marchingSquares(potentialArea, options.threshold).map(point => ({ x: Math.round(point.x * options.pixelGroupSize + activeRegion.minX), y: Math.round(point.y * options.pixelGroupSize + activeRegion.minY) }))

    if (marchedPath) {
      var size = marchedPath.length;

      if (options.skip > 1) {
        size = Math.floor(marchedPath.length / options.skip); // if we reduced too much (fewer than three points in reduced surface) reduce skip and try again

        while (size < 3 && options.skip > 1) {
          options.skip -= 1;
          size = Math.floor(marchedPath.length / options.skip);
        }
      } // copy hull values


      for (var i = 0, j = 0; j < size; j += 1, i += options.skip) {
        hull.push({
          x: marchedPath[i].x,
          y: marchedPath[i].y
        });
      }
    }

    var isContourValid = function isContourValid() {
      for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
        var item = members_1[_i];
        var hullPoints = hull.map(function (point) {
          return [point.x, point.y];
        });
        if (!(0, _math.isPointInPolygon)(hullPoints, item.getBBox().centerX, item.getBBox().centerY)) return false;
      } // 不强制要求所有nonMembers都没有包含在内
      // for (const item of nonMembers) {
      //   if (isPointInPolygon({ x: item.getBBox().centerX, y: item.getBBox().centerY }, contour)) return false
      // }


      return true;
    };

    if (hull && isContourValid()) {
      return hull;
    } // update parameters for next iteraction


    options.threshold *= 0.9;

    if (iterations <= options.maxMarchingIterations * 0.5) {
      options.memberInfluenceFactor *= 1.2;
      options.edgeInfluenceFactor *= 1.2;
    } else if (options.nonMemberInfluenceFactor !== 0 && nonMembers.length > 0) {
      // after half the iterations, start increasing positive energy and lowering the threshold
      options.nonMemberInfluenceFactor *= 0.8;
    } else {
      break;
    }
  }

  return hull;
};
/**
 * unionboundingbox
 * @param members
 * @param edges
 */


exports.genBubbleSet = genBubbleSet;

function getActiveRregion(members, edges, offset) {
  var activeRegion = {
    minX: Number.POSITIVE_INFINITY,
    minY: Number.POSITIVE_INFINITY,
    maxX: Number.NEGATIVE_INFINITY,
    maxY: Number.NEGATIVE_INFINITY,
    width: 0,
    height: 0,
    x: 0,
    y: 0
  };
  var bboxes = [];
  members.forEach(function (item) {
    bboxes.push(item.getBBox());
  });
  edges.forEach(function (l) {
    bboxes.push(l.getBBox());
  });

  for (var _i = 0, bboxes_1 = bboxes; _i < bboxes_1.length; _i++) {
    var bbox = bboxes_1[_i];
    activeRegion.minX = (bbox.minX < activeRegion.minX ? bbox.minX : activeRegion.minX) - offset;
    activeRegion.minY = (bbox.minY < activeRegion.minY ? bbox.minY : activeRegion.minY) - offset;
    activeRegion.maxX = (bbox.maxX > activeRegion.maxX ? bbox.maxX : activeRegion.maxX) + offset;
    activeRegion.maxY = (bbox.maxY > activeRegion.maxY ? bbox.maxY : activeRegion.maxY) + offset;
  }

  activeRegion.width = activeRegion.maxX - activeRegion.minX;
  activeRegion.height = activeRegion.maxY - activeRegion.minY;
  activeRegion.x = activeRegion.minX;
  activeRegion.y = activeRegion.minY;
  return activeRegion;
}

function fillPotentialArea(members, nonMembers, edges, activeRegion, potentialArea, options) {
  function pos2GridIx(x, offset) {
    var gridIx = Math.floor((x - offset) / options.pixelGroupSize);
    return gridIx < 0 ? 0 : gridIx;
  }

  function gridIx2Pos(x, offset) {
    return x * options.pixelGroupSize + offset;
  } // using inverse a for numerical stability


  var nodeInfA = (options.nodeR0 - options.nodeR1) * (options.nodeR0 - options.nodeR1);
  var edgeInfA = (options.edgeR0 - options.edgeR1) * (options.edgeR0 - options.edgeR1);

  var getAffectedRegion = function getAffectedRegion(bbox, thresholdR) {
    var startX = Math.min(pos2GridIx(bbox.minX, thresholdR + activeRegion.minX), potentialArea.width);
    var startY = Math.min(pos2GridIx(bbox.minY, thresholdR + activeRegion.minY), potentialArea.height);
    var endX = Math.min(pos2GridIx(bbox.maxX, -thresholdR + activeRegion.minX), potentialArea.width);
    var endY = Math.min(pos2GridIx(bbox.maxY, -thresholdR + activeRegion.minY), potentialArea.height);
    return [startX, startY, endX, endY];
  };

  var addItemInfluence = function addItemInfluence(item, influenceFactor) {
    var bbox = item.getBBox();

    var _a = getAffectedRegion(bbox, options.nodeR1),
        startX = _a[0],
        startY = _a[1],
        endX = _a[2],
        endY = _a[3]; // calculate item influence for each cell


    for (var y = startY; y < endY; y += 1) {
      for (var x = startX; x < endX; x += 1) {
        if (influenceFactor < 0 && potentialArea[x + y * potentialArea.width] <= 0) {
          continue;
        }

        var tempX = gridIx2Pos(x, activeRegion.minX);
        var tempY = gridIx2Pos(y, activeRegion.minY);
        var distanceSq = (0, _math.pointRectSquareDist)({
          x: tempX,
          y: tempY
        }, {
          x: bbox.minX,
          y: bbox.minY,
          width: bbox.width,
          height: bbox.height
        });

        if (distanceSq < Math.pow(options.nodeR1, 2)) {
          var dr = Math.sqrt(distanceSq) - options.nodeR1;
          potentialArea.cells[x + y * potentialArea.width] += influenceFactor * dr * dr;
        }
      }
    }
  };

  var addEdgeInfluence = function addEdgeInfluence(line, influenceFactor) {
    var bbox = line.getBBox();

    var _a = getAffectedRegion(bbox, options.edgeR1),
        startX = _a[0],
        startY = _a[1],
        endX = _a[2],
        endY = _a[3]; // for every point in active part of potentialArea, calculate distance to nearest point on line and add influence


    for (var y = startY; y < endY; y += 1) {
      for (var x = startX; x < endX; x += 1) {
        if (influenceFactor < 0 && potentialArea.cells[x + y * potentialArea.width] <= 0) {
          continue;
        }

        var tempX = gridIx2Pos(x, activeRegion.minX);
        var tempY = gridIx2Pos(y, activeRegion.minY);
        var minDistanceSq = (0, _math.pointLineSquareDist)({
          x: tempX,
          y: tempY
        }, line); // only influence if less than r1

        if (minDistanceSq < Math.pow(options.edgeR1, 2)) {
          var mdr = Math.sqrt(minDistanceSq) - options.edgeR1;
          potentialArea.cells[x + y * potentialArea.width] += influenceFactor * mdr * mdr;
        }
      }
    }
  };

  if (options.nodeInfluenceFactor) {
    members.forEach(function (item) {
      addItemInfluence(item, options.nodeInfluenceFactor / nodeInfA);
    });
  }

  if (options.edgeInfluenceFactor) {
    edges.forEach(function (edge) {
      addEdgeInfluence(edge, options.edgeInfluenceFactor / edgeInfA);
    });
  }

  if (options.negativeNodeInfluenceFactor) {
    nonMembers.forEach(function (item) {
      addItemInfluence(item, options.negativeNodeInfluenceFactor / nodeInfA);
    });
  }
}

function rerouteLine(item, buffer, intersections, wrapNormal) {
  var bbox = item.getBBox();
  var topIntersect = intersections[0],
      leftIntersect = intersections[1],
      bottomIntersect = intersections[2],
      rightIntersect = intersections[3];
  var cornerPos = {
    topLeft: {
      x: bbox.minX - buffer,
      y: bbox.minY - buffer
    },
    topRight: {
      x: bbox.maxX + buffer,
      y: bbox.minY - buffer
    },
    bottomLeft: {
      x: bbox.minX - buffer,
      y: bbox.maxY + buffer
    },
    bottomRight: {
      x: bbox.maxX + buffer,
      y: bbox.maxY + buffer
    }
  };
  var totalArea = bbox.height * bbox.width;

  function calcHalfArea(intersect1, intersect2) {
    return bbox.width * ((intersect1.y - bbox.minY + (intersect2.y - bbox.minY)) * 0.5);
  } // 根据线和boundingbox相交的情况，确定control point的位置


  if (leftIntersect) {
    // 相交区域有三角形
    if (topIntersect) return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
    if (bottomIntersect) return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight; // 相交区域分成上下两个梯形，比较面积

    var topArea = calcHalfArea(leftIntersect, rightIntersect);

    if (topArea < totalArea * 0.5) {
      if (leftIntersect.y > rightIntersect.y) return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
      return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
    }

    if (leftIntersect.y < rightIntersect.y) return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight;
    return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
  }

  if (rightIntersect) {
    if (topIntersect) return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
    if (bottomIntersect) return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
  } // 相交区域分成左右两个梯形


  var leftArea = calcHalfArea(topIntersect, bottomIntersect);

  if (leftArea < totalArea * 0.5) {
    if (topIntersect.x > bottomIntersect.x) return wrapNormal ? cornerPos.topLeft : cornerPos.bottomRight;
    return wrapNormal ? cornerPos.bottomLeft : cornerPos.topRight;
  }

  if (topIntersect.x < bottomIntersect.x) return wrapNormal ? cornerPos.topRight : cornerPos.bottomLeft;
  return wrapNormal ? cornerPos.bottomRight : cornerPos.topLeft;
}
}, function(modId) { var map = {"../../util/math":1685504765327}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765349, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Arrow", {
  enumerable: true,
  get: function get() {
    return _arrow.default;
  }
});
Object.defineProperty(exports, "Marker", {
  enumerable: true,
  get: function get() {
    return _marker.default;
  }
});
exports.default = void 0;

var _shape = _interopRequireDefault(require("./shape"));

require("./node");

require("./edge");

require("./combo");

require("./combos");

require("./nodes");

var _arrow = _interopRequireDefault(require("./arrow"));

var _marker = _interopRequireDefault(require("./marker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _shape.default;
exports.default = _default;
}, function(modId) { var map = {"./shape":1685504765340,"./node":1685504765350,"./edge":1685504765352,"./combo":1685504765353,"./combos":1685504765354,"./nodes":1685504765357,"./arrow":1685504765361,"./marker":1685504765362}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765350, function(require, module, exports) {


var _tslib = require("tslib");

var _util = require("@antv/util");

var _base = require("../util/base");

var _global = _interopRequireDefault(require("../global"));

var _shape = _interopRequireDefault(require("./shape"));

var _shapeBase = require("./shapeBase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var singleNode = {
  itemType: 'node',
  // 单个图形的类型
  shapeType: 'single-node',

  /**
   * 文本相对图形的位置，默认以中心点
   * 位置包括： top, bottom, left, right, center
   * @type {String}
   */
  labelPosition: 'center',

  /**
   * 文本相对偏移，当 labelPosition 不为 center 时有效
   * @type {Number}
   */
  offset: _global.default.nodeLabel.offset,

  /**
   * 获取节点宽高
   * @internal 返回节点的大小，以 [width, height] 的方式维护
   * @param  {Object} cfg 节点的配置项
   * @return {Array} 宽高
   */
  getSize: function getSize(cfg) {
    var size = cfg.size || this.getOptions({}).size || _global.default.defaultNode.size; // size 是数组，但长度为1，则补长度为2


    if ((0, _util.isArray)(size) && size.length === 1) {
      size = [size[0], size[0]];
    } // size 为数字，则转换为数组


    if (!(0, _util.isArray)(size)) {
      size = [size, size];
    }

    return size;
  },
  // 私有方法，不希望扩展的节点复写这个方法
  getLabelStyleByPosition: function getLabelStyleByPosition(cfg, labelCfg) {
    var labelPosition = labelCfg.position || this.labelPosition; // 默认的位置（最可能的情形），所以放在最上面

    if (labelPosition === 'center') {
      return {
        x: 0,
        y: 0,
        text: cfg.label
      };
    }

    var offset = labelCfg.offset;

    if ((0, _util.isNil)(offset)) {
      // 考虑 offset = 0 的场景，不用用 labelCfg.offset || Global.nodeLabel.offset
      offset = this.offset; // 不居中时的偏移量
    }

    var size = this.getSize(cfg);
    var width = size[0];
    var height = size[1];
    var style;

    switch (labelPosition) {
      case 'top':
        style = {
          x: 0,
          y: 0 - height / 2 - offset,
          textBaseline: 'bottom' // 文本在图形的上面

        };
        break;

      case 'bottom':
        style = {
          x: 0,
          y: height / 2 + offset,
          textBaseline: 'top'
        };
        break;

      case 'left':
        style = {
          x: 0 - width / 2 - offset,
          y: 0,
          textAlign: 'right'
        };
        break;

      default:
        style = {
          x: width / 2 + offset,
          y: 0,
          textAlign: 'left'
        };
        break;
    }

    style.text = cfg.label;
    return style;
  },
  getLabelBgStyleByPosition: function getLabelBgStyleByPosition(label, cfg, labelCfg, group) {
    if (!label) {
      return {};
    }

    var bbox = label.getBBox();
    var backgroundStyle = labelCfg.style && labelCfg.style.background;

    if (!backgroundStyle) {
      return {};
    }

    var padding = (0, _base.formatPadding)(backgroundStyle.padding);
    var backgroundWidth = bbox.width + padding[1] + padding[3];
    var backgroundHeight = bbox.height + padding[0] + padding[2];
    var offset = labelCfg.offset;

    if ((0, _util.isNil)(offset)) {
      // 考虑 offset = 0 的场景，不用用 labelCfg.offset || Global.nodeLabel.offset
      offset = this.offset; // 不居中时的偏移量
    }

    var style;
    style = {
      x: bbox.minX - padding[3],
      y: bbox.minY - padding[0]
    };
    style = (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, style), backgroundStyle), {
      width: backgroundWidth,
      height: backgroundHeight
    });
    return style;
  },
  drawShape: function drawShape(cfg, group) {
    var shapeType = this.shapeType; // || this.type，都已经加了 shapeType

    var style = this.getShapeStyle(cfg);
    var shape = group.addShape(shapeType, {
      attrs: style,
      draggable: true,
      name: 'node-shape'
    });
    return shape;
  },

  /**
   * 更新linkPoints
   * @param {Object} cfg 节点数据配置项
   * @param {Group} group Item所在的group
   */
  updateLinkPoints: function updateLinkPoints(cfg, group) {
    var defaultLinkPoints = this.getOptions(cfg).linkPoints;
    var markLeft = group.find(function (element) {
      return element.get('className') === 'link-point-left';
    });
    var markRight = group.find(function (element) {
      return element.get('className') === 'link-point-right';
    });
    var markTop = group.find(function (element) {
      return element.get('className') === 'link-point-top';
    });
    var markBottom = group.find(function (element) {
      return element.get('className') === 'link-point-bottom';
    });
    var currentLinkPoints;

    if (markLeft) {
      currentLinkPoints = markLeft.attr();
    }

    if (markRight && !currentLinkPoints) {
      currentLinkPoints = markRight.attr();
    }

    if (markTop && !currentLinkPoints) {
      currentLinkPoints = markTop.attr();
    }

    if (markBottom && !currentLinkPoints) {
      currentLinkPoints = markBottom.attr();
    }

    if (!currentLinkPoints) currentLinkPoints = defaultLinkPoints;
    var linkPoints = (0, _util.mix)({}, currentLinkPoints, cfg.linkPoints);
    var markFill = linkPoints.fill,
        markStroke = linkPoints.stroke,
        borderWidth = linkPoints.lineWidth;
    var markSize = linkPoints.size / 2;
    if (!markSize) markSize = linkPoints.r;

    var _a = cfg.linkPoints ? cfg.linkPoints : {
      left: undefined,
      right: undefined,
      top: undefined,
      bottom: undefined
    },
        left = _a.left,
        right = _a.right,
        top = _a.top,
        bottom = _a.bottom;

    var size = this.getSize(cfg);
    var width = size[0];
    var height = size[1];
    var styles = {
      r: markSize,
      fill: markFill,
      stroke: markStroke,
      lineWidth: borderWidth
    };

    if (markLeft) {
      if (!left && left !== undefined) {
        markLeft.remove();
      } else {
        markLeft.attr((0, _tslib.__assign)((0, _tslib.__assign)({}, styles), {
          x: -width / 2,
          y: 0
        }));
      }
    } else if (left) {
      group.addShape('circle', {
        attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, styles), {
          x: -width / 2,
          y: 0
        }),
        className: 'link-point-left',
        name: 'link-point-left',
        isAnchorPoint: true
      });
    }

    if (markRight) {
      if (!right && right !== undefined) {
        markRight.remove();
      }

      markRight.attr((0, _tslib.__assign)((0, _tslib.__assign)({}, styles), {
        x: width / 2,
        y: 0
      }));
    } else if (right) {
      group.addShape('circle', {
        attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, styles), {
          x: width / 2,
          y: 0
        }),
        className: 'link-point-right',
        name: 'link-point-right',
        isAnchorPoint: true
      });
    }

    if (markTop) {
      if (!top && top !== undefined) {
        markTop.remove();
      }

      markTop.attr((0, _tslib.__assign)((0, _tslib.__assign)({}, styles), {
        x: 0,
        y: -height / 2
      }));
    } else if (top) {
      group.addShape('circle', {
        attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, styles), {
          x: 0,
          y: -height / 2
        }),
        className: 'link-point-top',
        name: 'link-point-top',
        isAnchorPoint: true
      });
    }

    if (markBottom) {
      if (!bottom && bottom !== undefined) {
        markBottom.remove();
      } else {
        markBottom.attr((0, _tslib.__assign)((0, _tslib.__assign)({}, styles), {
          x: 0,
          y: height / 2
        }));
      }
    } else if (bottom) {
      group.addShape('circle', {
        attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, styles), {
          x: 0,
          y: height / 2
        }),
        className: 'link-point-bottom',
        name: 'link-point-bottom',
        isAnchorPoint: true
      });
    }
  },
  updateShape: function updateShape(cfg, item, keyShapeStyle, hasIcon) {
    var keyShape = item.get('keyShape');
    keyShape.attr((0, _tslib.__assign)({}, keyShapeStyle));
    this.updateLabel(cfg, item); // special for some types of nodes

    if (hasIcon) {
      this.updateIcon(cfg, item);
    }
  },
  updateIcon: function updateIcon(cfg, item) {
    var _this = this;

    var group = item.getContainer();
    var icon = this.getOptions(cfg).icon;
    var show = (cfg.icon ? cfg.icon : {
      show: undefined
    }).show;
    var iconShape = group.find(function (element) {
      return element.get('className') === _this.type + "-icon";
    });

    if (iconShape) {
      // 若原先存在 icon
      if (show || show === undefined) {
        // 若传入 show: true, 或没有设置，则更新原有的 icon 样式
        var iconConfig = (0, _util.mix)({}, iconShape.attr(), icon);
        var w = iconConfig.width,
            h = iconConfig.height;
        iconShape.attr((0, _tslib.__assign)((0, _tslib.__assign)({}, iconConfig), {
          x: -w / 2,
          y: -h / 2
        }));
      } else {
        // 若传入了 show: false 则删除原先的 icon
        iconShape.remove();
      }
    } else if (show) {
      // 如果原先不存在 icon，但传入了 show: true，则新增 icon
      var w = icon.width,
          h = icon.height;
      group.addShape('image', {
        attrs: (0, _tslib.__assign)((0, _tslib.__assign)({}, icon), {
          x: -w / 2,
          y: -h / 2
        }),
        className: this.type + "-icon",
        name: this.type + "-icon"
      }); // to ensure the label is on the top of all the shapes

      var labelShape = group.find(function (element) {
        return element.get('className') === "node-label";
      });

      if (labelShape) {
        labelShape.toFront();
      }
    }
  }
};
var singleNodeDef = (0, _tslib.__assign)((0, _tslib.__assign)({}, _shapeBase.shapeBase), singleNode);

_shape.default.registerNode('single-node', singleNodeDef);
}, function(modId) { var map = {"../util/base":1685504765335,"../global":1685504765330,"./shape":1685504765340,"./shapeBase":1685504765351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765351, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shapeBase = exports.CLS_LABEL_BG_SUFFIX = void 0;

var _tslib = require("tslib");

var _global = _interopRequireDefault(require("../global"));

var _matrixUtil = require("@antv/matrix-util");

var _util = require("@antv/util");

var _graphic = require("../util/graphic");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var transform = _matrixUtil.ext.transform;
var CLS_SHAPE_SUFFIX = '-shape';
var CLS_LABEL_SUFFIX = '-label';
var ARROWS = ['startArrow', 'endArrow'];
var SHAPE_DEFAULT_ATTRS = {
  lineWidth: 1,
  stroke: undefined,
  fill: undefined,
  lineAppendWidth: 1,
  opacity: undefined,
  strokeOpacity: undefined,
  fillOpacity: undefined,
  x: 0,
  y: 0,
  r: 10,
  width: 20,
  height: 20,
  shadowColor: undefined,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0
};
var PATH_SHAPE_DEFAULT_ATTRS = {
  lineWidth: 1,
  stroke: '#000',
  lineDash: undefined,
  startArrow: false,
  endArrow: false,
  opacity: undefined,
  strokeOpacity: undefined,
  fillOpacity: undefined,
  shadowColor: undefined,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0
};
var SHAPES_DEFAULT_ATTRS = {
  edge: PATH_SHAPE_DEFAULT_ATTRS,
  node: SHAPE_DEFAULT_ATTRS,
  combo: SHAPE_DEFAULT_ATTRS
};
var CLS_LABEL_BG_SUFFIX = '-label-bg'; // 单个 shape 带有一个 label，共用这段代码

exports.CLS_LABEL_BG_SUFFIX = CLS_LABEL_BG_SUFFIX;
var shapeBase = {
  // 默认样式及配置
  options: {},
  itemType: '',

  /**
   * 形状的类型，例如 circle，ellipse，polyline...
   */
  type: '',
  getCustomConfig: function getCustomConfig(cfg) {
    return {};
  },
  getOptions: function getOptions(cfg) {
    return (0, _util.deepMix)({
      // 解决局部渲染导致的文字移动残影问题
      labelCfg: {
        style: {
          fontFamily: typeof window !== 'undefined' && window.getComputedStyle ? window.getComputedStyle(document.body, null).getPropertyValue('font-family') || 'Arial, sans-serif' : 'Arial, sans-serif'
        }
      },
      descriptionCfg: {
        style: {
          fontFamily: typeof window !== 'undefined' && window.getComputedStyle ? window.getComputedStyle(document.body, null).getPropertyValue('font-family') || 'Arial, sans-serif' : 'Arial, sans-serif'
        }
      }
    }, this.options, this.getCustomConfig(cfg) || {}, cfg);
  },

  /**
   * 绘制节点/边，包含文本
   * @override
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 节点的容器
   * @return {IShape} 绘制的图形
   */
  draw: function draw(cfg, group) {
    var shape = this.drawShape(cfg, group);
    shape.set('className', this.itemType + CLS_SHAPE_SUFFIX);

    if (cfg.label) {
      var label = this.drawLabel(cfg, group);
      label.set('className', this.itemType + CLS_LABEL_SUFFIX);
    }

    return shape;
  },

  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   * @param cfg
   * @param group
   * @param keyShape
   */
  afterDraw: function afterDraw(cfg, group, keyShape) {},
  drawShape: function drawShape(cfg, group) {
    return null;
  },
  drawLabel: function drawLabel(cfg, group) {
    var defaultLabelCfg = this.getOptions(cfg).labelCfg; // image的情况下有可能为null

    var labelCfg = defaultLabelCfg || {};
    var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    var rotate = labelStyle.rotate;
    delete labelStyle.rotate;
    var label = group.addShape('text', {
      attrs: labelStyle,
      draggable: true,
      className: 'text-shape',
      name: 'text-shape'
    });

    if (rotate) {
      var labelBBox = label.getBBox();
      var labelMatrix = label.getMatrix();

      if (!labelMatrix) {
        labelMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      }

      if (labelStyle.rotateCenter) {
        switch (labelStyle.rotateCenter) {
          case 'center':
            labelMatrix = transform(labelMatrix, [['t', -labelBBox.width / 2, -labelBBox.height / 2], ['r', rotate], ['t', labelBBox.width / 2, labelBBox.height / 2]]);
            break;

          case 'lefttop':
            labelMatrix = transform(labelMatrix, [['t', -labelStyle.x, -labelStyle.y], ['r', rotate], ['t', labelStyle.x, labelStyle.y]]);
            break;

          case 'leftcenter':
            labelMatrix = transform(labelMatrix, [['t', -labelStyle.x, -labelStyle.y - labelBBox.height / 2], ['r', rotate], ['t', labelStyle.x, labelStyle.y + labelBBox.height / 2]]);
            break;

          default:
            labelMatrix = transform(labelMatrix, [['t', -labelBBox.width / 2, -labelBBox.height / 2], ['r', rotate], ['t', labelBBox.width / 2, labelBBox.height / 2]]);
            break;
        }
      } else {
        labelMatrix = transform(labelMatrix, [['t', -labelStyle.x, -labelStyle.y - labelBBox.height / 2], ['r', rotate], ['t', labelStyle.x, labelStyle.y + labelBBox.height / 2]]);
      }

      label.setMatrix(labelMatrix);
    }

    if (labelStyle.background) {
      var rect = this.drawLabelBg(cfg, group, label);
      var labelBgClassname = this.itemType + CLS_LABEL_BG_SUFFIX;
      rect.set('classname', labelBgClassname);
      label.toFront();
    }

    return label;
  },
  drawLabelBg: function drawLabelBg(cfg, group, label) {
    var defaultLabelCfg = this.options.labelCfg;
    var labelCfg = (0, _util.mix)({}, defaultLabelCfg, cfg.labelCfg);
    var style = this.getLabelBgStyleByPosition(label, cfg, labelCfg, group);
    var rect = group.addShape('rect', {
      name: 'text-bg-shape',
      attrs: style
    });
    return rect;
  },
  getLabelStyleByPosition: function getLabelStyleByPosition(cfg, labelCfg, group) {
    return {
      text: cfg.label
    };
  },
  getLabelBgStyleByPosition: function getLabelBgStyleByPosition(label, cfg, labelCfg, group) {
    return {};
  },

  /**
   * 获取文本的配置项
   * @param cfg 节点的配置项
   * @param labelCfg 文本的配置项
   * @param group 父容器，label 的定位可能与图形相关
   */
  getLabelStyle: function getLabelStyle(cfg, labelCfg, group) {
    var calculateStyle = this.getLabelStyleByPosition(cfg, labelCfg, group);
    var attrName = this.itemType + "Label"; // 取 nodeLabel，edgeLabel 的配置项

    var defaultStyle = _global.default[attrName] ? _global.default[attrName].style : null;
    var labelStyle = (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, defaultStyle), calculateStyle), labelCfg.style);
    return labelStyle;
  },

  /**
   * 获取图形的配置项
   * @param cfg
   */
  getShapeStyle: function getShapeStyle(cfg) {
    return cfg.style;
  },

  /**
   * 更新节点，包含文本
   * @override
   * @param  {Object} cfg 节点/边的配置项
   * @param  {G6.Item} item 节点/边
   */
  update: function update(cfg, item) {
    this.updateShapeStyle(cfg, item);
    this.updateLabel(cfg, item);
  },
  updateShapeStyle: function updateShapeStyle(cfg, item) {
    var group = item.getContainer();
    var shape = item.getKeyShape();
    var shapeStyle = (0, _util.mix)({}, shape.attr(), cfg.style);

    var _loop_1 = function _loop_1(key) {
      var _a;

      var style = shapeStyle[key];

      if ((0, _util.isPlainObject)(style)) {
        // 更新图元素样式，支持更新子元素
        var subShape = group.find(function (element) {
          return element.get('name') === key;
        });

        if (subShape) {
          subShape.attr(style);
        }
      } else {
        shape.attr((_a = {}, _a[key] = style, _a));
      }
    };

    for (var key in shapeStyle) {
      _loop_1(key);
    }
  },
  updateLabel: function updateLabel(cfg, item) {
    var group = item.getContainer();
    var defaultLabelCfg = this.getOptions({}).labelCfg;
    var labelClassName = this.itemType + CLS_LABEL_SUFFIX;
    var label = group.find(function (element) {
      return element.get('className') === labelClassName;
    });
    var labelBgClassname = this.itemType + CLS_LABEL_BG_SUFFIX;
    var labelBg = group.find(function (element) {
      return element.get('classname') === labelBgClassname;
    }); // 防止 cfg.label = "" 的情况

    if (cfg.label || cfg.label === '') {
      // 若传入的新配置中有 label，（用户没传入但原先有 label，label 也会有值）
      if (!label) {
        // 若原先不存在 label，则绘制一个新的 label
        var newLabel = this.drawLabel(cfg, group);
        newLabel.set('className', labelClassName);
      } else {
        // 若原先存在 label，则更新样式。与 getLabelStyle 不同在于这里需要融合当前 label 的样式
        // 用于融合 style 以外的属性：position, offset, ...
        var currentLabelCfg = {};

        if (item.getModel) {
          currentLabelCfg = item.getModel().labelCfg;
        } // 这里不能去掉


        var labelCfg = (0, _util.deepMix)({}, defaultLabelCfg, currentLabelCfg, cfg.labelCfg); // 获取位置信息

        var calculateStyle = this.getLabelStyleByPosition(cfg, labelCfg, group); // 取 nodeLabel，edgeLabel 的配置项

        var cfgStyle = cfg.labelCfg ? cfg.labelCfg.style : undefined;
        var cfgBgStyle = labelCfg.style && labelCfg.style.background; // 需要融合当前 label 的样式 label.attr()。不再需要全局/默认样式，因为已经应用在当前的 label 上

        var labelStyle = (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, label.attr()), calculateStyle), cfgStyle);
        var rotate = labelStyle.rotate;
        delete labelStyle.rotate; // 计算 label 的旋转矩阵

        if (rotate) {
          // if G 4.x define the rotateAtStart, use it directly instead of using the following codes
          var rotateMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          rotateMatrix = transform(rotateMatrix, [['t', -labelStyle.x, -labelStyle.y], ['r', rotate], ['t', labelStyle.x, labelStyle.y]]);
          label.resetMatrix();
          label.attr((0, _tslib.__assign)((0, _tslib.__assign)({}, labelStyle), {
            matrix: rotateMatrix
          }));
        } else {
          label.resetMatrix();
          label.attr(labelStyle);
        }

        if (!labelBg) {
          if (labelStyle.background) {
            labelBg = this.drawLabelBg(cfg, group, label);
            labelBg.set('classname', labelBgClassname);
            label.toFront();
          }
        } else if (labelStyle.background) {
          var calculateBgStyle = this.getLabelBgStyleByPosition(label, cfg, labelCfg, group);
          var labelBgStyle = (0, _tslib.__assign)((0, _tslib.__assign)({}, calculateBgStyle), cfgBgStyle);
          labelBg.resetMatrix();

          if (rotate) {
            var bgRotateMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
            bgRotateMatrix = transform(bgRotateMatrix, [['t', -labelBgStyle.x, -labelBgStyle.y], ['r', rotate], ['t', labelBgStyle.x, labelBgStyle.y]]);
            labelBgStyle.matrix = bgRotateMatrix;
          }

          labelBg.attr(labelBgStyle);
        } else {
          group.removeChild(labelBg);
        }
      }
    }
  },
  // update(cfg, item) // 默认不定义
  afterUpdate: function afterUpdate(cfg, item) {},

  /**
   * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
   * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
   * @override
   * @param  {String} name 状态名称
   * @param  {String | Boolean} value 状态值
   * @param  {G6.Item} item 节点
   */
  setState: function setState(name, value, item) {
    var _a, _b;

    var shape = item.get('keyShape');
    if (!shape || shape.destroyed) return;
    var type = item.getType();
    var stateName = (0, _util.isBoolean)(value) ? name : name + ":" + value;
    var shapeStateStyle = this.getStateStyle(stateName, item);
    var itemStateStyle = item.getStateStyle(stateName); // const originStyle = item.getOriginStyle();
    // 不允许设置一个不存在的状态

    if (!itemStateStyle && !shapeStateStyle) {
      return;
    } // 要设置或取消的状态的样式
    // 当没有 state 状态时，默认使用 model.stateStyles 中的样式


    var styles = (0, _util.mix)({}, itemStateStyle || shapeStateStyle);
    var group = item.getContainer(); // 从图元素现有的样式中删除本次要取消的 states 中存在的属性值。使用对象检索更快

    var keptAttrs = {
      x: 1,
      y: 1,
      cx: 1,
      cy: 1
    };

    if (type === 'combo') {
      keptAttrs.r = 1;
      keptAttrs.width = 1;
      keptAttrs.height = 1;
    }

    if (value) {
      var _loop_2 = function _loop_2(key) {
        var _c;

        var style = styles[key];

        if ((0, _util.isPlainObject)(style) && !ARROWS.includes(key)) {
          var subShape = group.find(function (element) {
            return element.get('name') === key;
          });

          if (subShape) {
            subShape.attr(style);
          }
        } else {
          // 非纯对象，则认为是设置到 keyShape 上面的
          shape.attr((_c = {}, _c[key] = style, _c));
        }
      }; // style 为要设置的状态的样式


      for (var key in styles) {
        _loop_2(key);
      }
    } else {
      // 所有生效的 state 的样式
      var enableStatesStyle = (0, _graphic.cloneBesidesImg)(item.getCurrentStatesStyle());
      var model = item.getModel(); // 原始样式

      var originStyle_1 = (0, _util.mix)({}, model.style, (0, _graphic.cloneBesidesImg)(item.getOriginStyle()));
      var keyShapeName_1 = shape.get('name'); // cloning  shape.attr(), keys.forEach to avoid cloning the img attr, which leads to maximum clone heap #2383
      // const keyShapeStyles = clone(shape.attr())

      var shapeAttrs_1 = shape.attr();
      var keyShapeStyles_1 = {};
      Object.keys(shapeAttrs_1).forEach(function (key) {
        if (key === 'img') return;
        var attr = shapeAttrs_1[key];

        if (attr && _typeof(attr) === 'object') {
          keyShapeStyles_1[key] = (0, _util.clone)(attr);
        } else {
          keyShapeStyles_1[key] = attr;
        }
      }); // 已有样式 - 要取消的状态的样式

      var filtetDisableStatesStyle = {};

      var _loop_3 = function _loop_3(p) {
        var style = styles[p];

        if ((0, _util.isPlainObject)(style) && !ARROWS.includes(p)) {
          var subShape_1 = group.find(function (element) {
            return element.get('name') === p;
          });

          if (subShape_1) {
            var subShapeStyles_1 = (0, _util.clone)(subShape_1.attr());
            (0, _util.each)(style, function (v, key) {
              if (p === keyShapeName_1 && keyShapeStyles_1[key] && !keptAttrs[key]) {
                delete keyShapeStyles_1[key];
                var value_1 = originStyle_1[p][key] || SHAPES_DEFAULT_ATTRS[type][key];
                shape.attr(key, value_1);
              } else if (subShapeStyles_1[key] || subShapeStyles_1[key] === 0) {
                delete subShapeStyles_1[key];
                var value_2 = originStyle_1[p][key] || SHAPES_DEFAULT_ATTRS[type][key];
                subShape_1.attr(key, value_2);
              }
            });
            filtetDisableStatesStyle[p] = subShapeStyles_1;
          }
        } else {
          if (keyShapeStyles_1[p] && !keptAttrs[p]) {
            delete keyShapeStyles_1[p];
            var value_3 = originStyle_1[p] || (originStyle_1[keyShapeName_1] ? originStyle_1[keyShapeName_1][p] : undefined) || SHAPES_DEFAULT_ATTRS[type][p];
            shape.attr(p, value_3);
          }
        }
      }; // styles 为要取消的状态的样式


      for (var p in styles) {
        _loop_3(p);
      } // 从图元素现有的样式中删除本次要取消的 states 中存在的属性值后，
      // 如果 keyShape 有 name 属性，则 filtetDisableStatesStyle 的格式为 { keyShapeName: {} }
      // 否则为普通对象


      if (!keyShapeName_1) {
        (0, _util.mix)(filtetDisableStatesStyle, keyShapeStyles_1);
      } else {
        filtetDisableStatesStyle[keyShapeName_1] = keyShapeStyles_1;
      }

      for (var key in enableStatesStyle) {
        if (keptAttrs[key]) continue;
        var enableStyle = enableStatesStyle[key];

        if (!(0, _util.isPlainObject)(enableStyle) || ARROWS.includes(key)) {
          // 把样式属性merge到keyShape中
          if (!keyShapeName_1) {
            (0, _util.mix)(originStyle_1, (_a = {}, _a[key] = enableStyle, _a));
          } else {
            (0, _util.mix)(originStyle_1[keyShapeName_1], (_b = {}, _b[key] = enableStyle, _b));
            delete originStyle_1[key];
          }

          delete enableStatesStyle[key];
        }
      }

      var originstyles = {};
      (0, _util.deepMix)(originstyles, originStyle_1, filtetDisableStatesStyle, enableStatesStyle);
      var keyShapeSetted = false;

      var _loop_4 = function _loop_4(originKey) {
        var _d, _e;

        var style = originstyles[originKey];

        if ((0, _util.isPlainObject)(style) && !ARROWS.includes(originKey)) {
          var subShape = group.find(function (element) {
            return element.get('name') === originKey;
          });

          if (subShape) {
            if (originKey === keyShapeName_1) {
              if (type === 'combo') {
                delete style.r;
                delete style.width;
                delete style.height;
              }

              keyShapeSetted = true;
            }

            subShape.attr(style);
          }
        } else if (!keyShapeSetted) {
          var value_4 = style || SHAPES_DEFAULT_ATTRS[type][originKey]; // 当更新 combo 状态时，当不存在 keyShapeName 时候，则认为是设置到 keyShape 上面的

          if (type === 'combo') {
            if (!keyShapeName_1) {
              shape.attr((_d = {}, _d[originKey] = value_4, _d));
            }
          } else {
            shape.attr((_e = {}, _e[originKey] = value_4, _e));
          }
        }
      };

      for (var originKey in originstyles) {
        _loop_4(originKey);
      }
    }
  },

  /**
   * 获取不同状态下的样式
   *
   * @param {string} name 状态名称
   * @param {Item} item Node或Edge的实例
   * @return {object} 样式
   */
  getStateStyle: function getStateStyle(name, item) {
    var model = item.getModel();
    var type = item.getType();

    var _a = this.getOptions(model),
        stateStyles = _a.stateStyles,
        _b = _a.style,
        style = _b === void 0 ? {} : _b;

    var modelStateStyle = model.stateStyles ? model.stateStyles[name] : stateStyles && stateStyles[name];

    if (type === 'combo') {
      return (0, _util.clone)(modelStateStyle);
    }

    return (0, _util.mix)({}, style, modelStateStyle);
  },

  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getControlPoints: function getControlPoints(cfg) {
    return cfg.controlPoints;
  },

  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 锚点的数组,如果为 null，则没有锚点
   */
  getAnchorPoints: function getAnchorPoints(cfg) {
    var anchorPoints = this.getOptions(cfg).anchorPoints;
    return anchorPoints;
  }
};
exports.shapeBase = shapeBase;
}, function(modId) { var map = {"../global":1685504765330,"../util/graphic":1685504765329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765352, function(require, module, exports) {


var _tslib = require("tslib");

var _util = require("@antv/util");

var _graphic = require("../util/graphic");

var _math = require("../util/math");

var _path = require("../util/path");

var _global = _interopRequireDefault(require("../global"));

var _shape = _interopRequireDefault(require("./shape"));

var _shapeBase = require("./shapeBase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileOverview 自定义边
 * @description 自定义边中有大量逻辑同自定义节点重复，虽然可以提取成为 mixin ，但是考虑到代码的可读性，还是单独实现。
 */
var CLS_SHAPE = 'edge-shape'; // start,end 倒置，center 不变

function revertAlign(labelPosition) {
  var textAlign = labelPosition;

  if (labelPosition === 'start') {
    textAlign = 'end';
  } else if (labelPosition === 'end') {
    textAlign = 'start';
  }

  return textAlign;
}

var singleEdge = {
  itemType: 'edge',

  /**
   * 文本的位置
   * @type {String}
   */
  labelPosition: 'center',

  /**
   * 文本的 x 偏移
   * @type {Number}
   */
  refX: 0,

  /**
   * 文本的 y 偏移
   * @type {Number}
   */
  refY: 0,

  /**
   * 文本是否跟着线自动旋转，默认 false
   * @type {Boolean}
   */
  labelAutoRotate: false,
  // 自定义边时的配置
  options: {
    size: _global.default.defaultEdge.size,
    style: {
      x: 0,
      y: 0,
      stroke: _global.default.defaultEdge.style.stroke,
      lineAppendWidth: _global.default.defaultEdge.style.lineAppendWidth
    },
    labelCfg: {
      style: {
        fill: _global.default.edgeLabel.style.fill,
        fontSize: _global.default.edgeLabel.style.fontSize
      }
    },
    stateStyles: (0, _tslib.__assign)({}, _global.default.edgeStateStyles)
  },

  /**
   * 获取边的 path
   * @internal 供扩展的边覆盖
   * @param  {Array} points 构成边的点的集合
   * @return {Array} 构成 path 的数组
   */
  getPath: function getPath(points) {
    var path = [];
    (0, _util.each)(points, function (point, index) {
      if (index === 0) {
        path.push(['M', point.x, point.y]);
      } else {
        path.push(['L', point.x, point.y]);
      }
    });
    return path;
  },
  getShapeStyle: function getShapeStyle(cfg) {
    var defaultStyle = this.options.style;
    var strokeStyle = {
      stroke: cfg.color
    }; // 如果设置了color，则覆盖默认的stroke属性

    var style = (0, _util.mix)({}, defaultStyle, strokeStyle, cfg.style);
    var size = cfg.size || _global.default.defaultEdge.size;
    cfg = this.getPathPoints(cfg);
    var startPoint = cfg.startPoint,
        endPoint = cfg.endPoint;
    var controlPoints = this.getControlPoints(cfg);
    var points = [startPoint]; // 添加起始点
    // 添加控制点

    if (controlPoints) {
      points = points.concat(controlPoints);
    } // 添加结束点


    points.push(endPoint);
    var path = this.getPath(points);
    var styles = (0, _util.mix)({}, _global.default.defaultEdge.style, {
      stroke: _global.default.defaultEdge.color,
      lineWidth: size,
      path: path
    }, style);
    return styles;
  },
  updateShapeStyle: function updateShapeStyle(cfg, item) {
    var group = item.getContainer();
    var strokeStyle = {
      stroke: cfg.color
    };
    var shape = group.find(function (element) {
      return element.get('className') === 'edge-shape';
    }) || item.getKeyShape();
    var size = cfg.size;
    cfg = this.getPathPoints(cfg);
    var startPoint = cfg.startPoint,
        endPoint = cfg.endPoint;
    var controlPoints = this.getControlPoints(cfg); // || cfg.controlPoints;

    var points = [startPoint]; // 添加起始点
    // 添加控制点

    if (controlPoints) {
      points = points.concat(controlPoints);
    } // 添加结束点


    points.push(endPoint);
    var currentAttr = shape.attr();
    var previousStyle = (0, _util.mix)({}, strokeStyle, currentAttr, cfg.style);
    var source = cfg.sourceNode;
    var target = cfg.targetNode;
    var routeCfg = {
      radius: previousStyle.radius
    };

    if (!controlPoints) {
      routeCfg = {
        source: source,
        target: target,
        offset: previousStyle.offset,
        radius: previousStyle.radius
      };
    }

    if (currentAttr.endArrow && previousStyle.endArrow === false) {
      cfg.style.endArrow = {
        path: ''
      };
    }

    if (currentAttr.startArrow && previousStyle.startArrow === false) {
      cfg.style.startArrow = {
        path: ''
      };
    }

    var path = this.getPath(points, routeCfg);
    var style = (0, _util.mix)(strokeStyle, shape.attr(), {
      lineWidth: size,
      path: path
    }, cfg.style);

    if (shape) {
      shape.attr(style);
    }
  },
  getLabelStyleByPosition: function getLabelStyleByPosition(cfg, labelCfg, group) {
    var labelPosition = labelCfg.position || this.labelPosition; // 文本的位置用户可以传入

    var style = {};
    var pathShape = group && group.find(function (element) {
      return element.get('className') === CLS_SHAPE;
    }); // 不对 pathShape 进行判空，如果线不存在，说明有问题了

    var pointPercent;

    if (labelPosition === 'start') {
      pointPercent = 0;
    } else if (labelPosition === 'end') {
      pointPercent = 1;
    } else {
      pointPercent = 0.5;
    } // 偏移量


    var offsetX = labelCfg.refX || this.refX;
    var offsetY = labelCfg.refY || this.refY; // 如果两个节点重叠，线就变成了一个点，这时候label的位置，就是这个点 + 绝对偏移

    if (cfg.startPoint.x === cfg.endPoint.x && cfg.startPoint.y === cfg.endPoint.y) {
      style.x = cfg.startPoint.x + offsetX;
      style.y = cfg.startPoint.y + offsetY;
      style.text = cfg.label;
      return style;
    }

    var autoRotate;
    if ((0, _util.isNil)(labelCfg.autoRotate)) autoRotate = this.labelAutoRotate;else autoRotate = labelCfg.autoRotate;
    var offsetStyle = (0, _graphic.getLabelPosition)(pathShape, pointPercent, offsetX, offsetY, autoRotate);
    style.x = offsetStyle.x;
    style.y = offsetStyle.y;
    style.rotate = offsetStyle.rotate;
    style.textAlign = this._getTextAlign(labelPosition, offsetStyle.angle);
    style.text = cfg.label;
    return style;
  },
  getLabelBgStyleByPosition: function getLabelBgStyleByPosition(label, cfg, labelCfg, group) {
    if (!label) {
      return {};
    }

    var bbox = label.getBBox();
    var backgroundStyle = labelCfg.style && labelCfg.style.background;

    if (!backgroundStyle) {
      return {};
    }

    var padding = backgroundStyle.padding;
    var backgroundWidth = bbox.width + padding[1] + padding[3];
    var backgroundHeight = bbox.height + padding[0] + padding[2];
    var labelPosition = labelCfg.position || this.labelPosition;
    var style = (0, _tslib.__assign)((0, _tslib.__assign)({}, backgroundStyle), {
      width: backgroundWidth,
      height: backgroundHeight,
      x: bbox.minX - padding[2],
      y: bbox.minY - padding[0],
      rotate: 0
    });
    var autoRotate;
    if ((0, _util.isNil)(labelCfg.autoRotate)) autoRotate = this.labelAutoRotate;else autoRotate = labelCfg.autoRotate;
    var pathShape = group && group.find(function (element) {
      return element.get('className') === CLS_SHAPE;
    }); // 不对 pathShape 进行判空，如果线不存在，说明有问题了

    var pointPercent;

    if (labelPosition === 'start') {
      pointPercent = 0;
    } else if (labelPosition === 'end') {
      pointPercent = 1;
    } else {
      pointPercent = 0.5;
    } // 偏移量


    var offsetX = labelCfg.refX || this.refX;
    var offsetY = labelCfg.refY || this.refY; // // 如果两个节点重叠，线就变成了一个点，这时候label的位置，就是这个点 + 绝对偏移

    if (cfg.startPoint.x === cfg.endPoint.x && cfg.startPoint.y === cfg.endPoint.y) {
      style.x = cfg.startPoint.x + offsetX - backgroundWidth / 2;
      style.y = cfg.startPoint.y + offsetY - backgroundHeight / 2;
      return style;
    }

    var offsetStyle = (0, _graphic.getLabelPosition)(pathShape, pointPercent, offsetX - backgroundWidth / 2, offsetY + backgroundHeight / 2, autoRotate);
    var rad = offsetStyle.angle;

    if (rad > 1 / 2 * Math.PI && rad < 3 * 1 / 2 * Math.PI) {
      offsetStyle = (0, _graphic.getLabelPosition)(pathShape, pointPercent, offsetX + backgroundWidth / 2, offsetY + backgroundHeight / 2, autoRotate);
    }

    if (autoRotate) {
      style.x = offsetStyle.x;
      style.y = offsetStyle.y;
    }

    style.rotate = offsetStyle.rotate;
    return style;
  },
  // 获取文本对齐方式
  _getTextAlign: function _getTextAlign(labelPosition, angle) {
    var textAlign = 'center';

    if (!angle) {
      return labelPosition;
    }

    angle = angle % (Math.PI * 2); // 取模

    if (labelPosition !== 'center') {
      if (angle >= 0 && angle <= Math.PI / 2 || angle >= 3 / 2 * Math.PI && angle < 2 * Math.PI) {
        textAlign = labelPosition;
      } else {
        textAlign = revertAlign(labelPosition);
      }
    }

    return textAlign;
  },

  /**
   * @internal 获取边的控制点
   * @param  {Object} cfg 边的配置项
   * @return {Array} 控制点的数组
   */
  getControlPoints: function getControlPoints(cfg) {
    return cfg.controlPoints;
  },

  /**
   * @internal 处理需要重计算点和边的情况
   * @param {Object} cfg 边的配置项
   * @return {Object} 边的配置项
   */
  getPathPoints: function getPathPoints(cfg) {
    return cfg;
  },

  /**
   * 绘制边
   * @override
   * @param  {Object} cfg   边的配置项
   * @param  {G.Group} group 边的容器
   * @return {IShape} 图形
   */
  drawShape: function drawShape(cfg, group) {
    var shapeStyle = this.getShapeStyle(cfg);
    var shape = group.addShape('path', {
      className: CLS_SHAPE,
      name: CLS_SHAPE,
      attrs: shapeStyle
    });
    return shape;
  },
  drawLabel: function drawLabel(cfg, group) {
    var defaultLabelCfg = this.options.labelCfg;
    var defaultFontFamily;
    if (typeof window !== 'undefined' && typeof window.getComputedStyle !== 'undefined') defaultFontFamily = window.getComputedStyle(document.body, null).getPropertyValue('font-family') || 'Arial, sans-serif';else defaultFontFamily = 'Arial, sans-serif';
    var labelCfg = (0, _util.deepMix)({
      fontFamily: defaultFontFamily
    }, defaultLabelCfg, cfg.labelCfg);
    var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    var rotate = labelStyle.rotate;
    delete labelStyle.rotate;
    var label = group.addShape('text', {
      attrs: labelStyle,
      name: 'text-shape'
    });

    if (rotate) {
      label.rotateAtStart(rotate);
    }

    if (labelStyle.background) {
      var rect = this.drawLabelBg(cfg, group, label);
      var labelBgClassname = this.itemType + _shapeBase.CLS_LABEL_BG_SUFFIX;
      rect.set('classname', labelBgClassname);
      label.toFront();
    }

    return label;
  },
  drawLabelBg: function drawLabelBg(cfg, group, label) {
    var defaultLabelCfg = this.options.labelCfg;
    var labelCfg = (0, _util.deepMix)({}, defaultLabelCfg, cfg.labelCfg);
    var labelStyle = this.getLabelStyle(cfg, labelCfg, group);
    var rotate = labelStyle.rotate;
    var style = this.getLabelBgStyleByPosition(label, cfg, labelCfg, group);
    delete style.rotate;
    var rect = group.addShape('rect', {
      name: 'text-bg-shape',
      attrs: style
    });
    if (rotate) rect.rotateAtStart(rotate);
    return rect;
  }
};
var singleEdgeDef = (0, _tslib.__assign)((0, _tslib.__assign)({}, _shapeBase.shapeBase), singleEdge);

_shape.default.registerEdge('single-edge', singleEdgeDef); // 直线, 不支持控制点


_shape.default.registerEdge('line', {
  // 控制点不生效
  getControlPoints: function getControlPoints() {
    return undefined;
  }
}, 'single-edge'); // 直线


_shape.default.registerEdge('spline', {
  getPath: function getPath(points) {
    var path = (0, _path.getSpline)(points);
    return path;
  }
}, 'single-edge');

_shape.default.registerEdge('arc', {
  curveOffset: 20,
  clockwise: 1,
  getControlPoints: function getControlPoints(cfg) {
    var startPoint = cfg.startPoint,
        endPoint = cfg.endPoint;
    var midPoint = {
      x: (startPoint.x + endPoint.x) / 2,
      y: (startPoint.y + endPoint.y) / 2
    };
    var center;
    var arcPoint; // 根据给定点计算圆弧

    if (cfg.controlPoints !== undefined) {
      arcPoint = cfg.controlPoints[0];
      center = (0, _math.getCircleCenterByPoints)(startPoint, arcPoint, endPoint); // 根据控制点和直线关系决定 clockwise值

      if (startPoint.x <= endPoint.x && startPoint.y > endPoint.y) {
        this.clockwise = center.x > arcPoint.x ? 0 : 1;
      } else if (startPoint.x <= endPoint.x && startPoint.y < endPoint.y) {
        this.clockwise = center.x > arcPoint.x ? 1 : 0;
      } else if (startPoint.x > endPoint.x && startPoint.y <= endPoint.y) {
        this.clockwise = center.y < arcPoint.y ? 0 : 1;
      } else {
        this.clockwise = center.y < arcPoint.y ? 1 : 0;
      } // 若给定点和两端点共线，无法生成圆弧，绘制直线


      if ((arcPoint.x - startPoint.x) / (arcPoint.y - startPoint.y) === (endPoint.x - startPoint.x) / (endPoint.y - startPoint.y)) {
        return [];
      }
    } else {
      // 根据直线连线中点的的偏移计算圆弧
      // 若用户给定偏移量则根据其计算，否则按照默认偏移值计算
      if (cfg.curveOffset === undefined) {
        cfg.curveOffset = this.curveOffset;
      }

      if ((0, _util.isArray)(cfg.curveOffset)) {
        cfg.curveOffset = cfg.curveOffset[0];
      }

      if (cfg.curveOffset < 0) {
        this.clockwise = 0;
      } else {
        this.clockwise = 1;
      }

      var vec = {
        x: endPoint.x - startPoint.x,
        y: endPoint.y - startPoint.y
      };
      var edgeAngle = Math.atan2(vec.y, vec.x);
      arcPoint = {
        x: cfg.curveOffset * Math.cos(-Math.PI / 2 + edgeAngle) + midPoint.x,
        y: cfg.curveOffset * Math.sin(-Math.PI / 2 + edgeAngle) + midPoint.y
      };
      center = (0, _math.getCircleCenterByPoints)(startPoint, arcPoint, endPoint);
    }

    var radius = (0, _math.distance)(startPoint, center);
    var controlPoints = [{
      x: radius,
      y: radius
    }];
    return controlPoints;
  },
  getPath: function getPath(points) {
    var path = [];
    path.push(['M', points[0].x, points[0].y]); // 控制点与端点共线

    if (points.length === 2) {
      path.push(['L', points[1].x, points[1].y]);
    } else {
      path.push(['A', points[1].x, points[1].y, 0, 0, this.clockwise, points[2].x, points[2].y]);
    }

    return path;
  }
}, 'single-edge');

_shape.default.registerEdge('quadratic', {
  curvePosition: 0.5,
  curveOffset: -20,
  getControlPoints: function getControlPoints(cfg) {
    var controlPoints = cfg.controlPoints; // 指定controlPoints

    if (!controlPoints || !controlPoints.length) {
      var startPoint = cfg.startPoint,
          endPoint = cfg.endPoint;
      if (cfg.curveOffset === undefined) cfg.curveOffset = this.curveOffset;
      if (cfg.curvePosition === undefined) cfg.curvePosition = this.curvePosition;
      if ((0, _util.isArray)(this.curveOffset)) cfg.curveOffset = cfg.curveOffset[0];
      if ((0, _util.isArray)(this.curvePosition)) cfg.curvePosition = cfg.curveOffset[0];
      var innerPoint = (0, _path.getControlPoint)(startPoint, endPoint, cfg.curvePosition, cfg.curveOffset);
      controlPoints = [innerPoint];
    }

    return controlPoints;
  },
  getPath: function getPath(points) {
    var path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['Q', points[1].x, points[1].y, points[2].x, points[2].y]);
    return path;
  }
}, 'single-edge');

_shape.default.registerEdge('cubic', {
  curvePosition: [1 / 2, 1 / 2],
  curveOffset: [-20, 20],
  getControlPoints: function getControlPoints(cfg) {
    var controlPoints = cfg.controlPoints; // 指定 controlPoints

    if (cfg.curveOffset === undefined) cfg.curveOffset = this.curveOffset;
    if (cfg.curvePosition === undefined) cfg.curvePosition = this.curvePosition;
    if ((0, _util.isNumber)(cfg.curveOffset)) cfg.curveOffset = [cfg.curveOffset, -cfg.curveOffset];
    if ((0, _util.isNumber)(cfg.curvePosition)) cfg.curvePosition = [cfg.curvePosition, 1 - cfg.curvePosition];

    if (!controlPoints || !controlPoints.length || controlPoints.length < 2) {
      var startPoint = cfg.startPoint,
          endPoint = cfg.endPoint;
      var innerPoint1 = (0, _path.getControlPoint)(startPoint, endPoint, cfg.curvePosition[0], cfg.curveOffset[0]);
      var innerPoint2 = (0, _path.getControlPoint)(startPoint, endPoint, cfg.curvePosition[1], cfg.curveOffset[1]);
      controlPoints = [innerPoint1, innerPoint2];
    }

    return controlPoints;
  },
  getPath: function getPath(points) {
    var path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['C', points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y]);
    return path;
  }
}, 'single-edge'); // 垂直方向的三阶贝塞尔曲线，不再考虑用户外部传入的控制点


_shape.default.registerEdge('cubic-vertical', {
  curvePosition: [1 / 2, 1 / 2],
  minCurveOffset: [0, 0],
  curveOffset: undefined,
  getControlPoints: function getControlPoints(cfg) {
    var startPoint = cfg.startPoint,
        endPoint = cfg.endPoint;
    if (cfg.curvePosition === undefined) cfg.curvePosition = this.curvePosition;
    if (cfg.curveOffset === undefined) cfg.curveOffset = this.curveOffset;
    if (cfg.minCurveOffset === undefined) cfg.minCurveOffset = this.minCurveOffset;
    if ((0, _util.isNumber)(cfg.curveOffset)) cfg.curveOffset = [cfg.curveOffset, -cfg.curveOffset];
    if ((0, _util.isNumber)(cfg.minCurveOffset)) cfg.minCurveOffset = [cfg.minCurveOffset, -cfg.minCurveOffset];
    if ((0, _util.isNumber)(cfg.curvePosition)) cfg.curvePosition = [cfg.curvePosition, 1 - cfg.curvePosition];
    var yDist = endPoint.y - startPoint.y;
    var curveOffset = [0, 0];

    if (cfg.curveOffset) {
      curveOffset = cfg.curveOffset;
    } else if (Math.abs(yDist) < Math.abs(cfg.minCurveOffset[0])) {
      curveOffset = cfg.minCurveOffset;
    }

    var innerPoint1 = {
      x: startPoint.x,
      y: startPoint.y + yDist * this.curvePosition[0] + curveOffset[0]
    };
    var innerPoint2 = {
      x: endPoint.x,
      y: endPoint.y - yDist * this.curvePosition[1] + curveOffset[1]
    };
    return [innerPoint1, innerPoint2];
  }
}, 'cubic'); // 水平方向的三阶贝塞尔曲线，不再考虑用户外部传入的控制点


_shape.default.registerEdge('cubic-horizontal', {
  curvePosition: [1 / 2, 1 / 2],
  minCurveOffset: [0, 0],
  curveOffset: undefined,
  getControlPoints: function getControlPoints(cfg) {
    var startPoint = cfg.startPoint,
        endPoint = cfg.endPoint;
    if (cfg.curvePosition === undefined) cfg.curvePosition = this.curvePosition;
    if (cfg.curveOffset === undefined) cfg.curveOffset = this.curveOffset;
    if (cfg.minCurveOffset === undefined) cfg.minCurveOffset = this.minCurveOffset;
    if ((0, _util.isNumber)(cfg.curveOffset)) cfg.curveOffset = [cfg.curveOffset, -cfg.curveOffset];
    if ((0, _util.isNumber)(cfg.minCurveOffset)) cfg.minCurveOffset = [cfg.minCurveOffset, -cfg.minCurveOffset];
    if ((0, _util.isNumber)(cfg.curvePosition)) cfg.curvePosition = [cfg.curvePosition, 1 - cfg.curvePosition];
    var xDist = endPoint.x - startPoint.x;
    var curveOffset = [0, 0];

    if (cfg.curveOffset) {
      curveOffset = cfg.curveOffset;
    } else if (Math.abs(xDist) < Math.abs(cfg.minCurveOffset[0])) {
      curveOffset = cfg.minCurveOffset;
    }

    var innerPoint1 = {
      x: startPoint.x + xDist * this.curvePosition[0] + curveOffset[0],
      y: startPoint.y
    };
    var innerPoint2 = {
      x: endPoint.x - xDist * this.curvePosition[1] + curveOffset[1],
      y: endPoint.y
    };
    var controlPoints = [innerPoint1, innerPoint2];
    return controlPoints;
  }
}, 'cubic');

_shape.default.registerEdge('loop', {
  getPathPoints: function getPathPoints(cfg) {
    return (0, _graphic.getLoopCfgs)(cfg);
  },
  getControlPoints: function getControlPoints(cfg) {
    return cfg.controlPoints;
  },
  afterDraw: function afterDraw(cfg) {
    cfg.controlPoints = undefined;
  },
  afterUpdate: function afterUpdate(cfg) {
    cfg.controlPoints = undefined;
  }
}, 'cubic');
}, function(modId) { var map = {"../util/graphic":1685504765329,"../util/math":1685504765327,"../util/path":1685504765346,"../global":1685504765330,"./shape":1685504765340,"./shapeBase":1685504765351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765353, function(require, module, exports) {


var _tslib = require("tslib");

var _util = require("@antv/util");

var _global = _interopRequireDefault(require("../global"));

var _shape = _interopRequireDefault(require("./shape"));

var _shapeBase = require("./shapeBase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var singleCombo = {
  itemType: 'combo',
  // 单个图形的类型
  shapeType: 'single-combo',

  /**
   * Combo 标题文本相对图形的位置，默认为 top
   * 位置包括： top, bottom, left, right, center
   * @type {String}
   */
  labelPosition: 'top',

  /**
   * 标题文本相对偏移，当 labelPosition 不为 center 时有效
   * @type {Number}
   */
  refX: _global.default.comboLabel.refX,
  refY: _global.default.comboLabel.refY,
  options: {
    style: {
      stroke: _global.default.defaultCombo.style.stroke,
      fill: _global.default.defaultCombo.style.fill,
      lineWidth: _global.default.defaultCombo.style.lineWidth
    },
    labelCfg: {
      style: {
        fill: _global.default.comboLabel.style.fill,
        fontSize: _global.default.comboLabel.style.fontSize
      }
    },
    stateStyles: (0, _tslib.__assign)({}, _global.default.comboStateStyles)
  },

  /**
   * 获取 Combo 宽高
   * @internal 返回 Combo 的大小，以 [width, height] 的方式维护
   * @param  {Object} cfg Combo 的配置项
   * @return {Array} 宽高
   */
  getSize: function getSize(cfg) {
    var size = (0, _util.clone)(cfg.size || this.options.size || _global.default.defaultCombo.size); // size 是数组，若长度为 1，则补长度为 2

    if ((0, _util.isArray)(size) && size.length === 1) {
      size = [size[0], size[0]];
    } // size 为数字，则转换为数组


    if (!(0, _util.isArray)(size)) {
      size = [size, size];
    }

    return size;
  },
  // 私有方法，不希望扩展的 Combo 复写这个方法
  getLabelStyleByPosition: function getLabelStyleByPosition(cfg, labelCfg) {
    var labelPosition = labelCfg.position || this.labelPosition;
    var cfgStyle = cfg.style;
    var padding = cfg.padding || this.options.padding;
    if ((0, _util.isArray)(padding)) padding = padding[0];
    var refX = labelCfg.refX,
        refY = labelCfg.refY; // 考虑 refX 和 refY = 0 的场景，不用用 labelCfg.refX || Global.nodeLabel.refX

    if ((0, _util.isNil)(refX)) {
      refX = this.refX; // 不居中时的偏移量
    }

    if ((0, _util.isNil)(refY)) {
      refY = this.refY; // 不居中时的偏移量
    }

    var size = this.getSize(cfg);
    var r = Math.max(cfgStyle.r, size[0] / 2) || size[0] / 2;
    var dis = r + padding;
    var style;

    switch (labelPosition) {
      case 'top':
        style = {
          x: 0,
          y: -dis - refY,
          textBaseline: 'bottom',
          textAlign: 'center'
        };
        break;

      case 'bottom':
        style = {
          x: 0,
          y: dis + refY,
          textBaseline: 'bottom',
          textAlign: 'center'
        };
        break;

      case 'left':
        style = {
          x: -dis + refX,
          y: 0,
          textAlign: 'left'
        };
        break;

      case 'center':
        style = {
          x: 0,
          y: 0,
          text: cfg.label,
          textAlign: 'center'
        };
        break;

      default:
        style = {
          x: dis + refX,
          y: 0,
          textAlign: 'right'
        };
        break;
    }

    style.text = cfg.label;
    return style;
  },
  drawShape: function drawShape(cfg, group) {
    var shapeType = this.shapeType; // || this.type，都已经加了 shapeType

    var style = this.getShapeStyle(cfg);
    var shape = group.addShape(shapeType, {
      attrs: style,
      draggable: true,
      name: 'combo-shape'
    });
    return shape;
  },
  updateShape: function updateShape(cfg, item, keyShapeStyle) {
    var keyShape = item.get('keyShape');
    var animate = cfg.animate === undefined ? this.options.animate : cfg.animate;

    if (animate && keyShape.animate) {
      keyShape.animate(keyShapeStyle, {
        duration: 200,
        easing: 'easeLinear'
      });
    } else {
      keyShape.attr((0, _tslib.__assign)({}, keyShapeStyle));
    }

    this.updateLabel(cfg, item); // special for some types of nodes
  }
};
var singleComboDef = (0, _tslib.__assign)((0, _tslib.__assign)({}, _shapeBase.shapeBase), singleCombo);

_shape.default.registerCombo('single-combo', singleComboDef);
}, function(modId) { var map = {"../global":1685504765330,"./shape":1685504765340,"./shapeBase":1685504765351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765354, function(require, module, exports) {


require("./circle");

require("./rect");
}, function(modId) { var map = {"./circle":1685504765355,"./rect":1685504765356}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765355, function(require, module, exports) {


var _tslib = require("tslib");

var _global = _interopRequireDefault(require("../../global"));

var _shape = _interopRequireDefault(require("../shape"));

var _util = require("@antv/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 圆形 Combo
_shape.default.registerCombo('circle', {
  // 自定义节点时的配置
  options: {
    size: [_global.default.defaultCombo.size[0], _global.default.defaultCombo.size[0]],
    padding: _global.default.defaultCombo.padding[0],
    animate: true,
    style: {
      stroke: _global.default.defaultCombo.style.stroke,
      fill: _global.default.defaultCombo.style.fill,
      lineWidth: _global.default.defaultCombo.style.lineWidth
    },
    labelCfg: {
      style: {
        fill: _global.default.comboLabel.style.fill,
        fontSize: _global.default.comboLabel.style.fontSize
      },
      refX: 0,
      refY: 0
    },
    stateStyles: (0, _tslib.__assign)({}, _global.default.comboStateStyles)
  },
  shapeType: 'circle',
  // 文本位置
  labelPosition: 'top',
  drawShape: function drawShape(cfg, group) {
    var style = this.getShapeStyle(cfg);
    delete style.height;
    delete style.width;
    var keyShape = group.addShape('circle', {
      attrs: style,
      className: 'circle-combo',
      name: 'circle-combo',
      draggable: true
    });
    return keyShape;
  },

  /**
   * 获取 Combo 的样式，供基于该 Combo 自定义时使用
   * @param {Object} cfg Combo 数据模型
   * @return {Object} Combo 的样式
   */
  getShapeStyle: function getShapeStyle(cfg) {
    var defaultStyle = this.options.style;
    var padding = cfg.padding || this.options.padding;
    if ((0, _util.isArray)(padding)) padding = padding[0];
    var strokeStyle = {
      stroke: cfg.color
    }; // 如果设置了color，则覆盖默认的stroke属性

    var style = (0, _util.mix)({}, defaultStyle, strokeStyle, cfg.style);
    var r;

    if (cfg.fixSize) {
      r = (0, _util.isNumber)(cfg.fixSize) ? cfg.fixSize : cfg.fixSize[0];
    } else {
      var size = this.getSize(cfg);
      if (!(0, _util.isNumber)(style.r) || isNaN(style.r)) r = size[0] / 2 || _global.default.defaultCombo.style.r;else r = Math.max(style.r, size[0] / 2) || size[0] / 2;
    }

    style.r = r + padding;
    var styles = (0, _tslib.__assign)({
      x: 0,
      y: 0
    }, style);
    if (cfg.style) cfg.style.r = r;else {
      cfg.style = {
        r: r
      };
    }
    return styles;
  },
  update: function update(cfg, item) {
    var size = this.getSize(cfg);
    var padding = cfg.padding || this.options.padding;
    if ((0, _util.isArray)(padding)) padding = padding[0];
    var cfgStyle = (0, _util.clone)(cfg.style);
    var r;

    if (cfg.fixSize) {
      r = (0, _util.isNumber)(cfg.fixSize) ? cfg.fixSize : cfg.fixSize[0];
    } else {
      r = Math.max(cfgStyle.r, size[0] / 2) || size[0] / 2;
    }

    cfgStyle.r = r + padding;
    var itemCacheSize = item.get('sizeCache');

    if (itemCacheSize) {
      itemCacheSize.r = cfgStyle.r;
    } // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。


    var strokeStyle = {
      stroke: cfg.color
    }; // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。

    var keyShape = item.get('keyShape');
    var style = (0, _util.mix)({}, keyShape.attr(), strokeStyle, cfgStyle);
    if (cfg.style) cfg.style.r = r;else {
      cfg.style = {
        r: r
      };
    }
    this.updateShape(cfg, item, style, true);
  }
}, 'single-combo');
}, function(modId) { var map = {"../../global":1685504765330,"../shape":1685504765340}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765356, function(require, module, exports) {


var _tslib = require("tslib");

var _util = require("@antv/util");

var _global = _interopRequireDefault(require("../../global"));

var _shape = _interopRequireDefault(require("../shape"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_shape.default.registerCombo('rect', {
  // 自定义 Combo 时的配置
  options: {
    size: [40, 5],
    padding: [25, 20, 15, 20],
    animate: true,
    style: {
      radius: 0,
      stroke: _global.default.defaultCombo.style.stroke,
      fill: _global.default.defaultCombo.style.fill,
      lineWidth: _global.default.defaultCombo.style.lineWidth
    },
    // 文本样式配置
    labelCfg: {
      style: {
        fill: _global.default.comboLabel.style.fill,
        fontSize: _global.default.comboLabel.style.fontSize
      }
    },
    // 连接点，默认为左右
    anchorPoints: [[0, 0.5], [1, 0.5]],
    stateStyles: (0, _tslib.__assign)({}, _global.default.comboStateStyles)
  },
  shapeType: 'rect',
  labelPosition: 'top',
  drawShape: function drawShape(cfg, group) {
    var style = this.getShapeStyle(cfg);
    var keyShape = group.addShape('rect', {
      attrs: style,
      className: 'rect-combo',
      name: 'rect-combo',
      draggable: true
    });
    return keyShape;
  },
  // 私有方法，不希望扩展的 Combo 复写这个方法
  getLabelStyleByPosition: function getLabelStyleByPosition(cfg, labelCfg) {
    var labelPosition = labelCfg.position || this.labelPosition;
    var cfgStyle = cfg.style;
    var padding = cfg.padding || this.options.padding;
    if ((0, _util.isNumber)(padding)) padding = [padding, padding, padding, padding];
    var refX = labelCfg.refX,
        refY = labelCfg.refY; // 考虑 refX 和 refY = 0 的场景，不用用 labelCfg.refX || Global.nodeLabel.refY

    if ((0, _util.isNil)(refX)) {
      refX = this.refX; // 不居中时的偏移量
    }

    if ((0, _util.isNil)(refY)) {
      refY = this.refY; // 不居中时的偏移量
    }

    var leftDis = cfgStyle.width / 2 + padding[3];
    var topDis = cfgStyle.height / 2 + padding[0];
    var style;

    switch (labelPosition) {
      case 'top':
        style = {
          x: 0 - leftDis + refX,
          y: 0 - topDis + refY,
          textBaseline: 'top',
          textAlign: 'left'
        };
        break;

      case 'bottom':
        style = {
          x: 0,
          y: topDis + refY,
          textBaseline: 'bottom',
          textAlign: 'center'
        };
        break;

      case 'left':
        style = {
          x: 0 - leftDis + refY,
          y: 0,
          textAlign: 'left'
        };
        break;

      case 'center':
        style = {
          x: 0,
          y: 0,
          text: cfg.label,
          textAlign: 'center'
        };
        break;

      default:
        style = {
          x: leftDis + refX,
          y: 0,
          textAlign: 'right'
        };
        break;
    }

    style.text = cfg.label;
    return style;
  },

  /**
   * 获取节点的样式，供基于该节点自定义时使用
   * @param {Object} cfg 节点数据模型
   * @return {Object} 节点的样式
   */
  getShapeStyle: function getShapeStyle(cfg) {
    var defaultStyle = this.options.style;
    var padding = cfg.padding || this.options.padding;
    if ((0, _util.isNumber)(padding)) padding = [padding, padding, padding, padding];
    var strokeStyle = {
      stroke: cfg.color
    }; // 如果设置了color，则覆盖默认的stroke属性

    var style = (0, _util.mix)({}, defaultStyle, strokeStyle, cfg.style);
    var size = this.getSize(cfg);
    var width;
    var height;
    var fixSize = cfg.collapsed && cfg.fixCollapseSize ? cfg.fixCollapseSize : cfg.fixSize;

    if (fixSize) {
      if ((0, _util.isNumber)(fixSize)) {
        width = fixSize;
        height = fixSize;
      } else {
        width = fixSize[0];
        height = fixSize[1];
      }
    } else {
      if (!(0, _util.isNumber)(style.width) || isNaN(style.width)) width = size[0] || _global.default.defaultCombo.style.width;else width = Math.max(style.width, size[0]) || size[0];
      if (!(0, _util.isNumber)(style.height) || isNaN(style.height)) height = size[1] || _global.default.defaultCombo.style.height;else height = Math.max(style.height, size[1]) || size[1];
    }

    var x = -width / 2 - padding[3];
    var y = -height / 2 - padding[0];
    style.width = width + padding[1] + padding[3];
    style.height = height + padding[0] + padding[2];
    var styles = (0, _tslib.__assign)({
      x: x,
      y: y
    }, style);

    if (!cfg.style) {
      cfg.style = {
        width: width,
        height: height
      };
    } else {
      cfg.style.width = width;
      cfg.style.height = height;
    }

    return styles;
  },
  update: function update(cfg, item) {
    var size = this.getSize(cfg);
    var padding = cfg.padding || this.options.padding;
    if ((0, _util.isNumber)(padding)) padding = [padding, padding, padding, padding];
    var cfgStyle = (0, _util.clone)(cfg.style);
    var width, height;
    var fixSize = cfg.collapsed && cfg.fixCollapseSize ? cfg.fixCollapseSize : cfg.fixSize;

    if (fixSize) {
      if ((0, _util.isNumber)(fixSize)) {
        width = fixSize;
        height = fixSize;
      } else {
        width = fixSize[0];
        height = fixSize[1];
      }
    } else {
      width = Math.max(cfgStyle.width, size[0]) || size[0];
      height = Math.max(cfgStyle.height, size[1]) || size[1];
    }

    cfgStyle.width = width + padding[1] + padding[3];
    cfgStyle.height = height + padding[0] + padding[2];
    var itemCacheSize = item.get('sizeCache');

    if (itemCacheSize) {
      itemCacheSize.width = cfgStyle.width;
      itemCacheSize.height = cfgStyle.height;
    }

    cfgStyle.x = -width / 2 - padding[3];
    cfgStyle.y = -height / 2 - padding[0]; // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。

    var strokeStyle = {
      stroke: cfg.color
    }; // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。

    var keyShape = item.get('keyShape');
    var style = (0, _util.mix)({}, keyShape.attr(), strokeStyle, cfgStyle);

    if (cfg.style) {
      cfg.style.width = width;
      cfg.style.height = height;
    } else {
      cfg.style = {
        width: width,
        height: height
      };
    }

    this.updateShape(cfg, item, style, false);
  },
  updateShape: function updateShape(cfg, item, keyShapeStyle) {
    var keyShape = item.get('keyShape');
    var animate = cfg.animate === undefined ? this.options.animate : cfg.animate;

    if (animate && keyShape.animate) {
      keyShape.animate(keyShapeStyle, {
        duration: 200,
        easing: 'easeLinear'
      });
    } else {
      keyShape.attr((0, _tslib.__assign)({}, keyShapeStyle));
    }

    this.updateLabel(cfg, item);
  }
}, 'single-combo');
}, function(modId) { var map = {"../../global":1685504765330,"../shape":1685504765340}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765357, function(require, module, exports) {


require("./simple-circle");

require("./simple-rect");

require("./image");
}, function(modId) { var map = {"./simple-circle":1685504765358,"./simple-rect":1685504765359,"./image":1685504765360}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765358, function(require, module, exports) {


var _tslib = require("tslib");

var _util = require("@antv/util");

var _global = _interopRequireDefault(require("../../global"));

var _shape = _interopRequireDefault(require("../shape"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 带有图标的圆，可用于拓扑图中
_shape.default.registerNode('simple-circle', {
  // 自定义节点时的配置
  options: {
    size: _global.default.defaultNode.size,
    style: {
      x: 0,
      y: 0,
      stroke: _global.default.defaultNode.style.stroke,
      fill: _global.default.defaultNode.style.fill,
      lineWidth: _global.default.defaultNode.style.lineWidth
    },
    labelCfg: {
      style: {
        fill: _global.default.nodeLabel.style.fill,
        fontSize: _global.default.nodeLabel.style.fontSize
      }
    },
    stateStyles: (0, _tslib.__assign)({}, _global.default.nodeStateStyles)
  },
  shapeType: 'simple-circle',
  // 文本位置
  labelPosition: 'center',
  drawShape: function drawShape(cfg, group) {
    var style = this.getShapeStyle(cfg);
    var keyShape = group.addShape('circle', {
      attrs: style,
      className: this.type + "-keyShape",
      draggable: true
    });
    return keyShape;
  },

  /**
   * 获取节点的样式，供基于该节点自定义时使用
   * @param {Object} cfg 节点数据模型
   * @return {Object} 节点的样式
   */
  getShapeStyle: function getShapeStyle(cfg) {
    var defaultStyle = this.getOptions(cfg).style;
    var strokeStyle = {
      stroke: cfg.color
    }; // 如果设置了color，则覆盖默认的stroke属性

    var style = (0, _util.deepMix)({}, defaultStyle, strokeStyle);
    var size = this.getSize(cfg);
    var r = size[0] / 2;
    var styles = (0, _tslib.__assign)({
      x: 0,
      y: 0,
      r: r
    }, style);
    return styles;
  },
  update: function update(cfg, item) {
    var size = this.getSize(cfg); // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。

    var strokeStyle = {
      stroke: cfg.color,
      r: size[0] / 2
    }; // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。

    var keyShape = item.get('keyShape');
    var style = (0, _util.deepMix)({}, keyShape.attr(), strokeStyle, cfg.style);
    this.updateShape(cfg, item, style, true);
  }
}, 'single-node');
}, function(modId) { var map = {"../../global":1685504765330,"../shape":1685504765340}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765359, function(require, module, exports) {


var _tslib = require("tslib");

var _util = require("@antv/util");

var _global = _interopRequireDefault(require("../../global"));

var _shape = _interopRequireDefault(require("../shape"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_shape.default.registerNode('simple-rect', {
  // 自定义节点时的配置
  options: {
    size: [100, 30],
    style: {
      radius: 0,
      stroke: _global.default.defaultNode.style.stroke,
      fill: _global.default.defaultNode.style.fill,
      lineWidth: _global.default.defaultNode.style.lineWidth
    },
    // 文本样式配置
    labelCfg: {
      style: {
        fill: _global.default.nodeLabel.style.fill,
        fontSize: _global.default.nodeLabel.style.fontSize
      }
    },
    // 连接点，默认为左右
    // anchorPoints: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }]
    anchorPoints: [[0, 0.5], [1, 0.5]],
    stateStyles: (0, _tslib.__assign)({}, _global.default.nodeStateStyles)
  },
  shapeType: 'simple-rect',
  labelPosition: 'center',
  drawShape: function drawShape(cfg, group) {
    var style = this.getShapeStyle(cfg);
    var keyShape = group.addShape('rect', {
      attrs: style,
      className: this.type + "-keyShape",
      name: this.type + "-keyShape",
      draggable: true
    });
    return keyShape;
  },

  /**
   * 获取节点的样式，供基于该节点自定义时使用
   * @param {Object} cfg 节点数据模型
   * @return {Object} 节点的样式
   */
  getShapeStyle: function getShapeStyle(cfg) {
    var defaultStyle = this.getOptions(cfg).style;
    var strokeStyle = {
      stroke: cfg.color
    }; // 如果设置了color，则覆盖默认的stroke属性

    var style = (0, _util.mix)({}, defaultStyle, strokeStyle);
    var size = this.getSize(cfg);
    var width = style.width || size[0];
    var height = style.height || size[1];
    var styles = (0, _tslib.__assign)({
      x: -width / 2,
      y: -height / 2,
      width: width,
      height: height
    }, style);
    return styles;
  },
  update: function update(cfg, item) {
    var group = item.getContainer(); // 这里不传 cfg 参数是因为 cfg.style 需要最后覆盖样式

    var defaultStyle = this.getOptions({}).style;
    var size = this.getSize(cfg);
    var keyShape = item.get('keyShape');

    if (!cfg.size) {
      size[0] = keyShape.attr('width') || defaultStyle.width;
      size[1] = keyShape.attr('height') || defaultStyle.height;
    } // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。


    var strokeStyle = {
      stroke: cfg.color,
      x: -size[0] / 2,
      y: -size[1] / 2,
      width: size[0],
      height: size[1]
    }; // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。

    var style = (0, _util.mix)({}, defaultStyle, keyShape.attr(), strokeStyle);
    style = (0, _util.mix)(style, cfg.style);
    this.updateShape(cfg, item, style, false);
  }
}, 'single-node');
}, function(modId) { var map = {"../../global":1685504765330,"../shape":1685504765340}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765360, function(require, module, exports) {


var _tslib = require("tslib");

var _shape = _interopRequireDefault(require("../shape"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 基本的图片，可以添加文本，默认文本在图片的下面
 */
_shape.default.registerNode('image', {
  options: {
    img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ',
    size: 200,
    clipCfg: {
      show: false,
      type: 'circle',
      // circle
      r: 50,
      // ellipse
      rx: 50,
      ry: 35,
      // rect
      width: 50,
      height: 35,
      // polygon
      points: [[30, 12], [12, 30], [30, 48], [48, 30]],
      // path
      path: [['M', 25, 25], ['L', 50, 25], ['A', 12.5, 12.5, 0, 1, 1, 50, 50], ['A', 12.5, 12.5, 0, 1, 0, 50, 50], ['L', 25, 75], ['Z']],
      // 坐标
      x: 0,
      y: 0 // clip 的属性样式
      // style: {
      //   lineWidth: 1
      // },

    }
  },
  shapeType: 'image',
  labelPosition: 'bottom',
  drawShape: function drawShape(cfg, group) {
    var shapeType = this.shapeType; // || this.type，都已经加了 shapeType

    var style = this.getShapeStyle(cfg);
    delete style.fill;
    var shape = group.addShape(shapeType, {
      attrs: style,
      className: this.type + "-keyShape",
      name: this.type + "-keyShape",
      draggable: true
    });
    this.drawClip(cfg, shape);
    return shape;
  },
  drawClip: function drawClip(cfg, shape) {
    var clip = this.getOptions(cfg).clipCfg;

    if (!clip.show) {
      return;
    } // 支持 circle、rect、ellipse、Polygon 及自定义 path clip


    var type = clip.type,
        x = clip.x,
        y = clip.y,
        style = clip.style;

    if (type === 'circle') {
      var r = clip.r;
      shape.setClip({
        type: 'circle',
        attrs: (0, _tslib.__assign)({
          r: r,
          x: x,
          y: y
        }, style)
      });
    } else if (type === 'rect') {
      var width = clip.width,
          height = clip.height;
      var rectX = x - width / 2;
      var rectY = y - height / 2;
      shape.setClip({
        type: 'rect',
        attrs: (0, _tslib.__assign)({
          x: rectX,
          y: rectY,
          width: width,
          height: height
        }, style)
      });
    } else if (type === 'ellipse') {
      var rx = clip.rx,
          ry = clip.ry;
      shape.setClip({
        type: 'ellipse',
        attrs: (0, _tslib.__assign)({
          x: x,
          y: y,
          rx: rx,
          ry: ry
        }, style)
      });
    } else if (type === 'polygon') {
      var points = clip.points;
      shape.setClip({
        type: 'polygon',
        attrs: (0, _tslib.__assign)({
          points: points
        }, style)
      });
    } else if (type === 'path') {
      var path = clip.path;
      shape.setClip({
        type: 'path',
        attrs: (0, _tslib.__assign)({
          path: path
        }, style)
      });
    }
  },
  getShapeStyle: function getShapeStyle(cfg) {
    var defaultStyle = this.getOptions(cfg).style;
    var size = this.getSize(cfg);
    var img = this.getOptions(cfg).img;
    var width = size[0];
    var height = size[1];

    if (defaultStyle) {
      width = defaultStyle.width || size[0];
      height = defaultStyle.height || size[1];
    }

    var style = (0, _tslib.__assign)({
      x: -width / 2,
      y: -height / 2,
      width: width,
      height: height,
      img: img
    }, defaultStyle);
    return style;
  },
  updateShapeStyle: function updateShapeStyle(cfg, item) {
    var group = item.getContainer();
    var shapeClassName = this.itemType + "-shape";
    var shape = group.find(function (element) {
      return element.get('className') === shapeClassName;
    }) || item.getKeyShape();
    var shapeStyle = this.getShapeStyle(cfg);

    if (shape) {
      shape.attr(shapeStyle);
    }
  }
}, 'single-node');
}, function(modId) { var map = {"../shape":1685504765340}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765361, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  triangle: function triangle(width, length, d) {
    if (width === void 0) {
      width = 10;
    }

    if (length === void 0) {
      length = 15;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var path = "M " + begin + ",0 L " + (begin + length) + ",-" + width / 2 + " L " + (begin + length) + "," + width / 2 + " Z";
    return path;
  },
  vee: function vee(width, length, d) {
    if (width === void 0) {
      width = 15;
    }

    if (length === void 0) {
      length = 20;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var path = "M " + begin + ",0 L " + (begin + length) + ",-" + width / 2 + "\n        L " + (begin + 2 * length / 3) + ",0 L " + (begin + length) + "," + width / 2 + " Z";
    return path;
  },
  circle: function circle(r, d) {
    if (r === void 0) {
      r = 5;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var path = "M " + begin + ", 0\n            a " + r + "," + r + " 0 1,0 " + r * 2 + ",0\n            a " + r + "," + r + " 0 1,0 " + -r * 2 + ",0";
    return path;
  },
  rect: function rect(width, length, d) {
    if (width === void 0) {
      width = 10;
    }

    if (length === void 0) {
      length = 10;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var path = "M " + begin + "," + -width / 2 + " \n        L " + (begin + length) + "," + -width / 2 + " \n        L " + (begin + length) + "," + width / 2 + " \n        L " + begin + "," + width / 2 + " Z";
    return path;
  },
  diamond: function diamond(width, length, d) {
    if (width === void 0) {
      width = 15;
    }

    if (length === void 0) {
      length = 15;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var path = "M " + begin + ",0 \n        L " + (begin + length / 2) + "," + -width / 2 + " \n        L " + (begin + length) + ",0 \n        L " + (begin + length / 2) + "," + width / 2 + " Z";
    return path;
  },
  triangleRect: function triangleRect(tWidth, tLength, rWidth, rLength, gap, d) {
    if (tWidth === void 0) {
      tWidth = 15;
    }

    if (tLength === void 0) {
      tLength = 15;
    }

    if (rWidth === void 0) {
      rWidth = 15;
    }

    if (rLength === void 0) {
      rLength = 3;
    }

    if (gap === void 0) {
      gap = 5;
    }

    if (d === void 0) {
      d = 0;
    }

    var begin = d * 2;
    var rectBegin = begin + tLength + gap;
    var path = "M " + begin + ",0 L " + (begin + tLength) + ",-" + tWidth / 2 + " L " + (begin + tLength) + "," + tWidth / 2 + " Z\n            M " + rectBegin + ", -" + rWidth / 2 + "\n            L " + (rectBegin + rLength) + " -" + rWidth / 2 + "\n            L " + (rectBegin + rLength) + " " + rWidth / 2 + "\n            L " + rectBegin + " " + rWidth / 2 + "\n            Z";
    return path;
  }
};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765362, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  collapse: function collapse(x, y, r) {
    return [['M', x - r, y], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0], ['M', x - r + 4, y], ['L', x + r - 4, y]];
  },
  expand: function expand(x, y, r) {
    return [['M', x - r, y], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0], ['M', x - r + 4, y], ['L', x - r + 2 * r - 4, y], ['M', x - r + r, y - r + 4], ['L', x, y + r - 4]];
  },
  upTriangle: function upTriangle(x, y, r) {
    var l1 = r * Math.cos(Math.PI / 6);
    var l2 = r * Math.sin(Math.PI / 6);
    return [['M', x - l1, y + l2], ['L', x + l1, y + l2], ['L', x, y - r], ['Z']];
  },
  downTriangle: function downTriangle(x, y, r) {
    var l1 = r * Math.cos(Math.PI / 6);
    var l2 = r * Math.sin(Math.PI / 6);
    return [['M', x - l1, y - l2], ['L', x + l1, y - l2], ['L', x, y + r], ['Z']];
  }
};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765363, function(require, module, exports) {


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tslib = require("tslib");

var MathUtil = _interopRequireWildcard(require("./math"));

var GraphicUtil = _interopRequireWildcard(require("./graphic"));

var PathUtil = _interopRequireWildcard(require("./path"));

var BaseUtil = _interopRequireWildcard(require("./base"));

var ColorUtil = _interopRequireWildcard(require("./color"));

var _matrixUtil = require("@antv/matrix-util");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var transform = _matrixUtil.ext.transform;
var Util = (0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)((0, _tslib.__assign)({}, BaseUtil), GraphicUtil), PathUtil), MathUtil), ColorUtil), {
  transform: transform,
  mat3: _matrixUtil.mat3
});
var _default = Util;
exports.default = _default;
}, function(modId) { var map = {"./math":1685504765327,"./graphic":1685504765329,"./path":1685504765346,"./base":1685504765335,"./color":1685504765364}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765364, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSubjectColors = void 0;
var defaultSubjectColors = ['#5F95FF', '#61DDAA', '#65789B', '#F6BD16', '#7262FD', '#78D3F8', '#9661BC', '#F6903D', '#008685', '#F08BB4'];
exports.defaultSubjectColors = defaultSubjectColors;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765365, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tslib = require("tslib");

var _util = require("@antv/util");

var _base = require("../../util/base");

var LayoutController =
/** @class */
function () {
  function LayoutController(graph) {
    this.graph = graph;
    this.layoutCfg = graph.get('layout') || {};
    this.layoutType = this.getLayoutType();
    this.layoutMethods = [];
    this.initLayout();
  } // eslint-disable-next-line class-methods-use-this


  LayoutController.prototype.initLayout = function () {// no data before rendering
  };

  LayoutController.prototype.getLayoutType = function () {
    return this.getLayoutCfgType(this.layoutCfg);
  };

  LayoutController.prototype.getLayoutCfgType = function (layoutCfg) {
    var type = layoutCfg.type; // type should be top priority

    if (type) {
      return type;
    }

    var pipes = layoutCfg.pipes;

    if (Array.isArray(pipes)) {
      return pipes.map(function (pipe) {
        return (pipe === null || pipe === void 0 ? void 0 : pipe.type) || '';
      });
    }

    return null;
  };

  LayoutController.prototype.isLayoutTypeSame = function (cfg) {
    var current = this.getLayoutCfgType(cfg); // already has pipes

    if (Array.isArray(this.layoutType)) {
      return this.layoutType.every(function (type, index) {
        return type === current[index];
      });
    }

    return (cfg === null || cfg === void 0 ? void 0 : cfg.type) === this.layoutType;
  }; // 绘制


  LayoutController.prototype.refreshLayout = function () {
    var graph = this.graph;
    if (!graph) return;

    if (graph.get('animate')) {
      graph.positionsAnimate();
    } else {
      graph.refreshPositions();
    }
  }; // 更换布局


  LayoutController.prototype.changeLayout = function (cfg) {
    this.layoutCfg = cfg;
    this.destoryLayoutMethods();
    this.layout();
  }; // 更换数据


  LayoutController.prototype.changeData = function () {
    this.destoryLayoutMethods();
    this.layout();
  };

  LayoutController.prototype.destoryLayoutMethods = function () {
    var layoutMethods = this.layoutMethods;
    layoutMethods === null || layoutMethods === void 0 ? void 0 : layoutMethods.forEach(function (layoutMethod) {
      layoutMethod.destroy();
    });
    this.layoutMethods = [];
  }; // 销毁布局，不能使用 this.destroy，因为 controller 还需要被使用，只是把布局算法销毁


  LayoutController.prototype.destroyLayout = function () {
    var graph = this.graph;
    this.destoryLayoutMethods();
    graph.set('layout', undefined);
    this.layoutCfg = undefined;
    this.layoutType = undefined;
    this.layoutMethods = undefined;
  }; // 从 this.graph 获取数据


  LayoutController.prototype.setDataFromGraph = function () {
    var nodes = [];
    var hiddenNodes = [];
    var edges = [];
    var hiddenEdges = [];
    var comboEdges = [];
    var combos = [];
    var hiddenCombos = [];
    var nodeItems = this.graph.getNodes();
    var edgeItems = this.graph.getEdges();
    var comboItems = this.graph.getCombos();
    var nodeLength = nodeItems.length;

    for (var i = 0; i < nodeLength; i++) {
      var nodeItem = nodeItems[i];
      if (!nodeItem || nodeItem.destroyed) continue;
      var model = nodeItem.getModel();

      if (!nodeItem.isVisible()) {
        hiddenNodes.push(model);
        continue;
      }

      nodes.push(model);
    }

    var edgeLength = edgeItems.length;

    for (var i = 0; i < edgeLength; i++) {
      var edgeItem = edgeItems[i];
      if (!edgeItem || edgeItem.destroyed) continue;
      var model = edgeItem.getModel();

      if (!edgeItem.isVisible()) {
        hiddenEdges.push(model);
        continue;
      }

      if (!model.isComboEdge) edges.push(model);else comboEdges.push(model);
    }

    var comboLength = comboItems.length;

    for (var i = 0; i < comboLength; i++) {
      var comboItem = comboItems[i];
      if (comboItem.destroyed) continue;
      var model = comboItem.getModel();

      if (!comboItem.isVisible()) {
        hiddenEdges.push(model);
        continue;
      }

      combos.push(model);
    }

    return {
      nodes: nodes,
      hiddenNodes: hiddenNodes,
      edges: edges,
      hiddenEdges: hiddenEdges,
      combos: combos,
      hiddenCombos: hiddenCombos,
      comboEdges: comboEdges
    };
  };

  LayoutController.prototype.reLayoutMethod = function (layoutMethod, layoutCfg) {
    var _this = this;

    return new Promise(function (reslove, reject) {
      var graph = _this.graph;
      var layoutType = layoutCfg === null || layoutCfg === void 0 ? void 0 : layoutCfg.type; // 每个布局方法都需要注册

      layoutCfg.onLayoutEnd = function () {
        graph.emit('aftersublayout', {
          type: layoutType
        });
        reslove();
      };

      layoutMethod.init(_this.data);

      if (layoutType === 'force') {
        layoutMethod.ticking = false;
        layoutMethod.forceSimulation.stop();
      }

      graph.emit('beforesublayout', {
        type: layoutType
      });
      layoutMethod.execute();
      if (layoutMethod.isCustomLayout && layoutCfg.onLayoutEnd) layoutCfg.onLayoutEnd();
    });
  }; // 重新布局


  LayoutController.prototype.relayout = function (reloadData) {
    var _this = this;

    var _a = this,
        graph = _a.graph,
        layoutMethods = _a.layoutMethods,
        layoutCfg = _a.layoutCfg;

    if (reloadData) {
      this.data = this.setDataFromGraph();
      var nodes = this.data.nodes;

      if (!nodes) {
        return false;
      }

      this.initPositions(layoutCfg.center, nodes);
    }

    graph.emit('beforelayout');
    var start = Promise.resolve();
    layoutMethods === null || layoutMethods === void 0 ? void 0 : layoutMethods.forEach(function (layoutMethod, index) {
      var currentCfg = layoutCfg[index];
      start = start.then(function () {
        return _this.reLayoutMethod(layoutMethod, currentCfg);
      });
    });
    start.then(function () {
      if (layoutCfg.onAllLayoutEnd) layoutCfg.onAllLayoutEnd();
    }).catch(function (error) {
      console.warn('relayout failed', error);
    });
  }; // 筛选参与布局的nodes和edges


  LayoutController.prototype.filterLayoutData = function (data, cfg) {
    var nodes = data.nodes,
        edges = data.edges,
        rest = (0, _tslib.__rest)(data, ["nodes", "edges"]);

    if (!nodes) {
      return data;
    }

    var nodesFilter;
    var edegsFilter;

    if ((0, _util.isFunction)(cfg === null || cfg === void 0 ? void 0 : cfg.nodesFilter)) {
      nodesFilter = cfg.nodesFilter;
    } else {
      nodesFilter = function nodesFilter() {
        return true;
      };
    }

    if ((0, _util.isFunction)(cfg === null || cfg === void 0 ? void 0 : cfg.edgesFilter)) {
      edegsFilter = cfg.edgesFilter;
    } else {
      var nodesMap_1 = nodes.reduce(function (acc, cur) {
        acc[cur.id] = true;
        return acc;
      }, {});

      edegsFilter = function edegsFilter(edge) {
        return nodesMap_1[edge.source] && nodesMap_1[edge.target];
      };
    }

    return (0, _tslib.__assign)({
      nodes: nodes.filter(nodesFilter),
      edges: edges.filter(edegsFilter)
    }, rest);
  };

  LayoutController.prototype.getLayoutBBox = function (nodes) {
    var graph = this.graph;
    var graphGroupNodes = (0, _util.groupBy)(graph.getNodes(), function (n) {
      return n.getModel().layoutOrder;
    });
    var layoutNodes = Object.values(graphGroupNodes).map(function (value) {
      var bbox = (0, _base.calculationItemsBBox)(value);
      bbox.size = [bbox.width, bbox.height];
      return bbox;
    });
    var groupNodes = Object.values((0, _util.groupBy)(nodes, 'layoutOrder'));
    return {
      groupNodes: groupNodes,
      layoutNodes: layoutNodes
    };
  }; // 控制布局动画
  // eslint-disable-next-line class-methods-use-this


  LayoutController.prototype.layoutAnimate = function () {}; // 将当前节点的平均中心移动到原点


  LayoutController.prototype.moveToZero = function () {
    var graph = this.graph;
    var data = graph.get('data');
    var nodes = data.nodes;

    if (nodes[0].x === undefined || nodes[0].x === null || (0, _base.isNaN)(nodes[0].x)) {
      return;
    }

    var meanCenter = [0, 0];
    var nodeLength = nodes.length;

    for (var i = 0; i < nodeLength; i++) {
      var node = nodes[i];
      meanCenter[0] += node.x;
      meanCenter[1] += node.y;
    }

    meanCenter[0] /= nodes.length;
    meanCenter[1] /= nodes.length;

    for (var i = 0; i < nodeLength; i++) {
      var node = nodes[i];
      node.x -= meanCenter[0];
      node.y -= meanCenter[1];
    }
  }; // 初始化节点到 center 附近


  LayoutController.prototype.initPositions = function (center, nodes) {
    var graph = this.graph;

    if (!nodes) {
      return false;
    }

    var nodeLength = nodes ? nodes.length : 0;
    if (!nodeLength) return;
    var width = graph.get('width') * 0.85;
    var height = graph.get('height') * 0.85;
    var horiNum = Math.ceil(Math.sqrt(nodeLength) * (width / height));
    var vertiNum = Math.ceil(nodeLength / horiNum);
    var horiGap = width / (horiNum - 1);
    var vertiGap = height / (vertiNum - 1);
    if (!isFinite(horiGap) || !horiGap) horiGap = 0;
    if (!isFinite(vertiGap) || !horiGap) vertiGap = 0;
    var beginX = center[0] - width / 2;
    var beginY = center[1] - height / 2;
    var allHavePos = true;

    for (var i = 0; i < nodeLength; i++) {
      var node = nodes[i];

      if ((0, _base.isNaN)(node.x)) {
        allHavePos = false;
        node.x = i % horiNum * horiGap + beginX;
      }

      if ((0, _base.isNaN)(node.y)) {
        allHavePos = false;
        node.y = Math.floor(i / horiNum) * vertiGap + beginY;
      }
    }

    return allHavePos;
  };

  LayoutController.prototype.destroy = function () {
    this.graph = null;
    this.destoryLayoutMethods();
    this.destroyed = true;
  };

  return LayoutController;
}();

var _default = LayoutController;
exports.default = _default;
}, function(modId) { var map = {"../../util/base":1685504765335}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765366, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var EventController =
/** @class */
function () {
  function EventController(graph) {
    this.graph = graph;
    this.destroyed = false;
    this.initEvents();
  }

  return EventController;
}();

var _default = EventController;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765367, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  G6Event: true
};
exports.G6Event = void 0;

var _interface = require("../interface");

Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interface[key];
    }
  });
});
// Behavior type file
var G6Event;
exports.G6Event = G6Event;

(function (G6Event) {
  // common events
  G6Event["CLICK"] = "click";
  G6Event["DBLCLICK"] = "dblclick";
  G6Event["MOUSEDOWN"] = "mousedown";
  G6Event["MOUDEUP"] = "mouseup";
  G6Event["CONTEXTMENU"] = "contextmenu";
  G6Event["MOUSEENTER"] = "mouseenter";
  G6Event["MOUSEOUT"] = "mouseout";
  G6Event["MOUSEOVER"] = "mouseover";
  G6Event["MOUSEMOVE"] = "mousemove";
  G6Event["MOUSELEAVE"] = "mouseleave";
  G6Event["DRAGSTART"] = "dragstart";
  G6Event["DRAGEND"] = "dragend";
  G6Event["DRAG"] = "drag";
  G6Event["DRAGENTER"] = "dragenter";
  G6Event["DRAGLEAVE"] = "dragleave";
  G6Event["DRAGOVER"] = "dragover";
  G6Event["DRAGOUT"] = "dragout";
  G6Event["DDROP"] = "drop";
  G6Event["KEYUP"] = "keyup";
  G6Event["KEYDOWN"] = "keydown";
  G6Event["WHEEL"] = "wheel";
  G6Event["FOCUS"] = "focus";
  G6Event["BLUR"] = "blur"; // touch events

  G6Event["TOUCHSTART"] = "touchstart";
  G6Event["TOUCHMOVE"] = "touchmove";
  G6Event["TOUCHEND"] = "touchend";
  G6Event["CANVAS_TOUCHSTART"] = "canvas:touchstart";
  G6Event["CANVAS_TOUCHMOVE"] = "canvas:touchmove";
  G6Event["CANVAS_TOUCHEND"] = "canvas:touchend";
  G6Event["NODE_TOUCHSTART"] = "node:touchstart";
  G6Event["NODE_TOUCHMOVE"] = "node:touchmove";
  G6Event["NODE_TOUCHEND"] = "node:touchend";
  G6Event["COMBO_TOUCHSTART"] = "combo:touchstart";
  G6Event["COMBO_TOUCHMOVE"] = "combo:touchmove";
  G6Event["COMBO_TOUCHEND"] = "combo:touchend";
  G6Event["EDGE_TOUCHSTART"] = "edge:touchstart";
  G6Event["EDGE_TOUCHMOVE"] = "edge:touchmove";
  G6Event["EDGE_TOUCHEND"] = "edge:touchend"; // node events

  G6Event["NODE_CONTEXTMENU"] = "node:contextmenu";
  G6Event["NODE_CLICK"] = "node:click";
  G6Event["NODE_DBLCLICK"] = "node:dblclick";
  G6Event["NODE_MOUSEDOWN"] = "node:mousedown";
  G6Event["NODE_MOUSEUP"] = "node:mouseup";
  G6Event["NODE_MOUSEENTER"] = "node:mouseenter";
  G6Event["NODE_MOUSELEAVE"] = "node:mouseleave";
  G6Event["NODE_MOUSEMOVE"] = "node:mousemove";
  G6Event["NODE_MOUSEOUT"] = "node:mouseout";
  G6Event["NODE_MOUSEOVER"] = "node:mouseover";
  G6Event["NODE_DROP"] = "node:drop";
  G6Event["NODE_DRAGOVER"] = "node:dragover";
  G6Event["NODE_DRAGENTER"] = "node:dragenter";
  G6Event["NODE_DRAGLEAVE"] = "node:dragleave";
  G6Event["NODE_DRAGSTART"] = "node:dragstart";
  G6Event["NODE_DRAG"] = "node:drag";
  G6Event["NODE_DRAGEND"] = "node:dragend";
  G6Event["NODE_TAP"] = "node:tap";
  G6Event["NODE_PANSTART"] = "node:panstart";
  G6Event["NODE_PANMOVE"] = "node:panmove";
  G6Event["NODE_PANEND"] = "node:panend"; // combo, extends from nodes

  G6Event["COMBO_CONTEXTMENU"] = "combo:contextmenu";
  G6Event["COMBO_CLICK"] = "combo:click";
  G6Event["COMBO_DBLCLICK"] = "combo:dblclick";
  G6Event["COMBO_MOUSEDOWN"] = "combo:mousedown";
  G6Event["COMBO_MOUSEUP"] = "combo:mouseup";
  G6Event["COMBO_MOUSEENTER"] = "combo:mouseenter";
  G6Event["COMBO_MOUSELEAVE"] = "combo:mouseleave";
  G6Event["COMBO_MOUSEMOVE"] = "combo:mousemove";
  G6Event["COMBO_MOUSEOUT"] = "combo:mouseout";
  G6Event["COMBO_MOUSEOVER"] = "combo:mouseover";
  G6Event["COMBO_DROP"] = "combo:drop";
  G6Event["COMBO_DRAGOVER"] = "combo:dragover";
  G6Event["COMBO_DRAGENTER"] = "combo:dragenter";
  G6Event["COMBO_DRAGLEAVE"] = "combo:dragleave";
  G6Event["COMBO_DRAGSTART"] = "combo:dragstart";
  G6Event["COMBO_DRAG"] = "combo:drag";
  G6Event["COMBO_DRAGEND"] = "combo:dragend";
  G6Event["COMBO_TAP"] = "combo:tap";
  G6Event["COMBO_PANSTART"] = "combo:panstart";
  G6Event["COMBO_PANMOVE"] = "combo:panmove";
  G6Event["COMBO_PANEND"] = "combo:panend"; // edge events

  G6Event["EDGE_CONTEXTMENU"] = "edge:contextmenu";
  G6Event["EDGE_CLICK"] = "edge:click";
  G6Event["EDGE_DBLCLICK"] = "edge:dblclick";
  G6Event["EDGE_MOUSEDOWN"] = "edge:mousedown";
  G6Event["EDGE_MOUSEUP"] = "edge:mouseup";
  G6Event["EDGE_MOUSEENTER"] = "edge:mouseenter";
  G6Event["EDGE_MOUSELEAVE"] = "edge:mouseleave";
  G6Event["EDGE_MOUSEMOVE"] = "edge:mousemove";
  G6Event["EDGE_MOUSEOUT"] = "edge:mouseout";
  G6Event["EDGE_MOUSEOVER"] = "edge:mouseover";
  G6Event["EDGE_DROP"] = "edge:drop";
  G6Event["EDGE_DRAGOVER"] = "edge:dragover";
  G6Event["EDGE_DRAGENTER"] = "edge:dragenter";
  G6Event["EDGE_DRAGLEAVE"] = "edge:dragleave"; // canvas events

  G6Event["CANVAS_CONTEXTMENU"] = "canvas:contextmenu";
  G6Event["CANVAS_CLICK"] = "canvas:click";
  G6Event["CANVAS_DBLCLICK"] = "canvas:dblclick";
  G6Event["CANVAS_MOUSEDOWN"] = "canvas:mousedown";
  G6Event["CANVAS_MOUSEUP"] = "canvas:mouseup";
  G6Event["CANVAS_MOUSEENTER"] = "canvas:mouseenter";
  G6Event["CANVAS_MOUSELEAVE"] = "canvas:mouseleave";
  G6Event["CANVAS_MOUSEMOVE"] = "canvas:mousemove";
  G6Event["CANVAS_MOUSEOUT"] = "canvas:mouseout";
  G6Event["CANVAS_MOUSEOVER"] = "canvas:mouseover";
  G6Event["CANVAS_DROP"] = "canvas:drop";
  G6Event["CANVAS_DRAGENTER"] = "canvas:dragenter";
  G6Event["CANVAS_DRAGLEAVE"] = "canvas:dragleave";
  G6Event["CANVAS_DRAGSTART"] = "canvas:dragstart";
  G6Event["CANVAS_DRAG"] = "canvas:drag";
  G6Event["CANVAS_DRAGEND"] = "canvas:dragend";
  G6Event["CANVAS_TAP"] = "canvas:tap";
  G6Event["CANVAS_PANSTART"] = "canvas:panstart";
  G6Event["CANVAS_PANMOVE"] = "canvas:panmove";
  G6Event["CANVAS_PANEND"] = "canvas:panend"; // timing events

  G6Event["BEFORERENDER"] = "beforerender";
  G6Event["AFTERRENDER"] = "afterrender";
  G6Event["BEFOREADDITEM"] = "beforeadditem";
  G6Event["AFTERADDITEM"] = "afteradditem";
  G6Event["BEFOREREMOVEITEM"] = "beforeremoveitem";
  G6Event["AFTERREMOVEITEM"] = "afterremoveitem";
  G6Event["BEFOREUPDATEITEM"] = "beforeupdateitem";
  G6Event["AFTERUPDATEITEM"] = "afterupdateitem";
  G6Event["BEFOREITEMVISIBILITYCHANGE"] = "beforeitemvisibilitychange";
  G6Event["AFTERITEMVISIBILITYCHANGE"] = "afteritemvisibilitychange";
  G6Event["BEFOREITEMSTATECHANGE"] = "beforeitemstatechange";
  G6Event["AFTERITEMSTATECHANGE"] = "afteritemstatechange";
  G6Event["BEFOREITEMREFRESH"] = "beforeitemrefresh";
  G6Event["AFTERITEMREFRESH"] = "afteritemrefresh";
  G6Event["BEFOREITEMSTATESCLEAR"] = "beforeitemstatesclear";
  G6Event["AFTERITEMSTATESCLEAR"] = "afteritemstatesclear";
  G6Event["BEFOREMODECHANGE"] = "beforemodechange";
  G6Event["AFTERMODECHANGE"] = "aftermodechange";
  G6Event["BEFORELAYOUT"] = "beforelayout";
  G6Event["AFTERLAYOUT"] = "afterlayout";
  G6Event["BEFORECREATEEDGE"] = "beforecreateedge";
  G6Event["AFTERCREATEEDGE"] = "aftercreateedge";
  G6Event["BEFOREGRAPHREFRESHPOSITION"] = "beforegraphrefreshposition";
  G6Event["AFTERGRAPHREFRESHPOSITION"] = "aftergraphrefreshposition";
  G6Event["BEFOREGRAPHREFRESH"] = "beforegraphrefresh";
  G6Event["AFTERGRAPHREFRESH"] = "aftergraphrefresh";
  G6Event["BEFOREANIMATE"] = "beforeanimate";
  G6Event["AFTERANIMATE"] = "afteranimate";
  G6Event["BEFOREPAINT"] = "beforepaint";
  G6Event["AFTERPAINT"] = "afterpaint";
  G6Event["BEFORECOLLAPSEEXPANDCOMBO"] = "beforecollapseexpandcombo";
  G6Event["AFTERCOLLAPSEEXPANDCOMBO"] = "aftercollapseexpandcombo";
  G6Event["GRAPHSTATECHANGE"] = "graphstatechange";
  G6Event["AFTERACTIVATERELATIONS"] = "afteractivaterelations";
  G6Event["NODESELECTCHANGE"] = "nodeselectchange";
  G6Event["TOOLTIPCHANGE"] = "tooltipchange";
  G6Event["WHEELZOOM"] = "wheelzoom";
  G6Event["VIEWPORTCHANGE"] = "viewportchange";
  G6Event["DRAGNODEEND"] = "dragnodeend";
  G6Event["STACKCHANGE"] = "stackchange"; // Mobile event support

  G6Event["TAP"] = "tap";
  G6Event["PINCHSTART"] = "pinchstart";
  G6Event["PINCHMOVE"] = "pinchmove";
  G6Event["PANSTART"] = "panstart";
  G6Event["PANMOVE"] = "panmove";
  G6Event["PANEND"] = "panend";
})(G6Event || (exports.G6Event = G6Event = {}));
}, function(modId) { var map = {"../interface":1685504765368}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765368, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graph = require("./graph");

Object.keys(_graph).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _graph[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _graph[key];
    }
  });
});

var _behavior = require("./behavior");

Object.keys(_behavior).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _behavior[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _behavior[key];
    }
  });
});

var _item = require("./item");

Object.keys(_item).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _item[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _item[key];
    }
  });
});

var _shape = require("./shape");

Object.keys(_shape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _shape[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shape[key];
    }
  });
});
}, function(modId) { var map = {"./graph":1685504765369,"./behavior":1685504765336,"./item":1685504765370,"./shape":1685504765371}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765369, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765370, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765371, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1685504765322);
})()
//miniprogram-npm-outsideDeps=["@antv/util","tslib","@antv/event-emitter","@antv/matrix-util","@antv/algorithm","@antv/dom-util","@antv/g-base","@antv/path-util"]
//# sourceMappingURL=index.js.map
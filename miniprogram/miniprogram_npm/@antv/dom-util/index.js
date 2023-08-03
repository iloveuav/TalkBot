module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1685504765311, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyCSS = exports.getWidth = exports.getStyle = exports.getRatio = exports.getOuterWidth = exports.getOuterHeight = exports.getHeight = exports.createDom = exports.addEventListener = void 0;
// dom
var add_event_listener_1 = require("./add-event-listener");
Object.defineProperty(exports, "addEventListener", { enumerable: true, get: function () { return add_event_listener_1.default; } });
var create_dom_1 = require("./create-dom");
Object.defineProperty(exports, "createDom", { enumerable: true, get: function () { return create_dom_1.default; } });
var get_height_1 = require("./get-height");
Object.defineProperty(exports, "getHeight", { enumerable: true, get: function () { return get_height_1.default; } });
var get_outer_height_1 = require("./get-outer-height");
Object.defineProperty(exports, "getOuterHeight", { enumerable: true, get: function () { return get_outer_height_1.default; } });
var get_outer_width_1 = require("./get-outer-width");
Object.defineProperty(exports, "getOuterWidth", { enumerable: true, get: function () { return get_outer_width_1.default; } });
var get_ratio_1 = require("./get-ratio");
Object.defineProperty(exports, "getRatio", { enumerable: true, get: function () { return get_ratio_1.default; } });
var get_style_1 = require("./get-style");
Object.defineProperty(exports, "getStyle", { enumerable: true, get: function () { return get_style_1.default; } });
var get_width_1 = require("./get-width");
Object.defineProperty(exports, "getWidth", { enumerable: true, get: function () { return get_width_1.default; } });
var modify_css_1 = require("./modify-css");
Object.defineProperty(exports, "modifyCSS", { enumerable: true, get: function () { return modify_css_1.default; } });
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./add-event-listener":1685504765312,"./create-dom":1685504765313,"./get-height":1685504765314,"./get-outer-height":1685504765316,"./get-outer-width":1685504765317,"./get-ratio":1685504765319,"./get-style":1685504765315,"./get-width":1685504765318,"./modify-css":1685504765320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765312, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function addEventListener(target, eventType, callback) {
    if (target) {
        if (typeof target.addEventListener === 'function') {
            target.addEventListener(eventType, callback, false);
            return {
                remove: function () {
                    target.removeEventListener(eventType, callback, false);
                },
            };
            // @ts-ignore
        }
        if (typeof target.attachEvent === 'function') {
            // @ts-ignore
            target.attachEvent('on' + eventType, callback);
            return {
                remove: function () {
                    // @ts-ignore
                    target.detachEvent('on' + eventType, callback);
                },
            };
        }
    }
}
exports.default = addEventListener;
//# sourceMappingURL=add-event-listener.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765313, function(require, module, exports) {

/**
 * 创建DOM 节点
 * @param  {String} str Dom 字符串
 * @return {HTMLElement}  DOM 节点
 */
Object.defineProperty(exports, "__esModule", { value: true });
var TABLE;
var TABLE_TR;
var FRAGMENT_REG;
var CONTAINERS;
function initConstants() {
    TABLE = document.createElement('table');
    TABLE_TR = document.createElement('tr');
    FRAGMENT_REG = /^\s*<(\w+|!)[^>]*>/;
    CONTAINERS = {
        tr: document.createElement('tbody'),
        tbody: TABLE,
        thead: TABLE,
        tfoot: TABLE,
        td: TABLE_TR,
        th: TABLE_TR,
        '*': document.createElement('div'),
    };
}
function createDom(str) {
    if (!TABLE) {
        initConstants();
    }
    var name = FRAGMENT_REG.test(str) && RegExp.$1;
    if (!name || !(name in CONTAINERS)) {
        name = '*';
    }
    var container = CONTAINERS[name];
    str = typeof str === 'string' ? str.replace(/(^\s*)|(\s*$)/g, '') : str;
    container.innerHTML = '' + str;
    var dom = container.childNodes[0];
    if (dom && container.contains(dom)) {
        container.removeChild(dom);
    }
    return dom;
}
exports.default = createDom;
//# sourceMappingURL=create-dom.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765314, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("./get-style");
function getHeight(el, defaultValue) {
    var height = (0, get_style_1.default)(el, 'height', defaultValue);
    if (height === 'auto') {
        height = el.offsetHeight;
    }
    return parseFloat(height);
}
exports.default = getHeight;
//# sourceMappingURL=get-height.js.map
}, function(modId) { var map = {"./get-style":1685504765315}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765315, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取样式
 * @param  {Object} dom DOM节点
 * @param  {String} name 样式名
 * @param  {Any} defaultValue 默认值
 * @return {String} 属性值
 */
function getStyle(dom, name, defaultValue) {
    var v;
    try {
        v = window.getComputedStyle ?
            window.getComputedStyle(dom, null)[name] :
            dom.style[name]; // 一般不会走到这个逻辑，dom.style 获取的是标签 style 属性，也不准确
    }
    catch (e) {
        // do nothing
    }
    finally {
        v = v === undefined ? defaultValue : v;
    }
    return v;
}
exports.default = getStyle;
//# sourceMappingURL=get-style.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765316, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("./get-style");
var get_height_1 = require("./get-height");
function getOuterHeight(el, defaultValue) {
    var height = (0, get_height_1.default)(el, defaultValue);
    var bTop = parseFloat((0, get_style_1.default)(el, 'borderTopWidth')) || 0;
    var pTop = parseFloat((0, get_style_1.default)(el, 'paddingTop')) || 0;
    var pBottom = parseFloat((0, get_style_1.default)(el, 'paddingBottom')) || 0;
    var bBottom = parseFloat((0, get_style_1.default)(el, 'borderBottomWidth')) || 0;
    var mTop = parseFloat((0, get_style_1.default)(el, 'marginTop')) || 0;
    var mBottom = parseFloat((0, get_style_1.default)(el, 'marginBottom')) || 0;
    return height + bTop + bBottom + pTop + pBottom + mTop + mBottom;
}
exports.default = getOuterHeight;
//# sourceMappingURL=get-outer-height.js.map
}, function(modId) { var map = {"./get-style":1685504765315,"./get-height":1685504765314}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765317, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("./get-style");
var get_width_1 = require("./get-width");
function getOuterWidth(el, defaultValue) {
    var width = (0, get_width_1.default)(el, defaultValue);
    var bLeft = parseFloat((0, get_style_1.default)(el, 'borderLeftWidth')) || 0;
    var pLeft = parseFloat((0, get_style_1.default)(el, 'paddingLeft')) || 0;
    var pRight = parseFloat((0, get_style_1.default)(el, 'paddingRight')) || 0;
    var bRight = parseFloat((0, get_style_1.default)(el, 'borderRightWidth')) || 0;
    var mRight = parseFloat((0, get_style_1.default)(el, 'marginRight')) || 0;
    var mLeft = parseFloat((0, get_style_1.default)(el, 'marginLeft')) || 0;
    return width + bLeft + bRight + pLeft + pRight + mLeft + mRight;
}
exports.default = getOuterWidth;
//# sourceMappingURL=get-outer-width.js.map
}, function(modId) { var map = {"./get-style":1685504765315,"./get-width":1685504765318}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765318, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var get_style_1 = require("./get-style");
function getHeight(el, defaultValue) {
    var width = (0, get_style_1.default)(el, 'width', defaultValue);
    if (width === 'auto') {
        width = el.offsetWidth;
    }
    return parseFloat(width);
}
exports.default = getHeight;
//# sourceMappingURL=get-width.js.map
}, function(modId) { var map = {"./get-style":1685504765315}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765319, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function getRatio() {
    return window.devicePixelRatio ? window.devicePixelRatio : 2;
}
exports.default = getRatio;
//# sourceMappingURL=get-ratio.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1685504765320, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
function modifyCSS(dom, css) {
    if (dom) {
        for (var key in css) {
            if (css.hasOwnProperty(key)) {
                dom.style[key] = css[key];
            }
        }
    }
    return dom;
}
exports.default = modifyCSS;
//# sourceMappingURL=modify-css.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1685504765311);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map
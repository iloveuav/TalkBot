module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1727074728382, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.isAnyArray = void 0;
// eslint-disable-next-line @typescript-eslint/unbound-method
const toString = Object.prototype.toString;
/**
 * Checks if an object is an instance of an Array (array or typed array, except those that contain bigint values).
 *
 * @param value - Object to check.
 * @returns True if the object is an array or a typed array.
 */
function isAnyArray(value) {
    const tag = toString.call(value);
    return tag.endsWith('Array]') && !tag.includes('Big');
}
exports.isAnyArray = isAnyArray;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1727074728382);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map
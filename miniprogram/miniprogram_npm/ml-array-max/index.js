module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1685504765692, function(require, module, exports) {


var isAnyArray = require('is-any-array');

function max(input, options = {}) {
  if (!isAnyArray.isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  const { fromIndex = 0, toIndex = input.length } = options;

  if (
    fromIndex < 0 ||
    fromIndex >= input.length ||
    !Number.isInteger(fromIndex)
  ) {
    throw new Error('fromIndex must be a positive integer smaller than length');
  }

  if (
    toIndex <= fromIndex ||
    toIndex > input.length ||
    !Number.isInteger(toIndex)
  ) {
    throw new Error(
      'toIndex must be an integer greater than fromIndex and at most equal to length',
    );
  }

  let maxValue = input[fromIndex];
  for (let i = fromIndex + 1; i < toIndex; i++) {
    if (input[i] > maxValue) maxValue = input[i];
  }
  return maxValue;
}

module.exports = max;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1685504765692);
})()
//miniprogram-npm-outsideDeps=["is-any-array"]
//# sourceMappingURL=index.js.map
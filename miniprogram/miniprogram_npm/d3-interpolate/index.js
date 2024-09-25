module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1727074728341, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./value.js');Object.defineProperty(exports, 'interpolate', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./array.js');Object.defineProperty(exports, 'interpolateArray', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./basis.js');Object.defineProperty(exports, 'interpolateBasis', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./basisClosed.js');Object.defineProperty(exports, 'interpolateBasisClosed', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./date.js');Object.defineProperty(exports, 'interpolateDate', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./discrete.js');Object.defineProperty(exports, 'interpolateDiscrete', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./hue.js');Object.defineProperty(exports, 'interpolateHue', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./number.js');Object.defineProperty(exports, 'interpolateNumber', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./numberArray.js');Object.defineProperty(exports, 'interpolateNumberArray', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./object.js');Object.defineProperty(exports, 'interpolateObject', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./round.js');Object.defineProperty(exports, 'interpolateRound', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./string.js');Object.defineProperty(exports, 'interpolateString', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./transform/index.js');Object.defineProperty(exports, 'interpolateTransformCss', { enumerable: true, configurable: true, get: function() { return __TEMP__.interpolateTransformCss; } });Object.defineProperty(exports, 'interpolateTransformSvg', { enumerable: true, configurable: true, get: function() { return __TEMP__.interpolateTransformSvg; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./zoom.js');Object.defineProperty(exports, 'interpolateZoom', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./rgb.js');Object.defineProperty(exports, 'interpolateRgb', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });Object.defineProperty(exports, 'interpolateRgbBasis', { enumerable: true, configurable: true, get: function() { return __TEMP__.rgbBasis; } });Object.defineProperty(exports, 'interpolateRgbBasisClosed', { enumerable: true, configurable: true, get: function() { return __TEMP__.rgbBasisClosed; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./hsl.js');Object.defineProperty(exports, 'interpolateHsl', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });Object.defineProperty(exports, 'interpolateHslLong', { enumerable: true, configurable: true, get: function() { return __TEMP__.hslLong; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./lab.js');Object.defineProperty(exports, 'interpolateLab', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./hcl.js');Object.defineProperty(exports, 'interpolateHcl', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });Object.defineProperty(exports, 'interpolateHclLong', { enumerable: true, configurable: true, get: function() { return __TEMP__.hclLong; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./cubehelix.js');Object.defineProperty(exports, 'interpolateCubehelix', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });Object.defineProperty(exports, 'interpolateCubehelixLong', { enumerable: true, configurable: true, get: function() { return __TEMP__.cubehelixLong; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./piecewise.js');Object.defineProperty(exports, 'piecewise', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var __TEMP__ = require('./quantize.js');Object.defineProperty(exports, 'quantize', { enumerable: true, configurable: true, get: function() { return __TEMP__.default; } });

}, function(modId) {var map = {"./value.js":1727074728342,"./array.js":1727074728348,"./basis.js":1727074728344,"./basisClosed.js":1727074728345,"./date.js":1727074728350,"./discrete.js":1727074728354,"./hue.js":1727074728355,"./number.js":1727074728351,"./numberArray.js":1727074728349,"./object.js":1727074728352,"./round.js":1727074728356,"./string.js":1727074728353,"./transform/index.js":1727074728357,"./zoom.js":1727074728360,"./rgb.js":1727074728343,"./hsl.js":1727074728361,"./lab.js":1727074728362,"./hcl.js":1727074728363,"./cubehelix.js":1727074728364,"./piecewise.js":1727074728365,"./quantize.js":1727074728366}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728342, function(require, module, exports) {
var __TEMP__ = require('d3-color');var color = __TEMP__['color'];
var __TEMP__ = require('./rgb.js');var rgb = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./array.js');var genericArray = __TEMP__['genericArray'];
var __TEMP__ = require('./date.js');var date = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./number.js');var number = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./object.js');var object = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./string.js');var string = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./constant.js');var constant = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./numberArray.js');var numberArray = __REQUIRE_DEFAULT__(__TEMP__);var isNumberArray = __TEMP__['isNumberArray'];

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
      : (t === "number" ? number
      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
      : b instanceof color ? rgb
      : b instanceof Date ? date
      : isNumberArray(b) ? numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : number)(a, b);
};

}, function(modId) { var map = {"./rgb.js":1727074728343,"./array.js":1727074728348,"./date.js":1727074728350,"./number.js":1727074728351,"./object.js":1727074728352,"./string.js":1727074728353,"./constant.js":1727074728347,"./numberArray.js":1727074728349}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728343, function(require, module, exports) {
var __TEMP__ = require('d3-color');var colorRgb = __TEMP__['rgb'];
var __TEMP__ = require('./basis.js');var basis = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./basisClosed.js');var basisClosed = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./color.js');var nogamma = __REQUIRE_DEFAULT__(__TEMP__);var gamma = __TEMP__['gamma'];

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = colorRgb(start)).r, (end = colorRgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1);

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = colorRgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var rgbBasis = exports.rgbBasis = rgbSpline(basis);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var rgbBasisClosed = exports.rgbBasisClosed = rgbSpline(basisClosed);

}, function(modId) { var map = {"./basis.js":1727074728344,"./basisClosed.js":1727074728345,"./color.js":1727074728346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728344, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
};exports.basis = basis

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728345, function(require, module, exports) {
var __TEMP__ = require('./basis.js');var basis = __TEMP__['basis'];

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
};

}, function(modId) { var map = {"./basis.js":1727074728344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728346, function(require, module, exports) {
var __TEMP__ = require('./constant.js');var constant = __REQUIRE_DEFAULT__(__TEMP__);

function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
};exports.hue = hue

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
};exports.gamma = gamma

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant(isNaN(a) ? b : a);
};exports.default = nogamma

}, function(modId) { var map = {"./constant.js":1727074728347}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728347, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = x => () => x;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728348, function(require, module, exports) {
var __TEMP__ = require('./value.js');var value = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./numberArray.js');var numberArray = __REQUIRE_DEFAULT__(__TEMP__);var isNumberArray = __TEMP__['isNumberArray'];

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(a, b) {
  return (isNumberArray(b) ? numberArray : genericArray)(a, b);
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
};exports.genericArray = genericArray

}, function(modId) { var map = {"./value.js":1727074728342,"./numberArray.js":1727074728349}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728349, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
};exports.isNumberArray = isNumberArray

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728350, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728351, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728352, function(require, module, exports) {
var __TEMP__ = require('./value.js');var value = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = value(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
};

}, function(modId) { var map = {"./value.js":1727074728342}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728353, function(require, module, exports) {
var __TEMP__ = require('./number.js');var number = __REQUIRE_DEFAULT__(__TEMP__);

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: number(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
};

}, function(modId) { var map = {"./number.js":1727074728351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728354, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728355, function(require, module, exports) {
var __TEMP__ = require('./color.js');var hue = __TEMP__['hue'];

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(a, b) {
  var i = hue(+a, +b);
  return function(t) {
    var x = i(t);
    return x - 360 * Math.floor(x / 360);
  };
};

}, function(modId) { var map = {"./color.js":1727074728346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728356, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728357, function(require, module, exports) {
var __TEMP__ = require('../number.js');var number = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./parse.js');var parseCss = __TEMP__['parseCss'];var parseSvg = __TEMP__['parseSvg'];

function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: number(xa, xb)}, {i: i - 2, x: number(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var interpolateTransformCss = exports.interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var interpolateTransformSvg = exports.interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

}, function(modId) { var map = {"../number.js":1727074728351,"./parse.js":1727074728358}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728358, function(require, module, exports) {
var __TEMP__ = require('./decompose.js');var decompose = __REQUIRE_DEFAULT__(__TEMP__);var identity = __TEMP__['identity'];

var svgNode;

/* eslint-disable no-undef */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
};exports.parseCss = parseCss

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
};exports.parseSvg = parseSvg

}, function(modId) { var map = {"./decompose.js":1727074728359}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728359, function(require, module, exports) {
var degrees = 180 / Math.PI;

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var identity = exports.identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728360, function(require, module, exports) {
var epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = (function zoomRho(rho, rho2, rho4) {

  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
        dx = ux1 - ux0,
        dy = uy1 - uy0,
        d2 = dx * dx + dy * dy,
        i,
        S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      }
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S,
            coshr0 = cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      }
    }

    i.duration = S * 1000 * rho / Math.SQRT2;

    return i;
  }

  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };

  return zoom;
})(Math.SQRT2, 2, 4);

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728361, function(require, module, exports) {
var __TEMP__ = require('d3-color');var colorHsl = __TEMP__['hsl'];
var __TEMP__ = require('./color.js');var color = __REQUIRE_DEFAULT__(__TEMP__);var hue = __TEMP__['hue'];

function hsl(hue) {
  return function(start, end) {
    var h = hue((start = colorHsl(start)).h, (end = colorHsl(end)).h),
        s = color(start.s, end.s),
        l = color(start.l, end.l),
        opacity = color(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = hsl(hue);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var hslLong = exports.hslLong = hsl(color);

}, function(modId) { var map = {"./color.js":1727074728346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728362, function(require, module, exports) {
var __TEMP__ = require('d3-color');var colorLab = __TEMP__['lab'];
var __TEMP__ = require('./color.js');var color = __REQUIRE_DEFAULT__(__TEMP__);

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function lab(start, end) {
  var l = color((start = colorLab(start)).l, (end = colorLab(end)).l),
      a = color(start.a, end.a),
      b = color(start.b, end.b),
      opacity = color(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
};exports.default = lab

}, function(modId) { var map = {"./color.js":1727074728346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728363, function(require, module, exports) {
var __TEMP__ = require('d3-color');var colorHcl = __TEMP__['hcl'];
var __TEMP__ = require('./color.js');var color = __REQUIRE_DEFAULT__(__TEMP__);var hue = __TEMP__['hue'];

function hcl(hue) {
  return function(start, end) {
    var h = hue((start = colorHcl(start)).h, (end = colorHcl(end)).h),
        c = color(start.c, end.c),
        l = color(start.l, end.l),
        opacity = color(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = hcl(hue);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var hclLong = exports.hclLong = hcl(color);

}, function(modId) { var map = {"./color.js":1727074728346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728364, function(require, module, exports) {
var __TEMP__ = require('d3-color');var colorCubehelix = __TEMP__['cubehelix'];
var __TEMP__ = require('./color.js');var color = __REQUIRE_DEFAULT__(__TEMP__);var hue = __TEMP__['hue'];

function cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = colorCubehelix(start)).h, (end = colorCubehelix(end)).h),
          s = color(start.s, end.s),
          l = color(start.l, end.l),
          opacity = color(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = cubehelix(hue);
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var cubehelixLong = exports.cubehelixLong = cubehelix(color);

}, function(modId) { var map = {"./color.js":1727074728346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728365, function(require, module, exports) {
var __TEMP__ = require('./value.js');var value = __TEMP__['default'];

if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function piecewise(interpolate, values) {
  if (values === undefined) values = interpolate, interpolate = value;
  var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
  while (i < n) I[i] = interpolate(v, v = values[++i]);
  return function(t) {
    var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
    return I[i](t - i);
  };
};exports.default = piecewise

}, function(modId) { var map = {"./value.js":1727074728342}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728366, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = function(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1727074728341);
})()
//miniprogram-npm-outsideDeps=["d3-color"]
//# sourceMappingURL=index.js.map
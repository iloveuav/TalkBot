module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1727074728151, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = exports.Polyline = exports.Polygon = exports.Line = exports.Arc = exports.Cubic = exports.Quad = void 0;
var quadratic_1 = require("./quadratic");
exports.Quad = quadratic_1.default;
var cubic_1 = require("./cubic");
exports.Cubic = cubic_1.default;
var arc_1 = require("./arc");
exports.Arc = arc_1.default;
var line_1 = require("./line");
exports.Line = line_1.default;
var polygon_1 = require("./polygon");
exports.Polygon = polygon_1.default;
var polyline_1 = require("./polyline");
exports.Polyline = polyline_1.default;
var Util = require("./util");
exports.Util = Util;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./quadratic":1727074728152,"./cubic":1727074728156,"./arc":1727074728157,"./line":1727074728153,"./polygon":1727074728159,"./polyline":1727074728161,"./util":1727074728154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728152, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var line_1 = require("./line");
var util_1 = require("./util");
var bezier_1 = require("./bezier");
// 差值公式
function quadraticAt(p0, p1, p2, t) {
    var onet = 1 - t;
    return onet * onet * p0 + 2 * t * onet * p1 + t * t * p2;
}
// 求极值
function extrema(p0, p1, p2) {
    var a = p0 + p2 - 2 * p1;
    if (util_1.isNumberEqual(a, 0)) {
        return [0.5];
    }
    var rst = (p0 - p1) / a;
    if (rst <= 1 && rst >= 0) {
        return [rst];
    }
    return [];
}
function derivativeAt(p0, p1, p2, t) {
    return 2 * (1 - t) * (p1 - p0) + 2 * t * (p2 - p1);
}
// 分割贝塞尔曲线
function divideQuadratic(x1, y1, x2, y2, x3, y3, t) {
    // 划分点
    var xt = quadraticAt(x1, x2, x3, t);
    var yt = quadraticAt(y1, y2, y3, t);
    // 分割的第一条曲线的控制点
    var controlPoint1 = line_1.default.pointAt(x1, y1, x2, y2, t);
    // 分割的第二条曲线的控制点
    var controlPoint2 = line_1.default.pointAt(x2, y2, x3, y3, t);
    return [
        [x1, y1, controlPoint1.x, controlPoint1.y, xt, yt],
        [xt, yt, controlPoint2.x, controlPoint2.y, x3, y3],
    ];
}
// 使用迭代法取贝塞尔曲线的长度
function quadraticLength(x1, y1, x2, y2, x3, y3, iterationCount) {
    if (iterationCount === 0) {
        return (util_1.distance(x1, y1, x2, y2) + util_1.distance(x2, y2, x3, y3) + util_1.distance(x1, y1, x3, y3)) / 2;
    }
    var quadratics = divideQuadratic(x1, y1, x2, y2, x3, y3, 0.5);
    var left = quadratics[0];
    var right = quadratics[1];
    left.push(iterationCount - 1);
    right.push(iterationCount - 1);
    return quadraticLength.apply(null, left) + quadraticLength.apply(null, right);
}
exports.default = {
    box: function (x1, y1, x2, y2, x3, y3) {
        var xExtrema = extrema(x1, x2, x3)[0];
        var yExtrema = extrema(y1, y2, y3)[0];
        // 控制点不加入 box 的计算
        var xArr = [x1, x3];
        var yArr = [y1, y3];
        if (xExtrema !== undefined) {
            xArr.push(quadraticAt(x1, x2, x3, xExtrema));
        }
        if (yExtrema !== undefined) {
            yArr.push(quadraticAt(y1, y2, y3, yExtrema));
        }
        return util_1.getBBoxByArray(xArr, yArr);
    },
    length: function (x1, y1, x2, y2, x3, y3) {
        return quadraticLength(x1, y1, x2, y2, x3, y3, 3);
    },
    nearestPoint: function (x1, y1, x2, y2, x3, y3, x0, y0) {
        return bezier_1.nearestPoint([x1, x2, x3], [y1, y2, y3], x0, y0, quadraticAt);
    },
    pointDistance: function (x1, y1, x2, y2, x3, y3, x0, y0) {
        var point = this.nearestPoint(x1, y1, x2, y2, x3, y3, x0, y0);
        return util_1.distance(point.x, point.y, x0, y0);
    },
    interpolationAt: quadraticAt,
    pointAt: function (x1, y1, x2, y2, x3, y3, t) {
        return {
            x: quadraticAt(x1, x2, x3, t),
            y: quadraticAt(y1, y2, y3, t),
        };
    },
    divide: function (x1, y1, x2, y2, x3, y3, t) {
        return divideQuadratic(x1, y1, x2, y2, x3, y3, t);
    },
    tangentAngle: function (x1, y1, x2, y2, x3, y3, t) {
        var dx = derivativeAt(x1, x2, x3, t);
        var dy = derivativeAt(y1, y2, y3, t);
        var angle = Math.atan2(dy, dx);
        return util_1.piMod(angle);
    },
};
//# sourceMappingURL=quadratic.js.map
}, function(modId) { var map = {"./line":1727074728153,"./util":1727074728154,"./bezier":1727074728155}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728153, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var vec2 = require("gl-matrix/vec2");
exports.default = {
    /**
     * 计算线段的包围盒
     * @param {number} x1 起始点 x
     * @param {number} y1 起始点 y
     * @param {number} x2 结束点 x
     * @param {number} y2 结束点 y
     * @return {object} 包围盒对象
     */
    box: function (x1, y1, x2, y2) {
        return util_1.getBBoxByArray([x1, x2], [y1, y2]);
    },
    /**
     * 线段的长度
     * @param {number} x1 起始点 x
     * @param {number} y1 起始点 y
     * @param {number} x2 结束点 x
     * @param {number} y2 结束点 y
     * @return {number} 距离
     */
    length: function (x1, y1, x2, y2) {
        return util_1.distance(x1, y1, x2, y2);
    },
    /**
     * 根据比例获取点
     * @param {number} x1 起始点 x
     * @param {number} y1 起始点 y
     * @param {number} x2 结束点 x
     * @param {number} y2 结束点 y
     * @param {number} t 指定比例
     * @return {object} 包含 x, y 的点
     */
    pointAt: function (x1, y1, x2, y2, t) {
        return {
            x: (1 - t) * x1 + t * x2,
            y: (1 - t) * y1 + t * y2,
        };
    },
    /**
     * 点到线段的距离
     * @param {number} x1 起始点 x
     * @param {number} y1 起始点 y
     * @param {number} x2 结束点 x
     * @param {number} y2 结束点 y
     * @param {number} x  测试点 x
     * @param {number} y  测试点 y
     * @return {number} 距离
     */
    pointDistance: function (x1, y1, x2, y2, x, y) {
        // 投影距离 x1, y1 的向量，假设 p, p1, p2 三个点，投影点为 a
        // p1a = p1p.p1p2/|p1p2| * (p1p 的单位向量)
        var cross = (x2 - x1) * (x - x1) + (y2 - y1) * (y - y1);
        if (cross < 0) {
            return util_1.distance(x1, y1, x, y);
        }
        var lengthSquare = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        if (cross > lengthSquare) {
            return util_1.distance(x2, y2, x, y);
        }
        return this.pointToLine(x1, y1, x2, y2, x, y);
    },
    /**
     * 点到直线的距离，而不是点到线段的距离
     * @param {number} x1 起始点 x
     * @param {number} y1 起始点 y
     * @param {number} x2 结束点 x
     * @param {number} y2 结束点 y
     * @param {number} x  测试点 x
     * @param {number} y  测试点 y
     * @return {number} 距离
     */
    pointToLine: function (x1, y1, x2, y2, x, y) {
        var d = [x2 - x1, y2 - y1];
        // 如果端点相等，则判定点到点的距离
        if (vec2.exactEquals(d, [0, 0])) {
            return Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
        }
        var u = [-d[1], d[0]];
        vec2.normalize(u, u);
        var a = [x - x1, y - y1];
        return Math.abs(vec2.dot(a, u));
    },
    /**
     * 线段的角度
     * @param {number} x1 起始点 x
     * @param {number} y1 起始点 y
     * @param {number} x2 结束点 x
     * @param {number} y2 结束点 y
     * @return {number} 导数
     */
    tangentAngle: function (x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    },
};
//# sourceMappingURL=line.js.map
}, function(modId) { var map = {"./util":1727074728154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728154, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.piMod = exports.getBBoxRange = exports.getBBoxByArray = exports.isNumberEqual = exports.distance = void 0;
var util_1 = require("@antv/util");
/**
 * 两点之间的距离
 * @param {number} x1 起始点 x
 * @param {number} y1 起始点 y
 * @param {number} x2 结束点 x
 * @param {number} y2 结束点 y
 * @return {number} 距离
 */
function distance(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}
exports.distance = distance;
function isNumberEqual(v1, v2) {
    return Math.abs(v1 - v2) < 0.001;
}
exports.isNumberEqual = isNumberEqual;
function getBBoxByArray(xArr, yArr) {
    var minX = util_1.min(xArr);
    var minY = util_1.min(yArr);
    var maxX = util_1.max(xArr);
    var maxY = util_1.max(yArr);
    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
    };
}
exports.getBBoxByArray = getBBoxByArray;
function getBBoxRange(x1, y1, x2, y2) {
    return {
        minX: util_1.min([x1, x2]),
        maxX: util_1.max([x1, x2]),
        minY: util_1.min([y1, y2]),
        maxY: util_1.max([y1, y2]),
    };
}
exports.getBBoxRange = getBBoxRange;
function piMod(angle) {
    return (angle + Math.PI * 2) % (Math.PI * 2);
}
exports.piMod = piMod;
//# sourceMappingURL=util.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728155, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.snapLength = exports.nearestPoint = void 0;
var util_1 = require("./util");
var EPSILON = 0.0001;
/**
 * 使用牛顿切割法求最近的点
 * @param {number[]} xArr      点的 x 数组
 * @param {number[]} yArr      点的 y 数组
 * @param {number}   x         指定的点 x
 * @param {number}   y         指定的点 y
 * @param {Function} tCallback 差值函数
 */
function nearestPoint(xArr, yArr, x, y, tCallback, length) {
    var t;
    var d = Infinity;
    var v0 = [x, y];
    var segNum = 20;
    if (length && length > 200) {
        segNum = length / 10;
    }
    var increaseRate = 1 / segNum;
    var interval = increaseRate / 10;
    for (var i = 0; i <= segNum; i++) {
        var _t = i * increaseRate;
        var v1 = [tCallback.apply(null, xArr.concat([_t])), tCallback.apply(null, yArr.concat([_t]))];
        var d1 = util_1.distance(v0[0], v0[1], v1[0], v1[1]);
        if (d1 < d) {
            t = _t;
            d = d1;
        }
    }
    // 提前终止
    if (t === 0) {
        return {
            x: xArr[0],
            y: yArr[0],
        };
    }
    if (t === 1) {
        var count = xArr.length;
        return {
            x: xArr[count - 1],
            y: yArr[count - 1],
        };
    }
    d = Infinity;
    for (var i = 0; i < 32; i++) {
        if (interval < EPSILON) {
            break;
        }
        var prev = t - interval;
        var next = t + interval;
        var v1 = [tCallback.apply(null, xArr.concat([prev])), tCallback.apply(null, yArr.concat([prev]))];
        var d1 = util_1.distance(v0[0], v0[1], v1[0], v1[1]);
        if (prev >= 0 && d1 < d) {
            t = prev;
            d = d1;
        }
        else {
            var v2 = [tCallback.apply(null, xArr.concat([next])), tCallback.apply(null, yArr.concat([next]))];
            var d2 = util_1.distance(v0[0], v0[1], v2[0], v2[1]);
            if (next <= 1 && d2 < d) {
                t = next;
                d = d2;
            }
            else {
                interval *= 0.5;
            }
        }
    }
    return {
        x: tCallback.apply(null, xArr.concat([t])),
        y: tCallback.apply(null, yArr.concat([t])),
    };
}
exports.nearestPoint = nearestPoint;
// 近似求解 https://community.khronos.org/t/3d-cubic-bezier-segment-length/62363/2
function snapLength(xArr, yArr) {
    var totalLength = 0;
    var count = xArr.length;
    for (var i = 0; i < count; i++) {
        var x = xArr[i];
        var y = yArr[i];
        var nextX = xArr[(i + 1) % count];
        var nextY = yArr[(i + 1) % count];
        totalLength += util_1.distance(x, y, nextX, nextY);
    }
    return totalLength / 2;
}
exports.snapLength = snapLength;
//# sourceMappingURL=bezier.js.map
}, function(modId) { var map = {"./util":1727074728154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728156, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var line_1 = require("./line");
var bezier_1 = require("./bezier");
function cubicAt(p0, p1, p2, p3, t) {
    var onet = 1 - t; // t * t * t 的性能大概是 Math.pow(t, 3) 的三倍
    return onet * onet * onet * p0 + 3 * p1 * t * onet * onet + 3 * p2 * t * t * onet + p3 * t * t * t;
}
function derivativeAt(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return 3 * (onet * onet * (p1 - p0) + 2 * onet * t * (p2 - p1) + t * t * (p3 - p2));
}
function extrema(p0, p1, p2, p3) {
    var a = -3 * p0 + 9 * p1 - 9 * p2 + 3 * p3;
    var b = 6 * p0 - 12 * p1 + 6 * p2;
    var c = 3 * p1 - 3 * p0;
    var extremas = [];
    var t1;
    var t2;
    var discSqrt;
    if (util_1.isNumberEqual(a, 0)) {
        if (!util_1.isNumberEqual(b, 0)) {
            t1 = -c / b;
            if (t1 >= 0 && t1 <= 1) {
                extremas.push(t1);
            }
        }
    }
    else {
        var disc = b * b - 4 * a * c;
        if (util_1.isNumberEqual(disc, 0)) {
            extremas.push(-b / (2 * a));
        }
        else if (disc > 0) {
            discSqrt = Math.sqrt(disc);
            t1 = (-b + discSqrt) / (2 * a);
            t2 = (-b - discSqrt) / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                extremas.push(t1);
            }
            if (t2 >= 0 && t2 <= 1) {
                extremas.push(t2);
            }
        }
    }
    return extremas;
}
// 分割贝塞尔曲线
function divideCubic(x1, y1, x2, y2, x3, y3, x4, y4, t) {
    // 划分点
    var xt = cubicAt(x1, x2, x3, x4, t);
    var yt = cubicAt(y1, y2, y3, y4, t);
    // 计算两点之间的差值点
    var c1 = line_1.default.pointAt(x1, y1, x2, y2, t);
    var c2 = line_1.default.pointAt(x2, y2, x3, y3, t);
    var c3 = line_1.default.pointAt(x3, y3, x4, y4, t);
    var c12 = line_1.default.pointAt(c1.x, c1.y, c2.x, c2.y, t);
    var c23 = line_1.default.pointAt(c2.x, c2.y, c3.x, c3.y, t);
    return [
        [x1, y1, c1.x, c1.y, c12.x, c12.y, xt, yt],
        [xt, yt, c23.x, c23.y, c3.x, c3.y, x4, y4],
    ];
}
// 使用迭代法取贝塞尔曲线的长度，二阶和三阶分开写，更清晰和便于调试
function cubicLength(x1, y1, x2, y2, x3, y3, x4, y4, iterationCount) {
    if (iterationCount === 0) {
        return bezier_1.snapLength([x1, x2, x3, x4], [y1, y2, y3, y4]);
    }
    var cubics = divideCubic(x1, y1, x2, y2, x3, y3, x4, y4, 0.5);
    var left = cubics[0];
    var right = cubics[1];
    left.push(iterationCount - 1);
    right.push(iterationCount - 1);
    return cubicLength.apply(null, left) + cubicLength.apply(null, right);
}
exports.default = {
    extrema: extrema,
    box: function (x1, y1, x2, y2, x3, y3, x4, y4) {
        var xArr = [x1, x4];
        var yArr = [y1, y4];
        var xExtrema = extrema(x1, x2, x3, x4);
        var yExtrema = extrema(y1, y2, y3, y4);
        for (var i = 0; i < xExtrema.length; i++) {
            xArr.push(cubicAt(x1, x2, x3, x4, xExtrema[i]));
        }
        for (var i = 0; i < yExtrema.length; i++) {
            yArr.push(cubicAt(y1, y2, y3, y4, yExtrema[i]));
        }
        return util_1.getBBoxByArray(xArr, yArr);
    },
    length: function (x1, y1, x2, y2, x3, y3, x4, y4) {
        // 迭代三次，划分成 8 段求长度
        return cubicLength(x1, y1, x2, y2, x3, y3, x4, y4, 3);
    },
    nearestPoint: function (x1, y1, x2, y2, x3, y3, x4, y4, x0, y0, length) {
        return bezier_1.nearestPoint([x1, x2, x3, x4], [y1, y2, y3, y4], x0, y0, cubicAt, length);
    },
    pointDistance: function (x1, y1, x2, y2, x3, y3, x4, y4, x0, y0, length) {
        var point = this.nearestPoint(x1, y1, x2, y2, x3, y3, x4, y4, x0, y0, length);
        return util_1.distance(point.x, point.y, x0, y0);
    },
    interpolationAt: cubicAt,
    pointAt: function (x1, y1, x2, y2, x3, y3, x4, y4, t) {
        return {
            x: cubicAt(x1, x2, x3, x4, t),
            y: cubicAt(y1, y2, y3, y4, t),
        };
    },
    divide: function (x1, y1, x2, y2, x3, y3, x4, y4, t) {
        return divideCubic(x1, y1, x2, y2, x3, y3, x4, y4, t);
    },
    tangentAngle: function (x1, y1, x2, y2, x3, y3, x4, y4, t) {
        var dx = derivativeAt(x1, x2, x3, x4, t);
        var dy = derivativeAt(y1, y2, y3, y4, t);
        return util_1.piMod(Math.atan2(dy, dx));
    },
};
//# sourceMappingURL=cubic.js.map
}, function(modId) { var map = {"./util":1727074728154,"./line":1727074728153,"./bezier":1727074728155}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728157, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var ellipse_1 = require("./ellipse");
// 偏导数 x
function derivativeXAt(cx, cy, rx, ry, xRotation, startAngle, endAngle, angle) {
    return -1 * rx * Math.cos(xRotation) * Math.sin(angle) - ry * Math.sin(xRotation) * Math.cos(angle);
}
// 偏导数 y
function derivativeYAt(cx, cy, rx, ry, xRotation, startAngle, endAngle, angle) {
    return -1 * rx * Math.sin(xRotation) * Math.sin(angle) + ry * Math.cos(xRotation) * Math.cos(angle);
}
// x 的极值
function xExtrema(rx, ry, xRotation) {
    return Math.atan((-ry / rx) * Math.tan(xRotation));
}
// y 的极值
function yExtrema(rx, ry, xRotation) {
    return Math.atan(ry / (rx * Math.tan(xRotation)));
}
// 根据角度求 x 坐标
function xAt(cx, cy, rx, ry, xRotation, angle) {
    return rx * Math.cos(xRotation) * Math.cos(angle) - ry * Math.sin(xRotation) * Math.sin(angle) + cx;
}
// 根据角度求 y 坐标
function yAt(cx, cy, rx, ry, xRotation, angle) {
    return rx * Math.sin(xRotation) * Math.cos(angle) + ry * Math.cos(xRotation) * Math.sin(angle) + cy;
}
// 获取点在椭圆上的角度
function getAngle(rx, ry, x0, y0) {
    var angle = Math.atan2(y0 * rx, x0 * ry);
    // 转换到 0 - 2PI 内
    return (angle + Math.PI * 2) % (Math.PI * 2);
}
// 根据角度获取，x,y
function getPoint(rx, ry, angle) {
    return {
        x: rx * Math.cos(angle),
        y: ry * Math.sin(angle),
    };
}
// 旋转
function rotate(x, y, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    return [x * cos - y * sin, x * sin + y * cos];
}
exports.default = {
    /**
     * 计算包围盒
     * @param {number} cx         圆心 x
     * @param {number} cy         圆心 y
     * @param {number} rx         x 轴方向的半径
     * @param {number} ry         y 轴方向的半径
     * @param {number} xRotation  旋转角度
     * @param {number} startAngle 起始角度
     * @param {number} endAngle   结束角度
     * @return {object} 包围盒对象
     */
    box: function (cx, cy, rx, ry, xRotation, startAngle, endAngle) {
        var xDim = xExtrema(rx, ry, xRotation);
        var minX = Infinity;
        var maxX = -Infinity;
        var xs = [startAngle, endAngle];
        for (var i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
            var xAngle = xDim + i;
            if (startAngle < endAngle) {
                if (startAngle < xAngle && xAngle < endAngle) {
                    xs.push(xAngle);
                }
            }
            else {
                if (endAngle < xAngle && xAngle < startAngle) {
                    xs.push(xAngle);
                }
            }
        }
        for (var i = 0; i < xs.length; i++) {
            var x = xAt(cx, cy, rx, ry, xRotation, xs[i]);
            if (x < minX) {
                minX = x;
            }
            if (x > maxX) {
                maxX = x;
            }
        }
        var yDim = yExtrema(rx, ry, xRotation);
        var minY = Infinity;
        var maxY = -Infinity;
        var ys = [startAngle, endAngle];
        for (var i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
            var yAngle = yDim + i;
            if (startAngle < endAngle) {
                if (startAngle < yAngle && yAngle < endAngle) {
                    ys.push(yAngle);
                }
            }
            else {
                if (endAngle < yAngle && yAngle < startAngle) {
                    ys.push(yAngle);
                }
            }
        }
        for (var i = 0; i < ys.length; i++) {
            var y = yAt(cx, cy, rx, ry, xRotation, ys[i]);
            if (y < minY) {
                minY = y;
            }
            if (y > maxY) {
                maxY = y;
            }
        }
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
        };
    },
    /**
     * 获取圆弧的长度，计算圆弧长度时不考虑旋转角度，
     * 仅跟 rx, ry, startAngle, endAngle 相关
     * @param {number} cx         圆心 x
     * @param {number} cy         圆心 y
     * @param {number} rx         x 轴方向的半径
     * @param {number} ry         y 轴方向的半径
     * @param {number} xRotation  旋转角度
     * @param {number} startAngle 起始角度
     * @param {number} endAngle   结束角度
     */
    length: function (cx, cy, rx, ry, xRotation, startAngle, endAngle) { },
    /**
     * 获取指定点到圆弧的最近距离的点
     * @param {number} cx         圆心 x
     * @param {number} cy         圆心 y
     * @param {number} rx         x 轴方向的半径
     * @param {number} ry         y 轴方向的半径
     * @param {number} xRotation  旋转角度
     * @param {number} startAngle 起始角度
     * @param {number} endAngle   结束角度
     * @param {number} x0         指定点的 x
     * @param {number} y0         指定点的 y
     * @return {object} 到指定点最近距离的点
     */
    nearestPoint: function (cx, cy, rx, ry, xRotation, startAngle, endAngle, x0, y0) {
        // 将最近距离问题转换成到椭圆中心 0,0 没有旋转的椭圆问题
        var relativeVector = rotate(x0 - cx, y0 - cy, -xRotation);
        var x1 = relativeVector[0], y1 = relativeVector[1];
        // 计算点到椭圆的最近的点
        var relativePoint = ellipse_1.default.nearestPoint(0, 0, rx, ry, x1, y1);
        // 获取点在椭圆上的角度
        var angle = getAngle(rx, ry, relativePoint.x, relativePoint.y);
        // 点没有在圆弧上
        if (angle < startAngle) {
            // 小于起始圆弧
            relativePoint = getPoint(rx, ry, startAngle);
        }
        else if (angle > endAngle) {
            // 大于结束圆弧
            relativePoint = getPoint(rx, ry, endAngle);
        }
        // 旋转到 xRotation 的角度
        var vector = rotate(relativePoint.x, relativePoint.y, xRotation);
        return {
            x: vector[0] + cx,
            y: vector[1] + cy,
        };
    },
    pointDistance: function (cx, cy, rx, ry, xRotation, startAngle, endAngle, x0, y0) {
        var nearestPoint = this.nearestPoint(cx, cy, rx, ry, x0, y0);
        return util_1.distance(nearestPoint.x, nearestPoint.y, x0, y0);
    },
    pointAt: function (cx, cy, rx, ry, xRotation, startAngle, endAngle, t) {
        var angle = (endAngle - startAngle) * t + startAngle;
        return {
            x: xAt(cx, cy, rx, ry, xRotation, angle),
            y: yAt(cx, cy, rx, ry, xRotation, angle),
        };
    },
    tangentAngle: function (cx, cy, rx, ry, xRotation, startAngle, endAngle, t) {
        var angle = (endAngle - startAngle) * t + startAngle;
        var dx = derivativeXAt(cx, cy, rx, ry, xRotation, startAngle, endAngle, angle);
        var dy = derivativeYAt(cx, cy, rx, ry, xRotation, startAngle, endAngle, angle);
        return util_1.piMod(Math.atan2(dy, dx));
    },
};
//# sourceMappingURL=arc.js.map
}, function(modId) { var map = {"./util":1727074728154,"./ellipse":1727074728158}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728158, function(require, module, exports) {

/**
 * @fileoverview 椭圆的一些计算，
 *  - 周长计算参考：https://www.mathsisfun.com/geometry/ellipse-perimeter.html
 *  - 距离计算参考：https://wet-robots.ghost.io/simple-method-for-distance-to-ellipse/
 * @author dxq613@gmail.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
function copysign(v1, v2) {
    var absv = Math.abs(v1);
    return v2 > 0 ? absv : absv * -1;
}
exports.default = {
    /**
     * 包围盒计算
     * @param {number} x  椭圆中心 x
     * @param {number} y  椭圆中心 y
     * @param {number} rx 椭圆 x 方向半径
     * @param {number} ry 椭圆 y 方向半径
     * @return {object} 包围盒
     */
    box: function (x, y, rx, ry) {
        return {
            x: x - rx,
            y: y - ry,
            width: rx * 2,
            height: ry * 2,
        };
    },
    /**
     * 计算周长，使用近似法
     * @param {number} x  椭圆中心 x
     * @param {number} y  椭圆中心 y
     * @param {number} rx 椭圆 x 方向半径
     * @param {number} ry 椭圆 y 方向半径
     * @return {number} 椭圆周长
     */
    length: function (x, y, rx, ry) {
        return Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
    },
    /**
     * 距离椭圆最近的点
     * @param {number} x  椭圆中心 x
     * @param {number} y  椭圆中心 y
     * @param {number} rx 椭圆 x 方向半径
     * @param {number} ry 椭圆 y 方向半径
     * @param {number} x0  指定的点 x
     * @param {number} y0  指定的点 y
     * @return {object} 椭圆上距离指定点最近的点
     */
    nearestPoint: function (x, y, rx, ry, x0, y0) {
        var a = rx;
        var b = ry;
        // 假如椭圆半径为0则返回圆心
        if (a === 0 || b === 0) {
            return {
                x: x,
                y: y,
            };
        }
        // 转换成 0， 0 为中心的椭圆计算
        var relativeX = x0 - x;
        var relativeY = y0 - y;
        var px = Math.abs(relativeX);
        var py = Math.abs(relativeY);
        var squareA = a * a;
        var squareB = b * b;
        // const angle0 = Math.atan2(relativeY, relativeX);
        var t = Math.PI / 4;
        var nearestX; // 椭圆上的任一点
        var nearestY;
        // 迭代 4 次
        for (var i = 0; i < 4; i++) {
            nearestX = a * Math.cos(t);
            nearestY = b * Math.sin(t);
            var ex = ((squareA - squareB) * Math.pow(Math.cos(t), 3)) / a;
            var ey = ((squareB - squareA) * Math.pow(Math.sin(t), 3)) / b;
            var rx1 = nearestX - ex;
            var ry1 = nearestY - ey;
            var qx = px - ex;
            var qy = py - ey;
            var r = Math.hypot(ry1, rx1);
            var q = Math.hypot(qy, qx);
            var delta_c = r * Math.asin((rx1 * qy - ry1 * qx) / (r * q));
            var delta_t = delta_c / Math.sqrt(squareA + squareB - nearestX * nearestX - nearestY * nearestY);
            t += delta_t;
            t = Math.min(Math.PI / 2, Math.max(0, t));
        }
        return {
            x: x + copysign(nearestX, relativeX),
            y: y + copysign(nearestY, relativeY),
        };
    },
    /**
     * 点到椭圆最近的距离
     * @param {number} x  椭圆中心 x
     * @param {number} y  椭圆中心 y
     * @param {number} rx 椭圆 x 方向半径
     * @param {number} ry 椭圆 y 方向半径
     * @param {number} x0  指定的点 x
     * @param {number} y0  指定的点 y
     * @return {number} 点到椭圆的距离
     */
    pointDistance: function (x, y, rx, ry, x0, y0) {
        var nearestPoint = this.nearestPoint(x, y, rx, ry, x0, y0);
        return util_1.distance(nearestPoint.x, nearestPoint.y, x0, y0);
    },
    /**
     * 根据比例获取点
     * @param {number} x 椭圆中心 x
     * @param {number} y 椭圆中心 y
     * @param {number} rx 椭圆 x 方向半径
     * @param {number} ry 椭圆 y 方向半径
     * @param {number} t 指定比例，x轴方向为 0
     * @return {object} 点
     */
    pointAt: function (x, y, rx, ry, t) {
        var angle = 2 * Math.PI * t; // 按照角度进行计算，而不按照周长计算
        return {
            x: x + rx * Math.cos(angle),
            y: y + ry * Math.sin(angle),
        };
    },
    /**
     * 根据比例计算切线角度
     * @param {number} x 椭圆中心 x
     * @param {number} y 椭圆中心 y
     * @param {number} rx 椭圆 x 方向半径
     * @param {number} ry 椭圆 y 方向半径
     * @param {number} t 指定比例 0 - 1 之间，x轴方向为 0。在 0-1 范围之外是循环还是返回 null，还需要调整
     * @return {number} 角度，在 0 - 2PI 之间
     */
    tangentAngle: function (x, y, rx, ry, t) {
        var angle = 2 * Math.PI * t; // 按照角度进行计算，而不按照周长计算
        // 直接使用 x,y 的导数计算， x' = -rx * sin(t); y' = ry * cos(t);
        var tangentAngle = Math.atan2(ry * Math.cos(angle), -rx * Math.sin(angle));
        // 也可以使用指定点的切线方程计算，成本有些高
        // const point = this.pointAt(0, 0, rx, ry, t); // 椭圆的切线同椭圆的中心不相关
        // let tangentAngle = -1 * Math.atan((ry * ry * point.x) / (rx * rx * point.y));
        // if (angle >= 0 && angle <= Math.PI) {
        //   tangentAngle += Math.PI;
        // }
        return util_1.piMod(tangentAngle);
    },
};
//# sourceMappingURL=ellipse.js.map
}, function(modId) { var map = {"./util":1727074728154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728159, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var segments_1 = require("./segments");
var polyline_1 = require("./polyline");
function getAllPoints(points) {
    var tmp = points.slice(0);
    if (points.length) {
        tmp.push(points[0]);
    }
    return tmp;
}
exports.default = {
    /**
     * 计算多边形的包围盒
     * @param {array} points 点的集合 [x,y] 的形式
     * @return {object} 包围盒
     */
    box: function (points) {
        return polyline_1.default.box(points);
    },
    /**
     * 计算多边形的长度
     * @param {array} points 点的集合 [x,y] 的形式
     * @return {object} 多边形边的长度
     */
    length: function (points) {
        return segments_1.lengthOfSegment(getAllPoints(points));
    },
    /**
     * 根据比例获取多边形的点
     * @param {array} points 点的集合 [x,y] 的形式
     * @param {number} t 在多边形的长度上的比例
     * @return {object} 根据比例值计算出来的点
     */
    pointAt: function (points, t) {
        return segments_1.pointAtSegments(getAllPoints(points), t);
    },
    /**
     * 指定点到多边形的距离
     * @param {array} points 点的集合 [x,y] 的形式
     * @param {number} x 指定点的 x
     * @param {number} y 指定点的 y
     * @return {number} 点到多边形的距离
     */
    pointDistance: function (points, x, y) {
        return segments_1.distanceAtSegment(getAllPoints(points), x, y);
    },
    /**
     * 根据比例获取多边形的切线角度
     * @param {array} points 点的集合 [x,y] 的形式
     * @param {number} t 在多边形的长度上的比例
     * @return {object} 根据比例值计算出来的角度
     */
    tangentAngle: function (points, t) {
        return segments_1.angleAtSegments(getAllPoints(points), t);
    },
};
//# sourceMappingURL=polygon.js.map
}, function(modId) { var map = {"./segments":1727074728160,"./polyline":1727074728161}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728160, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceAtSegment = exports.angleAtSegments = exports.pointAtSegments = exports.lengthOfSegment = void 0;
var line_1 = require("./line");
var util_1 = require("./util");
function analyzePoints(points) {
    // 计算每段的长度和总的长度
    var totalLength = 0;
    var segments = [];
    for (var i = 0; i < points.length - 1; i++) {
        var from = points[i];
        var to = points[i + 1];
        var length_1 = util_1.distance(from[0], from[1], to[0], to[1]);
        var seg = {
            from: from,
            to: to,
            length: length_1,
        };
        segments.push(seg);
        totalLength += length_1;
    }
    return { segments: segments, totalLength: totalLength };
}
function lengthOfSegment(points) {
    if (points.length < 2) {
        return 0;
    }
    var totalLength = 0;
    for (var i = 0; i < points.length - 1; i++) {
        var from = points[i];
        var to = points[i + 1];
        totalLength += util_1.distance(from[0], from[1], to[0], to[1]);
    }
    return totalLength;
}
exports.lengthOfSegment = lengthOfSegment;
/**
 * 按照比例在数据片段中获取点
 * @param {array} points 点的集合
 * @param {number} t 百分比 0-1
 * @return {object} 点的坐标
 */
function pointAtSegments(points, t) {
    // 边界判断
    if (t > 1 || t < 0 || points.length < 2) {
        return null;
    }
    var _a = analyzePoints(points), segments = _a.segments, totalLength = _a.totalLength;
    // 多个点有可能重合
    if (totalLength === 0) {
        return {
            x: points[0][0],
            y: points[0][1],
        };
    }
    // 计算比例
    var startRatio = 0;
    var point = null;
    for (var i = 0; i < segments.length; i++) {
        var seg = segments[i];
        var from = seg.from, to = seg.to;
        var currentRatio = seg.length / totalLength;
        if (t >= startRatio && t <= startRatio + currentRatio) {
            var localRatio = (t - startRatio) / currentRatio;
            point = line_1.default.pointAt(from[0], from[1], to[0], to[1], localRatio);
            break;
        }
        startRatio += currentRatio;
    }
    return point;
}
exports.pointAtSegments = pointAtSegments;
/**
 * 按照比例在数据片段中获取切线的角度
 * @param {array} points 点的集合
 * @param {number} t 百分比 0-1
 */
function angleAtSegments(points, t) {
    // 边界判断
    if (t > 1 || t < 0 || points.length < 2) {
        return 0;
    }
    var _a = analyzePoints(points), segments = _a.segments, totalLength = _a.totalLength;
    // 计算比例
    var startRatio = 0;
    var angle = 0;
    for (var i = 0; i < segments.length; i++) {
        var seg = segments[i];
        var from = seg.from, to = seg.to;
        var currentRatio = seg.length / totalLength;
        if (t >= startRatio && t <= startRatio + currentRatio) {
            angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
            break;
        }
        startRatio += currentRatio;
    }
    return angle;
}
exports.angleAtSegments = angleAtSegments;
function distanceAtSegment(points, x, y) {
    var minDistance = Infinity;
    for (var i = 0; i < points.length - 1; i++) {
        var point = points[i];
        var nextPoint = points[i + 1];
        var distance_1 = line_1.default.pointDistance(point[0], point[1], nextPoint[0], nextPoint[1], x, y);
        if (distance_1 < minDistance) {
            minDistance = distance_1;
        }
    }
    return minDistance;
}
exports.distanceAtSegment = distanceAtSegment;
//# sourceMappingURL=segments.js.map
}, function(modId) { var map = {"./line":1727074728153,"./util":1727074728154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1727074728161, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var segments_1 = require("./segments");
var util_1 = require("./util");
exports.default = {
    /**
     * 计算多折线的包围盒
     * @param {array} points 点的集合 [x,y] 的形式
     * @return {object} 包围盒
     */
    box: function (points) {
        var xArr = [];
        var yArr = [];
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            xArr.push(point[0]);
            yArr.push(point[1]);
        }
        return util_1.getBBoxByArray(xArr, yArr);
    },
    /**
     * 计算多折线的长度
     * @param {array} points 点的集合 [x,y] 的形式
     * @return {object} 多条边的长度
     */
    length: function (points) {
        return segments_1.lengthOfSegment(points);
    },
    /**
     * 根据比例获取多折线的点
     * @param {array} points 点的集合 [x,y] 的形式
     * @param {number} t 在多折线的长度上的比例
     * @return {object} 根据比例值计算出来的点
     */
    pointAt: function (points, t) {
        return segments_1.pointAtSegments(points, t);
    },
    /**
     * 指定点到多折线的距离
     * @param {array} points 点的集合 [x,y] 的形式
     * @param {number} x 指定点的 x
     * @param {number} y 指定点的 y
     * @return {number} 点到多折线的距离
     */
    pointDistance: function (points, x, y) {
        return segments_1.distanceAtSegment(points, x, y);
    },
    /**
     * 根据比例获取多折线的切线角度
     * @param {array} points 点的集合 [x,y] 的形式
     * @param {number} t 在多折线的长度上的比例
     * @return {object} 根据比例值计算出来的角度
     */
    tangentAngle: function (points, t) {
        return segments_1.angleAtSegments(points, t);
    },
};
//# sourceMappingURL=polyline.js.map
}, function(modId) { var map = {"./segments":1727074728160,"./util":1727074728154}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1727074728151);
})()
//miniprogram-npm-outsideDeps=["gl-matrix/vec2","@antv/util"]
//# sourceMappingURL=index.js.map
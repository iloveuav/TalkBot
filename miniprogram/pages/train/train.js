import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var raderOption = {
    title: {
      text: '学生就业分布'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      left: 'center',
      data: ['2019', '2020']
    },
    radar: [

      {
        indicator: [{
            text: '从事教师',
            max: 100
          },
          {
            text: '从事互联网',
            max: 100
          },
          {
            text: '从事公务员',
            max:100
          },
          {
            text: '从事外企',
            max: 100
          },
          {
            text: '考研',
            max: 100
          }
        ],
        radius: 80,
        center: ['50%', '45%'],
      },

    ],
    series: [
      {
        type: 'radar',
        radarIndex: 0,
        areaStyle: {},
        data: [{
            value: [75, 40, 20, 80, 40],
            name: '2019'
          },
          {
            value: [85, 80, 35, 40,20],
            name: '2020'
          }
        ]
      },
    ]
  };
  chart.setOption(raderOption);
  return chart;
}


function initCrossChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  let corssOption = {
    title: {
      text: '生源地:河北',

    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
     
      data: [ '文科', '理科']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '5%',
      right: '8%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['2018', '2019', '2020']
      }
    ],
    yAxis: [
      {
        
      }
    ],
    series: [
    
      {
        name: '文科',
        type: 'line',
    
        areaStyle: {},
        // areaStyle: {color:'#79DAFD'},
        data: [565, 545, 533],
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
      },
      {
        name: '理科',
        type: 'line',
   
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        areaStyle: {},
        data: [521, 516, 505]
      }
    ]
  };
  chart.setOption(corssOption);
  return chart;
}

Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    rader: {
      onInit: initChart
    },
    cross: {
      onInit: initCrossChart
    },


    
  },

  onReady() {}
});
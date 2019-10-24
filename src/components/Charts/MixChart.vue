<!--

<template>
  &lt;!&ndash;&lt;!&ndash;<div :id="id" :class="className" :style="{height:height,width:width}" />&ndash;&gt;&ndash;&gt;
  <div :id="id" :class="className" :style="{height:'800px',width:'1500px'}" />
  &lt;!&ndash;&lt;!&ndash;<div :id="id" :class="className" style="{width:'100%',height: '100%'}" />&ndash;&gt;&ndash;&gt;
  &lt;!&ndash;<div id='chart' class='chart' style='width:100% ;height:100%'></div>&ndash;&gt;
  &lt;!&ndash;&lt;!&ndash;<div :id="id" :class="className" :style="{width:'100%',height: '100%'}" />&ndash;&gt;&ndash;&gt;
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '800px'
    },
    height: {
      type: String,
      default: '800px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      // X轴坐标
      this.chart = echarts.init(document.getElementById(this.id))
      const xData = (function() {
        const data = []
        for (let i = 0; i < 24; i++) {
          if (i < 10) {
            data.push('0' + i + ':00')
          } else {
            data.push(i + ':00')
          }
        }
        return data
      }())
      // 标题
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '在线统计',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          }
        },
        // 鼠标放上去的提示
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        // 布局
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        // 左上角图例
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['柱状图', '折线图']
        },
        calculable: true,
        // X轴
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        // Y轴
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        // 下面的拖动条
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'
          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: '柱状图',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            327,
            1776,
            507,
            1200,
            800,
            482,
            204,
            1390,
            1001,
            951,
            381,
            220
          ]
        },
        {
          name: '折线图',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            1036,
            3693,
            2962,
            3810,
            2519,
            1915,
            1748,
            4675,
            6209,
            4323,
            2865,
            4298
          ]
        }
        ]
      })
    }
  }
}
</script>

-->

<template>
  <!--<div :id="id" :class="className" :style="{height:height,width:width}" />-->
  <!--<div :id="id" :class="className" :style="{height:'800px',width:'1500px'}" />-->
  <!--&lt;!&ndash;<div :id="id" :class="className" style="{width:'100%',height: '100%'}" />&ndash;&gt;-->
  <div id='chart' class='chart' style='width:1600% ;height:800%'></div>
  <!--&lt;!&ndash;<div :id="id" :class="className" :style="{width:'100%',height: '100%'}" />&ndash;&gt;-->
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { getAlarmInfo, getbarListInfo } from '../../api/alarm'

export default {
  data() {
    return {
      data: [],
      chart: null,
      lineList: [],
      barList: [],
      listLoading: true,
      testnum: ''
    }
  },
  created() {
    this.fetchData()
    this.testnum = 666
  },
  computed: {
    'tableList': function() {
      return this.list.filter(item => {
        return true
      })
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAlarmInfo().then(response => {
        this.lineList = response.data
      })
      this.listLoading = true
    },
    initChart() {
      // X轴坐标
      this.chart = echarts.init(document.getElementById('chart'))
      const xData = (function() {
        const data = []
        for (let i = 0; i < 24; i++) {
          if (i < 10) {
            data.push('0' + i + ':00')
          } else {
            data.push(i + ':00')
          }
        }
        return data
      }())
      // 标题
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '在线统计',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          }
        },
        // 鼠标放上去的提示
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        // 布局
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        // 左上角图例
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['柱状图', '折线图']
        },
        calculable: true,
        // X轴
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        // Y轴
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        // 下面的拖动条
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'
          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: '柱状图',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            this.testnum,
            1776,
            507,
            1200,
            800,
            482,
            204,
            1390,
            1001,
            951,
            381,
            1220
          ]
        },
        {
          name: '折线图',
          type: 'line',
          stack: 'total',
          symbolSize: 10,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            1036,
            3693,
            2962,
            3810,
            2519,
            1915,
            1748,
            4675,
            6209,
            4323,
            2865,
            4298
          ]
        }
        ]
      })
    }
  }
}
</script>


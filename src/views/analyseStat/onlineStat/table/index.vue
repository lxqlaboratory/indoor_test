<template>
  <div class="app-container">
    <el-container style="height: 100%;min-height:800px;" direction="vertical">
      <el-tabs type="border-card">
        <!--<el-tab-pane label="表格">-->
        <!--<el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">-->
        <!--&lt;!&ndash;选择日&ndash;&gt;-->
        <!--<div class="block" style="width:250px; padding-bottom: 10px; float: left;">-->
        <!--<el-date-picker-->
        <!--v-model="day"-->
        <!--type="date"-->
        <!--placeholder="选择日期"-->
        <!--/>-->
        <!--</div>-->
        <!--&lt;!&ndash;搜索框&ndash;&gt;-->
        <!--<div style="width:250px; padding-bottom: 10px; float: left;">-->
        <!--<el-input-->
        <!--v-model="filterText"-->
        <!--placeholder="输入编号/名称"-->
        <!--&gt;-->
        <!--<el-button slot="append" icon="el-icon-refresh" />-->
        <!--</el-input>-->
        <!--</div>-->
        <!--<div style="width:50px; padding-bottom: 10px; float: left;" />-->
        <!--<el-button type="primary" icon="el-icon-search">搜索</el-button>-->
        <!--</el-header>-->
        <!--&lt;!&ndash;表格&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table&ndash;&gt;-->
        <!--&lt;!&ndash;:data="tableData"&ndash;&gt;-->
        <!--&lt;!&ndash;border&ndash;&gt;-->
        <!--&lt;!&ndash;style="width: 100%"&ndash;&gt;-->
        <!--&lt;!&ndash;&gt;&ndash;&gt;-->
        <!--<el-table-->
        <!--:data="data.slice((currentPage-1)*pagesize,currentPage*pagesize)"-->
        <!--stripe-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
        <!--fixed-->
        <!--prop="name"-->
        <!--label="名称"-->
        <!--width="150"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--fixed-->
        <!--prop="no"-->
        <!--label="设备号"-->
        <!--width="150"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="0"-->
        <!--label="00:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="1"-->
        <!--label="01:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="2"-->
        <!--label="02:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="3"-->
        <!--label="03:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="4"-->
        <!--label="04:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="5"-->
        <!--label="05:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="6"-->
        <!--label="06:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="7"-->
        <!--label="07:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="8"-->
        <!--label="08:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="9"-->
        <!--label="09:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="10"-->
        <!--label="10:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="11"-->
        <!--label="11:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="12"-->
        <!--label="12:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="13"-->
        <!--label="13:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="14"-->
        <!--label="14:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="15"-->
        <!--label="15:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="16"-->
        <!--label="16:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="17"-->
        <!--label="17:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="18"-->
        <!--label="18:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="19"-->
        <!--label="19:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="20"-->
        <!--label="20:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="21"-->
        <!--label="21:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="22"-->
        <!--label="22:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--<el-table-column-->
        <!--prop="23"-->
        <!--label="23:00"-->
        <!--width="120"-->
        <!--/>-->
        <!--</el-table>-->
        <!--&lt;!&ndash;分页&ndash;&gt;-->
        <!--<div class="block" style="float: right">-->
        <!--<el-pagination-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage"-->
        <!--:page-sizes="[10, 20, 50, 100]"-->
        <!--:page-size="pagesize"-->
        <!--layout="total, sizes, prev, pager, next, jumper"-->
        <!--:total="data.length">-->
        <!--</el-pagination>-->
        <!--</div>-->
        <!--</el-tab-pane>-->
        <el-tab-pane label="图表">
          <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">
            <div style="width:50px; padding-bottom: 10px; float: left;" />
            <el-button type="primary" icon="el-icon-refresh" @click="initChart">刷新</el-button>
            <el-button type="primary" icon="el-icon-download">保存为图片</el-button>
          </el-header>

          <div class="chart-container">
            <div id="chart" class="chart" style="width:100% ;height:800%" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-container>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getAlarmInfo } from '../../../../api/alarm'
export default {
  data() {
    return {
      data: [],
      chart: null,
      lineList: [],
      barList: [],
      listLoading: true
    }
  },
  computed: {
    'tableList': function() {
      return this.list.filter(item => {
        return true
      })
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    setTimeout(() => {
      this.initChart()
    }, 200)
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
    empty() {
      alert(this.lineList.length)
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
            this.lineList.length,
            this.lineList[0].alarmId,
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


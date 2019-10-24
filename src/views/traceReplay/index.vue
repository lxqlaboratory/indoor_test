<template xmlns:border-radius="">
  <div class="app-container">
    <el-container style="height: 100%;min-height:800px;" direction="vertical">
      <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: right; font-size: 12px">
        <div style="width:250px; padding-bottom: 10px; float: left;">
          <el-input
            v-model="filterText"
            placeholder="输入编号/名称"
            class="filterText"
            clearable
          >
            <el-button slot="append" icon="el-icon-refresh" @click=" empty" />
          </el-input>
        </div>
        <div style="width: 30px;float: left">  &nbsp;  </div>
        <div style="float: left">回放速度 :
          <el-select v-model="value" placeholder="请选择" @change="currentSel">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div style="width: 30px;float: left">  &nbsp;  </div>
        <div style="float: left">
          开始时间：
          <el-date-picker v-model="createDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" :picker-options="pickerOptionsStart" style="margin-right: 10px;" @change="startTimeStatus" />
          至
          <el-date-picker v-model="overDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" :picker-options="pickerOptionsEnd" style="margin-left: 10px;" @change="endTimeStatus" />
        </div>
        <div style="width: 100px;float: left">
          <el-button type="primary" icon="el-icon-view" circle @click="startTrace" />
        </div>
      </el-header>
      <el-container>

        <el-aside>
          <div class="el-table-filter">
            <el-tree
              ref="tree2"
              class="filter-tree"
              :data="data"
              border-radius:0px
              show-checkbox
              node-key="id"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              @node-click="handleNode"
            />
          </div>

        </el-aside>
        <el-main>
          <l-map style="height: 100%; width: 100%" :options="{zoomControl: false}" :crs="crs">
            <l-image-overlay
              :url="mapsource"
              :bounds="bounds"
              style="height: 900px; width: 100%"
            />
            <l-polyline
              :lat-lngs="polyline.latlngs"
              :color="polyline.color"
            />
            <l-marker
              :lat-lng="star"
            >
              <l-popup
                :content="'time:'+MarkerTime"
              />
            </l-marker>
          </l-map>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import L from 'leaflet'
import { getLocation } from '../../api/location'

export default {
  name: 'TraceReplay',
  data() {
    return {
      timer: null,
      options: [{
        value: '10',
        label: '1X'
      }, {
        value: '20',
        label: '2X'
      }, {
        value: '40',
        label: '4X'
      }],
      Interval: null,
      value: '',
      star: [-1000, -1000],
      createDate: '',
      overDate: '',
      MarkerTime: ' ',
      pickerOptionsStart: {
        disabledDate: time => {
          const endDateVal = this.overDate
          if (endDateVal) {
            return time.getTime() > new Date(endDateVal).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          const beginDateVal = this.createDate
          if (beginDateVal) {
            return (
              time.getTime() <
              new Date(beginDateVal).getTime()
            )
          }
        }
      },
      day: '',
      dialogVisible: false,
      selVal: '',
      mapsource: 'map.png',
      bounds: [[-300, -300], [600, 600]],
      crs: L.CRS.Simple,
      timestr: 0,
      zoom: 8,
      center: [47.413220, -1.319482],
      polyline: {
        latlngs: [[]],
        color: 'green'
      },
      list: [],
      stars: [],
      filterText: '',
      data: [{
        id: 1,
        label: '根节点',
        children: [{
          id: 2,
          label: 'TAG',
          children: [{
            id: 10004,
            label: '10004'
          }, {
            id: 11,
            label: '2513'
          }, {
            id: 12,
            label: '1000402598'
          }]
        }, {
          id: 3,
          label: 'SZTG',
          children: [{
            id: 20,
            label: '22354'
          }, {
            id: 21,
            label: '22468'
          }]
        }, {
          id: 4,
          label: '手环',
          children: [{
            id: '橙色手环',
            label: '橙色手环'
          }, {
            id: 31,
            label: '红色手环'
          }, {
            id: 32,
            label: '演示手环'
          }]
        }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    // this.fetchLocation()
  },
  mounted() {
    setTimeout(() => {
      console.log(this.stars, 'mounted')
    }, 2000)
  },
  methods: {
    startTimeStatus: function(value) {
      this.createDate = value
    },
    // 时间结束选择器
    endTimeStatus: function(value) {
      this.overDate = value
    },
    empty() {
      this.filterText = ''
    },

    fetchLocation() {
      getLocation({
        // startTime: '2019-06-24 12:00:00',
        // endTime: '2019-06-25 12:30:10',
        startTime: this.createDate,
        endTime: this.overDate,
        major: '10004',
        minor: '2504'
      }).then(response => {
        this.list = response.data
      })
    },
    end: function() {
      clearInterval(this.timer)
    },
    startTrace() {
      // alert(this.timer)
      this.fetchLocation()
      // alert(this.list[0].x)
      if (this.interval != null && this.timer === null) {
        this.timer = setInterval(this.trace, this.Interval)
      } else {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    trace() {
      const a = this.timestr
      for (this.timestr; this.timestr < this.list.length && this.timestr < a + 1; this.timestr++) {
        // 数组值变化并且重新渲染的方法
        this.$set(this.polyline.latlngs, this.timestr, [this.list[this.timestr].x, this.list[this.timestr].y])
        this.$set(this.star, 0, this.list[this.timestr].x)
        this.$set(this.star, 1, this.list[this.timestr].y)
        this.MarkerTime = this.list[this.timestr].time
      }
    },
    currentSel(selVal) {
      this.end()
      this.interval = selVal
      this.dialogVisible = true
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNode(data) {
      console.log(data.id)
    }
  }
}
</script>
<style>
  .el-table-filter {
    max-height: 700px;
    overflow: auto;
  }
</style>

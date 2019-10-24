<template>
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
        <div style="width: 250px;float: left">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="离线显示" />
            <el-checkbox label="多信息窗" />
          </el-checkbox-group>
        </div>
        <div style="width: 30px;float: left">  &nbsp;  </div>
        <div style="float: left" >刷新频率 :
          <el-select v-model="value" placeholder="请选择" @change="currentSel">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <!--<div style="width: 100px;float: left">-->
          <!--<el-button type="primary" icon="el-icon-view" circle @click="startTrace" />-->
        <!--</div>-->
        <div style="width: 100px;float: left">
          <el-button type="primary" icon="el-icon-view" circle @click=startFetch />
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <div class="el-table-filter">
            <el-tree
              ref="tree2"
              class="filter-tree"
              :data="data"
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
            <l-marker
              v-for="star in stars"
              :key="star.name"
              :lat-lng="star"
            >
              <l-popup
                :content="'mapid:'+star.name +
                  '<br>'+'battery:100'+'<br>'
                  +'status:safe'
                "
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
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'ReTrack',
  data() {
    return {
      timer: null,
      options: [{
        value: '1000',
        label: '1秒'
      }, {
        value: '2000',
        label: '2秒'
      }, {
        value: '5000',
        label: '5秒'
      }, {
        value: '10000',
        label: '10秒'
      }, {
        value: '20000',
        label: '20秒'
      }],
      value: '',
      // dialogVisible: false,
      selVal: '',
      mapsource: 'map.png',
      bounds: [[-300, -300], [600, 600]],
      crs: L.CRS.Simple,
      stars: [],
      checkList: [],
      filterText: '',
      data: [{
        id: 1,
        label: '根节点',
        children: [{
          id: 2,
          label: 'TAG',
          children: [{
            id: 2915,
            label: '2915'
          }, {
            id: 2997,
            label: '2997'
          }, {
            id: 3246,
            label: '3246'
          }, {
            id: 2993,
            label: '2993'
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

  },
  destroyed() {
    this.end
  },
  mounted() {
    setTimeout(() => {
      console.log(this.stars, 'mounted')
    }, 2000)
    // setInterval(this.fetchLocation, 1000)
  },
  methods: {

    // const myVar = setInterval(this.fetchLocation, time),
    empty() {
      this.filterText = ''
    },
    start: function(time) {
      this.timer = setInterval(this.fetchLocation, time)
    },
    end: function() {
      clearInterval(this.timer)
    },
    currentSel(selVal) {
      this.end()
      this.selVal = selVal
      this.timer = null
      // this.dialogVisible = true
      // this.start(selVal)
      // this.$options.methods.fetchLocation(selVal)
    },
    startFetch() {
      if (this.timer === null) {
        this.start(this.selVal)
      } else {
        this.end()
        this.timer = null
      }
    },
    fetchLocation() {
      var choosen = JSON.stringify(this.$refs.tree2.getCheckedKeys())
      var arr = choosen.substring(1, choosen.length - 1).split(',')
      console.log(arr, 'arr.contents')
      if (!this.checkList.includes('离线显示')) {
        return
      }
      const self = this
      axios.post('http://indoor.yunweizhi.net/index.php?r=loc/gettagpos',
        qs.stringify({
          'key': 'Ua8hA8SGKdLQTeaL2aJJ',
          'mapId': 'ntyg',
          'tags':
            [
              { 'major': 10004, 'minor': 2915 },
              { 'major': 10004, 'minor': 2997 },
              { 'major': 10004, 'minor': 3246 },
              { 'major': 10004, 'minor': 2993 }
            ]
        }))
        .then(function(response) {
          var ob1 = JSON.stringify(response.data)
          var json = JSON.parse(ob1)
          var data = JSON.parse(JSON.stringify(json.data))
          var tags = JSON.parse(JSON.stringify(data.tags))
          // if (!self.stars.includes({ name: tags[0].mapId, lng: tags[0].posX, lat: tags[0].posY })) {
          //   self.stars.push({ name: tags[0].mapId, lng: tags[0].posX, lat: tags[0].posY })
          // }
          var item = []
          for (var i = 0; i < tags.length; i++) {
            item.push({ name: tags[i].mapId, lng: tags[i].posX, lat: tags[i].posY })
          }
          self.stars = item
          console.log(self.stars.length, 'aaaaaaaaaaa')
        })
        .catch(function(error) {
          console.log(error)
        })
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
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .el-table-filter {
    max-height: 700px;
    overflow: auto;
  }
</style>

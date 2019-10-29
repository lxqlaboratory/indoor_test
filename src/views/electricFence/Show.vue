<template>
  <div class="app-container">
    <el-container style="height: 100%; min-height:800px;" direction="vertical">
      <el-container>
        <el-main>
          <l-map style="height: 100%; width: 100%" :options="{zoomControl: false}" :crs="crs" :center="center">
            <l-image-overlay
              :url="mapsource"
              :bounds="bounds"
              style="height: 900px; width: 100%"
            />
            <l-polygon
              :lat-lngs="polygon.latlngs"
              :color="polygon.color"
            />
            <l-marker
              v-for="marke in order"
              :key="marke.lng"
              :lat-lng="marke.lng"
            >
              <l-tooltip
                :content="'区域编号：'+marke.id"
              >
              </l-tooltip>
            </l-marker>
          </l-map>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import L from 'leaflet'
import { getElectricFence } from '../../api/electricFence'
export default {
  name: 'Show',
  data() {
    return {
      arr: [],
      fenceArray: [],
      locationlist: [],
      fenceId: [],
      order: [],
      index: '',
      mapsource: 'map.png',
      bounds: [[0, 0], [500, 500]],
      crs: L.CRS.Simple,
      polygon: {
        latlngs: [],
        color: 'blue'
      },
      center: [300, 300]
    }
  },
  // mounted() {
  //
  // },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getElectricFence().then(response => {
        const self = this
        this.locationlist = response.data.location
        this.fenceId = response.data.fenceId
        this.arr = this.locationlist.split('-')
        this.fenceArray = this.fenceId.split('-')
        var i
        var item = []
        for (i = 0; i < this.arr.length; i++) {
          var arr1 = this.arr[i]
          var fence = this.fenceArray[i]
          var arr2 = arr1.split(';')
          var finalarr = []
          for (var j = 0; j < arr2.length; j++) {
            var myarr = []
            var x = arr2[j].split(',')[0]
            var y = arr2[j].split(',')[1]
            myarr = [x, y]
            this.$set(finalarr, j, myarr)
          }
          var sdu = finalarr[i]
          this.$set(this.polygon.latlngs, i, finalarr)
          // this.$set(this.order.location, j, sdu)
          // this.$set(this.order.bianhao, j, fence)
          item.push({ id: fence, lng: sdu })
        }
        self.order = item
      })
    }
  }
}
</script>


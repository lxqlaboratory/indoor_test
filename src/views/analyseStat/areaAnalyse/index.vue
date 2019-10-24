<template>
  <div class="app-container">
    <el-container style="height: 100%;min-height:800px;" direction="vertical">
      <el-tabs type="border-card">
        <el-tab-pane label="表格">
          <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">
            <!--搜索框-->
            <div style="width:250px; padding-bottom: 10px; float: left;">
              <el-input
                v-model="filterText"
                placeholder="输入编号/名称"
              >
                <el-button slot="append" icon="el-icon-refresh" />
              </el-input>
            </div>
            <div style="width:50px; padding-bottom: 10px; float: left;">
            </div>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary">导出<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-header>
            <!--表格-->
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              :default-sort = "{prop: 'no', order: 'descending'}"
            >
              <el-table-column
                prop="name"
                label="名称"
                sortable
                style="width: 20%">
              </el-table-column>
              <el-table-column
                prop="no"
                label="编号"
                sortable
                style="width: 20%">
              </el-table-column>
              <el-table-column
                prop="floor"
                label="楼层"
                sortable
                style="width: 5%">
              </el-table-column>
              <el-table-column
                prop="equipmentNum"
                label="设备数"
                sortable
                style="width: 10%">
                <!--:formatter="formatter"  不知道要不要用 1/2-->
              </el-table-column>
              <el-table-column
                prop="equipmentUp"
                label="设备上限"
                sortable
                style="width: 15%">
              </el-table-column>
              <el-table-column
                prop="equipmentLow"
                label="设备下限"
                sortable
                style="width: 15%">
              </el-table-column>
            </el-table>
          <!--分页-->
          <div class="block" style="float: right" >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="100"
              layout="prev, pager, next, jumper"
              :total="1000">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="饼图">
        </el-tab-pane>
        <el-tab-pane label="柱状图">
          <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">
            <div style="width:50px; padding-bottom: 10px; float: left;"></div>
            <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
            <el-button type="primary" icon="el-icon-download">保存为图片</el-button>
          </el-header>
          <div class="chart-container">
            <chart height="100%" width="100%" />
          </div>
        </el-tab-pane>

      </el-tabs>
      <el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import L from 'leaflet'
import axios from 'axios'
import qs from 'qs'
import Chart from '@/components/Charts/BarChart'

export default {
  name: 'AreaAnalyse',
  components: { Chart },
  data() {
    return {
      filterText: ''
    }
  },
  methods: {
  }
}

</script>
<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
</style>

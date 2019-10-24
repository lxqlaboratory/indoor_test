<template>
  <div class="app-container">
    <!--<el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px">-->
      <!--&lt;!&ndash;搜索框&ndash;&gt;-->
      <!--<div style="width:250px; padding-bottom: 10px; float: left;">-->
        <!--<el-input-->
          <!--v-model="filterText"-->
          <!--placeholder="输入关键字"-->
          <!--class="filterText"-->
          <!--clearable-->
        <!--&gt;-->
          <!--<el-button slot="append" icon="el-icon-refresh" @click=" empty" />-->
        <!--</el-input>-->
      <!--</div>-->
      <!--<div style="width: 35%; float: left;">-->
        <!--开始时间：-->
        <!--<el-date-picker v-model="createDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" :picker-options="pickerOptionsStart" style="margin-right: 10px;" @change="startTimeStatus" />-->
        <!--至-->
        <!--<el-date-picker v-model="overDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" :picker-options="pickerOptionsEnd" style="margin-left: 10px;" @change="endTimeStatus" />-->
      <!--</div>-->
    <!--<div style="width: 25%;float: left">-->
      <!--<el-button type="primary" round @click="openSave()">增加</el-button>-->
    <!--</div>-->
    <!--</el-header>-->
    <el-table
      v-loading="listLoading"
      :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      strip
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top:10px"
    >
      <el-table-column
        label="编号"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.fenceId }}
        </template>
      </el-table-column>
      <el-table-column
        label="区域编号"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.mapId }}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column
        label="最大容纳人数"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.capability }}
        </template>
      </el-table-column>
      <el-table-column
        label="区域等级"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.level }}
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.time }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="160" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="openEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="deleteContent(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑-->
    <div>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="500px">
        <el-form ref="editlist" :model="editlist" :rules="rules" label-position="left" label-width="140px" style="width: 430px; margin-left:50px;">
          <el-form-item label="区域编号:">
            <el-input v-model="editlist.fenceId" readonly="true" style="width: 80%" disabled="disabled" autocomplete="off" />
          </el-form-item>
          <el-form-item label="区域编号:" prop="mapId">
            <el-input v-model="editlist.mapId" style="width: 80%" autocomplete="off"  />
          </el-form-item>
          <el-form-item label="区域状态:" prop="status">
            <el-input v-model="editlist.status" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="最大容纳人数:" prop="capability">
            <el-input v-model="editlist.capability" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="区域等级:" prop="level">
            <el-input v-model="editlist.level" style="width: 80%" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editElectricFenceList('editlist')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--分页-->
    <div class="block" style="float: right">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableList.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="新增区域" width="800px" :visible.sync="dialogSaveFormVisible">
      <NewAddress v-if="dialogSaveFormVisible" />
    </el-dialog>
  </div>
</template>

<script>

import { getElectricFenceInfo, editElectricFence, deleteElectricFence } from '../../api/electricFence.js'
import NewAddress from './index'
export default {
  name: 'AlarmRecord',
  filters: {},
  components: {
    newAddress: NewAddress
  },
  data() {
    return {
      pageSize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      data: [],
      list: [],
      dialogFormVisible: false,
      dialogSaveFormVisible: false,
      editlist: {
        fenceId: '',
        mapId: '',
        status: '',
        capability: '',
        level: ''
      },
      rules: {
        mapId: [
          { required: true, message: '请输入区域编号', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请输入区域状态', trigger: 'blur' }
        ],
        capability: [
          { required: true, message: '请输入区域最大容纳人数', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请输入区域等级', trigger: 'blur' }
        ]
      },
      listLoading: true,
      createDate: '',
      overDate: '',
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
          const d = new Date(beginDateVal)
          d.setHours(0, 0, 0, 0)
          if (beginDateVal) {
            return (
              time.getTime() < d.getTime()
            )
          }
        }
      },
      // 搜索框
      filterText: ''
    }
  },
  computed: {
    'tableList': function() {
      var search = this.filterText
      if (search) {
        return this.list.filter(function(dataNews) {
          return Object.keys(dataNews).some(function(key) {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.list
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    openSave() {
      this.dialogSaveFormVisible = !this.dialogSaveFormVisible
    },
    deleteContent(item) {
      this.editlist = item
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteElectricFence(this.editlist.fenceId).then(res => {
          if (res.re === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.fetchData()
          } else {
            this.$message.error('删除失败')
          }
        }).catch(e => {

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    openEdit(item) {
      // this.editlist = item
      this.editlist.fenceId = item.fenceId
      this.editlist.mapId = item.mapId
      this.editlist.status = item.status
      this.editlist.capability = item.capability
      this.editlist.level = item.level
      this.dialogFormVisible = true
    },
    editElectricFenceList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          editElectricFence(this.editlist.fenceId, this.editlist.mapId, this.editlist.status,
            this.editlist.capability, this.editlist.level).then(res => {
            if (res.re === 1) {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              this.fetchData()
            } else {
              this.$message.error('更新失败')
            }
          }).catch(e => {
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fetchData() {
      this.listLoading = true
      getElectricFenceInfo().then(response => {
        this.list = response.data
      })
      this.listLoading = false
    },
    startTimeStatus: function(value) {
      this.createDate = value
    },
    // 时间结束选择器
    endTimeStatus: function(value) {
      this.overDate = value
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'th'
      }
      return ''
    },
    handleSizeChange: function(size) {
      this.pageSize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    }
  }
}
</script>


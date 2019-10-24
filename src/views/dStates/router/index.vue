<template>
  <div class="app-container">
    <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px;">
      <!--搜索框-->
      <div style="width:250px; padding-bottom: 10px; float: left;">
        <el-input
          v-model="filterText"
          placeholder="输入关键字"
          class="filterText"
          clearable
        >
          <el-button slot="append" icon="el-icon-refresh" @click=" empty" />
        </el-input>
      </div>
      <div style="width:50px; padding-bottom: 10px; float: left;" />
      <div style="width: 25%;float: left">
        <el-button type="primary" round @click="openSave()">增加</el-button>
      </div>
      <div style="width: 5%;float: right">
        <el-button type="primary" @click="exportExcel">导出<i class="el-icon-upload el-icon--right" /></el-button>
      </div>

    </el-header>
    <el-table
      id="out-table"
      v-loading="listLoading"
      :data="routerTableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      strip
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top:10px"
    >
      <el-table-column
        label="路由编号"
        sortable
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.routerId }}
        </template>
      </el-table-column>
      <el-table-column
        label="路由数量"
        sortable
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.routerNum }}
        </template>
      </el-table-column>
      <el-table-column
        label="路由类型"
        sortable
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.routerType }}
        </template>
      </el-table-column>
      <el-table-column
        label="路由状态"
        sortable
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.routerStatus }}
        </template>
      </el-table-column>
      <el-table-column
        label="公司编号"
        sortable
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.companyId }}
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
          <el-form-item label="路由编号:">
            <el-input v-model="editlist.routerId" readonly="true" style="width: 80%" disabled="disabled" autocomplete="off" />
          </el-form-item>
          <el-form-item label="路由数量:" prop="routerNum">
            <el-input v-model="editlist.routerNum" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="路由类型:" prop="routerType">
            <el-input v-model="editlist.routerType" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="路由状态:" prop="routerStatus">
            <el-input v-model="editlist.routerStatus" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="公司编号:" prop="companyId">
            <el-input v-model="editlist.companyId" style="width: 80%" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRouterList('editlist')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--保存-->
    <div>
      <el-dialog title="保存" :visible.sync="dialogSaveFormVisible" width="500px">
        <el-form ref="savelist" :model="savelist" :rules="rules" label-position="left" label-width="140px" style="width: 430px; margin-left:50px;">
          <el-form-item label="路由数量:" prop="routerNum">
            <el-input v-model="savelist.routerNum" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="路由类型:" prop="routerType">
            <el-input v-model="savelist.routerType" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="路由状态:" prop="routerStatus">
            <el-input v-model="savelist.routerStatus" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="公司编号:" prop="companyId">
            <el-input v-model="savelist.companyId" style="width: 80%" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSaveFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveRouterList('savelist')">确 定</el-button>
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
        :total="routerTableList.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getRouterInfo, saveRouter, editRouter, deleteRouter } from '../../../api/router'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  filters: {

  },
  data() {
    return {
      pageSize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      routerlist: [],
      dialogFormVisible: false,
      dialogSaveFormVisible: false,
      editlist: {
        routerId: '',
        routerNum: '',
        routerType: '',
        routerStatus: '',
        companyId: ''
      },
      savelist: {
        routerNum: '',
        routerType: '',
        routerStatus: '',
        companyId: ''
      },
      rules: {
        routerNum: [
          { required: true, message: '请输入路由数量', trigger: 'blur' }
        ],
        routerType: [
          { required: true, message: '请输入路由类型', trigger: 'blur' }
        ],
        routerStatus: [
          { required: true, message: '请输入路由状态', trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: '请输入公司ID', trigger: 'blur' }
        ]
      },
      listLoading: true,
      // 搜索框
      filterText: ''
    }
  },
  computed: {
    'routerTableList': function() {
      var search = this.filterText
      if (search) {
        return this.routerlist.filter(function(dataNews) {
          return Object.keys(dataNews).some(function(key) {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.routerlist
      // return this.routerlist.filter(item => {
      //   // if (!this.createDate || !this.overDate) {
      //   //   return true
      //   // }
      //   // if (item.alarmTime > this.createDate && item.alarmTime < this.overDate) { return true } else { return false }
      //   return true
      // })
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      try {
        FileSaver.saveAs(
          // Blob 对象表示一个不可变、原始数据的类文件对象。
          // Blob 表示的不一定是JavaScript原生格式的数据。
          // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: 'application/octet-stream' }),
          // 设置导出文件名称
          'router.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
    deleteContent(item) {
      this.editlist = item
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRouter(this.editlist.routerId).then(res => {
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
      this.editlist.routerId = item.routerId
      this.editlist.routerNum = item.routerNum
      this.editlist.routerType = item.routerType
      this.editlist.routerStatus = item.routerStatus
      this.editlist.companyId = item.companyId
      this.dialogFormVisible = true
    },
    editRouterList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          editRouter(this.editlist.routerId, this.editlist.routerNum,
            this.editlist.routerType, this.editlist.routerStatus
            , this.editlist.companyId).then(res => {
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
    saveRouterList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogSaveFormVisible = false
          saveRouter(this.savelist.routerId, this.savelist.routerNum,
            this.savelist.routerType, this.savelist.routerStatus
            , this.savelist.companyId).then(res => {
            console.log(res)
            if (res.re === 1) {
              this.$refs[formName].resetFields()
              this.$message({
                message: '保存成功',
                type: 'success'
              })
            } else {
              this.$message.error('保存失败')
            }
            this.fetchData()
          }).catch(e => {
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    openSave() {
      this.dialogSaveFormVisible = true
    },
    empty() {
      this.filterText = ''
    },
    fetchData() {
      this.listLoading = true
      getRouterInfo().then(response => {
        this.routerlist = response.data
      })
      this.listLoading = false
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
<style>
</style>

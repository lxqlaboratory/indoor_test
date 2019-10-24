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
      :data="beaconTableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      strip
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top:10px"
    >
      <el-table-column
        label="信标编号"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.beaconId }}
        </template>
      </el-table-column>
      <el-table-column
        label="信标数量"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.beaconNum }}
        </template>
      </el-table-column>
      <el-table-column
        label="信标类型"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.beaconType }}
        </template>
      </el-table-column>
      <el-table-column
        label="信标状态"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.beaconStatus }}
        </template>
      </el-table-column>
      <el-table-column
        label="信标X轴坐标"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.beaconX }}
        </template>
      </el-table-column>
      <el-table-column
        label="信标Y轴坐标"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.beaconY }}
        </template>
      </el-table-column>
      <el-table-column
        label="公司编号"
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
          <el-form-item label="信标编号:">
            <el-input v-model="editlist.beaconId" readonly="true" style="width: 80%" disabled="disabled" autocomplete="off" />
          </el-form-item>
          <el-form-item label="信标数量:" prop="beaconNum">
            <el-input v-model="editlist.beaconNum" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="信标类型:" prop="beaconType">
            <el-input v-model="editlist.beaconType" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="信标状态:" prop="beaconStatus">
            <el-input v-model="editlist.beaconStatus" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="信标X轴坐标:" prop="beaconX">
            <el-input v-model="editlist.beaconX" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="信标Y轴坐标:" prop="beaconY">
            <el-input v-model="editlist.beaconY" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="公司编号:" prop="companyId">
            <el-input v-model="editlist.companyId" style="width: 80%" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editBeaconList('editlist')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--保存-->
    <div>
      <el-dialog title="保存" :visible.sync="dialogSaveFormVisible" width="500px">
        <el-form ref="savelist" :model="savelist" :rules="rules" label-position="left" label-width="140px" style="width: 430px; margin-left:50px;">
          <el-form-item label="信标数量:" prop="beaconNum">
            <el-input v-model="savelist.beaconNum" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="信标类型:" prop="beaconType">
            <el-input v-model="savelist.beaconType" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="信标状态:" prop="beaconStatus">
            <el-input v-model="savelist.beaconStatus" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="信标X轴坐标:" prop="beaconX">
            <el-input v-model="savelist.beaconX" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="信标Y轴坐标:" prop="beaconY">
            <el-input v-model="savelist.beaconY" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="公司编号:" prop="companyId">
            <el-input v-model="savelist.companyId" style="width: 80%" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSaveFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveBeaconList('savelist')">确 定</el-button>
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
        :total="beaconTableList.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getBeaconInfo, saveBeacon, editBeacon, deleteBeacon } from '../../../api/beacon'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  filters: {
  },
  data() {
    return {
      pageSize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      beaconlist: [],
      dialogFormVisible: false,
      dialogSaveFormVisible: false,
      editlist: {
        beaconId: '',
        beaconNum: '',
        beaconType: '',
        beaconStatus: '',
        beaconX: '',
        beaconY: '',
        companyId: ''
      },
      savelist: {
        beaconNum: '',
        beaconType: '',
        beaconStatus: '',
        beaconX: '',
        beaconY: '',
        companyId: ''
      },
      rules: {
        personId: [
          { required: true, message: '请输入人员编号', trigger: 'blur' }
        ],
        beaconNum: [
          { required: true, message: '请输入信标数量', trigger: 'blur' }
        ],
        beaconType: [
          { required: true, message: '请输入信标类型', trigger: 'blur' }
        ],
        beaconStatus: [
          { required: true, message: '请输入信标状态', trigger: 'blur' }
        ],
        beaconX: [
          { required: true, message: '请输入信标X轴坐标', trigger: 'blur' }
        ],
        beaconY: [
          { required: true, message: '请输入信标Y轴坐标', trigger: 'blur' }
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
    'beaconTableList': function() {
      var search = this.filterText
      if (search) {
        return this.beaconlist.filter(function(dataNews) {
          return Object.keys(dataNews).some(function(key) {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.beaconlist
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
          'beacon.xlsx'
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
        deleteBeacon(this.editlist.beaconId).then(res => {
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
      this.editlist.beaconId = item.beaconId
      this.editlist.beaconNum = item.beaconNum
      this.editlist.beaconType = item.beaconType
      this.editlist.beaconStatus = item.beaconStatus
      this.editlist.beaconX = item.beaconX
      this.editlist.beaconY = item.beaconY
      this.editlist.companyId = item.companyId
      this.dialogFormVisible = true
    },
    editBeaconList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          editBeacon(this.editlist.beaconId, this.editlist.beaconNum,
            this.editlist.beaconType, this.editlist.beaconStatus, this.editlist.beaconX, this.editlist.beaconY
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
    saveBeaconList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogSaveFormVisible = false
          saveBeacon(this.savelist.beaconNum,
            this.savelist.beaconType, this.savelist.beaconStatus, this.savelist.beaconX, this.savelist.beaconY
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
      getBeaconInfo().then(response => {
        this.beaconlist = response.data
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

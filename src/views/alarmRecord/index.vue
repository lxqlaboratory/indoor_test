<template>
  <div class="app-container">
    <el-header height="60px" style="background-color: rgb(238, 241, 246) ;text-align: left; font-size: 12px">
      <!--搜索框-->
      <div style="width:20%; padding-bottom: 10px; float: left;margin-right: 5%">
        <el-input
          v-model="filterText"
          placeholder="输入关键字"
          class="filterText"
          clearable
        >
          <el-button slot="append" icon="el-icon-refresh" @click=" empty" />
        </el-input>
      </div>
      <div style="width: 40%; float: left;">
        开始时间：
        <el-date-picker v-model="createDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" :picker-options="pickerOptionsStart" style="margin-right: 10px;" @change="startTimeStatus" />
        至
        <el-date-picker v-model="overDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" :picker-options="pickerOptionsEnd" style="margin-left: 10px;" @change="endTimeStatus" />
      </div>
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
      :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      strip
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-top:10px"
    >
      <el-table-column
        label="警告编号"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.alarmId }}
        </template>
      </el-table-column>
      <el-table-column
        label="卡片编号"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.cardId }}
        </template>
      </el-table-column>
      <el-table-column
        label="警告详情"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.alarmContent }}
        </template>
      </el-table-column>
      <el-table-column
        label="警告时间"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.alarmTime }}
        </template>
      </el-table-column>
      <el-table-column
        label="X轴坐标"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.X }}
        </template>
      </el-table-column>
      <el-table-column
        label="Y轴坐标"
        align="center"
        min-width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.Y }}
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
          <el-form-item label="警告编号:">
            <el-input v-model="editlist.alarmId" readonly="true" style="width: 80%" disabled="disabled" autocomplete="off" />
          </el-form-item>
          <el-form-item label="卡片编号:" prop="cardId">
            <el-input v-model="editlist.cardId" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="警告详情:" prop="alarmContent">
            <el-input v-model="editlist.alarmContent" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="警告时间:" prop="alarmTime">
            <el-date-picker
              v-model="editlist.alarmTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择时间"
              style="width: 80%;"
            />
          </el-form-item>
          <el-form-item label="X轴坐标:" prop="X">
            <el-input v-model="editlist.X" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Y轴坐标:" prop="Y">
            <el-input v-model="editlist.Y" style="width: 80%" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editAlarmList('editlist')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--保存-->
    <div>
      <el-dialog title="保存" :visible.sync="dialogSaveFormVisible" width="500px">
        <el-form ref="savelist" :model="savelist" :rules="rules" label-position="left" label-width="140px" style="width: 430px; margin-left:50px;">
          <el-form-item label="卡片编号:" prop="cardId">
            <el-input v-model="savelist.cardId" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="警告详情:" prop="alarmContent">
            <el-input v-model="savelist.alarmContent" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="警告时间:" prop="alarmTime">
            <el-date-picker
              v-model="savelist.alarmTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择时间"
              style="width: 80%;"
            />
          </el-form-item>
          <el-form-item label="X轴坐标:" prop="X">
            <el-input v-model="savelist.X" style="width: 80%" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Y轴坐标:" prop="Y">
            <el-input v-model="savelist.Y" style="width: 80%" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogSaveFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAlarmList('savelist')">确 定</el-button>
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
  </div>
</template>

<script>

import { getAlarmInfo, saveAlarm, editAlarm, deleteAlarm } from '../../api/alarm'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'AlarmRecord',
  filters: {},
  data() {
    return {
      xxx: '',
      pageSize: 10, // 每页的数据条数
      currentPage: 1, // 默认开始页面
      data: [],
      list: [],
      dialogFormVisible: false,
      dialogSaveFormVisible: false,
      editlist: {
        alarmId: '',
        cardId: '',
        alarmContent: '',
        X: '',
        Y: '',
        alarmTime: ''
      },
      savelist: {
        cardId: '',
        alarmContent: '',
        X: '',
        Y: '',
        alarmTime: ''
      },
      rules: {
        cardId: [
          { required: true, message: '请输入卡片编号', trigger: 'blur' }
        ],
        alarmContent: [
          { required: true, message: '请输入警告内容', trigger: 'blur' }
        ],
        X: [
          { required: true, message: '请输入X轴坐标', trigger: 'blur' }
        ],
        Y: [
          { required: true, message: '请输入Y轴坐标', trigger: 'blur' }
        ],
        alarmTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
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

    // 'tableList': function() {
    //   return this.list.filter(item => {
    //     if (!this.createDate || !this.overDate) {
    //       return true
    //     }
    //     if (item.alarmTime > this.createDate && item.alarmTime < this.overDate) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   })
    // }
  },

  created() {
    this.fetchData()
  },
  methods: {
    close() {
      this.dialogSaveFormVisible = false
      this.dialogFormVisible = false
    },
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
          'alarm.xlsx'
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
        deleteAlarm(this.editlist.alarmId).then(res => {
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
      this.editlist.alarmId = item.alarmId
      this.editlist.cardId = item.cardId
      this.editlist.alarmContent = item.alarmContent
      this.editlist.X = item.X
      this.editlist.Y = item.Y
      this.dialogFormVisible = true
    },
    editAlarmList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          editAlarm(this.editlist.alarmId, this.editlist.cardId,
            this.editlist.alarmContent, this.editlist.X
            , this.editlist.Y, this.editlist.alarmTime).then(res => {
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
    saveAlarmList(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogSaveFormVisible = false
          saveAlarm(this.savelist.cardId,
            this.savelist.alarmContent, this.savelist.X
            , this.savelist.Y, this.savelist.alarmTime).then(res => {
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
    fetchData() {
      this.listLoading = true
      getAlarmInfo().then(response => {
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


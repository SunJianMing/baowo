<template>
    <div class='assessorList'>
        <div class="app-container">
            <el-form  label-position='top' size="small" :inline="true" label-width="80px">
                <el-form-item label="姓名：">
                    <el-input v-model="form.formData.userName" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="form.formData.updateTimeRange"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        class='block'></el-date-picker>
                </el-form-item>
            </el-form>
            <el-form size="small" class="wt-form-btns" :inline="true" label-width="120px">
                <el-form-item class="search-form-btns">

                        <el-button  @click="search">搜索</el-button>
                        <el-button  @click="reset">重置</el-button>


                </el-form-item>
            </el-form>
        </div>
        <div class="app-container">
          <div class='add'>
            <el-button type="primary" icon="el-icon-plus" size="small" @click='toAdd' >新建评价人员</el-button>
            <el-button size="small">导出</el-button>
          </div>
          <el-table
            :data="result.list"
            height="auto"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            header-row-class-name='table-header'

          >
            <el-table-column
              type='selection'
              width='55'
            ></el-table-column>
             <el-table-column
              prop="name"
              label="评价人员姓名"
              min-width="120"
              max-width='180'
              align='center'
              >
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              min-width="80"
              max-width='180'
              align='center'>
            </el-table-column>
            <el-table-column
              prop="height"
              label="身高"
              min-width="80"
              max-width='180'
              align='center'
              >
            </el-table-column>
            <el-table-column
              prop="weight"
              label="体重"
             min-width="80"
              max-width='180'
                align='center'
              >
            </el-table-column>
            <el-table-column
              prop="beenDriving"
              label="驾龄"
              min-width="80"
              max-width='180'
              align='center'
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              min-width="80"
              max-width='180'
                align='center'
              >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              sortable
              min-width="120"
              max-width='180'
                align='center'
              >
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="180"
              align='center'
              >
              <template slot-scope="scope">
                <el-button type='text' size="small" @click="toView(scope.row)">查看</el-button>
                <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
                <el-button type='text' class='button-pink' size="small">禁用</el-button>
                <el-button type='text' class='button-delete' size="small" @click="toDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="assessList-page">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10,20,30,40]"
              layout="  prev, pager, next, sizes, jumper"
              :total="40">
            </el-pagination>
          </div>
        </div>

         <!--添加-->
      <div class="wt-dialog">
          <el-dialog title="添加" :visible.sync="isAddDialogVisible" :close-on-press-escape="false"
                     :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
              <AssessorEdit @wt-dialog-close="isAddDialogVisible = false"
                           @wt-dialog-refresh="(isAddDialogVisible = false) | requestFormList()"
                           ref="addView" viewType="add"></AssessorEdit>
          </el-dialog>
      </div>

      <!--查看-->
      <div class="wt-dialog">
          <el-dialog title="查看" :visible.sync="isViewDialogVisible" :close-on-press-escape="false"
                     :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
              <AssessorView @wt-dialog-close="isViewDialogVisible = false" @wt-dialog-refresh="(isViewDialogVisible = false) "
                           ref="viewView" viewType="view"></AssessorView>
          </el-dialog>
      </div>

      <!--编辑-->
      <div class="wt-dialog">
          <el-dialog title="编辑" :visible.sync="isEditDialogVisible" :close-on-press-escape="false"
                     :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
              <AssessorEdit @wt-dialog-close="isEditDialogVisible = false"
                           @wt-dialog-refresh="(isEditDialogVisible = false) | requestFormList()"
                           ref="editView" viewType="edit"></AssessorEdit>
          </el-dialog>
      </div>
    </div>
</template>
<script>

import request from '@/utils/request'
import AssessorEdit from './add'
import AssessorView from './view'
export default {
  data() {
    return {
      formListUrl: '/modules/assessor/assessorList',
      form: { //  表单数据

          formData: {
            userName: '',
            updateTimeRange: []
          },
          pageData: {
            currentPage: 0,
            pageSize: 20,
            sortName: '',
            sortOrder: ''
          }
        },
      // 时间数据
      pickerOptions: {
        shortcuts: [
          {
            text: '一天内',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', [start, end]);
            }
          }, {
              text: '一周内',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
              }
          }, {
              text: '一月内',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
              }
          }, {
              text: '一年内',
              onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                  picker.$emit('pick', [start, end]);
              }
          }
        ]
      },
      // 列表数据

        currentPage: 2,
        result:{ //  结果数据
          list:[{
            name: '王小虎',
            sex: '男',
            height: '175cm',
            weight: '60k',
            beenDriving: '5年',
            status: '启用',
            createTime:'2016-08-21'
          },{
            name: '王小虎',
            sex: '男',
            height: '175cm',
            weight: '60k',
            beenDriving: '5年',
            status: '启用',
            createTime:'2016-08-20'
          }]
        },
        isAddDialogVisible:false,
        isViewDialogVisible:false,
        isEditDialogVisible:false

    }
  },
  activated(){
    this.requsetFromList()
  },
  methods: {
    /*------------------ 请求数据--------------------- */
    requsetFromList(){
      request({
          url: this.formListUrl,
          method: 'post',
          data: this.form
        }).then(response => {
          // this.result = response.data
          // this.form.isListLoading = false
        }).catch(() => {
          this.form.isListLoading = false
        })

    },

    // 搜索按钮
    search(){},
    reset() {

    },

    // page回调函数
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      /** ----操作相关-------*/
      toAdd(){
      this.isAddDialogVisible = true
      if (this.$refs.addView !== null && this.$refs.addView !== undefined) {

          this.$refs.addView.setup('')
        }
    },
     toView(rowData) {
        //  点击单条查看
        this.isViewDialogVisible = true
        console.log(rowData)
        // this.$store.dispatch('queryAssessorDetailData', rowData.id)
        if (this.$refs.editView !== null && this.$refs.editView !== undefined) {
          this.$refs.editView.setup('')
        }
      },
      toEdit(rowData) {
        //  点击单条编辑
        this.isEditDialogVisible = true
        // this.$store.dispatch('queryAssessorDetailData', rowData.id)
        if (this.$refs.editView !== null && this.$refs.editView !== undefined) {
          this.$refs.editView.setup('')
        }
      },
      toDelete(rowData) {
        //  点击单条删除
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.requestDeleteMutil([rowData.id])
        }).catch(() => {
        })
      },
  },
  components:{
    AssessorEdit,
    AssessorView
  }
}
</script>
<style lang="css">
.assessorList .add{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.assessorList .el-table th, .el-table tr.table-header{
  background-color: #eee;
}
.assessorList .assessList-page{
      width: 100%;
    margin: 16px 0;
    text-align: right;
}
.assessorList .button-pink{
  color:orange;
}
.assessorList .button-delete{
  color:#f56c6c;
}
</style>

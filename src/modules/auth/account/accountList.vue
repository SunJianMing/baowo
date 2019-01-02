<template>
  <div class="app-container">
    <el-form size="small" :inline="true" label-width="120px">
        <el-form-item label="用户名：">
        <el-input v-model="form.formData.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="姓名：">
        <el-input v-model="form.formData.realname" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="更新时间：">
        <el-date-picker
                v-model="form.formData.updateTimeRange"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
        </el-date-picker>
    </el-form-item>
      <el-form-item class="search-form-btns">
        <el-button type="primary" @click="toSearch">查询</el-button>
        <el-button @click="toReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-form size="small" class="wt-form-btns" :inline="true" label-width="120px">
      <el-form-item class="search-form-btns">
        <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACCOUNT:ADD">
          <el-button type="primary" @click="toAdd">新增</el-button>
        </wt-auth>
        <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACCOUNT:DELETE">
          <el-button type="danger" @click="toDeleteMultiple">删除</el-button>
        </wt-auth>

      </el-form-item>
    </el-form>

    <el-table :data="result.list" class="wt-table" header-row-class-name="wt-table-header-row"
              v-loading.body="form.isListLoading" element-loading-text="加载中.."
              @selection-change="onMultipleSelectionChange"
              :default-sort = "{prop: '', order: 'descending'}"
              @sort-change="onSortChange"
              size="mini" fit highlight-current-row>
      <el-table-column
        type="selection"
        width="35">
      </el-table-column>
      <el-table-column label='ID'  >
          <template slot-scope="scope">
              {{scope.row.id}}
          </template>
      </el-table-column>
      <el-table-column label='用户名'  >
          <template slot-scope="scope">
              {{scope.row.username}}
          </template>
      </el-table-column>
      <el-table-column label='姓名'  >
          <template slot-scope="scope">
              {{scope.row.realname}}
          </template>
      </el-table-column>
      <el-table-column label='手机号码'  >
          <template slot-scope="scope">
              {{scope.row.mobile}}
          </template>
      </el-table-column>
      <el-table-column label='电子邮箱'  >
          <template slot-scope="scope">
              {{scope.row.email}}
          </template>
      </el-table-column>
      <el-table-column label='备注'  >
          <template slot-scope="scope">
              {{scope.row.remark}}
          </template>
      </el-table-column>
      <el-table-column label='排序'   prop="orderNum" sortable="custom" >
          <template slot-scope="scope">
              {{scope.row.orderNum}}
          </template>
      </el-table-column>
      <el-table-column label='状态'  >
          <template slot-scope="scope">
            <span :class="scope.row.isPublish | FILTER_IsPublish_Class">{{scope.row.isPublish | FILTER_IsPublish}}</span>
          </template>
      </el-table-column>
      <el-table-column label='更新时间'   prop="updateTime" sortable="custom" >
          <template slot-scope="scope">
              <i class="el-icon-time"></i>
              {{scope.row.updateTime}}
          </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="scope">
          <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACCOUNT:VIEW">
            <el-button size="mini" @click="toView(scope.row)">查看</el-button>
          </wt-auth>
          <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACCOUNT:EDIT">
            <el-button size="mini" @click="toEdit(scope.row)">编辑</el-button>
          </wt-auth>
          <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACCOUNT:DELETE">
            <el-button size="mini" type="danger" @click="toDelete(scope.row)">删除</el-button>
          </wt-auth>
        </template>
      </el-table-column>
    </el-table>
    <div class="search-form-pagination">
      <el-pagination
        :current-page="result.currentPage"
        :page-sizes="[20, 50, 100]"
        :page-size="result.pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="result.total"
        @current-change="onPageCurrentChange"
        @size-change="onPageSizeChange">
      </el-pagination>
    </div>

      <!--添加-->
      <div class="wt-dialog">
          <el-dialog title="查看" :visible.sync="isViewDialogVisible" :close-on-press-escape="false"
                     :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
              <AccountView @wt-dialog-close="isViewDialogVisible = false" @wt-dialog-refresh="(isViewDialogVisible = false) "
                           ref="viewView" viewType="view"></AccountView>
          </el-dialog>
      </div>
      <!--添加-->
      <div class="wt-dialog">
          <el-dialog title="添加" :visible.sync="isAddDialogVisible" :close-on-press-escape="false"
                     :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
              <AccountEdit @wt-dialog-close="isAddDialogVisible = false"
                           @wt-dialog-refresh="(isAddDialogVisible = false) | requestFormList()"
                           ref="addView" viewType="add"></AccountEdit>
          </el-dialog>
      </div>
      <!--编辑-->
      <div class="wt-dialog">
          <el-dialog title="编辑" :visible.sync="isEditDialogVisible" :close-on-press-escape="false"
                     :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
              <AccountEdit @wt-dialog-close="isEditDialogVisible = false"
                           @wt-dialog-refresh="(isEditDialogVisible = false) | requestFormList()"
                           ref="editView" viewType="edit"></AccountEdit>
          </el-dialog>
      </div>

  </div>
</template>

<script>
  import request from '@/utils/request'
  import WtAuth from '@/components/WtAuth'
  import AccountEdit from './accountEdit'
  import AccountView from './accountView'

  export default {
    data() {
      return {
        form: { //  表单数据
          formListUrl: '/modules/auth/accountList',
          formDeleteUrl: '/modules/auth/accountDelete',
          isListLoading: true,
          formData: {
            username: '',
            realname: '',
            updateTimeRange: []
          },
          pageData: {
            currentPage: 0,
            pageSize: 20,
            sortName: '',
            sortOrder: ''
          }
        },
        result: { //  结果数据
          list: []
        },
        isViewDialogVisible: false,
        isAddDialogVisible: false,
        isEditDialogVisible: false,
        multipleDataList: []
      }
    },
    components: {
      AccountEdit,
      AccountView,
      WtAuth
    },
    activated() {
      this.requestFormList()
    },
    methods: {
      /*  ------------------------- 表格和分页  -------------------------  */
      onMultipleSelectionChange(data) {
        //  多选选择
        this.multipleDataList = data
      },
      onSortChange(column) {
        //  点击排序
        this.form.pageData.sortName = column.prop
        this.form.pageData.sortOrder = column.order
        this.requestFormList()
      },
      onPageCurrentChange(pageNum) {
        //  切换页码
        this.form.pageData.currentPage = pageNum - 1
        this.requestFormList()
      },
      onPageSizeChange(pageSize) {
        //  切换页数
        this.form.pageData.pageSize = pageSize
        this.requestFormList()
      },
      /*  ------------------------- 按钮相关  -------------------------  */
      toSearch() {
        //  点击查询
        this.form.pageData.currentPage = 0
        this.requestFormList()
      },
      toReset() {
        //  点击重置
        this.form.formData = {}
      },
      toAdd() {
        //  点击新增
        this.isAddDialogVisible = true
        this.$store.dispatch('resetAccountDetailData')
        if (this.$refs.addView !== null && this.$refs.addView !== undefined) {
          this.$refs.addView.setup('')
        }
      },
      toView(rowData) {
        //  点击单条查看
        this.isViewDialogVisible = true
        this.$store.dispatch('queryAccountDetailData', rowData.id)
        if (this.$refs.editView !== null && this.$refs.editView !== undefined) {
          this.$refs.editView.setup('')
        }
      },
      toEdit(rowData) {
        //  点击单条编辑
        this.isEditDialogVisible = true
        this.$store.dispatch('queryAccountDetailData', rowData.id)
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
      toDeleteMultiple() {
        //  点击多条删除
        if (this.multipleDataList.length <= 0) {
          this.$alert('请选中至少一列数据', '提示', {
            type: 'error',
            confirmButtonText: '确定'
          }).then(() => {
          }).catch(() => {
          })
          return
        }
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const dataIdList = []
          this.multipleDataList.forEach((item) => {
            dataIdList.push(item.id)
          })
          this.requestDeleteMutil(dataIdList)
        }).catch(() => {
        })
      },
      /*  ------------------------- 网络请求  -------------------------  */
      requestFormList() {
        this.form.isListLoading = true
        request({
          url: this.form.formListUrl,
          method: 'post',
          data: this.form
        }).then(response => {
          this.result = response.data
          this.form.isListLoading = false
        }).catch(() => {
          this.form.isListLoading = false
        })
      },
      requestDeleteMutil(dataIdList) {
        request({
          url: this.form.formDeleteUrl,
          method: 'post',
          data: { list: dataIdList }
        }).then(response => {
          this.requestFormList()
        }).catch(error => {
          console.log('error', error)
        })
      }
    }
  }
</script>

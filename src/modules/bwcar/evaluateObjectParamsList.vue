<template>
  <div class="app-container">
    <el-form size="small" :inline="true" label-width="120px">
          <el-form-item class="search-form-btns">
        <el-button type="primary" @click="toSearch">查询</el-button>
        <el-button @click="toReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-form size="small" class="wt-form-btns" :inline="true" label-width="120px">
      <el-form-item class="search-form-btns">
        <wt-auth class="search-form-btn" hasAnyPremission="MODULES_EVALUATEOBJECTPARAMS:ADD">
          <el-button type="primary" @click="toAdd">新增</el-button>
        </wt-auth>
        <wt-auth class="search-form-btn" hasAnyPremission="MODULES_EVALUATEOBJECTPARAMS:DELETE">
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
      <el-table-column label='主键ID'  >
          <template slot-scope="scope">
              {{scope.row.id}}
          </template>
      </el-table-column>
      <el-table-column label='评价对象ID'  >
          <template slot-scope="scope">
              {{scope.row.evaluateObjectId}}
          </template>
      </el-table-column>
      <el-table-column label='评价参数ID'  >
          <template slot-scope="scope">
              {{scope.row.evaluateParamsId}}
          </template>
      </el-table-column>
      <el-table-column label='参数类型 0/文字,1/图片'  >
          <template slot-scope="scope">
              {{scope.row.type}}
          </template>
      </el-table-column>
      <el-table-column label='参数值'  >
          <template slot-scope="scope">
              {{scope.row.val}}
          </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="scope">
          <wt-auth class="search-form-btn" hasAnyPremission="MODULES_EVALUATEOBJECTPARAMS:VIEW">
            <el-button size="mini" @click="toView(scope.row)">查看</el-button>
          </wt-auth>
          <wt-auth class="search-form-btn" hasAnyPremission="MODULES_EVALUATEOBJECTPARAMS:EDIT">
            <el-button size="mini" @click="toEdit(scope.row)">编辑</el-button>
          </wt-auth>
          <wt-auth class="search-form-btn" hasAnyPremission="MODULES_EVALUATEOBJECTPARAMS:DELETE">
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
              <EvaluateObjectParamsView @wt-dialog-close="isViewDialogVisible = false" @wt-dialog-refresh="(isViewDialogVisible = false) "
                           ref="viewView" viewType="view"></EvaluateObjectParamsView>
          </el-dialog>
      </div>
      <!--添加-->
      <div class="wt-dialog">
          <el-dialog title="添加" :visible.sync="isAddDialogVisible" :close-on-press-escape="false"
                     :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
              <EvaluateObjectParamsEdit @wt-dialog-close="isAddDialogVisible = false"
                           @wt-dialog-refresh="(isAddDialogVisible = false) | requestFormList()"
                           ref="addView" viewType="add"></EvaluateObjectParamsEdit>
          </el-dialog>
      </div>
      <!--编辑-->
      <div class="wt-dialog">
          <el-dialog title="编辑" :visible.sync="isEditDialogVisible" :close-on-press-escape="false"
                     :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
              <EvaluateObjectParamsEdit @wt-dialog-close="isEditDialogVisible = false"
                           @wt-dialog-refresh="(isEditDialogVisible = false) | requestFormList()"
                           ref="editView" viewType="edit"></EvaluateObjectParamsEdit>
          </el-dialog>
      </div>
      
  </div>
</template>

<script>
  import request from '@/utils/request'
  import WtAuth from '@/components/WtAuth'
  import EvaluateObjectParamsEdit from './evaluateObjectParamsEdit'
  import EvaluateObjectParamsView from './evaluateObjectParamsView'

  export default {
    data() {
      return {
        formListUrl: '/modules/evaluateObjectParams/evaluateObjectParamsList',
        formDeleteUrl: '/modules/evaluateObjectParams/evaluateObjectParamsDelete',
        form: { //  表单数据
          isListLoading: true,
          formData: {
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
      EvaluateObjectParamsEdit,
      EvaluateObjectParamsView,
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
        this.$store.dispatch('resetEvaluateObjectParamsDetailData')
        if (this.$refs.addView !== null && this.$refs.addView !== undefined) {
          this.$refs.addView.setup('')
        }
      },
      toView(rowData) {
        //  点击单条查看
        this.isViewDialogVisible = true
        this.$store.dispatch('queryEvaluateObjectParamsDetailData', rowData.id)
        if (this.$refs.editView !== null && this.$refs.editView !== undefined) {
          this.$refs.editView.setup('')
        }
      },
      toEdit(rowData) {
        //  点击单条编辑
        this.isEditDialogVisible = true
        this.$store.dispatch('queryEvaluateObjectParamsDetailData', rowData.id)
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
          url: this.formListUrl,
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
          url: this.formDeleteUrl,
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

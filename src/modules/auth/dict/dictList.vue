<template>
  <div class="app-container">
    <el-form size="small" :inline="true" label-width="120px">
      <el-form-item label="分组key：">
        <el-input v-model="form.form_data.group_key" placeholder="请输入分组key"></el-input>
      </el-form-item>
      <el-form-item label="数据key：">
        <el-input v-model="form.form_data.dict_key" placeholder="请输入数据key"></el-input>
      </el-form-item>
      <el-form-item class="search-form-btns">
        <el-button type="primary" @click="toSearch">查询</el-button>
        <el-button @click="toReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-form size="small" class="wt-form-btns" :inline="true" label-width="120px">
      <el-form-item class="search-form-btns">
        <wt-auth class="search-form-btn" hasAnyPremission="ACCOUNT:ADD">
          <el-button type="primary" @click="toAdd">新增</el-button>
        </wt-auth>
        <wt-auth class="search-form-btn" hasAnyPremission="ACCOUNT:DELETE">
          <el-button type="danger" @click="toDeleteMultiple">删除</el-button>
        </wt-auth>

      </el-form-item>
    </el-form>

    <el-table :data="result.list" class="wt-table" header-row-class-name="wt-table-header-row"
              v-loading.body="form.isListLoading" element-loading-text="加载中.."
              @selection-change="onMultipleSelectionChange"
              @sort-change="onSortChange"
              size="mini" fit highlight-current-row>
      <el-table-column
        type="selection"
        width="35">
      </el-table-column>
      <el-table-column label='模块key'>
        <template slot-scope="scope">
          {{scope.row.module_key}}
        </template>
      </el-table-column>
      <el-table-column label='分组key'>
        <template slot-scope="scope">
          {{scope.row.group_key}}
        </template>
      </el-table-column>
      <el-table-column label='数据key'>
        <template slot-scope="scope">
          {{scope.row.dict_key}}
        </template>
      </el-table-column>
      <el-table-column label='数据value'>
        <template slot-scope="scope">
          {{scope.row.dict_value}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250px">
        <template slot-scope="scope">
          <wt-auth class="search-form-btn" hasAnyPremission="ACCOUNT:VIEW">
            <el-button size="mini" @click="toView(scope.row)">查看</el-button>
          </wt-auth>
          <wt-auth class="search-form-btn" hasAnyPremission="ACCOUNT:EDIT">
            <el-button size="mini" @click="toEdit(scope.row)">编辑</el-button>
          </wt-auth>
          <wt-auth class="search-form-btn" hasAnyPremission="ACCOUNT:DELETE">
            <el-button size="mini" type="danger" @click="toDelete(scope.row)">删除</el-button>
          </wt-auth>
        </template>
      </el-table-column>
    </el-table>
    <div class="search-form-pagination">
      <el-pagination
        :current-page="result.current_page"
        :page-sizes="[20, 50, 100]"
        :page-size="result.page_size"
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
        <DictView @wt-dialog-close="isViewDialogVisible = false" @wt-dialog-refresh="(isViewDialogVisible = false) "
                     ref="viewView" viewType="view"></DictView>
      </el-dialog>
    </div>
    <!--添加-->
    <div class="wt-dialog">
      <el-dialog title="添加" :visible.sync="isAddDialogVisible" :close-on-press-escape="false"
                 :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
        <DictEdit @wt-dialog-close="isAddDialogVisible = false"
                     @wt-dialog-refresh="(isAddDialogVisible = false) | requestFormList()"
                     ref="addView" viewType="add"></DictEdit>
      </el-dialog>
    </div>

    <!--编辑-->
    <div class="wt-dialog">
      <el-dialog title="编辑" :visible.sync="isEditDialogVisible" :close-on-press-escape="false"
                 :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
        <DictEdit @wt-dialog-close="isEditDialogVisible = false"
                     @wt-dialog-refresh="(isEditDialogVisible = false) | requestFormList()"
                     ref="editView" viewType="edit"></DictEdit>
      </el-dialog>
    </div>


  </div>
</template>

<script>
  import request from '@/utils/request'
  import WtAuth from '@/components/WtAuth'
  import DictEdit from './dict_edit'
  import DictView from './dict_view'

  export default {
    data() {
      return {
        form: { //  表单数据
          isListLoading: true,
          form_data: {
            group_key: '',
            dict_key: ''
          },
          page_data: {
            current_page: 0,
            page_size: 20,
            sort_name: '',
            sort_order: ''
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
      DictEdit,
      DictView,
      WtAuth
    },
    created() {
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
        this.form.page_data.sort_name = column.prop
        this.form.page_data.sort_order = column.order
        this.requestFormList()
      },
      onPageCurrentChange(page_num) {
        //  切换页码
        this.form.page_data.current_page = page_num - 1
        this.requestFormList()
      },
      onPageSizeChange(page_size) {
        //  切换页数
        this.form.page_data.page_size = page_size
        this.requestFormList()
      },
      /*  ------------------------- 按钮相关  -------------------------  */
      toSearch() {
        //  点击查询
        this.form.page_data.current_page = 0
        this.requestFormList()
      },
      toReset() {
        //  点击重置
        this.form.form_data = {}
      },
      toAdd() {
        //  点击新增
        this.isAddDialogVisible = true
        this.$store.dispatch('queryDictRoleDetailData')
        if (this.$refs.addView !== null && this.$refs.addView !== undefined) {
          this.$refs.addView.setup('')
        }
      },
      toView(rowData) {
        //  点击单条查看
        this.isViewDialogVisible = true
        this.$store.dispatch('queryDictDetailData', rowData.id)
      },
      toEdit(rowData) {
        //  点击单条编辑
        this.isEditDialogVisible = true
        this.$store.dispatch('queryDictDetailData', rowData.id)
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
          url: '/modules/auth/dict_list',
          method: 'post',
          data: this.form
        }).then(response => {
          this.result = response.data
          this.form.isListLoading = false
        })
      },
      requestDeleteMutil(dataIdList) {
        request({
          url: '/modules/auth/dict_delete',
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

<template>
  <div class="app-container">

    <el-tabs v-model="activeTabName" type="card" class="wt-tabs">
      <el-tab-pane label="树形展示" name="treeTab" class="wt-tab">
        <ModuleTree></ModuleTree>
      </el-tab-pane>
      <el-tab-pane label="列表展示" name="listTab" class="wt-tab">
        <div>
          <el-form size="small" :inline="true" label-width="120px">
            <el-form-item label="菜单名称：">
              <el-input v-model="form.formData.moduleName" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="菜单code：">
              <el-input v-model="form.formData.moduleCode" placeholder="请输入菜单URL"></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model="form.formData.isPublish" placeholder="请选择状态">
                <el-option label="请选择" value="">请选择</el-option>
                <el-option label="未启用" value="0">未启用</el-option>
                <el-option label="已启用" value="1">已启用</el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="search-form-btns">
              <el-button type="primary" @click="toSearch">查询</el-button>
              <el-button @click="toReset">重置</el-button>
            </el-form-item>
          </el-form>
          <el-form size="small" class="wt-form-btns" :inline="true" label-width="120px">
            <el-form-item class="search-form-btns">
              <wt-auth class="search-form-btn" hasAnyPremission="MODULE:ADD">
                <el-button type="primary" @click="toAdd">新增</el-button>
              </wt-auth>
              <wt-auth class="search-form-btn" hasAnyPremission="MODULE:DELETE">
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
            <el-table-column label='菜单名称'  >
              <template slot-scope="scope">
                {{scope.row.moduleName}}
              </template>
            </el-table-column>
            <el-table-column label='菜单code'  >
              <template slot-scope="scope">
                {{scope.row.moduleCode}}
              </template>
            </el-table-column>
            <el-table-column label='菜单url'  >
              <template slot-scope="scope">
                {{scope.row.moduleUrl}}
              </template>
            </el-table-column>
            <el-table-column label='菜单排序' prop="order_num" sortable="custom" >
              <template slot-scope="scope">
                {{scope.row.orderNum}}
              </template>
            </el-table-column>
            <el-table-column label='状态' prop="isPublish" sortable="custom" >
              <template slot-scope="scope">
                <span :class="scope.row.isPublish | FILTER_IsPublish_Class">{{scope.row.isPublish | FILTER_IsPublish}}</span>
              </template>
            </el-table-column>
            <el-table-column label='创建时间'   prop="create_time" sortable="custom" >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                {{scope.row.createTime}}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="250px">
              <template slot-scope="scope">
                <wt-auth class="search-form-btn" hasAnyPremission="MODULE:VIEW">
                  <el-button size="mini" @click="toView(scope.row)">查看</el-button>
                </wt-auth>
                <wt-auth class="search-form-btn" hasAnyPremission="MODULE:EDIT">
                  <el-button size="mini" @click="toEdit(scope.row)" v-if="scope.row.id != '1'">编辑</el-button>
                </wt-auth>
                <wt-auth class="search-form-btn" hasAnyPremission="MODULE:DELETE">
                  <el-button size="mini" type="danger" @click="toDelete(scope.row)" v-if="scope.row.id != '1'">删除</el-button>
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

        </div>
      </el-tab-pane>
    </el-tabs>

    <!--添加-->
    <div class="wt-dialog">
      <el-dialog title="查看" :visible.sync="isViewDialogVisible" :close-on-press-escape="false"
                 :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
        <ModuleView @wt-dialog-close="isViewDialogVisible = false" @wt-dialog-refresh="(isViewDialogVisible = false) "
                  ref="viewView" viewType="view" ></ModuleView>
      </el-dialog>
    </div>
    <!--添加-->
    <div class="wt-dialog">
      <el-dialog title="添加" :visible.sync="isAddDialogVisible" :close-on-press-escape="false"
                 :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
        <ModuleEdit @wt-dialog-close="isAddDialogVisible = false" @wt-dialog-refresh="(isAddDialogVisible = false) | requestFormList()"
                ref="addView" viewType="add" ></ModuleEdit>
      </el-dialog>
    </div>

    <!--编辑-->
    <div class="wt-dialog">
      <el-dialog title="编辑" :visible.sync="isEditDialogVisible" :close-on-press-escape="false"
                 :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
        <ModuleEdit @wt-dialog-close="isEditDialogVisible = false" @wt-dialog-refresh="(isEditDialogVisible = false) | requestFormList()"
                  ref="editView" viewType="edit" ></ModuleEdit>
      </el-dialog>
    </div>


  </div>
</template>

<script>
  import request from '@/utils/request'
  import WtAuth from '@/components/WtAuth'
  import ModuleEdit from './moduleEdit'
  import ModuleView from './moduleView'
  import ModuleTree from './moduleTree'

  export default {
    data() {
      return {
        activeTabName: 'treeTab',
        formListUrl: '/modules/auth/moduleList',
        formDeleteUrl: '/modules/auth/moduleDelete',
        form: { //  表单数据
          isListLoading: true,
          formData: {
            moduleName: '',
            moduleCode: '',
            isPublish: ''
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
      ModuleEdit,
      ModuleView,
      ModuleTree,
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
        this.form.pageData.sortName = column.prop
        this.form.pageData.sortOrder = column.order
        this.requestFormList()
      },
      onPageCurrentChange(page_num) {
        //  切换页码
        this.form.pageData.currentPage = page_num - 1
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
        this.$store.dispatch('resetModuleDetailData', { order_num: '0' })
        if (this.$refs.addView !== null && this.$refs.addView !== undefined) {
          this.$refs.addView.setup('')
        }
      },
      toView(rowData) {
        //  点击单条查看
        this.isViewDialogVisible = true
        this.$store.dispatch('queryModuleDetailData', rowData.id)
        if (this.$refs.editView !== null && this.$refs.editView !== undefined) {
          this.$refs.editView.setup('')
        }
      },
      toEdit(rowData) {
        //  点击单条编辑
        this.isEditDialogVisible = true
        this.$store.dispatch('queryModuleDetailData', rowData.id)
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

<template>
  <div class="app-container">

    <el-tabs v-model="activeTabName" type="card" class="wt-tabs">
      <el-tab-pane label="树形展示" name="treeTab" class="wt-tab">
        <OrganizationTree></OrganizationTree>
      </el-tab-pane>
      <el-tab-pane label="列表展示" name="listTab" class="wt-tab">
        <div>
          <el-form size="small" :inline="true" label-width="120px">
            <el-form-item label="单位名称：">
              <el-input v-model="form.form_data.organization_name" placeholder="请输入单位名称"></el-input>
            </el-form-item>
            <el-form-item class="search-form-btns">
              <el-button type="primary" @click="toSearch">查询</el-button>
              <el-button @click="toReset">重置</el-button>
            </el-form-item>
          </el-form>
          <el-form size="small" class="wt-form-btns" :inline="true" label-width="120px">
            <el-form-item class="search-form-btns">
              <wt-auth class="search-form-btn" hasAnyPremission="ORGANIZATION:ADD">
                <el-button type="primary" @click="toAdd">新增</el-button>
              </wt-auth>
              <wt-auth class="search-form-btn" hasAnyPremission="ORGANIZATION:DELETE">
                <el-button type="danger" @click="toDeleteMultiple">删除</el-button>
              </wt-auth>
            </el-form-item>
          </el-form>
          <el-table :data="result.list" class="wt-table" header-row-class-name="wt-table-header-row"
                    v-loading.body="form.isListLoading" element-loading-text="加载中.."
                    @selection-change="onMultipleSelectionChange"
                    @sort-change="onSortChange"
                    size="mini" fit highlight-current-row>
            <el-table-column label='单位名称'  >
              <template slot-scope="scope">
                {{scope.row.organization_name}}
              </template>
            </el-table-column>
            <el-table-column label='单位编码'  >
              <template slot-scope="scope">
                {{scope.row.organization_code}}
              </template>
            </el-table-column>
            <el-table-column label='上级单位'  >
              <template slot-scope="scope">
                {{scope.row.organization_parent_name}}
              </template>
            </el-table-column>
            <el-table-column label='单位负责人'  >
              <template slot-scope="scope">
                {{scope.row.organization_user}}
              </template>
            </el-table-column>
            <el-table-column label='联系电话'  >
              <template slot-scope="scope">
                {{scope.row.organization_user_phone}}
              </template>
            </el-table-column>
            <el-table-column label='状态'  >
              <template slot-scope="scope">
                <span :class="scope.row.is_publish | FILTER_IsPublish_Class">{{scope.row.is_publish | FILTER_IsPublish}}</span>
              </template>
            </el-table-column>
            <el-table-column label='创建时间'   prop="create_time" sortable="custom" >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                {{scope.row.create_time}}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="250px">
              <template slot-scope="scope">
                <wt-auth class="search-form-btn" hasAnyPremission="ORGANIZATION:VIEW">
                  <el-button size="mini" @click="toView(scope.row)">查看</el-button>
                </wt-auth>
                <wt-auth class="search-form-btn" hasAnyPremission="ORGANIZATION:EDIT" >
                  <el-button size="mini" @click="toEdit(scope.row)" v-if="scope.row.id != '1'">编辑</el-button>
                </wt-auth>
                <wt-auth class="search-form-btn" hasAnyPremission="ORGANIZATION:DELETE" >
                  <el-button size="mini" type="danger" @click="toDelete(scope.row)" v-if="scope.row.id != '1'">删除</el-button>
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
        </div>
      </el-tab-pane>
    </el-tabs>

    <!--详情页面 开始 -->
    <!--查看-->
    <div class="wt-dialog">
      <el-dialog title="查看" :visible.sync="isViewDialogVisible" :close-on-press-escape="false"
                 :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
        <OrganizationView @wt-dialog-close="isViewDialogVisible = false" @wt-dialog-refresh="(isViewDialogVisible = false) "
                  ref="viewView" viewType="view" ></OrganizationView>
      </el-dialog>
    </div>
    <!--添加-->
    <div class="wt-dialog">
      <el-dialog title="添加" :visible.sync="isAddDialogVisible" :close-on-press-escape="false"
                 :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
        <OrganizationEdit @wt-dialog-close="isAddDialogVisible = false" @wt-dialog-refresh="(isAddDialogVisible = false) | requestFormList()"
                ref="addView" viewType="add" ></OrganizationEdit>
      </el-dialog>
    </div>
    <!--编辑-->
    <div class="wt-dialog">
      <el-dialog title="编辑" :visible.sync="isEditDialogVisible" :close-on-press-escape="false"
                 :close-on-click-modal="false" :modal-append-to-body="false" lock-scroll>
        <OrganizationEdit @wt-dialog-close="isEditDialogVisible = false" @wt-dialog-refresh="(isEditDialogVisible = false) | requestFormList()"
                  ref="editView" viewType="edit" ></OrganizationEdit>
      </el-dialog>
    </div>
    <!--详情页面 结束 -->

  </div>
</template>

<script>
  import request from '@/utils/request'
  import WtAuth from '@/components/WtAuth'
  import OrganizationEdit from './organization_edit'
  import OrganizationView from './organization_view'
  import OrganizationTree from './organization_tree'

  export default {
    data() {
      return {
        activeTabName: 'treeTab',
        form: { //  表单数据
          isListLoading: true,
          form_data: {
            organization_name: ''
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
      OrganizationEdit,
      OrganizationView,
      OrganizationTree,
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
        this.$store.dispatch('queryAddOrganizationDetailData', {})
        if (this.$refs.addView !== null && this.$refs.addView !== undefined) {
          this.$refs.addView.setup('')
        }
      },
      toView(rowData) {
        //  点击单条查看
        this.isViewDialogVisible = true
        this.$store.dispatch('queryOrganizationDetailData', rowData.id)
      },
      toEdit(rowData) {
        //  点击单条编辑
        this.isEditDialogVisible = true
        this.$store.dispatch('queryOrganizationDetailData', rowData.id)
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
          url: '/modules/auth/organization_list',
          method: 'post',
          data: this.form
        }).then(response => {
          this.result = response.data
          this.form.isListLoading = false
        })
      },
      requestDeleteMutil(dataIdList) {
        request({
          url: '/modules/auth/organization_delete',
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

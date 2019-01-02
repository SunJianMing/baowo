<template>
  <el-row>

    <el-col :span="6">
      <el-row class="module-search">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small"></el-input>
      </el-row>
      <el-row class="module-search-btns">
        <el-button type="default" size="small" @click.native="toSearchRefresh">刷新</el-button>
        <wt-auth class="search-form-btn" hasAnyPremission="MODULE:ADD">
          <el-button type="primary" size="small" @click.native="toSearchAdd">新增</el-button>
        </wt-auth>
        <wt-auth class="search-form-btn" hasAnyPremission="MODULE:EDIT">
          <el-button type="primary" size="small" :disabled="isSearchDeleteDisabled" @click.native="toSearchEdit">修改</el-button>
        </wt-auth>
        <wt-auth class="search-form-btn" hasAnyPremission="MODULE:DELETE">
          <el-button type="danger" size="small" :disabled="isSearchDeleteDisabled" @click.native="toSearchDelete">删除</el-button>
        </wt-auth>
      </el-row>
      <el-row class="module-search-tree">
        <el-tree :props="treeProps" :load="loadNodeList" :filter-node-method="filterNodeList" :expand-on-click-node="false" node-key="id"
                 ref="nodeTree" @node-click="onNodeClick" :highlight-current="true" lazy ></el-tree>
      </el-row>
    </el-col>
    <el-col :span="18">
      <div>
        <el-table :data="result.list" class="wt-table" header-row-class-name="wt-table-header-row"
                  v-loading.body="form.isListLoading" element-loading-text="加载中.."
                  @sort-change="onSortChange"
                  size="mini" fit highlight-current-row>
          <el-table-column label='菜单名称' width="100px" >
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
          <el-table-column label='菜单排序' prop="orderNum" sortable="custom" width="100px">
            <template slot-scope="scope">
              {{scope.row.orderNum}}
            </template>
          </el-table-column>
          <el-table-column label='状态'   prop="isPublish" sortable="custom" width="80px">
            <template slot-scope="scope">
              <span :class="scope.row.isPublish | FILTER_IsPublish_Class">{{scope.row.isPublish | FILTER_IsPublish}}</span>
            </template>
          </el-table-column>
          <el-table-column label='创建时间'   prop="create_time" sortable="custom" width="150px">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              {{scope.row.create_time}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250px">
            <template slot-scope="scope">
              <wt-auth class="search-form-btn" hasAnyPremission="MODULE:VIEW">
                <el-button size="mini" @click="toView(scope.row)">查看</el-button>
              </wt-auth>
              <wt-auth class="search-form-btn" hasAnyPremission="MODULE:EDIT" v-if="scope.row.id != '1'">
                <el-button size="mini" @click="toEdit(scope.row)">编辑</el-button>
              </wt-auth>
              <wt-auth class="search-form-btn" hasAnyPremission="MODULE:DELETE" v-if="scope.row.id != '1'">
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
      </div>
    </el-col>

    <!--详情页面 开始 -->
    <!--查看-->
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
        <ModuleEdit @wt-dialog-close="isAddDialogVisible = false" @wt-dialog-refresh="onDialogAddRefresh"
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
    <!--详情页面 结束 -->

  </el-row>
</template>

<script>
  import request from '@/utils/request'
  import WtAuth from '@/components/WtAuth'
  import ModuleEdit from './moduleEdit'
  import ModuleView from './moduleView'

  export default {
    name: 'moduleTree',
    data() {
      return {
        filterText: '',
        form: { //  表单数据
          isListLoading: false,
          formData: {
            moduleName: '',
            moduleParentId: 0
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
        treeProps: {
          label: 'label',
          children: 'children',
          isLeaf: 'leaf'
        },
        isSearchDeleteDisabled: true,
        isViewDialogVisible: false,
        isAddDialogVisible: false,
        isEditDialogVisible: false,
        multipleDataList: []
      }
    },
    components: {
      ModuleEdit,
      ModuleView,
      WtAuth
    },
    created() {
      this.requestFormList()
    },
    methods: {
      /*  ------------------------- 数组件  -------------------------  */
      loadNodeList(node, resolve) {
        if (node.level === 0) {
          return resolve([{ label: '菜单模块根节点', id: '1' }])
        }
        resolve([])
        request({
          url: '/modules/auth/moduleNodeList',
          method: 'post',
          data: { id: node.data.id }
        }).then(response => {
          const data = []
          if (response.data != null) {
            response.data.forEach((item) => {
              data.push({ label: item.moduleName + (item.isPublish === 0 ? '(未启用)' : ''), id: item.id, parentId: item.module_parent_id, leaf: item.childrenSize <= 0 })
            })
          }
          resolve(data)
        }).catch(error => {
          console.log('error', error)
        })
      },
      onNodeClick(data, node, tree) {
        this.isSearchDeleteDisabled = (data.id === '1')
        this.form.formData.moduleParentId = data.id
        this.requestFormList()
      },
      filterNodeList(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
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
      toView(rowData) {
        //  点击单条查看
        this.isViewDialogVisible = true
        this.$store.dispatch('queryModuleDetailData', rowData.id)
      },
      toEdit(rowData) {
        //  点击单条编辑
        this.isEditDialogVisible = true
        this.$store.dispatch('queryModuleDetailData', rowData.id)
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
      toSearchRefresh() {
        const rootNode = this.$refs.nodeTree.getNode('1')
        this.loadNodeList(rootNode, (data) => {
          this.$refs.nodeTree.updateKeyChildren(rootNode.data.id, data)
        })
      },
      toSearchAdd() {
        //  搜索栏添加
        const defaultData = { }
        const currentNode = this.$refs.nodeTree.getCurrentNode()
        if (currentNode != null) {
          defaultData.module_parent_id = currentNode.id
          defaultData.module_parent_name = currentNode.label
        }
        defaultData.orderNum = '0'
        this.isAddDialogVisible = true
        this.$store.dispatch('resetModuleDetailData', defaultData)
        if (this.$refs.addView !== null && this.$refs.addView !== undefined) {
          this.$refs.addView.setup('')
        }
      },
      toSearchEdit() {
        //  搜索栏编辑
        this.isEditDialogVisible = true
        this.$store.dispatch('queryModuleDetailData', this.$refs.nodeTree.getCurrentKey())
      },
      toSearchDelete() {
        //  搜索栏删除
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.requestDeleteMutil([this.$refs.nodeTree.getCurrentKey()])
        }).catch(() => {
        })
      },
      onRefresh(parentId) {
        //  刷新当前树结构
        this.isEditDialogVisible = false
        this.isAddDialogVisible = false
        if (parentId !== null && parentId !== '') {
          const parentNode = this.$refs.nodeTree.getNode(parentId)
          this.loadNodeList(parentNode, (data) => {
            this.$refs.nodeTree.updateKeyChildren(parentNode.data.id, data)
          })
        }
      },
      onDialogAddRefresh(data) {
        this.isAddDialogVisible = false
        this.requestFormList()
        this.toSearchRefresh()
      },
      /*  ------------------------- 网络请求  -------------------------  */
      requestFormList() {
        //  右侧列表数据
        this.form.isListLoading = true
        request({
          url: '/modules/auth/moduleList',
          method: 'post',
          data: this.form
        }).then(response => {
          this.result = response.data
          this.form.isListLoading = false
        })
      },
      requestDeleteMutil(dataIdList) {
        //  删除
        request({
          url: '/modules/auth/moduleDelete',
          method: 'post',
          data: { list: dataIdList }
        }).then(response => {
          dataIdList.forEach((item) => {
            this.$refs.nodeTree.remove(item)
          })
          this.requestFormList()
        }).catch(error => {
          console.log('error', error)
        })
      }
    },
    watch: {
      filterText(val) {
        this.$refs.nodeTree.filter(val)
      }
    }
  }
</script>

<style scoped>
.module-search{margin: 16px 0;width: 300px;}
.module-search-btns{margin: 16px 0;display: flex;width: 300px;}
.module-search-tree{width: 300px;}
</style>

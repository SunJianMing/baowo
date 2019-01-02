<template>
  <div class="dialog-container" v-loading="isModuleDetailLoading">
    <el-form ref="form" :model="moduleDetailData" :rules="rules" label-width="150px" size="small" style="width: 60%;">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="菜单名称：" prop="moduleName">
        <el-input v-model="moduleDetailData.moduleName" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单：" prop="moduleParentId">
        <el-popover placement="right" width="400" v-model="isPickerModuleVisable">
          <el-tree :props="treeProps" :load="loadNodeList" :expand-on-click-node="false"
                   :accordion="true" ref="nodeTree" @node-click="onNodeClick" :highlight-current="true" lazy ></el-tree>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="isPickerModuleVisable = false">取消</el-button>
            <el-button type="primary" size="mini" @click="onPickerModule">确定</el-button>
          </div>
          <el-input slot="reference" v-model="moduleDetailData.moduleParentName" placeholder="请输入菜单名称" readonly></el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="菜单URL：" prop="moduleUrl">
        <el-input v-model="moduleDetailData.moduleUrl" placeholder="请输入菜单URL"></el-input>
      </el-form-item>
      <el-form-item label="菜单CODE：" prop="moduleCode">
        <el-input v-model="moduleDetailData.moduleCode" placeholder="请输入菜单CODE"></el-input>
      </el-form-item>
      <el-form-item label="菜单排序：" prop="orderNum">
        <el-input v-model="moduleDetailData.orderNum" placeholder="请输入菜单排序"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="isPublish">
        <el-select v-model="moduleDetailData.isPublish" placeholder="请选择状态">
          <el-option label="请选择" value="">请选择</el-option>
          <el-option label="启用" :value="1">启用</el-option>
          <el-option label="未启用" :value="0">未启用</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <wt-auth class="search-form-btn" hasAnyPremission="MODULE:ADD">
          <el-button type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'">立即创建</el-button>
        </wt-auth>
        <wt-auth class="search-form-btn" hasAnyPremission="MODULE:EDIT">
          <el-button type="primary" :loading="isSubmitLoading" @click="onSave" v-if="viewType === 'edit'">保存</el-button>
        </wt-auth>
        <el-button @click="onWtDialogClose">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import request from '@/utils/request'
    import { mapState } from 'vuex'
    import WtAuth from '@/components/WtAuth'

    export default {
      name: 'ModuleEdit',
      props: ['viewType'],
      components: {
        WtAuth
      },
      data() {
        return {
          isPickerModuleVisable: false, //  弹出选择上级模块
          pickerModuleData: {}, //  上级模块选择内容
          isSubmitLoading: false,
          treeProps: {
            label: 'label',
            children: 'children',
            isLeaf: 'leaf'
          },
          rules: {
            moduleName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
            moduleIcon: [{ required: true, message: '请输入模块图标', trigger: 'change' }],
            moduleParentId: [{ required: true, message: '请选择上级菜单', trigger: 'change' }],
            isPublish: [{ required: true, message: '请选择状态', trigger: 'change' }],
            moduleCode: [{ required: true, message: '请输入菜单CODE', trigger: 'blur' }],
            moduleUrl: [{ required: true, message: '请输入菜单URL', trigger: 'blur' }],
            orderNum: [{ required: true, message: '排序字段请输入整数', trigger: 'blur' }]
          }
        }
      },
      methods: {
        setup(data) {
          this.$refs['form'].resetFields()
        },
        /*  ------------------------- 模块树  -------------------------  */
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
                data.push({ label: item.moduleName, id: item.id, parentId: item.moduleParentId, leaf: (item.childrenSize <= 0) })
              })
            }
            resolve(data)
          }).catch(error => {
            console.log('error', error)
          })
        },
        onNodeClick(data, node, tree) {
          this.pickerModuleData = data
        },
        onPickerModule() {
          //  选择上级模块，点击确定
          this.moduleDetailData.moduleParentId = this.pickerModuleData.id
          this.moduleDetailData.moduleParentName = this.pickerModuleData.label
          this.isPickerModuleVisable = false
        },
        onAdd() {
          const that = this
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$confirm('是否保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
              }).then(() => {
                that.requestAddModuleDetail()
              }).catch(() => {
                that.isSubmitLoading = false
              })
            } else {
              return false
            }
          })
        },
        onSave() {
          const that = this
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$confirm('是否保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
              }).then(() => {
                that.requestUpdateModuleDetail()
              }).catch(() => {
                that.isSubmitLoading = false
              })
            } else {
              return false
            }
          })
        },
        requestUpdateModuleDetail() {
          const that = this
          that.isSubmitLoading = true
          request({
            url: '/modules/auth/moduleUpdate',
            method: 'post',
            data: this.moduleDetailData
          }).then(response => {
            that.isSubmitLoading = false
            that.onWtDialogRefresh()
          }).catch(error => {
            console.log('error', error)
            that.isSubmitLoading = false
          })
        },
        requestAddModuleDetail() {
          const that = this
          that.isSubmitLoading = true
          request({
            url: '/modules/auth/moduleAdd',
            method: 'post',
            data: this.moduleDetailData
          }).then(response => {
            that.isSubmitLoading = false
            that.onWtDialogRefresh()
          }).catch(error => {
            console.log('error', error)
            that.isSubmitLoading = false
          })
        },
        onWtDialogClose() {
          this.$emit('wt-dialog-close')
        },
        onWtDialogRefresh() {
          this.$emit('wt-dialog-refresh', { moduleParentId: this.moduleDetailData.moduleParentId })
        },
        findModule(modules, moduleId) {
          let tempModule = null
          modules.forEach((module) => {
            if (module.value === moduleId) {
              tempModule = module
              return
            }
            if (module.children.length > 0) {
              tempModule = this.findModule(module.children, moduleId)
            }
            if (tempModule !== null) {
              return
            }
          })
          return tempModule
        }
      },
      computed: {
        isReadonly() {
          return (this.viewType === 'view')
        },
        ...mapState({
          isModuleDetailLoading: state => state.auth.isModuleDetailLoading,
          moduleDetailData: state => state.auth.moduleDetailData
        })
      }
    }
</script>

<style scoped>

</style>

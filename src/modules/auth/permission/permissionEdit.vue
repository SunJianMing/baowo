<template>
  <div class="dialog-container" v-loading="isPermissionDetailLoading">
    <el-form ref="form" :model="permissionDetailData" :rules="rules" label-width="100px" size="small"
             style="width: 60%;">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="菜单名称：" prop="moduleId">
        <el-popover placement="right" width="400" v-model="isPickerModuleVisable">
          <el-tree :props="treeProps" :load="loadNodeList" :expand-on-click-node="false"
                   :accordion="true" ref="nodeTree" @node-click="onNodeClick" :highlight-current="true" lazy ></el-tree>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="isPickerModuleVisable = false">取消</el-button>
            <el-button type="primary" size="mini" @click="onPickerModule">确定</el-button>
          </div>
          <el-input slot="reference" v-model="permissionDetailData.moduleName" placeholder="请输入菜单名称" readonly></el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="权限名称：" prop="permissionName">
        <el-input v-model="permissionDetailData.permissionName" placeholder="请输入权限名称"></el-input>
      </el-form-item>
      <el-form-item label="权限代码：" prop="permissionCode">
        <el-input v-model="permissionDetailData.permissionCode" placeholder="请输入权限代码"></el-input>
        <span style="font-size: 12px;color: #999;">使用逗号分隔多个权限代码，如ACCOUNT:VIEW,ACCOUNT:EDIT</span>
        <el-button type="text" @click="onCreateDefaultCode">点击生成默认</el-button>
      </el-form-item>

      <el-form-item>
        <wt-auth class="search-form-btn" hasAnyPremission="PERMISSION:ADD">
          <el-button type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'">立即创建</el-button>
        </wt-auth>
        <wt-auth class="search-form-btn" hasAnyPremission="PERMISSION:EDIT">
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
      name: 'PermissionEdit',
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
            moduleId: [{ required: true, message: '请选择菜单名称', trigger: 'change' }],
            permissionCode: [{ required: true, message: '请输入权限代码', trigger: 'blur' }],
            permissionName: [{ required: true, message: '请输入权限名称', trigger: 'blur' }]
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
          this.permissionDetailData.moduleId = this.pickerModuleData.id
          this.permissionDetailData.moduleName = this.pickerModuleData.label
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
                that.requestAddPermissionDetail()
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
          this.$confirm('是否保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            that.requestUpdatePermissionDetail()
          }).catch(() => {
            that.isSubmitLoading = false
          })
        },
        onCreateDefaultCode() {
          this.$store.dispatch('resetPermissionDetailData', { moduleId: this.permissionDetailData.moduleId, moduleName: this.permissionDetailData.moduleName, permissionName: '查看,编辑,增加,删除', permissionCode: 'VIEW,EDIT,ADD,DELETE' })
        },
        requestUpdatePermissionDetail() {
          const that = this
          that.isSubmitLoading = true
          request({
            url: '/modules/auth/permissionUpdate',
            method: 'post',
            data: this.permissionDetailData
          }).then(response => {
            that.isSubmitLoading = false
            that.onWtDialogRefresh()
          }).catch(error => {
            console.log('error', error)
            that.isSubmitLoading = false
          })
        },
        requestAddPermissionDetail() {
          const that = this
          that.isSubmitLoading = true
          request({
            url: '/modules/auth/permissionAdd',
            method: 'post',
            data: this.permissionDetailData
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
          this.$emit('wt-dialog-refresh')
        }
      },
      computed: {
        isReadonly() {
          return (this.viewType === 'view')
        },
        ...mapState({
          isPermissionDetailLoading: state => state.auth.isPermissionDetailLoading,
          permissionDetailData: state => state.auth.permissionDetailData
        })
      }
    }
</script>

<style scoped>

</style>

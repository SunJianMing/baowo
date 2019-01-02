<template>
  <div class="dialog-container" v-loading="isOrganizationDetailLoading">
    <el-form ref="form" :model="organizationDetailData" :rules="rules" label-width="150px" size="small"
             style="width: 60%;">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="单位名称：" prop="organization_name">
        <el-input v-model="organizationDetailData.organization_name" placeholder="请输入单位名称"></el-input>
      </el-form-item>
      <el-form-item label="单位编码：" prop="organization_code">
        <el-input v-model="organizationDetailData.organization_code" placeholder="请输入单位编码"></el-input>
      </el-form-item>

      <el-form-item label="上级单位：" prop="organization_parent_id">
        <el-popover placement="right" width="400" v-model="isPickerOrganizationVisable">
          <el-tree :load="loadNodeList" :expand-on-click-node="false"
                   :accordion="true" ref="nodeTree" @node-click="onNodeClick" :highlight-current="true" lazy ></el-tree>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="isPickerOrganizationVisable = false">取消</el-button>
            <el-button type="primary" size="mini" @click="onPickerOrganization">确定</el-button>
          </div>
          <el-input slot="reference" v-model="organizationDetailData.organization_parent_name" placeholder="请选择上级单位" readonly></el-input>
        </el-popover>
      </el-form-item>
      <el-form-item label="单位负责人：" prop="organization_user">
        <el-input v-model="organizationDetailData.organization_user" placeholder="请输入单位负责人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="organization_user_phone">
        <el-input v-model="organizationDetailData.organization_user_phone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="is_publish">
        <el-select v-model="organizationDetailData.is_publish" placeholder="请选择状态">
          <el-option label="请选择" value="">请选择</el-option>
          <el-option label="启用" value="1">启用</el-option>
          <el-option label="未启用" value="0">未启用</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <wt-auth class="search-form-btn" hasAnyPremission="ORGANIZATION:ADD">
          <el-button type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'">立即创建</el-button>
        </wt-auth>
        <wt-auth class="search-form-btn" hasAnyPremission="ORGANIZATION:EDIT">
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
      name: 'OrganizationEdit',
      props: ['viewType'],
      components: {
        WtAuth
      },
      data() {
        return {
          isPickerOrganizationVisable: false, //  弹出选择上级模块
          pickerOrganizationData: {}, //  上级模块选择内容
          isSubmitLoading: false,
          rules: {
            organization_name: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
            organization_code: [{ required: true, message: '请输入单位编码', trigger: 'blur' }],
            organization_parent_id: [{ required: true, message: '请选择上级单位', trigger: 'change' }],
            organization_parent_name: [{ required: true, message: '请选择上级单位', trigger: 'change' }],
            is_publish: [{ required: true, message: '请选择状态', trigger: 'change' }]
          }
        }
      },
      methods: {
        setup(data) {
          this.$refs['form'].resetFields()
        },
        /*  ------------------------- 弹出选择菜单  -------------------------  */
        loadNodeList(node, resolve) {
          if (node.level === 0) {
            return resolve([{ label: '组织结构根节点', id: '1' }])
          }
          resolve([])
          request({
            url: '/modules/auth/organization_node_list',
            method: 'post',
            data: { id: node.data.id }
          }).then(response => {
            const data = []
            if (response.data != null) {
              response.data.forEach((item) => {
                data.push({ label: item.organization_name, id: item.id, parentId: item.organization_parent_id, isLeaf: (item.childrenSize <= 0) })
              })
            }
            resolve(data)
          }).catch(error => {
            console.log('error', error)
          })
        },
        onNodeClick(data, node, tree) {
          this.pickerOrganizationData = data
        },
        onPickerOrganization() {
          //  选择上级模块，点击确定
          this.organizationDetailData.organization_parent_id = this.pickerOrganizationData.id
          this.organizationDetailData.organization_parent_name = this.pickerOrganizationData.label
          this.isPickerOrganizationVisable = false
        },
        /*  ------------------------- 按钮  -------------------------  */
        onAdd() {
          const that = this
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$confirm('是否保存?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
              }).then(() => {
                that.requestAddOrganizationDetail()
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
                that.requestUpdateOrganizationDetail()
              }).catch(() => {
                that.isSubmitLoading = false
              })
            }
          })
        },
        requestUpdateOrganizationDetail() {
          const that = this
          that.isSubmitLoading = true
          request({
            url: '/modules/auth/organization_update',
            method: 'post',
            data: this.organizationDetailData
          }).then(response => {
            that.isSubmitLoading = false
            that.onWtDialogRefresh()
          }).catch(error => {
            console.log('error', error)
            that.isSubmitLoading = false
          })
        },
        requestAddOrganizationDetail() {
          const that = this
          that.isSubmitLoading = true
          request({
            url: '/modules/auth/organization_add',
            method: 'post',
            data: this.organizationDetailData
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
          this.$emit('wt-dialog-refresh', this.organizationDetailData.organization_parent_id)
        }
      },
      computed: {
        isReadonly() {
          return (this.viewType === 'view')
        },
        ...mapState({
          isOrganizationDetailLoading: state => state.auth.isOrganizationDetailLoading,
          organizationDetailData: state => state.auth.organizationDetailData,
          organizationSelectList: state => state.auth.organizationSelectList
        })
      }
    }
</script>

<style scoped>

</style>

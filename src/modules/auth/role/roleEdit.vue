<template>
  <div class="dialog-container wt-dialog-container" v-loading="isRoleDetailLoading">
    <el-form ref="form" :model="detailResult" :rules="rules" label-width="120px" size="small" class="wt-detail-form">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="角色名：" prop="roleName">
        <el-input v-model="detailResult.roleName" placeholder="请输入角色名"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="isPublish">
        <el-select v-model="detailResult.isPublish" placeholder="请选择状态">
          <el-option label="请选择" value="">请选择</el-option>
          <el-option label="启用" :value="1">启用</el-option>
          <el-option label="未启用" :value="0">未启用</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限设置" class="wt-section"></el-form-item>
      <el-checkbox-group v-model="detailResult.permissionList">
        <el-collapse class="wt-role-collapse">
          <el-collapse-item v-for="parentModule in roleModuleListMap['1']" :key="parentModule.id"
                            :title="parentModule.moduleName" :name="parentModule.id">
            <div class="module-contents">
              <div v-for="module in roleModuleListMap[parentModule.id + '']" class="module-content">
                <div class="module-title" @click="onClickModule(module.id)">{{module.moduleName}}：</div>
                <div class="module-children">
                  <div class="module-child" v-for="permission in rolePermissionListMap[module.id + '']">
                    <el-checkbox :label="permission.id">{{permission.permissionName}}</el-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-checkbox-group>
    </el-form>
    <div class="wt-detail-btns">
      <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ROLE:ADD">
        <el-button size="small" type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'">
          立即创建
        </el-button>
      </wt-auth>
      <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ROLE:EDIT">
        <el-button size="small" type="primary" :loading="isSubmitLoading" @click="onSave" v-if="viewType === 'edit'">
          保存
        </el-button>
      </wt-auth>
      <el-button size="small" @click="onWtDialogClose">关闭</el-button>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import WtAuth from '@/components/WtAuth'
  import { mapState } from 'vuex'

  export default {
    name: 'RoleEdit',
    props: ['viewType'],
    components: {
      WtAuth
    },
    data() {
      return {
        form: {
          isFromLoading: false,
          formUpdateUrl: '/modules/auth/roleUpdate',
          formAddUrl: '/modules/auth/roleAdd'
        },
        isSubmitLoading: false,
        rules: {
          roleId: [{ required: true, message: '请输入角色ID', trigger: 'change' }],
          roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }, { validator: this.$wtValidator.ValidatorNotBlank, message: '输入内容不能为空', trigger: 'blur' }],
          realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { validator: this.$wtValidator.ValidatorNotBlank, message: '输入内容不能为空', trigger: 'blur' }],
          newPassword: (this.viewType !== 'add') ? null : [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 5, max: 16, message: '密码长度需要5-16位', trigger: 'blur' }],
          confirmPassword: (this.viewType !== 'add') ? null : [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
          mobile: [{ required: true, message: '请输入手机号码', trigger: 'change' }],
          telephone: [{ required: true, message: '请输入座机号码', trigger: 'change' }],
          address: [{ required: true, message: '请输入详细地址', trigger: 'change' }],
          email: [{ required: true, message: '请输入电子邮箱', trigger: 'change' }],
          photo: [{ required: true, message: '请输入用户头像', trigger: 'change' }],
          duty: [{ required: true, message: '请输入职务/岗位', trigger: 'change' }],
          organizationId: [{ required: true, message: '请输入机构ID', trigger: 'change' }],
          totalPoint: [{ required: true, message: '请输入总点数', trigger: 'change' }],
          point: [{ required: true, message: '请输入剩余点数', trigger: 'change' }],
          expireTime: [{ required: true, message: '请输入账号过期时间', trigger: 'change' }],
          approvalState: [{ required: true, message: '请输入审批状态 -1/审核不通过,0/草稿,1/待审核,2/审核通过', trigger: 'change' }],
          orderNum: [{ required: true, message: '请输入排序', trigger: 'change' }],
          isLogout: [{ required: true, message: '请输入是否登出 0/未登出,1/已登出', trigger: 'change' }],
          isPublish: [{ required: true, message: '请选择状态', trigger: 'change' }]
        }
      }
    },
    methods: {
      setup(data) {
        this.$refs['form'].resetFields()
        this.$store.dispatch('queryRoleModuleListMap')
      },
      /*  ------------------------- 交互按钮  -------------------------  */
      onAdd() {
        const that = this
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$confirm('是否添加?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              that.requestAddRoleDetail()
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
          that.requestUpdateRoleDetail()
        }).catch(() => {
          that.isSubmitLoading = false
        })
      },
      onClickModule(moduleId) {
        let isAllChecked = true
        const itemIdList = []
        this.rolePermissionListMap[moduleId + ''].forEach((item) => {
          if (this.detailResult.permissionList.indexOf(item.id) === -1) {
            isAllChecked = false
          }
          itemIdList.push(item.id)
        })
        //  当前为全选状态，则变为不选状态
        if (isAllChecked) {
          const tempList = this.detailResult.permissionList.filter((itemId, index) => {
            if (itemIdList.indexOf(itemId) !== -1) {
              return false
            }
            return true
          })
          this.detailResult.permissionList = []
          tempList.forEach((itemId) => {
            this.detailResult.permissionList.push(itemId)
          })
        }
        //  当前为非全选状态，则变为全选
        if (!isAllChecked) {
          itemIdList.forEach((itemId) => {
            if (this.detailResult.permissionList.indexOf(itemId) === -1) {
              this.detailResult.permissionList.push(itemId)
            }
          })
        }
      },
      /*  ------------------------- 网络请求  -------------------------  */
      requestUpdateRoleDetail() {
        const that = this
        that.isSubmitLoading = true
        request({
          url: this.form.formUpdateUrl,
          method: 'post',
          data: this.detailResult
        }).then(response => {
          this.$message({ message: '保存成功', type: 'success' })
          that.isSubmitLoading = false
          that.onWtDialogRefresh()
        }).catch(error => {
          console.log('error', error)
          that.isSubmitLoading = false
        })
      },
      requestAddRoleDetail() {
        const that = this
        that.isSubmitLoading = true
        request({
          url: this.form.formAddUrl,
          method: 'post',
          data: this.detailResult
        }).then(response => {
          this.$message({ message: '保存成功', type: 'success' })
          that.isSubmitLoading = false
          that.onWtDialogRefresh()
        }).catch(error => {
          console.log('error', error)
          that.isSubmitLoading = false
        })
      },
      /*  ------------------------- 通用按钮  -------------------------  */
      onWtDialogClose() {
        this.$emit('wt-dialog-close')
      },
      onWtDialogRefresh() {
        this.$emit('wt-dialog-refresh')
      }
    },
    computed: {
      ...mapState({
        isRoleDetailLoading: state => state.auth.isRoleDetailLoading,
        detailResult: state => state.auth.roleDetailData,
        roleModuleListMap: state => state.auth.roleModuleListMap,
        rolePermissionListMap: state => state.auth.rolePermissionListMap
      })
    }
  }
</script>

<style scoped>
  .wt-role-collapse{margin: 16px 0;}
  .module-contents{margin: 0}
  .module-content{display: flex;margin: 8px 0;}
  .module-title{width: 150px;text-align: right;padding: 0 12px 0 0;font-size: 14px;cursor: pointer;}
  .module-children{display: flex;flex-wrap: wrap;width: 80%;}
  .module-child{margin: 0 12px;min-width: 110px;}
</style>

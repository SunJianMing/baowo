<template>
  <div class="dialog-container wt-dialog-container" v-loading="isAccountDetailLoading">
    <el-form ref="form" :model="detailResult" :rules="rules" label-width="120px" size="small" class="wt-detail-form">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="detailResult.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="realname">
        <el-input v-model="detailResult.realname" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="角色：" prop="roleId">
        <el-select v-model="detailResult.roleId" placeholder="请选择角色">
          <el-option label="请选择" value=""></el-option>
          <el-option v-for="roleItem in roleList" :key="roleItem.id" :label="roleItem.label" :value="roleItem.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input v-model="detailResult.newPassword" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPassword">
        <el-input v-model="detailResult.confirmPassword" type="password" placeholder="请输入确认密码"></el-input>
      </el-form-item>
      <el-form-item label="手机号码：" prop="mobile">
        <el-input v-model="detailResult.mobile" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email">
        <el-input v-model="detailResult.email" placeholder="请输入电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="detailResult.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="isPublish">
        <el-select v-model="detailResult.isPublish" placeholder="请选择状态">
          <el-option label="请选择" value="">请选择</el-option>
          <el-option label="启用" :value="1">启用</el-option>
          <el-option label="未启用" :value="0">未启用</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序：" prop="orderNum">
        <el-input v-model="detailResult.orderNum" placeholder="请输入排序"></el-input>
      </el-form-item>
    </el-form>
    <div class="wt-detail-btns">
      <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACCOUNT:ADD">
        <el-button size="small" type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'">
          立即创建
        </el-button>
      </wt-auth>
      <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACCOUNT:EDIT">
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
      name: 'AccountEdit',
      props: ['viewType'],
      components: {
        WtAuth
      },
      data() {
        return {
          roleList: [],
          form: {
            isFromLoading: false,
            formUpdateUrl: '/modules/auth/accountUpdate',
            formAddUrl: '/modules/auth/accountAdd'
          },
          isSubmitLoading: false,
          rules: {
            username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { validator: this.$wtValidator.ValidatorNotBlank, message: '输入内容不能为空', trigger: 'blur' }],
            realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { validator: this.$wtValidator.ValidatorNotBlank, message: '输入内容不能为空', trigger: 'blur' }],
            roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
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
      created() {
        this.requestAccountRoleList()
      },
      methods: {
        setup(data) {
          this.$refs['form'].resetFields()
          this.requestAccountRoleList()
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
                that.requestAddAccountDetail()
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
            that.requestUpdateAccountDetail()
          }).catch(() => {
            that.isSubmitLoading = false
          })
        },
        /*  ------------------------- 网络请求  -------------------------  */
        requestUpdateAccountDetail() {
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
        requestAddAccountDetail() {
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
        requestAccountRoleList() {
          console.log('requestAccountRoleList')
          const that = this
          request({
            url: '/modules/auth/accountRoleList',
            method: 'post',
            data: { }
          }).then(response => {
            that.roleList = []
            if (response.data != null) {
              response.data.forEach((item) => {
                that.roleList.push({ label: item.roleName, id: item.id, parentId: item.moduleParentId, leaf: true })
              })
            }
          }).catch(error => {
            console.log('error', error)
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
          isAccountDetailLoading: state => state.auth.isAccountDetailLoading,
          detailResult: state => state.auth.accountDetailData
        })
      }
    }
</script>

<style scoped>

</style>

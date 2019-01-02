<template>
  <div v-loading="isSaveLoading">
    <div class="wt-basic-title">基本设置</div>
    <el-form ref="form" :model="detailResult" :rules="rules" size="small" label-width="120px" style="max-width: 400px;margin: 0 32px;">
      <el-form-item label="用户名：">
        <el-input v-model="detailResult.username" placeholder="请输入用户名" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="realname">
        <el-input v-model="detailResult.realname" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="修改密码：">
        <el-switch v-model="isModifyPassword">
        </el-switch>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword" v-if="isModifyPassword">
        <el-input v-model="detailResult.newPassword" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPassword" v-if="isModifyPassword">
        <el-input v-model="detailResult.confirmPassword" type="password" placeholder="请输入确认密码"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="detailResult.remark" type="textarea" maxlength="100" rows="4" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import WtAuth from '@/components/WtAuth'
  import request from '@/utils/request'
  import { mapState } from 'vuex'

  export default {
    data() {
      const that = this
      const ValidatorPassword = (rule, value, callback) => {
        if (that.detailResult.newPassword !== that.detailResult.confirmPassword) {
          return callback(new Error('两次输入的密码必须相同'))
        }
        return callback()
      }
      return {
        isSaveLoading: false,
        isModifyPassword: false,
        form: {},
        rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { validator: this.$wtValidator.ValidatorNotBlank, message: '输入内容不能为空', trigger: 'blur' }],
          realname: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { validator: this.$wtValidator.ValidatorNotBlank, message: '输入内容不能为空', trigger: 'blur' }],
          newPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 5, max: 16, message: '密码长度需要5-16位', trigger: 'blur' }],
          confirmPassword: [{ required: true, message: '请输入确认密码', trigger: 'blur' }, { validator: ValidatorPassword, trigger: 'blur' }],
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
    components: {
      WtAuth
    },
    activated() {
      this.$store.dispatch('queryAccountDetailData', this.userId)
    },
    methods: {
      onSave() {
        const that = this
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$confirm('是否保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              that.requestUpdateAccountDetail()
            }).catch(() => {
              that.isSaveLoading = false
            })
          } else {
            return false
          }
        })
      },
      /*  ------------------------- 网络请求  -------------------------  */
      requestUpdateAccountDetail() {
        const that = this
        that.isSaveLoading = true
        request({
          url: '/modules/auth/updateAccountBasic',
          method: 'post',
          data: this.detailResult
        }).then(response => {
          that.$message({ message: '保存成功', type: 'success' })
          that.isSaveLoading = false
          that.$store.dispatch('queryAccountDetailData', that.userId)
        }).catch(() => {
          that.isSaveLoading = false
        })
      }
    },
    computed: {
      ...mapState({
        userId: state => state.auth.userId,
        detailResult: state => state.auth.accountDetailData
      })
    }
  }
</script>

<style scoped>
  .wt-basic-title{font-size: 22px;color: #333; margin: 24px 0px;margin-left: 50px;}
</style>

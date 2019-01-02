<template>
  <div class="dialog-container wt-dialog-container" v-loading="isAccountDetailLoading">
    <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="用户名：">
        <el-input :value="detailResult.username" placeholder="请输入用户名" readonly></el-input>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input :value="detailResult.realname" placeholder="请输入姓名" readonly></el-input>
      </el-form-item>
      <el-form-item label="手机号码：">
        <el-input :value="detailResult.mobile" placeholder="请输入手机号码" readonly></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱：">
        <el-input :value="detailResult.email" placeholder="请输入电子邮箱" readonly></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input :value="detailResult.remark" placeholder="请输入备注" readonly></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-input :value="detailResult.isPublish | FILTER_IsPublish" readonly></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input :value="detailResult.orderNum" placeholder="请输入排序" readonly></el-input>
      </el-form-item>
    </el-form>
    <div class="wt-detail-btns">
      <el-button size="small" @click="onWtDialogClose">关闭</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'AccountView',
    props: ['viewType'],
    data() {
      return {}
    },
    methods: {
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

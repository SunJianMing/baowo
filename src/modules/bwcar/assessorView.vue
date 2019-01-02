<template>
    <div class="dialog-container wt-dialog-container" v-loading="isAssessorDetailLoading">
      <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
        <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="用户名，作为pad端登录账号唯一：">
          <el-input value="detailResult.userName" placeholder="请输入用户名，作为pad端登录账号唯一" readonly></el-input>
      </el-form-item>
      <el-form-item label="年龄：">
          <el-input value="detailResult.age" placeholder="请输入年龄" readonly></el-input>
      </el-form-item>
      <el-form-item label="性别 1男/2女：">
          <el-input value="detailResult.sex" placeholder="请输入性别 1男/2女" readonly></el-input>
      </el-form-item>
      <el-form-item label="身高cm：">
          <el-input value="detailResult.height" placeholder="请输入身高cm" readonly></el-input>
      </el-form-item>
      <el-form-item label="体重kg：">
          <el-input value="detailResult.weight" placeholder="请输入体重kg" readonly></el-input>
      </el-form-item>
      <el-form-item label="驾龄年：">
          <el-input value="detailResult.drivingYears" placeholder="请输入驾龄年" readonly></el-input>
      </el-form-item>
      <el-form-item label="排序：">
          <el-input value="detailResult.orderNum" placeholder="请输入排序" readonly></el-input>
      </el-form-item>
      </el-form>
    <div class="wt-detail-btns" >
      <el-button size="small" @click="onWtDialogClose">关闭</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'AssessorView',
    props: ['viewType'],
    data() {
      return {
      }
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
        isAssessorDetailLoading: state => state.assessor.isAssessorDetailLoading,
        detailResult: state => state.assessor.assessorDetailData
      })
    }
  }
</script>

<style scoped>

</style>

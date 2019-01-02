<template>
    <div class="dialog-container wt-dialog-container" v-loading="isActivityObjectScoreDetailLoading">
      <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
        <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="评价活动ID：">
          <el-input value="detailResult.activityId" placeholder="请输入评价活动ID" readonly></el-input>
      </el-form-item>
      <el-form-item label="评价对象ID：">
          <el-input value="detailResult.activityObjectId" placeholder="请输入评价对象ID" readonly></el-input>
      </el-form-item>
      <el-form-item label="评价人员ID：">
          <el-input value="detailResult.assessorId" placeholder="请输入评价人员ID" readonly></el-input>
      </el-form-item>
      <el-form-item label="分数，100表示10分，null表示没有打分：">
          <el-input value="detailResult.score" placeholder="请输入分数，100表示10分，null表示没有打分" readonly></el-input>
      </el-form-item>
      <el-form-item label="是否有备注 0/没有,1/有：">
          <el-input value="detailResult.isRemark" placeholder="请输入是否有备注 0/没有,1/有" readonly></el-input>
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
    name: 'ActivityObjectScoreView',
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
        isActivityObjectScoreDetailLoading: state => state.activityObjectScore.isActivityObjectScoreDetailLoading,
        detailResult: state => state.activityObjectScore.activityObjectScoreDetailData
      })
    }
  }
</script>

<style scoped>

</style>

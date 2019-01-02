<template>
    <div class="dialog-container wt-dialog-container" v-loading="isActivityAssessorDetailLoading">
      <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
        <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="评价活动ID：">
          <el-input value="detailResult.activityId" placeholder="请输入评价活动ID" readonly></el-input>
      </el-form-item>
      <el-form-item label="评价人员ID：">
          <el-input value="detailResult.assessorId" placeholder="请输入评价人员ID" readonly></el-input>
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
    name: 'ActivityAssessorView',
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
        isActivityAssessorDetailLoading: state => state.activityAssessor.isActivityAssessorDetailLoading,
        detailResult: state => state.activityAssessor.activityAssessorDetailData
      })
    }
  }
</script>

<style scoped>

</style>

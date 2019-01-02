<template>
    <div class="dialog-container wt-dialog-container" v-loading="isActivityObjectScoreRemarkDetailLoading">
      <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
        <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="评价打分信息ID：">
          <el-input value="detailResult.activityObjectScoreId" placeholder="请输入评价打分信息ID" readonly></el-input>
      </el-form-item>
      <el-form-item label="参数类型 0/文字,1/图片：">
          <el-input value="detailResult.type" placeholder="请输入参数类型 0/文字,1/图片" readonly></el-input>
      </el-form-item>
      <el-form-item label="内容：">
          <el-input value="detailResult.content" placeholder="请输入内容" readonly></el-input>
      </el-form-item>
      <el-form-item label="视频、语音的时长：">
          <el-input value="detailResult.ext1" placeholder="请输入视频、语音的时长" readonly></el-input>
      </el-form-item>
      <el-form-item label="视频的封面图片：">
          <el-input value="detailResult.ext2" placeholder="请输入视频的封面图片" readonly></el-input>
      </el-form-item>
      <el-form-item label="：">
          <el-input value="detailResult.ext3" placeholder="请输入" readonly></el-input>
      </el-form-item>
      <el-form-item label="：">
          <el-input value="detailResult.ext4" placeholder="请输入" readonly></el-input>
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
    name: 'ActivityObjectScoreRemarkView',
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
        isActivityObjectScoreRemarkDetailLoading: state => state.activityObjectScoreRemark.isActivityObjectScoreRemarkDetailLoading,
        detailResult: state => state.activityObjectScoreRemark.activityObjectScoreRemarkDetailData
      })
    }
  }
</script>

<style scoped>

</style>

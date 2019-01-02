<template>
    <div class="dialog-container wt-dialog-container" v-loading="isActivityDetailLoading">
      <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
        <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="活动类型id：">
          <el-input value="detailResult.evaluateTypeId" placeholder="请输入活动类型id" readonly></el-input>
      </el-form-item>
      <el-form-item label="评价问卷id：">
          <el-input value="detailResult.evaluateSurveyId" placeholder="请输入评价问卷id" readonly></el-input>
      </el-form-item>
      <el-form-item label="文件名称：">
          <el-input value="detailResult.name" placeholder="请输入文件名称" readonly></el-input>
      </el-form-item>
      <el-form-item label="活动开始时间：">
          <el-input value="detailResult.startTime" placeholder="请输入活动开始时间" readonly></el-input>
      </el-form-item>
      <el-form-item label="活动结束时间：">
          <el-input value="detailResult.endTime" placeholder="请输入活动结束时间" readonly></el-input>
      </el-form-item>
      <el-form-item label="活动状态 0/默认,1/待发布,2/进行中,3/已结束(正常结束),4/已结束(主动结束)：">
          <el-input value="detailResult.state" placeholder="请输入活动状态 0/默认,1/待发布,2/进行中,3/已结束(正常结束),4/已结束(主动结束)" readonly></el-input>
      </el-form-item>
      <el-form-item label="是否显示属性表：">
          <el-input value="detailResult.isShowProperty" placeholder="请输入是否显示属性表" readonly></el-input>
      </el-form-item>
      <el-form-item label="是否必须完整完成 0/不必完成,1/必须完成：">
          <el-input value="detailResult.isNeedComplete" placeholder="请输入是否必须完整完成 0/不必完成,1/必须完成" readonly></el-input>
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
    name: 'ActivityView',
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
        isActivityDetailLoading: state => state.activity.isActivityDetailLoading,
        detailResult: state => state.activity.activityDetailData
      })
    }
  }
</script>

<style scoped>

</style>

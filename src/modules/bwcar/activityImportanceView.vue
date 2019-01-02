<template>
    <div class="dialog-container wt-dialog-container" v-loading="isActivityImportanceDetailLoading">
      <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
        <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="评价活动ID：">
          <el-input value="detailResult.activityId" placeholder="请输入评价活动ID" readonly></el-input>
      </el-form-item>
      <el-form-item label="属性级别 1/一级、2/2级、3/3级、4/4级：">
          <el-input value="detailResult.level" placeholder="请输入属性级别 1/一级、2/2级、3/3级、4/4级" readonly></el-input>
      </el-form-item>
      <el-form-item label="重要等级1，2，3，4：">
          <el-input value="detailResult.importanceLevel" placeholder="请输入重要等级1，2，3，4" readonly></el-input>
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
    name: 'ActivityImportanceView',
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
        isActivityImportanceDetailLoading: state => state.activityImportance.isActivityImportanceDetailLoading,
        detailResult: state => state.activityImportance.activityImportanceDetailData
      })
    }
  }
</script>

<style scoped>

</style>

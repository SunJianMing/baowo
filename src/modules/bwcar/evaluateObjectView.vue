<template>
    <div class="dialog-container wt-dialog-container" v-loading="isEvaluateObjectDetailLoading">
      <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
        <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="活动类型id：">
          <el-input value="detailResult.evaluateTypeId" placeholder="请输入活动类型id" readonly></el-input>
      </el-form-item>
      <el-form-item label="文件名称：">
          <el-input value="detailResult.name" placeholder="请输入文件名称" readonly></el-input>
      </el-form-item>
      <el-form-item label="评价类型图片：">
          <el-input value="detailResult.picUrl" placeholder="请输入评价类型图片" readonly></el-input>
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
    name: 'EvaluateObjectView',
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
        isEvaluateObjectDetailLoading: state => state.evaluateObject.isEvaluateObjectDetailLoading,
        detailResult: state => state.evaluateObject.evaluateObjectDetailData
      })
    }
  }
</script>

<style scoped>

</style>

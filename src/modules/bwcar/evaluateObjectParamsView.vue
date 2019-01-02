<template>
    <div class="dialog-container wt-dialog-container" v-loading="isEvaluateObjectParamsDetailLoading">
      <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
        <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="评价对象ID：">
          <el-input value="detailResult.evaluateObjectId" placeholder="请输入评价对象ID" readonly></el-input>
      </el-form-item>
      <el-form-item label="评价参数ID：">
          <el-input value="detailResult.evaluateParamsId" placeholder="请输入评价参数ID" readonly></el-input>
      </el-form-item>
      <el-form-item label="参数类型 0/文字,1/图片：">
          <el-input value="detailResult.type" placeholder="请输入参数类型 0/文字,1/图片" readonly></el-input>
      </el-form-item>
      <el-form-item label="参数值：">
          <el-input value="detailResult.val" placeholder="请输入参数值" readonly></el-input>
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
    name: 'EvaluateObjectParamsView',
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
        isEvaluateObjectParamsDetailLoading: state => state.evaluateObjectParams.isEvaluateObjectParamsDetailLoading,
        detailResult: state => state.evaluateObjectParams.evaluateObjectParamsDetailData
      })
    }
  }
</script>

<style scoped>

</style>

<template>
    <div class="dialog-container wt-dialog-container" v-loading="isPropertyDetailDetailLoading">
      <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
        <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="活动类型id：">
          <el-input value="detailResult.propertyId" placeholder="请输入活动类型id" readonly></el-input>
      </el-form-item>
      <el-form-item label="属性备注：">
          <el-input value="detailResult.summary" placeholder="请输入属性备注" readonly></el-input>
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
    name: 'PropertyDetailView',
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
        isPropertyDetailDetailLoading: state => state.propertyDetail.isPropertyDetailDetailLoading,
        detailResult: state => state.propertyDetail.propertyDetailDetailData
      })
    }
  }
</script>

<style scoped>

</style>

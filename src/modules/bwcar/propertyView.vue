<template>
    <div class="dialog-container wt-dialog-container" v-loading="isPropertyDetailLoading">
      <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
        <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="活动类型id：">
          <el-input value="detailResult.evaluateTypeId" placeholder="请输入活动类型id" readonly></el-input>
      </el-form-item>
      <el-form-item label="父属性的ID：">
          <el-input value="detailResult.parentId" placeholder="请输入父属性的ID" readonly></el-input>
      </el-form-item>
      <el-form-item label="文件名称：">
          <el-input value="detailResult.name" placeholder="请输入文件名称" readonly></el-input>
      </el-form-item>
      <el-form-item label="属性级别 1/一级、2/2级、3/3级、4/4级：">
          <el-input value="detailResult.level" placeholder="请输入属性级别 1/一级、2/2级、3/3级、4/4级" readonly></el-input>
      </el-form-item>
      <el-form-item label="重要度：">
          <el-input value="detailResult.importance" placeholder="请输入重要度" readonly></el-input>
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
    name: 'PropertyView',
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
        isPropertyDetailLoading: state => state.property.isPropertyDetailLoading,
        detailResult: state => state.property.propertyDetailData
      })
    }
  }
</script>

<style scoped>

</style>

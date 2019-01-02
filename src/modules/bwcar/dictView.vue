<template>
    <div class="dialog-container wt-dialog-container" v-loading="isDictDetailLoading">
      <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
        <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="所属模块：">
          <el-input value="detailResult.moduleKey" placeholder="请输入所属模块" readonly></el-input>
      </el-form-item>
      <el-form-item label="所属组：">
          <el-input value="detailResult.groupKey" placeholder="请输入所属组" readonly></el-input>
      </el-form-item>
      <el-form-item label="字典key：">
          <el-input value="detailResult.dictKey" placeholder="请输入字典key" readonly></el-input>
      </el-form-item>
      <el-form-item label="字典值：">
          <el-input value="detailResult.dictValue" placeholder="请输入字典值" readonly></el-input>
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
    name: 'DictView',
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
        isDictDetailLoading: state => state.dict.isDictDetailLoading,
        detailResult: state => state.dict.dictDetailData
      })
    }
  }
</script>

<style scoped>

</style>

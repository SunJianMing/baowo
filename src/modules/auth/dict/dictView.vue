<template>
  <div class="dialog-container" v-loading="isDictDetailLoading">
    <el-form ref="form" :model="dictDetailData" :rules="rules" label-width="150px" size="small" style="width: 100%;">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="模块key" prop="module_key" style="width: 60%">
        <el-input v-model="dictDetailData.module_key" placeholder="请输入模块key" readonly></el-input>
      </el-form-item>
      <el-form-item label="分组key" prop="group_key" style="width: 60%">
        <el-input v-model="dictDetailData.group_key" placeholder="请输入分组key" readonly></el-input>
      </el-form-item>
      <el-form-item label="数据key" prop="dict_key" style="width: 60%">
        <el-input v-model="dictDetailData.dict_key" placeholder="请输入数据key" readonly></el-input>
      </el-form-item>
      <el-form-item label="数据Value" prop="dict_value" style="width: 60%">
        <el-input v-model="dictDetailData.dict_value" placeholder="请输入数据Value" readonly></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onWtDialogClose">取消</el-button>
      </el-form-item>
    </el-form>
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
        isDictDetailLoading: state => state.auth.isDictDetailLoading,
        dictDetailData: state => state.auth.dictDetailData
      })
    }
  }
</script>

<style scoped>
  .wt-role-collapse{margin: 16px 0;}
  .module-contents{margin: 0}
  .module-content{display: flex;margin: 8px 0;}
  .module-title{width: 150px;text-align: right;padding: 0 12px 0 0;font-size: 14px;}
  .module-children{display: flex;flex-wrap: wrap;width: 80%;}
  .module-child{margin: 0 12px;min-width: 110px;}
</style>

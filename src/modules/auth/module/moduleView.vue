<template>
  <div class="dialog-container" v-loading="isModuleDetailLoading">
    <el-form ref="form" :model="moduleDetailData" label-width="100px" size="small" style="width: 60%;">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="菜单名：">
        <el-input :value="moduleDetailData.moduleName" placeholder="" :readonly="isReadonly"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单：">
        <el-input :value="moduleDetailData.moduleParentName" placeholder="" :readonly="isReadonly"></el-input>
      </el-form-item>
      <el-form-item label="菜单CODE：">
        <el-input :value="moduleDetailData.moduleCode" placeholder="" :readonly="isReadonly"></el-input>
      </el-form-item>
      <el-form-item label="菜单URL：">
        <el-input :value="moduleDetailData.moduleUrl" placeholder="" :readonly="isReadonly"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input :value="moduleDetailData.orderNum" placeholder="" :readonly="isReadonly"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input :value="moduleDetailData.isPublish | FILTER_IsPublish" readonly="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onWtDialogClose">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'ModuleView',
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
      isReadonly() {
        return (this.viewType === 'view')
      },
      ...mapState({
        isModuleDetailLoading: state => state.auth.isModuleDetailLoading,
        moduleDetailData: state => state.auth.moduleDetailData
      })
    }
  }
</script>

<style scoped>

</style>

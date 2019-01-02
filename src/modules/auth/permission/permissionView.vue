<template>
  <div class="dialog-container" v-loading="isPermissionDetailLoading">
    <el-form ref="form" :model="permissionDetailData" label-width="100px" size="small" style="width: 60%;">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
    <el-form-item label="菜单名称：">
        <el-input :value="permissionDetailData.moduleName" placeholder="" :readonly="isReadonly"></el-input>
    </el-form-item>
    <el-form-item label="权限名称：">
        <el-input :value="permissionDetailData.permissionName" placeholder="" :readonly="isReadonly"></el-input>
    </el-form-item>
    <el-form-item label="权限代码：">
        <el-input :value="permissionDetailData.permissionCode" placeholder="" :readonly="isReadonly"></el-input>
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
    name: 'PermissionView',
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
        isPermissionDetailLoading: state => state.auth.isPermissionDetailLoading,
        permissionDetailData: state => state.auth.permissionDetailData
      })
    }
  }
</script>

<style scoped>

</style>

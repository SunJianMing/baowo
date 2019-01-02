<template>
  <div class="dialog-container" v-loading="isOrganizationDetailLoading">
    <el-form ref="form" :model="organizationDetailData" label-width="100px" size="small" style="width: 60%;">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
    <el-form-item label="单位名称：">
        <el-input :value="organizationDetailData.organization_name" placeholder="" :readonly="isReadonly"></el-input>
    </el-form-item>
    <el-form-item label="单位编码：">
        <el-input :value="organizationDetailData.organization_code" placeholder="" :readonly="isReadonly"></el-input>
    </el-form-item>
    <el-form-item label="上级单位：">
        <el-input :value="organizationDetailData.organization_parent_name" placeholder="" :readonly="isReadonly"></el-input>
    </el-form-item>
    <el-form-item label="单位负责人：">
        <el-input :value="organizationDetailData.organization_user" placeholder="" :readonly="isReadonly"></el-input>
    </el-form-item>
    <el-form-item label="联系电话：">
        <el-input :value="organizationDetailData.organization_user_phone" placeholder="" :readonly="isReadonly"></el-input>
    </el-form-item>
    <el-form-item label="状态：">
        <el-input :value="organizationDetailData.is_publish | FILTER_IsPublish" placeholder="" :readonly="isReadonly"></el-input>
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
    name: 'OrganizationView',
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
        isOrganizationDetailLoading: state => state.auth.isOrganizationDetailLoading,
        organizationDetailData: state => state.auth.organizationDetailData
      })
    }
  }
</script>

<style scoped>

</style>

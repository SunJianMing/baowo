<template>
  <div class="dialog-container wt-dialog-container" v-loading="isRoleDetailLoading">
    <el-form ref="form" label-width="120px" size="small" class="wt-detail-form">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="角色名：">
        <el-input :value="detailResult.roleName" placeholder="请输入角色名" readonly></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-input :value="detailResult.isPublish | FILTER_IsPublish" readonly></el-input>
      </el-form-item>
      <el-form-item label="权限设置" class="wt-section"></el-form-item>
      <el-checkbox-group v-model="detailResult.permissionList">
        <el-collapse class="wt-role-collapse">
          <el-collapse-item v-for="parentModule in roleModuleListMap['1']" :key="parentModule.id"
                            :title="parentModule.moduleName" :name="parentModule.id">
            <div class="module-contents">
              <div v-for="module in roleModuleListMap[parentModule.id + '']" class="module-content">
                <div class="module-title">{{module.moduleName}}：</div>
                <div class="module-children">
                  <div class="module-child" v-for="permission in rolePermissionListMap[module.id + '']">
                    <el-checkbox :label="permission.id" disabled>{{permission.permissionName}}</el-checkbox>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-checkbox-group>
    </el-form>
    <div class="wt-detail-btns">
      <el-button size="small" @click="onWtDialogClose">关闭</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'RoleView',
    props: ['viewType'],
    data() {
      return {}
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
        isRoleDetailLoading: state => state.auth.isRoleDetailLoading,
        detailResult: state => state.auth.roleDetailData,
        roleModuleListMap: state => state.auth.roleModuleListMap,
        rolePermissionListMap: state => state.auth.rolePermissionListMap
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

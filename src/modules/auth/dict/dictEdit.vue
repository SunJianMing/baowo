<template>
  <div class="dialog-container" v-loading="isDictDetailLoading">
    <el-form ref="form" :model="dictDetailData" :rules="rules" label-width="150px" size="small" style="width: 100%;">
      <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="模块key" prop="module_key" style="width: 60%">
        <el-input v-model="dictDetailData.module_key" placeholder="请输入模块key"></el-input>
      </el-form-item>
      <el-form-item label="分组key" prop="group_key" style="width: 60%">
        <el-input v-model="dictDetailData.group_key" placeholder="请输入分组key"></el-input>
      </el-form-item>
      <el-form-item label="数据key" prop="dict_key" style="width: 60%">
        <el-input v-model="dictDetailData.dict_key" placeholder="请输入数据key"></el-input>
      </el-form-item>
      <el-form-item label="数据Value" prop="dict_value" style="width: 60%">
        <el-input v-model="dictDetailData.dict_value" placeholder="请输入数据Value"></el-input>
      </el-form-item>
      <el-form-item>
        <wt-auth class="search-form-btn" hasAnyPremission="ROLE:ADD" >
          <el-button type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'" >立刻创建</el-button>
        </wt-auth>
        <wt-auth class="search-form-btn" hasAnyPremission="ROLE:EDIT" >
          <el-button type="primary" :loading="isSubmitLoading" @click="onSave" v-if="viewType === 'edit'" >保存</el-button>
        </wt-auth>
        <el-button @click="onWtDialogClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import WtAuth from '@/components/WtAuth'
  import request from '@/utils/request'
  import { mapState } from 'vuex'

  export default {
    name: 'DictEdit',
    props: ['viewType'],
    components: {
      WtAuth
    },
    data() {
      return {
        isSubmitLoading: false,
        rules: {
          module_key: [{ required: true, message: '请输入模块key', trigger: 'blur' }],
          group_key: [{ required: true, message: '请输入分组key', trigger: 'blur' }],
          dict_key: [{ required: true, message: '请输入数据key', trigger: 'blur' }],
          dict_value: [{ required: true, message: '请输入数据Value', trigger: 'blur' }]
        }
      }
    },
    methods: {
      setup(data) {
        this.$refs['form'].resetFields()
      },
      onAdd() {
        //  新建提交
        const that = this
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              that.requestAddRoleDetail()
            }).catch(() => {
              that.isSubmitLoading = false
            })
          } else {
            return false
          }
        })
      },
      onSave() {
        const that = this
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$confirm('是否保存?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              that.requestUpdateRoleDetail()
            }).catch(() => {
              that.isSubmitLoading = false
            })
          } else {
            return false
          }
        })
      },
      requestUpdateRoleDetail() {
        const that = this
        that.isSubmitLoading = true
        request({
          url: '/modules/auth/dict_update',
          method: 'post',
          data: this.dictDetailData
        }).then(response => {
          that.isSubmitLoading = false
          that.onWtDialogRefresh()
        }).catch(error => {
          console.log('error', error)
          that.isSubmitLoading = false
        })
      },
      requestAddRoleDetail() {
        const that = this
        that.isSubmitLoading = true
        request({
          url: '/modules/auth/dict_add',
          method: 'post',
          data: this.dictDetailData
        }).then(response => {
          that.isSubmitLoading = false
          that.onWtDialogRefresh()
        }).catch(error => {
          console.log('error', error)
          that.isSubmitLoading = false
        })
      },
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

<template>
    <div class="dialog-container wt-dialog-container" v-loading="isActivityImportanceDetailLoading">
        <el-form ref="form" :model="detailResult" :rules="rules" label-width="120px" size="small" class="wt-detail-form">
              <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="评价活动ID：" prop="activityId" >
          <el-input v-model="detailResult.activityId" placeholder="请输入评价活动ID" ></el-input>
      </el-form-item>
      <el-form-item label="属性级别 1/一级、2/2级、3/3级、4/4级：" prop="level" >
          <el-input v-model="detailResult.level" placeholder="请输入属性级别 1/一级、2/2级、3/3级、4/4级" ></el-input>
      </el-form-item>
      <el-form-item label="重要等级1，2，3，4：" prop="importanceLevel" >
          <el-input v-model="detailResult.importanceLevel" placeholder="请输入重要等级1，2，3，4" ></el-input>
      </el-form-item>
          </el-form>
        <div class="wt-detail-btns" >
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACTIVITYIMPORTANCE:ADD">
                <el-button size="small" type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'" >立即创建</el-button>
            </wt-auth>
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACTIVITYIMPORTANCE:EDIT">
                <el-button size="small" type="primary" :loading="isSubmitLoading" @click="onSave" v-if="viewType === 'edit'" >保存</el-button>
            </wt-auth>
            <el-button size="small" @click="onWtDialogClose">关闭</el-button>
        </div>
    </div>
</template>

<script>
    import request from '@/utils/request'
    import WtAuth from '@/components/WtAuth'
    import { mapState } from 'vuex'

    export default {
      name: 'ActivityImportanceEdit',
      props: ['viewType'],
      components: {
        WtAuth
      },
      data() {
        return {
          form: {
            formUpdateUrl: '/modules/activityImportance/activityImportanceUpdate',
            formAddUrl: '/modules/activityImportance/activityImportanceAdd'
          },
          isSubmitLoading: false,
          rules: {
            activityId: [{ required: true, message: '请输入评价活动ID', trigger: 'change' }],
            level: [{ required: true, message: '请输入属性级别 1/一级、2/2级、3/3级、4/4级', trigger: 'change' }],
            importanceLevel: [{ required: true, message: '请输入重要等级1，2，3，4', trigger: 'change' }]
          }
        }
      },
      methods: {
        setup(data) {
          this.$refs['form'].resetFields()
        },
        /*  ------------------------- 交互按钮  -------------------------  */
        onAdd() {
          const that = this
          this.$refs['form'].validate((valid) => {
            if (valid) {
              this.$confirm('是否添加?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
              }).then(() => {
                that.requestAddActivityImportanceDetail()
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
          this.$confirm('是否保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            that.requestUpdateActivityImportanceDetail()
          }).catch(() => {
            that.isSubmitLoading = false
          })
        },
        /*  ------------------------- 网络请求  -------------------------  */
        requestUpdateActivityImportanceDetail() {
          const that = this
          that.isSubmitLoading = true
          request({
            url: this.form.formUpdateUrl,
            method: 'post',
            data: this.detailResult
          }).then(response => {
            this.$message({ message: '保存成功', type: 'success' })
            that.isSubmitLoading = false
            that.onWtDialogRefresh()
          }).catch(error => {
            console.log('error', error)
            that.isSubmitLoading = false
          })
        },
        requestAddActivityImportanceDetail() {
          const that = this
          that.isSubmitLoading = true
          request({
            url: this.form.formAddUrl,
            method: 'post',
            data: this.detailResult
          }).then(response => {
            this.$message({ message: '保存成功', type: 'success' })
            that.isSubmitLoading = false
            that.onWtDialogRefresh()
          }).catch(error => {
            console.log('error', error)
            that.isSubmitLoading = false
          })
        },
        /*  ------------------------- 通用按钮  -------------------------  */
        onWtDialogClose() {
          this.$emit('wt-dialog-close')
        },
        onWtDialogRefresh() {
          this.$emit('wt-dialog-refresh')
        }
      },
      computed: {
        ...mapState({
          isActivityImportanceDetailLoading: state => state.activityImportance.isActivityImportanceDetailLoading,
          detailResult: state => state.activityImportance.activityImportanceDetailData
        })
      }
    }
</script>

<style scoped>

</style>

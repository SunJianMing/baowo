<template>
    <div class="dialog-container wt-dialog-container" v-loading="isEvaluateObjectParamsDetailLoading">
        <el-form ref="form" :model="detailResult" :rules="rules" label-width="120px" size="small" class="wt-detail-form">
              <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="评价对象ID：" prop="evaluateObjectId" >
          <el-input v-model="detailResult.evaluateObjectId" placeholder="请输入评价对象ID" ></el-input>
      </el-form-item>
      <el-form-item label="评价参数ID：" prop="evaluateParamsId" >
          <el-input v-model="detailResult.evaluateParamsId" placeholder="请输入评价参数ID" ></el-input>
      </el-form-item>
      <el-form-item label="参数类型 0/文字,1/图片：" prop="type" >
          <el-input v-model="detailResult.type" placeholder="请输入参数类型 0/文字,1/图片" ></el-input>
      </el-form-item>
      <el-form-item label="参数值：" prop="val" >
          <el-input v-model="detailResult.val" placeholder="请输入参数值" ></el-input>
      </el-form-item>
          </el-form>
        <div class="wt-detail-btns" >
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_EVALUATEOBJECTPARAMS:ADD">
                <el-button size="small" type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'" >立即创建</el-button>
            </wt-auth>
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_EVALUATEOBJECTPARAMS:EDIT">
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
      name: 'EvaluateObjectParamsEdit',
      props: ['viewType'],
      components: {
        WtAuth
      },
      data() {
        return {
          form: {
            formUpdateUrl: '/modules/evaluateObjectParams/evaluateObjectParamsUpdate',
            formAddUrl: '/modules/evaluateObjectParams/evaluateObjectParamsAdd'
          },
          isSubmitLoading: false,
          rules: {
            evaluateObjectId: [{ required: true, message: '请输入评价对象ID', trigger: 'change' }],
            evaluateParamsId: [{ required: true, message: '请输入评价参数ID', trigger: 'change' }],
            type: [{ required: true, message: '请输入参数类型 0/文字,1/图片', trigger: 'change' }],
            val: [{ required: true, message: '请输入参数值', trigger: 'change' }]
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
                that.requestAddEvaluateObjectParamsDetail()
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
            that.requestUpdateEvaluateObjectParamsDetail()
          }).catch(() => {
            that.isSubmitLoading = false
          })
        },
        /*  ------------------------- 网络请求  -------------------------  */
        requestUpdateEvaluateObjectParamsDetail() {
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
        requestAddEvaluateObjectParamsDetail() {
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
          isEvaluateObjectParamsDetailLoading: state => state.evaluateObjectParams.isEvaluateObjectParamsDetailLoading,
          detailResult: state => state.evaluateObjectParams.evaluateObjectParamsDetailData
        })
      }
    }
</script>

<style scoped>

</style>

<template>
    <div class="dialog-container wt-dialog-container" v-loading="isEvaluateSurveyPropertyDetailLoading">
        <el-form ref="form" :model="detailResult" :rules="rules" label-width="120px" size="small" class="wt-detail-form">
              <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="活动类型id：" prop="evaluateTypeId" >
          <el-input v-model="detailResult.evaluateTypeId" placeholder="请输入活动类型id" ></el-input>
      </el-form-item>
      <el-form-item label="评价问卷id：" prop="evaluateSurveyId" >
          <el-input v-model="detailResult.evaluateSurveyId" placeholder="请输入评价问卷id" ></el-input>
      </el-form-item>
      <el-form-item label="活动类型id：" prop="propertyId" >
          <el-input v-model="detailResult.propertyId" placeholder="请输入活动类型id" ></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="orderNum" >
          <el-input v-model="detailResult.orderNum" placeholder="请输入排序" ></el-input>
      </el-form-item>
          </el-form>
        <div class="wt-detail-btns" >
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_EVALUATESURVEYPROPERTY:ADD">
                <el-button size="small" type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'" >立即创建</el-button>
            </wt-auth>
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_EVALUATESURVEYPROPERTY:EDIT">
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
      name: 'EvaluateSurveyPropertyEdit',
      props: ['viewType'],
      components: {
        WtAuth
      },
      data() {
        return {
          form: {
            formUpdateUrl: '/modules/evaluateSurveyProperty/evaluateSurveyPropertyUpdate',
            formAddUrl: '/modules/evaluateSurveyProperty/evaluateSurveyPropertyAdd'
          },
          isSubmitLoading: false,
          rules: {
            evaluateTypeId: [{ required: true, message: '请输入活动类型id', trigger: 'change' }],
            evaluateSurveyId: [{ required: true, message: '请输入评价问卷id', trigger: 'change' }],
            propertyId: [{ required: true, message: '请输入活动类型id', trigger: 'change' }],
            orderNum: [{ required: true, message: '请输入排序', trigger: 'change' }]
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
                that.requestAddEvaluateSurveyPropertyDetail()
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
            that.requestUpdateEvaluateSurveyPropertyDetail()
          }).catch(() => {
            that.isSubmitLoading = false
          })
        },
        /*  ------------------------- 网络请求  -------------------------  */
        requestUpdateEvaluateSurveyPropertyDetail() {
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
        requestAddEvaluateSurveyPropertyDetail() {
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
          isEvaluateSurveyPropertyDetailLoading: state => state.evaluateSurveyProperty.isEvaluateSurveyPropertyDetailLoading,
          detailResult: state => state.evaluateSurveyProperty.evaluateSurveyPropertyDetailData
        })
      }
    }
</script>

<style scoped>

</style>

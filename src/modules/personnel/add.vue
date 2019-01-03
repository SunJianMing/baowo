<template>
    <div class="dialog-container wt-dialog-container" v-loading="isAssessorDetailLoading">
        <el-form ref="form" :model="detailResult" :rules="rules" label-width="120px" size="small" class="wt-detail-form">
              <el-form-item label="基本信息" class="wt-section">
              </el-form-item>
      <el-form-item label="姓名：" prop="name" >
          <el-input v-model="detailResult.name" placeholder="请输入姓名" ></el-input>
      </el-form-item>
      <el-form-item label="性别 1男/2女：" prop="sex" >
          <el-input v-model="detailResult.sex" placeholder="请输入性别 1男/2女" ></el-input>
      </el-form-item>
      <el-form-item label="身高cm：" prop="height" >
          <el-input v-model="detailResult.height" placeholder="请输入身高cm" ></el-input>
      </el-form-item>
      <el-form-item label="体重kg：" prop="weight" >
          <el-input v-model="detailResult.weight" placeholder="请输入体重kg" ></el-input>
      </el-form-item>
      <el-form-item label="驾龄年：" prop="drivingYears" >
          <el-input v-model="detailResult.drivingYears" placeholder="请输入驾龄年" ></el-input>
      </el-form-item>

          </el-form>
        <div class="wt-detail-btns" >
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ASSESSOR:ADD">
                <el-button size="small" type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'" >立即创建</el-button>
            </wt-auth>
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ASSESSOR:EDIT">
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
      name: 'AssessorEdit',
      props: ['viewType'],
      components: {
        WtAuth
      },
      data() {
        return {
          form: {
            formUpdateUrl: '/modules/assessor/assessorUpdate',
            formAddUrl: '/modules/assessor/assessorAdd'
          },
          isSubmitLoading: false,
          rules: {
            name: [{ required: true, message: '请输入姓名', trigger: 'blur' }, { validator: this.$wtValidator.ValidatorNotBlank, message: '输入内容不能为空', trigger: 'blur' }],

            sex: [{ required: true, message: '请输入性别 1男/2女', trigger: 'change' }],
            height: [{ required: true, message: '请输入身高cm', trigger: 'change' }],
            weight: [{ required: true, message: '请输入体重kg', trigger: 'change' }],
            drivingYears: [{ required: true, message: '请输入驾龄年', trigger: 'change' }],

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
                that.requestAddAssessorDetail()
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
            that.requestUpdateAssessorDetail()
          }).catch(() => {
            that.isSubmitLoading = false
          })
        },
        /*  ------------------------- 网络请求  -------------------------  */
        requestUpdateAssessorDetail() {
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
        requestAddAssessorDetail() {
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
          isAssessorDetailLoading: state => state.assessor.isAssessorDetailLoading,
          detailResult: state => state.assessor.assessorDetailData
        })
      }
    }
</script>

<style scoped>

</style>

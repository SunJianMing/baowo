<template>
    <div class="dialog-container wt-dialog-container" v-loading="isActivityObjectScoreDetailLoading">
        <el-form ref="form" :model="detailResult" :rules="rules" label-width="120px" size="small" class="wt-detail-form">
              <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="评价活动ID：" prop="activityId" >
          <el-input v-model="detailResult.activityId" placeholder="请输入评价活动ID" ></el-input>
      </el-form-item>
      <el-form-item label="评价对象ID：" prop="activityObjectId" >
          <el-input v-model="detailResult.activityObjectId" placeholder="请输入评价对象ID" ></el-input>
      </el-form-item>
      <el-form-item label="评价人员ID：" prop="assessorId" >
          <el-input v-model="detailResult.assessorId" placeholder="请输入评价人员ID" ></el-input>
      </el-form-item>
      <el-form-item label="分数，100表示10分，null表示没有打分：" prop="score" >
          <el-input v-model="detailResult.score" placeholder="请输入分数，100表示10分，null表示没有打分" ></el-input>
      </el-form-item>
      <el-form-item label="是否有备注 0/没有,1/有：" prop="isRemark" >
          <el-input v-model="detailResult.isRemark" placeholder="请输入是否有备注 0/没有,1/有" ></el-input>
      </el-form-item>
          </el-form>
        <div class="wt-detail-btns" >
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACTIVITYOBJECTSCORE:ADD">
                <el-button size="small" type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'" >立即创建</el-button>
            </wt-auth>
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACTIVITYOBJECTSCORE:EDIT">
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
      name: 'ActivityObjectScoreEdit',
      props: ['viewType'],
      components: {
        WtAuth
      },
      data() {
        return {
          form: {
            formUpdateUrl: '/modules/activityObjectScore/activityObjectScoreUpdate',
            formAddUrl: '/modules/activityObjectScore/activityObjectScoreAdd'
          },
          isSubmitLoading: false,
          rules: {
            activityId: [{ required: true, message: '请输入评价活动ID', trigger: 'change' }],
            activityObjectId: [{ required: true, message: '请输入评价对象ID', trigger: 'change' }],
            assessorId: [{ required: true, message: '请输入评价人员ID', trigger: 'change' }],
            score: [{ required: true, message: '请输入分数，100表示10分，null表示没有打分', trigger: 'change' }],
            isRemark: [{ required: true, message: '请输入是否有备注 0/没有,1/有', trigger: 'change' }]
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
                that.requestAddActivityObjectScoreDetail()
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
            that.requestUpdateActivityObjectScoreDetail()
          }).catch(() => {
            that.isSubmitLoading = false
          })
        },
        /*  ------------------------- 网络请求  -------------------------  */
        requestUpdateActivityObjectScoreDetail() {
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
        requestAddActivityObjectScoreDetail() {
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
          isActivityObjectScoreDetailLoading: state => state.activityObjectScore.isActivityObjectScoreDetailLoading,
          detailResult: state => state.activityObjectScore.activityObjectScoreDetailData
        })
      }
    }
</script>

<style scoped>

</style>

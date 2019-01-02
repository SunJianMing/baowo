<template>
    <div class="dialog-container wt-dialog-container" v-loading="isActivityDetailLoading">
        <el-form ref="form" :model="detailResult" :rules="rules" label-width="120px" size="small" class="wt-detail-form">
              <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="活动类型id：" prop="evaluateTypeId" >
          <el-input v-model="detailResult.evaluateTypeId" placeholder="请输入活动类型id" ></el-input>
      </el-form-item>
      <el-form-item label="评价问卷id：" prop="evaluateSurveyId" >
          <el-input v-model="detailResult.evaluateSurveyId" placeholder="请输入评价问卷id" ></el-input>
      </el-form-item>
      <el-form-item label="文件名称：" prop="name" >
          <el-input v-model="detailResult.name" placeholder="请输入文件名称" ></el-input>
      </el-form-item>
      <el-form-item label="活动开始时间：" prop="startTime" >
          <el-input v-model="detailResult.startTime" placeholder="请输入活动开始时间" ></el-input>
      </el-form-item>
      <el-form-item label="活动结束时间：" prop="endTime" >
          <el-input v-model="detailResult.endTime" placeholder="请输入活动结束时间" ></el-input>
      </el-form-item>
      <el-form-item label="活动状态 0/默认,1/待发布,2/进行中,3/已结束(正常结束),4/已结束(主动结束)：" prop="state" >
          <el-input v-model="detailResult.state" placeholder="请输入活动状态 0/默认,1/待发布,2/进行中,3/已结束(正常结束),4/已结束(主动结束)" ></el-input>
      </el-form-item>
      <el-form-item label="是否显示属性表：" prop="isShowProperty" >
          <el-input v-model="detailResult.isShowProperty" placeholder="请输入是否显示属性表" ></el-input>
      </el-form-item>
      <el-form-item label="是否必须完整完成 0/不必完成,1/必须完成：" prop="isNeedComplete" >
          <el-input v-model="detailResult.isNeedComplete" placeholder="请输入是否必须完整完成 0/不必完成,1/必须完成" ></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="orderNum" >
          <el-input v-model="detailResult.orderNum" placeholder="请输入排序" ></el-input>
      </el-form-item>
          </el-form>
        <div class="wt-detail-btns" >
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACTIVITY:ADD">
                <el-button size="small" type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'" >立即创建</el-button>
            </wt-auth>
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACTIVITY:EDIT">
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
      name: 'ActivityEdit',
      props: ['viewType'],
      components: {
        WtAuth
      },
      data() {
        return {
          form: {
            formUpdateUrl: '/modules/activity/activityUpdate',
            formAddUrl: '/modules/activity/activityAdd'
          },
          isSubmitLoading: false,
          rules: {
            evaluateTypeId: [{ required: true, message: '请输入活动类型id', trigger: 'change' }],
            evaluateSurveyId: [{ required: true, message: '请输入评价问卷id', trigger: 'change' }],
            name: [{ required: true, message: '请输入文件名称', trigger: 'blur' }, { validator: this.$wtValidator.ValidatorNotBlank, message: '输入内容不能为空', trigger: 'blur' }],
            startTime: [{ required: true, message: '请输入活动开始时间', trigger: 'change' }],
            endTime: [{ required: true, message: '请输入活动结束时间', trigger: 'change' }],
            state: [{ required: true, message: '请输入活动状态 0/默认,1/待发布,2/进行中,3/已结束(正常结束),4/已结束(主动结束)', trigger: 'change' }],
            isShowProperty: [{ required: true, message: '请输入是否显示属性表', trigger: 'change' }],
            isNeedComplete: [{ required: true, message: '请输入是否必须完整完成 0/不必完成,1/必须完成', trigger: 'change' }],
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
                that.requestAddActivityDetail()
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
            that.requestUpdateActivityDetail()
          }).catch(() => {
            that.isSubmitLoading = false
          })
        },
        /*  ------------------------- 网络请求  -------------------------  */
        requestUpdateActivityDetail() {
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
        requestAddActivityDetail() {
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
          isActivityDetailLoading: state => state.activity.isActivityDetailLoading,
          detailResult: state => state.activity.activityDetailData
        })
      }
    }
</script>

<style scoped>

</style>

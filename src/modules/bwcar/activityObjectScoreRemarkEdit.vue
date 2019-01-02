<template>
    <div class="dialog-container wt-dialog-container" v-loading="isActivityObjectScoreRemarkDetailLoading">
        <el-form ref="form" :model="detailResult" :rules="rules" label-width="120px" size="small" class="wt-detail-form">
              <el-form-item label="基本信息" class="wt-section"></el-form-item>
      <el-form-item label="评价打分信息ID：" prop="activityObjectScoreId" >
          <el-input v-model="detailResult.activityObjectScoreId" placeholder="请输入评价打分信息ID" ></el-input>
      </el-form-item>
      <el-form-item label="参数类型 0/文字,1/图片：" prop="type" >
          <el-input v-model="detailResult.type" placeholder="请输入参数类型 0/文字,1/图片" ></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content" >
          <el-input v-model="detailResult.content" placeholder="请输入内容" ></el-input>
      </el-form-item>
      <el-form-item label="视频、语音的时长：" prop="ext1" >
          <el-input v-model="detailResult.ext1" placeholder="请输入视频、语音的时长" ></el-input>
      </el-form-item>
      <el-form-item label="视频的封面图片：" prop="ext2" >
          <el-input v-model="detailResult.ext2" placeholder="请输入视频的封面图片" ></el-input>
      </el-form-item>
      <el-form-item label="：" prop="ext3" >
          <el-input v-model="detailResult.ext3" placeholder="请输入" ></el-input>
      </el-form-item>
      <el-form-item label="：" prop="ext4" >
          <el-input v-model="detailResult.ext4" placeholder="请输入" ></el-input>
      </el-form-item>
          </el-form>
        <div class="wt-detail-btns" >
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACTIVITYOBJECTSCOREREMARK:ADD">
                <el-button size="small" type="primary" :loading="isSubmitLoading" @click="onAdd" v-if="viewType === 'add'" >立即创建</el-button>
            </wt-auth>
            <wt-auth class="search-form-btn" hasAnyPremission="MODULES_ACTIVITYOBJECTSCOREREMARK:EDIT">
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
      name: 'ActivityObjectScoreRemarkEdit',
      props: ['viewType'],
      components: {
        WtAuth
      },
      data() {
        return {
          form: {
            formUpdateUrl: '/modules/activityObjectScoreRemark/activityObjectScoreRemarkUpdate',
            formAddUrl: '/modules/activityObjectScoreRemark/activityObjectScoreRemarkAdd'
          },
          isSubmitLoading: false,
          rules: {
            activityObjectScoreId: [{ required: true, message: '请输入评价打分信息ID', trigger: 'change' }],
            type: [{ required: true, message: '请输入参数类型 0/文字,1/图片', trigger: 'change' }],
            content: [{ required: true, message: '请输入内容', trigger: 'change' }],
            ext1: [{ required: true, message: '请输入视频、语音的时长', trigger: 'change' }],
            ext2: [{ required: true, message: '请输入视频的封面图片', trigger: 'change' }],
            ext3: [{ required: true, message: '请输入', trigger: 'change' }],
            ext4: [{ required: true, message: '请输入', trigger: 'change' }]
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
                that.requestAddActivityObjectScoreRemarkDetail()
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
            that.requestUpdateActivityObjectScoreRemarkDetail()
          }).catch(() => {
            that.isSubmitLoading = false
          })
        },
        /*  ------------------------- 网络请求  -------------------------  */
        requestUpdateActivityObjectScoreRemarkDetail() {
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
        requestAddActivityObjectScoreRemarkDetail() {
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
          isActivityObjectScoreRemarkDetailLoading: state => state.activityObjectScoreRemark.isActivityObjectScoreRemarkDetailLoading,
          detailResult: state => state.activityObjectScoreRemark.activityObjectScoreRemarkDetailData
        })
      }
    }
</script>

<style scoped>

</style>

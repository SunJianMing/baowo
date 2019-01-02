<template>
  <div class="app-container">
    <p>使用方法请查看
      <a style="color: #1790ff;text-decoration: underline;" href="http://wiki.wangtiansoft.com:18090/pages/viewpage.action?pageId=1081371" target="_blank">http://wiki.wangtiansoft.com:18090/pages/viewpage.action?pageId=1081371</a>
    </p>
    <el-button size="mini" @click="onClickTest">列出全部上传文件</el-button>
    <div v-html="fileListString"></div>
    <br/>
    <br/>
    <br/>

    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h4>示例1（文件）</h4>
          <WtUpload ref="wtUpload_0" :limit="3" :file-size-m="0.5" file-accept="image/*"
                    tip-text="只能上传jpg/png文件，且不超过500kb" :on-preview="handleOnPreview">
            <el-button size="small" type="primary">点击上传</el-button>
          </WtUpload>
        </div>
      </el-col>
      <el-col :span="8" :offset="4">
        <div class="grid-content bg-purple">
          <h4>示例2（图片）</h4>
          <WtImageUpload ref="wtUpload_1" class="wt-image-upload" :limit="1" tip-text="文件大小不能超过500kb"
                         :on-preview="handleOnPreview">
          </WtImageUpload>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <h4>示例3（表单验证）</h4>
          <el-form :model="form" ref="form" :rules="rules" size="small" label-width="100px">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动封面" prop="coverFileList">
              <WtImageUpload ref="wtUpload_3" class="wt-image-upload" :limit="1" tip-text="文件大小不能超过500kb"
                             :on-preview="handleOnPreview">
              </WtImageUpload>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动附件" prop="fileList">
              <WtUpload ref="wtUpload_4" :limit="3" :file-size-m="0.5" file-accept="image/*"
                        tip-text="只能上传jpg/png文件，且不超过500kb" :on-preview="handleOnPreview">
                <el-button size="small" type="primary">点击上传</el-button>
              </WtUpload>
            </el-form-item>
            <el-form-item label="活动描述" prop="summary">
              <el-input type="textarea" v-model="form.summary"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSave">校验</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import WtUpload from '@/components/WtUpload'
  import WtImageUpload from '@/components/WtImageUpload'

  export default {
    name: 'PluginUpload',
    data() {
      return {
        fileListString: '',
        form: {
          name: '',
          region: '',
          coverFileList: [],
          fileList: [],
          summary: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          coverFileList: [
            { required: true, message: '请上传活动封面', trigger: 'change' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          summary: [
            { required: true, message: '请输入活动描述', trigger: 'blur' }
          ],
          fileList: [
            { required: true, message: '请上传活动附件', trigger: 'change' }
          ]
        }
      }
    },
    components: {
      WtUpload,
      WtImageUpload
    },
    methods: {
      onClickTest() {
        const json0 = this.$refs['wtUpload_0'].getFiles()
        const json1 = this.$refs['wtUpload_1'].getFiles()
        this.fileListString = '<br/><span>示例1（wtUpload_0）</span><p>' + JSON.stringify(json0) + '</p>' +
          '<br/><span>示例2（wtUpload_1）</span><p>' + JSON.stringify(json1) + '</p>'
      },
      handleOnPreview(el, file) {
        console.log('handleOnPreview', el, file, el.getFiles())
      },
      onSave() {
        this.form.coverFileList = this.$refs['wtUpload_3'].getFiles()
        this.form.fileList = this.$refs['wtUpload_4'].getFiles()
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$message.success('校验通过')
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>

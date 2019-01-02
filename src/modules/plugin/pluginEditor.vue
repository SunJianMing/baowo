<template>
  <div class="app-container">
    <p>使用方法请查看
      <a style="color: #1790ff;text-decoration: underline;" href="http://wiki.wangtiansoft.com:18090/pages/viewpage.action?pageId=1081371" target="_blank">http://wiki.wangtiansoft.com:18090/pages/viewpage.action?pageId=1081371</a>
    </p>
    <el-button size="mini" @click="onClickTest">获取内容</el-button>
    <div>{{fileListString}}</div>
    <br/>
    <br/>
    <br/>
    <h4>示例1</h4>
    <Tinymce ref="editor0" style="width: 50%;"></Tinymce>
    <br/>
    <h4>示例2</h4>
    <Tinymce ref="editor1" style="width: 50%;"></Tinymce>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'

  export default {
    name: 'PluginEditor',
    data() {
      return {
        fileListString: ''
      }
    },
    components: {
      Tinymce
    },
    methods: {
      onClickTest() {
        console.log('this.$refs[\'editor0\']', this.$refs['editor0'])
        this.fileListString = this.$refs['editor0'].getContent()
      }
    }
  }
</script>

<style scoped>

</style>

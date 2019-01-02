<template>
  <div class="app-container">
    <el-tabs>
      <el-tab-pane label="上传组件">
        <PluginUpload></PluginUpload>
      </el-tab-pane>
      <el-tab-pane label="富文本编辑">
        <PluginEditor></PluginEditor>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import PluginUpload from './pluginUpload'
  import PluginEditor from './PluginEditor'
  export default {
    data() {
      return {}
    },
    components: {
      PluginUpload,
      PluginEditor
    },
    methods: {}
  }
</script>

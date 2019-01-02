<template>
  <div class="app-container">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="基本设置" >
        <AccountCenterBasic></AccountCenterBasic>
      </el-tab-pane>
      <el-tab-pane label="高级设置" ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import WtAuth from '@/components/WtAuth'
  import AccountCenterBasic from './accountCenterBasic'

  export default {
    data() {
      return {
        tabPosition: 'left'
      }
    },
    components: {
      WtAuth,
      AccountCenterBasic
    },
    activated() {
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>

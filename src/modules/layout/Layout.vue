<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <breadcrumb></breadcrumb>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/modules/layout/components'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'layout',
  components: {
    Navbar,
    Breadcrumb,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  background-color: #f0f2f5;
  height: 100%;
  width: 100%;
}
.app-main{
  background-color: #f0f2f5;
}
</style>

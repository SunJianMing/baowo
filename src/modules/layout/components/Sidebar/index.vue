<template>
  <scroll-bar>
    <div class="sidebar-logo">
      <span>管理系统</span>
    </div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      class="silder-el-menu"
      text-color="#999"
      active-text-color="#fff"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters([
      'sidebar', 'dynamicRoutes'
    ]),
    routes() {
      return this.dynamicRoutes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

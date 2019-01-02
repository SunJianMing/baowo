<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="left-btn" @click="toggleSideBar" :isActive="sidebar.opened">
      <img :src="icon_nav_url" alt="">
    </div>

    <div class="userinfo-container">
      <div class="nav-avator">
        <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
      </div>
      <div class="nav-username">
        <router-link to="/accountCenter">
          <span style="cursor: pointer;">{{name}}</span>
        </router-link>
      </div>
      <div class="nav-logout-btn">
        <span style="cursor: pointer;" @click="logout">注销</span>
      </div>
    </div>

  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import icon_nav_url from '@/assets/images/icon_nav.png'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      icon_nav_url: icon_nav_url
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$confirm('是否注销?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 64px;
  line-height: 64px;
  border-radius: 0px !important;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container {
    line-height: 64px;
    height: 64px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .left-btn{
    width: 64px;
    height: 64px;
    display: inline-block;
    cursor: pointer;
    &:hover {
      background-color: #e6f7ff;
    }
    .el-icon-arrow-left{
      font-size: 30px;
      margin-left: 16px;
      margin-top: 16px;
    }
    img{
      margin: 22px 19px;
    }
  }
  .userinfo-container{
    height: 64px;
    display: inline-block;
    vertical-align: top;
    float: right;
    margin-right: 64px;
    .nav-logout-btn{
      display: inline-block;
      color: #333;
      font-weight: normal;
    }
    .nav-avator{
      display: inline-block;
      margin-right: 12px;
    }
    .nav-username{
      display: inline-block;
      margin-right: 32px;
      color: #333;
      font-weight: normal;
    }
  }
  .avatar-container {
    height: 64px;
    display: inline-block;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 20px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>


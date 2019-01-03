import Vue from 'vue'
import Router from 'vue-router'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../modules/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
const staticRoutes = [
  // {
  //   path: '/plugin',
  //   component: Layout,
  //   redirect: '/plugin/pluginList',
  //   name: '插件管理',
  //   children: [{
  //     name: '插件列表',
  //     meta: { title: '插件列表', icon: '' },
  //     path: 'pluginList',
  //     component: () => import('@/modules/plugin/pluginList')
  //   }]
  // },
  {
    path: '/assessor',
    component: Layout,
    redirect: '/assessor/assessorList',
    name: '评价人员',
    meta: { title: '评价人员', icon: '' },
    children: [
    {
      name: '新建评价人员',
      meta: { title: '新建评价人员', icon: '' },
      path: 'addAssessor',
      hidden:true,
      component: () => import('@/modules/bwcar/addAssessor')
    },
    {
      name: '评价人员管理',
      meta: { title: '评价人员管理', icon: '' },
      path: 'assessorList',
      component: () => import('@/modules/bwcar/assessorList')
    }
  ]
  },
  {
    path: '/active',
    component: Layout,
    redirect: '/active/activeList',
    name: '评价活动',
    meta: { title: '评价活动', icon: '' },
    children: [
    {
      name: '新建评价活动',
      meta: { title: '新建评价活动', icon: '' },
      path: 'addActive',
      hidden:true,
      component: () => import('@/modules/bwcar/addAssessor')
    },
    {
      name: '评价活动管理',
      meta: { title: '评价活动管理', icon: '' },
      path: 'activeList',
      component: () => import('@/modules/bwcar/activeList')
    }
  ]
  }

]

export default staticRoutes

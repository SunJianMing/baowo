import Vue from 'vue'
import Router from 'vue-router'
// in development-env not use lazy-loading, because lazy-loading too many pages
// will cause webpack hot update too slow. so only in production use
// lazy-loading; detail:
// https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

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
    // {   path: '/plugin',   component: Layout,   redirect: '/plugin/pluginList',
    // name: '插件管理',   children: [{     name: '插件列表',     meta: { title: '插件列表',
    // icon: '' },     path: 'pluginList',     component: () =>
    // import('@/modules/plugin/pluginList')   }] },
    {
        path: '/personnel',
        component: Layout,
        redirect: '/personnel/list',
        name: '评价人员',
        meta: {
            title: '评价人员',
            icon: ''
        },
        children: [
            {
                name: '评价人员管理',
                meta: {
                    title: '评价人员管理',
                    icon: ''
                },
                path: 'list',
                component: () => import ('@/modules/personnel/list')
            }
        ]
    },
    {
      path: '/evaluationType',
      component: Layout,
      redirect: '/evaluationType/list',
      name: '评价类型',
      meta: {
          title: '评价类型',
          icon: ''
      },
      children: [
          {
              name: '评价类型管理',
              meta: {
                  title: '评价类型管理',
                  icon: ''
              },
              path: 'list',
              component: () => import ('@/modules/evaluationtype/list')
          }
      ]
    },
    {
      path: '/evaluateObject',
      component: Layout,
      redirect: '/evaluateObject/list',
      name: '评价对象',
      meta: {
          title: '评价对象',
          icon: ''
      },
      children: [
          {
              name: '评价对象管理',
              meta: {
                  title: '评价对象管理',
                  icon: ''
              },
              path: 'list',
              component: () => import ('@/modules/evaluateObject/list')
          }
      ]
    },
    {
      path: '/evaluateSurvey',
      component: Layout,
      redirect: '/evaluateSurvey/list',
      name: '评价问卷',
      meta: {
          title: '评价问卷',
          icon: ''
      },
      children: [
          {
              name: '评价问卷管理',
              meta: {
                  title: '评价问卷管理',
                  icon: ''
              },
              path: 'list',
              component: () => import ('@/modules/evaluateSurvey/list')
          }
      ]
    }
];
export default staticRoutes

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dataSource',
  },

  {
    path: '/dataSource',
    component: Layout,
    redirect: '/dataSource/dataSourceQuery/',
    meta: { title: '数据源管理', icon: 'el-icon-s-promotion' },
    children: [
      {
        path: 'dataSourceQuery',
        name: 'dataSourceQuery',
        component: () => import('@/views/data_source/query'),
        meta: { title: '数据源查询', icon: 'el-icon-search' }
      },
      {
        path: 'dataSourceCreate',
        name: 'dataSourceCreate',
        component: () => import('@/views/data_source/create'),
        meta: { title: '新建数据源', icon: 'el-icon-magic-stick' }
      },
      {
        path: 'dataSourceUpdate',
        name: 'dataSourceUpdate',
        component: () => import('@/views/data_source/update'),
      }
    ]
  },

  {
    path: '/dataSet',
    component: Layout,
    redirect: '/dataSet/dataSetQuery/',
    meta: { title: '数据集管理', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'dataSetQuery',
        name: 'dataSetQuery',
        component: () => import('@/views/data_set/query'),
        meta: { title: '数据集查询', icon: 'el-icon-search' }
      },
      {
        path: 'queryDataSetColumn',
        name: 'queryDataSetColumn',
        component: () => import('@/views/data_set/column_detail'),
        //meta: { title: '字段详情', icon: 'el-icon-magic-stick' }
      },
      {
        path: 'preview',
        name: 'preview',
        component: () => import('@/views/data_set/preview'),
        //meta: { title: '字段详情', icon: 'el-icon-magic-stick' }
      }
    ]
  },

  {
    path: '/dashboards',
    component: Layout,
    redirect: '/dashboards/dashboardQuery/',
    meta: { title: '图表管理', icon: 'el-icon-s-marketing' },
    children: [
      {
        path: 'dashboardQuery',
        name: 'dashboardQuery',
        component: () => import('@/views/dashboard/query'),
        meta: { title: '图表查询', icon: 'el-icon-search' }
      },
      {
        path: 'dashboardDetail',
        name: 'dashboardDetail',
        component: () => import('@/views/dashboard/detail'),
        //meta: { title: '仪表盘查询', icon: 'el-icon-search' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

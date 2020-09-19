import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/views/layout/Layout'

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/fleetListDetails',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/fleetListDetails/:path*',
        name: 'fleetListDetails',
        component: () => import('@/views/platform/fleetListDetails/index')
      }
    ]
  },
  {
    path: '/platformListDetails',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/platformListDetails/:path*',
        name: 'platformListDetails',
        component: () => import('@/views/platform/platformListDetails/index')
      }
    ]
  },
  {
    path: '/carDetails',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/carDetails/:path*',
        name: 'carDetails',
        component: () => import('@/views/fleet/carDetails/index')
      }
    ]
  },
  {
    path: '/thirdPartyRechargeDetails',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/thirdPartyRechargeDetails/:path*',
        name: 'thirdPartyRechargeDetails',
        component: () => import('@/views/gasSta/thirdPartyRechargeDetails/index')
      }
    ]
  },
  {
    path: '/gasDetails',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/gasDetails/:path*',
        name: 'gasDetails',
        component: () => import('@/views/gasSta/gasStaDetails/index')
      }
    ]
  },
  {
    path: '/accountDetail',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/accountDetail/:path*',
        name: 'accountDetail',
        component: () => import('@/views/gasSta/accountDetails/index')
      }
    ]
  },
  //平台充值详情页面
  {
    path: '/platformRechargeDetails',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/platformRechargeDetails/:path*',
        name: 'platformRechargeDetails',
        component: () => import('@/views/platform/platformRechargeDetails/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path:'/register',
    component:()=>import('@/views/register/main'),
    hidden: true,
  },
  {
    path:'/registerSuccess',
    component:()=>import('@/views/register/success'),
    hidden: true,
  },
  {
    path: '/bind',
    component: () => import('@/views/login/bind'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/errorPage/403'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index/index'),
        name: 'Dashboard',
        meta: { title: '主页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: () => import('@/views/user/index'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  },
]

export const noMatchedRoute = {
  path:'/*',
  component:() => import('@/views/errorPage/404'),
  hidden:true,
}

export default new Router({
  mode: 'hash', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

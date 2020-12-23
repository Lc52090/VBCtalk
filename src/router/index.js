import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('../components/main/main')
  },
  {
    path: '/video',
    component: () => import('../components/video/video')
  },
  {
    path: '/hotlist',
    component: () => import('../components/hotList/hotList'),
    redirect: 'hotoneList',
    children: [
      {
        path: '/hotoneList',
        component: () => import('../components/hotList/hotOneList')
      },
      {
        path: '/hottwoList',
        component: () => import('../components/hotList/hotTwoList')
      },
      {
        path: '/hotvideo',
        component: () => import('../components/hotList/hotVideo')
      }
    ]
  },
  {
    path: '/talk',
    component: () => import('../components/talk/talk'),
    redirect: 'talkVideoList',
    children: [
      {
        path: '/talkVideoList',
        component: () => import('../components/talk/talkVideoList')
      },
      {
        path: '/talkVideo',
        component: () => import('../components/talk/talkVideo')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../components/vip/login')
  },
  {
    path: '/register',
    component: () => import('../components/vip/register')
  },
  {
    path: '/userinfo',
    component: () => import('../components/vip/userInfo')
  },
  {
    path: '/produce',
    component: () => import('../components/produce/produce')
  },
  {
    path: '/aboutus',
    component: () => import('../components/aboutUs/aboutUs')
  }
]

const router = new VueRouter({
  routes
})
// 设置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  /* const tokenStr = window.sessionStorage.getItem('user_id')
  if (!tokenStr) {
    return next('/login')
  } */
  next()
})
export default router

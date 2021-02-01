import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/layout/index'

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/WX/WxAuth.vue')
  },
  {
    path: '/code',
    name: 'code',
    component: () => import('../views/WX/WxCode.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/index'),
  },
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/home/index'),
        meta: {keepAlive: true}
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import('../views/category/index'),
        meta: {keepAlive: true}
      },
      // {
      //   path: '/order',
      //   name: 'Order',
      //   component: () => import('../views/order/index')
      // },
      {
        path: '/my',
        name: 'My',
        component: () => import('../views/my/index'),
        meta: {keepAlive: true}
      },
    ]
  },
  {
    path: '/goodsList',
    name: 'GoodsList',
    component: () => import('../views/goodsList')
  },
  {
    path: '/goodsDetails',
    name: 'GoodsDetails',
    component: () => import('../views/goodsDetails')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/map')
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import('../views/collection/index')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/contact/index')
  },
  {
    path: '/browse',
    name: 'Browse',
    component: () => import('../views/browse/index')
  },
  {
    path: '/changeInfo',
    name: 'ChangeInfo',
    component: () => import('../views/changeInfo/index')
  },
  {
    path: '/changeName',
    name: 'ChangeName',
    component: () => import('../views/changeName/index')
  },
  {
    path: '/changePwd',
    name: 'ChangePwd',
    component: () => import('../views/changePwd/index')
  },
  {
    path: '/searchHistory',
    name: 'SearchHistory',
    component: () => import('../views/searchHistory/index'),
    meta: { keepAlive: true }
  },
  {
    path: '/searchResult',
    name: 'SearchResult',
    component: () => import('../views/searchResult/index')
  },
  { 
    path: '/notice',
    name: 'Notice',
    component: () => import('../views/notice/index')
  },
  {
    path: '/noticeList',
    name: 'NoticeList',
    component: () => import('../views/noticeList/index')
  },
  {
    path: '/logonNotice',
    name: 'LogonNotice',
    component: () => import('../views/logonNotice/index')
  },
  // {
  //   path: '/oldPhone',
  //   name: 'OldPhone',
  //   component: () => import('../views/oldPhone/index')
  // }
]

// router.beforeEach((to, form, next) => {
//   if (to.meta.keepAlive) {
//     if (getToken()) {
//       next()
//     } else {
//       next({
//         path: '/login'
//       })
//     }
//   } else {
//     next()
//   }
// })

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

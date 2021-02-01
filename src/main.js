import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible/index.js'
import InfiniteLoading from 'vue-infinite-loading'
import VueAMap from 'vue-amap';
import {getToken} from './utils/cookies'

Vue.use(Vant).use(InfiniteLoading)
Vue.config.productionTip = false

router.afterEach(() => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})


Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  // 高德的keye
  key: '090d94f200d8d08296e6aa0f38d9d206',
  uiVersion: '1.0.11' ,// 版本号
  plugin: ['AMap.Geocoder','AMap.Autocomplete','AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.Geolocation','AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})

    // router.beforeEach((to, from, next) => {
    //   console.log(to)
    // if(getToken('Token')) {
    //   next()
    // }else{
    //   if(to.name==='LogonNotice' || to.name==='Login' || to.name==='Register'|| to.name==='Home'){
    //     next()
    //   }
    //   // next({
    //   //   path: '/login'
    //   // })
    // }
    //   return next()
    // })
router.beforeEach((to, from, next) => {
  console.log(to)
if(getToken('Token')) {
  next()
}else{
  if(to.name==='LogonNotice' || to.name==='Login' || to.name==='Register'){
    next()
  }
  // next({
  //   path: '/login'
  // })
}
  return next()
})


new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')


import store from '@/store'
import router from '../router'
import axios from 'axios'
import Qs from 'qs'
import { Toast } from 'vant'
// import { removeToken } from '../utils/cookies'

const request = axios.create({
  // 仅在开发环境走代理
  baseURL: process.env.NODE_ENV === 'development' ? '' : '/'
})

request.interceptors.request.use(
  (config) => {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner',
      message: '加载中...'
    })
    // 登录后所有请求附带token
    // config.headers.Authorization =
    //   'Bearer ' +
    //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwcm9kdWN0IiwiYXVkIjoibWVtYmVyIiwic2NvcGVzIjoibWVtYmVyX2FjY2VzcyIsImlhdCI6MTU4NjMyNjI0MCwiZGF0YSI6eyJtZW1iZXJpZCI6MX0sImV4cCI6MTU4ODkxODI0MH0.sDX0908ktAG0-6qpQrb3R52-43huzyHQ-B6LtQwV7VM'
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + store.getters.token
    }
    if (config.method === 'post') {
      if (!(config.data instanceof FormData)) {
        config.data = Qs.stringify(config.data)
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }
    }

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res) => {
    Toast.clear()
    if (res.success || res.data.code === 1) {
      // successcess
      if (res.data.msg && res.data.msg !== 'ok') Toast.success(res.data.msg)
    } else if (res.data.code === 0) {
      Toast.fail(res.data.msg)
    }
    if (res.data.success || res.data.code === 1) {
      return res.data
    }

    return Promise.reject(res.data)
  },
  (err) => {
    Toast.clear()
    // token 失效
    if ((err.response && err.response.status === 900) || err.response.status === 401) {
      // Toast('请登录')
      store.dispatch('user/setLoginType', false)
      window.sessionStorage.clear()
      router.push('/login')
      return
    }
    if (err.response.status === 400) {
      if (err.response.data && err.response.data.message) {
        Toast.fail(err.response.data.message)
      } else {
        Toast.fail(JSON.stringify(err.response.data))
      }
    } else {
      Toast.clear()
      Toast.fail('网络错误，请重试')
    }

    return Promise.reject(err)
  }
)

export default request

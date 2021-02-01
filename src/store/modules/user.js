import { login, getOpenId } from '@/api/user'
import router from '@/router'

import { getToken, setToken, removeToken } from '@/utils/cookies'

const state = {
  token: getToken('Token'),
  openId: getToken('openId'), // 获取微信openid
  loginType: true,
  successPayOrderId: null,
  coordinate: '',
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  LOGIN_OUT() {
    state.token = ''
    removeToken('Token')
  },
  // 设置坐标
  SET_COORDINATE(state, coordinate){
    state.coordinate = coordinate
  },
  // 拿取wxopenid方法
  TAKE_OPEN_Id(state, { openId }) {
    state.openId = openId
  },

  // 登录状态
  LOGIN_TYPE(state, loginType) {
    state.loginType = loginType
  },
  // 设置支付成功的orderID
  SET_ORDERID(state, orderId) {
    state.successPayOrderId = orderId
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { UserAccount, Pwd } = userInfo
    return new Promise((resolve, reject) => {
      login({
        UserAccount,
        Pwd
      })
        .then((res) => {
          console.log(res)
          if (res.success) {
            commit('SET_TOKEN', res.token)
            console.log(res);
            commit('LOGIN_TYPE', true)
            setToken('Token', res.token)
            resolve()
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
 
  // 退出登录
  loginOut({ commit }) {
    commit('LOGIN_OUT')
    commit('LOGIN_TYPE', false)
    router.push({
      name: 'Login'
    })
  },
  // 获取微信openid
  // getOpenId({ commit }, jscode) {
  //   return new Promise((resolve, reject) => {
  //     getOpenId({
  //       code: jscode
  //     })
  //       .then((res) => {
  //         if (res.code === 1) {
  //           state.openId = res.open_id
  //           // commit('TAKE_OPEN_Id', res.data.open_id)
  //           setToken('openId', res.open_id)
  //           console.log(getToken('openId'))
  //           resolve()
  //         }
  //       })
  //       .catch((err) => {
  //         reject(err)
  //       })
  //   })
  // },
  // 更换登录状态
  setLoginType({ commit }, loginType) {
    return new Promise((resolve, reject) => {
      console.log(loginType)
      state.loginType = loginType
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/Member/Login',
    method: 'post',
    data
  })
}

export function info() {
  return request({
    url: '/api/Member/GetOneMember',
    method: 'get'
  })
}

export function collection(params) {
  return request({
    url: '/api/Favorites/List',
    method: 'get',
    params
  })
}

export function cancel(data) {
  return request({
    url: '/api/Favorites/Favorite',
    method: 'post',
    data
  })
}
export function browse(params) {
  return request({
    url: '/api/Favorites/FootList',
    method: 'get',
    params
  })
}

export function changeName(data) {
  return request({
    url: '/api/Member/UpdateUserInfo',
    method: 'post',
    data
  })
}

export function changePwd(data) {
  return request({
    url: '/api/Member/ModifyPwd',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/api/Member/Register',
    method: 'post',
    data
  })
}


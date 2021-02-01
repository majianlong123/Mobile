import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/api/Article/List',
    method: 'get',
    params
  })
}
export function info(params) {
  return request({
    url: '/api/Article/GetOne?',
    method: 'get',
    params
  })
}

 
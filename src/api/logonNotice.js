import request from '@/utils/request'

export function info(params) {
  return request({
    url: '/api/Article/GetOneByType',
    method: 'get',
    params
  })
}
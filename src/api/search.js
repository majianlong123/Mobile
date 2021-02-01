import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/api/Merchant/List',
    method: 'get',
    params
  })
}

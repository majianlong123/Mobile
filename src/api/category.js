import request from '@/utils/request'

export function list(page, rows, cate) {
  return request({
    url: '/api/MerchantType/Tree',
    method: 'get',
    params: { page, rows, cate }
  })
}

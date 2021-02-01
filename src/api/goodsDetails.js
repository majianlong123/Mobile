import request from '@/utils/request'

export function details(params) {
  return request({
    url: '/api/Merchant/GetOne',
    method: 'get',
    params: params
  })
}

export function collection(params) {
  return request({
    url: '/api/Favorites/Favorite',
    method: 'post',
    data: params
  })
}

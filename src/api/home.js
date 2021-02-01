import request from '@/utils/request'

export function advert() {
  return request({
    url: '/api/BaseData/Carousel/All',
    method: 'get',
  })
}
export function article(type) {
  return request({
    url: '/api/Advertising/List',
    method: 'get',
    params: {
      type
    }
  })
}
export function list(params) {
  return request({
    url: '/api/Merchant/ListAround',
    method: 'get',
    params: params
  })
}
export function MerchantType(params) {
  return request({
    url: '/api/MerchantType/Tree',
    method: 'get',
    params: params
  })
}
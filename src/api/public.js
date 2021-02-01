import request from '@/utils/request'
export function pay(data) {
  return request({
    url: '/member/order/pay',
    method: 'post',
    data
  })
}

export function sendverify(phone, check) {
  return request({
    url: '/member/pub/sendverify',
    method: 'get',
    params: { phone, check }
  })
}

export function param(data) {
  return request({
    url: '/member/pub/param',
    method: 'post',
    data
  })
}
export function upload(data) {
  return request({
    url: '/member/image/upload',
    method: 'post',
    data
  })
}

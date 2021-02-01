import request from '@/utils/request'

export function region() {
  return request({
    url: '/api/basedata/Area/Tree?level=3',
    method: 'get',
  })
}

import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/proxies',
    method: 'get',
    params
  })
}

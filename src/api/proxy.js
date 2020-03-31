import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/proxies',
    method: 'get',
    params
  })
}

export function cleanAll(params) {
  return request({
    url: '/proxies',
    method: 'delete',
    params
  })
}

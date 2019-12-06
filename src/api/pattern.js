import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/patterns',
    method: 'get',
    params
  })
}

import request from '@/utils/request'

export function getStatistics(params) {
  return request({
    url: '/index',
    method: 'get',
    params
  })
}

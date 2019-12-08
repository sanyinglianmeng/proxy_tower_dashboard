import request from '@/utils/request'

export function getChartData(params) {
  return request({
    url: '/status',
    method: 'get',
    params
  })
}

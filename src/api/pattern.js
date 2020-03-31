import request from '@/utils/request'

export function getPatternList(params) {
  return request({
    url: '/patterns',
    method: 'get',
    params
  })
}

export function insertOne(data) {
  return request({
    url: '/pattern',
    method: 'post',
    data
  })
}

export function deleteOne(data) {
  return request({
    url: '/pattern',
    method: 'delete',
    data
  })
}

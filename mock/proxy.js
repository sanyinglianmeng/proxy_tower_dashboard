import Mock from 'mockjs'

const data = Mock.mock({
  'items|50': [{
    ip: '127.0.0.1',
    port: '8893',
    'used|1-2': true,
    valid_time: null,
    insert_time: '@datetime',
    tag: 'file',
    'support_https': true,
    'score|1-100': 100
  }]
})

export default [
  {
    url: '/proxies',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]

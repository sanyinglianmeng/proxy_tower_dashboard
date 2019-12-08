import Mock from 'mockjs'

const data = Mock.mock({
  'items|10': [{
    pattern: 'weixin.sogou.com/weixin',
    rule: 'whitelist',
    value: 'account'
  }]
})

export default [
  {
    url: '/pattern',
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

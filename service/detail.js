import request from './network.js'

export function getDetail(id) {
  return request({
    url: '/foodService/queryFood',
    data: {
      id
    }
  })
}
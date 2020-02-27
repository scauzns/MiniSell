import request from './network.js'

export function getDetail(id) {
  return request({
    url: '/foodService/food/query/' + id
  })
}
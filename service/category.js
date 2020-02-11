import request from './network.js'

export function getCategory() {
  return request({
    url: '/foodService/getCateList'
  })
}

export function getCategoryDetail(cId) {
  return request({
    url: '/foodService/getFoodList',
    data: {
      cId
    }
  })
}
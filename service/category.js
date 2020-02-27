import request from './network.js'

export function getCategory() {
  return request({
    url: '/foodService/foodCategory/list'
  })
}

export function getCategoryDetail(cId) {
  return request({
    url: '/foodService/food/list',
    data: {
      cId
    }
  })
}

export function getFoodRange(type, top) {
  return request({
    url: '/foodService/food/getFoodRange',
    data: {
      type,
      top
    }
  })
}
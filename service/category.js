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

export function getFoodRange(type, top) {
  return request({
    url: '/foodService/getFoodRange',
    data: {
      type,
      top
    }
  })
}
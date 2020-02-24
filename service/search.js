import request from './network.js'

export function getHotSearch() {
  return request({
    url: '/userService/hotSearch'
  })
}

export function getSearchFoodList(content) {
  return request({
    url: '/foodService/getFoodList',
    data: {
      title: content
    }
  })
}

export function addUserSearch(content) {
  return request({
    url: '/userService/userSearch',
    data: {
      content
    }
  })
}
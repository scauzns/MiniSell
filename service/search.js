import request from './network.js'

export function getHotSearch() {
  return request({
    url: '/userService/user/hotSearch'
  })
}

export function getSearchFoodList(content) {
  return request({
    url: '/foodService/food/list',
    data: {
      title: content
    }
  })
}

export function addUserSearch(content) {
  return request({
    url: '/userService/user/search',
    data: {
      content
    }
  })
}
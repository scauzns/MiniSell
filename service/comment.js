import request from './network.js'

export function addComment(comments) {
  return request({
    url: '/foodService/food/newComment',
    data: comments,
    method: "POST"
  })
}
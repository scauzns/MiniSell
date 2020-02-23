import request from './network.js'

export function addComment(comments) {
  return request({
    url: '/foodService/addComment',
    data: comments,
    method: "POST"
  })
}
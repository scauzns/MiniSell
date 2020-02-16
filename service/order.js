import request from './network.js'

export function commitOrder(orderVO) {
  return request({
    url: '/orderService/commitOrder',
    method: "POST",
    data: orderVO
  })
}

export function payOrder(orderId, payMoney) {
  return request({
    url: '/orderService/payOrder',
    data: {
      orderId,
      payMoney
    }
  })
}
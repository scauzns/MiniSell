import request from './network.js'

export function commitOrder(orderVO) {
  return request({
    url: '/orderService/order/commitOrder',
    method: "POST",
    data: orderVO
  })
}

export function payOrder(orderId, payMoney) {
  return request({
    url: '/orderService/order/payOrder',
    data: {
      orderId,
      payMoney
    }
  })
}

// 订单状态：1 未支付，2 已支付、待受理，3 已完成，4 失效
export function getOrderList(userId, status, page, limit) {
  return request({
    url: '/orderService/order/orderList',
    data: {
      userId,
      status,
      page,
      limit
    }
  })
}
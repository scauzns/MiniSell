import request from './network.js'

export function addAddress(addressObj) {
  return request({
    url: '/userService/addAddress',
    data: addressObj,
    method: "POST"
  })
}
export function getAddressList(userId) {
  return request({
    url: '/userService/addressList',
    data: {
      userId
    }
  })
}

export function delAddress(addressId) {
  return request({
    url: '/userService/delAddress',
    data: {
      addressId
    }
  })
}
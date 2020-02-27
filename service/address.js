import request from './network.js'

export function addAddress(addressObj) {
  return request({
    url: '/userService/user/newAddress',
    data: addressObj,
    method: "POST"
  })
}
export function getAddressList(userId) {
  return request({
    url: '/userService/user/addressList/' + userId
  })
}

export function delAddress(addressId) {
  return request({
    url: '/userService/user/delAddress/' + addressId
  })
}
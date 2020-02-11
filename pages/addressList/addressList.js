// pages/addressList/addressList.js
import {
  getAddressList,
  delAddress
} from '../../service/address.js'

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //向后端请求数据
    var userInfo = app.getGlobalUserInfo();
    this._getAddressList(userInfo.id);
  },

  _getAddressList(userId) {
    getAddressList(userId).then(res => {
      // 更新数据  
      this.setData({
        addressList: res.data
      });
    })
  },

  addAddress:function(){
    wx.redirectTo({ url: '../newAddress/newAddress' });
  },
  /* 删除item */
  doDelAddress: function (e) {
    var index = e.currentTarget.dataset.id;
    var addressId = this.data.addressList[index].id;
    this._delAddress(addressId, index);
  },
  _delAddress(addressId, index){
    delAddress(addressId).then(res => {
      //删除对应的数组元素
      this.data.addressList.splice(index, 1);
      this.setData({
        addressList: this.data.addressList
      })
    })
  }
})
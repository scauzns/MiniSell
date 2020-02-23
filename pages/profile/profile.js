// pages/profile/profile.js
const app = getApp();
Page({
  data: {
    orderList: [
      { icon: 'message.png', info: '我的消息' },
      { icon: 'pointer.png', info: '积分商城' },
      { icon: 'vip.png', info: '会员卡' },
    ],
    serviceList: [
      { icon: 'order.png', info: '我的订单', event: 'myOrder' },
      { icon: 'address.png', info: '收货地址', event:'myAddresses' }
    ],
    userInfo: null
  },
  onLoad: function (options) {
    var userInfo = app.getGlobalUserInfo();
    this.setData({
      userInfo: userInfo
    })
  },
  toLogin: function(){
    var realUrl = "../profile/profile"
    wx.redirectTo({
      url: '../userLogin/login?redirectUrl=' + realUrl,
    })
  },
  toLogout: function(){
    //清楚缓存
    app.delGlobalUserInfo();
    //刷新当前页面
    this.onLoad();
    wx.showToast({
      title: '注销成功',
      icon: 'success',
      duration: 1500
    });
  },
  myAddresses: function(){
    wx.navigateTo({
      url: '../addressList/addressList',
    })
  },
  myOrder: function(){
    wx.navigateTo({
      url: '../myOrders/myOrders',
    })
  },
   goUnpaidOrders: function () {
     wx.navigateTo({
       url: '../myOrders/myOrders?currtab=0',
     })
  },
  goProcessingOrders: function () {
    wx.navigateTo({
      url: '../myOrders/myOrders?currtab=1',
    })
  },
  goUncommentOrders: function () {
    wx.navigateTo({
      url: '../myOrders/myOrders?currtab=2',
    })
  }

})
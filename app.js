//app.js
App({
  imgUrl: "http://192.168.88.104:8060",
  userInfo: null,
  onLaunch: function () {
  },
  addToCart(obj) {
    // 1.判断是否已经添加进来
    const oldInfo = this.globalData.cartList.find((item) => item.id === obj.id)
    if (oldInfo) {
      oldInfo.count += 1
    } else {
      obj.count = 1
      obj.checked = true
      this.globalData.cartList.push(obj)
    }
    // 2.购物车回调
    if (this.addCartCallback) {
      this.addCartCallback()
    }
  },
  globalData: {
    cartList: []
  },

  setGlobalUserInfo: function (user) {
    wx.setStorageSync("userInfo", user);
  },

  getGlobalUserInfo: function () {
    var userInfo = wx.getStorageSync("userInfo");
    if (Object.keys(userInfo).length === 0) {
      return null;
    }
    return userInfo;
  },

  delGlobalUserInfo: function() {
    wx.removeStorageSync('userInfo');
  },

  cleanCart: function() {
    //清空购物车
    this.globalData.cartList.splice(0);
  }
})
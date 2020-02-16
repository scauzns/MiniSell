// pages/cart/cart.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isSelectAll: true,
    totalPrice: 0,
    totalCounter: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })
    this.changeData()
    // 2.设置回调   
    app.addCartCallback = () => {
      this.setData({
        cartList: app.globalData.cartList
      })
      this.changeData()
    }


    // 3.设置修改某个商品的回调
    app.changeFoodsState = (index, food) => {
      // 1.修改某一项的选中状态
      this.setData({
        [`cartList[${index}]`]: food
      })

      // 2.修改全部选中的状态
      const selectAll = !this.data.cartList.find(item => !item.checked)
      this.setData({
        isSelectAll: selectAll
      })
      this.changeData()
    }

    wx.setNavigationBarTitle({
      title: `购物车(${this.data.cartList.length})`,
    })
  },
  onSelectAll() {
    // 1.判断是否是全部选中
    if (this.data.isSelectAll) { // 目前全部选中
      this.data.cartList.forEach(item => {
        item.checked = false
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: false
      })
    } else { // 某些没选中
      this.data.cartList.forEach(item => {
        item.checked = true
      })
      this.setData({
        cartList: this.data.cartList,
        isSelectAll: true
      })
    }
    this.changeData();
  },
  payment() {
    // 1。获取订单商品
    var orderDetails = [];
    this.data.cartList.forEach(item => {
      if (item.checked){
        orderDetails.push(item);
      }
    });
    // 2.订单总额
    var totalPrice = this.data.totalPrice;
    // 3.去结算
    wx.navigateTo({
      url: '../confirmOrder/confirmOrder?orderDetails=' + JSON.stringify(orderDetails) + "&totalPrice=" + totalPrice,
    })
  },
  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;

    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++;
        totalPrice += item.foodItem.price * item.foodItem.count
      }
    }
    console.log(totalPrice)
    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})
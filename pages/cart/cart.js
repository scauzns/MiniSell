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
    // 1.第一次加载数据
    this.setData({
      cartList: app.globalData.cartList
    })
    this.changeData()
    if (!app.addCartCallback){
      // 2.设置回调
      app.addCartCallback = () => {
        this.setData({
          cartList: app.globalData.cartList
        })
        this.changeData()
      }
    }

    if (!app.changeFoodsState){
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
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
    console.log("结算事件");
  },
  changeData() {
    // 1.获取所有选中数据
    let totalPrice = 0;
    let counter = 0;

    for (let item of this.data.cartList) {
      if (item.checked) {
        counter++;
        totalPrice += item.foodItem.price * item.count
      }
    }

    // 2.修改数据
    this.setData({
      totalCounter: counter,
      totalPrice: totalPrice
    })
  }
})
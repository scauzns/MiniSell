// pages/confirmOrder/confirmOrder.js
import {
  commitOrder,
  payOrder
} from '../../service/order.js'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetails: [],
    userInfo: app.getGlobalUserInfo(),
    imgUrl: app.imgUrl,
    totalPrice: 0,
    addressInfo: null,
    orderId: '',
    chooseAddrPrev: "flex",
    chooseAddrAfter: "none"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderDetails = JSON.parse(options.orderDetails);
    var totalPrice = options.totalPrice;
    this.setData({
      orderDetails: orderDetails,
      totalPrice: totalPrice
    })
  },

  onShow: function(){
    // 上一个页面选择收货地址后解析
    if (this.data.addressInfo != null) {
      this.setData({
        chooseAddrPrev: "none",
        chooseAddrAfter: "flex"
      })
    }
  },

  toChooseAddre: function(){
    wx.navigateTo({
      url: '../addressList/addressList'
    });
  },

  submitOrder: function(){
    //1.检查有无选择收货地址
    var addressInfo = this.data.addressInfo;
    if (addressInfo == null){
      wx.showToast({
        title: "请选择收货地址！！！",
        icon: 'none',
        duration: 1500
      })
      return;
    }
    //2.获取商品列表
    var orderDetails = [];
    this.data.orderDetails.forEach(item =>{
      var detail = {
        foodId: item.foodItem.id,
        foodTitle: item.foodItem.title,
        foodCover: item.foodItem.cover,
        sellPrice: item.foodItem.price,
        number: item.count
      }
      orderDetails.push(detail)
    });
    //3.组装订单对象
    var orderVO = {
      userId: this.data.userInfo.id,
      sendCost: 0,
      totalAmount: this.data.totalPrice,
      receiver: addressInfo.receiver,
      mobile: addressInfo.phone,
      address: addressInfo.address,
      orderDetails: orderDetails
    }
    //4.提交订单
    this._commitOrder(orderVO);
    //5.拉起支付
    this._payModal(this.data.totalPrice);
  },
  _commitOrder: function(orderVO){
    commitOrder(orderVO).then(res => {
      if(res.code == 0){
        var orderId = res.data;
        this.setData({
          orderId: orderId
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  _payModal: function (totalAmount){
    this.toggleDialog();
  },
  /**
     * sku 弹出
     */
  toggleDialog: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },

  /**
     * sku 关闭
     */
  closeDialog: function () {
    var me = this;
    wx.showModal({
      title: '提示',
      content: '是否取消支付？',
      cancelText: '否',
      confirmText: '是',
      success(res) {
        if (res.confirm) {
          console.log('取消')
          // 取消支付
          me._clearCartList();
          wx.reLaunch({
            url: '../home/home',
          })
        } else if (res.cancel) {
          // 返回继续支付
        }
      }
    });
  },

  /* 减数 */
  delCount: function (e) {
    var count = this.data.foodItem.count;
    // 商品总数量-1
    if (count > 1) {
      this.data.foodItem.count--;
    }
    // 将数值与状态写回  
    this.setData({
      foodItem: this.data.foodItem
    });
  },
  /* 加数 */
  addCount: function (e) {
    var count = this.data.foodItem.count;
    // 商品总数量+1  
    if (count < 10) {
      this.data.foodItem.count++;
    }
    // 将数值与状态写回  
    this.setData({
      foodItem: this.data.foodItem
    });
  },
  _payOrder: function(){
    var orderId = this.data.orderId;
    var payMoney = this.data.totalPrice;
    payOrder(orderId, payMoney).then(res => {
      if(res.code == 0){
        this._clearCartList();
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../profile/profile',
          })
        }, 2000)
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  _clearCartList: function(){
    app.cleanCart();
  }
})
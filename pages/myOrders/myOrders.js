// pages/myOrders/myOrders.js
import {
  getOrderList,
  payOrder
} from '../../service/order.js'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [
      { name: '待付款', index: 0 }, 
      { name: '待处理', index: 1 }, 
      { name: '待评价', index: 2 }, 
      { name: '已完成', index: 3 }
      ],
    showDialog: false,
    imgUrl: app.imgUrl,

    unpaidOrderList:[],
    unpaidPage: 1,
    unpaidTotalPage: 1,

    processingOrderList: [],
    processingPage: 1,
    processingTotalPage: 1,

    uncommentOrderList: [],
    uncommentOrderPage: 1,
    uncommentOrderTotalPage: 1,

    finishedOrderList: [],
    finishedPage: 1,
    finishedTotalPage: 1,

    userId: app.getGlobalUserInfo().id,
    payInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 打开某个tab
    if (typeof (options) != "undefined" && options.currtab){
      this.setData({
        currtab: options.currtab
      })
    }
    // 4种状态的订单数据都加载5条
    var page = 1;
    var limit = 5;
    this.getOrderList(page, limit, 0);
  },

  onShow: function(){
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },


  toggleDialog: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },

  closeDialog: function () {
    this.setData({
      showDialog: false
    });
  },

  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },

  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },

  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
    }
  },
  alreadyShow: function () {
    this.setData({
      alreadyOrder: [{ name: "跃动体育运动俱乐部(圆明园店)", state: "交易成功", time: "2018-09-30 14:00-16:00", status: "已结束", url: "../../images/bad0.png", money: "132" }, { name: "跃动体育运动俱乐部(圆明园店)", state: "交易成功", time: "2018-10-12 18:00-20:00", status: "未开始", url: "../../images/bad3.jpg", money: "205" }]
    })
  },

  waitPayShow: function () {
    this.setData({
      waitPayOrder: [{ name: "跃动体育运动俱乐部(圆明园店)", state: "待付款", time: "2018-10-14 14:00-16:00", status: "未开始", url: "../../images/bad1.jpg", money: "186" }],
    })
  },

  lostShow: function () {
    this.setData({
      lostOrder: [{ name: "跃动体育运动俱乐部(圆明园店)", state: "已取消", time: "2018-10-4 10:00-12:00", status: "未开始", url: "../../images/bad1.jpg", money: "122" }],
    })
  },
  getUnpaidOrderList: function(page, limit){
    getOrderList(this.data.userId, 1, page, limit).then(res => {
      if(res.code == 0){
        var unpaidOrderList = this.data.unpaidOrderList;
        var newUnpaidOrderList = res.data;
        this.setData({
          unpaidOrderList: unpaidOrderList.concat(newUnpaidOrderList),
          unpaidPage: page,
          unpaidTotalPage: res.totalPage
        })
      }else{
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getProcessingOrderList: function (page, limit){
    getOrderList(this.data.userId, 2, page, limit).then(res => {
      if (res.code == 0) {
        var processingOrderList = this.data.processingOrderList;
        var newProcessingOrderList = res.data;
        this.setData({
          processingOrderList: processingOrderList.concat(newProcessingOrderList),
          processingPage: page,
          processingTotalPage: res.totalPage
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getFinishedOrderList: function (page, limit){
    getOrderList(this.data.userId, 4, page, limit).then(res => {
      if (res.code == 0) {
        var finishedOrderList = this.data.finishedOrderList;
        var newFinishedOrderList = res.data;
        this.setData({
          finishedOrderList: finishedOrderList.concat(newFinishedOrderList),
          finishedPage: page,
          finishedTotalPage: res.totalPage
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getUncommentOrderList: function (page, limit){
    getOrderList(this.data.userId, 3, page, limit).then(res => {
      if (res.code == 0) {
        var uncommentOrderList = this.data.uncommentOrderList;
        var newUncommentOrderList = res.data;
        this.setData({
          uncommentOrderList: uncommentOrderList.concat(newUncommentOrderList),
          uncommentOrderPage: page,
          uncommentOrderTotalPage: res.totalPage
        })
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  getOrderList: function(page, limit, status){
    switch(status){
      case 1:
        this.getUnpaidOrderList(page, limit);  break;
      case 2:
        this.getProcessingOrderList(page, limit); break;
      case 3:
        this.getUncommentOrderList(page, limit); break;
      case 4:
        this.getFinishedOrderList(page, limit); break;
      case 0:
        this.getUnpaidOrderList(page, limit); 
        this.getProcessingOrderList(page, limit); 
        this.getFinishedOrderList(page, limit);
        this.getUncommentOrderList(page, limit);
    }
  },

  onReachBottom: function () {
    var currtab = this.data.currtab;
    var status = currtab + 1;
    var currPage = 0;
    var totalPage = 0;
    if(currtab == 0){
      currPage = this.data.unpaidPage;
      totalPage = this.data.unpaidTotalPage;
    } else if (currtab == 1){
      currPage = this.data.processingPage;
      totalPage = this.data.processingTotalPage;
    } else if (currtab == 2){
      currPage = this.data.uncommentOrderPage;
      totalPage = this.data.uncommentOrderTotalPage;
    } else if (currtab == 3){
      currPage = this.data.finishedPage;
      totalPage = this.data.finishedTotalPage;
    }
    if (currPage == totalPage){
      return;
    }
    var page = currPage + 1;
    this.getOrderList(page, 5, status);
  },
  orderDetail: function(e){
    var orderItem = e.currentTarget.dataset.orderitem;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderItem='+JSON.stringify(orderItem)
    })
  },
  goToPay: function(e){
    console.log(e)
    var totalPrice = e.currentTarget.dataset.totalprice;
    var orderId = e.currentTarget.dataset.orderid;
    var payInfo = {
      totalPrice: totalPrice,
      orderId: orderId
    }
    this.setData({
      payInfo: payInfo
    })
    this.toggleDialog();
  },
  _payOrder: function () {
    var me = this;
    var orderId = this.data.payInfo.orderId;
    var payMoney = this.data.payInfo.totalPrice;
    payOrder(orderId, payMoney).then(res => {
      if (res.code == 0) {
        wx.showToast({
          title: res.msg,
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../myOrders/myOrders',
          })
        }, 2000)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  goToComment: function(e){
    var orderInfo = e.currentTarget.dataset.orderinfo;
    wx.navigateTo({
      url: '../comment/comment?orderInfo=' + JSON.stringify(orderInfo),
    })
    console.log(orderInfo);
  }
})
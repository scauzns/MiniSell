// pages/comment/comment.js
import {
  addComment
} from '../../service/comment.js'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.imgUrl,
    orderDetails: null,
    userInfo: null,
    orderId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = app.getGlobalUserInfo();
    var orderInfo = JSON.parse(options.orderInfo);
    var orderId = orderInfo.orderId;
    var orderDetails = orderInfo.orderDetails;
    var userStars = [];
    for(var i=0; i< 5; i++){
      userStars.push("/assets/images/comment/tx.jpg");
    }
    for(var i=0; i<orderDetails.length; i++){
      orderDetails[i].detailIndex = i;
      orderDetails[i].content = "";
      orderDetails[i].userStars = userStars;
      orderDetails[i].wjxScore = 0;
    }
    this.setData({
      orderId: orderId,
      orderDetails: orderDetails,
      userInfo: userInfo
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 星星点击事件
  starTap: function (e) {
    var that = this;
    var detailIndex = e.currentTarget.dataset.detailindex;
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.orderDetails[detailIndex].userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = "/assets/images/comment/kx.png";
      } else { // 其他是空心
        tempUserStars[i] = "/assets/images/comment/tx.jpg"
      }
    }
    // 重新赋值就可以显示了
    var detailItemStars = "orderDetails[" + detailIndex + "].userStars";
    var detailItemScore = "orderDetails[" + detailIndex + "].wjxScore";
    that.setData({
      [detailItemStars]: tempUserStars,
      [detailItemScore]: index + 1
    })
  },
  commentInput: function(e){
    var detailIndex = e.currentTarget.dataset.detailindex;
    // 获取输入框的内容
    var content = e.detail.value;
    var detailContent = "orderDetails[" + detailIndex + "].content";
    this.setData({
      [detailContent]: content
    })
  },
  doComment: function(){
    console.log(this.data.orderDetails);
    var orderDetails = this.data.orderDetails;
    var comments = [];
    for(var i=0; i< orderDetails.length; i++){
      var food = orderDetails[i];
      var star = food.wjxScore;
      if(star == 0){
        wx.showToast({
          title: food.foodTitle + '还未评分！！',
          icon: 'none',
          duration: 1500
        })
        return;
      }
      var content = food.content;
      if (content.length == 0) {
        wx.showToast({
          title: food.foodTitle + '还未评价！！',
          icon: 'none',
          duration: 1500
        })
        return;
      }
      var commentItem = {
        userId: this.data.userInfo.id,
        userName: this.data.userInfo.name,
        userCover: this.data.userInfo.cover,
        foodId: food.foodId,
        orderId: this.data.orderId,
        content: food.content,
        star: star
      }
      comments.push(commentItem);
    }
    this._addComment(comments);
  },
  _addComment(comments) {
    addComment(comments).then(res => {
      if(res.code == 0){
        wx.showToast({
          title: '评价成功！',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../myOrders/myOrders',
          })
        }, 2000)
      }
    })
  }
})
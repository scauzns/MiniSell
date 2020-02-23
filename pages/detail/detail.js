// pages/detail/detail.js
import {
  getDetail
} from '../../service/detail.js'

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    foodItem: {},
    showDialog: false,
    imgUrl: app.imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.获取传入的id
    this.setData({
      id: options.id
    })

    // 2.请求商品详情数据
    this._getDetailData()
  },
  _getDetailData() {
    getDetail(this.data.id).then(res => {
      const foodItem = res.data;
      // 默认数量为1
      foodItem.count = 1;
      // 商品评分图片加载
      var comments = foodItem.comments;
      for(var i=0; i<comments.length; i++){
        var userStars = [];
        var starNum = comments[i].star;
        for(var j=0; j<5; j++){
          if(j<starNum){
            userStars.push("/assets/images/comment/kx.png");
          }else{
            userStars.push("/assets/images/comment/tx.jpg");
          }
        }
        comments[i].userStars = userStars;
      }
      // foodItem.comments = comments;
      this.setData({
        foodItem
      })
    })
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
    this.setData({
      showDialog: false
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

  onAddCart() {
    // 1.获取商品对象
    const obj = {};
    obj.id = this.data.id;
    obj.foodItem = this.data.foodItem;
    // 2.加入到购物车列表
    app.addToCart(obj);
    // 3.加入成功提示
    wx.showToast({
      title: '已加入购物车',
    });
    this.closeDialog();
  }
})
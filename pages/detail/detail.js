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
    foodComment: [],
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
    obj.foodComment = this.data.foodComment;
    // 2.加入到购物车列表
    app.addToCart(obj);
    // 3.加入成功提示
    wx.showToast({
      title: '已加入购物车',
    });
    this.closeDialog();
  }
})
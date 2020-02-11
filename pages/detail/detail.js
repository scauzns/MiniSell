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
    foodComment: []
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
      this.setData({
        foodItem
      })
    })
  },
  onAddCart() {
    // 1.获取商品对象
    const obj = {};
    console.log(this);
    obj.id = this.data.id;
    obj.foodItem = this.data.foodItem;
    obj.foodComment = this.data.foodComment;

    // 2.加入到购物车列表
    app.addToCart(obj);
    // 3.加入成功提示
    wx.showToast({
      title: '加入购物车成功',
    })
  }
})
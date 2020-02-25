// pages/category/category.js
import {
  getCategory,
  getCategoryDetail
} from '../../service/category.js'

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData: {
    },
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getData()
  },
  onShow: function(){
    //从首页分类导航跳转过来
    if (app.globalData.currentIndex) {
      var currentIndex = app.globalData.currentIndex;
      this.setData({
        currentIndex: currentIndex
      });
      this._getCategoryDetail(currentIndex)
      app.globalData.currentIndex = null;
    }
    
  },
  _getData() {
    // 1.请求分类数据
    this._getCategory()
  },
  _getCategory() {
    getCategory().then(res => {
      // 1.获取categories
      const categories = res.data;

      // 2.初始化每个类别的子数据
      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          categoryDetail: []
        }
      }

      // 3.修改data中的数据
      this.setData({
        categories: res.data,
        categoryData: categoryData
      })

      // 4.请求第一个类别的详情数据
      this._getCategoryDetail(this.data.currentIndex)
    })
  },
  _getCategoryDetail(currentIndex) {
    // 1.获取对应的cId
    const cId = this.data.categories[currentIndex].id;

    // 2.请求某类商品的数据
    this._getRealCategoryDetail(currentIndex, cId);
  },
  _getRealCategoryDetail(index, cId) {
    getCategoryDetail(cId).then(res => {
      // 1.获取categoryData
      const categoryData = this.data.categoryData;

      // 2.修改数据
      categoryData[index].categoryDetail = res.data;

      // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
      })
    })
  },
  menuClick(e) {
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    });

    // 2.请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  },
  wxSearchInput: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  }
})
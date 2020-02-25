// pages/home/home.js
import {
  getFoodRange
} from '../../service/category.js'

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: app.imgUrl,
    monthSalesFood: [],
    swiperList: [],
    navList: [
      { image: '/assets/images/common/ham.jpg', title: '汉堡', currentIndex: 0 },
      { image: '/assets/images/common/milktea.jpg', title: '奶茶', currentIndex: 3 },
      { image: '/assets/images/common/tang.jpg', title: '汤', currentIndex: 2  },
      { image: '/assets/images/common/drink.png', title: '饮料', currentIndex: 4  },
      { image: '/assets/images/common/dessert.png', title: '甜点', currentIndex: 6 },
      { image: '/assets/images/common/fruit.jpeg', title: '水果', currentIndex: 7 },
      { image: '/assets/images/common/bbq.jpg', title: '烧烤', currentIndex: 5 }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载食品月销top8
    getFoodRange(2,8).then(res => {
      var foodList = res.data;
      this.setData({
        monthSalesFood: foodList
      })
      //加载5张轮播图
      var swiperList = [];
      for(var i=0; i<5; i++){
        var food = foodList[i];
        var swiperItem = {
          cover: this.data.imgUrl + food.cover,
          id: food.id
        }
        swiperList.push(swiperItem);
      }
      this.setData({
        swiperList: swiperList
      });
    });
  },
  wxSearchInput: function(){
    wx.navigateTo({
      url: '../search/search',
    })
  }

  
})
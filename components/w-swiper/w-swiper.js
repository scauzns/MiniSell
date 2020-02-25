// components/w-swiper/w-swiper.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    mouseClick: function(e){
      var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../detail/detail?id=' + id,
      })
    }
  }
})

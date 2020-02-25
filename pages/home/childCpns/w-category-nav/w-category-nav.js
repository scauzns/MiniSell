// pages/home/childCpns/w-category-nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navList: {
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
    foodNav: function(e){
      var currentIndex = e.currentTarget.dataset.currentindex;
      getApp().globalData.currentIndex = currentIndex;
      wx.switchTab({
        url: '../category/category'
      })
    }
  }
})

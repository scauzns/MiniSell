// pages/detail/childCpns/w-detail-info/w-detail-info.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    foodItem: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        imgUrl: app.imgUrl
      })
    }
  }
})

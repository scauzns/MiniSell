// components/w-goods-item/w-goods-item.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsitem: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: app.imgUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e) {
      // 1.获取iid
      const id = this.data.goodsitem.id;
      // 2.跳转到对应的路径
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + id,
      })
    }
  }
})

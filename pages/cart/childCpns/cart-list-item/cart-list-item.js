// pages/cart/childCpns/cart-list-item/cart-list-item.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    food: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
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
    onCheckClick(e) {
      // 1.查找到对应的商品
      const food = app.globalData.cartList.find(item => item.id == this.properties.food.id);
      food.checked = !food.checked;

      // 2.获取当前商品的index
      const index = e.currentTarget.dataset.index;

      // 3.回调
      app.changeFoodsState(index, food)
    }
  }
})

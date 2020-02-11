// pages/profile/childCpns/w-header/w-header.js
const app = getApp();
Component({
  lifetimes: {
    attached: function () {
      if(!this.data.userInfo){
        this.setData({
          userInfo: app.getGlobalUserInfo()
        })
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    userInfo: null,
    imgUrl: app.imgUrl
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toLogin: function(){
      this.triggerEvent("toLogin");
    },
    toLogout: function(){
      this.triggerEvent("toLogout");
    }
  },
  
})

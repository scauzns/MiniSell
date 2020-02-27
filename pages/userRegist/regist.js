import {
  baseURL
} from '../../service/config.js'
const app = getApp()

Page({
    data: {
      genderArray : ['男','女'],
      gender: 0,
      faceUrl: '/assets/images/regist/noneface.png',
      cover: ''
    },

    bindPickerChange: function (e) {
      this.setData({
        gender: e.detail.value
      })
    },

    doRegist: function(e) {
      var me = this;
      var formObject = e.detail.value;
      var username = formObject.name;
      var password = formObject.password;
      var phone = formObject.phone;
      var gender = formObject.gender;

      // 简单验证
      if (username.length == 0 || password.length == 0) {
        wx.showToast({
          title: '用户名或密码不能为空',
          icon: 'none',
          duration: 3000
        })
      } else {
        wx.showLoading({
          title: '请等待...',
        });
        wx.request({
          url: baseURL + '/userService/user/register',
          method: "POST",
          data: formObject,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function(res) {
            console.log(res);
            wx.hideLoading();
            var code = res.data.code;
            if (code == 0) {
              wx.showToast({
                title: "用户注册成功~！！！",
                icon: 'none',
                duration: 3000
              }),
              // app.userInfo = res.data.data;
              // fixme 修改原有的全局对象为本地缓存
              app.setGlobalUserInfo(res.data.data);
              // 页面跳转
              wx.switchTab({
                url: '../profile/profile',
              })
            } else if (code !== 0) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 3000
              })
            }
          }
        })
      }
    },

    uploadFace: function() {
      var me = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: function (res) {
          var tempFilePaths = res.tempFilePaths;

          wx.showLoading({
            title: '上传中...',
          })

          wx.uploadFile({
            url: baseURL + '/userService/user/upload/img',
            // url: serverUrl + '/user/uploadFace?userId=' + userInfo.id,  //app.userInfo.id,
            filePath: tempFilePaths[0],
            name: 'file',
            success: function (res) {
              console.log(res.data)
              var data = JSON.parse(res.data);
              wx.hideLoading();
              if (data.code == 0) {
                console.log("上传成功")
                wx.showToast({
                  title: '上传成功!~~',
                  icon: "success"
                });

                var imageUrl = data.data;
                me.setData({
                  faceUrl: baseURL + imageUrl,
                  cover: imageUrl
                });

              } else {
                wx.showToast({
                  title: data.msg,
                  icon: 'none',
                  duration: 3000
                });
              } 

            }
          })
        }
      })
    },

    goLoginPage:function() {
      wx.navigateTo({
        url: '../userLogin/login',
      })
    }
})
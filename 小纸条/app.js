//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    usercol: null,
    userInfo: null,
    openid: null,
    nick: null,
    avataurl: null,
    url: 'https://www.donewthing.com/index.php/v1/',
    imgurl: 'https://www.donewthing.com',
    isIphone5: false,
    isIphoneX: false,
    userInfo: null,
    token:'14_biF7Tqq4hKouCsF55E3zXgU2vZbGPEZTODy09H70iuZL1m4-tE7ANn1iHwF0z2aQPpx9kwuty8XZU9Rwidf8AgbL-LD2BDGOWKzMkM20htYpm24j6Mv2mHkBsK94zxGZf2ZMlT6Lge42JkQLTFIdAFAZLO'
  },
  onShow: function () {
    let that = this;
    wx.getSystemInfo({
      success: res => {
        // console.log('手机信息res'+res.model)
        let modelmes = res.model;
        if (modelmes.search('iPhone 5') != -1) {
          that.globalData.isIphone5 = true
        }
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }

      }
    })

  }
})
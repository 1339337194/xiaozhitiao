const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
  
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code)
        wx.getUserInfo({
          success: function (res) {
            var userNick = res.userInfo.nickName;//用户昵称
            var avataUrl = res.userInfo.avatarUrl;//用户头像地址
            var gender = res.userInfo.gender;//用户性别

            wx.request({
              url: app.globalData.url + 'index/getuser',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名
              data: {
                code: code,
                nick: userNick,
                avaurl: avataUrl,

              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                app.globalData.openid = res.data.data,
                  app.globalData.nick = userNick,
                  app.globalData.avataurl = avataUrl,
                  console.log(app.globalData.nick);
                wx.navigateTo({
                  url: "/pages/chaunzhitiao1/chuanzhitiao1"
                })
              }
            })


         
          }
        });
      }
    });
   
  },
  getUserInfo: function (e) {

    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code)
        wx.getUserInfo({
          success: function (res) {
            var userNick = res.userInfo.nickName;//用户昵称
            var avataUrl = res.userInfo.avatarUrl;//用户头像地址
            var gender = res.userInfo.gender;//用户性别

            wx.request({
              url: app.globalData.url + 'index/getuser',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名
              data: {
                code: code,
                nick: userNick,
                avaurl: avataUrl,
                
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                console.log(res.data);
                app.globalData.openid = res.data.data,
                  app.globalData.nick = userNick,
                  app.globalData.avataurl = avataUrl,
                  wx.navigateTo({
                    url: "/pages/chaunzhitiao1/chuanzhitiao1"
                  })
              }
            })


           
          }
        });
      }
    });
  
  }
 
})

// pages/watch/watch.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked: false,
    showView: false,
    state: false,
    data:
      [{ img: 12, option: 'A', optionname: "a的数据"},
      { img: 12, option: 'B', optionname: "b的数据" },
      { img: 12, option: 'C', optionname: "c的数据" },
      { img: 12, option: 'D', optionname: "d的数据" }],
    img1: 12, img2: 12, img3: 12, img4: 12,
    title:'',
    titles: '',
    image:'',
    id:'',
    openid: '',
    tiid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this);
    var that = this;
    wx.request({
      url: app.globalData.url + 'index/gettiao', //仅为示例，并非真实的接口地址
      data: {
        id: options.id,
        openid: app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        console.log(app.globalData.openid);
        if (res.data.code == 0) {
          that.setData({
            title: res.data.data.title,
            image: app.globalData.imgurl + res.data.data.gsurl,
            id: res.data.data.id,
            openid: app.globalData.openid
          })
         

        }else{
 wx.navigateTo({
   url: "/pages/content_details/content_details?id=" + res.data.code
        })
        }

        if (res.data.data.openid == app.globalData.openid){
          wx.navigateTo({
            url: "/pages/content_details/content_details?id=" + res.data.data.id
          })
        }
       
      }
    })
    wx.request({
      url: app.globalData.url + 'index/getti', //仅为示例，并非真实的接口地址
      data: {
       
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
       
        if (res.data.code == 0) {
          that.setData({
            titles: res.data.data[0],
            data: res.data.data[1],
            tiid: res.data.data[2],
          })


        }
      }
    })
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
                that.setData({
                  openid: app.globalData.openid
                })
              }
            })



          }
        });
      }
    });

  },
 
  change: function () {
    var that = this;
    this.setData({
      isChecked: (!that.data.isChecked),
      showView: (!that.data.showView),
      state: (!that.data.state)
    })
  },

  

  /*
 调起微信支付
 @param 支付价格，不填写默认为1分钱
 */
  // pay: function (total_fee) {
  //     var that=this;
  //   var total_fee = 10;
  //   wx.login({
  //     success: res => {

  //       //code 用于获取openID的条件之一
  //       var code = res.code;
  //       wx.request({
  //         url: app.globalData.url + 'index/pay',
  //         method: "POST",
  //         data: {
  //           total_fee: total_fee,
  //           code: code,
  //         },
  //         header: {
  //           'content-type': 'application/x-www-form-urlencoded' // 默认值
  //         },
  //         success: function (res) { //后端返回的数据
  //           var data = res.data;
  //           console.log(data);
  //           console.log(data["timeStamp"]);
  //           wx.requestPayment({
  //             timeStamp: data['timeStamp'],
  //             nonceStr: data['nonceStr'],
  //             package: data['package'],
  //             signType: data['signType'],
  //             paySign: data['paySign'],
  //             success: function (res) {
  //               wx.showModal({
  //                 title: '提示',
  //                 showCancel: false,
  //                 content: '支付成功',
  //                 success: function (res) {
  //                   wx.navigateTo({
  //                     url: "/pages/content_details/content_details?id=" + that.data.id
  //                   })
  //                 }
  //               })
  //             },
  //             fail: function (res) {
  //               console.log(res);
  //             }
  //           })
  //         }
  //       });


  //     }
  //   })
  // },




  
  seleck: function(e){
    var that=this;
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    if(index == 1){
      this.setData({
        img1: 11,
      })
    }else if(index == 2){
      this.setData({
        img2: 11,
      })
    }
    else if (index == 3) {
      this.setData({
        img3: 11,
      })
    }
    else if (index == 4) {
      this.setData({
        img4: 11,
      })
    }
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function(res) {
        
        console.log(that.data.tiid)
        wx.request({
          url: app.globalData.url + 'index/getdaan',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名
          data: {
            tiid: that.data.tiid,
            openid: app.globalData.openid,
            zhiid: that.data.id,
            daan: e.currentTarget.dataset.index
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: function (res) {
             if(res.data.code==1){
               wx.showModal({
                 title: '提示',
                 showCancel: false,
                 content: '答题机会已用光',
                 success: function (res) {
                   if (res.confirm) {
                     console.log('用户点击确定')
                   } else if (res.cancel) {
                     console.log('用户点击取消')
                   }
                 }
               })
            } else if(res.data.code == 0){
               console.log(res.data.data);

               if (res.data.data == 1) {
                 that.setData({
                   img1: 27,
                 })
               } else if (res.data.data == 2) {
                 that.setData({
                   img2: 27,
                 })
               }
               else if (res.data.data == 3) {
                 that.setData({
                   img3: 27,
                 })
               }
               else if (res.data.data == 4) {
                 that.setData({
                   img4: 27,
                 })
               }
               wx.navigateTo({
                 url: "/pages/content_details/content_details?id=" + that.data.id
               })
             }else{
            
               if (res.data.data == 1) {
                 that.setData({
                   img1: 26,
                 })
               } else if (res.data.data == 2) {
                 that.setData({
                   img2: 26,
                 })
               }
               else if (res.data.data == 3) {
                 that.setData({
                   img3: 26,
                 })
               }
               else if (res.data.data == 4) {
                 that.setData({
                   img4: 26,
                 })
               }
               wx.showModal({
                 title: '提示',
                 showCancel: false,
                 content: '答案错误',
                 success: function (res) {
                   if (res.confirm) {
                     console.log('用户点击确定')
                   } else if (res.cancel) {
                     console.log('用户点击取消')
                   }
                 }
               })
             }
          }
        })

      },
      fail: function(res) {},
      complete: function(res) {},
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)

  },
  onShareAppMessage: function () {
      var that=this;
    wx.request({
      url: app.globalData.url + 'index/zlogs', //仅为示例，并非真实的接口地址
      data: {
        zhiid: that.data.id,
        openid: app.globalData.openid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        wx.navigateTo({
          url: "/pages/content_details/content_details?id=" + that.data.id
        })
      }
    })
    return {
      title: this.data.title,
      path: '/pages/watch/watch?id=' + this.data.id,
      imageUrl: this.data.image,
 
      // success: function (res) {
      //   // 转发成功
      //   console.log("转发成功");

       



      // },
      // fail: function (res) {
      //   // 转发失败
      //   console.log("转发失败");
      // }
      　　　
    }

   
  },

   getUserInfo: function (e) {
     app.slideupshow(this, 'slide_up1', -200, 0.5)
     var that = this;
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
                  // wx.navigateTo({
                  // url: "/pages/watch/watch"
                  // })
                 that.setData({
                  openid: app.globalData.openid
                 })
              }
            })



          }
        });
      }
    });

  }
})
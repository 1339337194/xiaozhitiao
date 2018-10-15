// pages/content_details/content_details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onOff: true,
    collected:'',
    img: app.globalData.imgurl,
    ping:[],
    content:'',
    shou:0,
    usercol:'',
    showView1:false,
    user:0,
    isRuleTrue: false,
    modalHidden: true
  },


  buttonTap: function () {
    this.setData({
      modalHidden: false
    })
  },
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  
  showtip:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      showCancel: true,
      content: '您确定要举报吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.request({
            url: app.globalData.url + 'index/bao', //仅为示例，并非真实的接口地址
            data: {

              zhiid: that.data.content.id,
              openid: app.globalData.openid,

            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"

            },
            method: "POST",
            success: function (res) {
              console.log(res.data);

              if (res.data.code == 0) {
             

              }
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  erwei: function () {
    var that = this;
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + app.globalData.token,
    //   data: { 'path': "pages/watch/watch?id=1", 'width': 430 },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: "POST",
    //   success: function (res) {
    //     console.log(res.data)
    //   },
    //   fail: function (res) {
    //     console.log('isFail')
    //   }
    // })

    that.showerweima();
  },
  showerweima: function () {
    var that = this;
    this.setData({
      isRuleTrue: true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isIphone5 = app.globalData.isIphone5;
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphone5: isIphone5,
      isIphoneX: isIphoneX
    })
    showView: (options.showView == "true" ? true : false)
  },
  onLoad: function (option) {
    let isIphone5 = app.globalData.isIphone5;
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphone5: isIphone5,
      isIphoneX: isIphoneX
    })
    console.log(option.id)

    var that = this;
    wx.request({
      url: app.globalData.url + 'index/gettiao', //仅为示例，并非真实的接口地址
      data: {

        id: option.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data);

        if (res.data.code == 0) {
          that.setData({
            content: res.data.data
          })
          if (res.data.data.openid == app.globalData.openid){
            that.setData({
              user:1
            })
          }
        }
      }
    })
    wx.request({
      url: app.globalData.url + 'index/getping', //仅为示例，并非真实的接口地址
      data: {

        id: option.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data.data);

        if (res.data.code == 0) {
          that.setData({
            ping: res.data.data
          })

        }
      }
    })

    wx.request({
      url: app.globalData.url + 'index/getusercol', //仅为示例，并非真实的接口地址
      data: {

        openid: app.globalData.openid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data.data);

        if (res.data.code == 0) {
          that.setData({
            usercol:'#'+ res.data.data
          })

        }
      }
    })

    var postId = option.id;
    this.data.currentPostId = postId;
  //  var postData = postsData.postList[postId];
    var postsCollected = wx.getStorageSync('posts_collected') 
    if (postsCollected) {   
          var postCollected = postsCollected[postId]
          this.setData({
          collected: postCollected 
      })
    }
    else {     
            var postsCollected = {};
            postsCollected[postId] = false; 
            wx.setStorageSync('posts_collected', postsCollected)
    }

    wx.request({
      url: app.globalData.url + 'index/cshou', //仅为示例，并非真实的接口地址
      data: {

        zhiid: option.id,
        openid: app.globalData.openid,

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        console.log('s');
        if (res.data.code == 0) {
          that.setData({
            shou: 1
          })

        }
      }
    })

    wx.request({
      url: app.globalData.url + 'index/lan', //仅为示例，并非真实的接口地址
      data: {

        zhiid: option.id,
        openid: app.globalData.openid,

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data);

        if (res.data.code == 0) {
          // that.setData({
          //   shou: 1
          // })

        }
      }
    })

  },
  // onCollectionTap: function (event) {　　　
  //           var postsCollected = wx.getStorageSync('posts_collected');   
  //            var postCollected = postsCollected[this.data.currentPostId];   
  //            postCollected = !postCollected;
  //            postsCollected[this.data.currentPostId] = postCollected;
  //            wx.setStorageSync('posts_collected', postsCollected);
  //            this.setData({
  //               collected: postCollected 
  //              })
  // },
  havesave: function (e) {
    console.log(e.target.dataset.pid);
    var that = this;
    wx.showModal({
      title: '提示',
      showCancel: true,
      content: '您确定要举报吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.request({
            url: app.globalData.url + 'index/baop', //仅为示例，并非真实的接口地址
            data: {
              zhiid: that.data.content.id,
              pid: e.target.dataset.pid,
              openid: app.globalData.openid,

            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"

            },
            method: "POST",
            success: function (res) {
              console.log(res.data);

              if (res.data.code == 0) {


              }
            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  pinglunclick: function () {
    this.setData({ onOff: false });
  },
   onChangeShowState: function () {
    var that = this;
    that.setData({
      showView1: (!this.data.showView1)
    })
  },
  onChangeShowState1: function () {
    var that = this;
    that.setData({
      showView1: false
    })
  },
  fanhui: function () {
    wx.redirectTo({
      url: "/pages/wode/wode"
    })
  },
  shou: function () {
    var that = this;
    console.log(that.data.content)
    wx.request({
      url: app.globalData.url + 'index/shou', //仅为示例，并非真实的接口地址
      data: {

        zhiid: that.data.content.id,
        openid: app.globalData.openid,

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data.data);
        if (res.data.code == 0) {
          that.setData({
            shou: 1
          })

        }
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '已收藏',
          success: function (res) {
            if (res.confirm) {
           
            } else if (res.cancel) {
             
            }
          }
        })
      
      }
    })
  },
  qushou: function () {
    var that = this;
    console.log(that.data.content)
    wx.request({
      url: app.globalData.url + 'index/qushou', //仅为示例，并非真实的接口地址
      data: {

        zhiid: that.data.content.id,
        openid: app.globalData.openid,

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data.data);

        if (res.data.code == 0) {
          that.setData({
            shou: 0
          })

        }
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value)
    console.log(that.data.content.id)
    if (e.detail.value.content == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写评论',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    wx.request({
      url: app.globalData.url + 'index/ping', //仅为示例，并非真实的接口地址
      data: {
        zhiid:that.data.content.id,
        openid: app.globalData.openid,
        content: e.detail.value.content
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data);

        if (res.data.code == 0) {
          wx.redirectTo({
            url: "/pages/content_details/content_details?id=" + that.data.content.id
          })
        }else{
          // wx.showModal({
          //   title: '提示',
          //   showCancel: false,
          //   content: '最多评论五条',
          //   success: function (res) {
          //     if (res.confirm) {
          //       console.log('用户点击确定')
          //     } else if (res.cancel) {
          //       console.log('用户点击取消')
          //     }
          //   }
          // })
        }
      }
    })

  },
  onShareAppMessage: function (e) {
    console.log(this.data.content)



    return {
      title: this.data.content.title,
      path: '/pages/watch/watch?id=' + this.data.content.id,
      imageUrl: app.globalData.imgurl +this.data.content.gsurl,
    }


  },

})
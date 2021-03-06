// pages/shoucang/shoucang.js
const app = getApp()
Page({

  /**
    * 页面的初始数据
    */
  data: {
    zhi: '',
    img: app.globalData.imgurl
  },
  fanhui: function () {
    wx.navigateTo({
      url: "/pages/chaunzhitiao1/chuanzhitiao1"
    })
  },

  xiang: function (e) {
    wx.navigateTo({
      url: "/pages/content_details/content_details?id=" + e.currentTarget.dataset.id
    })
  },
 
  wode: function () {
    wx.navigateTo({
      url: "/pages/wode/wode"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid)
    var that = this;
    wx.request({
      url: app.globalData.url + 'index/getshou', //仅为示例，并非真实的接口地址
      data: {

        openid: app.globalData.openid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data);

        if (res.data.code == 0) {
          that.setData({
            zhi: res.data.data,
          })

        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
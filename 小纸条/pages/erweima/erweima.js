// pages/content_details/content_details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onOff: true,
    isRuleTrue: false
  },
  showerweima: function () {
    this.setData({
      isRuleTrue: true
    })
  },
  hideerweima: function () {
    this.setData({
      isRuleTrue: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
  },
  onLoad: function (option) {
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



  },
  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    })
  },
  havesave: function () {
    wx.showModal({
      title: '',
      content: '是否举报此纸条',
    })
  },
  pinglunclick: function () {
    this.setData({ onOff: false });
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  }

})
// pages/chaunzhitiao1/chuanzhitiao1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    id:'',
    array: '',
    index: 0,
    address: '',
    classname: '',
    onOff: true,
    isRuleTrue: false,
    name: '',
    content: '',
    user: '',
    ohone: '',
    gsimg:'',
    imgurl: '',
    title:'',
    phone: '',
    evalList: [{ tempFilePaths: [], imgList: [] }],
    tempFilePaths: [],
    imgss:'',
    // 触摸开始时间
    touchStartTime: 0,
    // 触摸结束时间
    touchEndTime: 0,
    // 最后一次单击事件点击发生时间
    lastTapTime: 0,
    // 单击事件点击后要触发的函数
    lastTapTimeoutFunc: null,
  },
  showerweima: function (e) {
    var that = this;
 wx.request({
      url: app.globalData.url + 'index/gettiao', //仅为示例，并非真实的接口地址
      data: {

        id: e
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"

      },
      method: "POST",
      success: function (res) {
        console.log(res.data.data);


        that.setData({
          title: res.data.data.title,
          gsimg: app.globalData.imgurl + res.data.data.gsurl
        })

      }
    })



    this.setData({
      isRuleTrue: true,
      id:e
    })
  },
  hideerweima: function () {
    this.setData({
      isRuleTrue: false
    })
  },

  onShareAppMessage: function (e) {
    console.log(this.data.title)


   
    return {
      title: this.data.title,
      path: '/pages/watch/watch?id=' + e.target.dataset.id,
      imageUrl: this.data.gsimg,
    }

  
  },
 
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value)
    var evalList = that.data.evalList;
   // var imgs = evalList[0].imgList;
    wx.request({
      url: app.globalData.url + 'index/addzhi', //仅为示例，并非真实的接口地址
      data: {
        title: e.detail.value.title,
        img: e.detail.value.url,
        content: e.detail.value.content,
        imgs: evalList[0].imgList,
        openid: app.globalData.openid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
       
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);

        if (res.data.code == 0) {
        
          that.showerweima(res.data.data);


        }
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  div1click:function(){
    wx.navigateTo({
      url: '../shoucang/shoucang',
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
  // onShareAppMessage: function () {
  
  // },



  //添加图片
  joinPicture: function (e) {
    var index = e.currentTarget.dataset.index;
    var evalList = this.data.evalList;
    var that = this;
    var imgNumber = evalList[index].tempFilePaths;
    if (imgNumber.length >= 20) {
      wx.showModal({
        title: '',
        content: '最多上传二十张图片',
        showCancel: false,
      })
      return;
    }
    wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage("album", imgNumber);
          } else if (res.tapIndex == 1) {
            that.chooseWxImage("camera", imgNumber);
          }
        }
      }
    })
  },
  chooseWxImage: function (type, list) {
    var img = list;
    var len = img.length;
    var that = this;
    var evalList = this.data.evalList;
    wx.chooseImage({
      count: 20,
      sizeType: ["original", "compressed"],
      sourceType: [type],
      success: function (res) {
        var addImg = res.tempFilePaths;
        var addLen = addImg.length;
        if ((len + addLen) > 20) {
          for (var i = 0; i < (addLen - len); i++) {
            var str = {};
            str.pic = addImg[i];
            img.push(str);
          }
        } else {
          for (var j = 0; j < addLen; j++) {
            var str = {};
            str.pic = addImg[j];
            img.push(str);
          }
        }
        that.setData({
          evalList: evalList
        })
        that.upLoadImg(img);
      },
    })
  },
  upLoadImg: function (list) {
    var that = this;
    this.upload(that, list);
  },
  //多张图片上传
  upload: function (page, path) {
    var that = this;
    var curImgList = [];
    for (var i = 0; i < path.length; i++) {
      wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),
        wx.uploadFile({
        url: app.globalData.url + 'index/mchimg',//接口处理在下面有写
          filePath: path[i].pic,
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
          formData: {
            douploadpic: '1'
          },
          success: function (res) {
            console.log(res.data)
            curImgList.push(res.data);
            var evalList = that.data.evalList;
            evalList[0].imgList = curImgList;
            that.setData({
              evalList: evalList
            })
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            }
            var data = res.data
            page.setData({  //上传成功修改显示头像
              src: path[0]
            })
          },
          fail: function (e) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function () {
            wx.hideToast();  //隐藏Toast
          }
        })
    }
  },
  //删除图片
  // clearImg: function (e) {
  //   var index = e.currentTarget.dataset.index;
  //   var evalList = this.data.evalList;
  //   var img = evalList[0].tempFilePaths;
  //   img.splice(index, 1);
  //   this.setData({
  //     evalList: evalList
  //   })
  //   this.upLoadImg(img);
  // },
  longTaps: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      showCancel: true,
      content: '您确定要删除吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var index = e.currentTarget.dataset.index;
          var evalList = that.data.evalList;
          var img = evalList[0].tempFilePaths;
          img.splice(index, 1);
          evalList[0].imgList.splice(index, 1);
          that.setData({
            evalList: evalList
          })
          that.upLoadImg(img);
          console.log(evalList[0].imgList) 
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },







  upimg: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var data = {
          program_id: app.jtappid
        }
        var tempFilePaths = res.tempFilePaths  //图片
     
        wx.uploadFile({
         
          url: app.globalData.url + 'index/mchimg',//接口处理在下面有写
          filePath: tempFilePaths[0],
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
          formData: {
            //douploadpic: '1'

          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              imgurl: res.data,
              imgss: app.globalData.imgurl+res.data
            })
          }
        })

      }
    })
  },



  /// 按钮触摸开始触发的事件 
  touchStart: function(e) { this.touchStartTime = e.timeStamp }, 
  /// 按钮触摸结束触发的事件 
  touchEnd: function(e) { this.touchEndTime = e.timeStamp },

  longTap: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      showCancel: true,
      content: '您确定要删除吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.setData({
            imgss:''
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },


})
// pages/chaunzhitiao1/chuanzhitiao1.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_contents:'',
  a:[],
    b: [],
    id:'',
    array: '',
    index: 0,
    address: '',
    classname: '',
    onOff: true,
    isRuleTrue: false,
    isRuleTrues: false,
    name: '',
    content: '',
    user: '',
    ohone: '',
    gsimg:'',
    imgurl: '',
    title:'',
    input_title: '',
    input_content:'',
    isfouce: false ,
    phone: '',
    evalList: [{ tempFilePaths: [], imgList: [] }],
    tempFilePaths: [],
    imgss:'',
    imgsss: '',
    // 触摸开始时间
    touchStartTime: 0,
    // 触摸结束时间
    touchEndTime: 0,
    // 最后一次单击事件点击发生时间
    lastTapTime: 0,
    // 单击事件点击后要触发的函数
    lastTapTimeoutFunc: null,
  },
  isfouce: function () {
    var that=this
   that.setData({
      isfouce: false,
     content1: this.data.input_content
    })
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      isfouce: true,
      input_content: e.detail.value,
      content1:this.data.input_content
    })

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
    this.setData({
      isRuleTrue:false
    })
    console.log(this.data.title)
    console.log(this.data.gsimg)
    if (this.data.gsimg =='https://www.donewthing.comnull'){
      var img = '../img/bg98.jpg'
    }else{
      var img = this.data.gsimg
    }
    
   
    return {
      title: this.data.title,
      //path: '/pages/watch/watch?id=' + e.target.dataset.id,
      path: "/pages/content_details/content_details?id=" + e.target.dataset.id,
      imageUrl: img //this.data.gsimg,
    }

  
  },
 
  formSubmit: function (e) {
    var that = this;
   // console.log( JSON.stringfy(e.detail.value) )
    console.log(e.detail.value.content)
    //return
    console.log(Object.keys(e.detail.value).length)
    var evalList = that.data.evalList;
   // var imgs = evalList[0].imgList;
    if (e.detail.value.content == undefined && e.detail.value.title == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写正文后分享',
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
    if (e.detail.value.title == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写标题后分享',
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
    if (e.detail.value.content == undefined || e.detail.value.content == null || e.detail.value.content == 'null' ||e.detail.value.content == 'undefined' || e.detail.value.content == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写内容',
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
      url: app.globalData.url + 'index/addzhi', //仅为示例，并非真实的接口地址
      data: {
        title: e.detail.value.title,
        img: e.detail.value.url,
        content: e.detail.value.content,
        imgs: evalList[0].imgList,
        imgsp: evalList[0].tempFilePaths,
        openid: app.globalData.openid,
        jsons: e.detail.value 
      },
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
       
      // },
      header: { 'Content-Type': 'application/json' },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        that.setData({
          input_title: '',
          imgurl:'',
          imgss:'',
          imgsss:'',
          input_content: '',
          evalList: [{ tempFilePaths: [], imgList: [] }],
          tempFilePaths: [],
        })
        if (res.data.code == 0) {
       
          that.showerweima(res.data.data);


        }
      }
    })

  },
  text: function (event) {
    var that=this
    console.log(event.target.dataset.id);
    console.log(event.detail.value);
    //var a = event.target.dataset.id
    that.data.a[event.target.dataset.id] = event.detail.value
    //that.data.b[event.target.dataset.id] =0
    var ass=that.data.a
   // var bs = that.data.b
    this.setData({
      a: ass,
     //   b:bs
    })
    console.log(this.data.a);
    
  },
  texts: function (event) {
 
  

    this.setData({
      input_contents: event.detail.value

    })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX,
      
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
                // wx.navigateTo({
                //   url: "/pages/chaunzhitiao1/chuanzhitiao1"
                // })
              }
            })



          }
        });
      }
    });
  },
  div1click:function(){
    wx.navigateTo({
      url: '../shoucang/shoucang',
    })
  },
  towodeclick: function () {
    wx.navigateTo({
      url: '../wode/wode',
    })
  },
  towode: function (e) {
    var that=this
    wx.request({
      url: app.globalData.url + 'index/del',//服务器的地址，现在微信小程序只支持https请求，所以调试的时候请勾选不校监安全域名
      data: {
        id: e.target.dataset.id,
        //isRuleTrue:false
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
       that.setData({
         isRuleTrue:false
       })
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
  // onShareAppMessage: function () {
  
  // },



  //添加图片
  joinPicture: function (e) {
    var index = e.currentTarget.dataset.index;
    var evalList = this.data.evalList;
    var that = this;
    var imgNumber = evalList[index].tempFilePaths;
    if (imgNumber.length >= 10) {
      wx.showModal({
        title: '',
        content: '最多上传十张图片',
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
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [type],
      success: function (res) {
        var addImg = res.tempFilePaths;
        var addLen = addImg.length;
        if ((len + addLen) > 10) {
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
        if (that.data.input_contents == '') {
          that.setData({
            isRuleTrues: true
          })
        }
        var sss = that.data.b.concat(0)
        var sssa = that.data.a.concat('')
        that.setData({
          b: sss,
          a: sssa
        })
        var alis = that.data.a.length
        var bss = that.data.b
        for (var s = 0; s < alis - 1; s++) {
          if (that.data.a[s] == '') {
            bss[s] = 1;
          }

        }
        that.setData({
          b: bss
        })
        //   console.log(that.data.a.length);
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
    console.log(path)
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
              // wx.showModal({
              //   title: '提示',
              //   content: '上传失败',
              //   showCancel: false
              // })
              return;
            }
            var data = res.data
            page.setData({  //上传成功修改显示头像
              src: path[0]
            })
          },
          fail: function (e) {


            // curImgList.push('1');
            // var evalList = that.data.evalList;
            // evalList[0].imgList = curImgList;
            // that.setData({
            //   evalList: evalList
            // })

            // wx.showModal({
            //   title: '提示',
            //   content: '上传失败',
            //   showCancel: false
            // })
            // var evalList = that.data.evalList;
            // evalList[0].imgList = evalList[0].imgList.push('1');
            // console.log(evalList)
            // console.log('11')
            // that.setData({
            //   evalList: evalList
            // })
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
          //img.splice(index, 1);
          //evalList[0].imgList.splice(index, 1);
          img[index] = '1';
          evalList[0].imgList[index] = '1';
          that.setData({
            evalList: evalList
          })
          // that.upLoadImg(img);
          console.log(evalList[0].imgList)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },







  upimg: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            // that.chooseWxImage("album", imgNumber);
            wx.chooseImage({
              count: 1,
              sizeType: ["original", "compressed"],
              sourceType: ['album'],
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
                    //  console.log(res.data)
                    that.setData({
                      imgurl: res.data,
                      imgss: app.globalData.imgurl + res.data,
                      imgsss:'1',
                    })
                  }
                })

              }
            })
          } else if (res.tapIndex == 1) {
            wx.chooseImage({
              count: 1,
              sizeType: ["original", "compressed"],
              sourceType: ['camera'],
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
                    //   console.log(res.data)
                    that.setData({
                      imgurl: res.data,
                      imgss: app.globalData.imgurl + res.data
                    })
                  }
                })

              }
            })
            // that.chooseWxImage("camera", imgNumber);
          }
        }
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
            imgss:'',
            imgurl: '',
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  getUserInfo: function (e) {
var that=this
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
                  app.globalData.avataurl = avataUrl
                that.setData({
                  openid: app.globalData.openid
                })
                  // wx.navigateTo({
                  //   url: "/pages/chaunzhitiao1/chuanzhitiao1"
                  // })
              }
            })



          }
        });
      }
    });

  }
})
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    username: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
    //用户授权，这个需要用户点击才行，而登录可以是默认执行的
   if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          //wx.navigateBack();
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
        wx.showLoading({
            title: '正在保存数据',
            mask: true
        })
      var that = this;
      var nickname = e.detail.userInfo.nickName;
      var headerimg = e.detail.userInfo.avatarUrl;
      var gender = e.detail.userInfo.gender;
      wx.setStorageSync("nickname", nickname)
      wx.setStorageSync("userheaderimg", headerimg)
      wx.setStorageSync("gender", gender)
      //console.log(e.detail.userInfo);
      //console.log('头像是' + wx.getStorageSync('userheaderimg')+'昵称是'+wx.getStorageSync('nickname'))
      wx.login({
        success: function (e) {
          e.code ? app.util.request({
            url: "entry/wxapp/GetUid",
            data: {
              code: e.code
            },
            success: function (e) {
              if (!e.data.errno) {
                wx.setStorageSync("openid", e.data.data);
                app.globalData.openid=e.data.data;
                var a = wx.getStorageSync("openid");//nickname  userheaderimg gender
                var nickname = wx.getStorageSync('nickname');
                var userheaderimg = wx.getStorageSync('userheaderimg');
                var gender = wx.getStorageSync('gender');
                console.log(a),
                  app.util.request({
                    url: "entry/wxapp/Member",
                    cachetime: "30",
                    data: {
                      nickName: nickname,
                      avatarUrl: userheaderimg,
                      openid: a,
                      xingbie: gender
                    },
                    success:function(e){
                      if (wx.getStorageSync('userheaderimg') != '' && wx.getStorageSync('nickname') != '') {
                        wx.reLaunch({
                          url: '/tourism_page/index/index'
                        })
                      }
                    }
                  });
              }
            },
            fail: function (e) {
              console.log(e);
            }
          }) : console.log("获取用户登录态失败！" + e.errMsg);
        }
      });
    } else {
        wx.showToast({
            title: '请重新点击授权',
            icon: 'none'
        })
    }
  
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
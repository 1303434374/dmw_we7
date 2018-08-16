// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    current: 0,
    downTime: '',//倒计时
  },

  //事件处理函数
  onLoad: function () {
    let t = this;
    t.CountDown(t, 86500);
  },
  //秒杀倒计时
  CountDown: function (t, time) {
    // console.log(t.data.downTime)
    if (time <= 0) {
      return t.setData({
        downTime: {
          d: '00',
          h: '00',
          i: '00',
          s: '00'
        }
      })
    }
    time--;
    t.setData({
      downTime: {
        d: parseInt(time / 86400) < 10 ? '0' + parseInt(time / 86400) : String(parseInt(time / 86400)),
        h: (function (time) {
          var h = parseInt((parseInt(time / 3600) * 3600) / 3600);
          if (h >= 24) {
            h = h % 24
          }
          return h < 10 ? '0' + h : String(h);
        })(time),
        i: (function (time) {
          var i = parseInt((time - parseInt(time / 3600) * 3600) / 60);

          return i < 10 ? '0' + i : String(i);
        })(time),
        s: (function (time) {
          var s = parseInt((time - parseInt(time / 3600) * 3600)) - parseInt((time - parseInt(time / 3600) * 3600) / 60) * 60;
          return s < 10 ? '0' + s : String(s);
        })(time)
      }
    })

    setTimeout(function () { t.CountDown(t, time) }, 1000);
  },
  //选项卡
  swichNav: function (e) {
    this.setData({
      currentTab: e.target.dataset.index
    })
  },
  swichNavs: function (e) {
    this.setData({
      current: e.target.dataset.index
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
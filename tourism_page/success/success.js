var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        var t = o.time, e = o.type;
        console.log(e), console.log(t), this.getPaySuccess(t, e), this.getTitle();
    },
    getTitle: function() {
        app.util.request({
            url: "entry/wxapp/Title",
            cachetime: "30",
            success: function(o) {
                wx.setNavigationBarTitle({
                    title: o.data.data
                });
            },
            fail: function(o) {
                console.log(o);
            }
        });
    },
    getPaySuccess: function(o, t) {
        var e = this, n = wx.getStorageSync("openid");
        console.log(t), console.log(o), app.util.request({
            url: "entry/wxapp/PayOK",
            cachetime: "30",
            data: {
                openid: n,
                time: o,
                type: t
            },
            success: function(o) {
                console.log(o), e.setData({
                    PaySuccess: o.data.data
                });
            },
            fail: function(o) {
                console.log(o);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
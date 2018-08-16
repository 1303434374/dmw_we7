var app = getApp();

Page({
    data: {
        order_type: "",
        order_detail: {
            staging: !1
        }
    },
    onLoad: function(n) {
        var e = n.id, o = n.types;
        this.getMyOrder(e, o);
    },
    onReady: function() {},
    getMyOrder: function(n, e) {
        var o = wx.getStorageSync("openid"), t = this;
        app.util.request({
            url: "entry/wxapp/MyOrder",
            data: {
                openid: o,
                id: n,
                types: e
            },
            success: function(n) {
                console.log(n), t.setData({
                    MyOrder: n.data.data,
                    order_type: e,
                    receiving: n.data.data.receiving
                });
            },
            fail: function(n) {
                console.log(n);
            }
        });
    },
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
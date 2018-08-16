var _Page;

function _defineProperty(e, n, t) {
    return n in e ? Object.defineProperty(e, n, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[n] = t, e;
}

var WxParse = require("../../../../wxParse/wxParse.js"), app = getApp();

Page((_defineProperty(_Page = {
    data: {},
    onLoad: function(e) {
        var n = this, t = n.options.id;
        n.getTuwenInto(t), n.getTitle();
    },
    getTitle: function() {
        app.util.request({
            url: "entry/wxapp/Title",
            success: function(e) {
                wx.setNavigationBarTitle({
                    title: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    onReady: function() {},
    getTuwenInto: function(e) {
        var n = this;
        console.log(e), app.util.request({
            url: "entry/wxapp/TuwenInto",
            data: {
                id: e
            },
            success: function(e) {
                console.log(e), n.setData({
                    TuwenInto: e.data.data
                }), WxParse.wxParse("Tuwen", "html", e.data.data.content, n, 5);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
}, "onPullDownRefresh", function() {}), _defineProperty(_Page, "onReachBottom", function() {}), 
_defineProperty(_Page, "onShareAppMessage", function() {}), _Page));
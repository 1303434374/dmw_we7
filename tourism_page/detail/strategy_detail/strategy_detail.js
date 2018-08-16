var _Page;

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var WxParse = require("../../wxParse/wxParse.js"), app = getApp();

Page((_defineProperty(_Page = {
    data: {
        mess: {
            image: "../../resource/images/item.png"
        },
        musicStatus: !0,
        music_url: ""
    },
    musicControl: function() {
        var t = this.data.music_url;
        console.log(t), this.data.musicStatus && wx.playBackgroundAudio({
            dataUrl: t
        });
    },
    contral_music: function() {
        this.setData({
            musicStatus: !this.data.musicStatus
        }), this.data.musicStatus ? this.musicControl() : wx.pauseBackgroundAudio();
    },
    onLoad: function(t) {
        var a = t.id;
        this.getStrategy(a), this.getTitle();
    },
    onHide: function() {},
    getTitle: function() {
        app.util.request({
            url: "entry/wxapp/Title",
            cachetime: "30",
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getStrategy: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Strategy",
            cachetime: "30",
            data: {
                id: t
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                var a = t.data.data[0].audio;
                console.log(a), wx.playBackgroundAudio({
                    dataUrl: a
                }), e.setData({
                    Strategy: t.data.data,
                    music_url: a
                }), WxParse.wxParse("text", "html", t.data.data[0].text, e, 5);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onReady: function() {},
    onShow: function() {}
}, "onHide", function() {}), _defineProperty(_Page, "onUnload", function() {
    wx.pauseBackgroundAudio();
}), _defineProperty(_Page, "onPullDownRefresh", function() {
    wx.showNavigationBarLoading(), setTimeout(function() {
        wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
    }, 1e3);
}), _defineProperty(_Page, "onReachBottom", function() {}), _defineProperty(_Page, "onShareAppMessage", function() {}), 
_Page));
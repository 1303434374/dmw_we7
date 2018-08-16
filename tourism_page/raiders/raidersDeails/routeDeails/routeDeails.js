var WxParse = require("../../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {
        musicStatus: !0,
        music_url: ""
    },
    onLoad: function(a) {
        var t = a.strategy_id;
        this.getStrategyInto(t);
    },
    musicControl: function() {
        var a = this.data.music_url;
        console.log(a), this.data.musicStatus && wx.playBackgroundAudio({
            dataUrl: a
        });
    },
    contral_music: function() {
        this.setData({
            musicStatus: !this.data.musicStatus
        }), this.data.musicStatus ? this.musicControl() : wx.pauseBackgroundAudio();
    },
    onReady: function() {},
    onShow: function() {
        wx.playBackgroundAudio({
            dataUrl: this.data.music
        });
    },
    onHide: function() {
        wx.pauseBackgroundAudio();
    },
    onUnload: function() {
        wx.pauseBackgroundAudio();
    },
    getStrategyInto: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/StrategyInto",
            data: {
                id: a
            },
            success: function(a) {
                console.log(a), t.setData({
                    Strategy: a.data.data,
                    music_url: a.data.data.audio
                }), 
                // wx.playBackgroundAudio({
                //     dataUrl: a.data.data.audio
                // }), 
                wx.setNavigationBarTitle({
                    title: a.data.data.title
                })
                WxParse.wxParse("content", "html", a.data.data.text, t, 5);
            },
            fail: function(a) {
                console.log(a);
            }
        });
    }
});
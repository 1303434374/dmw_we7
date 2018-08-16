var WxParse = require("../../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        this.getInformationInto(t.id);
    },
    onReady: function() {
        this.getTitle();
    },
    getTitle: function() {
        app.util.request({
            url: "entry/wxapp/Title",
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
    getInformationInto: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/InformationInto",
            data: {
                id: t
            },
            success: function(t) {
                console.log(t), a.setData({
                    Information: t.data.data
                }), WxParse.wxParse("content", "html", t.data.data.content, a, 5);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    }
});
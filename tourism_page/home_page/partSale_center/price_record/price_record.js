var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        this.getMyMoneyRecord();
    },
    onReady: function() {},
    getMyMoneyRecord: function() {
        var o = this, t = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyMoneyRecord",
            data: {
                openid: t
            },
            success: function(t) {
                console.log(t);
                for (var e = t.data.data, a = 0; a < e.length; a++) 2 == e[a].type ? e[a].add = "1" : 1 == e[a].type && -1 == e[a].status && (e[a].add = "1");
                o.setData({
                    Record: e
                });
            }
        });
    }
});
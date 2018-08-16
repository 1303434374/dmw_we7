var app = getApp();

Page({
    data: {
        titVal: 0
    },
    onLoad: function(t) {
        this.getDistribution_level();
    },
    getDistribution_level: function() {
        var a = this, t = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/Distribution_level",
            data: {
                openid: t
            },
            success: function(t) {
                console.log(t), a.setData({
                    one: t.data.data.one,
                    two: t.data.data.two,
                    three: t.data.data.three
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    changeTit: function(t) {
        this.setData({
            titVal: t.target.dataset.id
        });
    }
});
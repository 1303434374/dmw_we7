var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        app.util.request({
            url: "entry/wxapp/Title",
            success: function(n) {
                wx.setNavigationBarTitle({
                    title: n.data.data
                });
            },
            fail: function(n) {
                console.log(n);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
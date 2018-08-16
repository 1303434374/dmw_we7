var app = getApp();

Page({
    data: {
        currentNav: ""
    },
    onLoad: function(t) {
        var a = t.address_id;
        this.getTitle(), this.getStrategyNav(a);
    },
    changeNav: function(t) {
        this.setData({
            currentNav: t.target.dataset.id
        });
    },
    onReady: function() {},
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
    getStrategyNav: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/StrategyNav",
            data: {
                address_id: t
            },
            success: function(t) {
                console.log(t), a.setData({
                    StrategyNav: t.data.data,
                    currentNav: t.data.data[0].id
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    goRouteDeails: function(t) {
        var a = t.currentTarget.dataset.strategy_id;
        wx.navigateTo({
            url: "../routeDeails/routeDeails?strategy_id=" + a
        });
    }
});
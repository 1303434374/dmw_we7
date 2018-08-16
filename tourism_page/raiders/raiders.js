var app = getApp();

Page({
    data: {
        list_sum: 4
    },
    onLoad: function(t) {},
    onReady: function() {
        this.getTitle();
    },
    onShow: function() {
        this.getStrategyList(), this.setData({
            list_sum: 4
        });
    },
    look_more: function() {
        var t = this.data.list_sum, a = this.data.new_StrategyList, e = this.data.StrategyList;
        if (t < e.length) {
            var i = e.slice(t, t + 4);
            a = a.concat(i), this.setData({
                new_StrategyList: a,
                list_sum: t + 4
            });
        }
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
    getStrategyList: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/StrategyList",
            success: function(t) {
                console.log(t);
                var a = t.data.data.strategy_list.slice(0, 4);
                e.setData({
                    StrategyList: t.data.data.strategy_list,
                    new_StrategyList: a,
                    address_strategy: t.data.data.address_strategy
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    goSearch: function(t) {
        wx.navigateTo({
            url: "search/search"
        });
    },
    goRaidersDeails: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "raidersDeails/routeDeails/routeDeails?strategy_id=" + a
        });
    }
});
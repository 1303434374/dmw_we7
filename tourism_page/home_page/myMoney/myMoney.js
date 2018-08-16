var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        app.util.request({
            url: "entry/wxapp/Title",
            success: function(a) {
                wx.setNavigationBarTitle({
                    title: a.data.data
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    goRecharge: function() {
        wx.navigateTo({
            url: "recharge/recharge"
        });
    },
    goWithdraw: function() {
        wx.navigateTo({
            url: "withdraw/withdraw"
        });
    },
    goBill: function() {
        wx.navigateTo({
            url: "bill/bill"
        });
    }
});
var app = getApp();

Page({
    data: {
        searchRecord: !1,
        searchIO: !1
    },
    onLoad: function(e) {
        var a = e.keyword;
        console.log(e), this.getFindAddress(a);
    },
    onReady: function() {
        this.getTitle();
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
    getFindAddress: function(e) {
        var a = this;
        console.log(e), app.util.request({
            url: "entry/wxapp/FindAddress",
            data: {
                keyword: e
            },
            success: function(e) {
                console.log(e), a.setData({
                    Address: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    goRaidersDeails: function(e) {
        var a = e.currentTarget.dataset.address_id;
        wx.navigateTo({
            url: "../raidersDeails/raidersDeails?address_id=" + a
        });
    }
});
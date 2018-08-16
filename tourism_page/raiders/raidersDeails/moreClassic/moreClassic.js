var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a = t.address_id;
        this.getInformationList(a);
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
    getInformationList: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/InformationList",
            data: {
                id: t
            },
            success: function(t) {
                a.setData({
                    InformationList: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    goClassicDeails: function(t) {
        var a = t.currentTarget.dataset.informationid;
        console.log(a), wx.navigateTo({
            url: "../classicDeails/classicDeails?id=" + a
        });
    }
});
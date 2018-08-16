var app = getApp();

Page({
    data: {
        sel_index: null
    },
    addplace: function() {
        this.setData({
            choose_place: !0
        });
    },
    choose_place: function(t) {
        var e = t.currentTarget.dataset.value;
        wx.navigateTo({
            url: "../guide_list/guide_list?jd_id=" + e
        });
    },
    choose_index: function(t) {
        this.setData({
            sel_index: t.currentTarget.dataset.index
        }), console.log(t.currentTarget.dataset.index);
        var e = t.currentTarget.dataset.id;
        this.getAddressIn(e);
    },
    choose_all: function(t) {
        null == t.currentTarget.dataset.id && this.getAddressIn(), this.setData({
            sel_index: null
        });
    },
    onLoad: function(t) {},
    onReady: function() {
        this.getAddress(), this.getAddressIn();
    },
    getAddress: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Address",
            cachetime: "30",
            success: function(t) {
                e.setData({
                    Address: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getAddressIn: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/AddressIn",
            cachetime: "30",
            data: {
                id: t
            },
            success: function(t) {
                e.setData({
                    AddressIn: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
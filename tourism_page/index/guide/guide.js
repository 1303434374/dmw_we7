var app = getApp(), page = 1;

Page({
    data: {
        swiper: {
            indicatorDots: !0,
            autoplay: !0,
            interval: 3e3,
            duration: 500
        },
        guide: [],
        ismore: !0
    },
    call: function(a) {
        wx.makePhoneCall({
            phoneNumber: a.currentTarget.dataset.tel
        });
    },
    hot_place: function(a) {
        var e = a.currentTarget.dataset.value;
        wx.navigateTo({
            url: "../../guide_list/guide_list?id=" + e
        });
    },
    link_detail: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../detail/guide_detail/guide_detail?id=" + e
        });
    },
    onLoad: function(a) {
        page = 1, this.getItems(page);
    },
    onReady: function() {
        this.getbanner(), this.getRemenUrl();
    },
    getItems: function(a) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Guidetj",
            data: {
                page: a
            },
            cachetime: "0",
            success: function(a) {
                console.log(a.data.data), a.data.data.length < 5 && o.setData({
                    ismore: !1
                });
                var e = o.data.guide;
                console.log(e);
                var t = a.data.data;
                console.log(t);
                for (var n = 0; n < t.length; n++) e.push(t[n]);
                o.setData({
                    guide: e
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    getbanner: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/FindBanner",
            success: function(a) {
                console.log(a), e.setData({
                    banner: a.data.data
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    bannerInto: function(a) {
        var e = a.currentTarget.dataset.id;
        console.log(e), wx.navigateTo({
            url: "../../detail/hotplace_detail/hotplace_detail?id=" + e
        });
    },
    getRemenUrl: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/RemenUrl",
            cachetime: "30",
            success: function(a) {
                e.setData({
                    RemenUrl: a.data.data
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var a = this;
        console.log(a.data.ismore), a.data.ismore && (console.log("++"), page++, a.getItems(page));
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    onShareAppMessage: function() {}
});
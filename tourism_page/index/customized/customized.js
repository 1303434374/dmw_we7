var app = getApp();

Page({
    data: {
        currentItem: 0,
        currentNav: 0
    },
    onLoad: function(t) {
        var a = t.id;
        this.getTwoClass(a);
    },
    onReady: function() {
        this.getbanner(), this.getHotRecommended();
    },
    currentItem: function(t) {
        this.setData({
            currentItem: t.detail.current
        });
    },
    getHotRecommended: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/HotRecommended",
            success: function(t) {
                console.log(t), a.setData({
                    HotRecommended: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getTwoClass: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/TwoClass",
            data: {
                id: t
            },
            success: function(t) {
                a.init_subsort(t.data.data.TwoClass[0].id), console.log(t), a.setData({
                    TwoClass: t.data.data.TwoClass,
                    LikeAttractions: t.data.data.attractions
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    bannerInto: function(t) {
        var a = t.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "../../detail/hotplace_detail/hotplace_detail?id=" + a
        });
    },
    getbanner: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/FindBanner",
            cachetime: "30",
            success: function(t) {
                a.setData({
                    banner: t.data.data,
                    swiperIdx: t.data.data.length
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    changeNav: function(t) {
        var a = this, e = t.currentTarget.dataset.id, n = t.currentTarget.dataset.idx;
        app.util.request({
            url: "entry/wxapp/TwoClassInfo",
            data: {
                id: e
            },
            success: function(t) {
                console.log(t), a.setData({
                    currentNav: n,
                    TwoClassInfo: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    init_subsort: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/TwoClassInfo",
            data: {
                id: t
            },
            success: function(t) {
                console.log(t), a.setData({
                    TwoClassInfo: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    goOrdinaryDeails: function(t) {
        var a = t.currentTarget.dataset.address_id;
        wx.navigateTo({
            url: "../../raiders/raidersDeails/raidersDeails?address_id=" + a
        });
    },
    goOrdinaryDeails1: function(t) {
        wx.navigateTo({
            url: "../../detail/hotplace_detail/hotplace_detail?id=" + t.currentTarget.dataset.id
        });
    },
    goCustom: function() {
        wx.navigateTo({
            url: "../../custom/custom"
        });
    }
});
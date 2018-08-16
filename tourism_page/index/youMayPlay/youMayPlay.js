var app = getApp();

Page({
    data: {
        currentItem: 0,
        currentNav: 0,
        subPage: 0,
        subPage1: 0
    },
    onLoad: function(a) {
        var t = a.id;
        this.getTwoClass(t);
    },
    onReady: function() {
        this.getbanner();
    },
    currentItem: function(a) {
        this.setData({
            currentItem: a.detail.current
        });
    },
    getbanner: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/FindBanner",
            success: function(a) {
                console.log(a), t.setData({
                    banner: a.data.data,
                    swiperIdx: a.data.data.length
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    bannerInto: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../detail/hotplace_detail/hotplace_detail?id=" + t
        });
    },
    getTwoClass: function(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/TwoClass",
            data: {
                id: a
            },
            success: function(a) {
                e.init_subsort(a.data.data.TwoClass[0].id);
                var t = a.data.data.attractions.slice(0, 4);
                console.log(a), e.setData({
                    TwoClass: a.data.data.TwoClass,
                    LikeAttractions: a.data.data.attractions,
                    new_LikeAttractions: t
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    moreData: function() {
        var a = this.data.subPage1, t = this.data.LikeAttractions, e = this.data.new_LikeAttractions;
        a += 4;
        var n = t.slice(0, a);
        e = e.concat(n), this.setData({
            new_LikeAttractions: e,
            subPage1: a
        });
    },
    changeNav: function(a) {
        var e = this, t = a.currentTarget.dataset.id, n = a.currentTarget.dataset.idx;
        app.util.request({
            url: "entry/wxapp/TwoClassInfo",
            data: {
                id: t
            },
            success: function(a) {
                console.log(a);
                var t = a.data.data;
                e.setData({
                    currentNav: n,
                    TwoClassInfo: t
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    init_subsort: function(a) {
        var e = this;
        this.data.subPage;
        app.util.request({
            url: "entry/wxapp/TwoClassInfo",
            data: {
                id: a
            },
            success: function(a) {
                console.log(a);
                var t = a.data.data.slice(0, 4);
                e.setData({
                    TwoClassInfo: a.data.data,
                    new_twoClassInfo: t
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    goOrdinaryDeails: function(a) {
        wx.navigateTo({
            url: "../../detail/hotplace_detail/hotplace_detail?id=" + a.currentTarget.dataset.id
        });
    },
    add_more: function() {
        var a = this.data.TwoClassInfo, t = this.data.new_twoClassInfo, e = this.data.subPage;
        if (e < a.length) {
            e += 4;
            var n = a.slice(e, e + 4);
            t = t.concat(n), this.setData({
                new_twoClassInfo: t,
                subPage: e
            });
        }
    }
});
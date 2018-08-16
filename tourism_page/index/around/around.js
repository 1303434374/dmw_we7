var _Page;

function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var app = getApp();

Page((_defineProperty(_Page = {
    data: {
        currentItem: 0,
        currentNav: 0,
        subPage: 0,
        subPage1: 0
    },
    onLoad: function(a) {
        var n = this;
        wx.getLocation({
            type: "wgs84",
            success: function(a) {
                var t = a.latitude, e = a.longitude;
                app.util.request({
                    url: "entry/wxapp/MyAddress",
                    data: {
                        latitude: t,
                        longitude: e,
                        all: 1
                    },
                    success: function(a) {
                        console.log(a);
                        var t = a.data.data.address.slice(0, 4);
                        n.setData({
                            around_address: t,
                            around_addressList: a.data.data.address,
                            around_attractions: a.data.data.attractions,
                            currentNav: a.data.data.attractions[0].id
                        });
                        var e = a.data.data.attractions[0].id;
                        n.OneClass(e);
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    },
    OneClass: function(n) {
        var s = this;
        wx.getLocation({
            type: "wgs84",
            success: function(a) {
                var t = a.latitude, e = a.longitude;
                app.util.request({
                    url: "entry/wxapp/OneClass",
                    data: {
                        id: n,
                        latitude: t,
                        longitude: e
                    },
                    success: function(a) {
                        console.log(a);
                        var t = a.data.data, e = t.slice(0, 4);
                        s.setData({
                            attractions: t,
                            new_attractions: e
                        });
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    },
    onReady: function() {
        this.getbanner();
    },
    currentItem: function(a) {
        this.setData({
            currentItem: a.detail.current
        });
    },
    bannerInto: function(a) {
        var t = a.currentTarget.dataset.id;
        console.log(t), wx.navigateTo({
            url: "../../detail/hotplace_detail/hotplace_detail?id=" + t
        });
    },
    getbanner: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/FindBanner",
            cachetime: "30",
            success: function(a) {
                t.setData({
                    banner: a.data.data,
                    swiperIdx: a.data.data.length
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    changeNav: function(a) {
        var t = a.currentTarget.dataset.id;
        this.OneClass(t), this.setData({
            currentNav: a.target.dataset.id
        });
    },
    goOrdinaryDeails: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../raiders/raidersDeails/raidersDeails?address_id=" + t
        });
    },
    goAttractions: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../detail/hotplace_detail/hotplace_detail?id=" + t
        });
    },
    moreData: function() {
        var a = this.data.moreSum, t = this.data.around_addressList, e = this.data.around_address;
        a += 4, e = t.slice(0, a), this.setData({
            around_address: e,
            moreSum: a
        });
    }
}, "moreData", function() {
    var a = this.data.subPage1, t = this.data.around_addressList, e = this.data.around_address;
    a += 4;
    var n = t.slice(0, a);
    e = e.concat(n), this.setData({
        around_address: e,
        subPage1: a
    });
}), _defineProperty(_Page, "add_more", function() {
    var a = this.data.attractions, t = this.data.new_attractions, e = this.data.subPage;
    if (e < a.length) {
        e += 4;
        var n = a.slice(e, e + 4);
        t = t.concat(n), this.setData({
            new_attractions: t,
            subPage: e
        });
    }
}), _Page));
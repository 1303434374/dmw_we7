var app = getApp(), page = 1;

Page({
    data: {
        swiper: {
            indicatorDots: !0,
            autoplay: !0,
            interval: 3e3,
            duration: 500
        },
        IndexList: [],
        ismore: !0,
        currentTab: null
    },
    onReady: function() {
        this.getTitle(), this.getbanner(), this.getlanmu(), page = 1, this.getItems(page);
    },
    getItems: function(t) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/IndexLists",
            data: {
                page: t
            },
            cachetime: "0",
            success: function(t) {
                console.log(t), t.data.data.length < 5 && o.setData({
                    ismore: !1
                });
                var a = o.data.IndexList;
                console.log(a);
                var e = t.data.data;
                console.log(e);
                for (var n = 0; n < e.length; n++) a.push(e[n]);
                o.setData({
                    IndexList: a
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getTitle: function() {
        app.util.request({
            url: "entry/wxapp/Title",
            cachetime: "30",
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
    IndexList: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/IndexLists",
            cachetime: "30",
            success: function(t) {
                console.log(t), a.setData({
                    IndexList: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), a.setData({
            currentTab: null
        });
    },
    getlanmu: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Lanmu",
            cachetime: "30",
            success: function(t) {
                a.setData({
                    nav_list: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getbanner: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/set",
            cachetime: "30",
            success: function(t) {
                a.setData({
                    banner: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    swichNav: function(t) {
        var a = t.currentTarget.dataset.current, e = t.currentTarget.dataset.index;
        console.log(a);
        var n = this;
        app.util.request({
            url: "entry/wxapp/IndexLists1",
            cachetime: "30",
            data: {
                id: a
            },
            success: function(t) {
                console.log(t), n.setData({
                    IndexList: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), n.setData({
            currentTab: e
        });
    },
    onLoad: function() {},
    onReachBottom: function() {
        var t = this;
        console.log(t.data.ismore), t.data.ismore && (console.log("++"), page++, t.getItems(page));
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: "自定义转发标题",
            path: "/page/user?id=123",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});
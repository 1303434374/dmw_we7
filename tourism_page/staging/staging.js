var app = getApp(), page = 1;

Page({
    data: {
        swiper: {
            indicatorDots: !0,
            autoplay: !0,
            interval: 3e3,
            duration: 500
        },
        ismore: !0,
        attractions: []
    },
    onReady: function() {
        this.getbanner(), this.getTitle(), page = 1, this.getItems(page);
    },
    onLoad: function() {},
    getItems: function(t) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Installment",
            data: {
                page: t
            },
            cachetime: "0",
            success: function(t) {
                console.log(t.data.data), t.data.data.length < 5 && o.setData({
                    ismore: !1
                });
                for (var a = o.data.attractions, e = t.data.data, n = 0; n < e.length; n++) a.push(e[n]);
                o.setData({
                    attractions: a
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
    getInstallment: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Installment",
            cachetime: "30",
            success: function(t) {
                console.log(t), a.setData({
                    attractions: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
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
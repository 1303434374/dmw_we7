var app = getApp(), page = 1;

Page({
    data: {
        GuideList: [],
        ismore: !0,
        idd: "",
        jd_id: ""
    },
    call: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    link_detail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../detail/guide_detail/guide_detail?id=" + a
        });
    },
    onLoad: function(t) {
        this.getTitle();
        var a = t.id, e = t.jd_id;
        page = 1, null != a ? this.getGuideList(a, page) : this.getGuideList1(e, page), 
        this.setData({
            idd: a,
            jd_id: e
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
    getGuideList: function(t, a) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/GuideList",
            cachetime: "30",
            data: {
                page: a,
                id: t
            },
            success: function(t) {
                console.log(t.data.data), t.data.data.length < 10 && o.setData({
                    ismore: !1
                });
                var a = o.data.GuideList;
                console.log(a);
                var e = t.data.data;
                console.log(e);
                for (var i = 0; i < e.length; i++) a.push(e[i]);
                o.setData({
                    GuideList: a
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getGuideList1: function(t, a) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/GuideList",
            cachetime: "30",
            data: {
                page: a,
                jd_id: t
            },
            success: function(t) {
                console.log(t.data.data), t.data.data.length < 8 && o.setData({
                    ismore: !1
                });
                var a = o.data.GuideList;
                console.log(a);
                var e = t.data.data;
                console.log(e);
                for (var i = 0; i < e.length; i++) a.push(e[i]);
                o.setData({
                    GuideList: a
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onReachBottom: function() {
        var t = this;
        console.log(t.data.ismore);
        var a = t.data.idd, e = t.data.jd_id;
        null != a ? t.data.ismore && (console.log("++"), page++, t.getGuideList(a, page)) : t.data.ismore && (console.log("++"), 
        page++, t.getGuideList1(e, page));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    onShareAppMessage: function() {}
});
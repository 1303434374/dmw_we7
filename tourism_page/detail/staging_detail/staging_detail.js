var WxParse = require("../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {
        xingcheng: [],
        xingchengIndex: 0,
        xingchengId: 0,
        scenicspot_id: "",
        LookNum: 0,
        swiper: {
            indicatorDots: !0,
            autoplay: !0,
            interval: 3e3,
            duration: 500,
            imgUrls: [ "../../resource/images/swiper_item.png", "../../resource/images/swiper_item.png" ]
        },
        mess: {},
        fenlei: {
            title: [ "特色", "行程", "费用须知" ],
            trip: {
                selIndex: 0
            },
            cost_info: [ {
                name: "费用说明",
                status: !1,
                icon: "../../resource/images/fy.png"
            }, {
                name: "预定须知",
                status: !1,
                icon: "../../resource/images/yd.png"
            }, {
                name: "退改说明",
                status: !1,
                icon: "../../resource/images/tg.png"
            } ]
        },
        currentTab: 0
    },
    call: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    click: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.index
        });
    },
    choose_plan: function(t) {
        var e = this.data.fenlei, a = t.currentTarget.dataset.index;
        e.trip.selIndex = a, this.setData({
            fenlei: e
        });
    },
    open_switch: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.fenlei, n = a.cost_info;
        n[e].status = !n[e].status, this.setData({
            fenlei: a
        });
    },
    yuding: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../yuyue/yuyue?come=分期&&id=" + e
        });
    },
    onReady: function() {
        this.getSetKftel();
    },
    onLoad: function(t) {
        var e = t.id, a = this;
        this.getScenicspot(e), this.getStroke(e), this.gettraffic(e), this.getTitle(), this.getCostinformation(e), 
        this.setData({
            scenicspot_id: e
        }), console.log(e), app.util.request({
            url: "entry/wxapp/StrokeIn",
            cachetime: "30",
            data: {
                scenicspot: e
            },
            success: function(t) {
                console.log(t), a.setData({
                    mrxc: t.data.data
                }), c;
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
    getScenicspot: function(i) {
        var s = this;
        app.util.request({
            url: "entry/wxapp/scenicspot",
            cachetime: "30",
            data: {
                id: i
            },
            success: function(t) {
                var e = t.data.data;
                s.setData({
                    scenicspot: e
                }), WxParse.wxParse("jd_features", "html", e[0].jd_features, s, 5);
                for (var a = 0; a < e.length; a++) {
                    var n = e[a];
                    n.id == i && s.setData({
                        array: n.xx_image,
                        company: n.company,
                        banks: n.banks
                    });
                }
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    xingcheng: function(t) {
        var e = this, a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/StrokeIn",
            cachetime: "30",
            data: {
                id: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    mrxc: t.data.data
                }), WxParse.wxParse("probable", "html", t.data.data.probable, e, 5);
            },
            fail: function(t) {
                console.log(t);
            }
        }), console.log(a), e.setData({
            xingchengIndex: t.currentTarget.dataset.index
        });
    },
    getSetKftel: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Kftel",
            cachetime: "30",
            success: function(t) {
                console.log(t), e.setData({
                    Kftel: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getCompanymap: function(t) {
        var e = parseFloat(t.currentTarget.dataset.latitude), a = parseFloat(t.currentTarget.dataset.longitude), n = t.currentTarget.dataset.name, i = t.currentTarget.dataset.address;
        wx.openLocation({
            latitude: e,
            longitude: a,
            name: n,
            address: i
        });
    },
    getBanksmap: function(t) {
        var e = parseFloat(t.currentTarget.dataset.latitude), a = parseFloat(t.currentTarget.dataset.longitude), n = t.currentTarget.dataset.name, i = t.currentTarget.dataset.address;
        wx.openLocation({
            latitude: e,
            longitude: a,
            name: n,
            address: i
        });
    },
    getStroke: function(t) {
        var s = this, o = s.data.xingcheng;
        app.util.request({
            url: "entry/wxapp/Stroke",
            cachetime: "30",
            data: {
                id: t
            },
            success: function(t) {
                console.log(t);
                for (var e = t.data.data, a = 0; a < e.length; a++) {
                    var n = e[a], i = {};
                    i.days = n.stroke_time, i.id = n.id, o.push(i);
                }
                s.setData({
                    Stroke: t.data.data,
                    xingcheng: o
                }), console.log(o);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    gettraffic: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/traffic",
            cachetime: "30",
            data: {
                id: t
            },
            success: function(t) {
                e.setData({
                    traffic: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getCostinformation: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/Costinformation",
            cachetime: "30",
            data: {
                id: t
            },
            success: function(t) {
                e.setData({
                    information: t.data.data
                }), WxParse.wxParse("text", "html", t.data.data.text, e, 5);
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
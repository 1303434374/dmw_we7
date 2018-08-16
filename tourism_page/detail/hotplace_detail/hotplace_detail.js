var WxParse = require("../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {
        xingcheng: [],
        xingchengIndex: 0,
        xingchengId: 0,
        scenicspot_id: "",
        likeIO: !1,
        likeSum: 0,
        likeBtnIO: !1,
        likeBtnSum: 0,
        look_num: 0,
        swiper: {
            indicatorDots: !0,
            autoplay: !0,
            interval: 3e3,
            duration: 500
        },
        array: [],
        fenlei: {
            title: [ "特色", "行程", "费用须知", "评论" ],
            trip: {
                selIndex: 0
            },
            cost_info: [ {
                name: "费用说明",
                detail: [],
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
        var a = this.data.fenlei, e = t.currentTarget.dataset.index;
        a.trip.selIndex = e, this.setData({
            fenlei: a
        });
    },
    open_switch: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.fenlei, i = e.cost_info;
        i[a].status = !i[a].status, this.setData({
            fenlei: e
        });
    },
    yuding: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.day, i = t.currentTarget.dataset.month;
        a && e && i ? (wx.setStorageSync("sele_day", e), wx.setStorageSync("sele_month", i), 
        wx.navigateTo({
            url: "../yuyue/yuyue?id=" + a
        })) : a && (console.log("id"), wx.navigateTo({
            url: "../yuyue/yuyue?come=热门&&id=" + a
        }));
    },
    onLoad: function(t) {
        this.getTitle();
        var a = t.id, e = this;
        this.getScenicspot(a), this.getStroke(a), this.gettraffic(a), this.getCostinformation(a), 
        this.getCalendar(a), this.getScenicspotMessage(a), this.ScenicspotUser(a), this.setData({
            scenicspot_id: a
        }), app.util.request({
            url: "entry/wxapp/StrokeIn",
            cachetime: "30",
            data: {
                scenicspot: a
            },
            success: function(t) {
                e.setData({
                    mrxc: t.data.data
                }), WxParse.wxParse("probable", "html", t.data.data.probable, e, 5);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    ScenicspotUser: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/ScenicspotUser",
            data: {
                id: t
            },
            success: function(t) {
                a.setData({
                    ScenicspotUser: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getScenicspotMessage: function(t) {
        var a = this, e = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/ScenicspotMessage",
            data: {
                id: t,
                openid: e
            },
            success: function(t) {
                console.log(t), a.setData({
                    message: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    xingcheng: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/StrokeIn",
            data: {
                id: e
            },
            success: function(t) {
                a.setData({
                    mrxc: t.data.data
                }), WxParse.wxParse("probable", "html", t.data.data.probable, a, 5);
            },
            fail: function(t) {
                console.log(t);
            }
        }), a.setData({
            xingchengIndex: t.currentTarget.dataset.index
        });
    },
    onReady: function() {
        this.getSetKftel();
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
    getSetKftel: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Kftel",
            cachetime: "30",
            success: function(t) {
                a.setData({
                    Kftel: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    previewImg: function(t) {
        var a = t.currentTarget.dataset.mainid, e = t.currentTarget.dataset.id, i = this.data.message[a].image;
        wx.previewImage({
            current: i[e],
            urls: i
        });
    },
    getScenicspot: function(n) {
        var r = this, t = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/Scenicspot",
            data: {
                id: n,
                openid: t
            },
            success: function(t) {
                var a = t.data.data;
                console.log(a);
                var e = !1;
                1 == a[0].praise && (e = !0), r.setData({
                    scenicspot: a,
                    likeSum: a[0].like_num
                }), WxParse.wxParse("jd_features", "html", a[0].jd_features, r, 5), r.setData({
                    scenicspot_id: a[0],
                    likeIO: e
                });
                for (var i = 0; i < a.length; i++) {
                    var s = a[i];
                    s.id == n && r.setData({
                        array: s.xx_image
                    });
                }
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getCalendar: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/PlaceOrder",
            data: {
                id: t
            },
            success: function(t) {
                for (var a = 0; a < t.data.data[0].length; a++) t.data.data[0][a].day = t.data.data[0][a].dateday.split("-")[1], 
                t.data.data[0][a].month = t.data.data[0][a].dateday.split("-")[0];
                e.setData({
                    prices: t.data.data[0]
                });
            },
            fail: function(t) {}
        });
    },
    getStroke: function(t) {
        var n = this, r = n.data.xingcheng;
        app.util.request({
            url: "entry/wxapp/Stroke",
            data: {
                id: t
            },
            success: function(t) {
                console.log(t);
                for (var a = t.data.data, e = 0; e < a.length; e++) {
                    var i = a[e], s = {};
                    s.days = i.stroke_time, s.id = i.id, r.push(s);
                }
                n.setData({
                    Stroke: t.data.data,
                    xingcheng: r
                });
            },
            fail: function(t) {}
        });
    },
    gettraffic: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/traffic",
            cachetime: "30",
            data: {
                id: t
            },
            success: function(t) {
                a.setData({
                    traffic: t.data.data
                });
            },
            fail: function(t) {}
        });
    },
    getCostinformation: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Costinformation",
            cachetime: "30",
            data: {
                id: t
            },
            success: function(t) {
                a.setData({
                    information: t.data.data
                }), WxParse.wxParse("text", "html", t.data.data.text, a, 5);
            },
            fail: function(t) {}
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    onShareAppMessage: function() {
        var t = this.data.scenicspot;
        t[0].title;
        return console.log(t), {
            title: titel,
            path: "/tourism_page/detail/hotplace_detail/hotplace_detail?id=" + t[0].id,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    touchLike: function(t) {
        var a = this, e = t.currentTarget.dataset.id, i = wx.getStorageSync("openid");
        console.log(a.data.likeIO), 0 == a.data.likeIO ? app.util.request({
            url: "entry/wxapp/ScenicspotPraise",
            data: {
                id: e,
                openid: i,
                status: 1
            },
            success: function(t) {
                1 == t.data.data && (a.data.likeSum++, a.setData({
                    likeIO: !0,
                    likeSum: a.data.likeSum
                }));
            }
        }) : app.util.request({
            url: "entry/wxapp/ScenicspotPraise",
            data: {
                id: e,
                openid: i,
                status: -1
            },
            success: function(t) {
                1 == t.data.data && (a.data.likeSum--, a.setData({
                    likeIO: !1,
                    likeSum: a.data.likeSum
                }));
            }
        });
    },
    scrollPage: function() {
        wx.pageScrollTo({
            scrollTop: 400
        }), this.setData({
            currentTab: 3
        });
    },
    likeBtnIO: function(t) {
        var a = this, e = t.currentTarget.dataset.id, i = t.currentTarget.dataset.idx, s = this.data.message, n = wx.getStorageSync("openid"), r = s[i], o = r.praise;
        "-1" == r.praise_status ? app.util.request({
            url: "entry/wxapp/OrderPraiseIn",
            data: {
                id: e,
                openid: n,
                status: 1
            },
            success: function(t) {
                console.log(t), 1 == t.data.data.status && (o++, r.praise_status = "1", r.praise = o, 
                a.setData({
                    message: s
                }));
            }
        }) : app.util.request({
            url: "entry/wxapp/OrderPraiseIn",
            data: {
                id: e,
                openid: n,
                status: -1
            },
            success: function(t) {
                1 == t.data.data.status && (o--, r.praise_status = "-1", r.praise = o, a.setData({
                    message: s
                }));
            }
        });
    },
    goCommentDeails: function(t) {
        var a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/OrderMessageLook",
            data: {
                id: a
            },
            success: function(t) {
                1 == t.data.data && wx.navigateTo({
                    url: "../../home_page/commentDeails/commentDeails?id=" + a
                });
            }
        });
    }
});
var _Page;

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var WxParse = require("../../../wxParse/wxParse.js"), app = getApp();

Page((_defineProperty(_Page = {
    data: {
        currentPaySum: 1,
        showBuyInterFace: !1,
        likeIO: !1,
        likeSum: 0,
        currentGoodsTit: 0,
        likeBtnIO: !1,
        likeBtnSum: 111,
        xingcheng: [],
        xingchengIndex: 0,
        xingchengId: 0,
        sponsor_id: 0,
        MyJoinStatus: -1,
        fenlei: {
            title: [ "特色", "行程", "费用须知", "评论" ],
            trip: {
                selIndex: 0
            },
            cost_info: [ {
                name: "费用说明",
                detail: [],
                status: !1,
                icon: "../../../resource/images/fy.png"
            }, {
                name: "预定须知",
                status: !1,
                icon: "../../../resource/images/yd.png"
            }, {
                name: "退改说明",
                status: !1,
                icon: "../../../resource/images/tg.png"
            } ]
        },
        jiazai: !0,
        progress_txt: "正在加载中...",
        count: 0,
        countTime: null,
        getUseInfo: !1
    },
    onLoad: function(t) {
        var e = this, a = (t.id, t.group);
        if ("yes" == a) {
            t.sponsor_id;
            e.setData({
                share_group: a,
                sponsor_id: t.sponsor_id
            });
        }
        this.getScenicspotMessage();
        var n = wx.getStorageSync("openid");
        if (console.log(n), "" == n || null == n) return e.setData({
            getUseInfo: !0
        }), !1;
        wx.getStorage({
            key: "useInfo",
            success: function(t) {
                "true" == t.data && e.setData({
                    getUseInfo: !1
                });
            }
        });
    },
    getUsetInfo: function(t) {
        "getUserInfo:ok" == t.detail.errMsg ? (this.close_modal(), wx.setStorage({
            key: "useInfo",
            data: "true"
        }), wx.setStorage({
            key: "useInfo_d",
            data: t.detail.userInfo
        }), this.getGetUid(t.detail.userInfo)) : this.setData({
            getUseInfo: !0
        });
    },
    close_modal: function() {
        this.setData({
            getUseInfo: !1
        });
    },
    getGetUid: function() {
        var i = this;
        wx.login({
            success: function(t) {
                t.code ? app.util.request({
                    url: "entry/wxapp/GetUid",
                    data: {
                        code: t.code
                    },
                    success: function(t) {
                        if (!t.data.errno) {
                            wx.setStorageSync("openid", t.data.data);
                            var a = wx.getStorageSync("openid");
                            wx.getUserInfo({
                                success: function(t) {
                                    var e = t.userInfo;
                                    app.util.request({
                                        url: "entry/wxapp/Member",
                                        data: {
                                            nickName: e.nickName,
                                            avatarUrl: e.avatarUrl,
                                            openid: a
                                        },
                                        success: function(t) {
                                            if (1 == t.data.data) {
                                                console.log(i.options);
                                                var e = i.data.sponsor_id, a = i.data.share_group, n = i.options.id;
                                                wx.redirectTo({
                                                    url: "../teamworkDeails/teamworkDeails?sponsor_id=" + e + "&group=" + a + "&id=" + n
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                }) : console.log("获取用户登录态失败！" + t.errMsg);
            }
        });
    },
    getGroupJoin: function() {
        var a = this.options.sponsor_id, n = this, i = n.options.id, t = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/GroupJoin",
            data: {
                sponsor_id: a,
                openid: t
            },
            success: function(t) {
                var e = t.data.data.status;
                if (1 == e) {
                    t.data.data.total;
                    wx.navigateTo({
                        url: "../../payDeails1/payDeails1?sponsor_id=" + a + "&type=2&join=1&id=" + i
                    });
                } else if (-2 == e) wx.showModal({
                    title: "拼团失败",
                    content: "您已有团队，不可重复参与",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.switchTab({
                            url: "../../../index/index"
                        });
                    }
                }); else {
                    if (-1 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "该团人员已满",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-3 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "该活动已结束",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-4 == e) return n.setData({
                        share_model: !1,
                        activity_over: !0
                    }), void wx.showModal({
                        title: "拼团失败",
                        content: "本次拼团已过期",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-5 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "活动未开始",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-6 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "请先获取用户信息",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-8 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "该团已完成拼团",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-9 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "该团已失效",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                }
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onShow: function() {
        var t = this.options.id;
        this.getGroupInfo(t), this.getGroupIng(t), this.getMyGroupInfo(t), this.setData({
            jiazai: !0,
            count: 0,
            progress_txt: "正在加载中..."
        }), this.drawProgressbg(), this.countInterval();
    },
    onHide: function() {
        var t = this.data.group, e = this.data.groupIng;
        if (t.c_timer ? clearInterval(t.c_timer) : t.e_timer && clearInterval(t.e_timer), 
        e) {
            for (var a = 0; a < e.length; a++) e[a].c_timer ? clearInterval(e[a].c_timer) : e[a].e_timer && clearInterval(e[a].e_timer);
            this.setData({
                groupIng: e
            });
        }
        this.setData({
            group: t,
            showBuyInterFace: !1
        });
    },
    countInterval: function() {
        var t = this;
        this.countTime = setInterval(function() {
            t.data.count <= 60 ? (t.drawCircle(t.data.count / 30), t.data.count += 6) : (t.setData({
                progress_txt: "加载成功",
                jiazai: !1
            }), clearInterval(t.countTime));
        }, 100);
    },
    drawProgressbg: function() {
        var t = wx.createCanvasContext("canvasProgressbg");
        t.setLineWidth(1), t.setStrokeStyle("#15e4d1"), t.setLineCap("round"), t.beginPath(), 
        t.arc(110, 110, 20, 0, 2 * Math.PI, !1), t.stroke(), t.draw();
    },
    drawCircle: function(t) {
        var e = wx.createCanvasContext("canvasProgress"), a = e.createLinearGradient(200, 100, 100, 200);
        a.addColorStop("0", "#15e4d1"), a.addColorStop("0.5", "#15e4d1"), a.addColorStop("1.0", "#15e4d1"), 
        e.setLineWidth(5), e.setStrokeStyle(a), e.setLineCap("round"), e.beginPath(), e.arc(110, 110, 20, -Math.PI / 2, t * Math.PI - Math.PI / 2, !1), 
        e.stroke(), e.draw();
    },
    f: function(t, e) {
        var a = new Date(t);
        return (new Date(e) - a) / 1e3;
    },
    djs: function(e) {
        var a = this, t = new Date(), n = t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
        e.create_time = e.create_time.replace(/\-/g, "/"), e.finish_time = e.finish_time.replace(/\-/g, "/");
        var i = a.f(n, e.create_time);
        if (console.log(i), 0 < i) e.c_timer = setInterval(function() {
            if ((e.c_t = i) <= 0) {
                clearInterval(e.c_timer), e.start_t = !0;
                var t = a.f(n, e.finish_time);
                e.e_timer = setInterval(function() {
                    (e.e_t = t) <= 0 ? (clearInterval(e.e_timer), e.end_t = !0, a.end_activity("ac_end")) : 0 < t && t < 60 ? (e.e_clock = app.dateformat_s(t--), 
                    e.now_t = "s") : t < 3600 ? (e.e_clock = app.dateformat_m(t--), e.now_t = "m") : t < 86400 ? (e.e_clock = app.dateformat_h(t--), 
                    e.now_t = "h") : 86400 <= t && (e.e_clock = app.dateformat_d(t--), e.now_t = "d"), 
                    a.setData({
                        group: e
                    });
                }, 1e3);
            }
            0 < i && i < 60 ? (e.c_clock = app.dateformat_s(i--), e.now_t = "s") : i < 3600 ? (e.c_clock = app.dateformat_m(i--), 
            e.now_t = "m") : i < 86400 ? (e.c_clock = app.dateformat_h(i--), e.now_t = "h") : 86400 <= i && (e.c_clock = app.dateformat_d(i--), 
            e.now_t = "d"), a.setData({
                group: e
            });
        }, 1e3); else if (i <= 0) {
            clearInterval(e.c_timer), e.start_t = !0;
            var o = a.f(n, e.finish_time);
            e.e_timer = setInterval(function() {
                (e.e_t = o) <= 0 ? (clearInterval(e.e_timer), e.end_t = !0, a.end_activity("ac_end")) : 0 < o && o < 60 ? (e.e_clock = app.dateformat_s(o--), 
                e.now_t = "s") : o < 3600 ? (e.e_clock = app.dateformat_m(o--), e.now_t = "m") : o < 86400 ? (e.e_clock = app.dateformat_h(o--), 
                e.now_t = "h") : 86400 <= o && (e.e_clock = app.dateformat_d(o--), e.now_t = "d"), 
                a.setData({
                    group: e
                });
            }, 1e3);
        }
    },
    djs1: function(t, e) {
        var a = this, n = new Date(), i = n.getFullYear() + "/" + (n.getMonth() + 1) + "/" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds(), o = a.f(i, t[e].out_time);
        t[e].e_timer = setInterval(function() {
            (t[e].e_t = o) <= 0 ? (clearInterval(t[e].e_timer), t[e].end_t = !0, a.end_activity("t_end", t[e].id)) : 0 < o && (t[e].e_clock = app.dateformat_all(o--)), 
            a.setData({
                GroupIng: t
            });
        }, 1e3);
    },
    end_activity: function(t, e) {
        if ("ac_end" == t) {
            console.log(1.1111111111111112e41);
            var a = 1;
            e = this.options.id;
        } else if ("t_end" == t) a = 2, e = e;
        app.util.request({
            url: "entry/wxapp/GroupTimeOut",
            data: {
                id: e,
                types: a
            }
        });
    },
    getGroupInfo: function(t) {
        var e = this, a = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/GroupInfo",
            data: {
                id: t,
                openid: a
            },
            success: function(t) {
                console.log(t);
                t.data.data.active_status;
                e.getStroke(t.data.data.jd_id), e.unloadxingcheng(t.data.data.jd_id), 1 == t.data.data.praise && e.setData({
                    likeIO: !0
                }), e.setData({
                    group: t.data.data,
                    likeSum: t.data.data.praise_num,
                    traffic: t.data.data.traffic,
                    information: t.data.data.information
                }), e.djs(t.data.data), WxParse.wxParse("particulars", "html", t.data.data.particulars, e, 5), 
                WxParse.wxParse("active", "html", t.data.data.text, e, 5), WxParse.wxParse("information_text", "html", t.data.data.information.text, e, 5);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    go_TeamworkStatus: function(t) {
        var a = this, n = t.currentTarget.dataset.sponsor_id, i = a.options.id, e = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/GroupJoin",
            data: {
                sponsor_id: n,
                openid: e
            },
            success: function(t) {
                var e = t.data.data.status;
                if (console.log(t), 1 == e) {
                    t.data.data.total;
                    wx.navigateTo({
                        url: "../../payDeails1/payDeails1?sponsor_id=" + n + "&type=2&join=1&id=" + i
                    });
                } else if (-2 == e) wx.showModal({
                    title: "拼团失败",
                    content: "您已有团队，不可重复参与",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.switchTab({
                            url: "../../../index/index"
                        });
                    }
                }); else {
                    if (-1 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "该团人员已满",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-3 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "该活动已结束",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-4 == e) return a.setData({
                        share_model: !1,
                        activity_over: !0
                    }), void wx.showModal({
                        title: "拼团失败",
                        content: "本次拼团已过期",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-5 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "活动未开始",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-6 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "请先获取用户信息",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-8 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "该团已完成拼团",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                    if (-9 == e) return void wx.showModal({
                        title: "拼团失败",
                        content: "该团已失效",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.switchTab({
                                url: "../../../index/index"
                            });
                        }
                    });
                }
            }
        });
    },
    getGroupIng: function(t) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/GroupIng",
            data: {
                id: t
            },
            success: function(t) {
                console.log(t);
                for (var e = t.data.data, a = 0; a < e.length; a++) e[a].out_time = e[a].out_time.replace(/\-/g, "/");
                if (e != [] && null != e && "" != e) var n = 0, i = setInterval(function() {
                    o.djs1(e, n), ++n > e.length - 1 && clearInterval(i);
                }, 10);
                o.setData({
                    GroupIng: t.data.data
                });
            }
        });
    },
    getMyGroupInfo: function(t) {
        var e = this, a = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyGroupInfo",
            data: {
                id: t,
                openid: a
            },
            success: function(t) {
                console.log(t), 1 == t.data.data.status && e.setData({
                    MyJoinStatus: 1,
                    sponsor_id: t.data.data.sponsor_id
                });
            }
        });
    },
    getScenicspotMessage: function() {
        var e = this, t = e.options.id, a = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/ScenicspotMessage",
            data: {
                id: t,
                openid: a,
                ftype: "group"
            },
            success: function(t) {
                console.log(t), e.setData({
                    message: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    goCommentDeails: function(t) {
        var e = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/OrderMessageLook",
            data: {
                id: e
            },
            success: function(t) {
                1 == t.data.data && wx.navigateTo({
                    url: "../../commentDeails/commentDeails?id=" + e
                });
            }
        });
    },
    touchLike: function(t) {
        var e = this, a = t.currentTarget.dataset.id, n = wx.getStorageSync("openid");
        console.log(a, n), 0 == e.data.likeIO ? app.util.request({
            url: "entry/wxapp/ScenicspotPraise",
            data: {
                id: a,
                openid: n,
                status: 1
            },
            success: function(t) {
                1 == t.data.data && (e.data.likeSum++, e.setData({
                    likeIO: !0,
                    likeSum: e.data.likeSum
                }));
            }
        }) : app.util.request({
            url: "entry/wxapp/ScenicspotPraise",
            data: {
                id: a,
                openid: n,
                status: -1
            },
            success: function(t) {
                1 == t.data.data && (e.data.likeSum--, e.setData({
                    likeIO: !1,
                    likeSum: e.data.likeSum
                }));
            }
        });
    },
    previewImg: function(t) {
        var e = t.currentTarget.dataset.mainid, a = t.currentTarget.dataset.id, n = this.data.message[e].image;
        wx.previewImage({
            current: n[a],
            urls: n
        });
    },
    onReady: function() {},
    lessSum: function() {
        if (1 == this.data.currentPaySum) return !1;
        this.setData({
            currentPaySum: this.data.currentPaySum - 1
        });
    },
    changePaySum: function(t) {
        this.setData({
            currentPaySum: t.detail.value
        });
    },
    addSum: function() {
        this.setData({
            currentPaySum: this.data.currentPaySum + 1
        });
    },
    Look_team: function() {
        var t = this.data.sponsor_id;
        wx.navigateTo({
            url: "../teamworkStatus/teamworkStatus?sponsor_id=" + t
        });
    },
    go_team: function(t) {
        var e = t.currentTarget.dataset.sum, a = this.options.id, n = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/GroupCreate",
            data: {
                id: a,
                openid: n
            },
            success: function(t) {
                if (1 != t.data.data.status) return -2 == t.data.data.status ? void wx.showModal({
                    title: "开团失败",
                    content: "您有组团活动正在进行中",
                    showCancel: !1
                }) : -3 == t.data.data.status ? void wx.showModal({
                    title: "开团失败",
                    content: "该活动已结束",
                    showCancel: !1
                }) : -4 == t.data.data.status ? void wx.showModal({
                    title: "开团失败",
                    content: "该活动已售馨",
                    showCancel: !1
                }) : -7 == t.data.data.status ? void wx.showModal({
                    title: "开团失败",
                    content: "您的参与次数已用完",
                    showCancel: !1
                }) : void wx.showModal({
                    title: "开团失败",
                    content: "开团失败，请联系客服",
                    showCancel: !1
                });
                e ? wx.navigateTo({
                    url: "../../payDeails1/payDeails1?id=" + a + "&sum=" + e + "&type=2"
                }) : wx.navigateTo({
                    url: "../../payDeails1/payDeails1?id=" + a + "&type=2&join=0"
                });
            }
        });
    },
    BuyInterFace: function() {
        var t = this.data.showBuyInterFace;
        0 == t ? this.setData({
            showBuyInterFace: !0
        }) : 1 == t && this.setData({
            showBuyInterFace: !1
        });
    },
    go_activity: function() {
        wx.reLaunch({
            url: "../../../index/index"
        });
    },
    choose_plan: function(t) {
        var e = this.data.fenlei, a = t.currentTarget.dataset.index;
        e.trip.selIndex = a, this.setData({
            fenlei: e
        });
    },
    xingcheng: function(t) {
        var e = this, a = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/StrokeIn",
            data: {
                id: a
            },
            success: function(t) {
                e.setData({
                    mrxc: t.data.data
                }), WxParse.wxParse("probable", "html", t.data.data.probable, e, 5);
            },
            fail: function(t) {
                console.log(t);
            }
        }), e.setData({
            xingchengIndex: t.currentTarget.dataset.index
        });
    },
    getStroke: function(t) {
        var o = this, s = o.data.xingcheng;
        app.util.request({
            url: "entry/wxapp/Stroke",
            data: {
                id: t
            },
            success: function(t) {
                console.log(t);
                for (var e = t.data.data, a = 0; a < e.length; a++) {
                    var n = e[a], i = {};
                    i.days = n.stroke_time, i.id = n.id, s.push(i);
                }
                o.setData({
                    Stroke: t.data.data,
                    xingcheng: s
                });
            },
            fail: function(t) {}
        });
    },
    unloadxingcheng: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/StrokeIn",
            data: {
                scenicspot: t
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
    }
}, "xingcheng", function(t) {
    var e = this, a = t.currentTarget.dataset.id;
    app.util.request({
        url: "entry/wxapp/StrokeIn",
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
    }), e.setData({
        xingchengIndex: t.currentTarget.dataset.index
    });
}), _defineProperty(_Page, "open_switch", function(t) {
    var e = t.currentTarget.dataset.index, a = this.data.fenlei, n = a.cost_info;
    n[e].status = !n[e].status, this.setData({
        fenlei: a
    });
}), _defineProperty(_Page, "changeGoodsTit", function(t) {
    this.setData({
        currentGoodsTit: t.currentTarget.dataset.id
    });
}), _defineProperty(_Page, "likeBtnIO", function(t) {
    var e = this, a = t.currentTarget.dataset.id, n = t.currentTarget.dataset.idx, i = this.data.message, o = wx.getStorageSync("openid"), s = i[n], r = s.praise;
    "-1" == s.praise_status ? app.util.request({
        url: "entry/wxapp/OrderPraiseIn",
        data: {
            id: a,
            openid: o,
            status: 1
        },
        success: function(t) {
            console.log(t), 1 == t.data.data.status && (r++, s.praise_status = "1", s.praise = r, 
            e.setData({
                message: i
            }));
        }
    }) : app.util.request({
        url: "entry/wxapp/OrderPraiseIn",
        data: {
            id: a,
            openid: o,
            status: -1
        },
        success: function(t) {
            1 == t.data.data.status && (r--, s.praise_status = "-1", s.praise = r, e.setData({
                message: i
            }));
        }
    });
}), _defineProperty(_Page, "scrollPage", function() {
    wx.pageScrollTo({
        scrollTop: 400
    });
}), _defineProperty(_Page, "return_idx", function() {
    wx.switchTab({
        url: "../../../index/index"
    });
}), _Page));
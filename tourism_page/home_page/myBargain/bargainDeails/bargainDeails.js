var _Page;

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var WxParse = require("../../../wxParse/wxParse.js"), app = getApp();

Page((_defineProperty(_Page = {
    data: {
        bargainIO: !1,
        share: !1,
        likeIO: !1,
        likeSum: 111,
        currentGoodsTit: 0,
        likeBtnIO: !1,
        likeBtnSum: 0,
        showPoster: !1,
        show_options: !1,
        showActionList: !1,
        hideCanvas: !1,
        leftHelp: "0",
        surplusHelp: 0,
        srcollSum: [],
        share_model: !1,
        sponsor_status: -1,
        no_bargain: !1,
        a_time_status: 1,
        b_time_status: 1,
        xingcheng: [],
        xingchengIndex: 0,
        xingchengId: 0,
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
        identical: !1,
        activity_over: !1,
        jiazai: !0,
        progress_txt: "正在加载中...",
        count: 0,
        countTime: null,
        getUseInfo: !1
    },
    onLoad: function(t) {
        var a = this, e = wx.getStorageSync("openid");
        if (console.log(e), "" == e || null == e) return a.setData({
            getUseInfo: !0
        }), !1;
        a.setData({
            c_openid: e
        });
        var n = t.id;
        // this.getTitle(), 
        this.getScenicspotMessage(), console.log(t);
        var i = t.help;
        i && 1 == this.data.a_time_status && 1 == this.data.b_time_status ? (this.FriendBargain(n, t.c_openid), 
        this.setData({
            help_status: i,
            c_openid: t.c_openid
        })) : i && -1 == this.data.a_time_status ? (this.FriendBargain(n, t.c_openid), this.setData({
            help_status: i,
            c_openid: t.c_openid
        })) : i && -1 == this.data.b_time_status && (this.FriendBargain(n, t.c_openid), 
        this.setData({
            help_status: i,
            c_openid: t.c_openid
        })), wx.getStorage({
            key: "useInfo",
            success: function(t) {
                "true" == t.data && a.setData({
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
    go_activity: function() {
        wx.reLaunch({
            url: "../../../index/newActivity/newActivity"
        });
    },
    ac_over: function() {
        wx.showModal({
            content: "活动已过期！",
            showCancel: !1,
            success: function(t) {
                t.confirm && wx.switchTab({
                    url: "../../../index/index"
                });
            }
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
                            var e = wx.getStorageSync("openid");
                            wx.getUserInfo({
                                success: function(t) {
                                    var a = t.userInfo;
                                    app.util.request({
                                        url: "entry/wxapp/Member",
                                        data: {
                                            nickName: a.nickName,
                                            avatarUrl: a.avatarUrl,
                                            openid: e
                                        },
                                        success: function(t) {
                                            if (1 == t.data.data) {
                                                console.log(i.options);
                                                var a = i.options.help, e = i.options.c_openid, n = i.options.id;
                                                wx.redirectTo({
                                                    url: "../bargainDeails/bargainDeails?c_openid=" + e + "&help=" + a + "&id=" + n
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
    choose_plan: function(t) {
        var a = this.data.fenlei, e = t.currentTarget.dataset.index;
        a.trip.selIndex = e, this.setData({
            fenlei: a
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
    getStroke: function(t) {
        var o = this, s = o.data.xingcheng;
        app.util.request({
            url: "entry/wxapp/Stroke",
            data: {
                id: t
            },
            success: function(t) {
                console.log(t);
                for (var a = t.data.data, e = 0; e < a.length; e++) {
                    var n = a[e], i = {};
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
        var a = this;
        app.util.request({
            url: "entry/wxapp/StrokeIn",
            data: {
                scenicspot: t
            },
            success: function(t) {
                a.setData({
                    mrxc: t.data.data
                }), WxParse.wxParse("probable", "html", t.data.data.probable, a, 5);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    }
}, "xingcheng", function(t) {
    var a = this, e = t.currentTarget.dataset.id;
    app.util.request({
        url: "entry/wxapp/StrokeIn",
        data: {
            id: e
        },
        success: function(t) {
            console.log(t), a.setData({
                mrxc: t.data.data
            }), WxParse.wxParse("probable", "html", t.data.data.probable, a, 5);
        },
        fail: function(t) {
            console.log(t);
        }
    }), a.setData({
        xingchengIndex: t.currentTarget.dataset.index
    });
}), _defineProperty(_Page, "open_switch", function(t) {
    var a = t.currentTarget.dataset.index, e = this.data.fenlei, n = e.cost_info;
    n[a].status = !n[a].status, this.setData({
        fenlei: e
    });
}), _defineProperty(_Page, "getTitle", function() {
    app.util.request({
        url: "entry/wxapp/Title",
        success: function(t) {
            wx.setNavigationBarTitle({
                title: t.data.data
            });
        },
        fail: function(t) {
            console.log(t);
        }
    });
}), _defineProperty(_Page, "FriendBargain", function(t, a) {
    var e = this, n = wx.getStorageSync("openid");
    app.util.request({
        url: "entry/wxapp/FriendBargain",
        data: {
            id: t,
            openid: n,
            c_openid: a
        },
        success: function(t) {
            console.log("qweqwe111111111111111111111111111111111"), console.log(t);
            var a = t.data.data.status;
            if (1 == a) e.setData({
                friends_bargain: t.data.data,
                share_model: !0
            }); else if (-2 == a) e.setData({
                identical: !0,
                share_model: !1,
                activity_over: !0
            }), wx.showModal({
                title: "砍价失败",
                content: "已砍过，不能再砍啦！",
                showCancel: !1,
                success: function(t) {
                    t.confirm && wx.switchTab({
                        url: "../../../index/index"
                    });
                }
            }); else {
                if (-1 == a) return e.setData({
                    share_model: !1,
                    activity_over: !0
                }), void wx.showModal({
                    title: "砍价失败",
                    content: "发起人已完成砍价",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.switchTab({
                            url: "../../../index/index"
                        });
                    }
                });
                if (-3 == a) return e.setData({
                    share_model: !1,
                    activity_over: !0
                }), void wx.showModal({
                    title: "砍价失败",
                    content: "该活动已结束",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.switchTab({
                            url: "../../../index/index"
                        });
                    }
                });
                if (-4 == a) return e.setData({
                    share_model: !1,
                    activity_over: !0
                }), void wx.showModal({
                    title: "砍价失败",
                    content: "砍价已过期",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.switchTab({
                            url: "../../../index/index"
                        });
                    }
                });
                if (-5 == a) return e.setData({
                    share_model: !1,
                    activity_over: !0
                }), void wx.showModal({
                    title: "砍价失败",
                    content: "活动未开始",
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
}), _defineProperty(_Page, "djs", function(a) {
    var e = this, t = new Date(), n = t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds(), i = e.f(n, a.create_time, "ac_second");
    if (console.log(i), 0 < i) a.c_timer = setInterval(function() {
        if ((a.c_t = i) <= 0) {
            clearInterval(a.c_timer), a.start_t = !0;
            var t = e.f(n, a.finish_time, "ac_second");
            a.e_timer = setInterval(function() {
                (a.e_t = t) <= 0 ? (clearInterval(a.e_timer), a.end_t = !0) : 0 < t && t < 60 ? (a.e_clock = app.dateformat_s(t--), 
                a.now_t = "s") : t < 3600 ? (a.e_clock = app.dateformat_m(t--), a.now_t = "m") : t < 86400 ? (a.e_clock = app.dateformat_h(t--), 
                a.now_t = "h") : 86400 <= t && (a.e_clock = app.dateformat_d(t--), a.now_t = "d"), 
                e.setData({
                    Bargain: a
                });
            }, 1e3);
        } else 0 < i && i < 60 ? (a.c_clock = app.dateformat_s(i--), a.now_t = "s") : i < 3600 ? (a.c_clock = app.dateformat_m(i--), 
        a.now_t = "m") : i < 86400 ? (a.c_clock = app.dateformat_h(i--), a.now_t = "h") : 86400 <= i && (a.c_clock = app.dateformat_d(i--), 
        a.now_t = "d");
        e.setData({
            Bargain: a
        });
    }, 1e3); else if (i <= 0) {
        clearInterval(a.c_timer), a.start_t = !0;
        var o = e.f(n, a.finish_time, "ac_second");
        a.e_timer = setInterval(function() {
            (a.e_t = o) <= 0 ? (clearInterval(a.e_timer), a.end_t = !0) : 0 < o && o < 60 ? (a.e_clock = app.dateformat_s(o--), 
            a.now_t = "s") : o < 3600 ? (a.e_clock = app.dateformat_m(o--), a.now_t = "m") : o < 86400 ? (a.e_clock = app.dateformat_h(o--), 
            a.now_t = "h") : 86400 <= o && (a.e_clock = app.dateformat_d(o--), a.now_t = "d"), 
            e.setData({
                Bargain: a
            });
        }, 1e3);
    }
}), _defineProperty(_Page, "getBargaininfo", function(t) {
    var e = this, a = wx.getStorageSync("openid");
    app.util.request({
        url: "entry/wxapp/BargainInfo",
        data: {
            id: t,
            openid: a
        },
        success: function(t) {
            if (console.log(t), t.data.data.create_time = t.data.data.create_time.replace(/\-/g, "/"), 
            t.data.data.finish_time = t.data.data.finish_time.replace(/\-/g, "/"), e.getStroke(t.data.data.jd_id), 
            e.unloadxingcheng(t.data.data.jd_id), -3 == t.data.data.active_finish_status && (e.setData({
                activity_over: !0
            }), e.ac_over()), 1 == t.data.data.praise && e.setData({
                likeIO: !0
            }), 1 == t.data.data.sponsor_status) {
                e.setData({
                    bargainIO: !0
                });
                var a = (Number(t.data.data.original_price) - Number(t.data.data.total)).toFixed(2);
                a >= t.data.data.original_price - t.data.data.now_price && e.setData({
                    no_bargain: !0
                }), e.setData({
                    Bargain: t.data.data,
                    likeSum: t.data.data.praise_num,
                    surplusHelp: t.data.data.total,
                    leftHelp: String(a)
                }), e.MybargainInfo(), e.BargainRecord();
            } else -1 == t.data.data.sponsor_status && e.setData({
                bargainIO: !1,
                surplusHelp: t.data.data.original_price
            });
            e.djs(t.data.data), e.setData({
                Bargain: t.data.data,
                traffic: t.data.data.traffic,
                information: t.data.data.information,
                likeSum: t.data.data.praise_num
            }), WxParse.wxParse("particulars", "html", t.data.data.particulars, e, 5), WxParse.wxParse("active", "html", t.data.data.text, e, 5), 
            WxParse.wxParse("information_text", "html", t.data.data.information.text, e, 5);
        },
        fail: function(t) {
            console.log(t);
        }
    });
}), _defineProperty(_Page, "previewImg", function(t) {
    var a = t.currentTarget.dataset.idx, e = t.currentTarget.dataset.id, n = this.data.message;
    wx.previewImage({
        current: n[a].image[e],
        urls: n[a].image
    });
}), _defineProperty(_Page, "likeBtnIO", function(t) {
    var a = this, e = t.currentTarget.dataset.id, n = t.currentTarget.dataset.idx, i = this.data.message, o = wx.getStorageSync("openid"), s = i[n], r = s.praise;
    "-1" == s.praise_status ? app.util.request({
        url: "entry/wxapp/OrderPraiseIn",
        data: {
            id: e,
            openid: o,
            status: 1
        },
        success: function(t) {
            console.log(t), 1 == t.data.data.status && (r++, s.praise_status = "1", s.praise = r, 
            a.setData({
                message: i
            }));
        }
    }) : app.util.request({
        url: "entry/wxapp/OrderPraiseIn",
        data: {
            id: e,
            openid: o,
            status: -1
        },
        success: function(t) {
            1 == t.data.data.status && (r--, s.praise_status = "-1", s.praise = r, a.setData({
                message: i
            }));
        }
    });
}), _defineProperty(_Page, "f", function(t, a, e) {
    var n = new Date(t), i = new Date(a);
    if ("ac_second" == e) return (i - n) / 1e3;
    "e_second" == e && this.setData({
        e_second: (i - n) / 1e3
    });
}), _defineProperty(_Page, "MybargainInfo", function() {
    var o = this, t = o.options.id, a = wx.getStorageSync("openid"), s = this.data.leftHelp;
    app.util.request({
        url: "entry/wxapp/MybargainInfo",
        data: {
            id: t,
            openid: a
        },
        success: function(t) {
            console.log(t);
            t.data.data.sponsor_id;
            var a = t.data.data.status;
            if (1 == a) {
                if (o.setData({
                    sponsor_id: t.data.data.sponsor_id
                }), 0 != Number(s)) {
                    var e = new Date(), n = t.data.data.out_time, i = e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate() + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
                    o.f(i, n, "e_second"), setTimeout(function() {
                        o.timer();
                    }, 10);
                }
            } else -1 == a && o.setData({
                b_time_status: -1
            });
            console.log(t);
        },
        fail: function(t) {
            console.log(t);
        }
    });
}), _defineProperty(_Page, "BargainRecord", function() {
    var a = this, t = a.options.id, e = wx.getStorageSync("openid");
    app.util.request({
        url: "entry/wxapp/BargainRecord",
        data: {
            id: t,
            openid: e
        },
        success: function(t) {
            console.log(t), a.setData({
                BargainRecord: t.data.data
            });
        },
        fail: function(t) {
            console.log(t);
        }
    });
}), _defineProperty(_Page, "getScenicspotMessage", function() {
    var a = this, t = a.options.id, e = wx.getStorageSync("openid");
    app.util.request({
        url: "entry/wxapp/ScenicspotMessage",
        data: {
            id: t,
            openid: e,
            ftype: "bargain"
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
}), _defineProperty(_Page, "timer1", function() {
    var t = this, a = setInterval(function() {
        t.data.ac_second <= 0 ? (t.setData({
            now_ac_time: "end",
            a_time_status: -1,
            b_time_status: -1
        }), clearInterval(a)) : 0 < t.data.ac_second && t.data.ac_second < 60 ? t.setData({
            activity_clock: app.dateformat_s(t.data.ac_second--),
            now_ac_time: "s"
        }) : t.data.ac_second < 3600 ? t.setData({
            activity_clock: app.dateformat_m(t.data.ac_second--),
            now_ac_time: "m"
        }) : t.data.ac_second < 86400 ? t.setData({
            activity_clock: app.dateformat_h(t.data.ac_second--),
            now_ac_time: "h"
        }) : 86400 <= t.data.ac_second && t.setData({
            activity_clock: app.dateformat_d(t.data.ac_second--),
            now_ac_time: "d"
        });
    }, 1e3);
}), _defineProperty(_Page, "timer", function() {
    var t = this, a = setInterval(function() {
        t.data.ac_second <= 0 && clearInterval(a), t.data.e_second <= 0 ? (t.setData({
            b_time_status: -1
        }), clearInterval(a)) : 0 < t.data.e_second && t.setData({
            c_clock: app.dateformat_all(t.data.e_second--)
        });
    }, 1e3);
    this.setData({
        bargain_timer: a
    });
}), _defineProperty(_Page, "goBuy", function() {
    var t = this.data.sponsor_id;
    wx.navigateTo({
        url: "../../payDeails/payDeails?id=" + t + "&type=1"
    });
}), _defineProperty(_Page, "show_bargainModel", function() {
    var s = this, t = s.options.id, r = wx.getStorageSync("openid"), d = this.data.srcollSum, c = wx.getStorageSync("userheaderimg"), l = this.data.Bargain;
    app.util.request({
        url: "entry/wxapp/BargainCreate",
        data: {
            id: t,
            openid: r
        },
        success: function(t) {
            console.log(t), t.data.data.out_time = t.data.data.out_time.replace(/\-/g, "/");
            var a = this.data.leftHelp;
            if (1 != t.data.data.status) return -2 == t.data.data.status ? void wx.showModal({
                title: "砍价失败",
                content: "您有砍价活动正在进行中",
                showCancel: !1
            }) : -3 == t.data.data.status ? void wx.showModal({
                title: "砍价失败",
                content: "该活动已结束",
                showCancel: !1
            }) : -4 == t.data.data.status ? void wx.showModal({
                title: "砍价失败",
                content: "该活动已售馨",
                showCancel: !1
            }) : -7 == t.data.data.status ? void wx.showModal({
                title: "砍价失败",
                content: "您的参与次数已用完",
                showCancel: !1
            }) : void wx.showModal({
                title: "创建砍价失败",
                content: "砍价失败，请联系客服",
                showCancel: !1
            });
            (a = t.data.data.cut_price) >= t.data.data.cut_price + t.data.data.total - l.now_price && s.setData({
                no_bargain: !0
            });
            var e = t.data.data.total;
            d.push({
                avatar: c,
                // nickname: c.nickName,
                price: t.data.data.cut_price
            });
            var n = new Date(), i = t.data.data.out_time, o = n.getFullYear() + "/" + (n.getMonth() + 1) + "/" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
            s.f(o, i, "e_second"), setTimeout(function() {
                s.timer();
            }, 10), s.setData({
                bargainIO: !0,
                leftHelp: String(a),
                share_model: !0,
                srcollSum: d,
                surplusHelp: e,
                c_openid: r,
                sponsor_id: t.data.data.sponsor_id
            }), s.BargainRecord();
        }
    });
}), _defineProperty(_Page, "hide_share_model", function() {
    this.setData({
        share_model: !1
    });
}), _defineProperty(_Page, "goCommentDeails", function(t) {
    var a = t.currentTarget.dataset.id;
    app.util.request({
        url: "entry/wxapp/OrderMessageLook",
        data: {
            id: a
        },
        success: function(t) {
            1 == t.data.data && wx.navigateTo({
                url: "../../commentDeails/commentDeails?id=" + a
            });
        }
    });
}), _defineProperty(_Page, "goShare", function() {
    0 == this.data.share ? this.setData({
        share: !0
    }) : this.setData({
        share: !1
    });
}), _defineProperty(_Page, "touchLike", function(t) {
    var a = this, e = t.currentTarget.dataset.id, n = wx.getStorageSync("openid");
    console.log(e, n), 0 == a.data.likeIO ? app.util.request({
        url: "entry/wxapp/ScenicspotPraise",
        data: {
            id: e,
            openid: n,
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
            openid: n,
            status: -1
        },
        success: function(t) {
            1 == t.data.data && (a.data.likeSum--, a.setData({
                likeIO: !1,
                likeSum: a.data.likeSum
            }));
        }
    });
}), _defineProperty(_Page, "changeGoodsTit", function(t) {
    this.setData({
        currentGoodsTit: t.currentTarget.dataset.id
    });
}), _defineProperty(_Page, "scrollPage", function() {
    console.log(11), wx.pageScrollTo({
        scrollTop: 400
    });
}), _defineProperty(_Page, "onShow", function() {
    this.setData({
        jiazai: !0,
        count: 0,
        progress_txt: "正在加载中..."
    }), this.drawProgressbg(), this.countInterval();
    var t = this.options.id;
    this.getBargaininfo(t);
}), _defineProperty(_Page, "onHide", function() {
    var t = this.data.Bargain;
    clearInterval(this.data.bargain_timer), t.c_timer ? clearInterval(t.c_timer) : t.e_timer && clearInterval(t.e_timer), 
    this.setData({
        Bargain: t,
        bargain_timer: this.data.bargain_timer
    });
}), _defineProperty(_Page, "countInterval", function() {
    var t = this;
    this.countTime = setInterval(function() {
        t.data.count <= 60 ? (t.drawCircle(t.data.count / 30), t.data.count += 6) : (t.setData({
            progress_txt: "加载成功",
            jiazai: !1
        }), clearInterval(t.countTime));
    }, 100);
}), _defineProperty(_Page, "drawProgressbg", function() {
    var t = wx.createCanvasContext("canvasProgressbg");
    t.setLineWidth(1), t.setStrokeStyle("#15e4d1"), t.setLineCap("round"), t.beginPath(), 
    t.arc(110, 110, 20, 0, 2 * Math.PI, !1), t.stroke(), t.draw();
}), _defineProperty(_Page, "drawCircle", function(t) {
    var a = wx.createCanvasContext("canvasProgress"), e = a.createLinearGradient(200, 100, 100, 200);
    e.addColorStop("0", "#15e4d1"), e.addColorStop("0.5", "#15e4d1"), e.addColorStop("1.0", "#15e4d1"), 
    a.setLineWidth(5), a.setStrokeStyle(e), a.setLineCap("round"), a.beginPath(), a.arc(110, 110, 20, -Math.PI / 2, t * Math.PI - Math.PI / 2, !1), 
    a.stroke(), a.draw();
}), _defineProperty(_Page, "onShareAppMessage", function() {
    var t = this.options.id, a = this.data.c_openid;
    console.log(a);
    return {
        title: "就差你一刀！拜托帮帮我！",
        path: "/tourism_page/home_page/myBargain/bargainDeails/bargainDeails?id=" + t + "&help=yes&c_openid=" + a,
        success: function(t) {
            console.log(t);
        },
        fail: function(t) {
            console.log(t);
        }
    };
}), _defineProperty(_Page, "showPoster", function() {
    var a = this, t = a.options.id, e = wx.getStorageSync("openid");
    app.util.request({
        url: "entry/wxapp/BargainSharePoster",
        data: {
            id: t,
            openid: e
        },
        success: function(t) {
            console.log(t), a.setData({
                path: t.data.data
            });
        }
    }), this.setData({
        showPoster: !0
    });
}), _defineProperty(_Page, "show_options", function() {
    var t = this.data.show_options;
    0 == t ? this.setData({
        show_options: !0
    }) : this.setData({
        show_options: !1
    });
}), _defineProperty(_Page, "hidePoster", function() {
    this.setData({
        showPoster: !1,
        share: !1,
        show_options: !1
    });
}), _defineProperty(_Page, "saveImg", function() {
    var a = this, t = this.data.path;
    wx.getImageInfo({
        src: t,
        success: function(t) {
            wx.saveImageToPhotosAlbum({
                filePath: t.path,
                success: function(t) {
                    wx.showToast({
                        title: "保存成功！",
                        duration: 1e3
                    }), setTimeout(function() {
                        a.setData({
                            showPoster: !1,
                            share: !1,
                            show_options: !1
                        });
                    }, 1e3);
                },
                fail: function(t) {
                    console.log(t);
                }
            });
        }
    });
}), _Page));
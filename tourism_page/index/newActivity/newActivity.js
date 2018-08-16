var app = getApp();

Page({
    data: {
        show_type: !1,
        currentCity: 0,
        jiazai: !0,
        progress_txt: "正在加载中...",
        count: 0,
        countTime: null,
        sele_type: 2,
        ac_sum: 4,
        t_sum: 4,
        b_sum: 4,
        loop: !1
    },
    onLoad: function(t) {},
    f: function(t, e) {
        var a = new Date(t);
        return (new Date(e) - a) / 1e3;
    },
    djs: function(e, a, r) {
        var n = this, t = new Date(), s = t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds(), i = n.f(s, e[a].create_time);
        if (0 < i) e[a].c_timer = setInterval(function() {
            if ((e[a].c_t = i) <= 0) {
                clearInterval(e[a].c_timer), e[a].start_t = !0;
                var t = n.f(s, e[a].finish_time);
                e[a].e_timer = setInterval(function() {
                    (e[a].e_t = t) <= 0 ? (clearInterval(e[a].e_timer), e[a].end_t = !0) : 0 < t && t < 60 ? (e[a].e_clock = app.dateformat_s(t--), 
                    e[a].now_t = "s") : t < 3600 ? (e[a].e_clock = app.dateformat_m(t--), e[a].now_t = "m") : t < 86400 ? (e[a].e_clock = app.dateformat_h(t--), 
                    e[a].now_t = "h") : 86400 <= t && (e[a].e_clock = app.dateformat_d(t--), e[a].now_t = "d"), 
                    "new_Active" == r ? n.setData({
                        new_Active: e
                    }) : "new_t_arr" == r ? n.setData({
                        new_t_arr: e
                    }) : "new_b_arr" == r && n.setData({
                        new_b_arr: e
                    });
                }, 1e3);
            } else 0 < i && i < 60 ? (e[a].c_clock = app.dateformat_s(i--), e[a].now_t = "s") : i < 3600 ? (e[a].c_clock = app.dateformat_m(i--), 
            e[a].now_t = "m") : i < 86400 ? (e[a].c_clock = app.dateformat_h(i--), e[a].now_t = "h") : 86400 <= i && (e[a].c_clock = app.dateformat_d(i--), 
            e[a].now_t = "d");
            "new_Active" == r ? n.setData({
                new_Active: e
            }) : "new_t_arr" == r ? n.setData({
                new_t_arr: e
            }) : "new_b_arr" == r && n.setData({
                new_b_arr: e
            });
        }, 1e3); else if (i <= 0) {
            clearInterval(e[a].c_timer), e[a].start_t = !0;
            var _ = n.f(s, e[a].finish_time);
            e[a].e_timer = setInterval(function() {
                (e[a].e_t = _) <= 0 ? (clearInterval(e[a].e_timer), e[a].end_t = !0) : 0 < _ && _ < 60 ? (e[a].e_clock = app.dateformat_s(_--), 
                e[a].now_t = "s") : _ < 3600 ? (e[a].e_clock = app.dateformat_m(_--), e[a].now_t = "m") : _ < 86400 ? (e[a].e_clock = app.dateformat_h(_--), 
                e[a].now_t = "h") : 86400 <= _ && (e[a].e_clock = app.dateformat_d(_--), e[a].now_t = "d"), 
                "new_Active" == r ? n.setData({
                    new_Active: e
                }) : "new_t_arr" == r ? n.setData({
                    new_t_arr: e
                }) : "new_b_arr" == r && n.setData({
                    new_b_arr: e
                });
            }, 1e3);
        }
    },
    onShow: function() {
        var i = this;
        this.drawProgressbg(), this.countInterval(), app.util.request({
            url: "entry/wxapp/ChangeCityActive",
            success: function(t) {
                console.log(t);
                for (var e = t.data.data, a = 0; a < e.length; a++) e[a].create_time = e[a].create_time.replace(/\-/g, "/"), 
                e[a].finish_time = e[a].finish_time.replace(/\-/g, "/");
                if (e != [] && null != e && "" != e) var r = e.slice(0, 4), n = 0, s = setInterval(function() {
                    i.djs(r, n, "new_Active"), ++n > r.length - 1 && clearInterval(s);
                }, 10);
                i.setData({
                    Active: e,
                    new_Active: r
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), this.setData({
            sele_type: 2,
            ac_sum: 4,
            t_sum: 4,
            b_sum: 4
        });
    },
    onHide: function() {
        var t = this.data.new_Active, e = this.data.new_t_arr, a = this.data.new_b_arr;
        t ? this.stop_timer(t) : e ? this.stop_timer(e) : a && this.stop_timer(a);
    },
    onReady: function() {
        this.getHotAddress();
    },
    getHotAddress: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/AllAddress",
            success: function(t) {
                console.log(t), e.setData({
                    cityList: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    stop_timer: function(t) {
        for (var e = 0; e < t.length; e++) t[e].c_timer ? clearInterval(t[e].c_timer) : t[e].e_timer && clearInterval(t[e].e_timer);
        "new_Active" == t ? this.setData({
            new_Active: t
        }) : "new_t_arr" == t ? this.setData({
            new_t_arr: t
        }) : "new_b_arr" == t && this.setData({
            new_b_arr: t
        });
    },
    countInterval: function() {
        var t = this;
        this.countTime = setInterval(function() {
            t.data.count <= 120 ? (t.drawCircle(t.data.count / 60), t.data.count += 10) : (t.setData({
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
    ChangeCityActive: function(t) {
        this.drawProgressbg(), this.countInterval();
        var e = t.currentTarget.dataset.id, w = this.data.sele_type, a = this.data.new_Active, r = this.data.new_b_arr, n = this.data.new_t_arr;
        a && (this.stop_timer(a), this.setData({
            new_Active: a
        })), r && (this.stop_timer(r), this.setData({
            new_b_arr: r
        })), n && (this.stop_timer(n), this.setData({
            new_t_arr: n
        })), this.setData({
            jiazai: !0,
            count: 0,
            progress_txt: "正在加载中...",
            ac_sum: 4,
            t_sum: 4,
            b_sum: 4,
            currentCity: e,
            new_Active: [],
            new_t_arr: [],
            new_b_arr: []
        }), console.log(e);
        var d = this;
        app.util.request({
            url: "entry/wxapp/ChangeCityActive",
            data: {
                address_id: e
            },
            success: function(t) {
                console.log(t);
                for (var e = t.data.data, a = 0; a < e.length; a++) e[a].create_time = e[a].create_time.replace(/\-/g, "/"), 
                e[a].finish_time = e[a].finish_time.replace(/\-/g, "/");
                if (e != [] && null != e && "" != e && 2 == w) {
                    var r = e.slice(0, 4), n = 0, s = setInterval(function() {
                        d.djs(r, n, "new_Active"), ++n > r.length - 1 && clearInterval(s);
                    }, 10);
                    d.setData({
                        new_Active: r
                    });
                }
                for (var i = [], _ = [], c = 0; c < e.length; c++) 1 == e[c].type ? i.push(e[c]) : 0 == e[c].type && _.push(e[c]);
                if (0 < i.length && 1 == w) {
                    var o = i.slice(0, 4), l = 0;
                    s = setInterval(function() {
                        d.djs(o, l, "new_t_arr"), ++l > o.length - 1 && clearInterval(s);
                    }, 10);
                    d.setData({
                        new_t_arr: o
                    });
                } else if (0 < _.length && 1 == w) {
                    var h = _.slice(0, 4), v = 0;
                    s = setInterval(function() {
                        d.djs(h, v, "new_b_arr"), ++v > h.length - 1 && clearInterval(s);
                    }, 10);
                    d.setData({
                        new_b_arr: h
                    });
                }
                d.setData({
                    Active: e,
                    t_arr: i,
                    b_arr: _
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    go_GoodsDeails: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.name;
        console.log(a), 1 == a ? wx.navigateTo({
            url: "../../home_page/myTeamwork/teamworkDeails/teamworkDeails?id=" + e
        }) : 0 == a && wx.navigateTo({
            url: "../../home_page/myBargain/bargainDeails/bargainDeails?id=" + e
        });
    },
    show_select_type: function() {
        1 == this.data.show_type ? this.setData({
            show_type: !1
        }) : this.setData({
            show_type: !0
        });
    },
    select_type: function(t) {
        var e = this.data.new_Active, a = this.data.new_b_arr, r = this.data.new_t_arr;
        e && (this.stop_timer(e), this.setData({
            new_Active: e
        })), a && (this.stop_timer(a), this.setData({
            new_b_arr: a
        })), r && (this.stop_timer(r), this.setData({
            new_t_arr: r
        })), this.setData({
            jiazai: !0,
            count: 0,
            progress_txt: "正在加载中...",
            new_Active: [],
            new_t_arr: [],
            new_b_arr: [],
            ac_sum: 4,
            t_sum: 4,
            b_sum: 4
        }), this.drawProgressbg(), this.countInterval();
        for (var n = this, s = t.target.dataset.type, i = (this.data.show_type, this.data.Active), _ = [], c = [], o = 0; o < i.length; o++) 1 == i[o].type ? _.push(i[o]) : 0 == i[o].type && c.push(i[o]);
        if (s) {
            if (0 == s && 0 < c.length) {
                a = c.slice(0, 1);
                var l = 0, h = setInterval(function() {
                    n.djs(a, l, "new_b_arr"), ++l > a.length - 1 && clearInterval(h);
                }, 10);
                this.setData({
                    new_b_arr: a
                });
            } else if (1 == s && 0 < _.length) {
                r = _.slice(0, 4);
                var v = 0;
                h = setInterval(function() {
                    n.djs(r, v, "new_t_arr"), ++v > r.length - 1 && clearInterval(h);
                }, 10);
                this.setData({
                    new_t_arr: r
                });
            } else if (2 == s && 0 < i.length) {
                e = i.slice(0, 4);
                var w = 0;
                h = setInterval(function() {
                    n.djs(e, w, "new_Active"), ++w > e.length - 1 && clearInterval(h);
                }, 10);
                this.setData({
                    new_Active: e
                });
            }
            this.setData({
                sele_type: s
            });
        }
        this.setData({
            show_type: !1,
            b_arr: c,
            t_arr: _,
            Active: i
        });
    },
    return_idx: function() {
        wx.switchTab({
            url: "../index"
        });
    },
    look_more: function(t) {
        var e = this;
        if (0 == this.data.loop) {
            this.setData({
                loop: !0
            });
            var a = t.currentTarget.dataset.type;
            if ("ac_arr" == a) {
                for (var r = this.data.Active, n = this.data.new_Active, s = 0; s < n.length; s++) n[s].c_timer ? clearInterval(n[s].c_timer) : n[s].e_timer && clearInterval(n[s].e_timer);
                this.setData({
                    new_Active: n
                });
                var i = this.data.ac_sum;
                if (i < r.length) {
                    var _ = r.slice(i, i + 4);
                    n = n.concat(_);
                    var c = 0, o = setInterval(function() {
                        e.djs(n, c, "new_Active"), ++c > n.length - 1 && clearInterval(o);
                    }, 10);
                    this.setData({
                        new_Active: n,
                        ac_sum: i + 4
                    });
                }
            } else if ("b_arr" == a) {
                var l = this.data.b_arr, h = this.data.new_b_arr;
                for (s = 0; s < h.length; s++) h[s].c_timer ? clearInterval(h[s].c_timer) : h[s].e_timer && clearInterval(h[s].e_timer);
                this.setData({
                    new_b_arr: h
                });
                var v = this.data.b_sum;
                if (v < l.length) {
                    _ = l.slice(v, v + 4);
                    h = h.concat(_);
                    var w = 0;
                    o = setInterval(function() {
                        e.djs(h, w, "new_b_arr"), ++w > h.length - 1 && clearInterval(o);
                    }, 10);
                    this.setData({
                        new_b_arr: h,
                        b_sum: v + 4
                    });
                }
            } else if ("t_arr" == a) {
                var d = this.data.t_arr, u = this.data.new_t_arr;
                for (s = 0; s < u.length; s++) u[s].c_timer ? clearInterval(u[s].c_timer) : u[s].e_timer && clearInterval(u[s].e_timer);
                this.setData({
                    new_t_arr: u
                });
                var f = this.data.t_sum;
                if (f < d.length) {
                    _ = d.slice(f, f + 4);
                    u = u.concat(_);
                    var m = 0;
                    o = setInterval(function() {
                        e.djs(u, m, "new_t_arr"), ++m > u.length - 1 && clearInterval(o);
                    }, 10);
                    this.setData({
                        new_t_arr: u,
                        t_sum: f + 4
                    });
                }
            }
            setTimeout(function() {
                e.setData({
                    loop: !1
                });
            }, 1e3);
        }
    }
});
var app = getApp();

Page({
    data: {
        currentNav: 0,
        jiazai: !0,
        progress_txt: "正在加载中...",
        count: 0,
        countTime: null,
        top_list: [ "景点", "美食", "住宿", "购物", "主题" ],
        attraction_ac_sum: 4,
        attraction_sum: 4,
        food_sum: 4,
        hotel_sum: 4,
        shopping_sum: 4,
        theme_sum: 4,
        ac_sum_end: !1
    },
    onLoad: function(t) {
        t.id && this.setData({
            currentNav: t.id
        });
        this.setData({
            jiazai: !0,
            count: 0,
            progress_txt: "正在加载中..."
        }), this.drawProgressbg(), this.countInterval();
    },
    onReady: function() {},
    onShow: function() {
        var t = this.options.address_id, a = this.options.id;
        this.getActiveList(t), this.getTuwenList(a, t), this.setData({
            attraction_ac_sum: 4,
            attraction_sum: 4,
            food_sum: 4,
            hotel_sum: 4,
            shopping_sum: 4,
            theme_sum: 4,
            ac_sum_end: !1
        });
    },
    onHide: function() {
        var t = this.data.new_ac_arr;
        if (t) {
            for (var a = 0; a < t.length; a++) t[a].e_timer ? clearInterval(t[a].e_timer) : t[a].c_timer && clearInterval(t[a].c_timer);
            this.setData({
                new_ac_arr: t
            });
        }
    },
    f: function(t, a) {
        var e = Date.parse(t);
        return (Date.parse(a) - e) / 1e3;
    },
    djs: function(a, e) {
        var i = this, t = new Date(), s = t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds(), n = i.f(s, a[e].create_time);
        if (0 < n) a[e].c_timer = setInterval(function() {
            if ((a[e].c_t = n) <= 0) {
                clearInterval(a[e].c_timer), a[e].start_t = !0;
                var t = i.f(s, a[e].finish_time);
                a[e].e_timer = setInterval(function() {
                    (a[e].e_t = t) <= 0 ? (clearInterval(a[e].e_timer), a[e].end_t = !0, i.end_activity(a[e].id, a[e].type)) : 0 < t && t < 60 ? (a[e].e_clock = app.dateformat_s(t--), 
                    a[e].now_t = "s") : t < 3600 ? (a[e].e_clock = app.dateformat_m(t--), a[e].now_t = "m") : t < 86400 ? (a[e].e_clock = app.dateformat_h(t--), 
                    a[e].now_t = "h") : 86400 <= t && (a[e].e_clock = app.dateformat_d(t--), a[e].now_t = "d"), 
                    i.setData({
                        new_ac_arr: a
                    });
                }, 1e3);
            } else 0 < n && n < 60 ? (a[e].c_clock = app.dateformat_s(n--), a[e].now_t = "s") : n < 3600 ? (a[e].c_clock = app.dateformat_m(n--), 
            a[e].now_t = "m") : n < 86400 ? (a[e].c_clock = app.dateformat_h(n--), a[e].now_t = "h") : 86400 <= n && (a[e].c_clock = app.dateformat_d(n--), 
            a[e].now_t = "d");
            i.setData({
                new_ac_arr: a
            });
        }, 1e3); else if (n <= 0) {
            clearInterval(a[e].c_timer), a[e].start_t = !0;
            var r = i.f(s, a[e].finish_time);
            a[e].e_timer = setInterval(function() {
                (a[e].e_t = r) <= 0 ? (clearInterval(a[e].e_timer), a[e].end_t = !0, i.end_activity(a[e].id, a[e].type)) : 0 < r && r < 60 ? (a[e].e_clock = app.dateformat_s(r--), 
                a[e].now_t = "s") : r < 3600 ? (a[e].e_clock = app.dateformat_m(r--), a[e].now_t = "m") : r < 86400 ? (a[e].e_clock = app.dateformat_h(r--), 
                a[e].now_t = "h") : 86400 <= r && (a[e].e_clock = app.dateformat_d(r--), a[e].now_t = "d"), 
                i.setData({
                    new_ac_arr: a
                });
            }, 1e3);
        }
    },
    end_activity: function(t, a) {
        if (console.log(1.1111111111111112e41), 1 == a) {
            console.log(a, t);
        }
    },
    getActiveList: function(t) {
        var r = this;
        app.util.request({
            url: "entry/wxapp/AddressActive",
            data: {
                address_id: t
            },
            success: function(t) {
                console.log(t);
                var a = t.data.data;
                if (0 < a.length) {
                    for (var e = 0; e < a.length; e++) a[e].create_time = a[e].create_time.replace(/\-/g, "/"), 
                    a[e].finish_time = a[e].finish_time.replace(/\-/g, "/");
                    var i = a.slice(0, 4), s = 0, n = setInterval(function() {
                        r.djs(i, s), ++s > i.length - 1 && clearInterval(n);
                    }, 10);
                    r.setData({
                        ac_arr: a,
                        new_ac_arr: i
                    });
                }
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getTuwenList: function(t, a) {
        console.log(t, a);
        var u = this;
        app.util.request({
            url: "entry/wxapp/TuwenList",
            data: {
                status: t,
                address_id: a
            },
            success: function(t) {
                console.log(t);
                for (var a = t.data.data.tuwen, e = t.data.data.attractions, i = t.data.data.attractions.slice(0, 1), s = [], n = [], r = [], o = [], c = 0; c < a.length; c++) "1" == a[c].tuwen_status ? s.push(a[c]) : "2" == a[c].tuwen_status ? n.push(a[c]) : "3" == a[c].tuwen_status ? r.push(a[c]) : "4" == a[c].tuwen_status && o.push(a[c]);
                var _ = s.slice(0, 4), l = r.slice(0, 4), d = o.slice(0, 4), h = n.slice(0, 4);
                u.setData({
                    foodList: s,
                    hotelList: n,
                    new_hotelList: h,
                    new_shoppingList: l,
                    new_zhutiList: d,
                    new_foodList: _,
                    shoppingList: r,
                    zhutiList: o,
                    attractions: e,
                    new_attractions: i
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    look_more: function(t) {
        var a = this, e = t.currentTarget.dataset.type;
        if ("ac" == e) {
            for (var i = this.data.ac_arr, s = this.data.new_ac_arr, n = 0; n < s.length; n++) s[n].c_timer ? clearInterval(s[n].c_timer) : s[n].e_timer && clearInterval(s[n].e_timer);
            this.setData({
                new_ac_arr: s
            });
            var r = this.data.attraction_ac_sum;
            if (r < i.length) {
                var o = i.slice(r, r + 4);
                s = s.concat(o);
                var c = 0, _ = setInterval(function() {
                    a.djs(s, c), ++c > s.length - 1 && clearInterval(_);
                }, 10);
                this.setData({
                    new_ac_arr: s,
                    attraction_ac_sum: r + 4
                });
            } else {
                if (1 == this.data.ac_sum_end) {
                    var l = this.data.attractions, d = this.data.attraction_sum, h = this.data.new_attractions;
                    if (d < h.length) {
                        o = l.slice(d, d + 4);
                        h = h.concat(o), this.setData({
                            new_attractions: h,
                            attraction_sum: d + 4
                        });
                    }
                } else this.setData({
                    ac_sum_end: !0
                });
            }
        } else if ("food" == e) {
            var u = this.data.food_sum, f = this.data.new_foodList, m = this.data.foodList;
            if (u < m.length) {
                o = m.slice(u, u + 4);
                f = f.concat(o), this.setData({
                    new_foodList: f,
                    food_sum: u + 4
                });
            }
        } else if ("hotel" == e) {
            var p = this.data.hotel_sum, g = this.data.new_hotelList, v = this.data.hotelList;
            if (p < v.length) {
                o = v.slice(p, p + 4);
                g = g.concat(o), this.setData({
                    new_hotelList: g,
                    hotel_sum: p + 4
                });
            }
        } else if ("shopping" == e) {
            var w = this.data.shopping_sum, D = this.data.new_shoppingList, L = this.data.shoppingList;
            if (w < L.length) {
                o = L.slice(w, w + 4);
                D = D.concat(o), this.setData({
                    new_shoppingList: D,
                    shopping_sum: w + 4
                });
            }
        } else if ("theme" == e) {
            var I = this.data.theme_sum, k = this.data.new_zhutiList, T = this.data.zhutiList;
            if (I < T.length) {
                o = T.slice(I, I + 4);
                k = k.concat(o), this.setData({
                    new_zhutiList: k,
                    theme_sum: I + 4
                });
            }
        }
    },
    changeCurrentNav: function(t) {
        this.setData({
            currentNav: t.target.dataset.id
        });
    },
    goSortDeails: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "sortDeails/sortDeails?id=" + a
        });
    },
    goThemeDeails: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../../detail/hotplace_detail/hotplace_detail?id=" + a
        });
    },
    goTeamworkDeails: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../../home_page/myTeamwork/teamworkDeails/teamworkDeails?id=" + a
        });
    },
    goBargain: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../../home_page/myBargain/bargainDeails/bargainDeails?id=" + a
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
        var a = wx.createCanvasContext("canvasProgress"), e = a.createLinearGradient(200, 100, 100, 200);
        e.addColorStop("0", "#15e4d1"), e.addColorStop("0.5", "#15e4d1"), e.addColorStop("1.0", "#15e4d1"), 
        a.setLineWidth(5), a.setStrokeStyle(e), a.setLineCap("round"), a.beginPath(), a.arc(110, 110, 20, -Math.PI / 2, t * Math.PI - Math.PI / 2, !1), 
        a.stroke(), a.draw();
    }
});
var app = getApp(), WxParse = require("../../wxParse/wxParse.js"), choose_year = null, choose_month = null, conf = {
    data: {
        hasEmptyGrid: !1,
        showPicker: !1,
        choose_date: null,
        week: null,
        insurance_mess: null,
        insurance_modal: !1,
        order_detail: !1,
        total: 0,
        totalfuzhi: 0,
        click: !1,
        list: [],
        crbx: {},
        bxje: 0,
        dingdan: !0,
        order_list: [],
        fenqiid: 0,
        baoxianid: 0,
        show: !1,
        jd_id: "",
        member: ""
    },
    array: [],
    onLoad: function(t) {
        var e = t.come, a = t.id;
        this.getNumberMan(a), this.getMyMorenAddress();
        var s = wx.getStorageSync("sele_day");
        s <= 9 && (s = s.split("")[1]);
        var n = wx.getStorageSync("sele_month");
        n <= 9 && (n = n.split("")[1]);
        var i = new Date();
        "热门" == e || s ? this.setData({
            show: !1
        }) : this.setData({
            show: !0
        });
        i.getDate();
        var r = i.getFullYear(), o = i.getMonth() + 1, c = i.getMonth() + 1, d = i.getDate(), l = t.id;
        s && n == c || (c = n), this.data.choose_date = s, this.calculateEmptyGrids(r, c), 
        this.calculateDays(r, c), this.getScenicspot(l), this.getPlaceOrders(l), this.getInstallmentInfo(l), 
        this.getInsurance(l), this.getNumberMan(l), this.setData({
            cur_year: r,
            weeks_ch: [ "日", "一", "二", "三", "四", "五", "六" ],
            jd_id: l,
            cur_month: c,
            currentMonth: o,
            currentDay: d,
            sele_day: s,
            sele_month: n,
            choose_date: this.data.choose_date
        });
    },
    onShow: function() {
        this.data.address_arr && this.setData({
            receiving_info: this.data.address_arr
        });
    },
    radioChange: function(t) {
        this.setData({
            insurance_sel: t.detail.value
        });
    },
    getMyMorenAddress: function() {
        var e = this, t = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyMorenAddress",
            data: {
                openid: t
            },
            success: function(t) {
                e.setData({
                    receiving_info: t.data.data
                });
            }
        });
    },
    checked_fenqi: function(t) {
        for (var e = this.data.list, a = t.currentTarget.dataset.index, s = t.currentTarget.dataset.id, n = t.currentTarget.dataset.num, i = t.currentTarget.dataset.interest, r = parseFloat(this.data.totalfuzhi), o = this.data.order_list, c = 0; c < e.length; c++) e[c].checked = !1;
        e[a].checked = !0;
        var d, l = (r / n).toFixed(2), u = (r * i).toFixed(2);
        null != o[2] ? (o.splice(2, 1), (d = {
            name: "账单分期单期金额"
        }).num = "1共" + n + "期", d.mprice = "(单价" + l + "+手续费" + u + ")") : ((d = {
            name: "账单分期单期金额"
        }).num = "1/" + n + "期", d.mprice = "(单期金额" + l + "+手续费" + u + ")");
        r = (parseFloat(l) + parseFloat(u)).toFixed(2), o.push(d), this.setData({
            list: e,
            fenqiid: s,
            total: r,
            order_list: o
        });
    },
    checked_refund2: function() {
        this.setData({
            fenqi: !this.data.fenqi
        });
    },
    checked_or_no: function(t) {
        var e = this.data.insurance, a = t.currentTarget.dataset.index;
        if (e[a].check) e[a].check = !1, this.setData({
            insurance: e
        }); else {
            for (var s = 0; s < e.length; s++) e[s].check = !1;
            e[a].check = !0, this.setData({
                insurance: e
            });
        }
    },
    checked_refund: function(t) {
        var e = this, a = t.currentTarget.dataset.index, s = e.data.Insurance, n = t.currentTarget.dataset.id, i = e.data.order_list, r = parseFloat(e.data.total), o = e.data.bxje, c = e.data.list;
        if (0 == i.length) wx.showToast({
            title: "请添加人数",
            image: "../../resource/icon/error.png"
        }); else {
            var d = e.data.crbx;
            if (0 == s[a].checked) {
                for (var l = 0; l < s.length; l++) s[l].checked = !1;
                if (null != i[1]) {
                    if (null != i[2]) {
                        i.splice(1, 2);
                        for (l = 0; l < c.length; l++) c[l].checked = !1;
                    } else i.splice(1, 1);
                    s[a].checked = !0, d.name = s[a].title, d.mprice = s[a].price, d.num = i[0].num, 
                    i.push(d);
                } else s[a].checked = !0, d.name = s[a].title, d.mprice = s[a].price, d.num = i[0].num, 
                i.push(d);
            } else {
                s[a].checked = !1, 3 == i.length ? i.splice(1, 2) : 2 == i.length && i.splice(1, 1);
                for (l = 0; l < c.length; l++) c[l].checked = !1;
            }
        }
        for (l = r = 0; l < i.length; l++) {
            var u = i[l];
            r += u.num * u.mprice;
        }
        e.setData({
            Insurance: s,
            order_list: i,
            crbx: d,
            total: r.toFixed(2),
            totalfuzhi: r,
            bxje: o,
            list: c,
            baoxianid: n
        });
    },
    look_detail: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.insurance[e];
        this.setData({
            insurance_modal: !this.data.insurance_modal,
            insurance_mess: a
        });
    },
    look_detail2: function(t) {
        var e = this.data.insurance_refund, a = t.currentTarget.dataset.id;
        this.getInsuranceInfo(a), this.setData({
            insurance_modal: !this.data.insurance_modal,
            insurance_mess: e
        });
    },
    click_btn: function() {
        wx.showToast({
            title: "请选择出发日期",
            image: "../../resource/icon/error.png",
            duration: 1e3
        });
    },
    close_insurance: function() {
        this.setData({
            insurance_modal: !this.data.insurance_modal
        });
    },
    look_order: function() {
        this.setData({
            order_detail: !this.data.order_detail,
            dingdan: !this.data.dingdan
        });
    },
    sub: function(t) {
        for (var e = t.currentTarget.dataset.index, a = this.data.flname, s = this.data.Insurance, n = 0; n < s.length; n++) s[n].checked = !1;
        var i = this.data.list;
        for (n = 0; n < i.length; n++) i[n].checked = !1;
        if (0 < a[e].num) {
            a[e].num--;
            var r = 0;
            a[e].total = a[e].mprice * a[e].num;
            for (n = 0; n < a.length; n++) r += a[n].total;
            this.setData({
                flname: a,
                order_list: a,
                total: r,
                totalfuzhi: r
            });
        } else 0 == a[e].num && (a[e].num = 0, this.setData({
            flname: a
        }));
        this.setData({
            list: i,
            Insurance: s
        });
    },
    add: function(t) {
        for (var e = t.currentTarget.dataset.index, a = this.data.flname, s = this.data.NumberMan, n = s.Max_num - s.yy_num, i = this.data.Insurance, r = 0; r < i.length; r++) i[r].checked = !1;
        var o = this.data.list;
        for (r = 0; r < o.length; r++) o[r].checked = !1;
        n > a[e].num ? a[e].num++ : wx.showToast({
            title: "当天人数已上限",
            image: "../../resource/icon/error.png"
        });
        this.data.total;
        var c = 0;
        a[e].total = a[e].mprice * a[e].num;
        for (r = 0; r < a.length; r++) c += a[r].total;
        this.setData({
            flname: a,
            order_list: a,
            total: c,
            totalfuzhi: c,
            list: o,
            Insurance: i
        });
    },
    formSubmit: function(t) {
        var e = this.data.member, a = t.detail.value, s = this.data.receiving_info;
        console.log(s);
        var n = this.data.choose_date;
        if ("" == s || null == s) wx.showToast({
            title: "请填写收货地址",
            image: "../../resource/icon/error.png",
            duration: 1500
        }); else if (null == e || "" == e) wx.showToast({
            title: "请完善个人信息",
            image: "../../resource/icon/error.png",
            duration: 1500
        }), setTimeout(function() {
            wx.redirectTo({
                url: "/tourism_page/detail/amend/amend"
            });
        }, 1500); else if ("" == a.name) wx.showToast({
            title: "姓名不能为空",
            image: "../../resource/icon/error.png",
            duration: 1500
        }); else if ("" == a.tel) wx.showToast({
            title: "电话不能为空",
            image: "../../resource/icon/error.png",
            duration: 1500
        }); else if (this.data.total == 0) wx.showToast({
            title: "请先添加人数",
            image: "../../resource/icon/error.png",
            duration: 1500
        }); else if (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(a.tel)) {
            var i = t.detail.value, r = wx.getStorageSync("openid");
            t.detail.formId;
            app.util.request({
                url: "entry/wxapp/Payorder",
                data: {
                    openid: r,
                    scenicspot: i.scenicspot,
                    baoxian: i.baoxian,
                    price: i.price,
                    xd_name: i.name,
                    go_date: n,
                    xd_phone: i.tel,
                    total: i.total,
                    num: i.num,
                    receiving_id: s.id
                },
                success: function(t) {
                    if (1 == t.data.data.status) {
                        var e = t.data.data.order_id;
                        wx.showModal({
                            title: "提示",
                            content: " 确认支付么？ ",
                            success: function(t) {
                                t.confirm ? "微信支付" == i.z_style && app.util.request({
                                    url: "entry/wxapp/Pay",
                                    data: {
                                        openid: r,
                                        total: i.total
                                    },
                                    header: {
                                        "Content-Type": "application/json"
                                    },
                                    success: function(t) {
                                        wx.requestPayment({
                                            timeStamp: t.data.timeStamp,
                                            nonceStr: t.data.nonceStr,
                                            package: t.data.package,
                                            signType: t.data.signType,
                                            paySign: t.data.paySign,
                                            success: function(t) {
                                              console.log('r=='+r+'----e=='+e);
                                                app.util.request({
                                                    url: "entry/wxapp/PayInorder",
                                                    data: {
                                                        openid: r,
                                                        id: e
                                                    },
                                                    success: function(t1) {
                                                      console.log(t1);
                                                        if (1 == t1.data.data.status) {
                                                            var e = t1.data.data.time, a = t1.data.data.type;
                                                            wx.showToast({
                                                                title: "下单成功"
                                                            }), setTimeout(function() {
                                                                wx.redirectTo({
                                                                    url: "/tourism_page/success/success?time=" + e + "&type=" + a
                                                                });
                                                            }, 1500);
                                                        } else wx.showModal({
                                                            title: "下单失败",
                                                            content: "请联系客服！",
                                                            showCancel: !1
                                                        });
                                                    },
                                                    fail: function(t) {
                                                        wx.showToast({
                                                            title: "支付失败",
                                                            duration: 1e3
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    },
                                    fail: function(t) {}
                                }) : t.cancel;
                            }
                        });
                    } else wx.showModal({
                        title: "下单失败",
                        content: "请联系客服！",
                        showCancel: !1
                    });
                }
            });
        } else wx.showToast({
            title: "电话不正确",
            image: "../../resource/icon/error.png",
            duration: 1500
        });
    },
    getThisMonthDays: function(t, e) {
        return new Date(t, e, 0).getDate();
    },
    getFirstDayOfWeek: function(t, e) {
        return new Date(Date.UTC(t, e - 1, 1)).getDay();
    },
    calculateEmptyGrids: function(t, e) {
        var a = this.getFirstDayOfWeek(t, e), s = [];
        if (0 < a) {
            for (var n = 0; n < a; n++) s.push(n);
            this.setData({
                hasEmptyGrid: !0,
                empytGrids: s
            });
        } else this.setData({
            hasEmptyGrid: !1,
            empytGrids: []
        });
    },
    calculateDays: function(t, e) {
        for (var a = [], s = this.getThisMonthDays(t, e), n = 1; n <= s; n++) a.push({
            day: n,
            choosed: !1
        });
        this.setData({
            days: a
        });
    },
    handleCalendar: function(t) {
        var e = this.data.pricearr, a = [], s = t.currentTarget.dataset.handle, n = this.data.cur_year, i = this.data.cur_month;
        if ("prev" === s) {
            var r = i - 1, o = n;
            r < 1 && (o = n - 1, r = 12);
            for (var c = 0; c < e.length; c++) e[c][0].dateday.split("-")[0] == r && (e[c][0].day = e[c][0].dateday.split("-")[1], 
            e[c][0].choosed = !1, a.push(e[c][0]));
            console.log(r), this.calculateDays(o, r), this.calculateEmptyGrids(o, r), this.setData({
                cur_year: o,
                cur_month: r,
                cMonthData: a
            });
        } else {
            var d = i + 1, l = n;
            12 < d && (l = n + 1, d = 1);
            for (c = 0; c < e.length; c++) e[c][0].dateday.split("-")[0] == d && (e[c][0].day = e[c][0].dateday.split("-")[1], 
            e[c][0].choosed = !1, a.push(e[c][0]));
            this.calculateDays(l, d), this.calculateEmptyGrids(l, d), this.setData({
                cur_year: l,
                cur_month: d,
                cMonthData: a
            });
        }
    },
    tapDayItem: function(t) {
        var e = t.currentTarget.dataset.idx, a = 10 < t.currentTarget.dataset.shi ? t.currentTarget.dataset.shi : "0" + t.currentTarget.dataset.shi, s = (this.data.cMonthData, 
        this.data.days), n = new Date(), i = "" + n.getFullYear() + (10 < n.getMonth() + 1 ? n.getMonth() + 1 : "0" + (n.getMonth() + 1)) + (10 < n.getDate() ? n.getDate() : "0" + n.getDate()), r = 10 < this.data.cur_month ? this.data.cur_month : "0" + this.data.cur_month;
        if (i <= "" + this.data.cur_year + r + a) {
            for (var o = 0; o < s.length; o++) s[o].choosed = !1;
            s[e].choosed = !0;
            var c = this.data.cur_month < 10 ? "0" + this.data.cur_month : this.data.cur_month, d = t.currentTarget.dataset.shi < 10 ? "0" + t.currentTarget.dataset.shi : t.currentTarget.dataset.shi;
            this.setData({
                days: s,
                shi: t.currentTarget.dataset.shi,
                choose_date: this.data.cur_year + "-" + c + "-" + d
            });
            var l = this.data.choose_date.trim();
            if ("" == l) return;
            var u = "";
            switch (d = new Date(l).getDay()) {
              case 0:
                u = "星期日";
                break;

              case 1:
                u = "星期一";
                break;

              case 2:
                u = "星期二";
                break;

              case 3:
                u = "星期三";
                break;

              case 4:
                u = "星期四";
                break;

              case 5:
                u = "星期五";
                break;

              case 6:
                u = "星期六";
            }
            this.setData({
                week: u
            });
            var h = s[e].day, p = this.data.pricearr, g = this.data.flname, f = this.data.order_list;
            f = [];
            var m = this.data.list, _ = this.data.Insurance;
            for (o = 0; o < m.length; o++) m[o].checked = !1;
            for (o = 0; o < _.length; o++) _[o].checked = !1;
            for (o = 0; o < p.length; o++) {
                var y = p[o][0].dateday.split("-");
                if (c == y[0] && h == y[1]) {
                    for (var w = p[o], v = 0; v < w.length; v++) g[v].mprice = w[v].mprice, g[v].num = 0;
                    console.log(g), this.setData({
                        flname: g,
                        click: !0,
                        totalfuzhi: 0,
                        total: 0,
                        order_list: f,
                        Insurance: _,
                        list: m
                    });
                }
            }
            this.getNumberMan();
        } else wx.showModal({
            title: "温馨提示",
            content: "出行时间不能小于今天",
            showCancel: !1,
            confirmColor: "#289AF6"
        });
    },
    noPriceDay: function() {
        wx.showModal({
            title: "温馨提示",
            content: "该天没有旅行",
            showCancel: !1
        });
    },
    chooseYearAndMonth: function() {
        for (var t = this.data.cur_year, e = this.data.cur_month, a = [], s = [], n = 2010; n <= 2100; n++) a.push(n);
        for (var i = 1; i <= 12; i++) s.push(i);
        var r = a.indexOf(t), o = s.indexOf(e);
        this.setData({
            picker_value: [ r, o ],
            picker_year: a,
            picker_month: s,
            showPicker: !0
        });
    },
    pickerChange: function(t) {
        var e = t.detail.value;
        choose_year = this.data.picker_year[e[0]], choose_month = this.data.picker_month[e[1]];
    },
    tapPickerBtn: function(t) {
        var e = {
            showPicker: !1
        };
        "confirm" === t.currentTarget.dataset.type && (e.cur_year = choose_year, e.cur_month = choose_month, 
        this.calculateEmptyGrids(choose_year, choose_month), this.calculateDays(choose_year, choose_month)), 
        this.setData(e);
    },
    onReady: function() {
        this.getMemberxq(), this.getTitle();
    },
    getMemberxq: function() {
        var a = this, t = wx.getStorageSync("openid");
        console.log(t), app.util.request({
            url: "entry/wxapp/Memberxq",
            cachetime: "30",
            data: {
                openid: t
            },
            success: function(t) {
                var e = t.data.data.phone;
                a.setData({
                    member: e
                });
            },
            fail: function(t) {}
        });
    },
    getScenicspot: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/Scenicspot",
            data: {
                id: t
            },
            success: function(t) {
                var e = t.data.data;
                console.log(e), a.setData({
                    scenicspot: e
                });
            },
            fail: function(t) {}
        });
    },
    getTitle: function() {
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
    },
    getNumberMan: function(t) {
        var e = this, a = e.data.choose_date;
        t = e.options.id;
        console.log(t), app.util.request({
            url: "entry/wxapp/NumberMan",
            data: {
                id: t,
                time: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    NumberMan: t.data.data
                });
            },
            fail: function(t) {}
        });
    },
    getPlaceOrders: function(t) {
        var h = this;
        app.util.request({
            url: "entry/wxapp/PlaceOrders",
            cachetime: "30",
            data: {
                id: t
            },
            success: function(t) {
                var e = t.data.data[0];
                console.log(t);
                for (var a = 0; a < e.length; a++) {
                    var s = e[a];
                    s.num = 0, s.total = 0;
                }
                var n = t.data.data, i = (h.data.flname, h.data.days), r = new Date(), o = r.getMonth() + 1, c = [], d = r.getDate(), l = wx.getStorageSync("sele_day"), u = wx.getStorageSync("sele_month");
                o != u ? o = u : o <= 9 && (o = "0" + o);
                for (a = 0; a < n.length; a++) n[a][0].dateday.split("-")[0] == o && (n[a][0].day = n[a][0].dateday.split("-")[1], 
                n[a][0].choosed = !1, c.push(n[a][0]));
                l && o == r.getMonth() + 1 ? (i[l - 1].choosed = !0, e[0].mprice = c[l - d].mprice) : (i[l - 1].choosed = !0, 
                e[0].mprice = c[l - 1].mprice), h.setData({
                    pricearr: n,
                    flname: e,
                    cMonthData: c,
                    days: i
                });
            },
            fail: function(t) {}
        });
    },
    getInsurance: function(t) {
        var s = this;
        app.util.request({
            url: "entry/wxapp/Insurance",
            cachetime: "30",
            data: {
                id: t
            },
            success: function(t) {
                for (var e = t.data.data, a = 0; a < e.length; a++) {
                    e[a].checked = !1;
                }
                s.setData({
                    Insurance: e
                });
            },
            fail: function(t) {}
        });
    },
    getInsuranceInfo: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/InsuranceInfo",
            cachetime: "30",
            data: {
                id: t
            },
            success: function(t) {
                e.setData({
                    InsuranceInfo: t.data.data
                }), WxParse.wxParse("text", "html", t.data.data.text, e, 5);
            },
            fail: function(t) {}
        });
    },
    getInstallmentInfo: function(t) {
        var s = this;
        app.util.request({
            url: "entry/wxapp/InstallmentInfo",
            cachetime: "30",
            data: {
                id: t
            },
            success: function(t) {
                for (var e = t.data.data, a = 0; a < e.length; a++) {
                    e[a].checked = !1;
                }
                s.setData({
                    InstallmentInfo: e,
                    list: e
                });
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
        return {
            title: "小程序日历",
            desc: "还是新鲜的日历哟",
            path: "pages/index/index"
        };
    },
    go_address: function() {
        var t = this.options.id;
        this.data.receiving_info ? wx.navigateTo({
            url: "../shippingAddress/shippingAddress?id=" + t + "&pt_order=" + !0
        }) : wx.navigateTo({
            url: "../../detail/shippingAddress/shippingAddress?id=" + t + "&pt_order=" + !0 + "&no_A=true"
        });
    }
};

Page(conf);
var WxParse = require("../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {
        insurance_price: 0,
        insurance_id: 0
    },
    onLoad: function(t) {
        console.log(t);
        var a = t.id;
        t.sum && this.setData({
            order_sum: t.sum
        }), this.getMyActiveInfo(a);
    },
    people_info: function(t) {
        var a = t.currentTarget.dataset.type, e = t.detail.value;
        "name" == a ? (this.setData({
            people_name: e
        }), console.log(e)) : "tel" == a && (this.setData({
            people_tel: e
        }), console.log(e));
    },
    getMyActiveInfo: function(t) {
        var i = this, a = i.options.type, n = this.data.order_sum, e = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyActiveInfo",
            data: {
                id: t,
                openid: e,
                type: a
            },
            success: function(t) {
                console.log(t);
                for (var a = t.data.data.insurance, e = 0; e < a.length; e++) a[e].checked = !1;
                n ? (t.data.data.oneself_price = Number(t.data.data.oneself_price), t.data.data.newTotal = Number(t.data.data.oneself_price) * n) : (t.data.data.total = Number(t.data.data.total), 
                t.data.data.newTotal = Number(t.data.data.total)), i.setData({
                    ActiveInfo: t.data.data,
                    receiving_info: t.data.data.receiving_info,
                    radio_arr: a
                });
            }
        });
    },
    radioChange: function(t) {
        for (var a = t.detail.value, e = this.data.insurance_id, i = this.data.insurance_price, n = this.data.radio_arr, o = this.data.ActiveInfo, s = this.data.order_sum, r = 0; r < n.length; r++) -1 !== a.indexOf(n[r].title) ? (n[r].checked = !0, 
        e = n[r].id, o.newTotal = s ? (Number(o.oneself_price) + Number(n[r].price)).toFixed(2) * s : (o.total + Number(n[r].price)).toFixed(2), 
        i = Number(n[r].price)) : n[r].checked = !1;
        this.setData({
            radio_arr: n,
            ActiveInfo: o
        }), e ? this.setData({
            insurance_id: e,
            insurance_price: i
        }) : this.setData({
            insurance_id: 0,
            insurance_price: 0
        });
    },
    show_tip: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/insurance_info",
            data: {
                id: e
            },
            success: function(t) {
                console.log(t), a.setData({
                    insurance_info: t.data.data,
                    show_tip: !0
                }), WxParse.wxParse("infomation", "html", t.data.data.text, a, 5);
            }
        });
    },
    hide_tip: function() {
        this.setData({
            show_tip: !1
        });
    },
    hide_checked: function(t) {
        var a = t.currentTarget.dataset.idx, e = this.data.radio_arr, i = this.data.ActiveInfo, n = this.data.order_sum;
        e[a].checked = !1, i.newTotal = n ? i.oneself_price * n : i.total, this.setData({
            radio_arr: e,
            insurance_price: 0,
            insurance_id: 0,
            ActiveInfo: i
        });
    },
    nowPay: function() {
        var i = this, t = i.data.address_arr, a = i.data.receiving_info, e = i.data.ActiveInfo, n = this.data.order_sum, o = this.data.people_name, s = this.data.people_tel, r = this.data.insurance_id, c = this.data.insurance_price, d = wx.getStorageSync("openid"), u = i.options.join;
        if (1 == e.active_type ? 3 : 2 == e.active_type && 4, o && s) {
            if (o && !/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(s)) wx.showModal({
                title: "下单失败",
                content: "请填写正确的联系人电话！",
                showCancel: !1
            }); else if (o && s) if (t || a) {
                if (n) {
                    var p = i.options.id;
                    wx.showModal({
                        title: "提示",
                        content: " 确认支付么？ ",
                        success: function(t) {
                            t.confirm ? app.util.request({
                                url: "entry/wxapp/Pay",
                                data: {
                                    openid: d,
                                    total: e.newTotal
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
                                            app.util.request({
                                                url: "entry/wxapp/SinglePurchase",
                                                data: {
                                                    id: p,
                                                    openid: d,
                                                    order_sum: n,
                                                    people_name: o,
                                                    people_tel: s,
                                                    insurance_id: r,
                                                    insurance_price: c,
                                                    receiving_id: a.id,
                                                    total: e.newTotal
                                                },
                                                success: function(t) {
                                                    1 == t.data.data.status ? (wx.showToast({
                                                        title: "下单成功",
                                                        duration: 1e3
                                                    }), setTimeout(function() {
                                                        wx.navigateTo({
                                                            url: "/tourism_page/detail/order_detail/order_detail?id=" + e.id
                                                        });
                                                    }, 1500)) : wx.showModal({
                                                        title: "开团失败",
                                                        content: "请联系客服人员",
                                                        showCancel: !1,
                                                        success: function(t) {
                                                            t.confirm && wx.reLaunch({
                                                                url: "../../index/index"
                                                            });
                                                        }
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
                } else if (1 == u) {
                    var l = i.options.sponsor_id;
                    e.now_price;
                    wx.showModal({
                        title: "提示",
                        content: " 确认付费参团吗？ ",
                        success: function(t) {
                            t.confirm ? app.util.request({
                                url: "entry/wxapp/Pay",
                                data: {
                                    openid: d,
                                    total: e.newTotal
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
                                            app.util.request({
                                                url: "entry/wxapp/GroupJoinPay",
                                                data: {
                                                    sponsor_id: l,
                                                    openid: d,
                                                    id: p,
                                                    total: e.newTotal,
                                                    active_total: e.total,
                                                    people_name: o,
                                                    people_tel: s,
                                                    insurance_id: r,
                                                    insurance_price: c,
                                                    receiving_id: a.id
                                                },
                                                success: function(t) {
                                                    console.log(t), 1 == t.data.data.status ? (wx.showToast({
                                                        title: "参团成功",
                                                        duration: 1e3
                                                    }), setTimeout(function() {
                                                        wx.navigateTo({
                                                            url: "../myTeamwork/teamworkStatus/teamworkStatus?sponsor_id=" + l
                                                        });
                                                    }, 1500)) : wx.showModal({
                                                        title: "开团失败",
                                                        content: "请联系客服人员",
                                                        showCancel: !1,
                                                        success: function(t) {
                                                            t.confirm && wx.reLaunch({
                                                                url: "../../index/index"
                                                            });
                                                        }
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
                } else if (0 == u) {
                    p = i.options.id;
                    wx.showModal({
                        title: "提示",
                        content: " 确认支付么？ ",
                        success: function(t) {
                            t.confirm ? app.util.request({
                                url: "entry/wxapp/Pay",
                                data: {
                                    openid: d,
                                    total: e.newTotal
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
                                            app.util.request({
                                                url: "entry/wxapp/GroupCreatePay",
                                                data: {
                                                    id: p,
                                                    openid: d,
                                                    total: e.newTotal,
                                                    active_total: e.total,
                                                    people_name: o,
                                                    people_tel: s,
                                                    insurance_id: r,
                                                    insurance_price: c,
                                                    receiving_id: a.id
                                                },
                                                success: function(t) {
                                                    console.log(t), 1 == t.data.data.status ? (wx.showToast({
                                                        title: "开团成功",
                                                        duration: 1e3
                                                    }), setTimeout(function() {
                                                        wx.navigateTo({
                                                            url: "../myTeamwork/teamworkStatus/teamworkStatus?sponsor_id=" + t.data.data.sponsor_id
                                                        });
                                                    }, 1500)) : wx.showModal({
                                                        title: "开团失败",
                                                        content: "请联系客服人员",
                                                        showCancel: !1,
                                                        success: function(t) {
                                                            t.confirm && wx.reLaunch({
                                                                url: "../../index/index"
                                                            });
                                                        }
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
                }
            } else wx.showModal({
                title: "支付失败",
                content: "收货地址不能为空",
                showCancel: !1,
                success: function(t) {
                    if (t.confirm) {
                        var a = i.options.id, e = i.options.type;
                        wx.navigateTo({
                            url: "../../detail/shippingAddress/shippingAddress?id=" + a + "&type=" + e
                        });
                    }
                }
            });
        } else wx.showModal({
            title: "下单失败",
            content: "请填写联系人信息！",
            showCancel: !1
        });
    },
    makeCall: function() {
        app.util.request({
            url: "entry/wxapp/Kftel",
            success: function(t) {
                wx.makePhoneCall({
                    phoneNumber: t.data.data.tel
                });
            }
        });
    },
    onShow: function() {
        this.data.address_arr && this.setData({
            receiving_info: this.data.address_arr
        });
    },
    goAddress: function() {
        var t = this.options.id, a = this.options.type;
        this.data.receiving_info ? wx.navigateTo({
            url: "../../detail/shippingAddress/shippingAddress?id=" + t + "&type=" + a
        }) : wx.navigateTo({
            url: "../../detail/shippingAddress/shippingAddress?id=" + t + "&type=" + a + "&no_A=true"
        });
    },
    getContact: function(t) {
        console.log(t);
    }
});
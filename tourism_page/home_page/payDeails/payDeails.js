var WxParse = require("../../wxParse/wxParse.js"), app = getApp();

Page({
    data: {
        insurance_price: 0,
        insurance_id: 0
    },
    onLoad: function(t) {
        var a = t.id;
        this.getMyActiveInfo(a);
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
        var i = this, a = i.options.type, e = wx.getStorageSync("openid");
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
                t.data.data.total = Number(t.data.data.total), i.setData({
                    ActiveInfo: t.data.data,
                    receiving_info: t.data.data.receiving_info,
                    radio_arr: a
                });
            }
        });
    },
    radioChange: function(t) {
        for (var a = t.detail.value, e = this.data.insurance_id, i = this.data.insurance_price, n = this.data.radio_arr, o = this.data.ActiveInfo, s = 0; s < n.length; s++) -1 !== a.indexOf(n[s].title) ? (n[s].checked = !0, 
        e = n[s].id, o.newTotal = (o.total + Number(n[s].price)).toFixed(2), i = Number(n[s].price)) : n[s].checked = !1;
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
        var a = t.currentTarget.dataset.idx, e = this.data.radio_arr, i = this.data.ActiveInfo;
        e[a].checked = !1, i.newTotal = i.total, this.setData({
            radio_arr: e,
            insurance_price: 0,
            insurance_id: 0,
            ActiveInfo: i
        });
    },
    nowPay: function() {
        var i = this, t = i.data.address_arr, a = i.data.receiving_info, e = i.data.ActiveInfo, n = this.data.people_name, o = this.data.people_tel, s = this.data.insurance_id, d = this.data.insurance_price, r = wx.getStorageSync("openid"), c = 1, l = i.options.paystatus;
        1 == e.active_type ? c = 3 : 2 == e.active_type && (c = 4), n && o ? n && !/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(o) ? wx.showModal({
            title: "下单失败",
            content: "请填写正确的联系人电话！",
            showCancel: !1
        }) : n && o && (t || a ? app.util.request({
            url: "entry/wxapp/NewActiveOrder",
            data: {
                openid: r,
                type: e.active_type,
                active_id: e.active_id,
                receiving_id: a.id,
                sponsor_id: e.id,
                total: e.newTotal ? e.newTotal : e.total,
                active_total: e.total,
                people_name: n,
                people_tel: o,
                insurance_id: s,
                insurance_price: d,
                paystatus: l
            },
            success: function(t) {
                if (console.log(t), 1 == t.data.data.status) {
                    if (1 == l) var a = i.options.order_id; else a = t.data.data.order_id;
                    console.log(a), console.log('newTotal=' + e.newTotal), 
                    // 0 == e.newTotal ? 
                    // app.util.request({
                    //     url: "entry/wxapp/PayActiveOrder",
                    //     data: {
                    //         order_id: a
                    //     },
                    //     success: function(t) {
                    //         console.log('sssss')
                    //         console.log(t), 1 == t.data.data && (i.setData({
                    //             s_order: !0
                    //         }), wx.showToast({
                    //             title: "下单成功",
                    //             duration: 1e3
                    //         }), setTimeout(function() {
                    //             wx.redirectTo({
                    //                 url: "/tourism_page/detail/order_detail/order_detail?id=" + a + "&types=" + c
                    //             });
                    //         }, 1500));
                    //     }
                    // }) 
                    //  0 == e.newTotal ? '' : 0 < e.newTotal && wx.showModal({
                    console.log("e.id="+a)
                    wx.showModal({
                        title: "提示",
                        content: " 确认支付么？ ",
                        success: function(t) {
                            t.confirm ? (console.log(a), app.util.request({
                                url: "entry/wxapp/Pay",
                                data: {
                                    openid: r,
                                    total: e.newTotal ? e.newTotal : e.total
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
                                                url: "entry/wxapp/PayActiveOrder",
                                                data: {
                                                    order_id: a
                                                },
                                                success: function(t) {
                                                    console.log(t), 1 == t.data.data ? (wx.showToast({
                                                        title: "支付成功",
                                                        duration: 1e3
                                                    }), setTimeout(function() {
                                                        wx.redirectTo({
                                                            url: "/tourism_page/detail/order_detail/order_detail?id=" + a + "&types=3"
                                                        });
                                                    }, 1500)) : -2 == t.data.data ? wx.showModal({
                                                        title: "支付失败",
                                                        content: "活动数量已售空",
                                                        showCancel: !1,
                                                        success: function(t) {
                                                            t.confirm && wx.reLaunch({
                                                                url: "../../index/index"
                                                            });
                                                        }
                                                    }) : -3 == t.data.data ? wx.showModal({
                                                        title: "支付失败",
                                                        content: "活动已过期或者不存在",
                                                        showCancel: !1,
                                                        success: function(t) {
                                                            t.confirm && wx.reLaunch({
                                                                url: "../../index/index"
                                                            });
                                                        }
                                                    }) : -1 == t.data.data && wx.showModal({
                                                        title: "支付失败",
                                                        content: "支付异常，请联系管理员",
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
                            })) : t.cancel;
                        }
                    });
                } else -2 == t.data.data.status ? wx.showModal({
                    title: "下单失败",
                    content: "该活动活动数量已售空",
                    showCancel: !1
                }) : -3 == t.data.data.status ? wx.showModal({
                    title: "下单失败",
                    content: "活动已过期或者不存在",
                    showCancel: !1
                }) : -4 == t.data.data.status && wx.showModal({
                    title: "下单失败",
                    content: "该活动已下单,不可重复下单,",
                    showCancel: !1,
                    success: function(t) {
                        wx.navigateTo({
                            url: "../myBargain/myBargain?nav=-1"
                        });
                    }
                });
            }
        }) : wx.showModal({
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
        })) : wx.showModal({
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
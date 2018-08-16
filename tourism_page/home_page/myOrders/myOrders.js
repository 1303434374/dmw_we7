var app = getApp();

Page({
    data: {
        currentTit: 0,
        showFilter: !1,
        currentFilter: 0,
        titArr: [ "全部", "待付款", "待核销", "已出发", "待评价", "已结束" ]
    },
    onLoad: function(t) {
      var a = wx.getStorageSync("openid");
      if ("" == a || null == a) {
        a = app.globalData.openid;
      }
      "" == a || null == a ? this.gotologin() : console.log('已经授权');
    },
    onReady: function() {
        this.getlanmu(), this.getMyOrderList();
    },
  //触发登录，跳转
  gotologin: function () {
    wx.navigateTo({
      url: '../../login/login'
    })
  },
    getlanmu: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/OrderLanmu",
            success: function(t) {
                console.log(t), e.setData({
                    sortList: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getMyOrderList: function() {
        var e = this, t = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyOrderList",
            data: {
                openid: t
            },
            success: function(t) {
                console.log(t), e.setData({
                    MyOrderList: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onShow: function() {},
    changeCurrentTit: function(t) {
        var e = this, a = wx.getStorageSync("openid"), r = t.currentTarget.dataset.id;
        console.log(r), app.util.request({
            url: "entry/wxapp/MyOrderList",
            data: {
                condition: r,
                openid: a
            },
            success: function(t) {
                console.log(t), e.setData({
                    currentTit: r,
                    MyOrderList: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    changeCurrentFilter: function(t) {
        this.setData({
            currentFilter: t.target.dataset.id
        });
    },
    showFilter: function() {
        0 == this.data.showFilter ? this.setData({
            showFilter: !0
        }) : this.setData({
            showFilter: !1
        });
    },
    goEvaluation: function(t) {
        var e = t.currentTarget.dataset.order_type, a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../evaluation/evaluation?id=" + a + "&order_type=" + e
        });
    },
    goWriteOff: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.order_type;
        1 == a ? wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + e + "&types=" + a
        }) : 2 == a && wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + e + "&types=" + a
        });
    },
    goHotplaceDetail: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.order_type;
        1 == a ? wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + e + "&types=" + a
        }) : 2 == a && wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + e + "&types=" + a
        });
    },
    fail_order: function(t) {
        var e = t.currentTarget.dataset.order_type, a = t.currentTarget.dataset.id, r = t.currentTarget.dataset.idx, o = this.data.MyOrderList;
        console.log(e, a);
        var n = this;
        wx.showModal({
            title: "订单状态",
            content: "确认取消订单吗?",
            success: function(t) {
                t.confirm ? (app.util.request({
                    url: "entry/wxapp/MyOrderdel",
                    data: {
                        id: a,
                        order_type: e
                    },
                    success: function(t) {
                        console.log(t), 1 == t.data.data ? (o.splice(r, 1), n.setData({
                            MyOrderList: o
                        }), wx.showToast({
                            title: "取消成功"
                        })) : wx.showModal({
                            title: "取消失败",
                            content: "请联系客服人员！",
                            showCancel: !1
                        });
                    }
                }), console.log("已取消订单")) : t.cancel;
            }
        });
    },
    goPay: function(t) {
        var e = t.currentTarget.dataset.order_type, a = t.currentTarget.dataset.id, r = wx.getStorageSync("openid");
        console.log(e, a), app.util.request({
            url: "entry/wxapp/MyPtOrderInfo",
            data: {
                id: a,
                order_type: e
            },
            success: function(t) {
                if (console.log(t), 1 == t.data.data.status) {
                    var e = t.data.data.data;
                    wx.showModal({
                        title: "提示",
                        content: " 确认支付么？ ",
                        success: function(t) {
                            t.confirm ? app.util.request({
                                url: "entry/wxapp/Pay",
                                data: {
                                    openid: r,
                                    total: e.total
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
                                                url: "entry/wxapp/PayInorder",
                                                data: {
                                                    id: a,
                                                    openid: r
                                                },
                                                success: function(t) {
                                                    if (console.log(t), 1 == t.data.data.status) {
                                                        var e = t.data.data.time, a = t.data.data.type;
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
                }
            }
        });
    },
    del: function(t) {
        var e = t.currentTarget.dataset.order_type, a = t.currentTarget.dataset.idx, r = t.currentTarget.dataset.id, o = this.data.MyOrderList;
        console.log(e, r);
        var n = this;
        wx.showModal({
            title: "订单状态",
            content: "确认删除订单吗?",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/MyOrderdel",
                    data: {
                        id: r,
                        order_type: e
                    },
                    success: function(t) {
                        console.log(t), 1 == t.data.data ? (wx.showToast({
                            title: "删除成功",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.splice(a, 1), console.log(o), n.setData({
                                MyOrderList: o
                            });
                        }, 1e3)) : wx.showModal({
                            title: "删除失败",
                            content: "请联系客服人员！",
                            showCancel: !1
                        });
                    }
                });
            }
        });
    }
});
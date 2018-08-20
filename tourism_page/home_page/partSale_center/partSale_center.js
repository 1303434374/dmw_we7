var app = getApp();

Page({
    data: {
        show_options: !1,
        show_poster: !1,
        show_model: !1
    },
    onLoad: function(t) {
        var o = wx.getStorageSync("openid");
        this.getmemberinfo(o), this.MyAllNum(o);
    },
    getmemberinfo: function(t) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Fxmember",
            data: {
                openid: t
            },
            success: function(t) {
                console.log(t), o.setData({
                    MemberInfo: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    MyAllNum: function(t) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/MyAllNum",
            data: {
                openid: t
            },
            success: function(t) {
                console.log(t), o.setData({
                    MyDownNum: t.data.data.MyDownNum,
                    MyOrderNum: t.data.data.MyOrderNum
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    go_outline: function() {
        wx.navigateTo({
            url: "../myUnderling/myUnderling"
        });
    },
    go_partSalesorder: function() {
        wx.navigateTo({
            url: "../partSalesOrders/partSalesOrders"
        });
    },
    show_poster: function() {
        var t = this.data.show_poster;
        0 == t ? this.setData({
            show_poster: !0
        }) : this.setData({
            show_poster: !1
        });
    },
    show_options: function() {
        var t = this.data.show_options;
        0 == t ? this.setData({
            show_options: !0
        }) : this.setData({
            show_options: !1
        });
    },
    save_poster: function() {
        var t = this.data.MemberInfo.My_poster, o = this;
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
                            o.setData({
                                show_options: !1,
                                show_poster: !1
                            });
                        }, 1e3);
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            }
        });
    },
    get_price: function(t) {
        this.setData({
            val: t.detail.value
        });
    },
    tx_price: function() {
        var o = Number(this.data.val), e = Number(this.data.MemberInfo.remaining), t = wx.getStorageSync("openid"), a = this;
        e < o ? wx.showModal({
            title: "金币提现",
            content: "金币不足",
            showCancel: !1
        }) 
        // : o < 1 ? wx.showModal({
        //     title: "金币提现",
        //     content: "金币不能小于1元",
        //     showCancel: !1
        // }) 
        : 
        app.util.request({
            url: "entry/wxapp/WithdrawDeposit",
            data: {
                openid: t,
                total: o
            },
            success: function(t) {
                console.log(t), 1 == t.data.data ? (wx.showToast({
                    title: "提现申请成功！",
                    duration: 1e3
                }), setTimeout(function() {
                    a.data.MemberInfo.remaining = e - o + ".00", a.setData({
                        show_model: !1,
                        MemberInfo: a.data.MemberInfo
                    });
                }, 1e3)) : -2 == t.data.data ? wx.showModal({
                    title: "提现申请失败",
                    content: "提现金额不得小于 1 元",
                    showCancel: !1
                }) : wx.showModal({
                    title: "提现申请失败",
                    content: "请联系客服",
                    showCancel: !1
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    show_model: function() {
        var t = this.data.show_model;
        0 == t ? this.setData({
            show_model: !0
        }) : this.setData({
            show_model: !1
        });
    },
    show_record: function() {
        wx.navigateTo({
            url: "price_record/price_record"
        });
    }
});
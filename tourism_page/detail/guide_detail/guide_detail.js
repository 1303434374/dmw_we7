var app = getApp(), WxParse = require("../../wxParse/wxParse.js");

Page({
    data: {
        jianjie: !0,
        person_mess: {
            picImg: "../../resource/images/picImg.jpg"
        }
    },
    call: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.tel
        });
    },
    jianjie: function() {
        this.setData({
            jianjie: !this.data.jianjie
        });
    },
    onLoad: function(e) {
        var t = e.id;
        this.getGuideDetail(t), this.getTitle();
    },
    getTitle: function() {
        app.util.request({
            url: "entry/wxapp/Title",
            cachetime: "30",
            success: function(e) {
                wx.setNavigationBarTitle({
                    title: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getGuideDetail: function(e) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/GuideDetail",
            data: {
                id: e
            },
            success: function(e) {
                console.log(e);
                var t = e.data.data;
                a.setData({
                    guide: t
                }), WxParse.wxParse("profile", "html", t.profile, a, 5);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    lijiyuyue: function(e) {
        var a = e.currentTarget.dataset.price, i = e.currentTarget.dataset.id;
        "" == this.data.member ? (wx.showToast({
            title: "请完善个人信息",
            image: "../../resource/icon/error.png",
            duration: 1500
        }), setTimeout(function() {
            wx.redirectTo({
                url: "/tourism_page/detail/amend/amend"
            });
        }, 1500)) : wx.showModal({
            title: "提示",
            content: " 确认支付么？ ",
            success: function(e) {
                if (e.confirm) {
                    var t = wx.getStorageSync("openid");
                    app.util.request({
                        url: "entry/wxapp/Pay",
                        data: {
                            openid: t,
                            total: a
                        },
                        header: {
                            "Content-Type": "application/json"
                        },
                        success: function(e) {
                            console.log(e), wx.requestPayment({
                                timeStamp: e.data.timeStamp,
                                nonceStr: e.data.nonceStr,
                                package: e.data.package,
                                signType: e.data.signType,
                                paySign: e.data.paySign,
                                success: function(e) {
                                    console.log(e), app.util.request({
                                        url: "entry/wxapp/guideorders",
                                        cachetime: "0",
                                        data: {
                                            openid: t,
                                            total: a,
                                            guideid: i
                                        },
                                        success: function(e) {
                                            if (console.log(e), 1 == e.data.data.status) {
                                                var t = e.data.data.time, a = e.data.data.type;
                                                console.log(a), console.log(t), wx.showToast({
                                                    title: "提交成功"
                                                }), setTimeout(function() {
                                                    wx.redirectTo({
                                                        url: "/tourism_page/success/success?time=" + t + "&type=" + a
                                                    });
                                                }, 1500);
                                            }
                                        },
                                        fail: function(e) {
                                            console.log(e.errMsg), wx.showToast({
                                                title: "支付失败",
                                                duration: 1e3
                                            });
                                        }
                                    });
                                }
                            });
                        },
                        fail: function(e) {
                            console.log(e);
                        }
                    });
                } else e.cancel && console.log("用户点击取消");
            }
        });
    },
    onReady: function() {
        this.getMemberxq();
    },
    getMemberxq: function() {
        var a = this, e = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/Memberxq",
            cachetime: "30",
            data: {
                openid: e
            },
            success: function(e) {
                var t = e.data.data.phone;
                console.log(t), a.setData({
                    member: t
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    go_jd: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../hotplace_detail/hotplace_detail?id=" + t
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    }
});
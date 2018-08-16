var app = getApp();

Page({
    data: {
        avatarUrl: "",
        nickName: "",
        send: !0,
        alreadySend: !1,
        second: 60,
        buttonType: "default",
        code: "",
        smscode: "",
        otherInfo: "",
        showCode: !1,
        showActionList: !1
    },
    onLoad: function(e) {
        e.address && this.setData({
            address: e.address
        });
    },
    onShareAppMessage: function(e) {
        return {
            title: "自定义转发标题",
            path: "/page/user?id=123",
            success: function(e) {},
            fail: function(e) {}
        };
    },
    formSubmit: function(e) {
        var t = e.detail.value, a = this.data.smscode, s = this.data.code;
        if ("" == t.name) wx.showToast({
            title: "姓名不能为空",
            image: "../../resource/icon/error.png",
            duration: 1500
        }); else if ("" == t.age) wx.showToast({
            title: "性别不能为空",
            image: "../../resource/icon/error.png",
            duration: 1500
        }); else if ("" == t.tel) wx.showToast({
            title: "电话不能为空",
            image: "../../resource/icon/error.png",
            duration: 1500
        }); else if (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(t.tel)) if ("" == t.yanzhengma) wx.showToast({
            title: "验证码不能为空",
            image: "../../resource/icon/error.png",
            duration: 1500
        }); else if (a != s) wx.showToast({
            title: "验证码有误",
            image: "../../resource/icon/error.png",
            duration: 1500
        }); else if ("" == t.Id_number) wx.showToast({
            title: "身份证号不能为空",
            image: "../../resource/icon/error.png",
            duration: 1500
        }); else {
            var o = wx.getStorageSync("openid");
            app.util.request({
                url: "entry/wxapp/MemberWs",
                data: {
                    dataa: t,
                    openid: o
                },
                success: function(e) {
                    console.log(e), 1 == e.data.data.status && (wx.showToast({
                        title: "修改成功",
                        duration: 3e3
                    }), wx.clearStorage(), wx.reLaunch({
                        url: "/tourism_page/home_page/home_page"
                    }));
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        } else wx.showToast({
            title: "电话不正确",
            image: "../../resource/icon/error.png",
            duration: 1500
        });
    },
    onReady: function() {
        this.getMemberxq();
    },
    getMemberxq: function() {
        var s = this, e = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/Memberxq",
            data: {
                openid: e
            },
            success: function(e) {
                var t = e.data.data;
                if (null != e.data.data.phone) {
                    var a = t.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                    t.phone = a;
                }
                s.setData({
                    member: t
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    showSendMsg: function() {
        this.data.alreadySend || this.setData({
            send: !0
        });
    },
    hideSendMsg: function() {
        this.setData({
            send: !1,
            disabled: !0,
            buttonType: "default"
        });
    },
    inputPhoneNum: function(e) {
        var t = e.detail.value;
        11 === t.length ? this.checkPhoneNum(t) && (this.setData({
            phoneNum: t
        }), console.log("phoneNum" + this.data.phoneNum), this.showSendMsg()) : (this.setData({
            phoneNum: ""
        }), this.hideSendMsg());
    },
    checkPhoneNum: function(e) {
        return !!/^1\d{10}$/.test(e) || (wx.showToast({
            title: "手机号不正确",
            image: "../images/error.png"
        }), !1);
    },
    sendMsg: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/SendSms",
            data: {
                tel: this.data.phoneNum
            },
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            success: function(e) {
                console.log(e), 1 == e.data.data.status && wx.showToast({
                    title: "验证码发送成功！",
                    icon: "success"
                }), t.setData({
                    smscode: e.data.data.code
                });
            }
        }), this.setData({
            alreadySend: !0,
            send: !1
        }), this.timer();
    },
    timer: function() {
        var s = this;
        new Promise(function(e, t) {
            var a = setInterval(function() {
                s.setData({
                    second: s.data.second - 1
                }), s.data.second <= 0 && (s.setData({
                    second: 60,
                    alreadySend: !1,
                    send: !0
                }), e(a));
            }, 1e3);
        }).then(function(e) {
            clearInterval(e);
        });
    },
    addCode: function(e) {
        console.log(e), this.setData({
            code: e.detail.value
        });
    },
    goShippingAddress: function() {
        wx.navigateTo({
            url: "../shippingAddress/shippingAddress"
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    showCode: function() {
        0 == this.data.showCode ? this.setData({
            showCode: !0
        }) : this.setData({
            showCode: !1
        });
    },
    showActionList: function() {
        0 == this.data.showActionList ? this.setData({
            showActionList: !0
        }) : this.setData({
            showActionList: !1
        });
    }
});
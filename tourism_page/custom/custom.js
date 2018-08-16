var app = getApp();

Page({
    data: {
        swiper: {
            indicatorDots: !0,
            autoplay: !0,
            interval: 3e3,
            duration: 500
        },
        region: [ "+" ],
        city: [],
        travel_way: [ "飞机", "火车", "自驾", "大巴" ],
        travel_way_sel: null,
        gender: [ {
            name: "男导游",
            image: "../resource/images/man_icon.png"
        }, {
            name: "女导游",
            image: "../resource/images/woman_icon.png"
        } ],
        gender_sel: null,
        pay_sel: null,
        form: null,
        tipcolor: !1,
        tel: "",
        choose_place: !1,
        sel_index: null,
        member: ""
    },
    bindRegionChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            region: e.detail.value
        });
    },
    bannerInto: function(e) {
        var t = e.currentTarget.dataset.id;
        console.log(t), wx.navigateTo({
            url: "../detail/hotplace_detail/hotplace_detail?id=" + t
        });
    },
    radioChange: function(e) {
        console.log("radio发生change事件，携带value值为：", e.detail.value), this.setData({
            travel_way_sel: e.detail.value
        });
    },
    radiogenderChange: function(e) {
        this.setData({
            gender_sel: e.detail.value
        });
    },
    inputTel: function(e) {
        "" == !e.detail.value && (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(e.detail.value) ? this.setData({
            tel: e.detail.value
        }) : this.setData({
            tel: "请输入正确的手机号",
            tipcolor: !0
        }));
    },
    inputTela: function(e) {
        this.setData({
            tel: "",
            tipcolor: !1
        });
    },
    radiopayChange: function(e) {
        this.setData({
            pay_sel: e.detail.value
        });
    },
    formSubmit: function(e) {
        var t = e.detail.value, a = this.data.member;
        e.detail.value;
        if (null == a || "" == a) wx.showToast({
            title: "请完善个人信息",
            image: "../resource/images/error.png",
            duration: 1500
        }), setTimeout(function() {
            wx.redirectTo({
                url: "/tourism_page/detail/amend/amend"
            });
        }, 1500); else if (0 == this.data.city.length) wx.showToast({
            title: "请选择旅游地",
            image: "../resource/images/error.png",
            duration: 2e3
        }); else if ("" == t.gender) wx.showToast({
            title: "请选择导游",
            image: "../resource/images/error.png",
            duration: 2e3
        }); else if ("" == t.travel_way) wx.showToast({
            title: "请选择出游方式",
            image: "../resource/images/error.png",
            duration: 2e3
        }); else if ("" == t.money) wx.showToast({
            title: "请输入预算金额",
            image: "../resource/images/error.png",
            duration: 2e3
        }); else if ("" == t.name) wx.showToast({
            title: "请输入姓名",
            image: "../resource/images/error.png",
            duration: 2e3
        }); else if ("" == t.tel) wx.showToast({
            title: "请输入联系方式",
            image: "../resource/images/error.png",
            duration: 2e3
        }); else {
            this.setData({
                form: e.detail.value
            });
            var n = e.detail.value;
            this.getCustomForm(n);
        }
    },
    addplace: function() {
        this.setData({
            choose_place: !0
        });
    },
    close_place: function(e) {
        this.setData({
            choose_place: !1
        });
    },
    choose_place: function(e) {
        var t = e.currentTarget.dataset.value, a = this.data.city;
        -1 == a.indexOf(t) ? a.push(t) : wx.showToast({
            title: "不可重复选择",
            image: "../resource/images/error.png",
            duration: 2e3
        }), this.setData({
            city: a
        }), this.close_place();
    },
    choose_index: function(e) {
        this.setData({
            sel_index: e.currentTarget.dataset.index
        }), console.log(e.currentTarget.dataset.index);
        var t = e.currentTarget.dataset.id;
        this.getAddressIn(t);
    },
    choose_all: function(e) {
        null == e.currentTarget.dataset.id && this.getAddressIn(), this.setData({
            sel_index: null
        });
    },
    onLoad: function(e) {},
    onReady: function() {
        this.getbanner(), this.getAddress(), this.getAddressIn(), this.getMemberxq();
    },
    getMemberxq: function() {
        var a = this, e = wx.getStorageSync("openid");
        console.log(e), app.util.request({
            url: "entry/wxapp/Memberxq",
            cachetime: "30",
            data: {
                openid: e
            },
            success: function(e) {
                var t = e.data.data.phone;
                a.setData({
                    member: t
                });
            },
            fail: function(e) {}
        });
    },
    getbanner: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/FindBanner",
            success: function(e) {
                t.setData({
                    banner: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getAddress: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Address",
            cachetime: "30",
            success: function(e) {
                t.setData({
                    Address: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getAddressIn: function(e) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/AddressIn",
            data: {
                id: e,
                private: 1
            },
            success: function(e) {
                t.setData({
                    AddressIn: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getCustomForm: function(e) {
        console.log(e);
        var t = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/CustomForm",
            data: {
                openid: t,
                form: e
            },
            success: function(e) {
                console.log(e), 1 == e.data.data.status && (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "/tourism_page/index/index"
                    });
                }, 1500));
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
var app = getApp();

Page({
    data: {
        imgList: 4,
        UpNickname: "",
        status: -1
    },
    onLoad: function(t) {
        // this.getTitle(), 
        this.getbanner(), this.getMyUphave();
    },
    getMyUphave: function() {
        var a = this, t = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyUphave",
            data: {
                openid: t
            },
            success: function(t) {
                // a.setData({
                //     status: t.data.data.status,
                //     UpNickname: t.data.data.nickname
                // });
            },
            fail: function(t) {
                console.log(t);
            }
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
    getbanner: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/FindBanner",
            success: function(t) {
                console.log(t), a.setData({
                    banner: t.data.data,
                    swiperIdx: t.data.data.length
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    bannerInto: function(t) {
        var a = t.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "../../detail/hotplace_detail/hotplace_detail?id=" + a
        });
    },
    partSales_info: function(t) {
        console.log(t.detail.value);
        var a = wx.getStorageSync("openid"), e = t.detail.value.invite_num, n = t.detail.value.name, o = t.detail.value.tel, i = t.detail.value.wx_num;
        n ? o ? /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(o) ? app.util.request({
            url: "entry/wxapp/Distributor",
            data: {
                invite_num: e,
                name: n,
                tel: o,
                wx_num: i,
                openid: a
            },
            success: function(t) {
                console.log(t), 1 == t.data.data ? (wx.showToast({
                    title: "申请成功！",
                    duration: 1e3
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "../home_page"
                    });
                }, 1e3)) : -2 == t.data.data ? wx.showModal({
                    title: "申请失败",
                    content: "已申请过，请耐心等待",
                    showCancel: !1
                }) : -3 == t.data.data ? wx.showModal({
                    title: "申请失败",
                    content: "请填写正确的邀请码",
                    showCancel: !1
                }) : wx.showModal({
                    content: "申请失败",
                    showCancel: !1
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }) : wx.showToast({
            title: "请正确填写手机号",
            image: "../../resource/icon/error.png",
            duration: 1e3
        }) : wx.showToast({
            title: "请填写手机号",
            image: "../../resource/icon/error.png",
            duration: 1e3
        }) : wx.showToast({
            title: "请填写姓名",
            image: "../../resource/icon/error.png",
            duration: 1e3
        });
    }
});
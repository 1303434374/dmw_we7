var app = getApp();

Page({
    data: {
        picPath: "",
        list_sum: 4
    },
    onLoad: function(a) {
        var t = this;
        t.MyBackgroundImgIn(), app.util.request({
            url: "entry/wxapp/ImgUrl",
            success: function(a) {
                console.log(a), t.setData({
                    url: a.data.data.url,
                    uniacid: a.data.data.uniacid
                });
            }
        });
    },
    onShow: function() {
        this.getMyPlayRecord(), this.setData({
            list_sum: 4
        });
    },
    MyBackgroundImgIn: function() {
        var t = this, a = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyBackgroundImgIn",
            data: {
                openid: a
            },
            success: function(a) {
                console.log(a), "" != a.data.data.background_image && null != a.data.data.background_image ? t.setData({
                    picPath: a.data.data.background_image
                }) : t.setData({
                    picPath: "https://www.webstrongtech.net/attachment/images/3/2018/05/jdkd9w8wg2L230kOAE6o8csc6EsGC0.jpg"
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    ToPraise: function(a) {
        var t = this, e = a.currentTarget.dataset.id, n = a.currentTarget.dataset.mainid, o = wx.getStorageSync("openid"), s = t.data.MyPlayRecord, i = s[n], r = i.praise;
        0 == i.member_status ? app.util.request({
            url: "entry/wxapp/PlayPraise",
            data: {
                id: e,
                openid: o,
                status: 1
            },
            success: function(a) {
                1 == a.data.data.status && (r++, i.member_status = !0, i.praise = r, t.setData({
                    MyPlayRecord: s
                }));
            }
        }) : app.util.request({
            url: "entry/wxapp/PlayPraise",
            data: {
                id: e,
                openid: o,
                status: -1
            },
            success: function(a) {
                1 == a.data.data.status && (r--, i.member_status = !1, i.praise = r, t.setData({
                    MyPlayRecord: s
                }));
            }
        });
    },
    onReady: function() {
        this.getbanner();
    },
    getbanner: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/set",
            success: function(a) {
                console.log(a), t.setData({
                    banner: a.data.data,
                    swiperIdx: a.data.data.length
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    getMyPlayRecord: function() {
        var e = this, a = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyPlayRecord",
            data: {
                openid: a
            },
            success: function(a) {
                console.log(a);
                var t = a.data.data.slice(0, 4);
                e.setData({
                    MyPlayRecord: a.data.data,
                    new_MyPlayRecord: t
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    look_more: function() {
        var a = this.data.MyPlayRecord, t = this.data.new_MyPlayRecord, e = this.data.list_sum;
        if (e < a.length) {
            var n = a.slice(e, e + 4);
            t = t.concat(n), this.setData({
                new_MyPlayRecord: t,
                list_sum: e + 4
            });
        }
    },
    previewImg: function(a) {
        var t = a.currentTarget.dataset.mainid, e = a.currentTarget.dataset.id;
        console.log(t, e);
        var n = this.data.MyPlayRecord[t].image;
        wx.previewImage({
            current: n[e],
            urls: n
        });
    },
    goDynamicDeails: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../stroke/strokeDeails/strokeDeails?id=" + t
        });
    },
    chooseimage: function(a) {
        var e = this, n = (wx.getStorageSync("openid"), e.data.uniacid);
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var t = a.tempFilePaths[0];
                wx.uploadFile({
                    url: e.data.url + "app/index.php?i=" + n + "&c=entry&a=wxapp&do=upload&m=tourism_page",
                    filePath: t,
                    name: "upfile",
                    formData: {
                        openid: wx.getStorageSync("openid")
                    },
                    success: function(a) {
                        console.log(a.data), e.setData({
                            uplogo: a.data
                        }), e.ChangeBackground(a.data);
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    },
    ChangeBackground: function(a) {
        var t = this, e = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyBackgroundImg",
            data: {
                openid: e,
                picPath: t.data.uplogo
            },
            success: function(a) {
                console.log(a), 1 == a.data.data ? t.setData({
                    picPath: t.data.uplogo
                }) : wx.showToast({
                    title: "更换失败",
                    image: "../../resource/icon/error.png",
                    duration: 1500
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    }
});
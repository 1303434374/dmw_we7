var app = getApp();

Page({
    data: {
        likeIO: !1,
        likeSum: 0,
        currentItem: 0,
        inputFocus: !0,
        list_sum: 4
    },
    onLoad: function(t) {},
    onReady: function() {
        this.getbanner(), this.getTitle();
    },
    onShow: function() {
        this.getPlayRecordList(), this.setData({
            list_sum: 4
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
    bannerInto: function(t) {
        var a = t.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "../detail/hotplace_detail/hotplace_detail?id=" + a
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
    getPlayRecordList: function() {
        var e = this, t = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/PlayRecordList",
            data: {
                openid: t
            },
            success: function(t) {
                console.log(t);
                var a = t.data.data.slice(0, 4);
                e.setData({
                    PlayRecordList: t.data.data,
                    new_PlayRecordList: a
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    previewImg: function(t) {
        var a = t.currentTarget.dataset.mainid, e = t.currentTarget.dataset.id, s = this.data.PlayRecordList[a].image;
        wx.previewImage({
            current: s[e],
            urls: s
        });
    },
    changeLikeStatus: function(t) {
        var a = this, e = t.currentTarget.dataset.id, s = t.currentTarget.dataset.mainid, i = wx.getStorageSync("openid"), n = a.data.PlayRecordList[s], r = n.praise;
        0 == n.member_status ? app.util.request({
            url: "entry/wxapp/PlayPraise",
            data: {
                id: e,
                openid: i,
                status: 1
            },
            success: function(t) {
                1 == t.data.data.status && (r++, n.member_status = !0, n.praise = r, a.setData({
                    PlayRecordList: a.data.PlayRecordList
                }));
            }
        }) : app.util.request({
            url: "entry/wxapp/PlayPraise",
            data: {
                id: e,
                openid: i,
                status: -1
            },
            success: function(t) {
                1 == t.data.data.status && (r--, console.log(r), n.member_status = !1, n.praise = r, 
                a.setData({
                    PlayRecordList: a.data.PlayRecordList
                }));
            }
        });
    },
    goStrokeDeails: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "strokeDeails/strokeDeails?id=" + a
        });
    },
    currentItem: function(t) {
        this.setData({
            currentItem: t.detail.current
        });
    },
    goSearch: function(t) {
        var a = t.detail.value;
        app.util.request({
            url: "entry/wxapp/FindAddress",
            data: {
                keyword: a
            },
            success: function(t) {
                1 == t.data.data.status ? wx.navigateTo({
                    url: "../raiders/raidersDeails/raidersDeails?address_id=" + t.data.data.address_id
                }) : wx.showModal({
                    title: "搜索失败",
                    content: "该地区没有信息!",
                    showCancel: !1
                });
            }
        });
    },
    stopSwiper: function() {
        this.setData({
            inputFocus: !1
        });
    },
    look_more: function() {
        var t = this.data.PlayRecordList, a = this.data.new_PlayRecordList, e = this.data.list_sum;
        if (e < t.length) {
            var s = t.slice(e, e + 4);
            a = a.concat(s), this.setData({
                new_PlayRecordList: a,
                list_sum: e + 4
            });
        }
    }
});
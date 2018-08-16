var app = getApp();

Array.prototype.remove = function(t, e) {
    var a = this.slice((e || t) + 1 || this.length);
    return this.length = t < 0 ? this.length + t : t, this.push.apply(this, a);
}, Page({
    data: {
        picPath: [],
        content: "",
        uniacid: "",
        normalSrc: "../../resource/images/my/xing.png",
        selectedSrc: "../../resource/images/my/xing1.png",
        scoreList: [ {
            name: "描述相符",
            stars: [ 0, 1, 2, 3, 4 ],
            key: 5
        }, {
            name: "物流服务",
            stars: [ 0, 1, 2, 3, 4 ],
            key: 0
        }, {
            name: "服务态度",
            stars: [ 0, 1, 2, 3, 4 ],
            key: 0
        } ],
        key: 0
    },
    onLoad: function(t) {
        var e = this, a = t.order_type, s = t.id;
        e.getMyOrderInto(s, a), wx.getUserInfo({
            success: function(t) {
                e.setData({
                    userInfo: t.userInfo
                });
            }
        }), app.util.request({
            url: "entry/wxapp/ImgUrl",
            success: function(t) {
                e.setData({
                    url: t.data.data.url,
                    uniacid: t.data.data.uniacid
                });
            }
        });
    },
    selectRight: function(t) {
        var e = t.currentTarget.dataset.key, a = t.currentTarget.dataset.id;
        this.data.scoreList[a].key = e, this.setData({
            scoreList: this.data.scoreList
        });
    },
    upLoadPic: function() {
        var a = this;
        wx.chooseImage({
            count: 5 - a.data.picPath.length,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                t.tempFilePaths;
                var e = t.tempFilePaths.length;
                a.uploadDIY(t.tempFilePaths, 0, 0, 0, e), console.log(a.data.picPath);
            }
        });
    },
    uploadDIY: function(t, e, a, s, o) {
        var n = this, i = this, r = i.data.uniacid, c = i.data.picPath;
        wx.uploadFile({
            url: i.data.url + "app/index.php?i=" + r + "&c=entry&a=wxapp&do=Upload&m=tourism_page",
            filePath: t[s],
            name: "upfile",
            success: function(t) {
                console.log(t.data), e++, c.push(t.data), i.setData({
                    picPath: c
                });
            },
            fail: function(t) {
                a++;
            },
            complete: function() {
                ++s == o ? (wx.hideLoading(), console.log("总共" + e + "张上传成功," + a + "张上传失败！")) : n.uploadDIY(t, e, a, s, o);
            }
        });
    },
    delImg: function(t) {
        var e = t.currentTarget.dataset.id, a = this.data.picPath, s = this;
        wx.showModal({
            title: "提示",
            content: "确定删除吗?",
            success: function(t) {
                t.confirm && (a.splice(e, 1), s.setData({
                    picPath: a
                })), console.log(a);
            }
        });
    },
    getText: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    formEvaluation: function() {
        var t = this, e = t.options.id, a = t.options.order_type, s = t.data.picPath, o = t.data.scoreList, n = wx.getStorageSync("openid"), i = t.data.content, r = "../myOrders/myOrders";
        3 == a ? r = "../myBargain/myBargain" : 4 == a && (r = "../myOrders/myOrders"), 
        "" != i ? app.util.request({
            url: "entry/wxapp/MyOrderPl",
            data: {
                picPath: s,
                order_type: a,
                id: e,
                scoreList: o,
                content: i,
                openid: n
            },
            success: function(t) {
                console.log(t), 1 == t.data.data ? (wx.showToast({
                    title: "评论成功！",
                    icon: "success",
                    duration: 500
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: r
                    });
                }, 1500)) : wx.showModal({
                    title: "评论失败",
                    content: "请联系客服",
                    showCancel: !1
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }) : wx.showToast({
            title: "请输入评论",
            icon: "none"
        });
    },
    getMyOrderInto: function(t, e) {
        var a = this;
        console.log(t, e), app.util.request({
            url: "entry/wxapp/MyOrderInto",
            data: {
                id: t,
                order_type: e
            },
            success: function(t) {
                console.log(t), a.setData({
                    OrderInfo: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    }
});
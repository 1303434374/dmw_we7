var app = getApp();

Page({
    data: {
        showCommentBox: !1,
        likeIO: !1,
        autoFocus: !1,
        commentSum: 0,
        showAllComment: !0,
        look_num: 0
    },
    onLoad: function(t) {
        var e = this, a = t.id;
        e.getTitle(), e.getMessageInfo(a), e.getMessageReply(a), e.getMessagePraise(a);
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
    getMessageReply: function(t) {
        var a = this;
        app.util.request({
            url: "entry/wxapp/MessageOrderReply",
            data: {
                id: t
            },
            success: function(t) {
                console.log(t);
                var e = t.data.data.slice(0, 10);
                a.setData({
                    OrderReply: t.data.data,
                    falseComment_list1: e
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getMessagePraise: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/MessageOrderPraise",
            data: {
                id: t
            },
            success: function(t) {
                console.log(t), e.setData({
                    PraiseNum: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getMessageInfo: function(t) {
        var e = this, a = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/OrderMessageInfo",
            data: {
                id: t,
                openid: a
            },
            success: function(t) {
                1 == t.data.data.praise_status && e.setData({
                    likeIO: !0
                }), e.setData({
                    MessageInfo: t.data.data,
                    look_num: t.data.data.look_num
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onReady: function() {},
    commentBox: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.idx, s = this.data.MessageInfo, n = t.currentTarget.dataset.name, o = wx.getStorageSync("openid");
        null != n && this.setData({
            reply_name: n
        }), 0 == e && -1 == a && this.setData({
            comment_id: e,
            showCommentBox: !0
        }), -1 == e && -1 == a && this.setData({
            showCommentBox: !1
        }), -1 != a && -1 != e && 0 != e && (o == s.openid && this.setData({
            showCommentBox: !0
        }), this.setData({
            comment_idx: a,
            comment_id: e
        }));
    },
    touchLike: function() {
        var e = this, t = e.options.id, a = wx.getStorageSync("openid"), s = e.data.PraiseNum, n = e.data.MessageInfo;
        -1 == n.praise_status ? app.util.request({
            url: "entry/wxapp/OrderPraiseIn",
            data: {
                id: t,
                openid: a,
                status: 1
            },
            success: function(t) {
                console.log(t), 1 == t.data.data.status && (s++, n.praise_status = 1, e.setData({
                    MessageInfo: n,
                    PraiseNum: s
                }));
            }
        }) : app.util.request({
            url: "entry/wxapp/OrderPraiseIn",
            data: {
                id: t,
                openid: a,
                status: -1
            },
            success: function(t) {
                1 == t.data.data.status && (s--, n.praise_status = -1, e.setData({
                    MessageInfo: n,
                    PraiseNum: s
                }));
            }
        });
    },
    previewImg: function(t) {
        var e = t.currentTarget.dataset.id, a = this.data.MessageInfo.image;
        wx.previewImage({
            current: a[e],
            urls: a
        });
    },
    sendComment: function(t) {
        var s = t.detail.value, n = this, e = n.options.id, a = wx.getStorageSync("openid"), o = n.data.MessageInfo, i = wx.getStorageSync("useInfo_d"), l = n.data.falseComment_list1, r = n.data.reply_name, d = n.data.comment_id, u = n.data.comment_idx;
        console.log(d), app.util.request({
            url: "entry/wxapp/OrderMessageInto",
            data: {
                id: e,
                openid: a,
                content: s,
                c_id: d
            },
            success: function(t) {
                if (console.log(t), console.log(o.openid), 1 == t.data.data.status) if (0 == d) {
                    console.log(t.data.data.id);
                    var e = {
                        nickname: i.nickName,
                        avatar: i.avatarUrl,
                        content: s,
                        openid: o.openid,
                        id: t.data.data.id,
                        replyIn: []
                    };
                    l.unshift(e), n.setData({
                        eVal: "",
                        showCommentBox: !1,
                        falseComment_list1: l,
                        reply_name: ""
                    });
                } else if (0 != d && -1 != d && "number" == typeof u) {
                    var a = {
                        content: s,
                        nickname: i.nickName,
                        reply_name: r,
                        id: t.data.data.id,
                        openid: o.openid,
                        replyIn: []
                    };
                    l[u].replyIn.push(a), n.setData({
                        eVal: "",
                        showCommentBox: !1,
                        falseComment_list1: l,
                        reply_name: ""
                    });
                }
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    addAllComment: function() {
        var t = this.data.OrderReply, e = this.data.falseComment_list1, a = this.data.commentSum;
        if (a < t.length) {
            a += 10;
            var s = t.slice(a, a + 10);
            e = e.concat(s);
        }
        this.setData({
            showAllComment: !1,
            falseComment_list1: e,
            newCommentSum: a + 10,
            commentSum: a
        }), setTimeout(function() {
            wx.pageScrollTo({
                scrollTop: 9999
            });
        }, 10);
    },
    packUpComment: function() {
        var t = this.data.falseComment_list1.slice(0, 10);
        this.setData({
            falseComment_list1: t,
            commentSum: 0,
            newCommentSum: 0
        });
    }
});
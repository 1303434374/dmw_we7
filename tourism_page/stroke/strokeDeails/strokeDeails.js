var app = getApp();

Page({
    data: {
        likeIO: !1,
        commentList: [],
        lookMore: !1,
        showCommentInput: !1,
        message: 0,
        likeSum: 0,
        messageSum: 0,
        replySum: 0
    },
    onLoad: function(a) {
        var t = a.id;
        this.getPlayRecordIn(t);
    },
    onReady: function() {},
    getPlayRecordIn: function(a) {
        var l = this, t = wx.getStorageSync("openid");
        this.data.messageSum;
        app.util.request({
            url: "entry/wxapp/PlayRecordIn",
            data: {
                id: a,
                openid: t
            },
            success: function(a) {
                console.log(a.data.data);
                for (var t = a.data.data.message_list, e = a.data.data.message_list1, s = a.data.data.openid, i = t.slice(0, 10), n = a.data.data.praise_list.slice(0, 10), o = a.data.data.praise, d = 0; d < i.length; d++) if (4 < i[d].reply.length) {
                    var r = i[d].reply.slice(0, 4);
                    i[d].reply = r;
                }
                l.setData({
                    PlayRecordIn: a.data.data,
                    likeIO: a.data.data.member_status,
                    likeSum: a.data.data.praise,
                    messageList: i,
                    message_list1: e,
                    praiseList: n,
                    praise: o,
                    item_openid: s
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    previewImg: function(a) {
        var t = a.currentTarget.dataset.id, e = this.data.PlayRecordIn.image;
        wx.previewImage({
            current: e[t],
            urls: e
        });
    },
    changeLikeStatus: function() {
        var s = this;
        console.log(s.data.likeIO);
        var a = s.options.id, t = wx.getStorageSync("openid"), i = this.data.praiseList, n = this.data.praise;
        0 == s.data.likeIO ? app.util.request({
            url: "entry/wxapp/PlayPraise",
            data: {
                id: a,
                openid: t,
                status: 1
            },
            success: function(a) {
                if (console.log(a), 1 == a.data.data.status) {
                    var t = a.data.data.nickname;
                    i.push({
                        nickname: t
                    }), n++, s.data.likeSum++, s.setData({
                        likeIO: !0,
                        likeSum: s.data.likeSum,
                        praiseList: i,
                        praise: n
                    });
                }
            }
        }) : app.util.request({
            url: "entry/wxapp/PlayPraise",
            data: {
                id: a,
                openid: t,
                status: -1
            },
            success: function(a) {
                if (console.log(a), 1 == a.data.data.status) {
                    for (var t = a.data.data.nickname, e = 0; e < i.length; e++) i[e].nickname == t && i.pop(e);
                    console.log(i), s.data.likeSum--, n--, s.setData({
                        likeIO: !1,
                        likeSum: s.data.likeSum,
                        praiseList: i,
                        praise: n
                    });
                }
            }
        });
    },
    releaseComment: function(a) {
        var s = this, t = wx.getStorageSync("openid"), i = a.detail.value, e = a.currentTarget.dataset.id, n = s.data.PlayRecordIn.message, o = this.data.messageList, d = this.data.commentId, r = this.data.prevNickname, l = this.data.commentIdx;
        this.data.commentReIdx, this.data.message_list1;
        this.setData({
            showCommentInput: !1
        }), console.log(d), app.util.request({
            url: "entry/wxapp/PlayMessage",
            data: {
                openid: t,
                content: i,
                id: e,
                commentId: d
            },
            success: function(a) {
                if (console.log(a), 1 == a.data.data.status) {
                    if (wx.showToast({
                        title: "留言成功"
                    }), 0 == d) {
                        var t = {
                            content: a.data.data.content,
                            nickname: a.data.data.nickname,
                            id: a.data.data.id,
                            openid: a.data.data.openid,
                            reply: []
                        };
                        o.unshift(t);
                    } else if ("number" == typeof l && 0 != d) {
                        console.log(l);
                        var e = {
                            content: i,
                            nickname: a.data.data.nickname,
                            prevNickname: r,
                            id: a.data.data.id,
                            openid: a.data.data.openid
                        };
                        o[l].reply.push(e);
                    }
                    n++, s.data.PlayRecordIn.message = n, s.setData({
                        PlayRecordIn: s.data.PlayRecordIn,
                        messageList: o
                    });
                } else wx.showToast({
                    title: "留言失败",
                    image: "../../resource/icon/error.png"
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    lookMore: function() {
        var a = this.data.message_list1, t = this.data.messageSum, e = this.data.messageList;
        if (t < a.length) {
            t += 10;
            var s = a.slice(t, t + 10);
            e = e.concat(s);
        }
        this.setData({
            messageList: e,
            messageSum: t,
            newMessageSum: t + 10
        }), setTimeout(function() {
            wx.pageScrollTo({
                scrollTop: 9999
            });
        }, 10);
    },
    notlookMore: function() {
        console.log(1);
        var a = this.data.messageList.slice(0, 10);
        this.setData({
            messageList: a,
            messageSum: 0,
            newMessageSum: 0
        });
    },
    showCommentInput: function(a) {
        var t = a.currentTarget.dataset.id, e = this.data.showCommentInput, s = a.currentTarget.dataset.name, i = a.currentTarget.dataset.idx, n = wx.getStorageSync("openid"), o = this.data.item_openid;
        t && (0 == e ? this.setData({
            showCommentInput: !0
        }) : this.setData({
            showCommentInput: !1
        }), this.setData({
            commentId: t
        })), null != s && (0 == e ? this.setData({
            showCommentInput: !0
        }) : this.setData({
            showCommentInput: !1
        }), this.setData({
            prevNickname: s
        })), null != i && (o != n ? this.setData({
            showCommentInput: !1
        }) : this.setData({
            showCommentInput: !0
        }), this.setData({
            commentIdx: i
        }));
    }
});
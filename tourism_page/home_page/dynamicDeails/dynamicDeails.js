var app = getApp();

Page({
    data: {
        likeIO: !1,
        likeSum: 1234,
        commentSum: 1234,
        commentList: [],
        lookMore: !1,
        showCommentInput: !1
    },
    onLoad: function(t) {
        var e = this;
        wx.getUserInfo({
            success: function(t) {
                e.setData({
                    userInfo: t.userInfo
                });
            }
        });
    },
    previewImg: function() {
        wx.previewImage({
            urls: this.data.banner
        });
    },
    onReady: function() {
        this.getbanner();
    },
    getbanner: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/set",
            cachetime: "30",
            success: function(t) {
                console.log(t), e.setData({
                    banner: t.data.data,
                    swiperIdx: t.data.data.length
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    changeLikeStatus: function() {
        0 == this.data.likeIO ? (this.data.likeSum++, this.setData({
            likeIO: !0,
            likeSum: this.data.likeSum
        })) : (this.data.likeSum--, this.setData({
            likeIO: !1,
            likeSum: this.data.likeSum
        }));
    },
    releaseComment: function(t) {
        this.data.commentList.push(t.detail.value), this.setData({
            commentVal: "",
            commentList: this.data.commentList
        }), setTimeout(function() {
            wx.pageScrollTo({
                scrollTop: 9999
            });
        }, 10);
    },
    lookMore: function() {
        this.setData({
            lookMore: !0
        }), setTimeout(function() {
            wx.pageScrollTo({
                scrollTop: 9999
            });
        }, 10);
    },
    notlookMore: function() {
        this.setData({
            lookMore: !1
        });
    },
    showCommentInput: function() {
        0 == this.data.showCommentInput ? (this.setData({
            showCommentInput: !0
        }), wx.pageScrollTo({
            scrollTop: 9999
        })) : this.setData({
            showCommentInput: !1
        });
    }
});
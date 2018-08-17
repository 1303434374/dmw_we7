var app = getApp();

Page({
    data: {
        c_openid: "",
        show_poster: !1,
        show_options: !1
    },
    onLoad: function(t) {
        var o = this;
        wx.getUserInfo({
            success: function(t) {
                o.setData({
                    avatarUrl: t.userInfo.avatarUrl
                });
            }
        });
    },
    onShow: function() {
        var t = this.options.sponsor_id;
        console.log(t);
        this.getGroupInfo(t);
    },
    onHide: function() {
        var t = this.data.active;
        t.e_timer && clearInterval(t.e_timer), this.setData({
            active: t
        });
    },
    showPoster: function() {
        var o = this, t = o.options.sponsor_id;
        console.log(t), app.util.request({
            url: "entry/wxapp/GroupSharePoster",
            data: {
                sponsor_id: t
            },
            success: function(t) {
                console.log(t), o.setData({
                    path: t.data.data,
                    show_poster: !0
                });
            }
        });
    },
    change_time: function(t, o) {
        var e = new Date(t);
        return (new Date(o) - e) / 1e3;
    },
    djs: function(t, o) {
        var e = this, s = new Date(), a = s.getFullYear() + "/" + (s.getMonth() + 1) + "/" + s.getDate() + " " + s.getHours() + ":" + s.getMinutes() + ":" + s.getSeconds(), n = this.change_time(a, t);
        o.setimer = setInterval(function() {
            (o.e_t = n) <= 0 ? (clearInterval(o.setimer), o.end_t = !0, e.end_activity()) : 0 < n && (o.e_clock = app.dateformat_all(n--)), 
            e.setData({
                active: o
            });
        }, 1e3);
    },
    end_activity: function() {
        console.log(1.111111111111111e44);
        var t = this.options.sponsor_id;
        console.log(t), app.util.request({
            url: "entry/wxapp/SponsorOut",
            data: {
                sponsor_id: t
            },
            success: function(t) {
                console.log(t);
            }
        });
    },
    getGroupInfo: function(e) {
        var s = this;
      console.log('getGroupInfo');
        console.log(e), app.util.request({
            url: "entry/wxapp/GroupTeamInfo",
            data: {
                id: e
            },
            success: function(t) {
                console.log(t);
                var o = t.data.data;
                o.out_time = o.out_time.replace(/\-/g, "/"), console.log("最喜欢看粗嘎十大科技是打双打s", o.out_time), 
                s.djs(o.out_time, o.active), o.record.length + 1 == o.active.become_num && app.util.request({
                    url: "entry/wxapp/GroupSuccess",
                    data: {
                        sponsor_id: e
                    },
                    success: function(t) {
                      console.log(t);
                      console.log('GroupSuccess');
                        s.setData({
                            order_id: t.data.data,
                            t_success: !0
                        });
                    }
                }), s.setData({
                    active: o.active,
                    record: o.record,
                    colonel: o.colonel
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "邀请好友参团",
            path: "tourism_page/home_page/myTeamwork/teamworkDeails/teamworkDeails?sponsor_id=" + this.options.sponsor_id + "&group=yes&id=" + this.data.active.id,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    show_options: function() {
        var t = this.data.show_options;
        0 == t ? this.setData({
            show_options: !0
        }) : this.setData({
            show_options: !1
        });
    },
    hidePoster: function() {
        this.setData({
            show_poster: !1,
            show_options: !1
        });
    },
    saveImg: function() {
        var o = this, t = this.data.path;
        wx.getImageInfo({
            src: t,
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.path,
                    success: function(t) {
                        wx.showToast({
                            title: "保存成功！",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.setData({
                                show_poster: !1,
                                show_options: !1
                            });
                        }, 1e3);
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            }
        });
    },
    go_activity: function() {
        wx.reLaunch({
            url: "../../../index/newActivity/newActivity"
        });
    },
    go_idx: function() {
        wx.reLaunch({
            url: "../../../index/index"
        });
    },
    go_orderDeails: function() {
        var t = this.data.order_id;
        console.log(t);
        wx.navigateTo({
            url: "../../../detail/order_detail/order_detail?id=" + t + "&types=4"
        });
    }
});
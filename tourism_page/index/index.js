var app = getApp(), page = 1;

Page({
    data: {
        downTime: '',//倒计时
        currentTab1: 0,//选项卡
        getUseInfo: !1,
        invite_num: "",
        currentTab: null,
        ismore: !0,
        openid: "",
        currentItem: 0,
        listArr: [],
        moreSum: 4,
        inputFocus: !0,
        jiazai: !0,
        progress_txt: "正在加载中...",
        count: 0,
        countTime: null
    },
    onLoad: function(t) {
        let that = this;
        that.CountDown(that, 86500);
        var n = this, e = wx.getStorageSync("openid");
        if (t.scene) {
            var a = decodeURIComponent(t.scene);
            "" != a && null != a && (n.setData({
                invite_num: a
            }), "" != e && null != e && "" != a && null != a && n.distribution_invite(e));
        }
        page = 1, "" != e && null != e || n.setData({
            getUseInfo: !0
        }), wx.getStorage({
            key: "useInfo",
            success: function(t) {
                "true" == t.data && n.setData({
                    getUseInfo: !1
                });
            }
        }), wx.getLocation({
            type: "wgs84",
            success: function(t) {
                var e = t.latitude, a = t.longitude;
                app.util.request({
                    url: "entry/wxapp/MyAddress",
                    data: {
                        latitude: e,
                        longitude: a
                    },
                    success: function(t) {
                        console.log(t);
                        var e = t.data.data.address.slice(0, 4);
                        n.setData({
                            city: t.data.data.city,
                            around_address: e
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            }
        });
    },
    onShow: function() {
        this.IndexActive(), this.setData({
            jiazai: !0,
            count: 0,
            progress_txt: "正在加载中..."
        }), this.drawProgressbg(), this.countInterval();
    },
    onHide: function() {
        for (var t = this.data.Active, e = 0; e < t.length; e++) t[e].e_timer ? clearInterval(t[e].e_timer) : t[e].c_timer && clearInterval(t[e].c_timer);
        this.setData({
            Active: t
        });
    },
    getUsetInfo: function(t) {
        "getUserInfo:ok" == t.detail.errMsg ? (this.close_modal(), wx.setStorage({
            key: "useInfo",
            data: "true"
        }), wx.setStorage({
            key: "useInfo_d",
            data: t.detail.userInfo
        }), this.getGetUid(t.detail.userInfo)) : this.setData({
            getUseInfo: !0
        });
    },
    close_modal: function() {
        this.setData({
            getUseInfo: !1
        });
    },
    stopSwiper: function() {
        this.setData({
            inputFocus: !1
        });
    },
    onReady: function() {
        this.getTitle(), this.getbanner(), this.getlanmu(), this.getHotRecommended(), this.getLikeAddress();
    },
    distribution_invite: function(t) {
        var e = this.data.invite_num;
        " " != e && null != e && app.util.request({
            url: "entry/wxapp/Distribution_Invite",
            data: {
                invite_num: e,
                openid: t
            }
        });
    },
    getHotRecommended: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/HotRecommended",
            success: function(t) {
                e.setData({
                    HotRecommended: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    f: function(t, e) {
        var a = Date.parse(t);
        return (Date.parse(e) - a) / 1e3;
    },
    djs: function(e, a) {
        var n = this, t = new Date(), i = t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds(), o = n.f(i, e[a].create_time);
        if (console.log(o), 0 < o) e[a].c_timer = setInterval(function() {
            if ((e[a].c_t = o) <= 0) {
                clearInterval(e[a].c_timer), e[a].start_t = !0;
                var t = n.f(i, e[a].finish_time);
                e[a].e_timer = setInterval(function() {
                    (e[a].e_t = t) <= 0 ? (clearInterval(e[a].e_timer), e[a].end_t = !0, n.end_activity(e[a].id, e[a].type)) : 0 < t && t < 60 ? (e[a].e_clock = app.dateformat_s(t--), 
                    e[a].now_t = "s") : t < 3600 ? (e[a].e_clock = app.dateformat_m(t--), e[a].now_t = "m") : t < 86400 ? (e[a].e_clock = app.dateformat_h(t--), 
                    e[a].now_t = "h") : 86400 <= t && (e[a].e_clock = app.dateformat_d(t--), e[a].now_t = "d"), 
                    n.setData({
                        Active: e
                    });
                }, 1e3);
            } else 0 < o && o < 60 ? (e[a].c_clock = app.dateformat_s(o--), e[a].now_t = "s") : o < 3600 ? (e[a].c_clock = app.dateformat_m(o--), 
            e[a].now_t = "m") : o < 86400 ? (e[a].c_clock = app.dateformat_h(o--), e[a].now_t = "h") : 86400 <= o && (e[a].c_clock = app.dateformat_d(o--), 
            e[a].now_t = "d");
            n.setData({
                Active: e
            });
        }, 1e3); else if (o <= 0) {
            clearInterval(e[a].c_timer), e[a].start_t = !0;
            var r = n.f(i, e[a].finish_time);
            e[a].e_timer = setInterval(function() {
                (e[a].e_t = r) <= 0 ? (clearInterval(e[a].e_timer), e[a].end_t = !0, n.end_activity(e[a].id, e[a].type)) : 0 < r && r < 60 ? (e[a].e_clock = app.dateformat_s(r--), 
                e[a].now_t = "s") : r < 3600 ? (e[a].e_clock = app.dateformat_m(r--), e[a].now_t = "m") : r < 86400 ? (e[a].e_clock = app.dateformat_h(r--), 
                e[a].now_t = "h") : 86400 <= r && (e[a].e_clock = app.dateformat_d(r--), e[a].now_t = "d"), 
                n.setData({
                    Active: e
                });
            }, 1e3);
        }
    },
    end_activity: function(t, e) {
        if (console.log(1.1111111111111112e41), 1 == e) {
            console.log(e, t), app.util.request({
                url: "entry/wxapp/GroupTimeOut",
                data: {
                    id: t,
                    types: 1
                }
            });
        }
    },
    IndexActive: function() {
        var o = this;
        app.util.request({
            url: "entry/wxapp/IndexActive",
            success: function(t) {
                console.log(t);
                for (var e = t.data.data, a = 0; a < e.length; a++) e[a].create_time = e[a].create_time.replace(/\-/g, "/"), 
                e[a].finish_time = e[a].finish_time.replace(/\-/g, "/");
                var n = 0, i = setInterval(function() {
                    o.djs(e, n), ++n > e.length - 1 && clearInterval(i);
                }, 10);
                o.setData({
                    Active: e
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getGetUid: function() {
        var n = this, i = n.data.invite_num;
        wx.login({
            success: function(t) {
                t.code ? app.util.request({
                    url: "entry/wxapp/GetUid",
                    data: {
                        code: t.code
                    },
                    success: function(t) {
                        if (!t.data.errno) {
                            wx.setStorageSync("openid", t.data.data);
                            var a = wx.getStorageSync("openid");
                            wx.getUserInfo({
                                success: function(t) {
                                    var e = t.userInfo;
                                    app.util.request({
                                        url: "entry/wxapp/Member",
                                        data: {
                                            nickName: e.nickName,
                                            avatarUrl: e.avatarUrl,
                                            openid: a
                                        },
                                        success: function(t) {
                                            1 == t.data.data && "" != i && n.distribution_invite(a);
                                        }
                                    });
                                }
                            });
                        }
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                }) : console.log("获取用户登录态失败！" + t.errMsg);
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
    getlanmu: function() {
        var n = this;
        app.util.request({
            url: "entry/wxapp/Lanmu",
            success: function(t) {
                n.setData({
                    sortList: t.data.data
                });
                for (var e = t.data.data, a = 0; a < e.length; a++) 10 < e.length && n.data.listArr.push(e.splice(0, 10));
                n.data.listArr.push(e.splice(0, 10)), n.setData({
                    listArr: n.data.listArr
                }), console.log(n.data.listArr);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getbanner: function() {
        var e = this;
        app.util.request({
            url: "entry/wxapp/FindBanner",
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
    bannerInto: function(t) {
        var e = t.currentTarget.dataset.id;
        console.log(e), wx.navigateTo({
            url: "../detail/hotplace_detail/hotplace_detail?id=" + e
        });
    },
    getLikeAddress: function(t) {
        var n = this;
        app.util.request({
            url: "entry/wxapp/LikeAddress",
            data: {
                openid: t
            },
            success: function(t) {
                console.log(t);
                var e = n.data.moreSum, a = t.data.data.slice(0, e);
                n.setData({
                    LikeAddress: a,
                    LikeAddressList: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    moreData: function() {
        var t = this.data.moreSum, e = this.data.LikeAddressList, a = this.data.LikeAddress;
        t += 4, a = e.slice(0, t), this.setData({
            LikeAddress: a,
            moreSum: t
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    onShareAppMessage: function(t) {
        return "button" === t.from && console.log(t.target), {
            title: "旅游首页",
            path: "tourism_page/index/index",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    currentItem: function(t) {
        this.setData({
            currentItem: t.detail.current
        });
    },
    gosortDeails: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.into_url;
        wx.navigateTo({
            url: a + "/" + a + "?id=" + e
        });
    },
    goSearch: function(t) {
        var e = t.detail.value;
        app.util.request({
            url: "entry/wxapp/FindAddress",
            data: {
                keyword: e
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
        }), this.setData({
            inputFocus: !0,
            inputVal: ""
        });
    },
    goRaidersDeails: function(t) {
        var e = t.currentTarget.dataset.address_id;
        wx.navigateTo({
            url: "../raiders/raidersDeails/raidersDeails?address_id=" + e
        });
    },
    goLikeDeails: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../detail/hotplace_detail/hotplace_detail?id=" + e
        });
    },
    goTeamworkDeails: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../home_page/myTeamwork/teamworkDeails/teamworkDeails?id=" + e
        });
    },
    goBargain: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../home_page/myBargain/bargainDeails/bargainDeails?id=" + e
        });
    },
    moreNearbyPlay: function() {
        wx.navigateTo({
            url: "around/around"
        });
    },
    moreYouMayPlay: function() {
        wx.navigateTo({
            url: "youMayPlay/youMayPlay"
        });
    },
    moreHot: function() {
        wx.navigateTo({
            url: "moreHot/moreHot"
        });
    },
    scanCode: function() {
        var e = this, n = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/Ifverification",
            data: {
                openid: n
            },
            success: function(t) {
                1 == t.data.data ? wx.scanCode({
                    success: function(t) {
                        wx.showToast({
                            title: "扫码成功,信息查询中!"
                        });
                        var a = t.path;
                        e.setData({
                            path: a
                        }), app.util.request({
                            url: "entry/wxapp/HexiaoIf",
                            data: {
                                order: a,
                                openid: n
                            },
                            success: function(t) {
                                var e = t.data.data;
                                return 2 == e ? (wx.showModal({
                                    title: "核销失败",
                                    content: "该订单已核销过,无法再次核销!",
                                    showCancel: !1
                                }), !1) : -1 == e ? (wx.showModal({
                                    title: "核销失败",
                                    content: "该订单不存在!",
                                    showCancel: !1
                                }), !1) : -2 == e ? (wx.showModal({
                                    title: "核销失败",
                                    content: "您还不是核销员!",
                                    showCancel: !1
                                }), !1) : void (1 == e && wx.showModal({
                                    title: "提示",
                                    content: "是否核销该订单",
                                    confirmText: "确认核销",
                                    success: function(t) {
                                        t.confirm ? app.util.request({
                                            url: "entry/wxapp/HexiaoIfIn",
                                            data: {
                                                order: a,
                                                openid: n
                                            },
                                            success: function(t) {
                                                console.log(t), 1 == t.data.data ? wx.showModal({
                                                    title: "核销成功",
                                                    content: "该订单已成功核销!",
                                                    showCancel: !1
                                                }) : wx.showModal({
                                                    title: "核销失败",
                                                    content: "请联系工作人员!",
                                                    showCancel: !1
                                                });
                                            }
                                        }) : t.cancel && console.log("用户点击取消");
                                    }
                                }));
                            }
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            image: "../resource/icon/error.png",
                            title: "扫码失败!"
                        });
                    }
                }) : wx.showToast({
                    image: "../resource/icon/error.png",
                    title: "您还不是核销员"
                });
            }
        });
    },
    countInterval: function() {
        var t = this;
        this.countTime = setInterval(function() {
            t.data.count <= 60 ? (t.drawCircle(t.data.count / 30), t.data.count += 6) : (t.setData({
                progress_txt: "加载成功",
                jiazai: !1
            }), clearInterval(t.countTime));
        }, 100);
    },
    drawProgressbg: function() {
        var t = wx.createCanvasContext("canvasProgressbg");
        t.setLineWidth(1), t.setStrokeStyle("#15e4d1"), t.setLineCap("round"), t.beginPath(), 
        t.arc(110, 110, 20, 0, 2 * Math.PI, !1), t.stroke(), t.draw();
    },
    drawCircle: function(t) {
        var e = wx.createCanvasContext("canvasProgress"), a = e.createLinearGradient(200, 100, 100, 200);
        a.addColorStop("0", "#15e4d1"), a.addColorStop("0.5", "#15e4d1"), a.addColorStop("1.0", "#15e4d1"), 
        e.setLineWidth(5), e.setStrokeStyle(a), e.setLineCap("round"), e.beginPath(), e.arc(110, 110, 20, -Math.PI / 2, t * Math.PI - Math.PI / 2, !1), 
        e.stroke(), e.draw();
    },
    moreActivity: function() {
        wx.navigateTo({
            url: "newActivity/newActivity"
        });
    },
      //秒杀倒计时
  CountDown: function (t, time) {
    // console.log(t.data.downTime)
    if (time <= 0) {
      return t.setData({
        downTime: {
          d: '00',
          h: '00',
          i: '00',
          s: '00'
        }
      })
    }
    time--;
    t.setData({
      downTime: {
        d: parseInt(time / 86400) < 10 ? '0' + parseInt(time / 86400) : String(parseInt(time / 86400)),
        h: (function (time) {
          var h = parseInt((parseInt(time / 3600) * 3600) / 3600);
          if(h >= 24){
            h = h%24
          }
          return h < 10 ? '0' + h : String(h);
        })(time),
        i: (function (time) {
          var i = parseInt((time - parseInt(time / 3600) * 3600) / 60);

          return i < 10 ? '0' + i : String(i);
        })(time),
        s: (function (time) {
          var s = parseInt((time - parseInt(time / 3600) * 3600)) - parseInt((time - parseInt(time / 3600) * 3600) / 60) * 60;
          return s < 10 ? '0' + s : String(s);
        })(time)
      }
    })

    setTimeout(function () { t.CountDown(t, time) }, 1000);
  },
    //选项卡
  swichNav: function (e) {
    this.setData({
      currentTab1: e.target.dataset.current
    })
    // console.log(e.target.dataset.current);
  },
    goDetails: function() {
        wx.navigateTo({
            url: '../details/details'
        })
    }
});
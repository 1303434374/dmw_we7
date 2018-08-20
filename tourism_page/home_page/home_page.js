function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var app = getApp();

Page(
  _defineProperty({
    data: {
        getUseInfo: !1,
        distribution_status: -2,
        myList: [ {
            name: "我的订单",
            jumpPage: "myOrders",
            iconPath: "../resource/images/my/order.png"
        }, {
            name: "我的定制",
            jumpPage: "myPrivte",
            iconPath: "../resource/images/my/dingzhi.png"
        }, {
            name: "我的拼团",
            jumpPage: "myTeamwork",
            iconPath: "../resource/images/my/teamwork.png"
        }, {
            name: "我的砍价",
            jumpPage: "myBargain",
            iconPath: "../resource/images/my/bargain.png"
        }, {
            name: "我的游记",
            jumpPage: "myDynamic",
            iconPath: "../resource/images/my/dynamic.png"
        }, {
            name: "申请成为分销商",
            subname: "",
            jumpPage: "become_partSales",
            iconPath: "../resource/images/fenxiao/fenxiao.png"
        } ],
        jiazai: !0,
        progress_txt: "正在加载中...",
        count: 0,
        countTime: null
    },
    onLoad: function(e) {
        var t = this;
        t.getMemberInfo();
        var a = wx.getStorageSync("openid");
        this.getmemberinfo(a), this.MyAllNum(a);
      if ("" == a || null == a){
        a = app.globalData.openid;
        }
        "" == a || null == a ? this.gotologin() : console.log('已经授权');
    },
    onReady: function() {
        this.getTitle(), this.getMyDistribution(), this.drawProgressbg(), this.countInterval();
    },
  onShow:function(){
    console.log('触发我');
    var t = this;
    var a = wx.getStorageSync("openid");
    if ("" == a || null == a) {
      a = app.globalData.openid;
      wx.setStorageSync("openid", a);
    }
    console.log('显示里得到appid'+a);
    "" == a || null == a ? this.gotologin() : t.getMemberInfo();
  },
    countInterval: function() {
        var e = this;
        this.countTime = setInterval(function() {
            e.data.count <= 60 ? (e.drawCircle(e.data.count / 30), e.data.count += 6) : (e.setData({
                progress_txt: "加载成功",
                jiazai: !1
            }), clearInterval(e.countTime));
        }, 100);
    },
    drawProgressbg: function() {
        var e = wx.createCanvasContext("canvasProgressbg");
        e.setLineWidth(1), e.setStrokeStyle("#15e4d1"), e.setLineCap("round"), e.beginPath(), 
        e.arc(110, 110, 20, 0, 2 * Math.PI, !1), e.stroke(), e.draw();
    },
    drawCircle: function(e) {
        var t = wx.createCanvasContext("canvasProgress"), a = t.createLinearGradient(200, 100, 100, 200);
        a.addColorStop("0", "#15e4d1"), a.addColorStop("0.5", "#15e4d1"), a.addColorStop("1.0", "#15e4d1"), 
        t.setLineWidth(5), t.setStrokeStyle(a), t.setLineCap("round"), t.beginPath(), t.arc(110, 110, 20, -Math.PI / 2, e * Math.PI - Math.PI / 2, !1), 
        t.stroke(), t.draw();
    },
    //-2默认 -1申请失败 1申请成功 2审核中
    getMyDistribution: function() {
        var t = this, e = wx.getStorageSync("openid"), a = this.data.myList;
        app.util.request({
            url: "entry/wxapp/MyDistribution",
            data: {
                openid: e
            },
            success: function(e) {
                console.log(e), -3 == e.data.data ? (console.log(e.data.data), a.pop(), t.setData({
                    myList: a
                })) : 1 == e.data.data ? (a[a.length - 1].name = "分销中心", a[a.length - 1].subname = "", 
                a[a.length - 1].jumpPage = "partSale_center") : -1 == e.data.data ? (a[a.length - 1].name = "申请成为分销商", 
                a[a.length - 1].subname = "(申请失败)", a[a.length - 1].jumpPage = "become_partSales") : 2 == e.data.data ? (a[a.length - 1].name = "申请成为分销商", 
                a[a.length - 1].subname = "(审核中)", a[a.length - 1].jumpPage = "") : 2 != e.data.data && 1 != e.data.data && (a[a.length - 1].name = "申请成为分销商", 
                a[a.length - 1].subname = "", a[a.length - 1].jumpPage = "become_partSales"), t.setData({
                    distribution_status: e.data.data,
                    myList: a
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getMemberInfo: function() {
        var a = this, e = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/Memberxq",
            data: {
                openid: e
            },
            success: function(e) {
                if (console.log(e), null != e.data.data.phone) {
                    var t = e.data.data.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                    e.data.data.phone = t;
                }
                a.setData({
                    MemberInfo: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getmemberinfo: function(t) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/Fxmember",
            data: {
                openid: t
            },
            success: function(t) {
                console.log(t), o.setData({
                    memberInfo: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    MyAllNum: function(t) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/MyAllNum",
            data: {
                openid: t
            },
            success: function(t) {
                console.log(t), o.setData({
                    MyDownNum: t.data.data.MyDownNum,
                    MyOrderNum: t.data.data.MyOrderNum
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    // getUsetInfo: function(e) {
    //     "getUserInfo:ok" == e.detail.errMsg ? (this.close_modal(), 
    //     wx.setStorage({
    //         key: "useInfo",
    //         data: "true"
    //     }),
    //      wx.setStorage({
    //         key: "useInfo_d",
    //         data: e.detail.userInfo
    //     }), 
    //     this.getGetUid(e.detail.userInfo)) : this.setData({
    //         getUseInfo: !0
    //     });
    // },
    close_modal: function() {
        this.setData({
            getUseInfo: !1
        });
    },
    // getGetUid: function() {
    //     wx.login({
    //         success: function(e) {
    //             e.code ? app.util.request({
    //                 url: "entry/wxapp/GetUid",
    //                 data: {
    //                     code: e.code
    //                 },
    //                 success: function(e) {
    //                     if (!e.data.errno) {
    //                         wx.setStorageSync("openid", e.data.data);
    //                       var a = wx.getStorageSync("openid");//nickname  userheaderimg gender
    //                       var nickname = wx.getStorageInfoSync('nickname');
    //                       var userheaderimg = wx.getStorageInfoSync('userheaderimg');
    //                       var gender = wx.getStorageInfoSync('gender');
    //                         console.log(a),
    //                           app.util.request({
    //                             url: "entry/wxapp/Member",
    //                             cachetime: "30",
    //                             data: {
    //                               nickName: nickname,
    //                               avatarUrl: userheaderimg,
    //                               openid: a,
    //                               xingbie: gender
    //                             }
    //                           });
    //                         //  wx.getUserInfo({
    //                         //     success: function(e) {
    //                         //         var t = e.userInfo;
    //                         //         app.util.request({
    //                         //             url: "entry/wxapp/Member",
    //                         //             cachetime: "30",
    //                         //             data: {
    //                         //                 nickName: t.nickName,
    //                         //                 avatarUrl: t.avatarUrl,
    //                         //                 openid: a,
    //                         //                 xingbie: t.gender
    //                         //             }
    //                         //         });
    //                         //     }
    //                         // });
    //                     }
    //                 },
    //                 fail: function(e) {
    //                     console.log(e);
    //                 }
    //             }) : console.log("获取用户登录态失败！" + e.errMsg);
    //         }
    //     });
    // },
    getTitle: function() {
        app.util.request({
            url: "entry/wxapp/Title",
            success: function(e) {
                wx.setNavigationBarTitle({
                    title: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), setTimeout(function() {
            wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
        }, 1e3);
    },
    goUserInfor: function(e) {
        wx.navigateTo({
            url: "../detail/amend/amend"
        });
    },
    goMySubPage: function(e) {
      console.log(this.data.myList[5])
        wx.navigateTo({
            url: e.currentTarget.dataset.id + "/" + e.currentTarget.dataset.id
        });
    },
    goMyOrders: function() {
        wx.switchTab({
            url: 'myOrders/myOrders'
        })
    },
    goNews: function() {
        wx.navigateTo({
            url: '../news/news'
        })
    },
    goMyBonus: function() {
        wx.navigateTo({
            url: "myBonus/myBonus"
        });
    },
    goMyMoney: function() {
        wx.navigateTo({
            url: "myMoney/myMoney"
        });
    },
    goFenxiao: function() {
        let list = this.data.myList
        let state = this.data.distribution_status
        if (state == 2) {
            wx.showToast({
                title: '正在审核，不要急~',
                icon: 'none'
            })
        } else {
            wx.navigateTo({
                url: `${list[5].jumpPage}/${list[5].jumpPage}`
            });
        }
    },
    //触发登录，跳转

    gotologin: function () {
      wx.redirectTo({
        url: '../login/login'
      })
    },
    goMyConsumption: function() {
        wx.navigateTo({
            url: "myConsumption/myConsumption"
        });
    }
}, "onPullDownRefresh", function() {
    var e = this;
    wx.showNavigationBarLoading(), setTimeout(function() {
        wx.stopPullDownRefresh(), wx.hideNavigationBarLoading(), e.getMyDistribution(), 
        e.getMemberInfo();
    }, 1e3);
},


));
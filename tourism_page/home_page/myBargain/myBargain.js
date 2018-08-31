var app = getApp();

Page({
    data: {
        currentNav: 0
    },
    onLoad: function(t) {
        var a = t.nav;
        console.log("进来时选中全部为空"+a);
        a && this.setData({
            currentNav: a
        }), this.getMyBargainList(0);
    },
    onShow: function() {},
    onReady: function() {},
    getMyBargainList: function(t) {
        var a = this, e = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyBargainList",
            data: {
                keyword: t,
                openid: e
            },
            success: function(t) {
                console.log(t), a.setData({
                    List: t.data.data
                });
            }
        });
    },
    goToHexiao: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + a + "&types=3"
        });
    },
    changeCurrentNav: function(t) {
        var a = t.target.dataset.id;
        this.getMyBargainList(a), this.setData({
            currentNav: t.target.dataset.id
        });
    },
    goToPay: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.order_id, o = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: "../payDeails/payDeails?id=" + a + "&type=" + o + "&paystatus=1&order_id=" + e
        });
    },
    goToMessage: function(t) {
        var a = t.currentTarget.dataset.id;
        t.currentTarget.dataset.type;
        wx.navigateTo({
            url: "../../home_page/evaluation/evaluation?id=" + a + "&order_type=3"
        });
    },
    showModal: function() {
        wx.showToast({
            title: "已提醒商家发货"
        });
    },
    confirmReceipt: function() {
        wx.showModal({
            title: "",
            content: "确认收到货了吗？",
            success: function(t) {
                console.log(t);
            }
        });
    },
    goLookProgress: function() {
        wx.navigateTo({
            url: "../lookProgress/lookProgress"
        });
    },
    goEvaluation: function() {
        wx.navigateTo({
            url: "../evaluation/evaluation"
        });
    },
    goBargainDeails: function(t) {
        // var a = t.currentTarget.dataset.id;
        // wx.navigateTo({
        //     url: "../../detail/order_detail/order_detail?id=" + a + "&types=3"
        // });
        var a = t.currentTarget.dataset.aid;
        wx.navigateTo({
            url: "bargainDeails/bargainDeails?id=" + a
        });
    },
    fail_order: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.idx, o = this.data.List;
        console.log(a);
        var n = this;
        wx.showModal({
            title: "订单状态",
            content: "确认取消订单吗?",
            success: function(t) {
                t.confirm ? app.util.request({
                    url: "entry/wxapp/MyActivesdel",
                    data: {
                        id: a
                    },
                    success: function(t) {
                        console.log(t), 1 == t.data.data ? (o.splice(e, 1), n.setData({
                            List: o
                        }), wx.showToast({
                            title: "取消成功"
                        })) : wx.showModal({
                            title: "取消失败",
                            content: "请联系客服人员！",
                            showCancel: !1
                        });
                    }
                }) : t.cancel;
            }
        });
    },
    del: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.status, o = t.currentTarget.dataset.idx, n = this.data.List, i = this;
        wx.showModal({
            title: "订单状态",
            content: "确定要删除吗？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/MyBargaindel",
                    data: {
                        id: a,
                        state: e
                    },
                    success: function(t) {
                        console.log(t), 1 == t.data.data ? (wx.showToast({
                            title: "删除成功",
                            duration: 1e3
                        }), setTimeout(function() {
                            n.splice(o, 1), i.setData({
                                List: n
                            });
                        }, 1e3)) : wx.showModal({
                            title: "删除失败",
                            content: "请联系客服人员！",
                            showCancel: !1
                        });
                    }
                });
            }
        });
    }
});
var app = getApp();

Page({
    data: {
        currentNav: 0,
        t_tit: [ "全部", "拼团中", "已过期", "待核销", "待评价", "已完成" ]
    },
    onLoad: function(t) {
        this.getMyGroupList(0);
    },
    getMyGroupList: function(t) {
        var a = this, e = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyGroupList",
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
    del: function(t) {
        console.log(123);
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.status, o = this.data.List, n = t.currentTarget.dataset.idx;
        console.log(a, e);
        var i = this;
        wx.showModal({
            title: "订单状态",
            content: "删除不退还费用，确定要删除吗？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/MyGroupdel",
                    data: {
                        id: a,
                        state: e
                    },
                    success: function(t) {
                        console.log(t), 1 == t.data.data ? (wx.showToast({
                            title: "删除成功",
                            duration: 1e3
                        }), setTimeout(function() {
                            o.splice(n, 1), i.setData({
                                List: o
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
    },
    onShow: function() {},
    onReady: function() {},
    go_Orderinfo: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + a + "&types=4"
        });
    },
    changeCurrentNav: function(t) {
        var a = t.target.dataset.id;
        this.getMyGroupList(a), console.log(a), this.setData({
            currentNav: t.target.dataset.id
        });
    },
    goTeamworkStatus: function() {
        wx.navigateTo({
            url: "teamworkStatus/teamworkStatus"
        });
    },
    goTeamworkOrderDeails: function() {
        wx.navigateTo({
            url: "teamworkOrderDeails/teamworkOrderDeails"
        });
    },
    goToPay: function() {
        wx.navigateTo({
            url: "../payDeails/payDeails"
        });
    },
    goTeamworkDeails: function(t) {
        var a = t.currentTarget.dataset.acid;
        wx.navigateTo({
            url: "teamworkDeails/teamworkDeails?id=" + a
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
    }
});
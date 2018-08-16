var app = getApp();

Page({
    data: {
        currentTit: 0,
        showFilter: !1,
        currentFilter: 0
    },
    onLoad: function(t) {},
    onReady: function() {
        this.getMyOrderList();
    },
    getMyOrderList: function() {
        var e = this, t = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/MyPrivate",
            data: {
                openid: t
            },
            success: function(t) {
                console.log(t), e.setData({
                    MyOrderList: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onShow: function() {},
    changeCurrentFilter: function(t) {
        this.setData({
            currentFilter: t.target.dataset.id
        });
    },
    showFilter: function() {
        0 == this.data.showFilter ? this.setData({
            showFilter: !0
        }) : this.setData({
            showFilter: !1
        });
    },
    goEvaluation: function(t) {
        var e = t.currentTarget.dataset.order_type, a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../evaluation/evaluation?id=" + a + "&order_type=" + e
        });
    },
    goPay: function() {
        wx.navigateTo({
            url: "../payDeails/payDeails"
        });
    },
    goWriteOff: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + e + "&types=3"
        });
    },
    goHotplaceDetail: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.order_type;
        1 == a ? wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + e + "&types=" + a
        }) : 2 == a && wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + e + "&types=" + a
        });
    }
});
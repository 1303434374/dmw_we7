function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var app = getApp();

Page(_defineProperty({
    data: {
        currentTit: 0,
        titArr: [ "全部", "待付款", "待核销", "已出发", "待评价", "已结束" ]
    },
    onLoad: function(t) {},
    changeTit: function(t) {
        var e = this, a = t.currentTarget.dataset.id, r = wx.getStorageSync("openid");
        e.setData({
            currentTit: a
        }), console.log(a), app.util.request({
            url: "entry/wxapp/MyFxOrderList",
            data: {
                condition: a,
                openid: r
            },
            success: function(t) {
                console.log(t), e.setData({
                    list: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onReady: function() {
        var t = wx.getStorageSync("openid");
        this.getMyorderlist(t);
    },
    goPay: function() {
        wx.navigateTo({
            url: "../payDeails/payDeails"
        });
    },
    goWriteOff: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.order_type;
        1 == a ? wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + e + "&types=" + a
        }) : 2 == a && wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + e + "&types=" + a
        });
    },
    goEvaluation: function(t) {
        var e = t.currentTarget.dataset.order_type, a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../evaluation/evaluation?id=" + a + "&order_type=" + e
        });
    },
    goHotplaceDetail: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.order_type;
        1 == a ? wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + e + "&types=" + a
        }) : 2 == a && wx.navigateTo({
            url: "../../detail/order_detail/order_detail?id=" + e + "&types=" + a
        });
    },
    getMyorderlist: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/MyFxOrderList",
            data: {
                openid: t
            },
            success: function(t) {
                console.log(t), e.setData({
                    list: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    delOrderRecord: function() {
        wx.showModal({
            content: "确认要删除订单吗？",
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    }
}
// , 
// "goEvaluation", function() {
//     wx.navigateTo({
//         url: "../evaluation/evaluation"
//     });
// }
));
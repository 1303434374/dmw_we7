Page({
    data: {
        allPrice: 130,
        allIO: !1
    },
    onLoad: function(t) {},
    getPrice: function(t) {
        t.detail.value && this.setData({
            importPrice: t.detail.value
        });
    },
    allWithDraw: function() {
        this.setData({
            allIO: !0,
            importPrice: this.data.allPrice
        });
    },
    send: function() {
        this.data.importPrice ? console.log(this.data.importPrice) : wx.showToast({
            title: "请输入要提现的金额！",
            icon: "none"
        });
    }
});
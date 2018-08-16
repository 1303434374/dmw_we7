Page({
    data: {},
    onLoad: function(e) {},
    getPrice: function(e) {
        e.detail.value && this.setData({
            rechargePrice: e.detail.value
        });
    },
    send: function() {
        this.data.rechargePrice ? (console.log(this.data.rechargePrice), wx.requestPayment({
            timeStamp: "",
            nonceStr: "",
            package: "",
            signType: "MD5",
            paySign: "",
            success: function(e) {},
            fail: function(e) {}
        })) : wx.showToast({
            title: "请输入要充值的金额！",
            icon: "none"
        });
    }
});
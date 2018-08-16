Page({
    data: {
        groupVal: !1,
        orderSum: "133439798"
    },
    onLoad: function(o) {
        var a = this;
        wx.getUserInfo({
            success: function(o) {
                a.setData({
                    avatarUrl: o.userInfo.avatarUrl
                });
            }
        });
    },
    onShow: function() {},
    copyOrderRecord: function() {
        wx.setClipboardData({
            data: this.data.orderSum,
            success: function(o) {
                wx.showToast({
                    title: "复制成功",
                    icon: "success",
                    duration: 500
                });
            }
        });
    },
    makeCall: function() {
        wx.makePhoneCall({
            phoneNumber: "18734803913"
        });
    },
    goAddress: function() {
        wx.navigateTo({
            url: "../../../detail/shippingAddress/shippingAddress"
        });
    },
    getContact: function(o) {
        console.log(o);
    }
});
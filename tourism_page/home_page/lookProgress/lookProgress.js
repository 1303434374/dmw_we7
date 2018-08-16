Page({
    data: {
        a: 4,
        orderNum: "37628716387"
    },
    onReady: function() {},
    copyOrderRecord: function() {
        wx.setClipboardData({
            data: this.data.orderNum,
            success: function(t) {
                wx.showToast({
                    title: "复制成功",
                    icon: "success",
                    duration: 500
                });
            }
        });
    }
});
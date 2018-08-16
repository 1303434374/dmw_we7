var date = new Date();

Page({
    data: {
        startTime: "2010-01",
        thisTime: "",
        showTime: ""
    },
    onLoad: function(e) {
        var t = this, a = date.getMonth() + 1;
        wx.getUserInfo({
            success: function(e) {
                t.setData({
                    userInfo: e.userInfo
                });
            }
        }), a <= 9 && (a = "0" + a), this.setData({
            thisTime: date.getFullYear() + "-" + a,
            showTime: date.getFullYear() + "-" + a
        });
    },
    changeShowTime: function(e) {
        this.setData({
            showTime: e.detail.value
        });
    }
});
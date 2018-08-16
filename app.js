App({
    getUserInfo: function(o) {
        var n = this;
        this.globalData.userInfo ? "function" == typeof o && o(this.globalData.userInfo) : wx.login({
            success: function() {
                // wx.getUserInfo({
                //     success: function(t) {
                //         n.globalData.userInfo = t.userInfo, "function" == typeof o && o(n.globalData.userInfo);
                //     }
                // });
            }
        });
    },
    util: require("we7/resource/js/util.js"),
    globalData: {
        userInfo: null,
        code: "",
        openId: "",
        unionId: "",
        defaultAddress: ""
    },
    siteInfo: require("siteinfo.js"),
    dateformat_all: function(t) {
        return Math.floor(t / 3600 / 24) + "天" + Math.floor(t / 3600 % 24) + "时:" + Math.floor(t / 60 % 60) + "分:" + t % 60 + "秒";
    },
    dateformat_d: function(t) {
        return Math.floor(t / 3600 / 24);
    },
    dateformat_h: function(t) {
        return Math.floor(t / 3600 % 24);
    },
    dateformat_m: function(t) {
        return Math.floor(t / 60);
    },
    dateformat_s: function(t) {
        return t / 1;
    }
});
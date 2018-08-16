var app = getApp();

Page({
    data: {
        address_id: "",
        infor_num: 0
    },
    onLoad: function(t) {
        var a = this;
        a.setData({
            address_id: a.options.address_id
        });
        var i = a.options.address_id;
        this.getHotAddressIn(i);
    },
    onReady: function() {},
    getHotAddressIn: function(t) {
        var i = this;
        app.util.request({
            url: "entry/wxapp/HotAddressIn",
            data: {
                id: t
            },
            success: function(t) {
                console.log(t);
                var a = t.data.data.information.slice(0, 2);
                i.setData({
                    HotAddressIn: t.data.data,
                    HotZhuti: t.data.data.zhuti,
                    strategy: t.data.data.strategy,
                    information: t.data.data.information,
                    new_infor: a,
                    attractions: t.data.data.attractions
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    goSort: function(t) {
        wx.navigateTo({
            url: "sort/sort?id=" + t.currentTarget.dataset.id + "&address_id=" + this.data.address_id
        });
    },
    morePlay: function() {
        wx.switchTab({
            url: "../../index/index"
        });
    },
    moreRoute: function() {
        wx.switchTab({
            url: "../../raiders/raiders"
        });
    },
    moreClassic: function() {
        var t = this.data.new_infor, a = this.data.infor_num, i = this.data.information;
        if (a < i.length) {
            a += 2;
            var e = i.slice(a, a + 2);
            t = t.concat(e);
        }
        this.setData({
            new_infor: t,
            infor_num: a
        });
    },
    moreTheme: function(t) {
        var a = this.options.address_id;
        console.log(a), wx.navigateTo({
            url: "sort/sort?id=4&address_id=" + a
        });
    },
    goArticle: function(t) {
        var a = t.currentTarget.dataset.tuwenid;
        wx.navigateTo({
            url: "sort/sortDeails/sortDeails?id=" + a
        });
    },
    goClassicDeails: function(t) {
        var a = t.currentTarget.dataset.informationid;
        wx.navigateTo({
            url: "classicDeails/classicDeails?id=" + a
        });
    },
    goRouteDeails: function(t) {
        wx.navigateTo({
            url: "routeDeails/routeDeails?strategy_id=" + t.currentTarget.dataset.id
        });
    },
    goOrdinaryDeails: function(t) {
        t.currentTarget.dataset.attractionsid;
        wx.navigateTo({
            url: "../../detail/hotplace_detail/hotplace_detail?id=" + t.currentTarget.dataset.attractionsid
        });
    }
});
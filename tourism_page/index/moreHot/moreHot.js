var app = getApp();

Page({
    data: {
        currentCity: 0,
        cityList: [],
        hot_sum: 4,
        city_sum: 4,
        show_type: !1
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.getHotAddress(), this.setData({
            hot_sum: 4,
            city_sum: 4
        });
    },
    getHotAddress: function() {
        var i = this;
        app.util.request({
            url: "entry/wxapp/HotAddress",
            success: function(t) {
                console.log(t);
                var a = t.data.data.slice(0, 4);
                i.setData({
                    cityList: a,
                    cityList1: t.data.data
                }), console.log(i.data.cityList);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    addData: function(t) {
        var a = t.currentTarget.dataset.type;
        if ("hot" == a) {
            var i = this.data.cityList1, s = this.data.hot_sum, e = this.data.cityList;
            if (s < i.length) {
                var c = this.data.cityList1.slice(s, s + 4);
                e = e.concat(c), this.setData({
                    cityList: e,
                    hot_sum: s + 4
                });
            }
        } else if ("city" == a) {
            var d = this.data.cityImg, n = this.data.city_sum, o = this.data.new_cityImg;
            if (n < d.length) {
                c = this.data.cityImg.slice(n, n + 4);
                o = o.concat(c), this.setData({
                    new_cityImg: o,
                    city_sum: n + 4
                });
            }
        }
    },
    changeCity: function(t) {
        var a = t.target.dataset.id;
        this.setData({
            currentCity: a,
            city_sum: 4
        });
        var i = this;
        app.util.request({
            url: "entry/wxapp/ChangeCity",
            data: {
                address_id: a
            },
            success: function(t) {
                console.log(t);
                var a = t.data.data.slice(0, 4);
                i.setData({
                    cityImg: t.data.data,
                    new_cityImg: a
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    goRaidersDeails: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../../raiders/raidersDeails/raidersDeails?address_id=" + a
        });
    },
    goRaidersDeails1: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/tourism_page/detail/hotplace_detail/hotplace_detail?id=" + a
        });
    }
});
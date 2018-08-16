var _Page;

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var app = getApp();

Page((_defineProperty(_Page = {
    data: {
        currentItem: 0,
        currentNav: 0,
        dayMillisecond1: 2592e3,
        dayClock: 30
    },
    onLoad: function(e) {
        var t = this;
        setTimeout(function() {
            t.timer();
        }, 10);
    },
    onReady: function() {
        this.getbanner();
    },
    getbanner: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/set",
            cachetime: "30",
            success: function(e) {
                console.log(e), t.setData({
                    banner: e.data.data,
                    swiperIdx: e.data.data.length
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    timer: function() {
        var a = this;
        new Promise(function(e, t) {
            setInterval(function() {
                a.setData({
                    dayClock: app.dateformat1(a.data.dayMillisecond1--)
                });
            }, 1e3);
        }).then(function(e) {
            clearInterval(e);
        });
    }
}, "onReady", function() {
    this.getbanner();
}), _defineProperty(_Page, "currentItem", function(e) {
    this.setData({
        currentItem: e.detail.current
    });
}), _defineProperty(_Page, "getbanner", function() {
    var t = this;
    app.util.request({
        url: "entry/wxapp/set",
        cachetime: "30",
        success: function(e) {
            t.setData({
                banner: e.data.data,
                swiperIdx: e.data.data.length
            });
        },
        fail: function(e) {
            console.log(e);
        }
    });
}), _defineProperty(_Page, "changeNav", function(e) {
    this.setData({
        currentNav: e.target.dataset.id
    });
}), _defineProperty(_Page, "goBarginDeails", function() {
    wx.navigateTo({
        url: "../../home_page/myBargain/bargainDeails/bargainDeails"
    });
}), _Page));
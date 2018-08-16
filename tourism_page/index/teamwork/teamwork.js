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
        t.getbanner(), t.getTitle(), t.getGroupList();
    },
    onReady: function() {},
    getTitle: function() {
        app.util.request({
            url: "entry/wxapp/Title",
            success: function(e) {
                console.log(e), wx.setNavigationBarTitle({
                    title: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getGroupList: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/GroupList",
            success: function(e) {
                console.log(e), t.setData({
                    GroupList: e.data.data
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getbanner: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/set",
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
}), _defineProperty(_Page, "goBarginDeails", function(e) {
    var t = e.currentTarget.dataset.id;
    wx.navigateTo({
        url: "../../home_page/myTeamwork/teamworkDeails/teamworkDeails?id=" + t
    });
}), _Page));
Page({
    data: {
        swiper: {
            indicatorDots: !0,
            autoplay: !0,
            interval: 3e3,
            duration: 500,
            imgUrls: [ "../resource/images/swiper_item.png", "../resource/images/swiper_item.png" ]
        },
        nav: {
            nav_list: [ "门诊", "脑外科", "妇科", "妇产科", "血液科", "皮肤科" ],
            currentTab: 0
        }
    },
    swichNav: function(n) {
        var t = this.data.nav;
        t.currentTab = n.currentTarget.dataset.current, this.setData({
            nav: t
        });
    },
    onLoad: function(n) {
        if (null != n.index) {
            var t = this.data.footer;
            t.footdex = n.index, this.setData({
                footer: t
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
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
        },
        footer: {
            footdex: 0,
            txtcolor: "#A2A2A2",
            seltxt: "#EC6464",
            background: "#fff",
            list: [ {
                url: "/pages/index/index",
                icons: "/pages/resource/images/f_1.png",
                selIcon: "/pages/resource/images/f_1_sel.png",
                text: "探一探"
            }, {
                url: "/pages/mine/mine",
                icons: "/pages/resource/images/f_2.png",
                selIcon: "/pages/resource/images/f_2_sel.png",
                text: "个人"
            } ]
        }
    },
    swichNav: function(e) {
        var n = this.data.nav;
        n.currentTab = e.currentTarget.dataset.current, this.setData({
            nav: n
        });
    },
    onLoad: function(e) {
        if (null != e.index) {
            var n = this.data.footer;
            n.footdex = e.index, this.setData({
                footer: n
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
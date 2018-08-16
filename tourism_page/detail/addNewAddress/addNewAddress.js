var app = getApp();

Page({
    data: {
        regionVal: ""
    },
    onLoad: function(e) {
        var t = e.address_id;
        e.first && this.setData({
            first: e.first
        }), "" != t && null != t && this.Receiving_once(t);
    },
    onReady: function() {},
    onShow: function() {},
    changeRegion: function(e) {
        this.setData({
            regionVal: e.detail.value
        });
    },
    Receiving_once: function(e) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/Receiving_once",
            data: {
                id: e
            },
            success: function(e) {
                console.log(e), t.setData({
                    Receiving_once: e.data.data
                });
            }
        });
    },
    formSubmit: function(e) {
        var t = e.detail.value, i = this.data.Receiving_once, s = this.data.first;
        if (this.data.oldVal && this.data.oldVal.constructor == Number && (t.value = this.data.oldVal), 
        console.log(t), "" == t.name) wx.showToast({
            title: "请输入收货人姓名",
            icon: "none"
        }); else if (/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(t.tel) && 11 == t.tel.length) if (t.address.length < 1 && "" == i.province) wx.showToast({
            title: "请填写所在地区",
            icon: "none"
        }); else if ("" == t.detailAddress) wx.showToast({
            title: "请填写详细地址",
            icon: "none"
        }); else {
            var n = this;
            t.address.length < 1 && i.province && (t.address.push(i.province), t.address.push(i.city), 
            t.address.push(i.county)), console.log(t);
            var o = JSON.stringify(t);
            console.log(o);
            var a = wx.getStorageSync("openid"), d = n.options.address_id;
            console.log(d), app.util.request({
                url: "entry/wxapp/AddAddress",
                data: {
                    data: o,
                    openid: a,
                    id: d
                },
                success: function(e) {
                    if (console.log(e), 1 == e.data.data) {
                        var t = n.options.id, i = n.options.type;
                        s ? wx.redirectTo({
                            url: "../shippingAddress/shippingAddress?id=" + t + "&type=" + i + "&no_A=true"
                        }) : wx.redirectTo({
                            url: "../shippingAddress/shippingAddress?id=" + t + "&type=" + i
                        });
                    }
                }
            });
        } else wx.showToast({
            title: "请输入正确的手机号",
            icon: "none"
        });
    },
    backShippingAddress: function() {}
});
var app = getApp(), defaultAddress = app.globalData.defaultAddress;

Array.prototype.remove = function(e, t) {
    var s = this.slice((t || e) + 1 || this.length);
    return this.length = e < 0 ? this.length + e : e, this.push.apply(this, s);
}, Page({
    data: {},
    onLoad: function(e) {
        this.Receiving_Info(), e.id && e.type && e.no_A ? (console.log(e.no_A), this.setData({
            first_address: e.no_A,
            selectAddress: !0
        })) : e.id && e.type && this.setData({
            selectAddress: !0
        }), e.id && e.pt_order && e.no_A ? this.setData({
            first_address: e.no_A,
            selectAddress: !0,
            pt_order: e.pt_order
        }) : e.pt_order && this.setData({
            selectAddress: !0
        });
    },
    onShow: function() {},
    Receiving_Info: function() {
        var s = this, e = wx.getStorageSync("openid");
        app.util.request({
            url: "entry/wxapp/Receiving_Info",
            data: {
                openid: e
            },
            success: function(e) {
                var t = e.data.data;
                s.setData({
                    Receiving_List: t
                });
            }
        });
    },
    selectAddress: function(e) {
        var t = e.currentTarget.dataset.idx, s = this.data.Receiving_List, a = this.data.first_address;
        console.log(a), wx.showToast({
            title: "选择成功",
            icon: "success",
            duration: 1e3
        });
        var i = getCurrentPages();
        a && !this.data.pt_order ? (console.log(i), i[i.length - 3].data.address_arr = s[t], 
        setTimeout(function() {
            wx.navigateBack({
                delta: 2
            });
        }, 1e3)) : (console.log(i), i[i.length - 2].data.address_arr = s[t], setTimeout(function() {
            wx.navigateBack({
                delta: 1
            });
        }, 1e3));
    },
    changeDeafultAddress: function(e) {
        var s = this, a = e.currentTarget.dataset.idx, t = wx.getStorageSync("openid"), i = e.currentTarget.dataset.id, d = this.data.Receiving_List;
        console.log(a), app.util.request({
            url: "entry/wxapp/ReceivingMoren",
            data: {
                id: i,
                openid: t
            },
            success: function(e) {
                if (console.log(e), 1 == e.data.data) {
                    for (var t = 0; t < d.length; t++) d[t].status = 0;
                    d[a].status = 1, wx.showToast({
                        title: "更改成功!"
                    });
                } else wx.showModal({
                    content: "系统错误，更改默认地址失败！",
                    showCancel: !1
                });
                s.setData({
                    Receiving_List: d
                });
            }
        });
    },
    addNewAddress: function(e) {
        var t = this.options.id, s = this.options.type, a = e.currentTarget.dataset.address_id;
        s ? wx.navigateTo({
            url: "../addNewAddress/addNewAddress?id=" + t + "&type=" + s + "&address_id=" + a + "&first=true"
        }) : wx.navigateTo({
            url: "../addNewAddress/addNewAddress?id=" + t + "&address_id=" + a + "&first=true"
        });
    },
    delAddress: function(e) {
        var s = this, a = e.currentTarget.dataset.id, t = e.currentTarget.dataset.delid;
        console.log(t), wx.showModal({
            title: "",
            content: "确认要删除此收货地址吗？",
            confirmColor: "#15e4d1",
            success: function(e) {
                1 == e.confirm && app.util.request({
                    url: "entry/wxapp/Receiving_del",
                    data: {
                        id: t
                    },
                    success: function(e) {
                        if (console.log(e), 1 == e.data.data) {
                            s.data.Receiving_List.remove(a);
                            for (var t = 0; t < s.data.Receiving_List.length; t++) s.data.Receiving_List[t].value = t;
                            s.setData({
                                Receiving_List: s.data.Receiving_List
                            }), wx.showToast({
                                title: "删除成功"
                            });
                        } else wx.showToast({
                            title: "删除失败",
                            image: "../../resource/icon/error.png"
                        });
                    }
                });
            }
        });
    }
});
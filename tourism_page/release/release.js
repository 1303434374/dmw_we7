var app = getApp();

Page({
    data: {
        picPath: [],
        showtakePic: 0,
        showUpLoad: 0,
        url: "",
        uniacid: ""
    },
    onLoad: function(t) {
        var a = this;
        this.getTitle(), app.util.request({
            url: "entry/wxapp/ImgUrl",
            success: function(t) {
                a.setData({
                    url: t.data.data.url,
                    uniacid: t.data.data.uniacid
                });
            }
        });
    },
    onReady: function() {},
    getTitle: function() {
        app.util.request({
            url: "entry/wxapp/Title",
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: t.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getUserText: function(t) {
        this.setData({
            userText: t.detail.value
        });
    },
    uploadDIY: function(t, a, e, i, o) {
        var n = this, s = this, c = s.data.uniacid, u = s.data.picPath;
        wx.uploadFile({
            url: s.data.url + "app/index.php?i=" + c + "&c=entry&a=wxapp&do=Upload&m=tourism_page",
            filePath: t[i],
            name: "upfile",
            success: function(t) {
                a++, u.push(t.data), s.setData({
                    picPath: u
                });
            },
            fail: function(t) {
                e++;
            },
            complete: function() {
                ++i == o ? (wx.hideLoading(), console.log("总共" + a + "张上传成功," + e + "张上传失败！")) : n.uploadDIY(t, a, e, i, o);
            }
        });
    },
    upLoadPic: function() {
        var e = this;
        wx.chooseImage({
            count: 9 - e.data.picPath.length,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                t.tempFilePaths;
                var a = t.tempFilePaths.length;
                e.uploadDIY(t.tempFilePaths, 0, 0, 0, a), console.log(e.data.picPath);
            }
        });
    },
    tipsUpload: function() {
        wx.showModal({
            title: "温馨提示",
            content: "上传图片最多9张！",
            showCancel: !1
        });
    },
    sendUserCont: function() {
        var a = this, t = a.data.picPath, e = a.data.userText, i = wx.getStorageSync("openid");
        0 == t.length && null == e || "" == e ? wx.showToast({
            title: "请输入内容或添加图片",
            icon: "none"
        }) : app.util.request({
            url: "entry/wxapp/PlayRecordAdd",
            data: {
                picPath: t,
                userText: e,
                openid: i
            },
            success: function(t) {
                1 == t.data.data && (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    a.setData({
                        userText: "",
                        picPath: []
                    }), wx.switchTab({
                        url: "../stroke/stroke"
                    });
                }, 1500));
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    delImg: function(t) {
        var a = t.currentTarget.dataset.id, e = this.data.picPath, i = this;
        wx.showModal({
            title: "提示",
            content: "确定删除吗?",
            success: function(t) {
                t.confirm && (e.splice(a, 1), i.setData({
                    picPath: e
                })), console.log(e);
            }
        });
    }
});
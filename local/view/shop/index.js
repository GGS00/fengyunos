           wx.config({
                appId: '<?php echo $signPackage["appId"]; ?>',
                timestamp: '<?php echo $signPackage["timestamp"]; ?>',
                nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
                signature: '<?php echo $signPackage["signature"]; ?>',
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'getNetworkType'
                ]
            });
            wx.ready(function() {
                // 在这里调用 API
                readyshare();
            });

            alert(SHARE_TITTLE);
            function readyshare()
            {

                var randommun = GetRandomNum();
                var sharelink = ShreShopCommonLink + "?alias=" + GLOB_ALIAS + "&aid=" + GLOB_AID + "?isshare=1?" + randommun;
                if (GLOB_SHOPID) {
                    sharelink = ShreShopCommonLink + "?alias=" + GLOB_ALIAS + "&aid=" + GLOB_AID + "&shopid=" + GLOB_SHOPID + "?isshare=1?" + randommun;
                }

                wx.onMenuShareTimeline({
                    title: SHARE_TITTLE,
                    link: sharelink,
                    imgUrl: "" + ShareShopPublicLink + "/App/Modules/weixin/weixinportal/images/shareshopico.png",
                    success: function(res) {
                        var param = "代理商朋友圈分享";
                        _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                        shopsharelog();
                    }
                });




                wx.onMenuShareAppMessage({
                    title: SHARE_TITTLE,
                    desc: SHARE_TEXT,
                    link: sharelink,
                    imgUrl: "" + ShareShopPublicLink + "/App/Modules/weixin/weixinportal/images/shareshopico.png",
                    success: function(res) {
                        var param = "代理商指定好友分享";
                        _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                        shopsharelog();
                    }
                });



                wx.onMenuShareQQ({
                    title: SHARE_TITTLE,
                    desc: SHARE_TEXT,
                    link: sharelink,
                    imgUrl: "" + ShareShopPublicLink + "/App/Modules/weixin/weixinportal/images/shareshopico.png",
                    success: function(res) {
                        var param = "代理商分享到QQ";
                        _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                        shopsharelog();
                    }
                });



                wx.onMenuShareWeibo({
                    title: SHARE_TITTLE,
                    desc: SHARE_TEXT,
                    link: sharelink,
                    imgUrl: "" + ShareShopPublicLink + "/App/Modules/weixin/weixinportal/images/shareshopico.png",
                    success: function(res) {
                        var param = "代理商分享到微博";
                        _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                        shopsharelog();
                    }
                });
                
                 wx.getNetworkType({
                    success: function (res) {
                      if(res.networkType.indexOf("wifi")>-1){
                          playbgmusic();
                      }
                    },
                    fail: function (res) {
                      alert(JSON.stringify(res));
                    }
              });
            }


            function shopsharelog()
            {

                //店铺分享页面
                var aid = request.QueryString("aid");
                $.ajax({
                    type: "get",
                    url: "" + Comm_Config + "wx/addShareShop.do",
                    data: {"agentid": aid},
                    success: function(data) {
                        //分享日志统计，成功与否，不做反馈
                    }
                });
            }
<?php
error_reporting(0);
require_once "./publicWxAction/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=0.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <link href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
        <link href="http://cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="http://cdn.bootcss.com/Buttons/1.1.1/css/buttons.min.css" rel="stylesheet">
        <link  rel="stylesheet" href="./css/wshop.css?12311220">
        <title>商城搜索结果</title>
    </head>
    <body>

        <div class="wshop-top" id="goodsListTopId">
            <div class="top-arealist" onclick="history.go(-1)">
                <i class="fa fa-arrow-left"></i> 
                <span>返回</span>
            </div>
            <div class="search-top-shot">
                <div class="search-input">
                    <i class=" icon-search icon-large"></i> 
                    <input type="search"class="searchinput" placeholder="输入关键字查找本店商品" onfocus="searchGoodsByName()" id="goodsListinputId">
                  
                </div>
            </div>
            <div class="top-arealist" onclick="gotoshophome()" >
                <i class="fa fa-home"></i> 
                <span>首页</span>
            </div>

        </div>




        <div class="shoplistcontain" id="goodsLitContainId">
            <div class="shoplist-tittle">
                共计：<span id="goodsNumberSpanId">0</span>件商品

                 <div style="float:right">
                    <span onclick="selectgoodsbyincrease(1)"><i class="fa fa-sort-amount-asc"></i>&nbsp;高价排序</span>
                    <span onclick="selectgoodsbyincrease(2)"><i class="fa fa-sort-amount-desc"></i>&nbsp;低价排序</span>
                </div>
               
                
            </div>
            <div class="goodslistdiv" id="goodslistdiv">

            </div>
        </div>



        <script src="http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
        <script src="http://cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="http://cdn.bootcss.com/jquery.lazyload/1.9.1/jquery.lazyload.min.js"></script>
        <script src="./commonJs/config.js?12111049"></script>
        <script src="./js/wshopjs.js?021909188"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script>
                xshopListReady(0);
                wx.config({
                    appId: '<?php echo $signPackage["appId"]; ?>',
                    timestamp: <?php echo $signPackage["timestamp"]; ?>,
                    nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
                    signature: '<?php echo $signPackage["signature"]; ?>',
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo'
                    ]
                });
                wx.ready(function() {
                    // 在这里调用 API
                    readyshare();
                });

                function readyshare()
                {
                    var randommun = GetRandomNum();
                    wx.onMenuShareTimeline({
                        title: SHARE_TITTLE,
                        link: "" + ShreShopCommonLink + "?alias=" + GLOB_alias + "&aid=" + GLOB_AID + "?isshare=1?" + randommun + "",
                        imgUrl: "" + ShareShopPublicLink + "/App/Modules/weixin/weixinportal/images/shareshopico.png",
                        success: function(res) {
                            var param = "代理商：" + GLOB_AID + ";分享到朋友圈";
                            _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                            shopsharelog();
                        }
                    });




                    wx.onMenuShareAppMessage({
                        title: SHARE_TITTLE,
                        desc: SHARE_TEXT,
                        link: "" + ShreShopCommonLink + "?alias=" + GLOB_alias + "&aid=" + GLOB_AID + "?isshare=1?" + randommun + "",
                        imgUrl: "" + ShareShopPublicLink + "/App/Modules/weixin/weixinportal/images/shareshopico.png",
                        success: function(res) {
                            var param = "代理商：" + GLOB_AID + ";指定好友分享";
                            _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                            shopsharelog();
                        }
                    });



                    wx.onMenuShareQQ({
                        title: SHARE_TITTLE,
                        desc: SHARE_TEXT,
                        link: "" + ShreShopCommonLink + "?alias=" + GLOB_alias + "&aid=" + GLOB_AID + "?isshare=1?" + randommun + "",
                        imgUrl: "" + ShareShopPublicLink + "/App/Modules/weixin/weixinportal/images/shareshopico.png",
                        success: function(res) {
                            var param = "代理商：" + GLOB_AID + ";分享到QQ";
                            _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                            shopsharelog();
                        }
                    });



                    wx.onMenuShareWeibo({
                        title: SHARE_TITTLE,
                        desc: SHARE_TEXT,
                        link: "" + ShreShopCommonLink + "?alias=" + GLOB_alias + "&aid=" + GLOB_AID + "?isshare=1?" + randommun + "",
                        imgUrl: "" + ShareShopPublicLink + "/App/Modules/weixin/weixinportal/images/shareshopico.png",
                        success: function(res) {
                            var param = "代理商：" + GLOB_AID + ";分享到微博";
                            _hmt.push(['_trackEvent', '云店铺', '云店铺分享', param]);
                            shopsharelog();
                        }
                    });
                }

        </script>      
    </body>
</html>

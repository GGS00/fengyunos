<?php
error_reporting(0);
require_once "./../publicWxAction/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=0.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <link href="./../lib/bootstrap.min.css" rel="stylesheet">
        <!--<link href="//cdn.bootcss.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet">-->
        <link href="./../lib/owl.carousel.min.css" rel="stylesheet">
        <link href="./../lib/owl.theme.min.css" rel="stylesheet">
        <link  rel="stylesheet" href="./../css/wshop.css?12101024">
        <title>我的小店</title>

    </head>
    <body onload="shopready()">

        <div class="wshop-top"  id="shopHomeTopid" >
            <div class="top-arealist" onclick="showslider()">
                <i class=" icon-list-ul icon-large"></i> 
                <span>分类</span>
            </div>
            <div class="search-top">
                <div class="search-input">
                    <i class=" icon-search icon-large"></i> 
                    <input type="search"class="searchinput" id="homeinputsearch" placeholder="输入关键字查找本店商品" onfocus="searchGoodsByName()">

                    <img src="./../source/voiceico.png" height="100%;" style="float:right" onclick="startvoicepage(1)">
                </div>
            </div>
        </div>

        <div class="wshop-top" id="goodsListTopId" style="display:none">
            <div class="top-arealist" onclick="shopHomeModel()">
                <i class=" icon-chevron-left icon-large"></i> 
                <span>返回</span>
            </div>
            <div class="search-top-shot">
                <div class="search-input">
                    <i class=" icon-search icon-large"></i> 
                    <input type="search"class="searchinput" placeholder="输入关键字查找本店商品">
                    <img src="./../source/voiceico.png" height="100%;" style="float:right" onclick="startvoicepage()">
                </div>
            </div>
            <div class="top-arealist" >
                <i class="icon-th icon-large"></i> 
                <span>列表</span>
            </div>

        </div>

        <div class="sliderpage" id="sliderpage">
            <div class="sliderpage-recover" onclick="hidenslider()"></div>
            <div class="sliderpage-slider">
                <span class="sliderpage-tittle" onclick="hidenslider()">
                    <i class="  icon-angle-left icon-large"></i> &nbsp; &nbsp;专区分类
                </span>

                <div class="sliderpage-ul" id="sliderpageul">


                </div>
            </div>
        </div>

        <div class="shop-contain" id="shopcontain">

            <div id="owl-demo" class="owl-carousel">

                <!--<div class="item"><img src="./../images/miportal.png" alt="小米手机" onclick="reGetBrandList(1)"></div>-->
                <div class="item"><img src="./../source/newbanneriphone6s.jpg" alt="苹果" onclick="reGetBrandList(6)"></div>
                <div class="item"><img src="./../source/newbannermeizu.jpg" alt="魅族" onclick="reGetBrandList(22)"></div>
                <div class="item"><img src="./../source/newbannersanxing.jpg" alt="三星" onclick="reGetBrandList(3)"></div>

            </div>

            <!-- 店铺信息-->
            <div class="agent-shotshow" >
                <buttom class="button button-glow button-rounded button-caution" id="spanshopname" onclick="gotoBossDetail()">店铺详情</buttom>
            </div>

            <!-- 热门分类-->



            <div class="hotcatelist">
                <div class="hotcatetittle">
                    <span>热门品牌</span>
                    <a style="float:right;font-size: 110%" onclick="showslider()">全部分类</a>
                </div>
                <div class="hotcatecontain">
                    <div class="hotcateblock" onclick="toAreaZoon(8)">
                        <img src="./../source/phonelogo/huaweilogo.png">
                        <span>华为</span>
                    </div>
                    <div class="hotcateblock" onclick="toAreaZoon(2)">
                        <img src="./../source/phonelogo/applelogo.png">
                        <span>苹果</span>
                    </div>
                    <div class="hotcateblock" onclick="toAreaZoon(3)">
                        <img src="./../source/phonelogo/xiaomilogo.png">
                        <span>小米</span>
                    </div>
                    <div class="hotcateblock" onclick="toAreaZoon(7)">
                        <img src="./../source/phonelogo/sanxinglogo.png">
                        <span>三星</span>
                    </div>
                    <div class="hotcateblock" onclick="toAreaZoon(9)">
                        <img src="./../source/phonelogo/lianxianglogo.png">
                        <span>联想</span>
                    </div>

                    <div class="hotcateblock" onclick="toAreaZoon(1)">
                        <img src="./../source/phonelogo/meizulogo.png">
                        <span>魅族</span>
                    </div>
                    <div class="hotcateblock" onclick="toAreaZoon(10)">
                        <img src="./../source/phonelogo/kupailogo.png">
                        <span>酷派</span>
                    </div>


                </div>
            </div>
            <!-- 特色板块-->

            <!-- 店主推荐-->
            <div class="boss-hot" id="bosshotId">
                <div class="hotcatetittle">
                    <span id="top1id">店主推荐</span>
                    <div class="btn-group" style="margin-right: -2%;float: right">
                        <button type="button" class="btn  btn-success dropdown-toggle btn-xs" 
                                data-toggle="dropdown">
                            筛选 <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" style=" min-width: auto;left: -50px" role="menu">
                            <li onclick="selectgoodsbyincrease(1)"><a>价格升序<i id="arrowchoose" class="icon-caret-up"></i></a></li>
                            <li onclick="selectgoodsbyincrease(2)"><a>价格降序<i id="arrowchoose" class="icon-caret-down"></i></a></li>  
                        </ul>
                    </div>
                </div>

                <div id="booshotgoodsListId">

                </div>
            </div>

        </div>
        <!--  语音模块-->
        <section class="voicerecod-block" id="voicepageid">
            <span class="speak-span" id="speakloudy">
                点击麦克风图标开始说话
            </span>
            <div class="textlist" id="textlistid">
<!--                <span>你好</span>
                 <span>你好</span>-->
            </div>
            <div class="loadzoon" style="display:none"   id="preloaddiv">
                <div class="loader-inner line-scale-pulse-out">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <span style="font-size: 170%;display: none" id="tipsspanid">解析中...</span>
            </div>
            <div class="realbtndiv">
                <img src="./../source/mirounwork.png" width="50px;" style="display:none" id="voiceicoId" >
                <img src="./../source/mircoon.png" width="50px;" style="display:none" id="mircoonId" onclick="stoprecord()">
                <img src="./../source/mircooff.png" width="50px" id="mircooffid" onclick="startvoice()">
            </div>

            <div class="closediv" onclick="closevoicepage(1)"><i class=" icon-remove icon-large"></i> </div>
        </section>

        <!--收藏的引导-->
        <section class="storesectionclass" id="storesectionid" onclick="missStoreBanner()">
            <img src="source/shoucangbanner.png" width="100%">
        </section>

        <div class="public-cover" id="public_coverid">
            <i class="icon-refresh icon-spin"></i>
        </div>

        <button type="button" id="scanQRCodehome" style="display: none" >扫描</button>
        <button type="button" id="startRecord" style="display: none" >录音</button>
        <button type="button"  id="stopRecord" style="display: none" >停止录音</button>
        <button type="button" id="translateVoice" style="display: none" >智能识别</button>

        <script src="./../lib/jquery.min.js"></script>
        <script src="./../lib/bootstrap.min.js"></script>
        <script src="./../lib/owl.carousel.min.js"></script>
        <script src="./../lib/jquery.lazyload.min.js"></script>
        <script src="./../commonJs/config.js?12111048"></script>
        <script src="./../js/wshopjs.js?12111732"></script>

        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script>
            getShopInit();
            wx.config({
                appId: '<?php echo $signPackage["appId"]; ?>',
                timestamp: <?php echo $signPackage["timestamp"]; ?>,
                nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
                signature: '<?php echo $signPackage["signature"]; ?>',
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'scanQRCode',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'translateVoice',
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

            document.querySelector('#scanQRCodehome').onclick = function() {
                wx.scanQRCode({
                    needResult: 0,
                    desc: 'scanQRCode desc',
                    scanType: ["qrCode"],
                    success: function(res) {
                        //alert(res);

                        _ecodeBanding(res);
                    },
                    fail: function(res) {

                        alert(JSON.stringify(res));
                    }
                });
            };

            // 3 智能接口
            var voice = {
                localId: '',
                serverId: ''
            };
            // 3.1 识别音频并返回识别结果
            document.querySelector('#translateVoice').onclick = function() {
                if (voice.localId == '') {
                    //getuservoice('uservoiceundefine');
                    return;
                }
                wx.translateVoice({
                    localId: voice.localId,
                    complete: function(res) {
                        if (res.hasOwnProperty('translateResult')) {
                            getuservoice(res.translateResult);
                        } else {
                            getuservoice('uservoiceundefine');
                        }
                    }
                });
            };
            // 4 音频接口
            // 4.2 开始录音
            document.querySelector('#startRecord').onclick = function() {
                wx.startRecord({
                    cancel: function() {
                        alert('用户拒绝授权录音');
                    }
                });
            };

            // 4.3 停止录音
            document.querySelector('#stopRecord').onclick = function() {
                wx.stopRecord({
                    success: function(res) {
                        voice.localId = res.localId;
                        $("#translateVoice").click();
                    },
                    fail: function(res) {
                        $("#translateVoice").click();
                    }
                });
            };


            function readyshare()
            {

                var randommun = GetRandomNum();
                var sharelink = ShreShopCommonLink + "?alias=" + GLOB_alias + "&aid=" + GLOB_AID + "?isshare=1?" + randommun;
                if (GLOB_SHOPID) {
                    sharelink = ShreShopCommonLink + "?alias=" + GLOB_alias + "&aid=" + GLOB_AID + "&shopid=" + GLOB_SHOPID + "?isshare=1?" + randommun;
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
            }
        </script>     
        <script>
            $(document).ready(function() {
                
                $("#owl-demo").owlCarousel({
                    autoPlay: 3000, //Set AutoPlay to 3 seconds
                    items: 1,
                    itemsDesktop: [1199, 1],
                    itemsDesktopSmall: [979, 1],
                    pagination: false
                });

            });
            
            
            function tmppageready(){
                $("#public_coverid").fadeOut();
            }
        </script>

    </body>
</html>

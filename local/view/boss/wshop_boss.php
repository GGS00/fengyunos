<?php
error_reporting(0);
require_once "../publicWxAction/jssdk.php"; 
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
        <title>店铺详情</title>
        <meta name="viewport" content="width=device-width, initial-scale=0.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
        <link href="//cdn.bootcss.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet">
        <link href="//cdn.bootcss.com/Buttons/1.1.1/css/buttons.min.css" rel="stylesheet">
        <link  rel="stylesheet" href="../../css/old/wshop.css?11201005">

    </head>
    <body onload="bossPageReady()">
       
        <div class="tittlebardiv">
            <img id="shopico" src="../../source/yunlogo.png">&nbsp;
            <p id="tittleshopname"style="margin-left: 2%;">加载中...</p>
            <a type="button" class="btn btn-info btn-sm" onclick="showStoreBanner()">收藏本店</a>
        </div>
        <div style="width:100%;text-align: center;margin-top: 3%;float:left;">
            <button class="button button-action button-box button-giant button-longshadow-left" onclick="gotoshopDetail()">
            <i class=" icon-shopping-cart"></i>
          </button>
            <span style="display:block">进入店铺</span>
        </div>
       
        <div class="scorezoon">
            <div class="scorezoon-tittle">
                <span>综合评分：</span>
                <span style="color:#c53c3e">
                    <i class=" icon-star icon-large"></i>
                    <i class=" icon-star icon-large"></i>
                    <i class=" icon-star icon-large"></i>
                    <i class=" icon-star icon-large"></i>
                    <i class=" icon-star icon-large"></i>
                </span>
                <span>&nbsp;5.0分</span>
            </div>
            <div class="scorezoon-body">
                <div class="scorezoon-bodyblock" style="border-right: 1px solid #ddd">
                    <span>
                        商品评分
                    </span>
                    <span style="display:block">
                        <i class="  icon-heart icon-large"></i>&nbsp;5.0分
                    </span>
                </div>
                <div class="scorezoon-bodyblock" style="border-right: 1px solid #ddd">
                      <span>
                        服务评分
                    </span>
                    <span style="display:block">
                        <i class="  icon-heart icon-large"></i>&nbsp;5.0分
                    </span>
                </div>
                <div class="scorezoon-bodyblock">
                      <span>
                        效率评分
                    </span>
                    <span style="display:block">
                        <i class="  icon-heart icon-large"></i>&nbsp;5.0分
                    </span>
                </div>
            </div>
        </div>
        
        <div class="scorezoon">
             <div class="scorezoon-tittle">
                <span>店铺名片</span>
            </div>
            <div class="scorezoon-usermsg">
                店主：<span id="msgshopName">加载中...</span>
            </div>
            <div class="scorezoon-usermsg">
                店铺：<span id="msgshopshopname">加载中...</span>
            </div>
            <div class="scorezoon-usermsg">
                电话：<span id="msgshoptel">加载中...</span>
                 <a type="button" class="btn btn-success btn-sm" style="float:right;padding:3px;"  id="msgshophreftel">拨打电话</a>
            </div>
            <div class="scorezoon-usermsg" >
                QQ：<span id="msgshopqq">加载中...</span>
            </div>
            <div class="scorezoon-usermsg" >
                微信：<span  id="msgshopwechat">加载中...</span>
            </div>
            <div class="scorezoon-usermsg">
                地址：<span id="msgshopaddr">加载中...</span>
            </div>
        </div>
        
        <div class="scorezoon">
             <div class="scorezoon-tittle">
                 <span>店铺二维码<small style="color:red">长按可保存</small></span>
            </div>
            <div class="scorezoon-usermsg" style="text-align: center;">
                <div class="qrcodezoon" id="qrcode"></div>
                 <canvas width="80%" style="display: none;"></canvas>
            </div>
            
           
            
        </div>
       
        <!--收藏的引导-->
        <section class="storesectionclass" id="storesectionid" onclick="missStoreBanner()">
            <img src="../../source/shoucangbanner.png" width="100%">
        </section>
        
       
        
        
        <button type="button" id="scanQRCodehome" style="display: none" >扫描</button>
        <button type="button" id="startRecord" style="display: none" >录音</button>
        <button type="button"  id="stopRecord" style="display: none" >停止录音</button>
        <button type="button" id="translateVoice" style="display: none" >智能识别</button>
       
        <script src="//cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
        <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="../../js/wx.cloudshop.config.js?12111049"></script>
        <script src="js/boss.js?12061321"></script>
       <script src="../../js/plugins/qrcode.js?11201111"></script>
 
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
  wx.config({

    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: '<?php echo $signPackage["timestamp"];?>',
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [
      // 所有要调用的 API 都要加到这个列表中
         'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo'
    ]
  });
  wx.ready(function () {
    // 在这里调用 API
   readyshare();
  });
  
  function readyshare()
  {
        var randommun = GetRandomNum();
          wx.onMenuShareTimeline({
          title: SHARE_TITTLE,
         link: ""+ShreShopCardCommonLink+"?alias="+GLOB_alias+"&aid="+GLOB_AID+"?isshare=1?"+randommun+"",
          imgUrl:  ""+ShareShopPublicLink+"/App/Modules/weixin/weixinportal/images/shareshopico.png",
          success: function (res) {
          var param = "代理商："+GLOB_AID+";分享到朋友圈";
          _hmt.push(['_trackEvent', '云店铺', '店铺名片分享',param]);
          shopsharelog();
        }
        });
        
        
        
        
        wx.onMenuShareAppMessage({
        title: SHARE_TITTLE,
        desc: SHARE_TEXT,
       link: ""+ShreShopCardCommonLink+"?alias="+GLOB_alias+"&aid="+GLOB_AID+"?isshare=1?"+randommun+"",
        imgUrl:  ""+ShareShopPublicLink+"/App/Modules/weixin/weixinportal/images/shareshopico.png",
         success: function (res) {
             var param = "代理商："+GLOB_AID+";指定好友分享";
          _hmt.push(['_trackEvent', '云店铺', '店铺名片分享',param]);
          shopsharelog();
        }
      });
      
      
      
      wx.onMenuShareQQ({
        title: SHARE_TITTLE,
        desc: SHARE_TEXT,
        link: ""+ShreShopCardCommonLink+"?alias="+GLOB_alias+"&aid="+GLOB_AID+"?isshare=1?"+randommun+"",
        imgUrl:  ""+ShareShopPublicLink+"/App/Modules/weixin/weixinportal/images/shareshopico.png",
        success: function (res) {
            var param = "代理商："+GLOB_AID+";分享到QQ";
          _hmt.push(['_trackEvent', '云店铺', '店铺名片分享',param]);
          shopsharelog();
        }
      });
      
      
      
      wx.onMenuShareWeibo({
        title: SHARE_TITTLE,
        desc: SHARE_TEXT,
       link: ""+ShreShopCardCommonLink+"?alias="+GLOB_alias+"&aid="+GLOB_AID+"?isshare=1?"+randommun+"",
        imgUrl: ""+ShareShopPublicLink+"/App/Modules/weixin/weixinportal/images/shareshopico.png",
        success: function (res) {
            var param = "代理商："+GLOB_AID+";分享到微博";
          _hmt.push(['_trackEvent', '云店铺', '店铺名片分享',param]);
          shopsharelog();
        }
      });
  }

</script>      
    </body>
</html>

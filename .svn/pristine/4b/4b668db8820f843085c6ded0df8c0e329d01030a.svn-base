<?php
require_once "./publicWxAction/jssdk.php"; 
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>我的店铺二维码</title>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <link href="css/ydset.css?09211405" rel="stylesheet"/>
        
</head>

<body>
    <div class="ercodecontain">
        <div class="ercontainblock" >
            <div class="topheader">
                <img src="source/yunlogo.png" class="ercodeico" id="shopico">
                <div class="ercodemsg">
                    <span class="ercodemsghead" id="ercodemsgheadid">加载中...</span>
                    <span class="ercodemsgdesc" id="ercodemsgdescid">加载中...</span>
                </div>
                
            </div>
            <div class="ercodezoon" id="qrcodezoon">
                
            </div>
            <div class="ercodezoon">
                <span class="ercodemsgdesc">扫描或长按上方二维码进入我的云店铺</span>
            </div>
        </div>
    </div>
    <script src="js/setting.js?09211405"></script>
    <script language="javascript" src="./commonJs/config.js?12111048"></script>
    <script src="//cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
    <script src="js/qrcode.js?09211405"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script>
      loadagentercode();
      wx.config({
        appId: '<?php echo $signPackage["appId"];?>',
        timestamp: <?php echo $signPackage["timestamp"];?>,
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

          var random = GetRandomNum();
            wx.onMenuShareTimeline({
            title: SHARE_TITTLE,
            link: ""+ShareErcodePublicLink+"?aid="+GLOB_AID+ "&alias="+GLOB_ALIAS+"&isshare=1?"+random+"",
            imgUrl: SHRE_PIC,
            trigger: function (res) {
              // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            },
            success: function (res) {

          }
          });

          wx.onMenuShareAppMessage({
          title: SHARE_TITTLE,
          desc: SHARE_DESC,
          link: ""+ShareErcodePublicLink+"?aid="+GLOB_AID+ "&alias="+GLOB_ALIAS+"&isshare=1?"+random+"",
          imgUrl: SHRE_PIC,
           success: function (res) {

          }
        });



        wx.onMenuShareQQ({
          title: SHARE_TITTLE,
          desc: SHARE_DESC,
          link: ""+ShareErcodePublicLink+"?aid="+GLOB_AID+ "&alias="+GLOB_ALIAS+"&isshare=1?"+random+"",
          imgUrl: SHRE_PIC,
           success: function (res) {

          }
        });



        wx.onMenuShareWeibo({
          title: SHARE_TITTLE,
          desc: SHARE_DESC,
          link:""+ShareErcodePublicLink+"?aid="+GLOB_AID+ "&alias="+GLOB_ALIAS+"&isshare=1?"+random+"",
          imgUrl: SHRE_PIC,
           success: function (res) {

          }
        });
      }
    </script>
</body>

</html>

<?php
error_reporting(0);
require_once "./publicWxAction/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>我的云店铺</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=0.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <meta http-equiv="x-dns-prefetch-control" content="on">
        <link rel="dns-prefetch" href="http://cdn.bootcss.com">
        <link rel="dns-prefetch" href="http://static.51dh.com.cn">
        <link href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
        <link href="http://cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="//cdn.bootcss.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet">
        <link href="http://cdn.bootcss.com/Swiper/3.0.8/css/swiper.min.css" rel="stylesheet">
        <link href="css/style.css?03241120" rel="stylesheet">
        <link  rel="stylesheet" href="./css/wshop.css?12311220">
        
    </head>
    <body>
        <div>
          <button id='filePicker'>上传图片</button>
        </div>
        <div id='picshow'>

        </div>

        <script src="http://cdn.bootcss.com/jquery/2.2.0/jquery.min.js"></script>
        <script src="http://cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="http://cdn.bootcss.com/handlebars.js/4.0.4/handlebars.min.js"></script>
        <script src="http://cdn.bootcss.com/Buttons/2.0.0/js/buttons.min.js"></script>
        <script src="http://cdn.bootcss.com/Swiper/3.0.8/js/swiper.min.js"></script>
        <script src="http://cdn.bootcss.com/jquery.lazyload/1.9.1/jquery.lazyload.min.js"></script>
        <script src="./commonJs/config.js?010716063"></script>
        <script src="./js/wshopjs.js?20166285"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script>
            
            wx.config({
                appId: '<?php echo $signPackage["appId"]; ?>',
                timestamp: '<?php echo $signPackage["timestamp"]; ?>',
                nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
                signature: '<?php echo $signPackage["signature"]; ?>',
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'getLocation',
                    'chooseImage',
                    'uploadImage',
                    'downloadImage'
                ]
            });
            var images = { 
                  localId: [], 
                  serverId: [] 
             };
             $('#filePicker').on('click', function () {
                 wx.chooseImage({
                  success: function (res) {
                    alert(1);
                   var localIds = res.localIds;
                   alert(2);
                   syncUpload(localIds);
                  }
                 });
                });
                var syncUpload = function(localIds){
                    alert(3);
                    alert(localIds);
                 var localId = localIds.pop();
                 wx.uploadImage({
                  localId: localId,
                  isShowProgressTips: 1,
                  success: function (res) {
                    alert(5);
                   var serverId = res.serverId; // 返回图片的服务器端ID
                   //其他对serverId做处理的代码
                   alert(serverId);
                   if(localIds.length > 0){
                    syncUpload(localIds);
                   }
                   downImg(serverId);
                  }
                 });
                };
              
              var downImg = function(serverId){
              alert(6);
                alert(serverId);
                wx.downloadImage({
                serverId: serverId,
                success: function (res) {
                    alert(7);
                  var localId = res.localId;
                  alert(localId);
                  //$('#picshow').append("<img src=' " + localId + "'/>");
                  pre(localId);
                }
              });
          };
          
          
           var  pre = function (localId){
               wx.previewImage({
                  current: 'localId',
                  urls: [
                    'localId',
                    'localId',
                    'localId'
                  ]
                });
              };
            /*function choose(){
                wx.chooseImage({
                    success: function(res) {
                        alert(1);
                        images.localId = res.localIds;
                        alert(2);
                        upload();
                    },
                    fail: function(res) {
                        alert(JSON.stringify(res));
                    }
                });
            }
            function upload() {
                alert(3);
                alert(images.localId);
                var i=0;
                wx.uploadImage({
                    localId: images.localId[i],
                    isShowProgressTips: 1, 
                    success: function(res) {
                        //images.serverId.push(res.serverId);
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        alert(4);
                        alert(serverId);
                        
                    },
                    fail: function(res) {
                        alert(5);
                        alert(JSON.stringify(res));
                    }
                });
            }*/
            
        </script>

        
    </body>

</html>

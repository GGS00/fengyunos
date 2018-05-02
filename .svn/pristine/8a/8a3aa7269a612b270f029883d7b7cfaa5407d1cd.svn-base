<?php
error_reporting(0);
require_once "./publicWxAction/jssdk.php"; 
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();

$wxAppid = "wx6f30595592155ec9";//wx29656e8801565344
$wxSrcret = "19d00ffec9a7ce9cb08ce224f52b974c";//7497e4557f2ce8b2c0ba0a0b5edee267

if(isset($_GET["code"])){
    $code = $_GET["code"];
    $wxToken = file_get_contents("https://api.weixin.qq.com/sns/oauth2/access_token?appid=$wxAppid&secret=$wxSrcret&code=$code&grant_type=authorization_code");
    $tokeninfo = json_decode($wxToken, true);
    $openid = $tokeninfo["openid"];
    $accesstoken = $tokeninfo["access_token"];
    $agent_info = file_get_contents("https://api.weixin.qq.com/sns/userinfo?access_token=$accesstoken&openid=$openid&lang=zh_CN");
    $agent_msg = json_decode($agent_info, true);
    $agent_img = $agent_msg["headimgurl"];

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>微信版51云店 </title>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
        <link href="css/homephp.css?07241418" rel="stylesheet" type="text/css">
</head>
<body style="background:#CFEDF7">
     
    <div style="position: absolute;width: 100%;height: 100%; background:#CFEDF7 ">
        
        <img src="./source/banner1.png" width="100%" height="auto" style="z-index: -1;display:block">
        
        <div class="containerdiv">
            <h5>快捷注册，使用51订货网账号注册并体验云店</h5>
            <a  type="button" class="btn btn-success"  id="buy_btn_id" href="wxlogin.html?dh=1">订货网账户注册云店</a>
            <h5>已经注册过云店账户（在电脑、手机、pad等设备上注册过云店账户）</h5>
            <a href="local/wxlogin.html" type="button" class="btn btn-warning" id="login_btn_id"  >立即登录</a>
            <h5>已购买51云店机顶盒，扫描电视上二维码，绑定微信和盒子</h5>
            <a  type="button" class="btn btn-danger"  id="scanQRCodehome">立即绑定</a>

<!--            <h5 >暂时不购买51云店机顶盒，注册体验51云店</h5>
            <a href="wxRegister.php" type="button" class="btn btn-success" id="register_btn_id"  >立即注册</a>-->
            <h5>还没有51云店机顶盒，前去购买</h5>
            <a href="http://www.51dh.com.cn/list/parts?keyword=51%E4%BA%91%E5%BA%97&mall_id=0" type="button" class="btn btn-info" id="buy_btn_id" >立即购买</a>
      
            <br>
         </div>
        </div>
   
    <div class="alertZoon" id="dialogZoon" onclick="dialogdivhiden()">
        <div class="dialog-bg"></div>
        <div class="alert-dialog-content" style="border-radius: 8px;">
            <div class="dialog-body">
                <h4>你好</h4>
                <span>未获取到您的微信信息，请确认在微信中打开，如果您已经在微信中打开请点击"确认"</span>
            </div>
            <div class="dialog-footer">
                <div class="dialog-footer-btn" style="border-right: 1px solid #ddd;">
                    取消
                </div>
                <div class="dialog-footer-btn" onclick="openHomeByWx()">
                    确认
                </div>
            </div>
        </div>
    </div>
    
    <script src="//cdn.bootcss.com/jquery/2.1.1/jquery.min.js"></script>
    <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script language="javascript" src="./commonJs/config.js?12111049"></script>
    <script src="js/wxhome.js?1602291349"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script>
      wx.config({
        appId: '<?php echo $signPackage["appId"];?>',
        timestamp: <?php echo $signPackage["timestamp"];?>,
        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
        signature: '<?php echo $signPackage["signature"];?>',
        jsApiList: [
          // 所有要调用的 API 都要加到这个列表中
            'scanQRCode',
            'closeWindow'
        ]
      });
      wx.ready(function () {
        // 在这里调用 API
      });

    document.querySelector('#scanQRCodehome').onclick = function () {
    wx.scanQRCode({
          needResult: 0,
          desc: 'scanQRCode desc',
          scanType: ["qrCode"], 
          success: function (res) {
              _ecodeBanding(res);
          },
          fail: function (res) {
            alert("摄像头调用失败，请升级微信版本");
          }
        });
      };
      document.querySelector('#closeWindow').onclick = function () {
        wx.closeWindow();
      };
    </script>
     <script>
    $(document).ready(function(){
        Glob_openid = ("<?php echo $openid ?>");
        Glob_Img = ("<?php echo $agent_img ?>");
        if(Glob_openid){
            globSessionStorage.removeItem("sessionopenid");//清除c的值
            globSessionStorage ["sessionopenid"] = Glob_openid;
            globLocalStorage.removeItem("sessionopenid");//清除c的值
            globLocalStorage ["sessionopenid"] = Glob_openid;
        }
        else{
            Glob_openid = globSessionStorage ["sessionopenid"];
        }
        _getopenidRandom();
    });

    </script>
</body>

</html>

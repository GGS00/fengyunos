<?php
error_reporting(0);
require_once "../../publicWxAction/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();

$wxAppid = "wx6f30595592155ec9";//wx29656e8801565344
$wxSrcret = "19d00ffec9a7ce9cb08ce224f52b974c";//7497e4557f2ce8b2c0ba0a0b5edee267

$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$wxAppid&secret=$wxSrcret";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($ch);
curl_close($ch);
$jsoninfo = json_decode($output, true);
$access_token = $jsoninfo["access_token"];
/*echo  $access_token;*/
/*
if(isset($_GET["code"])){
    $code = $_GET["code"];
    $wxToken = file_get_contents("https://api.weixin.qq.com/sns/oauth2/access_token?appid=$wxAppid&secret=$wxSrcret&code=$code&grant_type=authorization_code");
    $tokeninfo = json_decode($wxToken, true);
    $openid = $tokeninfo["openid"];
    $accesstoken = $tokeninfo["access_token"];
    $agent_info = file_get_contents("https://api.weixin.qq.com/sns/userinfo?access_token=$accesstoken&openid=$openid&lang=zh_CN");
    $agent_msg = json_decode($agent_info, true);
    $agent_img = $agent_msg["headimgurl"];

}*/
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>新增商品</title>
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="stylesheet" href="../css/mui.min.css">
    <style>
        .white-bg{
            background-color: white !important;
            margin: 10px 10px 0px 10px;
            border-radius: 2px;
        }
        .mui-input-row label{
            width: 30%;
        }
        .mui-input-row input{
            width: 70% !important;
        }
        textarea{
            margin: 0px;
        }
        .imgs img{
            float: left;
            width: 70px;
            height: 70px;
            line-height: 40px;
            text-align: center;
        }
        .mui-preview-image.mui-fullscreen {
            position: fixed;
            z-index: 20;
            background-color: #000;
        }
        .mui-preview-header,
        .mui-preview-footer {
            position: absolute;
            width: 100%;
            left: 0;
            z-index: 10;
        }
        .mui-preview-header {
            height: 44px;
            top: 0;
        }
        .mui-preview-footer {
            height: 50px;
            bottom: 0px;
        }
        .mui-preview-header .mui-preview-indicator {
            display: block;
            line-height: 25px;
            color: #fff;
            text-align: center;
            margin: 15px auto 4;
            width: 70px;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 12px;
            font-size: 16px;
        }
        .mui-preview-image {
            display: none;
            -webkit-animation-duration: 0.5s;
            animation-duration: 0.5s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }
        .mui-preview-image.mui-preview-in {
            -webkit-animation-name: fadeIn;
            animation-name: fadeIn;
        }
        .mui-preview-image.mui-preview-out {
            background: none;
            -webkit-animation-name: fadeOut;
            animation-name: fadeOut;
        }
        .mui-preview-image.mui-preview-out .mui-preview-header,
        .mui-preview-image.mui-preview-out .mui-preview-footer {
            display: none;
        }
        .mui-zoom-scroller {
            position: absolute;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            -webkit-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            -webkit-backface-visibility: hidden;
        }
        .mui-zoom {
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
        }
        .mui-slider .mui-slider-group .mui-slider-item img {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
        }
        .mui-android-4-1 .mui-slider .mui-slider-group .mui-slider-item img {
            width: 100%;
        }
        .mui-android-4-1 .mui-slider.mui-preview-image .mui-slider-group .mui-slider-item {
            display: inline-table;
        }
        .mui-android-4-1 .mui-slider.mui-preview-image .mui-zoom-scroller img {
            display: table-cell;
            vertical-align: middle;
        }
        .mui-preview-loading {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: none;
        }
        .mui-preview-loading.mui-active {
            display: block;
        }
        .mui-preview-loading .mui-spinner-white {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -25px;
            margin-top: -25px;
            height: 50px;
            width: 50px;
        }
        .mui-preview-image img.mui-transitioning {
            -webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
            transition: transform 0.5s ease, opacity 0.5s ease;
        }
        @-webkit-keyframes fadeIn {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
        @keyframes fadeIn {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
        @-webkit-keyframes fadeOut {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
        @keyframes fadeOut {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
        p img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>

<body>
<header class="mui-bar mui-bar-nav">
    <a id="back" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
    <h1 id="title" class="mui-title">新增商品</h1><button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" onclick="saveGoods()">保存</button>
</header>
<div class="mui-content">
    <div class="mui-input-row white-bg">
        <label>名　称</label>
        <input id="goodName" type="text" placeholder="商品名称">
    </div>
    <div class="mui-input-row white-bg">
        <label>属　性</label>
        <input id="goodAttr" type="text" placeholder="商品属性">
    </div>
    <div class="mui-input-row white-bg" id="whole">
        <label>进货价</label>
        <input id="goodPurchase" type="text" placeholder="商品进货价">
    </div>
    <div style="margin:20px 0px 0px 10px;">商品图片<span id='filePicker'  class="mui-icon mui-icon-image" style='color:#8F8F94;font-size: 22px;margin-left: 5px;'></span></div>
    <div class="mui-content">
      <div id='imgshow' class="mui-content-padded mui-input-row imgs" style="margin: 0px 10px 0px 10px">

        <!-- <div style='float:left;width:70px;height:70px;margin-left:5px;margin-top:5px'>
          <img src="../img/shuijiao.jpg" data-preview-src=" " data-preview-group='1' class='imgDesc'>
           <a style='color:#fff;font-size:23px;position:relative;top:-68px;left:2px;display: inline-block;height: 16px;width: 16px;text-align: center;background-color: red;border-radius:8px;'><span class="mui-icon mui-icon-closeempty"  style='position: relative;top: -4px;left: -4px;'></span></a>
           <span class="mui-icon mui-icon-gear-filled" style='color:#3892E0;font-size:21px;position:relative;top:-74px;left:28px;'></span>
        </div>  -->

      </div>
    </div>
    <div id="imgIntro" style='color:#A8A8A8;margin-left:10px;font-size:9px;display:none'><span>点击图片可设置为商品缩略图</span></div>
    <div style="margin:10px 0px 10px 10px;" id='xx'>商品描述</div>
    <div class="mui-input-row imgs" style="margin: 0px 10px 0px 10px;">
        <textarea id="textarea" rows="5" placeholder="请输入商品描述"></textarea>
    </div>
</div>
</body>
<script src="../js/mui.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="http://cdn.bootcss.com/jquery/2.2.0/jquery.min.js"></script>
<script src="../js/mui.zoom.js"></script>
<script src="../js/mui.previewimage.js"></script>
<script src="../../../js/wx.cloudshop.config.js"></script>
<script>
      if(!GLOB_AID){
          window.location.href="../../../wxlogin.html";
      }
      mui.previewImage();
      
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
                'downloadImage',
                'hideAllNonBaseMenuItem'
            ]
      });
        var Glob_aid;
        var Glob_alias;
        var Glob_litpic;
        var GLOB_localStorage = window.localStorage;
        var GLOB_sessionStorage = window.sessionStorage;
        Glob_aid = GLOB_localStorage["sessionAid"];
        Glob_alias = GLOB_sessionStorage["sessionAlias"];

          var images = { 
                  localId: [], 
                  serverId: [] 
             };
          var imgarr = [];
            $('#filePicker').on('click',function () {
              /*var imgcount = $('#imgshow').children('img').size();*/
                 wx.chooseImage({
                  success: function (res) {
                   /*var localIds = res.localIds;*/
                   images.localId = res.localIds;
                   syncUpload();
                   
                  }
                 });
                              
              });
          
        /*  var syncUpload = function(localIds){
                 var localId = localIds.pop();
                 wx.uploadImage({
                  localId: localId,
                  success: function (res) {  
                   var serverId = res.serverId; 
                   if(localIds.length>0){
                    syncUpload(localIds);
                   }
                   downImg(serverId);
                  }
                 });
                };*/

          var syncUpload = function() {
                  var j = 0,
                  length = images.localId.length;
                  images.serverId = [];
                  function upload() {

                    wx.uploadImage({
                      localId: images.localId[j],
                      success: function(res) {
                        j++;
                        images.serverId.push(res.serverId);
                        if (j < length) {
                          upload();
                        }
                        downImg(res.serverId);
                      }
                    });
                  }
                  upload();
                };

          var downImg = function(serverId){
             Glob_token = ("<?php echo $access_token ?>");
             Glob_server = serverId;
              $.ajax({
                  url: "" + Comm_Config + "wx/wxUploadFile.do",
                  type:'POST',
                  data:{"mediaId":Glob_server,"accessToken":Glob_token,"dir":'partner_pay'},
                  success: function(data){
                         var imgsrc = data.path;   
                         if(imgarr.length>=5){
                          mui.alert('最多只能上传五张图片');
                         }else{
                             imgarr.push(imgsrc);
                             $('#imgshow').html('');
                             imgshow(imgarr);
                         }
                  }
              });
              
          };

          function imgshow(data){

            for(var i=0;i<imgarr.length;i++){               
             $('#imgshow').append("<div row="+i+" style=\'float:left;width:70px;height:70px;margin-left:5px;margin-top:5px\'><img index=\'"+ i +"\' src=\'" + imgarr[i] +"\' data-preview-src=\"\" data-preview-group=\'1\' class=\'imgDesc\'><a onclick=\"delimg(" + i + ")\" style=\'color:#fff;font-size:23px;position:relative;top:-68px;left:2px;display:inline-block;height:16px;width:16px;text-align: center;background-color:red;border-radius:8px;\'><span class=\"mui-icon mui-icon-closeempty\"  style=\'position: relative;top: -4px;left: -4px;\'></span></a><span class=\"mui-icon mui-icon-gear-filled\" onclick=\"setimg(" + i + ")\" style=\'color:#3892E0;font-size:21px;position:relative;top:-72px;left:31px;\'></span></div>");
            }
                     
          }


          function setimg(index){
            var imgUrl=$('#imgshow').find('img[index='+index+']').attr('src');
            var btnArray = ['否', '是'];
            mui.confirm('确定设置该图为商品缩略图？', '设置', btnArray, function(e) {
              if (e.index == 1) {
                Glob_litpic=imgUrl;
                mui.alert('修改成功');

              } 
            });
          }

          function delimg(index){
            var imgUrl=$('#imgshow').find('img[index='+index+']').attr('src');
            var btnArray = ['否', '是'];
            mui.confirm('确定刪除该图？', '设置', btnArray, function(e) {
              if (e.index == 1) {
                $('#imgshow').find('div[row='+index+']').remove();
                imgarr.splice(index,1);
                mui.alert('刪除成功');
                $('#imgshow').html('');
                imgshow(imgarr);
              }
            });
          }

          function saveGoods(){
            var divlen=$("#imgshow").children('div').size();
            if($("#goodName").val()==''){
              mui.alert('商品名称不能为空！', '提示');
              return;
            }
            if($("#goodAttr").val()==''){
              mui.alert('商品属性不能为空！', '提示');
              return;
            }
            if($("#goodPurchase").val()==''){
              mui.alert('商品进货价不能为空！', '提示');
              return;
            }
            if($("#textarea").val()==''){
              mui.alert('商品描述不能为空！', '提示');
              return;
            }
            if(divlen==0){
              mui.alert('请上传商品图片', '提示');
              return;
            }
            else{
              //自定义商品保存接口
              var arr=[];
              for(var i=0;i<divlen;i++){
                var imgAttr = $("#imgshow").find("div:eq("+i+") img").attr("src");   
                arr.push(imgAttr);
              }
              if(Glob_litpic==undefined){
                Glob_litpic= $("#imgshow").find("div:eq(0) img").attr("src");
              }
              var randomstr = GetRandomNum();
              var goodName = $("#goodName").val();
              var goodAttr = $("#goodAttr").val();
              var goodPurchase = $("#goodPurchase").val();
              var textarea = $("#textarea").val();
              var result = "[";
              var jsonText = {};
              jsonText['attr'] = goodAttr;
              jsonText['price'] = goodPurchase;
              result+=JSON.stringify(jsonText);
              result += "]";
              $.ajax({
                  type: "POST",
                  url: "" + Comm_Config + "wx/addPersonalGoods.do",
                  data: {
                    "agentid":Glob_aid,
                    "alias": Glob_alias,
                    "name": goodName,
                    "param": textarea,
                    "litpic":Glob_litpic, 
                    "attrprice": result,
                    "imgurl": arr.join("@"),
                    "uploadflag":"",
                    "content":""
                  },  
                  success: function(data) {
                     mui.alert('保存成功');
                     window.location.href="chooseGoods_sub.html?"+randomstr;   
                  },
                  error: function(data) {
                    //数据存储失败
                    mui.alert("哎呦，网络好像不通，待会再试试吧");
                  }
              });
              
            }
             
          }

          function GetRandomNum() {   
              var Min = 0;
              var Max = 10000;
              var Range = Max - Min;   
              var Rand = Math.random();   
              return(Min + Math.round(Rand * Range));   
          } 

        
        </script>
</html>
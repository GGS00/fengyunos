<?php
error_reporting(0);
require_once "./../../../publicWxAction/jssdk.php";
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
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>我的</title>
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!-- <link href="//cdn.bootcss.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="css/font-awesome.css">
    <link rel="stylesheet" href="css/mui.min.css">
    <link rel="stylesheet" href="css/main.css?0001">    
    <style>

    .culling div :last-child{
          margin-bottom: 76px;
    }

    .mui-bar{
          padding-left:0;
    }

    .imgTips{
          text-align: center;
          margin-top: 65%;
          margin-left: 8%;
    }


    .mineInfo{
          width: 94%;
          float: left;
          margin: 8px 12px;
          height: auto;
          border: #C6C6C6 1px solid;
          border-radius: 12px;
          box-shadow: 2px 4px 6px #C6C6C6;
          margin-top: 22px;
    }

    .headImg{
          width: 23%;
          float: left;
          margin-left: 5%;
          margin-top: 2%;
          margin-bottom: 2%;
          height: 75px;
    }

    .mineName{
          width: 70%;
          float: left;
          margin-top: 6%;
          padding-left: 5%;
          color: #444;
    }

    .imgHead{
          border-radius: 100%;
          width: 100%;
          height: 100%;
    }

    .agentName{
          font-weight: 600;
          font-size: 18px;

    }

    .agentIntro{
          margin-top: 3%;
          display: block;
          color: #C6C6C6;
          font-size: 15px;
    }

    .recommend {
          position: relative;
          width: 19%;
          float: left;
          margin: 14px 2%;
          height: 73px;
          margin-bottom: 6px;
          margin-top: 6px;
      }

      /**refresh**/
    .mui-pull-top-tips {
        position: absolute;
        top: -20px;
        left: 50%;
        margin-left: -25px;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        z-index: 1;
      }
      .mui-bar~.mui-pull-top-tips {
        top: 24px;
      }
      .mui-pull-top-wrapper {
        width: 42px;
        height: 42px;
        display: block;
        text-align: center;
        background-color: #efeff4;
        border: 1px solid #ddd;
        border-radius: 25px;
        background-clip: padding-box;
        box-shadow: 0 4px 10px #bbb;
        overflow: hidden;
      }
      .mui-pull-top-tips.mui-transitioning {
        -webkit-transition-duration: 200ms;
        transition-duration: 200ms;
      }
      .mui-pull-top-tips .mui-pull-loading {
        /*-webkit-backface-visibility: hidden;
        -webkit-transition-duration: 400ms;
        transition-duration: 400ms;*/
        
        margin: 0;
      }
      .mui-pull-top-wrapper .mui-icon,
      .mui-pull-top-wrapper .mui-spinner {
        margin-top: 7px;
      }
      .mui-pull-top-wrapper .mui-icon.mui-reverse {
        /*-webkit-transform: rotate(180deg) translateZ(0);*/
      }
      .mui-pull-bottom-tips {
        text-align: center;
        background-color: #efeff4;
        font-size: 15px;
        line-height: 40px;
        color: #777;
      }
      .mui-pull-top-canvas {
        overflow: hidden;
        background-color: #fafafa;
        border-radius: 40px;
        box-shadow: 0 4px 10px #bbb;
        width: 40px;
        height: 40px;
        margin: 0 auto;
      }
      .mui-pull-top-canvas canvas {
        width: 40px;
      }
      .mui-slider-indicator.mui-segmented-control {
        background-color: #efeff4;
      }



 
    </style>
</head>
<body class="mui-ios mui-ios-9 mui-ios-9-1">
<header id="header" class="mui-bar mui-bar-nav">
    <h1 class="mui-title myRebate" style="left:23%;width:56%">我的</h1>
    <p class="mui-progressbar mui-progressbar-infinite"></p>
</header>

<div class="mui-content">

  <div class="mineInfo">

    <div class="headImg">
      <img class="imgHead">
    </div>
    <div class="mineName">
      <span class="agentName">GGS00</span><br/>
      <span class="agentIntro">云享 店铺更加多彩<span>
    </div>

  </div>
  
  <div class="contentHeader" style="display:none">
    <div class="recommend" style="margin-left: 6%;" onclick="toActList(1)">
      <img src="img/dianpu.png">
      <div class="recommendTitle">
        <span>店铺</span>
      </div>
    </div>
    <div class="recommend" onclick="toActList(2)">
      <img src="img/goods.png">
      <div class="recommendTitle">
        <span>商品</span>
      </div>
    </div>
    <div class="recommend" onclick="toActList(3)">
      <img src="img/22.jpg">
      <div class="recommendTitle">
        <span>活动</span>
      </div>
    </div>
    <div class="recommend" onclick="toActList(4)">
      <img src="img/xuanshang.png">
      <div class="recommendTitle">
        <span>悬赏</span>
      </div>
    </div>
  </div>


  <div class="contentBody" >

   <!--  <div class="culling" onclick="toDetail()">
     <img src="img/1.jpg">
     <div class="cullingTitle">
       <span class="activity">【店铺】51云店夏日大酬宾</span>
       <div class="classify">
         <div class="comment">    
          <i class="fa fa-eye"></i><span class="content">2500</span>
          <i class="fa fa-thumbs-o-up"></i><span class="content">507</span>
          <i class="fa fa-comment-o"></i><span class="content">232</span>
         </div>
         <div class="shopact">
           <span class="activityType">店铺活动</span>
         </div>
       </div>
      </div>
   </div>-->

  </div>

  <div class="contentFooter">
    <div class="footerMenu" onclick="toIndex()">
      <div class="discover">
        <i class="fa fa-compass" style="color: #808080;"></i>
        <p style="color: #808080;">发现</p>
      </div>
    </div>
    <div class="footerMenu">
      <img src="img/add.png" style="width: 44px;eight: 44px;margin-top: 2px;" onclick="getInfo()">
    </div>
    <div class="footerMenu">
      <div class="mine">
        <i class="fa fa-user"></i>
        <p>我的</p>
      </div>
    </div>

  </div>
    
   
</div>


<script src="http://cdn.bootcss.com/jquery/2.2.0/jquery.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script src="js/mui.min.js"></script>
<script src="js/mui.pullToRefresh.js"></script>
<script src="js/mui.pullToRefresh.material.js"></script>
<script src="js/config.js?00001"></script>
<script type="text/javascript">
  mui.init();
  mui('#scroll').scroll({
          indicators: true //是否显示滚动条
      });

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


var agentId = QueryString("agentId");
var Glob_server;
var Glob_token;

initial();

function initial(){

  contentShow();

}

function contentShow(){

    $(".contentBody").html('');

    $.ajax({
              type:"post",
              url: ""+Comm_Config+"meiPian/getAllHomePage.do",
              /*url: "json/index.json",*/
              data: {"agentid":agentId},
              success: function(data){
                $(".contentHeader").show();
                var d = data.resultValue;

                if(d == "" || d == null){

                  $(".contentBody").append("<div class=\"imgTips\"><img src=\"img/noContent.png\" style=\"width: 69%;\"></div>")

                  
                }

                $(".agentName").html(data.username);
                if(data.userhead == "" || data.userhead == null || data.userhead == undefined){

                  
                  $(".imgHead").attr("src","img/11.jpg");


                }else{

                  $(".imgHead").attr("src",data.userhead);

                }
                
                
                for(var i = 0 ; i < d.length ; i++){
                  
                  $(".contentBody").append("<div class=\"culling\" style=\"border-radius:12px;background:url("+ d[i].title_img_url+")\" onclick=\"toDetail("+d[i].id+")\"><div class=\"cullingTitle\"><span class=\"activity\">【"+ d[i].edit_type +"】"+ d[i].title +"</span><div class=\"classify\"><div class=\"comment\"><i class=\"fa fa-eye\"></i><span class=\"content\">500</span><i class=\"fa fa-thumbs-o-up\" style=\"margin-left: 5px;\"></i><span class=\"content\">" + d[i].like_count + "</span><i class=\"fa fa-comment-o\" style=\"margin-left: 5px;\"></i><span class=\"content\">" + d[i].comment_count + "</span></div><div class=\"shopact\"><span class=\"activityType\">"+  d[i].edit_type +"内容</span></div></div></div></div>");

                }

                $(".mui-progressbar-infinite").hide();
                 
              }
    });

  }

  
  var localIds = [];


  function getInfo(){
      $.ajax({
          url : "" + Comm_Config + "wx/getAccessToken.do",              
          type : "post",  
          success : function (data){

            Glob_token = data.access_token;
            chooseImg();

          }
      });   
  }

  var chooseImg = function(){

          wx.chooseImage({
                count: 1,
                /*sizeType: ['compressed'],*/
                success: function (res) {

                      localIds = res.localIds;
                      syncUpload();  
                 
                }
          });
  }

  var syncUpload = function() {
                
                    var localId = localIds.pop();
                      wx.uploadImage({

                        localId:localId,
                        success: function(res) {
                          downImg(res.serverId);
                        }
                      });
                    
                  
                  
                 };

    var downImg = function(serverId){
             Glob_server = serverId;
              $.ajax({
                  url: "" + Comm_Config + "wx/wxUploadFile.do",
                  type:'POST',
                  data:{"mediaId":Glob_server,"accessToken":Glob_token,"dir":'partner_pay'},
                  success: function(data){
                         var imgsrc = data.path;   

                         imgshow(imgsrc);
                         
                  }
              });
              
          };

    function imgshow(data){

              window.location.href="edit.php?agentId=" + agentId + "&imgUrl=" + data;
                     
    }


  function toDetail(id){
    window.location.href="detail.php?id=" + id + "&agentId=" + agentId +"&ismine=1";
  }

  function toActList(type){

    switch (type)
        {
          case 1: //店铺内容
            
            window.location.href="activityList.html?type=1&agentId=" + agentId +"&ismine=1";
             
            break;

          case 2://商品内容
            
            window.location.href="activityList.html?type=2&agentId=" + agentId +"&ismine=1";
            
            break;

          case 3://活动内容
          
           window.location.href="activityList.html?type=3&agentId=" + agentId +"&ismine=1";
           
           break;

          case 4://悬赏内容
        
           window.location.href="activityList.html?type=4&agentId=" + agentId +"&ismine=1";
         
          break;
       
        }

  }


  function toIndex(){

    window.location.href="index.php";

  }

  function QueryString(val){
      var uri = window.location.search;
      var re = new RegExp("" +val+ "=([^&?]*)", "ig");
      return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
  }



(function($) {
        //阻尼系数
        var deceleration = mui.os.ios?0.003:0.0009;
        
        $.ready(function() {
          //循环初始化所有下拉刷新，上拉加载。
          $.each(document.querySelectorAll('.mui-content .contentBody'), function(index, pullRefreshEl) {
            $(pullRefreshEl).pullToRefresh({
              down: {
                callback: function() {
                  var self = this;
                  setTimeout(function() {
                    self.endPullDownToRefresh();
                    contentShow();                    
                  }, 1000);
                }
              },
            });
          });
        });
      })(mui);


</script>
</body>
</html>

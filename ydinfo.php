<?php
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
        <title>云店资讯</title>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
        <link href="//cdn.bootcss.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet">
        <link href="css/indexphp.css?09181736" rel="stylesheet">

    </head>
    <body style="background:#f5f5f9" >
       
        <span class="timelable">云店推送通知</span>
        <div class="infoblock">
            <span class="infoblock-tittle">欢迎使用51云店</span>
            <span class="infoblock-time">9月18日</span>
            <img src="source/tongzhi.png" class="infoblock-img">
            <p class="infoblock-p">
                云店是利用网络机顶盒和电视展示商品，无需库存，顾客看到展示的商品有意愿购买并交付定金后，
                店老板订货网下单购买，商品次日到达之后，货到付款，最后店老板将货交给顾客。
            </p>
        </div>
        <span class="timelable">11月20日</span>
        <div class="infoblock">
            <span class="infoblock-tittle">51云店新首页上线啦！</span>
            <span class="infoblock-time">11月20日</span>
            <img src="source/tongzhi-newpage.png" class="infoblock-img">
            <p class="infoblock-p">
                10000.dp.com 是51云店的新域名，一方面解决了一直以来店老板对原域名"yd.51dh.com.cn"中出现的"51dh"等订货网敏感字样的担忧，另一方便"万店铺"方便记忆和理解。
            </p>
        </div>
        <span class="emptyclear">&nbsp;</span>
        <div class="blockclear"></div>

        <div class="block-footer">
            <div class="public-block-4"  onclick="funpoint(9)">
                <div class="footer-nomal">
                    <i class="icon-th"></i>
                    <span>首页</span>
                </div>
            </div>
            
            <div class="public-block-4" onclick="funpoint(6)">
                <div class="footer-nomal">
                    <i class=" icon-briefcase"></i>
                    <span>市场</span>
                </div>
            </div>
            
            <div class="public-block-4" onclick="funpoint(8)">
                <div class="footer-achive">
                    <i class=" icon-info-sign"></i>
                    <span>资讯</span>
                </div>
            </div>
            
            <div class="public-block-4" onclick="funpoint(5)">
                <div class="footer-nomal">
                    <i class=" icon-heart-empty"></i>
                    <span>我的</span>
                </div>
            </div>
        </div>
        
        <script src="//cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
        <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="./commonJs/config.js?12111048"></script>
        <script src="./js/wxindex.js?11161712"></script>
    </body>
   
</html>

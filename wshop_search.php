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
        <title>搜索商品</title>
        <meta name="viewport" content="width=device-width, initial-scale=0.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
        <link href="//cdn.bootcss.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet">
        <link href="//cdn.bootcss.com/Buttons/1.1.1/css/buttons.min.css" rel="stylesheet">
        <link  rel="stylesheet" href="./css/wshop.css?11121454"
        
     
    </head>
    <body onload="searchready()">
        <div class="wshop-top"  id="shopHomeTopid" >
            <div class="top-arealist" onclick="history.go(-1)">
                <i class=" icon-remove icon-large"></i> 
                <span>取消</span>
            </div>
            <div class="search-top">
                <div class="input-group">
                    <input type="text" class="form-control" id="keywordinput"autofocus="true" autocomplete="true">
               <span class="input-group-btn">
                   <button class="btn btn-default" type="button" onclick="searchByKeyWord()">
                     搜索
                  </button>
               </span>
            </div><!-- /input-group -->
        </div>
        </div>
    <section class="hotsearchDiv">
        <div class="hotsearchDiv-tittle">
            热门搜索
        </div>
        <div style="padding: 10px;">
            <button class="btn btn-default" style="margin: 5px" onclick="handelKeyWords('小米')">小米</button>
             <button class="btn btn-default" style="margin: 5px"  onclick="handelKeyWords('iphone6')">iphone6</button>
             <button class="btn btn-default" style="margin: 5px" onclick="handelKeyWords('华为p7')">华为p7</button>
             <button class="btn btn-default" style="margin: 5px" onclick="handelKeyWords('红米')">红米</button>
             <button class="btn btn-default" style="margin: 5px" onclick="handelKeyWords('小米4')">小米4</button>
             <button class="btn btn-default" style="margin: 5px" onclick="handelKeyWords('三星')">三星</button>
             
        </div>
        <div class="hotsearchDiv-tittle">
            搜索历史
        </div>
        <div class="localsearchlist" id="heistrylistId">
        
            
        </div>        
    </section>
   
        <script src="//cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
        <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="./commonJs/config.js?12111049"></script>
        <script src="./js/wshopjs.js?12051605"></script>
    </body>
</html>

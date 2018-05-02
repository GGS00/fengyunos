<?php
require_once "lib/Http.Request.php";
session_start();

 $_SESSION["agent_id"] = 232;
 //以下是动态获取支付参数
 $_SESSION["APPID"] = 'wx6f30595592155ec9';
 $_SESSION["MCHID"] = '1273173101';
 $_SESSION["KEY"] = '6710193e29b03f138887a17391bdb159';
 $_SESSION["APPSECRET"] = '19d00ffec9a7ce9cb08ce224f52b974c';
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
        <meta name="format-detection"content="telephone=no, email=no" />
        <link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
        <link href="//cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="css/upgrade.css?10291056" rel="stylesheet">
    </head>
    <body>
        <div class="coverblock" id="coverbockid">
            <div style="margin-top: 45%;width: 100%;text-align: center;color:#414141;font-size: 150%;">
                <em class="fa fa-clock-o fa-spin" style="color:#1ab394;font-size: 200%;"></em>
                <span style="display: block;margin-top: 5%">正在创建订单</span>
            </div>
        </div>
        <div class="panel panel-success" id="panelbodyid">
            <div class="panel-heading">
                <h3 class="panel-title">订单创建成功</h3>
            </div>
            <div class="panel-body">
                订单名称：iphone6s 64G 全网通<br>
                订单号：10154798544<br>
                支付状态：未支付<br>
                下单账号：15261437592<br><br><br>
                <a type="button" class="btn btn-success" href="active/wxPay.php">支付定金</a>
                <button type="button" class="btn btn-danger"  data-toggle="modal" data-target="#myModal">取消订单</button>
            </div>
        </div>
        <div class="coverblock-error" id="errorblock">
            <div style="margin-top: 45%;width: 100%;text-align: center;color:red;font-size: 150%;">
                <em class="fa fa-remove" style="font-size: 200%;"></em>
                <span style="display: block;margin-top: 5%">下单失败，请返回重试</span>
            </div>
        </div>

        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" 
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" 
                                data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            确认删除本订单吗？
                        </h4>
                    </div>
                    <div class="modal-body">
                        删除之后需要您重新下单
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" 
                                data-dismiss="modal">关闭
                        </button>
                        <button type="button" class="btn btn-danger" onclick="delOrder()" data-dismiss="modal">
                            删除订单
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>

        <script src="//cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
        <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="//cdn.bootcss.com/handlebars.js/4.0.3/handlebars.min.js"></script>

    </body>
</html>
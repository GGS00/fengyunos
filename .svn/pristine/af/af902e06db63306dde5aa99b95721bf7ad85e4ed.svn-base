<?php 
ini_set('date.timezone','Asia/Shanghai');
error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";
require_once "../lib/Http.Request.php";

 session_start();
//isset($_SESSION["orderNum"]


//①、获取用户openid
$tools = new JsApiPay();
$openId = $tools->GetOpenid();
if(!isset($openId ))
{
    echo "CLOSE!";exit();
}
$pdtName  ="test";

//②、统一下单
$input = new WxPayUnifiedOrder();
$input->SetBody($pdtName);
$input->SetAttach($pdtName);
$input->SetOut_trade_no(WxPayConfig::MCHID.date("YmdHis"));
$input->SetTotal_fee('1');
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag($pdtName);
$input->SetNotify_url("notify.php");
$input->SetTrade_type("JSAPI");
$input->SetOpenid($openId);

$order = WxPayApi::unifiedOrder($input);
$jsApiParameters = $tools->GetJsApiParameters($order);
$wxorderNum = WxPayConfig::MCHID.date("YmdHis");
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
        <meta name="format-detection"content="telephone=no, email=no" />
        <title>微信支付</title>
        <link href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
        <link href="//cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="./../source/wxpay.css?10231716" rel="stylesheet">
        <script>
            var orderNum = ("<?php echo $orderNum ?>");
             var wxorderNum = ("<?php echo $wxorderNum ?>");
            function jsApiCall()
            {
                    WeixinJSBridge.invoke(
                            'getBrandWCPayRequest',
                            <?php echo $jsApiParameters; ?>,
                            function(res){
                                    WeixinJSBridge.log(res.err_msg);
                                    var status = 0;
                                    if("get_brand_wcpay_request:ok" == res.err_msg){
                                            status = 1;
                                            putCallBack(status,wxorderNum);
                                    }
                                    else {
                                            status = 0;
                                    }
                                         var form = $('<form></form>');  
                                        // 设置属性  
                                        form.attr('action', './../../callback.php');  
                                        form.attr('method', 'post');  
                                        form.attr('target', '_self');  
                                        // 创建Input  
                                        var orderNumName = $('<input type="text" name="orderNum" />');  
                                        orderNumName.attr('value', orderNum);  
                                        var statusName = $('<input type="text" name="status" />');  
                                        statusName.attr('value', status);  
                                         var wxOrderName = $('<input type="text" name="wxOrder" />');  
                                        wxOrderName.attr('value', wxorderNum);  
                                        // 附加到Form  
                                        form.append(orderNumName);  
                                        form.append(statusName);  
                                         form.append(wxOrderName);
                                        // 提交表单  
                                        form.submit();  
                            }
                    );
            }
            
        function callpay()
        {
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                    }else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                    }
                } else {
                    jsApiCall();
                }
            }

        </script>
    </head>
    <body>
        <section class="payorderlist">
            <div class="payorderlist-img">
                <img src="./../../source/tmp/payorer.png">
            </div>
            <div class="payorderlist-text">
                <span class="order-name">商品名称：<?php echo $pdtName ?><?php echo $month ?>个月套餐</span>
                <span class="order-desc">商品时长：<?php echo $month ?>个月</span>
            </div>
        </section>
        <section class="bottom-clear">&nbsp</section>
        <div class="bottom-block">
            <div class="combo-list-text">
                账户：<?php echo $useraccount ?> 
            </div>
            <div class="combo-list-btn">
                <button type="button" class="btn btn-info btn-sm" onclick="callpay()">立即支付</button>
            </div>
        </div>
        <script src=".//lib/public.js?11080923"></script>
        <script src="./../source/wxpay.js?10291449"></script>
        <script src="//cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script>
        <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    </body>

</html>
<?php
    error_reporting(0);
    require_once "../publicWxAction/jssdk.php";
    $jssdk = new JSSDK();
    $signPackage = $jssdk->GetSignPackage();
?>

<div ng-controller="HomeCtrl as home" style="background:#f5f5f9">
	<div class="container" style="background:#fff;">
		<div class="public-block">
			<div class="half-block">
				<span class="span-header" style="color:#ff8208">
					{{home.d.visitShopCount !=null?home.d.visitShopCount:"-&nbsp;-"}}
				</span>
				<span class="span-small">总访问量{{testName}}</span>
			</div>
			<div class="half-block">
				<span class="span-header" style="color:#ff8208">
					{{home.d.orderIntentCount !=null?home.d.orderIntentCount:"-&nbsp;-"}}
				</span>
				<span class="span-small">总订单量</span>
			</div>

		</div>
		<span class="span-small">有访问量才有订单量，做个勤劳的老板，去分享店铺吧</span>
		<div class="public-block" style="border-top: 1px solid #ddd;">
			<div class="public-block-3">
				<span class="span-timiheader" id="tdvisitorid">
					{{home.d.visitShopCountToday !=null?home.d.visitShopCountToday:"_&nbsp;_"}}
				</span>
				<span class="span-small">今日访问量</span>
			</div>
			<div class="public-block-3" ui-sref="order">
				<span class="span-timiheader">
					{{home.d.orderIntentCountToday !=null?home.d.orderIntentCountToday:"_&nbsp;_"}}
				</span>
				<span class="span-small">今日意向订单</span>
			</div>
			<div class="public-block-3" ui-sref="home.custom">
				<span class="span-timiheader" id="tdcomtoster">
					{{home.d.agentCustomerCountToday !=null?home.d.agentCustomerCountToday:"_&nbsp;_"}}
				</span>
				<span class="span-small">新增会员</span>
			</div>

		</div>
	</div>
	<div class="addgsblock" ui-sref="store.store">
		<i class="fa fa-plus-circle" style="font-size: 120%;color:#ff8208;"></i> &nbsp;添加商品到云店
	</div>
	<div class="sliderblock">
		<div style="float:left;width: 100%;"><img src="source/20150917094933.jpg" style="width: 100%;"></div>
	</div>

	<!--功能模块开始 -->
	<div class="catepageblock" style="text-align: left;">
		云店管理
	</div>
	<div class="gncateblock" style="margin-bottom: 50px;">
		<div class="cateblock">
			<div class="public-block-2">
				<div class="catblock-left">
					<i class="fa fa-inbox"></i>
				</div>
				<div class="catblock-right" style="border-right: 1px solid #ddd;height: 79px;" ui-sref="store.store">
					<span class="right-tittle">商品管理</span>
					<span class="right-content">管理已经加入云店的商品,修改零售价移出云店等</span>
				</div>
			</div>
			<div class="public-block-2">
				<div class="catblock-left">
					<i class="fa fa-print"></i>
				</div>
				<div class="catblock-right" ui-sref="order">
					<span class="right-tittle">订单管理</span>
					<span class="right-content">{{home.isfanli==1?'云店订单实时管理':'云店下单后需要到订货网上购买哦'}}</span>
				</div>
			</div>
		</div>

		<div class="cateblock" style="border-top: 1px solid #ddd;">
			<div class="public-block-2" ui-sref="shop({aid:home.aid,alias:home.alias})">
				<div class="catblock-left">
					<i class="fa fa-share"></i>
				</div>
				<div class="catblock-right" style="border-right: 1px solid #ddd;">
					<span class="right-tittle">分享店铺</span>
					<span class="right-content">分享云店铺,有效增加意向订单和会员量</span>
				</div>
			</div>
			<div class="public-block-2">
				<div class="catblock-left">
					<i class="fa  fa-thumbs-up"></i>
				</div>
				<div class="catblock-right" style="border-right: 1px solid #ddd;" ng-click="home.toYouPin()">
					<span class="right-tittle">分享优品</span>
					<span class="right-content">放心的二手优品</span>
				</div>
			</div>
		</div>

		<div class="cateblock" style="border-top: 1px solid #ddd;">
			<div class="public-block-2">
				<div class="catblock-left">
					<i class="fa  fa-soundcloud"></i>
				</div>
				<div class="catblock-right" style="border-right: 1px solid #ddd;" onclick="javascript:window.location.href='view/yunshare/index.php'">
					<span class="right-tittle">云享</span>
					<span class="right-content">店铺、商品、活动分享利器</span>
				</div>
			</div>
			<div class="public-block-2" id="scanQRCode1">
				<div class="catblock-left">
					<i class="fa fa-qrcode"></i>
				</div>
				<div class="catblock-right" style="border-right: 1px solid #ddd;">
					<span class="right-tittle">云店扫一扫</span>
					<span class="right-content">扫描云店商品二维码看进价，添加分店</span>
				</div>
			</div>
		</div>
		<div class="cateblock" style="border-top: 1px solid #ddd;">
			<div class="public-block-2">
				<div class="catblock-left">
					<i class="fa fa-money"></i>
				</div>
				<div class="catblock-right" style="border-right: 1px solid #ddd;" onclick="javascript:window.location.href='view/rebate/rebate.html'">
					<span class="right-tittle">我的返利</span>
					<span class="right-content">查看我的返利记录</span>
				</div>
			</div>
			<div class="public-block-2">
                    <div class="catblock-left">
                        <i class="fa fa-book" ></i>
                    </div>
                    <div class="catblock-right" style="border-right: 1px solid #ddd;" ng-click="home.toNiceMobile()">
                        <span class="right-tittle">分享靓号</span>
                        <span class="right-content">提供海量靓号</span>
                    </div>
            </div>
		</div>
		<div class="cateblock" style="border-top: 1px solid #ddd;">
			<div class="public-block-2">
				<div class="catblock-left">
					<i class="fa fa-home"></i>
				</div>
				<div class="catblock-right" style="border-right: 1px solid #ddd;" ui-sref="home.shop">
					<span class="right-tittle">店铺管理</span>
					<span class="right-content">我的所有分店和分销店铺</span>
				</div>
			</div>
			<div class="public-block-2" ui-sref="home.custom">
				<div class="catblock-left">
					<i class="fa fa-group"></i>
				</div>
				<div class="catblock-right">
					<span class="right-tittle">客户管理</span>
					<span class="right-content">浏览我的云店铺并有购买意向的顾客</span>
				</div>
			</div>
		</div>
	</div>
	<!--功能模块结束 -->

	<!--<div class="blockclear"></div>-->

	

	<!-- 底部弹出框 -->
	<div class="alert-contailer" id="indexbottom">
		<div class="alert-contailer-bg" onclick="hidenIndexBottom()"></div>
		<div class="alert-container-block-achive">
			<div class="alert-contailer-text">
				<div class="public-block-3" style="border-right: 1px solid #ddd">
					<i class="icon-h-sign"></i>
					<span>订货网商品</span>
				</div>

				<div class="public-block-3" style="border-right: 1px solid #ddd">
					<i class=" icon-upload-alt"></i>
					<span>自营商品</span>
				</div>

				<div class="public-block-3">
					<i class=" icon-globe"></i>
					<span>第三方商品</span>
				</div>

			</div>
			<div class="public-block-alert" onclick="hidenIndexBottom()">
				取消
			</div>
		</div>
	</div>

	<!--加载中弹出框-->
	<div class="alert-contailer">
		<div class="alert-contailer-bg"></div>
		<span class="alert-lodingspan"><i class="icon-refresh icon-spin"></i></span>
	</div>
</div>

<script>


       
        wx.config({
            appId: '<?php echo $signPackage["appId"]; ?>',
            timestamp: <?php echo $signPackage["timestamp"]; ?>,
            nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
            signature: '<?php echo $signPackage["signature"]; ?>',
            jsApiList: [
                // 所有要调用的 API 都要加到这个列表中
                'scanQRCode',
                'onMenuShareTimeline'
            ]
        }); 
		<?php 
			$url = "$protocol$_SERVER[SERVER_NAME]$_SERVER[REQUEST_URI]"; 
		?>
		var signature = '<?php echo $url ?>'
		var myhost = window.location.hash;
		var myhost2 = window.location.href;
		var myhost3 = window.location.origin;
		
		
		console.log(myhost);
		console.log(myhost2);
		console.log(myhost3);
		console.log(signature)

		
        wx.ready(function() {
            //wx.hideOptionMenu();
            // 在这里调用 API
        });

        document.querySelector('#scanQRCode1').onclick = function() {
            wx.scanQRCode({
                needResult: 1,
                desc: '扫描51云店二维码',
                success: function(res) {
                    _wxScanQRCode(res);
                },
                fail: function(res) {
					alert(JSON.stringify(res));
                }
            });
        };
        
        var BANDINGFLAG = "001";// 扫码绑定

		var UPDATAADDRFLAG = "000"; //扫码修改地址
        
        function _wxScanQRCode(para_scanqrCode){
		    var qresult = para_scanqrCode.resultStr;
		    var idenfitystr = "scan_code";
		
		    if (-1 == qresult.indexOf(idenfitystr, 0))
		    {
		        //安卓版本  实际参数是：para_scanqrCode.resultStr
		    }
		    else
		    {
		        //IOS设备
		        qresult = qresult.replace(/\\/g, "");
		        var iosresult = eval("(" + qresult + ")");
		        qresult = eval(iosresult.scan_code).scan_result;
		
		    }
		    var index = qresult.substr(0, 3);
		    var ecodeValue = qresult.substr(3);
		    switch (index)
		    {
		        case BANDINGFLAG:
		            {
		                //绑定
		                var mac = ecodeValue.substr(4);
		                window.location.href = "wxbanding.html?imei=" + Glob_openid + "&boxid=" + mac + "";
		                break;
		            }
		        case UPDATAADDRFLAG:
		            {
		                var strindex = ecodeValue.indexOf("ordernums");
		                if (-1 != strindex)
		                {
		                    var indexvalue = 10 + strindex;
		                    var orderList = ecodeValue.substr(indexvalue);
		
		                    window.location.href = "./wxorderModify.html?ordernums=" + orderList + "";
		                }
		                else
		                {
		                    new $.flavr('抱歉！订单信息获取失败！');
		                }
		
		                // window.location.href="wxbanding.html?ordernums="+ordernums+"";
		                break;
		            }
		        default:
		            {
		
		                window.location.href = qresult;
		                //new $.flavr('抱歉！暂不支持非云店二维码');
		                break;
		            }
		    }
		
		}
        
</script>

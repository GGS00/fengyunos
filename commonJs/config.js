/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor. 
 */

var ConfigCommonVariate = {};
var ConfigAjaxVariate = {};

//var Comm_Config = "http://iyd.51dh.com.cn";
//var Comm_Config = "http://121.40.188.67:8080/ydserver/"; 
//var Comm_Config = "http://192.168.1.108:8080/ydserver/";
//var Comm_Config = "http://localhost:8080/ydserver/";
//var Comm_Config = "http://180.96.63.160:8080/ydserver/";
//var Comm_Config = "http://xiaochunli.tunnel.qydev.com/ydserver/"; 


var Home_host = window.location.host;
var Comm_Config =  "http://"+Home_host+"/ydserver/";


var Common_Img = "";

//var PHP_Config  = "http://sdyd.51dh.com.cn";
//var PHP_Config  = "http://localhost/Yshop";
var PHP_Config = "http://10000dp.com";

/**
 * 
 * @type String
 * 商品分享链接的公共头部
 */
var ShareGoodsPublicLink = "http://10000dp.com/wxadmin/goodsBlock.php";


/**
 * 
 * @type String
 *链接的公共头部
 */
var ShareShopPublicLink = "http://10000dp.com";

/**
 * 商品列表的分享的公共头部
 */
var ShareListgoodsPublicLink = "http://10000dp.com/App/Modules/weixin/weixinportal/goodsView/goodsview.php";

/**
 * 店铺的头部
 */
var ShreShopCommonLink = "http://10000dp.com/wxadmin/wshop.php";

/**
 * 
 * 店铺名片的头部
 */
var ShreShopCardCommonLink = "http://10000dp.com/wxadmin/wshop_boss.php";


/**
 * 
 * 店铺二维码的头部
 */
var ShareErcodePublicLink = "http://10000dp.com/wxadmin/shopercode.php";

//Ajax 公共type

ConfigAjaxVariate.AjaxPublicTypeGet  ="GET";
ConfigAjaxVariate.AjaxPublicTypePost  ="POST";

//Ajax 公共url

//获取店铺信息
ConfigAjaxVariate. AjaxGetShopInfo  ="public/getShop.do";
//获取代理商信息
ConfigAjaxVariate.AjaxGetAgentInfo = "wx/getAgentByAgentId.do";
//根据mac 获取Aid
ConfigAjaxVariate.AjaxGetAidByMac  = "wx/getAgentByMac.do";
//根据baseid  aid alias 获取商品详情
ConfigAjaxVariate.AjaxGetGoodsDetail = "wx/getGoodsDetail.do";
//根据aid 获取代理商的访问数据
ConfigAjaxVariate.AjaxGetAgentLog = "wx/getWxIndexReport.do";
//顾客商品下单
ConfigAjaxVariate.AjaxSetAddOrder = "wx/addOrderIntent.do";
//添加商品分享访问日志
ConfigAjaxVariate.AjaxSetVisitGoods = "wx/addVisitGoods.do";
//批量修改商品属性价格
ConfigAjaxVariate.AjaxSetUpdateAtomPrice = "wx/batchUpdateAtomGoodsPrice.do";
//加盟店修改商品属性价格
ConfigAjaxVariate.AjaxSetUpdateRetailPrice = "wx/updateRetailPrice.do";

//百度流量统计  全局统计
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?6f8d58239a7890e0ccff44b6a7cf828c";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?24c4528be0e1a175622dd82d8719b412";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();


 var globSessionStorage = window.sessionStorage;
 var globLocalStorage = window.localStorage;
 
 function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//获得参数的方法  var selfImei = request.QueryString("imei"); 
var request =
{
    QueryString : function(val)
    {
        var uri = window.location.search;
        var re = new RegExp("" +val+ "=([^&?]*)", "ig");
        return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
    }
}


//根据aid获取用户openid 以推送订单信息
function getAgentOpenidByAid(cuname,cutel,aid,price,intentionGoods){
    
    $.ajax({
        type: "GET",
        url: ""+Comm_Config+"wx/getAgentByAgentId.do", 
        data:{"agentid":aid},
        success: function(data) {
            var d = eval(data);
            if(d.resultValue.id == aid){
                if(d.resultValue.openid.length >20){
                    pushOrderWxMsg(cuname,cutel,price,intentionGoods,d.resultValue.openid);
                }
            }
        },
        error: function(data) {

        }
    });
}
//推送微信订单信息通知
function pushOrderWxMsg(cuname,cutel,price,intentionGoods,openid){
    var customermsg=cuname+","+cutel;
    var intentionPrice = "￥"+price.toFixed(2);
    $.ajax({
        type: "post",
        url: "http://10000dp.com/control/publicRequest.php",
        data: {
            "customermsg": customermsg,
            "openid": openid,
            "intentionGoods": intentionGoods,
            "intentionPrice":intentionPrice
        },
        success: function(data) {

        },
        error: function(data) {

        }
    });
}
//在微信众打开 使用开发者模式打开
function openHomeByWx() {
    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6f30595592155ec9&redirect_uri=http%3a%2f%2f10000dp.com%2fwxadmin%2fhome.php&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect";
}

$(document).ajaxError(function(event, request, settings) {
    switch(request.status){
        case 403:
                alert("您在别的地方已经登录，请退出重新登录");
            break; 
    }
});
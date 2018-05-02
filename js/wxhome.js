/**
 * time： 2014年12月31日17:10:58
 * author：sungg
 */

/**
 * 
 * @returns {Number}
 * 全局变量
 */

var Glob_openid;//用户openid  作为手机Macaddress使用
var Glob_boxid;//用户盒子ID
var Glob_aid;// 用户店铺id
var Glob_isboss;//用户级别
var GLOB_Alias;

/**
 * 二维码前缀  
 */
var BANDINGFLAG = "001";// 扫码绑定

var UPDATAADDRFLAG = "000"; //扫码修改地址



/**********************************************************************************************************************************
 *                              微信版  51云店 home.php处理所需js                     
 *********************************************************************************************************************************/

function _getopenidRandom()
{
    GLOB_Alias = globSessionStorage ["sessionAlias"];
    
    if (null != Glob_openid)
    {
        isBangdingVerificat();
    }
    else
    {
        var localopenid = globLocalStorage ["sessionopenid"];
        if (null !=localopenid)
        {

            isBangdingVerificat();
        }
        else
        {
            $("#dialogZoon").show();
        }
    }

}
/**
 * 
 * @param {type} Glob_openid
 * @returns {undefined}
 * 根据 openid  查看openi是否注册 0 未注册，else  返回AID
 */
function isBangdingVerificat()
{
	var goOrder = request.QueryString("goOrder");
	
    $.ajax({
        type: "GET",
        url: "" + Comm_Config + "wx/getAgentByOpenId.do",
        data: {"openid": Glob_openid},
        success: function(data) {
           
            var d = eval(data);
            var resultvalue = d.resultValue;
            var msg = d.msg;
            if(resultvalue == 0){
                portallog(d.resultValue);
                _hmt.push(['_setCustomVar', 1, '用户登录', '微信端登陆', 1]);
                var agentid = d.agentInfo.id;
                var aliasid = d.agentInfo.alias_id;
                var shopid = d.shopId;
                var sessionid = d.sessionInfo.sessionid;
                globSessionStorage ["sessionAid"] = agentid;
                globSessionStorage ["sessionAlias"] = aliasid;   
                globSessionStorage["sessionistoken"] = sessionid;
                globLocalStorage["sessionAid"] = d.agentInfo.id;
                var randomstr = GetRandomNum();
                var shopID = d.shopId;//不为空就是分店 
                if(null ==  shopID ||"" == shopID|| undefined == shopID){
                     globSessionStorage["sessionisboss"] = 1;
                     sessionStorage["sessionshopid"] = d.master_shopid;
                     if(goOrder == 1){
                     	window.location.href="local/index.html#/order?"+randomstr;
                     }else{
                     	window.location.href="local/index.html?"+randomstr;
                     }
                     
                }else{
                     window.location.href="10000dp.com/wxadmin/local/index.html#/shop?aid="+agentid+"&alias="+aliasid+"&shopid="+shopid+"&isshare=1?"+randomstr;
                }
            }
            if(resultvalue == 4){// 待审核
                alert(msg);
                return;
            }
            if(resultvalue == 5){//加盟商到期
                var partnerinfor = d.partner_info;
                alert("请联系您区域的合伙人 :"+partnerinfor.name+":"+partnerinfor.tel);
                return;
            }
             if(resultvalue == 40001){
                 var is_belong_partner = d.is_belong_partner;
                   var belong_type = d.belong_type;// 1 是加盟商 0 直营店
                   var is_branch = d.is_branch;//是否是分店 1 表示是  0 表示否
                   var partnerinfor = d.partner_info;
                   if(is_belong_partner == 1){//属于合伙人
                        if(belong_type == 1){
                            alert("请联系您区域的合伙人 :"+partnerinfor.name+":"+partnerinfor.tel);
                        }else{
                            alert("您的分店已到期，请续费！！");//给一个二维码扫描
                        }
                   }else{
                          alert("您的分店已到期，请续费！！");//给一个二维码扫描
                   }
            }
            
            
         
            

//            if (0 != d.resultValue)
//            {
//                if (d.resultStatus)
//                {
//                    portallog(d.resultValue);
//                    _hmt.push(['_setCustomVar', 1, '用户登录', '微信端登陆', 1]);
//                    globSessionStorage ["sessionAid"] = d.resultValue;
//                    globSessionStorage ["sessionAlias"] = d.resultAlias;
//                    
//                    globSessionStorage["sessionistoken"] = d.sessionInfo.sessionid;
////                    if (Glob_Img) {
////                        setAgentWxIco(d.resultValue);
////                    }
//                    globLocalStorage["sessionAid"] = d.resultValue;
//                    var randomstr = GetRandomNum();
//                    var shopID = d.shopId;//不为空就是分店 
//                    if(null ===  shopID ||"" === shopID|| undefined === shopID){
//                         globSessionStorage["sessionisboss"] = 1;
//                         window.location.href="index.php?"+randomstr;
//                         return;
//                    }else{
//                         window.location.href="wshop.php?aid="+d.resultValue+"&alias="+d.resultAlias+"&shopid="+d.shopId+"&isshare=1?"+randomstr;
//                    }
//                }
//                else
//                {
//                    //用户数据正在审核中，不能进入
//                    agentMsgIsChecking();
//                }
//
//            }
            //else  未注册
        }
    });

}

//代理商头像根据微信获取
function setAgentWxIco(aid) {
    $.ajax({
        type: "GET",
        url: "" + Comm_Config + "/wx/updateIcon.do",
        data: {"iconurl": Glob_Img, "agentid": aid},
        success: function(data) {
        }
    });
}
/**
 * 
 * @returns {undefined}
 * 客户端日志
 */
function portallog(aid)
{
    var logsource = 3;
    $.ajax({
        type: "POST",
        url: "" + Comm_Config + "public/addTerminalLog.do",
        data: {"agentid": aid, "source": logsource, "mac": Glob_openid},
        success: function(data) {
        }
    });
}

/**
 * 
 * @returns {undefined}
 * 快速绑定  二维码扫描只支持绑定
 */
function _ecodeBanding(para_scanqrCode)
{
    var qresult = para_scanqrCode.resultStr;
    var idenfitystr = "scan_code";
    if (-1 == qresult.indexOf(idenfitystr, 0))
        ;
    else
    {
        //IOS设备
        qresult = qresult.replace(/\\/g, "");
        var iosresult = eval("(" + qresult + ")");
        qresult = eval(iosresult.scan_code).scan_result;

    }
    var index = qresult.substr(0, 3);
    var ecodeValue = qresult.substr(3);
    if (BANDINGFLAG == index)
    {
        //绑定
        var param = "盒子：" + mac;
        _hmt.push(['_trackEvent', '微信绑定', '微信绑定', param]);
        var channel_num = ecodeValue.substr(0, 4);
        var mac = ecodeValue.substr(4);
        window.location.href = "wxbanding.html?imei=" + Glob_openid + "&boxid=" + mac + "&channelnum=" + channel_num + "";
    }
    else
    {
        alert("请扫描51云店机顶盒绑定二维码！");
    }

}

/**********************************************************************************************************************************
 *                              微信版本51云店 index.php  只存在 业务服务器上 处理JS                       
 *********************************************************************************************************************************/



/**
 *   身份鉴别
 */

function identityByOpenId()
{
    Glob_openid = globSessionStorage ["sessionopenid"];
    Glob_isboss = globSessionStorage ["sessionisboss"];
    Glob_aid = globSessionStorage ["sessionAid"];
    GLOB_Alias = globSessionStorage ["sessionAlias"];
    token = globSessionStorage ["sessionistoken"];
    if (!Glob_openid)
    {
        comm_confirm();
    }
}


/**
 * 
 * @param {type} isfirtlogin
 * @returns {undefined}
 * 是否首次登陆
 */
function isfirtlogin(isfirtlogin)
{
    if (2 != isfirtlogin)
    {
        //第一次
        document.getElementById('sharelogo').style.display = "";
        document.getElementById('sharelogobg').style.display = "";
        localStorage ["localisfirtlogin"] = 2;
    }

}
/**
 * 
 * @returns {undefined}
 */
function comm_confirm()
{
    new $.flavr({
        content: '抱歉！您未关注51云店微信平台，是否前去关注？',
        dialog: 'confirm',
        onConfirm: function() {
        },
        onCancel: function() {
        }
    });
}

/**
 * 功能键 点击
 * 0-商品管理
 * 1-订单管理
 * 2-店铺管理
 */
function pointClick(index)
{
    switch (index)
    {
        case 0:
            {
                //可以查看
                var randomstr = GetRandomNum();
                var param = "代理商：" + Glob_aid + ";进入商品列表";
                _hmt.push(['_trackEvent', '微信管理', '商品分享', param]);
                window.location.href = "goodsView/goodsview.php?aid=" + Glob_aid + "&isboss=" + Glob_isboss + "&alias=" + GLOB_Alias + "?" + randomstr + "";
                break;
            }
        case 1:
            {
                var randomstr = GetRandomNum();
                var param = "代理商：" + Glob_aid + ";进入区域管理";
                _hmt.push(['_trackEvent', '微信管理', '区域管理', param]);
                window.location.href = "areacommand/areacommand.html?aid=" + Glob_aid + "&isboss=" + Glob_isboss + "&alias=" + GLOB_Alias + "?" + randomstr + "";
                //javascript:homepage.newintent("订单管理","phoneportal/ordercommand/ordercommand.html?aid="+aid+"&isboss="+isboss+"");
                break;
            }
        case 2:
            {
                var param = "代理商：" + Glob_aid + ";进入店铺管理";
                _hmt.push(['_trackEvent', '微信管理', '店铺管理', param]);
                var randomstr = GetRandomNum();
                window.location.href = "./shopcommand/shopcommand.html?aid=" + Glob_aid + "?" + randomstr + "";
                //javascript:homepage.newintent("店铺管理","phoneportal/myshop/shop.html?aid="+aid+"&isboss="+isboss+"");
                break;
            }
        case 3:
            {
                //电视显示区域管理
                var randomstr = GetRandomNum();
                var param = "代理商：" + Glob_aid + ";进入订单管理";
                _hmt.push(['_trackEvent', '微信管理', '订单管理', param]);
                window.location.href = "ordercommand/ordercommand.html?aid=" + Glob_aid + "&alias=" + GLOB_Alias + "?" + randomstr + "";
                break;
            }
        case 4:
            {
                var randomstr = GetRandomNum();
                var param = "代理商：" + Glob_aid + ";进入海报管理";
                _hmt.push(['_trackEvent', '微信管理', '海报管理', param]);
                window.location.href = "areacommand/wx_poster.html?aid=" + Glob_aid + "?" + randomstr + "";
                break;
            }
        case 5:
            {
                var randomstr = GetRandomNum();
                var param = "代理商：" + Glob_aid + ";进入自定义商品";
                _hmt.push(['_trackEvent', '微信管理', '自定义商品', param]);
                window.location.href = "areacommand/wx_customgoods.html?aid=" + Glob_aid + "?" + randomstr + "";
                break;
            }
        case 6:
            {
                $("#newpwdinput").val("");
                $('#myModal').modal('show');
                break;
            }

        default:
            {
                new $.flavr('抱歉！未能识别您的操作!');
                break;
            }
    }
}


function reopen()
{
    new $.flavr('抱歉！手机版此功能正在完善，请电脑访问yd.51dh.com.cn进行操作');
}

function GetRandomNum()
{
    var Min = 0;
    var Max = 10000;
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

/****
 *  -1 == aid   未绑定
 *  -2 == aid   imei  错误
 */
function getaidbyimei(imei)
{
    $.ajax({
        type: "GET",
        url: "" + Comm_Config + "wx/getAgentByOpenId.do",
        data: {"openid": imei},
        success: function(data) {
            var d = eval(data);
            if (d.resultVaule)
            {
                Glob_isboss = 1;  //返回的是 01  截取第二位
                Glob_aid = d.resultVaule;
                globSessionStorage["sessionaid"] = Glob_aid;
                globSessionStorage["sessionisboss"] = Glob_isboss;
            }
            else
            {
                Glob_isboss = 0;  //返回的是 01  截取第二位
                Glob_aid = 0;
                globSessionStorage["sessionaid"] = Glob_aid;
                globSessionStorage["sessionisboss"] = Glob_isboss;
            }
        }
    });
}



function wx_toService()
{
    var param = "代理商：" + Glob_aid + ";进入云店服务";
    _hmt.push(['_trackEvent', '微信管理', '云店服务', param]);
    var aid = request.QueryString("aid");
    var isboss = request.QueryString("isboss");
    var randomstr = GetRandomNum();
    if ((null != aid) && (null != isboss))
    {
        window.location.href = "wxservice.html?aid=" + aid + "&isboss=" + isboss + "?" + randomstr + "";
    }
    else
    {
        window.location.href = "wxservice.html?aid=" + Glob_aid + "&isboss=" + Glob_isboss + "?" + randomstr + "";
    }

}
function wx_toHome()
{

    window.location.href = "index.php";
}
function wx_toInfo()
{

    // new $.flavr('抱歉，该功能正在拼命开发中.'); 
    var aid = request.QueryString("aid");
    var isboss = request.QueryString("isboss");
    var randomstr = GetRandomNum();
    var param = "代理商：" + aid + ";进入个人信息";
    _hmt.push(['_trackEvent', '微信管理', '个人信息', param]);
    if ((null != aid) && (null != isboss))
    {
        window.location.href = "wxmyinfo.html?aid=" + aid + "&isboss=" + isboss + "?" + randomstr + "";
    }
    else
    {
        window.location.href = "wxmyinfo.html?aid=" + Glob_aid + "&isboss=" + Glob_isboss + "?" + randomstr + "";
    }

}


/**
 * 
 * @returns {undefined}
 * 代理商店铺
 */
function wx_toShop()
{
    var param = "代理商：" + Glob_aid + ";进入云店铺";
    _hmt.push(['_trackEvent', '微信管理', '云店铺', param]);
    var randomstr = GetRandomNum();
    Glob_aid = globSessionStorage ["sessionAid"];
    GLOB_Alias = globSessionStorage ["sessionAlias"];
    window.location.href = "shopshare/sample.php?aid=" + Glob_aid + "&alias=" + GLOB_Alias + "?" + randomstr + "";


}
/**
 * 
 * @param {type} scanqrCode
 * @returns {undefined}
 * 二维码扫描鉴别
 */
function _wxScanQRCode(para_scanqrCode)
{
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
function unopen()
{
    new $.flavr('抱歉！本功能正在完善，敬请期待！');
}

/************************************************************************
 * 以下是 服务页面所需js
 ***********************************************************************/

/**
 * 
 * @param {type} index
 * @returns {undefined}
 * 服务页面 跳转
 * 0:51云店说明
 * 1：机顶盒操作说明
 * 
 */
function servicejump(index)
{
    switch (index)
    {
        case 0:
            {
                window.location.href = "./service/51readme.html";
                break;
            }
        case 1:
            {
                window.location.href = "./service/51tv.html";
                break;
            }
        case 2:
            {
                window.location.href = "./service/51phone.html";
                break;
            }
        case 3:
            {
                window.location.href = "./service/51addus.html";
                break;
            }
        default:
            break;
    }
}


function sharelogohide()
{
    document.getElementById('sharelogo').style.display = "none";
    document.getElementById('sharelogobg').style.display = "none";
}


/**
 * 
 * @returns {undefined}
 * 提交新密码
 */
function submitnewpwd()
{
    var newpwd = $("#newpwdinput").val();
    if ("" == newpwd)
    {
        return;
    }
    var md5pwd = hex_md5(newpwd);
    $.ajax({
        type:"GET",
        url: ""+Comm_Config+"wx/updateAgentPassWord.do",  
        data: { "password":md5pwd, "agent_id":Glob_aid},    
        success: function(data){

            var d = eval(data);
            if (0 == d.resultValue)
            {
                $('#myModal').modal('hide');
                new $.flavr({content: '修改成功，正在跳转...',
                    autoclose: true, timeout: 1500});

            }
            else
            {
                new $.flavr('很抱歉，更新失败!');
            }
        }
    });


}
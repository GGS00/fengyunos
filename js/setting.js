/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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
/**
 * 
 * @param {type} item
 *                  0 表示个人设置
 *                  1 表示添加分店
 *                  2 表示我的店铺
 *                  3 使用帮助
 * @returns {undefined}
 */
var GLOB_AID;
var GLOB_ALIAS;

function settingChoice(item) {
     GLOB_AID = globSessionStorage ["sessionAid"];
    
    switch (item) {
        case 0:
            window.location.href = "ydmodify_infor.html?aid="+GLOB_AID+"&isboss=1";
            break;
        case 1:

            break;
        case 2:
              window.location.href = "shopcommand/shopcommand.html";
            break;
        case 3:
             window.location.href = "wxservice.html";
            break;
        default:
            break;
    }
}

function loadagentinfo()
{
    GLOB_AID = globSessionStorage ["sessionAid"];
    GLOB_ALIAS  =globSessionStorage ["sessionAlias"];
    $.ajax({
        type: "get",
        url: "" + Comm_Config + "wx/getAgentByAgentId.do",
        data: {"agentid": GLOB_AID},
        success: function(data) {
            var d = eval(data);
            if(null !=d.resultValue.icon)
           document.getElementById('agenticoid').setAttribute("src", d.resultValue.icon);
           document.getElementById('agentshopnameid').innerHTML=d.resultValue.shop_name;
           document.getElementById('agentnameid').innerHTML=d.resultValue.name;
           document.getElementById('agenttelid').innerHTML=d.resultValue.tel;
           if("" ==d.resultValue.qq)
           document.getElementById('agentqqid').innerHTML="未设置";
           else document.getElementById('agentqqid').innerHTML=d.resultValue.qq;
           
            if("" ==d.resultValue.wechat)
           document.getElementById('agentwechatid').innerHTML="未设置";
           else document.getElementById('agentwechatid').innerHTML=d.resultValue.wechat;
           
        }
    });
}
/**
 * 
 * @param {type} index
 * @returns {undefined}
 * 1:修改头像
 * 2：修改店铺名
 * 3：修改店主名
 * 4：修改手机号
 * 5：修改QQ
 * 6：修改微信
 */
var Glob_edittype;
var inputroutflag = 0;
function editShopMsg(index){

    Glob_edittype  = index;
     $("#myCarousel").carousel('next');
     inputroutflag = 0;
     $("#publicpwdid").hide();
     $("#publicinputid").show();
     switch(index)
     {
         case 2:
             {
                     $("#publicinputid").val( document.getElementById('agentshopnameid').innerHTML);

                     break;
             }
            case 3:
             {
                     $("#publicinputid").val( document.getElementById('agentnameid').innerHTML);
                     break;
             }
             case 4:
             {
                     $("#publicinputid").val( document.getElementById('agenttelid').innerHTML);
                     break;
             }
           case 5:
             {
                     $("#publicinputid").val( document.getElementById('agentqqid').innerHTML);
                     break;
             }
             case 6:
             {
                     $("#publicinputid").val( document.getElementById('agentwechatid').innerHTML);
                     break;
             }
         case 7:
             {
                 inputroutflag = 1;
                 $("#publicinputid").hide();
                 $("#publicpwdid").show();
                 $("#publicpwdid").val("");
             }
         default:break;
     }
  //   $("#publicinputid").focus();
}

function toshopercode()
{
    window.location.href="shopercode.php?aid="+GLOB_AID+"&alias="+GLOB_ALIAS+"";
}

function canceledit()
{
     $("#myCarousel").carousel('prev');
}

function inputclear()
{
    $("#publicinputid").val("");
    $("#publicinputid").focus();
}
function inputFocus()
{
    document.getElementById('icoclearid').style.display="";  
}

function updateagentmsg()
{
    if(1== inputroutflag)
    {
        updatepwd();
        return;
    }
    var value = $("#publicinputid").val();
    var data = {"agentid": GLOB_AID,"name":value};
    
     switch(Glob_edittype)
     {
         case 2:
             {
                     data = {"agentid": GLOB_AID,"shopname":value};
                     break;
             }
            case 3:
             {
                     data = {"agentid": GLOB_AID,"name":value};
                     break;
             }
             case 4:
             {
                     data = {"agentid": GLOB_AID,"tel":value};
                     break;
             }
           case 5:
             {
                     data = {"agentid": GLOB_AID,"qq":value};
                     break;
             }
             case 6:
             {
                     data = {"agentid": GLOB_AID,"wechat":value};
                     break;
             }
         default:break;
     }
     
     
    $.ajax({
        type: "get",
        url: "" + Comm_Config + "wx/updateAgentByCondition.do",
        data: data,
        success: function(data) {
            loadagentinfo();
            $("#myCarousel").carousel('prev');
        },
        error:function(data)
        {
                 alert("修改失败,稍后再试");
        }
    });
}

//function updatepwd()
//{
//
//    var newpwd = $("#publicpwdid").val();
//    if("" == newpwd)
//    {
//        return;
//    }
//    var md5pwd = hex_md5(newpwd);
//    $.ajax({
//        type:"GET",
//        url: ""+Comm_Config+"wx/updateAgentPassWord.do",
//        data: { "password":md5pwd, "agent_id":GLOB_AID},
//        success: function(data){
//             alert("修改成功");
//            loadagentinfo();
//            $("#myCarousel").carousel('prev');
//        },
//        error:function(data)
//        {
//                 alert("修改失败,稍后再试");
//        }
//    });
//
//}
var SHRE_PIC;
var SHARE_TITTLE = "这是我的店铺二维码,扫描或长按二维码就能进入我的云店铺，海量商品货到付款";
var SHARE_DESC = "我自己的云店铺二维码，扫描或长按二维码就能进入我的云店铺";
function loadagentercode()
{
    GLOB_AID = request.QueryString("aid"); 
    GLOB_ALIAS = request.QueryString("alias"); 
    
    SHRE_PIC = "http://yd.51dh.com.cn/App/Modules/weixin/weixinportal/images/yunicon.jpg";
    $.ajax({
        type: "get",
        url: "" + Comm_Config + "wx/getAgentByAgentId.do",
        data: {"agentid": GLOB_AID},
        success: function(data) {
            var d = eval(data);
            SHARE_TITTLE = "这是"+d.resultValue.shop_name+"的店铺二维码,扫描或长按二维码就能进入我的云店铺，海量商品货到付款";
             SHARE_DESC  =d.resultValue.name+"自己的云店铺二维码，扫描或长按二维码就能进入我的云店铺";
       //      if(null !=d.resultValue.icon)
//             document.getElementById('shopico').setAttribute("src", d.resultValue.icon);
             document.getElementById('ercodemsgheadid').innerHTML=d.resultValue.shop_name;
             document.getElementById('ercodemsgdescid').innerHTML=d.resultValue.city+"·"+d.resultValue.name;
             
        }
    });
    getErderCode();
}

function getErderCode()
   {
       
        var qrcode = new QRCode(document.getElementById("qrcodezoon"), {
            width : 696,//设置宽高
            height : 696
        });
        var currenturl = ""+ShreShopCommonLink+"?alias="+GLOB_ALIAS+"&aid="+GLOB_AID+"?isshare=1";
        qrcode.makeCode(currenturl);
   }
function GetRandomNum()
{   
var Min = 0;
var Max = 10000;
var Range = Max - Min;   
var Rand = Math.random();   
return(Min + Math.round(Rand * Range));   
}  

function loginOut(){
	window.location.href = "wxlogin.html"
}

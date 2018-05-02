/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var GLOB_CurrentPage = 1;
var pagenum  =1;
var GLOB_STATUS = 0;
var All_listCount = 0;
var GLOB_OrderNum;
var GLOB_AID;
var GLOB_ALIASID;
var GLOB_SHOPID;
var GLOB_SELLTYPE;
var GLOB_ISSHARE;
ordercommandready();
function ordercommandready()
{
   
     GLOB_AID = request.QueryString("aid"); 
     GLOB_ALIASID = request.QueryString("alias");
     GLOB_SHOPID = request.QueryString("shopid");
     GLOB_SELLTYPE = request.QueryString("selltype");
     GLOB_ISSHARE = request.QueryString("isshare");
     loadOrderList(GLOB_CurrentPage,GLOB_STATUS);   
}

function loadOrderList(page,orderstatus)
{
//    document.getElementById('loadmorediv').style.display="none"; 
    GLOB_CurrentPage  =page;
     if((0<page) && (pagenum>=page))
    {
        $.ajax({
         type:"GET",
         url: ""+Comm_Config+"wx/getOrderIntentList.do", 
         data: {"agent_id":GLOB_AID,"page":page,"status":orderstatus,"shopid":GLOB_SHOPID},    
         success: function(data){

         analyseoderData(data);
         loadPageCount(orderstatus);
         }
     }); 
    }
    else
    {
//        document.getElementById('loadmorediv').style.display="block"; 
//        document.getElementById('loadtextid').innerHTML="加载完毕";
    }
    
   
}
function loadPageCount(orderstatus)
{
    $.ajax({
         type:"GET",
         url: ""+Comm_Config+"wx/getOrderIntentCount.do", 
         data: {"agent_id":GLOB_AID,"status":orderstatus},    
         success: function(data){
             var d  =eval(data);
            var maxCount = d.count;
            pagenum = Math.ceil(maxCount/15);
            if(pagenum == 0)
            {
                pagenum = 1;
            }
            
        }
     });     
}
/**
 * 
 * @param {type} data
 * @returns {undefined}
 * 解析订单数据
 */
function analyseoderData(data)
{
    
    var orderlistpanel = $("#orderlistpanelId");
    
    var d = eval(data);
    var status = "<span style=\"float:right;color:green\" >已处理</span>";
    var buy_text = "";
    var mybtn = "";
   if(1> d.resultValue.length)
   {
       document.getElementById('emptyTips').style.display="block";
       return;
   }

    for(i=0;i<d.resultValue.length;i++)
    {
        All_listCount++;
        if(1 == d.resultValue[i].status)
        {
            status = "<span id=\"spanstatus"+All_listCount+"\" style=\"float:right;color:#EE9A00\" >未处理</span>";
        }
        else if(10 == d.resultValue[i].status)
        {
            status = "<span id=\"spanstatus"+All_listCount+"\" style=\"float:right;color:red\" >已取消</span>";
        }
        else if(5 == d.resultValue[i].status)
        {
            status ="<span id=\"spanstatus"+All_listCount+"\" style=\"float:right;color:green\" >已处理</span>";
        }
        
        if(1 == d.resultValue[i].is_show)
        {
            //商品上架状态
            if(GLOB_ALIASID != 10 && GLOB_ALIASID !=16 && GLOB_ALIASID != 8 && GLOB_ALIASID != 12 && GLOB_ALIASID != 19){
                switch(d.resultValue[i].supply_id)
                {

                    case '1':
                        {
                            //51DH
                            buy_text = "51订货网购买";
                            break;
                        }
                    case '2':
                        {
                            //JD
                            buy_text = "京东购买";
                            break;
                        }
                    case '3':
                        {
                            //AL
                            buy_text = "阿里巴巴购买";
                            break;
                        }
                    case '4':
                        {
                            // 自定义
                            buy_text = "店主自营";
                            break;
                        }
                    case '5':
                        {
                            //WMW
                            buy_text = "我买网购买";
                            break;
                        }
                    case '6':
                        {
                            //SN
                            buy_text = "苏宁购买";
                            break;
                        }
                    case '7':
                        {
                            //GM
                            buy_text = "国美购买";
                            break;
                        }
                    case '8':
                        {
                            //1号店
                            buy_text = "一号店购买";
                            break;
                        }
                    case '9':
                        {
                            //云店
                            buy_text = "云店购买";
                            break;
                        }
                    default:break;

                }
            }
        }
        else
        {
             buy_text = "商品已下架";
        }
        if(GLOB_ALIASID != 10 && GLOB_ALIASID !=16 && GLOB_ALIASID != 8 && GLOB_ALIASID != 12 && GLOB_ALIASID != 19){
           mybtn = "<a  type=\"button\" id=\"tipsbtn"+i+"\" class=\"btn btn-success\" onclick=\"attrPriceChoice("+i+",'"+d.resultValue[i].base_id+"',"+d.resultValue[i].supply_id+",'"+d.resultValue[i].from_url+"','"+d.resultValue[i].good_name+"',"+d.resultValue[i].is_show+",'"+d.resultValue[i].order_num+"')\">"+buy_text+"</a>"
        }

        price_text = "<span >返利:￥"+ d.resultValue[i].rebate_money+"</span>";
        
        if (((1 == GLOB_SELLTYPE)||(2 == GLOB_SELLTYPE)) && (1 == GLOB_ISSHARE))
         {
            if(d.resultValue[i].is_rebate != 1){
                price_text ="<span >进货价:￥"+ d.resultValue[i].settle_price+"</span>"
            }
            orderlistpanel.append("<div class=\"panel panel-default\" >\n\
                                    <div class=\"panel-heading\">\n\
                                        <h3 class=\"panel-title\" data-toggle=\"modal\" data-target=\"#shopModal\" onclick=\"getshopMsg("+d.resultValue[i].shop_id+")\">"+d.resultValue[i].shop_name+""+status+"</h3></div>\n\
                                    <div class=\"panel-body\"><div style=\"float: left;width:100%;\">\n\
                                        <div style=\"float:left;width:20%\"><img src="+d.resultValue[i].litpic+"  width=\"60px;\" height=\"auto\"></div>\n\
                                        <div style=\"float:left;width:78%;\"><p style=\"float:left;width: 90%\">"+d.resultValue[i].good_name+"（"+d.resultValue[i].attr+"）</p><span style=\"float:left;width: 10%;text-align: center\">x1</span></div>\n\
                                        " + price_text + "<span >成交价:￥"+d.resultValue[i].total_fee+".00</span></div>\n\
                                        <div></div></div>\n\
                                    <div class=\"alert alert-default\">\n\
                                        <span style=\"float:left\">日期:"+d.resultValue[i].switchTime+"</span>\n\
                                        <span style=\"float:right\">订单号:"+d.resultValue[i].order_num+"</span></div>\n\
                                    <div class=\"panel-heading\" > "+ mybtn + "\n\
                                    <button  type=\"button\" class=\"btn btn-default\" data-toggle=\"modal\" data-target=\"#remarkModal\" onclick=\"getremarkMsg('"+d.resultValue[i].order_num+"')\">备注信息</button>\n\
                                    <button id=\"delbtn"+i+"\"  type=\"button\" class=\"btn btn-default\" onclick=\"agentdelorder('"+d.resultValue[i].order_num+"',"+All_listCount+")\">删除订单</button>\n\
                                    </div></div>");

         }else{
            if(d.resultValue[i].is_rebate != 1){
                price_text ="<span >进货价:￥"+ (((d.resultValue[i].sell_type==1)||(d.resultValue[i].sell_type==2))?d.resultValue[i].currentWholesale:d.resultValue[i].settle_price)+"</span>"
            }
            orderlistpanel.append("<div class=\"panel panel-default\" >\n\
                                    <div class=\"panel-heading\">\n\
                                        <h3 class=\"panel-title\" data-toggle=\"modal\" data-target=\"#shopModal\" onclick=\"getshopMsg("+d.resultValue[i].shop_id+")\">"+d.resultValue[i].shop_name+""+status+"</h3></div>\n\
                                    <div class=\"panel-body\"><div style=\"float: left;width:100%;\">\n\
                                        <div style=\"float:left;width:20%\"><img src="+d.resultValue[i].litpic+"  width=\"60px;\" height=\"auto\"></div>\n\
                                        <div style=\"float:left;width:78%;\"><p style=\"float:left;width: 90%\">"+d.resultValue[i].good_name+"（"+d.resultValue[i].attr+"）</p><span style=\"float:left;width: 10%;text-align: center\">x1</span></div>\n\
                                         " + price_text + "<span >成交价:￥"+ (((d.resultValue[i].sell_type==1)||(d.resultValue[i].sell_type==2))?d.resultValue[i].settle_price:d.resultValue[i].total_fee)+".00"+(((d.resultValue[i].sell_type==1)||(d.resultValue[i].sell_type==2))?'(批发价)':'')+"</span></div>\n\
                                        <div></div></div>\n\
                                    <div class=\"alert alert-default\">\n\
                                        <span style=\"float:left\">日期:"+d.resultValue[i].switchTime+"</span>\n\
                                        <span style=\"float:right\">订单号:"+d.resultValue[i].order_num+"</span></div>\n\
                                    <div class=\"panel-heading\" > "+ mybtn + "\n\
                                    <button  type=\"button\" class=\"btn btn-default\" data-toggle=\"modal\" data-target=\"#remarkModal\" onclick=\"getremarkMsg('"+d.resultValue[i].order_num+"')\">备注信息</button>\n\
                                    <button  id=\"delbtn"+i+"\"  type=\"button\" class=\"btn btn-default\" onclick=\"agentdelorder('"+d.resultValue[i].order_num+"',"+All_listCount+")\">删除订单</button>\n\
                                    </div></div>");
         }
         if(d.resultValue[i].is_rebate == 1){
            $("#tipsbtn"+i+"").hide();
            $("#delbtn"+i+"").hide();
         }
    }
}


function attrPriceChoice(index,base_id,supplyid,fromurl,good_name,is_show,ordernum)
{

    $.ajax({
             type:"get",
             url: ""+Comm_Config+"wx/checkOrder.do", 
             data: {"baseid":base_id,"is_show":is_show,"alias":GLOB_ALIASID},
             success: function(data){
                 var d = eval(data);
                 hrefdh(ordernum);
                 if(0 == d.resultValue)
                 {
                     //校验成功
                     if(1 == supplyid)
                     {
                         window.location.href="http://wsc.51dh.com.cn/search/index?flag=true&mall_id=0&keywords="+good_name;
                     }
                     else if(4 == supplyid)
                     {
                         alert("店主自营商品，请在店内提货");
                     }
                     else
                     {
                         window.location.href=fromurl;
                     }
                 }
                 else if(1 == d.resultValue)
                 {
                     var tipsbtn = "tipsbtn"+index;
                    document.getElementById(tipsbtn).setAttribute("class", "btn btn-danger");
                     document.getElementById(tipsbtn).innerHTML="该商品订货网已下架";
                 }
                 else if(d.resultValue.length> 0)
                 {
                      window.location.href="http://wsc.51dh.com.cn/search/index?flag=true&mall_id=0&keywords="+good_name+"&source=yd&site=dh"
                 }
            }
         });
}
$(window).scroll(function(){
    var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if(scrollTop + windowHeight == scrollHeight){
            
//            document.getElementById('loadmorediv').style.display="block"; 
            GLOB_CurrentPage++;
             loadOrderList(GLOB_CurrentPage,GLOB_STATUS);
        }
});


/**
 * 
 * @param {type} index
 * @returns {undefined}
 * 类型状态改变
 */
function typechoice(index)
{
    switch(index)
    {
        case 0:
            {
                GLOB_STATUS = 0;
                 document.getElementById('typeallid').setAttribute("class", "typeallactive");
                 document.getElementById('typeundoid').setAttribute("class", "typeundo");
                 document.getElementById('typeredoid').setAttribute("class", "typeredo");
                 document.getElementById('typecancelid').setAttribute("class", "typecancel");
                break;
            }
        case 1:
            {
                GLOB_STATUS = 1;
                 document.getElementById('typeallid').setAttribute("class", "typeall");
                 document.getElementById('typeundoid').setAttribute("class", "typeundoactive");
                 document.getElementById('typeredoid').setAttribute("class", "typeredo");
                 document.getElementById('typecancelid').setAttribute("class", "typecancel");
                break;
            }
        case 5:
            {
                GLOB_STATUS = 5;
                document.getElementById('typeallid').setAttribute("class", "typeall");
                 document.getElementById('typeundoid').setAttribute("class", "typeundo");
                 document.getElementById('typeredoid').setAttribute("class", "typeredoactive");
                 document.getElementById('typecancelid').setAttribute("class", "typecancel");
                break;
            }
        case 10:
            {
                GLOB_STATUS = 10;
                document.getElementById('typeallid').setAttribute("class", "typeall");
                 document.getElementById('typeundoid').setAttribute("class", "typeundo");
                 document.getElementById('typeredoid').setAttribute("class", "typeredo");
                 document.getElementById('typecancelid').setAttribute("class", "typecancelactive");
                break;
            }
        default:break;
    }
     GLOB_CurrentPage  =1;
     All_listCount  =0;
    document.getElementById('orderlistpanelId').innerHTML="";
    loadOrderList(GLOB_CurrentPage,GLOB_STATUS);
}

/**
 * 
 * @param {type} ordernum
 * @returns {undefined}
 * 根据订单号，获取用户备注信息
 */
function getremarkMsg(ordernum)
{
    GLOB_OrderNum  =ordernum;
    document.getElementById('remarkModalordernumberspan').innerHTML="（订单号："+ordernum+"）";
    $.ajax({
         type:"GET",
         url: ""+Comm_Config+"wx/getRemarkByOrderNum.do", 
         data: {"order_num":ordernum},    
         success: function(data){
             var d  =eval(data);
             $("#remarktextarea").val(d.resultValue);
            
        }
     });     
}

/**
 * 
 * @returns {undefined}
 * 静默修改状态
 */
function hrefdh(ordernum)
{
    var success_status  =5;
     $.ajax({
         type:"GET",
         url: ""+Comm_Config+"wx/changeOrderIntentStatus.do", 
         data: {"order_num":ordernum,"status":success_status},    
         success: function(data){
        }
     });
}

/**
 * 
 * @param {type} ordernum
 * @returns {undefined}
 * 代理商删除订单
 */
function agentdelorder(ordernum)
{
    var success_status  =15;
    $.ajax({
         type:"GET",
         url: ""+Comm_Config+"wx/changeOrderIntentStatus.do", 
         data: {"order_num":ordernum,"status":success_status},    
         success: function(data){
             typechoice(GLOB_STATUS);
        }
     });
}
/**
 * 
 * @param {type} ordernum
 * @param {type} index
 * @returns {undefined}
 * 订单取消
 */
function cancelorder(ordernum,index)
{
    var success_status  =10;
     $.ajax({
         type:"GET",
         url: ""+Comm_Config+"wx/changeOrderIntentStatus.do", 
         data: {"order_num":ordernum,"status":success_status},    
         success: function(data){
              document.getElementById('spanstatus'+index).style.color="red";
              document.getElementById('spanstatus'+index).innerHTML="已取消";
        }
     });
}

/**
 * 
 * @returns {undefined}
 * 保存 备注信息
 */
function saveRemark()
{
  
    var remark = $("#remarktextarea").val();
     $.ajax({
         type:"GET",
         url: ""+Comm_Config+"wx/changeOrderIntentRemark.do", 
         data: {"order_num":GLOB_OrderNum,"remark":remark},    
         success: function(data){
          //   loadOrderCount(GLOB_CurrentPage,GLOB_STATUS);
        }
     });
}

function getshopMsg(shopId)
{
     var shopContain = $("#shopContain");
     document.getElementById('shopContain').innerHTML="";
     $.ajax({
         type:"GET",
         url: ""+Comm_Config+"wx/getShopInfoByShopId.do", 
         data: {"shopid":shopId},    
         success: function(data){
             var d = eval(data);
             
             shopContain.append("<h4>"+d.resultValue.shop_name+"</h4><span> 姓名："+d.resultValue.name+"</span><br><span>手机："+d.resultValue.tel+"</span><br><span>QQ："+d.resultValue.qq+"</span><br><span>地址："+d.resultValue.province+d.resultValue.county+d.resultValue.city+d.resultValue.address+"</span>")
              document.getElementById('hreftel').setAttribute("href", "tel:"+d.resultValue.tel+"");
             // 
         }
     });
}
/**
 * 
 * @param {type} nS
 * @returns {String}
 * 时间戳解析
 */
//function getLocalTime(nS) {     
//   //return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
//   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
//} 

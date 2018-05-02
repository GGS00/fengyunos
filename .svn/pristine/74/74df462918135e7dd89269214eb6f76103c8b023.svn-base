/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**********************************************************************************************************************************
 *                                                     BUPLIC JS 
 *********************************************************************************************************************************/
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

var GLOB_AID;

function getshoplist()
{
     //var aid = request.QueryString("aid"); 
     
    GLOB_AID = globSessionStorage ["sessionAid"];
    var isadmin = request.QueryString("isadmin");
     if(GLOB_AID)
     {
         $.ajax({
               type:"GET",
               url: ""+Comm_Config+"wx/getShopInfoByAgentId.do",  
               data: {"agent_id":GLOB_AID},    
               success: function(data){
                 
                  if(0!=data)
                  {
                       var d = eval(data);
                       var shoplistdiv = $("#shoplistdiv");
                       for(i=0;i<d.resultValue.length;i++)
                        {
                            var address = d.resultValue[i].province+d.resultValue[i].city+d.resultValue[i].county+d.resultValue[i].address;
                            var  shopstatus = "正在运营";
                            if(0 == d.resultValue[i].status)
                            {
                                shopstatus = "停止运营";
                            }
                            if(1 ==isadmin ){
                                shoplistdiv.append("<div class=\"panel panel-primary\">\n\
                                <div class=\"panel-heading\"><h3 class=\"panel-title\">"+d.resultValue[i].shop_name+"</h3></div>\n\
                                <div class=\"panel-body\"><div ><span>分店老板："+d.resultValue[i].name+"</span>\n\
                                </div><div ><span href=\"tel:"+d.resultValue[i].tel+"\">联系电话："+d.resultValue[i].tel+"</span></div>\n\
                                <div><span >QQ："+d.resultValue[i].qq+"</span></div><div ><span><span >微信："+d.resultValue[i].wechat+"</span></div><div ><span>创建时间："+getLocalTime(d.resultValue[i].add_time)+"</span></div>\n\
                                <div ><span>店铺地址："+address+"</span></div><div style=\"text-align: center;padding: 3%;\">\n\
                                <button type=\"button\" class=\"btn btn-danger\" onclick=\"shopunbind("+d.resultValue[i].agent_id+","+d.resultValue[i].id+")\">店铺解绑</button>\n\
                               <a type=\"button\" class=\"btn btn-success\" href=\"tel:"+d.resultValue[i].tel+"\">联系分店老板</a>\n\
                                </div></div></div>");
                            }
                            else{
                                shoplistdiv.append("<div class=\"panel panel-primary\">\n\
                                <div class=\"panel-heading\"><h3 class=\"panel-title\">"+d.resultValue[i].shop_name+"</h3></div>\n\
                                <div class=\"panel-body\"><div ><span>分店老板："+d.resultValue[i].name+"</span>\n\
                                </div><div ><span href=\"tel:"+d.resultValue[i].tel+"\">联系电话："+d.resultValue[i].tel+"</span></div>\n\
                                <div><span >QQ："+d.resultValue[i].qq+"</span></div><div ><span><span >微信："+d.resultValue[i].wechat+"</span></div><div ><span>创建时间："+getLocalTime(d.resultValue[i].add_time)+"</span></div>\n\
                                <div ><span>店铺地址："+address+"</span></div><div style=\"text-align: center;padding: 3%;\">\n\
                               <a type=\"button\" class=\"btn btn-success\" href=\"tel:"+d.resultValue[i].tel+"\">联系分店老板</a>\n\
                                </div></div></div>");
                            }
                              

                           
                        }
                  }
                 
                  
           }
           });
     }
     else
     {
         //null
     }
}

function getLocalTime(nS) {     
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
}  

/**
 * 
 * @returns {undefined}
 * 店铺解绑
 */
function shopunbind(aid,shopid)
{ 
    if(confirm("确定解绑本店铺？"))
    {
        $.ajax({
               type:"GET",
               url: ""+Comm_Config+"wx/cancelBindByShopId.do",  
               data: {"shopid":shopid},    
               success: function(data){
                   var d = eval(data);
                   if(0 ==d.resultValue)
                   {
                        //修改成功
                        document.getElementById('alertdiv').setAttribute("class", "alert alert-success");
                        document.getElementById('alertdiv').innerHTML="<strong>恭喜！</strong>"+"店铺解绑成功"; 
                        $("#alertdiv").fadeIn(500); 
                        setTimeout("timeoutfun_unbanding();",1500);
                   }
                   else
                   {
                       document.getElementById('alertdiv').setAttribute("class", "alert alert-danger");
                       document.getElementById('alertdiv').innerHTML="<strong>抱歉！</strong>"+"店铺解绑失败，请重试"; 
                       $("#tipsdiv").fadeIn(500);
                       setTimeout("timeoutfun_goods();",1500);
                   }
                   
                   
           }
           });
        
    }
    
}


function timeoutfun_goods()
{
    $("#alertdiv").fadeOut(800);
    location.reload() ;
}


function timeoutfun_unbanding()
{
    $("#alertdiv").fadeOut(800);
    window.location.href="./home.php?";
}
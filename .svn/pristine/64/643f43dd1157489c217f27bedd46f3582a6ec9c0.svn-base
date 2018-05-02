/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//单全局变量
var MaintainableJS = {};
MaintainableJS.isVailabel =  1;
$(document).ready(function(){

    MaintainableJS.boxid=request.QueryString("boxid");
    MaintainableJS.shopid=request.QueryString("shopid");
    
    MaintainableJS.aid=request.QueryString("aid");
    MaintainableJS.isshare=request.QueryString("isshare");
    MaintainableJS.baseid=request.QueryString("baseid");
    MaintainableJS.selltype=request.QueryString("selltype");
    MaintainableJS.isboss=globSessionStorage["sessionisboss"];
    getGoodsinfo();
   
});



function loadcomply()
{
    if(!MaintainableJS.isVailabel ){
        $("#public_coverid").html("<img class=\"error_img\" src=\"./source/basket_error_256.png\"><span class=\"error_span\">抱歉！您查看的宝贝已经失效，看点别的吧</span>");
        return;
    }
    $("#public_coverid").fadeOut();
    getAgentLog();
    
}
function getGoodsinfo(){

    if((1 == MaintainableJS.isboss) && (1 != MaintainableJS.isshare) && (globSessionStorage["sessionAid"] === MaintainableJS.aid)){
           setIsBossDom();
    }
    if((1 == MaintainableJS.isboss) && (1 != MaintainableJS.isshare) && (MaintainableJS.boxid != null)){
           setIsBossDom();
    }
    if((1 == MaintainableJS.selltype) && (1 == MaintainableJS.isshare)){
           setIsBossDom();
           $("#editpriceBtn").hide();
    }
    if((2 == MaintainableJS.selltype) && (1 == MaintainableJS.isshare)){
           setIsBossDom();
    }

    if((MaintainableJS.aid) && ("null" != MaintainableJS.aid)){
        getAgentByAid(MaintainableJS.aid);
    }
    else if(MaintainableJS.boxid){
        getAidByMac(MaintainableJS.boxid);
    }
    else{
        MaintainableJS.isVailabel=  0;
    }
}

//页面渲染店老板页面
function setIsBossDom(){
    $("#bossdomprice").css("display","inline");
    $("#editpriceBtn").show();
    $("#customerBuyBtnid").hide();
    $("#bossBuyBtnid").show();
}

function setRakeBackDom(){
    $("#bossdomprice").hide();
    $("#editpriceBtn").hide();
    $("#boss_rakeback").css("display","inline");
    $("#customerBuyBtnid").hide();
    $("#bossBuyBtnid").hide();
 }



//根据aid获取代理商/店铺信息
function getAgentByAid(aid){
    
    var ajaxAction;
    var ajaxData;
    var ajaxType;
    //存在店铺信息的话 优先获取店铺信息
    if(MaintainableJS.shopid){
        ajaxAction = Comm_Config+ConfigAjaxVariate. AjaxGetShopInfo;
        ajaxData = {"agentid": aid, "id": MaintainableJS.shopid};
        ajaxType =ConfigAjaxVariate.AjaxPublicTypePost;
    }
    else{
        ajaxAction = Comm_Config+ConfigAjaxVariate.AjaxGetAgentInfo;
        ajaxData = {"agentid": aid};
        ajaxType =ConfigAjaxVariate.AjaxPublicTypeGet;
    }
    $.ajax({
        type:ajaxType,
        url: ajaxAction, 
        data: ajaxData, 
         async:false,
        success: function(data){
            var d = eval(data);
            if(d.shopid){
                MaintainableJS.shopid  =d.shopid;
                if(d.resultValue.icon){
                    MaintainableJS.icon = d.resultValue.icon;
                }
                getAgentByAid(MaintainableJS.aid);
            }
            else{
                setAgentShopDom(data);
            }
        },
            error: function() {
                MaintainableJS.isVailabel = 0;
            }
    });
}

function getAidByMac(mac){
    
    $.ajax({
        type:ConfigAjaxVariate.AjaxPublicTypeGet,
        url: Comm_Config+ConfigAjaxVariate.AjaxGetAidByMac, 
        data: {"mac":mac}, 
        success: function(data){
            var d = eval(data);
            if((0 ==d.resultValue) || (1 ==d.resultValue) || (2==d.resultValue) || (4==d.resultValue) )
            {
                MaintainableJS.isVailabel = 0;
                //异常判断---boxid不存在
            }
            else
            {
                MaintainableJS.aid  =d.resultValue.id;
                getAgentByAid(MaintainableJS.aid);
               return;
            }
        }
    });
}

//渲染店铺页面
function setAgentShopDom(data){
    var d = eval(data);
    
    MaintainableJS.alias = d.alias;
    if(MaintainableJS.icon){
        $("#agentinfo_iconid").attr('src',MaintainableJS.icon); 
    }
    MaintainableJS.shopname = d.resultValue.shop_name;
    MaintainableJS.shop_type = d.resultValue.shop_type
    $("#shopinfo_shopnamepid").html(d.resultValue.shop_name);
    $("#shopinfo_shopnameid").html(d.resultValue.shop_name);
    $("#publictelhiden").attr('href','tel:'+d.resultValue.tel); 
    $("#bossTelspan2").attr('href','tel:'+d.resultValue.tel); 
    $("#bottomcallboss").attr('href','tel:'+d.resultValue.tel); 
    
    $("#shopinfo_nameid").html(""+d.resultValue.name+"&nbsp;"+d.resultValue.tel+"");
    
    //店铺DOM渲染完毕 加载商品信息
     if(MaintainableJS.baseid){
          getGoodsByBaseId();
     }

   
}



function getGoodsByBaseId(){
    if(MaintainableJS.aid && MaintainableJS.alias && MaintainableJS.baseid){  
        $.ajax({
            type:ConfigAjaxVariate.AjaxPublicTypeGet,
            url: ""+Comm_Config+ConfigAjaxVariate.AjaxGetGoodsDetail,  
            data: {"baseid":MaintainableJS.baseid,"agentid":MaintainableJS.aid,"alias":MaintainableJS.alias,"shopid":MaintainableJS.shopid}, 
            async:false,
            success: function(data){
                setGoodsInfoDom(data);
            }
        });
    }
    else{
        MaintainableJS.isVailabel = 0;
        //异常判断---商品生成失败
    }
}

function setInstall(goods_atom_id){
	 $("#choose-baitiao").html("");
	 if(MaintainableJS.shop_type == 1){
    	$.ajax({
            type:"post",
            url: ""+Comm_Config+"pc/getGoodsInstallmentList.do",  
            data: {"agentid":MaintainableJS.aid,"goodsAtomId":goods_atom_id}, 
            success: function(data){
            	for(var i=0;i<data.resultValue.length;i++){
                $("#choose-baitiao").append("<div class=\"baitiao-list J-baitiao-list\">\n\
						<div class=\"item\">\n\
							<b></b>\n\
							<a href=\"#none\">"+ data.resultValue[i].name +"</a>\n\
							<div class=\"baitiao-tips hide\">\n\
								<ul><li>无手续费</li></ul>\n\
							</div>\n\
						</div>\n\
					</div>")
               }
            }
        });
        $.ajax({
            type:"post",
            url: ""+Comm_Config+"pc/getGoodsInsuranceList.do",  
            data: {"agentid":MaintainableJS.aid,"goodsAtomId":goods_atom_id}, 
            success: function(data){
               for(var i=0;i<data.resultValue.length;i++){
                $("#choose-baitiao").append("<div class=\"baitiao-list J-baitiao-list\">\n\
						<div class=\"item\">\n\
							<b></b>\n\
							<a href=\"#none\">"+ data.resultValue[i].name +"</a>\n\
							<div class=\"baitiao-tips hide\">\n\
								<ul><li>无手续费</li></ul>\n\
							</div>\n\
						</div>\n\
					</div>")
               }
            }
        });
    }
    
}

function setGoodsInfoDom(data){
    var d = eval(data);
    if(d.is_rebate == 1){
        if((1 == MaintainableJS.isboss) && (1 != MaintainableJS.isshare)){
            setRakeBackDom();
        }
    }
    
//  setInstall(d.resultValue[0].goods_atom_id)
    
    $("#rakeback_money").html(d.resultValue[0].rebate_money);
    $("#goodsinfo_name").html(d.resultValue[0].goods_name);
    $("#goodsinfo_describe").html(d.resultValue[0].goods_describe);
    $("#goodsinfo_whoprice").html(d.resultValue[0].wholesale_price);
    $("#goodsinfo_price").html(d.resultValue[0].goods_price.toFixed(2));
    
    $("#goodsAttr_contain").html("");
    var source   = $("#goodsattr-template").html();
    var template = Handlebars.compile(source);
    var j = 0;
    for(i=0;i<d.resultValue.length;i++){
        if(d.resultValue[i].is_show ==1){
            d.resultValue[i].sortid = j;
            var html = template(d.resultValue[i]);
            $("#goodsAttr_contain").append(html);
            j++;
        }
        
    }
     MaintainableJS.attrlen  =j;
    MaintainableJS.goodsname = d.resultValue[0].goods_name;
    $(document).attr("title",d.resultValue[0].goods_name);
    
    MaintainableJS.SHARE_CONTENT = d.resultValue[0].goods_name+"，我的店里只卖"+d.resultValue[0].goods_price+"元";
    MaintainableJS.SHARE_TITTLE = d.resultValue[0].goods_name+"，来自"+MaintainableJS.shopname;
    MaintainableJS.SHRE_PIC = d.resultValue[0].litpic;
    
    setPhotoDom(d.resultValue[0].photo,d.resultValue[0].litpic);
    $("#attrblock0").click();
    setGoodsLabel(d.resultValue[0].market_type,d.resultValue[0].goods_price_old);
    MaintainableJS.content = d.resultValue[0].content;
    
}
function setPhotoDom(img, litpic) {
    var swiperdom = $("#swiper-goodsphoto");
    if (null == img) {

        swiperdom.append("<div class=\"swiper-slide\"><img data-src=" + litpic + " class=\"swiper-lazy\"><div class=\"swiper-lazy-preloader\"></div></div>");
    }
    else {
        var imgarry = new Array(); //定义一数组
        imgarry = img.split("@"); //字符分割

        for (i = 0; i < imgarry.length; i++)
        {
            swiperdom.append("<div class=\"swiper-slide\"><img data-src=" + imgarry[i] + " class=\"swiper-lazy\"><div class=\"swiper-lazy-preloader\"></div></div>");
        }
    }

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 10,
        loop: true,
        autoplay: 3000,
        lazyLoading: true,
    });
}

function setChoiceAttr(atom,index,goods_alias_id,attr,wholesale_price,goods_price,from_url){
    
    for(i=0;i<MaintainableJS.attrlen;i++){
        if(index == i){
            if("value-block-achive" == $("#attrblock"+i+"").attr('class')){
                return;
            }
            $("#attrblock"+i+"").attr("class", "value-block-achive");
            $("#attrblock"+i+"").append("<i class=\"fa fa-check\" id=\"fackicon"+i+"\"></i>");
            
            $("#goodsinfo_attrconfirm").html(attr);
            $("#goodsinfo_price").html(goods_price.toFixed(2));
            $("#goodsinfo_whoprice").html(wholesale_price);
            MaintainableJS.attr = attr;
            MaintainableJS.goods_alias_id = goods_alias_id;
            MaintainableJS.wholesale_price = wholesale_price;
            MaintainableJS.good_price = goods_price;
            MaintainableJS.from_url = from_url;
            setInstall(atom);
        }
        else{
            $("#attrblock"+i+"").attr("class", "value-block-normal");
            $("#fackicon"+i+"").remove();
        }
    }
}

/**
 * 店老板修改商品零售价
 */
$("#editpriceBtn").click(function(){
    $("#attrselectid").html("");
    $("#attrwhosaleprice").val("");
    $("#attrprice").val("");
    MaintainableJS.eidtflag = 0;
     $.ajax({
            type:ConfigAjaxVariate.AjaxPublicTypeGet,
            url: ""+Comm_Config+ConfigAjaxVariate.AjaxGetGoodsDetail,  
            data: {"baseid":MaintainableJS.baseid,"agentid":MaintainableJS.aid,"alias":MaintainableJS.alias,"shopid":MaintainableJS.shopid}, 
            success: function(data){
                var d = eval(data);
                MaintainableJS.arrayattr  ={};
                for(i=0;i<d.resultValue.length;i++){
                    MaintainableJS.arrayattr[i] = d.resultValue[i];
                    if(1 == d.resultValue[i].is_show){
                       $("#attrselectid").append("<option value="+i+">"+d.resultValue[i].attr+"</option>"); 
                    }
                    
                }
                getAttrPrice();
            }
        });
})

function getAttrPrice(){
    $("#editalerttext_toast").hide();
    var val = $("#attrselectid option:selected") .val();
    MaintainableJS.editAttrIndex = val;
    $("#attrwhosaleprice").val((MaintainableJS.arrayattr[val].wholesale_price).toFixed(2));
    $("#attrprice").val((MaintainableJS.arrayattr[val].goods_price));
}

function setAttrPriceAction() {
    MaintainableJS.eidtflag = 1;
    var activeprice = $("#attrprice").val();
    if ((!/^[0-9]+(.[0-9]{2})?$/.test(activeprice)) || (0 == activeprice))
    {
        alert("请输入正确的价格");
        $("#attrprice").focus();
        return;
    }
    
    var result = "[";
    var jsonText = {};
    jsonText["atomid"] = MaintainableJS.arrayattr[MaintainableJS.editAttrIndex].goods_atom_id;
    jsonText["price"] = activeprice;
    result+=JSON.stringify(jsonText);
    result += "]";
    var token = sessionStorage ["sessionistoken"];
    if((2 == MaintainableJS.selltype) && (1 == MaintainableJS.isshare)){
     //加盟店(可修改价格的)
       $.ajax({
            type:ConfigAjaxVariate.AjaxPublicTypePost,
            url: ""+Comm_Config+ConfigAjaxVariate.AjaxSetUpdateRetailPrice,  
            data: {"baseid":MaintainableJS.baseid,"shopid":MaintainableJS.shopid,"agentid":MaintainableJS.aid,"alias":MaintainableJS.alias,"atomidprice":result,"token":token}, 
            success: function(data){
                var d =eval(data);
                if(0 == d.resultValue){
                    $("#editalerttext_toast").html("修改成功");
                    $("#editalerttext_toast").show();
                }
            },
            error:function(){
                $("#editalerttext_toast").html("修改失败，请重新登录后再试");
                    $("#editalerttext_toast").show();
            }
        });



    }else{

        $.ajax({
            type:ConfigAjaxVariate.AjaxPublicTypePost,
            url: ""+Comm_Config+ConfigAjaxVariate.AjaxSetUpdateAtomPrice,  
            data: {"baseid":MaintainableJS.baseid,"agentid":MaintainableJS.aid,"alias":MaintainableJS.alias,"atomidprice":result,"token":token}, 
            success: function(data){
                var d =eval(data);
                if(0 == d.resultValue){
                    $("#editalerttext_toast").html("修改成功");
                    $("#editalerttext_toast").show();
                }
            },
            error:function(){
                $("#editalerttext_toast").html("修改失败，请重新登录后再试");
                    $("#editalerttext_toast").show();
            }
        });

    } 
}
$('#editPriceModal').on('hide.bs.modal', function () {
  if(1 == MaintainableJS.eidtflag){
        getNewAttrValue();
    }
})


function getNewAttrValue() {

    $.ajax({
        type: ConfigAjaxVariate.AjaxPublicTypeGet,
        url: "" + Comm_Config + ConfigAjaxVariate.AjaxGetGoodsDetail,
        data: {"baseid": MaintainableJS.baseid, "agentid": MaintainableJS.aid, "alias": MaintainableJS.alias,"shopid":MaintainableJS.shopid},
        success: function(data) {
            var d = eval(data);
            $("#goodsAttr_contain").html("");
            var source = $("#goodsattr-template").html();
            var template = Handlebars.compile(source);
            var j=0;
            for (i = 0; i < d.resultValue.length; i++) {
                if (d.resultValue[i].is_show == 1) {
                    d.resultValue[i].sortid = j;
                    var html = template(d.resultValue[i]);
                    $("#goodsAttr_contain").append(html);
                    j++;
                }

            }
            $("#attrblock0").click();
        }
    });
}
//market_type:0 普通 1：新品  2：正品  3：特价  4：热销
function setGoodsLabel(market_type,goods_price_old){
    if(0 == market_type){
        return;
    }
    $("#goodsinfo_labelcontainid").fadeIn();
    if(1 == market_type){
        $("#goodslabelimgid").attr("src","source/label_xinpin.png");
        $("#goodsinfo_name").append("<span class=\"goods-label\">新品</span>");
    }
    if(2 == market_type){
        $("#goodslabelimgid").attr("src","source/label_zhengpin.png");
        $("#goodsinfo_name").append("<span class=\"goods-label\">正品</span>");
    }
    if(3 == market_type){
        $("#goodslabelimgid").attr("src","source/label_tejia.png");
         $("#goodsinfo_name").append("<span class=\"goods-label\">特价</span>");
        $("#goodslabel_tejia").fadeIn();
        $("#goodsinfo_oldprice").html(goods_price_old);
    }
    if(4 == market_type){
        $("#goodslabelimgid").attr("src","source/type_rexiao.png");
        $("#goodsinfo_name").append("<span class=\"goods-label\">热销</span>");
    }
}

function getAgentLog(){

    $.ajax({
            type:ConfigAjaxVariate.AjaxPublicTypeGet,
            url: ""+Comm_Config+ConfigAjaxVariate.AjaxGetAgentLog,  
            data: {"agent_id":MaintainableJS.aid}, 
            success: function(data){
                var d  =eval(data);
                $("#agentinfo_visitlog").html(d.resultValue.visitShopCount);
                $("#agentinfo_orderlog").html(d.resultValue.orderIntentCount);
                $("#agentinfo_customerlog").html(d.resultValue.agentCustomerCount);
            }
        });
}
//滚动到底部事件
$(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight == scrollHeight) {
            if( ! MaintainableJS.isload){
                $("#goodscontainId").append(MaintainableJS.content);
                 //增加访问浏览记录
                setGoodsVisitorsharelog();
                MaintainableJS.isload = 1;
            }
        }
    });
    
    //   开始下单
    $("#onorderBtn").click(function() {

        $("#alerttext_toast").hide();
        var name = $("#order_name").val();
        var phone = $("#order_phone").val();
        var address = $("#order_address").val();
        if (name === null || name === "") {
            $("#alerttext_toast").show();
            document.getElementById('alerttext_toast').innerHTML = "用户名必须输入";
            return;
        }
        if (!checkPhone(phone)) {
            $("#alerttext_toast").show();
            document.getElementById('alerttext_toast').innerHTML = "手机号码格式有误";
            return;
        }
        setAddToOrder(name,phone,address);
        var intentionGoods = MaintainableJS.goodsname+"("+MaintainableJS.attr+")";
      //addvip(name, phone, address);
     
     getAgentOpenidByAid(name,phone,MaintainableJS.aid,MaintainableJS.good_price,intentionGoods);
    })



/**
 * 
 * @param {type} name
 * @param {type} phone
 * @param {type} address
 * @returns {undefined}
 * 手动添加顾客的信息 已取消，下单时自动添加  
 */
function addvip(name,phone,address){
      $.ajax({
        type: "POST",
        url: "" + Comm_Config + "wx/addAgentCustomer.do",
        data: {"agentid": MaintainableJS.aid, "customer_name": name, "customer_phone": phone, "remark": address},
        success: function(data) {
        },
        error: function() {
        }
    });
}
function checkPhone(str) {
    var result = str.match(/^1[3|4|5|7|8][0-9]\d{8}$/);
    if (result === null)
        return false;
    return true;
}

 function setAddToOrder(name,phone,address) {
    $.ajax({
        type:ConfigAjaxVariate.AjaxPublicTypePost,  
        url: ""+Comm_Config+ConfigAjaxVariate.AjaxSetAddOrder,
        data: {"shopid":MaintainableJS.shopid, 
                    "agentid": MaintainableJS.aid,
                    "alias": MaintainableJS.alias, 
                    "goods_alias_id": MaintainableJS.goods_alias_id,
                    "attr": MaintainableJS.attr, 
                    "base_id": MaintainableJS.baseid, 
                    "goods_count": 1,
                    "wholesale_price": MaintainableJS.wholesale_price ,
                    "good_price": MaintainableJS.good_price,
                    "remark":address,
                    "customer_tel":phone,
                    "customer_name":name},
        success: function(data) {
            var d = eval(data);
            $('#editCutomer').modal('hide');
            if (d.resultValue == 0)
            {
                   alert("亲，下单成功，我们尽快与您联系");
            }
            else
            {
                 alert("哦！订单提交失败");
            }
        },
        error: function() {
            alert("哦！订单提交失败，请检查网络连接");
        }
    });
}

function setGoodsVisitorsharelog(){
    //访问浏览次数
    $.ajax({
            type:ConfigAjaxVariate.AjaxPublicTypeGet,
            url: ""+Comm_Config+ConfigAjaxVariate.AjaxSetVisitGoods,
            data: {"goodsname":MaintainableJS.goodsname,"baseid":MaintainableJS.baseid,"agentid":MaintainableJS.aid,"agentname":MaintainableJS.shopname}, 
            success: function(data){
               //分享日志统计，成功与否，不做反馈
            }
        });
}

function callBossTel() {
    $("#publictelhiden").click();
}

function toBossShop() {
    var randommun = GetRandomNum();

    if (MaintainableJS.shopid) {
        if (MaintainableJS.isboss && (1 != MaintainableJS.isshare)) {
            window.location.href = "wshop.php?aid=" + MaintainableJS.aid + "&alias=" + MaintainableJS.alias + "&shopid=" + MaintainableJS.shopid + "?" + randommun + "";
        }
        else {
            window.location.href = "wshop.php?aid=" + MaintainableJS.aid + "&alias=" + MaintainableJS.alias + "&selltype=" + MaintainableJS.selltype + "&isshare=1&shopid=" + MaintainableJS.shopid + "?" + randommun + "";
        }

    } else {
        window.location.href = "wshop.php?aid=" + MaintainableJS.aid + "&alias=" + MaintainableJS.alias + "&selltype=" + MaintainableJS.selltype + "?isshare=1?" + randommun + "";
    }
}

function GetRandomNum()
{
    var Min = 0;
    var Max = 10000;
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}  


$("#bossBuyBtnid").click(function(){
    if(MaintainableJS.from_url.length>10){
        window.location.href=MaintainableJS.from_url;
    }
    else{
         window.location.href = "http://wsc.51dh.com.cn/search/index?flag=true&mall_id=0&keywords="+MaintainableJS.goodsname+"&source=yd&site=dh";
    }
   
})

function goodssharemark()
{
    $.ajax({
        type: ConfigAjaxVariate.AjaxPublicTypeGet,
        url: "" + Comm_Config + "wx/addShareGoods.do",
        data: {"agentid": MaintainableJS.aid, "baseid": MaintainableJS.baseid, "alias": MaintainableJS.alias},
        success: function(data) {
            //分享日志统计，成功与否，不做反馈
        }
    });
}

function missStoreBanner()
{
//    document.getElementById('bosshotId').style.display = "";
    document.getElementById('storesectionid').style.display = "none";
}
function showStoreBanner()
{
    if (!isWeiXin())
    {
        alert("此功能在微信浏览器中才有效哦")
        return;
    }
    document.getElementById('storesectionid').style.display = "block";
}

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

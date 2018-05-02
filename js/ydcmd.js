/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//获得商品列表需要传的参数
var GLOB_SEQ = 2;
var GLOB_ALIASID;
var GLOB_AID;//agentId
var GLOB_PAGE = 1;
var token;

var classGoods = new Array();//商品分类数组
var claSeg;//分类编号
var name;//分类名称
var goodsList = new Array();//商品列表数组
var goods_atom_id;
var base_id;
var goods_alias_id;
var agent_id;
var goods_price;
var goods_name;
var litpic;
//var GLOB_GoodsNum = 0;//商品数目

var GLOB_SEQ = 0;//每个条目的SEQ

var GLOB_PAGE = 1;//当前页面——默认为第一页

var issuccess = false;

var GlOB_COUNT;//总页数

var iscommand = 0;// 0表示批量管理  1 表示返回

var delList = "";//删除字符串

var GLOB_SHOPID;

function objClass(name, claSeg) {
    this.name = name;
    this.claSeg = claSeg;
}
function objGoods(goods_atom_id, base_id, goods_alias_id, agent_id, goods_price, goods_name, litpic) {
    this.goods_atom_id = goods_atom_id;
    this.base_id = base_id;
    this.goods_alias_id = goods_alias_id;
    this.agent_id = agent_id;
    this.goods_price = goods_price;
    this.goods_name = goods_name;
    this.litpic = litpic;
}


function ydCmdInit() {
    GLOB_AID = globSessionStorage ["sessionAid"];
    GLOB_ALIASID = globSessionStorage ["sessionAlias"];
    token = globSessionStorage ["sessionistoken"];
    GLOB_SHOPID = globSessionStorage["sessionshopid"];
    loadgoodsclassification();
}
function loadgoodsclassification() {
    var classlist = $("#newclassify");
    document.getElementById('newclassify').innerHTML = "";
    $("#extraitem").html("");

    $.ajax({
        type: "GET",
        url: "" + Comm_Config + "wx/getAreaListByAgentNoPage.do",
        data: {"agentid": GLOB_AID, "alias": GLOB_ALIASID, "token": token,"shopid":GLOB_SHOPID},
        success: function(data) {
            var d = eval(data);
            var titlelist = d.resultValue;
            for (i = 0; i < titlelist.length; i++) {
                var clsg = new objClass(d.resultValue[i].name, d.resultValue[i].seq);
                classGoods[i] = clsg;
            }
            if (titlelist.length <= 4) {
                for (i = 0; i < titlelist.length; i++) {
                    //var clsg = new objClass(d.resultValue[i].name, d.resultValue[i].seq);
                    //  classGoods[i] = clsg;
                    classlist.append("<span  class=\"every_item_full paritem\" onclick=\"loadareagoodspage(1,classGoods[" + i + "].claSeg," + i + ",true" + ")\">" + d.resultValue[i].name + "</span> ");
                }
            } else {
                for (i = 0; i < 4; i++) {
                    // var clsg = new objClass(d.resultValue[i].name, d.resultValue[i].seq);
                    // classGoods[i] = clsg;
                    classlist.append("<span  class=\"every_item paritem\" onclick=\"loadareagoodspage(1,classGoods[" + i + "].claSeg," + i + ",true" + ")\">" + d.resultValue[i].name + "</span> ");
                }
                classlist.append("<span class=\"plusatt\" onclick=\"showextraitem()\"><i id=\"smallic\" class=\"icon-angle-down\"></i></span>");
                for (i = 4; i < titlelist.length; i++) {
                    $("#extraitem").append("<span class=\"every_item_bottom paritem\"  onclick=\"loadareagoodspage(1,classGoods[" + i + "].claSeg," + i + ",true" + ")\">" + d.resultValue[i].name + "</span> ");
                }
            }
            var tag = getCookie("tag");//取第几个标签的值
            GLOB_SEQ = classGoods[tag].claSeg;
            GLOB_PAGE = 1;
            loadareagoodspage(GLOB_PAGE, GLOB_SEQ, tag, true);
        }
    });
}
/**
 * 根据商品分类加载商品
 * @param {type} pageindex
 * @param {type} seq
 * @returns {undefined}
 * isclick 是否是点击条目
 */
function loadareagoodspage(pageindex, seq, item, isclick)
{
    $("#extraitem").hide();
    defaultclass();
    setCookie("tag", item, 10);
    GLOB_SEQ = seq;
    var divlist = $("#goods_list_late");
    if (isclick) {//是点击
        document.getElementById('goods_list_late').innerHTML = "";//则清空
        goodsList.length = 0;
        GLOB_PAGE = 1;
    }
    //getGoodsList
    $.ajax({
        type: "GET",
        url: "" + Comm_Config + "wx/getGoodsListBySetting.do",
        data: {"areaseq": seq, "agentid": GLOB_AID, "page": GLOB_PAGE, "alias": GLOB_ALIASID,"shopid":GLOB_SHOPID},
        success: function(data) {
            issuccess = true;
            changeColor(item);
            var d = eval(data);
            var GC = d.goodsCount;
            GlOB_COUNT = Math.ceil(GC / 9);
            
            if(d.is_rebate == 1){
                     $("#command_bottom").hide();
            }else{
                if (iscommand === 0) {//如果当前是管理页面
                    layback();
                } else {
                    changelayout();
                }
            }
            //alert("总页数"+GlOB_COUNT);
            if (d.resultValue !== null && d.resultValue !== '') {
                // alert( d.resultValue.length);
                for (i = 0; i < d.resultValue.length; i++)
                {
//                    var clsg = new objGoods(d.resultValue[i].goods_atom_id, d.resultValue[i].base_id, d.resultValue[i].goods_alias_id, d.resultValue[i].agent_id, d.resultValue[i].goods_price, d.resultValue[i].goods_name, d.resultValue[i].litpic);
                    var clsg = {
                        goods_atom_id: d.resultValue[i].goods_atom_id,
                        base_id: d.resultValue[i].base_id,
                        goods_alias_id: d.resultValue[i].goods_alias_id,
                        agent_id: d.resultValue[i].agent_id,
                        goods_price: d.resultValue[i].goods_price,
                        goods_name: d.resultValue[i].goods_name,
                        litpic: d.resultValue[i].litpic
                    };
                    if (d.is_rebate == 1) {
                        divlist.append("<div class=\"mei_item\" id=\"item" + goodsList.length + "\" >" +
                                "<div class=\"image_div\">" +
                                "<img src=\"" + d.resultValue[i].litpic + "\" class=\"image_att\"/>" +
                                showimagemark(d.resultValue[i].market_type) +
                                "</div><div class=\"content_div\">" +
                                "<div class=\"content_des\">" + d.resultValue[i].goods_name + "</div>" +
                                "<session><span class=\"text_att\" style=\"float:left;\" >返利:</span>" +
                                "<span class=\"text_att\" id=\"goods_interest\">￥" + d.resultValue[i].rebate_money + "</span>" +
                                "<span class=\"text_att\" style=\"float:left\">零售价:</span>" +
                                "<span class=\"text_att_price\"  id=\"goods_price\">￥" + d.resultValue[i].goods_price.toFixed(2) + "</span>" +
                                "</session>" +
                                "</div></div>");
                    }else{
                        divlist.append("<div class=\"mei_item\" id=\"item" + goodsList.length + "\" >" +
                                "<div class=\"image_div\">" +
                                "<img src=\"" + d.resultValue[i].litpic + "\" class=\"image_att\"/>" +
                                showimagemark(d.resultValue[i].market_type) +
                                "</div><div class=\"content_div\">" +
                                "<div class=\"content_des\">" + d.resultValue[i].goods_name + "</div>" +
                                "<session onclick=\"editGoods('" + d.resultValue[i].base_id + "','" + d.resultValue[i].litpic + "','" + d.resultValue[i].goods_name + "')\"><span class=\"text_att\" style=\"float:left;\" >进货价:</span>" +
                                "<span class=\"text_att\" id=\"goods_interest\">￥" + d.resultValue[i].wholesale_price.toFixed(2) + "</span>" +
                                "<span class=\"text_att\" style=\"float:left\">零售价:</span>" +
                                "<span class=\"text_att_price\"  id=\"goods_price\">￥" + d.resultValue[i].goods_price.toFixed(2) + "</span>" +
                                "</session><div style=\"position: relative\">" +
                                "<img src=\"image/more_select.png\" class=\"image_select\" onclick=\"show_select(" + goodsList.length + ")\" id=\"more" + goodsList.length + "\"/>" +
                                "<input style=\"margin-right:5px\" type=\"checkbox\" class=\"check_select\"  onclick=\"checkItem(" + d.resultValue[i].seq + ",'" + d.resultValue[i].base_id + "'," + d.resultValue[i].agent_id + ")\"/>" +
                                "<div class=\"show_item_dialog\" id=\"select" + goodsList.length + "\">" +
                                "<div class=\"first_item_choice\" onclick=\"editGoods('" + d.resultValue[i].base_id + "','" + d.resultValue[i].litpic + "','" + d.resultValue[i].goods_name + "')\">" +
                                "<div  class=\"icon-edit image_item_select\"/>" +
                                "<span class=\"text_item_attr\">编辑</span>" +
                                "</div>" +
                                "<div  class=\"first_item_choice\" onclick=\"deleteGoods(" + GLOB_SEQ + ",'" + d.resultValue[i].base_id + "'," + GLOB_AID + "," + d.resultValue[i].goods_alias_id + ")\">" +
                                "<div  class=\"icon-trash image_item_select\"/>" +
                                "<span class=\"text_item_attr\">移出云店</span>" +
                                "</div>" +
                                "<div class=\"first_item_choice\" onclick=\"setBaseId(" + d.resultValue[i].base_id + ")\" data-toggle=\"modal\" data-target=\"#marketType\">" +
                                "<div  class=\"icon-tag  image_item_select\"/>" +
                                " <span class=\"text_item_attr\">标记</span>" +
                                "</div>" +
                                " </div>" +
                                " </div>" +
                                "</div></div>");
                    }
                    goodsList[goodsList.length] = clsg;
                }

                
            }
        }
    });
}

/**
 * 显示新品，特价，热销等
 * @param {type} item
 * @returns {String}
 */
function showimagemark(item) {
    var imgmark = "";
    switch (item) {
        case 0:   //普通
            imgmark = "";
            break;
        case 1:   //新品
            imgmark = "<img src=\"source/label_xinpin.png\" class=\"showstatus\" style=\"width:25px;margin-right:5px\">";
            break;
        case 2:   //品牌
            imgmark = "<img src=\"source/label_zhengpin.png\" class=\"showstatus\" style=\"width:25px;margin-right:5px\">";
            break;
        case 3:   //特价
            imgmark = "<img src=\"source/label_tejia.png\" class=\"showstatus\" style=\"width:25px;margin-right:5px\">";
            break;
        case 4:   //热销
            imgmark = "<img src=\"source/type_rexiao.png\" class=\"showstatus\" style=\"width:25px;margin-right:5px\">";
            break;
    }
    return imgmark;
}


function changeColor(item) {
    var d = document.getElementsByClassName("paritem");
    for (i = 0; i < d.length; i++) {
        if (i.toString() === item.toString()) {
            d[i].style.color = "#f00";
        } else {
            if (i < 4) {
                d[i].style.color = "#000";
            } else {
                d[i].style.color = "#fff";
            }
        }
    }
}


/**
 * 显示更多选择
 * @returns {undefined}
 */
function show_select(select_item) {
    // alert("点击了更很多按钮"+select_item);
    show(select_item);
    $("#extraitem").hide();
    defaultclass();
}
function show(item)
{
    hideAllDialog(item);
    var odiv = document.getElementById("select" + item);
    // alert(odiv.style.display);
    if (odiv.style.display === "block")
    {
        // alert("11111111");
        odiv.style.display = "none";
        document.getElementById("more" + item).src = "source/more_select.png";

    }
    else if (odiv.style.display === "none" || odiv.style.display === "")
    {
        //  alert("2222222");
        odiv.style.display = "block";
        document.getElementById("more" + item).src = "source/close_icon.png";
    }
}

/**
 * 隐藏所有
 * @returns {undefined}
 */
function hideAllDialog(item) {
    var dialogList = document.getElementsByClassName("show_item_dialog");
    var imageList = document.getElementsByClassName("image_select");
    for (i = 0; i < imageList.length; i++) {
        if (i !== item) {
            imageList[i].src = "source/more_select.png";
        }

    }
    for (i = 0; i < dialogList.length; i++) {
        if (i !== item) {
            dialogList[i].style.display = "none";
        }

    }
}

/**
 * 编辑
 */
function editGoods(base_id, litpic, goods_name) {
    $("#extraitem").hide();
    hideAllDialog(-1);
    window.location.href = "ydprice.html?baseid=" + base_id + "&litpic=" + litpic + "&goods_name=" + goods_name;
}
/**
 * 下架
 */
function downGoods(choose_item) {
    hideAllDialog(-1);
    alert("点击了" + choose_item + "的条目中的下架功能");
}
/**
 * 删除
 */
function deleteGoods(seq, base_id, agent_id, alias_id) {
    //alert(GLOB_SEQ + "," + base_id + "," + GLOB_AID + "," + GLOB_ALIASID);
    $("#extraitem").hide();
    hideAllDialog(-1);
    defaultclass();
    $.ajax({
        type: "POST",
        url: "" + Comm_Config + "wx/removeGoodsInArea.do",
        data: {"areaseq": GLOB_SEQ, "baseid": base_id, "agentid": GLOB_AID, "alias": GLOB_ALIASID,"shopid":GLOB_SHOPID},
        success: function(data) {
            var d = eval(data);
            var returnValue = d.resultValue;
            if (returnValue === 0) {
                alert("移除成功");
                var tag = getCookie("tag");//取第几个标签的值
                GLOB_SEQ = classGoods[tag].claSeg;
                GLOB_PAGE = 1;
                loadareagoodspage(GLOB_PAGE, GLOB_SEQ, tag, true);
            } else {
                alert("移除失败");
            }
        },
        fail: function(data) {
            alert("移除失败");
        }
    });
}
/**
 * 分享
 */
function shareGoods(choose_item) {
    alert("点击了" + choose_item + "的条目中的分享功能");
    hideAllDialog(-1);
}

/**
 * 
 * @returns {undefined}未加入云店的商品
 */
function tounaddgoodslist()
{
    var randomstr = GetRandomNum();
    window.location.href = "./../App/Modules/weixin/weixinportal/areacommand/wx_platformGoods.html?seq="+GLOB_SEQ+"?" + randomstr;


}
function GetRandomNum()
{
    var Min = 0;
    var Max = 10000;
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0)
            return c.substring(name.length, c.length);
    }
    return 0;
}

function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function scrollload() {
    hideAllDialog(-1);
    defaultclass();
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight === scrollHeight) {//滚动到底部
            if (GLOB_PAGE < GlOB_COUNT) {
                if (issuccess) {
                    // alert("当前页数"+GLOB_PAGE);
                    issuccess = false;//设置成未加载完成
                    GLOB_PAGE++;//页数++
                    var tag = getCookie("tag");//取第几个标签的值
                    GLOB_SEQ = classGoods[tag].claSeg;//获取对应的SEQ
                    loadareagoodspage(GLOB_PAGE, GLOB_SEQ, tag, false);
                }
            } else {
                var divcss = $(".nocontent");
                if (divcss.length === 0) {
                    $("#goods_list_late").append("<div class=\"nocontent\">商品加载完毕</div>");
                }
            }
        }
    });
}

function checkItem(seq, base, agent) {
    // alert(seq + "," + base + "," + agent);

}
/**
 * 批量管理
 * 0表示批量管理  1 表示返回
 * @returns {undefined}
 */
function changelayout() {
    $("#extraitem").hide();
    hideAllDialog(-1);
    defaultclass();
    iscommand = 1;
    var moreList = document.getElementsByClassName("image_select");
    var checkList = document.getElementsByClassName("check_select");
    document.getElementById("command_bottom").style.display = "none";
    document.getElementById("delete_bottom").style.display = "block";
    for (i = 0; i < checkList.length; i++) {
        checkList[i].style.display = "block";
        moreList[i].style.display = "none";
    }
}
/**
 * 返回
 */
function layback() {
    $("#extraitem").hide();
    defaultclass();
    hideAllDialog(-1);
    iscommand = 0;
    var moreList = document.getElementsByClassName("image_select");
    var checkList = document.getElementsByClassName("check_select");
    document.getElementById("command_bottom").style.display = "block";
    document.getElementById("delete_bottom").style.display = "none";
    for (i = 0; i < checkList.length; i++) {
        checkList[i].style.display = "none";
        moreList[i].style.display = "block";
    }
}

/**
 * 批量删除
 */
function deletelist() {
    $("#extraitem").hide();
    defaultclass();
    hideAllDialog(-1);
    var inputs = document.getElementsByTagName('input'); //获取所有的input标签对象。
    delList = "";
    for (var i = 0; i < inputs.length; i++) {
        var obj = inputs[i];
        if (obj.type == 'checkbox') {
            if (obj.checked == true) {
                delList[i] = goodsList[i].base_id;
                delList = goodsList[i].base_id + "," + delList;
            }
        }
    }
    if (delList === "") {
        alert("尚未选择需要移除的条目");
    } else {
        var tag = getCookie("tag");//取第几个标签的值
        GLOB_SEQ = classGoods[tag].claSeg;
        $.ajax({
            type: "POST",
            url: "" + Comm_Config + "wx/batchRemoveGoodsInArea.do",
            data: {"areaseq": GLOB_SEQ, "agentid": GLOB_AID, "baseids": delList, "alias": GLOB_ALIASID, "token": token,"shopid":GLOB_SHOPID},
            success: function(data) {
                var d = eval(data);
                var rev = d.resultValue;
                if (rev === 0) {//表示移除成功
                    GLOB_PAGE = 1;
                    loadareagoodspage(GLOB_PAGE, GLOB_SEQ, tag, true);
                    alert("移除成功");
                } else {
                    alert("移除失败");
                }
            }
        });
    }
}

function showextraitem() {
    hideAllDialog(-1);
    changeclass();
    var dis = document.getElementById("extraitem").style.display;
    if (dis === "none") {
        $("#extraitem").fadeIn();
    } else {
        $("#extraitem").hide();
    }
}

function changeclass() {
    var tid = $(".icon-angle-down");
    if (tid.length === 0) {
        $("#smallic").removeClass("icon-angle-up");
        $("#smallic").addClass("icon-angle-down");
    } else {
        $("#smallic").removeClass("icon-angle-down");
        $("#smallic").addClass("icon-angle-up");
    }
}

function defaultclass() {
    $("#smallic").removeClass("icon-angle-up");
    $("#smallic").addClass("icon-angle-down");
}
/**
 * 获得baseID
 * @returns {undefined}
 */
var goodsBaseID;
var market_Type;
function setBaseId(item) {
    goodsBaseID = item;
}
/**
 * 选择属性
 * @param {type} index
 * @returns {undefined}
 */
function chooseType(index) {
    if (index == 3) {
        $('#OnSale').removeAttr("readonly");
    } else {
        $('#OnSale').attr("readonly", "readonly");
    }
    market_Type = index;
}

function updateMark() {
    var reg = /^[1-9]\d*$/;
    if (market_Type == 3) {
        if (!reg.test($("#OnSale").val())) {
            alert("降价必须是大于0的整数");
        } else {
            $.ajax({
                type: "POST",
                url: "" + Comm_Config + "/wx/updateMarketType.do",
                data: {"base_id": goodsBaseID, "market_type": market_Type, discount: $("#OnSale").val(),"agent_id":GLOB_AID,"shopid":GLOB_SHOPID},
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function(data) {
                    var d = eval(data);
                    var rev = d.resultValue;
                    var msg = d.msg;
                    $('#marketType').modal('hide');
                    var tag = getCookie("tag");//取第几个标签的值
                    GLOB_SEQ = classGoods[tag].claSeg;
                    if (rev === "0") {//表示移除成功
                        GLOB_PAGE = 1;
                        loadareagoodspage(GLOB_PAGE, GLOB_SEQ, tag, true);
                    }     
                },
                error:function(data){
                    alert("修改失败，请检查网络");
                }
            });
        }
    } else {
        $.ajax({
            type: "POST",
            url: "" + Comm_Config + "/wx/updateMarketType.do",
            data: {"base_id": goodsBaseID, "market_type": market_Type, discount: "","agent_id":GLOB_AID,"shopid":GLOB_SHOPID},
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function(data) {
                var d = eval(data);
                var rev = d.resultValue;
                var msg = d.msg;
                $('#marketType').modal('hide');
                var tag = getCookie("tag");//取第几个标签的值
                GLOB_SEQ = classGoods[tag].claSeg;
                if (rev === "0") {//表示移除成功
                    GLOB_PAGE = 1;
                    loadareagoodspage(GLOB_PAGE, GLOB_SEQ, tag, true);
                }
               
            },
               error:function(data){
                    alert("修改失败，请检查网络");
                }
        });
    }
}

/**
 * Created by user on 2016/6/20.
 */
var sessionStorage = window.sessionStorage;
var mobileFilrate, operator, price, mold, agentId, page = 1, pageSize = 16, sortType, sort, datas,shopId,isContinu=true;
var Home_host = window.location.host;
var baseUrl =  "http://"+Home_host+"/ydserver/pc/";

var mobileList = baseUrl + "getPrettyPhoneNumberList.do";
var series = baseUrl + "choicePrettyPackage.do";
var addOrderUrl = baseUrl + "addPrettyOrder.do";

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
 * 价格排序
 */
function priceSort() {
    page = 1;
    var value = changeIcon("#price-div");
    $("#mobilesort").children(".fa").css("color", "#c8c4c1");
    $("#mobilesort").removeAttr("value");
    sortType = "price";
    if (undefined == value) {
        sort = "asc";
    } else if ("up" == value) {
        sort = "asc";
    } else if ("down" == value) {
        sort = "desc";
    }
    requestMobileList();
}
/**
 * 号码排序
 */
function mobileSort() {
    page = 1;
    var value = changeIcon("#mobilesort");
    $("#price-div").children(".fa").css("color", "#c8c4c1");
    $("#price-div").removeAttr("value");
    sortType = "phone";
    if (undefined == value) {
        sort = "asc";
    } else if ("up" == value) {
        sort = "asc";
    } else if ("down" == value) {
        sort = "desc";
    }
    requestMobileList();
}
/**
 * 设置箭头
 * @param id
 * @returns {*|jQuery}
 */
function changeIcon(id) {
    var value = $(id).attr("value");
    if (undefined == value) {
        $(id).attr("value", "down");
        $(id).children(".fa-angle-down").css("color", "#ec6e18");
        $(id).children(".fa-angle-up").css("color", "#c8c4c1");
    } else if ("up" == value) {
        $(id).attr("value", "down");
        $(id).children(".fa-angle-down").css("color", "#ec6e18");
        $(id).children(".fa-angle-up").css("color", "#c8c4c1");
    } else if ("down" == value) {
        $(id).attr("value", "up");
        $(id).children(".fa-angle-down").css("color", "#c8c4c1");
        $(id).children(".fa-angle-up").css("color", "#ec6e18");
    }
    return value;
}
/**
 * 选择运营商
 * @param id
 */
function chooseOperator(id) {
    radioClick(id);
    var va = $(id).attr("value");
    sessionStorage["Operator"] = va;
}
/**
 * 选中价格
 * @param id
 */
function choosePrice(id) {
    radioClick(id);
    var va = $(id).attr("value");
    sessionStorage["Price"] = va;
}
/**
 * 选择尾号规律
 * @param id
 */
function chooseMold(id) {
    radioClick(id);
    var va = $(id).attr("value");
    sessionStorage["mold"] = va;
}
function radioClick(id) {
    $(id).parent().children().removeClass("checked");
    $(id).addClass("checked");

}

function checkClick(id) {
    if ($(id).is(".checked")) {
        $(id).removeClass("checked");
    } else {
        $(id).addClass("checked");
    }
}
var mobile = "1__________";
function inputListener(id) {
    var val = $("#input" + id).val();
    if (!/^\d+$/.test(val)) {
        $("#input" + id).val("");
        val = undefined;
    }
    if (val) {
        if (id < 10) {
            mobile = mobile.substring(0, id) + val + mobile.substring(id + 1, mobile.length);
            var newId = id + 1;
            $("#input" + newId).focus();
        }
    } else {
        mobile = mobile.substring(0, id) + "_" + mobile.substring(id + 1, mobile.length);
    }
    sessionStorage["mobile"] = mobile;
}

function inputDelete(id, e) {
    alert(id);
    alert(e.keyCode);
}

function ok() {
    history.go(-1);
}
function initData() {
    agentId = request.QueryString("agentid");
    sessionStorage["agentId"] = agentId;
    sessionStorage["shopId"]=request.QueryString("shopid");
    $("#mobilesort").removeAttr("value");
    $("#price-div").removeAttr("value");
    page = 1;
    sortType = "";
    sort = "";
    operator = sessionStorage["Operator"];
    price = sessionStorage["Price"];
    mobileFilrate = sessionStorage["mobile"];
    mold = sessionStorage["mold"];
    sessionStorage["Operator"] = undefined;
    sessionStorage["Price"] = undefined;
    sessionStorage["mobile"] = undefined;
    sessionStorage["mold"] = undefined;
    if ("undefined" == operator || undefined == operator) {
        operator = "";
    }
    if ("undefined" == price  || undefined == price) {
        price = "";
    }
    if ("undefined" == mobileFilrate  || undefined == mobileFilrate) {
        mobileFilrate = "";
    }
    if ("undefined" == mold  || undefined == mold) {
        mold = "";
    }
    requestMobileList();
}
function requestMobileList() {
    $("#noData").css("display", "none");
    $("#fail").css("display", "none");
    $("#addMore").css("display", "block");
    $.ajax({
        url: mobileList,
        type: "GET",
        data: {
            "agentId": agentId,
            "currentPage": page,
            "pageCount": pageSize,
            "columnName": sortType,
            "sort": sort,
            "operator": operator,
            "sellingPrice": price,
            "phoneNumber": mobileFilrate,
            "phoneNumberRule": mold,
            "status":1,
        },
        //调小超时时间会引起异常
        timeout: 10000,
        //请求成功后触发
        success: function (data) {
            if (0 == data.resultCode) {
                if (page == 1) {
                    $("#content-div").html('');
                }
                datas = data.resultValue;
                for (var i = 0; i < data.resultValue.length; i++) {
                    var oper, color, cla;
                    if (data.resultValue[i].operator == "中国联通") {
                        oper = "联通";
                        color = "#276af2";
                    } else if (data.resultValue[i].operator == "中国移动") {
                        oper = "移动";
                        color = "#86b328";
                    } else if (data.resultValue[i].operator == "中国电信") {
                        oper = "电信";
                        color = "#fea275";
                    }
                    if (i % 2 == 0) {
                        cla = "price-left";
                    } else {
                        cla = "price-right";
                    }
                    if (i == data.resultValue.length - 1 && data.resultValue.length % 2 != 0) {
                        $("#content-div").append("<div onclick='gotoCombo(" + i + ")' class=\"mobile-item right-border\">\<div class=\"operator\" style='background-color:" + color + "'>\<p >" + oper + "</p></div>" +
                            "<div class=\"mobile-content\"><div class=\"mobile\">" + data.resultValue[i].phoneNumber + "</div><div class=\"price-div\"> " +
                            "<span class=\"worth\">含话费：" + data.resultValue[i].balance + "元</span><span class=\"" + cla + "\">价格：" + data.resultValue[i].price + "元</span></div></div></div>");
                    } else {
                        $("#content-div").append("<div onclick='gotoCombo(" + i + ")' class=\"mobile-item\">\<div class=\"operator\" style='background-color:" + color + "'>\<p >" + oper + "</p></div>" +
                            "<div class=\"mobile-content\"><div class=\"mobile\">" + data.resultValue[i].phoneNumber + "</div><div class=\"price-div\"> " +
                            "<span class=\"worth\">含话费：" + data.resultValue[i].balance + "元</span><span class=\"" + cla + "\">价格：" + data.resultValue[i].price + "元</span></div></div></div>");
                    }
                }
                if(page==1 && data.resultValue.length == 0){
                    $("#noData").css("display", "block");
                }else {
                    page++;
                }
                if (data.resultValue.length < pageSize) {
                    $("#addMore").css("display", "none");
                    isContinu = false;
                } else {
                    $("#addMore").css("display", "block");
                }

            } else {
                $("#addMore").css("display", "none");
                $("#fail").css("display", "block");
            }


        },
        //请求失败遇到异常触发
        error: function (xhr, errorInfo, ex) {
            $("#addMore").css("display", "none");
            $("#fail").css("display", "block");
        },
        //是否使用异步发送
        async: true
    })
}
function gotoCombo(index) {
    sessionStorage["mobileInfo"] = JSON.stringify(datas[index]);
    window.location.href = "combo.html";

}
var parsedJson;
function comboInit() {
    agentId =  sessionStorage["agentId"];
    shopId = sessionStorage["shopId"];
    var result = sessionStorage["mobileInfo"];
    parsedJson = jQuery.parseJSON(result);
    $("#combo-charge").text("￥" + parsedJson.balance);
    $("#combo-price").text("￥" + parsedJson.price);
    $("#combo-mobile").text(parsedJson.phoneNumber + "(" + parsedJson.operator.substring(2, 4) + ")");
    requestSeries(parsedJson.id);
}
var serieData;
function chooseSeries(id, index) {
    radioClick(id);
    $("#combo-detail-content").text(serieData[index].content);
}

function requestSeries(id) {
    $.ajax({
        url: series,
        type: "GET",
        data: {"phoneId": id},
        //调小超时时间会引起异常
        timeout: 10000,
        //请求成功后触发
        success: function (data) {
            if (0 == data.resultCode) {
                serieData = data.prettypackages;
                for (var i = 1; i <= serieData.length; i++) {
                    if (serieData.length == 1) {
                        $("#combo-content").append("<div id=\"series1\" class=\"radio_sm checked\"  onclick=\"chooseSeries('#series1',0)\" value=\"" + serieData[0].code + "\">" + serieData[0].name + "</div>");
                        $("#combo-detail-content").text(serieData[0].content);
                    } else {
                        $("#combo-content").append("<div id=\"series" + i + "\" class=\"radio_sm\"  onclick=\"chooseSeries('#series" + i + "'," + (i - 1) + ")\" value=\""+serieData[i-1].code+"\">" + serieData[i - 1].name + "</div>");
                    }
                }

            }
        },
        //请求失败遇到异常触发
        error: function (xhr, errorInfo, ex) {
            alert("加载失败");
        },
        //是否使用异步发送
        async: true
    })
}
var serieCode;
 function sendOrder(){
   var checked =  $("#combo-content").children(".checked");
     if(checked.length>0){
         $('#myModal').modal('show');
         serieCode = checked[0].getAttribute("value");
     }else {
         alert("请选择套餐");
     }
}
function addOrder() {


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
    $.ajax({
        url: addOrderUrl,
        type: "GET",
        data: {"phoneNumberId": parsedJson.id,
            "prettyPackageCode": serieCode,
            "agentId": agentId,
            "shopId": shopId,
            "remark": address,
            "receiverName": name,
            "receiverTel": phone,
            "status":2,
        },
        //调小超时时间会引起异常
        timeout: 10000,
        //请求成功后触发
        success: function (data) {
            if (0 == data.resultCode) {
                $('#myModal').modal('hide');
                $("#combo-addBtn").attr("disabled","disabled");
                alert("亲，下单成功，我们尽快与您联系");
                window.history.back();
            }else{
                alert("系统错误");
            }
        },
        //请求失败遇到异常触发
        error: function (xhr, errorInfo, ex) {

        },
        //是否使用异步发送
        async: true
    })

}
function checkPhone(str) {
    var result = str.match(/^1[3|4|5|7|8][0-9]\d{8}$/);
    if (result === null)
        return false;
    return true;
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
function showStoreBanner()
{
//  if (!isWeiXin())
//  {
//      alert("此功能在微信浏览器中才有效哦")
//      return;
//  }
    document.getElementById('storesectionid').style.display = "block";
}
function missStoreBanner()
{
//    document.getElementById('bosshotId').style.display = "";
    document.getElementById('storesectionid').style.display = "none";
}

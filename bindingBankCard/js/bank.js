/**
 * Created by user on 2016/8/30.
 */
var sessionStorage = window.sessionStorage;
var Home_host = window.location.host;
var baseUrl =  "http://"+Home_host+"/ydserver/wx/";
//var baseUrl = "http://121.40.188.67:8080/ydserver/wx/";
var add_url = baseUrl + "addWXBank.do";
var request_url = baseUrl + "getWXBankAccountByShopid.do";
var delete_url = baseUrl + "deleteWXBank.do";
var request =
{
    QueryString: function (val) {
        var uri = window.location.search;
        var re = new RegExp("" + val + "=([^&?]*)", "ig");
        return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
    }
}
/*获取绑定银行卡列表*/
function getBankCardList() {
    var shopId = request.QueryString("shopid");
    //var shopId = "20599"
    sessionStorage["shopId"] = shopId;
    $.ajax({
        url: request_url,
        type: "POST",
        data: {
            "shopid": shopId,
        },
        //调小超时时间会引起异常
        timeout: 10000,
        //请求成功后触发
        success: function (data) {
            for (var i = 0; i < data.resultValue.length; i++) {
                $("#card-div").append(" <div class=\"radius\" onclick='toDelcard(" + JSON.stringify(data.resultValue[i]) + ")'>\n\
                <img src=\""+data.resultValue[i].bank_logo_url+"\"><span class=\"bankName\">" + data.resultValue[i].bank_name + "</span><span class=\"bankCode\">" + data.resultValue[i].bank_account + "</span></div>");
            }
        },
        //请求失败遇到异常触发
        error: function (xhr, errorInfo, ex) {
            mui.alert('请求失败', '提示', function () {
            });
        },
        //是否使用异步发送
        async: true
    })
}
/*跳到删除界面*/
function toDelcard(info) {
    sessionStorage["cardInfo"] = JSON.stringify(info);
    window.location.href = "deleteCard.html";
}
var id;
/*初始化删除银行卡界面*/
function initDel() {
    var info = sessionStorage["cardInfo"];
    var object = JSON.parse(info);
    $("#name").text(object.bank_name);
    $("#code").text(object.bank_account);
    $("#icon").attr("src",object.bank_logo_url);
    id = object.id;
}
/*删除银行卡*/
function deleteCard() {
    $.ajax({
        url: delete_url,
        type: "POST",
        data: {
            "id": id
        },
        //调小超时时间会引起异常
        timeout: 10000,
        //请求成功后触发
        success: function (data) {
            if ("0" == data.resultValue) {
                mui.alert('删除成功', '提示', function () {
                    history.go(-1);
                });
            } else {
                mui.alert(data.msg, '提示', function () {
                });
            }
        },
        //请求失败遇到异常触发
        error: function (xhr, errorInfo, ex) {
            mui.alert('删除失败', '提示', function () {
            });
        },
        //是否使用异步发送
        async: true
    })
}


var bankIcon;
/*获取选择银行的图标*/
function chooseBank(url) {
    bankIcon = url;
}
/*银行卡号输入规范及格式化*/
function inputListener(BankNo) {
    if (BankNo.value == "") return;
    var account = new String(BankNo.value);
    account = account.substring(0, 23);
    /*帐号的总数, 包括空格在内 */
    if (account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
        /* 对照格式 */
        if (account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
                ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
            var accountNumeric = accountChar = "", i;
            for (i = 0; i < account.length; i++) {
                accountChar = account.substr(i, 1);
                if (!isNaN(accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
            }
            account = "";
            for (i = 0; i < accountNumeric.length; i++) {    /* 可将以下空格改为-,效果也不错 */
                if (i == 4) account = account + " ";
                /* 帐号第四位数后加空格 */
                if (i == 8) account = account + " ";
                /* 帐号第八位数后加空格 */
                if (i == 12) account = account + " ";
                if (i == 16)account = account + " ";
                if (i == 20)account = account + " ";
                /* 帐号第十二位后数后加空格 */
                account = account + accountNumeric.substr(i, 1)
            }
        }
    }
    else {
        account = " " + account.substring(1, 5) + " " + account.substring(6, 10) + " " + account.substring(14, 18) + "-" + account.substring(18, 25);
    }
    if (account != BankNo.value) BankNo.value = account;
}

/*绑定银行卡*/
function addBankCard() {
    var shopId = sessionStorage["shopId"];
    var account = document.getElementById("account").value;
    var bankName = document.getElementById("bankName").value;
    var bankCode1 = document.getElementById("bankCode1").value;
    var bankCode2 = document.getElementById("bankCode2").value;
    if (account == undefined || "" == account) {
        mui.toast("请填写账户名");
        return;
    }
    if (bankName == undefined || "" == bankName) {
        mui.toast("请选择银行");
        return;
    }
    if (bankCode1 == undefined || "" == bankCode1) {
        mui.toast("请正确填写银行卡号");
        return;
    }
    if (bankCode2 == undefined || "" == bankCode2){
        mui.toast("请再次填写银行卡号");
        return;
    }
    if (bankCode1 != bankCode2) {
        mui.toast("请正确核对银行卡号");
        return;
    }
    $.ajax({
        url: add_url,
        type: "POST",
        data: {
            "shop_id": shopId,
            "account_name": account,
            "bank_name": bankName,
            "bank_account": bankCode1,
            "bank_logo_url": bankIcon,
        },
        //调小超时时间会引起异常
        timeout: 10000,
        //请求成功后触发
        success: function (data) {
            if ("0" == data.resultValue) {
                mui.alert('银行卡绑定成功', '提示', function () {
                    history.go(-1);
                });
            } else {
                mui.alert(data.msg, '提示', function () {
                });
            }

        },
        //请求失败遇到异常触发
        error: function (xhr, errorInfo, ex) {
            mui.alert('银行卡绑定失败', '提示', function () {
            });
        },
        //是否使用异步发送
        async: true
    })

}
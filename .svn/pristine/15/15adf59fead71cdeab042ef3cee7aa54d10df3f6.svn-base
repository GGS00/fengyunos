


//单全局变量
var MaintainableJS = {};

MaintainableJS.Illegal = 0;
MaintainableJS.ydhref = "http://10000dp.com/wxadmin/goodsBlock.php?";


if (varinit() > 0) {
    dhAccountActive();
}
else {
    $("#loadingToast").hide();
    $("#loading_img").hide();
    $("#autherror").fadeIn();
}


$("#activeBtn").click(function() {

    var loadingToast = $('#loadingToast');
    if (loadingToast.css('display') != 'none') {
        return;
    }
    loadingToast.show();
    authoryd(MaintainableJS.dhAccount);

})

function varinit() {

    MaintainableJS.dhAccount = request.QueryString("dhAccount");
    MaintainableJS.fromurl = request.QueryString("goodsId");
    if ((null == MaintainableJS.dhAccount) || ("" == MaintainableJS.dhAccount) || ("undefined" == MaintainableJS.dhAccount)) {
        //订货网账号非法
        return MaintainableJS.Illegal;
    }
    if ((null == MaintainableJS.fromurl) || ("" == MaintainableJS.fromurl) || ("undefined" == MaintainableJS.fromurl)) {
        //商品ID非法
        return MaintainableJS.Illegal;
    }
    return 1;
}

/**
 *  
 * @returns {undefined}
 * 订货网账户跳转 判断是否注册  代理商层次
 */
function dhAccountActive()
{
    $.ajax({
        type: "GET",
        url: "" + Comm_Config + "wx/checkUserNameExist.do",
        data: {"userName": MaintainableJS.dhAccount},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(data) {
            var d = eval(data);
            if (0 == d.resultValue)
            {
                //如果agent表中不存在本账号，去隐射表里面检查是否存在本账号
                routcheck(MaintainableJS.dhAccount);
                return;
            }
            else
            {
                if (d.agentModel.id)
                {
                    MaintainableJS.aid = d.agentModel.id;
                    getBaseIdByGoodsId();

                }
            }
        },
        error: function() {
            //错误接收
            $("#loadingToast").hide();
            $("#loading_img").hide();
            $("#autherror").fadeIn();
        }
    });
}

/**
 *  
 * @returns {undefined}
 * 云店、订货网映射表中检查
 */
function routcheck(dhaccount)
{
    $.ajax({
        type: "POST",
        url: "" + Comm_Config + "pc/checkDhAccount.do",
        data: {"account": dhaccount},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(data) {
            var d = eval(data);
            if (1 == d.resultValue)
            {
                //不存在映射关系，开通51云店
                $("#loadingToast").hide();
                $("#loading_img").hide();
                $("#autherror").hide();
                $("#authoractiveid").show();
            }
            else
            {
                if (d.dhModel.agentid)
                {
                    MaintainableJS.aid = d.dhModel.agentid;
                    getBaseIdByGoodsId();
                }
            }
        },
        error: function() {
            //错误接收
            $("#loadingToast").hide();
            $("#loading_img").hide();
            $("#autherror").fadeIn();
        }
    });
}


/**
 *  
 * @returns {undefined}
 * 订货网账号开通51云店
 */
function authoryd(dhaccount) {

    var registerby = "2_9";
    $.ajax({
        type: "POST",
        url: "" + Comm_Config + "wx/RigsterBy51dh.do",
        data: {"username": dhaccount, "openid": dhaccount, "mac": dhaccount, "registerby": registerby},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(data) {
            var d = eval(data);
            if (2 == d.resultValue) {
                //订货网账号开通云店失败，错误接收
                $("#authoractiveid").hide();
                $("#loadingToast").hide();
                $("#loading_img").hide();
                $("#autherror").fadeIn();
            }
            else if (d.sessionInfo.sessionid)
            {
                MaintainableJS.aid = d.agentInfo.id;
                getBaseIdByGoodsId();
            }
            else {
                $("#loadingToast").hide();
                $("#loading_img").hide();
                $("#autherror").fadeIn();
            }

        },
        error: function() {
            //错误接收
            $("#loadingToast").hide();
            $("#loading_img").hide();
            $("#autherror").fadeIn();
        }
    });
}

/**
 *  
 * @returns {undefined}
 * 根据51订货网商品ID 获取云店商品BaseId 
 */
function getBaseIdByGoodsId() {

    $.ajax({
        type: "GET",
        url: "" + Comm_Config + "wx/getGoodsByNumber.do",
        data: {"goods_number": MaintainableJS.fromurl},
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: function(data) {
            var d = eval(data);
            if (d.resultValue > 1) {
                //$("#loadingToast").hide();
                $("#authordspan").show();
                globSessionStorage["sessionisboss"] = 1;
                MaintainableJS.baseid = d.resultValue;
                MaintainableJS.iframe = document.getElementById("iframe");
                MaintainableJS.iframe.onload = iframe.onreadystatechange = iframeload;
                MaintainableJS.iframe.src = MaintainableJS.ydhref + "baseid=" + MaintainableJS.baseid + "&aid=" + MaintainableJS.aid + "";
            }
            else {
                $("#loadingToast").hide();
                $("#loading_img").hide();
                $("#autherror").show();
            }

        },
        error: function() {
            //错误接收
            $("#loadingToast").hide();
            $("#loading_img").hide();
            $("#autherror").fadeIn();
        }
    });
    //商品参数正确。收集用户信息，进入商品详情页面



}

function iframeload() {
    if (!MaintainableJS.iframe.readyState || MaintainableJS.iframe.readyState == "complete") {
        $("#loadingToast").hide();
        window.location.href = MaintainableJS.ydhref + "baseid=" + MaintainableJS.baseid + "&aid=" + MaintainableJS.aid + "";
    }
}

function testtoast() {

    var loadingToast = $('#loadingToast');
    if (loadingToast.css('display') != 'none') {
        return;
    }

    loadingToast.show();
    setTimeout(function() {
        loadingToast.hide();
    }, 2000);
}


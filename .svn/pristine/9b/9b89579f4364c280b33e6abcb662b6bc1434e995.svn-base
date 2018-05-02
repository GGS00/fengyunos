
/**
 * 
 * @retur ns {undefined}
 * 表单提交 验证
 */

//1： 代理商注册
//0:分店注册
var registerFlag = 1;
var bindingflag = '1x';
function formResubmit() {
    //数据收集判断
    
    if (document.getElementById('userinfodiv').innerHTML != "") {
        if (document.getElementById("username").value == "") {
            alert("请输入用户名");
            document.thisform.username.focus();
            return;
        }
        if (document.getElementById("password").value == "") {
            alert("请输入密码");
            document.thisform.password.focus();
            return;
        }
        if($("#password").val() != $("#confirmpassword").val())
        {
            alert("两次密码输入不一致！");
            document.thisform.password.focus();
            return;
        }
    }

    if (document.getElementById("company").value == "") {
        alert("请输入显示名称");
        document.thisform.company.focus();
        return;
    }
    if (document.getElementById("name").value == "") {
        alert("请输入收货人姓名");
        document.thisform.name.focus();
        return;
    }
    if (document.getElementById("tel").value == "") {
        alert("请输入收货人电话");
        document.thisform.tel.focus();
        return;
    }
    else {
        var tel = $("#tel").val();
        if (!((/^0\d{10}$/g.test(tel)) || (/^13\d{9}$/g.test(tel)) || (/^14\d{9}$/g.test(tel)) || (/^15\d{9}$/g.test(tel)) || (/^17\d{9}$/g.test(tel)) || (/^18\d{9}$/g.test(tel)))) {
            alert("请输入正确的手机号码或固定电话");
            document.thisform.tel.focus();
            return;
        }
    }
    if (((document.getElementById("s_province").value == "")) || ((document.getElementById("s_province").value == "省份"))) {
        alert("请选择收货省份");
        document.thisform.s_province.focus();
        return;
    }
    if ((document.getElementById("s_city").value == "") || (document.getElementById("s_city").value == "地级市")) {
        alert("请选择收货城市");
        document.thisform.s_city.focus();
        return;
    }
    if ((document.getElementById("s_county").value == "") || (document.getElementById("s_county").value == "市、县级市")) {
        alert("请选择收货区、县级市");
        document.thisform.s_county.focus();
        return;
    }
    if (document.getElementById("address").value == "") {
        alert("请输入街道地址");
        document.thisform.address.focus();
        return;
    }
    //    if(document.getElementById("stid").value=="")
    //    {
    //        alert("请选择行业类别");
    //        document.thisform.stid.focus();
    //        return;
    //    }
    if (document.getElementById("zipcode").value == "") {
        alert("请输入邮编");
        document.thisform.zipcode.focus();
        return;
    }
    else {
        var zipcode = $("#zipcode").val();
        if (!((/^\d{6}$/g.test(zipcode)))) {
            alert("请输入正确格式的邮编地址");
            document.thisform.zipcode.focus();
            return;
        }
    }
     if(!document.getElementById("noticecheckbox").checked)
    {
        alert("请勾选51云店注册前须知");
        return;
    }
    //数据提交
     msgsub_post();
    //document.getElementById('contentform').submit();
}

/**
 * 
 * @type Number|Number|Number
 * registerby 云店用户注册来源分类
 * 1_1   扫描云店盒子二维码注册
 * 1_2  扫描店主盒子二维码注册
 * 1_3  微信自主注册
 * 1_4 pad、手机自主注册
 * 2_3 微信51数据同步注册
 * 2_4 pad、手机51数据同步注册
 */
var regist_alias = 1;
function msgsub_post()
{   
     
    var registerby = "1_1";
    var actiondo = "registerByWx.do";
    var username =$("#username").val();
    var password = "null";
    var pwd = $("#password").val();

    if(null == pwd) 
    {
       pwd="null"; 
    }
     password  = $.md5(pwd);
   if(0 == registerFlag)
   {
       username = "unsignparam";
       password = "unsignparam";
   }
    var openid = $("#imeiId").val();
    var mac = $("#boxid").val();
    var shop_name = $("#company").val();
    var name = $("#name").val();
    var tel = $("#tel").val();
    var qq = $("#qq").val();
    var wechat = $("#wechat").val();
    var province = $("#s_province").find("option:selected").text();
    var city = $("#s_city").find("option:selected").text();
    var county = $("#s_county").find("option:selected").text();
    var address = $("#address").val();
     if("0_100" ==  $("#channelnumId").val())
     {
         //非官方提供的机顶盒，采用自由注册模式，但需要审核,则更换注册接口
         registerby = "1_2";
         if((bindingflag == '1I') || (bindingflag == '1J'))
         {
             actiondo = "registerWx.do";
         }
     }
     getAgentAlias(province);
      $.ajax({
        type:"post",
        url: ""+Comm_Config+"wx/"+actiondo+"", 
        data: {
            "alias_id":regist_alias,
             "alias":regist_alias,
            "openid":openid,
            "mac":mac,
            "username":username,
            "password":password,
            "shop_name":shop_name,
            "name":name,
            "tel":tel,
            "qq":qq,
            "wechat":wechat,
            "province":province,
            "city":city,
            "county":county,
            "address":address,
            "registerby":registerby
        }, 
        success: function(data){
            if(eval(data).resultValue == 0)
            {
                alert("绑定成功，立即进入管理后台");
                window.location.href="home.php";
            }
            else
            {
                //绑定失败。联系管理员
                alert("绑定失败,联系51云店管理员");
            }
           
        }
    });   
}
function getAgentAlias(province)
{
    if("江苏省" ==province )
    {
        regist_alias = 1;
        return;
    }
    if("山东省" ==province )
    {
        regist_alias = 2;
        return;
    }
     if("安徽省" ==province )
    {
        regist_alias = 3;
        return;
    }
     if("湖南省" ==province )
    {
        regist_alias = 4;
        return;
    }
     if("浙江省" ==province )
    {
        regist_alias = 5;
        return;
    }
     if("河南省" ==province )
    {
        regist_alias = 6;
        return;
    }
     if("湖北省" ==province )
    {
        regist_alias = 7;
        return;
    }
    if("福建省" ==province )
    {
        regist_alias = 8;
        return;
    }
    if("江西省" ==province )
    {
        regist_alias = 15;
        return;
    }
    else
    {
        regist_alias = 1;
    }
}

function validation(index, value) {
    switch (index) {
    case 0:
        {
            if (15 < value.length) {
                //点名长度超过15个字  就给个警告，不要乱写
                document.getElementById('companydiv').setAttribute("class", "form-group has-warning has-feedback");
                //turn red
            }
            else {
                document.getElementById('companydiv').setAttribute("class", "form-group has-success has-feedback");
            }
            break;
        }
    case 1:
        {
            if (10 < value.length) {
                //名称超过10个字  就给个警告，不要乱写
                document.getElementById('namediv').setAttribute("class", "form-group has-warning has-feedback");
                //turn red
            }
            else {
                document.getElementById('namediv').setAttribute("class", "form-group has-success has-feedback");
            }
            break;
        }
    case 2:
        {
             if (1 != userteljudge(value)) {
                //名称超过11个字  就是错误  不做弹窗，反正提交时有
               document.getElementById('teldivtips').style.display = "";
                document.getElementById('teldiv').setAttribute("class", "form-group has-error has-feedback");
                document.getElementById('submitbtnid').setAttribute("class", "btn btn-success disabled");
                //turn red
            }
            else {
               document.getElementById('teldivtips').style.display = "none";
                document.getElementById('teldiv').setAttribute("class", "form-group has-success has-feedback");
                document.getElementById('submitbtnid').setAttribute("class", "btn btn-success");
            }
            break;
        }
    case 3:
        {
            if ((50 < value.length) || (0 >= value.length)) {
                //名称超过11个字  就是错误  不做弹窗，反正提交时有
                document.getElementById('addressdiv').setAttribute("class", "form-group has-error has-feedback");
                //turn red
            }
            else {
                document.getElementById('addressdiv').setAttribute("class", "form-group has-success has-feedback");
            }
            break;
        }
    case 4:
        {
            if (6 != value.length) {
                //名称超过11个字  就是错误  不做弹窗，反正提交时有
                document.getElementById('zipcodediv').setAttribute("class", "form-group has-error has-feedback");
                //turn red
            }
            else {
                document.getElementById('zipcodediv').setAttribute("class", "form-group has-success has-feedback");
            }
            break;
        }
    case 5:
        {
            if (1 != usernamejudge(value)) {
                document.getElementById('usernametips').style.display = "";
                document.getElementById('usernamediv').setAttribute("class", "form-group has-error has-feedback");
                document.thisform.username.focus();
                //turn red
            }
            else {
                document.getElementById('usernametips').style.display = "none";
                document.getElementById('usernamediv').setAttribute("class", "form-group has-success has-feedback");
            }
            break;
        }
    case 6:
        {
            if (4 > value.length) {
                //名称超过11个字  就是错误  不做弹窗，反正提交时有
                document.getElementById('passworddiv').setAttribute("class", "form-group has-error has-feedback");
                //turn red
            }
            else {
                document.getElementById('passworddiv').setAttribute("class", "form-group has-success has-feedback");
            }
            break;
        }
    case 7:
        {
            if(value != $("#password").val())
            {
                document.getElementById('confirmpassworddiv').setAttribute("class", "form-group has-error has-feedback");
            }
            else
            {
                document.getElementById('confirmpassworddiv').setAttribute("class", "form-group has-success has-feedback");
            }
            break;
        }
    case 8:
        {
            document.getElementById('qqdiv').setAttribute("class", "form-group has-success has-feedback");
        }

    }
}

/**
 * 
 * @param {type} username
 * @returns {Number|data}//判断用户名合法性
 */

function usernamejudge(username) {
    var flag = 0;
    $.ajax({
             type:"GET",
             async:false,
             url: ""+Comm_Config+"wx/checkUserNameExist.do", 
             data: {"userName":username},    
             success: function(data){
                 var d = eval(data);
                 if(0 == d.resultValue)
                 {
                     flag = 1;
                 }
            }
         });
    return flag;
}

function userteljudge(tel) {
    var flag = 0;
    $.ajax({
             type:"GET",
             async:false,
             url: ""+Comm_Config+"wx/checkTel.do", 
             data: {"tel":tel},    
             success: function(data){
                 var d = eval(data);
                 if(0 == d.resultValue)
                 {
                     flag = 1;
                 }
            }
         });
    return flag;
}






/**
 * 
 * @returns {undefined}
 */

var MainConfigBandParam = {};
function addimei(selfImei) {
    //var selfImei = device.imei;   //获取到盒子的shopid  channelnum
   // var selfImei = request.QueryString("imei");
    var boxid = request.QueryString("boxid");

    var channelnum = request.QueryString("channelnum");
    $("#imeiId").val(selfImei);
    $("#boxid").val(boxid); //postboxid  postimei
    $("#channelnumId").val(channelnum);
    $("#postimei").val(selfImei);
    $("#postboxid").val(boxid);
    MainConfigBandParam.openid = selfImei;
    MainConfigBandParam.mac = boxid;
    bindingflag = validationBinding(boxid, selfImei);


    if ('1x' == bindingflag) {
        //参数错误 或者 接口错误
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-danger");
        document.getElementById('Bindingflagdiv').innerHTML = "未接收到有效数据";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('errordiv').style.display = "block";
         return;
    }
    else if ('1d' == bindingflag) {
        //首次绑定，需要输入用户名和密码  作为注册信息
        //数据成功 进行注册
        document.getElementById('usernamediv').style.display = "block";
        document.getElementById('passworddiv').style.display = "block";
        document.getElementById('confirmpassworddiv').style.display = "block";

        document.getElementById('aidinfodiv').innerHTML = ""; //取消aid  传参
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-success");
        document.getElementById('Bindingflagdiv').innerHTML = "二维码扫描成功，请输入以下信息进行注册绑定";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('editdiv').style.display = "block";
         return;

    }
    else if (('1a' == bindingflag) || ('b' == bindingflag)) {
        //密码错误  返回登录  一般不存在
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-danger");
        document.getElementById('Bindingflagdiv').innerHTML = "数据不一致性异常";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('errordiv').style.display = "block";
         return;
    }
    else if ('1c' == bindingflag) {
        //已经注册  点击立即绑定，店小二角色
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-danger");
        document.getElementById('Bindingflagdiv').innerHTML = "抱歉！盒子已经绑定，若需更换，请先解绑！";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('enactivetydiv').style.display = "block";
         return;
    }
    else if ('1f' == bindingflag) {
        //已经绑定，，请勿重复绑定
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-success");
        document.getElementById('Bindingflagdiv').innerHTML = "已经成功绑定，请勿重复绑定";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('errordiv').style.display = "block";
         return;
    }
    else if ('1I' == bindingflag) {
        //参数错误
       
         if("0_100" == channelnum)
        {
            //店主已经注册，为其自己的盒子作为分店盒子
              document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-success");
            document.getElementById('Bindingflagdiv').innerHTML = "二维码扫描成功，输入以下信息将您的盒子作为云店分店";
            document.getElementById('normaldiv').style.display = "none";
            document.getElementById('editdiv').style.display = "block";
            document.getElementById('userinfodiv').innerHTML = ""; //取消用户信息传参。
            registerFlag = 0;

            return;
        }
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-danger");
        document.getElementById('Bindingflagdiv').innerHTML = "该云店盒子暂时无法提供服务，请联系云店管理员";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('errordiv').style.display = "block";
    }
        else if ('1J' == bindingflag) {
        //参数错误
       
//         if("0_100" == channelnum)
//        {
//            //店主自主注册 需要审核，不存在 盒子未录入的情况
//           document.getElementById('usernamediv').style.display = "block";
//            document.getElementById('passworddiv').style.display = "block";
//            document.getElementById('confirmpassworddiv').style.display = "block";
//
//            document.getElementById('aidinfodiv').innerHTML = ""; //取消aid  传参
//            document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-success");
//            document.getElementById('Bindingflagdiv').innerHTML = "输入个人信息体验51云店";
//            document.getElementById('normaldiv').style.display = "none";
//            document.getElementById('editdiv').style.display = "block";
//            registerFlag = 1;
//            
//            return;
//        }
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-danger");
        document.getElementById('Bindingflagdiv').innerHTML = "该云店盒子暂时无法提供服务，请联系云店管理员";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('errordiv').style.display = "block";
    }
    else if('1g' == bindingflag){
        //店老板第二次绑定  返回的是aid 
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-success");
        document.getElementById('Bindingflagdiv').innerHTML = "二维码扫描成功，请输入以下信息进行注册绑定您的其他盒子";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('editdiv').style.display = "block";
        document.getElementById('userinfodiv').innerHTML = ""; //取消用户信息传参。
         return;
     //  $("#aid").val(bindingflag);

    }
    else if('1K' == bindingflag){
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-info");
        document.getElementById('Bindingflagdiv').innerHTML = "已经检测到您的云店账户，是否立即绑定云店盒子？";
        $("#normaldiv").hide();
        $("#confrimbandingdiv").show();
    }

}

/**
 * 
 * @returns {undefined}
 * 获取 session中 openid的值
 */
function getopenid()
{
    var local_openid = globLocalStorage ["sessionopenid"];
    if(null == local_openid)
    {
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-danger");
        document.getElementById('Bindingflagdiv').innerHTML = "您好！请使用微信版-51云店扫描";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('errorBackbt').style.display = "none";
        document.getElementById('errordiv').style.display = "block"; 
    }
    else
    {
        addimei(local_openid);
    }
}


//验证 是否已经帮绑定  0 未绑定。 1已经绑定直接跳转绑定成功

function  validationBinding(boxid, imei)
{
     var returnflag = '1x';
     $.ajax({
        type:"get",
        async: false,
        url: ""+Comm_Config+"wx/checkRegisteInfo.do", 
        data: {"mac":boxid,"openid":imei}, 
        success: function(data){
           
            var d = eval(data);
            returnflag =d.resultValue;
           
        }
    });
    return returnflag;
}

function setNewMacBanding(){
    
     $.ajax({
        type:"POST",
        url: ""+Comm_Config+"wx/bindMasterMac.do", 
        data: {"mac":MainConfigBandParam.mac,"openid":MainConfigBandParam.openid}, 
        success: function(data){
           var d = eval(data);
           if(0 ==d.resultValue){
               alert("绑定成功，进入微信管理后台");
               window.location.href="excessive.html?openid="+MainConfigBandParam.openid;
           }
           else{
               alert("绑定失败，请联系管理员");
           }
        }
    });
}

function backhome(){
    window.location.href="excessive.html?openid="+MainConfigBandParam.openid;
}

/**
 * 
 * @returns {undefined}
 * 店小二 快速绑定
 */

function s_binding() {
    var imei = globLocalStorage ["sessionopenid"];
    //var imei = request.QueryString("imei");
    var boxid = request.QueryString("boxid");
    var num = request.QueryString("channelnum");
    $.ajax({
        type: "get",
        async: false,
        url: "/digital/?r=interface/bindphone",
        data: {
            "boxid": boxid,
            "imei": imei,
            "num":num
        },
        success: function (data) {
            //
            document.getElementById('s_binding_btn').style.display = "none";
            document.getElementById('s_back_btn').style.display = "";
            if (1 == data) {
                //绑定成功！
                document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-success");
                document.getElementById('Bindingflagdiv').innerHTML = "恭喜，绑定成功";

                //跳转到管理页面
            }
            else {
                //绑定失败，请重新操作。
                document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-danger");
                document.getElementById('Bindingflagdiv').innerHTML = "抱歉，绑定失败";
            }

        }
    });
}




/**
 * 
 * @returns {undefined}定义计时器 1.5秒后跳转
 */

function goto_contorl() {
    setTimeout("gotoback();", 1500);
}


var Glob_Openid;
function wxregisterready()
{
    Glob_Openid = globSessionStorage["sessionopenid"];
  
    if(!Glob_Openid)
    {
        //未获取到微信的OPenid  
         document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-danger");
        document.getElementById('Bindingflagdiv').innerHTML = "请使用微信云店注册";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('errordiv').style.display = "block";
        return;
    }
    //判断Openid 是否注册。
    if(openidIsRegister())
    {
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-danger");
        document.getElementById('Bindingflagdiv').innerHTML = "您的微信账号已经注册 51云店！";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('errordiv').style.display = "block";
        return;
    }
    else
    {
         document.getElementById('usernamediv').style.display = "block";
        document.getElementById('passworddiv').style.display = "block";
        document.getElementById('confirmpassworddiv').style.display = "block";

        document.getElementById('aidinfodiv').innerHTML = ""; //取消aid  传参
        document.getElementById('Bindingflagdiv').setAttribute("class", "alert alert-success");
        document.getElementById('Bindingflagdiv').innerHTML = "输入信息注册51云店,若已有云店账号返回登陆";
        document.getElementById('normaldiv').style.display = "none";
        document.getElementById('editdiv').style.display = "block";
        
        $("#imeiId").val(Glob_Openid);
        $("#boxid").val(Glob_Openid); //postboxid  postimei
        $("#channelnumId").val('0_02');
        $("#postimei").val(Glob_Openid);
        $("#postboxid").val(Glob_Openid);
    }
    _hmt.push(['_trackEvent', '试用注册', '微信试用注册','微信试用注册意向']);
}

function openidIsRegister()
{
    return 0;
}
/**
 * 
 * @returns {undefined}
 * 表单提交 验证
 */

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
     
    var username ="null";
    var password = "null";
    var registerby  ="1_3";
    var pwd = $("#password").val();
    if(null == pwd) 
    {
       pwd="null"; 
    }
     password  = $.md5(pwd);
     username = $("#username").val();

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
    getAgentAlias(province);
      $.ajax({
        type:"post",
        url: ""+Comm_Config+"wx/registerWx.do", 
        data: {
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
                alert("注册成功，立即进入管理后台");
                window.location.href="home.php";
            }
            else
            {
                alert("注册失败，请联系云店管理员");
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
            if (1 != userteljudge(value))
         {
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





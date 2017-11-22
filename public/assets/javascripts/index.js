/**************************************
 *   开发者：王欢
 *   功能：
 *   最后更改日期 2017/10/11
 **************************************/
function validatorForm(){
    var ret = true;
    if (!validator.isMobilePhone($("#phone").val(),"zh-CN")){
        ret = false;
        alert("手机号码格式不正确");
        $("#phone-msg").css("display","block");
        $("#phone").focus();
        return false;
    }

    if(!validator.isLength($("#inputPassword2").val(),{min: 6, max: 20})){
        ret = false;
        alert("密码长度为6到20位");
        $("#password-msg").css("display","block");
        $("#inputPassword2").focus();
        return false;
    }
    if(!($("#inputPassword3").val() === $("#inputPassword2").val())){
        ret = false;
        alert("两次密码不一致");
        $("#password1-msg").css("display","block");
        $("#inputPassword3").focus();
        return false;
    }
    if(!($("#verificationCode").val().length == 4)){
        ret = false;
        alert("验证码输入不正确");
        $("#captcha-msg").css("display","block");
        $("#verificationCode").focus();
        return false;
    }
    if(ret)  signup();
}

function signup() {
    var para = $("#signUpform").serialize();
    alert(para);
    $.ajax({
        url:'/users/signup',
        type: 'POST',
        async: true,
        data: para,
        success: function (res) {
            //do something
            if(parseInt(res.code)==0){
                alert(res.msg);
            }
            if (parseInt(res.code) ==1 ){
                window.location.href = res.url;
            }
        }
    });
}

function signInform() {
    var ret = true;
    if (!validator.isMobilePhone($("#phone1").val(),"zh-CN")){
        ret = false;
        alert("手机号码输入不正确");
        $("#phone1").focus();
        return false;
    }
    if( $("#inputPassword1").val() == "" ){
        ret = false;
        alert("密码不能为空");
        $("#inputPassword1").focus();
        return false;
    }
    if (ret) signIn();
}
function signIn() {
    var para = $("#signInform").serialize();
    alert(para);
    $.ajax({
        url:'/users/signin',
        type: 'POST',
        async: true,
        data: para,
        success: function (res) {
            console.log(res);
            //do something
            if(parseInt(res.code)==0){
                alert(res.msg);
            }
            if (parseInt(res.code) ==1 ){
                console.log(res);
                window.location.href = res.url;
            }
        }
    });
}

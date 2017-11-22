/**************************************
 *   开发者：王欢
 *   功能：
 *   最后更改日期 2017/10/11
 **************************************/
function validatorForm() {
    var ret = true;
    /*if (!validator.isMobilePhone($("#phone").val(),"zh-CN")){
        ret = false;
        alert("手机号码格式不正确");
        $("#phone").focus();
        return false;
    }
    if(!validator.isLength($("#inputPassword2").val(),{min: 6, max: 20})){
        ret = false;
        alert("密码长度为6到20位");
        $("#inputPassword2").focus();
        return false;
    }
    if(!($("#inputPassword3").val() === $("#inputPassword2").val())){
        ret = false;
        alert("两次密码不一致");
        $("#inputPassword3").focus();
        return false;
    }*/
    if(ret)  signUp();
}

function signUp() {
    var para = $("#signUpform").serialize();

    $.ajax({
        url:'/users/signup',
        type: 'POST',
        async: true,
        data: para,
        success: function (res) {
            //do something
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
    if(!validator.isLength($("#inputPassword1").val(),{min: 6, max: 20})){
        ret = false;
        alert("密码输入错误");
        $("#inputPassword1").focus();
        return false;
    }
    if (ret) logUp();
}
function logUp() {
    var para = $("#signUpform").serialize();
    $.ajax({
        url:'/users/signup',
        type: 'POST',
        async: true,
        data: para,
        success: function (res) {
            //do something
        }
    });
}

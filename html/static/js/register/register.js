function init_register(){


function recommend_photo(){
    function _request_success(data){
        if(data.error_id == 0){
            $(".bgimg").attr("src", "http://image.paiwo.co/" + data.result.background_photo);
            $("#by").html("作品来自：" + data.result.author_name);
            $("#by").attr("href", "/" + data.result.author_url);
        }
        else{
            alert("加载图片错误")
        }
    }
    function _request_error(){
        alert("加载图片网络错误");
    }
    $.ajax({
        type: "POST",
        url: "/a/recommend/bigphoto",
        dataType: "json",
        success: _request_success,
        error: _request_error
    });
}
recommend_photo();

$(document).ready(function() {
    $("#vimage").click(
        function () {
            $("#vvimage").attr("src", "/a/captcha/register?v=" + Math.random());
        }
    );
});
$(document).ready(function(){
    $("input").blur(check_input);
});

$(document).ready(function(){
    $("#register_button").click(register_submit);
});

var email_error_state = 0;
var password_1_error_state = 0;
var verify_error_state = 0;

var error_image = '<img src="/static/images/icon/attention_small.png">';

function check_input(){
    function _check_email(){
        function _get_if_register(_email){
            var res;
            $.ajax({
                async: false,
                type : "POST",
                url : "/a/register/checkemail",
                dataType : 'json',
                data: {
                    email:_email,
                },
                success : function(data) {
                    res = data;
                },
                error : function(data) {
                    res = data;
                }
            });
            if (res.error_id == 0 ){
                if (res.result.is_register == 1){
                    return 1;
                }
                else{
                    return 0;
                }
            }
            else{
                return 2;
            }
        }
        if (_email_id.val() == ""){
            email_error_state = 0;
            return 1;
        }
        else if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(_email_id.val()) == false) {
            email_error_state = 1;
            return 2;
        }
        else if (_get_if_register(_email_id.val()) == 1 ) {
            email_error_state = 2;
            return 2;
        }
        else if (_get_if_register(_email_id.val()) == 2 ) {
            email_error_state = 3;
            return 2;
        }
        else{
            email_error_state = 0;
            return 0;
        }
    }

    function _check_password_1(){
        if (_password1_id.val() == "" || _password1_id.val() == ""){
            password_1_error_state = 0;
            return 1;
        }
        else if (_password1_id.val().length<6 || _password1_id.val().length>16){
            password_1_error_state = 1;
            return 2;
        }
        else{
            password_1_error_state = 0;
            return 0;
        }
    }

    function _check_verify(){
        if (_verify_code_id.val() == ""){
            verify_error_state = 0;
            return 1;
        }
        else if (_verify_code_id.val().length != 4){
            verify_error_state = 1;
            return 2;
        }
        else{
            verify_error_state = 0;
            return 0;
        }
    }

    function _make_error_info(){
        if (email_error_state == 0 && password_1_error_state == 0 && verify_error_state == 0){
            _error_id.hide();
        }
        else if (email_error_state == 2){
            _error_id.show();
            _error_id.html(error_image + "邮箱已经被注册");
        }
        else if (email_error_state == 3){
            _error_id.show();
            _error_id.html(error_image + "服务器错误");
        }
        else if (email_error_state == 1){
            _error_id.show();
            _error_id.html(error_image + "邮箱格式错误");
        }
        else if (password_1_error_state == 1){
            _error_id.show();
            _error_id.html(error_image + "密码必须为6-16位字母、数字组合");
        }
        else if (verify_error_state == 1){
            _error_id.show();
            _error_id.html(error_image + "验证码输入错误");
        }
    }

    var _email_id = $("#email");
    var _password1_id = $("#password1");
    var _verify_code_id = $("#verify");
    var _error_id = $("#error_info");

    if (_check_email() == 2){
        _email_id.addClass("red");
    }
    else{
        _email_id.removeClass("red");
    }

    if (_check_password_1() == 2){
        _password1_id.addClass("red");
    }
    else{
        _password1_id.removeClass("red");
    }

    if (_check_verify() == 2){
        _verify_code_id.addClass("red");
    }
    else{
        _verify_code_id.removeClass("red");
    }

    _make_error_info();
}


function register_check(){
    function _check_email(){
        if (_email_id.val() == ""){
            email_error_state = 1;
            return 1;
        }
        else if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(_email_id.val()) == false) {
            email_error_state = 1;
            return 2;
        }
        else{
            email_error_state = 0;
            return 0;
        }
    }

    function _check_password_1(){
        if (_password1_id.val() == "" || _password1_id.val() == ""){
            password_1_error_state = 1;
            return 1;
        }
        else if (_password1_id.val().length<6 || _password1_id.val().length>16){
            password_1_error_state = 1;
            return 2;
        }
        else{
            password_1_error_state = 0;
            return 0;
        }
    }

    function _check_verify(){
        if (_verify_code_id.val() == ""){
            verify_error_state = 1;
            return 1;
        }
        else if (_verify_code_id.val().length != 4){
            verify_error_state = 1;
            return 2;
        }
        else{
            verify_error_state = 0;
            return 0;
        }
    }

    function _make_error_info(){
        if (email_error_state == 0 && password_1_error_state == 0 && verify_error_state == 0){
            _error_id.hide();
            return 0
        }
        else if (email_error_state == 1){
            _error_id.show();
            _error_id.html(error_image + "邮箱格式错误");
            return 1
        }
        else if (password_1_error_state == 1){
            _error_id.show();
            _error_id.html(error_image + "密码必须为6-16位字母、数字组合");
            return 1
        }
        else if (verify_error_state == 1){
            _error_id.show();
            _error_id.html(error_image + "验证码输入错误");
            return 1
        }
    }

    var _email_id = $("#email");
    var _password1_id = $("#password1");
    var _verify_code_id = $("#verify");
    var _error_id = $("#error_info");

    if (_check_email() == 2){
        _email_id.addClass("red");
    }
    else{
        _email_id.removeClass("red");
    }

    if (_check_password_1() == 2){
        _password1_id.addClass("red");
    }
    else{
        _password1_id.removeClass("red");
    }

    if (_check_verify() == 2){
        _verify_code_id.addClass("red");
    }
    else{
        _verify_code_id.removeClass("red");
    }

    return _make_error_info();
}

function register_submit(){
    var _email = $("#email").val();
    var _password1 = $.md5("paiwo_" + $("#password1").val());
    var _verify = $("#verify").val();

    function _request_success(data){
        if (data.error_id == 0){
            window.location.href="/email/register"
        }
        else{
            var _error_id = $("#error_info");
            _error_id.show();
            _error_id.html(error_image + data.error_code);
            $("#vvimage").attr("src", "/a/captcha/register?v=" + Math.random());
        }
    }

    function _request_error(data){
        alert("注册错误");
    }
    var _e = register_check();
    if(_e == 0){
        $.ajax({
            type: "POST",
            url: "/a/register/doregister",
            dataType: "json",
            data:{
                email: _email,
                password: _password1,
                verify:_verify
            },
            /*
            xhrFields: {
                withCredentials: true
            },*/
            success: _request_success,
            error: _request_error
        });
}
}

}
init_register();
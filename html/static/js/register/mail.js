function init_mail(){
    var wait=60;
    var is_send = false;
    $("#send_email").click(click_email);
    $(document).ready(function() {
        $("#resend_email").click(
            function time() {
                var o = $("#resend_email"); 
                if (is_send == false) {
                    send_email();
                    o.addClass("unable");
                    is_send = true;
                }
                if (wait == 0) {
                    is_send = false;
                    o.removeClass("unable");
                    o.removeAttr("disabled");
					$("#resend_email").css('color','#dd2338');
                    o.val("重新发送验证邮件");
                    wait = 60;
                } else {
                    o.attr("disabled", true);
					$("#resend_email").css('color','#9d9b9b');
                    o.val("" + wait + "秒后可再次重新发送");
                    wait--;
                    setTimeout(function() {
                        time()
                    },
                    1000)
                }
            })
        });
    function send_email(){
        $.ajax({
            type: "POST",
            url: "/a/register/email/send"
        });
    }
    
    
    function click_email(){
        var $_send_email = $("#send_email");
        var $_into_email = $("#into_email");
        $_send_email.addClass("hide");
        $_into_email.removeClass("hide");
        send_email();
        return false;
    }
}



init_mail();


var EMAIL_MAP = {
    'qq.com': 'http://mail.qq.com/',
    'gmail.com': 'http://mail.google.com/',
    'sina.com': 'http://mail.sina.com.cn/',
    '163.com': 'http://mail.163.com/',
    '126.com': 'http://mail.126.com/',
    'yeah.net': 'http://www.yeah.net/',
    'sohu.com': 'http://mail.sohu.com/',
    'tom.com': 'http://mail.tom.com/',
    'sogou.com': 'http://mail.sogou.com/',
    '139.com': 'http://mail.10086.cn/',
    'hotmail.com': 'http://www.hotmail.com',
    'live.com': 'http://login.live.com/',
    'live.cn': 'http://login.live.cn/',
    'live.com.cn': 'http://login.live.com.cn',
    '189.com': 'http://webmail16.189.cn/webmail/',
    'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
    'yahoo.cn': 'http://mail.cn.yahoo.com/',
    'eyou.com': 'http://www.eyou.com/',
    '21cn.com': 'http://mail.21cn.com/',
    '188.com': 'http://www.188.com/',
    'foxmail.coom': 'http://www.foxmail.com/'
}

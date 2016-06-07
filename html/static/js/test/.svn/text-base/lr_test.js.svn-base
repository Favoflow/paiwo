window.onload = function() {
    is_login_test = -1;         //默认的登录状态
    is_photographer_test = -1;  //默认的是否认证为摄影师的状态

    function get_login_info() {
        $.ajax({
            url: '/a/user/top/get',
            type: 'POST',
            dataType: 'json',
            async: false,
            success: function login_info(data){
                if(data.error_id == 0) {
                    is_login = data.result.is_login;
                    if(is_login == 1) {
                        is_login_test = 1;
                        is_photographer_test = data.result.is_photographer;
                        console.log('is_photographer_test:',is_photographer_test)
                    } else if(is_login == 0) {
                        is_login_test = 0;
                    }
                } else {
                    alert("check_if_login error happened");
                }
            }
        })
    }

    function download_lr_link_text() {
        console.log('download_lr_link_text is called');
        $('.download').append('<span id="download_lr_link_word"></span>');
        $('#download_lr_link_word').click();
    }

    function download_lr_link_pic() {
        console.log('download_lr_link_pic is called');
        $('.section-one .seciton-one-img').click();
    }

    //public function
    //(1)/未登录;(2)/已登录且是摄影师;(3)/已登录且不是摄影师
    function check_common() {
        //检测两处下载链接是否正确
        setTimeout(download_lr_link_text,2000);
        setTimeout(download_lr_link_pic,4000);

        //检测 点击 侧导航
        setTimeout(check_navi_button,3000);
        //检测 点击 搜索按钮
        setTimeout(check_search_button,3000);
        if (1 == is_login_test) {
            setTimeout(check_private_message,3000);

            setTimeout(check_mouse_enter_photogth_info,2000);

            if (1 == is_photographer_test) { //是摄影师 登录
                //检测 上传按钮
                check_image_upload();
                //检测 hover 到右上角的头像和昵称，第一项的我的主页链接是否会到  个人中心
                check_jump_user_page();
            } else if(0 == is_photographer_test) { //不是摄影师 登录
                setTimeout(check_be_photoger,3000);
            }
        } else { //未登录
            alert("验证注册和登录功能请点击对应的照片完成");
        }
    }

    function check_navi_button() {
        navi_button = $('.push_button');
        navi_item = $('#nav');
        if(!navi_item.is(':visible')) { //左侧导航栏不显示
            navi_button.click();
            setTimeout(function(){
                if(navi_item.is(':visible')) {
                    console.log('navi button is ok when navi item is  not shown');
                    navi_button.click();
                } else {
                    console.log('navi button is not ok when navi item is  not shown');
                }
            },3000);
        } else {
            navi_button.click();
            setTimeout(function(){
                if(!navi_item.is(':visible')) {
                    console.log('navi button is ok when navi item is shown');
                    navi_button.click();
                } else {
                    console.log('navi button is ok when navi item is not shown');
                }
            },3000);
        }
    }

    function ckeck_upload_image_button() {
        $('.tab-icon_file').append('<span id="upload_image_test"></span>');
        $('#upload_image_test').click();
        if (window.location.pathname == '/album/new') {
            console.log("jump to album new ok ");
        } else {
            console.log("jump to album new error");
        }
    }

    function check_nickname_jump() {
        $('.tab-icon_myset').click();
        setTimeout(function nickname_jump(){
            if (window.location.pathname == '/user') {
                console.log("jump to /user ok");
            } else {
                console.log("jump to /user error");
            }
        },3000);
    }

    function check_login() {
        $('.tab-login-a').click();

        $('.email').val('hnxymjj@163.com');
        $('.password').val('123456');
        $('.login_botton').click();

        setTimeout(function(){
            if( !$('.login_module').is(':visible') ) {
                console.log('login ok');
            } else {
                alert('login error,please check');
            }
        },3000);
    }

    function check_register() {
        $('.tab-regist-a').append('<spand id="register_test"></span>');
        $('#register_test').click();
        setTimeout(function hash_test() {
            console.log('hash:',window.location.hash);
            if('#/register' == window.location.hash) {
                console.log('register hash ok');
            } else {
                console.log('register hash error');
            }
        },1500);
    }

    function check_search_button() {
        search_button = $('.tab-icon_search');
        search_area = $('.search-main');
        search_area_statue = search_area.attr('style');
        setTimeout(function() {
            search_button.click();
            setTimeout(function(){
                console.log(search_area_statue);
                if(search_area_statue == 'visibility: hidden;') {
                    console.log('search button is ok');
                } else {
                    console.log('search button is not ok');
                }
                search_button.click();
            },2000);
        },2000);
    }

    function get_message_user_info() {
        $.ajax({
            url:'/a/message/user/init',
            type:'POST',
            dataType:'json',
            async:false,
            data:{user_list: ''},
            success: function(data){
                if(data.error_id == 0){
                    console.log('user_list:',data.result.user_list);
                }
            }
        });
    }

    function check_private_message() {
        $('.tab-icon_myme').click();
        setTimeout(function() {
            if($('.messge_black').is(':visible')) {
                console.log('message box opened');
            } else {
                console.log('message box is not opened');
            }
        },2000);
    }

    function check_image_upload() {
        $('.tab-icon_file').append('<span id="upload_img_test"></span>');
        $('#upload_img_test').click();
        setTimeout(function(){
            if ( window.location.pathname == '/album/new') {
                console.log('jump to upload album page ok');
            } else {
                alert('jump to upload album page erro');
            }
        },1000);
    }

    function check_jump_user_page() {
        $('.tab-icon_myset').click();
        setTimeout(function(){
            if ( window.location.pathname == '/user') {
                console.log('jump to user page ok');
            } else {
                alert('jump to user page error');
            }
        },2000);
    }


    function check_be_photoger() {
        $('#tab-bephotog').append('<span id="tab-bephotog-test"></span>');
        $('#tab-bephotog-test').click();
        alert("请确认是否跳转到成为摄影师页面");
    }

    get_login_info();

    check_common();


    //点击第二张图片会出现实现登录功能验证
    $('.seciton-two').on('click',function(){
        setTimeout(check_register,3000);
    })
    //点击第三张图片会出现实现注册功能验证
    $('.seciton-three').on('click',function(){
        setTimeout(check_login,3000);
    })

    $('.seciton-one-4').on('clcik',function(){
        $('.tab-icon_myset').click();
        alert("请检查是否会跳转到当前用户的个人中心");
    })

    function check_mouse_enter_photogth_info() {
        $('.tab-icon_myset').trigger('mouseenter');
        setTimeout(function(){
            alter('请检查摄影师昵称下面的下拉列表是否隐藏');
        },3000);
        $('.tab-icon_myset').trigger('mouseleave');
    }
}


window.onload = function() {
    is_login_test = -1;         //默认的登录状态
    is_photographer_test = -1;  //默认的是否认证为摄影师的状态
    favourite_photo_id = -1;
    like_photo_id = -1;

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
                    } else if(is_login == 0) {
                        is_login_test = 0;
                    }

                    if((is_login_test == 1) && (is_photographer_test == 1) ) {
                        console.log('请求用户信息，应答：已登录，是摄影师');
                    } else if( (is_login_test == 1) && (is_photographer_test == 0) ) {
                        console.log('请求用户信息，应答：已登录，不是摄影师');
                    } else if( (is_login_test == 0) && (is_photographer_test == 0)  ) {
                        console.log('请求用户信息，应答：未登录');
                    }
                 } else {
                    alert("请求用户信息，后台应答错误信息");
                    return ;
                }
            }
        })
    }
    //获取摄影师是否当前信息
    get_login_info();

    function check_search_btn(){
        $('.tab-icon_search').click();
        setTimeout(function(){
            if($('.search-back').is(':visible')) {
                console.log("点击搜索按钮后，搜索对话框正常显示");

                setTimeout(function(){
                    $('.search-back').click();
                },2000);

                if ($('.search-back').is(':visible')) {
                    console.log("点击搜索框的区域后，搜索框正常关闭");
                } else {
                    console.log("点击搜索框的区域后，搜索框没有正常关闭");
                }
            } else {
                alert("点击搜索按钮后，搜索对话框没有正常显示");
            }
        },2000)
    }

    function check_register_btn() {
        register_href = $('.tab-regist-a').attr("href");
        if(register_href == "/#/register") {
            console.log("注册按钮是正常的");
        } else {
            alert("注册按钮是处理错误的");
        }
    }

    function check_login_btn() {
        $('.tab-login-a').click();
        setTimeout(function(){
            if( $('.login_box').is(":visible")) {
                console.log("点击 登录 按钮后，登录对话框弹出正常");
                $('.login_shadow').click();
                setTimeout(function(){
                    if( $('.login_box').is(":visible") ) {
                        alert("点击 灰色区域后，登录对话框没有正常消失");
                    } else {
                        console.log("点击 灰色区域后，登录对话框正常消失");
                    }
                },2000);
            } else {
                alert("点击 登录 按钮后，登录对话框没有正常弹出");
            }
        },2000);
    }

    function check_navi_push_btn() {
        $('.push_button').click();
        setTimeout(function() {
            if( $('#nav').is(':visible') ) {
                console.log("点击 左侧的 导航按钮，导航栏正常弹出");
                setTimeout(function() {
                    $('.push_button').click();
                },2000);
                if( $('#nav').is(':visible') ) {
                    alert("重新点击 左侧的导航按钮后，导航栏没有正常消失");
                } else {
                    alert("重新点击 左侧的导航按钮后，导航栏正常消失");
                }
            } else {
                alert("点击 左侧的 导航按钮，导航栏没有正常弹出");
            }
        },2000);

        setTimeout(function() {
            if( $('#nav').is(':visible') ) {
                console.log("点击 左侧的 导航按钮，导航栏正常弹出");
                setTimeout(function() {
                    $('#shadow_box').click();
                },2000);
                    if( $('#nav').is(':visible') ) {
                    alert("重新点击 左侧的导航按钮后，导航栏没有正常消失");
                } else {
                    alert("重新点击 左侧的导航按钮后，导航栏正常消失");
                }
            } else {
                alert("点击 左侧的 导航按钮，导航栏没有正常弹出");
            }
        },2000);
    }

    function check_now_upload_btn() {
        $('.sigma-up').click();
        setTimeout(function(){
            if( $('.login_box').is(":visible")) {
                console.log("点击 现在上传 按钮后，登录对话框弹出正常");
                $('.login_shadow').click();
                setTimeout(function(){
                    if( $('.login_box').is(":visible") ) {
                        alert("点击 灰色区域后，登录对话框没有正常消失");
                    } else {
                        console.log("点击 灰色区域后，登录对话框正常消失");
                    }
                },2000);
            } else {
                alert("点击 现在上传 按钮后，登录对话框没有正常弹出");
            }
        },2000);
    }

    /*
    *展示列表项
    *随机选取一张当前显示的照片，mouseenter这张图片后，查看  摄影师的昵称、赞、收藏 的图标是否显示
    *（1）、先触发点赞按钮，然后，然后请求已经点赞过的照片，查看 当前照片是否在赞的列表中，后台返回是否正确
    *（2）、再触发点收藏按钮，提示：让其进行手工操作
    * */
    //TODO:要判断 赞和收藏的数量是否一致
    function check_img_list() {
        item_list = $('#dbpul li');
        item_list_size = item_list.size();
        random_num = parseInt(Math.random()*item_list_size-1)
        $.each(item_list,function(index,item){
            if(random_num == index) {
                $(this).mouseenter();
                nick_name = $(this).find('.photo_fixbox a').html();
                if(nick_name == "") {
                    alert("没有正确显示摄影师昵称");
                } else {
                    console.log("模拟鼠标进入某张图片上面，显示的摄影师昵称是正确的");
                }

                $(this).find('.photo_fixbox .photo_fixbox_like').click();
                setTimeout(function(){
                    if($(this).find('.photo_fixbox button:first').hasClass('photo_fixbox_liked')) {
                        console.log("mouse enter 照片后，照片的赞 状态显示正常");
                    } else {
                        alert("mouse enter 照片后，照片的赞 状态显示 不 正常");
                    }
                },2000);

                $(this).find('.photo_fixbox .photo_fixbox_ding').click();
                setTimeout(function(){
                    if($(this).find('.photo_fixbox button:last').hasClass('photo_fixbox_dinged')) {
                        console.log("mouse enter 照片后，照片的 收藏 状态显示正常");
                    } else {
                        alert("mouse enter 照片后，照片的 收藏  状态显示 不 正常");
                    }
                },20000);
            }
        });
    }

    function check_img_big() {
        item_list = $('#dbpul li');
        item_list_size = item_list.size();
        random_num = parseInt(Math.random()*item_list_size-1)
        $.each(item_list,function(index,item){
            if(random_num == index) {
                $(this).clcik();
                if( $('.big_pic_shadow').is(':visible') ) {
                    console.log("进入大图后，阴影部分正常显示");

                    setTimeout(check_big_img_like,3000);
                    setTimeout(check_big_img_favourite_list,3000);
                    setTimeout(check_big_img_album_name,3000);
                    setTimeout(check_big_img_socail_login,3000);
                    setTimeout(check_big_img_photographer_name,3000);
                    setTimeout(check_)
                    //赞  收藏：判断前端和后台的数量是否一致
                    //社交账号登录(微博/qq/webchat)
                    //评论
                    //点击 相册标题
                    //点击摄影师的昵称
                } else {
                    alert("进入大图后，阴影部分的没有正常显示");
                }
            }
        });
    }

    function check_big_img_like_style() {

        setTimeout(check_big_img_like_list,3000);
        //check like num
    }

    function check_big_img_favourite() {

    }

    function check_big_img_album_name() {
        $('.main_right_titlea').append('<span id="album_title_test"></span>');
        $('#album_title_test').click();
        alert("请检查是否在新的窗口打开摄影师主页并且到对应的相册内页");
    }

    function check_big_img_photographer_name() {
        $('.username').append('<span class="user_name_test"></span>');
        $('.user_name_test').click();
        alert("请检查是否在新的窗口打开摄影师主页");
    }

    function check_big_img_socail_login() {
        $('.tab_share_weibo').clcik();
        $('.tab_share_qzone').click();
        $('.tab_share_wechat').click();
    }

    function check_big_img_like_list() {
        $('.tab_buttons_left').click();
        //check　button style
        setTimeout(function(){
            if( $('.tab_buttons_left').hasClass('select-s') ) {
                console.log("点击 赞  按钮后，样式正确");
            } else {
                alert("点击 赞 按钮后，样式不正确");
                return ;
            }
        },3000);

        photo_id = window.location.pathname.split('/')[2];

        $.ajax({
            url: '/a/photo/like/list',
            type: 'POST',
            dataType: 'json',
            async: false,
            data:{
                page_no: 1,
                page_size: 12,
                order_by: 1
            },
            success:function(data){
                if(data.error_id == 0){
                    like_list = data.result.photo_list;
                    result = false;
                    $.each(like_list,function(index,item){
                        if(item.photo_id == photo_id) {
                            console.log("赞 图片成功,后台赞的列表中存在这张照片");
                            result = true;
                        }
                    })
                    if(result == false ) {
                        alert("赞 图片成功,后台赞的列表中 没有 这张照片");
                        return ;
                    }
                }else{
                    console.log('error happened in handler /a/photo/like/list');
                }
            },
            error:function(){
                console.log('have not receive server response');
            }
        });
        $.each(like_list,function(index,item){
            console.log(item)
        })
    }

    function check_big_img_favourite_list( ) {
        $('.tab_buttons_right').click();
        //check　button style
        setTimeout(function(){
            if( $('.tab_buttons_right').hasClass('select-s') ) {
                console.log("点击 收藏 按钮后，样式正确");
            } else {
                alert("点击 收藏 按钮后，样式不正确");
                return ;
            }
        },3000);

        photo_id = window.location.pathname.split('/')[2];

        $.ajax({
            url: '/a/photo/favorite/detail/list',
            type: 'POST',
            dataType:'json',
            async:false,
            data: {
                page_no: 1,
                page_size: 7
            },
            success:function(data){
                if(data.error_id == 0){
                    favourite_list = data.result.photo_list;
                    result = false;
                    $.each(favourite_list,function(index,item){
                        if(item.photo_id == photo_id) {
                            console.log("收藏图片 成功，后台收藏的列表中存在这张照片");
                            result = true;
                        }
                    })
                    if(result == false) {
                        alert("后台收藏的照片列表中没有这张照片");
                        return ;
                    }
                } else {

                }
            },
            error:function(){

            }
        });
    }
}
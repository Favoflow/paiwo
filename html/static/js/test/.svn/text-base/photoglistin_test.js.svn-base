window.onload = function() {
    is_login_test = -1;
    is_photographer_test = -1;

    reply_user_id = 0;
    reply_user_name = '';

    function get_login_info() {
        $.ajax({
            url: '/a/user/top/get',
            type: 'POST',
            dataType: 'json',
            async: false,
            success: function login_info(data){
                if(data.error_id == 0) {
                    is_login = data.result.is_login
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

    get_login_info();

    //检测点击页面顶部的"推荐摄影师"，应该跳转到推荐摄影师主页
    function check_recommend_photogher() {
        $('.cur-recommend').click();
        alert('点击推荐摄影师后，应该跳转到摄影师推荐外页');
    }

    //检测点击文章左部的摄影师 头像  昵称 私信 关注   和 浮动
    function check_photog_info() {
        fixed_photog_info = $('.pg-article .pg-article-L')
        float_photog_info = $('#fixed-top-box .pg-article-L')  // .pg-article-headimg
        if( fixed_photog_info.is(':visible') ) {  //摄影师信息当前显示在固定位置
            //检测私信按钮
            $('.pg-article .pg-article-L .pg-letter').click()
            if($('#message_talk_head').is(':visible')) {
                console.log('private message is shown ok');
            } else {
                console.log('private message is shown error');
            }
            $('.message_shadow').click()
            //检测关注按钮
            html_care = $('.pg-article .pg-article-L .pg-care').html()
            $('.pg-article .pg-article-L .pg-care').click()
            setTimeout(function() {
                if( $('.pg-article .pg-article-L .pg-care').html() == html_care) {
                    alert('care photogher error')
                } else {
                    console.log('care photogher ok')
                }
            },1000);

            //检测点击摄影师的头像和昵称后，是否可以跳转到摄影师主页
            $('.pg-article .pg-article-L .pg-article-headimg').click()

            //检测 评论文本框和评论按钮是否可用
            setTimeout(check_comment,2000)
        } else {    //摄影师信息当前显示在浮动位置

        }
    }

    function check_comment_not_login_list() {
        $('.reply_some').click();
        setTimeout(function(){
            if($('.login_module').is(':visible')) {
                console.log('未登录的情况下，点击评论列表中的回复按钮时候，弹出登录对话框，正确');
            } else {
                alert('未登录的情况下，点击评论列表中的回复按钮时候，弹出登录对话框，错误');
            }
        },500);
    }


    function check_comment_not_login_commnet_button() {
        $('.send_reply').click();
        setTimeout(function(){
            if($('.login_module').is(':visible')) {
                console.log('未登录的情况下，点击评论按钮时候，弹出登录对话框，正确');
            } else {
                alert('未登录的情况下，点击评论按钮时候，弹出登录对话框，错误');
            }
        },500);
    }

    function check_comment_login_only_commnet() {
        var d = new Date();
        comment_text = 'message commnet:' + d.toLocaleString();
        $('#reply_text').val(comment_text);
        $('#send_reply').click();
        //0.5s 后，检测后台返回的评论内容中是否有刚才评论的内容
        setTimeout(function(){
            path_name = window.location.pathname;
            position = path_name.lastIndexOf('/');
            post_id = path_name.substr(position + 1);
            $.ajax({
                url:'/a/recommend/photographer/post/comment/get',
                type:'POST',
                dataType:'json',
                data: {
                    post_id: post_id,
                    page_no : 1,
                    page_size :10
                },
                success:function(data){
                    if(data.error_id == 0){
                        jQuery.each(data.result.comment_list,function(index,item){
                            if(item.comment_text == comment_text) {
                                console.log('用户直接评论，后台正确收到评论信息，要查看格式是否正确');
                            }
                        });
                    } else {
                        alert('获取评论列表 收到后台的反馈信息带有错误码');
                    }
                },
                error:function(){
                    alert('获取评论列表 没有收到后台的反馈信息');
                    return ;
                }
            });
        },500);
    }

    $('.reply_some').on('click',function(){
        reply_user_id = $(this).attr('data');
        reply_user_name = $(this).attr('dname');
    })
    //回复评论
    function check_commnet_login_comment_reply() {
        var d = new Date();
        reply_text = 'message reply:' + d.toLocaleString();
        $('#reply_text').val(reply_text);
        $('.reply_some').click();
        //TODO:检测内容是否
    }
    //检测评论功能
    function check_comment() {
        if(0 == is_login_test) {
            setTimeout(check_comment_not_login_commnet_button,1000);
            setTimeout(check_comment_not_login_list,1000);
        } else if ( 1 == is_login_test ) {
            //单一的直接输入评论内容后，点击评论按钮
            setTimeout(check_comment_login_only_commnet,1000);
            //回复某人的评论
            setTimeout(check_commnet_login_comment_reply,1000);
        }
    }

    function get_commect_list() {
        path_name = window.location.pathname;
        position = path_name.lastIndexOf('/');
        post_id = path_name.substr(position + 1);
        $.ajax({
            url:'/a/recommend/photographer/post/comment/get',
            type:'POST',
            dataType:'json',
            data: {
                post_id: post_id,
                page_no : 1,
                page_size :10
            },
            success:function(data){
                if(data.error_id == 0){
                    jQuery.each(data.result.comment_list,function(index,item){
                        console.log(item);
                    });
                } else {
                    alert('获取评论列表 收到后台的反馈信息带有错误码');
                }
            },
            error:function(){
                alert('获取评论列表 没有收到后台的反馈信息');
                return ;
            }
        });
    }
    //检测侧导航按钮
    function check_navi() {

    }
    //检测页面顶部栏目
    function check_top_page() {

    }

    //检测点击社交账号分享
    function check_social_share() {
        console.log('请查看是否正常弹出：微博 微信 qq 分享的三个对话框,以及三个对话框是否可以正常关闭');
        $('.tab_share_weibo').click();
        $('.tab_share_qzone').click();
        $('.tab_share_wechat').click();
    }
}
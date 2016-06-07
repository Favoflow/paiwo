window.onload = function() {
    //公共信息检测：侧导航按钮  页面顶部
    function check_common() {

    }
    /*
    *function:推荐摄影师banner
    *desc:
    * (a)/点击banner 图片部分是否跳转到对应的摄影师推荐内页  check_banner_pic_click
    * (b)/点击文章简介部分 是否跳转到对应的摄影师推荐内页  check_banner_brief_click
    * (c)/点击摄影师的头像是否会打开新的页面到摄影师主页  check_banner_head_hover
    * (d)/hover 到摄影师昵称上面后，是否可以变为红色,点击后，是否会打开新的页面到摄影师主页  check_banner_nickname_hover
    */
    function check_banner() {
        setTimeout(check_banner_pic_click,3000);
        setTimeout(check_banner_brief_click,3000);
        setTimeout(check_banner_nickname_hover,3000);
        setTimeout(check_banner_head_hover,3000);
        return ;
    }

    function check_banner_pic_click() {
        $('.recommend-banner-text').click();
        alert('请检查是否在新的主页打开banner的摄影师的主页');
        return ;
    }
    function check_banner_brief_click() {
        $('.photog-intro').click();
        alert('请检查点击banner 部分的简介后，是否打开 banner 部分的摄影师主页');
        return ;
    }

    function check_banner_head_hover() {
        $('.photog-head img').click();
        alert('banner 头像被hover 请检查是否在新的主页打开banner的摄影师的主页');
        return ;
    }

    function check_banner_nickname_hover() {
        $('#a_nick').append('<span id="nick_link"></span>')
        $('#nick_link').click();
        alert('请检查是否在新的主页打开banner的摄影师的主页');
        return ;
    }

    function get_shown_photgher_info() {
        $.each($('.find-photog-ul .find-block'),function(index,item){
            brief = $(this).find('p').html(); //摘要
            title = $(this).find('.find-photog-text .find-photog-intro a').html(); //标题
            nick_name = $(this).find('.find-photog-text .find-photog-intro .photog-intro-name').html(); //昵称
        })
    }
    /*
    *function:优秀摄影师列表
    *desc:
    * (a)/列表底部的数量是否一致  当前页数 和 总页数
    * (b)/前后翻页是否正常，以及翻页后的数据是否正确
    * (c)/检查优秀摄影师中的单项信息和行为是否正确
    */
    function check_best_photographer_list() {
        //页面上的展示数据
        sum_photogher = $('.recommend-outter-buttons span #sum_p').html();
        cur_photogher = $('.recommend-outter-buttons span #cur_p').html();

        //后台的返回数据
        $.ajax({
            url: '/a/recommend/photographer/post/list/get',
            type: 'POST',
            dataType: 'json',
            async: false,
            data: {
                page_no: 1,
                page_size:10
            },
            success:function(data) {
                if(data.error_id == 0) {
                    page_no  = data.result.page_no;
                    page_size = data.result.page_size;

                    if((page_no == cur_photogher) && (page_size == sum_photogher) ) {
                        console.log('优秀摄影师列表中的当前页数和总页数和后台返回的是一致的');
                    } else {
                        alert('优秀摄影师列表中的当前页数和总页数和后台返回的不一致');
                    }
                } else {
                    console.log('请求优秀摄影师的列表，后台返回错误代码');
                }
            },
            error:function() {
                console.log('请求优秀摄影师的列表，没有收到后台的应答');
            }
        })
        return ;
    }

    /*
    *摄影师榜单
    *(a)/人气摄影师的列表是否正确
    *(b)/活跃榜单是否正确
    *(c)/最近上传是否正确
    * （d）/点关注 在未登录和登录情况下是否正常
    */
    list_hot = [];
    list_most = [];
    list_live = [];
    function get_best_list() {
        $.ajax({
            url:'/a/photographer/list/get',
            type:'POST',
            dataType:'json',
            async: false,
            data:{
                page_no : 1,
                page_size : 12
            },
            success:function(data){
                if(data.error_id == 0){
                    jQuery.each(data.result,function(index,item){
                        if(index == 'photographer_hot_list') {
                            list_hot = item;
                        } else if(index == 'photographer_live_list') {
                            list_live = item;
                        } else if(index == 'photographer_most_list') {
                            list_most = item;
                        }
                    })
                }else{
                    console.log('请求榜单信息，后台反馈错误编码');
                }
            },
            error:function() {
                console.log('请求榜单信息，没有收到后台的应答')
            }
        });
    }
    function check_hot_list() {
        jQuery.each(list_hot,function(index,item){
            console.log(item);
        })
        return false;
    }
    //*(b)/活跃榜单是否正确
    function check_live_list() {
        jQuery.each(list_live,function(index,item){
            console.log(item);
        })
        return false;
    }
    //最近上传是否正确
    function check_most_list() {
        jQuery.each(list_most,function(index,item){
            console.log(item);
        })
        //item.nick_name
        //item.album_count
        //item.is_follow
        
        return false;
    }
}
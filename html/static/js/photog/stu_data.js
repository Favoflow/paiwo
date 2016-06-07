var host = {};
var scroll_flag = false;
var sec_flag = false;
var alert_body = $('#delete_alert');
var select_del = null; //删除相册的ID
var in_album;
var now_url = window.location.href;  
var is_winsrcoll = false;
var state_object = {
        title: "album",
        url: "/album"
};
var album_list = {}; //保存相册编号和对应相册数量的map
var like_num = 0; //摄影师主页赞的数量
var favourite_num = 0; //摄影师主页收藏的数量
var album_list_tmp = [];
var album_page = 1;
var album_flag = true;
var dyPage = 0,
    dy_count = 0;
var dynamic_page = 1;


//获取摄影师初始信息
function getPhotogInfo(){

    
    base.ajax({
        
        async:true,

        data:{
            'method': 'paiwo.home.get',
            'host_domain':host.name
        },

        success:infoResult,

        error:function(data){
            slideMessage('网络错误');
        }
            
    });
}


//显示摄影师的相关信息
function infoResult(data){
    
    if(data.error_id == 0){
        var _data = data.response,
            studioInfoTab = $('.studio-info-tab');
        $('.top-tab').addClass('top_tab_opa').fadeIn(100);
        host.id = _data.host_id;
//        host.num = _data.album_count;
        host.nick = _data.host_name;
        host.hostName = _data.host_domain;
        host.is_self = _data.is_self;
        showTheGender(_data);
        home_info = data.response;
        is_self = _data.is_self;
        showTypes(_data.photograph_type);
        
        if(host.is_self){
            $('.stuido_header_editicon').show();
        }
        
        if(_data.gift == 1){
            $('.studio-album').css('display','inline-block');
        }else{
            $('.studio-album').css('display','none');
        }
        
        if(_data.host_avatar == '0' || _data.host_avatar == ''){
            $('.header_textbox_headimg').attr('src', 'static/images/user_head.gif');       
        }else{
            var avatar = _data.host_avatar.replace(/120w_120h/,'240w_240h');
                
            if(base.deviceRetina()){  //retina
                avatar = avatar;
            }else{ //非retina
                avatar = _data.host_avatar;
            }
            
            $('.header_textbox_headimg').attr('src', 'http://image.paiwo.co/'+avatar);
        }
        
        studioInfoTab.find('.dynamic-count').html(_data.dynamic_count);  //动态
        studioInfoTab.find('.follow-count').html(_data.follow_count);  //关注
        studioInfoTab.find('.follower-count').html(_data.follower_count);  //粉丝
        $('.studio-friend-care').find('i').html(_data.follow_count);
        $('.studio-friend-fans').find('i').html(_data.follower_count);
        $('.studio-hot-val').html(_data.temperature);
        $('.studio_url,.studio-info-url p').html('paiwo.co/'+_data.host_domain+'');
        $('.tab_left_dings').html('<i></i>'+'<span>' + _data.dynamic_count+ '</span>');//收藏夹个数
        //$('.tab_left_likes').html('<i></i>' + '<span>' + data.result.like_count + '</span>');//赞的个数
        showService(_data.photograph_address);          //显示服务地
        showFollow(_data.follow_state);            //显示是否关注
        showBigBack(_data.banner_photo);               //显示大图    
        showLocaton(_data.address);               //显示所在地
        // showTags(data.result.tag_list);
        isSelf(); //是否本人
        isFollow(_data.follow_state);
        infoTro(_data);
        showDynamicList(dynamic_page);
        judgeHash(); //判断hash
        showAlbumList(1);//显示专辑列表
        showFollowList(1);//显示关注列表
        showFollowerList(1);//显示粉丝
        showPocketList(1)//显示pocket列表
        getActivity(_data.host_domain); //获取活动
        pageCha();
//        console.log('ddd');
        
    }else if(data.error_id==20001){
        window.location.href = '/404';
    }

}


//显示关注状态
function isFollow(data){
    
    var s  = $('.cieclebox_concen');
    if(data == 1){
        s.html('+ 关注');
        s.attr('data_code','互未关注');
        s.removeClass('follow_state_2');
        s.removeClass('follow_state_4');
    }else if(data == 2){
        s.addClass('follow_state_2');
        s.removeClass('follow_state_4');
        s.html('<i></i>已关注');
        s.attr('data_code','已关注');
    }else if(data == 3){
        s.html('+ 关注');
        s.attr('data_code','关注');
        s.removeClass('follow_state_2');
        s.removeClass('follow_state_4');
    }else if(data == 4){
        s.addClass('follow_state_4');
        s.removeClass('follow_state_2');
        s.html('<i></i>已关注');
        s.attr('data_code','互相关注');
    }
}
//显示摄影师简介
function infoTro(data){
    $('.studio-info-intro p').html(data.host_desc);
}

//显示动态

function showDynamicList(pageNo){
    
    base.ajax({
        data:{
            'method': 'paiwo.content.dynamic_list.get',
            'host_domain': host.name,
            'page_no': pageNo,
            'page_size': 8
        },
        success:function(data){
            if(data.error_id==0){
                
//                alert('page '+pageNo);
                
//                console.log('page '+ data.response.page_no);
//                console.dir(data);
                
//                dyPage = pageNo;
                var _data = data.response;
                dyPage = _data.page_no;
                dy_count = _data.count;
                var tm = '';
                var len = 8*pageNo>dy_count?(dy_count-(pageNo-1)*8):8;
                
//                console.log(data);
                
                if(_data.count == 0){
                    if(store.get('studio_tab') == 1){
                        $('.studio-none-hack').show();
                    }
                    
                    if(is_self){
                       $('.studio-none-hack').prepend('<img src="/static/images/cute_bac/no_fans2.jpg">');
                       $('.studio-none-hack p').html('还没有发布过内容');
                        if(top_data.gift == 1){
                       $('.studio-none-hack').append('<p>还没有发布过内容</p><span>去发布<a href="pocket/add"><u>图文</u></a>或者<a href="album/new"><u>影集</u></a>吧！</span>');
                        }else{
                         $('.studio-none-hack').append('<p>还没有发布过内容</p><a href="pocket/add">去发布<u>图文</u>吧！</a></span>');   
                        
                        }
                            
                    }else{
                       $('.studio-none-hack').prepend('<img src="/static/images/cute_bac/no_fans2.jpg">');
                       $('.studio-none-hack').find('img').after('<p>这个人很聪明，什么都没有留下</p>');
                    }
                    $('.studio-con-trend').hide();
                    return;
                }else{
                    $('.studio-none-hack').hide();
                }

                for(var i =0;i<_data.content_list.length;i++){   
                    if(_data.content_list[i].content_type == 1){
                        tm = $.tmpl(stutm.alb_tm,_data.content_list[i]);
                    }else if(_data.content_list[i].content_type == 2){
                        tm=$.tmpl(stutm.poc_tm,_data.content_list[i]);
                    }else if(_data.content_list[i].content_type == 3){ //活动
                        
                        if(!_data.content_list[i].is_delete){ //未删除
                            tm=$.tmpl(stutm.active_tm,_data.content_list[i]);
                        }else{ //已删除
                            tm=stutm.active_del_tm;
                        }
                        
                    }else if (_data.content_list[i].content_type == 5){
                        tm=$.tmpl(stutm.recphoto_tm,_data.content_list[i]);
                    }else if(_data.content_list[i].content_type == 6){
                        tm=$.tmpl(stutm.recpoc_tm,_data.content_list[i]);
                    }                 
                    
                    
                    $('.studio-con-trend').append(tm);  
                }
                
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
}


//显示专辑列表信息
var album_page = 0;
function showAlbumList(page_no){
    var pageSize;
    if(is_self && page_no == 1){
        pageSize = 23;
    }else{
        pageSize = 24;
    }
  
    base.ajax({

            data:{
                'method': 'paiwo.content.album_list.get',
                'host_domain':host.hostName,
                'page_no':page_no,
                'page_size':pageSize
            },

            success:function(data){

                if(data.error_id == 0){
                    var _data = data.response;
                    if(_data.count == 0){
                        $('.studio-con-album .studio-none').show();
                        if(is_self){
                           $('.studio-con-album .studio-none').prepend('<img src="/static/images/cute_bac/blank.png">');
                           $('.studio-con-album .studio-none p').html('还未发布影集');
                           $('.studio-con-album .studio-none a').html('去发布你的第一个<u>影集</u>吧！');
                          
                        }else{
                           $('.studio-con-album .studio-none').prepend('<img src="/static/images/cute_bac/blank.png">');
                           $('.studio-con-album .studio-none p').html('这个人很聪明，什么都没有留下');
                        }
                    }else{
                        $('.studio-con-album .studio-none').hide();
                    }
                    page_no = _data.page_no;
                    var tm = $.tmpl(stutm.album_tm, _data.album_list);
                        $('.content_albumbox').html(tm);
                    
                        if(is_self && _data.count != 0 && page_no == 1){
                            var self_tm = '<li class="self_li">'+
                                                '<a class="content_album_up" href="javascript:;">'+
                                                '<i></i>'+
                                                '<p>上传影集</p>'+
                                            '</a>'
                                        '</li>';
                            $('.content_albumbox').prepend(self_tm);                         
                        }                 
                    album_page = Math.ceil(_data.count/24);
                    var result_list = _data.album_list;
                        for(var i = result_list.length-1;i>=0;i--) {
                            var album_id = result_list[i].album_id;
                            var photo_count = result_list[i].photo_count;
                            album_list[album_id] = photo_count;
                        }
                    if(_data.page_no*_data.page_size<_data.count){
                        album_flag = true;
                    }else{
                        album_flag = false;
                    }
                }
        
            },

            error:function(data){
                slideMessage('网络错误');
            }

        });   
}

//获取pocket列表
var pocket_page = 0;
function showPocketList(pageNo){
    base.ajax({
        data:{
            'method': 'paiwo.content.pocket_list.get',
            'host_domain': host.name,
            'page_no': pageNo,
            'page_size': 10
        },
        success:function(data){
            if(data.error_id==0){
                var _data = data.response,
                    tm = $.tmpl(stutm.pocket_tm,_data.pocket_list);
                if(_data.count == 0){
                        $('.studio-con-pocket .studio-none').show();
                        if(is_self){
                           $('.studio-con-pocket .studio-none').prepend('<img src="/static/images/cute_bac/blank.png">');
                           $('.studio-con-pocket .studio-none p').html('还未发布图文');
                           $('.studio-con-pocket .studio-none').append('<a href="pocket/add">去发布你的第一个<u>图文</u>吧！</a>');
                        }else{
                           $('.studio-con-pocket .studio-none').prepend('<img src="/static/images/cute_bac/blank.png">');
                           $('.studio-con-pocket .studio-none').find('img').after('<p>这个人很聪明，什么都没有留下</p>');
                        }
                        return;
                    }else{
                        $('.studio-con-pocket .studio-none').hide();
                    }
                $('.studio-con-pocket .studio-pocket-main').html(tm);
                pocket_page = Math.ceil(_data.count/10);
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
}

var care_page = 0,
    fan_page = 0;
// 显示关注列表
function showFollowList(pageNo){
    base.ajax({
        data:{
            'method': 'paiwo.user.follow.follow_list.get',
            'host_domain':host.hostName,
            'page_no': pageNo,
            'page_size': 10
        },

        success:function(data){
            if(data.error_id==0){
                 var _data = data.response;
                 if(_data.count == 0){
                        $('.studio-care-main .studio-none').show();
                        if(is_self){
                           $('.studio-care-main .studio-none').html('<p>你还没有关注任何人</p>');
                           $('.studio-care-main .studio-none').prepend('<img src="/static/images/cute_bac/no_fans.png">'); 
                           $('.studio-care-main .studio-none').append('<a href="/photog" target="_blank">去看看哪些人值得关注吧！</a>');
                        }else{
                           $('.studio-care-main .studio-none').html('<p>TA没有关注任何人</p>'); 
                           $('.studio-care-main .studio-none').prepend('<img src="/static/images/cute_bac/no_fans.png">');
                        }
                        return;
                    }else{

                        $('.studio-care-main .studio-none').hide();
                    }
                 var tm = $.tmpl(stutm.follow_tm,_data.user_list.reverse());
                 $('.studio-care-content').html(tm); 
                 care_page = Math.ceil(_data.count/10); 
            }
        },

        error:function(data){
            slideMessage('网络错误');
        }
    });
}


// 显示粉丝
function showFollowerList(pageNo){
    base.ajax({
        data:{
            'method': 'paiwo.user.follow.follower_list.get',
            'host_domain': host.hostName,
            'page_no': pageNo,
            'page_size': 10
        },

        success:function(data){
            if(data.error_id==0){
                var _data = data.response;
                if(_data.count == 0){
                        $('.studio-fans-main .studio-none').show();
                        if(is_self){
                            $('.studio-fans-main .studio-none').html('<p>你还没有被关注，去发布点内容让大家发现你吧！</p>');
                            $('.studio-fans-main .studio-none').prepend('<img src="/static/images/cute_bac/no_fans.png">');
                            if(top_data.gift == 1){     
                                $('.studio-fans-main .studio-none').append('<span>你可以发布<a href="pocket/add"><u>图文</u></a>或者<a href="album/new"><u>影集</u></a></span>');
                                // $('.studio-fans-main .studio-none').prepend('<img src="/static/images/cute_bac/no_fans.png">');    
                            }else{
                              $('.studio-fans-main .studio-none').append('<span><a href="pocket/add">你可以发布<u>图文</u></a></span>');
                              // $('.studio-fans-main .studio-none').prepend('<img src="/static/images/cute_bac/no_fans.png">');
                            }
                           
                            
                            
                            
                            
                        }else{
                           $('.studio-fans-main .studio-none').html('<p>这个人很聪明，没有吸引任何人关注TA</p>');
                           $('.studio-fans-main .studio-none').prepend('<img src="/static/images/cute_bac/no_fans.png">');
                        }
                        return;
                    }else{
                        $('.studio-fans-main .studio-none').hide();
                    }
                var tm = $.tmpl(stutm.follow_tm,_data.user_list.reverse());
                $('.studio-fans-content').html(tm);
                fan_page = Math.ceil(_data.count/10); 
            }
        },

        error:function(data){
            slideMessage('网络错误');
        }
    });
}

//页码跳转
function pageCha() {
     if(care_page <= 1){
        $('.studio-care-main .page').hide();
     }else if(care_page >= 7){
        $('.studio-care-main .page-no').append('<a>1</a><span class="page-none">...</span>') 
        for( var i = 2;i<7;i++){
            $('.studio-care-main .page-no').append('<a>'+i+'</a>');
            $('.studio-care-main .page-no a').eq(0).addClass('page-cur');
        }  
        $('.studio-care-main .page-no').append('<span>...</span><a>'+care_page+'</a>');
     }else if(care_page<7){
        for( var i = 1;i<=care_page;i++){
            $('.studio-care-main .page-no').append('<a>'+i+'</a>');
            $('.studio-care-main .page-no a').eq(0).addClass('page-cur');
        }
    }   

     if(fan_page <= 1){
        $('.studio-fans-main .page').hide();
     }else if(fan_page >= 7){
        $('.studio-fans-main .page-no').append('<a>1</a><span class="page-none">...</span>') 
        for( var i = 2;i<7;i++){
            $('.studio-fans-main .page-no').append('<a>'+i+'</a>');
            $('.studio-fans-main .page-no a').eq(0).addClass('page-cur');
        }  
        $('.studio-fans-main .page-no').append('<span>...</span><a>'+care_page+'</a>');
     }else if(fan_page<7){
        for( var i = 1;i<=fan_page;i++){
            $('.studio-fans-main .page-no').append('<a>'+i+'</a>');
            $('.studio-fans-main .page-no a').eq(0).addClass('page-cur');
        }
    }

     if(pocket_page <=1){
         $('.studio-con-pocket .page').hide();
     }else if(pocket_page >= 7){
        $('.studio-con-pocket .page-no').append('<a>1</a><span class="page-none">...</span>') 
        for( var i = 2;i<7;i++){
            $('.studio-con-pocket .page-no').append('<a>'+i+'</a>');
            $('.studio-con-pocket .page-no a').eq(0).addClass('page-cur');
        }  
        $('.studio-con-pocket .page-no').append('<span>...</span><a>'+pocket_page+'</a>');
     }else if(pocket_page<7){
        for( var i = 1;i<=pocket_page;i++){
            $('.studio-con-pocket .page-no').append('<a>'+i+'</a>');
            $('.studio-con-pocket .page-no a').eq(0).addClass('page-cur');
        }
    }
    
    if(album_page <=1){
         $('.studio-con-album .page').hide();
     }else if(album_page >= 7){
        $('.studio-con-album .page-no').append('<a>1</a><span class="page-none">...</span>') 
        for( var i = 2;i<7;i++){
            $('.studio-con-album .page-no').append('<a>'+i+'</a>');
            $('.studio-con-album .page-no a').eq(0).addClass('page-cur');
        }  
        $('.studio-con-album .page-no').append('<span>...</span><a>'+album_page+'</a>');
     }else if(album_page<7){
        for( var i = 1;i<=album_page;i++){
            $('.studio-con-album .page-no').append('<a>'+i+'</a>');
            $('.studio-con-album .page-no a').eq(0).addClass('page-cur');
        }
    }
}
//增加关注
function addFollow(id){
    base.ajax({

        data:{
            'method': 'paiwo.user.follow.follow',
            'follow_id': id
        },

        success:function(data){
            if(data.error_id == 0){
                var s  = $('.cieclebox_concen');
                if(data.response.follow_state==2){
                    s.addClass('follow_state_2');
                    s.removeClass('follow_state_4');
                    s.html('<i></i>已关注');
                    s.attr('data_code','已关注');
                }else if(data.response.follow_state==4){
                    s.addClass('follow_state_4');
                    s.removeClass('follow_state_2');
                    s.html('<i></i>已关注');
                    s.attr('data_code','互相关注');
                }

                

                // showMessage('关注 '+host.nick+' 摄影师');
            }

        },
        error:function(){
            showMessage('网络错误..');
        }
    });
}

function addFollow2(id){
    base.ajax({

        data:{
            'method': 'paiwo.user.follow.follow',
            'follow_id': id
        },

        success:function(data){
            if(data.error_id == 0){
                var follow_name = $('.studio-fri-care[data='+id+']').parents('.studio-friend-list').find('.photog-name').html();
                // showMessage('关注 '+follow_name+' 摄影师');
            }

        },
        error:function(){
            showMessage('网络错误..');
        }
    });
}

function unFollow(id){

    base.ajax({
        data:{
            'method': 'paiwo.user.follow.un_follow',
            'follow_id': id
        },
        success:function(data){
             if(data.error_id == 0){
                var s  = $('.cieclebox_concen');
                s.removeClass('follow_state_2');
                s.removeClass('follow_state_4');
                if(data.response.follow_state==1){
                    s.html('+ 关注');
                    s.attr('data_code','互未关注');
                }else if(data.response.follow_state==3){
                    s.html('+ 关注');
                    s.attr('data_code','关注');
                }
                
                
                // showMessage('取消关注 '+host.nick+' 摄影师');
            }else{
                
            }
        },
        error:function(){
            showMessage('网络错误..');  
        }
    });

}

function unFollow2(id){

    base.ajax({
        data:{
            'method': 'paiwo.user.follow.un_follow',
            'follow_id': id
        },
        success:function(data){
             if(data.error_id == 0){
                var follow_name = $('.studio-fri-care[data='+id+']').parents('.studio-friend-list').find('.photog-name').html();
                // showMessage('取消关注 '+follow_name+' 摄影师');
            }else{
                
            }
        },
        error:function(){
            showMessage('网络错误..');  
        }
    });

}


//paiwo.user.style.put'

//背景图
var big_back,
    loading_false = false;
var headerBack = $('.header-back-up');

function uploadfile(fileObj){
        if (fileObj != null){
            var base_url = "http://paiwo.oss-cn-hangzhou.aliyuncs.com";
            var FileController = base_url;
            var form = new FormData();
            var flag = false;
           
//            $('.banner_loading').animate({'width':'10%'},200,'swing');
            loading_false = true;
            
            $('.header-back-online li').removeClass('header-back-select');
            
            $('.stuido_header_sign').html('');
            
            headerBack.css({'background':'#000','opacity':0.6});
            headerBack.find('.uploading-state').css('color','#fff').html('上传中...');
            headerBack.show();
            headerBack.find('i').hide();
            headerBack.find('p').hide();
            
            
//             headerBack.addClass('uploaing');
            
            $.ajax({
                async: false,
                type: "POST",
                url: "/a/user/banner/uploadurl/get",
                dataType: 'json',
                success: function(data) {
                    form.append("Signature", data.response.signature);
                    form.append("policy", data.response. policy);
                    form.append("OSSAccessKeyId", data.response.key_id);
                    form.append("key", data.response. object_key);
                    form.append("success_action_status", 201);
                    flag = true;
                },
                error: function() {
                    flag = false;
                }
            });
            
            
            if(flag){
                form.append("file", fileObj);
                var xhr = new XMLHttpRequest();
                xhr.open("post", FileController, false);
                xhr.onload = function () {
                      var obj = $(xhr.response).find("Key").html();
                      big_back= obj;
                };
                xhr.send(form);         
            }else{
				$('.banner_loading').css('width','0%');
                showMessage('网络错误..');
            }
          }
    
    
    
             base.ajax({

                        data:{
                            'method': 'paiwo.user.style.put',
                            'banner_photo': big_back
                        },

                        success:function(data){
                            if(data.error_id == 0){
                               var _loading = $('.banner_loading');
                               var _url = 'http://image.paiwo.co/'+big_back+'@!banner';
                               var oImg = new Image();
                               oImg.src = _url;
                               oImg.onload = function(){
//                                   $('.banner_bg').fadeOut(400);
                                   _loading.animate({'width':'100%'},200,'swing',function(){
                                                    $('.re-choice').show();
                                         _loading.css('width','0%');
                                         $('.header-back-up').fadeOut(400);
//                                         $('.header-back-img').addClass('header-back-select');
                                         $('.banner_bg').attr('data-code',_url).css('background-image','url('+_url+')').fadeIn(400,function(){
                                             loading_false = false;
                                         });
                                         $('.header-back-img').css('background-image','url('+_url+')').fadeIn(400);
                                         $('.header-back-img').attr('data-file',_url);
                                         headerBack.find('.uploading-state').html('本地上传');
                                         headerBack.find('i').show();
                                         headerBack.find('p').show();
//                                         headerBack.removeClass('uploaing');
                                         $('.header-back-img').addClass('uploaing');
                                       
                                       $('.header-back-img').addClass('header-back-select');
                                    });
					           }; 
                            }
                            else {
                                slideMessage("上传错误");
                            }
                        },

                        error:function(data){
                            $('.banner_loading').css('width','0%');
                            slideMessage('网络错误');
                        }

            });

}

//赞
function doLike(target){
    var id = target.attr('data'),
        type = parseInt(target.attr('tit'));
    
    base.ajax({
        
        data:{
            'method': 'paiwo.user.like.add',
            'content_id': id,
            'content_type':type
        },
        
        success:function(data){
            if(data.error_id==0){
              target.removeClass('like-btn').addClass('liked-btn active');
              target.html('<i></i>喜欢');
//                console.log($('.studio-trend-list[data-code="'+id+'"]'));
              $('.studio-trend-list[data-code="'+id+'"]').find('.like-btn').removeClass('like-btn').addClass('liked-btn active').html('<i></i>喜欢');
            }
        },
        
        error:function(data){
            slideMessage('网络错误');
        }
        
    });
    

}

//取消赞
function unLike(target){
    var id = target.attr('data'),
        type = parseInt(target.attr('tit')); 
    
     base.ajax({
        data:{
            'method': 'paiwo.user.like.delete',
            'content_id': id,
            'content_type':type
        },
        success:function(data){
            if(data.error_id==0){
              target.removeClass('liked-btn active').addClass('like-btn');
              target.html('<i></i>喜欢');
              $('.studio-trend-list[data-code="'+id+'"]').find('.liked-btn').removeClass('liked-btn active').addClass('like-btn').html('<i></i>喜欢');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
    
}

//推荐
function doRec(target){
    var id = target.attr('data'),
        type = target.attr('tit'); 
    base.ajax({
        data:{
            'method': 'paiwo.user.recommend.add',
            'content_id':id,
            'content_type':type
        },
        success:function(data){
            if(data.error_id==0){
                target.removeClass('rec-btn').addClass('recd-btn active');
                target.html('<i></i>推荐');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
}

// 取消推荐
function unRec(target){
    var id = target.attr('data'),
        type = target.attr('tit'); 
    base.ajax({
        data:{
            'method': 'paiwo.user.recommend.delete',
            'content_id':id,
            'content_type':type
        },
        success:function(data){
            if(data.error_id==0){
                target.removeClass('recd-btn active').addClass('rec-btn');
                target.html('<i></i>推荐');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
}


//获取活动
function getActivity(domain){
    
     base.ajax({ 
         
            async:true,
         
            data:{
                'method': 'paiwo.user.activity.get',
                'host_domain': domain
            },
         
            success:function(data){
                if(data.error_id==0){
                    var response = data.response,
                        listInfo = response.activity_list,
                        activityTm = '';
                        if(listInfo.length==0){
                            activityTm = '无';
                            studio_active.hide();
                        }else if(listInfo.length<=9){ //活动未超过九个
                            activityTm = $.tmpl(stutm.activity_tm,listInfo);
                            studio_active.find('ul').html(activityTm);
                            studio_active.show();
                        }else{
                            listInfo = listInfo.splice(0,9);
                            activityTm = $.tmpl(stutm.activity_tm,listInfo);
                            studio_active.find('.get-more').show();
                            studio_active.find('ul').html(activityTm);
                            studio_active.show();
                        }
                        
                }
            },
         
            error:function(data){
                slideMessage('网络错误');
            }
        });
}





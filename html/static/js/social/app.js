
(function (){
    
    
var f_time; //最先的
var l_time;
    
var set_a = {index: 1};  //轮播定时器
var set_b = {index: 1};
    
var rec_guy = {max:0, index:0}; //感兴趣的人换一批
    
var main = $('#content_main');
    
var is_loading = false;
    
var com_data;
    
function addHandle(){

    main.on('click', '.re-photo', function(){
        //照片
        var id = $(this).parents('.social-flow-list').attr('data');
        window.open('/photos/'+id);
    });
    
    main.on('click', '.flow-album-cover', function(){

        //影集
        var id = $(this).attr('data');
        window.open('/photo/'+id);
    });
    
    main.on('click', '.flow-album-img li', function(e){
        var id = $(this).attr('data');
         window.open('/photo/'+id);
        e.stopPropagation();
    });
    
    main.on('click', '.social-flow-pocket', function(){
        
        //图文
        var id = $(this).parents('.social-flow-list').attr('data');
        window.open('/pocket/'+id);
    
    });
    
    main.on('click', '.tab_buttons_left', function(){        

        //喜欢
        var t = $(this);
        var id = t.parents('.social-flow-list').attr('data');
        var type = t.parents('.social-flow-list').attr('ctype');
        var data = {};
        data.content_type = type;
        data.content_id = id;
        
        if(t.hasClass('liked-btn')){
            //取消
            if(type == 0){
                data.content_type = t.parents('.social-flow-list').attr('otype');
            }
            
            t.removeClass('liked-btn');
            t.addClass('like-btn');
            data.method = 'paiwo.user.like.delete';
            data.content_type = action_type[data.content_type];
            
        }else{
            if(type == 0){
                return;
            }
            data.content_type = action_type[data.content_type];       
            t.removeClass('like-btn');
            t.addClass('liked-btn');
            data.method = 'paiwo.user.like.add'   
        }
        $.ajax({url:'/rest',data: {data: JSON.stringify(data)},type:'POST',async: false});
    });
    
    main.on('click', '.tab_buttons_right', function(){

        //推荐
        var t = $(this);
        var id = t.parents('.social-flow-list').attr('data');
        var type = t.parents('.social-flow-list').attr('ctype');
        var data = {};
        data.content_type = type;
        data.content_id = id;
        
        if(t.hasClass('recd-btn')){
            //取消
            if(type == 0){
                data.content_type = t.parents('.social-flow-list').attr('otype');
            }
            t.removeClass('recd-btn');
            t.addClass('rec-btn');
            data.method = 'paiwo.user.recommend.delete';
            data.content_type = action_type[data.content_type];
        }else{
            if(type == 0){
                return;
            }

            data.content_type = action_type[data.content_type];       
            t.removeClass('rec-btn');
            t.addClass('recd-btn');
            data.method = 'paiwo.user.recommend.add'   
        }
        $.ajax({url:'/rest',data: {data: JSON.stringify(data)},type:'POST',async: false});
        
    });
    
    
    $('.social-news').on('click', function(){
        //点击更多新鲜事
        $(this).hide();
        getNew();
        
    });
    
    $('.social-hot-point').eq(0).on('click', 'li', function(e){
        var index = $(this).index()+1;
        clearInterval(set_a.t);
        set_a.t = setInterval(movelia, 3000);
        movelia(index);
        
        e.stopPropagation();
        e.preventDefault();
        
    });
    
    
    $('.social-hot-point').eq(1).on('click', 'li', function(e){
        var index = $(this).index()+1;
        clearInterval(set_b.t);
        set_b.t = setInterval(movelib, 3500);
        movelib(index);
        e.stopPropagation();
        e.preventDefault();
    });
    
    $('#changes').on('click', function(){
        
        
        var index = ++rec_guy.index;
        if(index >= rec_guy.max){
            rec_guy.index = 0;
            index = 0;
        }
        
        $('.social-interest-list li').hide().slice(index*3, index*3+3).fadeIn(400);
        
    });
    
    
    $('.social-interest-list').on('click', '.social-interest-add', function(){
        
        
        var data = $(this).attr('data');
        if(top_data.user_id == data){
            showMessage('不能关注自己');
            return;
        }
        
        var d = {};
        d.follow_id = data;
        d.method = 'paiwo.user.follow.follow';
        var t = 2;
        $.ajax({url:'/rest',data: {data: JSON.stringify(d)},type:'POST',async: false, success: function(data){
            t = data.response.follow_state; 
        }});

         $(this).removeClass().addClass('social-interest-added-'+t).html('<i></i>已关注');
        
                
         var a = $('.social-interest-list li').length;
         var b = $('.social-interest-list li:visible').length;
        
        

         $(this).parents('li').fadeOut(400, function(){
              $('.social-interest-list li').eq((rec_guy.index+1)*3).show();
            $(this).remove();

         });
        
         
        rec_guy.max = Math.ceil((a-1)/3);
        
         if(b == 1){
            $('#changes').trigger('click');
         }
        
         if(a <= 4){
            $('#changes').hide();
         }
        
         if(a == 1 ){
            $('.social-interest').fadeOut(400);
         }
        
        
        

        
    });
    
    $('.social-interest-list').on('click', '.social-interest-added-4,.social-interest-added-2', function(){
        var data = $(this).attr('data');
        $(this).removeClass().addClass('social-interest-add').html('+ 关注');
        
        var d = {};
        d.follow_id = data;
        d.method = 'paiwo.user.follow.un_follow';
        
        $.ajax({url:'/rest',data: {data: JSON.stringify(d)},type:'POST',async: false});
    });
    
    
    
    var go_top = $('.pocket-tip');
    go_top.on('click', function(){
        $('body').animate({scrollTop: 0});
    });
    
    $(document).on('scroll', function(){
        var scrollTop =  document.documentElement.scrollTop || document.body.scrollTop;
        
        if(scrollTop == 0){
            go_top.hide();
        }else{
            go_top.show();
        } 
        
        if(scrollTop + document.documentElement.clientHeight+400>document.body.scrollHeight){
            if(!is_loading){
                getOld();
            }
        }else{
            
        }
    });
    
    $('#photos').hover(function(){
        clearInterval(set_a.t);
    }, function(){
        set_a.t = setInterval(movelia, 3000);

    });
    
    
    $('#pocket').hover(function(){
        clearInterval(set_b.t);
    }, function(){
        set_b.t = setInterval(movelib, 3500);    
    });
    
    $('.social-join-close').on('click', function(){
        $('.social-banner').fadeOut(400, function(){
            $(this).remove();
        });
        localStorage.banner =  Date.now();
        
    });
    
}    
    

function getInit(){
    
   
    if(!!localStorage.banner){
         var n = Date.now();
         if(n - localStorage.banner >86400000){
         $('.social-banner').show();
         }
    }else{
        $('.social-banner').show();
    }
    
     $.ajax({ url: '/rest',
              type: 'POST',
              data:  {data:JSON.stringify({method: 'paiwo.feed.feed_list.get',time_stamp: 0, time_flag: 1})},
              dataType: 'json'
            }).then(function(data){
                    if(data.error_id == 0){
                        setContent(data.response.feed_list);
                        f_time = data.response.feed_list[0].feed_time;
                        l_time = data.response.feed_list.slice(-1)[0].feed_time;
                    }
         
                $('.check-new-num').html('');
                $('.check-new-btn').removeClass('check-new-have').addClass('check-new-none');
                 clearInterval(side_check);

            });
    
    
        $.ajax({
                 url: '/rest',
                 type: 'POST',
                 data:  {
                       data:JSON.stringify({method: 'paiwo.feed.feed_recommend.get'})
                        },
                 dataType: 'json'
        }).then(function(data){
                if(data.error_id == 0){
                    com_data = data.response;
                    setUserInfo(data.response);
                }
        });
    
    
}
function setUserInfo(data){
    data.user_avatar = data.user_avatar =="" ? 0 : data.user_avatar;
    $('.social-info-ava img').attr('src', 'http://image.paiwo.co/'+ data.user_avatar);
    $('.social-info-ava').attr('href',data.user_domain);
    $('.social-info-name').html(data.user_name);
    $('.dynamic-count').html(data.dynamic_count);
    $('.follow-count').html(data.follow_count);
    $('.follower-count').html(data.follower_count);
    $('.social-info-tab a').attr('href', '/'+data.user_domain+ '#friends');
    $('.social-info-tab a').eq(0).attr('href', '/'+data.user_domain);
    
    setRecUsers(data.user_list);
    setRecPocket(data.pocket_list);
    setRecPhotos(data.photo_list.slice(0,4));
    setCreate();
    
    
}
function setCreate(){
    if(top_data.gift == 1){
        $('.social-create-album').show();
        $('.social-create>span').show();   
    }else{
        $('.social-create-pocket').css('margin-left','52px');
    }
}
    
function setRecUsers(data){
    
    if(data.length == 0){
        $('.social-interest').remove();
        return;
    }
     $('.social-interest').show();
    if(data.length <= 3){
        $('#changes').hide();
    }
    
    rec_guy.max = Math.ceil(data.length/3);
    var tm = $.tmpl(rec_photogs, data);
    tm.hide();
    tm.slice(0, 3).show();
    $('.social-interest-list').html(tm);
}
function setRecPocket(data){
    var tm = '<li>'+
            '<a href="/pocket/${pocket_id}" target="_blank">'+
            '<img src="http://image.paiwo.co/${pocket_cover_photo}'+base.retinaPixel['w280h200']+'" width="240" height="180"></a>'+
            '<span class="social-hot-pocket"><i>${pocket_title}</i></span>'+
            '</li>';
         data[data.length] = data[0];
    var d = $.tmpl(tm, data);    
    $('#pocket').html(d);
}
function setRecPhotos(data){
    var tm = '<a href="/photo/${photo_id}" target="_blank"><li>'+
            '<img src="http://image.paiwo.co/${photo_path}'+base.retinaPixel[280]+'" width="240" height="240">'+
            '</li></a>';
     data[data.length] = data[0];
    var d = $.tmpl(tm, data);
    $('#photos').html(d);
    
}
    
    
function setContent(data_ar, type){
    var tm = $();
    data_ar.forEach(function(t){
    t.content = JSON.parse(t.content);
    t.content.user_name = t.user_name;
    t.content.feed_time = t.feed_time;
    t.content.user_domain = t.user_domain;
    t.content.user_avatar = t.user_avatar== ''? 'http://image.paiwo.co/0':'http://image.paiwo.co/'+t.user_avatar;
    t.content.content_type = t.content_type;
    if(t.content.is_delete){
        //删除
        t.content.action = content_text[t.content_type];
        t.content.type = t.content_type;
        t.content.content_type = 0;
    }
        
    if(t.content_type ==1 && !t.content.is_delete){
        //相册
        t.content.cover_photo = 'http://image.paiwo.co/' + t.content.photo_list[0].photo_path;
        t.content.cover_photo_id = t.content.photo_list[0].photo_id;
    }
        
    tm = tm.add($.tmpl(template_ar[t.content.content_type], t.content));
                    
    });
    
    if(type){
        tm.hide();
        main.prepend(tm);
        tm.fadeIn();
    }else{
        main.append(tm);
    }   
}
    
    
var content_text = ['', '发布了相册', '发布了图文', '参加了活动', '加入了组织', '推荐了照片', '推荐了图文', '推荐了活动', '推荐了组织'];    
var action_type= ['', '', 2, '', '', 1, 2];    
    
getInit();
addHandle();


    
function getOld(){
    //获取之前内容
    if(!l_time){
        return;
    }
    
    is_loading = true;
     $.ajax({ url: '/rest',
              type: 'POST',
              data:  {data:JSON.stringify({method: 'paiwo.feed.feed_list.get',time_stamp: l_time, time_flag: 1})},
              dataType: 'json'
            }).then(function(data){
                    if(data.error_id == 0 && data.response.feed_list.length!= 0){
                        setContent(data.response.feed_list);
                        l_time = data.response.feed_list.slice(-1)[0].feed_time;
                        if(data.response.feed_list.length!= 10){
                            return;
                        }
                         is_loading = false;         
                    }
            });
}
    
function getNew(){
    
    //获取最新内容
        if(!f_time){
            return;
        }
    
    
         $.ajax({ url: '/rest',
              type: 'POST',
              data:  {data:JSON.stringify({method: 'paiwo.feed.feed_list.get',time_stamp: f_time, time_flag: 2})},
              dataType: 'json'
            }).then(function(data){
                    if(data.error_id == 0 && data.response.feed_list.length!= 0){
                        setContent(data.response.feed_list, true);
                        f_time =  data.response.feed_list[0].feed_time;
                    }
            });
}

    
function movelia(ii){
    if(ii){
        set_a.index = ii;
    }else{
         set_a.index++;
    }
    if(set_a.index == 5){
        
        $('#photos').animate({left: -(set_a.index-1)*240}, function(){
            $(this).css({left:0});    
            
        });
        set_a.index = 1;
    }else{
        $('#photos').animate({left: -(set_a.index-1)*240})
    }
    
    var t = $('.social-hot-point').eq(0).find('li');
    t.removeClass('social-album-cur').eq(set_a.index-1).addClass('social-album-cur');
    
}
    
function movelib(ii){
     if(ii){
        set_b.index = ii;
    }else{
         set_b.index++;
    }
    
   if(set_b.index == 5){
        $('#pocket').animate({left: -(set_b.index-1)*240}, function(){
        $(this).css({left:0});    
        });
       set_b.index = 1;
    }else{
        $('#pocket').animate({left: -(set_b.index-1)*240})
    }
     var t = $('.social-hot-point').eq(1).find('li');
    t.removeClass('social-pocket-cur').eq(set_b.index-1).addClass('social-pocket-cur');
    
}
                             
function checkNew(){
    //检测是否有信息
       $.ajax({
                 url: '/rest',
                 type: 'POST',
                 data:  {
                       data:JSON.stringify({method: 'paiwo.feed.feed_info.get'})
                        },
                 dataType: 'json'
        }).then(function(data){
                if(data.error_id == 0 &&data.response.unread_count != 0){
                    $('.social-news').show();
                    $('.social-news-num').html(data.response.unread_count);
                }
           
          

        });
}
//setInterval(checkNew, 60000)//5分钟
    
setInterval(checkNew, 500000);
set_a.t = setInterval(movelia, 3000);
set_b.t = setInterval(movelib, 3500);    
    
    
})();

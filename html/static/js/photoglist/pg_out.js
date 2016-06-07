var count = 0,//推荐摄影师总数
    page_num = 1,//摄影师页数
    page_size = 9,
    page_sum = 0,
    page_max = 0,
    post_data = {},//当期的数据
    find_tm = '<li class="find-block">'+
	        '<div class="find-photog-text">'+
	      	  '<a href="/photog/${post_id}" class="photog-ul-img"><img width="200" height="200" src="http://image.paiwo.co/${post_cover_photo}'+base.retinaPixel['200']+'"></a>'+
	      	  '<div class="find-photog-intro">'+
	      	    '<h3 class="photog-intro-title"><a href="/photog/${post_id}">${post_title}</a></h3>'+
	      	    '<a class="photog-intro-name" href="/${user_domain}" target="_blank">@${user_name}</a>'+
	            '<h5 class="recommend-h5">${post_date}</h5>'+
	          '</div>'+
        '</div>'+
    '<p class="find-photog-intro photog-intro" data="${post_id}">${filterChar(post_ab)}</p>'+	
	      '</li>';

 var photog_tm  ='<li>'+
		        '<a class="search_pg_head_img" target="_blank" href="${user_host}">'+
				'{{if avatar == 0}}'+
				   '<img src="static/images/user_head.gif" width="60" height="60">'+
				'{{else}}'+
					'<img src="http://image.paiwo.co/${avatar}" width="60" height="60">'+
				'{{/if}}'+
				'</a>'+
		        '<dl>'+
		          '<dt><a target="_blank" href="${user_host}">${filterChars(nick_name)}</a>'+
					'{{if gender == 1}}'+
						'<i class="photog-male"></i>'+
					'{{else}}'+
					'<i class="photog-fmale"></i>'+
					'{{/if}}'+
					'</dt>'+
		          '<dd>相册<span>${album_count}</span></dd>'+
		        '</dl>'+
			'{{if is_follow ==1}}'+
		       '<a class="photog_added" data="${userid}" xs="${nick_name}">'+
				  '<i>已关注</i></a>'+
			     '{{else}}'+
				'<a class="photog_add" data="${userid}" xs="${nick_name}">'+
                 '<i></i></a>'+
				'{{/if}}'+
		      '</li>';

var photog_rank ='<li class="photog-hover-none">'+
              //'<div class="photog-li"><span>${index}</span>${nick_name}<i></i></div>'+
           '<div class="photog-li"><span>${index}</span>${filterChars(user_name)}</div>'+
              '<div class="photog-li-hover">'+
                '<span>${index}</span>'+
        '<a class="search_pg_head_img" target="_blank" href="${user_domain}">'+
    '<img src="http://image.paiwo.co/${avatar}" width="60" height="60"></a>'+
                '<dl>'+
                  '<dt><a target="_blank" href="${user_domain}">${filterChars(user_name)}</a>'+
                    '{{if gender == 1}}'+
                    '<i class="photog-male"></i>'+
                        '{{else}}'+
                    '<i class="photog-fmale"></i>'+
                    '{{/if}}'+
                    '</dt>'+
                  '<dd>相册<span>${album_count}</span></dd>'+
                '</dl>'+
                '{{if follow_state  == 1 || follow_state  == 3}}'+
                '<a class="photog_add" data="${user_id}"><i></i></a>'+
                '{{else follow_state  == 2 }}'+
                '<a class="photog_added" data="${user_id}"><i>已关注</i></a>'+    
                '{{else follow_state  == 4 }}'+
                '<a class="photog_added" data="${user_id}" style="width:50px;"><i>互相关注</i></a>'+ 
                '{{/if}}'+        
              '</div>'+
            '</li>';


var pageCore = {
        data: {},
        tool: {},
        push: function(name, fn){
            
            //储存一些工具函数
            this.tool[name] = fn;
        },
        bind: function(selector, fn){
            
            //页面绑定click事件
            this.data.main.on('click', selector, fn);
        },
        init: function(){
            
            //初始化函数
            
        }
        
}
        main = $('.recommend-main');
        pageCore.data.main = main;
    
        pageCore.bind('#pre', function(){
            if(page_num == 1){
                return;
            }
            getPrePage(--page_num);
        });
        
        pageCore.bind('#next', function(){
             if(page_num == page_sum){
                    return;
             }
            
             if(page_num < page_max){
                getNextPage(++page_num);    
             }else{
                var n = page_num*page_size;
                $('.find-block').slice(n-page_size, n).hide();
                getMore(++page_num);
             }
        });
    
        pageCore.bind('.banner-black-bac,.recommend-banner-text', function(){
             window.location = '/photog/'+post_data.post_id;
        });
        
        pageCore.bind('.photog-intro', function(){
             var id = this.getAttribute('data')
             window.location = '/photog/'+id;
        });

   
    

    $('.hot-photog-left').on('mouseenter','li',function(){
        $(this).removeClass('photog-hover-none').addClass('hot-photog-left-licur').siblings('li').removeClass('hot-photog-left-licur').addClass('photog-hover-none');
  }); 


    $('#hot_rank').on('mouseleave', function(){
        la.filter('.hot-photog-left-licur').removeClass().addClass('photog-hover-none');
        la.eq(0).removeClass('photog-hover-none').addClass('hot-photog-left-licur')
    });

    $('#active_rank').on('mouseleave', function(){
        lb.filter('.hot-photog-left-licur').removeClass().addClass('photog-hover-none');
        lb.eq(0).removeClass('photog-hover-none').addClass('hot-photog-left-licur');
    });

    $('#new_rank').on('mouseleave', function(){
        lc.filter('.hot-photog-left-licur').removeClass().addClass('photog-hover-none');
        lc.eq(0).removeClass('photog-hover-none').addClass('hot-photog-left-licur');
    });

    



     init();

    var rankWrap = $('#rank_wrap');
    //关注
    rankWrap.on('click', '.photog_add', function(){
        if(top_data.is_login == 0){
//            showMessage('请先登录');
			loginInside.show();
            return;
        }
        var id  = this.getAttribute('data');
//        var url = '/a/photographer/follow',
//            data = {photographer_id : id},
//            async = false,
//            fn = function(data){
//                $('.photog_add[data="'+id+'"]').removeClass().addClass('photog_added').html('<i>已关注</i>');
//            }
//        commonAjax(url, data, fn, async);
        
        
            base.ajax({

                data:{
                    'method': 'paiwo.user.follow.follow',
                    'follow_id': id
                },

                success:function(data){
                    if(data.error_id == 0){
                        $('.photog_add[data="'+id+'"]').removeClass().addClass('photog_added').html('<i>已关注</i>');
                    }
                },

                error:function(data){
        //            slideMessage('网络错误');
                }

            });
    
    });
    //取消关注
    rankWrap.on('click', '.photog_added', function(){
        var id  = this.getAttribute('data');
//        var url = '/a/photographer/unfollow',
//            data = {photographer_id : id},
//            async = false,
//            fn = function(data){
//                $('.photog_added[data="'+id+'"]').removeClass().addClass('photog_add').html('<i></i>');
//            }
//        commonAjax(url, data, fn, async);
        
        
           base.ajax({

                data:{
                    'method': 'paiwo.user.follow.un_follow',
                    'follow_id': id
                },

                success:function(data){
                    if(data.error_id == 0){
                       $('.photog_added[data="'+id+'"]').removeClass().addClass('photog_add').html('<i></i>');
                    }
                },

                error:function(data){
        //            slideMessage('网络错误');
                }

            });
    
    });
	
 var la = $('#hot_rank>li'),
     lb = $('#active_rank>li'),
     lc = $('#new_rank>li');

removeBorder();


/*******************************函数**************************************/

//初始化
function init(){
    getMore(1);
    showPageNavi(count);//现实导航
    showRecommend();
    getRanks();

}

function removeBorder(){
    la.eq(0).css('border-top','none');
    la.last().css('border-bottom','none');
    
    lb.eq(0).css('border-top','none');
    lb.last().css('border-bottom','none');
    
    lc.eq(0).css('border-top','transparent');
    lc.last().css('border-bottom','transparent');
    
}
function getRanks(){
//    var url = '/a/photographer/list/get',
//        data = {},
//        async = false,
//        fn = function(data){
//            if(data.error_id == 0){
//                indexData(data.result.photographer_hot_list);
//                indexData(data.result.photographer_live_list);
//                indexData(data.result.photographer_most_list);
//                
//       
//                $('#hot_rank').append($.tmpl(photog_rank, data.result.photographer_hot_list));
//                $('#active_rank').append($.tmpl(photog_rank, data.result.photographer_most_list));
//                $('#new_rank').append($.tmpl(photog_rank, data.result.photographer_live_list));
//
//                 $('#hot_rank>li').eq(0).removeClass().addClass('hot-photog-left-licur');
//                $('#active_rank>li').eq(0).removeClass().addClass('hot-photog-left-licur');
//                $('#new_rank>li').eq(0).removeClass().addClass('hot-photog-left-licur');
//                
//            }
//        }
    
    
//    commonAjax(url, data, fn, async);
    
    base.ajax({
         
        data:{
            'method': 'paiwo.photographer.list.get'
        },
         
        success:function(data){
            if(data.error_id == 0){
                
                
                var pgList = data.response.photographer_list,
                    photographer_hot_list = [],
                    photographer_most_list = [],
                    photographer_live_list = [];
                   
                
                for(var i=0;i<pgList.length;i++){
                    if(pgList[i].flag==1){
                        photographer_hot_list.push(pgList[i]);
                    }else if(pgList[i].flag==2){
                        photographer_most_list.push(pgList[i]);
                    }else if(pgList[i].flag==3){
                        photographer_live_list.push(pgList[i]);
                    }
                }
                
                
                
                indexData(photographer_hot_list);
                indexData(photographer_live_list);
                indexData(photographer_most_list);
                
                $('#hot_rank').append($.tmpl(photog_rank, photographer_hot_list));
                $('#active_rank').append($.tmpl(photog_rank, photographer_most_list));
                $('#new_rank').append($.tmpl(photog_rank, photographer_live_list));

                $('#hot_rank>li').eq(0).removeClass().addClass('hot-photog-left-licur');
                $('#active_rank>li').eq(0).removeClass().addClass('hot-photog-left-licur');
                $('#new_rank>li').eq(0).removeClass().addClass('hot-photog-left-licur');
                
            }else{
//                slideMessage('网络错误');
            }
        },
         
        error:function(data){
//            slideMessage('网络错误');
        }
         
    });
}

    

//获取更多推荐
function getMore(num){
    
//    $.ajax({
//		url: '/a/recommend/photographer/post/list/get',
//		type: 'POST',
//		dataType: 'json',
//        async: false,
//		data: {page_no: num,
//			   page_size:page_size},
//		success: function(data){
//                if(data.error_id == 0){
//                    count = data.result.count;
//                   
//                   var tm = $.tmpl(find_tm, data.result.post_list);
//                    tm.hide();
//                    $('.find-photog-ul').append(tm);
//                    tm.fadeIn(300);
//                        page_max++;
//                        $('#cur_p').html(page_max);
//                }else{
//                
//                }
//        }	   
//	});
    
    
     base.ajax({
         
        data:{
            'method': 'paiwo.photographer.post_list.get',
            'page_no':num,
            'page_size':page_size
        },
         
        success:function(data){
            if(data.error_id == 0){
                count = data.response.count;

               var tm = $.tmpl(find_tm, data.response.post_list);
                tm.hide();
                $('.find-photog-ul').append(tm);
                tm.fadeIn(300);
                page_max++;
                $('#cur_p').html(page_max);
                
            }else{
//                slideMessage('网络错误');
            }
        },
         
        error:function(data){
//            slideMessage('网络错误');
        }
         
    });
    
    
    
    
    

}

//显示前一页
function getPrePage(num){
   var n = num*page_size;
   var t = $('.find-block');
    t.slice(n, n+page_size).hide();
    t.slice(n-page_size, n).fadeIn(300);
    $('#cur_p').html(num);
     
}

//显示后一页
function getNextPage(num){
    var n = (num-1)*page_size;
    var t = $('.find-block');
    t.slice(n-page_size, n).hide();
    t.slice(n, n+page_size).fadeIn(300);
    $('#cur_p').html(num);
    
}

//显示导航页数
function showPageNavi(count){
    page_sum = parseInt(count/page_size);
        if(page_sum*page_size<count){
            page_sum ++;
            
        }
    $('#sum_p').html(page_sum);

}



//显示当期推荐
function showRecommend(){
//    $.ajax({
//		url: '/a/recommend/photographer/post/top/get',
//		type: 'POST',
//		dataType: 'json',
//        async: false,
//		success: function(data){
//                if(data.error_id == 0){
//                    post_data = data.result;
//                    $('#abaner').css({'background-image':'url(http://image.paiwo.co/'+post_data.big_photo+'@!banner)'});
//                    $('#adate').html(post_data.post_date.replace(/\-/gi, '/'));
//                    $('#a_nick').html(post_data.nick_name);         
//                    if(post_data.avatar != 0){
//                        $('#ahead').attr('src','http://image.paiwo.co/'+post_data.avatar);
//                    }else{
//                        $('#ahead').attr('src','/static/images/user_head.gif');
//                    }
//                    
//                    $('.photog-head').attr('href','/'+post_data.user_host);
//                    $('#a_nick').attr('href','/'+post_data.user_host);
//                    $('#atitle').html(post_data.post_title);
//                    $('#btitle').html(post_data.post_second_title);
//                    $('#aab').html(post_data.post_ab).attr('data',post_data.post_id);
//					
//                }
//        }	   
//	});
    
    
    
    base.ajax({
         
        data:{
            'method': 'paiwo.photographer.top_post.get'
        },
         
        success:function(data){
            
            if(data.error_id == 0){
                post_data = data.response;
                $('#abaner').css({'background-image':'url(http://image.paiwo.co/'+post_data.post_cover_photo+'@!banner)'});
                $('#adate').html(post_data.post_date.replace(/\-/gi, '/'));
                $('#a_nick').html(post_data.user_name);         
                if(post_data.avatar != 0){
                    $('#ahead').attr('src','http://image.paiwo.co/'+post_data.avatar);
                }else{
                    $('#ahead').attr('src','/static/images/user_head.gif');
                }

                $('.photog-head').attr('href','/'+post_data.user_domain);
                $('#a_nick').attr('href','/'+post_data.user_domain);
                $('#atitle').html(post_data.post_title);
                $('#btitle').html(post_data.post_second_title);
                $('#aab').html(post_data.post_ab).attr('data',post_data.post_id);

            }else{
//                slideMessage('网络错误');
            }
            
        },
         
        error:function(data){
//            slideMessage('网络错误');
        }
         
    });
    
    


}

    function filterChar(str){

        if(str.length>48){
            return str.slice(0,46)+'...';
        }
        return str;
    }
    
    

    function filterChars(str){
        var count = 0;
        var tm = '';
        if(str.length<6){
            return str;	
        }
        for(var i = 0; i<str.length; i++){
            if(str.charCodeAt(i)>255){
                count+=14;
            }else{
                count+=7.5;
            }
            tm+=str[i];
            if(count >=84){
                return tm+='..';	
            }	
        }	
        return tm;	
    }
    
    function indexData(data){
        var index;
        for(var i =0; i<data.length; i++){
            index = i+1;
            data[i].index = ('0'+index).slice(-2);
        }
    }


    function unFollow(target){

            var url = '/a/photographer/follow',
                data = {photographer_id: id},
                fn = function(data){},
                async = false;

                commonAjax(url, data, fn, async);

    }

    function doFollow(target){

        var url = '/a/photographer/follow',
            data = {photographer_id: id},
            fn = function(data){},
            async = false;

            commonAjax(url, data, fn, async);
    }



    var setM = null;
    function showMessage(content){
        clearTimeout(setM);
        $('.setting_succeed').html(content).animate({top:0}, 400, function(){
                setM = setTimeout(hideMessage, 1800);
        });
    }
    function hideMessage(){
        $('.setting_succeed').animate({top:'-40px'},400);
    }



    function commonAjax(url, data, fn, async){
        $.ajax({
              url: url,
              type: 'POST',
              async: false,
              dataType: 'json',
              data: data,
              success: fn
           });
    }
    
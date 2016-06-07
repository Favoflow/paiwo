var count = 0,//推荐摄影师总数
    page_num = 1,//摄影师页数
    page_size = 9,
    page_sum = 0,
    page_max = 0,
    point_host= 0,  //当期
    main = $('.recommend-main'),
    find_tm = '<li class="find-block">'+
	        '<div class="find-photog-text">'+
	      	  '<a href="/photog/${post_id}" class="photog-ul-img"><img width="200" height="200" src="http://image.paiwo.co/${post_big_photo}@!280x280"></a>'+
	      	  '<div class="find-photog-intro">'+
	      	    '<h3 class="photog-intro-title"><a href="/photog/${post_id}">${post_title }</a></h3>'+
	      	    '<a class="photog-intro-name" href="/${user_host}" target="_blank">@${nick_name}</a>'+
	            '<h5 class="recommend-h5">${post_date }</h5>'+
	          '</div>'+
        '</div>'+
    '<p class="find-photog-intro photog-intro">${filterChar(post_ab)}</p>'+	
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


jQuery(function($){
        var main2 = $('.search_pg_photobox');
        
    
        
        $('.search_photog_follow').on('click', function(){
                window.location = '/photoglist';
            
        
        });
    
        $('#a_nick').on('click', function(){
            
                //$('.photog-head').trigger('click');
                

        });
        
        //关注
        main2.on('click', '.photog_add', function(){
                //window.location = '/'
                if(is_login == 0){
                    showMessage('请先登录');
                    return;
                }
                doFollow(this);
                
        });
        
        //取消关注
        main2.on('click', '.photog_added', function(){
                unFollow(this);
        
        });
       
	       
        main.on('click','#pre', function(){
                    if(page_num == 1){
                        
                        return;
                    }
            
                    getPrePage(--page_num);
        });
    
        main.on('click','#next', function(){
                    if(page_num == page_sum){
                    
                        return;
                    }
                    if(page_num < page_max){
                        getNextPage(++page_num);    
                    }else{
                        var n = page_num*page_size;
                        var t = $('.find-block');
                        
                        t.slice(n-page_size, n).hide();
                        
                        getMore(++page_num);
                    }
        });
        
        //跳转到当期
        main.on('click', '.banner-black-bac,.recommend-banner-text', function(){
                window.location = '/photog/'+point_host;
        
        });
        
        
    

        
     init();   
	
});

//初始化
function init(){
    getMore(1);
    showPageNavi(count);
    showRecommend();
    showRes();
}

//获取更多推荐
function getMore(num){
    $.ajax({
		url: '/a/recommend/photographer/post/list/get',
		type: 'POST',
		dataType: 'json',
        async: false,
		data: {page_no: num,
			   page_size:page_size},
		success: function(data){
                if(data.error_id == 0){
                    count = data.result.count;
                   
                   var tm = $.tmpl(find_tm, data.result.post_list);
                    tm.hide();
                    $('.find-photog-ul').append(tm);
                    tm.fadeIn(300);
                        page_max++;
                        $('#cur_p').html(page_max);
                }else{
                
                }
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


function showPageNavi(count){
    page_sum = parseInt(count/page_size);
        if(page_sum*page_size<count){
            page_sum ++;
            
        }
    $('#sum_p').html(page_sum);

}

//显示当期推荐
function showRecommend(){
    $.ajax({
		url: '/a/recommend/photographer/post/top/get',
		type: 'POST',
		dataType: 'json',
        async: false,
		success: function(data){
                if(data.error_id == 0){
                    
                    $('#abaner').css({'background-image':'url(http://image.paiwo.co/'+data.result.big_photo+'@!banner)'});
                    $('#adate').html(data.result.post_date.replace(/\-/gi, '/'));
                    $('#a_nick').html(data.result.nick_name);
                    if(data.result.avatar != 0){
                        $('#ahead').attr('src','http://image.paiwo.co/'+data.result.avatar);
                    }else{
                        $('#ahead').attr('src','/static/images/user_head.gif');
                    }
                    
                    $('.photog-head').attr('href','/'+data.result.user_host);
                    $('#a_nick').attr('href','/'+data.result.user_host);
                    $('#atitle').html(data.result.post_title);
                    $('#btitle').html(data.result.post_second_title);
                    $('#aab').html(data.result.post_ab);
                    point_host = data.result.post_id;
                }else{
                
                }
        }	   
	});

}

//过滤字符串
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

function showRes(){
    $.ajax({
		  url:'/a/photographer/list/get',
		  type:'POST',
		  dataType:'json',
		  data:{page_no: 1,
			    page_size: 20},
		  success:function(data){
		  		if(data.error_id == 0){
                	
                    var tm = $.tmpl(photog_tm,data.result.photographer_list);
						$('.search_pg_photobox').html(tm);

				}else{
					showMessage('网络错误..');	
				}
		  }
	})

}

function unFollow(target){
    var id = target.getAttribute('data');
        $.ajax({
            url:'/a/photographer/unfollow',
		  type:'POST',
		  dataType:'json',
          async:false,
		  data:{photographer_id:id},
		  success:function(data){
		  	if(data.error_id == 0){

				var name = target.getAttribute('xs');
                $(target).removeClass().addClass('photog_add').find('i').html('');
				
				showMessage('取消关注 '+name+' 摄影师');
			}else{
				
			}
		  },
		error:function(){
			showMessage('网络错误..');	
		}
	})

}

function doFollow(target){
    var id = target.getAttribute('data');
    	$.ajax({
		  url:'/a/photographer/follow',
		  type:'POST',
          async:false,
		  dataType:'json',
		  data:{photographer_id:id},
		  success:function(data){
		  	if(data.error_id == 0){
				var name = target.getAttribute('xs');
                $(target).removeClass().addClass('photog_added').find('i').html('已关注');
				
				
				showMessage('添加关注 '+name+' 摄影师');
			}else{
				showMessage('网络错误..');		
			}
		  
		  },
		 error:function(){
		 	showMessage('网络错误..');
		 }
	});

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
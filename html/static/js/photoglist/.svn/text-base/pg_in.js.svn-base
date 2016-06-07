var  post_id = 0,
//     post_name,
     host_id = 0,
     post_data = null,
     mes_reply = 0,
     mes_name = '',
     reply_tm = '<li>'+
		        '<div data="${comment_user.user_id}" dname="${comment_user.nick_name}" class="content_list_resend">'+
		          '<p data="${comment_user.user_id}" dname="${comment_user.nick_name}" class="reply_some">回复</p>'+
		        '</div>'+
		        '<div class="content_list_headimg">'+
		          '<a class="content_list_headimg_a">'+
		            '<img src="${showAvatar(comment_user.avatar)}" width="60" height="60" host="${comment_user.user_host}">'+
		          '</a>'+
		        '</div>'+
		        '<dl>'+
		          '<dt>'+
		            '<a class="snick"  target="_blank" href="/${comment_user.user_host}">${comment_user.nick_name}</a>'+
		            '<span>${comment_time }</span>'+
		          '</dt>'+
		          '<dd>{{html showText(comment_text, reply_user)}}</dd>'+
		        '</dl>'+
		      '</li>';

    reply_now_tm = '<li>'+
		        '<div data="${user_id}" dname="${nick_name}" class="content_list_resend">'+
		          '<p data="${user_id}" dname="${nick_name}" class="reply_some">回复</p>'+
		        '</div>'+
		        '<div class="content_list_headimg">'+
		          '<a class="content_list_headimg_a">'+
		            '<img src="${showAvatar(avatar)}" width="60" height="60" host="${user_host}">'+
		          '</a>'+
		        '</div>'+
		        '<dl>'+
		          '<dt>'+
		            '<a class="snick" target="_blank" href="/${user_host}">${nick_name}</a>'+
		            '<span>刚刚</span>'+
		          '</dt>'+
		          '<dd>{{html showText2(comment_text, rename)}}</dd>'+
		        '</dl>'+
		      '</li>';
var share_pic = null,
    share_weibo = null;

function showText(data, reply){
    if(reply.user_id == 0){
        return data;
    }
    return '<span class="reply_obj" dn="'+reply.nick_name+'" di="'+reply.user_id+'">@'+reply.nick_name+' </span> '+data;
}
function showText2(data, name){
    if(name == ''){
        return data;
    }
    return '<span class="reply_obj" dn="'+mes_name+'" di="'+mes_reply+'">@'+name+' </span> '+data;
}
function showAvatar(data){
    if(data != '0'){
        return 'http://image.paiwo.co/'+data;
    }else{
        return '/static/images/user_head.gif';
    }
}
function showNick(data){
    return data.nick_name;
}



jQuery(function($){

    var main = $('.recommend-main');
    
    $('.cur-recommend').on('click', function(){
        window.location = '/photog';
    })
    //点击私信
    $('.sendM').on('click', function(e){
        e.stopPropagation();
        if(is_login == 0){
//            showMessage('请先登录');
			loginInside.show();
            return;
        }else{
            PWS.addTalk(post_data.userid);
            $('#top_message').trigger('click');
            
        }
    });
    
    //点击关注
    $('.followM').on('click', function(e){
            if(is_login == 0){
//                showMessage('请先登录');
				loginInside.show();
                return;
            }
           if(this.innerHTML == '已关注'){
                 unFollow();
           }else{
                 doFollow();
           }
    
    });
    $('.pg-article-headimg').on('click', function(){
            window.open('/'+post_data.user_domain );
    });
    //点击评论
    main.on('click', '#send_reply', function(){
        if(is_login == 0){
			loginInside.show();
			return false;
        }
        var comment = document.getElementById('reply_text').value;
        if(comment.length == 0){
            //showMessage('评论内容太短');
			showMessage('请输入评论内容');
            return false;
        }
        addComment(comment);

    });
    
    //点击回复某人
	//modified:摄影师文章内页，当用户未登录的时候，点击回复应该在页面顶部提示“未登录”
    main.on('click', '.content_list_resend', function(){
		if(is_login == 0){
//			showMessage('请先登录');
			loginInside.show();
			return false;
		}
            mes_reply = this.getAttribute('data');
            var name = this.getAttribute('dname');
            mes_name = name;
            $('#red_reply').html('@ '+name).fadeIn(400);
    });
    //main.on('click', '.content_list_resend', function(){
    //    $(this).find('p').trigger('click');
    //});
    
    //内容里面回复某人
    main.on('click', '.reply_obj', function(){
        mes_reply = this.getAttribute('di');
        mes_name = this.getAttribute('dn');
        $('#red_reply').html('@ '+mes_name).fadeIn(400);
    });
    
    //取消回复某人
    main.on('click', '#red_reply', function(){
        $(this).fadeOut(400);
        mes_reply = 0;
        mes_name = '';
    });
    
    
    //点击评论头像进入主页
    main.on('click', '.content_list_headimg_a', function(){
        var host = $(this).find('img').attr('host');
        if(host){
            window.open('/'+host);
        }else{
            showMessage('非摄影师用户');
        }
        
    });
    


init();
});
function unFollow(){
    
//     $.ajax({
//		  url:'/a/photographer/unfollow',
//		  type:'POST',
//		  dataType:'json',
//		  data:{photographer_id:post_data.userid },
//		  success:function(data){
//		  	if(data.error_id == 0){
//				
//
//				showMessage('取消关注 '+post_data.nick_name+' 摄影师');
//                $('.followM').html('关注');
//			}else{
//				
//			}
//		  },
//		error:function(){
//			showMessage('网络错误..');	
//		}
//	});
    
    
    base.ajax({
         
        data:{
            'method': 'paiwo.user.follow.un_follow',
            'follow_id':post_data.user_id
        },
         
        success:function(data){
            if(data.error_id == 0){
				showMessage('取消关注 '+post_data.user_name+' 摄影师');
                $('.followM').html('关注');
			}
        },
         
        error:function(data){
//            slideMessage('网络错误');
        }
         
    });
    
}
function doFollow(){
    
//    $.ajax({
//	  url:'/a/photographer/follow',
//	  type:'POST',
//	  dataType:'json',
//	  data:{photographer_id:post_data.userid },
//	  success:function(data){
//		if(data.error_id == 0){
//			
//
//			showMessage('关注 '+post_data.nick_name+' 摄影师');
//            $('.followM').html('已关注');
//		}else{
//			showMessage('网络错误..');		
//		}
//
//	  },
//	 error:function(){
//		showMessage('网络错误..');
//	 }
//	});
    
    
      base.ajax({
         
        data:{
            'method': 'paiwo.user.follow.follow',
            'follow_id':post_data.user_id
        },
         
        success:function(data){
            if(data.error_id == 0){
                showMessage('关注 '+post_data.user_name+' 摄影师');
                $('.followM').html('已关注');
            }
        },
         
        error:function(data){
//            slideMessage('网络错误');
        }
         
    });
}

//初始化
function init(){
    var d = window.location.pathname.split('/');
    post_id = d[d.length-1];
    showPage(post_id);
//    getComment();
}

function showPage(post_id){

     base.ajax({
         
        data:{
            'method': 'paiwo.photographer.post.get',
            'post_id':post_id
        },
         
        success:function(data){
            if(data.error_id == 0){
                    post_data = data.response;
                    if(data.response.avatar == 0){
                        $('.ihead').attr('src','/static/images/user_head.gif');
                    }else{
                        $('.ihead').attr('src','http://image.paiwo.co/'+data.response.avatar);
                    }
                    
                   $('#ibanner').css('background-image', 'url(http://image.paiwo.co/'+data.response.post_cover_photo +'@!banner)');
                    share_pic = data.response.post_big_photo;
					share_weibo = data.response.weibo;
        
                    $('.inick').html(data.response.user_name);
//                    if(data.response.qq == ''){
//                        simple('iqq', '无');
//                    }else{
//                        simple('iqq', data.response.qq);
//                    }
//                    if(data.response.phone == ''){
//                        simple('iphone', '无');    
//                    }else{
//                        simple('iphone', data.response.phone);
//                    }
//                    simple('idesc', data.response.user_desc);
                    simple('ititle', data.response.post_title);
                    simple('iname',data.response.post_second_title);
                    
                    //simple('icontent', data.result.post_content);
                    $('#share_desc').html(data.response.post_ab);
                    $('#icontent').append(retinaCheck(data.response.post_content));
                
                    aPgImg = document.querySelector('#icontent').getElementsByTagName('img');
                
                    for(var i=0;i<aPgImg.length;i++){
                        img_pos_arr.push(getPos(aPgImg[i]).top);
                    }
//                    showType(data.response.service_type_code);
//                    showService(data.response.service_address_code);
                    if(data.response.follow_state == 2 || data.response.follow_state==4){
                        $('.followM').html('已关注')
                    }
                    
                }
        },
         
        error:function(data){
//            slideMessage('网络错误');
        }
         
    });
    
    
    
}

function simple(id, content){
    document.getElementById(id).innerHTML = content;
}

function showService(data){
    if(typeof data.length=='undefined')return;
    if(data.length ==0 ){
            simple('iplace', '无');
        return ;
    }
    var tm ='';
    for( var i = 0 ; i<data.length ; i++){
        tm+=allArea[data[i]]+' ';
    }
    simple('iplace','');
}

var objType = ['','婚纱 ','写真 ','婚礼 ','儿童 ','其他'];
function showType(data){
//    if(typeof data.length=='undefined')return;
    if(data.length == 0){
        $('#itype').html('无');
        return;
    }
    var tm = '';
    for(var i=0; i<data.length; i++){
        tm+=objType[data[i]];
    }
    $('#itype').html(tm);

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



//获取评论
function getComment(){
//     $.ajax({
//		  url:'/a/recommend/photographer/post/comment/get',
//		  type:'POST',
//		  dataType:'json',
//		  data:{post_id:post_data.post_id,
//               page_no :1 ,
//               page_size :10 },
//		  success:function(data){
//		  	if(data.error_id == 0){
//				var tm = $.tmpl(reply_tm, data.result.comment_list.reverse());
//                $('.comment_content_list').prepend(tm);
//
//			}else{
//				
//			}
//		  },
//		error:function(){
//			showMessage('网络错误..');	
//		}
//	});
    
    
}

//添加评论
function addComment(content){
    
//         $.ajax({
//		  url:'/a/recommend/photographer/post/comment/add',
//		  type:'POST',
//          async: false,
//		  dataType:'json',
//		  data:{
//               post_id: post_data.post_id, 
//			   reply_user_id: mes_reply,
//			   comment_text: content
//          },
//		  success:function(data){
//		  	if(data.error_id == 0){
//				showMessage('评论成功');
//                document.getElementById('reply_text').value = '';
//                if(mes_reply != 0){
//                    var sdata = {};
//                    sdata.comment_text = content;
//                    sdata.avatar = my_avatar;
//                    sdata.user_host = top_data.user_host;
//                    sdata.nick_name = my_nickname;
//                    sdata.rename = mes_name;
//                    sdata.user_id = data.result.user_id; 
//
//                }else{
//                    var sdata = {};
//                    sdata.comment_text = content;
//                    sdata.avatar = my_avatar;
//                    sdata.user_host = top_data.user_host;
//                    sdata.nick_name = my_nickname;
//                    sdata.rename = '';
//                    sdata.user_id = data.result.user_id; 
//                }
//                var tm = $.tmpl(reply_now_tm, sdata);
//                $('.comment_content_list').prepend(tm);
//                
//                $('#red_reply').trigger('click');
//			}else{
//				
//			}
//		  },
//		error:function(){
//			showMessage('网络错误..');	
//		}
//	});
}


//微博分享
function weibo_share(cont,bg){
	var url = window.location.href || '';
	var weibo_at ='';
	if(share_weibo!=''){
		weibo_at = ' @' + share_weibo;
	}else{
		weibo_at = '';
	}
	var cont = cont + weibo_at  + ' ' + url +'（分享自 @拍我）'||'';
	var bg = bg || '';
	var str = 'http://service.weibo.com/share/share.php?title='+cont+'&appkey=2197733404'+'&pic='+bg+'&ralateUid=';
	window.open(str,'_blank','height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes');
}
$('#weibo_share').on('click',function(){
	var content = $('#share_desc').html();
	var bg = 'http://image.paiwo.co/'+share_pic+'@!banner';
	weibo_share(content,bg);
});

//QQ空间分享
function qzone_share(title,cont,bg){
	var url = window.location.href || '';
	var cont = cont +'（分享自 @拍我）';
	var bg = bg || '';
	var str = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+encodeURIComponent(title)+'&summary='+encodeURIComponent(cont)+'&desc=&url='+encodeURIComponent(url)+'&pics='+bg;
	window.open(str,'_blank','height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes');
}


$('.tab_share_qzone').on('click',function(){
	var title =$('#ititle').html();
	var content = $('#share_desc').html();
	var bg = 'http://image.paiwo.co/'+share_pic+'@!banner';
	//console.log(bg);
	qzone_share(title,content,bg);
});


//取图片位置
function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:l, top:t};
}

//lazyload

var img_pos_arr = [];
var aPgImg = document.querySelector('#icontent').getElementsByTagName('img');

//$(document).ready(function(){
//    var aPgImg = document.querySelector('#icontent').getElementsByTagName('img');
//	for(var i=0;i<aPgImg.length;i++){
//		img_pos_arr.push(getPos(aPgImg[i]).top);
//	}
	
//	for(var i=0;i<5;i++){
//		var _src = aPgImg[i].getAttribute('data-src');
//		aPgImg[i].style.height ='auto';
//		aPgImg[i].setAttribute('src',_src);
//	}
//});

//$(window).on('load',function(){
//      var aPgImg = document.querySelector('#icontent').getElementsByTagName('img');
//	for(var i=0;i<aPgImg.length;i++){
//		img_pos_arr.push(getPos(aPgImg[i]).top);
//	}
//	
//	for(var i=0;i<5;i++){
//		var _src = aPgImg[i].getAttribute('data-src');
//		aPgImg[i].style.height ='auto';
//		aPgImg[i].setAttribute('src',_src);
//	}
//});


//window.addEventListener('scroll',function(){
//	var aPgImg = document.querySelector('#icontent').getElementsByTagName('img');
//	var winH = document.documentElement.clientHeight;
//	var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
//	var scrollBottom = scrollT+winH;
//	
//	for(var i=5;i<img_pos_arr.length;i++){
//		if(scrollBottom>=(img_pos_arr[i-5]+100)){
////			//console.log(scrollBottom+'|'+(img_pos_arr[i]+100));
//			var _src = aPgImg[i].getAttribute('data-src');
//			aPgImg[i].style.height ='auto';
//			aPgImg[i].setAttribute('src',_src);
//		}
//	}
//},false);


//计算浏览器滚动条宽度
function scrollbarwidth() {
	var parent = $('<div style="width:50px;height:50px;overflow:auto"><div></div></div>').appendTo('body'),
		child = parent.children(),
		scrollbarwidth = child.innerWidth() - child.height(99).innerWidth();
	parent.remove();
	return scrollbarwidth;
}

var wechat = $('.wechat_box');
var _url = window.location.href;
$('.wechat_box').find('img').attr('src','/a/qrcode/make?share_url='+_url+'?'+new Date().getTime());

var go_top_btn = $('.go_top'),
	top_tab = $('.top-tab'),
	search_box = $('.tab_searchbox');
	
//微信弹窗
$('.tab_share_wechat').on('click',function(){
	var is_scroll_bar = document.documentElement.clientHeight < document.body.scrollTop,
		bar_width = scrollbarwidth();
	if(is_scroll_bar){
		document.body.style.overflowY = 'hidden';
		document.body.style.marginRight = '17px';
		top_tab.css('padding-right',bar_width);
		top_tab.css('left',-bar_width);
		search_box.css('margin-left',bar_width-1);
	}
	wechat.css({'visibility':'visible'}).addClass('active');
	$('.wechat_shadow').css('visibility','visible');
	go_top_btn.hide();
});


//点击shadow二维码消失
$('.wechat_shadow').on('click',function(){
	var is_scroll_bar = document.documentElement.clientHeight < document.body.scrollTop;
	if(is_scroll_bar){
		document.body.style.overflowY = 'auto';
		document.body.style.marginRight = '0';
		top_tab.css('left','0');
		top_tab.css('padding-right','0');
		search_box.css('margin-left','0');
	}
	wechat.css('visibility','hidden').removeClass('active');
	$('.wechat_shadow').css('visibility','hidden');
	go_top_btn.show();
});


//点击二维码关闭按钮
$('.wechat_close').on('click',function(){
	var is_scroll_bar = document.documentElement.clientHeight < document.body.scrollTop;
	if(is_scroll_bar){
		document.body.style.overflowY = 'auto';
		document.body.style.marginRight = '0';
		top_tab.css('left','0');
		top_tab.css('padding-right','0');
		search_box.css('margin-left','0');
	}
	wechat.css('visibility','hidden').removeClass('active');
	$('.wechat_shadow').css('visibility','hidden');
	go_top_btn.show();
	
});


//回到顶部按钮
	window.addEventListener('load',function(){
		var goTop = document.getElementById('go_top');
		var time=160;
	    var timer=null;
	    var bSys=false;
		
		window.addEventListener('scroll',function(){
			if(bSys){
				clearInterval(timer);	
			}
			bSys=true;
			var scrollT=document.documentElement.scrollTop || document.body.scrollTop;

			if(scrollT>0){
				goTop.style.display='block';	
			}else{
				goTop.style.display='none';	
			}
		},false);
		
		goTop.onclick = function(){
			var count=Math.floor(time/16);
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var dis=0-start;
			var n=0;
			timer=setInterval(function(){
				n++;

				var a=n/count;
				var cur=start+dis*a;

				document.documentElement.scrollTop=document.body.scrollTop=cur;
				bSys=false;

				if(n==count){
					clearInterval(timer);	
				}
			},30);
		};
		
	},false);

//适配retina
function retinaCheck(str){
    if(window.devicePixelRatio >1){
        return str.replace(/@!1d5/, '@!2d10');
    }else{
        return str.replace(/@!1d5/, '@!2d5');
    }

}



window.addEventListener('scroll',function(){

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollTop >=450){
        $('#fixed-top-box').show();
        $('#pg-l').hide();
    }else{
        $('#fixed-top-box').hide();
        $('#pg-l').show();
    }

},false);
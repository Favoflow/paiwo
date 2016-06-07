var studio_tab = $('.studio-tab ul'),
	studio_friend = $('.studio-con-friend'),
	studio_follow = $('.studio-care-main'),
	studio_fan = $('.studio-fans-main'),
	studio_trend = $('.studio-con-trend'),
    studio_album = $('.studio-con-album'),
    studio_pocket = $('.studio-con-pocket'),
	studio_cieclebox = $('.studio_cieclebox'),
	studio_content  = $('.studio-content'),
    studio_active = $('.studio-r-active');

	// 初始化
	init();

	window.onunload = function(){
		document.documentElement.scrollTop = document.body.scrollTop = 0;
        showDynamicList(1);

	}
	
//    回到顶部
    function goTheTop(){
        var clientH = document.documentElement.clientHeight;
        $("html,body").stop().animate({scrollTop:clientH},300);
    }
    function pageload(_val,obj,page){
        if(_val<=4){
            obj.find('.page-no a').eq(0).html(1);
            obj.find('.page-no a').eq(1).html(2);
            obj.find('.page-no a').eq(2).html(3);
            obj.find('.page-no a').eq(3).html(4);
            obj.find('.page-no a').eq(4).html(5);
            obj.find('.page-no a').eq(5).html(6);
            obj.find('.page-no a').eq(6).html(page);
            obj.find('.page-no span').eq(0).addClass('page-none').siblings().removeClass('page-none');
        }else if(_val>4&&_val<page-3){
            obj.find('.page-no a').eq(0).html(1);
            obj.find('.page-no a').eq(1).html(_val-2);
            obj.find('.page-no a').eq(2).html(_val-1);
            obj.find('.page-no a').eq(3).html(_val);
            obj.find('.page-no a').eq(4).html(_val+1);
            obj.find('.page-no a').eq(5).html(_val+2);
            obj.find('.page-no a').eq(6).html(page);
            obj.find('.page-no span').removeClass('page-none');
       }else if(_val>=page-3){
            obj.find('.page-no a').eq(0).html(1);
            obj.find('.page-no a').eq(1).html(page-5);
            obj.find('.page-no a').eq(2).html(page-4);
            obj.find('.page-no a').eq(3).html(page-3);
            obj.find('.page-no a').eq(4).html(page-2);
            obj.find('.page-no a').eq(5).html(page-1);
            obj.find('.page-no a').eq(6).html(page);
            obj.find('.page-no span').eq(1).addClass('page-none').siblings().removeClass('page-none');
       }
        var _len = obj.find('.page-no a').length;
        for(var i=0;i<_len;i++){
            if(obj.find('.page-no a').eq(i).html()==_val){
                obj.find('.page-no a').eq(i).addClass('page-cur').siblings().removeClass('page-cur');
            }
        }  
        if(_val == 1){
            obj.find('.page-pre').addClass('page-first');
            obj.find('.page-next').removeClass('page-first');
        }else if(_val == page){
            obj.find('.page-next').addClass('page-first');
            obj.find('.page-pre').removeClass('page-first');
        }else{
            obj.find('.page-pre').removeClass('page-first');
            obj.find('.page-next').removeClass('page-first');
        }
    }
	//分页
	studio_follow.on('click','.page-no a',function(){
		var _val = parseInt($(this).html()); 
		showFollowList(_val);
        goTheTop();
        pageload(_val,$('.studio-care-main'),care_page);
	});

	studio_follow.on('click','.page-pre',function(){
		var _val = parseInt($('.studio-care-main .page-cur').html());
		if(_val == 0){
			return;
		}
		showFollowList(_val-1);	
        goTheTop();
        pageload(_val-1,$('.studio-care-main'),care_page);
	});
    
	studio_follow.on('click','.page-next',function(){
		var _val = parseInt($('.studio-care-main .page-cur').html()),
			_len = care_page;
		if(_val == _len){
			return;
		}
		showFollowList(_val+1);
        goTheTop();
        pageload(_val+1,$('.studio-care-main'),care_page);
	});

	studio_fan.on('click','.page-no a',function(){
        var _val = parseInt($(this).html()); 
		showFollowerList(_val);
        goTheTop();
        pageload(_val,$('.studio-fans-main'),fan_page);
	});
	
	studio_fan.on('click','.page-pre',function(){
        var _val = parseInt($('.studio-fans-main .page-cur').html());
		if(_val == 0){
			return;
		}
		showFollowerList(_val-1);	
        goTheTop();
        pageload(_val-1,$('.studio-fans-main'),fan_page);
	});
    
	studio_fan.on('click','.page-next',function(){
		var _val = parseInt($('.studio-fans-main .page-cur').html()),
			_len = fan_page;
		if(_val == _len){
			return;
		}
		showFollowerList(_val+1);
        goTheTop();
        pageload(_val+1,$('.studio-fans-main'),fan_page);
	});
    
    
    //分页
	studio_pocket.on('click','.page-no a',function(){
        var _val = parseInt($(this).html()); 
		showPocketList(_val);
        goTheTop();
        pageload(_val,$('.studio-con-pocket'),fan_page);
	});

	studio_pocket.on('click','.page-pre',function(){
        var _val = parseInt($('.studio-con-pocket .page-cur').html());
		if(_val == 0){
			return;
		}
		showPocketList(_val-1);	
        goTheTop();
        pageload(_val-1,$('.studio-con-pocket'),pocket_page);
	});
    
	studio_pocket.on('click','.page-next',function(){
        var _val = parseInt($('.studio-con-pocket .page-cur').html()),
			_len = pocket_page;
		if(_val == _len){
			return;
		}
		showPocketList(_val+1);
        goTheTop();
        pageload(_val+1,$('.studio-con-pocket'),fan_page);
	});
    
	studio_album.on('click','.page-no a',function(){
        var _val = parseInt($(this).html()); 
		showAlbumList(_val);
        goTheTop();
        pageload(_val,$('.studio-con-album'),album_page);
	});

	studio_album.on('click','.page-pre',function(){
        var _val = parseInt($('.studio-con-album .page-cur').html());
		if(_val == 0){
			return;
		}
		showAlbumList(_val-1);	
        goTheTop();
        pageload(_val-1,$('.studio-con-album'),album_page);
	});
    
	studio_album.on('click','.page-next',function(){
		var _val = parseInt($('.studio-con-album .page-cur').html()),
			_len = album_page;
		if(_val == _len){
			return;
		}
		showAlbumList(_val+1);
        goTheTop();
        pageload(_val+1,$('.studio-con-album'),album_page);
	});

	function getPos(obj){ 
        var t=0;
        while(obj){
            t+=obj.offsetTop;
            obj=obj.offsetParent;
        }
        return t;
    }

    function checkMore(){
    	if(dyPage*8>=dy_count){
    		return false;
    	}else{
    		return true;
    	}
    }

	//滚动加载动态列表
	window.addEventListener('scroll',function(){
		if($('.studio-con-trend').css('display')=='block'){
			var scrollBottom = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
				trendH  = studio_trend[0].scrollHeight + getPos(studio_trend[0]);
			if(scrollBottom>trendH && checkMore()){
                
                dynamic_page++;
//                console.log('scroll page '+(dynamic_page));
				showDynamicList(dynamic_page);
			}
		}
	});
    


	//点击出现大图
	studio_trend.on('click','.trend-album-cover img,.trend-album-img img', function(event) {
		//照片被作者删除情况
		var img_src = $(this).attr('src');
		if(img_src=='/static/images/pic-deleted.png'){
			showMessage('该照片已被原作者删除');
			return;
		}
	     var _id = this.getAttribute('data');
			history.pushState && history.pushState({title:'show'},'','/photos/'+_id);
	    
	        paiwoPhoto.init(_id);
	        paiwoPhoto.trg('showpic');
			paiwoPhoto.tool.scrollShow();
	    

		return false;
	});

    
    studio_trend.on('click','.re-photo',function(){
        
        var img_src = $(this).find('img').attr('src');
		if(img_src=='/static/images/pic-deleted.png'){
			showMessage('该照片已被原作者删除');
			return;
		}
//	     var _id = this.getAttribute('data-code');
         var _id = $(this).parents('.re-photo-f').attr('data-code');       
			history.pushState && history.pushState({title:'show'},'','/photos/'+_id);
	        paiwoPhoto.init(_id);
	        paiwoPhoto.trg('showpic');
			paiwoPhoto.tool.scrollShow();
	    

		return false;
        
    });
    
	studio_cieclebox.on('mouseenter','.follow_state_2,.follow_state_4',function(){
		$(this).html('取消');
		if($(this).html() == '取消'){
			$(this).addClass('follow_hover');
		}
	});	
    
	studio_cieclebox.on('mouseleave','.follow_state_2',function(){
		$(this).html('<i></i>已关注').removeClass('follow_hover');
	});
    
    studio_cieclebox.on('mouseleave','.follow_state_4',function(){
		$(this).html('<i></i>已关注').removeClass('follow_hover');
	});

    studio_cieclebox.on('mouseleave','.cieclebox_concen',function(){
    	$(this).removeClass('follow_hover');
    });
    
	studio_friend.on('mouseenter','.studio-fri-care',function(){
		if($(this).hasClass('care_2')||$(this).hasClass('care_4')){
			$(this).html('取消');
			if($(this).html() == '取消'){
				$(this).addClass('studio-hover');
			}			
		}		
	});
    
	studio_friend.on('mouseleave','.studio-fri-care',function(){
		if($(this).hasClass('care_2')){
			$(this).html('<i></i>已关注').removeClass('studio-hover');
		}else if($(this).hasClass('care_4')){
            $(this).html('<i></i>已关注').removeClass('studio-hover');
        }
	});

	studio_friend.on('click','.studio-fri-care',function(){
		var data = $(this).attr('data');
		if($(this).hasClass('care_1')){
			$(this).removeClass('care_1').addClass('care_2');
			$(this).html('<i></i>已关注');
			addFollow2(data);
		}else if($(this).hasClass('care_2')){
			$(this).removeClass('care_2').addClass('care_1');
			$(this).html('<i></i>关注').removeClass('studio-hover');
			unFollow2(data);
		}else if($(this).hasClass('care_3')){
			$(this).removeClass('care_3').addClass('care_4');
			$(this).html('<i></i>已关注');
			addFollow2(data);
		}else if($(this).hasClass('care_4')){
			$(this).removeClass('care_4').addClass('care_3');
			$(this).html('<i></i>关注').removeClass('studio-hover');
			unFollow2(data);
		}
	});

	//点赞
	studio_content.on('click','.like-btn',function(){
		if(is_login == 0){
			loginInside.show();
			return;
		}
		var _this = $(this);
		doLike(_this);
	});
	studio_content.on('click','.liked-btn',function(){
		var _this = $(this);
		unLike(_this);
	});
	studio_content.on('mouseenter','.liked-btn',function(){
		$(this).html('<i></i>取消');
	});
	studio_content.on('mouseleave','.liked-btn',function(){
		$(this).html('<i></i>喜欢');
	});
	studio_content.on('click','.rec-btn',function(){
		if(is_login == 0){
			loginInside.show();
			return;
		}
		var _this = $(this);
		doRec(_this);
	});
	studio_content.on('click','.recd-btn',function(){
		var _this = $(this);
		unRec(_this);
	});
	studio_content.on('mouseenter','.recd-btn',function(){
		$(this).html('<i></i>取消');
	});
	studio_content.on('mouseleave','.recd-btn',function(){
		$(this).html('<i></i>推荐');
	});

//	judgeHash();
    

// 初始化
function init(){
	host.name = location.pathname.slice(1);
    getPhotogInfo();  //获取摄影师相关的信息
    
    
    
//    $("html,body").scrollTop(0);
    
    //判断页面打开状态
//    if(document.referrer){
//        if(document.referrer==''){  //新打开页面
//          $('.studio-con-trend,.studio-content-r').fadeIn();   
//		  $('.studio-con-album,.studio-con-pocket,.studio-con-friend').hide();
//		  $('.studio-tab li').eq(0).addClass('studio-tab-cur').siblings().removeClass('studio-tab-cur');
//        }else if(document.referrer!='' && store.has('studio_reload')){ //刷新页面
//            
//        }else if(document.referrer!=''){
//            store.has('studio_reload')
//        }   
//    }
    
}

$('.studio-info-tab li').eq(0).click(function(){
	$('.studio-trend').trigger('click');
});
$('.studio-info-tab li').eq(1).click(function(){
	$('.studio-friend').trigger('click');
    
});
$('.studio-info-tab li').eq(2).click(function(){
	$('.studio-friend').trigger('click');
	$('.studio-friend-fans').trigger('click');
    
    
});

//回到顶部显示
window.addEventListener('scroll',function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
    	clientH = document.documentElement.clientHeight;
    if(scrollTop<clientH){
        $('#go_top').fadeOut();
    }else{
        $('#go_top').fadeIn();
    }
},false);

//点击回到顶部
$('#go_top').on('click',function(){
	var clientH = document.documentElement.clientHeight;
     $("html,body").stop().animate({scrollTop:clientH},300);
});


//视差滚动
function scrollView(){
	
	var clientH = document.documentElement.clientHeight,
		scrollT = document.documentElement.scrollTop||document.body.scrollTop, 
		stu_opacity = 1-scrollT/((clientH-40)/2),
		stu_opa = Math.max(stu_opacity,0),
		stu_position = scrollT/2+(scrollT/clientH)*190,
		stu_endPos = (clientH-40)/2+((clientH-40)/clientH)*190,
		stu_pos = Math.min(stu_position,stu_endPos);
	$('.stuido_change').css({'transform':'translateY('+stu_pos+'px)','-webkit-transform':'translateY('+stu_pos+'px)','-ms-transform':'translateY('+stu_pos+'px)','-moz-transform':'translateY('+stu_pos+'px)','-o-transform':'translateY('+stu_pos+'px)'});
	$('.header-arrow,.stuido_change figcaption,.stuido_change .studio_url,.stuido_change .photog_intro_text').css({'opacity':stu_opa});

	if($('.header-arrow').css('opacity')==0){
		$('.top-tab').removeClass('top_tab_opa')
		$('.studio_main_header').css('opacity',scrollT/(clientH-40));
		$('.header-arrow,.stuido_change figcaption,.stuido_change .studio_url,.stuido_change .photog_intro_text').hide();
	}else{
		$('.top-tab').addClass('top_tab_opa');
		$('.header-arrow,.stuido_change figcaption,.stuido_change .studio_url,.stuido_change .photog_intro_text').show();
	}
}

//翻屏
var headCover = document.getElementsByClassName('stuido_header')[0],
    scrollEnd = false,
    timer = null;

function screenNext(){
	var clientH = document.documentElement.clientHeight;
    if(!scrollEnd){
        clearTimeout(timer);
        scrollEnd = true;
        $('html,body').animate({'scrollTop':clientH-40},400);
        timer = setTimeout(function(){
            scrollEnd = false;
        },400);
    }
	
}

function screenEx(){
	var clientH = document.documentElement.clientHeight;
    if(!scrollEnd){
        clearTimeout(timer);
        scrollEnd = true;
        $('html,body').animate({'scrollTop':0},400);
        timer = setTimeout(function(){
            scrollEnd = false;
        },400);
    }
	
}

window.addEventListener('scroll',function(){
	scrollView();
});

window.onresize = function(){
	scrollView();
}

$('.down-arrow,.stuido_change figure,.stuido_change figcaption').click(function(){
	screenNext();
});


function scrollFunc(e){
	var clientH = document.documentElement.clientHeight;
	var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
    var e = e || event;

     if($('.messge_black').css('display')=='none'){
         
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件             
            if (e.wheelDelta < 0 && scrollT<clientH-40) { //当滑轮向下滚动时
                screenNext();
                e.preventDefault && e.preventDefault();
            }
            
           else if(e.wheelDelta > 0 && scrollT<=clientH*2/3){
               screenEx();
               e.preventDefault && e.preventDefault();
           }
            
        } else if (e.detail) {  //Firefox滑轮事件
            if (e.detail> 0&&scrollT<clientH-40) { //当滑轮向下滚动时
                screenNext();
                e.preventDefault && e.preventDefault();
            }
            
           else if(e.detail< 0 &&scrollT<clientH*2/3){
               screenEx();
               e.preventDefault && e.preventDefault();
           }
        }
         
        $('.header-back-change').hide();
         
     }

}



//给页面绑定滑轮滚动事件
$('.black_bac').on('mousewheel DOMMouseScroll',function(){
    if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
       document.removeEventListener('DOMMouseScroll',scrollFunc,false);
    }else{
       document.removeEventListener('mousewheel', scrollFunc,false);
    }
});

$('.black_bac_close').on('click',function(){
    document.addEventListener('DOMMouseScroll', scrollFunc,false);
});

if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
    document.addEventListener('DOMMouseScroll', scrollFunc,false);	
}else{
    document.addEventListener('mousewheel', scrollFunc,false);
}



window.onkeydown = function(e){
	e = e || window.event;
	var clientH = document.documentElement.clientHeight;
	var scrollT = document.documentElement.scrollTop||document.body.scrollTop; 
	if(e.keyCode == 40&&scrollT<clientH-40){
		screenNext();
		e.preventDefault();
	}else if(e.keyCode == 38 && scrollT<=clientH-40){
		screenEx();
		e.preventDefault();
	}
}

//图片缩放效果
$('.banner_bg').addClass('img_scale');

//编辑大图背景
$('.stuido_header_editicon').on('click', function(event) {
    if($('.header-back-change').css('display')=='none'){
    	$('.header-back-change').fadeIn(100);
    }else{
    	$('.header-back-change').fadeOut(100);
    }        
});

//更换封面大图
$('.header-back-submit').click(function(){
    
//    home_info.auth = $('.header-back-img').css('background-image');
//    home_info.banner_photo = $('.banner_bg').css('background-image');
	$('.header-back-change').fadeOut(100);
	$('.header-back-up').fadeIn(100);
	$('.header-back-img').removeClass('header-back-select');
});




//上传封面取消选择
$('.header-back-change').on('click','.header-back-cancel',function(){
        var _url = '';
        if(home_info.banner_photo.indexOf('@')==-1){
            _url= 'http://image.paiwo.co/'+home_info.banner_photo+'@!banner';
        }else{
            _url = home_info.banner_photo;
        }
    
    
    
        $('.banner_bg').css('background-image','url('+_url+')').fadeIn(200);
        $('.stuido_header_sign').html(home_info.auth);
        $('.header-back-change').fadeOut(100,function(){
            $('.header-back-up').show();
            $('.header-back-img').removeAttr('data-file');
            $('.header-back-up').find('p').css('color','#b6b3aa').show();
            $('.header-back-up').css({'background':'#eee','opacity':1});
            $('.header-back-up').find('.uploading-state').css('color','#b6b3aa');
            $('.re-choice').hide();
            $('.header-back-img').removeClass('header-back-select');
            
            if(home_info.auth){
                $('.stuido_header_sign').html(home_info.auth);
            }else{
                $('.stuido_header_sign').html('');
            }
            
            base.ajax({

                        data:{
                            'method': 'paiwo.user.style.put',
                            'banner_photo': home_info.banner_photo
                        },

                        success:function(data){
                            if(data.error_id == 0){

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
            
        });
    
//    });
});

//点击上传
$('.header-back-up').click(function(ev){
    
    ev.stopPropagation();
    if(loading_false)return;
    $('.header-back-change').find('.bg-choice').removeClass('header-back-select');
    
     if($('.header-back-img').attr('data-file')){
        $('.header-back-img').addClass('header-back-select');
     }

    
    setTimeout(function(){
        $('#bigback').trigger('click'); 
    },60);
	
    
});



$('.header-back-img').on('click',function(){
    
    if(loading_false)return;
    
    if(!$('.header-back-up').is(':hidden'))return;
    
   if($('.header-back-img').attr('data-file')){
        $('.header-back-img').addClass('header-back-select');
     }
    
    $('.header-back-change').find('.bg-choice').removeClass('header-back-select');
    $('.banner_bg').fadeOut(200,function(){
         
         var _url = $('.header-back-change').find('.header-back-select').attr('data-file');
         if(_url){
            if(_url.indexOf('@')==-1){
                 _url = 'http://image.paiwo.co/'+_url+'@!banner';
             }
         }
         
        $('.banner_bg').css('background-image','url('+_url+')').fadeIn(200);
        $('.stuido_header_sign').html($('.header-back-change').find('.header-back-select').attr('data-auth'));
    });
    
});


$('.re-choice').on('click',function(ev){
    ev.stopPropagation();
    $('#bigback').trigger('click'); 
});

//选择封面
$('.header-back-change').on('click','.bg-choice',function(){ 
    $('.header-back-img').removeClass('header-back-select');
    $('.header-back-change').find('.bg-choice').removeClass('header-back-select');
    $(this).addClass('header-back-select');
    $('.banner_bg').fadeOut(200,function(){
        var _url = 'http://image.paiwo.co/'+$('.header-back-change').find('.header-back-select').attr('data-file')+'@!banner';
        $('.banner_bg').css('background-image','url('+_url+')').fadeIn(200);
        $('.stuido_header_sign').html($('.header-back-change').find('.header-back-select').attr('data-auth'));
    });
});




//封面确认
$('.header-back-change').on('click','.header-back-submit',function(){
    
//    
 var _path = $('.header-back-change').find('.header-back-select').attr('data-file');
    
     base.ajax({

                data:{
                    'method': 'paiwo.user.style.put',
                    'banner_photo': _path
                },

                success:function(data){
                    if(data.error_id == 0){
                       var _loading = $('.banner_loading');
                       var _url = 'http://image.paiwo.co/'+_path+'@!banner';
                       var oImg = new Image();
                       oImg.src = _url;
                       oImg.onload = function(){
//                           $('.banner_bg').fadeOut(400);
                           _loading.animate({'width':'100%'},200,'swing',function(){
                                 _loading.css('width','0%');
                                 $('.banner_bg').attr('data-code',_url).css('background-image','url('+_url+')');
                                 home_info.banner_photo = _url;
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
});


document.getElementById('bigback').onchange = function(){
    
    var file = this.files[0];
	//console.log(file.size);
    
	if(this.files[0].size>11000000){
	    showMessage('请上传小于10M的文件');
		return;
	}
	
	var name = file.name.split('.');
    
	var fix = name[name.length-1];
    
	fix = fix.toLowerCase();
	if(fix=='jpg'||fix == 'png'||fix == 'bmp'||fix == 'jpeg'){
//			 $('.tab_select_box').stop().animate({'opacity':1,'height':320},200,'linear');
		if(file.size<2000000){
			$('.banner_loading').animate({'width':'60%'},1000,'swing',function(){
                setTimeout(function(){
                    uploadfile(file);
                },60);
                
            });
		}else{
			$('.banner_loading').animate({'width':'60%'},4000,'swing',function(){
                setTimeout(function(){
                    uploadfile(file);
                },60);
                
            });
		}
        
	    return;
	}
	 showMessage('请上传jpg,png,bmp,jpeg格式的文件');

};


/*选项卡切换*/
studio_tab.on('click','li',function(){    
	if($(this).hasClass('studio-tab-cur')){
        
		return;
	}else{
        
        $('.studio-none-hack').hide();
		var tabIndex = $('.studio-tab li').index($(this));
		if(tabIndex ==0){
			$('.studio-con-trend,.studio-content-r').fadeIn();
            if($('.studio-con-trend').children().length == 0){
                $('.studio-con-trend').hide();
                $('.studio-none-hack').show();
            }           
			$('.studio-con-album,.studio-con-pocket,.studio-con-friend').hide();
//            window.location.hash = '';
           try{
               window.history.replaceState('','',home_info.host_domain);
           }catch(e){
               window.location.hash = 'home';
           }
                
//			store.set('studio_tab','1');
		}else if (tabIndex == 1){
			$('.studio-con-album').fadeIn();
			$('.studio-con-trend,.studio-con-pocket,.studio-con-friend,.studio-content-r').hide();
//			store.set('studio_tab','2');
            
           
           try{
               window.history.replaceState('','',home_info.host_domain+'#album');
           }catch(e){
               window.location.hash = 'album';
           }
            
		}else if(tabIndex == 2){
			$('.studio-con-pocket').fadeIn();
			$('.studio-con-trend,.studio-con-album,.studio-con-friend,.studio-content-r').hide();
//			store.set('studio_tab','3');
             
           try{
               window.history.replaceState('','',home_info.host_domain+'#pocket');
           }catch(e){
               window.location.hash = 'pocket';
           }
            
		}else if(tabIndex == 3){
			$('.studio-con-friend').fadeIn();
			$('.studio-con-trend,.studio-con-album,.studio-con-pocket,.studio-content-r').hide();
//			store.set('studio_tab','4');
           
           try{
               window.history.replaceState('','',home_info.host_domain+'#friends');
           }catch(e){
               window.location.hash = 'friends';
           }
            
		}

		$('.studio-tab li').removeClass('studio-tab-cur');
		$(this).addClass('studio-tab-cur');
	}	
});

//初始化检测hash
function judgeHash(){
    var hash = window.location.hash.replace('#','');
    
//    console.log(hash);
    
    $('.studio-tab li').removeClass('studio-tab-cur');
    
    if(hash=='' || hash=='home'){        
        if($('.studio-con-trend').children().length == 0){
            $('.studio-con-trend').hide();
            $('.studio-none-hack').show();
//            console.log(0);
        }         
        $('.studio-con-album,.studio-con-pocket,.studio-con-friend').hide();
        $('.studio-tab .studio-trend').addClass('studio-tab-cur');
        

    }else if(hash=='album'){
        $('.studio-con-album').fadeIn();
        $('.studio-con-trend,.studio-con-pocket,.studio-con-friend,.studio-content-r').hide();
        $('.studio-tab .studio-album').addClass('studio-tab-cur');
    }else if(hash=='pocket'){
        $('.studio-con-pocket').fadeIn();
        $('.studio-con-trend,.studio-con-album,.studio-con-friend,.studio-content-r').hide();
        $('.studio-tab .studio-pocket').addClass('studio-tab-cur');
    }else if(hash=='friends'){
        $('.studio-con-friend').fadeIn();
        $('.studio-con-trend,.studio-con-album,.studio-con-pocket,.studio-content-r').hide();
        $('.studio-tab .studio-friend').addClass('studio-tab-cur');
        
        $('.studio-none-hack').hide();
            
    }else{
        $('.studio-con-trend,.studio-content-r').fadeIn();
        if($('.studio-con-trend').children().length == 0){
            $('.studio-con-trend').hide();
            $('.studio-none-hack').show();
        }           
        $('.studio-con-album,.studio-con-pocket,.studio-con-friend').hide();
        $('.studio-tab .studio-trend').addClass('studio-tab-cur');
        
    }
}




$('.studio-friend-care').click(function(){
	if($(this).hasClass('studio-friend-cur')){
		return;
	}
	$(this).addClass('studio-friend-cur');
	$('.studio-friend-fans').removeClass('studio-friend-cur');
	showFollowList(1);//显示关注列表
	$('.studio-care-main .page-no a').eq(0).addClass('page-cur').siblings().removeClass('page-cur');
	$('.studio-fans-main').hide();
	$('.studio-care-main').fadeIn();
});

$('.studio-friend-fans').click(function(){
	if($(this).hasClass('studio-friend-cur')){
		return;
	}
	$(this).addClass('studio-friend-cur');
	$('.studio-friend-care').removeClass('studio-friend-cur');
	showFollowerList(1);//显示关注列表
	$('.studio-fans-main .page-no a').eq(0).addClass('page-cur').siblings().removeClass('page-cur');
	$('.studio-care-main').hide();
	$('.studio-fans-main').fadeIn();
});

//上传相册
$('.content_albumbox').on('click', '.content_album_up', function(ev){
    window.location = '/album/new';
	ev.stopPropagation();
});

/*查看更多*/
$('.studio-info-more').on('click',function(){
	if($('.studio-info-type').css('display') == 'none'){
		$('.studio-info-type').slideToggle(80);
		$('.studio-info-place').delay(80).slideToggle(80)
		$(this).html('收起<i></i>');
		$(this).find('i').css(  'background-position','-1px -2097px');
	}else{
		$('.studio-info-place').slideToggle(80);
		$('.studio-info-type').delay(80).slideToggle(80);
		$(this).html('查看更多<i></i>');
		$(this).find('i').css(  'background-position','-49px -2097px');
	}
});

// 关注和取消关注
$('.cieclebox_concen').on('click', function(event) {
	if(is_login == 0){
		loginInside.show();
		 return;
	}
    
	if(this.getAttribute('data_code') == '关注'|| this.getAttribute('data_code') == '互未关注'){
		addFollow(host.id);
	}else{
		unFollow(host.id);
	}
});

//私信
$('.cieclebox_message').on('click', function(event) {
    if(is_login == 0){
		loginInside.show();
    }else{
        $('#top_message').trigger('click');
        PWS.addTalk(host.id);
    }
});


//关注、粉丝私信
$('.studio-con-friend').on('click','.studio-fri-mess',function(){
    $('#top_message').trigger('click');
    PWS.addTalk($(this).attr('data-code'));
});


//打开图文详情页
$('.studio-main').on('click','.pocket-part .studio-trend-pocket',function(){
    var code = $(this).parents('.pocket-part').attr('data-code');
    window.location.href = '/pocket/'+code;
});


$('.studio-main').on('click','.studio-rec-author',function(){
    var code = $(this).attr('data-code');
    window.open('/'+code);
});

//滚动专辑
//$(window).on('scroll',function(){
//    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
//        winH = document.documentElement.clientHeight,
//        bodyH = document.body.scrollHeight;
//    if(scrollTop+bodyH+300>bodyH && $('.studio-album').hasClass('studio-tab-cur') && album_flag){
//        album_flag = false;
//        showAlbumList(++album_page);
//    }
//    
//    
//});




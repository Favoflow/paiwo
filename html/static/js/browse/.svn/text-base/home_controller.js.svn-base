// JavaScript Document
var now_id = null;  //当前照片id
jQuery(function($){
	var photos = $('.photos');
	
//	url初始化
	var now_url = window.location.href;  
	var state_object = {
		title: "gallery",
		url: "/gallery"
	};
	window.history.replaceState && window.history.replaceState(state_object,'',now_url);
    

    //点击收藏
	photos.on('click', '.photo_fixbox_ding', function(e){
          e.stopPropagation();
		if(is_login == 0){
			loginInside.show();
			return;
		}
		var id = this.getAttribute('data');
		var path = this.getAttribute('path');
        
         if(path == ''){
                showMessage('图片已被删除');
                return;
        }
        $('.store_album_img').attr('src', 'http://image.paiwo.co/'+path+'@!280x280');
        $('#collect-back').fadeIn(100);
        paiwoPhoto.data.photo_id = id;
	});
	
	//取消收藏
	photos.on('click', '.photo_fixbox_dinged', function(e){
        e.stopPropagation();
		var photo_id = this.getAttribute('data');
		$.ajax({
		url: '/a/photo/favorite/unfavorite',
		type: 'POST',
		dataType: 'json',
		data: {photo_id: photo_id},
		success:function(data){
			$('.photo_fixbox_dinged[data='+photo_id+']').removeClass().addClass('photo_fixbox_ding');

		 }
		});
	});


	//确认增加收藏夹
	$(".store_box").on('click', '.store_select_button', function(event) {
		var url = '/a/photo/favorite/add';
		var favorite_name = $('.store_select_text').val();
		function getStrLen(str){
			var res=0;
			var reg=/[\u4e00-\u9fa5]/;
			for(var i=0; i<str.length; i++){
				if(reg.test(str.charAt(i))){
					res+=2;
				}else{
					res++;
				}
			}
			return res;
		}
		
		if(getStrLen(favorite_name)<=30){
				$.ajax({
					url: '/a/photo/favorite/add',
					type: 'POST',
					dataType: 'json',
					data: {favorite_name: favorite_name},
					success: addcollect_result
				});

		}else{
            showMessage('名称过长，请重新填写')
		}

	});		  
    

    //添加图片到收藏夹	  
    $('.store_box').on('click', '.store_button_submit', function(event) {
  	    event.preventDefault();
  	  	var d = $('.store_album_img');
  	  	var favorite_id = $('.store_album_input').attr('data');

  	  	var	photo_id = d.attr('data');
  	  	var photo_path = d.attr('path');

        var name = $('.photo-data[id='+photo_id+']').find('.photo_fixbox>a').html();
        if(name == null){
            name = $('.username').html();
        }
  	  	if(favorite_id==''||favorite_id==undefined){
  	  		//alert('无效的收藏夹');
  	  		return;
  	  	}
  	  	$.ajax({
  	  		url: '/a/photo/favorite/dofavorite',
  	  		type: 'POST',
  	  		dataType: 'json',
  	  		data: {favorite_id: favorite_id,
  	  			   photo_id: photo_id,
  	  			   photo_path: photo_path},
  	  		success: function(data){
					if(data.error_id == 0){
					$('.photo_fixbox_ding[data="'+photo_id+'"]').removeClass().addClass('photo_fixbox_dinged');	
						var t = $('.tab_buttons_right');
							t.addClass('select-s');//大图里面收藏夹显示


							//showMessage('收藏了来自摄影师 '+ name + " 的照片");


				   t.css({ background:'#414141'});
				   t.find('i').addClass('favorite-select');
				   t.find('span').css({color:'#fff'});
						
						
					}
				 }
  	  	});
  	  	
  	  	$('.store_button_cancel').trigger('click');
		   
    });
	
	//点赞
	photos.on('click', '.photo_fixbox_like', function(e){
        
        e.stopPropagation();
        
		if(is_login == 0){
			loginInside.show();
			return;
		}
        
        
		var id = this.getAttribute('data');
		var path = this.getAttribute('path');
		var name = $('.photo-data[id='+id+']').find('.photo_fixbox>a').html();
        if(path == ''){
            showMessage('图片已被删除');
            return;
        }
        
        
        
         base.ajax({
            
            data:{
                'method': 'paiwo.user.like.add',
                'content_id': id,
                'content_type': 1
            },


            success:function(data){

                if(data.error_id == 0){
			        $('.photo_fixbox_like[data='+id+']').removeClass().addClass('photo_fixbox_liked');
				}

            },

            error:function(data){
                slideMessage('网络错误');
            }

        });            
	});

	//取消点赞
	photos.on('click', '.photo_fixbox_liked', function(e){
          e.stopPropagation();
		if(is_login ==0){
			return;
		}
		var id = this.getAttribute('data');
        
        base.ajax({
            
            data:{
                'method': 'paiwo.user.like.delete',
                'content_id': id,
                'content_type': 1
            },


            success:function(data){

                if(data.error_id == 0){
                    $('.photo_fixbox_liked[data='+id+']').removeClass().addClass('photo_fixbox_like');
				}   

            },

            error:function(data){
                slideMessage('网络错误');
            }

        });

	});
	
	photos.on('mouseenter', '.photo-data', function(e){
		$(this).find('.photo_fixbox').stop().animate({bottom: '0px'},100);	
	});
	
	photos.on('mouseleave', '.photo-data', function(e){
		$(this).find('.photo_fixbox').stop().animate({bottom: '-36px'},100);
	});
	
	
	//点击出现大图
	$(".main_content").on('click','.photo-data', function(event) {
		//照片被作者删除情况
		var img_src = this.getElementsByTagName('img')[0].getAttribute('src');
		if(img_src=='/static/images/pic-deleted.png'){
			showMessage('该照片已被原作者删除');
			return;
		}
        
         var _id = this.getAttribute('data');
        
            paiwoPhoto.init(_id);
            paiwoPhoto.trg('showpic');
			paiwoPhoto.tool.scrollShow();
        
		    return false;
        
	});
	   
	//回到顶部显示
	window.addEventListener('scroll',function(){
	    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	    if(scrollTop==0){
	        $('#go_top').fadeOut();
	    }else{
	        $('#go_top').fadeIn();
	    }
	},false);


	//点击回到顶部
	$('#go_top').on('click',function(){
	     $("html,body").stop().animate({scrollTop:0},600);
	});
	    
	paiwoPhoto.on('dolikeOut', function(id){
	   $('.photo_fixbox_like[data='+id+']').removeClass().addClass('photo_fixbox_liked');
	});

	paiwoPhoto.on('unlikeOut', function(id){
	    $('.photo_fixbox_liked[data='+id+']').removeClass().addClass('photo_fixbox_like');
	});

	paiwoPhoto.on('unfavoriteOut', function(id){
	    $('.photo_fixbox_dinged[data='+id+']').removeClass().addClass('photo_fixbox_ding');
	});

	paiwoPhoto.on('dofavoriteOut', function(id){
	    $('.photo_fixbox_ding[data='+id+']').removeClass().addClass('photo_fixbox_dinged');

	});


	//防照片墙底部误点
	$('.main_content').on('click','.photo_fixbox',function(ev){
        ev.stopPropagation();
//		return false;
	});	
});//main.end



//gallery选中
$('.gallery-classify-pic a').click(function(){
	$('.gallery-classify-txt li').removeClass('classify-txt-cur');
	$('.gallery-classify-pic i').fadeOut(100);
	$(this).find('i').fadeIn(100);
});


var classifyOld = 0,
	classifyNew = 0;
$('.gallery-classify-pic a').mouseenter(function(){
	$('.gallery-classify-hover').css('display','block');
	classifyNew = classifyNew;
	classifyOld = $($('.gallery-classify-pic a')).index($(this));
	var classifyDis = parseInt((classifyOld - classifyNew)/2)*148+((classifyOld - classifyNew)-parseInt((classifyOld - classifyNew)/2))*147.5;
	$('.gallery-classify-hover').css({
		'-webkit-transform':'translateX('+classifyDis+'px)',
		"-webkit-transition": "all 200ms linear",
		'-moz-transform':'translateX('+classifyDis+'px)',
		"-moz-transition": "all 200ms linear",
		'-ms-transform':'translateX('+classifyDis+'px)',
		"-ms-transition": "all 200ms linear",
		'-o-transform':'translateX('+classifyDis+'px)',
		"-o-transition": "all 200ms linear",
		'transform':'translateX('+classifyDis+'px)',
		"transition": "all 200ms linear"});
});

$('.gallery-classify-pic').mouseleave(function(){
	$('.gallery-classify-hover').hide();	
});

$(".gallery-classify-pic a").click(function () {
    nowTag = $(this).attr("class");
    tags = [];
    tagIndex = $(".gallery-classify-pic a").index($(this));
    var tags_list = $(this).find("dd");
    for (var i = 0; i < tags_list.length; i++) {
        tags[i] = tags_list[i].innerHTML
    }
    $(".photos-list").hide();
    $(".photos-list").eq(tagIndex + 1).show();
    if ($(".photos-list").eq(tagIndex + 1).children().length == 0) {
        page_no[tagIndex] = 1;
        doSearch(tags, 1, tagIndex + 1)
    }
    tags_flag = false
});
$('.gallery-cla-rec').click(function(){
	if($(this).hasClass('classify-txt-cur')){
		return;
	}
	$(this).addClass('classify-txt-cur').siblings().removeClass('classify-txt-cur');
    $(".photos-list").hide();
    $(".photos-list").eq(0).show();
    tags_flag = true;
    $(".gallery-classify-pic i").hide()
});
$('.gallery-cla-hot').click(function(){
	if($(this).hasClass('classify-txt-cur')){
		return;
	}
	$(this).addClass('classify-txt-cur').siblings().removeClass('classify-txt-cur');
    $(".photos-list").hide();
    $(".photos-list-hot").show();
    tags_flag = true;
    $(".gallery-classify-pic i").hide()
    if($('.photos-list-hot').children().length == 0){
    	hot_no = 1;
    	getHot(1);
    }
});
$('.gallery-cla-new').click(function(){
	if($(this).hasClass('classify-txt-cur')){
		return;
	}
	$(this).addClass('classify-txt-cur').siblings().removeClass('classify-txt-cur');
    $(".photos-list").hide();
    $(".photos-list-new").show();
    tags_flag = true;
    $(".gallery-classify-pic i").hide()
    if($('.photos-list-new').children().length == 0){
    	new_no = 1;
    	getNew(1);
    }
});

//判断localstorange
(function(){
  var tag = store.get('tag');
  switch(tag){
  	case '1':
  		$('.gallery-classify-part1').find('i').show();
  		$('.gallery-classify-pic a').eq(0).trigger('click');
  		store.remove('tag');
  		break;
    case '2':
        $('.gallery-classify-part2').find('i').show();
  		$('.gallery-classify-pic a').eq(1).trigger('click');
  		store.remove('tag');
  		break;
  	case '3':
        $('.gallery-classify-part3').find('i').show();
  		$('.gallery-classify-pic a').eq(2).trigger('click');
  		store.remove('tag');
  		break;
  	case '4':
        $('.gallery-classify-part4').find('i').show();
  		$('.gallery-classify-pic a').eq(3).trigger('click');
  		store.remove('tag');
  		break;
    case '5':
        $('.gallery-classify-part5').find('i').show();
  		$('.gallery-classify-pic a').eq(4).trigger('click');
  		store.remove('tag');
  		break;
  	case '6':
        $('.gallery-classify-part6').find('i').show();
  		$('.gallery-classify-pic a').eq(5).trigger('click');
  		store.remove('tag');
  		break;
  	case '7':
        $('.gallery-classify-part7').find('i').show();
  		$('.gallery-classify-pic a').eq(6).trigger('click');
  		store.remove('tag');
  		break;
    case '8':
        $('.gallery-classify-part8').find('i').show();
  		$('.gallery-classify-pic a').eq(7).trigger('click');
  		store.remove('tag');
  		break;
  }
    
    if(store.has('index_from')){
        var index_style = store.get('index_from').toString();
        if(index_style=='1'){
            $('.gallery-cla-rec').trigger('click');
        }else if(index_style=='2'){
            $('.gallery-cla-hot').trigger('click');
        }else if(index_style=='3'){
            $('.gallery-cla-new').trigger('click');
        }
        store.remove('index_from');
    }
    
   
})();

if (history.pushState) {
    window.addEventListener("popstate", function (ev) {
        var _url = window.location.href,
            _body = document.getElementsByTagName("body")[0],
            scrollWidth = paiwoPhoto.tool.scrollbarwidth;
        if (ev.state.title == "gallery") {
            $(".black_bac").hide();
            _body.style.overflow = "auto";
            _body.style.paddingRight = "0px"
        } else {
            if (ev.state.title == "show") {
                var _id = getPhotoId();
                paiwoPhoto.init(_id);
                $(".black_bac").show();
                paiwoPhoto.trg("showpic");
                _body.style.overflow = "hidden";
                _body.style.paddingRight = scrollWidth + "px"
            }
        }
    })
};
// paiwoPhoto.trg('showpic');
// _body.style.overflow = 'hidden';
// _body.style.paddingRight = scrollWidth + 'px';






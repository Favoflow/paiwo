var select_path;  // 收藏夹
var select_id = 0;// 收藏图片的ID
var store = window.store || {}
var bigpic = window.bigpic || {}

var photo_flag = 0;

//url初始化
//window.history.pushState && window.history.pushState(state_object,'',now_url);
var myflag = 0;

var s_main = $('.stuido_mian'); //事件绑定的主体
var head_main = $('.stuido_header_textbox');
var a = $('#photos');/*****标题_相册，简介,服务*******/
var b = $('#intro');
var c = $('#service');
    
var intro = $('.photog_introduction'); /********简介,服务,专辑,照片*******/
var servi = $('.photog_service');       
var album = $('.content_albumbox');  //专辑列表
var photo = $('.content_photobox');  //专辑内页

var big_pic_url;

//摄影师主页url记录

var is_ie = false; //是否不支持pushState
try{
	//IE10+ 
	var now_url = window.location.href;
	history.replaceState({title:'index'},'',now_url);
	is_ie = false;
}catch(e){
	//IE9
	is_ie = true;
}

jQuery(function($){
	
	

    //私信
    head_main.on('click', '.cieclebox_message', function(event) {
        if(is_login == 0){
			loginInside.show();
        }else{
        $('#top_message').trigger('click');
        
        PWS.addTalk(host.id);
        }
    });

	//点击分享 微博分享
	$('.content_photobox_title').on('click','.tab_share_weibo',function(){
		//照片专辑 照片作者 照片地址
		var  _photo = 'http://image.paiwo.co/'+album_cover_path+'@!1d5',
		    content = '分享影集「'+album_album_name+'」,'+'摄影师『'+album_author_name+'』作品';
		    weiboShare(content,_photo);
	});

	//空间分享
	$('.content_photobox_title').on('click','.tab_share_qzone',function(){
		var  _photo = 'http://image.paiwo.co/'+album_cover_path+'@!1d5',
	        content = '分享影集「'+album_album_name+'」,'+'摄影师"『'+album_author_name+'』作品';
			qzoneShare('拍我网摄影作品分享',content,_photo);	
	});

	//微信分享
	$('.content_photobox_title').on('click','.tab_share_wechat',function(){
		var wechat = $('.wechat_box');
		var _url = 'http://paiwo.co/album/'+album_album_id,
			_img = wechat.find('img');	
			_img.attr('src','');
			_img.attr('src','/a/qrcode/make?share_url='+_url+'?'+new Date().getTime());	
			wechat.css({'visibility':'visible'}).addClass('active');
	});

	function weiboShare (cont,bg){
		var url = 'http://paiwo.co/album/'+album_album_id,
	   		weibo_at = '',
	    	cont = cont + weibo_at  + ' ' + url +'（分享自 @拍我 - 最具格调的自由摄影师平台）'||'',
	    	bg = 'http://image.paiwo.co/'+album_cover_path+'@!1d5' || '',
	    	str = 'http://service.weibo.com/share/share.php?title='+cont+'&appkey=2197733404'+'&pic='+bg+'&ralateUid=';
		window.open(str,'_blank','height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes');
	};

	function wechatHide (cont,bg){
	    var wechat = $('.wechat_box');
	    wechat.removeClass('active');
	    setTimeout(function(){
	        wechat.css({'visibility':'hidden'});
	    },600);
	};

	function qzoneShare (title,cont,bg){
	    var url = 'http://paiwo.co/album/'+album_album_id;
		var cont = cont +'（分享自 @拍我）';
		var bg = bg || '';
		var str = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title='+encodeURIComponent(title)+'&summary='+encodeURIComponent(cont)+'&desc=&url='+encodeURIComponent(url)+'&pics='+bg;
		window.open(str,'_blank','height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes');
	};

    //点赞
    $('.photo-section ul').on('click', '.photo_fixbox_like', function(event) {
		if(is_login == 0){
			loginInside.show();
			return false;
		}
		
		var id = this.getAttribute('data');
		doLike(id);
        var t = $('.photo_fixbox_like[data='+id+']');
		t.removeClass().addClass('photo_fixbox_liked');
		t.parent().siblings('a').show();
		event.stopPropagation();

    });

    //取消赞
    $('.photo-section ul').on('click', '.photo_fixbox_liked', function(event) {
		
		var id = this.getAttribute('data');
		unLike(id);
        var t = $('.photo_fixbox_liked[data='+id+']');
		t.removeClass().addClass('photo_fixbox_like');
		t.parent().siblings('a').hide();
		event.stopPropagation();
    });



	//点击显示大图
	$('.photo-section ul').on('click','img',function(e){
         var _id = this.parentNode.getAttribute('data');
         try{
            history.pushState({title:'show'},'','/photos/'+_id);
         }catch(e){
            
         }
        
        paiwoPhoto.init(_id);
        paiwoPhoto.trg('showpic');
        paiwoPhoto.tool.scrollShow();
	});
	
	

	//防止背景滚动
	window.onscroll = function(){
		if(is_winsrcoll){
			document.documentElement.scrollTop = document.body.scrollTop = 0;
		}
	};
	
	init();
});

function init(){
	host.name = location.pathname.slice(1);
	// is_hash();
	// photoSection();
    
    showInnerPic(get_album_id(),true);
}

//判断哈希
function is_hash(){
    var hash = window.location.hash;
   	if(hash == ''){
      return;
   	} 
    var num = hash.replace(/[^0-9]/g,"");
    
}


//支持pushstate
function getPhotoId(){
	var url = window.location.href;
	var start_index = url.lastIndexOf('/')+1,
		end_index = url.lastIndexOf('#');
	var _id = null;
	if(url.lastIndexOf('?')!=-1){
		var end = url.lastIndexOf('?');
		_id = url.substring(start_index,end_index);
	}else{
		_id = url.substring(start_index,end_index);
	}
	return _id;
}

if(history.pushState){
	window.addEventListener('popstate',function(ev){
		var _url = window.location.href,
			_body = document.getElementsByTagName('body')[0],
			scrollWidth = paiwoPhoto.tool.scrollbarwidth,
			_host = host.name;
		if(/\/album\//.test(_url)){

            var _hash = window.location.hash;
            
                if(/normal/.test(_hash)){
                    $('.photo-arrange-normal').addClass('photo-normal-cur');
                    $('.photo-arrange-free').removeClass('photo-free-cur');
                    $('.photo-arrange-full').removeClass('photo-full-cur');
                    $('.photo_section_normal').css('display','block');
                    $('.photo_section_free,.photo_section_full').css('display','none');
                    window.location.hash = 'normal';
                    store.set('photo_section','normal');
                }else if(/free/.test(_hash)){
                    $('.photo-arrange-free').addClass('photo-free-cur');
                    $('.photo-arrange-normal').removeClass('photo-normal-cur');
                    $('.photo-arrange-full').removeClass('photo-full-cur');
                    $('.photo_section_free').css('display','block');
                    $('.photo_section_normal,.photo_section_full').css('display','none');
                    
                    waterfall();
                    
                    window.location.hash = 'free';
                    store.set('photo_section','free');
                }else if(/full/.test(_hash)){
                    $('.photo-arrange-full').addClass('photo-full-cur');
                    $('.photo-arrange-free').removeClass('photo-free-cur');
                    $('.photo-arrange-normal').removeClass('photo-normal-cur');
                    $('.photo_section_full').css('display','block');
                    $('.photo_section_free,.photo_section_normal').css('display','none');
                    window.location.hash = 'full';
                    store.set('photo_section','full');
                }
            
				$('.black_bac').hide();
				_body.style.overflow = 'auto';
				_body.style.paddingRight = '0px';
		}else if(/\/photos\//.test(_url)){
			var _id = getPhotoId();
				paiwoPhoto.init(_id);
				$('.black_bac').show();
				paiwoPhoto.trg('showpic');
				_body.style.overflow = 'hidden';
				_body.style.paddingRight = scrollWidth + 'px';
		}else{
			$('.black_bac').hide();
			photo.hide();
			album.fadeIn(400);
			_body.style.overflow = 'auto';
			_body.style.paddingRight = '0px';
		}
	});
	
}


//图片缩放效果
$('.banner_bg').addClass('img_scale');

//编辑删除相册按钮hover
$('.title_photo_edit').on('mouseenter',function(){
  $(this).find('i').addClass('title_photo_edit-ihover');
});
$('.title_photo_edit').on('mouseleave',function(){
  $(this).find('i').removeClass('title_photo_edit-ihover');
});
$('.title_photo_delete').on('mouseenter',function(){
  $(this).find('i').addClass('title_photo_delete-ihover');
});
$('.title_photo_delete').on('mouseleave',function(){
  $(this).find('i').removeClass('title_photo_delete-ihover');
});


/*排序选项卡*/
$('.photo-arrange-normal').click(function(){
	$(this).addClass('photo-normal-cur');
	$('.photo-arrange-free').removeClass('photo-free-cur');
	$('.photo-arrange-full').removeClass('photo-full-cur');
	$('.photo_section_normal').css('display','block');
	$('.photo_section_free,.photo_section_full').css('display','none');
	window.location.hash = 'normal';
	store.set('photo_section','normal');
});

$('.photo-arrange-free').click(function(){
    
	$(this).addClass('photo-free-cur');
	$('.photo-arrange-normal').removeClass('photo-normal-cur');
	$('.photo-arrange-full').removeClass('photo-full-cur');
	$('.photo_section_free').css('display','block');
	$('.photo_section_normal,.photo_section_full').css('display','none');
	// waterfall();
    window.location.hash = 'free';
	store.set('photo_section','free');
//    waterfall();
});

$('.photo-arrange-full').click(function(){
	$(this).addClass('photo-full-cur');
	$('.photo-arrange-free').removeClass('photo-free-cur');
	$('.photo-arrange-normal').removeClass('photo-normal-cur');
	$('.photo_section_full').css('display','block');
	$('.photo_section_free,.photo_section_normal').css('display','none');
	window.location.hash = 'full';
	store.set('photo_section','full');
});

// function photoSection(){

// 	var photoSection = store.get('photo_section');
// 	if(photoSection == 'normal'){
// 		$('.photo-arrange-normal').trigger('click');
// 	}else if(photoSection == 'free'){
// 		$('.photo-arrange-free').trigger('click');
// 	}else if(photoSection == '' || photoSection == 'full'){
// 		$('.photo-arrange-full').trigger('click');
// 	}
// }

//专辑内图片hover
$('.photo-section ul').on('mouseenter','li',function(){
	if($(this).find('.photo_fixbox').css('height')=='36px'){
		$(this).find('.photo_fixbox').stop().animate({bottom:0},100,'linear');
	}	
});

$('.photo-section ul').on('mouseleave','li',function(){
	if($(this).find('.photo_fixbox').css('height')=='36px'){
		$(this).find('.photo_fixbox').stop().animate({bottom:-36},100,'linear');
	}
});


$('.message_close').click(function(){
	$('.top-tab').css('display','block');
});


//删除相册
$('.pocket-delet').on('click',function(){
//    deleteAlbum();
    $('#delete_alert').show();
});

//确认删除
$('#delete_alert').on('click','.firm-del',function(){
     deleteAlbum();
});

//取消删除
$('#delete_alert').on('click','.cancel-del,.del-close',function(){
    $('#delete_alert').hide();
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
     $("html,body").stop().animate({scrollTop:0},200);
});


//点击进入摄影师主页
photo.on('click','.photo_name',function(){
    window.open(this.getAttribute('href'));    
});


//回到顶部显示
window.addEventListener('scroll',function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollTop==0){
        $('.pocket-go-top').fadeOut();
    }else{
        $('.pocket-go-top').fadeIn();
    }
},false);



//点击回到顶部
$('.pocket-go-top').on('click',function(){
     $("html,body").stop().animate({scrollTop:0},200);
});



//大图浏览禁止右键

$('.photo_section_full').on('contextmenu','li',function(){
    return false;
});












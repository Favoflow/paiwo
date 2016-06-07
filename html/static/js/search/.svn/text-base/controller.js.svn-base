/*
*  cyc -  2014.12.28
*
*
*
*/

var ha = $('.search_mix'),   //三个标题以及三个显示区域
    hb = $('.search_photo'),
    hc = $('.search_photog_22'),
    da = $('.search_mix_section'),
    db = $('.search_photo_section'),
    dc = $('.search_photog_section'),
    main = $('.search_main');



var sa = 1,   //记录页面显示的部分
    sb = 0,
    sc = 0;

var collect = {};
collect.id = 0;
collect.path = '';
collect.faid = null;
var tags;  //搜索页面的相关标签

var photo_count = 0,
    photog_count = 0,
    page_no_a = 1,
    page_no_b = 1,
    page_no_c = 1;

try{
	var _url = window.location.href;
	history.pushState({title:'index'},'',_url);
}catch(e){
	
}

jQuery(function($){
    /******选择三块区域********/
    main.on('click', '.search_mix', function(){
            $('.loading').hide();
            if($(this).hasClass('title-select')){
                return;
            }
            disAll();
            
    });
    
    main.on('click', '.search_photo', function(){
            if($(this).hasClass('title-select')){
                return;
            }
            disPhotos();
    });
    
    main.on('click', '.search_photog_22', function(){
            if($(this).hasClass('title-select')){
                return;
            }
            disPhotogs();
        
    });
    
    //点击显示私信
      main.on('click','.studio-fri-mess',function(){
            console.log(1);
          if(is_login == 0){
            console.log(1);
            loginInside.show();
            return;
          }
          $('#top_message').trigger('click');
          PWS.addTalk(this.getAttribute('data-code'));
      });
      
    //点击关注
    main.on('click', '.photog_add' , function(){
        var st = $(this).attr('st');
        if(is_login == 0 ){
			loginInside.show();
        }
        else{
            switch (st){
                case '1':
                    doFollow(this);
                    break;
                case '3':
                    doFollow(this);
                    break;                    
            }
        }        
    });

    //取消关注
    main.on('click', '.photog_added_2,.photog_added_4', function(){
        var st = $(this).attr('st');
        $(this).css({textAlign: 'center'});
        if(is_login == 0 ){
            loginInside.show();
        }
        else{
            switch (st){
                case '2':
                    unFollow(this);
                    break;
                case '4':
                    unFollow(this);
                    break;
            }
        }        
    });
    
    //点赞
    main.on('click', '.photo_fixbox_like', function(e){
        if(is_login == 0){
            loginInside.show();
            return false;
        }
        e.stopPropagation();
        doLike($(this).parents('.photo_block'));
    });
    
    //取消赞
    main.on('click', '.photo_fixbox_liked' , function(e){
        e.stopPropagation();
        unLike($(this).parents('.photo_block'));
    });
    
    //photo_fixbox
    main.on('mouseenter', '.photo_block', function(){
        $(this).find('.photo_fixbox').animate({'bottom':'0'}, 100, 'linear');   
    });
    main.on('mouseleave', '.photo_block', function(){
        $(this).find('.photo_fixbox').animate({'bottom':'-36px'}, 100, 'linear');   
    });

    $('.dou_section_ul').on('mouseenter','li',function(){
        $(this).find('.photo_fixbox_big').animate({'bottom':'0'}, 100, 'linear');
    });
    $('.dou_section_ul').on('mouseleave','li',function(){
        $(this).find('.photo_fixbox_big').animate({'bottom':'-36px'}, 100, 'linear');
    });
    
    main.on('click', '.search_showall2' , function(){
        $('.search_photog_22').trigger('click');
    });
    
    //取消照片收藏夹
    main.on('click', '.photo_fixbox_dinged', function(e){
        e.stopPropagation();
        var id = $(this).parents('.photo_block').attr('data');
           unCollect(id); 
    });
    main.on('click', '.photo_fixbox_ding', function(e){
			if(is_login == 0){
				loginInside.show();
				return false;
			}
            e.stopPropagation();
            var t = $(this).parents('.photo_block');
            var path = t.attr('path');
            var id = t.attr('data');
          $('.store_album_img').attr('src', 'http://image.paiwo.co/'+path+'@!280x280');
          $('#collect-back').fadeIn(100);
          paiwoPhoto.data.photo_id = id;
      
    });
    
    main.on('click','.search_footer',function(){
        if(checkMore()){
            showMore();
        }
    });

    function getPos(obj){   //取图片位置
        var t=0;
        while(obj){
            t+=obj.offsetTop;
            obj=obj.offsetParent;
        }
        return t;
    };


    
    //懒加载
    window.onload=window.onscroll=function(){
        //页面实际高度
        var scrollBottom = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);//-309
        var mainH = main[0].scrollHeight + getPos(main[0]);
        if($('.search_mix_section').css('display')=='none'){
            if(scrollBottom-70>mainH && checkMore()) {
                $('.loading').show();
                showMore();
            }
        }
    };
    
    //点击大图
    main.on('click', '.photo_block', function(){
           var _id = this.getAttribute('data');
			history.pushState && history.pushState({title:'show'},'','/photos/'+_id);
            paiwoPhoto.init(_id);
    		paiwoPhoto.trg('showpic');
			paiwoPhoto.tool.scrollShow();
    });
    
    //点击进入摄影师主页
    main.on('click', '.photo_fixbox>a', function(e){
        e.stopPropagation();
    });
    
    init();
});

//计算输入tags宽度
function calcInputWidth(obj){
	var oInput = document.querySelector(obj+' .searchlabels'),
		inputWidth = oInput.scrollWidth,
		inputBox = $(obj+' .tab_search_ul');
	if(inputWidth>=750){
		inputBox.css('margin-left',-(inputWidth - 650));
	}else{
		inputBox.css('margin-left',0);
	}
}


function init(){
    if(window.location.search.length <4){
        $('.search_footer').hide();
        $('.search-none').show();
        if(is_login == 1){
//            getCollect();
        }
        getSomePhoto();
        getSomePhotog();
        return;
    }
    tags = decodeURIComponent(window.location.search.slice(3)).split(',');
	_search.showTab('.search-normal','.search-sim',tags);
//	//console.log(tags);
    
    doSearch(tags);
    searchPhotog(tags);
    showThisTags(tags);
    
    getActivity(tags); //活动搜索
    
    checkMore();
	calcInputWidth('.search-sim');
	calcInputWidth('.search-normal');
}


function getPhotoId(){
	var url = window.location.href;
	var index = url.lastIndexOf('/')+1;
	var _id = null;
	if(url.lastIndexOf('?')!=-1){
		var end = url.lastIndexOf('?');
		_id = url.substring(index,end);
	}else{
		_id = url.substring(index);
	}
	return _id;
}

if(history.pushState){
	window.addEventListener('popstate',function(ev){
//		//console.log(ev.state.title);
		var _url = window.location.href,
			_body = document.getElementsByTagName('body')[0],
			scrollWidth = paiwoPhoto.tool.scrollbarwidth;
			if(/search?/.test(_url)){
				$('.black_bac').hide();
				_body.style.overflow = 'auto';
				_body.style.paddingRight = '0px';
			}else if(/photos/.test(_url)){
				var _id = getPhotoId();
				paiwoPhoto.init(_id);
            	$('.black_bac').show();
            	paiwoPhoto.trg('showpic');
				_body.style.overflow = 'hidden';
				_body.style.paddingRight = scrollWidth + 'px';
				
			}
		
	});

}

searchModule('.search-sim');
searchModule('.search-normal');
//检测是否支持csstransforms3d
function testBrowser(){
	var transforms3d = null;
	if(Modernizr.csstransforms3d){
		transforms3d = true;
	}else{
		transforms3d = false;
	}
	return transforms3d;
}
	
var _search = {
	scroll_old : 0,
	isTransforms:testBrowser(),
	showTab:function(obj1,obj2,arr){
		 if(arr.length){
			$(obj1+' .search_input').attr('placeholder', '');
			$(obj2+' .search_input').attr('placeholder', '');
			var tm = '';
		 	for(var i=0;i<arr.length;i++){
				tm += '<div class="search-color'+_search.rndColor(1,11)+'"><span class="search_data">'+arr[i]+'</span><span class="search_ul_remove"><i></i></span></div>';
			}
			$(obj1+' .searchlabels').append(tm);
			$(obj2+' .searchlabels').append(tm);
		 }
	},
	rndColor:function(n,m){
		return parseInt(Math.random()*(m-n))+n;
	},
	findRe:function(_old,_new){
		if(_old==_new){
			return false;	
		}
	}
};

window.addEventListener('scroll',function(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(_search.isTransforms){  
			if(scrollTop > 90){
				$('.search-sim').addClass('active');
                $('.push_button').css('background-color','#ff475c');
			}else{
				$('.search-sim').removeClass('active');
                 $('.push_button').css('background-color','#2e2e2e');
			}
			
		}else{
			if(scrollTop > 90){
				$('.search-sim').stop().animate({'top':'40px','opacity':1},200,'linear');
                 $('.push_button').css('background-color','#ff475c');
			}else{
				$('.search-sim').stop().animate({'top':'-120px','opacity':0},200,'linear');
                $('.push_button').css('background-color','#2e2e2e');
			}
		}
	
},false);

    //返回顶部按钮
    window.addEventListener('scroll',function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
         clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if(scrollTop > clientHeight/2){
            $('#go_top').stop(true,true).fadeIn();
        }
        else{
            $('#go_top').stop(true,true).fadeOut();
        }
    },false);

    //点击回到顶部
    $('#go_top').on('click',function(){
         $("html,body").stop().animate({scrollTop:0},600);
    });


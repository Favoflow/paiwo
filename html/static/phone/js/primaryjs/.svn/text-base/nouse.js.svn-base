    //喜欢界面
	$('.photos').on('tap','.like',function(){
		$('.nav,.column').animate({ "-webkit-transform":"translate3d(0,0,0)", "transform":"translate3d(0,0,0)"},300,'ease-out');
		bOpen1=true;
		$('.like_main').animate({"-webkit-transform":"translate3d(0,0,0)", "transform":"translate3d(0,0,0)"},200,'ease-out');
		$('.fix_box').css({'display':'block'});
		$(this).parents('.photo_data').find('.like_main').animate({ "-webkit-transform":"translate3d(0,-45px,0)", "transform":"translate3d(0,-45px,0)"},200,'ease-out');
		$(this).parents('.fix_box').css({ 'display':'none'});    
	});
  
  
    //关闭喜欢界面
	$('.photos').on('tap','.like_x',function(){
		$(this).parents('.photo_data').find('.like_main').animate({ "-webkit-transform":"translate3d(0,0,0)", "transform":"translate3d(0,0,0)"},200,'ease-out');
		$('.fix_box').css({'display':'block'});
		$('.collect_main').animate({ "-webkit-transform":"translate3d(0,0,0)", "transform":"translate3d(0,0,0)"},200,'ease-out');
  });

    //收藏夹
	$('.photos').on('tap','.like_coll',function(ev){
		//临时操作
		
//		$('.collect_main').animate({ "-webkit-transform":"translate3d(0,-210px,0)", "transform":"translate3d(0,-210px,0)"},200,'ease-out');
		ev.stopPropagation();
	});


	    //关闭喜欢界面
	$('.may_like').on('tap','.like_x',function(){
		$(this).parents('.photo_data').find('.like_main').animate({ "-webkit-transform":"translate3d(0,0,0)", "transform":"translate3d(0,0,0)"},200,'ease-out');
		$('.fix_box').css({'display':'block'});
		$('.collect_main').animate({ "-webkit-transform":"translate3d(0,0,0)", "transform":"translate3d(0,0,0)"},200,'ease-out');
  });

    //收藏夹
	$('.may_like').on('tap','.like_coll',function(){
		//临时操作
	
//		$('.collect_main').animate({ "-webkit-transform":"translate3d(0,-210px,0)", "transform":"translate3d(0,-210px,0)"},200,'ease-out');
	});
	
	 //喜欢&取消喜欢
    $('.photos').on('tap','.like1',function(ev){
		//临时操作
	
		
//      if($(this).find('img').attr('src')=='/static/phone/images/like1.png'){
//         $(this).find('img').attr({'src':'/static/phone/images/liked.png'})
//         $(this).parents('.photo_main').find('.like img').attr({'src':'/static/phone/images/liked.png'});
//      }
//      else{
//        $(this).find('img').attr({'src':'/static/phone/images/like1.png'}) 
//        $(this).parents('.photo_main').find('.like img').attr({'src':'/static/phone/images/like.png'});
//      }   
		
		ev.stopPropagation();
		return false;
    });
	

	    //关闭收藏夹
	$('.coll_x').tap(function(){
		$('.collect_main').animate({ "-webkit-transform":"translate3d(0,0,0)", "transform":"translate3d(0,0,0)"},200,'ease-out'); 
	});

    //喜欢&取消喜欢
    $('.photos').on('tap','.like1',function(ev){
		//临时操作
		
//      if($(this).find('img').attr('src')=='/static/phone/images/like1.png'){
//         $(this).find('img').attr({'src':'/static/phone/images/liked.png'})
//         $(this).parents('.photo_main').find('.like img').attr({'src':'/static/phone/images/liked.png'});
//      }
//      else{
//        $(this).find('img').attr({'src':'/static/phone/images/like1.png'}) 
//        $(this).parents('.photo_main').find('.like img').attr({'src':'/static/phone/images/like.png'});
//      }   
		ev.stopPropagation();
		return false;
    });
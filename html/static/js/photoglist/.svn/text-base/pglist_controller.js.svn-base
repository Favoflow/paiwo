;jQuery(function($){
	
	
	//获取更多的摄影师列表
	$('.search_footer').on('click', function(){
		if(watch_status == 1){
			getFollows(++page_no);
		}else{
			getMore(++page_no);
		}

	
	});
	
	//增加关注
	$('.search_pg_photobox').on('click','.photog_add', function(){
		if(is_login == 0){
			showMessage('请先登录后，再关注摄影师');
			return;
		}
		var id = this.getAttribute('data');
			doFollow(id);
	
	});
	
	//取消关注
	$('.search_pg_photobox').on('click','.photog_added', function(){
		if(is_login == 0){
		showMessage('请先登录后，再关注摄影师');
			return;
		}
		var id = this.getAttribute('data');
		unFollow(id);
	
	});


	//推荐摄影师列表
	$('.search_photog').on('click',function(){
		watch_status = 0;
		page_no = 1
		getMore(page_no);

		$(this).removeClass('dbcolor');
		$('.search_photog_follow').addClass('dbcolor');

	});

	//关注摄影师列表
	$('.search_photog_follow').on('click',function(){
		if(is_login == 0){
			showMessage('登录后获取关注列表');
			return
		}
		$(this).removeClass('dbcolor')
		$('.search_photog').addClass('dbcolor');
		
		
		watch_status = 1;
		page_no = 1
		getFollows(page_no);

	});

	$('.search_pg_photobox').on('mouseenter','.photog_added', function(){
		$(this).find('i').html('取消');
	
	});

	
	$('.search_pg_photobox').on('mouseleave','.photog_added', function(){
		$(this).find('i').html('已关注');
	
	});

	



	
	init();
});
function init(){
	getMore(1);
    if(is_login == 1){
        $('.search_photog_follow').trigger('click'); 
    }
	
}
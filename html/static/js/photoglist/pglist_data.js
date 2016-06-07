var page_size = 20;
var page_no = 1;
var photog_count = 0;
var watch_status =0;
var follow_count =0;

//获取更多的摄影师列表
function getMore(page_no){
	$.ajax({
		  url:'/a/photographer/list/get',
		  type:'POST',
		  dataType:'json',
          async: false,
		  data:{page_no:page_no,
			    page_size:page_size},
		  success:function(data){
		  		if(data.error_id == 0){
					photog_count = data.result.count;
				//登陆的时候显示
				var tm = $.tmpl(photog_tm,data.result.photographer_list);
					if(page_no == 1){
						$('.search_pg_photobox').hide().html(tm).fadeIn(400);
					}else{
					   $('.search_pg_photobox').append(tm);
					}
					checkMore();
				}else{
					showMessage('网络错误..');	
				}
		  }
	});
			
}

//添加关注
function doFollow(id){
	$.ajax({
		  url:'/a/photographer/follow',
		  type:'POST',
		  dataType:'json',
		  data:{photographer_id:id},
		  success:function(data){
		  	if(data.error_id == 0){
				var name = $('.photog_add[data='+id+']').html('<i>已关注</i>').removeClass().addClass('photog_added').attr('xs');
				
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

//取消关注

function unFollow(id){
    $.ajax({
		  url:'/a/photographer/unfollow',
		  type:'POST',
		  dataType:'json',
		  data:{photographer_id:id},
		  success:function(data){
		  	if(data.error_id == 0){

				var name = $('.photog_added[data='+id+']').html('<i></i>').removeClass().addClass('photog_add').attr('xs');;
				
				
				showMessage('取消关注 '+name+' 摄影师');
			}else{
				
			}
		  },
		error:function(){
			showMessage('网络错误..');	
		}
	});
	
	
}

//获取关注摄影师列表
function getFollowss(page_no){

    $.ajax({
		  url:'/a/photographer/follow/list/get2',
		  type:'POST',
		  dataType:'json',
		  data:{page_no:page_no,
			    page_size:page_size},
		  success:function(data){
		  		if(data.error_id == 0){
					follow_count = data.result.count;
					
						//登陆的时候显示
						var tm = $.tmpl(photog_tm,data.result.photographer_list);
						
					
					if(page_no == 1){
		  			$('.search_pg_photobox').hide().html(tm).fadeIn(400);
					}else{
						$('.search_pg_photobox').append(tm);
					}
					checkMore();
				}else{
					showMessage('网络错误..');	
				}
		  }
	});
	
}
function getFollows(page_no){
	$.ajax({
		  url:'/a/photographer/follow/list/get',
		  type:'POST',
		  dataType:'json',
		  data:{page_no:page_no,
			    page_size:page_size},
		  success:function(data){
		  		if(data.error_id == 0){
					photog_count = data.result.count;
					
						//登陆的时候显示
						var tm = $.tmpl(photog_tm,data.result.photographer_list);
						
					
					if(page_no == 1){
						$('.search_pg_photobox').hide().html(tm).fadeIn(400);
					}else{
					   $('.search_pg_photobox').append(tm);
					}
					checkMore();
                    
				}else{
					showMessage('网络错误..');	
				}
		  }
	})
	
	
	
}




//检测是否还有更多的摄影师

function checkMore(){
	if(watch_status == 0){
		if(photog_count >page_no*page_size){
			$('.search_footer').show();
			return true;
		}else{
			$('.search_footer').hide();
			return false;
	  }
   }else{
   		if(follow_count >page_no*page_size){
			$('.search_footer').show();
			return true;
		}else{
			$('.search_footer').hide();
			return false;
		}


   }
}
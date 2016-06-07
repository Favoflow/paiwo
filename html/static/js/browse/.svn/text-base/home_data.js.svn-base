var page_sg_count = 30;
var is_winsrcoll = false;
var b_sel_open = false;
var photo_num_arr = [];//随机图片数组
var photo_count = 0; //图片总数
var b_img_load = false;
var b_first_load = false; //首次加载判断
var end_load = true;
var page_no = [0,0,0,0,0,0,0,0,0,0];
var tags_flag = true;
var tags = [];
var nowTag = null;
var tagIndex = 0;
var    data = [0],
	   list = [],
	   page = 0,				  //显示的页数		
	   cur = 0,               	  //当前页	
	   photo_count= 0;            //图片总数
	//获取首页图片总数
	function get_photo_count(){	 
        
        
        
        base.ajax({
            data:{
                'method': 'paiwo.gallery.collection_count.get'
            },
            success:function(data){
                if(data.error_id==0){
                  photo_count = data.response.count;
                }else{
                  slideMessage('网络错误..');
                }
            },
            error:function(data){
                slideMessage('网络错误');
            }
        });
	}

	get_photo_count();

	for(var i=1;i<=photo_count;i++){
		photo_num_arr.push(i);
	}
 
	//首次获取
	function get_first_photo(){                                                         
		function rnd_num(){
			var photo_rnd_arr = []; //存储随机数组
			
			//生成随机数
			function rnd(n,m){
				return parseInt(Math.random()*(m-n))+n;
			}
			
			//查重函数
			function find_arr(arr,num){
				for(var i=0;i<arr.length;i++){
					if(arr[i]==num){
						return true;
					}
				}
				return false;
			}
			
			//生成随机数组
			function rnd_arr(){
				while(photo_rnd_arr.length<20){
					var len = photo_num_arr.length; //数组库
					var num = rnd(1,len+1)-1;
					if(!find_arr(photo_rnd_arr,photo_num_arr[num])){
						photo_rnd_arr.push(photo_num_arr[num]);
						photo_num_arr.splice(num,1);
					}
				}
			}
			
			rnd_arr();
			return photo_rnd_arr.join(',');
		}
		var rnd_num = rnd_num();
        
        base.ajax({
            
            data:{
                'method': 'paiwo.gallery.collection.get',
                'random_list':rnd_num.split(',')
            },
            
            success:function(data){
                if(data.error_id==0){
					var load_img_arr = data.response.photo_list.sort(function(){ return (0.5 - Math.random())});
					var img_load_count = 0;
					var photo_list = $('.photos-list').eq(0).children(); 
					for(var i=0;i<load_img_arr.length;i++){
						var oImg = new Image();
						var url = is_photo_url(load_img_arr[i].photo_path);
						photo_list[i].setAttribute('data',load_img_arr[i].photo_id);
						photo_list[i].getElementsByTagName('img')[0].src = url;
						var photo_info = $.tmpl(photo_info_tm,load_img_arr[i]);
						jQuery(photo_list[i]).append(photo_info);
						oImg.src = url;
						oImg.onload = function(){
							img_load_count++;
							if(img_load_count == load_img_arr.length){
								b_first_load = true;
								b_img_load = true;
								$('.loading').hide();
								$('.photo_fixbox').show();
							}else{
								b_first_load = false;
								b_img_load = false;
								$('.loading').show();
								$('.photo_fixbox').hide();
							}
						};
						
						oImg.onerror = function(){
							img_load_count++;
							if(img_load_count == load_img_arr.length){
								b_first_load = true;
								b_img_load = true;
								$('.loading').hide();
								$('.photo_fixbox').show();
							}else{
								b_first_load = false;
								b_img_load = false;
								$('.loading').show();
								$('.photo_fixbox').hide();
							}
						};
					}
					

				}else{
					showMessage('网络错误');
				}
            },
            
            error:function(data){
                slideMessage('网络错误');
            }
            
            
        });
        
        
        
		
	}
	

	get_first_photo();


	//获取随机图片
	function get_photo_list(){      
		//获取随机图片
		function rnd_num(){
			var photo_rnd_arr = [];//存储随机数组
			
			//生成随机数
			function rnd(n,m){
				return parseInt(Math.random()*(m-n))+n;
			}
			
			
			//查重函数
			function find_arr(arr,num){
				for(var i=0;i<arr.length;i++){
					if(arr[i]==num){
						return true;
					}
				}
				return false;
			}
			
			
			//生成随机数组
			function rnd_arr(){
//				console.log(len);
				var len = photo_num_arr.length;
				if(len<=20){ 
					end_load = false;
					while(photo_rnd_arr.length<len){
						len = photo_num_arr.length; //数组库
						var num = rnd(1,len+1)-1;
						if(!find_arr(photo_rnd_arr,photo_num_arr[num])){
							photo_rnd_arr.push(photo_num_arr[num]);
							photo_num_arr.splice(num,1);
						}
					}
					$('.pg_list_foot').show();
				}else{ 
					while(photo_rnd_arr.length<20){
						len = photo_num_arr.length; //数组库
						var num = rnd(1,len+1)-1;
						if(!find_arr(photo_rnd_arr,photo_num_arr[num])){
							photo_rnd_arr.push(photo_num_arr[num]);
							photo_num_arr.splice(num,1);
						}
					}
		
				}
			} 
			rnd_arr();			
			return photo_rnd_arr.join(',');
		}
		var rnd_num = rnd_num();
        
        
        base.ajax({
            data:{
                'method': 'paiwo.gallery.collection.get',
                'random_list':rnd_num.split(',')
            },
            success:show_photo,
            error:function(data){
                slideMessage('网络错误');
            }
        });
        
        
        
	}

// 获取热门
function getHot(hot_no){
	base.ajax({
		data:{
			'method': 'paiwo.gallery.hot.get',
			'page_no': hot_no,
			'page_size': 20
		},
		success:function(data){
			if(data.error_id==0){
				var load_img_arr = data.response.photo_list.sort(function(){ return (0.5 - Math.random())});
				var img_load_count = 0;
				for(var i=0;i<load_img_arr.length;i++){
					var oImg = new Image();
					var url = is_photo_url(load_img_arr[i].photo_path);
					oImg.src = url;
					oImg.onload = function(){
						img_load_count++;
						if(img_load_count==load_img_arr.length){
							b_img_load = true;
							var photos_list = $.tmpl(photo_tm,load_img_arr);
				            $(".photos-list-hot").append(photos_list);
							$('.loading').hide();
						}else{
							b_img_load = false;
							$('.loading').show();
						}
					};
					
					oImg.onerror = function(){
						img_load_count++;
						if(img_load_count==load_img_arr.length){
							b_img_load = true;
							var photos_list = $.tmpl(photo_tm,load_img_arr);
				            $(".photos-list-hot").append(photos_list);
							$('.loading').hide();
						}else{
							b_img_load = false;
							$('.loading').show();
						}
					};
					
					
				}
				
			}else{
				showMessage('网络错误');
			}
		},
		error:function(data){
			slideMessage('网络错误');
		}
	})
}

// 获取新作
function getNew(new_no){
	base.ajax({
		data:{
			'method': 'paiwo.gallery.new.get',
			'page_no': new_no,
			'page_size': 20
		},
		success:function(data){
			if(data.error_id==0){
				var load_img_arr = data.response.photo_list.sort(function(){ return (0.5 - Math.random())});
				var img_load_count = 0;
				for(var i=0;i<load_img_arr.length;i++){
					var oImg = new Image();
					var url = is_photo_url(load_img_arr[i].photo_path);
					oImg.src = url;
					oImg.onload = function(){
						img_load_count++;
						if(img_load_count==load_img_arr.length){
							b_img_load = true;
							var photos_list = $.tmpl(photo_tm,load_img_arr);
				            $(".photos-list-new").append(photos_list);
							$('.loading').hide();
						}else{
							b_img_load = false;
							$('.loading').show();
						}
					};
					
					oImg.onerror = function(){
						img_load_count++;
						if(img_load_count==load_img_arr.length){
							b_img_load = true;
							var photos_list = $.tmpl(photo_tm,load_img_arr);
				            $(".photos-list-new").append(photos_list);
							$('.loading').hide();
						}else{
							b_img_load = false;
							$('.loading').show();
						}
					};
					
					
				}
				
			}else{
				showMessage('网络错误');
			}
		},
		error:function(data){
			slideMessage('网络错误');
		}
	})
}

//判断照片是否被删除
function is_photo_url(url){
	var str = '';
	if(url!=''){
		str = 'http://image.paiwo.co/'+url + base.retinaPixel['280'];
		return str;
	}else{
		str = '/static/images/pic-deleted.png';
		return str;
	}
}




//获取随机图片成功回调
function show_photo(data){
	if(data.error_id==0){
		var load_img_arr = data.response.photo_list.sort(function(){ return (0.5 - Math.random())});
		var img_load_count = 0;
		for(var i=0;i<load_img_arr.length;i++){
			var oImg = new Image();
			var url = is_photo_url(load_img_arr[i].photo_path);
			oImg.src = url;
			oImg.onload = function(){
				img_load_count++;
				if(img_load_count==load_img_arr.length){
					b_img_load = true;
					var photos_list = $.tmpl(photo_tm,load_img_arr);
		            $(".photos-list").eq(0).append(photos_list);
					$('.loading').hide();
				}else{
					b_img_load = false;
					$('.loading').show();
				}
			};
			
			oImg.onerror = function(){
				img_load_count++;
				if(img_load_count==load_img_arr.length){
					b_img_load = true;
					var photos_list = $.tmpl(photo_tm,load_img_arr);
		            $(".photos-list").eq(0).append(photos_list);
					$('.loading').hide();
				}else{
					b_img_load = false;
					$('.loading').show();
				}
			};
			
			
		}
		
	}else{
		showMessage('网络错误');
	}
}

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


window.addEventListener('scroll',function(){
	var photo_img = $('.photo-data').get(0);
	var show_img = document.getElementsByClassName('photo-img');
	var photos = $('.photos-list').eq(tagIndex+1).get(0);
	var winH = document.documentElement.clientHeight;
	var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
	var scrollBottom = scrollT+winH;
	var oBody = document.getElementsByTagName('body')[0];
	if(scrollBottom>=(getPos(photos).top+photos.scrollHeight-600) && b_img_load && b_first_load && end_load){
		b_img_load = false;
		$('.loading').show(); 
		if(tags_flag){
			if($('.gallery-cla-rec').hasClass('classify-txt-cur')){
				get_photo_list();
			}else if($('.gallery-cla-hot').hasClass('classify-txt-cur')){

				getHot(++hot_no);
			}else if($('.gallery-cla-new').hasClass('classify-txt-cur')){
				getNew(++new_no);
			}
		}else{
			doSearch(tags,++page_no[tagIndex],tagIndex+1);
		}
	}

},false);



	//增加收藏夹回调
	function addcollect_result(data){
		if(data.error_id==0){
			var str = '<li class="store_select_li_cur" data="'+data.result.favorite_id+'">'+data.result.favorite_name+'</li>'
			var target = $('.store_album_select');
			
			$('.store_select_text').val('');
			$('.store_album_select li').removeClass('store_select_li_cur');

			target.append(str);
			var d = $('.store_album_input');
				d.attr('data',data.result.favorite_id);
				d.text(data.result.favorite_name);
		     checkCollect();
		     checkSelect();
		     $('.store_album_select button').removeClass('store_select_button').addClass('store_select_button_none');
		}else{
			showMessage('网络错误');
		}
	}


	//获取收藏夹
	function getCollect(){
		$.ajax({
			url: '/a/photo/favorite/name/list',
			type: 'POST',
			dataType: 'json',
			success:getCollect_result});
	}

	function getCollect_result(data){
		if(data.error_id==0){
			if(data.result.favorite_list.length==0){
				$('.store_album_input_none').show();
				$('.store_album_input').hide();
				$('.store_button_submit').removeClass('store_button_submit').addClass('store_button_submit_none');
				has_collect = 0;

			}else{
				var tm = help.collectlist(data.result.favorite_list);
			    $('.store_album_select').append(tm);
			    $('.store_album_input').show();
			    $('.store_album_input_none').hide();
			    has_collect = 1;

			}
		}else{
            
			showMessage('网络错误');
		}
	}
	
   
   function jq_ajax(url, param,type ,func,async,error){  
		$.ajax({
			'type':type,
			'dataType':'json',
			'url':url,
			'data':param,
			'success':func,
			'async':async,
			'error':error
		});
    }
function doSearch(tags,pageNo,index){
    
    base.ajax({
            data:{
                'method': 'paiwo.search.photo.get',
                'tags': tags,
                'page_no':pageNo,
                'page_size':20
            },
            success:function(data){
                if(data.error_id == 0){
                    photo_count = data.response.count;
                    var load_img_arr = data.response.photo_list.sort(function(){ return (0.5 - Math.random())});
                    var img_load_count = 0;
                    var page_num = parseInt(photo_count/20);
                    var timeOut = false;
                    var timer = null;
                    var clear_flag = true;
                    if(page_num<=pageNo){
                        b_img_load = false;
                        $('.loading').hide();
                    }

                    
                	for(var i=0;i<load_img_arr.length;i++){
                        var oImg = new Image();
                        var url = is_photo_url(load_img_arr[i].photo_path);
                        oImg.src = url;
                        oImg.onload = function(){
                            img_load_count++;
                            if(clear_flag){
	                            if(img_load_count==load_img_arr.length){
	                                clearTimeout(timer);
	                                b_img_load = true;
	                                $('.loading').hide();                        
	                                var photos_list = $.tmpl(search_tm,load_img_arr);
	                                $(".photos-list").eq(index).append(photos_list);
	                            }else{
	                                b_img_load = false;
	                                $('.loading').show();
	                            }
                        	}
                        };
                    }
                    
                    timer = setTimeout(function(){
                        b_img_load = true;
                        timeOut = true;
                        $('.loading').hide();
                        $('html').css('padding-right',0);
                        var photos_list = $.tmpl(search_tm,load_img_arr);
                        $(".photos-list").eq(index).append(photos_list);
                        console.log(1);
                        clear_flag = false;
                    },5000);


                }
            },
            error:function(data){
                slideMessage('网络错误');
            }
    });
        
    

}


//支持pushstate
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



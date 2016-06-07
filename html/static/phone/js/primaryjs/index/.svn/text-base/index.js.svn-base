var photo_box = $('.photos-main'),  //照片墙父级
    photo_cla = $('.photo-classify'),
	loading = document.querySelector('.loading'),  //加载进步条 
	tmp_arr_pos = [];
    page_no = [0,0,0,0,0];
var index = {     //首页命名空间
	now_num: 0, //当亲请求次数
	color_arr: ['#e7afc7','#747b85','#776d80','#a0a09d','#bbceef','#a9a6a4','#997a86','#d8d6d0'], //颜色数组
	b_load: true, //防止多次加载
	now_height:0,  //当前屏幕图片高度
	photo_count: 0,  //照片总数
    photo_num_arr: [],  //照片序号临时存放数组
	load_end:true,
	get_photo_count:function(){   //获取图片总数

        base.ajax({
            data:{
                'method': 'paiwo.gallery.collection_count.get'
            },
            success:function(data){
                if(data.error_id==0){
                  index.photo_count = data.response.count;
                }else{
                  
                }
            },
            error:function(data){
                
            }
        });
        
	},
	rnd_num:function(){   //获取随机数组
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
				var len = index.photo_num_arr.length; //照片墙数组库
				if(len==0)return;
				if(len<12){   //当推荐数组取完时
					console.log(index.photo_num_arr);
					for(var i=0;i<len;i++){
						photo_rnd_arr.push(index.photo_num_arr[i]);
//						index.photo_num_arr.splice(i,1);
					}
					index.load_end = false;
					index.photo_num_arr = [];
//					loading.style.diplay = 'none';
					$('.loading').hide();
				}else{
					while(photo_rnd_arr.length<12){  //单次请求照片数量
						len = index.photo_num_arr.length;
						var num = rnd(1,len+1)-1;
						if(!find_arr(photo_rnd_arr,index.photo_num_arr[num])){
							photo_rnd_arr.push(index.photo_num_arr[num]);
							index.photo_num_arr.splice(num,1);
						}
					}
				}
				
			}
		
			rnd_arr();
			return photo_rnd_arr;
	},
	get_photo_list:function(){  //获取具体图片
		var rnd_num = index.rnd_num();
		base.ajax({
			data:{
                'method': 'paiwo.gallery.collection.get',
                'random_list': rnd_num
            },
			success:function(data){
				if(data.error_id==0){
					var list_info = data.response.photo_list.sort(function(){ return (0.5 - Math.random())});  //返回照片数组
					var list_str = '';
					var _color = 0;
					index.now_num++;
					function rnd(n,m){
						return parseInt(Math.random()*(m-n))+n;
					}
					
					for(var i=0;i<list_info.length;i++){
//						http://image.paiwo.co/10699/album/cf1928ab15ae7b2fbbdcef285fa4781d@!560x560
						_color  = rnd(1,9)-1; //取色数组序列
						list_str+= '<div class="photos-list" data-code="'+list_info[i].photo_id+'" style="background-color:'+index.color_arr[_color]+';"><a href="'+index.is_has_photo(list_info[i].photo_path,list_info[i].photo_id)+'" class="img-a">'+
							'<img height="" class="photo_img'+index.now_num+'" src="'+index.is_photo_url(list_info[i].photo_path)+'" style="opacity:0;" /></a>'+
							'<div class="photog_count">'+
							'<a class="photo_author" href="'+list_info[i].author_domain+'">'+list_info[i].author_name+'</a>'+
							'</div>'+
						'</div>';	
					}
					$('.photo-main-list').eq(0).append(list_str);
					tmp_arr_pos =[];
					var photo_list = document.querySelectorAll('.photo_img'+index.now_num);
					for(var i=0;i<photo_list.length;i++){
						tmp_arr_pos.push(index.get_pos(photo_list[i]).top);
					}
//					console.log(tmp_arr_pos);
				}
				if(index.now_num==1){
					$('.photo_img'+1).animate({'opacity':1},600,'linear');
				}
				index.b_load = true;
			},
			error: function(data){
                
			}  
		});
	},
	get_pos:function(obj){   //取图片位置
		var l=0;
		var t=0;
		while(obj){
			l+=obj.offsetLeft;
			t+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return {left:l, top:t};
	},
	get_img_h:function(){   //计算图片高度
		var parent = $('<div class="photos-list"><img src="/static/phone/images/photo.jpg"><div class="photog_count"><a class="photo_author"></a></div></div>').appendTo('.photos-main');
		var _height = parent.find('img').get(0).scrollWidth;
//		console.log(parent.find('img').get(0).scrollWidth)
		parent.remove();
		return _height;
	},
	is_photo_url:function(url){  //判断图片是否被作者删除
		var str = '';
		if(url!=''){
			str = 'http://image.paiwo.co/'+url+'@!560x560';
			return str;
		}else{
			str = '/static/images/pic-deleted.png';
			return str;
		}
	},
	is_has_photo:function(url,id){  //如果照片删除点击无效
		var str = '';
		if(url!=''){
			str = '/photos/'+id;
			return str;
		}else{
			str = 'javascript:;';
			return str;
		}
	},
    get_search_photo:function(tags,pageNo,cla_index){  //搜索其余分类照片
        base.ajax({
            data:{
                'method': 'paiwo.search.photo.get',
                'tags': tags,
                'page_no': pageNo,
                'page_size': 12
            },
            success:function(data){
                if(data.error_id == 0){
                    var rnd_num = index.rnd_num();
                    var list_str = '';
					var _color = 0;
					index.now_num++;
					function rnd(n,m){
						return parseInt(Math.random()*(m-n))+n;
					}
                    var photo_list = data.response.photo_list,
                        photo_tm = '';
                    for(var i =0;i<photo_list.length;i++){
                        _color  = rnd(1,9)-1; //取色数组序列
                        photo_tm+= '<div class="photos-list" data-code="'+photo_list[i].photo_id+'" style="background-color:'+index.color_arr[_color]+';"><a href="'+index.is_has_photo(photo_list[i].photo_path,photo_list[i].photo_id)+'" class="img-a">'+
							'<img height="" class="photo_img'+index.now_num+'" src="'+index.is_photo_url(photo_list[i].photo_path)+'" /></a>'+
							'<a href="'+index.is_has_photo(photo_list[i].photo_path,photo_list[i].photo_id)+'"><div class="photog_count">'+
							'<a class="photo_author" href="'+photo_list[i].author_domain+'">'+photo_list[i].author_name+'</a>'+
							'</div>'+
                            '</a>'+
						'</div>';	
                    }
                    $('.photo-main-list').eq(cla_index).append(photo_tm);
                }                   
            },
            error:function(data){
                slideMessage('网络错误');
            }
        })
    },
    checkMore:function(){
        
    }
	

};	


//初始化
(function(){
	index.now_height = index.get_img_h();
	index.get_photo_count();
	for(var i=1;i<=index.photo_count;i++){
		index.photo_num_arr.push(i);
	}
	index.get_photo_list();
})();


//页面首次加载，自动显示
window.addEventListener('load',function(){
//	console.log($('.photo_img'+1));
	$('.photo_img'+1).animate({'opacity':1},600,'linear');
},false);

//加载更多
$('.load-more').on('tap',function(){
//    loading.style.display = 'block';
    var _cur = $('.photo-classify li').index('.photo-cla-cur');
    console.log(_cur);
    if(_cur ==0){
        index.b_load = false;
        index.get_photo_list();   
    }else {
        var tags = [];
        var tags_list = $('.photo-cla-cur').find("dd");
        for (var i = 0; i < tags_list.length; i++) {
            tags[i] = tags_list[i].innerHTML;
        }
        index.get_search_photo(tags,++page_no[_cur-1],_cur); 
    }
    //图片渐现
    for(var i=0;i<tmp_arr_pos.length;i++){
        $('.photos-list img').animate({'opacity':1},400,'linear');
        $('.photo_img'+index.now_num).eq(i).animate({'opacity':1},400,'linear');
    }
    return false;
})


//屏幕翻转时，重新获取图片高度
window.addEventListener('resize',function(){
//	index.now_height = index.get_img_h();
},false);

//分类
photo_cla.on('tap','li',function(){
    var cla_index = $('.photo-classify li').index($(this)),
        end_pos = cla_index*100;
    var tags = [];
    var tags_list = $(this).find("dd");
    for (var i = 0; i < tags_list.length; i++) {
        tags[i] = tags_list[i].innerHTML;
    }
    $('.photo-cla-line').css({
        '-webkit-transform':'translate3d('+end_pos+'%,0,0)',
        'transform':'translate3d('+end_pos+'%,0,0)'
    });
    $('.photo-classify li').eq(cla_index).addClass('photo-cla-cur').siblings().removeClass('photo-cla-cur');
    $('.photo-main-list').eq(cla_index).show().siblings().hide();
    if(cla_index != 0 && $('.photo-main-list').eq(cla_index).html()==''){
      index.get_search_photo(tags,++page_no[cla_index-1],cla_index);   
    }else if(cla_index == 0 && $('.photo-main-list').eq(0).html()==''){
      index.get_photo_list();   
    }
});

////滚动加载
//window.addEventListener('scroll',function(){
//	var photos_h = photo_box[0].scrollHeight,
//		photos_top = photo_box[0].offsetTop,
//		now_h = photos_h + photos_top,
//		winH = document.documentElement.clientHeight,
//		scrollT = document.documentElement.scrollTop || document.body.scrollTop,
//		scrollBottom = scrollT+winH;
////		console.log(now_h+'|'+photos_h+'|'+photos_top);
//    
////	   console.log(scrollBottom+'|'+(now_h-100)+'|'+index.b_load+'|'+index.load_end);
//    
//		if(scrollBottom>(now_h-100) && index.b_load && index.load_end){
////			console.log(1);
//			loading.style.display = 'block';
//            index.b_load = false;
//			index.get_photo_list();
//			
//		}
////		console.log((tmp_arr_pos)+'|'+scrollBottom);
//		//图片渐现
//		for(var i=0;i<tmp_arr_pos.length;i++){
//			
//			if(scrollBottom>(tmp_arr_pos[i]+60)){
//                $('.photos-list img').animate({'opacity':1},400,'linear');
//				$('.photo_img'+index.now_num).eq(i).animate({'opacity':1},400,'linear');
//			}
//			
//		}
//},false);









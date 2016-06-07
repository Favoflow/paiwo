var mainPic = $('.show_pic'),  //大图
	goPre = $('.big_pic_left'), //向前按钮
	goNext = $('.big_pic_right'); //向后按钮
var show_pic = {
	
	photo_id:0, 
	
	album_id:0,
	
	real_h:0,
	
	index:0,
	
	albumArr:[],
	
	get_host_name:function(){ //从url获取id	
		var url = window.location.href;
		var index = url.lastIndexOf('/')+1;
		if(url.lastIndexOf('?')!=-1){
			var end = url.lastIndexOf('?');
			host_name = url.substring(index,end);
		}else{
			host_name = url.substring(index);
		}
		return host_name;
	},
	
	get_img_h:function(){   //计算图片高度
		var parent = $('<div class="photos-list"><img src="/static/phone/images/photo.jpg"><div class="photog_count"><span class="photo_author"></span></div></div>').appendTo('.like-photos .photos-main');
		var _height = parent.find('img').get(0).scrollWidth;
		parent.remove();
		return _height;
	},
	
	showLargePic: function(id){  //大图显示
		base.ajax({
            data:{
                'method': 'paiwo.content.photo.get',
                'photo_id': id
            },
			success:function(data){
				console.log(data);
				if(data.error_id==0){
					var photo_info = data.response;
					var main_photo = document.querySelector('.show_pic'), //大图
						_album = document.querySelector('.more_info_from'),  //所述专辑
						_author = document.querySelector('.author'),//照片作者
                        _ava = document.querySelector('.pic_ava'),
                        _link = document.querySelector('.pic_ava_link');    main_photo.setAttribute('src','http://image.paiwo.co/'+photo_info.photo_path+'@!2d10');
					$('.show_pic').css('display','none');
					var oImg = new Image();
					oImg.onload = function(){
						$('.big-loading').hide();
						$('.show_pic').fadeIn(200);
					}
                    _link.href = '/'+photo_info.user_domain;
					oImg.src = 'http://image.paiwo.co/'+photo_info.photo_path+'@!2d5';
					_album.innerHTML = photo_info.album_name;
					_album.setAttribute('data-code',photo_info.album_id);
//					_album.parentNode.setAttribute('href','/m/album/'+photo_info.album_id);
					show_pic.album_id = photo_info.album_id;
					_author.innerHTML = photo_info.user_name;
					_author.setAttribute('data-code',photo_info.user_id);
                    _ava.src = 'http://image.paiwo.co/'+photo_info.user_avatar;
//					_author.parentNode.setAttribute('href','/'+photo_info.author.host);
					show_pic.albumList(photo_info.album_photo_list);  //装入专辑id数组
					show_pic.index = show_pic.findIndex(show_pic.photo_id,show_pic.albumArr); //当前图片在专辑内序号
					if(show_pic.index == 0){
						goPre.hide();
					}else if(show_pic.index == show_pic.albumArr.length - 1){
						goNext.hide();
					}
					
                    //推荐照片
                    show_pic.getRecommendList(photo_info.album_id);
                    
				}else{
					
				}
			},
			error: function(xhr, type){

			}
            
		});	
	},
	
	albumList:function(list){ //专辑图片id数组
		for(var i=0;i<list.length;i++){
			show_pic.albumArr.push(list[i].photo_id);
		}
	},
    
    getRecommendList:function(id){
          base.ajax({
                
        data:{
            'method': 'paiwo.content.photo.recommend_list.get',
            'album_id':id
        },


        success:function(data){

            if(data.error_id == 0){
                var _recommend = document.querySelector('.like-photos .photos-main'), //可能喜欢父级
				    recommend_list =data.response.photo_list,  //可能喜欢
				    rec_str = '';
                if(recommend_list.length){  //存在可能喜欢照片
						for(var i=0;i<recommend_list.length;i++){
							rec_str+= '<div class="photos-list" data-code="'+recommend_list[i].photo_id+'"><a href="/photos/'+recommend_list[i].photo_id+'">'+
								'<img height="" src="http://image.paiwo.co/'+recommend_list[i].photo_path+'@!400x400"></a>'+
							  '</div>';
						}
						_recommend.innerHTML = rec_str;
					}else{ //不存在可能喜欢照片
						_like_head = document.querySelector('.may_like h2');  //可能喜欢title
						_like_head.style.display = 'none';
					}
                
             
            }              

        },

        error:function(data){
        
        }

    });
    },
	
	findIndex:function(id,arr){
		for(var i=0;i<arr.length;i++){
			if(id==arr[i]){
				return i;
			}
		}
		return 0;
	},
	
	showIn:function(){
		goPre.animate({ 'opacity':1},200);
		goNext.animate({ 'opacity':1},200);
	},
	
	showOut:function(){
		goPre.animate({ 'opacity':0},200);
		goNext.animate({ 'opacity':0},200);
	}
}; 




//点击大图出现上下张按钮
mainPic.on('tap',function(ev){
    
    console.log('111');
    
	if(goPre.css('opacity')==0) {  //出现按钮
		show_pic.showIn();
	}else {  //关闭那妞
		show_pic.showOut();
	}
	ev.stopPropagation();
});

//点击向前按钮
goPre.on('tap',function(ev){
//	console.log(show_pic.photo_id);
	if(goPre.css('opacity')==0) { 
		goPre.css('opacity',1);
	}
	show_pic.index--;
	if(show_pic.index==-1){
		show_pic.index = 0;
		return;
	}
	var preId = show_pic.albumArr[show_pic.index];
	show_pic.showOut();
	window.location.href = '/photos/' + preId;
	ev.stopPropagation();
});


//点击向后按钮
goNext.on('tap',function(ev){
	if(goNext.css('opacity')==0){
		goNext.css('opacity',1);
	}
	show_pic.index++;
	if(show_pic.index==show_pic.albumArr.length){
		show_pic.index = show_pic.albumArr.length - 1;
		return;
	}
	var nextId = show_pic.albumArr[show_pic.index];
	show_pic.showOut();
	window.location.href = '/photos/' + nextId;
	ev.stopPropagation();
});


$('.big_pic_msg').on('tap',function(){
//	$(this).css('background-color','#eee');
//	$(this).animate({ 'background-color':'#fff'},60);
	window.location.href = '/album/'+show_pic.album_id;
//	$(this).css('background-color','#fff');
});

//初始化
(function(){
	show_pic.photo_id = parseInt(show_pic.get_host_name());
	show_pic.real_h = show_pic.get_img_h();
	show_pic.showLargePic(show_pic.photo_id);
})();
















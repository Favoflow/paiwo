var pghomein = {
	img_h:0,
	album_id:0,
	get_album_id:function(){
		var url = window.location.href;
		var index = url.lastIndexOf('/')+1;
		if(url.lastIndexOf('?')!=-1){
			var end = url.lastIndexOf('?');
			album_id = url.substring(index,end);
		}else{
			album_id = url.substring(index);
		}
		return album_id;
	},
	put_tag:function(data){
		var len = 0;
		if(data.length>16){
			len = 15;  //至多输出4个 
		}else{
			len = data.length;
		}

		var str = '"';
		for(var i=0;i<len;i++){ 
			if(i==len-1){
				str+= data[i];
			}else{
				str+= data[i]+'|';
			}
		}
		str += '"';
		return str;	
	},
	get_img_h:function(){   //计算图片高度
		var parent = $('<div class="photos-list"><img src="/static/phone/images/photo.jpg"></div>').appendTo('.album-in-photos');
		var _height = parent.find('img').get(0).scrollWidth;
		parent.remove();
		return _height;
	},
	get_album_list:function(id){
        
		base.ajax({
			data:{
			     'method': 'paiwo.content.album.get',
			     'album_id': id
		    },
			success:function(data){
				if(data.error_id==0){
					var _info = data.response,
						_list = _info.photo_list,
						_name = document.querySelector('.album_name'),
						_tag = document.querySelector('.album_tag'),
						_photos = document.querySelector('.album-in-photos'),
						_back = document.querySelector('.back'),
						str = '';
						_back.setAttribute('href','/'+_info.author_domain);
						_name.innerHTML = _info.album_name;
						_tag.innerHTML = pghomein.put_tag(_info.tags);
						for(var i=0;i<_list.length;i++){
							str += '<div class="photos-list" data-code="'+_list[i].photo_id+'">'+
								'<img height="" src="http://image.paiwo.co/'+_list[i].photo_path+'@!560x560">'+
							'</div>';
						}
						_photos.innerHTML = str;
				}
			},
			error:function(data){
				
			}
		});
	}
};


//初始化
(function(){
    pghomein.img_h = pghomein.get_img_h();
	pghomein.album_id = pghomein.get_album_id();
	pghomein.get_album_list(pghomein.album_id);    
})();


//点击大图
$('.album-in-photos').on('tap','.photos-list',function(){
	var photo_id = $(this).attr('data-code');
	window.location.href = '/photos/'+photo_id;
});











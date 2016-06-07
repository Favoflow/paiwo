var host = {};
var scroll_flag = false;
var sec_flag = false;
var alert_body = $('#delete_alert');
var select_del = null; //删除相册的ID
var in_album;
var now_url = window.location.href;  
var is_winsrcoll = false;
var state_object = {
		title: "album",
		url: "/album"
};
var album_list = {}; //保存相册编号和对应相册数量的map
var like_num = 0; //摄影师主页赞的数量
var favourite_num = 0; //摄影师主页收藏的数量
var album_list_tmp = [];


//获取album的id
function get_album_id(){
    var url = window.location.href;
    var start_index = url.lastIndexOf('/')+1,
    	end_index = url.lastIndexOf('#');
    
    if(url.lastIndexOf('?')!=-1){  //跟随参数
        var end = url.lastIndexOf('?');
        
        if(url.lastIndexOf('#')!=-1){
            album_id = url.substring(start_index,end_index);
        }else{
            album_id = url.substring(start_index,end);
        }
        
        
    }else{
        if(url.lastIndexOf('#')!=-1){  //无参数
            album_id = url.substring(start_index,end_index);
        }else{
            album_id = url.substring(start_index);
        }
        
	}
    
//    console.log(album_id);
    return album_id;
}

//获取album的状态
function get_album_status(){
	var url = window.location.href;
	var start_index = url.lastIndexOf('#')+1;
	if(url.lastIndexOf('?')!=-1){  //跟随参数
        var end = url.lastIndexOf('?');
        
        if(url.lastIndexOf('#')!=-1){
            album_status = url.substring(start_index);
        }else{
            album_status = url.substring(start_index);
        }
        
        
    }else{
        if(url.lastIndexOf('#')!=-1){  //无参数
            album_status = url.substring(start_index);
        }else{
            album_status = url.substring(start_index);
        }
        
	}
	return album_status; 
}


//显示专辑内页
var album_cover_path = '',
    album_album_name = '',
    album_author_name = '',
    album_album_id = '';

function showInnerPic(id,is_first){
    
    var is_first = is_first || false;
    select_del = id;
	photo_flag = 1;
	base.ajax({
		data:{
			'method': 'paiwo.content.album.get',
			'album_id': id
		},
		success:function(data){
			if(data.error_id == 0){
                
		        is_winsrcoll = false;
				var oBody = document.body;
				album_cover_path = data.response.cover_path;
				album_album_name = data.response.album_name;
				album_author_name = data.response.author_name;
				album_album_id = data.response.album_id;
				$('#bigpic').remove();
				$('.black_bac').hide();
                album_info = data.response;
				var copy_right = $('.album_comment_tab_copyright');
				copy_right.find('span').hide();
		        /**隐藏已经显示的大图**/
		        switch(data.response.cc_protocol){
					case 1:
						copy_right.find('.t1').show();
						break;
					case 2:
						copy_right.find('.t2').show();
						break;
					case 3:
						copy_right.find('.t3').show();
						break;
					case 4:
						copy_right.find('.t4').show();
						break;
					case 5:
						copy_right.find('.t5').show();
						break;
					case 6:
						copy_right.find('.t6').show();
						break;
					case 7:
						copy_right.find('.t7').show();
						break;
					case 8:
						copy_right.find('.t8').show();
						break;
					default:
						copy_right.html('');
				}
				in_album = data.response;
				if(in_album.is_self){
				  $('.pocket-edite').attr('href', '/album/edit#/'+in_album.album_id).show();
                  $('.pocket-delet').show(); 
				}else{
				  $('.pocket-edite').hide();	
		          $('.pocket-delet').hide();    
				}

		        album_list_tmp = data.response.photo_list;

		        var tmNormal = $.tmpl(normal_tm, data.response.photo_list);
		        $('.photo_section_normal').append(tmNormal);//第一个模板
		        getSec();//第二个模板
		        if(sec_flag){
		        	$('.photo_section_free li').css('opacity',1);
		        }
		        getThird();//第三个模板

                //头像
                $('.title_photo_ava img').attr('src',base.showAvatar(in_album.author_avatar));
                $('.title_photo_ava').attr({'href':'/'+in_album.author_domain,'title':album_info.author_name});
                $('.photo_name').attr({'href':'/'+in_album.author_domain});
                $('.photo_name').html(in_album.author_name);
                
                
                
                
                if(!is_first){
                  album.hide();
		          photo.hide();
		          intro.hide();
                }
                
                photo.fadeIn(400);
				
				$('#p-name').html(data.response.album_name);

		        function make_taglist() {
		            var _tag_list = data.response.tags;
		            if (!_tag_list.length){
		                $('#album_tags_list').html('');
		            }else{
//		            	console.log(_tag_list.length);
		                var _tm = '';
		                for(var _i = 0; _i < _tag_list.length; _i++){
		                    _tm += '<li>' + data.response.tags[_i] + '</li>';
		                }
		                var _temp = '<sup>“</sup><ul class="title_tipbox_ul">' + _tm + '</ul><sup>”</sup>'
		                $('#album_tags_list').html(_temp)
		            }
		        }

		        make_taglist();
				$('#album-desc').html(data.response.album_desc);
			}else{
		        if(data.error_id == 105008){
		            showMessage('该相册已经被作者删除');
		            var name = window.location.pathname;
		            window.history.replaceState('', '', name);
		        }
		    }


		},
		error:function(data){

		}

	});
}


//模板二
function getSec(){
	var sec_list = album_list_tmp;
	var num = sec_list.length;
	var tmFree_arr = [];
	var phFree = $('.photo_section_free').find('li');
	for(var i=0;i<num;i++){
		tmFree_arr[0] = sec_list[i];
		var tmFree = $.tmpl(free_tm,tmFree_arr);
		$('.photo_section_free').append(tmFree[0]);
		var oImg = new Image();
		oImg.addEventListener('load',function(){
			sec_flag = true;
			waterfall();
		});
		$('.photo_section_free li').eq(i).css('opacity',1);
		oImg.src = "http://image.paiwo.co/"+tmFree_arr[0].photo_path+base.retinaPixel['w280'];
	}
}

//模板三
function getThird(){
    var photo_list = album_list_tmp;
    var tmArr = [];
    var num = photo_list.length>8?8:photo_list.length;
    for(var i=0;i<num;i++){
        var tmFull = $.tmpl(full_tm,photo_list);
        tmArr[i] = tmFull[0];
        photo_list.shift();
    }        
    $('.photo_section_full').append(tmArr);
    tmArr = [];
}

window.addEventListener('scroll',function(){
	if($('.photo-arrange-full').hasClass('photo-full-cur')){
		scroll_flag = true;
		if (scroll_flag){
			var scrollB = document.documentElement.clientHeight + (document.documentElement.scrollTop||document.body.scrollTop);
			var fullSection = $('.photo_section_full')[0].scrollHeight + getPos($('.photo_section_full')[0]);
			if(scrollB>fullSection){
				getThird();
			}
		}
	}else {
		scroll_flag = false;
	}
});


//获取元素位置
function getPos(obj){
	var t=0;
	while(obj){
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return t;
}


//第二种排列方式的瀑布流
function waterfall(){
	var photoMargin = 23;
	var phs = $('.photo_section_free')[0];
	var phLis = $('.photo_section_free li');
	var phLis_W = phLis[0].offsetWidth+photoMargin;
	var n = parseInt(phs.offsetWidth/phLis_W);
	var h = [];
	for(var i=0;i<phLis.length;i++){
		var phli_H = phLis[i].offsetHeight;
		if(i<n){
			h[i]=phli_H;
			phLis[i].style.top = 0 +'px';
			phLis[i].style.left = i*phLis_W+'px';
			var max_liH = Math.max.apply(null,h);
			$('.photo_section_free').css('height',max_liH);
		}else{
			var min_liH = Math.min.apply(null,h);
			var minKey = getminkey(h,min_liH);
			h[minKey]+=phli_H+photoMargin;
			phLis[i].style.top = min_liH+photoMargin+'px';
			phLis[i].style.left = minKey*phLis_W+'px';
			var max_liH = Math.max.apply(null,h);
			$('.photo_section_free').css('height',max_liH);
		}
	}
}

//返回高度值最小的位置
function getminkey(s,v){
	for(var k in s){
		if(s[k]==v){
			return k;
		}
	}
}


//seo keywords
function setSeo(name,tags,address,desc){
    $('title').html(name +'｜拍我网');
    var tagStr = '',
        addStr = '';
    for(var i=0;i<tags.length;i++){
        tagStr += tags[i].tag_word+' ';
    }
    
    for(var i=0;i<address.length;i++){
        addStr += allArea[address[i]]+' ';
    }
    
    $('meta[name="keywords"]').attr('content',name+' paiwo 拍我 拍我网 摄影 摄影师 ' + tagStr + ' ' + addStr);
    $('meta[name="description"]').attr('content',name +'｜拍我网 (专业的人像摄影服务平台) '+desc);
}





//删除专辑
function deleteAlbum(){

    
    
                base.ajax({

                        data:{
                            'method': 'paiwo.content.album.delete',
                            'album_id': select_del
                        },

                        success:function(data){
                            if(data.error_id == 0){
                                window.location.href = '/'+album_info.author_domain;
                            }
                            else {
//                                slideMessage("上传错误");
                            }
                        },

                        error:function(data){
                //            slideMessage('网络错误');
                        }

                });
    
}


//添加赞
function doLike(id){

    
     base.ajax({
                
            data:{
                'method': 'paiwo.user.like.add',
                'content_id': id,
                'content_type': 1
            },


            success:function(data){

                if(data.error_id == 0){
                   like_num = like_num + 1;
			       $('.tab_left_likes span').html(like_num);
                }

            },

            error:function(data){
                slideMessage('网络错误');
            }

    });

}

//取消赞
function unLike(photo_id){

    
            base.ajax({
                
                data:{
                    'method': 'paiwo.user.like.delete',
                    'content_id': photo_id,
                    'content_type': 1
                },


                success:function(data){

                    if(data.error_id == 0){
                        like_num = like_num - 1;
			            $('.tab_left_likes span').html(like_num);
					}   

                },

                error:function(data){
                    slideMessage('网络错误');
                }

            });
}






//取消收藏
function unAddPhoto(photo_id){
	$.ajax({
		url: '/a/photo/favorite/unfavorite',
		type: 'POST',
		dataType: 'json',
		data: {photo_id: photo_id},
		success:function(data){
			$('.photo_fixbox_dinged[data='+photo_id+']').removeClass().addClass('photo_fixbox_ding');
			
			favourite_num = favourite_num - 1;
			$('.tab_left_dings span').html(favourite_num);
		}
	});	
}

var big_back;
function uploadfile(fileObj){
        if (fileObj != null){
            var base_url = "http://paiwo.oss-cn-hangzhou.aliyuncs.com";
            var FileController = base_url;
            var form = new FormData();
            var flag = false;
            $.ajax({
                async: false,
                type: "POST",
                url: "/a/photographer/banner/uploadurl/get",
                dataType: 'json',
                success: function(data) {
                    form.append("Signature", data.response.signature);
                    form.append("policy", data.response. policy);
                    form.append("OSSAccessKeyId", data.response.key_id);
                    form.append("key", data.response. object_key);
                    form.append("success_action_status", 201);
                    flag = true;
                },
                error: function() {
                    flag = false;
                }
            });
            if(flag){
                form.append("file", fileObj);
                var xhr = new XMLHttpRequest();
                xhr.open("post", FileController, false);
                xhr.onload = function () {
                      var obj = $(xhr.response).find("Key").html();
                      big_back= obj;
                };
                xhr.send(form);         
            }else{
				$('.banner_loading').css('width','0%');
                showMessage('网络错误..');
            }
          }
//		//console.log(big_back);
          $.ajax({
                async: false,
                type: "POST",
                url: "/a/photographer/style/put",
                dataType: 'json',
                data:{banner_photo: big_back},
                success: function(data) {
                   if(data.error_id == 0){
					   var _loading = $('.banner_loading');
					   var _url = 'http://image.paiwo.co/'+big_back+'@!banner';
					   var oImg = new Image();
					   oImg.src = _url;
					   oImg.onload = function(){
						   $('.banner_bg').fadeOut(400);
					   	   _loading.animate({'width':'100%'},200,'swing',function(){
							 _loading.css('width','0%');
							 $('.header-back-up').fadeOut(400);
							 $('.header-back-img').addClass('header-back-select');
					   		 $('.banner_bg').css('background-image','url('+_url+')').fadeIn(400);
					   		 $('.header-back-img').css('background-image','url('+_url+')').fadeIn(400);
						  });
					   };
                   }
                },
                error: function() {
					$('.banner_loading').css('width','0%');
                    showMessage('网络错误');
                }
            });

}

paiwoPhoto.on('dolikeOut', function(id){
         var t = $('li[data='+id+']');
		 t.find('.photo_fixbox_like').removeClass().addClass('photo_fixbox_liked');
		 t.find('.inner_liked_img').show();


});

paiwoPhoto.on('unlikeOut', function(id){
         var t = $('li[data='+id+']');
		 t.find('.photo_fixbox_liked').removeClass().addClass('photo_fixbox_like');
		 t.find('.inner_liked_img').hide();
});

paiwoPhoto.on('unfavoriteOut', function(id){
   $('.photo_fixbox_dinged[data='+id+']').removeClass().addClass('photo_fixbox_ding');
    
});

paiwoPhoto.on('dofavoriteOut', function(id){
   $('.photo_fixbox_ding[data='+id+']').removeClass().addClass('photo_fixbox_dinged');
});
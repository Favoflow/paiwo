//tab切换
$('.pg_info li').tap(function(){
      if($('.pg_info li').index($(this))==0){
        $('.pg_border').animate({'-webkit-transform':'translate3d(0,0,0)'},200);
        $('.pg_album').show();
        $('.pg_msg').hide();
        $(this).addClass('pg-info-cur').siblings().removeClass('pg-info-cur');
      }
      else if($('.pg_info li').index($(this))==2) {
        $('.pg_border').animate({'-webkit-transform':'translate3d(1.61rem,0,0)'},200);
        $('.pg_album').hide();
        $('.pg_msg').show();
        $(this).addClass('pg-info-cur').siblings().removeClass('pg-info-cur');
      }
 });

//简介下拉
 $('.ifspread').tap(function(){
    if($(this).parent('div').find('.spread-main').css('display')== 'none') {
      $(this).parent('div').find('.spread-main').css({'display':'block'});
      $(this).animate({'-webkit-transform':'rotate(0)','transform':'rotate(0)'},200);
    }
    else {
      $(this).parent('div').find('.spread-main').css({'display':'none'});
      $(this).animate({'-webkit-transform':'rotate(180deg)','transform':'rotate(180deg)'},200);
    }
  });

var pghome = {
	host:null,
	pg_id:0,
    albumPageNo:1,
    feedPageNo:1,
	count:0,
    b_load:true,
    load_end:true,
	get_host_name:function(){
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
		var parent = $('<div class="pg_album_list"><a href="javascript:;"><img src="/static/phone/images/photo3.jpg"><h4></h4><i></i></a></div>').appendTo('.pg_album');
		var _height = parent.find('img').get(0).scrollWidth;
		parent.remove();
		return _height;
	},
	is_avatar:function(url){
		var avatar_url = '';
		if(url=='0'){
			avatar_url = '/static/phone/images/user_head.gif';
		}else{
			avatar_url = 'http://image.paiwo.co/'+url;
		}
		return avatar_url;
	},
	put_tag:function(data){
		var len = 0;
		if(data.length>5){
			len = 4;  //至多输出4个 
		}else{
			len = data.length;
		}

		var str = '<span>"</span>';
		for(var i=0;i<len;i++){ 
			if(i==len-1){
				str+='<span>'+data[i]['tag_word']+'</span>';
			}else{
				str+='<span>'+data[i]['tag_word']+'</span><i>|</i>';
			}
		}
		str += '<span>"</span>';
		return str;	
	},
	is_sex:function(sex){
		if(sex == '1'){
			return 'boy';
		}else if(sex=='2'){
			return 'girl';
		}
		else{
			return 'nosex';
		}
	},
	put_gender:function(num){
		if(num==1){
			return '男';
		}else if(num==2){
			return '女';
		}
	},
	put_banner:function(data){
		if(data){
			return 'url(http://image.paiwo.co/'+data+')';
		}else{
			return 'url(/static/images/bg.jpg)';
		}
	},
	put_brith:function(date){
		if(date=='')return;
		var date_arr = date.split('-');      //根据‘-’将出生日期分成数组
		var str = ''+date_arr[0]+'年'+date_arr[1]+'月'+date_arr[2]+'日';
		var date_str = '<li>'+
				'<span>生日/</span>'+
				'<i>'+str+'</i>'+
			'</li>';
		return date_str;
	},
	pg_info:function(host){  //获取摄影师信息

		base.ajax({
            data:{
                'method': 'paiwo.home.get',
                'host_domain':pghome.host
            },
			success: function(data){
//				console.log(data);
				if(data.error_id==0){
					var _info = data.response,
					    _avatar = document.querySelector('.photog_avatar'),  //头像
						_tag = document.querySelector('.photog_key'),  //tag
						_nick = document.querySelector('.photog_nick'),  //昵称
						_bg = document.querySelector('.photog_over'),  //banner背景
						_collect = document.querySelector('.count_coll'), //收藏数
						_like = document.querySelector('.count_like'),//赞的数
						_album = document.querySelector('.pg_album'), //专辑父级
						_intro = document.querySelector('#pg_intro'), // 简介父级
						_contact = document.querySelector('#pg_contact'),  //联系方式父级
						_type = document.querySelector('.photo_type'),  //拍摄类型
						_address = document.querySelector('.photo_address'),  //街拍地
						intro_json = {},
						contact_json = {};
						pghome.pg_id = _info.photographer_id;
						pghome.count = _info.album_count;
					
						//装数据
						intro_json.desc = _info.host_desc;
						intro_json.host = _info.host_domain;
//						intro_json.birth = _info.birthday;
						intro_json.gender = _info.gift;
                    
//						contact_json.phone = _info.phone;
//						contact_json.qq = _info.qq;
//						contact_json.wechat = _info.wechat;
//						contact_json.weibo = _info.weibo;
                    
                        //tab
                        if(_info.gift==0){ //非摄影师
                            tabSwitch.html('<span class="pg-cla-line" style="width:50%;"></span><ul><li class="feed pg-cla-cur" style="width:50%;">主页</li><li class="info" style="width:50%;">简介</li></ul>');
                        }else{  //摄影师
                            tabSwitch.html('<span class="pg-cla-line"></span><ul><li class="feed pg-cla-cur">主页</li><li class="album">相册</li><li class="info">简介</li></ul>');
                        }
					
						//banner
//						_tag.innerHTML = pghome.put_tag(_info.tag_list);
						_avatar.setAttribute('src',base.showAvatar(_info.host_avatar));
//						_nick.innerHTML = _info.host_name+'<i class="'+pghome.is_sex(_info.gift)+'"></i>';
                        _nick.innerHTML = _info.host_name;
						_bg.style.backgroundImage = pghome.put_banner(_info.banner_photo);
						_collect.innerHTML = '<i></i>'+_info.favorite_count;
						_like.innerHTML = '<i></i>'+_info.like_count;
						
						//简介
						_intro.innerHTML =  pghome.put_intro(intro_json);
					
						//联系方式
//						_contact.innerHTML = pghome.put_contact(contact_json);
					
						//接拍类型
						_type.innerHTML = pghome.services_type(_info.photograph_type);
						
						//街拍地
						_address.innerHTML =  pghome.put_take_location(_info.photograph_address);
                    
						
				}
			},
			error:function(data){

			}
		});
	},
	get_album_list:function(host){   //输出专辑
        
		base.ajax({
            
            async:true,
            
			data:{
                'method': 'paiwo.content.album_list.get',
                'host_domain': host,
                'page_no': pghome.albumPageNo,
                'page_size':6
            },
            
			success : function(data){
//				console.log(data);
				if(data.error_id==0){
					var response = data.response,
                        album_list = data.response.album_list,
						album_str = '';
                    
                    //检测是否加载完毕
                     if((response.page_no*response.page_size)>=response.count){
                       pgAlbum.find('.more-album').hide();
                    }else{
                       pgAlbum.find('.more-album').show();
                    }
                  
                    
					for(var i=0;i<album_list.length;i++){
						album_str+= '<div class="pg_album_list" data-code="'+album_list[i].album_id+'">'+
							'<a href="/album/'+album_list[i].album_id+'" class="img-a">'+
							  '<img height="" src="http://image.paiwo.co/'+album_list[i].cover_path+'@!560x560">'+
                              '</a>'+
                            
                              '<a href="/album/'+album_list[i].album_id+'">'+
							     '<div class="bottom-tit"><h4>'+album_list[i].album_name+'</h4>'+
							     '<i>'+album_list[i].photo_count+'</i></div>'+
							  '</a>'+
						  '</div>';
					}
                    
                    
					pgAlbum.find('.pg_album_main').append(album_str);
//                    if(album_list.length<response.page_size){
//                        pghome.load_end = false;
//                    }else{
//                        pghome.load_end = true;
//                    }
//                    pghome.b_load = true;
					
				}
			},
            
			error : function(data){
				
			}
		});
	},
    get_feed_list: function(host){
        base.ajax({
            data:{
                'method': 'paiwo.content.dynamic_list.get',
                'host_domain': host,
                'page_no': pghome.feedPageNo,
                'page_size': 4
            },
            success:function(data){
                if(data.error_id==0){
                    var response = data.response,
                        feedList = response.content_list,
                        str = '',
                        pgFeedMain =  pgFeed.find('.pg_all_main');
                    
                    
//                enum_content_type = Enum(
//                    publish_album=1,
//                    publish_pocket=2,
//                    join_activity=3,
//                    join_group=4,
//                    recommend_photo=5,
//                    recommend_pocket=6,
//                    recommend_activity=7,
//                    recommend_group=8,
//                )
//                    console.log(feedList);
                    
                    //feed为空时
                    if(response.count==0){
                        str='<div class="pg_all_type pg_recphoto">'+
                            '<div class="pg_pocket_main" style="background-image:url(/static/images/cute_bac/no_fans2.jpg);background-size: 80%;top:-40px;">'+
//                                '<div class="pg_all_shadow"></div>'+
                                '<div class="pg_pocket_tit" style="height:30px;">'+
                                    '<h3></h3>'+
                                    '<h4 style="color:#8a8880;">这个人很聪明，什么都没有留下</h4>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
                        
//                        pgFeedMain.append(str);
//                        return;
                    }
                    
                    //检测是否全部加载
                    if((response.page_no*response.page_size)>=response.count){
                        pgFeed.find('.more-feed').hide();
                    }else{
                        pgFeed.find('.more-feed').show();
                    }
                    
                    for(var i=0;i<feedList.length;i++){
                        
//                        console.log(feedList[i].content_type);
                        
                        switch(feedList[i].content_type){
                            case 1: //发布专辑
//                                console.log(feedList[i]);
                                var single = '';
                                if(feedList[i].photo_list.length==1){
                                     single = 'pg_pubalbum_one';
                                }
                               
                            str+= '<div class="pg_all_type pg_pubalbum" data-code="'+feedList[i].content_id+'">'+
                                    '<p class="pg_all_top">'+
                                        '<span class="pg_all_tit">发布了影集</span>'+
                                        '<a class="pg_album_name" href="/album/'+feedList[i].content_id+'">'+feedList[i].content_title+'</a>'+
                                        '<span class="pg_all_time">'+base.renderTime(feedList[i].create_time)+'</span>'+
                                    '</p>'+
            //                若是发布的影集只有1张照片时，<div class="pg_pubalbum_main pg_pubalbum_one">
                                    '<div class="pg_pubalbum_main '+single+'">'+
                                    pghome.put_feed_cover(feedList[i].photo_list)+
                                    '</div>'+
                                '</div>';
                                break;
                            case 2: //发布图文
                                 str+='<div class="pg_all_type pg_recpocket" data-code="'+feedList[i].content_id+'">'+
                                    '<p class="pg_all_top">'+
                                        '<span class="pg_all_tit">发布了图文</span>'+
                                        '<span class="pg_all_time">'+base.renderTime(feedList[i].create_time)+'</span>'+
                                    '</p>'+
                                    '<div class="pg_pocket_main" style="background-image:url(http://image.paiwo.co/'+feedList[i].photo_list[0].photo_path+'@!1d5)">'+
                                        '<a href="/pocket/'+feedList[i].content_id+'">'+
                                            '<div class="pg_all_shadow"></div>'+
                                            '<div class="pg_pocket_tit">'+
                                                '<h3>'+feedList[i].content_title+'</h3>'+
                                                '<h4>'+feedList[i].content_desc+'</h4>'+
                                            '</div>'+
                                        '</a>'+
                                    '</div>'+
                                '</div>'
                                break;
                            case 5:  //推荐照片
                                if(feedList[i].is_delete){ //内容被删除
                                     str+='<div class="pg_all_type pg_recphoto">'+
                                        '<p class="pg_all_top">'+
                                            '<span class="pg_all_tit">推荐了照片</span>'+
                                            '<span class="pg_all_time">'+base.renderTime(feedList[i].create_time)+'</span>'+
                                        '</p>'+
                                        '<div class="pg_pocket_main" style="background-image:url(/static/images/cute_bac/delete.png);background-size: 66%;">'+
//                                            '<div class="pg_all_shadow"></div>'+
                                            '<div class="pg_pocket_tit" style="height:30px;">'+
                                                '<h3></h3>'+
                                                '<h4 style="color:#8a8880;">原内容已被删除</h4>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                                }else{  //内容未被删除
                                    str+= '<div class="pg_all_type pg_recphoto">'+
                                        '<p class="pg_all_top">'+
                                            '<span class="pg_all_tit">推荐了照片</span>'+
                                            '<span class="pg_all_time">'+base.renderTime(feedList[i].create_time)+'</span>'+
                                        '</p>'+
                                        '<div class="pg_photo_main">'+
                                            '<a href="/photos/'+feedList[i].content_id+'">'+
                                            '<img src="http://image.paiwo.co/'+feedList[i].photo_list[0].photo_path+'@!600x600">'+
                                            '</a>'+
                                        '</div>'+
                                        '<p class="pg_all_author">'+
                                            '<span>原作者</span>'+
                                            '<span>|</span>'+
                                            '<span><a href="/'+feedList[i].content_author_domain+'">'+feedList[i].content_author_name+'</a></span>'+
                                        '</p>'+
                                    '</div>';
                                }
                               
                                break;
                            case 6:  //推荐图文
                                if(feedList[i].is_delete){
                                     str+='<div class="pg_all_type pg_recpocket">'+
                                        '<p class="pg_all_top">'+
                                            '<span class="pg_all_tit">推荐了图文</span>'+
                                            '<span class="pg_all_time">'+base.renderTime(feedList[i].create_time)+'</span>'+
                                        '</p>'+
                                        '<div class="pg_pocket_main" style="background-image:url(/static/images/cute_bac/delete.png);background-size: 66%;">'+
//                                            '<div class="pg_all_shadow"></div>'+
                                            '<div class="pg_pocket_tit" style="height:30px;">'+
                                                '<h3></h3>'+
                                                '<h4 style="color:#8a8880;">原内容已被删除</h4>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';
                                }else{
                                    
                                    str+='<div class="pg_all_type pg_recpocket">'+
                                        '<p class="pg_all_top">'+
                                            '<span class="pg_all_tit">推荐了图文</span>'+
                                            '<span class="pg_all_time">'+base.renderTime(feedList[i].create_time)+'</span>'+
                                        '</p>'+
                                        '<div class="pg_pocket_main" style="background-image:url(http://image.paiwo.co/'+feedList[i].photo_list[0].photo_path+'@!1d5)">'+
                                            '<a href="/pocket/'+feedList[i].content_id+'">'+
                                                '<div class="pg_all_shadow"></div>'+
                                                '<div class="pg_pocket_tit">'+
                                                    '<h3>'+feedList[i].content_title+'</h3>'+
                                                    '<h4>'+feedList[i].content_desc+'</h4>'+
                                                '</div>'+
                                            '</a>'+
                                        '</div>'+
                                        '<p class="pg_all_author">'+
                                            '<span>原作者</span>'+
                                            '<span>|</span>'+
                                            '<span class="pg_author_name"><a href="/'+feedList[i].content_author_domain+'">'+feedList[i].content_author_name+'</a></span>'+
                                        '</p>'+
                                    '</div>';
                                }
                                 
                                break;
                            default: 
                                str+='';
                                
                        }
                    }
                   pgFeedMain.append(str);
                   
////                    推荐图文
//                    '<div class="pg_all_type pg_recpocket">'+
//                        '<p class="pg_all_top">'+
//                            '<span class="pg_all_tit">推荐了图文</span>'+
//                            '<span class="pg_all_time">刚刚</span>'+
//                        '</p>'+
//                        '<div class="pg_pocket_main">'+
//                            '<div class="pg_all_shadow"></div>'+
//                            '<div class="pg_pocket_tit">'+
//                                '<h3>日照香炉生紫烟</h3>'+
//                                '<h4>自由摄影师--夏目</h4>'+
//                            '</div>'+
//                        '</div>'+
//                        '<p class="pg_all_author">'+
//                            '<span>原作者</span>'+
//                            '<span>|</span>'+
//                            '<span class="pg_author_name">James</span>'+
//                        '</p>'+
//                    '</div>'
//
////                推荐照片
//                    '<div class="pg_all_type pg_recphoto">'+
//                        '<p class="pg_all_top">'+
//                            '<span class="pg_all_tit">推荐了照片</span>'+
//                            '<span class="pg_all_time">3小时前</span>'+
//                        '</p>'+
//                        '<div class="pg_photo_main">'+
//                            '<img src="/static/images/photo.jpg">'+
//                        '</div>'+
//                        '<p class="pg_all_author">'+
//                            '<span>原作者</span>'+
//                            '<span>|</span>'+
//                            '<span>James</span>'+
//                        '</p>'+
//                    '</div>'
//
////                发布了影集
//                    '<div class="pg_all_type pg_pubalbum">'+
//                        '<p class="pg_all_top">'+
//                            '<span class="pg_all_tit">发布了影集</span>'+
//                            '<a class="pg_album_name">詹姆士的背影</a>'+
//                            '<span class="pg_all_time">昨天</span>'+
//                        '</p>'+
////                若是发布的影集只有1张照片时，<div class="pg_pubalbum_main pg_pubalbum_one">
//                        '<div class="pg_pubalbum_main">'+
//                            '<div class="pg_pubalbum_cover">'+
//                                '<img src="/static/images/photo4.jpg">'+
//                            '</div>'+
//                            '<ul class="pg_pubalbum_img">'+
//                                '<li><img src="/static/images/photo4.jpg"></li>'+
//                                '<li><img src="/static/images/photo4.jpg"></li>'+
//                                '<li></li>'+
//                            '</ul>'+
//                        '</div>'+
//                        '<p class="pg_all_author">'+
//                            '<span>原作者</span>'+
//                            '<span>|</span>'+
//                            '<span>James</span>'+
//                        '</p>'+
//                    '</div>'
                }
            },
            error:function(data){

            }
        });
    },
    
    put_feed_cover:function(photo_list){
       
        var str = '',
            cover = '',
            list = '',
            list_len = photo_list.length>4?4:photo_list.length;
        for(var i=0;i<list_len;i++){
            if(photo_list[i].is_cover){
                cover='<a href="/photos/'+photo_list[i].photo_id+'"><img src="http://image.paiwo.co/'+photo_list[i].photo_path+'@!600x600"></a>';
            }else{
                list+='<li><a href="/photos/'+photo_list[i].photo_id+'"><img src="http://image.paiwo.co/'+photo_list[i].photo_path+'@!280x280"></a></li>';
            }
        }
            str+='<div class="pg_pubalbum_cover">'+cover+'</div>'+
                 '<ul class="pg_pubalbum_img">'+list+
                 '</ul>';
        return str;
            
            
         
    },
	put_intro:function(json){  //输出简介 
		var str =''; 
		if(json.desc!=''){   //描述
			str+= '<li class="pg_info_desc">'+
				'<span>描述/</span>'+
				'<p>'+json.desc+'</p>'+
			  '</li>';
		}
		
		if(json.host!=''){  //主页
			str+='<li>'+
			  '<span>个性域名/</span>'+ 
			  '<em>paiwo.co/'+json.host+'</em>'+
			'</li>';
		}
		
//		if(json.birth!='None'){  //生日
//			str+= pghome.put_brith(json.birth);
//		}
		
		if(json.gender!=''){   //性别
			str+= '<li>'+
			  '<span>性别/</span>'+ 
			  '<i>'+pghome.put_gender(json.gender)+'</i>'+
			'</li>';
		}
		
		return str;
		
	},
	put_contact:function(json){  //输出联系方式
		var str = '';
		if(json.phone!=''){  //手机
			str+='<li>'+
			  '<span>手机号码/</span>'+ 
			  '<i>'+json.phone+'</i>'+
			'</li>';
		}

		if(json.qq){   //QQ
			str+='<li>'+
			  '<span>QQ/</span>'+
			  '<i>'+json.qq+'</i>'+
			'</li>';
		}

		if(json.wechat){   //微信
			str+='<li>'+
			  '<span>微信/</span>'+ 
			  '<i>'+json.wechat+'</i>'+
			'</li>';
		}

		if(json.weibo){  //微博
			str+='<li>'+
			  '<span>微博/</span>'+ 
			  '<i>'+json.weibo+'</i>'+
			'</li>';
		}

		return str;
	},
	services_type:function(num){   //输出服务类型
    
        
		var str = '<dt>—— 接拍类型 ——</dt>',
            arr = num.toString(2).split('').reverse(),
            type = ['人像写真','婚纱摄影','婚礼跟拍','家庭儿童','旅行跟拍','商业服务','其他'];
        
        
		if(arr.length==1 && arr[0].toString()==='0'){    
			str+='<dd>无</dd>';
		}else{
			
            for(var i=0;i<arr.length;i++){
                if(arr[i]==1){
                    str += '<dd>'+type[i]+'</dd>';
                }
			}
		}
		
		return str;
	},
	put_take_location:function(arr){  //输出街拍地
		var str ='<dt>—— 接拍地 ——</dt>';
		if(arr.length){
			for(var i=0;i<arr.length;i++){
				str+='<dd>'+get_area(arr[i])+'</dd>';
			}
		}else{
			str+='<dd>无</dd>';
		}
		function get_area(code){
			var area = code.substring(0,2);
			var prov = code.substring(0,5)+'-00-00';
			if(area=='01'){   //海外
				if(code=='01-00-00-00'){
					return '海外';
				}
				var oversea = allArea['province']['01-00-00-00']; 
				for(var name in oversea){
					if(name==code){
						return oversea[name];
					}
				}
			}else if(area=='02'){   //国内
				if(code=='02-00-00-00'){
					return '中国全境';
				}
				var china = allArea['province']['02-00-00-00'];
				var is_prov = code.substring(6);
				if(is_prov=='00-00'){
					for(var name in china){
						if(name==code){
							return china[name];
						}
					}
				}else{
					var city = code.substring(0,8)+'-00';
					for(var name in china){					if(name==prov){
							var city_json =  allArea['city'][prov]; 
							for(var name in city_json){
								if(name==city){
									return city_json[name];
								}else{
									var dis_json = allArea['district'][city];
									for(var name in dis_json){
										if(name==code){
											return dis_json[name];
										}
									}

								}
							}
						}
					}
				}
			}
		}//end

		return str;
	}
};

//滚动加载
//window.addEventListener('scroll',function(){
//	var winH = document.documentElement.clientHeight,
//		scrollT = document.documentElement.scrollTop || document.body.scrollTop,
//		scrollBottom = scrollT+winH,
//        bodyH = document.body.scrollHeight;
//    
////	   console.log(scrollBottom+'|'+bodyH+'|'+pghome.b_load+'|'+pghome.load_end);
//    
//		if(scrollBottom+100>bodyH && pghome.b_load && pghome.load_end){
//            pghome.b_load = false;
//            pghome.pageNo++;
//			pghome.get_album_list(pghome.host);
//		}
//    
//},false);



var pgFeed = $('.pg_all'),
    pgAlbum = $('.pg_album'),
    pgInfo = $('.pg_msg'),
    tabSwitch = $('.pg-classify');

(function(){
		//获取摄影师主页信息
		pghome.host = pghome.get_host_name();
		pghome.pg_info();
		pghome.get_album_list(pghome.host);
	    pghome.get_feed_list(pghome.host);
})();



//tab切换动画
 tabSwitch.on('tap','li',function(){
     
//     console.log(1);
 
    var $this = $(this), 
        index = $('.pg-classify li').index($this),
        end_pos = index*100;
    
    $('.pg-cla-line').css({
        '-webkit-transform':'translate3d('+end_pos+'%,0,0)',
        'transform':'translate3d('+end_pos+'%,0,0)'
    });
    

    if($this.hasClass('feed')){ //主流
        pgFeed.show();
        pgAlbum.hide();
        pgInfo.hide();
    }else if($this.hasClass('album')){  //专辑
        pgFeed.hide();
        pgAlbum.show();
        pgInfo.hide();
    }else if($this.hasClass('info')){  //个人信息
        pgFeed.hide();
        pgAlbum.hide();
        pgInfo.show();
    }else {  
        return;
    }
    
});

//加载feed
pgFeed.on('tap','.more-feed',function(){
    pghome.feedPageNo++
    pghome.get_feed_list(pghome.host);
});

//加载影集
pgAlbum.on('tap','.more-album',function(){
    pghome.albumPageNo++;
    pghome.get_album_list(pghome.host);
});










//边框移动
$('.pg_info li').tap(function(){
  if($('.pg_info li').index($(this))==0){
    $('.pg_border').animate({'-webkit-transform':'translate3d(0,0,0)'},200);
    $('.pg_border').css({'width':'1.36rem'});
    $('.pg-interview').show();
    $('.pg_msg').hide();
    $(this).addClass('pg-info-cur').siblings().removeClass('pg-info-cur');
  }
  else if($('.pg_info li').index($(this))==2) {
    $('.pg_border').animate({'-webkit-transform':'translate3d(2.03rem,0,0)'},200);
    $('.pg_border').css({'width':'1.68rem'});
    $('.pg-interview').hide();
    $('.pg_msg').show();
    $(this).addClass('pg-info-cur').siblings().removeClass('pg-info-cur');
  }
});

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

var pg_interviews = document.querySelector('.pg-interviews-main'); //访谈正文父级
var commendin = {
	_id:0,
	img_pos:[],
	get_pg_id:function(){
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
	is_avatar:function(url){
		var avatar_url = '';
		if(url=='0'){
			avatar_url = '/static/phone/images/user_head.gif';
		}else{
			avatar_url = 'http://image.paiwo.co/'+url;
		}
		return avatar_url;
	},
	get_pg_info:function(id){
		 $.ajax({
			url: '/a/recommend/photographer/post/get',
			type: 'POST',
			dataType: 'json',
			async: false,
			data: {post_id:id},
			success: function(data){
				console.log(data);
				if(data.error_id==0){
					var pg_info = data.result,
						_time = document.querySelector('.commend-time'),
						_title = document.querySelector('.commend-banner-tit span'),
						_subtitle = document.querySelector('.commend-banner-tit h2'),
						_avatar = document.querySelector('.commendbg-avatar img'),
						_name = document.querySelector('.commendbg-avatar h4'),
						_link = document.querySelector('.commendbg-avatar a'),
					    banner_bg = document.querySelector('.commend-banner'),
						_interview = document.querySelector('.pg-interviews-main'),
						summary_str = '',
						contact_str = '',
						contact_json = {},
						pg_summary = document.querySelector('#pg_summary'),//摄影师简介父级
						pg_contact =  document.querySelector('.pg_info_contact .spread-main'),  //摄影师联系方式父级
						pg_type = document.querySelector('.photo_type'), //拍摄类型父级
						pg_location = document.querySelector('.photo_address');  //街拍地父级
						contact_json.phone = pg_info.phone;
						contact_json.qq = pg_info.qq;
						contact_json.weibo = pg_info.weibo;
						contact_json.wechat = pg_info.wechat;
						_time.innerHTML = pg_info.post_date;
						_title.innerHTML = pg_info.post_second_title;
						_subtitle.innerHTML = pg_info.post_title;
						_avatar.setAttribute('src',commendin.is_avatar(pg_info.avatar));
						_name.innerHTML = pg_info.nick_name;
						_link.setAttribute('href','/'+pg_info.user_host);
						banner_bg.style.backgroundImage = 'url(http://image.paiwo.co/'+pg_info.post_big_photo+'@!banner)';
						_interview.innerHTML = pg_info.post_content;
					
					//摄影师简介
					summary_str+=commendin.put_desc(pg_info.user_desc)
					'<li>'+
					  '<span>个性域名/</span>'+ 
					  '<em>paiwo.co./'+pg_info.user_host+'</em>'+
					'</li>';
					pg_summary.innerHTML = summary_str;
					
					//摄影师联系方式
					pg_contact.innerHTML=commendin.put_contact(contact_json);
					
					//摄影师服务信息
					pg_type.innerHTML = commendin.services_type(pg_info.service_type_code);
//					pg_location.innerHTML = commendin.put_take_location(pg_info.service_address_code);
					
				}
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
	put_desc:function(data){
		var str='';
		if(data!=''){
			str='<li class="pg_info_desc">'+
			  '<span>描述/</span>'+
			  '<p>'+data+'</p>'+	
			'</li>';
		}
		return str;
	},
	put_gender:function(num){  //输出性别
		if(num==1){
			return '男';
		}else if(num==2){
			return '女';
		}
	},
	put_brith:function(date){   //输出生日
		var date_arr = date.split('-');      //根据‘-’将出生日期分成数组
		var str = ''+date_arr[0]+'年'+date_arr[1]+'月'+date_arr[2]+'日';
		return str;
	},
	put_contact:function(json){
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
	services_type:function(arr){
		var str = '<dt>—— 接拍类型 ——</dt>';
		if(arr.length){
			for(var i=0;i<arr.length;i++){
				switch(arr[i]){
					case '1':
						str+='<dd>婚纱</dd>';
						break;
					case '2':
						str+='<dd>写真</dd>';
						break;
					case '3':
						str+='<dd>婚礼</dd>';
						break;
					case '4':
						str+='<dd>儿童</dd>';
						break;
					case '5':
						str+='<dd>其他</dd>';
						break;
				}
			}
		}else{
			str+='<dd>无</dd>';
		}
		
		return str;
	},
	put_take_location:function(arr){
		var str ='<dt>—— 接拍地 ——</dt>';
		for(var i=0;i<arr.length;i++){
			str+='<dd>'+get_area(arr[i])+'</dd>';
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


//初始化
(function(){
	commendin._id = commendin.get_pg_id();
	commendin.get_pg_info(commendin._id);
})();


//加载完成获取图片坐标
window.addEventListener('load',function(){
	var img_arr = pg_interviews.getElementsByTagName('img');
	for(var i=0;i<img_arr.length;i++){
		commendin.img_pos.push(commendin.get_pos(img_arr[i]).top);
	}
	for(var i=0;i<2;i++){
		var _url = img_arr[i].getAttribute('data-src');
			img_arr[i].style.height = 'auto';
			img_arr[i].setAttribute('src',_url);
	}

},false);

//滚动加载图片
window.addEventListener('scroll',function(){
	var img_arr = pg_interviews.getElementsByTagName('img');
	var winH = document.documentElement.clientHeight,
		scrollT = document.documentElement.scrollTop || document.body.scrollTop,
		scrollBottom = scrollT+winH;
	for(var i=0;i<commendin.img_pos.length;i++){
		if(scrollBottom>=(commendin.img_pos[i-2]-100)){
			var _url = img_arr[i].getAttribute('data-src');
			img_arr[i].style.height = 'auto';
			img_arr[i].setAttribute('src',_url);
		}
	}
},false);


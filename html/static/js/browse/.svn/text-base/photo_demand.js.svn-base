// var a = getCookie('type');
//var b = getCookie('time');
//var c = getCookie('areaId');
//var d = getCookie('areaName');
//console.log(a+'|'+b+'|'+c+'|'+d);

//判断已经登录
var use_id = null;
var b_reSubmit = false;

//页面初始化，判断是否已经有订单

if(getCookie('reset')){  //点击重新交
	no_demand_init();  //从首页选择依然有记录
}else{
	$.ajax({
		url: '/a/demand/user_photo/get',
		type: 'POST',
		dataType: 'json',
		async:false,
		success:has_demand,
		error:function(){

		}
	});
}
	

//判断是否已经有订单成功回调
function has_demand(data){
			if(data.error_id==0){
				var demand_list = data.result;
				if(demand_list.is_demand==1){  //判断是否已经有订单
					//类型获取
					var demand_type = demand_list .service_type;
					function print_type(num){
						$('#photo_type').html('');
						switch(num){
							case 1:
								$('#photo_type').append('<dd data-code="1" class="yuepai_main_inputs_dd_clicked">婚纱</dd>');
								break;
							case 2:
								$('#photo_type').append('<dd data-code="2" class="yuepai_main_inputs_dd_clicked">写真</dd>');
								break;
							case 3:
								$('#photo_type').append('<dd data-code="3" class="yuepai_main_inputs_dd_clicked">婚礼</dd>');
								break;
							case 4:
								$('#photo_type').append('<dd data-code="4" class="yuepai_main_inputs_dd_clicked">儿童</dd>');
								break;
							case 5:
								var other_type = demand_list.service_word;
								$('#photo_type').append(other_type);
								break;
						}

					}

					print_type(demand_type);

					//<dd data-code="m" class="active"><u>先生</u></dd>

					//对象获取
					var demand_obj_arr = demand_list.service_obj.split(',');

					//输出对象函数
					function print_obj(){
						var obj_list = $('.yuepai_main_checkbox').html('');
						$('.yuepai_main_checkbox').css('padding-top',0);
						for(var i=0;i<demand_obj_arr.length;i++){
							switch(demand_obj_arr[i]){
								case 'm':
									$('.yuepai_main_checkbox').append('<dd data-code="m" class="active"><u>先生</u></dd>');
									break;
								case 'w':
									$('.yuepai_main_checkbox').append('<dd data-code="w" class="active"><u>小姐</u></dd>');
									break;
								case 'o':
									$('.yuepai_main_checkbox').append('<dd data-code="o" class="active"><u>老人家</u></dd>');
									break;
								case 'c':
									$('.yuepai_main_checkbox').append('<dd data-code="c" class="active"><u>小孩</u></dd>');
									break;
								case 'f':
									$('.yuepai_main_checkbox').append('<dd data-code="f" class="active"><u>全家福</u></dd>');
									break;
							}
						}
					}
					print_obj();


					//地点获取
					function print_address(){
						var area_code = demand_list.service_address;
						$('#area_output').html('');
						var c1 = area_code.substring(0,2);  //范围
						var c2 = area_code.substring(0,5);  //省
						var c3 = area_code.substring(0,8);  //市
						$('.yuepai_main_timeselect').css('border','none');
						if(c1=='01'){  //海外
							var ovearsea_json = allArea['province']['01-00-00-00'];
							for(var name in ovearsea_json){           
								if(area_code==name){
									$('#area_output').html(ovearsea_json[area_code]);
								}
							}
						} else if(c1=='02'){  //国内
							var prov = c2 + '-00-00'; //省份id
//							console.log(prov);
							var prov_json = allArea['province']['02-00-00-00'];  //省份列表
							if(prov=='02-01-00-00' || prov=='02-02-00-00' || prov=='02-03-00-00' || prov=='02-04-00-00' || prov=='02-33-00-00' || prov=='02-34-00-00'){
								for(var name in prov_json){
									if(prov==name){
										$('#area_output').html(prov_json[name]);
									}
								}
							}else{
								for(var name in prov_json){
									if(prov==name){
										var city_json = allArea['city'][name];   //城市列表
										for(var name in city_json){ 
											var prov_name = city_json[name];
											if(name==area_code){
												$('#area_output').html(city_json[name]);
											}

											var dis_json = allArea['district'][name];
											for(var name in dis_json){
												if(name==area_code){
													$('#area_output').html(dis_json[name]);
												}
											}
										}
									}
								}
								
							}
		
						}

					}

					print_address();

					//获取时间
					function print_time(){
						var time_code = demand_list.service_date;
						switch(time_code){
							case 1:
								$('.photo_main_time').html('<span><i class="key">*</i>拍摄时间:</span><div>一周内</div>');
								break;
							case 2:
								$('.photo_main_time').html('<span><i class="key">*</i>拍摄时间:</span><div>一个月内</div>');
								break;
							case 3:
								$('.photo_main_time').html('<span><i class="key">*</i>拍摄时间:</span><div>三个月内</div>');
								break;
							case 4:
								$('.photo_main_time').html('<span><i class="key">*</i>拍摄时间:</span><div>三个月内</div>');
								break;
						}
					}

					print_time();

					//获取预算
					function print_budget(){
						var low_price = demand_list.low_price;
						var high_price = demand_list.high_price;
						$('.yuepai_main_money ').html(low_price+' 至 '+high_price);
					}
					print_budget();

					//获取收藏夹
					function print_fav(){
						if(demand_list.favorite_id==''){
							$('.yuepai_main_albumli').hide();
							return;
						}
						var fav_list = demand_list.favorite_id.split(',');
						$('.yuepai_main_albumli').show();
						$.ajax({
							url: '/a/photo/favorite/detail/list',
							type: 'POST',
							dataType: 'json',
							async:false,
							data: {page_no: 1,
								   page_size:30},
							success:function(data){
								if(data.error_id==0){
									if(data.result.favorite_list!=''){
										$('.yuepai_main_albums').html('');

										var myfav_list = data.result.favorite_list;
										for(var i=0;i<myfav_list.length;i++){
											var name = myfav_list[i].favorite_name;   //收藏夹名称
											var id = myfav_list[i].favorite_id; //收藏夹id
											
											for(var j=0;j<fav_list.length;j++){
												if(fav_list[j]==id){
													var str ='';
													var pic_list= myfav_list[i].photo_list;
													
													if(pic_list.length>4){
														pic_list.length=4;
													}
													for(var z=0;z<pic_list.length;z++){
														var url = pic_list[z].photo_path;
														str += '<img src="http://image.paiwo.co/'+url+'@!120x120" class="store_album_img" />';
													}

													$('.yuepai_main_albums').append('<dd class="main_albums_show">'+str+'<p data-code="'+id+'">'+name+'</p></dd>');
													var add_width = $('.yuepai_main_albumli').get(0).offsetWidth + 155;
													$('.yuepai_main_albumli').css('width',add_width);
												}
											}
											
											
											
										}
									}

								}
							},
							error:function(){

							}
						});

					}

					print_fav();

					//获取要求
					if(demand_list.service_order!=''){
						var demand_text = demand_list.service_order;
						$('.yuepai_main_textarea').show();
						$('.yuepai_main_textarea').html('<span>具体要求:</span>'+demand_text);
					}else{
						$('.yuepai_main_textarea').hide();
					}



					//获取QQ
					if(demand_list.qq!=''){
						var demand_qq = demand_list.qq;
						$('.yuepai_main_qq').show();
						$('.yuepai_main_qq').html('<span>QQ:</span>'+demand_qq);
					}else{
						$('.yuepai_main_qq').hide();
					}


					//获取电话
					var demand_tel =  demand_list.phone ;
					$('.photo_main_tel').html('<span><i class="key">*</i>电话:</span>'+demand_tel);

					//获取微信
					if(demand_list.wechat!=''){
						var demand_wechat = demand_list.wechat;
						$('.yuepai_main_wechat').show();
						$('.yuepai_main_wechat').html('<span>微信:</span>'+demand_wechat);
					}else{
						$('.yuepai_main_wechat').hide();
					}


					//重新提交
					$('.submit_button').css('display','none');
					$('.reset_button').css('display','block');

				}else{   //没有订单情况
					no_demand_init();

				}



			}
}  //has_demand end



//无订单初始化
function no_demand_init(){
	if(getCookie('type') || getCookie('time') || getCookie('areaId')){  //获取cookie
		var photoType = getCookie('type');
		var photoTime = getCookie('time');
		
		//约拍类型读取
		var type_list = document.getElementById('photo_type').getElementsByTagName('dd');
		for(var i=0;i<type_list.length;i++){
			if(type_list[i].getAttribute('data-code')==photoType){
			   jQuery(type_list[i]).addClass('yuepai_main_inputs_dd_clicked');
			}
			type_list[i].setAttribute('data-code',i+1);
		}

		//约拍时间读取
		switch(photoTime){
			case 'week':
				$('.yuepai_main_timeselect').find('i').html('一周内').attr('data-code',1).css('color','#8a8880');
				break;
			case 'mouth':
				$('.yuepai_main_timeselect').find('i').html('一个月内').attr('data-code',2).css('color','#8a8880');
				break;
			case 'threeMouth':
				$('.yuepai_main_timeselect').find('i').html('三个月内').attr('data-code',3).css('color','#8a8880');
				break;
			case 'otherTime':
				$('.yuepai_main_timeselect').find('i').html('其他').attr('data-code',4).css('color','#8a8880');
				break;
		}

		//约拍地区读取
		var oversea_json = allArea['province']["01-00-00-00"];  //海外地区列表
		var home_prov_json = allArea['province']["02-00-00-00"]; //国内省份

		if(getCookie('areaId')){
			var photoAreaId = getCookie('areaId');
			var photoAreaName = getCookie('areaName');
//			console.log(photoAreaId+'|'+photoAreaName);
			if(photoAreaId.substring(0,2)=='01'){
				$('#sel_area').find('i').html('海外').attr('data-code','01-00-00-00');
				$('#sel_prov').find('i').html(photoAreaName).attr('data-code',photoAreaId);
				$('#sel_city').hide();
				for(var name in oversea_json){
					$('.place_select').append('<dd data-code="'+name+'">'+oversea_json[name]+'</dd>');
				}
			}else if(photoAreaId.substring(0,2)=='02'){
				$('#sel_area').find('i').html('国内').attr('data-code','02-00-00-00').css('color','#8a8880');
				var prov_code = photoAreaId.substring(0,5)+'-00-00';  //选择省份
				if(prov_code=='02-01-00-00' || prov_code=='02-02-00-00' || prov_code=='02-03-00-00' || prov_code=='02-04-00-00' || prov_code=='02-33-00-00' || prov_code=='02-34-00-00'){
					$('#sel_city').hide();
				}
				for(var name in home_prov_json){
					if(prov_code==name){
						$('#sel_prov').find('i').html(home_prov_json[name]).attr('data-code',prov_code).css('color','#8a8880');
					}
					$('#sel_prov').find('.place_select').append('<dd data-code="'+name+'">'+home_prov_json[name]+'</dd>');
				}
				 var city_list_json = allArea['city'][prov_code];  //当年省份所有城市列表

				for(var name in city_list_json){
					$('#sel_city').find('.place_select').append('<dd data-code="'+name+'">'+city_list_json[name]+'</dd>');
				}
				$('#sel_city').find('i').html(photoAreaName).attr('data-code',photoAreaId).css('color','#8a8880');


				for(var name in city_list_json){
					if(allArea['district'][name]){
						var district_json = allArea['district'][name];
						for(var name in district_json){
							var district_area = '<dd data-code="'+name+'">'+district_json[name]+'</dd>';
							$('#sel_city').find('.place_select').append(district_area);
						}
					}
				}

			}
		}

	}
}

 
//点击拍摄类型
$('#photo_type').on('click','dd',function(){
	$('#photo_type').find('dd').removeClass('yuepai_main_inputs_dd_clicked');
	$(this).addClass('yuepai_main_inputs_dd_clicked');
});

//点击拍摄对象
$('.yuepai_main_content').on('click','dd',function(){
	if($(this).find('i').css('display')=='block'){
		$(this).find('i').hide();
		$(this).removeClass('active');
	}else{
		$(this).find('i').show();
		$(this).addClass('active');
	}
});

//点击拍摄地点

//地区
$('#sel_area').on('click',function(ev){
	if($(this).find('.place_select').css('display')=='block'){
		$(this).find('.place_select').hide();
	}else{
		$(this).find('.place_select').html()
		$(this).find('.place_select').show();
		$('#sel_prov').find('.place_select').hide();
		$('#sel_city').find('.place_select').hide();
	}
	ev.stopPropagation();
});

$('#sel_area').on('click','dd',function(ev){
	//地区初始化
	var content = $(this).html();
	var id = $(this).attr('data-code');
	var code = $(this).attr('data-code');
	$('#sel_prov').find('.place_select').html('');
	$('#sel_prov').find('i').html('请选择').attr('data-code','').css('color','#bbb8b2');
	$('#sel_city').find('i').html('请选择').attr('data-code','').css('color','#bbb8b2');
	if(code=='01-00-00-00'){
		$('#sel_city').hide();
		var ovearsea = allArea['province']['01-00-00-00'];
		for(var name in ovearsea){
			var ovearsea_area = '<dd data-code="'+name+'">'+ovearsea[name]+'</dd>';
			$('#sel_prov').find('.place_select').append(ovearsea_area);
		}
	}else if(code=='02-00-00-00'){
		$('#sel_city').show();
		var home = allArea['province']['02-00-00-00'];
		for(var name in home){
			var home_area = '<dd data-code="'+name+'">'+home[name]+'</dd>';
			$('#sel_prov').find('.place_select').append(home_area);
		}
	}
	$('#sel_area').find('i').html(content).attr('data-code',id).css('color','#8a8880');
	$('#sel_area').find('.place_select').hide();
	//$('#sel_prov').find('.place_select').show();
	ev.stopPropagation();
});

//省份
$('#sel_prov').on('click',function(ev){
	if($(this).find('.place_select').css('display')=='block'){
		$(this).find('.place_select').hide();
	}else{
		$(this).find('.place_select').show();
		$('#sel_area').find('.place_select').hide();
		$('#sel_city').find('.place_select').hide();
	}
	ev.stopPropagation();
});

$('#sel_prov').on('click','dd',function(ev){
	//城市区初始化
	var content = $(this).html();
	var code = $(this).attr('data-code');
	var home = allArea['city'];
	$('#sel_city').find('i').html('请选择').attr('data-code','').css('color','#bbb8b2');
	$('#sel_city').find('.place_select').html('');
	
	
	//判断海外还是国内
	var c1 = code.substring(0,2);
	if(c1=='01'){
		$('#sel_city').hide();
	}else if(c1=='02'){
		//直辖市、特别行政区
		if(code=='02-01-00-00' || code=='02-02-00-00' || code=='02-03-00-00' || code=='02-04-00-00' || code=='02-33-00-00' || code=='02-34-00-00'){
			$('#sel_city').hide();
			$('#sel_city').find('i').attr('data-code','').css('color','#8a8880');
		}else{
			$('#sel_city').show();
			for(var name in home){
				if(name==code){
					var home_area_arr = allArea['city'][name];
					for(var name in home_area_arr){
						var home_area = '<dd data-code="'+name+'">'+home_area_arr[name]+'</dd>';
						$('#sel_city').find('.place_select').append(home_area);
					}
					for(var name in home_area_arr){
		//				var home_area = '<p data-code="'+name+'">'+home_area_arr[name]+'</p>';
						if(allArea['district'][name]){
							var district_arr = allArea['district'][name];
							for(var name in district_arr){
								var district_area = '<dd data-code="'+name+'">'+district_arr[name]+'</dd>';
								$('#sel_city').find('.place_select').append(district_area);
							}
						}

					}
				}
			}
		}
	}
	
	
	
	$('#sel_prov').find('i').html(content).attr('data-code',code).css('color','#8a8880');
	$('#sel_prov').find('.place_select').hide();
	//$('#sel_city').find('.place_select').show();
	ev.stopPropagation();
});


//城市
$('#sel_city').on('click',function(ev){
	if($(this).find('.place_select').css('display')=='block'){
		$(this).find('.place_select').hide();
	}else{
		$(this).find('.place_select').show();
		$('#sel_area').find('.place_select').hide();
		$('#sel_prov').find('.place_select').hide();
	}
	ev.stopPropagation();
});

$('#sel_city').on('click','dd',function(ev){
	var content = $(this).html();
	var id = $(this).attr('data-code');
	$('#sel_city').find('i').html(content).attr('data-code',id).css('color','#8a8880');
	$('#sel_city').find('.place_select').hide();
	ev.stopPropagation();
});


//点击拍摄时间
$('.yuepai_main_timeselect').on('click',function(ev){
	if($(this).find('.timeselect_select').css('display')=='block'){
		$(this).find('.timeselect_select').hide();
	}else{
		$(this).find('.timeselect_select').show();
	}
	ev.stopPropagation();
});

$('.yuepai_main_timeselect').find('dd').on('click',function(ev){
	var content = $(this).html();
	var id = $(this).attr('data-code');
	$('.yuepai_main_timeselect').find('i').html(content).attr('data-code',id).css('color','#8a8880');
	$('.timeselect_select').hide();
	ev.stopPropagation();
});

//点击参考收藏夹
$('.main_albums_add').on('click',function(ev){
	if(is_login == 0){
		loginInside.show();
		return;
	}
	$('.store_album_input_none').removeClass('store_button_submit');
	$('.store_album_input').html('请选择一个收藏夹');
	$('.store_album').html('');
	$('.store_album_select').html('');
	get_list();
	$('.store_box').show();
	$('.mask').show();
	ev.stopPropagation();
});


$('.store_button_cancel').on('click',function(ev){
	$('.store_box').hide();
	$('.mask').hide();
	ev.stopPropagation();
});


$('.mask').on('click',function(ev){
	$('.store_box').hide();
	$('.mask').hide();
	ev.stopPropagation();
});


//点击选择收藏
$('.store_album_input').on('click',function(ev){
	$('.store_album_select').show();
	ev.stopPropagation();
});

var photo_list = [];    //被选择的收藏夹封面图片
var photo_name = '';  //被选择的收藏夹名称
var now_list =  [];//当前已被添加的收藏夹名称
var now_id_arr = '';  //id

//选择收藏
$('.store_album_select').on('click','li',function(){
	$('.store_album_input_none').addClass('store_button_submit');
	photo_list = [];
	now_id_arr ='';
	photo_name ='';
	$('.store_album').html('');
	var now_id = $(this).attr('data-code');
	var name = $(this).html();
	$('.store_album_input').html(name);
	function get_collection(){
	$.ajax({
		url: '/a/photo/favorite/detail/list',
		type: 'POST',
		dataType: 'json',
		async:false,
		data: {page_no: 1,
			   page_size:30},
		success:function(data){
			if(data.error_id == 0){
				var list = data.result.favorite_list;
//				console.log(list);
				for(var i=0;i<list.length;i++){
					var id = list[i].favorite_id;  //收藏专辑id
					if(id==parseInt(now_id)){
						var name = list[i].favorite_name  //收藏专辑名
						photo_name = name;
						now_id_arr = id;
						var pre_list = list[i].photo_list,  //封面图片
                            pre_list_len = 0;  //封面图片长度
                        if(pre_list.length==0){
                            showMessage('收藏夹为空，请选择其它');
                            $('.store_album_select').hide();
                            $('.store_album_input').html('请选择一个收藏夹');
                            photo_list = [];
                            photo_name = '';
                            break;
                        }
                        pre_list_len = pre_list.length>4?4:pre_list.length;
						for(var j=0;j<pre_list_len;j++){
							var url = pre_list[j].photo_path;
							photo_list.push(url);
//							'http://image.paiwo.co/10340/album/2e2f1bcf8ae78d155192ba6033d8f495@!120x120'
							var str = '<img src="http://image.paiwo.co/'+url+'@!120x120" class="store_album_img" />';
							$('.store_album').append(str);
							$('.store_album_select').hide();
						}
					}
					
				}
						
				
			}
		},
		error:function(data){
//			console.log(data);
		}
	});
   }
	get_collection();
	
});

//收起收藏夹选择菜单下拉
$('.store_box').on('click',function(ev){
    $('.store_album_select').hide();
    ev.stopPropagation();
});


$('.store_button_cancel').on('click',function(ev){
	$('.store_album_select').hide();
	ev.stopPropagation();
});

//点击收藏夹内选择按钮
$('.store_button_submit').on('click',function(){
	//console.log(photo_list);
	//$('.yuepai_main_albums').prepend('<dd class="main_albums_show"></dd>');
    if(photo_list.length==0){
        showMessage('请选择一个收藏夹');
        return;
    }
	for(var i=0;i<now_list.length;i++){
		if(now_list[i]==now_id_arr){
			showMessage('该收藏夹已被选择');
			$('.store_album_input_none').removeClass('store_button_submit');
			return;
		}
	}
	var add_width = $('.yuepai_main_albumli').get(0).offsetWidth +155;
	now_list.push(now_id_arr);
	var str = '';
	for(var i=0;i<photo_list.length;i++){
	    str += '<img src="http://image.paiwo.co/'+photo_list[i]+'@!120x120" class="store_album_img" />';
	}
	$('.yuepai_main_albums').prepend('<dd class="main_albums_show">'+str+'<p data-code="' + now_id_arr + '">'+photo_name+'</p></dd>');
	$('.yuepai_main_albumli').css('width',add_width);
	$('.store_box').hide();
	$('.mask').hide();
});

//点击收起下拉菜单
$('.yuepai_main').on('click',function(ev){
	$('#sel_area').find('.place_select').hide();
	$('#sel_prov').find('.place_select').hide();
	$('#sel_city').find('.place_select').hide();
	$('.yuepai_main_timeselect').find('.timeselect_select').hide();
	ev.stopPropagation();
});	

//订单提交
$('.submit_button').on('click',function(){
	if(is_login == 0){
		loginInside.show();
		return;
	}
	removeCookie('reset');
	var submit = {
		b_type:false,  //类型标记
		b_obj:false,   //对象标记
		b_area:false, //地点标记
		b_time:false, //时间标记
		b_budget:false, //预算标记
		b_tel:false   //电话标记
	};
	
	var info = {
	};
	
	//判断类型是否填写
	var type_list = $('#photo_type').children();
	for(var i=0;i<type_list.length;i++){
		if(jQuery(type_list[i]).hasClass('yuepai_main_inputs_dd_clicked')){
			submit.b_type = true;
			info.type = type_list[i].getAttribute('data-code');
		}
	}
	
	if(submit.b_type){
		$('.photo_main_type').find('.error_tip').hide();
	}else{
		$('.photo_main_type').find('.error_tip').show();
	}
	
	//如果类型为其它获取内容
	if(info.type==5){
		info.othertype = $('#other_type').val(); 
	}else{
		info.othertype = '';
	}
	
	//判断拍摄对象是否填写
	var obj_arr = [];
	var obj_list = $('.yuepai_main_checkbox').children();
	for(var i=0;i<obj_list.length;i++){
		if(jQuery(obj_list[i]).hasClass('active')){
			submit.b_obj = true;
			obj_arr.push(obj_list[i].getAttribute('data-code'));
		}
	}
	
	info.obj = obj_arr.join(',');
	//console.log(info.obj);
	
	
	if(submit.b_obj){
		$('.photo_main_obj').find('.error_tip').hide();
	}else{
		$('.photo_main_obj').find('.error_tip').show();	
	}
	
	//判断拍摄地点
	var prov_code = $('#sel_prov').find('i').attr('data-code'); 
	if(prov_code){
		var c1 = prov_code.substring(0,2);
		if(c1=='01'){
			submit.b_area = true;
			info.area = $('#sel_prov').find('i').attr('data-code');
		}else if(c1=='02'){
			if(prov_code=='02-01-00-00' || prov_code=='02-02-00-00' || prov_code=='02-03-00-00' || prov_code=='02-04-00-00' || prov_code=='02-33-00-00' || prov_code=='02-34-00-00'){
				submit.b_area = true;
				info.area = $('#sel_prov').find('i').attr('data-code');
			}else{
				if($('#sel_city').find('i').attr('data-code')!=''){
					submit.b_area = true;
					info.area = $('#sel_city').find('i').attr('data-code');
				}
			}
		}
	}
	
	
	
	
	
	if(submit.b_area){
		$('.photo_main_area').find('.error_tip').hide();
	}else{
		$('.photo_main_area').find('.error_tip').show();
	}
	
	//判断拍摄时间
	if($('.yuepai_main_timeselect').find('i').attr('data-code')!=''){
		submit.b_time = true;
		info.time = $('.yuepai_main_timeselect').find('i').attr('data-code');
	}
	
	if(submit.b_time){
		$('.photo_main_time').find('.error_tip').hide();
	}else{
		$('.photo_main_time').find('.error_tip').show();
	}
	
	//判断大致预算
	if($('#budget_start').val()!='' && $('#budget_end').val()!=''){
		submit.b_budget = true;
		info.budget_low = $('#budget_start').val();
		info.budget_high = $('#budget_end').val();
	}
	
	if(submit.b_budget){
		$('.photo_main_budget').find('.error_tip').hide();
	}else{
		$('.photo_main_budget').find('.error_tip').show();
	}
	
	//判断电话号码
	if($('#tel').val()!=''){
		submit.b_tel = true;
		info.tel = $('#tel').val();
	}
	
	if(submit.b_tel){
		$('.photo_main_tel').find('.error_tip').hide();
	}else{
		$('.photo_main_tel').find('.error_tip').show();
	}
	
	//提交判断
	if(submit.b_type==true && submit.b_obj==true && submit.b_area==true && submit.b_time==true && submit.b_budget==true && submit.b_tel==true){
		//收藏夹获取
		var favorite_arr = [];
		if($('.main_albums_show').size()){
			var favorite_list = $('.yuepai_main_albums').find('.main_albums_show');
			for(var i=0;i<favorite_list.length;i++){
//				var favorite_name= jQuery(favorite_list[i]).find('p').html();
				var favorite_id= jQuery(favorite_list[i]).find('p').attr('data-code');
				favorite_arr.push(favorite_id);
			}
			//console.log(favorite_arr);
			info.favorite = favorite_arr.join(',');
		}else{
			info.favorite = '';
		}
		//具体需求
		info.describe = $('#demand_describe').val();
		
		//QQ获取
		info.qq = $('#qq').val();
		
		//微信获取
		info.wechat = $('#wechat').val();
//		console.log(use_id+'|'+info.type+'|'+info.othertype+'|'+info.obj+'|'+info.area+'|'+info.time+'|'+info.budget_low+'|'+info.budget_high+'|'+info.favorite+'|'+info.describe+'|'+info.qq+'|'+info.tel+'|'+info.wechat);
		
		//提交表单
		$.ajax({
			url: '/a/demand/user_photo/put',
			type: 'POST',
			dataType: 'json',
			async:false,
			data:{
				useid:use_id,
				service_type:info.type,
				service_word:info.othertype,
				service_obj:info.obj,
				service_address:info.area,
				service_date:info.time,
				low_price:info.budget_low,
				high_price:info.budget_high,
				favorite_id:info.favorite,
				service_order:info.describe,
				qq:info.qq,
				phone:info.tel,
				wechat:info.wechat				
			},
			success:function(data){
//				console.log(data);
				$('.submit_button').css('display','none');
				$('.reset_button').css('display','block');
				window.location.href = '/demand';
			},
			error:function(data){
				showMessage('网络错误，订单提交失败');
			}
		});
	}
	
});


//点击重新提交按钮
$('.reset_button').on('click',function(){
	$('.mask2').css('display','block');
	$('.alert_edit_box').css('display','block');
});


//点击弹窗内确定按钮
$('#delete_btn').on('click',function(){
	addCookie('reset',true,7);
	removeCookie('type');
	removeCookie('areaId');
	removeCookie('areaName');
	removeCookie('time');
	window.location.href = '/demand';
});

//点击弹窗内取消按钮
$('.confirm').on('click',function(){
	$('.mask2').css('display','none');
	$('.alert_edit_box').css('display','none');
});

//弹窗shadow
$('.mask2').on('click',function(){
	$('.mask2').css('display','none');
	$('.alert_edit_box').css('display','none');
});

//点击右上角关闭按钮
$('#cancel_edit').on('click',function(){
	$('.alert_edit_box').hide();
	$('.mask2').hide();
	
});
function get_list(){
	$.ajax({
		url: '/a/photo/favorite/name/list',
		type: 'POST',
		dataType: 'json',
		async:false,
		success:function(data){
			var list = data.result.favorite_list;
			for(var i=0;i<list.length;i++){
				var name = list[i].favorite_name;
				var id = list[i].favorite_id;
				var str = '<li data-code="'+id+'">'+name+'</li>';
				$('.store_album_select').append(str);
			}
		},
		error:function(){
			
		}
	});
}


//显示信息
var setM;
function showMessage(content){
	clearTimeout(setM);
    $('.message-box').html(content).animate({top: 0}, 400,function(){
		setM = setTimeout(hideMessage, 1500);
	});
}

function hideMessage(){
	$('.message-box').animate({top: '-52px'}, 400);
}


//cookie设置
function addCookie(name,value,iDay){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	document.cookie=name+'='+value+';path=/;expires='+oDate.toGMTString();
}

//cookie读取
function getCookie(name){
	var arr=document.cookie.split('; ');
	for(var i=0; i<arr.length; i++){
		var arr2=arr[i].split('=');
		if(arr2[0]==name){
			return arr2[1];	
		}
	}
	return '';
}

//cookie删除
function removeCookie(name){
	addCookie(name,'1',-1);
}
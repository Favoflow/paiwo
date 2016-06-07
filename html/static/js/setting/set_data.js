
var user = null;   //存储用户信息
var user_g = null; //存储摄影师信息
var area_list = [];


//初始化函数
function init(){
	$.ajax({
		url: '/a/user/init',
		type: 'POST',
		dataType: 'json',
		async:false,
		success:function(data){
			if(data.error_id == 0){
				user = data.result;
                user.bindCount = 0;
				showEmail();//显示是否绑定了邮箱
				isBind(data.result);//显示是否绑定了社交账号
				initPerson();
				
				if(user.is_photographer == 1){//如果是摄影师
					get_data();
					$('#photog_s').show();
				}else{
					$('#photog_s').css('color','#dbdbdb');

				}
		   }

		}
	});
}

//检验密码正确
function checkVal(id, showid ,reg){

	
	var val = document.getElementById(id).value;

	if(val.length == 0){
		hideError(showid);
		return false;
	}
	if(reg.test(val)){
        hideError(showid);
		return true;
	}else{
		showError(showid,'密码格式错误');
	}
}

//检测重复输入的密码是否一致
function scendCheck(){
	if(checkVal('new1_i', 'new1', reg.pwd)){
		var v1 = document.getElementById('new1_i').value;
		var v2 = document.getElementById('new2_i').value;
		if(v1 == v2){
			hideError('new2');
			return true;	
		}
		if(v2 == ''){

		}else{
		showError('new2','两次密码不一致!');
	    }
		return false;
	}
	hideError('new2');
	return false;
	
	
}

//获取字符串长度
	
function nickCheck(data){
		var count = 0;
		var reg = /[A-Za-z0-9_]/;
		var reg2 = /[\u4e00-\u9fa5]/;
		for(var i =0; i<data.length; i++){
            if(reg2.test(data[i])){
                count+=2;	
            }else if(reg.test(data[i])){
                count+=1;
            }else{
                return false;
            }
		}

//		if( count > 23 || count < 4 ){	
//			return false;
//		}
		return count;
}



//检测昵称是否被占用合法
var is_exist = 0;
function nickNameCheck(){
	var val = document.getElementById('nick_name').value;
    if(val=='')return;
	if(val  == user.nick_name){
		$('#nick_i').hide();
		$('#nick_error').hide();
		return true;
	}
//    //console.log(val);
    var _valCount = nickCheck(val);
    if(!_valCount){
        $('#nick_i').show();
        $('#nick_error').html('昵称含有非法字符').show();
        return;
    }else{
        $('#nick_i').hide();
        $('#nick_error').hide();
    }
    
    if( _valCount >= 4 && _valCount <= 22){
		$.ajax({
			url: '/a/bephotog/nick/exist',
			type: 'POST',
			dataType: 'json',
			data: {nick_name: val},
			async: false,
			success: function(data){
				is_exist = data.result.is_exist;
			}
		});

		if(is_exist == 1){
			$('#nick_i').show();
			$('#nick_error').html('昵称已被使用').show();
		          return false;
		}else{
			$('#nick_i').hide();
			$('#nick_error').html('').hide();
			return true;
		}
			
	}else if(_valCount < 4){
        $('#nick_i').show();
        $('#nick_error').html('昵称必须长于2个汉字或4个字母').show();
    }else if(_valCount > 22){
        $('#nick_i').show();
        $('#nick_error').html('昵称必须小于22个字符').show();
    }
}


var is_exist2 = 0;
//检测域名是否合法被占用
function hostCheck(){
	var val = photo_g.host.value;

	if(val  == user_g.user_host){
		$('#host_error').hide();
		return true;
	}
	if(reg.host.test(val)){

		$.ajax({
			url: '/a/bephotog/host/exist',
			type: 'POST',
			dataType: 'json',
			data: {user_host: val},
			async: false,
			success: function(data){
				is_exist2 = data.result.is_exist;
			}
		});

		if(is_exist2 == 1){
			$('#host_error').html('域名已存在').show();
		          return false;
		}else{
			$('#host_error').hide();
			slideMessage('域名可用');
			return true;
		}
			
	}else{
		slideMessage('个性域名需为5-30位小写英文、数字组合');
		$('#host_error').html(' 域名不合法').show();
		return false;
	}
}

//检测是否选择了拍摄类型
function biztypeCheck(){
	//if(user_g.biz_type)
	user_g.biz_type = [];
	$('.style_choose_circle>a').each(function(index, el) {
		if($(this).hasClass('style_choose_circle_selected')){
			user_g.biz_type.push(index+1);
		}
	});

	if(user_g.biz_type.length==0){
		slideMessage('请选择接拍类型');
		return false;
	}
	return true;
}

//个人信息表单的存储
function formSave(){
	user.nick_name = document.getElementById('nick_name').value;
	if(bir.year.html() == ''){
		user.birthday = '';
	}else{
	   user.birthday = bir.year.html() + '-' + bir.month.html() + '-' + bir.day.html();
    }

    if(!$('#province a').attr('data')){
    	user.address = '';
    } else if($('#province a').attr('data')=='02-33-00' || $('#province a').attr('data')=='02-34-00'){
		var pro_code = $('#province a').attr('data');
		user.address = pro_code;
	}else{
		var city_code = $('#place a').attr('data');
		user.address = city_code;
    }
}

//个人信息表单的提交
function formSend(){
	$.ajax({
	url: '/a/user/info/edit',
	type: 'POST',
	dataType: 'json',
	data: {nick_name: user.nick_name,
			  avatar: user.avatar,
			  gender: user.gender,
			birthday: user.birthday,
			 address: user.address
	   },
	success: formSaveResult
   });
}



function formSaveResult(data){
	if(data.error_id == 0){
		slideMessage('保存成功');
		$('.user_name').html(user.nick_name);
		$('.tab-icon_myset>p').html(user.nick_name);
	}else if(data.error_id == -1){
		slideMessage('网络错误..');
	}else{
		slideMessage(data.error_code);
	}
}



function savaPwd(oldpwd, newpwd){
	oldpwd = $.md5("paiwo_" + oldpwd);
	newpwd = $.md5("paiwo_" + newpwd);
	
	$.ajax({
		url: '/a/user/password/change',
		type: 'POST',
		dataType: 'json',
		data: {email:user.email,
			  old_password: oldpwd,
			  new_password: newpwd},
		           success: savaPwdResult
	});
		
}

//修改密码
function savaPwdResult(data){
	if(data.error_id == 0){
		slideMessage('修改密码成功');
		document.getElementById('old_i').value = '';
		document.getElementById('new1_i').value = '';
		document.getElementById('new2_i').value = '';
		$('.setting_alert_body').hide();
		document.getElementById('change_box').style.display='none';
		
	}else{
		showError('old','原密码错误');	
	}
	
}

//上传头像获取url
function uploadfile(){
        var fileObj = document.getElementById("head_file").files[0];
        if (fileObj != null){
            var base_url = "http://paiwo.oss-cn-hangzhou.aliyuncs.com";
            var FileController = base_url;
            var form = new FormData();
            var flag = false;
            $.ajax({
                async: false,
                type: "POST",
                url: "/a/user/avatar/uploadurl/get",
                dataType: 'json',
                success: function(data) {
                    form.append("Signature", data.result.signature);
                    form.append("policy", data.result. policy);
                    form.append("OSSAccessKeyId", data.result.key_id);
                    form.append("key", data.result. object_key);
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
                      head_path = obj;
                      user.avatar = obj;
                };
                xhr.send(form);         
            }else{
                alert("上传出错");
            }
          }
}


//头像剪裁
function head_cut(){
	$.ajax({
		url: '/a/user/avatar/cut',
		type: 'POST',
		dataType: 'json',
        async: false,
		data: {photo_path: head_path,
                        x: head_size.x,
                        y: head_size.y,
                        w: head_size.w,
                        h: head_size.h
	},
		success: function(data){
            if(data.error_id == 0){
            	user.avatar = data.result.photo_path;
            	$('.navi_head_headed').attr('src', 'http://image.paiwo.co/'+user.avatar);
            	$('#user_head').attr('src','http://image.paiwo.co/'+user.avatar);
				$('.tab-icon-userhead').attr('src','http://image.paiwo.co/'+user.avatar);
            	slideMessage('保存头像成功');
            }else{
            	slideMessage('网络错误..');
            }
		},
		error: function(){
			slideMessage('网络错误..');
		}
	})
	
}

//获取摄影师相关的信息
function get_data(){
	$.ajax({
		url: '/a/user/photographer/info/get',
		type: 'POST',
		dataType: 'json',
		async: false,
		success: function(data){
			if(data.error_id == 0){
				user_g = data.result;
				showPhotogdata();
				var area_arr = data.result.service_list;
				$('.service_list').html('');
				if(area_arr.length){
					for(var i=0;i<area_arr.length;i++){
						$('.service_list').append('<div class="service_list_area_two">'+paiPlace(area_arr[i])+'</div>');
						area_list.push(area_arr[i]);
						user_g.service_list = data.result.service_list;
						ar.push(area_arr[i]);
					}
					
					area_length();
				var service_list = document.getElementsByClassName('service_list')[0];
				var service_list_length = document.getElementsByClassName('service_list')[0].children.length;
				}else{
					$('.service_list').html('');
					area_length();
				}
				
			}else{
				slideMessage('摄影师信息错误..');
			}
		}
	});
}

//判断地区个数
function area_length(){
	var len = document.getElementsByClassName('service_list')[0].children.length;
	//var l = $('.service_list_area_two').length;
	switch(len){
		case 4:
			$('.service_list_box').css('width',400);
			$('.take_place_change').css('right',-50);
			$('#lbtn').hide();
			$('#rbtn').hide();
			break;
		case 3:
			$('.service_list_box').css('width',300);
			$('.take_place_change').css('right',66);
			$('#lbtn').hide();
			$('#rbtn').hide();
			break;
		case 2:
			$('.service_list_box').css('width',200);
			$('.take_place_change').css('right',160);
			$('#lbtn').hide();
			$('#rbtn').hide();
			break;
		case 1:
			$('.service_list_box').css('width',100);
			$('.take_place_change').css('right',260);
			$('#lbtn').hide();
			$('#rbtn').hide();
			break;
		case 0:
			$('.service_list_box').css('width',0);
			$('.take_place_change').css('right',370);
			$('#lbtn').hide();
			$('#rbtn').hide();
			break;
		default:
			$('.service_list_box').css('width',400);
			$('.take_place_change').css('right',-50);
			$('#lbtn').show();
			$('#rbtn').show();
	}
}


function photogSave(){
		user_g.user_host = photo_g.host.value; 
		user_g.qq = photo_g.qq.value;
		user_g.phone = photo_g.phone.value;
		user_g.wechat = photo_g.wechat.value;
		user_g.weibo = photo_g.weibo.value;
		user_g.user_desc = photo_g.desc.value;
}

function photogSend(){
	$.ajax({
		url: '/a/user/photographer/info/edit',
		type: 'POST',
		dataType: 'json',
		data: { biz_type: user_g.biz_type.join(','),
				wechat: user_g.wechat,
				weibo: user_g.weibo,
				qq: user_g.qq,
				user_host: user_g.user_host,
				user_desc: user_g.user_desc,
				service_list: ar.join(','),
				phone: user_g.phone
	    },
		success: function(data){
			if(data.error_id == 0){
				slideMessage('保存成功');
				$('.select_browse').attr('href', "/" + user_g.user_host);
			}else{

			}
		},
		error: function(){
			slideMessage('网络错误..');
		}
	});
	
	
}

function myTest(str){
		$.ajax({
		url: '/a/user/photographer/info/edit',
		type: 'POST',
		dataType: 'json',
		data: { biz_type: user_g.biz_type.join(','),
				wechat: user_g.wechat,
				weibo: user_g.weibo,
				qq: user_g.qq,
				user_host: user_g.user_host,
				user_desc: user_g.user_desc,
				address_list: str,
				phone: user_g.phone
	    },
		success: function(data){
			if(data.error_id == 0){
				slideMessage('保存成功');
			}else{

			}
		},
		error: function(){
			slideMessage('网络错误..');
		}
	});
}


var bind_email;
//绑定邮箱
function bindEmail(email, pwd){
	bind_email = email;
	pwd =  $.md5("paiwo_" + pwd);
	$.ajax({
		url: '/a/user/binding/email',
		type: 'POST',
		dataType: 'json',
		async: false,
		data: { 
			email : email,
			password : pwd
	    },
		success: function(data){
			if(data.error_id == 0){

				//slideMessage('绑定成功 请激活');
			}else{

			}
		},
		error: function(){
			slideMessage('网络错误..');
		}
	});

}

var wr=null;
var setting = 'height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes';
function showIframe(url){
	wr = window.open(url,bind_status,setting);
    if(wr){
        wr.focus();
    }else{
        showMessage('请打开浏览器弹窗设置');
    }
	
}
//显示绑定社交账号
function isBind(data){
	if(data.qq_openid != ""){
			$('.login_setting_qq').removeClass().addClass('login_setting_qq_bind');
			$('#qq_bind').html('解除绑定').addClass('alert_bind_button_bind');
            
            user.bindCount++;
	}
	if(data.weibo_openid != ""){
			$('.login_setting_weibo').removeClass().addClass('login_setting_weibo_bind');
			$('#weibo_bind').html('解除绑定').addClass('alert_bind_button_bind');
            user.bindCount++;
	}
	if(data.weixin_openid != ""){
			$('.login_setting_weixin').removeClass().addClass('login_setting_weixin_bind');
			$('#wechat_bind').html('解除绑定').addClass('alert_bind_button_bind');
            user.bindCount++;
	}
}

function doBind(text, name, error){
	wr.close();
    wr = null;
    
	if(text!='0'){
		
		slideMessage('绑定失败: ' + error);
		return;
	}else{
		if(bind_status == 'qq'){
			//qq
			$('.login_setting_qq').removeClass().addClass('login_setting_qq_bind');
			$('#qq_bind').html('已绑定').addClass('alert_bind_button_bind');
            $('.login_setting_qq_bind h6').html(name);
			slideMessage('绑定 QQ 成功');
		}else if(bind_status == 'weibo'){
			//微博
			$('.login_setting_weibo').removeClass().addClass('login_setting_weibo_bind');
			$('#weibo_bind').html('已绑定').addClass('alert_bind_button_bind');
            $('.login_setting_weibo_bind h6').html(name);
			slideMessage('绑定 微博 成功');
		}else if(bind_status == 'wechat'){
			//微信
			$('.login_setting_weixin').removeClass().addClass('login_setting_weixin_bind');
			$('#wechat_bind').html('已绑定').addClass('alert_bind_button_bind');
            $('.login_setting_weixin_bind h6').html(name);
			slideMessage('绑定 微信 成功');
		}else{}
	}
	
}

function unBind(bind_type){
	var type = bind_type;
	if(type =='qq_bind'){
		type = 'qq';	
		
	}else if(type == 'weibo_bind'){
		type = 'weibo';
		
	}else{
		type = 'weixin';
	}
		$.ajax({
		url: '/a/unbind',
		type: 'POST',
		dataType: 'json',
		async: false,
		data: { 
			bind_type : type,
	    },
		success: function(data){
			if(data.error_id == 0){
				if(type =='qq'){
					
					$('.login_setting_qq_bind').removeClass().addClass('login_setting_qq');
					$('#qq_bind').html('绑定').removeClass('alert_bind_button_bind');
                  //  $('.login_setting_qq h6').html('');
					user.bindCount--;
				}else if(type == 'weibo'){
					
					$('.login_setting_weibo_bind').removeClass().addClass('login_setting_weibo');	
			        $('#weibo_bind').html('绑定').removeClass('alert_bind_button_bind');
				//    $('.login_setting_weibo h6').html('');
                    user.bindCount--;
					
				}else{
					
					$('.login_setting_weixin_bind').removeClass().addClass('login_setting_weixin');
			        $('#wechat_bind').html('绑定').removeClass('alert_bind_button_bind');
                  // $('.login_setting_weixin h6').html('');
                    user.bindCount--;
                    
				}
				
				slideMessage('解除绑定成功');
				$('#alert_unbind').hide();
				$('.setting_alert_body').hide();
			}else{
				slideMessage(data.error_code);
			}
		},
		error: function(){
			slideMessage('网络错误..');
		}
	});

}


//计算字符长度
function getStrLen(str){
    var res=0;
    var reg=/[\u4e00-\u9fa5]/;
    for(var i=0; i<str.length; i++){
        if(reg.test(str.charAt(i))){
            res+=2;
        }else{
            res++;
        }
    }
    return res;
}





//用户拍摄类型
var types = [];
//用户ID
var user_session;
var bus_service = "00-00-00-00";
var four = {
	domain_legal: 0,
	nickname_legal: 0,
	photourl :''
}

//头像地址
var avatar ='0';
//认证图片地址
var pic_url;

var five = { sex: '0',place: '',intro: ''}

var r_email;

//检测域名是否合法，已经是否存在
function check_domain(){
	//var host = document.getElementById('domain_input').value.toUpperCase();
	var host = document.getElementById('domain_input').value;
	
	if(host){
		 if(reg.host.test(host)){	
			$.ajax({
				url: '/a/photographer/host/exist',
				type: 'POST',
				dataType: 'json',
				async: false,
				data: {host:host,
					   session:user_session},
				success:function(data){
						if(data.result.is_exist==1){
						   four.domain_legal = 0;
						  showError('#domain_error', '域名已被注册');
						}else{
						   four.domain_legal = 1;
						   $('#domain_error').hide();
						  
						}
				}
			});
		  }else{
				four.domain_legal = 0;
			    showError('#domain_error', '域名需为5-30位小写字符');
			  }	
		}else{
				four.domain_legal = 0;
				$('#domain_error').hide();
		}
	
	 four_next();
}


//检测昵称是否合法已经是否被注册
function check_nickNmae(){
	var nick = document.getElementById('nick_input').value;
	if(nick){
			 if(nickCheck(nick)){	
				$.ajax({
					url: '/a/photographer/nick/exist',
					type: 'POST',
					dataType: 'json',
					async: false,
					data: {nick_name:nick,
						   session:user_session},
					success:function(data){
							if(data.result.is_exist==1){
							   four.nickname_legal = 0;
								showError('#nick_error', '昵称已被使用');
							}else{
                               four.nickname_legal = 1;
                               $('#nick_error').hide();
							}
					}
				});
			  }else{
			  	    four.nickname_legal = 0;
			  		showError('#nick_error', '昵称至少2个汉字或4个字母');
			      }	
			}else{
					four.nickname_legal = 0;
					$('#nick_error').hide();
			}
	four_next();
}





//注册账号
function addstepsubmit(){
	var email = document.getElementById('regis_email').value.toLocaleLowerCase();
	var pwd = document.getElementById('regis_pwd').value;
	r_email = email;
	pwd = $.md5('paiwo_'+pwd);
	$.ajax({
		url: '/a/photographer/email/register/do',
		type: 'POST',
		dataType: 'json',
		data: {email : email,
			  password : pwd},
		async: false,
		success:function(data){
				if(data.error_id == 0){
					user_session = data.result.session;
					navi_change(3);
				}else{
					//alert('error in regis');
				}
		}   
	});
}
//上传前四部的资料
function threesubmit(){
//		var id_name = document.getElementById('id_name').value;
//		var id_num = document.getElementById('id_num').value;
		$.ajax({
			url: '/a/photographer/auth/do',
			type: 'POST',
			dataType: 'json',
			data: {  id_photo : '0',
				     id_num : 'paiwo_idcard',
				     real_name: 'paiwo_idcard',
				     biz_type : types.join(','),
				     service_list : res.join(','),
				     session: user_session
				  
			       },     
			success:function(data){
				if(data.error_id == 0){
					$('#show-content').html(four_tm);
					$('.step_four_box').fadeIn(400);
//					navi_change(4);
				}else if(data.error_id==101011){
					$('.id_error').html('<em></em><p>'+decodeURIComponent(data.error_code)+'</p>');
					$('.id_error').show();
					$('#four-load').hide();
				}else{
					$('.id_error').show();
					$('#four-load').hide();
				}
			}
		})			
}




//上传第五部资料
function fivesubmit(desc){
		$.ajax({
			url: '/a/photographer/info/put',
			type: 'POST',
			dataType: 'json',
			data: {gender:five.sex,
				   location:five.place,
				   desc:desc,
				   session:user_session
			},
			success:function(data){
				if(data.error_id==0){
					$('#show-content').html(six_tm);
                    $('.step_six_box').fadeIn(400);
                   navi_change(5);
				}
			}
		});
}

function sixsubmit(){
	var qq = $('#qq_val').val();
	var phone = $('#phone_val').val();
	var wechat= $('#wechat_val').val();
	
	$.ajax({
		url: '/a/photographer/contact/put',
		type: 'POST',
		dataType: 'json',
		data: {qq: qq,
			   wechat: wechat,
			   phone: phone,
			   session:user_session
		},
		success: function(data){
			if(data.error_id == 0){
				showemail();
			}
		}        
	});
}





//上传头像获取URL

function uploadfile2(){
 var fileObj = document.getElementById("four_input").files[0];
 if (fileObj != null){
	    var base_url = "http://paiwo.oss-cn-hangzhou.aliyuncs.com";
	    var form = new FormData();
	    var flag = false;
	    $.ajax({
	        async: false,
	        type: "POST",
	        url: "/a/photographer/auth/avatar/uploadurl/get",      
	        dataType: 'json',
	        data:{session:user_session},
	        success: function(data) {
	            form.append("Signature", data.result.signature);
	            form.append("policy", data.result.policy);
	            form.append("OSSAccessKeyId", data.result.key_id);
	            form.append("key", data.result.object_key);
	            form.append("success_action_status", 201);
	            flag = true;
	        },
	        error: function() {
	            flag = false;
	        }
	    });
	    if(flag == true){
	        form.append("file", fileObj);
	        var xhr = new XMLHttpRequest();
	        xhr.open("post", base_url, false);
	        xhr.onload = function () {
	            var obj = $(xhr.response).find("Key").text();
				head_path = obj;
	         
	        };
	        xhr.send(form);
	        
	    }else{
	        alert("上传出错");
	    }
   }

}

function sendmail(){
	$.ajax({
		url: '/a/photographer/send/email',
		type: 'POST',
		dataType: 'json',
		data: {session: user_session},
	});
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
            	avatar = data.result.photo_path;
            }else{
            	showMessage('网络错误..');
            }
		},
		error: function(){
			showMessage('网络错误..');
		}
	});
	
}

//上传个性域名和头像和名字
function avatorsubmit(){
	var nick_name = $('#nick_input').val();
	var user_host = $('.four_infor_input').val();
	$.ajax({
		url: '/a/photographer/set/put',
		type: 'POST',
		dataType: 'json',
		data: {photo_url : avatar,
				nick_name : nick_name,
				user_host : user_host,
			 	session:user_session},
		success: function(data){
				if(data.error_id == 0){
					 $('#show-content').html(five_tm);
					    showplace();
                     $('.step_five_box').fadeIn(400);
                      navi_change(4);
				}
		}	 	
	});
}




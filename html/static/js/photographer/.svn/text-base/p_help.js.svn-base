var reg = {
	idcard:/^\d{17}[\d|x|X]$/,
	email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
    pwd:/^[0-9a-zA-Z\,\.]{6,15}$/,
    host:/^([0-9]|[A-z]){5,30}$/,
    real_name:/^([\u4e00-\u9fa5]{2,10})$/
};

//判断邮箱是否合法被注册
var email_legal = 0;



//1.step 每次点击后，判断是否能进行下一步
function select_type_check(){

	//没有选择
	if($('.selected').length==0){
		 $('.next_step').removeClass('next_step_red');	
		
	}else{
		$('.next_step').addClass('next_step_red')
	}

}
//收集第一部用户选择的类型，存放到数组里面
function first_data(){
    $('.selected').each(function(index, el) {
      			var id = this.getAttribute('data');
      			types.push(id);	
      });
	
	
    navi_change(1);
    $('.bp_main').remove();
   	$('.step_two_box').fadeIn(400);//地区选择
    
}


//判断密码
function regis_pwd_check(){

	var val = document.getElementById('regis_pwd').value;
	if(val.length==0){
		$('#r_pwd_error').hide();
		pwd_flag = 0;
		return false;	
	}


	if(reg.pwd.test(val)){
		$('#r_pwd_error').hide();
		pwd_flag = 1;
		return true;
	}
	showError('#r_pwd_error','密码为6-15位字母数字');
	pwd_flag = 0;
	return false; 
}

var mail_flag = 0;
var pwd_flag = 0;
function regis_mail_check(){
	
	var mail = document.getElementById('regis_email').value;
	
	if(mail){
			if(reg.email.test(mail)){
                 $.ajax({
					async: false,
					type : "POST",
					url : "/a/register/checkemail",
					dataType : 'json',
					data: {
						email: mail,
					},
					success : function(data) {
						if(data.result.is_register == 1){
								mail_flag = 0;
								showError('#r_email_error','邮箱已经被注册');
								
						}else{
								mail_flag = 1;
								$('#r_email_error').hide();
						}	
					}
				});
			}else{
				mail_flag = 0 ;
				showError('#r_email_error','邮箱格式有误！');
			}
	}else{
		mail_flag = 0;
		$('#r_email_error').hide();
    }
	add_next_check();
	
}

//显示错误
function showError(target, content){
	var t = $(target);
	t.find('p').html(content);
	t.show();
}

function nickCheck(data){
		var count = 0;
		var reg = /[A-Za-z0-9_]/;
		var reg2 = /[\u4e00-\u9fa5]/;
		for(var i =0; i<data.length; i++){
				if(reg2.test(data[i])){
					count+=15	
				}else if(reg.test(data[i])){
					count+=9;
				}else{
					showMessage('昵称还有非英文数字字符');
					return false;
				}
		}

		if(count >301||count<30){	
			return false;
		}
		return true;
}



//add.step 判断是否能进行下一步
function add_next_check(){
	
	if(mail_flag ==1 &&pwd_flag == 1){
		$('#add_step').addClass('next_step_red');
		return;
	}
	   $('#add_step').removeClass('next_step_red');

}



//获取一个虚拟的路径
function getFileUrl(file){
    var url = null;
     if(window.createObjectURL != undefined){
            url = window.createObjectURL(file);
     }else if(window.URL != undefined) {
            url = window.URL.createObjectURL(file)
      }else if(window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
      }
      return url;  
}



//性别选择
function select_sex(type){
	if('woman' == type){
		var s = document.getElementById('sex_man-select');
		if(s!=null){
			s.id='';
			$('.five_circle_div_man').hide();
		}
	}else{
		var s = document.getElementById('sex_woman-select');
		if(s!=null){
			s.id='';
			$('.five_circle_div_woman').hide();
		}
	}
}
//导航栏的变化 num 跳转到的页面
function navi_change(num){
//     var ele = $('.bp_navi_content li');
//     	ele.eq(num-1).removeClass('bp_navi_li_fini').addClass('bp_navi_li_cur');
//		ele.eq(num).removeClass('bp_navi_li').addClass('bp_navi_li_fini'); 
		var ele = document.getElementsByClassName('bp_navi_content')[0].getElementsByTagName('li');
		for(var i=0;i<ele.length;i++){
			if(i<(num)){
				ele[i].className = 'bp_navi_li_cur';
			}
			if(i==(num)){
				ele[i].className = 'bp_navi_li_fini';
			}
		}
}

//三级联动菜单地区选择
function select_b (val){
	var data = allArea['city'][val];
	var tm='';
	for(name in data){
		tm+='<li class="s-b" data="'+name+'">'+data[name]+'</li>';
	}
	$('#city').html(tm);
}

//头像 昵称步骤是否可以下一步
function four_next(){
	//var file = document.getElementById('four_input').value;
	if(four.nickname_legal == 1 &&  four.domain_legal ==1){
		$('#four_step').addClass('next_step_red');
		return true;
	}
		$('#four_step').removeClass('next_step_red');
	return false;
}

//性别 所在地 简介判断是否可以下一步
function five_check(){
	var intro = $('.simple_text').val();
	
	  if(five.sex!=''||five.place!=''||intro!=''){
	  	  $('#five_step').addClass('next_step_red');
	  }else{
	  	  $('#five_step').removeClass('next_step_red');
	  } 
}
//第六部判断是否可以下一步
function six_check(){
	  var qq     =   document.getElementById('qq_val').value;
	  var wechat =   document.getElementById('phone_val').value;
	  var phone  =   document.getElementById('wechat_val').value;
	  if(qq||wechat||phone){
	  		$('#six_step').addClass('next_step_red');
	  }else{
	  		$('#six_step').removeClass('next_step_red');
	  }
}
function showemail(){
      sendmail();
	 var mail_addr = r_email.split('@')[1];
     var m = EMAIL_MAP[mail_addr] || 'http://mail.'+mail_addr;
	 $('#show-content').html(last_tm);
	 $('.bp_compelet h5').text(r_email);
	 $('.enter_email').attr('href',m);
	 $('.bp_compelet').fadeIn(400);
	 navi_change(6);
}


var set_o = 60;
var setin;
function resendmail(){
    set_o--;
	if(set_o<1){
		$('#resendmail').text('重新发送验证邮件');
        $('#resendmail').removeAttr("disabled");
        $('#resendmail').removeClass("resend-unable");
        set_o = 60;
		clearInterval(setin);
	}else{
		$('#resendmail').text(set_o+'秒后可再次发送');
        $('#resendmail').addClass("resend-unable");
	}
}
//显示地区选择
function showplace(){
	var data = allArea['province']['02-00-00'];
	var tm = '';
	for(name in data){
		tm+='<li class="s-a" data="'+name+'">'+data[name]+'</li>';
	}
	$('#pro').html(tm);
}

var setM;
function showMessage(content){
	clearTimeout(setM);
	$('#message').html(content).animate({top:0}, 400 , function(){
		setM = setTimeout(hideMessage, 1500);
	});
}

function hideMessage(){
	$('#message').animate({top:'-20px'},400);
}



//设置创建大图并onload事件
var headimg = null;
var head_path = null;
var head_size = null;
var head_k = 1;
function onloadPic(url){
    headimg = new Image();
	headimg.id = 'bigpic';
	headimg.src = url;
	if(headimg.complete){
		culShowHead(headimg);
	}else{
		headimg.onload = culShowHead;
	}
}



function culShowHead(){

	var width = headimg.width;
	var height = headimg.height;
	var k = width/height;
	if(width<244&&height<244){
		head_k = 1;
	}else{
		if(k>1){
			 head_k = 244/width;
             headimg.width = 244;
            headimg.height = height*head_k;

		}else{
			head_k = 244/height;
			headimg.height = 244;
			headimg.width = width*head_k;
		}
	}

	$('.head-big').html(headimg);

	if(jcrop!=null){
		jcrop.destroy();
	}

	$('#bigpic').Jcrop({aspectRatio:1,
	          onChange: updatePreview,
              onSelect: updatePreview},
              function(){
              	 var bounds = this.getBounds();
			      boundx = bounds[0];
			      boundy = bounds[1];
		      jcrop = this;

	         });
	jcrop.animateTo([2,2,170,170]);

	a_p[0].style.cssText = "";
	a_p[0].src = headimg.src;
	
	b_p[0].style.cssText = "";
	b_p[0].src = headimg.src;

	c_p[0].style.cssText = "";
	c_p[0].src = headimg.src;


}

//实时显示预览图
function updatePreview(c){

	if (parseInt(c.w) > 0){
        var rx = 120 / c.w;
        var ry = 120 / c.h;
        var rx2 = 60 / c.w;	
        var ry2 = 60 / c.h;
        var rx3 = 30 / c.w;
        var ry3 = 30 / c.h;


        a_p.css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + Math.round(rx * c.x) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'
        });

         b_p.css({
          width: Math.round(rx2 * boundx) + 'px',
          height: Math.round(ry2 * boundy) + 'px',
          marginLeft: '-' + Math.round(rx2 * c.x) + 'px',
          marginTop: '-' + Math.round(ry2 * c.y) + 'px'
        });

          c_p.css({
          width: Math.round(rx3* boundx) + 'px',
          height: Math.round(ry3 * boundy) + 'px',
          marginLeft: '-' + Math.round(rx3 * c.x) + 'px',
          marginTop: '-' + Math.round(ry3 * c.y) + 'px'
        });
      }

}



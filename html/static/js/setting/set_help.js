var reg = {
	pwd: /^[0-9a-zA-Z\,\.]{6,15}$/,
	host: /^([0-9]|[a-z]){5,30}$/,
	email: /^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
};


var bir = {
	year: $('#year a'),
	month: $('#month a'),
	day: $('#day a'),
	province: $('#province a'),
	place: $('#place a')
};

var is_foreign = 0; //地区选择
var ar = [];        //储存地区选择的数据
var bind_status = 0;//绑定社交账号类型
var unbind_type = 0;//解绑

var photo_g = {
	host: document.getElementById('host_domain'),
	qq: document.getElementById('qq_domain'),
	phone: document.getElementById('phone_domain'),
	wechat: document.getElementById('wechat_domain'),
	weibo: document.getElementById('weibo_domain'),
	desc: document.getElementById('desc_domain')
};


//显示所在地区
function showLocation(){
	var address = user.address;
	if(address){
		var pro_add = address.substring(0,5)+'-00';  //省份编号
		var pro = allArea2['province']['02-00-00'][pro_add]; //省份名称
		var city_arr = allArea2['city'][pro_add];  //城市集合
		if(address=='02-33-00' || address=='02-34-00'){
			bir.province.html(pro);
			bir.province.attr('data',pro_add);
			$('#place').hide();
		}else if(address=='0-0-0'){
			bir.province.attr('data','');
			bir.province.html('请选择');
			bir.place.attr('data','');
			bir.place.html('请选择');
		}else if(address!=''){
			bir.province.html(pro);
			bir.province.attr('data',pro_add);
			bir.place.show();
			bir.place.html(city_arr[address]);
			bir.place.attr('data',address);
			showLivePlace(pro_add);
		}
	}
}



//显示邮箱如果已经绑定,显示修改密码，否显示绑定
function showEmail(){

	if(user.email_state == 0){
		$('.login_setting').prepend(unbind_tm);
	}else{
		$('.login_setting').prepend(bind_tm.replace(/\${email}/,user.email));
	}
}

//显示登录相关
function showLogin(){
	$('.photog_infor').hide();
	$('.person_information').hide();
	$('.login_setting').fadeIn(400);
}

//显示摄影师相关信息

function showPhotog(){
	$('.login_setting').hide()
	$('.person_information').hide();
	$('.photog_infor').fadeIn(400);
}

//显示个人资料部分
function showInfo(){
		$('.photog_infor').hide();
		$('.login_setting').hide();
		$('.person_information').fadeIn(400);
}

//初始化个人资料
function initPerson(){
		$('.information_ul_nametext').val(user.nick_name);
		showGender();
		showYearandMonth();
		showHead();
		showBirthday();
		showAddress();
		showLocation();
}


//显示性别
function showGender(){
    if(user.gender == '0'){
    	return;
	}else if(user.gender == '1'){
		$('#chose_man a').html('<i></i>');
	}else{
		$('#chose_female a').html('<i></i>');
	}
}


//显示头像
function showHead(){
	if(user.avatar !='0'){
		$('#user_head').attr('src','http://image.paiwo.co/'+user.avatar);
	}
}

//显示生日
function showBirthday(){
	if(user.birthday.length>9){
		var data = user.birthday.split('-');
			var year = data[0];
			var month = parseInt(data[1]);
			var day = parseInt(data[2]);
			bir.year.text(year);
			bir.month.text(month);
			bir.day.text(day);
			showDay(year, month);
	}

}

//居住地显示省份
function showAddress(){
	var name;
	var tm ='';
	var x = allArea2['province']['02-00-00'];

	for(name in x){
		tm +='<dd data="'+name+'">'+x[name]+'</dd>';
	}

	$('#province dl').html(tm);
}


//居住地显示城市
function showLivePlace(data){
	var d = allArea2['city'][data];
	var name ='';
	var tm = '';

	for(name in d){
		tm += '<dd data="'+name+'">'+d[name]+'</dd>';
	}
	$('#place dl').html(tm);
}




function showYearandMonth(){
	var tm1 = '';
	var tm2 = '';
	//var i = 2014;
	//修改后可以显示当前年份
	var date = new Date();
	var i = date.getFullYear();
	for(;i>1930;i--){
			tm1+='<dd>'+i+'</dd>';
	}
	$('#year').find('dl').html(tm1);
    i = 1 ;

    for(;i<13;i++){
    	tm2+='<dd>'+i+'</dd>';
    }
   $('#month').find('dl').html(tm2);

}

function showDay(year, month){
	var max = (new Date(year,month, 0)).getDate();
	var i=1;
	var tm='';
	for(;i<max+1;i++){
		tm +='<dd>'+i+'</dd>';
	}

	$('#day').find('dl').html(tm);
}


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

var jcrop = null;
var a_p = document.getElementById('a_p');
var b_p = document.getElementById('b_p');
var c_p = document.getElementById('c_p');

var boundx;
var boundy;
//显示头像大图
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

	$('.headimg_photobox_left').html(headimg);

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

	a_p.style.cssText = "";
	a_p.src = headimg.src;
	
	b_p.style.cssText = "";
	b_p.src = headimg.src;

	c_p.style.cssText = "";
	c_p.src = headimg.src;


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


        $(a_p).css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + Math.round(rx * c.x) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'
        });

         $(b_p).css({
          width: Math.round(rx2 * boundx) + 'px',
          height: Math.round(ry2 * boundy) + 'px',
          marginLeft: '-' + Math.round(rx2 * c.x) + 'px',
          marginTop: '-' + Math.round(ry2 * c.y) + 'px'
        });

          $(c_p).css({
          width: Math.round(rx3* boundx) + 'px',
          height: Math.round(ry3 * boundy) + 'px',
          marginLeft: '-' + Math.round(rx3 * c.x) + 'px',
          marginTop: '-' + Math.round(ry3 * c.y) + 'px'
        });
      }

}


//创建一个虚拟的地址
function getFileUrl(file){
    var url = null;
     if(window.createObjectURL != undefined){
            url = window.createObjectURL(file);
     }else if(window.URL != undefined){	
            url = window.URL.createObjectURL(file);
      }else if(window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
      }
      return url;  
}

//显示摄影师相关的信息
function showPhotogdata(){
	photo_g.host.value = user_g.user_host;
	photo_g.qq.value = user_g.qq;
	photo_g.phone.value = user_g.phone;
	photo_g.wechat.value = user_g.wechat;
	photo_g.weibo.value = user_g.weibo;
	photo_g.desc.value = user_g.user_desc;
	var i = 0;
	for(;i<user_g.biz_type.length;i++){
		$('.style_choose_circle>a').eq(parseInt(user_g.biz_type[i])-1).addClass('style_choose_circle_selected');
	}

}

//显示第三方应用
function showSocial(){

}


//显示相关的错误
function showError(id,content){
	var s = document.getElementById(id);
	s.innerHTML = content;
	s.style.display="block";
	s.previousElementSibling.style.display ='block';
}


//隐藏相关的错误
function hideError(id){

var s = document.getElementById(id);
s.style.display="none";
s.previousElementSibling.style.display ='none';

}

var mes = $('.setting_succeed');
//上部信息提示
var setM= null;
function showMessage(str){
    slideMessage(str);
}
function slideMessage(str){
  clearTimeout(setM);
	mes.html(str).animate({top: 0}, 400, function(){
    setM = setTimeout(hideMessage, 1800);
    
    });
}

function hideMessage(){
	mes.animate({top: '-40px'}, 400);
}


var is_exit3;
function bind_emailCheck(){
	var val = document.getElementById('bind_email').value;

	if(val == ''){
		hideError('bind_email_r');
		return false;
	}

	if(!reg.email.test(val)){
		showError('bind_email_r','邮箱格式错误');
		return false;
	}
	$.ajax({
		url: '/a/register/checkemail',
		type: 'POST',
		dataType: 'json',
		data: {email: val},
		async: false,
		success: function(data){
				if(data.error_id == 0){
					is_exit3 = data.result.is_register;
				}
		}
	});

	if(is_exit3 == 1){
		showError('bind_email_r','邮箱已存在');
		return false;
	}	
	
	hideError('bind_email_r');
	return true;
}

function bind_pwdCheck(){
	var val = document.getElementById('bind_pwd').value;

	if(val == ''){
		hideError('bind_email_pwd_r');
		return false;
	}
	if(!reg.pwd.test(val)){
		showError('bind_email_pwd_r','密码格式错误')
		return false;
	}
	hideError('bind_email_pwd_r');
	return true;



}

function bind_vailCheck(){
	var val = document.getElementById('bind_vail').value;
	if(val.length!=4){
		showError('bind_email_vail_r','验证码错误');
		return false;
	}
	hideError('bind_email_vail_r');
	return true;
}



 //以下是显示地区选择的模块
    function showArea(name, id){

        var data = allArea3['province'][id];
        var tm = '';
        if(is_select(id)){
          tm+='<a class="b-select-all b-select" data="'+id+'">'+name+'全境</a>';

        }else{
          tm+='<a class="b-select-all" data="'+id+'">'+name+'全境</a>';

        }
        for(i in data){
          if(is_select(i)){
            tm+='<span data="'+i+'" class="b-select">'+data[i]+'</span>';
          }else{
            tm+='<span data="'+i+'">'+data[i]+'</span>';
          }
        } 
        $('.shen').html(tm);

        if(is_foreign == 1){
          $('.shen span').css('width','80px');
        }
    }
    function showPlace(name, id){

        var data = allArea3['city'][id];
        var tm = '';
        if(is_select(id)){
          tm+='<a class="c-select-all c-select" data="'+id+'" >'+name+'全境</a>';

        }else{
          tm+='<a class="c-select-all" data="'+id+'" >'+name+'全境</a>';

        }
        for(i in data){
            //console.log(i);
          if(is_select(i)){
            tm+='<span data="'+i+'" class="c-select">'+data[i]+'</span>';
          }else{
            tm+='<span data="'+i+'">'+data[i]+'</span>';
          }
        } 
        $('.shi').html(tm);


    }


    function showTakePlace(name, id){

        var data = allArea3['city'][id];
        var tm = '';
        if(is_select(id)){
          tm+='<a class="c-select-all c-select" data="'+id+'" >'+name+'全境</a>';

        }else{
          tm+='<a class="c-select-all" data="'+id+'" >'+name+'全境</a>';

        }
        for(i in data){
          var _dis = allArea3['district'][i];
//            //console.log(allArea3['district']['02-14-05-00']);
//            //console.log(_dis);
          if(is_select(i)){
            tm+='<span data="'+i+'" class="c-select">'+data[i]+'</span>';
            if(_dis){
                for(var j in _dis){
                    tm+='<span data="'+j+'" class="c-select">'+_dis[j]+'</span>';
                }
            }
          }else{
            tm+='<span data="'+i+'">'+data[i]+'</span>';
            if(_dis){
                //console.log(_dis);
                for(var j in _dis){
                    tm+='<span data="'+j+'">'+_dis[j]+'</span>';
                }
            }
            
          }
        } 
        $('.shi').html(tm);


    }



     function addService(name, id){
        var tm = '<span data="'+id+'">'+name+'</span>';

        ar.push(id);

        $('.topbar').append(tm);
        area_check();

     }
     function newshowSer(){
         //console.log(user_g.service_list);
        ar = [];
        var i ;
        var tm ='';
        for(i = 0 ; i<user_g.service_list.length; i++){
            tm +='<span data="'+user_g.service_list[i]+'">'+paiPlace(user_g.service_list[i])+'</span>';
            ar.push(user_g.service_list[i]);
        }
        flag1 = 0;
        $('.topbar').html(tm);
        area_check();

     }

	function paiPlace(data){
		if(data.substr(3) == '00-00-00'){
			return allArea3.area[data]+'全境';
		}
		if(data.substr(6) == '00-00'){
			return allArea3.province[data.substr(0,2)+'-00-00-00'][data];
		}
		if(data.substr(9) == '00'){
			return allArea3.city[data.substr(0,5)+'-00-00'][data];	
		}else{
            return allArea3['district'][data.substr(0,8)+'-00'][data];	
        }
	}
     function removeId(id){
        for(var i = 0; i<ar.length ; i++){
          if(ar[i] == id){
              ar = ar.del(i);
          }
        }
        if(id.substr(3) == '00-00-00'){
           $('.b-select-all').removeClass('b-select');
           $('.c-select-all').removeClass('c-select');
           return;
        }
        if(is_foreign ==1){
            $('.b-select[data =' +id+']').removeClass('b-select');
        }else{
         $('.c-select[data =' +id+']').removeClass('c-select');
       }
        var num = $('.topbar span').length;
        if(num<4){
          return;
        }
        if(flag1 == num -3){
          $('.topbar span').eq(flag1-1).show();
          flag1--;
        }

        area_check();

     }


    function clearArea(){
      //海外
      var reg1 = /^01/;
      //境内
      var reg2 = /^02/;
      if(is_foreign == 1){
        $('.shen span').removeClass('b-select');
        for(var i = 0; i<ar.length ; i++){
          if(reg1.test(ar[i])){
            ar = ar.del(i);
            i--;
          }
        }

       }else{
         $('.shen span').removeClass('b-select');
         $('.shi span').removeClass('c-select');
        for(var i = 0, n = ar.length; i<n ; i++){
          if(reg2.test(ar[i])){
            ar = ar.del(i);
            i--;
          }
        }

       }
    }

    function clearPlace(id){
      var reg = new RegExp('^'+id.substr(0,5));
      $('.shi span').removeClass('c-select');
        for(var i = 0; i<ar.length ; i++){
          if(reg.test(ar[i])){
            ar = ar.del(i);
            i--;
          }
        }
    }

    function clearSelect(id, type){
      if(type == 'area'){
          var reg = new RegExp('^'+id.substr(0,2));
          $('.topbar span').each(function(index ,el){
            if(reg.test($(this).attr('data'))){
              $(this).fadeOut(400,function(){
                this.remove();
              })
            }

          });

      }else{
         var reg = new RegExp('^'+id.substr(0,5));
          $('.topbar span').each(function(index ,el){
            if(reg.test($(this).attr('data'))){
              $(this).fadeOut(400,function(){
                this.remove();
              })
            }

          });
      }
    }
     //检测是否已经选过了
     function is_select(id){
        for (var i = 0; i < ar.length; i++) {
			if(id == ar[i])
			  return true;
        }
        return false
     }
     //删除指定位置数组元素
     Array.prototype.del=function(n) {　

      　if(n<0)
      　　return this;
      　else
      　　return this.slice(0,n).concat(this.slice(n+1,this.length));
     }

     //点击保存了之后，更新
     function updatePlace(){
     	var tm = '';
     	$('.topbar span').each(function(index, el) {
     		tm+='<div class="service_list_area_two">'+this.innerHTML+'</div>';
     	});
     	user_g.service_list = ar;
     	$('.service_list').html(tm);
     	photogSend();
     	area_length();
     }

     var flag = 0;
     function cul(type){

     	var num = $('.service_list_area_two').length;

     	if(type == 'pre'){
     		if(flag == 0){
     			return;
     		}
     		flag--;
     		$('.service_list_area_two').eq(flag).show();
     	}else{
     		if(flag == num -4){
     			return;
     		}
     		$('.service_list_area_two').eq(flag).hide();
     		flag++;
     	}

     }

     var flag1 = 0;
     function cul2(type){

      var th = $('.topbar span');
      var num = th.length;
      if(type =='pre'){
        if(flag1 == 0){
          return;
        }
        th.eq(--flag1).show();

      }else{
        if(flag1 == num-4){
          return;
        }
        th.eq(flag1++).hide();

      }
     }


     function area_check(){
        if($('.topbar span').length>4){
            $('.in-pre').show();
            $('.in-next').show();

        }else{

          $('.in-pre').hide();
          $('.in-next').hide();
        }
     }

	
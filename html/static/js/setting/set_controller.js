var c = $('.setting_main_box');
var h_ul = $('.setting_box_header_ul');
var d = $('.setting_alert_body');
var wr;
jQuery(function($){
	// 显示登陆设置
	h_ul.on('click', '#login_s', function() {
		if(this.className == 'head-select'){
				return;
		}
        document.getElementById('login_s').className = 'head-select';
		document.getElementById('data_s').className='';
		document.getElementById('photog_s').className='';
		showLogin();
	
	});

	// 显示个人资料
	h_ul.on('click', '#data_s', function() {
		if(this.className == 'head-select'){
				return;
		}

        document.getElementById('data_s').className = 'head-select';
		document.getElementById('login_s').className='';
		document.getElementById('photog_s').className='';
		showInfo();

	});

	//显示摄影师信息
	h_ul.on('click', '#photog_s', function() {
		if(this.className == 'head-select'){
				return;
		}
		if(user.is_photographer == 0){
			slideMessage('请先认证成为摄影师');
				return;
		}

        document.getElementById('photog_s').className = 'head-select';
		document.getElementById('login_s').className='';
		document.getElementById('data_s').className='';
		showPhotog();

	});
	//点击显示绑定社交账号
	c.on('click', '.login_setting_sociallist>a', function(e){
			d.show();
			$('.setting_alert_bind').show();	
			
		
			
			//unBind(this.id);
			
		
		
	})
    
    
	d.on('click', '#close_btn, #alert_bind_save', function(e){
		d.hide();
		$('.setting_alert_bind').hide();
	});
	d.on('click', '#frame-close', function(){
		$('.frame-wrap').hide();
		window.frames[0].location.href = "about:blank";

		d.hide();
	});
	
	//点击显示对应的iframe
	d.on('click', '.alert_bind_button', function(){
		if(this.innerHTML == '解除绑定'){
			unbind_type = this.id;
			$('.setting_alert_bind').hide();
			$('#alert_unbind').show();
			return ;	
		}
		
		if(this.id == 'qq_bind'){
			var url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101164290&redirect_uri=http://paiwo.co/bind/qq&state=zzz';
			bind_status = 'qq';
			showIframe(url);
			
		}else if(this.id =='weibo_bind'){
			var url ='https://api.weibo.com/oauth2/authorize?forcelogin=true&response_type=code&client_id=2197733404&redirect_uri=http://paiwo.co/bind/weibo';
			bind_status = 'weibo';
		  showIframe(url);
		}else{
			var url = 'https://open.weixin.qq.com/connect/qrconnect?appid=wxd804e40c6e964035&redirect_uri=http://paiwo.co/bind/weixin&response_type=code&scope=snsapi_login#wechat_redirect';
			bind_status = 'wechat';
			showIframe(url);
		}
		
		
	
	});
	
	//确定取消绑定
	d.on('click', '#confirm_unbind', function(){
		if(user.email_state == 0 && user.bindCount == 1){
            slideMessage('请先绑定一个邮箱');
             return;
        }
            
		unBind(unbind_type);
	
	});
    
    
	d.on('click', '#unbind_1,#unbind_2', function(){
		$('#alert_unbind').hide();
		d.hide();
	});
	
	

	//点击显示绑定邮箱
	c.on('click', '#bind_btn', function(event) {
		d.show();
		$('.setting_alert_email').show();
		$('.email_inputs_vimg').attr('src','/a/captcha/binding?v='+Math.random());
	});

	//点击更新验证码
	$('.email_inputs_vimg').click(function(){
		$(this).attr('src','/a/captcha/binding?v='+Math.random());
	})

	//取消显示绑定
	d.on('click', '.close_bind_email', function(event) {
		d.hide();
		$('.setting_alert_email').hide();
	});


	//点击修改密码
	c.on('click', '#change_btn', function(event) {
		$('.setting_alert_body').show();
		document.getElementById('change_box').style.display='block';
	});


	var set1 = null;
	d.on('input propertychange','#old_i',function(){
		clearTimeout(set1);
		set1 = setTimeout(wr('old_i', 'old', reg.pwd),700);
	});

	var set2 = null;

	d.on('input propertychange','#new1_i',function(){
		clearTimeout(set2);
		set2 = setTimeout(wr('new1_i', 'new1', reg.pwd),700);
		scendCheck();
	});

	var set3 = null;
	d.on('input propertychange', '#new2_i', function() {
		clearTimeout(set3);
		set3 = setTimeout(scendCheck,700);



	});

	var set4 = null;
	c.on('input propertychange', '#nick_name', function(event) {
		clearTimeout(set4);
		set4 = setTimeout(nickNameCheck,700);
	});
	
	//确认保存密码
	d.on('click', '#confirm_change', function(){
	        var n1 = document.getElementById('old_i').value;	
			var n2 = document.getElementById('new1_i').value;
			var n3 = document.getElementById('new2_i').value;
			if(n1 == ""){
				slideMessage('请输入原密码');
				return;
			}
			if(n2 == ""){
				slideMessage('请输入新密码');
				return;
			}
			if(n3 == ""){
				slideMessage('请再次输入新密码');
				return;
			}


		if(checkVal('new1_i', 'new1', reg.pwd)&&checkVal('old_i', 'old', reg.pwd)&&scendCheck()){
			var n1 = document.getElementById('old_i').value;
			var n2 = document.getElementById('new1_i').value;
			savaPwd(n1, n2);
		}
	});
	
 	//性别选择

	//选择男
	c.on('click', '#chose_man', function() {
		$(this).find('a').html('<i></i>');
		$('#chose_female').find('a').html('');

		user.gender = 1;
	});

	//选择女
	c.on('click', '#chose_female', function() {
		$(this).find('a').html('<i></i>');
		$('#chose_man').find('a').html('');

		user.gender = 2;
	});
	
	//点击年月日，出现下拉面板
	c.on('click', '.infor_ul_birth div', function(event) {
		$('.person_information dl').hide();
		$(this).find('dl').toggle();
	});


	//选择年
	c.on('click', '#year dd', function(event) {
		event.stopPropagation();
		var t = $(this);
		var data = this.innerHTML;
		t.parent().hide().prev().html(data);
         bir.month.html(1);
         bir.day.html(1);
		showDay(data, 1);
		$('.person_information dl').hide();
	});

	//选择月
	c.on('click', '#month dd', function(event) {
		event.stopPropagation();
		var t = $(this);
		var data = this.innerHTML;

		if(bir.year.html() == ''){
			return;
		}

		t.parent().hide().prev().html(data);
         bir.day.html(1);
		showDay($('#year a').html(), data);
		$('.person_information dl').hide();
		
	});

	//选择日

	c.on('click', '#day dd', function(event) {
		event.stopPropagation();
		var t = $(this);
		var data = this.innerHTML;
		t.parent().hide().prev().html(data);
		$('.person_information dl').hide();
		
	});

	//选择provice	
	c.on('click', '#province dd', function(event) {
		event.stopPropagation();

		var t = $(this);
		var data = this.innerHTML;
		var id = $(this).attr('data');
		//console.log(data+'|'+id);
		t.parent().prev().html(data).attr('data',id);
//		$('#province a').html(data).attr('data',id);
		if(id=='02-33-00' || id=="02-34-00"){
			showAddress(id);
			$('#place a').html();
			$('#place a').attr('data','');
			$('#place').hide();
		}else{
			var city_first=id.substring(0,5)+'-01';
			showLivePlace(id);
			$('.person_information_ul dl').hide();
			$('#place').show();
//			bir.place.html(allArea2['city'][id][id]).attr('data', id);
			$('#place a').html(allArea2['city'][id][city_first]);
			$('#place a').attr('data',city_first);
			$('#place').trigger('click');
		}
		
	});

	
	//选择市
	c.on('click', '#place dd', function(event) {
		event.stopPropagation();
		var t = $(this);
		var data = this.innerHTML;
		var id = $(this).attr('data');
		t.parent().prev().html(data).attr('data',id);
//		$('dl').hide();
	});


	//表单保存
	c.on('click', '#save_btn', function(event) {
		if(!nickNameCheck()){
			return;
	    }

		//保存数据
		formSave();
        
        //数据发送 
		formSend();
	});


	//点击更换头像
	c.on('click', '#change_head', function(event) {
		d.show();
		$('.setting_alert_headimg').show();
	});


	//关闭更换头像
	d.on('click','#close_head', function(){
		d.hide();
		$('.setting_alert_headimg').hide();
	});

	//点击更换头像
	d.on('click', '#mes_con', function(event) {
		$('#head_file').trigger('click');
	});

	document.getElementById('head_file').onchange = function(){
		
		var file = this.files[0];
		if(file.size>5100000){
		    slideMessage('请上传小于5M的文件');
			clearHead();
			return;
		}
		
		
		var name = file.name.split('.');
		var fix = name[name.length-1];
		fix = fix.toLowerCase();
		if(fix=='jpg'||fix == 'png'||fix == 'bmp'||fix == 'jpeg'){
			var url = getFileUrl(this.files[0]);
		    onloadPic(url);

		    return;
		}
		 slideMessage('请上传jpg,png,bmp,jpeg格式的文件');
		 clearHead();

	}
	
	function clearHead(){
		if(jcrop!=null){
		   jcrop.destroy();
		   jcrop = null;
	    }
		
	    document.getElementById('bigpic').src = '';
		
	    a_p.src = '';
	    b_p.src = '';
	    c_p.src = '';
	}

	//保存头像
	d.on('click','#save_head', function(){
		if(jcrop == null){
			return;
		}
		head_size  = jcrop.tellSelect();

		head_size.x = Math.round(head_size.x/head_k);
		head_size.y = Math.round(head_size.y/head_k);
		head_size.w = Math.round(head_size.w/head_k);
		head_size.h = Math.round(head_size.h/head_k);

		uploadfile();
		head_cut();
		formSend();
		d.hide();
		$('.setting_alert_headimg').hide();
	});
	
	

	//定时器检测域名是否合法
	var set5;
	c.on('input propertychange', '#host_domain', function(event) {
			clearTimeout(set5);

			set5 = setTimeout(hostCheck,1000);
	});

	var set6;
	d.on('input propertychange', '#bind_email', function(event) {
		    clearTimeout(set6);

		    set5 = setTimeout(bind_emailCheck,1000);
	});

	var set7;
	d.on('input propertychange', '#bind_pwd', function(event) {
		     clearTimeout(set7);
		

		     set5 = setTimeout(bind_pwdCheck,700);

	});

	var set8;
	d.on('input propertychange', '#bind_vail', function(event) {
		      clearTimeout(set8);
		
		      set5 = setTimeout(bind_vailCheck,700);

	});

	//绑定邮箱下一步
	d.on('click', '#bind_next', function(event){
		if(bind_emailCheck()&&bind_pwdCheck()&&bind_vailCheck()){
         var emali = document.getElementById('bind_email').value;
         var pwd = document.getElementById('bind_pwd').value;
           bindEmail(emali, pwd);
           $('.setting_alert_email').hide();
           $('.mail-span').html(bind_email);
           var fix = bind_email.split('@');
            fix = fix[fix.length-1];
           $('.mail-btn').attr('href','http://mail.'+fix);
           $('#mailbox').show();
		}


	});
	var set;
	var x= 60;
	d.on('click', '#resend_mail', function(){
		clearInterval(set);
		x=60;
		set = setInterval(reduceTime,1000);

		$('#resend_p').html('<a class="mail-url">60秒后重新发送验证邮件</a>');

		var email = document.getElementById('bind_email').value;
         var pwd = document.getElementById('bind_pwd').value;

		bindEmail(email ,pwd);
			


	});

	function reduceTime(){
		x--;
		if(x==0){
			clearInterval(set);
			$('#resend_p').html('<a class="mail-url"  id="resend_mail">重新发送验证邮件</a>');
		}else{
			$('#resend_p').html('<a class="mail-url">'+x+'秒后重新发送验证邮件</a>');
		}
	}

	//定时器传参数
    function wr(old_i, old, reg){
    	return function(){
    		checkVal(old_i, old, reg);
    	}
    }

    //拍摄类型的信息点击
    c.on('click', '.style_choose_circle>a', function(event) {
    	var t = $(this);
    	if(t.hasClass('style_choose_circle_selected')){
    		t.removeClass('style_choose_circle_selected');
    		return;
    	}
    	t.addClass('style_choose_circle_selected');

    });

    //点击保存摄影师的信息
    c.on('click', '#photog_save', function(event) {
		if(!biztypeCheck()){
			return;
		}
		if(!hostCheck()){
			return;
		}
		//摄影师信息的保存
		photogSave();

		//信息发送保存
		photogSend();

    });
	
	


    //点击显示区域
    c.on('click', '#ss', function(event) {
    	newshowSer();
    	d.show();
    	$('#area-select').show();
    });

    //点击关闭显示的区域
    d.on('click', '.save-close', function(event) {
    	d.hide();
    	$('#area-select').hide();
    	$('.shen').html('');
    	$('.shi').html('');
    	$('.a-select').removeClass('a-select');
    });

    //点击修改服务地区
    d.on('click', '.save-btn', function(event) {
    	d.hide();
    	$('#area-select').hide();
    	updatePlace();
    	flag = 0;
    });

	//关闭修改密码
	d.on('click', '#cancel_change,#close_change', function(event) {
		$('.setting_alert_body').hide();
		document.getElementById('change_box').style.display='none';
	});


	//关闭下拉框
	$('#set-content').click(function(event) {
		$('.person_information_ul dl').hide();
	});


	//以下摄影师拍摄地选择
	$('.guo').on('click','p',function(){
        if(this.className == 'a-select'){
          return;
        }
        $('.a-select').removeClass('a-select');
        this.className = 'a-select';
        var id = this.getAttribute('data');
        var name;
        if(id == '01-00-00-00'){
          //海外
          name ="海外";
          is_foreign = 1;
        }else{
          name ="国内";
          is_foreign = 0;
        }
        showArea(name, id);
		$('.shen').show();
        $('.shi').html('');
    });

    //选择地区
     $('.shen').on('click','span',function(){
          if(this.className == 'b-select'){
            return;
          }
          if($('.b-select-all').hasClass('b-select')){
            return;
          }
          var id = this.getAttribute('data');
          var name = this.innerHTML;
          if(is_foreign == 1){
              addService(name ,id);
			  $('.shi').show();

          }else{
            $('.b-select').removeClass();
			  $('.shi').show();
             showTakePlace(name, id);
          }
          this.className = 'b-select';
    });

    //select all area
    $('.shen').on('click', 'a', function(){
          var t = $(this);
          //已经选择
          if(t.hasClass('b-select')){
            return
          }
          var id = this.getAttribute('data');
          var name = this.innerHTML;
          t.addClass('b-select');
          clearArea();
          clearSelect(id, 'area');
          addService(name ,id);
    }); 

   $('.shi').on('click','span',function(){
        if($('.b-select-all').hasClass('b-select')){
          return;
        }
        if($('.c-select-all').hasClass('c-select')){
          return
        }
        if(this.className == 'c-select'){
          return;
        }
        this.className = 'c-select';
        var id =this.getAttribute('data');
        var name = this.innerHTML;
        addService(name, id);
    });

   //select allplace
   $('.shi').on('click', 'a' , function(){
       if($('.b-select-all').hasClass('b-select')){
          return;
        }
        var t = $(this);
       if(t.hasClass('c-select')){
        return;
       }
       t.addClass('c-select');
       var id = this.getAttribute('data');
       var name = this.innerHTML;
       clearPlace(id);
       clearSelect(id, 'place');
       addService(name, id);

   })

    $('.topbar').on('click','span',function(){
          var id = this.getAttribute('data');

          $(this).fadeOut(400,function(){
            $(this).remove();
          });
          removeId(id);
    });

 	c.on('click', '#lbtn', function(event) {
 		
 		cul('pre');

 	}); 

 	c.on('click', '#rbtn', function(event) {
    
 		cul('next');

 	});

 	d.on('click', '.in-pre', function(event) {
 		
 		cul2('pre');

 	});

 	d.on('click', '.in-next', function(event) {
 		
 		cul2('next');
 	});


init();

});

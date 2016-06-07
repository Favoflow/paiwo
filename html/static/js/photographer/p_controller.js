jQuery(function($){
    var target = $('#show-content');
	
	 //拍摄类型的选择	
	target.on('click', '.select_target', function(event) {
				var t = $(this);
				if(t.hasClass('selected')){
					t.removeClass('selected').addClass('unselected');
					t.children('.smal_circle_div').stop(true,true).fadeOut(300);
				}else{  					
					t.addClass('selected').removeClass('unselected');
					t.children('.smal_circle_div').stop(true,true).fadeIn(300);		  
				}
				select_type_check();	 				
     });
	
     //1.step确认提交
  	target.on('click', '#next_step1', function(event) {
       		if(!$(this).hasClass('next_step_red')){
       			return ;
       		}
            
       		first_data();
       });


     //add.step 注册账号失焦点
	var set1;
	target.on('input propertychange', '#regis_email', function(event) {
			clearTimeout(set1);
			set1 = setTimeout(regis_mail_check, 1000);
			add_next_check();
     });
	
	target.on('click', '#regis_email,#regis_pwd', function(event) {
          if(this.value == ''){
              $(this).attr('placeholder', '');
          }
     });
	
	var set2;
     //add.step 密码失焦点
	target.on('input propertychange', '#regis_pwd', function(event) {
			//clearTimeout(set2);
			//set2 = setTimeout(regis_pwd_check, 1000);		
			regis_pwd_check();
			add_next_check();
     });

     //add.step 账号 确认提交
	target.on('click', '#add_step', function(event) {
		if(!$(this).hasClass('next_step_red')){
			return;
		}
		regis_mail_check();
		if(mail_flag == 1){
			addstepsubmit();
		    threesubmit();
			
		}else{
			add_next_check();	
		}
	
		
     });

	
     var set3;
     //昵称 失去焦点昵称校验
	target.on('input propertychange', '#nick_input', function(event) {
     			clearTimeout(set3);
     			set3 = setTimeout(check_nickNmae,1000);

     });
     var set4;
     //域名 失去焦点域名校验
	target.on('input propertychange', '#domain_input', function(event) {
     		     clearTimeout(set4);
     			 set4 = setTimeout(check_domain,1000);
     });
	
	
     //4.step点击触发input file按钮
	target.on('click', '.file_circle', function(event) {
     	$('.head-back').show();		
     });


	target.on('change', '#four_input', function(event) {
		  var name = this.files[0].name.split('.');
		  var fix = name[name.length-1].toLowerCase();
		
		  if(this.files[0].size>5100000){
			clearHead();
			showMessage('上传头像文件需小于5M');
			avatar = '0';
			return;
		  }
          if(fix=='jpg'||fix=='png'||fix=='bmp'||fix=='jpeg'){
			  var url = getFileUrl(this.files[0]);
             	onloadPic(url);  
           }else{
			 showMessage('请上传jpg,png,bmp,jpeg图片文件');
             clearHead();
             avatar = '0';
           }   
         
     });



     //4.step 跳过
	target.on('click', '#four-jump', function(event) {
    		target.html(five_tm);
    		showplace();  //地区选择初始化
    		$('.step_five_box').fadeIn(400);
    		navi_change(4);   
         });

     //4.step  提交
	target.on('click', '#four_step', function(event) {
			if(!$(this).hasClass('next_step_red')){
					return ;
			}
			check_nickNmae();
			check_domain();
			if(four_next()){
		
				if(avatar){
					uploadfile2();
					avatorsubmit();
					return;
				}
				avatorsubmit();
				
			}


    });



      //点击选择女
	target.on('click', '.sex_woman', function(event){
            var s = this.id;
            if(s){
                 this.id = '';
               $('.five_circle_div_woman').hide();
                five.sex = 0 ;
                 return; 
            }
            five.sex =2;
            this.id = 'sex_woman-select';
            $('.five_circle_div_woman').show();
            select_sex('woman');
            five_check();
      });
      //点击选择男的
	target.on('click', '.sex_man', function(event) {
          var s = this.id;
          if(s){
                this.id = '';
                $('.five_circle_div_man').hide();
                five.sex = 0 ;
                return;             
          }
          five.sex = 1;
          this.id = 'sex_man-select';
          $('.five_circle_div_man').show();
          select_sex('man');
          five_check();
      });


      //5.step，性别，所在地，简介的说明 跳过
      target.on('click', '#five-jump', function(event) {
                target.html(six_tm);
                $('.step_six_box').fadeIn(400);
                navi_change(5);
      });

	
      target.on('click','.location_input',function(event){
            $(this).next().toggle();

      });

      //选择省份
      target.on('click','.s-a',function(){
             var val = $(this).attr('data');
             var name = $(this).text();
		  	
              five.place = val;
              $('.location_input').eq(0).text(name);
              $('.location_input').eq(1).text('市/区');
              select_b(val);
              $('#pro').hide();
              five_check();
      });

      //选择市
      target.on('click','.s-b',function(){
             var val = $(this).attr('data');
             var name = $(this).text();
             five.place = val;
              $('.location_input').eq(1).text(name);
              $('#city').hide();
             five_check();
      });
      target.on('input propertychange','.simple_text',function(){
		  
            five_check();
      });


      //5.step提交
      target.on('click', '#five_step', function(event) {
        if(!$(this).hasClass('next_step_red')){
                return ;
            }
		  
            var desc = $('.simple_text').val();
            fivesubmit(desc);

      });



      target.on('input propertychange', '#qq_val', function(event) {

            six_check();
      });

      target.on('input propertychange', '#phone_val', function(event) {

		  	six_check();
      });
      target.on('input propertychange', '#wechat_val', function(event) {
		    six_check();
      });




      //联系方式的提交
      target.on('click', '#six_step', function(event) {
          if(!$(this).hasClass('next_step_red')){
                        return;
          }
		
              sixsubmit();

      });
	
      //6.step跳过  
      target.on('click','#six-jump',function(event) {
                
                showemail();
      });

      target.on('click', '#resendmail', function(event) {
                if (set_o<60){
                    return false;
                }
                else{
                    $.ajax({
                        url: '/a/photographer/send/email',
                        type: 'POST',
                        dataType: 'json',
                        data: {session: user_session}
                    });
                    $('#resendmail').text('60秒后可再次发送');
                    resendmail();
                    setin = setInterval(resendmail,1000);
                }
                
      });

      target.append(one_tm);
      $('.bp_main').show();
	  //target.html(five_tm);
	   //showplace();
	  //$('.step_five_box').show();
	   //target.html(six_tm);
		//$('.step_six_box').fadeIn(400);


});

var jcrop = null;
var a_p = $('#a_p');
var b_p = $('#b_p');
var c_p = $('#c_p');

document.getElementById('head-close').onclick = function(){
	$('.head-back').hide();
}
document.getElementById('head-btn').onclick = function(){
	$('#four_input').trigger('click');
}
//保存头像
document.getElementById('head-save').onclick = function(){
	if(jcrop == null){
			showMessage('请上传头像图片');
			return;
		}
		head_size  = jcrop.tellSelect();

		head_size.x = Math.round(head_size.x/head_k);
		head_size.y = Math.round(head_size.y/head_k);
		head_size.w = Math.round(head_size.w/head_k);
		head_size.h = Math.round(head_size.h/head_k);
		$('#five-load').show();
     	uploadfile2();//上传图像文件
		head_cut(); //上传图像剪裁
			$('.head-back').hide();
		$('#five-load').hide();
		$('.step_four_file').html('<img class="file_circle" id="four_head">');
		document.getElementById('four_head').src = 'http://image.paiwo.co/'+avatar;
}

function clearHead(){
		if(jcrop!=null){
		   jcrop.destroy();
		   jcrop = null;
	    }
		avatar = '0';
		$('.step_four_file').html('<a class="file_circle" id="four_head1"><span>+</span></a><h4>上传头像</h4>');

	    document.getElementById('bigpic').src = '';
		
	    a_p[0].src = '';
	    b_p[0].src = '';
	    c_p[0].src = '';
}

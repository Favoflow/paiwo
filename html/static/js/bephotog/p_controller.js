jQuery(function($){
    var target = $('#show-content');

	isPhotographer();
	
	
	//拍摄类型的选择	
	target.on('click', '.select_target', function(event) {
				var t = $(this);
				if(t.hasClass('selected')){
//					t.removeClass('selected').addClass('unselected');
                    t.removeClass('selected');
					t.children('.smal_circle_div').stop(true,true).fadeOut(300);
				}else{  					
//					t.addClass('selected').removeClass('unselected');
                    t.addClass('selected');
					t.children('.smal_circle_div').stop(true,true).fadeIn(300);		  
				}            
				select_type_check();	 				
     });
	
	
     //拍摄类型提交
     target.on('click', '#next_step1', function(event) {
     		if(!$(this).hasClass('next_step_red')){
     			return ;
     		}
     		first_data();
     });


     var t1;
     //昵称step 失去焦点昵称校验
	target.on('input propertychange', '#nick_input', function(event) {
     			clearTimeout(t1);
     			t1 = setTimeout(check_nickNmae,1000);
     });
     var t2;
     //4.step 失去焦点域名校验
	target.on('input propertychange', '#domain_input', function(event) {
     		     clearTimeout(t2);
     			 t2 = setTimeout(check_domain,1000);
     });
     //4.step点击触发input file按钮
	target.on('click', '.file_circle', function(event) {
     	$('.head-back').show();		
     });


	target.on('change', '#four_input', function() {
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



     //头像 昵称 个性域名 跳过
	target.on('click', '#four-jump', function() {
		target.html(five_tm);
		showplace();
		$('.step_five_box').fadeIn(400);
		navi_change(3);   
     });

     //头像 昵称 个性域名 提交
	target.on('click', '#four_step', function() {
		if(!$(this).hasClass('next_step_red')){
					return ;
			}
			check_nickNmae();
			check_domain();
			if(four_next()){
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
                navi_change(4);
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
		   $('#show-content').html(last_tm);
		   $('.bp_compelet').fadeIn(400);
		   to_jump();
      });


      target.append(one_tm);
      $('.bp_main').show();
    
    //init
        (function(){
            
//            store.set('campus_contest',1);
            
           var state = store.get('campus_contest');
            console.log('state '+state);
            if(state){  //活动成为摄影师
                //拍摄类型 activity_be_pg
                //skip_btn
                $('.activity_be_pg').show();
                $('.skip_btn').css('display','block');
                $('#next_step_two_ac').show();

            }else{  //正常成为摄影师
                //拍摄类型 bp_main_p
                $('.bp_main_p').show();
                $('#next_step_two').show();
            }

            store.remove('campus_contest');

        })();

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

//完善个人资料跳转
$('#show-content').on('click','.go-user',function(){
    store.set('center','4');
    window.location.href = '/user';
});




//skip_btn 立即跳转上传页面
$('#show-content').on('click','.skip_btn',function(){
      activity_be_pg();
});

$('#show-content').on('click','#next_step_two_ac',function(){
      activity_be_pg();
      return false;
});

store.set('ph_first','true');






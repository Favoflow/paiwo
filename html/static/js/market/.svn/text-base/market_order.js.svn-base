
jQuery(function(){

   //获取当前页面订单的order_id
   var order_location = window.location.href.lastIndexOf('/')+1,
   		     order_id = window.location.href.substring(order_location);
  
   //拍摄类型选择
   var type_html = ['','人像摄影','婚纱摄影','婚礼跟拍','家庭儿童','旅行跟拍','商业服务','其他'];

  //获取订单详情 
  $.ajax({
       url: '/rest',
      type: 'POST',
  dataType: 'json',
     async: false,
     data: {
        data:JSON.stringify({
        	'method':'paiwo.market.order.get',
            'order_id': order_id 
        })
     },

      success:function (data){

        //判断是不是自己的订单，分别显示内容
	      	if(data.response.self_order == 0) {
	      		var left_mid_con = $("<div class='left-mid-con'><u>用户</u><img><span></span><u>的订单</u><a id='order_title_mes'><i class='left-mid-con-a-i'></i>联系TA</a></div>").appendTo($("#order_title"));
	      		   left_mid_time = $("<div class='left-mid-time'>大致预算：<span class='order-money money' id='other_order_price'></span><button id='order-self-close1'></button></div>").appendTo($("#order_title"));
	      		
	      		if(data.response.order_state == 1){
	      			if(JugeOrderTime(data.response.photograph_end_date)){
	      				$('#order-self-close1').attr('class','order-self-closed').css('color','#ff475c').html('订单已过期');
	      			}
	      		}
	      		else if(data.response.order_state == 2){
	      			$('#order-self-close1').attr('class','order-self-closed').css('color','#414141').html('订单已关闭');
	      		}

	      		//顾客头像
	      		if(data.response.customer_avatar == ''){
	      		  $('#order_title').find('img').attr('src','/static/images/user_head.gif');	      		  
	      		}
	      		else{  
	      		  $('#order_title').find('img').attr('src','http://image.paiwo.co/'+data.response.customer_avatar);
	      		}

	      		//顾客名称
	      		$('#order_title').find('.left-mid-con').find('span').html(data.response.customer_name);
	      		$('#order_title').find('.left-mid-con').find('span').attr('data-code',data.response.customer_domain);

	      		//顾客ID
	      		$('#order_title_mes').attr('data-code',data.response.customer_id);
	      		$('#order_title').find('img').attr('data-code',data.response.customer_domain);

	      		//预算价格
	      		$('#other_order_price').html('<i>￥</i>'+data.response.photograph_low_price+'-'+data.response.photograph_high_price);

	      		//我要拍按钮显示
	      		if(is_photographer == 1){ 
	      		    if(data.response.ido == 1){
	      		  	    $('#wo_pai').hide();
	      		    }
	      		    else{
	      		  	    $('#wo_pai').show();
	      		    }

	      		}
	      		else {
	      		    $('#wo_pai').hide();
	      		}
	      	}
	      	else {
	      		var left_mid_con2 = $("<div class='left-mid-con'><b>订单详情</b></div>").appendTo($("#order_title"));
	      		    left_mid_time2 = $("<div class='left-mid-time'>大致预算：<span class='order-money money' id='my_order_price'></span><button id='order-self-close'></button></div>").appendTo($("#order_title"));
	      		if(data.response.order_state == 1){
	      			if(JugeOrderTime(data.response.photograph_end_date)){
	      				$('#order-self-close').attr('class','order-self-closed').css('color','#ff475c').html('订单已过期');
	      			}
	      			else{
	      				$('#order-self-close').attr('class','order-self-close').html('关闭订单');
	      			}
	      		}
	      		else if(data.response.order_state == 2){
	      			$('#order-self-close').attr('class','order-self-closed').css('color','#414141').html('订单已关闭');
	      		}
	      		//预算价格
	      		$('#my_order_price').html('<i>￥</i>'+data.response.photograph_low_price+'-'+data.response.photograph_high_price);

	      		//我要拍按钮不显示
	      		$('#wo_pai').hide();

	      		//显示推荐摄影师
      			OrderPhotogajax(data);
	      	}
     
     
        //拍摄类型
        var type_num = data.response.photograph_type;
        $('#order_style').html(type_html[type_num]);

        //拍摄类型背景图片
        switch (data.response.photograph_type){
        	case 1:
        		$('.aut-ul-left-left').find('img').attr('src','http://image.paiwo.co/10763/album/7716f090d2d36d5802a8dcae80e5b848@!280x280');
        		break;
            case 2:
             	$('.aut-ul-left-left').find('img').attr('src','http://image.paiwo.co/10970/album/0be8bca6db89a50d362b79901e3ffee4@!280x280');
        		break;
            case 3:
             	$('.aut-ul-left-left').find('img').attr('src','http://image.paiwo.co/10970/album/0be8bca6db89a50d362b79901e3ffee4@!280x280');
        		break;
            case 4:
             	$('.aut-ul-left-left').find('img').attr('src','http://image.paiwo.co/11058/album/bd532d6afcea6b59305a97f74ea11212@!280x280');
        		break;
        	case 5:
             	$('.aut-ul-left-left').find('img').attr('src','http://image.paiwo.co/10696/album/996cffd52115bd897815010e7396cd9d@!280x280');
        		break;
        	case 6:
             	$('.aut-ul-left-left').find('img').attr('src','http://image.paiwo.co/10742/album/e87d7e5f8f7c6a01a1eeab4702ae4e8d@!280x280');
        		break;
        	case 7:
             	$('.aut-ul-left-left').find('img').attr('src','http://image.paiwo.co/10605/album/eea79f86978670389df4c5bc7a7fa727@!280x280');
        		break;
        }

        //拍摄类型背景图片上的icon
        (function (){
        switch (data.response.photograph_type){
            case 0:
              order_i_class = 'ul-left-black-i-all';
              break;
            case 1:
              order_i_class = 'ul-left-black-i-people';
              break;
            case 2:
              order_i_class = 'ul-left-black-i-wed';
              break;
            case 3:
              order_i_class = 'ul-left-black-i-wedding';
              break;
            case 4:
              order_i_class = 'ul-left-black-i-kid';
              break;
            case 5:
              order_i_class = 'ul-left-black-i-travel';
              break;
            case 6:
              order_i_class = 'ul-left-black-i-biz';
              break;
            case 7:
              order_i_class = 'ul-left-black-i-other';
              break;
          }
          $('.ul-left-black').find('i').addClass(order_i_class);
        })();
        //拍摄时间
        var order_time_start = data.response.photograph_start_date.substring(0,4)+'/'+data.response.photograph_start_date.substring(5,7)+'/'+data.response.photograph_start_date.substring(8,10),
        	 order_end_start = data.response.photograph_end_date.substring(0,4)+'/'+data.response.photograph_end_date.substring(5,7)+'/'+data.response.photograph_end_date.substring(8,10);

        $('#order_time').find('span').html(order_time_start+'-'+order_end_start);

        //拍摄地点
        var order_place_data = data.response.photograph_location,
        		 order_place = '',
                     c1 = order_place_data.substring(0,2),
                     c2 = order_place_data.substring(0,5);
        if(c1 == '01') {
        	order_place = allArea['province']['01-00-00-00'][order_place_data];
        }
        else {
        	if(order_place_data == '02-33-00-00' || order_place_data == '02-34-00-00'){
        		order_place = allArea['province']['02-00-00-00'][order_place_data];
        	}
        	else {
        		order_place_prov = allArea['province']['02-00-00-00'][c2+'-00-00'];
        		order_place_city = allArea['city'][c2+'-00-00'][order_place_data];
        		if(typeof order_place_city == 'undefined'){
        			order_place_city = '';
        		}else {}
        		order_place = order_place_prov+' '+order_place_city;
        	}
        }
        $('#order_place').find('span').html(order_place);

        //拍摄人数
        if(data.response.photograph_people_count == 0) {
        	$('#order_people_count').html('<i>—</i>');
        }
        else {
        	$('#order_people_count').find('i').html(data.response.photograph_people_count);
        }

        //拍摄性别
        var order_sex_data = data.response.photograph_gender;
        if (order_sex_data == 0)
        	order_sex = '—';
        else if(order_sex_data == '10')
        	order_sex = '女';
        else if(order_sex_data == '01')
        	order_sex = '男';
        else
        	order_sex = '都有';
        $('#order_gender').find('i').html(order_sex);

        //期望风格
        $('#order_des').find('p').html(data.response.photograph_require);

        //顾客邮箱
        $('#order_emial').html(data.response.contact_email);


        //显示为愿意为自己拍摄的摄影师
            //显示摄影师数目
	        if(data.response.ido_photographer_list.length == 0 ){
	        	if(data.response.self_order == 1)
	        	  $('#ido_photog_count').html('一 请耐心等待摄影师联系您 一')
	        	else 
	        	  $('#ido_photog_count').html('一 还没有摄影师联系TA 一')
	        }
	        else {
	        	if(data.response.self_order == 1)
	              $('#ido_photog_count').html('一 已有<i>'+data.response.ido_photographer_list.length+'</i>位摄影师联系您 一');
	            else
	              $('#ido_photog_count').html('一 已有<i>'+data.response.ido_photographer_list.length+'</i>位摄影师想要拍摄 一');
	        }

	        //显示摄影师信息
	        for(var i = 0; i<data.response.ido_photographer_list.length;i++){
		        if(data.response.ido_photographer_list[i].is_self == 1){
			        market_order_view.showIdoPhotog(data.response.ido_photographer_list[i]);
			        data.response.ido_photographer_list.splice(i,1);   	
			    }
			    market_order_view.showIdoOtherPhotog(data.response.ido_photographer_list);			 
			}  
      },  

      error:function(data){

      }

});

	  var my_take_submit_bor = false,
	       my_take_money_bor = false,
	       my_take_phone_bor = false; // 全局变量

      //我要拍提交表单
      $('#my_take_submit').click(function(){
      	        my_take_submit_bor = true;
	      	var      my_take_price = $('#my_take_price').val(),
	      	           my_take_num = $('#my_take_num').val(),
	      	    my_take_price_data = /^[0-9]*$/.test(my_take_price),
	              my_take_num_data = /^[0-9]*$/.test(my_take_num),
	                  my_take_desc = $('#my_take_des').val(),
	               my_take_provide = 0,
	                 my_take_phone = $('#my_take_phone').val(),
	         my_take_phone_data_11 = /^\d{11}$/.test(my_take_phone),
	          my_take_phone_data_8 = /^\d{8}$/.test(my_take_phone),             
	              my_take_desc_bor = false;


	        //判断正确价格和成片张数
	        Money_Juge();

	        //判断电话号码
	        Phone_Juge();

	        //判断备注
	        if(my_take_desc.length>50){
	        	$('#my_take_des').addClass('price-textarea-excced');
	        	my_take_desc_bor = 0;
	        }
	        else {
	        	$('#my_take_des').removeClass('price-textarea-excced');
	        	my_take_desc_bor = 1;
	        }
	        setTimeout(function(){
	            $('#my_take_des').removeClass('price-textarea-excced');
	        },2000);


	        //判断提供服务
	        if($('.checkbox').find('i').eq(0).css('display') == 'none' && $('.checkbox').find('i').eq(1).css('display') == 'none')
	        	my_take_provide = 0;
	        else if ($('.checkbox').find('i').eq(0).css('display') == 'block' && $('.checkbox').find('i').eq(1).css('display') == 'none')
	            my_take_provide = 2;
	        else if ($('.checkbox').find('i').eq(0).css('display') == 'none' && $('.checkbox').find('i').eq(1).css('display') == 'block')
	            my_take_provide = 1;
	        else
	           	my_take_provide = 3;	 
	        
	        //判断全部正确提交ajax
	        if( my_take_money_bor && my_take_phone_bor == 1 && my_take_desc_bor == 1){

                $('.alert_body').fadeIn();
                $('#wopai_submit_box').show();
                $('#wopai_submit_btn').click(function(){
		        	$.ajax({
					       url: '/rest',
					      type: 'POST',
					  dataType: 'json',
					     async: false,
					     data: {
					        data:JSON.stringify({
					        	'method': 'paiwo.market.order.ido',
					        	'order_id': order_id,
					        	'ido_price': my_take_price,
					        	'ido_photo_count': my_take_num,
					        	'ido_service': my_take_provide,
					        	'ido_contact': my_take_phone,
					        	'ido_desc': my_take_desc
					        })
					     },
					      success:function (data){
					      	  if(data.error_id == 0){
					              $('.wo-pai-box').slideUp(300);
						          window.location.reload();
					          }
					      }
					});
				});
	        }
     
    });//我要拍提交表单结束


////////////////////////DOM绑定///////////////////////////

    //document click事件
  function closeSelect(){  
    $('.place_select').fadeOut(200);
  }

  $(document).click(function(){
    closeSelect();
  });

	$('.left-mid-con a').on('mouseenter',function(){
		$(this).find('i').removeClass('left-mid-con-a-i').addClass('left-mid-con-a-ihover');
	});
	$('.left-mid-con a').on('mouseleave',function(){
		$(this).find('i').removeClass('left-mid-con-a-ihover').addClass('left-mid-con-a-i');
	});

	//我要拍出现联系方式
      $('#wo_pai').on('click',function(){
        $('.wo-pai-box').slideDown(100);
        $(this).css({opacity: 0});
		$('#my_take_price,#my_take_num,#my_take_phone,#my_take_des').val('');
		$('#sel_area').find('i').html('手机');
		$('.textarea-tip').find('i').html('0')
		$('.checkbox').find('i').css('display','none');
      });

	//下拉框点击
	  $('.select').click(function(ev){
	  	  ev.stopPropagation();
	  	  $(this).find('dl').toggle();
	  	  var tel_val = $('#sel_area>i').html();
		  if(tel_val == '400电话')
		      $('#my_take_phone').val('400');
		  else{
		  	  $('#my_take_phone').val('');
		  }
	  });
	  $('.place_select').on('click','dd',function(){
	  	  $('#sel_area').find('i').html($(this).html());
	  }); 
    
    //复选框
      $('.checkbox').on('click','a',function(){
      	$(this).find('i').toggle();
      });
      $('.checkbox').on('click','u',function(){
      	$(this).prev('a').find('i').toggle();
      });

    //取消我要拍
    $('#my_take_cancel').click(function(){
    	$('.wo-pai-box').slideUp(100);
    	$('#wo_pai').css({'opacity': 1},{'transition': '.2s ease .6s'},{'-webkit-transition': '.2s ease .6s'});
    });

    $('#wopai_cancel_btn').click(function(){
    	$('.alert_body').fadeOut();
    	$('#wopai_submit_box').hide();
    });
   
	//联系他按钮hover
      $('.yue-button').on('mouseenter',function(){
	    $(this).find('i').removeClass('yue-button-i').addClass('yue-button-ihover');
	  });
	  $('.yue-button').on('mouseleave',function(){
	    $(this).find('i').removeClass('yue-button-ihover').addClass('yue-button-i');
	  });

    //备注字数的统计判断
	  $('.textarea').on('input propertychange',function(){
	  	 var text_num = $(this).val().length;
	  	  $('.textarea-tip').find('i').html(text_num);
	  	 if(text_num > 50) {
	  	 	$('.textarea-tip').addClass('textarea-tip-excced');	  	 	
	  	 }
	  	 else {
	  	 	$('.textarea-tip').removeClass('textarea-tip-excced');
	  	 	$('#my_take_des').removeClass('price-textarea-excced');
	  	 }
	  });

	//关闭弹窗
	$('.message_close').click(function(){
		$('.alert_body').fadeOut();
	});

	//点击显示私信
	  $('.yue-button,#order_title_mes').click(function(){
	  	  if(is_login == 0){
				loginInside.show();
				return;
		  }
	      $('#top_message').trigger('click');
    	  PWS.addTalk(this.getAttribute('data-code'));
      });

	//摄影师主页跳转
	  $('.footPhotog2-ul,#footPhotog2-other-ul,#footPhotog3-recom-ul').on('click','.header_textbox_headimg',function(){
	     var ph_host = $(this).attr('data-code');
	     window.open('/'+ph_host);
	  });
	  $('#footPhotog2-other-ul figcaption,.footPhotog2-ul figcaption,#footPhotog3-recom-ul figcaption').on('click','a',function(){
         var ph_host = $(this).attr('data-code');
         window.open('/'+ph_host);
      });

	  $('#order_title img,#order_title span').click(function(){
	  	 var ph_host = $(this).attr('data-code');
         window.open('/'+ph_host);
	  });

    //联系电话判断显示错误提示
    $('#my_take_phone').on('input propertychange',function(){
    	if(my_take_submit_bor){
    		$('#phone_error').hide();
    		if($(this).val().length > 10)
    		  Phone_Juge();
    		else {
    			$(this).blur(function(){
    				Phone_Juge();
    			});
    		}
    	}
    });

    $('#my_take_price,#my_take_num').on('input propertychange',function(){
    	if(my_take_submit_bor){
    		Money_Juge();
    	}
    });
 
    //关闭订单弹窗
    $('.order-self-close').click(function(){
    	$('.alert_body').fadeIn();
    	$('#wopai_turesubmit_box').show();	
    });

    $('#wopai_turecancel_btn').click(function(){
    	$('.alert_body').fadeOut();
    	$('#wopai_turesubmit_box').hide();
    });

    //关闭订单
    $('#wopai_turesubmit_btn').click(function(){
    	$.ajax({
		       url: '/rest',
		      type: 'POST',
		  dataType: 'json',
		     async: false,
		     data: {
		        data:JSON.stringify({
		        	'method': 'paiwo.market.order.close',
		        	'order_id': order_id
		        })
		     },
		      success:function (data){
		      	  if(data.error_id == 0){
		             $('.order-self-close').removeClass('order-self-close').addClass('order-self-closed').html('订单已关闭');
		             $('.alert_body').fadeOut();
		             $('#wopai_turesubmit_box').hide();
		             slideMessage('订单已关闭');
		             setTimeout(function(){
		             	window.location.href = '/market'; 
		             },2000);
		             
		          }
		      }
		});
    });

    //价格、张数输入框数量限制
     $('#my_take_price').keydown(function(ev){
     	 if(ev.keyCode == 8) return true;
         else if( ev.keyCode > 47 && ev.keyCode <58 ){
         	if($(this).val().length > 6) return false;
            else return true;   
         }else{
            return false; 
         }
     });

     $('#my_take_num').keydown(function(ev){
     	if(ev.keyCode == 8) return true;
     	if(ev.keyCode > 47 && ev.keyCode <58){
     		if($(this).val().length > 3 )return false;
     		else return true;
     	}
     	else return false;
     });
    
    //联系电话只显示数字
    $('#my_take_phone').keydown(function(ev){
    	if(ev.keyCode > 47 && ev.keyCode <58 || ev.keyCode == 8){
     		return true;
     	}
     	else return false;
    });


//////////////////////////函数封装///////////////////////////

    function Phone_Juge(){
    	var          my_take_phone = $('#my_take_phone').val(),
    	     my_take_phone_data_11 = /^\d{11}$/.test(my_take_phone),
	          my_take_phone_data_8 = /^\d{8}$/.test(my_take_phone),
	         my_take_phone_data_10 = /^\d{10}$/.test(my_take_phone),
	         my_take_phone_data_12 = /^\d{12}$/.test(my_take_phone);

    	    if($('#sel_area').find('i').html() == '手机' || $('#sel_area').find('i').html() == '400电话') {
	        	if(my_take_phone == ''){
	        		$('#phone_error').show().find('span').html('请输入联系方式');
	        		my_take_phone_bor = 0;
	            }
	        	else if(!my_take_phone_data_11){
	        		$('#phone_error').show().find('span').html('请输入正确联系方式');
	        		my_take_phone_bor = 0;
	            }
	        	else { 
	        		$('#phone_error').hide();
	        	    my_take_phone_bor = 1;
	        	}
	        }
	        else if($('#sel_area').find('i').html() == '固定电话') {
	        	if( my_take_phone == 0){
	        		$('#phone_error').show().find('span').html('请输入联系方式');
	        		my_take_phone_bor = 0;
	        	}
	        	else if(my_take_phone_data_11 || my_take_phone_data_10 || my_take_phone_data_12){
	        		$('#phone_error').hide();
	        		my_take_phone_bor = 1;
	        	}
	        	else {        		
	        		$('#phone_error').show().find('span').html('请输入正确联系方式');
	        		my_take_phone_bor = 0;
	        	}
	        }
	        else {
	        	$('#phone_error').hide();
	        }
    }

    function Money_Juge(){
    	var      my_take_price = $('#my_take_price').val(),
	      	       my_take_num = $('#my_take_num').val();
	        //填写正确价格和成片张数
	        if(my_take_price == '' && my_take_num == ''){
	        	$('#money_error').show().find('span').html('请填写价格和成片张数');
	        	my_take_money_bor = false;
	        }
	        else if(my_take_price == '' && my_take_num != ''){
	        	$('#money_error').show().find('span').html('请填写价格');
	        	my_take_money_bor = false;
	        }
	        else if(my_take_price != '' && my_take_num == ''){
	        	$('#money_error').show().find('span').html('请填写成片张数');
	        	my_take_money_bor = false;
	        }
	        else {
	        	$('#money_error').hide();
	        	my_take_money_bor = true;
	        }
	        return my_take_money_bor;
    }

    function OrderPhotogajax(data){
		$.ajax({
		         url: '/rest',
		        type: 'POST',
		    dataType: 'json',
		       async: false,
		        data: {
		          data: JSON.stringify({
		          'method': 'paiwo.market.order.simple.submit',
		          'photograph_type': data.response.photograph_type,
		          'photograph_location': data.response.photograph_location
		         })
		    },
		    success:function (data){
		        if(data.error_id == 0) {
		        	if(data.response.photographer_list.length>0){
		        	  $('#footPhotog3-recom-ul').find('h3').show();
		              market_order_view.showRecomPhotog(data.response.photographer_list.slice(0,6));
		        	}
		        }
		      }
		  });
	}

    //判断订单过期
    function JugeOrderTime (data_time) {
    	var data_year = data_time.substring(0,4),
    	   data_month = data_time.substring(5,7),
    	     data_day = data_time.substring(8,10),
       data_time_comp = new Date(),
    	     now_date = new Date(),
    	   order_date = new Date(),
    	     now_year = now_date.getFullYear(),
    	    now_month = now_date.getMonth()+1,
    	      now_day = now_date.getDate();
        data_time_comp.setFullYear(now_year);
	    data_time_comp.setMonth(now_month,now_day);
	        order_date.setFullYear(data_year);
	        order_date.setMonth(data_month,data_day);
	   data_time_mins = data_time_comp.getTime(data_time_comp);
	  order_date_mins = order_date.getTime(order_date);
	  if( data_time_mins > order_date_mins) return true;  
	  else return false;
    }
 
    $('#my_order_price').off('click');
    
});
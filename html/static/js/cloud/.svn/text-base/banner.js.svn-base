//tab小箭头翻转
$('.tab-icon_myset').on('mouseenter',function(){
  $(this).find('i').addClass('select-arrow-active');
});
$('.tab-icon_myset').on('mouseleave',function(){
  $(this).find('i').removeClass('select-arrow-active');
});


//导航hover效果
$('.navi_middle_photos').on('mouseenter',function(){
  $(this).find('i').removeClass().addClass('middle_pics_i_hover');
});
$('.navi_middle_photos').on('mouseleave',function(){
  $(this).find('i').removeClass().addClass('middle_pics_i');
});

$('.navi_middle_Photographer').on('mouseenter',function(){
  $(this).find('i').removeClass().addClass('middle_Photographer_i_hover');
});
$('.navi_middle_Photographer').on('mouseleave',function(){
  $(this).find('i').removeClass().addClass('middle_Photographer_i');
});

$('.navi_middle_task').on('mouseenter',function(){
  $(this).find('i').removeClass().addClass('middle_task_i_hover');
});
$('.navi_middle_task').on('mouseleave',function(){
  $(this).find('i').removeClass().addClass('middle_task_i');
});

$('.navi_middle_activities').on('mouseenter',function(){
  $(this).find('i').removeClass().addClass('middle_activities_i_hover');
});
$('.navi_middle_activities').on('mouseleave',function(){
  $(this).find('i').removeClass().addClass('middle_activities_i');
});


//点击右上角的”我的主页“的时候,若不是摄影师，则在页面顶部提示请登录
$('.select_browse').on('click',function(){
    if(is_photographer == 0) {
//        showMessage('请先认证成为摄影师');
        return false;
    }
});


var timer1 = null;
    timer2 = null,
    domian = document.domain.split('cloud.')[1];

//tab 部分的js
$('#tab-icon_myset .tab-icon_myset').on('mouseenter',function(ev){
    clearTimeout(timer2);
//   timer = setTimeout(function(){
      $('.tab_select_box').show();
      $('.tab_select_box').stop().animate({'opacity':1,'height':278},160,'linear');
//   },200);
   ev.stopPropagation();
});


$('#tab-icon_myset .tab-icon_myset').on('mouseleave',function(ev){
    timer1 = setTimeout(function(){
        $('.tab_select_box').stop().animate({'opacity':0,'height':0},160,'linear',function(){
            $('.tab_select_box').hide();
        });
    },300);
   
   ev.stopPropagation();
});

$('.tab_select_box').on('mouseenter',function(){
    clearTimeout(timer1);
    $('.tab_select_box').stop().animate({'opacity':1,'height':278},160,'linear');
});


$('.tab_select_box').on('mouseleave',function(){
//    clearTimeout(timer1);
    timer2 = setTimeout(function(){
        $('.tab_select_box').stop().animate({'opacity':0,'height':0},160,'linear',function(){
            $('.tab_select_box').hide();
        });
    },200);
    
});
//$('.tab_select_box').


//
//$('.select_login_out').on('mouseenter',function(){
//  $(this).find('i').removeClass().addClass('select_login_ihover');
//});
//
//$('.select_login_out').on('mouseleave',function(){
//  $(this).find('i').removeClass().addClass('select_login_i');
//});



var is_login = 0;

var cloud = {
    
    init:function(fn){
            
         var initStr = {
                url:'/rest',
                data:{
                    data: JSON.stringify({
                    method: 'paiwo.user.top.get'
                })
             }
        };
        
        
        var iframe = document.createElement("iframe");
        
        iframe.src = "http://"+domian+"/rest";
        iframe.style.display = 'none';
        iframe.setAttribute('id','main_frame');
        
        
        iframe.onload = function(){
//            alert("Local iframe is now loaded.");
            cloud.crossAjax(initStr,function(data){
                if(data.error_id == 0){
                        var _data = data.response;
//                    console.log(_data);
//                    if(typeof _data=='undefined')return;
                        if(_data.is_login==0){ //未登录
                            is_login = 0;
                            $('.tab-login').show();
                            $('.tab-regist').show();
                            loginInside.show();
                           
//                            slideMessage('请先登录');
//                            $('body').find('iframe').remove();
        //                    fn && fn(data);
                            return; 
                        }else{  //已登陆
                            is_login = 1;
                            $('.create-select').show();
                            $('#tab-icon_myset').show();
                            $('#top_message').show();
                            $('#up_loadimg').show();
                            $('.tab-login').hide();
                            $('.tab-regist').hide();
        //                    fn && fn(data);

                        }
                    if(_data.is_photographer==1){  //摄影师
                        $('.tab-pc-change-select').show();
                    }
                    
                        $('.tab-icon-userhead').attr('src','http://image.paiwo.co/' + _data.user_avatar);
                        $('.tab-icon_myset p').html(_data.user_name);
                }
                
                fn && fn();
               
            });
            
//             fn && fn();
            
        };

        document.body.appendChild(iframe);
 
    
    },
    
    ajax:function(json){
//        console.log(json);
        $.ajax({
            url: '/rest',
            type: 'POST',
            dataType: 'json',
            async: false,
            data: {
                data:JSON.stringify(json.data)
            },

            success: function(data){
                json.success && json.success(data);
            },

            error: function(data){
                json.error && json.error(data);
            }

        });
    },
    
    crossAjax:function(str,fn){
        var str = JSON.stringify(str),
            sendName = ('message'+Math.random()).replace('.', '');
//        removeEventListener
        sendName = function (ev){
            var oEvent = ev || event;
            if(event.origin == 'http://'+domian){
//                  console.log(JSON.parse(ev.data));
                  var _data = JSON.parse(oEvent.data);
                  fn && fn (_data);
                  window.removeEventListener('message',sendName,false);
             } 
        };
        window.addEventListener("message", sendName, false);
        var mainFrame = document.getElementById('main_frame').contentWindow;
        mainFrame.postMessage(str, 'http://'+domian+'/rest');
    
    },
    
    hideScroll:function(){
        var scrollWidth = base.scrollbarwidth();
//        console.log(scrollWidth);
        $('html').css({'overflow-y':'hidden','padding-right':scrollWidth});
    },
    
    showScroll:function(){
        $('html').css({'overflow-y':'auto','padding-right':0});
    }
    
};


//内页登录框模块
var loginBox = $('.login_box') //登陆框
	loginClose = $('.look_look'), //登录关闭按钮
	loginModule = $('.login_module'),
	loginBg = $('.login_module .login_shadow'), //shadow
	scrollWidth = base.scrollbarwidth, //滚动条宽度
	_body = document.getElementsByTagName('body')[0],
	searchBox = $('.tab_searchbox'),   //搜索框按钮
	goTop = $('.go_top'),  //回到顶部按钮
	topBar = $('.top-tab'), //置顶栏
	searchTop = $('.search-sim .search-word'),  //搜索页滑动搜索框
	loginTop = $('.tab-login-a'), //顶部登录按钮
	showPic = $('.black_bac');

var loginInside = {

	reg : {
		email:/^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
		pwd:/^[0-9a-zA-Z\,\.]{6,15}$/
	},

	isOpen:false,
	
	goUrl:window.location.href,

	scrollWidth:base.scrollbarwidth(), //滚动条宽度

	show:function(){   //登陆框显示
		loginInside.isOpen = true;
		loginModule.css('display','block');
		loginBg.show();
		_body.style.overflow = 'hidden';
		_body.style.paddingRight =  loginInside.scrollWidth + 'px';
		topBar.css({'padding-right':loginInside.scrollWidth,'left':-loginInside.scrollWidth});
		searchBox.css('margin-left',loginInside.scrollWidth);
		goTop.hide();
        loginBox.css({'visibility':'visible'}).addClass('activeIn');
	},

	hide:function(){    //登陆框隐藏
		loginInside.isOpen = false;
		loginBox.removeClass('activeIn').addClass('activeOut');
		loginBg.hide();
		setTimeout(function(){
			loginBox.css({'visibility':'hidden'}).removeClass('activeOut');
            if(document.documentElement.scrollTop || document.body.scrollTop !=0){
                goTop.show();
            }
			
			if(showPic.css('display')=='none' || showPic.length==0){
				_body.style.overflow = 'auto';
				_body.style.paddingRight = '0px';
				searchBox.css('margin-left',0);
			}
			topBar.css({'padding-right':0,'left':0});
			loginModule.css('display','none');
		},500);
	},

	check_val:function(val,type){
		if(type == 'email'){
			return loginInside.reg.email.test(val);
		}else if(type = 'pwd'){
			return loginInside.reg.pwd.test(val);
		}else{
			return false;
		}
	},

	showError:function(target,content){  //错误提示
		var t = $(target);
		t.html(content).show();
		t.next().show();
	},

	check:function(fn){  //登录检测
        
        
//		var l_email = document.getElementById('login_email');     
//		var l_pwd   = document.getElementById('login_pwd');	
//		var email = l_email.value;
//		var pwd = l_pwd.value;
//
//		if(!email){
//			loginInside.showError('#login_error_email','请填写邮箱');
//			return;
//		}
//
//		if(!loginInside.check_val(email,'email')){
//			loginInside.showError('#login_error_email','邮箱格式错误');
//			return false;
//		}
//
//		if(!pwd){
//			loginInside.showError('#login_error_pwd','请填写密码');
//			return;
//		}
//
//		if(!loginInside.check_val(pwd,'pwd')){
//			loginInside.showError('#login_error_pwd','密码格式错误');
//			return false;
//		}
//
//		//console.log(email+'|'+pwd);
//		email = email.toLocaleLowerCase();
//		pwd = $.md5("paiwo_" + pwd);
//            
//        
//        
//        cloud.crossAjax({
//                url:'/rest',
//                data:{
//				     data: JSON.stringify({
//                        email: email,
//                        password: pwd,
//                        method: 'paiwo.account.login.email_login'})
//			   }
//        },function(data){
//            if(data.error_id == 0){
//                
//              console.log('login');  
//                
//                
//        cloud.crossAjax({
//                    url:'/rest',
//                    data:{
//                        data: JSON.stringify({
//                        method: 'paiwo.user.top.get'
//                    })
//                 }
//            },function(data){
//                    
//                   if(data.error_id == 0){
//                        var _data = data.response;
//                            top_info = _data;
//                        if(_data.is_login==0){ //未登录
//                            is_login = 0;
//                            $('.tab-login').show();
//                            $('.tab-regist').show();
//                            slideMessage('请先登录');
////                            fn && fn(data.result);
//                            return; 
//                        }else{  //已登陆
//                            is_login = 1;
//                            if(window.location.href.toLowerCase().indexOf('bind')==-1){
//                                window.location.reload();
//                            }else{
//                                $('#tab-icon_myset').show();
//                                $('#top_message').show();
//                                $('#up_loadimg').show();
//                                $('.tab-login').hide();
//                                $('.tab-regist').hide();
//                                loginInside.hide();
//                                
//                            }
//                            
//                            
//                        }
//                    
//                        $('.tab-icon-userhead').attr('src','http://image.paiwo.co/' + _data.user_avatar);
//                        $('.tab-icon_myset p').html(_data.user_name);
//                    
//                        //绑定界面
//                        $('.bottom-tab').find('.customer-tab-logined').html('<img src="http://image.paiwo.co/'+_data.user_avatar+'" />'+_data.user_name+'<a class="delete-project" id="change-account">更换帐号</a>').show();
//                        $('.customer-tab-unlogin').hide();
//                        $('.bottom-tab').find('.cus-band-btn').show();
//                    
//                        fn && fn(_data);
//                
//                    }
//
//            });
//                
//                
//                
//            }else if(data.error_id == 100007){
//                loginInside.showError('#login_error_email',data.error_code);
//                return false;                
//            }else{
//                loginInside.showError('#login_error_pwd',data.error_code);
//                return false;
//            }
//        });
//        
//		return false;
        
        
        /**********************************************/
        
        
        var email = $('#login_email').val().trim();
        var pwd = $('#login_pwd').val().trim();
        if(!email){
            loginInside.showError('#login_error_email','请填写账号');
            return;
        }
        if(!loginInside.check_val(email,'email')&& !/^1[0-9]{10}$/.test(email)){
            loginInside.showError('#login_error_email','账号格式错误');
            return false;
        }
        if(!pwd){
            loginInside.showError('#login_error_pwd','请填写密码');
            return;
        }
        if(!loginInside.check_val(pwd,'pwd')){
            loginInside.showError('#login_error_pwd','密码格式错误');
            return false;
        }

        email = email.toLocaleLowerCase();

        pwd = $.md5("paiwo_" + pwd);
        

        if(!/^1[0-9]{10}$/.test(email)){
            
            
        cloud.crossAjax({
                url:'/rest',
                data:{
				     data: JSON.stringify({
                        email: email,
                        password: pwd,
                        method: 'paiwo.account.login.email_login'})
			   }
        },function(data){
            if(data.error_id == 0){
                
              console.log('login');  
                
                
        cloud.crossAjax({
                    url:'/rest',
                    data:{
                        data: JSON.stringify({
                        method: 'paiwo.user.top.get'
                    })
                 }
            },function(data){
                    
                   if(data.error_id == 0){
                        var _data = data.response;
                            top_info = _data;
                        if(_data.is_login==0){ //未登录
                            is_login = 0;
                            $('.tab-login').show();
                            $('.tab-regist').show();
                            slideMessage('请先登录');
//                            fn && fn(data.result);
                            return; 
                        }else{  //已登陆
                            is_login = 1;
                            if(window.location.href.toLowerCase().indexOf('bind')==-1){
                                window.location.reload();
                            }else{
                                $('#tab-icon_myset').show();
                                $('#top_message').show();
                                $('#up_loadimg').show();
                                $('.tab-login').hide();
                                $('.tab-regist').hide();
                                loginInside.hide();
                                
                            }
                            
                            
                        }
                    
                        $('.tab-icon-userhead').attr('src','http://image.paiwo.co/' + _data.user_avatar);
                        $('.tab-icon_myset p').html(_data.user_name);
                    
                        //绑定界面
                        $('.bottom-tab').find('.customer-tab-logined').html('<img src="http://image.paiwo.co/'+_data.user_avatar+'" />'+_data.user_name+'<a class="delete-project" id="change-account">更换帐号</a>').show();
                        $('.customer-tab-unlogin').hide();
                        $('.bottom-tab').find('.cus-band-btn').show();
                    
                        fn && fn(_data);
                
                    }

            });
                
                
                
            }else if(data.error_id == 100007){
                loginInside.showError('#login_error_email',data.error_code);
                return false;                
            }else{
                loginInside.showError('#login_error_pwd',data.error_code);
                return false;
            }
        });


        }else{            //手机登录
            
            console.log('iniii');
            
            
            cloud.crossAjax({
                    url:'/rest',
                    data:{
                         data: JSON.stringify({
                            phone: email,
                            password: pwd,
                            method: 'paiwo.account.login.phone_login'})
                   }
            },function(data){
                if(data.error_id == 0){

    //              console.log('login');  


            cloud.crossAjax({
                        url:'/rest',
                        data:{
                            data: JSON.stringify({
                            method: 'paiwo.user.top.get'
                        })
                     }
                },function(data){

                       if(data.error_id == 0){
                            var _data = data.response;
                                top_info = _data;
                            if(_data.is_login==0){ //未登录
                                is_login = 0;
                                $('.tab-login').show();
                                $('.tab-regist').show();
                                slideMessage('请先登录');
    //                            fn && fn(data.result);
                                return; 
                            }else{  //已登陆
                                is_login = 1;
                                if(window.location.href.toLowerCase().indexOf('bind')==-1){
                                    window.location.reload();
                                }else{
                                    $('#tab-icon_myset').show();
                                    $('#top_message').show();
                                    $('#up_loadimg').show();
                                    $('.tab-login').hide();
                                    $('.tab-regist').hide();
                                    loginInside.hide();

                                }


                            }

                            $('.tab-icon-userhead').attr('src','http://image.paiwo.co/' + _data.user_avatar);
                            $('.tab-icon_myset p').html(_data.user_name);

                            //绑定界面
                            $('.bottom-tab').find('.customer-tab-logined').html('<img src="http://image.paiwo.co/'+_data.user_avatar+'" />'+_data.user_name+'<a class="delete-project" id="change-account">更换帐号</a>').show();
                            $('.customer-tab-unlogin').hide();
                            $('.bottom-tab').find('.cus-band-btn').show();

                            fn && fn(_data);

                        }

                });
                
                
                
            }else if(data.error_id == 100007){
                loginInside.showError('#login_error_email',data.error_code);
                return false;                
            }else{
                loginInside.showError('#login_error_pwd',data.error_code);
                return false;
            }
        });
            
            
            

//        cloud.crossAjax({
//             url: '/rest',
//             data:{
//                    data:JSON.stringify({
//                        phone: email,
//                        password: pwd,
//                        method: 'paiwo.account.login.phone_login'})
//                },
//            success: function(data){
//                
//                console.log(data);
//                
//                if(data.error_id == 0){
//                
//                    
//                    
//                console.log('phone');
//               
//                    
////                cloud.crossAjax({
////                        url:'/rest',
////                        data:{
////                            data: JSON.stringify({
////                            method: 'paiwo.user.top.get'
////                        })
////                     }
////                },function(data){
////
////                       if(data.error_id == 0){
////                            var _data = data.response;
////                                top_info = _data;
////                            if(_data.is_login==0){ //未登录
////                                is_login = 0;
////                                $('.tab-login').show();
////                                $('.tab-regist').show();
////                                slideMessage('请先登录');
////    //                            fn && fn(data.result);
////                                return; 
////                            }else{  //已登陆
////                                is_login = 1;
////                                if(window.location.href.toLowerCase().indexOf('bind')==-1){
////                                    window.location.reload();
////                                }else{
////                                    $('#tab-icon_myset').show();
////                                    $('#top_message').show();
////                                    $('#up_loadimg').show();
////                                    $('.tab-login').hide();
////                                    $('.tab-regist').hide();
////                                    loginInside.hide();
////
////                                }
////
////
////                            }
////
////                            $('.tab-icon-userhead').attr('src','http://image.paiwo.co/' + _data.user_avatar);
////                            $('.tab-icon_myset p').html(_data.user_name);
////
////                            //绑定界面
////                            $('.bottom-tab').find('.customer-tab-logined').html('<img src="http://image.paiwo.co/'+_data.user_avatar+'" />'+_data.user_name+'<a class="delete-project" id="change-account">更换帐号</a>').show();
////                            $('.customer-tab-unlogin').hide();
////                            $('.bottom-tab').find('.cus-band-btn').show();
////
////                            fn && fn(_data);
////
////                        }
////
////                });
//                    }else if(data.error_id == 100007){
//                        loginInside.showError('#login_error_email',data.error_code);
//                    }else{
//                        loginInside.showError('#login_error_pwd',data.error_code);
//                        return false;
//                    }
//                } 
//            });


        }

        return false;	
        
        
        
        
        
        
        
	}

};


(function(){
	
	//顶部登录
	loginTop.on('click',function(){
		loginInside.show();
	});
	
	//防照片墙底部误点 
	$(document).on('click','.photo_fixbox',function(){
		return false;
	});
	
	//关闭登录框
	loginClose.on('click',function(){
		loginInside.hide();
	});


	//点击登陆框shadow关闭
	loginBg.on('click',function(){
		loginInside.hide();
	});
	

//	//点击登录
//	$('#login_b').on('click',function(ev){
////		loginInside.check(loginInside.goUrl);
//        loginInside.check();
//		return false;
//	});


	//回车提交
	$('#login_box').on('keydown',function(ev){
		var keyCode = ev.keyCode;
		if(keyCode==13){
			loginInside.check(loginInside.goUrl);
		}
	});
	
})();

//点击登录
function clickLogin(){
    loginInside.check();
    return false;
}
$('#login_b').on('click',clickLogin);



//点击登录
$('.tab-login').on('click',function(){
    if(is_login==0){
        loginInside.show();
        return;
    }
});


//上部信息提示
var mes = $('.setting_succeed');
var setM= null;
function slideMessage(str){
  clearTimeout(setM);
	mes.html(str).animate({top: 0}, 400, function(){
    setM = setTimeout(hideMessage, 1800);
    
    });
}

function hideMessage(){
	mes.animate({top: '-40px'}, 400);
}


function showMessage(str){
    slideMessage(str);
}

//cloud.init();

  var tmp = null,
      tmpClass = null;
//摄影师顾客切换
$('.tab-pc-change-select').on('click',function(){
  	if(!$(this).find('i').hasClass('select-arrow-active')){
  	  $(this).find('i').addClass('select-arrow-active');
  	  $(this).find('dl').stop().slideDown();
      tmp = $(this).find('span').html();
      tmpClass = $(this).find('span').attr('class');
         
  	}else{
  	  $(this).find('i').removeClass('select-arrow-active');
  	  $(this).find('dl').stop().slideUp();
  	}
  });


$('.tab-pc-change-select').on('click','dl dd',function(){
    var $this = $(this),
        linkTo = $this.attr('class');
    if(linkTo=='cus'){
        window.location.href = '/c';
        console.log('cus');
    }else if(linkTo=='photog'){
        window.location.href = '/p';
        console('photog');
    }
  	$('.tab-pc-change-select').find('span').html($this.html());
    $('.tab-pc-change-select').find('span').attr('class',$this.attr('class'));
    $this.html(tmp).attr('class',tmpClass);
       
    
  	$(this).parent('dl').stop().slideUp();
});




//初始化
cloud.init(function(){
//   /static/js/cloud/paiwoMessage.js
      var oScript = document.createElement('script');
         oScript.src = '/static/js/cloud/paiwoMessage.js';
//          oScript.src ='/static/js/minjs/cloudMessage0731.js';
          document.body.appendChild(oScript);
   
});
    
    
//cloud.init();


//$('.tab-pc-change-select').on('click','',function(){
//    
//});



//回到顶部显示
window.addEventListener('scroll',function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollTop==0){
        $('#go_top').fadeOut();
    }else{
        $('#go_top').fadeIn();
    }
},false);


//点击回到顶部
$('#go_top').on('click',function(){
     $("html,body").stop().animate({scrollTop:0},200);
});



/******************************第三方登陆模块************************************************************/
var thirdLoginShadow = $('.third-login-shadow'),
    thirdLogin = $('#third-login-box'); 


//判断点击第三方登陆
loginModule.on('click','.login_third_login li a',function(){

    console.log('good');
    
//    $('.alert_body').css('z-index',122);
    thirdLogin.fadeIn();
    
//    if(pCloud.is_bind==1){
        thirdLoginShadow.fadeIn();
//    }
    
    
});

//第三方已登录
thirdLogin.on('click','.submit',Relogin);

function Relogin(){
    cloud.crossAjax({
                url:'/rest',
                data:{
                    data: JSON.stringify({
                    method: 'paiwo.user.top.get'
                })
             }
        },function(data){
              if(data.error_id == 0){
                window.location.reload();    
              }else{
                slideMessage('您还未登录');
              }
                 
        });    
}


thirdLogin.on('click','.cancel,.message_close',function(){
//    $('.alert_body').css('z-index',101);
    thirdLoginShadow.fadeOut();
});





















var navit = $('.navi_middle > a').not('.navi_button');
var timer = null;
var timerOut = null;
var flag = false;
var oBody = document.getElementsByTagName('body')[0];
var searchBtn = $('#tab_search'), //搜索按钮
	searchBg = $('.search-back'), //搜索shadow
	searchClose = $('.search-close'), //关闭按钮
	searchMain = $('.search-main'), //朱搜索框
	topBar = $('.top-tab'), //topBar
	goTop = $('#go_top'), //回到顶部
	searchBox = $('.tab_searchbox'),
    searchInputFocus = document.getElementsByClassName('search_input')[0];
	
var search = {  //搜索打开状态
	bOpen :false,
	scrollWidth: scrollbarwidth(),
	openStyle:function(){
		search.bOpen = true;
		searchBg.fadeIn(200);
		setTimeout(function(){
			searchMain.css({'visibility':'visible'}).addClass('activeIn');
            searchInputFocus.focus();
		},200);
        
		oBody.style.paddingRight = search.scrollWidth + 'px';
		topBar.css({'padding-right':search.scrollWidth,'left':-search.scrollWidth});
		searchBox.css('margin-left',search.scrollWidth);
		oBody.style.overflow = 'hidden';
		goTop.hide();
	},
	closeStyle:function(){
		search.bOpen = false;
		searchBg.fadeOut(200);
		searchMain.removeClass('activeIn').addClass('activeOut');
		setTimeout(function(){
			searchMain.css({'visibility':'hidden'}).removeClass('activeOut');
			oBody.style.paddingRight = '0px';
			oBody.style.overflowY = 'auto';
			topBar.css({'padding-right': 0,'left': 0});
			searchBox.css('margin-left', 0);
			goTop.show();
			$('.search-main .searchlabels').html('');
		},200);
		
	}
};

//tab小箭头翻转
$('.tab-icon_myset').on('mouseenter',function(){
  $(this).find('i').addClass('select-arrow-active');
});
$('.tab-icon_myset').on('mouseleave',function(){
  $(this).find('i').removeClass('select-arrow-active');
});

//侧边栏导航文字 
navit.on('mouseenter','div',function(){
  $(this).find('span').css({color: '#fff'});
});

navit.on('mouseleave','div',function(){
  $(this).find('span').css({color: '#b6b3ad'});
});

//导航hover效果
$('.navi_middle_index').on('mouseenter',function(){
  $(this).find('i').removeClass().addClass('middle_index_i_hover');
});
$('.navi_middle_index').on('mouseleave',function(){
  $(this).find('i').removeClass().addClass('middle_index_i');
});
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

$('.notice-close').on('click',function(){
	$(this).parent('.tab-notice-box').fadeOut();
});

////点击右上角的”我的主页“的时候,若不是摄影师，则在页面顶部提示请登录
//$('.select_browse').on('click',function(){
//    if(is_photographer == 0) {
//        showMessage('请先认证成为摄影师');
//        return false;
//    }
//});


var top_data;
var my_avatar  = 0;
var my_nickname = 0;
var is_login = 0;
var is_photographer = 0;//0:不是摄影师;1：是摄影师
  getmessage();



 function getmessage(){
    $.ajax({
            url: '/rest',
            type: 'POST',
            dataType: 'json',
            async: false,
            data: {
                data: JSON.stringify({
                    method: 'paiwo.user.top.get'})
            },
            success: messageresult
     });

 }



  function messageresult(data){
      if(data.error_id==0){
          top_data = data.response;
        // var bep = $('#tab-bephotog');
        // var ic = $('.tab-icon');
          
          is_login = data.response.is_login;
          
//		  alert(data.response.is_login);
          
        if(data.response.is_login == 0){
//            console.log('fsdf');
			$('.navi_head_unlogin').show();
           
            $('.top-tab-con>li').slice(3).show();
            $('.top-tab-con>li').slice(0,3).hide();
             $('.tab-login').show();
            return;
        }
          
		  $('.tab-regist').hide();
          $('.tab-login').hide();
		  $('.tab-icon').show();
          
        my_avatar =  data.response.user_avatar;
          
           $('.tab-icon1').first().hide();
        if(data.response.user_avatar!="" && data.response.user_avatar!=0){
            $('.navi_head_headed').attr('src','http://image.paiwo.co/'+data.response.user_avatar).show();
            $('.tab-icon-userhead').attr('src','http://image.paiwo.co/'+ data.response.user_avatar);
        }else{
            $('.navi_head_login').show();
            $('.tab-icon-userhead').attr('src','/static/images/user_head.gif');
        }
          
        $('#top_message').show();  
          
        $('#tab-icon_myset .avatar-link').attr('href','/'+top_data.user_domain);

        $('.user_name').text(filter(data.response.user_name));
        my_nickname = data.response.user_name;
        $('.tab-icon_myset>p').html(my_nickname);
         
        if(data.response.gift==0){
            $('#up_loadimg').hide();
            $('#tab-bephotog').show();
            $('.select_photog_infor').hide();
            is_photographer = 0;    //不是摄影师
        }else{
            is_photographer = 1;    //是摄影师
        }
        if(data.response.user_domain!=''){
            $('.select_browse').attr('href', "/" + data.response.user_domain);
            user_domain = data.response.user_domain;
        }
		//登录后点击头像进入个人主页
	    $('#nav').on('click','.navi_protrait',function(){
			$(this).attr('href', "/setting");
		});


      }else{
          
      }

  }



  //控制昵称长度的
  function filter(s){
    if(s.length<5){
      return s;
    }
    var str = '';
    var count=0;  
    for(var i = 0 ;i<s.length;i++){
        if(count>8)
            return str+'..';
        if(s.charCodeAt(i)>255){      
          count+=2;
        }else{
          count++;
        }
        str+=s[i];
    }
     return str;
    }



   //tab下拉菜单部分的js
//   $('#tab-icon_myset').on('mouseenter',function(ev){
//	   timer = setTimeout(function(){
//	   	  $('.tab_select_box').stop().animate({'opacity':1,'height':278},200,'linear');
//	   },100);
//	   ev.stopPropagation();
//   });
//
//   $('.select_login_out').on('mouseenter',function(){
//      $(this).find('i').removeClass().addClass('select_login_ihover');
//    });
//    $('.select_login_out').on('mouseleave',function(){
//      $(this).find('i').removeClass().addClass('select_login_i');
//    });
var timer1 = null,
    timer2 = null;

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




   $('#tab-icon_myset').on('mouseleave',function(ev){
	   clearTimeout(timer);
	   $('.tab_select_box').stop().animate({'opacity':0,'height':0},200,'linear');
	   ev.stopPropagation();
   });

   $('.push_button').on('click',function(ev){
		if(!flag){
			$('.navi-one,.navi-two,.navi-three').addClass('active');
			$('#nav').show();
			$('#main_box').addClass('active');
			$(this).addClass('active');
			$('.pointer_box').addClass('active');
			$('#shadow_box').css('visibility','visible');
			$('.top-tab').addClass('active');
			$('.back_color').addClass('active');
			$('#shadow_box').addClass('active');
			$('.stuido_header').addClass('active');
            $('.create-p').addClass('active');
            $('.check-new').addClass('active');
			$('.search-sim').hide();
            $('.yuepai_main_button').addClass('active');
		    oBody.style.overflowY = 'hidden';
		    oBody.style.overflowX = 'hidden';
			$('.go_top').hide();
			flag = true;
            $('#fixed-top-box').hide();
            $('.create-p-main').hide();
            $('.check-new-main').hide();
            $('.pocket-tip').hide();
            $('.check-new').addClass('active');
            $('.header-banner-pos').addClass('active');
            
		}else{
			$(this).find('li').removeClass('active');
			$('#main_box').removeClass('active');
			$(this).removeClass('active');
			$('.pointer_box').removeClass('active');
			$('#shadow_box').css('visibility','hidden');
			$('.top-tab').removeClass('active');
			$('.back_color').removeClass('active');
			$('#shadow_box').removeClass('active');
			$('.stuido_header').removeClass('active');	
            $('.create-p').removeClass('active');
            $('.check-new').removeClass('active');
            $('.yuepai_main_button').removeClass('active');
            $('.check-new').removeClass('active');
            $('.header-banner-pos').removeClass('active');
            
			
			oBody.style.overflowY = 'auto';
			$('.go_top').show();
			setTimeout(function(){
				$('#nav').hide();
//				$('.search-sim').removeClass('moveOut');
				$('.search-sim').css('display','block');
                $('#fixed-top-box').fadeIn(200);
                $('.pocket-tip').fadeIn(200);
			},500);
			flag = false;
		}
	   return false;
	});
	
	$('#shadow_box').on('click',function(ev){
		$('.navi-one,.navi-two,.navi-three').removeClass('active');
		$('#main_box').removeClass('active');
		$('.push_button').removeClass('active');
		$('.pointer_box').removeClass('active');
		$('#shadow_box').css('visibility','hidden');
		$('.top-tab').removeClass('active');
		$('.back_color').removeClass('active');
		$('#shadow_box').removeClass('active');
		$('.stuido_header').removeClass('active');
        $('.create-p').removeClass('active');
        $('.check-new').removeClass('active');
        $('.check-new').removeClass('active');
        $('.yuepai_main_button').removeClass('active');
        $('.header-banner-pos').removeClass('active');
//		$('.search-sim').removeClass('moveIn').addClass('moveOut');
		oBody.style.overflowY = 'scroll';
		setTimeout(function(){
			$('#nav').hide();
//			$('.search-sim').removeClass('moveOut');
			$('.search-sim').fadeIn(300);
            $('#fixed-top').fadeIn(200);
            $('.pocket-tip').fadeIn(200);
		},500);
		flag = false;
		ev.stopPropagation();
	});


//计算浏览器滚动条宽度
function scrollbarwidth() {
	var parent = $('<div style="width:50px;height:50px;overflow:auto"><div></div></div>').appendTo('body'),
		child = parent.children(),
		scrollbarwidth = child.innerWidth() - child.height(99).innerWidth();
	parent.remove();
	return scrollbarwidth;
}


//搜索按钮
searchBtn.on('click',function(){
	if(!search.bOpen){ //打开
		search.openStyle();
        searchInit();
	}else{  //关闭
		search.closeStyle();
	}
	return false;
});


//点击关闭
searchClose.on('click',function(){
	search.closeStyle();
    $('.search-main').find('.search_input').val('');
	$('.search-main .tab_search_ul').css('margin-left',0);
});


//点击shadow
searchBg.on('click',function(){
	search.closeStyle();
    $('.search-main').find('.search_input').val('');
	$('.search-main .tab_search_ul').css('margin-left',0);
});

searchMain.on('click',function(){
	search.closeStyle();
    $('.search-main').find('.search_input').val('');
	$('.search-main .tab_search_ul').css('margin-left',0);
});

searchMain.on('click','.search-box,.search-key',function(e){
	e.stopPropagation();
});

//通用搜索模块
function searchModule(obj){
	var searchBoxN = $(obj);
	//删除tag
	searchBoxN.on('click','.search_ul_remove',function(){
		$(this).parent().fadeOut(100,function(){
			$(this).remove();
			calcInputWidth(obj);
			ifNull();
		});
		
	});
	
	var myflag_tabel = 0;
    searchBoxN.on('keydown', '.search_input', function(ev){
            var keyCode = ev.keyCode;
            if(keyCode == 8){
                if(this.value.length!=0){
                    myflag_tabel = 1;
					
                }else{
                    myflag_tabel = 0;
                }
				calcInputWidth(obj);
            }
		
//			if(keyCode==32 || keyCode==188 || keyCode==186){
//				var str = this.value;
//				if(str.indexOf(' ') == '-1'){
//					return;
//				}
//				calcInputWidth(obj);
//			}
		
			//回车
            if(keyCode == 13){
				$(obj+' .search-mag').trigger('click');
            }
    		ev.stopPropagation();
    });

	searchBoxN.on('keyup','.search_input',function(ev){
		var keyCode = ev.keyCode;
		//空格 逗号 分号
		if(keyCode==32 || keyCode==188 || keyCode==186){
			var str = this.value;
			if(str.indexOf(' ') == '-1'){
				return;
			}
			calcInputWidth(obj);
			showtab(str.substr(0, str.length-1));
			this.value = "";
		}
		
		
		//后退
		if(keyCode == 8 && this.value.length == 0 && myflag_tabel == 0){
			deltab();
			calcInputWidth(obj);
		}
		ev.stopPropagation();
	});
	
	var oldColor = rndColor(1,11);
	//添加标签
    function showtab(content){
        var reg = /\s/;
        if(reg.test(content)||content.length == 0){
            return;
        }
		var newColor = rndColor(1,11),
			nowColor = 0;
		if(oldColor==newColor){
			var tmp = [];
			while(tmp.length==0){
				var newColor = rndColor(1,11);
				if(newColor!=oldColor){
					tmp.push(newColor);
				}
			}
			nowColor = oldColor = newColor = tmp[0];
		}else{
			nowColor = oldColor = newColor;
		}
        var tm = '<div class="search-color'+nowColor+'"><span class="search_data">'+content+'</span><span class="search_ul_remove"><i></i></span></div>'
        $(obj+' .searchlabels').append(tm);
		calcInputWidth(obj);
		ifNull();
    }
	
	//删除标签
    function deltab(){
        $(obj+' .searchlabels>div').last().remove();
        ifNull();
    }
	
	//随机颜色
	function rndColor(n,m){
		return parseInt(Math.random()*(m-n))+n;
	}
	
	//计算输入tags宽度
	function calcInputWidth(obj){
		var oInput = document.querySelector(obj+' .searchlabels'),
			inputWidth = oInput.scrollWidth,
			inputBox = $(obj+' .tab_search_ul');
		if(inputWidth>=750){
			inputBox.css('margin-left',-(inputWidth - 650));
		}else{
			inputBox.css('margin-left',0);
		}
	}
	
	var search_data ='';
	var searchInput = $(obj+' .search_input');
    //点击确认搜索
    function ifNull(){
    	if($('.searchlabels').children().length == 0){
    		$('.tab_search_ul input').attr('placeholder', '搜索你感兴趣的人、关键词或主题');
   			return;
   		}
    	$('.tab_search_ul input').attr('placeholder', '');
    }
   	searchInput.on('focus', function(){
   		ifNull();
    });
	
    searchInput.on('blur', function(){
		if(this.value == '' && $(obj+' .search_data').length==0){
			$(this).attr('placeholder', '搜索你感兴趣的人、关键词或主题');
		}
    });
    
    $(obj+' .search-mag').on('click', function(ev){
    	ifNull();
        if($(obj+' .search_data').length == 0){
          if(searchInput.val() == ''){
             window.location = '/search';
              return;
          }
            window.location = '/search?q='+searchInput.val();
            return;
        }
            $(obj+' .search_data').each(function(i,elem){
                if(i == 0 ){
                    search_data = elem.innerHTML;
                }else{
                    search_data +=',' + elem.innerHTML;
                }
            });
          
            if(searchInput.val() != ''){
                search_data += ',' + searchInput.val();
            }
			window.location = '/search?q='+search_data;
			ev.stopPropagation();
    });
	

	if(obj=='.search-main'){
		//点击热门词汇
		$('.search-key').on('click','.hot_tag',function(ev){
			var _val = $(this).html();
			var newColor = rndColor(1,11),
				nowColor = 0;
			if(oldColor==newColor){
				var tmp = [];
				while(tmp.length==0){
					var newColor = rndColor(1,11);
					if(newColor!=oldColor){
						tmp.push(newColor);
					}
				}
				nowColor = oldColor = newColor = tmp[0];
			}else{
				nowColor = oldColor = newColor;
			}
			var tm = '<div class="search-color'+nowColor+'"><span class="search_data">'+_val+'</span><span class="search_ul_remove"><i></i></span></div>';
			$('.search-main .search_input').attr('placeholder', '');
			$('.search-main .searchlabels').append(tm);
			calcInputWidth(obj);
			ev.stopPropagation();
			return false;
		});
	}
	
}


  function searchInit(){
      
        base.ajax({

                data:{
                    'method': 'paiwo.search.tag.get'
                },

                success:function(data){

                  if(data.error_id==0){
                    var tags = data.response.tags,
                        tmpl = '<dt>热门搜索：</dt>';
                    for(var i=0;i<tags.length;i++){
                        tmpl+= '<dd class="hot_tag">'+tags[i]+'</dd>';
                    }
                    $('.search-key dl').html(tmpl);
                  }


                },

                error:function(data){
                    slideMessage('网络错误');
                }

            });
    
    }
	
	
//搜索初始化
(function(){
    
//    paiwo.search.tag.get
    
	//获取热门搜索
//	function searchInit(){
//		$.ajax({
//		  url: '/a/search/hot_tag',
//		  type: 'POST',
//		  dataType: 'json',
//		  async: false,
//		  success:function(data){
//			  if(data.error_id==0){
//				var tags = data.result.hot_tag_list,
//					tmpl = '<dt>热门搜索：</dt>';
//				for(var i=0;i<tags.length;i++){
//					tmpl+= '<dd class="hot_tag">'+tags[i]+'</dd>';
//				}
//				$('.search-key dl').html(tmpl);
//			  }
//		  }
//		});  
//	}
    
  
	searchModule('.search-main');
})();



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
			goTop.show();
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

	check:function(url){  //登录检测
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
//		$.ajax({
//			url: '/rest',
//			type: 'POST',
//			dataType: 'json',
//            data: {
//                data: JSON.stringify({
//                    email: email,
//                    password: pwd,
//                    method: 'paiwo.account.login.email_login'})
//             },
//			success:function(data){
//				if(data.error_id == 0){
//                    loginInside.hide();
//                    getmessage();
//				}else if(data.error_id == 100007){
//					loginInside.showError('#login_error_email',data.error_code);
//				}else{
//					loginInside.showError('#login_error_pwd',data.error_code);
//					return false;
//				}
//			}  	   
//		});
//		return false;
        
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

        $.ajax({
             url: '/rest',
             type: 'POST',
             dataType: 'json',
             data:{
                    data:JSON.stringify({
                        email: email,
                        password: pwd,
                        method: 'paiwo.account.login.email_login'})
                },
            success: function(data){
                if(data.error_id == 0){
//                    window.location.href="/";
                    loginInside.hide();
                    getmessage();
                    
                   
                    
                }else if(data.error_id == 100007){
                    loginInside.showError('#login_error_email',data.error_code);
                }else{
                    loginInside.showError('#login_error_pwd',data.error_code);
                    return false;
                }
            } 
        });

        }else{
            //手机登录
            $.ajax({
             url: '/rest',
             type: 'POST',
             dataType: 'json',
             data:{
                    data:JSON.stringify({
                        phone: email,
                        password: pwd,
                        method: 'paiwo.account.login.phone_login'})
                },
            success: function(data){
                if(data.error_id == 0){
//                    window.location.href="/";
                    loginInside.hide();
                    getmessage();
                }else if(data.error_id == 100007){
                    loginInside.showError('#login_error_email',data.error_code);
                }else{
                    loginInside.showError('#login_error_pwd',data.error_code);
                    return false;
                }
            } 
        });


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
	

	//点击登录
	$('#login_b').on('click',function(ev){
        
		loginInside.check(loginInside.goUrl);
		return false;
	});


	//回车提交
	$('#login_box').on('keydown',function(ev){
		var keyCode = ev.keyCode;
		if(keyCode==13){
			loginInside.check(loginInside.goUrl);
		}
	});
	
})();


//创建按钮
var createMain = $('.create-p-main'),
    checkMain = $('.check-new-main'),
    checkBtn = $('.check-new-btn');

$('.create-p-btn').on('click',function(ev){
    ev.stopPropagation();
    if(is_login==0){
        loginInside.show();
        return;
    }
    
    if(top_data.gift==0){
        window.open('/pocket/add');
        return;
    }
    
    if(createMain.is(':hidden')){
        createMain.fadeIn(100);
        $('.create-p-first').fadeOut(100);
//        $('.create-p-btn').css('background','#2dd888');
    }else{
        createMain.fadeOut(100);
//        $('.create-p-btn').css('background','#e8e7e');
    }
});

$(document).on('click',function(){
    createMain.fadeOut(100);
});

//$('.create-p-btn').on('mouseenter',function(){
//    $(this).html('创建');
//});
//
//$('.create-p-btn').on('mouseleave',function(){
//    $(this).html('<i></i>');
//});


//feed新鲜事
$('.check-new-main').on('click','.check-new-close',function(){
    $('.check-new-main').hide();
});

$('.create-p-first').on('click','.check-new-close',function(){
    $('.create-p-first').hide();
});

//非登陆状态点击feed出现登录弹窗
checkBtn.on('click',function(){
    if(is_login==0){
        loginInside.show();
        return false;
    }
});



//侧边栏feed新信息
function getFeedNum(){
    
    base.ajax({
        
        async:true,

        data:{
            'method': 'paiwo.feed.feed_info.get'
        },

        success:function(data){
            
          if(data.error_id == 0){
            var response = data.response, 
                count =  response.unread_count;
                        
//              console.log(count);
              
                if(count!==0){ //有信息
//                    console.log('in'+count);
                    checkBtn.removeClass('check-new-none').addClass('check-new-have');
                    if(count<100){
                        $('.check-new-num').html('<i>'+count+'</i>');
                    }else{
                        $('.check-new-num').html('<i>99+</i>');
                    }
                   
                }else{  //无信息
                    checkBtn.removeClass('check-new-have').addClass('check-new-none');
                    $('.check-new-num').html('');
                }
              
              
              //首次显示
              if(response.is_first!=0){ 
                $('.check-new-main').show(); 
              }
              
          }

        },

        error:function(data){
            slideMessage('网络错误');
        }

    });
}
getFeedNum();
var side_check = setInterval(getFeedNum,500000);

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


//建议反馈
var feedMoudle = $('.feedback'),
    feedBg = $('.feedback-shadow'),
    feedBox = $('.feedback-main');
var feedback = {
    goUrl:window.location.href,
	scrollWidth:base.scrollbarwidth(), //滚动条宽度
    show:function(){   //登陆框显示
		feedMoudle.css('display','block');
		feedBg.show();
		_body.style.overflow = 'hidden';
		_body.style.paddingRight =  feedback.scrollWidth + 'px';
		topBar.css({'padding-right':feedback.scrollWidth,'left':-feedback.scrollWidth});
		searchBox.css('margin-left',feedback.scrollWidth);
		goTop.hide();
        feedBox.css({'visibility':'visible'}).addClass('activeIn');
	},

	hide:function(){    //登陆框隐藏
		feedBox.removeClass('activeIn').addClass('activeOut');
		feedBg.hide();
		setTimeout(function(){
			feedBox.css({'visibility':'hidden'}).removeClass('activeOut');
			goTop.show();
			if(showPic.css('display')=='none' || showPic.length==0){
				_body.style.overflow = 'auto';
				_body.style.paddingRight = '0px';
				searchBox.css('margin-left',0);
			}
			topBar.css({'padding-right':0,'left':0});
			feedMoudle.css('display','none');
		},500);
	}
}

//建议反馈
$('.feedback-btn').click(function(){
    feedback.show();
});
$('.feedback-close').click(function(){
    feedback.hide();
});

var reg_first = store.get('reg_first');
if(reg_first == 'true'){
    $('.create-p-first').fadeIn(300);
    $('.check-new-main').fadeIn(300);
    store.set('reg_first','false');
}

if(store.get('ph_first') == 'true'){
    $('.create-p-first').fadeIn(300);
    $('.check-new-tint').html('可以创建影集了');
    store.set('ph_first','false');
}
var phoneTest = $('#phone-test'), //验证手机号码
    customerUnlog = $('#customer_unlog'),  //已被绑定，未登录
    bottomTab = $('.bottom-tab'),  //底部信息
    selectPreview = $('#select-preview'), //预览信息
    bindSelectName = $('#bind-select-name'),
    cusBand = $('#cus-band-box'),
    thirdLogin = $('#third-login-box'); //第三方登陆
    
var customerBind = {
    
    
    init:function(){ //初始化
        var _data = pCloud;//初始化数据
        
        //发送选片夹摄影师信息
        phoneTest.find('.bind-user-img img').attr('src','http://image.paiwo.co/'+_data.photographer_avatar);
        phoneTest.find('.bind-user-img a').html(_data.photographer_name);
        phoneTest.find('.contact').attr('data-code',_data.photographer_id);
        
//        customerUnlog.find('.bind-user-img img').attr('src','http://image.paiwo.co/'+_data.photographer_avatar);
//        customerUnlog.find('.bind-user-img a').html(_data.photographer_nick_name);
        
        //验证是否登录
//        customerBind.isLogin();
        
        //是否被绑定
        customerBind.bandInfo = _data;
        
        var iframe = document.createElement("iframe");
        
       
        iframe.style.display = 'none';
        iframe.setAttribute('id','main_frame');
        
        iframe.onload = function(){
            
            
//        cloud.crossAjax({
//                    url:'/a/user/top/get',
//                    data:''
//            },function(data){
//                if(data.error_id == 0){
//                    var _data = data.result;
//                    if(_data.is_login==0){ //未登录
//                        $('.customer-tab-unlogin').show();
//                        bottomTab.find('.cus-band-btn').hide();
//                    }else{  //已登陆
//                        $('.customer-tab-unlogin').hide();
//                        bottomTab.find('.customer-tab-logined').html('<img src="http://image.paiwo.co/'+_data.avatar+'" /><i>'+_data.nick_name+'</i><a class="delete-project" id="change-account">更换帐号</a>');
//                        cusBand.find('.now-avatar').attr('src','http://image.paiwo.co/'+_data.avatar);
//                        cusBand.find('.now-nick').html(_data.nick_name);
////                        $('.tab-icon-userhead').attr('src','http://image.paiwo.co/' + _data.avatar);
////                        $('.tab-icon_myset p').html(_data.nick_name);
//                        
////                        cusBand.show();
//                        $('.customer-tab-logined').show();
//                        bottomTab.find('.cus-band-btn').show();
//                    }
//                }
//
//
//            });
            
            
            
            
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
                    if(_data.is_login==0){ //未登录
                        $('.customer-tab-unlogin').show();
                        bottomTab.find('.cus-band-btn').hide();
                    }else{  //已登陆
                        $('.customer-tab-unlogin').hide();
                        bottomTab.find('.customer-tab-logined').html('<img src="http://image.paiwo.co/'+_data.user_avatar+'" /><i>'+_data.user_name+'</i><a class="delete-project" id="change-account">更换帐号</a>');
                        cusBand.find('.now-avatar').attr('src','http://image.paiwo.co/'+_data.user_avatar);
                        cusBand.find('.now-nick').html(_data.user_name);
//                        $('.tab-icon-userhead').attr('src','http://image.paiwo.co/' + _data.avatar);
//                        $('.tab-icon_myset p').html(_data.nick_name);
                        
//                        cusBand.show();
                        $('.customer-tab-logined').show();
                        bottomTab.find('.cus-band-btn').show();
                    }
                }

            });
            
            
            
            
            
        };
        
        iframe.src = "http://paiwo.co/rest";

        document.body.appendChild(iframe);
        
    },
    
    getSelectCode:function(){
        var _url = window.location.href,
            _index = _url.lastIndexOf('?')+1;
          return _url.substring(_index).split('=')[1];
        
    },
    
    isLogin:function(){    
        
        
//        cloud.crossAjax({
//                    url:'/a/user/top/get',
//                    data:''
//            },function(data){
//                if(data.error_id == 0){
//                    var _data = data.result;
//                    if(_data.is_login==0){ //未登录
//                        $('.customer-tab-unlogin').show();
//                        bottomTab.find('.cus-band-btn').hide();
//                    }else{  //已登陆
//                         $('.customer-tab-unlogin').hide();
//                        bottomTab.find('.customer-tab-logined').html('<img src="http://image.paiwo.co/'+_data.avatar+'" /><i>'+_data.nick_name+'</i><a class="delete-project" id="change-account">更换帐号</a>');
//                        cusBand.find('.now-avatar').attr('src','http://image.paiwo.co/'+_data.avatar);
//                        cusBand.find('.now-nick').html(_data.nick_name);
//                        $('.tab-icon-userhead').attr('src','http://image.paiwo.co/' + _data.avatar);
//                        $('.tab-icon_myset p').html(_data.nick_name);
//                        
////                        cusBand.show();
//                        $('.customer-tab-logined').show();
//                        bottomTab.find('.cus-band-btn').show();
//                    }
//                }
//
//
//            });
        
        
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
                    if(_data.is_login==0){ //未登录
                        $('.customer-tab-unlogin').show();
                        bottomTab.find('.cus-band-btn').hide();
                    }else{  //已登陆
                         $('.customer-tab-unlogin').hide();
                        bottomTab.find('.customer-tab-logined').html('<img src="http://image.paiwo.co/'+_data.user_avatar+'" /><i>'+_data.user_name+'</i><a class="delete-project" id="change-account">更换帐号</a>');
                        cusBand.find('.now-avatar').attr('src','http://image.paiwo.co/'+_data.user_avatar);
                        cusBand.find('.now-nick').html(_data.user_name);
                        $('.tab-icon-userhead').attr('src','http://image.paiwo.co/' + _data.user_avatar);
                        $('.tab-icon_myset p').html(_data.user_name);
                        
//                        cusBand.show();
                        $('.customer-tab-logined').show();
                        bottomTab.find('.cus-band-btn').show();
                    }
                }
                
              
               
        });
            
        
        
        
        
    }
    
    
};

console.log(pCloud);


customerBind.init();

//手机号码验证
phoneTest.on('click','.submit',function(){
    var _value = phoneTest.find('.phone-num').val(),
        _code = customerBind.getSelectCode(),
        _phone = _value.split('-').join('');

    if(_value==''){
        slideMessage('请填写手机号码');
        return;
    }
    
    if(!/^1\d{10}$/.test(_phone)){
        slideMessage('手机号码格式不正确');
        return;
    }
    
    
//    console.log(_phone + ' | ' +_code);
    
     cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.customer.select.bind_get',
                    'bind_code': _code,
                    'phone': _phone
                },

                success:function(data){
                    console.log(data.response);
                    if(data.error_id==0){  
                        var _data = data.response,
                            photoList = _data.photo_list,
                            tm ='';
                        
                        customerBind.phone = _phone;
                        customerBind.code = _code;
                        
                        phoneTest.find('.error').hide();
                        phoneTest.hide();
//                        thirdLoginShadow.hide();
                        
                        if(customerBind.bandInfo.is_bind==0){  //未被绑定
                            
                            bottomTab.fadeIn(400);
                            selectPreview.fadeIn(400);
                            $('.alert_body').fadeIn();
                            cloud.init();
                        
                            selectPreview.find('.avatar').attr('src','http://image.paiwo.co/'+_data.photographer_avatar);
                            selectPreview.find('.pg-nick-name').html(_data.photographer_name);
//                            selectPreview.find('.count').html('等共计'+_data.photo_count+'张照片');
                            selectPreview.find('.select-info').html(_data.select_name+'<span>'+_data.photo_count+'张照片</span>');
                        
                            for(var i=0;i<photoList.length;i++){
                                tm += '<img src="http://image.paiwo.co/'+photoList[i]+base.retinaPixel['280']+'">';
                            }
                        
                            $('.customerRecive-imgbox').html(tm);
                            
                        }else if(customerBind.bandInfo.is_bind==1){  //已被绑定
                            phoneTest.hide();
                            console.log(is_login);
                            if(is_login==0){
                                customerUnlog.find('.cus-avatar').attr('src','http://image.paiwo.co/'+_data.customer_avatar);
                                customerUnlog.find('.cus-nick').html(_data.customer_nick_name);
                                customerUnlog.fadeIn();
                            }else if(is_login==1){
                                cusBand.find('.cus-avatar').attr('src','http://image.paiwo.co/'+_data.customer_avatar);
                                cusBand.find('.cus-nick').html(_data.customer_nick_name);
                                cusBand.fadeIn();
                            }
                            
                            
                        }
                        
                        
                    }else if(data.error_id==210003){  //验证码不正确
                        phoneTest.find('.error').show();
                    }else if(data.error_id==210004){  //该选片夹也被绑定
//                        slideMessage('网络错误');
                        slideMessage('选片夹已被绑定');
                    }

                },

                error:function(data){
                    console.log(data);
                    slideMessage('网络错误');
                }

        });
});


//手机格式
$('.phone-num').on('keyup',function(ev){
     var _val = $(this).val().trim(),
        strLen = _val.length,
        str = '';
    
    if(ev.keyCode==8)return;
    
    if(strLen==4){
        str = _val.substring(0,3)+'-'+_val[3];  
        $(this).val(str);
    }else if(strLen==9){
        str = _val.substring(0,8)+'-'+_val[8];
        $(this).val(str);
    }
    
});

//未登录登陆
customerUnlog.on('click','.submit',function(){
    loginInside.show();
});


//更换账号
bottomTab.on('click','#change-account',function(){
    loginInside.show();
});

//登录
bottomTab.on('click','.login',function(){
    loginInside.show();
});

//添加并打开
bottomTab.on('click','.establish',function(){
//    loginInside.show();
//    $('.alert_body').fadeIn();
//    $('#bind-select-name').fadeIn();

//    var _val = $('#bind-select-name .name').val().trim();
//    if(_val==''){
//        _val = '未命名选片夹';
//    }
//    console.log(customerBind.code+' | '+customerBind.phone+' | '+_val);
    
     cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.customer.select.bind',
                    'bind_code': customerBind.code,
                    'phone':  customerBind.phone
                },

                success:function(data){
                    console.log(data.response);
                    if(data.error_id==0){  
                        var _data = data.response;
                        window.location.href = '/c/selects/'+_data.select_id;
                        
                    }else if(data.error_id==210002){  //选片夹已被绑定
//                        slideMessage('选片夹已被绑定');
                        
                        
            cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.customer.select.bind_get',
                    'bind_code': customerBind.code,
                    'phone': customerBind.phone
                },

                success:function(data){
                    console.log(data.response);
                    if(data.error_id==0){  
                        var _data = data.response,
                            photoList = _data.photo_list,
                            tm ='';
                            selectPreview.hide();
                            $('.alert_body').hide();
                            bottomTab.hide();
                            cusBand.find('.cus-avatar').attr('src','http://image.paiwo.co/'+_data.customer_avatar);
                            cusBand.find('.cus-nick').html(_data.customer_nick_name);
                            customerBind.isLogin();
                            cusBand.fadeIn();
                    
                    }

                },

                error:function(data){
                    slideMessage('网络错误');
                }

        });   

                        
                    }else if(data.error_id==210008){
                       slideMessage(data.error_code);
                    }else{
                       slideMessage('网络错误'); 
                    }

                },

                error:function(data){
                    console.log(data);
                    slideMessage('网络错误');
                }

        });
});


//关闭取名弹窗
//bindSelectName.on('click','.message_close',function(){
//    console.log('555');
//    bindSelectName.fadeOut();
//    $('.alert_body').fadeOut();
//});




//$('#login_b').off('click',clickLogin);

$('#login_b').off('click',clickLogin);

//切换账号
cusBand.on('click','.submit',function(){
    loginInside.show();
});


//点击登录
$('#login_b').on('click',function(ev){
    console.log('in-in');
    
    loginInside.check(function(data){
//        console.log(data);
        console.log(!cusBand.is(":hidden"));
        console.log(!customerUnlog.is(":hidden"));
        
        console.log(cusBand.css('display'));
        console.log(customerUnlog.css('display'));
        
       if(!customerUnlog.is(":hidden")){  //已绑定,未登录
          console.log('out');
          customerUnlog.hide();
          cusBand.find('.now-avatar').attr('src','http://image.paiwo.co/'+data.user_avatar);
          cusBand.find('.now-nick').html(data.user_name);
          cusBand.find('.cus-avatar').attr('src','http://image.paiwo.co/'+pCloud.customer_avatar);
          cusBand.find('.cus-nick').html(pCloud.customer_name);
          cusBand.fadeIn(); 
           
       }else if(!cusBand.is(":hidden")){  //已绑定,已登录
           console.log('in');
           console.log(data.nick_name+' | '+pCloud.customer_name);
           
         
       }
        
      if(data.user_name==pCloud.customer_name){  //登陆是绑定本人
               
               console.log(is_login);
               
           if(is_login==0){  //未登录

           }else if(is_login==1){  //已登录
               window.location.reload();
           }
            
        }else{   //登陆不是绑定本人
                console.log('not');
                cusBand.find('.now-avatar').attr('src','http://image.paiwo.co/'+data.user_avatar);
                cusBand.find('.now-nick').html(data.user_name);
        }
        
    });
    return false;
});



//私信
//$('.message-link').on('click',function(){
//    if(is_login == 0){
//        loginInside.show();
//    }else{
//        $('#top_message').trigger('click');
//        PWS.addTalk(pCloud.photographer_id);
//    }
//});



//判断点击第三方登陆
//loginModule.on('click','.login_third_login li a',function(){
//
//    console.log('good');
//    
////    $('.alert_body').css('z-index',122);
//    thirdLogin.fadeIn();
//    
////    if(pCloud.is_bind==1){
//        thirdLoginShadow.fadeIn();
////    }
//    
//    
//});


thirdLogin.off('click','.submit',Relogin);

//第三方已登录
thirdLogin.on('click','.submit',function(){
    
    console.log('in');
    
//    $('.alert_body').fadeOut();
//    thirdLoginShadow.fadeOut();
    
//    if(pCloud.is_bind==0){  //未绑定
//        $('.alert_body').css('z-index',101);
        
//        customerBind.init();
       
//    }else if(pCloud.is_bind==1){  //已绑定
        
        
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
                    if(_data.is_login==0){ //未登录
                        $('.customer-tab-unlogin').show();
                        bottomTab.find('.cus-band-btn').hide();
                       
                    }else{  //已登陆
                        
                        if(_data.user_name==pCloud.customer_nick_name && _data.user_name!=''){
                             window.location.reload();
                        }
                        
                        thirdLogin.fadeOut();
                        thirdLoginShadow.hide();
                        
                        if(pCloud.is_bind==1){  //已绑定
                            cusBand.find('.cus-avatar').attr('src','http://image.paiwo.co/'+pCloud.customer_avatar);
                            cusBand.find('.cus-nick').html(pCloud.customer_nick_name);
                            cusBand.find('.now-avatar').attr('src','http://image.paiwo.co/'+_data.user_avatar);
                            cusBand.find('.now-nick').html(_data.user_name); 
                            cusBand.show();
                        }else if(pCloud.is_bind==0){
                            customerUnlog.hide();
                            $('.customer-tab-unlogin').hide();
                            bottomTab.find('.customer-tab-logined').html('<img src="http://image.paiwo.co/'+_data.user_avatar+'" /><i>'+_data.user_name+'</i><a class="delete-project" id="change-account">更换帐号</a>');
                            bottomTab.find('.cus-band-btn').show();
                        }
                        
                        
                        //top栏
                        $('.tab-icon-userhead').attr('src','http://image.paiwo.co/' + _data.user_avatar);
                        $('.tab-icon_myset p').html(_data.user_name);
                        $('.customer-tab-logined').show();
                        $('#tab-icon_myset').show();
                        $('#top_message').show();
                        $('#up_loadimg').show();
                        $('.tab-login').hide();
                        $('.tab-regist').hide();
                        
                    }                    
                    
            }
                
              
               
        });    
        
//    }
     
   thirdLogin.fadeOut();
   loginInside.hide();
    
});





//PWS.addTalk(post_data.userid);
//$('#top_message').trigger('click');


//私信
$('.message-link').on('click',function(){
    
//    console.log(pCloud.photographer_id);
    
    $('#top_message').trigger('click');
    PWS.addTalk(pCloud.photographer_id);
    
});


//联系客服
$('.contact-service').on('click',function(){
    var code = $(this).attr('data-code');
    $('#top_message').trigger('click');
    PWS.addTalk(code);
;});








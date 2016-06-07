// <!--立即参与报名-->
//   <div class="setting_alert_shadow active_now">


//  <!--抱歉，您来晚了-->
//    <div class="setting_alert_shadow active_late">


//  <!--报名成功-->
//    <div class="setting_alert_shadow active_success">



// <!--还差一步，报名成功-->
//    <div class="setting_alert_shadow active_soon">


//activity_state 
//	0: 未开始
//	1: 进行中
//	2: 满
//	3: 过期
//
//next_state
//	0: 不通知
//	1: 通知
//
//apply_state
//	0: 未参加
//	1: 参加未付款
//	2: 参加已付款 

var alertBox = $('.setting_alert_shadow'), //弹窗
    activeNow = $('.active_now'),  //填写报名信息
    activeSoon = $('.active_soon'), //支付
    activeSuccess = $('.active_success'), //报名成功
    activeLate = $('.active_late'); //来晚了
var groupShot = {};


//用户状态
groupShot.getState = function(type,fn){
    
    var type = type?type:1;
    
    $.ajax({
        url: '/rest',
        type: 'POST',
        dataType: 'json',
        async: false,
        data: {
            data:JSON.stringify({
                'method': 'paiwo.activity.group_shot.get'
            })
         },
         success:function(data){
            if (data.error_id==0) {
//                slideMessage('报名成功');
                var response = data.response,
                    state = response.activity_state,
                    apply = response.apply_state,
                    next = response.next_state;
                
                //test
                
//                if(type==1){
//                    next = 0;
//                    apply = 2;
//                    state = 1;
//                }else{
//                    next = 1;
//                    apply = 2;
//                    state = 1;
//                }
//                
                
                
                
                if(state==0){  //活动未开始
                    slideMessage('活动未开始');
                }else if(state==2 || state==3){  //活动爆满或者已过期
                    activeLate.fadeIn();
                }else if(state==1 && apply==1){  //报名未付款
                    activeSoon.fadeIn();
                }else if(state==1 && apply==2){  //报名已付款,报名成功
                    
                    if(next==1){ //下次通知
                        activeSuccess.find('.put-name').html(response.real_name);
                        activeSuccess.find('.put-phone').html(response.phone);
                        activeSuccess.find('h3').css('margin-top','0');
                        activeSuccess.find('.alert_buttons_save').css('margin','60px auto 0');
                        activeSuccess.find('.setting_alert_mes').show();
                        activeSuccess.find('.alert_input_sign').show();
                    }else if(next==0){ //不通知
                        activeSuccess.find('h3').css('margin-top','30px');
                        activeSuccess.find('.alert_buttons_save').css('margin','140px auto 0');
                        activeSuccess.find('.setting_alert_mes').hide();
                        activeSuccess.find('.alert_input_sign').hide();
                    }
                   
                    activeSuccess.fadeIn();
                    
                    
                }else if(state==1 && apply==0){  //活动进行中,未报名
                    
                    if(type==1){ //单纯获取状态
                        activeNow.fadeIn();
                    }else if(type==2){  //提交表单状态
//                        console.log('success');
                        return fn();
                    }
                    
                }
                
                
                
        
            }else{
                slideMessage('网络错误');
            }
         },
         error:function(data){
            slideMessage('网络错误');
         }
    });
    
};

groupShot.submitInfo = function(name,phone,state){
    
    console.log(name,phone,state);
    
        $.ajax({
            url: '/rest',
            type: 'POST',
            dataType: 'json',
            async: false,
            data: {
                data:JSON.stringify({
                    'method': 'paiwo.activity.group_shot.apply',
                    'real_name': name,
                    'phone': phone,
                    'next_state': state
                })
             },
             success:function(data){
                if (data.error_id==0) {
    //                slideMessage('报名成功');
                    activeNow.fadeOut();
                    activeSoon.fadeIn();
                }else{
                    slideMessage('网络错误');
                }
             },
             error:function(data){
                slideMessage('网络错误');
             }
        });
};


groupShot.nameLenTest = function(data){
    var count = 0;
    var reg = /[A-Za-z0-9]/;
    var reg2 = /[\u4e00-\u9fa5]/;
        for(var i =0; i<data.length; i++){
            if(reg2.test(data[i])){
                count+=2;   
            }else if(reg.test(data[i])){
                count+=1;
            }else{
                return false;
            }
        }

        return count;

};

groupShot.nameTest = function(val,_this){
    
    console.log('in '+val,_this);
    
    if(val==''){
        _this.find('.name-error-icon').show();
        _this.find('.name-error-wd').html('请填写姓名').show();
        return false;
    }else if(!groupShot.nameLenTest(val)){
        _this.find('.name-error-icon').show();
        _this.find('.name-error-wd').html('含有非法字符').show();
        return false;
    }else if(groupShot.nameLenTest(val)!=0 && groupShot.nameLenTest(val)>20){
        _this.find('.name-error-icon').show();
        _this.find('.name-error-wd').html('姓名长度过长').show();
        return false;
    }else{
        _this.find('.name-error-icon').hide();
        _this.find('.name-error-wd').hide();
        return true;
    }

};

groupShot.phoneTest = function(val,_this){
    
//    console.log('in '+val);
    
    if(val==''){
        _this.find('.phone-error-icon').show();
        _this.find('.phone-error-wd').html('请填写联系方式').show();
        return false;
    }else if(!/^1\d{10}$/.test(val)){
        _this.find('.phone-error-icon').show();
        _this.find('.phone-error-wd').html('手机格式错误').show();
        return false;
    }else{
        _this.find('.phone-error-icon').hide();
        _this.find('.phone-error-wd').hide();
        return true;
    }
};

//init
// groupShot.getState();



//报名点击
$('.group-shot-btn').on('click',function(){
    if(is_login==0){
        loginInside.show();
        return;
    }
    groupShot.getState();
});

//groupShot.submitInfo('abc','13905711234',1);


activeLate.on('blur','.name-input',function(){
    var val = this.value,
        $this = $(this).parents('.setting_alert_shadow');
        console.log(val,$this);
    groupShot.nameTest(val,$this);
    
});

activeLate.on('blur','.phone-input',function(){
    var val = this.value,
        $this = $(this).parents('.setting_alert_shadow');
    console.log(val,$this);
    groupShot.phoneTest(val,$this);
});



activeNow.on('click','.checkbox',function(){
    if(groupShot.replyAgain){
//        console.log('no-ok');
        activeNow.find('.right-icon').hide();
        groupShot.replyAgain = false;
    }else{
//        console.log('ok');
        activeNow.find('.right-icon').show();
        groupShot.replyAgain = true;
    }
});

//活动报名,提交表申请
activeNow.on('click','.alert_buttons_save',function(){
    
    var name = activeNow.find('.name-input').val().trim(),
        phone = activeNow.find('.phone-input').val().trim(),
        state = groupShot.replyAgain?1:0,
        $this = $(this).parents('.setting_alert_shadow'); 
    
        console.log('state '+state);
    
        if(groupShot.nameTest(name,$this) && groupShot.phoneTest(phone,$this)){
            
            activeNow.hide();
            
            groupShot.getState(2,function(){    
//                console.log('success');
                groupShot.submitInfo(name,phone,state);
            });
            
        }
            
    
});


//关闭成功页面
activeSuccess.on('click','.alert_buttons_save',function(){
    activeSuccess.fadeOut();
});


//抱歉页面,联系方式提交
activeLate.on('click','.alert_buttons_save',function(){
//    activeLate.fadeOut();
    var name = activeLate.find('.name-input').val().trim(),
        phone = activeLate.find('.phone-input').val().trim(),
        state = 1,
        $this = $(this).parents('.setting_alert_shadow'); 
    
        console.log('state '+state);
    
        if(groupShot.nameTest(name,$this) && groupShot.phoneTest(phone,$this)){
            
            activeLate.hide();
            
//            groupShot.getState(2,function(){    
//                console.log('success');
                 $.ajax({
                    url: '/rest',
                    type: 'POST',
                    dataType: 'json',
                    async: false,
                    data: {
                        data:JSON.stringify({
                            'method': 'paiwo.activity.group_shot.apply',
                            'real_name': name,
                            'phone': phone,
                            'next_state': state
                        })
                     },
                     success:function(data){
                        if (data.error_id==0) {
            //                slideMessage('报名成功');
//                            activeNow.fadeOut();
//                            activeSoon.fadeIn();
                            activeLate.find('.name-input').val('');
                            activeLate.find('.phone-input').val('');
                            activeLate.fadeOut();
                        }else{
                            slideMessage('网络错误');
                        }
                     },
                     error:function(data){
                        slideMessage('网络错误');
                     }
                });
//            });
            
        }
});




//关闭弹窗
alertBox.on('click','.setting_alert_close',function(ev){
    alertBox.find('.alert_repwd_inputs_i').hide();
    alertBox.find('.alert_repwd_inputs_error').hide();
    alertBox.find('input').val('');
    $(this).parents('.setting_alert_shadow').fadeOut(200);
});
























store.remove('campus_login');
var campusAlert = $('.campus-module');

//浏览器检测
var browser={
    versions:function(){
           var u = navigator.userAgent, app = navigator.appVersion;
           return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
         }(),
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
}


//关闭窗口初始化
// window.onbeforeunload = function(){
//    store.remove('campus_login'); 
//}

//init
//(function(){
    var active_state = store.get('activity_upload');
    if(active_state){
        $('.success_ok').show();
    }
    
    store.remove('activity_upload');
    
//})();



 
//上传按钮
$('.btn-join').on('click',function(){
    
    
    //是否登录
    if(is_login==0){
        loginInside.show();
        store.set('campus_login',1);
        return;
    }
    
    //是否是摄影师
    if(is_photographer==0){
        
        console.log('in');
        
        store.set('campus_contest',1);
        window.location.href = '/bephotog';
        return;
    }
   
    //test
//    store.set('campus_contest',1);
//    window.location.href = '/bephotog';
    
    //判断是否是移动端
    console.log('mobile - '+browser.versions.mobile);
    
    if(browser.versions.ios || browser.versions.android || browser.versions.iPad){  //mobile
       campusAlert.fadeIn();
    }else{  //PC
        store.set('activity_tag','campus');
        window.location.href="/album/new";
    }
    
    
});



//注册按钮注入
$('.tab-regist-a,.tab-login').on('click',function(){
    
    store.set('campus_login',1);
    
});


/*
    手机点击弹窗
*/

//关闭
campusAlert.on('click','.campus-topc-close',function(){
    campusAlert.fadeOut();
});


//用手机上传按钮
campusAlert.on('click','.campus-byphone',function(){
    store.set('activity_tag','campus');
    window.location.href="/album/new";
});


//回到活动页
campusAlert.on('click','.campus-back',function(){
    campusAlert.fadeOut();
});



//上传成功知道按钮
$('.success_ok').on('click','.succeed-button',function(){
    $('.success_ok').fadeOut();
});










var mes = $('.setting_succeed'), //顶部提示
    cOut = $('#favorite_out'),  
    cIn = $('#favorite_in'),
    alert_body = $('#alert_shadow'),
    user = null,  //存储用户信息
    cInP = $('#favorite_in_photos');

var main = $('.person-center');
var temp = $('.person-tab>li');
    
var head_coll = $('#h_co'),
    head_like = $('#h_li'),
    head_set = $('.person-setting'),
    order_start = $('.order-start'),
    order_receive = $('.order-receive'),
    head_c = temp.eq(0);

var p_set = $('.my-setting'),
    p_like = $('#my_likes_ding'),
    p_ao = $('#favorite_wrap'),
    p_ai = $('#favorite_in'),
    p_order = $('.my-start-order'),
    p_receive = $('.my-receive-order');
var setting = $('.my-setting');

var collo_s = 1,
    colli_s = 0,
    b_s = 1,
    c_s = 0;

var favorite_data = {};

var favorite_id = null; //收藏夹内页id
var favorite_photo = null;

var batch = {status: 0,data: []}

var pCount= {a: 0, b: 0, c: 0, d: 0}; //记录页面总数

var page_no = {a: 1, b: 1, c: 1, d:1}; //记录页面的当前页

var user = null;   //存储用户信息
var user_g = null; //存储摄影师信息
var area_list = [];

$(function(){
    var alert_b = $('#alert_shadow');
    page_no.a = 1;
    getCollectList(page_no.a);
    main.on('click', '#h_co', function(){
         store.set('center','2'); 
        //点击收藏
            if(this.className =='person-tab-cur'){
                if(colli_s == 1){
                    $('.inner-title-return').trigger('click');
                }
                return;
            }      
            showPartColl();       
    });

    init();
    inituser();
      
//    pocket-part

    main.on('click','.aut-ul-left li',function(){
        var code = $(this).attr('data-code');
        window.location.href = '/market/'+code;
    });
    
    //跳转pocket详情
    main.on('click','.pocket-part',function(){
        if(batch.status == 0){
            var code = $(this).attr('data');
            window.location.href = '/pocket/'+code;
        }

    });
    
//    登陆设置
    main.on('click','.setting-bind-btn',function(){
        $(this).parents('li').addClass('login-showli').siblings().removeClass('login-showli');
        $('.setting-part-shadow').show();
    });

    main.on('click','.setting-part-cancel',function(){
        $(this).parents('li').removeClass('login-showli');
        $('.setting-part-shadow').hide();
    });
    
    //点击修改密码
    $('#change_btn').on('click', function(){
        alert_body.show();
        $('#change_box').show();
    });
       
    $('#confirm_change').on('click',function(){
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
			savaPwd(n1, n2, n3);
		}
    });

    page_no.c = 1;
    getLikeList(page_no.c);

    main.on('click', '#h_li', function(){
        store.set('center','1'); 
        //点击喜欢
            if(this.className =='person-tab-cur'){
                return;
            }
            showPartLike();            
    });

    main.on('click', '.person-setting', function(){
        store.set('center','4');
        //点击设置
            if(this.className =='person-tab-cur'){
                return;
            }
            showPartSet();            
    });

    main.on('click','.order-start',function(){
        store.set('center','3');
        //发起订单
        if(this.className == 'person-tab-cur'){
            return;
        }
        showPartOrder();
    });

    main.on('click','.order-receive',function(){        
        //接受的订单
        if(this.className == 'person-tab-cur'){
            return;
        }
        showPartRece();
    });

    main.on('click', '.list_fa', function(){
            var id = this.getAttribute('data');
            favorite_id = id;
            collo_s = 0;
            colli_s = 1;
            page_no.b = 1;
        
            getCollectIn(id, page_no.b);
            document.documentElement.scrollTop =  document.body.scrollTop = 0;
    });
    main.on('mouseenter', '.list_fa', function(){
        $(this).find('.person-coll-edit').show();
    
    });
    
    main.on('mouseleave', '.list_fa', function(){
      $(this).find('.person-coll-edit').hide();
    });

    //返回
    main.on('click', '.inner-title-return', function(){
        colli_s = 0;
        collo_s = 1;
        page_no.a = 1;
        getCollectList(page_no.a); 
        showPartColl(); 
        $('.choose_button_complete').trigger('click');   
    });
    
    main.on('mouseenter', '.in_li', function(){
        $(this).find('.photo_fixbox').animate({'bottom':'0'}, 100, 'linear');
    
    });
    main.on('mouseleave', '.in_li', function(){
        $(this).find('.photo_fixbox').animate({'bottom':'-36px'}, 100, 'linear');
    
    });
    
    main.on('mouseenter', '.in_fa', function(){
        $(this).find('.photo_fixbox').animate({'bottom':'0'}, 100, 'linear');
        $(this).find('.in_fa_paga').animate({'bottom':'36px'}, 100, 'linear');
    
    });
    main.on('mouseleave', '.in_fa', function(){
        $(this).find('.photo_fixbox').animate({'bottom':'-36px'}, 100, 'linear');
        $(this).find('.in_fa_paga').animate({'bottom':'0'}, 100, 'linear');
    });
    
    //点击关注
    main.on('click', '.photog_add' , function(){
         doFollow(this);
    
    });
    
    //取消关注
    main.on('click', '.photog_added', function(){
        unFollow(this);
    
    });
    
    main.on('click', '.photo_fixbox', function(e){
        e.stopPropagation();
        
    });
    
    //点赞
    main.on('click', '.photo_fixbox_like', function(e){
        
//        console.log('like-in');
        
        e.stopPropagation();
        
        var _parent = $(this).parents('li'),
            _id = _parent.attr('data');
        
        if(_parent.hasClass('pocket-part')){
            console.log(_parent,_id);
            doPocketLike(_parent,_id);
        }else{
             doLike(_parent);
        }
          
    });
    
    //取消点赞
    main.on('click', '.photo_fixbox_liked', function(e){
        
       
        
        e.stopPropagation();
        var _parent = $(this).parents('li'),
            _id = _parent.attr('data');
        
//         console.log('like-out',_id,_parent);
        
        if(_parent.hasClass('pocket-part')){
            unPocketLike(_parent,_id);
        }else{
            unLike(_parent);
        }
        
//        unLike($(this).parents('li'));
        
    });
    
    //编辑收藏夹
    main.on('click', '.person-coll-edit', function(e){
            e.stopPropagation();
            var target = $(this).parents('.list_fa');
            favorite_data.id = target.attr('data');
            favorite_data.name = target.find('.person-coll-name').html().trim();
        
            $('#edit_input').val(favorite_data.name);
        
            $('#alert_shadow').show();
            $('.alert_edit_box').fadeIn(400);
        
        
    });
    //取消编辑收藏夹
    alert_b.on('click', '#cancel_edit', function(){

            $('.alert_edit_box').fadeOut(300, function(){
                    $('#alert_shadow').fadeOut(200);
            });
    });
    //重新命名收藏夹
    alert_b.on('click', '#edit-save', function(){
            var name = $('#edit_input').val();
        
            if(name!=''&&name.length!=0){
                edit_favorite(name);
            }else{
                showMessage('名称不合法');
            }
    
    });
    //删除收藏夹
    alert_b.on('click', '#delete_btn', function(){
        $('.alert_edit_box').hide();
	    $('#del-favorite-box').show();
    
    });
    
    //确定删除收藏夹
    $('#delete_f').on('click',function(ev){
        ev.stopPropagation();
        delete_favorite();        
    });
    
    alert_b.on('click', '#cancel_f,#cancel_f2', function(){

        $('#del-favorite-box').fadeOut(400, function(){
            $('#alert_shadow').hide();        
        });   
    });
    
     //点击出现收藏夹
    main.on('click', '.photo_fixbox_ding', function(e){       
        e.stopPropagation();
        var target = $(this).parents('li'),
            id = target.attr('data'),
            path = target.attr('path');
        if(path){    
            $('.store_album_img').attr('src', 'http://image.paiwo.co/'+path+'@!280x280');
            $('#collect-back').fadeIn(100);
            paiwoPhoto.data.photo_id = id;
        }else{
            showMessage('该照片已经被删除');
        }
    });


    //取消照片收藏夹
    main.on('click', '.photo_fixbox_dinged', function(e){
        e.stopPropagation();
        var target = $(this).parents('li');
           unCollect(target); 
    });
    
    var store_box  = $('.store_box');
	var store_select = $('.store_album_select');
 
    //新建收藏夹
    main.on('click', '.person-add-coll a',function(){
        $('#alert_shadow').show();     
        $('.alert_add_box').fadeIn(300);
    });

    $('.person-coll-none a').click(function(){
        $('#alert_shadow').show();       
        $('.alert_add_box').fadeIn(300);
    });
    
    alert_b.on('click', '#cancel_add', function(){
        $('.alert_add_box').fadeOut(200, function(){
            $('.alert_body').fadeOut(200);
        });    
    });
    
    alert_b.on('click', '#add_save', function(){
        var t =  $('#new_input');
        var val = t.val();
            if(val!=''&&val.length){
               //paiwoPhoto.trg('addCollect', val);
                addCollect(val);
                t.val('');
                $('#cancel_add').trigger('click');
            }else{
                showMessage('名称不合法');
            }
    });
    
    main.on('click','.in_fa',function(e){
        if(batch.status == 1){
            var t = $(this).find('.checkpho');
            if(t.css('display') == 'block'){
                t.hide();
                $(this).removeClass('inner_photos_li_select');
                $(this).find('.checkpho').hide();
            }else{
                
                t.show();
                $(this).addClass('inner_photos_li_select');
                $(this).find('.checkpho').show();
                
            }
        }else if(batch.status == 0){
            
        }
    })
    //点击批量操作
    main.on('click', '.all_button', function(){
        if($('.in_fa').length == 0){
            return;
        }
        var t = $(this);
        t.fadeOut(100);
        t.siblings('.all_content2').animate({ opacity: '1', right: -17+'px'},400);
        batch.status = 1;
        
    });
    
    main.on('click', '.choose_button_complete', function(){
        $('.all_content2').animate({ opacity: '0', right: -150+'px'},300);
        $('.all_button').fadeIn(550);
        batch.status = 0;
        var t = $('#selectAll');
        t.hide();
        $('.in_fa').removeClass('inner_photos_li_select');
        $('.in_fa').find('.checkpho').hide();
    });	
    

    
    main.on('click', '#selectAllWrap', function(){
            var t = $('#selectAll');
            if(t.is(':visible')){
                t.hide();
                $('.in_fa').removeClass('inner_photos_li_select');
                $('.in_fa').find('.checkpho').hide();
            }else{
                
                t.show();
                $('.in_fa').addClass('inner_photos_li_select');
                $('.in_fa').find('.checkpho').show();
                
            }    
    });
    
    
    //删除收藏夹图片
    main.on('click', '.choose_button_delete', function(){
        if($('.inner_photos_li_select').length == 0){
            showMessage('请选择要删除的图片');
            return;
        }
        alert_b.show();
        $('#del-photo-box').fadeIn(300);
    
    });
    //取消收藏夹
    alert_b.on('click', '#cancel_p,#cancel_d_x', function(){
        
        $('#del-photo-box').fadeOut(300, function(){
            alert_b.fadeOut(300);
        
        });
    
    });
    //确定删除的图片
    alert_b.on('click', '#delete_p', function(){
        multiple_delete();
    
    });
    
    //移动收藏夹图片
    main.on('click', '.choose_button_move' , function(){
         if($('.inner_photos_li_select').length == 0){
            showMessage('请选择要移动的图片');
            return;
        }
//        updateCollect();
        alert_b.show();
        $('.alert_move_box').fadeIn(300);
    });
    
    $('.alert_move_box').on('click', function(){
         $('#select_menu').hide();
    
    });
    //移动出现下拉框
    $('#move_select_wrap').on('click', function(e){
        e.stopPropagation();
        $('#select_menu').show();
    
    });
    $('#select_menu').on('click','li', function(e){
        e.stopPropagation();
        var name = this.innerHTML;
        var id = this.getAttribute('data');
        $('#select_menu').hide();
        $('#select_move').html(name).attr('data',id);
        
    });
    
    //关闭移动收藏夹
    alert_b.on('click', '#cancel_move', function(){
        $('.alert_move_box').fadeOut(300, function(){
            alert_b.fadeOut(300);
        });
    
    });
    
    //确定移动收藏夹
    alert_b.on('click', '#move_confirm' , function(){
        var id = document.getElementById('select_move').getAttribute('data');
        if(id == '-1'){
            showMessage('请选择移动的收藏夹');
            return;
        }
        if(id == favorite_id){
            showMessage('照片已经存在当前收藏夹');
            return
        }
        
        favorite_move(id);
    });
    
    //点击大图
    main.on('click', '.in_li', function(){
//        if($(this).addClass('in_fa'))return;
         if(this.getAttribute('path') == ''){
            showMessage('照片已经被原作者删除');    
            return;
        }
       var _id = this.getAttribute('data');
        history.pushState({title:'show'},'','/photos/'+_id);
        paiwoPhoto.init(_id);
        paiwoPhoto.trg('showpic');
        paiwoPhoto.tool.scrollShow();       
    });

    main.on('click', '.in_fa_photo', function(){
        if(batch.status == 0){
            if(this.getAttribute('path') == ''){
            showMessage('照片已经被原作者删除');    
            return;
        }
        var _id = this.getAttribute('data');
        history.pushState({title:'show'},'','/photos/'+_id);
        paiwoPhoto.init(_id);
        paiwoPhoto.trg('showpic');
        paiwoPhoto.tool.scrollShow();      
        } 
    });
    
   
    //定时器检测域名是否合法
    var set1 = null;
    main.on('input propertychange','#old_i',function(){
        clearTimeout(set1);
        set1 = setTimeout(wr('old_i', 'old', reg.pwd),700);
    });

    var set2 = null;

    main.on('input propertychange','#new1_i',function(){
        clearTimeout(set2);
        set2 = setTimeout(wr('new1_i', 'new1', reg.pwd),700);
        scendCheck();
    });

    var set3 = null;
    main.on('input propertychange', '#new2_i', function() {
        clearTimeout(set3);
        set3 = setTimeout(scendCheck,700);

    });

    var set4 = null;
    main.on('input propertychange', '#nick_name', function(event) {
        clearTimeout(set4);
        set4 = setTimeout(nickNameCheck,700);
    });

    var set5;
    main.on('input propertychange', '#host_domain', function(event) {
            clearTimeout(set5);

            set5 = setTimeout(hostCheck,1000);
    });

    var set6;
    $('.setting_alert_email').on('blur', '#bind_email', function(event) {
//            clearTimeout(set6);
//            set5 = setTimeout(bind_emailCheck,1000);
        bind_emailCheck();
    });

    var set7;
    $('.setting_alert_email').on('input propertychange', '#bind_pwd', function(event) {
             clearTimeout(set7);
             set5 = setTimeout(bind_pwdCheck,700);

    });

    var set8;
    $('.setting_alert_email').on('input propertychange', '#bind_vail', function(event) {
              clearTimeout(set8);
              set5 = setTimeout(bind_vailCheck,700);

    });

    paiwoPhoto.on('dolikeOut', function(id){
        if(colli_s == 1){
            $('.in_fa[data='+id+']').find('.photo_fixbox_like').removeClass().addClass('photo_fixbox_liked');
            }else{
            $('.in_li[data='+id+']').find('.photo_fixbox_like').removeClass().addClass('photo_fixbox_liked');
         }

    });

    paiwoPhoto.on('unlikeOut', function(id){
        if(colli_s == 1){
            $('.in_fa[data='+id+']').find('.photo_fixbox_liked').removeClass().addClass('photo_fixbox_like');
            }else{
            $('.in_li[data='+id+']').find('.photo_fixbox_liked').removeClass().addClass('photo_fixbox_like');
         }

    });

    paiwoPhoto.on('unfavoriteOut', function(id){

         if(colli_s == 1){
            $('.in_fa[data='+id+']').find('.photo_fixbox_dinged').removeClass().addClass('photo_fixbox_ding');
            }else{
            $('.in_li[data='+id+']').find('.photo_fixbox_dinged').removeClass().addClass('photo_fixbox_ding');
         }
        
    });

    paiwoPhoto.on('dofavoriteOut', function(id){        
            if(colli_s == 1){
            $('.in_fa[data='+id+']').find('.photo_fixbox_ding').removeClass().addClass('photo_fixbox_dinged');
            }else{
            $('.in_li[data='+id+']').find('.photo_fixbox_ding').removeClass().addClass('photo_fixbox_dinged');
            }
    });
    
});
var sc = null;
window.onscroll = function(){

    var h = document.body.scrollHeight;
    var sh = document.documentElement.scrollTop || document.body.scrollTop;
    var ah = document.documentElement.clientHeight;
    //var ah = window.screen.availHeight;
   
    
    if(sh+ah+200>h){
        clearTimeout(sc);
        sc = setTimeout(showNext, 100);
//        showNext();
    }
}
function showNext(){
    
    
    if(CheckMore()){
    
        $('.loading').show();
        
       if(b_s == 1){  //加载喜欢
            getLikeList(++page_no.c);
            $('.loading').hide();
       }else if(collo_s == 1){  //加载收藏
           getCollectList(++page_no.a);
           $('.loading').hide();
       }else if(colli_s == 1){
           getCollectIn(favorite_id, ++page_no.b);
//           $('.loading').hide();
       }
        
//        else if(c_s == 1){
//            getFollowPhotog(++page_no.d);  
//           $('.loading').hide();
//       }else{
//            //console.log('error');
//       }
    
    }    
}
 

function init(){
    initHead();
    getCollectList(1);
    //getFollowPhotog(1);
    getLikeList(1);
    judeHash();
    updateCollect();
}

function getPhotoId(){
	var url = window.location.href;
	var index = url.lastIndexOf('/')+1;
	var _id = null;
	if(url.lastIndexOf('?')!=-1){
		var end = url.lastIndexOf('?');
		_id = url.substring(index,end);
	}else{
		_id = url.substring(index);
	}
	return _id;
}


var picBox = $('.black_bac');
if(history.pushState){
	window.addEventListener('popstate',function(ev){
		var _url = window.location.href,
			_body = document.getElementsByTagName('body')[0],
			scrollWidth = paiwoPhoto.tool.scrollbarwidth;
		if(/photos/.test(_url)){
			var _id = getPhotoId();
				paiwoPhoto.init(_id);
            	picBox.show();
            	paiwoPhoto.trg('showpic');
				_body.style.overflow = 'hidden';
				_body.style.paddingRight = scrollWidth + 'px';
		}else if(/user/.test(_url)){
			picBox.hide();
			_body.style.overflow = 'auto';
			_body.style.paddingRight = '0px';
            
		}
	});
}


//在没有收藏夹时
function hasColl(){
    if($('#favorite_out li').length==0){
        $('.person-coll-none').show();
        $('.person-add-coll').hide()
    }else{
        $('.person-coll-none').hide();
        $('.person-add-coll').show();
    }
}

//点击更换头像
$('#change_head').click(function(event) {
    alert_body.show();
    $('.setting_alert_headimg').show();
});


//关闭更换头像
alert_body.on('click','#close_head', function(){
    alert_body.hide();
    $('.setting_alert_headimg').hide();
});

//点击更换头像
alert_body.on('click', '#mes_con', function(event) {
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

//保存头像
alert_body.on('click','#save_head', function(){
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
    alert_body.hide();
    $('.setting_alert_headimg').hide();
});

//绑定邮箱
$('.login_setting_sociallist a').click(function(e){
    alert_body.show();
    $('.setting_alert_bind').show(); 
})  
alert_body.on('click', '#close_btn,#alert_bind_save', function(e){
    alert_body.hide();
    $('.setting_alert_bind').hide();
});   

//点击显示对应的iframe
$('.login_setting_qq,.login_setting_weibo,.login_setting_weixin').click(function(){
    $(this).siblings('button').trigger('click');
});

alert_body.on('click', '.alert_bind_button', function(){
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
$('#confirm_unbind').on('click',function(){
    if(user.email_state == 0 && user.bindCount == 1){
        slideMessage('请先绑定一个邮箱');
         return;
    }
    unBind(unbind_type);
});


$('#unbind_1,#unbind_2').on('click', function(){
    $('#alert_unbind').hide();
    $('#alert_shadow').hide();
});


//点击显示绑定邮箱
$('.login-setting').on('click', '#bind_btn',function(event) {
    $('#alert_shadow').show();
    $('.setting_alert_email').show();
    $('.email_inputs_vimg').attr('src','/a/captcha/binding?v='+Math.random());
});

//点击激活邮箱
$('.login-setting').on('click', '#active_mail_btn',function(event) {
   send_email();
});

//点击更新验证码
$('.email_inputs_vimg').click(function(){
    $(this).attr('src','/a/captcha/binding?v='+Math.random());
})

//取消显示绑定
$('.setting_alert_email').on('click', '.close_bind_email', function(event) {
//    d.hide();
    $('#alert_shadow').hide();
    $('.setting_alert_email').hide();
});


//绑定邮箱下一步
$('.setting_alert_email').on('click', '#bind_next', function(event){
    
    if(bind_emailCheck()&&bind_pwdCheck()&&bind_vailCheck()){
         var emali = document.getElementById('bind_email').value;
         var pwd = document.getElementById('bind_pwd').value;
        
           bindEmail(emali, pwd);
           $('.setting_alert_email').hide();
           $('#alert_shadow').hide();
           $('.mail-span').html(bind_email);
           var fix = bind_email.split('@');
            fix = fix[fix.length-1];
           $('.mail-btn').attr('href','http://mail.'+fix);
           $('#mailbox').show();
    }

});

//关闭修改密码
$('#close_change,#cancel_change').click(function(event){
    alert_body.hide();
    $('.setting_alert_repwd').hide();
}); 

//点击显示区域
$('#ss').click(function(event){
    newshowSer();
    alert_body.show();
    $('#area-select').show();
});

//点击关闭显示的区域
alert_body.on('click', '.save-close', function(event) {
    alert_body.hide();
    $('#area-select').hide();
    $('.shen').html('');
    $('.shi').html('');
    $('.a-select').removeClass('a-select');
});

//点击修改服务地区
alert_body.on('click', '.save-btn', function(event) {
    alert_body.hide();
    biztypeCheck();
    $('#area-select').hide();
    updatePlace();
    flag = 0;
});

$('.topbar').on('click','span',function(){
      var id = this.getAttribute('data');

      $(this).fadeOut(400,function(){
        $(this).remove();
      });
      removeId(id);
});

$('#lbtn').click(function(event) {
        
    cul('pre');

}); 

$('#rbtn').click(function(event) {

    cul('next');

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
//性别选择

//选择男
setting.on('click', '#chose_man', function() {
    $(this).find('a').html('<i></i>');
    $('#chose_female').find('a').html('');
    $('#chose_secret').find('a').html('');
    user.gender = 1;
});

//选择女
setting.on('click', '#chose_female', function() {
    $(this).find('a').html('<i></i>');
    $('#chose_man').find('a').html('');
    $('#chose_secret').find('a').html('');
    user.gender = 2;
});

//选择保密
setting.on('click', '#chose_secret', function() {
    $(this).find('a').html('<i></i>');
    $('#chose_female').find('a').html('');
    $('#chose_man').find('a').html('');
    user.gender = 3;
});

//点击年月日，出现下拉面板
setting.on('click', '.infor_ul_birth div', function(event) {
    $('.person_information dl').hide();
    $(this).find('dl').toggle();
});


//选择年
setting.on('click', '#year dd', function(event) {
    event.stopPropagation();
    var t = $(this);
    var data = this.innerHTML;
    t.parent().hide().prev().html(data);
     // bir.month.html(1);
     // bir.day.html(1);
    showDay(data, 1);
    $('.person_information dl').hide();
});

//选择月
setting.on('click', '#month dd', function(event) {
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

setting.on('click', '#day dd', function(event) {
    event.stopPropagation();
    var t = $(this);
    var data = this.innerHTML;
    t.parent().hide().prev().html(data);
    $('.person_information dl').hide();
    
});

//选择provice 
setting.on('click', '#province dd', function(event) {
    event.stopPropagation();

    var t = $(this);
    var data = this.innerHTML;
    var id = $(this).attr('data');
    //console.log(data+'|'+id);
    t.parent().prev().html(data).attr('data',id);
//      $('#province a').html(data).attr('data',id);
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
//          bir.place.html(allArea2['city'][id][id]).attr('data', id);
        $('#place a').html(allArea2['city'][id][city_first]);
        $('#place a').attr('data',city_first);
        $('#place').trigger('click');
    }
    $('#province dl').hide();
});


//选择市
setting.on('click', '#place dd', function(event) {
    
    console.log('222');
    
    event.stopPropagation();
    var t = $(this);
    var data = this.innerHTML;
    var id = $(this).attr('data');
    t.parent().prev().html(data).attr('data',id);
    $('#place dl').hide();
    $('#province dl').hide();
//      $('dl').hide();
});


//拍摄类型选择
setting.on('click', '.style_choose_circle>div', function(event) {
    
    console.log($(this).index()+1);
    
    var t = $(this);
    if(t.hasClass('style_choose_circle_selected')){
        t.removeClass('style_choose_circle_selected');
        return;
    }
    t.addClass('style_choose_circle_selected');

});

    $('#area-select').on('click', '.in-pre', function(event) {
 		cul2('pre');

 	});

 	$('#area-select').on('click', '.in-next', function(event) {
 		cul2('next');
 	});

//订单进入
$('#aut-ul-left-offer').on('click','.pg-domain',function(){
    window.open('/'+user.user_domain);
    return false;
});

//订单跳转


$('#aut-ul-left-offer').on('click','.contact',function(ev){
//    window.open('/market/'+$(this).attr('data-code'));
    $('#top_message').trigger('click');
    PWS.addTalk($(this).attr('data-code'));
    ev.stopPropagation();
});

//表单保存
setting.on('click', '#photog_save', function(event) {
   if(!nickNameCheck('submit','save')){
       return;
   }
    
    
  if(!hostCheck()){
       return;
   }
    

    //信息发送保存
    
    if(top_data.gift==1){
        if(!biztypeCheck()){
            return;
        }
         photogSend();
    }

    //摄影师信息的保存
    photogSave();
    
    //保存数据
    formSave();
    
    //数据发送 
    formSend();
    
    
});
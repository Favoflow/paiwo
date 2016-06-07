
function getCollectList(page_no){ 
    
    base.ajax({
        
        async:true,
        
        data:{
            'method': 'paiwo.user.favorite_list.get',
            'page_no': page_no,
            'page_size': 7
        },
        success:function(data){
            if(data.error_id==0){
                
//                console.log(data);
                
                var _data = data.response;
                pCount.a = _data.count;
//                console.log(_data);
                var tm = $.tmpl(mytm.favorite_list, _data.favorite_list);
                
//                console.log(tm);
                var fav_count = 0;
                for(var i=0;i<_data.favorite_list.length;i++){
                    fav_count = fav_count + _data.favorite_list[i].content_count;
                }
            
                head_coll.find('span').html(fav_count);
                if(_data.page_no == 1){
                    $('#favorite_out').html(tm);
                }else{
                    $('#favorite_out').append(tm);
                }
                hasColl();
                
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
    
    
    
}

//头像剪裁
function head_cut(){
   
    base.ajax({
        data:{
            'method': 'paiwo.user.avatar.cut',
            'photo_path': head_path,
            'x': head_size.x,
            'y': head_size.y,
            'w': head_size.w,
            'h': head_size.h
        },
        success:function(data){
            if(data.error_id==0){
                user.user_avatar = data.response.photo_path;
                $('.navi_head_headed').attr('src', 'http://image.paiwo.co/'+user.user_avatar);
                $('#user_head').attr('src','http://image.paiwo.co/'+user.user_avatar);
                $('.tab-icon-userhead').attr('src','http://image.paiwo.co/'+user.user_avatar);
                $('.setting_alert_headimg').hide();
                $('#alert_shadow').hide();
                slideMessage('保存头像成功');
            }else{
                slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
    
}



function getCollectIn(favorite_id, page_no){
   
     base.ajax({
        data:{
            'method': 'paiwo.user.favorite_content_list.get',
            'favorite_id': favorite_id,
            'page_no': page_no,
            'page_size': 9
        },
        success:function(data){
            if(data.error_id==0){
                pCount.b = data.response.count;
                
                showCollectIner(data.response);
                
            }else{
                slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });

}


//更新收藏夹列表
function updateCollect(){
 
    base.ajax({
        data:{
            'method': 'paiwo.user.favorite.name_list.get'
        },
        success:function(data){
            if(data.error_id==0){
                var tm = '',
                    t;
                for(var i =0; i<data.response.favorite_list.length; i++){
                        t = data.response.favorite_list[i];
                        tm +='<li data="'+t.favorite_id+'">'+t.favorite_name+'</li>';
                }
                //console.log(tm);
                $('#select_menu').html(tm);
            }else{
                slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
    
    
}


//上传头像获取url
function uploadfile(){
    var fileObj = document.getElementById("head_file").files[0];
    if (fileObj != null){
        var base_url = "http://paiwo.oss-cn-hangzhou.aliyuncs.com";
        var FileController = base_url;
        var form = new FormData();
        var flag = false;
        
        $.ajax({
            async: false,
            type: "POST",
            url: "/a/user/avatar/uploadurl/get",
            dataType: 'json',
            success: function(data) {
                form.append("Signature", data.response.signature);
                form.append("policy", data.response.policy);
                form.append("OSSAccessKeyId", data.response.key_id);
                form.append("key", data.response.object_key);
                form.append("success_action_status", 201);
                flag = true;
            },
            error: function() {
                flag = false;
            }
        });
    
      
        if(flag){
            form.append("file", fileObj);
            var xhr = new XMLHttpRequest();
            xhr.open("post", FileController, false);
            xhr.onload = function () {
                  var obj = $(xhr.response).find("Key").html();
                  head_path = obj;
                  user.avatar = obj;
            };
            
            
            xhr.send(form);         
        }else{
            alert("上传出错");
        }
        
        
      }
}

function showCollectIner(data){
        var t = $('.coll-inner-title');
        t.find('h3').html(data.favorite_name);
    
        console.log(data.count);
        t.find('h5').html(data.count);
    
        $('.loading').hide();
    
        var tm = '';
      
           console.log(data.content_list);

    
        for(var i=0;i<data.content_list.length;i++){
            console.log();
            if(data.content_list[i].content_type==1){
                tm += $.tmpl(mytm.favorite_in, data.content_list[i])[0].outerHTML;
            }else if(data.content_list[i].content_type==2){
                tm += $.tmpl(mytm.pocket, data.content_list[i])[0].outerHTML;
            }
        }
    
//        var tm = $.tmpl(mytm.favorite_in, data.content_list);
    
    
        if(data.page_no == 1){
            $('#favorite_in_photos').html(tm);
            $('#favorite_wrap').hide();
            $('#favorite_in').fadeIn(300);
        }else{
            
//            tm.hide();
             $('#favorite_in_photos').append(tm);  
//            tm.fadeIn(300);

        }
}

function getLikeList(page_no){
    
     base.ajax({
         
        data:{
            'method': 'paiwo.user.like.list.get',
            'page_no': page_no,
            'page_size': 12
        },
         
        success:function(data){
            if(data.error_id==0){
               if(data.response.count == 0){
                   $('#my_likes_ding_none').show();
                   return;
               }else{
                   $('#my_likes_ding_none').hide();
                   pCount.c = data.response.count;
                   showLikes(data.response.content_list);
                   head_like.find('span').html(pCount.c);
               }
            }else{
                slideMessage('网络错误..');
            }
        },
         
        error:function(data){
            slideMessage('网络错误');
        }
         
    });
}



//关注摄影师
function doFollow(target){
    
    
    base.ajax({
        data:{
            'method': 'paiwo.user.follow.follow',
            'follow_id': id
        },
        success:function(data){
            if(data.error_id==0){
               var name = target.getAttribute('xs');
               $(target).removeClass().addClass('photog_added').find('i').html('已关注');	
               showMessage('添加关注 '+name+' 摄影师');
            }else{
                slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
    
    
}

//取消关注摄影师
function unFollow(target){
    var id = target.getAttribute('data');
    
    
    base.ajax({
        data:{
            'method': 'paiwo.user.follow.un_follow',
            'follow_id': id
        },
        success:function(data){
            if(data.error_id==0){
              var name = target.getAttribute('xs');
              $(target).removeClass().addClass('photog_add').find('i').html(''); 				
              showMessage('取消关注 '+name+' 摄影师');
            }else{
              slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
}

//点赞
function doLike(target){
    var id = target.attr('data');

    
    base.ajax({
        data:{
            'method': 'paiwo.user.like.add',
            'content_id': id,
            'content_type':1
        },
        success:function(data){
            if(data.error_id==0){
              target.find('.photo_fixbox_like').last().removeClass().addClass('photo_fixbox_liked');
            }else{
              slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });

}

function doPocketLike(target,id){
//    var id = target.attr('data');

    console.log(id);
    base.ajax({
        data:{
            'method': 'paiwo.user.like.add',
            'content_id': id,
            'content_type':2
        },
        success:function(data){
            if(data.error_id==0){
              target.find('.photo_fixbox_like').last().removeClass().addClass('photo_fixbox_liked');
            }else{
              slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });

}


//取消赞
function unLike(target){
    var id = target.attr('data');
    
     base.ajax({
        data:{
            'method': 'paiwo.user.like.delete',
            'content_id': id,
            'content_type':1
        },
        success:function(data){
            if(data.error_id==0){
              target.find('.photo_fixbox_liked').last().removeClass().addClass('photo_fixbox_like');
            }else{
              slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
    
}


//兜取消
function unPocketLike(target,id){
//    var id = target.attr('data');
    
     base.ajax({
        data:{
            'method': 'paiwo.user.like.delete',
            'content_id': id,
            'content_type':2
        },
        success:function(data){
            if(data.error_id==0){
              target.find('.photo_fixbox_liked').last().removeClass().addClass('photo_fixbox_like');
            }else{
              slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
    
}



function addCollect(name){
    

    
    base.ajax({
        data:{
            'method': 'paiwo.user.favorite.create',
            'favorite_name':name
        },
        success:function(data){
            var tm = '<li data="'+data.response.favorite_id+'">'+name+'</li>';
                $('.store_album_select').append(tm).hide();
                $('#select_menu').append(tm);
                $('.store_album_input').html(name);
                paiwoPhoto.collect.id = data.response.favorite_id;
            if(collo_s == 1){
                var mydata = {};
                mydata.favorite_id = data.response.favorite_id;
                mydata.favorite_name = name;
                mydata.photo_count = 0;
                mydata.photo_list = [];
                var newlist = $.tmpl(mytm.favorite_list, mydata);
                newlist.hide();
                newlist.prependTo('#favorite_out');
                
                newlist.fadeIn(300);
            }
            hasColl();
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
    

}

//取消收藏
function unCollect(target){
    
    var photo_id = target.attr('data');
    	
    
    
     base.ajax({
        data:{
            'method': 'paiwo.user.favorite.delete',
            'content_id': photo_id ,
            'content_type':1
        },
        success:function(data){
            if(data.error_id==0){
              target.find('.photo_fixbox_dinged').removeClass().addClass('photo_fixbox_ding');
            }else{
              slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });

}

//编辑收藏夹名称
function edit_favorite(name){
    
    base.ajax({
        data:{
            'method': 'paiwo.user.favorite.edit',
            'favorite_id': favorite_data.id,
            'favorite_name': name
        },
        success:function(data){
            if(data.error_id==0){
               $('.list_fa[data='+favorite_data.id+']').find('.person-coll-name').html(name);
               $('.store_album_select li[data='+favorite_data.id+']').html(name);
               if(paiwoPhoto.collect.id = favorite_data.id){
                   $('.store_album_input').html(name);
               }
              $('#cancel_edit').trigger('click');
              showMessage('修改完成');
            }else{
              slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
    
}

//删除收藏夹
function delete_favorite(){
    
     base.ajax({
        data:{
            'method': 'paiwo.user.favorite.remove',
            'favorite_id': favorite_data.id
        },
        success:function(data){
            if(data.error_id==0){
                $('#cancel_f').trigger('click');
                $('.list_fa[data='+favorite_data.id+']').fadeOut(300, function(){
                    $(this).remove();
                    hasColl();
                });
                $('#select_menu li[data='+favorite_data.id+']').remove();
                $('.store_album_select li[data='+favorite_data.id+']').remove();
                if(paiwoPhoto.collect.id == favorite_data.id){
                  $('.store_album_input').html('请选择一个收藏夹');
                    paiwoPhoto.collect.id == undefined;
                }
            }else{
              slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
}

//移动照片到指定的收藏夹
function favorite_move(to_id){
    var s = [];
    var num;
    $('.inner_photos_li_select').each(function(){
        s.push({
            'content_id':this.getAttribute('data'),
            'content_type':1
        });
    });
    num = s.length;
    
    
    base.ajax({
        data:{
            'method': 'paiwo.user.favorite.move',
            'from_favorite_id': favorite_id,
            'to_favorite_id': to_id,
            'content_list': s
        },
        success:function(data){
            if(data.error_id==0){
                $('.inner_photos_li_select').each(function(){
                        $(this).fadeOut(300, function(){
                            $(this).remove();
                        });
                });	
                updateNum(num);
                $('#cancel_move').trigger('click');
            }else{
              slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
}

//批量删除收藏夹图片
function multiple_delete(){
    
    batch.data = [];
    $('.inner_photos_li_select').each(function(){
        batch.data.push({
            'content_id': this.getAttribute('data'),
            'content_type': 1
        });
    });
    var num = batch.data.length;
    

    
     base.ajax({
        data:{
            'method': 'paiwo.user.favorite.multiple.delete',
            'favorite_id': favorite_id,
            'content_list': batch.data
        },
        success:function(data){
            if(data.error_id == 0){           
                $('.inner_photos_li_select').each(function(){
                    $(this).fadeOut(300, function(){
                        $(this).remove();
                    });
                });
                $('#cancel_p').trigger('click');
                updateNum(num);
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
}

var pcx;
var newImg;

function loadingImg( photo_list ){
    var img ;
    pcx = 0
    for(var i =0; i<photo_list.length; i++){
        newImg = new Image();
        if(photo_list[i].photo_path != ''){
            newImg.src = 'http://image.paiwo.co/'+photo_list[i].photo_path+'@!560x560';
            if(pcx.complete){
                pcx++;
                if(pcx == photo_list.length){
                   showLikes( photo_list ); 
                }
            }else{
                newImg.onload = function(){
                pcx++;
                if(pcx == photo_list.length){
                    showLikes( photo_list );
                 }
               }
            }
        }else{
              pcx++;
            if(pcx == photo_list.length){
                   showLikes( photo_list ); 
                }
          
        }
    }

    
}

//显示赞的图片
function showLikes(data){
    var tm ='';
    for(var i=0;i<data.length;i++){
        if(data[i].content_type == 1){
            tm += $.tmpl(mytm.like, data[i])[0].outerHTML;
        }else if(data[i].content_type == 2){
            tm += $.tmpl(mytm.pocket, data[i])[0].outerHTML;
        }
    }
       
        if(page_no.c == 1){
            $('#likes_ul').html(tm);
        }else{
            $('#likes_ul').append(tm);
        }
    $('.loading').hide();        

}


var wr=null;
var setting = 'height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes';
function showIframe(url){
    wr = window.open(url,bind_status,setting);
    if(wr){
        wr.focus();
    }else{
        showMessage('请打开浏览器弹窗设置');
    }
    
}
//显示绑定社交账号
function isBind(data){
    if(data.qq_id != ""){
            $('.login_setting_qq').removeClass().addClass('login_setting_qq_bind');
            $('#qq_bind').html('解除绑定').addClass('alert_bind_button_bind');
            
            user.bindCount++;
    }
    if(data.weibo_id != ""){
            $('.login_setting_weibo').removeClass().addClass('login_setting_weibo_bind');
            $('#weibo_bind').html('解除绑定').addClass('alert_bind_button_bind');
            user.bindCount++;
    }
    if(data.weixin_id != ""){
            $('.login_setting_weixin').removeClass().addClass('login_setting_weixin_bind');
            $('#wechat_bind').html('解除绑定').addClass('alert_bind_button_bind');
            user.bindCount++;
    }
}

function doBind(text, name, error){
    wr.close();
    wr = null;
    
    if(text!='0'){
        
        slideMessage('绑定失败: ' + error);
        return;
    }else{
        if(bind_status == 'qq'){
            //qq
            $('.login_setting_qq').removeClass().addClass('login_setting_qq_bind');
            $('#qq_bind').html('已绑定').addClass('alert_bind_button_bind');
            $('.login_setting_qq_bind h6').html(name);
            slideMessage('绑定 QQ 成功');
        }else if(bind_status == 'weibo'){
            //微博
            $('.login_setting_weibo').removeClass().addClass('login_setting_weibo_bind');
            $('#weibo_bind').html('已绑定').addClass('alert_bind_button_bind');
            $('.login_setting_weibo_bind h6').html(name);
            slideMessage('绑定 微博 成功');
        }else if(bind_status == 'wechat'){
            //微信
            $('.login_setting_weixin').removeClass().addClass('login_setting_weixin_bind');
            $('#wechat_bind').html('已绑定').addClass('alert_bind_button_bind');
            $('.login_setting_weixin_bind h6').html(name);
            slideMessage('绑定 微信 成功');
        }else{}
    }
    
}

function unBind(bind_type){
    var type = bind_type;
    if(type =='qq_bind'){
        type = 'qq';    
        
    }else if(type == 'weibo_bind'){
        type = 'weibo';
        
    }else{
        type = 'weixin';
    }
    
    
    
    base.ajax({
            
            data:{
                'method': 'paiwo.account.bind.un_bind',
                'bind_type':type
            },
            
            success:function(data){
                 if(data.error_id == 0){
                    if(type =='qq'){

                        $('.login_setting_qq_bind').removeClass().addClass('login_setting_qq');
                        $('#qq_bind').html('绑定').removeClass('alert_bind_button_bind');
                      //  $('.login_setting_qq h6').html('');
                        user.bindCount--;
                    }else if(type == 'weibo'){

                        $('.login_setting_weibo_bind').removeClass().addClass('login_setting_weibo');   
                        $('#weibo_bind').html('绑定').removeClass('alert_bind_button_bind');
                    //    $('.login_setting_weibo h6').html('');
                        user.bindCount--;

                    }else{

                        $('.login_setting_weixin_bind').removeClass().addClass('login_setting_weixin');
                        $('#wechat_bind').html('绑定').removeClass('alert_bind_button_bind');
                      // $('.login_setting_weixin h6').html('');
                        user.bindCount--;

                    }

                    slideMessage('解除绑定成功');
                    $('#alert_unbind').hide();
                    $('.setting_alert_body').hide();
                }else{
                    slideMessage(data.error_code);
                }
                
            },
            
            error:function(data){
                slideMessage('网络错误');
            }
            
        });
    
    
    
    

}

//判断地区个数
function area_length(){
    var len = document.getElementsByClassName('service_list')[0].children.length;
    switch(len){
        case 4:
            $('.service_list_box').css('width',400);
            $('.take_place_change').css('right',-50);
            $('#lbtn').hide();
            $('#rbtn').hide();
            break;
        case 3:
            $('.service_list_box').css('width',300);
            $('.take_place_change').css('right',66);
            $('#lbtn').hide();
            $('#rbtn').hide();
            break;
        case 2:
            $('.service_list_box').css('width',200);
            $('.take_place_change').css('right',160);
            $('#lbtn').hide();
            $('#rbtn').hide();
            break;
        case 1:
            $('.service_list_box').css('width',100);
            $('.take_place_change').css('right',260);
            $('#lbtn').hide();
            $('#rbtn').hide();
            break;
        case 0:
            $('.service_list_box').css('width',0);
            $('.take_place_change').css('right',370);
            $('#lbtn').hide();
            $('#rbtn').hide();
            break;
        default:
            $('.service_list_box').css('width',400);
            $('.take_place_change').css('right',-50);
            $('#lbtn').show();
            $('#rbtn').show();
    }
}
//计算字符长度
function getStrLen(str){
    var res=0;
    var reg=/[\u4e00-\u9fa5]/;
    for(var i=0; i<str.length; i++){
        if(reg.test(str.charAt(i))){
            res+=2;
        }else{
            res++;
        }
    }
    return res;
}

//获取摄影师相关的信息
function get_data(){
     base.ajax({
         
        data:{
            'method': 'paiwo.photographer.info.get'
        },
         
        success:function(data){
            if(data.error_id==0){
                user_g = data.response;
                
                var area_arr = data.response.photograph_address;
                user_g.service_list = data.response.photograph_address;
                for(var i = 0;i<user_g.photograph_type.length;i++){
                    $('.style_choose_circle>div').eq(parseInt(user_g.photograph_type[i])-1).addClass('style_choose_circle_selected');
                }
                $('.service_list').html('');
                if(area_arr.length){
                    for(var i=0;i<area_arr.length;i++){
                        $('.service_list').append('<li class="service_list_area_two">'+paiPlace(area_arr[i])+'</li>');
                        area_list.push(area_arr[i]);
                        user_g.service_list = data.response.photograph_address;
                        ar.push(area_arr[i]);
                    }
                    area_length();
                var service_list = document.getElementsByClassName('service_list')[0];
                var service_list_length = document.getElementsByClassName('service_list')[0].children.length;
                }else{
                    $('.service_list').html('');
                    area_length();
                }
            }else{
              slideMessage('网络错误..');
            }
        },
         
        error:function(data){
            slideMessage('网络错误');
        }
         
    });
    
    
    
    
}

function photogSave(){
        user.user_host = photo_g.host.value; 
        user.qq = photo_g.qq.value;
        auth_info.phone = photo_g.phone.value;
        user.weixin = photo_g.wechat.value;
        user.user_desc = photo_g.desc.value;
}


//摄影师信息
function photogSend(){   
    base.ajax({
        
        data:{
            'method': 'paiwo.photographer.info.modify',
            'photograph_address':ar,
            'photograph_type':user_g.photograph_type
        },
        
        success:function(data){
            if(data.error_id==0){
               slideMessage('保存成功');
               $('.select_browse').attr('href', "/" + user.user_domain);
            }else{
              slideMessage('网络错误..');
            }
        },
        
        error:function(data){
            slideMessage('网络错误');
        }
        
    });
    
    
    
    
}


//检验密码正确
function checkVal(id, showid ,reg){

    
    var val = document.getElementById(id).value;

    if(val.length == 0){
        hideError(showid);
        return false;
    }
    if(reg.test(val)){
        hideError(showid);
        return true;
    }else{
        showError(showid,'密码格式错误');
    }
}

//检测重复输入的密码是否一致
function scendCheck(){
    if(checkVal('new1_i', 'new1', reg.pwd)){
        var v1 = document.getElementById('new1_i').value;
        var v2 = document.getElementById('new2_i').value;
        if(v1 == v2){
            hideError('new2');
            return true;    
        }
        if(v2 == ''){

        }else{
        showError('new2','两次密码不一致!');
        }
        return false;
    }
    hideError('new2');
    return false;
    
    
}

//获取字符串长度
    
function nickCheck(data){
        var count = 0;
        var reg = /[A-Za-z0-9_]/;
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

//      if( count > 23 || count < 4 ){  
//          return false;
//      }
        return count;
}

//检测是否选择了拍摄类型
function biztypeCheck(){
    //if(user_g.biz_type)
    user_g.photograph_type = [];
    $('.style_choose_circle>div').each(function(index, el) {
        if($(this).hasClass('style_choose_circle_selected')){
            user_g.photograph_type.push(index+1);
        }
    });

    if(user_g.photograph_type.length==0){
        slideMessage('请选择接拍类型');
        return false;
    }
    return true;
}

var bind_email;
//绑定邮箱
function bindEmail(email, pwd){
	bind_email = email;
	pwd =  $.md5("paiwo_" + pwd);
    
     base.ajax({
            
        data:{
            'method': 'paiwo.account.bind.email_bind',
            'email': email,
            'password':pwd
        },

        success:function(data){
            if(data.error_id==0){

            }else{
                slideMessage(data.error_code);
            }
        },

        error:function(data){
            slideMessage('网络错误');
        }
            
    });
    

}

//检测昵称是否被占用合法
var is_exist = false;
function nickNameCheck(flag,type){
    
//    console.log('in_check');
    
    var val = document.getElementById('nick_name').value,
        type = type || 'normal';
    
     if(type=='save'){
        if(val==''){
            slideMessage('昵称不能为空');
            return;
        }
            
    }
    
    if(val=='')return;
    
   
    
    if(val == user.nick_name){
        $('#nick_i').hide();
        $('#nick_error').hide();
        return true;
    }
//    //console.log(val);
    var _valCount = nickCheck(val);
    if(!_valCount){
        $('#nick_i').show();
        $('#nick_error').html('昵称含有非法字符').show();
        if(type=='save'){
            slideMessage('昵称含有非法字符');
        }
        
        return;
    }else{
        $('#nick_i').hide();
        $('#nick_error').hide();
    }
    
    if( _valCount >= 4 && _valCount <= 22){
        
        base.ajax({
            
            data:{
                'method': 'paiwo.user.name.check',
                'user_name': val
            },
            success:function(data){
                if(data.error_id==0){
                   is_exist = data.response.is_exist;
                }else{
                  slideMessage('网络错误..');
                }
            },
            error:function(data){
                slideMessage('网络错误');
            }
            
        });
        

        if(is_exist){
            if(flag=='submit'){
                slideMessage('昵称重复');
                $('#nick_i').show();
                $('#nick_error').html('昵称重复').show();
            }else{
                $('#nick_i').show();
                $('#nick_error').html('昵称重复').show();
            }
            return false;
        }else{
            $('#nick_i').hide();
            $('#nick_error').html('').hide();
            user.user_name = val;
            return true;
        }
            
    }else if(_valCount < 4){
        $('#nick_i').show();
        $('#nick_error').html('昵称必须长于2个汉字或4个字母').show();
    }else if(_valCount > 22){
        $('#nick_i').show();
        $('#nick_error').html('昵称必须小于22个字符').show();
    }
}


var is_exist2 = false;
//检测域名是否合法被占用
function hostCheck(){
    
    console.log('in_host');
    
    var val = photo_g.host.value;

    if(val  == user.user_domain){
        $('#host_error').hide();
        return true;
    }
    if(reg.host.test(val)){

         base.ajax({
            
            data:{
                'method': 'paiwo.user.domain.check',
                'user_domain': val
            },
            success:function(data){
                if(data.error_id==0){
                   is_exist2 = data.response.is_exist;
                }else{
                  slideMessage('网络错误..');
                }
            },
            error:function(data){
                slideMessage('网络错误');
            }
            
        });

        if(is_exist2){
            $('#host_error').html('个性域名重复').show();
                  return false;
        }else{
            $('#host_error').hide();
            slideMessage('域名可用');
            user.user_domain = val;
            return true;
        }
            
    }else{
        slideMessage('个性域名需为5-30位小写英文、数字组合');
        $('#host_error').html(' 域名不合法').show();
        return false;
    }
}

var is_exit3;
function bind_emailCheck(){
	var val = document.getElementById('bind_email').value;

	if(val == ''){
		hideError('bind_email_r');
		return false;
	}

	if(!reg.email.test(val)){
		showError('bind_email_r','邮箱格式错误');
		return false;
	}
    
    $.ajax({
        
        async: false,
        type : "POST",
        url : "/rest",
        dataType : 'json',
        data:{
            data: JSON.stringify({
            email: val,
            method: 'paiwo.account.register.check_email'})  
        },
        success : function(data) {
            if(data.error_id == 0){
                is_exit3 = data.response.is_register;
                showError('bind_email_r','邮箱已存在');
            }
        },
        error : function(data) {
           
        }
        
    });

	if(is_exit3 == 1){
		showError('bind_email_r','邮箱已存在');
		return false;
	}	
	
	hideError('bind_email_r');
	return true;
}


function bind_pwdCheck(){
	var val = document.getElementById('bind_pwd').value;

	if(val == ''){
		hideError('bind_email_pwd_r');
		return false;
	}
	if(!reg.pwd.test(val)){
		showError('bind_email_pwd_r','密码格式错误')
		return false;
	}
	hideError('bind_email_pwd_r');
	return true;

}


function bind_vailCheck(){
	var val = document.getElementById('bind_vail').value;
	if(val.length!=4){
		showError('bind_email_vail_r','验证码错误');
		return false;
	}
	hideError('bind_email_vail_r');
	return true;
}


//个人信息表单的存储
function formSave(){
    user.nick_name = document.getElementById('nick_name').value;
    if(bir.year.html() == ''){
        user.birthday = '';
    }else{
       user.birthday = bir.year.html() + '-' + bir.month.html() + '-' + bir.day.html();
    }

    
    if(!$('#province a').attr('data')){
        user.address = '';
    } else if($('#province a').attr('data')=='02-33-00' || $('#province a').attr('data')=='02-34-00'){
        var pro_code = $('#province a').attr('data');
        user.address = pro_code;
    }else{
        var city_code = $('#place a').attr('data');
        user.address = city_code;
    }
}

//个人信息表单的提交
function formSend(){
    
     base.ajax({
        data:{
            'method': 'paiwo.user.info.modify',
            'user_name': user.user_name,
            'user_desc': user.user_desc,
            'user_avatar': user.user_avatar,
            'user_domain': user.user_domain,
            'address':user.address,
            'gender':user.gender,
            'birthday':user.birthday,
            'qq':user.qq,
            'weixin':user.weixin,
            'weibo': user.weibo
        },
        success:formSaveResult,
        error:function(data){
            slideMessage('网络错误');
        }
    });      
}

function formSaveResult(data){
    if(data.error_id == 0){
        slideMessage('保存成功');
        $('.user_name').html(user.nick_name);
        $('.tab-icon_myset>p').html(user.nick_name);
    }else if(data.error_id == -1){
        slideMessage('网络错误..');
    }else{
        slideMessage(data.error_code);
    }
}

function savaPwd(oldpwd, newpwd1,newpwd2){
    oldpwd = $.md5("paiwo_" + oldpwd);
    newpwd1 = $.md5("paiwo_" + newpwd1);
    newpwd2 = $.md5("paiwo_" + newpwd2);
 
    base.ajax({
        data:{
            'method': 'paiwo.account.password.change_password',
            'old_password':oldpwd,
            'password1':newpwd1,
            'password2':newpwd2
        },
        success:savaPwdResult,
        error:function(data){
            slideMessage('网络错误');
        }
    });
        
}

//修改密码
function savaPwdResult(data){
    if(data.error_id == 0){
        slideMessage('修改密码成功');
        document.getElementById('old_i').value = '';
        document.getElementById('new1_i').value = '';
        document.getElementById('new2_i').value = '';
        $('#alert_shadow').hide();
        document.getElementById('change_box').style.display='none';
        
    }else{
        showError('old','原密码错误');   
    }
    
}


//初始化函数
function inituser(){
    
     base.ajax({
        data:{
            'method': 'paiwo.user.info.get'
        },
        success:function(data){
            if(data.error_id==0){
                
                user = data.response;
                user.bindCount = 0;
                
                initPerson();
                if(top_data.gift== 1){//如果是摄影师
                    get_data();
                    $('#photog_s').show();
                    $('.order-receive').show();
                    $('.photog-infor').show();
                    getOfferOrder(1);
                    $('.my-start-order .person-center-nav').show();
                }else{
                    $('#photog_s').css('color','#dbdbdb');
                    
                }
                getSelfOrder(1);
            }else{
              slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
    
    
    base.ajax({
        data:{
            'method': 'paiwo.user.auth_info.get'
        },
        success:function(data){
            if(data.error_id==0){
//               console.log(data);
               auth_info = data.response;
               isBind(data.response);//显示是否绑定了社交账号
               showPhotogdata();
               showEmail();//显示是否绑定了邮箱
            }else{
              slideMessage('网络错误..');
            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });
    
   
}


    var self_order_flag = true,
        offer_order_flag = true,
        self_order_page = 1,
        offer_order_page = 1;

    //获取发起订单列表
    function getSelfOrder(page_no){
        

        base.ajax({
            
            async:true,
            
            data:{
                'method': 'paiwo.market.order.self_list.get',
                'page_no': page_no,
                'page_size':20
            },
            
            success:function(data){
                if(data.error_id==0){
                    
                    var _data = data.response;
                    
                    
                    market_view.showRecentOrder(_data.order_list);
                    
                    if(_data.page_no*_data.page_size<=_data.count){
                         self_order_flag = true;
                    }else{
                        self_order_flag = false;
                    }

                   
                }else{
//                  slideMessage('网络错误..');
                }
            },
            
            error:function(data){
//                slideMessage('网络错误');
            }
            
        });
        
    }

    //getSelfOrder(1);

    $(window).on('scroll',function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            winH = document.documentElement.clientHeight,
            bodyH = document.body.scrollHeight;
            
            if(scrollTop+winH+400>bodyH && $('#h_order').hasClass('person-tab-cur') && $('.my-start-order .order-start').hasClass('person-tab-cur') && self_order_flag){
                self_order_flag = false;
                getSelfOrder(self_order_page++);
                
            }
        
            if(scrollTop+winH+400>bodyH && $('#h_order').hasClass('person-tab-cur') && $('.my-start-order .order-receive').hasClass('person-tab-cur') && offer_order_flag){
                offer_order_flag = false;
                getOfferOrder(offer_order_page++);
            }
    });

    //获取接收订单
    function getOfferOrder(page_no){

            base.ajax({

                async:true,

                data:{
                    'method': 'paiwo.market.offer.self_list.get',
                    'page_no':page_no,
                    'page_size':20
                },

                success:function(data){
                    if(data.error_id==0){
                       var _data = data.response;
                       market_view.showRecentOffer(_data.order_list);
                       if(_data.page_no*_data.page_size<=_data.count){
                            offer_order_flag = true;
                       }else{
                            offer_order_flag = false;
                       }
                    }else{
    //                  slideMessage('网络错误..');
                    }
                },

                error:function(data){
    //                slideMessage('网络错误');
                }

            });

        }


   
 








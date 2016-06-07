var ruser = {};
var nameInput = $('.information_ul_nametext');
var r_gender;

//(function(){
//    var img = new Image();
//    img.onload = function(){
////         $('.backs').css({transform: 'translate(0px,-300px)'});
//    }
//    img.src = '/static/images/login/register_bac.jpg';
//    
//})()

function getUserInfo(){
    $.ajax({
         url: '/rest',
         type: 'POST',
         dataType: 'json',
         data:{
                data:JSON.stringify({
                    method: 'paiwo.user.info.get'})
            },
        success: function(data){
                ruser.info = data.response;
                ruser.info.method = 'paiwo.user.info.modify';
                r_gender = ruser.info.gender;
                if(ruser.info.user_avatar == ''){
                    ruser.info.user_avatar = '0';
                }
                setFirst();
        } 
    });
}

getUserInfo();

$('.radio').on('click', function(){
    var index = $(this).index();
    if(r_gender != index){
        r_gender = index;
        $('.radio a').html('');
        $(this).find('a').html('<i></i>');
        checkStatus();
    }
});

var set= null;
$('.information_ul_nametext').on('input propertychange', function(){
        clearTimeout(set);
        set = setTimeout(checkStatus, 700);
});



$('.setting-mes').eq(0).on('click', '.setting-next-allow', function(){
        if(checkStatus()){
           ruser.info.user_name = nameInput.val().trim();
           ruser.info.gender = r_gender;
           saveData();
           $('.user-name').html(ruser.info.user_name);
           $('.setting-mes').eq(0).hide();
           $('.setting-mes').eq(1).fadeIn(400);
              getRec();
        }
});   
    
    
$('#name_close').on('click', function(){
    //跳过第一个昵称和性别
    $('.setting-mes').eq(0).hide();
    $('.setting-mes').eq(1).fadeIn(400);
     $('.user-name').html(ruser.info.user_name);
      getRec();
});

$('#ava_close').on('click', function(){
    //跳过第二个头像剪裁
    $('.setting-mes').eq(1).hide();
    $('.setting-mes').eq(2).fadeIn(400);
});


$('.re-upload').on('click',function(){
    
    $('#tar-file').trigger('click');
});

$('.reg-upava-r').on('click', 'i', function(){
    $('#tar-file').trigger('click');
});
    
$('#tar-file').on('change', function(){
    var file = this.files[0];
    
    if(file.size>5100000){
//        slideMessage('请上传小于5M的文件');
        $('.reg-ava-err').html('<i></i><span>请上传小于5M的照片</span>');
        return;
    }
    $('.reg-ava-err').html('');//错误提示清空
    $('.re-upload').show(); //重新上场
    create_head(file);
});


$('#sava_head').on('click', function(){
    if(jcrop == null){
        $('#ava_close').trigger('click');
        return;
    }
    uploadHead();
    $('.setting-mes').eq(1).hide();
    $('.setting-rec').fadeIn(400);
});


$('#ava_close').on('click', function(){
    $('.setting-mes').eq(1).hide();
    $('.setting-rec').fadeIn(400);
  
    
});
$('.setting-rec-main').on('click', '.setting-care-not', function(){
        //关注
        
        var index = $(this).parents('.setting-rec-list').index();
        $(this).removeClass('setting-care-not').addClass('setting-care-yes');
        $(this).html('<i></i><span>已关注</span>');
        follow(rec[curpage*6 + index].user_id);
        rec[curpage*6 + index].flag = 1;
    
});

$('.setting-rec-main').on('click', '.setting-care-yes', function(){
        //取消关注
    
        var index = $(this).parents('.setting-rec-list').index();
        $(this).removeClass('setting-care-yes').addClass('setting-care-not');
        $(this).html('<i>+</i><span>关注</span>');
        unfollow(rec[curpage*6 + index].user_id);
        rec[curpage*6 + index].flag = 0;
        
});

$('.setting-rec-change').on('click', function(){
    //换一批
    curpage++;
    if(curpage == 10){
        curpage = 0;
    }
    showRec(curpage);
    
});



/*
    localstorage相关
*/

//首次注册
store.set('reg_first','true');

//注册完成跳转
$('#setting-end').on('click',function(){
    
    var state = store.get('campus_login');
    if(state){  //活动跳转
       store.remove('campus_login');
       window.location.href = '/activity/campus_contest';
    }else{ //正常跳转
       window.location.href = '/';
    }
    
    return false;
    
});











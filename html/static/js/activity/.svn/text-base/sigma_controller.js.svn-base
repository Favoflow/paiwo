var setM = null;
function showMessage(content){
    clearTimeout(setM);
    $('.setting_succeed').html(content).animate({top:0}, 400, function(){
            setM = setTimeout(hideMessage, 1800);
    
    });
}

function hideMessage(){
    $('.setting_succeed').animate({top:'-40px'},400);
}
   

//大图显示
var pic = document.getElementById('pic');
var oImg = new Image();
var is_load = false;
oImg.onload = function(){
	$('#pic').fadeIn(800);
	$('.sigma_content').css('height','auto');
	$('.loading').hide();
    pageTwo();
    main.fadeIn(400);
    $('.down-arrow').fadeIn(200);
    is_load =true;
};
oImg.src = '/static/images/sigma.png';

//传参
$('.sigma-up').click(function(){
    if(is_login == 0){
        loginInside.show();
        return;
    }else if(is_photographer==0){
        window.location.href = '/bephotog';
        return;
    }
	window.open('/album/new');
	store.set('sigmaTab','适马ART杭州');
});


//照片
var main = $('.search_main');
var photo_count = 0;
main.on('mouseenter', '.photo_block', function(){
    $(this).find('.photo_fixbox').stop().animate({'bottom':'0'}, 100, 'linear');

});
main.on('mouseleave', '.photo_block', function(){
    $(this).find('.photo_fixbox').stop().animate({'bottom':'-36px'}, 100, 'linear');

});
//点赞
main.on('click', '.photo_fixbox_like', function(e){
    if(is_login == 0){
        loginInside.show();
        return false;
    }
    e.stopPropagation();
    doLike($(this).parents('.photo_block'));

});

//取消赞
main.on('click', '.photo_fixbox_liked' , function(e){
    e.stopPropagation();
    unLike($(this).parents('.photo_block'));

});

//取消照片收藏夹
main.on('click', '.photo_fixbox_dinged', function(e){
    e.stopPropagation();
    var id = $(this).parents('.photo_block').attr('data');
       unCollect(id); 
});
main.on('click', '.photo_fixbox_ding', function(e){
        if(is_login == 0){
            loginInside.show();
            return false;
        }
        e.stopPropagation();
        var t = $(this).parents('.photo_block');
        var path = t.attr('path');
        var id = t.attr('data');
      $('.store_album_img').attr('src', 'http://image.paiwo.co/'+path+'@!280x280');
        $('#collect-back').fadeIn(100);
        paiwoPhoto.data.photo_id = id;
  
});


function getPos(obj){   //取图片位置
    var t=0;
    while(obj){
        t+=obj.offsetTop;
        obj=obj.offsetParent;
    }
    return t;
};



//懒加载
window.onload=window.onscroll=function(){
    //页面实际高度
    var scrollBottom = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);//-309
    var mainH = main[0].scrollHeight + getPos(main[0]);
    if(scrollBottom>mainH && is_load) {
        pg_no++;
        pageTwo();
    } 
    
}

//点击大图
main.on('click', '.photo_block', function(){
       var _id = this.getAttribute('data');
        history.pushState && history.pushState({title:'show'},'','/photos/'+_id);
        paiwoPhoto.init(_id);
        paiwoPhoto.trg('showpic');
        paiwoPhoto.tool.scrollShow();
});

//点击进入摄影师主页
main.on('click', '.photo_fixbox>a', function(e){
    e.stopPropagation();
});









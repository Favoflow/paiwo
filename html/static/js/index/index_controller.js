
//初始化localstorange
  store.remove('tag');
  $('#area_input').val('');

//top_bar
$('.top-tab').addClass('top_tab_opa');
var topTab = $('.top-tab');
window.addEventListener('scroll',function(){
	var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
	if(scrollT>40){
		topTab.removeClass('top_tab_opa');
        $('.header-banner-pos').css('opacity',0);
	}else{
		topTab.addClass('top_tab_opa');
        var opa = (40-scrollT)/40;
        $('.header-banner-pos').css('opacity',opa);
	}
});


//document click事件
  function closeSelect(){  
    $('.banner_select').fadeOut(200);
    $('#banner_sel_type').find('i').removeClass('active');
  }

  function closePlace(){
    $('.place-choose').fadeOut(200);
    $('.pla-cho-pro2box,.place-choose s').css('display','none');
  }

  function closeSecondPlace(){
    $('.pla-cho-pro2box,.place-choose s').css('display','none');
  }

  $(document).click(function(){
    closeSelect();
    closePlace();
    closeSecondPlace();
  });
  

  //banner接拍类型选择
  $('#banner_sel_type').on('click',function(ev){
    if($(this).find('.banner_select').css('display')=='block'){
      $('#banner_sel_type').find('i').removeClass('active');
      $(this).find('.banner_select').hide();
    }else{
      $('#banner_sel_type').find('i').addClass('active');
      $(this).find('.banner_select').show();
    }
    ev.stopPropagation();
  });
   
  $('#banner_sel_type').on('click','dd',function(){
    var type_name = $(this).html(); //类型名称
    var   type_id = $(this).attr('data-code'); //类型id
        store.set('sel_type',type_id); //存储localstorange
    $('#banner_sel_type').find('span').html(type_name).attr('data-code',type_id);
  });

  //约拍地区输入
  var input_index = -1;
  var input_now = null;
  $('#area_input').on('keyup',function(ev){
    //if(ev.keyCode==8)return;
    if(ev.keyCode==40 || ev.keyCode==38)return;
    var location = $(this).val();
    var len = location.length;
    if(len==0){
      $('.banner_select_area').hide();
    }
    $('.banner_select_area').html('');
    for(var i =0;i<areaName.length;i++){
      for(var j=0;j<areaName[i].length;j++){
        if(!len)return;
        if(location == areaName[i].substring(0,len)){
          var area = '<dd data-code="'+areaCode[i]+'">'+areaName[i]+'</dd>';
          $('.banner_select_area').append(area).show();
          break;
        }
      }
    }
    
    if(ev.keyCode==13){
      $('#area_input').val($('#area_input').val());
      $('.banner_select_area').hide();
    }
    input_now = $('#area_input').val();
  });
  
  $('#area_input').on('keydown',function(ev){
    if(ev.keyCode==40){  //向下
      input_index++;
      if(input_index==5){
        input_index=-1;
      }
      if(input_index==$('.banner_select_area').children().size()){
        input_index = -1;
      }
      
      if(input_index==-1){
        $('#area_input').val(input_now);
        $('.banner_select_area').children().css('color','#b6b3ad');
      }else{
        $('.banner_select_area').children().css('color','#b6b3ad');
        $('.banner_select_area').children()[input_index].style.color = '#414141';
        var sel_area_down = $('.banner_select_area').children()[input_index].innerHTML;
        var sel_area_down_id = $('.banner_select_area').children()[input_index].getAttribute('data-code');
        $('#area_input').val(sel_area_down).attr('data-code',sel_area_down_id);
         store.set('place_id',sel_area_down_id); //storage存储
      }
    }else if(ev.keyCode==38){  //向上
      input_index--;
      if(input_index==-2){
        if($('.banner_select_area').children().size()>5){
          input_index = 4;
        }else{
          input_index = $('.banner_select_area').children().size()-1;
        }
      }
      if(input_index==-1){
        $('#area_input').val(input_now);
        $('.banner_select_area').children().css('color','#b6b3ad');
      }else{
        $('.banner_select_area').children().css('color','#b6b3ad');
        $('.banner_select_area').children()[input_index].style.color = '#414141';
        var sel_area_up = $('.banner_select_area').children()[input_index].innerHTML;
        var sel_area_up_id = $('.banner_select_area').children()[input_index].getAttribute('data-code');
        $('#area_input').val(sel_area_up).attr('data-code',sel_area_up_id);
      }
      
    }
  });
   
  $('#banner_sel_area').on('click','dd',function(ev){
    var area_name = $(this).html();
    var area_id = $(this).attr('data-code');
    $('#area_input').val(area_name).attr('data-code',area_id);
    $('#banner_sel_area').find('.banner_select_area').hide();
    ev.stopPropagation();
    store.set('place_id',area_id); //storage存储
  });

  //下拉框点击
  $('.select').click(function(evs){
    $(this).find('dl').toggle().parent('.select').siblings().find('dl').hide();
    $(this).parents('li').siblings('li').find('dl').hide();
    ev.stopPropagation();
  });

  //订单私信hover效果
  $('.yue-button').on('mouseenter',function(){
    $(this).find('i').removeClass('yue-button-i').addClass('yue-button-ihover');
  });
  $('.yue-button').on('mouseleave',function(){
    $(this).find('i').removeClass('yue-button-ihover').addClass('yue-button-i');
  });
  
  //点击显示私信
  $('.yue-button').click(function(){
      if(is_login == 0){
        loginInside.show();
        return;
      }
      $('#top_message').trigger('click');
      PWS.addTalk(this.getAttribute('data-code'));
  });

  //摄影师主页跳转
  $('.index-bazzar-phers').on('click','.header_textbox_headimg',function(){
     var ph_host = $(this).attr('data-code');
     window.open('/'+ph_host);
  });
  $('.index-bazzar-phers figcaption').on('click','a',function(ev){
     var ph_host = $(this).attr('data-code');
     window.open('/'+ph_host);
  });

  $('#photog1 .index-phers-head,#photog1 h3').click(function(){
  	window.open('/Anotherkye');
      return false;
  });

  $('#photog2 .index-phers-head,#photog2 h3').click(function(){
  	window.open('/parasolka');
       return false;
  });

  $('#photog3 .index-phers-head,#photog3 h3').click(function(){
  	window.open('/jieyin');
       return false;
  });

  $('#photog4 .index-phers-head,#photog4 h3').click(function(){
  	window.open('/toinoyang');
       return false;
  });


  //发布需求订单页面跳转
  $('.banner_submit').click(function(){
     window.location.href = '/market/create';
     store.set('refresh','outpage');
     //输入地区选择判断
     var photoAreaId = $('#area_input').attr('data-code'),  //获取约拍地区id
          photoArea = $('#area_input').val();  //获取约拍地区
      if(photoAreaId == ''){  //填写数据
        //判断输入地点是否在数据中
        for(var i=0;i<areaName.length;i++){
          if(photoArea==areaName[i]){     //在数据中
            photoAreaId = areaCode[i];
            store.set('place_id',photoAreaId);
          }
        }         
      }
  });

  $('#people_tag').click(function(){
      store.set('tag','1');
  	  window.location.href = '/gallery';
  	
  });

  $('#japan_tag').click(function(){
      store.set('tag','2');
      window.location.href = '/gallery';
    
  });

  $('#wb_tag').click(function(){
       store.set('tag','3');
       window.location.href = '/gallery';
   
  });

  $('#goods_tag').click(function(){
      store.set('tag','4');
      window.location.href = '/gallery';
    
  });

  $('#emotion_tag').click(function(){
       store.set('tag','5');
       window.location.href = '/gallery';
   
  });

  $('#street_tag').click(function(){
      store.set('tag','6');
      window.location.href = '/gallery';
    
  });

  $('#kid_tag').click(function(){
     store.set('tag','7');
     window.location.href = '/gallery';
   
  });

  $('#view_tag').click(function(){
     store.set('tag','8');
  	 window.location.href = '/gallery';

  });
 
//搜索
$('.header-banner-seabtn').on('click',function(){
    var _val = $('.home_search_input').val();
    _val = _val.replace(/^\s+|\s+$/g,"").replace(/\s+/g,",");
    window.location.href = '/search?q='+_val;
});

$('.home_search_input').on('keydown',function(ev){
    if(ev.keyCode==13){
         var _val = $('.home_search_input').val();
        if(_val=='')return;
        _val = _val.replace(/^\s+|\s+$/g,"").replace(/\s+/g,",");
        window.location.href = '/search?q='+_val;
    }
});


//迭代轮播
function LeftAuto(){
    Left();
    var aa = $('.phers-tab').find('a'),
        font = $('.phers-tab .active').index(),
        next = font == aa.length-1?0:font+1;
    aa.eq(font).removeClass('active');
    aa.eq(next).addClass('active');
}

var s_data = {};
    s_data.t = setInterval(LeftAuto,5000);
    s_data.index = 1;

//$('.phers-box-div').on('mouseenter','.lib-box',function(){
//    clearInterval(s_data.t);
//});
//$('.index-phers').on('mouseleave','.lib-box',function(){
//    s_data.t = setInterval(LeftAuto,5000);
//});

$('.phers-box-div').hover(function(){
clearInterval(s_data.t);
}, function(){
s_data.t = setInterval(LeftAuto,5000);
});

function Left(index) {
    if(index){
      s_data.index = index;
    }else{
      s_data.index++;
    }
    if(s_data.index == 4){
      $('.phers-box-div').stop().animate({left: -(s_data.index-1)*1134},700,function(){
              $(this).css('left', 0);
      });
      s_data.index = 1;
    }else{
      $('.phers-box-div').stop().animate({left: -(s_data.index-1)*1134},700);
   }
};

$('.phers-tab').on('click','a',function(){    
    if($(this).hasClass('active')){
        return;
    }
    
    var index = $(this).index()+1;
    
     clearInterval(s_data.t);
     s_data.t = setInterval(LeftAuto,5000);
    
    Left(index);
    $(this).addClass('active').siblings().removeClass('active');
});

//点击关注
var phers = $('.index-phers');

phers.on('click', '.photog_add' , function(){

    if(is_login == 0 ){
        loginInside.show();
        return;
      }
    
    
        
     var id = $(this).attr('data');
    
    if(top_data.user_id == id){
        showMessage('不能关注自己');
        return;
    }
      doFollow(id);
});

//取消关注
phers.on('click', '.photog_added_2,.photog_added_4', function(){
    if(is_login == 0 ){
        loginInside.show();
        return;
    }
     var id = $(this).attr('data');
      unFollow(id);
});

phers.on('mouseenter','.photog_added_2,.photog_added_4',function(){
    $(this).html('取消');
});
phers.on('mouseleave','.photog_added_2',function(){
    $(this).html('<i></i>已关注');
});
phers.on('mouseleave','.photog_added_4',function(){
    $(this).html('<i></i>互相关注');
});


$('.header-arrow').on('click',function(){
   $("html,body").stop().animate({scrollTop:600},300); 
});

//立即探索
var look_flag = false;
$('.header-banner-look').on('click',function(){
   if(is_login == 0){
        loginInside.show();
        return;
    } 
    window.location.href = '/feed';
    look_flag = true;
});
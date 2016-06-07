//tab切换
$('.pg_info li').tap(function(){
      if($('.pg_info li').index($(this))==0){
        $('.pg_border').animate({'-webkit-transform':'translate3d(0,0,0)'},200);
        $('.pg_album').show();
        $('.pg_msg').hide();
      }
      else if($('.pg_info li').index($(this))==2) {
        $('.pg_border').animate({'-webkit-transform':'translate3d(1.42rem,0,0)'},200);
        $('.pg_album').hide();
        $('.pg_msg').show();
      }
      $(this).addClass('pg-info-cur').siblings().removeClass('pg-info-cur');
 });

//简介下拉
 $('.ifspread').tap(function(){
    if($(this).parent('div').find('.spread-main').css('display')== 'none') {
      $(this).parent('div').find('.spread-main').css({'display':'block'});
      $(this).animate({'-webkit-transform':'rotate(0)','transform':'rotate(0)'},200);
    }
    else {
      $(this).parent('div').find('.spread-main').css({'display':'none'});
      $(this).animate({'-webkit-transform':'rotate(180deg)','transform':'rotate(180deg)'},200);
    }
  });
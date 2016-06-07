//导航
$ (function(){
	$('.column').tap(function(){ 
	  $('.nav').animate({'-webkit-transform':'translate3d(0,100%,0)','transform':'translate3d(0,100%,0)',
	  					'opacity':'1'},'cubic-bezier(0.1,0.57,0.1,1)',800,function(){$('.top-bar').css('display','none');}
	  					); 
	});

	$('.shrink').tap(function(){
	  $('.top-bar').css('display','block');
	  $('.nav').animate({'-webkit-transform':'translate3d(0,0,0)','transform':'translate3d(0,0,0)',
	  		'opacity':'0'},'cubic-bezier(0.1,0.57,0.1,1)',800);
	});
});
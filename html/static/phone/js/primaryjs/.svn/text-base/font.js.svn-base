$(function(){
	font();
	imgHeight();
	function font(){
	  var clientW=document.documentElement.clientWidth;
	  var html = document.getElementsByTagName('html')[0];
	  var body = document.getElementsByTagName('body')[0];
	  if(clientW<500) {
		 clientW = parseInt(clientW/8);
		 html.style.fontSize = clientW+'px';
		 body.style.fontSize = clientW+'px';
	  	//$('html').css({'font-size':parseInt(clientW/8)+'px'});
	  }
	  else if(clientW>=500){
	  	clientW=500;
		clientW = parseInt(clientW/8);
		html.style.fontSize = clientW+'px';
		body.style.fontSize = clientW+'px';
	  	//$('html').css({'font-size':parseInt(clientW/8)+'px'});
	  }
	};
	function imgHeight() {
		var imgWidth = $('.photos-list img').css('width');
		$('.photos-list img').css('height',imgWidth);
	}
	window.addEventListener('resize',function(){
		font();
		imgHeight();
	},false);
});

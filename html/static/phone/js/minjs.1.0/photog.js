var get_more = document.querySelector('.seminar-more'), //加载中
	commend_box = document.querySelector('.commend-seminar');
var commendpg = {
	
	page:1,
	
	page_size:4,
	
	b_load:true,
	
	commend_box_pos:0,
	
	is_avatar:function(url){
		var avatar_url = '';
		if(url=='0'){
			avatar_url = '/static/phone/images/user_head.gif';
		}else{
			avatar_url = 'http://image.paiwo.co/'+url;
		}
		return avatar_url;
	},
	
	recommend_banner:function(){    //置顶推荐
		 $.ajax({
			url: '/a/recommend/photographer/post/top/get',
			type: 'POST',
			dataType: 'json',
			async: false,
			success: function(data){
				if(data.error_id==0){
					console.log(data);
					var banner_info = data.result,
						_time = document.querySelector('.commend-time'),
						_title = document.querySelector('.commend-banner-tit span'),
						_subtitle = document.querySelector('.commend-banner-tit h2'),
						_avatar = document.querySelector('.summary-pg img'),
						_name = document.querySelector('.summary-pg span'),
					    banner_bg = document.querySelector('.commend-banner');
						banner_bg.setAttribute('data-code',banner_info.post_id);
					_time.innerHTML = banner_info.post_date;
					_title.innerHTML = banner_info.post_second_title;
					_subtitle.innerHTML = banner_info.post_title;
					_avatar.setAttribute('src',commendpg.is_avatar(banner_info.avatar));
					_avatar.parentNode.setAttribute('href','/'+banner_info.user_host);
					_name.innerHTML = banner_info.nick_name;
					banner_bg.style.backgroundImage = 'url(http://image.paiwo.co/'+banner_info.big_photo+'@!banner)';
				}
				
				
			},
			error: function(data){

			}  
		});
	},
	
	get_pos:function(obj){   //取图片位置
		var l=0;
		var t=0;
		while(obj){
			l+=obj.offsetLeft;
			t+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return {left:l, top:t};
	},
	
	
	get_pglist:function(){    //推荐摄影师列表
		 $.ajax({
			url: '/a/recommend/photographer/post/list/get',
			type: 'POST',
			dataType: 'json',
			async: false,
			data: {page_no: commendpg.page,
				   page_size:commendpg.page_size},
			success: function(data){
//				console.log(data);
				if(data.error_id==0){
					var commendpg_info = data.result.post_list, //推荐列表
						_commend = document.querySelector('.commend-seminar-main'), //推荐列表父级
						str=_commend.innerHTML;
					
					//是否出现加载更多按钮
					if(commendpg_info.length>=4){
						get_more.style.display = 'block';
					}else{
						get_more.style.display = 'none';
						commendpg.b_load = false;
					}
					for(var i=0;i<commendpg_info.length;i++){
					str+='<div class="seminar-area">'+
						'<div class="seminar-img"><a href="/m/photog/'+commendpg_info[i].post_id+'"><img src="http://image.paiwo.co/'+commendpg_info[i].post_big_photo+'@!280x280"></a></div>'+
						'<div class="seminar-txt">'+
							'<h2 class="seminar-tit" data-code="'+commendpg_info[i].post_id+'"><a href="/m/photog/'+commendpg_info[i].post_id+'">'+commendpg_info[i].post_title+'</a></h2>'+
							'<div class="seminar-msg">'+
								'<span class="seminar-time">'+commendpg_info[i].post_date+'</span>'+
								'<a href="/'+commendpg_info[i].user_host+'"><span class="seminar-name">@'+commendpg_info[i].nick_name+'</span></a>'+	
							'</div>'+		
						'</div>'+
					'</div>';
					}
					_commend.innerHTML = str; 
				}
				
			},
			error: function(data){

			}  
		});
	}
};

//初始化
(function(){
	commendpg.recommend_banner();
	commendpg.get_pglist();
	commendpg.commend_box_pos = commendpg.get_pos(commend_box);
})();


////加载更多
//get_more.addEventListener('click',function(){
//	
//},false);


//点击banner
$('.commend-banner').on('click',function(){
	var _id = $(this).attr('data-code');
	window.location.href = '/photog/'+_id;
});


window.addEventListener('scroll',function(){
	var winH = document.documentElement.clientHeight,
		commendScroll = commend_box.scrollHeight + commendpg.commend_box_pos.top,
		scrollT = document.documentElement.scrollTop || document.body.scrollTop,
		scrollBottom = scrollT+winH;
//		console.log(commendScroll);
		if(scrollBottom>(commendScroll-120) && commendpg.b_load){
			commendpg.page++;
			commendpg.get_pglist();
		}
},false);
$(function(){function t(){var t=document.documentElement.clientWidth,e=document.getElementsByTagName("html")[0],n=document.getElementsByTagName("body")[0];500>t?(t=parseInt(t/8),e.style.fontSize=t+"px",n.style.fontSize=t+"px"):t>=500&&(t=500,t=parseInt(t/8),e.style.fontSize=t+"px",n.style.fontSize=t+"px")}function e(){var t=$(".photos-list img").css("width");$(".photos-list img").css("height",t)}t(),e(),window.addEventListener("resize",function(){t(),e()},!1)});
$(function(){$(".column").tap(function(){$(".nav").animate({"-webkit-transform":"translate3d(0,100%,0)",transform:"translate3d(0,100%,0)",opacity:"1"},"cubic-bezier(0.1,0.57,0.1,1)",800,function(){$(".top-bar").css("display","none")})}),$(".shrink").tap(function(){$(".top-bar").css("display","block"),$(".nav").animate({"-webkit-transform":"translate3d(0,0,0)",transform:"translate3d(0,0,0)",opacity:"0"},"cubic-bezier(0.1,0.57,0.1,1)",800)})});
//store_button_submit submit
var  photo_tm='<div data="${photo_id}" class="photo-data">'+
            '<a class="photo" href="javascript:;"><img style="width:280px;height:280px"'+'src="${is_photo_url(photo_path)}" class="photo-img"/></a>'+
		'<i class="inner_liked_img"></i>'+
			'<p class="photo_fixbox"><a href="/${author_domain}" target="_blank">${author_name}</a>'+
			'<button class="${isLike(is_like)}" data="${photo_id}" path="${photo_path}"></button>'+
		'</p>'+
    '</div>';


var photo_info_tm = '<p class="photo_fixbox"><a href="${author_domain}" target="_blank">${author_name}</a>'+
			'<button class="${isLike(is_like)}" data="${photo_id}" path="${photo_path}"></button>'+
		'</p>';
var has_collect = 0;

var  search_tm='<div data="${photo_id}" class="photo-data">'+
            '<a class="photo" href="javascript:;"><img style="width:280px;height:280px"'+'src="${is_photo_url(photo_path)}" class="photo-img"/></a>'+
		'<i class="inner_liked_img"></i>'+
			'<p class="photo_fixbox">'+
            '<a href="${author_domain}" target="_blank">${author_name}</a>'+
			'<button class="${isLike(is_like)}" data="${photo_id}" path="${photo_path}"></button>'+
		'</p>'+
    '</div>';



//检测是否有收藏夹
function checkCollect(){
    if($('.store_album_select li').length>0){
        $('.store_album_input_none').hide();
        $('.store_album_input').show();
    }else{
        $('.store_album_input_none').show();
        $('.store_album_input').hide();
    }
}

//检测是否已经选择了收藏夹
function checkSelect(){
    if($('.store_album_input').html()=="请选择一个收藏夹"){
         $('#store_btn').removeClass().addClass('gray_submit');
    }else{
        $('#store_btn').removeClass().addClass('store_button_submit').addClass('submit');
    }
}


var help = {
	collect:function(is){
		if(is=='1'){
			return 'collected20.png';
		}else{
			return 'collect20.png';
		}

	},
	like:function(is){
		if(is=='1'){
			return 'liked20.png';
		}else{
			return 'like20.png';
		}
	},
	collectlist:function(favorite_list){
		var str = '';
		for(var i =0;i<favorite_list.length;i++){
			if(favorite_list[i].is_default==1){
				str+='<li class="store_select_li_cur" data="'+favorite_list[i].favorite_id+'">'+favorite_list[i].favorite_name+'</li>';
				var target = $('.store_album_input');
				target.text(favorite_list[i].favorite_name);
				target.attr('data',favorite_list[i].favorite_id);
			}else{
				str+='<li data="'+favorite_list[i].favorite_id+'">'+favorite_list[i].favorite_name+'</li>';
			}
		}
		return str;		  
	}
}

function check_navi(){
    var w1 = document.documentElement.clientWidth;
    $('.top-tab-con').css('width', '300px');
    $('.top-tab').css('margin-left', '0px');
    if(w1>=1658){
        var lens = (w1 - 100 - 280*5 - 4*15)/2;
        $('.top-tab-con').css('margin-right', lens + 'px');
        return;
    }else if(w1<1658 && w1>=1347){
        var lens = (w1 - 100 - 280*4 - 3*15)/2;
        $('.top-tab-con').css('margin-right', lens + 'px');
    }else if(w1<1347 && w1>=1035){
        var lens = (w1 - 100 - 280*3 - 2*15)/2;
        $('.top-tab-con').css('margin-right', lens + 'px');
    }
    else if(w1<1035){
        var lens = (w1 - 100 - 280*2 - 1*15)/2;
        $('.top-tab-con').css('margin-right', lens + 'px');
    }
}





function isLike(is){
	if(is == 1){
		return 'photo_fixbox_liked';	
	}
		return 'photo_fixbox_like';
}
function isFavorite(is){
	if(is == 1){
		return 'photo_fixbox_dinged';
	}
		return 'photo_fixbox_ding';
}



function islogin(){
	if(is_login ==0){
		window.location.href="/";
		return false; 
	}
	return true;

}


//滚轮方向判断
function addwheel(obj,fn){
    function fnwheel(ev){
        var oEvent = ev || event;
        var bDown = false;
        if(oEvent.wheelDelta){
            if(oEvent.wheelDelta<0){
                bDown = true;
            }else{
                bDown = false;
            }
        }else{
            if(oEvent.detail>0){
                bDown = true;
            }else{
                bDown = false;
            }
        }
		
        fn && fn(bDown);
		if(bScroll){
			return true;
		}else{
			oEvent.preventDefault && oEvent.preventDefault();
			return false;
		}
 }
    
    if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
        obj.addEventListener('DOMMouseScroll',fnwheel,false);
    }else {
        obj.onmousewheel = fnwheel;
    }
}

//cookie设置
function addCookie(name,value,iDay){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	document.cookie=name+'='+value+';path=/;expires='+oDate.toGMTString();
}

//cookie读取
function getCookie(name){
	var arr=document.cookie.split('; ');
	for(var i=0; i<arr.length; i++){
		var arr2=arr[i].split('=');
		if(arr2[0]==name){
			return arr2[1];	
		}
	}
	return '';
}


//删除cookie
function removeCookie(name){
	addCookie(name,'1',-1);
}

//显示信息
var setM;
function showMessage(content){
	clearTimeout(setM);
    $('.message-box').html(content).animate({top: 0}, 400,function(){
		setM = setTimeout(hideMessage, 1500);
	});
}

function hideMessage(){
	$('.message-box').animate({top: '-52px'}, 400)
}


//取图片位置
function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:l, top:t};
}


//显示头像
function showAva(str){
	if(str.length ==0){
		return "static/images/user_head.gif";
	}
    
	return "http://image.paiwo.co/"+str;
}

//显示封面

//显示性别
function showTheGender(data){
    
	if(data.gender == 1){
		$('.host-nick').html('<span>'+data.host_name+'<i class="photog-male"></i></span>');
	}else if(data.gender == 2){
		$('.host-nick').html('<span>'+data.host_name+'<i class="photog-female"></i></span>');
	}else{
		$('.host-nick').html('<span>'+data.host_name+'</span>');
	}

}
function showGender(data){
    
	if(data == 1){
		return 'photog-male';
	}else if(data == 2){
		return 'photog-female';
	}

}

function showGen(data){
	if(data==1){
		return '男';
	}else if(data == 2){
		return '女'
	}else{
		return '';
	}

}

function showbir(data){	
	var data = data.split('-');
	
	if(data[0] == '0'||data.length==1){
		return '';
	}
	return data[0]+'年'+data[1]+'月'+data[2]+'日';
}
//显示摄影师location
function showLocaton(data){
    if(data=='')return '';
    data = data +'-00';
    if(typeof allArea[data]!= undefined){
         document.querySelector('.textbox_palce').innerHTML = allArea[data];
    }
}

function showLoc(data){
    if(data=='')return '';
	data = data +'-00';
	if(typeof allArea[data]!= undefined){
         return allArea[data];
    }
}

//显示服务所在地
function showService(data){
	if(data.length ==0){
		return;
	}

	var tm = '';
	for(var i =0; i<data.length; i++){
		tm+='<dd>'+allArea[data[i]]+'<dd>';
	}
	$('.studio-info-place dl').html(tm);
}

//显示接拍类型
function showTypes(data){
	if(data.length ==0){
		return;
	}
	var objtype = ['人像写真','婚纱摄影','婚礼跟拍','家庭儿童','旅行跟拍','商业服务','其他'];
	var arr = data.toString(2).split('').reverse();
	var tm ='';
	for(var i=0;i<arr.length;i++){
		if(arr[i]==1){
			tm='<dd>'+objtype[i]+'</dd>';
			$('.studio-info-type dl').append(tm);
		}
	}    
	
}

//显示是否关注
function showFollow(data){
    var s  = $('.cieclebox_concen');
	if(data == 2){
        s.html('已关注');
        s.attr('data_code','已关注');
	}
}

//判断是否是本人
function isSelf(){
	if(host.is_self){
		$('.stuido_header_editicon').show();
        $('.title_photo_delete').show();
        $('.studio_cieclebox').hide();
	}else{

		$('.title_photo_edit').hide();
        $('.title_photo_delete').hide();
		$('.stuido_header_editicon').hide();//背景图
		$('.studio_cieclebox').show();
	}
}

//字符串
function filterChar(str, weight){
	var count = 0;
	var tm = '';
	if(str.length<5){
		return str;	
	}
	for(var i = 0; i<str.length; i++){
		if(str.charCodeAt(i)>255){
			count+=14;
		}else{
			count+=7.5;
		}
		tm+=str[i];
		if(count >=154){
			return tm+='..';	
		}	
	}
	return tm;	
}

//显示是否赞过
function isLike(data){

	if(data == 1){
		return 'photo_fixbox_liked';
	}else{
		return 'photo_fixbox_like';
	}

}
//显示是否赞过显示

function isLike2(data){
	if(data){
		return 'liked-btn';
		
	}else{
		return 'like-btn';
	}
	
}

function isRec(data){
	if(data){
		return 'recd-btn';
	}else{
		return 'rec-btn';
	}
}

// 是否删除
function isDelete(data){
	if(data){
		return "studio-trend-delete"
	}else{
		return "";
	}
}

//显示封面
function showAlbumone(str){
	if(str.length ==0){
		return 'style="background-color:#fff"';
	}
    if(typeof(str[0].photo_path) == undefined){
        return 'src="http://image.paiwo.co/'+str.photo_path+base.retinaPixel['a560']+'"';
    }
    
	return 'src="http://image.paiwo.co/'+str[0].photo_path+base.retinaPixel['a560']+'"';
}

function showAlbumone3(str){
	if(str.length ==0){
		return '<p class="ph-dete"><img src="/static/images/cute_bac/delete.png"><i>原内容已被删除</i></p>';
	}
    
	return '<span></span>'+
	'<div class="studio-trend-img" style="background-image:url(http://image.paiwo.co/'+str[0].photo_path+'@!1d5)">'+
	'</div>';
	// 'style="background-image:url(http://image.paiwo.co/'+str[0].photo_path+'@!1d5)"';
}
function showAlbumone2(str){
	if(str.length ==0){
		return '';
	}
    
	return 'style="background-image:url(http://image.paiwo.co/'+str[0].photo_path+'@!1d5)"';
}

function showMy(str){
    if(str.length ==0){
		return 'style="background-color:#fff"';
	}
    
	return 'src="http://image.paiwo.co/'+str+'@!560x560"';
}



//显示小封面
function showAlbumother(data){
	var tm = '';
	for(var i=1;i<5;i++){
		if(data[i] == undefined || data[i].photo_path.length == 0){
			if(data[i] == undefined){
              tm+='<li></li>';  
            }else{
              tm += '<li><img src="/static/images/pic-deleted.png"></li>';
            }
		}else{
			tm+='<li><img data='+data[i].photo_id+' src="http://image.paiwo.co/'+data[i].photo_path+'@!280x280'+'"></li>'
		}
	}
    
	return tm;
}


var setM;
//显示顶部信息
function showMessage(content){
	clearTimeout(setM);
	$('.message-box').html(content).animate({top: 0}, 400,function(){

		setM = setTimeout(hideMessage, 1500);
	});
}

function hideMessage(){
	$('.message-box').animate({top: '-27px'}, 400);
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
        oEvent.preventDefault && oEvent.preventDefault();
		return false;
       
    }
    
    if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
        obj.addEventListener('DOMMouseScroll',fnwheel,false);
    }else {
        obj.onmousewheel = fnwheel;
    }
}
//显示大图背景
function showBigBack(str){
    home_info.auth = '';
    if(str !=''){
        $('.banner_bg').css('background-image','url(http://image.paiwo.co/'+str+'@!banner)');
//        .original-selected-box li[data-code="'
        if($('.header-back-online li[data-file="'+str+'"]')){
            $('.header-back-online li[data-file="'+str+'"]').addClass('header-back-select');
            $('.stuido_header_sign').html($('.header-back-online li[data-file="'+str+'"]').attr('data-auth'));
            home_info.auth = $('.header-back-online li[data-file="'+str+'"]').attr('data-auth');
        }
    }else{
        $('.banner_bg').css('background-image','url(/static/images/bg.jpg)');
        $('.stuido_header_sign').html('<i style="font-size:18px;vertical-align:bottom;">©</i>James Woo');
    }

    
}


//显示时间
function showTime(data){

	var oDate = new Date(),
		dataArr = data.split(' '),
		oYear = dataArr[0].split('-'),
		oHour = dataArr[1].split(':');
		oDate.setFullYear(oYear[0],oYear[1]-1,oYear[2]);
		oDate.setHours(oHour[0],oHour[1],oHour[2],0);
    
	var oMs = oDate.getTime();
    
    var nDate = new Date(),
		nMs = nDate.getTime();
	var dMs = nMs-oMs,
		odate = [oDate.getFullYear(),oDate.getMonth(),oDate.getDate()],
		ndate = [nDate.getFullYear(),nDate.getMonth(),nDate.getDate()];
    if(dMs<60000){                     //1分钟内
    	return '刚刚';
    }else if(dMs>=60000&&dMs<3600000){ //1小时内
    	var t = parseInt(dMs/60000);
    	return t+'分钟前';
    }else if(dMs>=3600000&&dMs<21600000){//6小时内
    	var t = parseInt(dMs/3600000)
    	return t+'小时前';
    }else if(dMs>=21600000&&odate==ndate){
    	return '今天'+oDate.getHours()+':'+oDate.getMinutes();
    }else if(dMs>=21600000&&odate[0]==ndate[0]&&odate[1]==ndate[1]&&ndate[2]-odate[2]==1){
    	return '昨天'+oDate.getHours()+':'+oDate.getMinutes();
    }else {
    	var month = oDate.getMonth()+1;
    	return oDate.getFullYear()+'/'+month+'/'+oDate.getDate();
    }
 
    
}


function tempshowPhoto(photo_list){
    if(photo_list.length == 0){
        return '<p class="ph-dete"><img src="/static/images/cute_bac/delete.png"><i>原内容已被删除</i></p>';
    }else{
        return '<img src="http://image.paiwo.co/'+photo_list[0].photo_path+base.retinaPixel['600']+'" width="600" height="600">';
    }
}


function followState(data){
	if(data==1||data == 3){
		return '关注';
	}else if(data == 2||data== 4){
		return '已关注';
	}
}


//活动状态
function put_avtivity_state(state){
//    if(state==1){  //活动进行中
//        return '<p class="studio-act-status studio-act-ing">进行中...</p>';
//    }else if(state==2){ //活动即将开始
//        return '<p class="studio-act-status studio-act-will">即将开始...</p>';
//    }else if(state==3){  //活动已结束
//        return '<p class="studio-act-status studio-act-wait">已结束...</p>';
//    }else{
//        return '';
//    }
    return '';
}


function putActivityTime(start,end){  //输出活动时间
    
    var startTime = start.split(' ')[0].split('-'),
        endTime = end.split(' ')[0].split('-'),
        oDate = new Date();

    if(startTime[0]==oDate.getFullYear()){
        startTime.splice(0,1);
    }

    if(endTime[0]==oDate.getFullYear()){
        endTime.splice(0,1);
    }

    return startTime.join('/')+' - '+endTime.join('/');

}
    
function putActivityState(start,end){  //输出活动状态
        
        var startDate = start.split(' ')[0].split('-'),
            startTime = start.split(' ')[1].split(':'),
            endDate = end.split(' ')[0].split('-'),
            endTime = end.split(' ')[1].split(':'),
            nowTime = new Date().getTime(),
            setStartTime = new Date(),
            setEndTime = new Date();
    
            setStartTime.setFullYear(startDate[0],startDate[1]-1,startDate[2]);
            setStartTime.setHours(startTime[0],startTime[1],startTime[2],0);
            setEndTime.setFullYear(endDate[0],endDate[1]-1,endDate[2]);
            setEndTime.setHours(endTime[0],endTime[1],endTime[2]);
            
//            console.log(nowTime,setStartTime,setEndTime);
        
            setStartTime = setStartTime.getTime();
            setEndTime = setEndTime.getTime();
            
            if(nowTime<setStartTime){  //即将开始
                return '<span class="studio-active-cond studio-active-will"><i></i>即将开始</span>';
            }else if(nowTime>=setStartTime && nowTime<=setEndTime){  //正在进行
                return '<span class="studio-active-cond studio-active-ing"><i></i>正在进行</span>';
            }else if(nowTime>setEndTime){  //已结束
                return '<span class="studio-active-cond studio-active-end"><i></i>已结束</span>';
            }else{
                return '';
            }
        
    }

//活动信息
function put_activity_info(title,json){
    
   
    
    var tm = '',
        json = JSON.parse(json);
    
    tm ='<div class="studio-active-img" style="background-image:url('+json.activity_banner+')"></div>'+ 
        '<div class="studio-active-detail">'+
            '<h3>'+title+'</h3>'+
            '<p class="studio-active-time">'+
                '<span>活动时间：</span>'+
                '<i>'+putActivityTime(json.activity_start_date,json.activity_end_date)+'</i>'+
            '</p>'+
//            putActivityState(json.activity_start_date,json.activity_end_date)+
            '<button class="submit studio-look">去看看</button>'+
        '</div>';
    
    return tm;
}


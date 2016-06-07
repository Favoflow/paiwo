//显示标签
function showTags(data){
	
	var tm = '';

	for(var i = 0; i<data.length&&i<6; i++){
		if(data[i].tag_count!=0){
		tm+='<li>'+data[i].tag_word+'</li>';
	   }
	}
	if(tm.length == 0){

		$('.content_title_tipbox sup').hide();
		return;
	}

	$('.title_tipbox_ul').html(tm);
}



//判断是否是本人
function isSelf(){
	if(host.is_self == 1){
		$('.stuido_header_editicon').show();
        $('.title_photo_delete').show();

	}else{

		$('.title_photo_edit').hide();
        $('.title_photo_delete').hide();
		$('.stuido_header_editicon').hide();//背景图

	}
}

//字符串
function filterChar(str){
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
	if(data == 1){
		return 'display: inline;';
		
	}else{
		return '';
	}
	
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

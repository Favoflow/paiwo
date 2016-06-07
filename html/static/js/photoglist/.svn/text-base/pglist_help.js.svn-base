var set1 = null;
function showMessage(content){

	clearTimeout(set1);

	$('.message-box').html(content).animate({'top':'0px'}, function(){
	
		set1 = setTimeout(hideMessage, 1500);
	});

	
	
}

function hideMessage(){
	$('.message-box').animate({'top':'-27px'});

}


function showAvatar(avatar){
	if(avatar == 0){
		
		return '';	
	}
	else{
	    return avatar;	
	}

}

//字符过滤 

function filterChar(str){
	var count = 0;
	var tm = '';
	if(str.length<6){
		return str;	
	}
	for(var i = 0; i<str.length; i++){
		if(str.charCodeAt(i)>255){
			count+=14;
		}else{
			count+=7.5;
		}
		tm+=str[i];
		if(count >=84){
			return tm+='..';	
		}	
	}	
	return tm;	
}



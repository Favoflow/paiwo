//显示头像
function showAva(str){
	if(str.length ==0){
		return "static/images/user_head.gif";
	}
    
	return "http://image.paiwo.co/"+str;
}


//活动输出
function put_activity_time(start,end){  //输出活动时间
        
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
var countColl = document.getElementsByClassName('count_coll');
var countLike = document.getElementsByClassName('count_like');
for(var i = 0;i<countColl.length;i++) {
	getCount(countColl[i]);
	getCount(countLike[i]);
}
function getCount(obj) {
	var num = obj.innerHTML;
	num = num.replace(/[^0-9]/ig,"");
	if(num.length>=4){
		num = num.charAt(0)+'k+';
		obj.innerHTML = '<i></i>'+num;
	}		
}
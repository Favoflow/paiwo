var tm = {};
tm.photos = '<li class="photo_block" data="${photo_id}" path="${photo_path}">'+
		  '<img width="280" height="280" src="http://image.paiwo.co/${photo_path}'+base.retinaPixel['280']+'">'+
            '{{if is_like == true}}'+
		  '<a class="photo_liked photo_fixbox_liked"></a>'+
            '{{else}}'+
            '<a class="photo_liked photo_fixbox_liked" style="display:none"></a>'+
            '{{/if}}'+
		  '<div class="photo_fixbox">'+
            '<a href="${author_domain}" target="_blank">by.${author_name}</a>'+    
            '{{if is_like == true}}'+
		  	'<button class="photo_fixbox_liked"></button>'+
            '{{else}}'+
            '<button class="photo_fixbox_like"></button>'+
            '{{/if}}'+
            // '<span class="hot_num"><i></i>1,455</span>'+  
		  '</div>'+
		'</li>'

function checkMore(){
   if(photo_count>pg_no*16){
    return false;
   } 
};
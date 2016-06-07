var tm = {};

tm.photographers = '<li>'+
		        '<a class="search_pg_head_img" target="_blank" href="${domain}">'+
				'{{if avatar == 0}}'+
				   '<img src="static/images/user_head.gif" width="60" height="60">'+
				'{{else}}'+
					'<img src="http://image.paiwo.co/${avatar}" width="60" height="60">'+
				'{{/if}}'+
				'</a>'+
		        '<dl>'+
		          '<dt><a target="_blank" href="${domain}">${filterChars(user_name)}</a>'+
    					// '{{if gender == 1}}'+
    					// 	'<i class="photog-male"></i>'+
    					// '{{else}}'+
    					// '<i class="photog-fmale"></i>'+
    					// '{{/if}}'+
					    '</dt>'+
		          '<dd>${user_desc}</dd>'+
		        '</dl>'+

			'{{if follow_state == 1}}'+
		       '<a class="photog_add" data="${user_id}" xs="${user_name}" st="${follow_state}">'+
				  '+ 关注</a>'+
            '{{else follow_state == 2}}'+
               '<a class="photog_added_2" data="${user_id}" xs="${user_name}" st="${follow_state}">'+
                  '<i></i>已关注</a>'+
            '{{else follow_state == 3}}'+
               '<a class="photog_add" data="${user_id}" xs="${user_name}" st="${follow_state}">'+
                  '+ 关注</a>'+
            '{{else}}'+
				'<a class="photog_added_4" data="${user_id }" xs="${user_name}" st="${follow_state}">'+
                 '<i></i>互相关注</a>'+
	             '{{/if}}'+
		      '</li>';

tm.photos = '<li class="photo_block" data="${photo_id}" path="${photo_path}">'+
		  '<img width="280" height="280" src="http://image.paiwo.co/${photo_path}'+base.retinaPixel['280']+'">'+
            '{{if is_like == true}}'+
		  '<a class="photo_liked photo_fixbox_liked"></a>'+
            '{{else}}'+
            '<a class="photo_liked photo_fixbox_liked" style="display:none"></a>'+
            '{{/if}}'+
		  '<div class="photo_fixbox">'+
            '<a href="${author_domain}" target="_blank">${author_name}</a>'+    
            '{{if is_like == true}}'+
		  	'<button class="photo_fixbox_liked"></button>'+
            '{{else}}'+
            '<button class="photo_fixbox_like"></button>'+
            '{{/if}}'+
            // '<span class="hot_num"><i></i>1,455</span>'+  
		  '</div>'+
		'</li>';

tm.photog_detail = '<div class="studio-friend-list clearfix">'+
          '<a class="studio-fri-ava" href="${domain}" target="_blank">'+
          '{{if avatar == 0}}'+
              '<img src="http://image.paiwo.co/0">'+
          '{{else}}'+
              '<img src="http://image.paiwo.co/${avatar}">'+
          '{{/if}}'+
          '</a>'+
          '<div class="studio-fri-info">'+
            '<div class="studio-fri-iden">'+
              '<a href="${domain}" target="_blank" class="photog-name">${user_name}</a>'+
              '<i class="undefined"></i>'+
            '</div>'+
            '<div class="studio-fri-place">'+
              '<span>{{html showlocation(address)}}</span>'+
            '</div>'+
            '<span class="photog_des">${user_desc}</span>'+
          '</div>'+
          '<div class="studio-fri-box">'+
          '{{if follow_state == 1}}'+
            '<a class="photog_add" data="${user_id}" xs="${user_name}" st="${follow_state}">'+
            '+ 关注</a>'+
            '{{else follow_state == 2}}'+
               '<a class="photog_added_2" data="${user_id}" xs="${user_name}" st="${follow_state}">'+
                  '<i></i>已关注</a>'+
            '{{else follow_state == 3}}'+
               '<a class="photog_add" data="${user_id}" xs="${user_name}" st="${follow_state}">'+
                  '+ 关注</a>'+
            '{{else}}'+
            '<a class="photog_added_4" data="${user_id }" xs="${user_name}" st="${follow_state}">'+
                 '<i></i>互相关注</a>'+
            '{{/if}}'+
            '<a class="studio-fri-mess" data-code="${user_id}">私信</a>'+
          '</div>'+
        '</div>';

tm.activity = '<div class="section_activity_box">'+
              '<a href="${activity_url}" target="_blank"><img src="${activity_banner}"></a>'+
              '<dl>'+
                  '<dt><a href="${activity_url}" target="_blank" style="color:#414141;">${activity_title}</a></dt>'+
                  '<dd style="display:none;"><span class="activity_span_left"><i></i>${put_avtivity_state(activity_state)}</span><span class="activity_span_right"></span></dd>'+
              '</dl>'+ 
            '</div>';


function showlocation (data){
    if(data == '0-0-0' || data == '00-00-00'){
              return '未知';
          }
          else if(data ==''){
            return '';   
          } 
          else if(data.length == 8){
            data = data+'-00';
          }     
          var  num1 = data.substring(0,5),
               num2 = data.substring(0,2),
          prov_code = num1+'-00-00',
          $pro_json = allArea['province']['02-00-00-00'],
               prov = '',
               city = '';
          if( num2 == '01') {
            return '<span>'+allArea['province']['01-00-00-00'][data]+'</span>';
          }
          else {  
            if( prov_code == '02-33-00-00' || prov_code =='02-34-00-00') {
                prov = allArea['province']['02-00-00-00'][prov_code]; 
                return '<span>中国</span><span>'+prov+'</span>';
            }
            else {
                for(var i in $pro_json){
                    if( prov_code == i)
                        prov = $pro_json[i];               
                }
                city = allArea['city'][prov_code][data];          
                return '<span>'+prov+'</span><span>'+city+'</span>';
            }
          }
}

var setM = null;
function showMessage(content){
    clearTimeout(setM);
    $('.setting_succeed').html(content).animate({top:0}, 400, function(){
            setM = setTimeout(hideMessage, 1800);
    
    });
}

function hideMessage(){
    $('.setting_succeed').animate({top:'-40px'},400);
}


//过滤昵称过长的
function filterChars(str){
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

//检测是否还有更多
function checkMore(){
    if(sa == 1){
        if(photo_count >page_no_a*9 ||photog_count >page_no_a*11){
             $('.search_footer').show();
            return true;
        }else{
             $('.search_footer').hide();
             $('.loading').hide();
            return false;
        }
    }else if(sb == 1){
      if(photo_count > page_no_b*12){
           $('.search_footer').show();
            return true;
        }else{
             $('.search_footer').hide();
             $('.loading').hide();
            return false;

        }  
    }else if(sc == 1){
        if(photog_count > page_no_c*24){
             $('.search_footer').show();
            return true;
        }else{
         
            $('.search_footer').hide();
            $('.loading').hide();
               return false;
        } 
    }else{
         $('.search_footer').hide();
         $('.loading').hide();
            return false;
    }

}

//显示综合结果
function disAll(){
    db.hide();
    hb.removeClass('title-select');
    dc.hide();
    hc.removeClass('title-select');
    da.fadeIn(400);
    ha.addClass('title-select');
    sa = 1;
    sb = 0;
    sc = 0;
    checkMore();
}

//显示照片
function disPhotos(){
    da.hide();
    ha.removeClass('title-select');
    dc.hide();
    hc.removeClass('title-select');
    db.fadeIn(400);
    hb.addClass('title-select');
    sb = 1;
    sa = 0;
    sc = 0;
    checkMore();
}
//显示摄影师
function disPhotogs(){
    da.hide();
    ha.removeClass('title-select');
    db.hide();
    hb.removeClass('title-select');
    dc.fadeIn(400);
    hc.addClass('title-select');
    sc = 1;
    sa = 0;
    sb = 0;
    checkMore();
}



//现实标签
function showThisTags(tags){
    var tm ='';
    for(var i = 0 ; i<tags.length ; i ++){
        tm+= '<div><span class="search_data">'+tags[i]+'</span><span class="search_ul_remove"><i></i></span></div>';
    }
    $('#searchlabels').append(tm);
    $('#searchinput').attr('placeholder', '');
}
//检测是否还有更多




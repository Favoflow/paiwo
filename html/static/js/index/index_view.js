var hometm = {};

//摄影师们
hometm.photog_tm = '<li data="${user_name}">'+
                      '<a href="/${user_domain}" class="phers-li-a" target="_blank">'+
                        '<div class="index-phers-head">'+
                            '<img src="http://image.paiwo.co/${avatar}">'+
                            '<i class="index-phers-hot"></i>'+
                        '</div>'+                    
                      '</a>'+
                      '<a class="pers-name" href="/${user_domain}" target="_blank">${user_name}</a>'+
                      '{{if follow_state == 1}}'+
                           '<a class="photog_add" data="${user_id}">'+
                            '+ 关注</a>'+
                          '{{else follow_state == 2}}'+
                             '<a class="photog_added_2" data="${user_id}">'+
                                '<i></i>已关注</a>'+
                          '{{else follow_state == 3}}'+
                             '<a class="photog_add" data="${user_id}">'+
                                '+ 关注</a>'+
                          '{{else}}'+
                              '<a class="photog_added_4" data="${user_id}">'+
                               '<i></i>互相关注</a>'+
                        '{{/if}}'+    
                   '</li>';

//集市
hometm.bazzar_tm = '<li class="yue-photog-libox">'+
                  '<div class="photog-libox-head">'+
                  '{{if !cover_path}}'+
                    '<img style="width:280px;height:260px"">'+                
                   '{{else}}'+
                      '<img src="http://image.paiwo.co/${cover_path}'+base.retinaPixel['w280h200']+'">'+
                    '{{/if}}'+
                    '<span></span>'+
                    '<div class="footPhotog-bacpic">'+
                      '<figure class="figure">'+
                        '<img data-code="${photographer_domain}" class="header_textbox_headimg" width="65" height="65" src="${HotPhotogImg(photographer_avatar)}">'+
                        '<figcaption><a data-code="${photographer_domain}">${photographer_name}</a></figcaption>'+
                        '<p class="clearfix">'+
                          '{{html hotPhotogPlace(photographer_location)}}'+
                        '</p>'+
                      '</figure>'+
                    '</div>'+
                   '</div>'+
                   '<button class="yue-button" data-code="${photographer_id}"><i class="yue-button-i"></i>联系TA</button>'+
                 '</li>';

//活动
hometm.activity_tm = '<li>'+
					           '<a href="${activity_url}" target="_blank">'+
                        '<div class="activity-list activity-list5" style="background-image:url(${activity_banner_mid});"></div>'+
                        '<div class="events-list-card">'+
                            '<h3>${activity_title}</h3>'+
                            '<span>${put_activity_time(activity_start_date,activity_end_date)}</span>'+
                        '</div>'+
          						'</a>'+
          					'</li>';


//显示热门摄影师+最新订单地区
  function hotPhotogPlace(data){
        if(data == '0-0-0'|| data =='00-00-00'){
            return '未知';
        }
        else if( data == ''){
            return '';
        }      
             data = data+'-00';
        var  num1 = data.substring(0,5), 
        prov_code = num1+'-00-00',
        $pro_json = allArea['province']['02-00-00-00'],
             prov = '',
             city = '';
        if( prov_code == '02-33-00-00' || prov_code =='02-34-00-00') {
            prov = allArea['02-00-00-00'][prov_code]; 
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

  //热门摄影师头像显示
  function HotPhotogImg(data){
    if (data == '0'||data == '') {
      Other_photog_img = '/static/images/user_head.gif';
    }
    else {
      Other_photog_img = 'http://image.paiwo.co/'+data;
    }
    return Other_photog_img;
  }
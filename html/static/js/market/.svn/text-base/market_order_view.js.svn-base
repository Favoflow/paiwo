
var market_order_view = {};

	//愿意接拍的摄影师看到自己的订单
     market_order_view.ph_take_order_html = '<li>'+
    							'{{if !cover_path}}'+
						          '<img width="260" height="260">'+
						          '{{else}}'+
						          '<img style="width:260px;height:260px" src="http://image.paiwo.co/${cover_path}'+base.retinaPixel['280']+'">'+
						          '{{/if}}'+
						        '<div class="footPhotog2-text">'+
						          '<figure class="figure">'+
						      	  	'<img data-code="${photographer_domain}" class="header_textbox_headimg" width="65" height="65" src="http://image.paiwo.co/${photographer_avatar}">'+
						      	  	'<figcaption><a data-code="${photographer_domain}">${photographer_name}</a><i class="${market_order_view.IdoGender(photographer_gender)}"></i>'+
						      	  	'<p class="footPhotog2-place">'+
						      	  	'{{html market_order_view.recentDemPlace(photographer_location)}}'+
						      	  	'</p></figcaption>'+
						      	  	'<p>${ido_desc}</p>'+
						      	  	'<span>成片张数<i>${ido_photo_count}</i></span>'+
						      	  '</figure>'+
						      	  '<div class="footPhotog2-provide">'+
						      	  '<div class="footPhotog2_p_div">'+
						      	    '{{html market_order_view.showIdoPhotogProvide(ido_service)}}'+
						      	   '</div>'+
						      	    '<span class="money"><i>￥</i>${ido_price}</span>'+
						      	    '<hr>'+
						      	    '<span class="footPhotog2-provide-span1">TEl:<i>${ido_contact}</i></span>'+
						      	  '</div>'+
						        '</div>'+
						    '</li>';

	//看到其他愿意摄影师的订单
    market_order_view.hotPhotog_html = '<li class="yue-photog-libox">'+
					        '<div class="photog-libox-head">'+
					        '{{if !cover_path}}'+
					          '<img style="width:280px;height:260px"">'+
					          '{{else}}'+
					          	'<img src="http://image.paiwo.co/${cover_path}'+base.retinaPixel['w280h200']+'">'+
						      '{{/if}}'+
					          '<span></span>'+
					      	  '<div class="footPhotog-bacpic">'+
					      	    '<figure class="figure">'+
					      	  	  '<img data-code="${photographer_domain}" class="header_textbox_headimg" width="65" height="65" src="${market_order_view.OtherPhotogImg(photographer_avatar)}">'+
					      	  	  '<figcaption><a data-code="${photographer_domain}">${photographer_name}</a></figcaption>'+
					      	  	  '<p class="clearfix">{{html market_order_view.recentDemPlace(photographer_location)}}</p>'+
					      	    '</figure>'+
					      	  '</div>'+
					      	'</div>'+
					      	'<button class="yue-button" data-code="${photographer_id}"><i class="yue-button-i"></i>联系TA</button>'+
					    '</li>';					    

    //显示愿意给我拍的摄影师信息
    market_order_view.showIdoPhotog = function (data){
    	var ShowIdo_html = $.tmpl(market_order_view.ph_take_order_html,data);
    	$('.footPhotog2-ul').html(ShowIdo_html);
    }

    //显示愿意给我拍的其他摄影师信息
    market_order_view.showIdoOtherPhotog = function (data){
    	var hotPhotog_html_data = $.tmpl(market_order_view.hotPhotog_html,data);
    	$('#footPhotog2-other-ul').html(hotPhotog_html_data);
    }
    //显示推荐摄影师
    market_order_view.showRecomPhotog = function (data){
    	var hotPhotog_html_data = $.tmpl(market_order_view.hotPhotog_html,data);
    	    hotPhotog_html_data.slice(6).hide();
    	$('#footPhotog3-recom-ul').find('h3').after(hotPhotog_html_data); 
    }

    //最新需求订单地区显示
	market_order_view.recentDemPlace = function (data){
	        if(data == '0-0-0' || data == '00-00-00'){
	            return '';
	        }
	        else if(data == ''){
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
	}

	market_order_view.showIdoPhotogProvide = function (data){
    	if(data == 0){
    		service_provide = '';
    	}
    	else if( data == 1){
    		service_provide = '<p class="footPhotog2-provide-p2"><i></i>提供服装</p>';
    	}
    	else if( data == 2) {
    		service_provide = '<p class="footPhotog2-provide-p1"><i></i>提供化妆</p>';
    	}
    	else if( data == 3)
    		service_provide = '<p class="footPhotog2-provide-p2"><i></i>提供服装</p><p class="footPhotog2-provide-p1"><i></i>提供化妆</p>'
    	return service_provide;
	}

	market_order_view.IdoGender = function (data){
		var gender_class = '';
		if(data == 1){
			gender_class = 'photo-male';
		}
		else if(data == 2){
			gender_class = 'photo-female'
		}
		else {
			gender_class = '';
		}
		return gender_class;
	}

	market_order_view.OtherPhotogImg = function (data){
		if (data == '0') {
			Other_photog_img = '/static/images/user_head.gif';
	    }
        else {
            Other_photog_img = 'http://image.paiwo.co/'+data;
        }
        return Other_photog_img;
	}
$(function(){$(".column").tap(function(){$(".nav").animate({"-webkit-transform":"translate3d(0,100%,0)","transform":"translate3d(0,100%,0)","opacity":"1"},"cubic-bezier(0.1,0.57,0.1,1)",800,function(){$(".top-bar").css("display","none")})});$(".shrink").tap(function(){$(".top-bar").css("display","block");$(".nav").animate({"-webkit-transform":"translate3d(0,0,0)","transform":"translate3d(0,0,0)","opacity":"0"},"cubic-bezier(0.1,0.57,0.1,1)",800)})});var base={ajax:function(json){$.ajax({url:"/rest",type:"POST",dataType:"json",async:json.async?json.async:false,data:{data:JSON.stringify(json.data)},success:function(data){json.success&&json.success(data)},error:function(data){json.error&&json.error(data)}})}};$(".pg_info li").tap(function(){if($(".pg_info li").index($(this))==0){$(".pg_border").animate({"-webkit-transform":"translate3d(0,0,0)"},200);$(".pg_album").show();$(".pg_msg").hide();$(this).addClass("pg-info-cur").siblings().removeClass("pg-info-cur")}else{if($(".pg_info li").index($(this))==2){$(".pg_border").animate({"-webkit-transform":"translate3d(1.61rem,0,0)"},200);$(".pg_album").hide();$(".pg_msg").show();$(this).addClass("pg-info-cur").siblings().removeClass("pg-info-cur")}}});$(".ifspread").tap(function(){if($(this).parent("div").find(".spread-main").css("display")=="none"){$(this).parent("div").find(".spread-main").css({"display":"block"});$(this).animate({"-webkit-transform":"rotate(0)","transform":"rotate(0)"},200)}else{$(this).parent("div").find(".spread-main").css({"display":"none"});$(this).animate({"-webkit-transform":"rotate(180deg)","transform":"rotate(180deg)"},200)}});var pghome={host:null,pg_id:0,pageNo:1,count:0,b_load:true,load_end:true,get_host_name:function(){var url=window.location.href;var index=url.lastIndexOf("/")+1;if(url.lastIndexOf("?")!=-1){var end=url.lastIndexOf("?");host_name=url.substring(index,end)}else{host_name=url.substring(index)}return host_name},get_img_h:function(){var parent=$('<div class="pg_album_list"><a href="javascript:;"><img src="/static/phone/images/photo3.jpg"><h4></h4><i></i></a></div>').appendTo(".pg_album");var _height=parent.find("img").get(0).scrollWidth;parent.remove();return _height},is_avatar:function(url){var avatar_url="";if(url=="0"){avatar_url="/static/phone/images/user_head.gif"}else{avatar_url="http://image.paiwo.co/"+url}return avatar_url},put_tag:function(data){var len=0;if(data.length>5){len=4}else{len=data.length}var str='<span>"</span>';for(var i=0;i<len;i++){if(i==len-1){str+="<span>"+data[i]["tag_word"]+"</span>"}else{str+="<span>"+data[i]["tag_word"]+"</span><i>|</i>"}}str+='<span>"</span>';return str},is_sex:function(sex){if(sex=="1"){return"boy"}else{if(sex=="2"){return"girl"}else{return"nosex"}}},put_gender:function(num){if(num==1){return"男"}else{if(num==2){return"女"}}},put_banner:function(data){if(data){return"url(http://image.paiwo.co/"+data+")"}else{return"url(/static/images/bg.jpg)"}},put_brith:function(date){if(date==""){return}var date_arr=date.split("-");var str=""+date_arr[0]+"年"+date_arr[1]+"月"+date_arr[2]+"日";var date_str="<li>"+"<span>生日/</span>"+"<i>"+str+"</i>"+"</li>";return date_str},pg_info:function(host){base.ajax({data:{"method":"paiwo.home.get","host_domain":pghome.host},success:function(data){if(data.error_id==0){var _info=data.response,_avatar=document.querySelector(".photog_avatar"),_tag=document.querySelector(".photog_key"),_nick=document.querySelector(".photog_nick"),_bg=document.querySelector(".photog_over"),_collect=document.querySelector(".count_coll"),_like=document.querySelector(".count_like"),_album=document.querySelector(".pg_album"),_intro=document.querySelector("#pg_intro"),_contact=document.querySelector("#pg_contact"),_type=document.querySelector(".photo_type"),_address=document.querySelector(".photo_address"),intro_json={},contact_json={};pghome.pg_id=_info.photographer_id;pghome.count=_info.album_count;intro_json.desc=_info.host_desc;intro_json.host=_info.host_domain;intro_json.gender=_info.gift;_avatar.setAttribute("src",pghome.is_avatar(_info.host_avatar));_nick.innerHTML=_info.host_name;_bg.style.backgroundImage=pghome.put_banner(_info.banner_photo);_collect.innerHTML="<i></i>"+_info.favorite_count;_like.innerHTML="<i></i>"+_info.like_count;_intro.innerHTML=pghome.put_intro(intro_json);_type.innerHTML=pghome.services_type(_info.photograph_type);_address.innerHTML=pghome.put_take_location(_info.photograph_address)}},error:function(data){}})},get_album_list:function(host){base.ajax({data:{"method":"paiwo.content.album_list.get","host_domain":host,"page_no":pghome.pageNo,"page_size":6},success:function(data){if(data.error_id==0){var response=data.response,album_list=data.response.album_list,album_str="";for(var i=album_list.length-1;i>=0;i--){album_str+='<div class="pg_album_list" data-code="'+album_list[i].album_id+'">'+'<a href="/album/'+album_list[i].album_id+'" class="img-a">'+'<img height="" src="http://image.paiwo.co/'+album_list[i].cover_path+'@!560x560">'+"</a>"+'<a href="/album/'+album_list[i].album_id+'">'+'<div class="bottom-tit"><h4>'+album_list[i].album_name+"</h4>"+"<i>"+album_list[i].photo_count+"</i></div>"+"</a>"+"</div>"
}$(".pg_album").append(album_str);if(album_list.length<response.page_size){pghome.load_end=false}else{pghome.load_end=true}pghome.b_load=true}},error:function(data){}})},put_intro:function(json){var str="";if(json.desc!=""){str+='<li class="pg_info_desc">'+"<span>描述/</span>"+"<p>"+json.desc+"</p>"+"</li>"}if(json.host!=""){str+="<li>"+"<span>个性域名/</span>"+"<em>paiwo.co/"+json.host+"</em>"+"</li>"}if(json.gender!=""){str+="<li>"+"<span>性别/</span>"+"<i>"+pghome.put_gender(json.gender)+"</i>"+"</li>"}return str},put_contact:function(json){var str="";if(json.phone!=""){str+="<li>"+"<span>手机号码/</span>"+"<i>"+json.phone+"</i>"+"</li>"}if(json.qq){str+="<li>"+"<span>QQ/</span>"+"<i>"+json.qq+"</i>"+"</li>"}if(json.wechat){str+="<li>"+"<span>微信/</span>"+"<i>"+json.wechat+"</i>"+"</li>"}if(json.weibo){str+="<li>"+"<span>微博/</span>"+"<i>"+json.weibo+"</i>"+"</li>"}return str},services_type:function(num){console.log("num",num);var str="<dt>—— 接拍类型 ——</dt>",arr=num.toString(2).split("").reverse(),type=["人像写真","婚纱摄影","婚礼跟拍","家庭儿童","旅行跟拍","商业服务","其他"];console.log(arr);if(arr.length==1&&arr[0].toString()==="0"){str+="<dd>无</dd>"}else{for(var i=0;i<arr.length;i++){if(arr[i]==1){str+="<dd>"+type[i]+"</dd>"}}}console.log(str);return str},put_take_location:function(arr){var str="<dt>—— 接拍地 ——</dt>";if(arr.length){for(var i=0;i<arr.length;i++){str+="<dd>"+get_area(arr[i])+"</dd>"}}else{str+="<dd>无</dd>"}function get_area(code){var area=code.substring(0,2);var prov=code.substring(0,5)+"-00-00";if(area=="01"){if(code=="01-00-00-00"){return"海外"}var oversea=allArea["province"]["01-00-00-00"];for(var name in oversea){if(name==code){return oversea[name]}}}else{if(area=="02"){if(code=="02-00-00-00"){return"中国全境"}var china=allArea["province"]["02-00-00-00"];var is_prov=code.substring(6);if(is_prov=="00-00"){for(var name in china){if(name==code){return china[name]}}}else{var city=code.substring(0,8)+"-00";for(var name in china){if(name==prov){var city_json=allArea["city"][prov];for(var name in city_json){if(name==city){return city_json[name]}else{var dis_json=allArea["district"][city];for(var name in dis_json){if(name==code){return dis_json[name]}}}}}}}}}}return str}};window.addEventListener("scroll",function(){var winH=document.documentElement.clientHeight,scrollT=document.documentElement.scrollTop||document.body.scrollTop,scrollBottom=scrollT+winH,bodyH=document.body.scrollHeight;if(scrollBottom+100>bodyH&&pghome.b_load&&pghome.load_end){pghome.b_load=false;pghome.pageNo++;pghome.get_album_list(pghome.host)}},false);window.addEventListener("resize",function(){pghome.imgH=pghome.get_img_h()},false);(function(){pghome.host=pghome.get_host_name();pghome.pg_info();pghome.get_album_list(pghome.host)})();
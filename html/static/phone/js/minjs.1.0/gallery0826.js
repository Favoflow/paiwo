$(function(){FastClick.attach(document.body)});var base={ajax:function(t){$.ajax({url:"/rest",type:"POST",dataType:"json",async:t.async?t.async:!1,data:{data:JSON.stringify(t.data)},success:function(o){t.success&&t.success(o)},error:function(o){t.error&&t.error(o)}})},parseDom:function(t){var o=document.createElement("div");return o.innerHTML=t,o.childNodes[0].textContent},renderTime:function(t){var o=new Date,e=t.split(" "),n=e[0].split("-"),a=e[1].split(":");o.setFullYear(n[0],n[1]-1,n[2]),o.setHours(a[0],a[1],a[2],0);var i=o.getTime(),r=new Date,s=r.getTime(),p=s-i,c=[o.getFullYear(),o.getMonth(),o.getDate()],h=[r.getFullYear(),r.getMonth(),r.getDate()];if(6e4>p)return"刚刚";if(p>=6e4&&36e5>p){var d=parseInt(p/6e4);return d+"分钟前"}if(p>=36e5&&216e5>p){var d=parseInt(p/36e5);return d+"小时前"}if(p>=216e5&&c==h)return"今天"+o.getHours()+":"+o.getMinutes();if(p>=216e5&&c[0]==h[0]&&c[1]==h[1]&&h[2]-c[2]==1)return"昨天"+o.getHours()+":"+o.getMinutes();var l=o.getMonth()+1;return o.getFullYear()+"/"+l+"/"+o.getDate()}};$(function(){function t(){var t=document.documentElement.clientWidth,o=document.getElementsByTagName("html")[0],e=document.getElementsByTagName("body")[0];500>t?(t=parseInt(t/8),o.style.fontSize=t+"px",e.style.fontSize=t+"px"):t>=500&&(t=500,t=parseInt(t/8),o.style.fontSize=t+"px",e.style.fontSize=t+"px")}function o(){var t=$(".photos-list img").css("width");$(".photos-list img").css("height",t)}t(),o(),window.addEventListener("resize",function(){t(),o()},!1)}),$(function(){$(".column").tap(function(){$(".nav").animate({"-webkit-transform":"translate3d(0,100%,0)",transform:"translate3d(0,100%,0)",opacity:"1"},"cubic-bezier(0.1,0.57,0.1,1)",800,function(){$(".top-bar").css("display","none")})}),$(".shrink").tap(function(){$(".top-bar").css("display","block"),$(".nav").animate({"-webkit-transform":"translate3d(0,0,0)",transform:"translate3d(0,0,0)",opacity:"0"},"cubic-bezier(0.1,0.57,0.1,1)",800)})});var photo_box=$(".photos-main"),photo_cla=$(".photo-classify"),loading=document.querySelector(".loading"),tmp_arr_pos=[];page_no=[0,0,0,0,0];var index={now_num:0,color_arr:["#e7afc7","#747b85","#776d80","#a0a09d","#bbceef","#a9a6a4","#997a86","#d8d6d0"],b_load:!0,now_height:0,photo_count:0,photo_num_arr:[],load_end:!0,get_photo_count:function(){base.ajax({data:{method:"paiwo.gallery.collection_count.get"},success:function(t){0==t.error_id&&(index.photo_count=t.response.count)},error:function(t){}})},rnd_num:function(){function t(t,o){return parseInt(Math.random()*(o-t))+t}function o(t,o){for(var e=0;e<t.length;e++)if(t[e]==o)return!0;return!1}function e(){var e=index.photo_num_arr.length;if(0!=e)if(12>e){console.log(index.photo_num_arr);for(var a=0;e>a;a++)n.push(index.photo_num_arr[a]);index.load_end=!1,index.photo_num_arr=[],$(".loading").hide()}else for(;n.length<12;){e=index.photo_num_arr.length;var i=t(1,e+1)-1;o(n,index.photo_num_arr[i])||(n.push(index.photo_num_arr[i]),index.photo_num_arr.splice(i,1))}}var n=[];return e(),n},get_photo_list:function(){var t=index.rnd_num();base.ajax({data:{method:"paiwo.gallery.collection.get",random_list:t},success:function(t){function o(t,o){return parseInt(Math.random()*(o-t))+t}if(0==t.error_id){var e=t.response.photo_list.sort(function(){return.5-Math.random()}),n="",a=0;index.now_num++;for(var i=0;i<e.length;i++)a=o(1,9)-1,n+='<div class="photos-list" data-code="'+e[i].photo_id+'" style="background-color:'+index.color_arr[a]+';"><a href="'+index.is_has_photo(e[i].photo_path,e[i].photo_id)+'" class="img-a"><img height="" class="photo_img'+index.now_num+'" src="'+index.is_photo_url(e[i].photo_path)+'" style="opacity:0;" /></a><div class="photog_count"><a class="photo_author" href="'+e[i].author_domain+'">'+e[i].author_name+"</a></div></div>";$(".photo-main-list").eq(0).append(n),tmp_arr_pos=[];for(var r=document.querySelectorAll(".photo_img"+index.now_num),i=0;i<r.length;i++)tmp_arr_pos.push(index.get_pos(r[i]).top)}1==index.now_num&&$(".photo_img1").animate({opacity:1},600,"linear"),index.b_load=!0},error:function(t){}})},get_pos:function(t){for(var o=0,e=0;t;)o+=t.offsetLeft,e+=t.offsetTop,t=t.offsetParent;return{left:o,top:e}},get_img_h:function(){var t=$('<div class="photos-list"><img src="/static/phone/images/photo.jpg"><div class="photog_count"><a class="photo_author"></a></div></div>').appendTo(".photos-main"),o=t.find("img").get(0).scrollWidth;return t.remove(),o},is_photo_url:function(t){var o="";return o=""!=t?"http://image.paiwo.co/"+t+"@!560x560":"/static/images/pic-deleted.png"},is_has_photo:function(t,o){var e="";return e=""!=t?"/photos/"+o:"javascript:;"},get_search_photo:function(t,o,e){base.ajax({data:{method:"paiwo.search.photo.get",tags:t,page_no:o,page_size:12},success:function(t){function o(t,o){return parseInt(Math.random()*(o-t))+t}if(0==t.error_id){var n=(index.rnd_num(),0);index.now_num++;for(var a=t.response.photo_list,i="",r=0;r<a.length;r++)n=o(1,9)-1,i+='<div class="photos-list" data-code="'+a[r].photo_id+'" style="background-color:'+index.color_arr[n]+';"><a href="'+index.is_has_photo(a[r].photo_path,a[r].photo_id)+'" class="img-a"><img height="" class="photo_img'+index.now_num+'" src="'+index.is_photo_url(a[r].photo_path)+'" /></a><a href="'+index.is_has_photo(a[r].photo_path,a[r].photo_id)+'"><div class="photog_count"><a class="photo_author" href="'+a[r].author_domain+'">'+a[r].author_name+"</a></div></a></div>";$(".photo-main-list").eq(e).append(i)}},error:function(t){slideMessage("网络错误")}})},checkMore:function(){}};!function(){index.now_height=index.get_img_h(),index.get_photo_count();for(var t=1;t<=index.photo_count;t++)index.photo_num_arr.push(t);index.get_photo_list()}(),window.addEventListener("load",function(){$(".photo_img1").animate({opacity:1},600,"linear")},!1),$(".load-more").on("tap",function(){var t=$(".photo-classify li").index(".photo-cla-cur");if(console.log(t),0==t)index.b_load=!1,index.get_photo_list();else{for(var o=[],e=$(".photo-cla-cur").find("dd"),n=0;n<e.length;n++)o[n]=e[n].innerHTML;index.get_search_photo(o,++page_no[t-1],t)}for(var n=0;n<tmp_arr_pos.length;n++)$(".photos-list img").animate({opacity:1},400,"linear"),$(".photo_img"+index.now_num).eq(n).animate({opacity:1},400,"linear");return!1}),window.addEventListener("resize",function(){},!1),photo_cla.on("tap","li",function(){for(var t=$(".photo-classify li").index($(this)),o=100*t,e=[],n=$(this).find("dd"),a=0;a<n.length;a++)e[a]=n[a].innerHTML;$(".photo-cla-line").css({"-webkit-transform":"translate3d("+o+"%,0,0)",transform:"translate3d("+o+"%,0,0)"}),$(".photo-classify li").eq(t).addClass("photo-cla-cur").siblings().removeClass("photo-cla-cur"),$(".photo-main-list").eq(t).show().siblings().hide(),0!=t&&""==$(".photo-main-list").eq(t).html()?index.get_search_photo(e,++page_no[t-1],t):0==t&&""==$(".photo-main-list").eq(0).html()&&index.get_photo_list()});
$(function(){function t(){var t=document.documentElement.clientWidth,e=document.getElementsByTagName("html")[0],n=document.getElementsByTagName("body")[0];500>t?(t=parseInt(t/8),e.style.fontSize=t+"px",n.style.fontSize=t+"px"):t>=500&&(t=500,t=parseInt(t/8),e.style.fontSize=t+"px",n.style.fontSize=t+"px")}function e(){var t=$(".photos-list img").css("width");$(".photos-list img").css("height",t)}t(),e(),window.addEventListener("resize",function(){t(),e()},!1)});
var photo_box=$(".photos-main"),loading=document.querySelector(".loading"),tmp_arr_pos=[],index={now_num:0,color_arr:["#e7afc7","#747b85","#776d80","#a0a09d","#bbceef","#a9a6a4","#997a86","#d8d6d0"],b_load:!0,now_height:0,photo_count:0,photo_num_arr:[],load_end:!0,get_photo_count:function(){$.ajax({url:" /a/gallery/collection/photocount",type:"POST",dataType:"json",async:!1,success:function(o){0==o.error_id&&(index.photo_count=o.result.count)},error:function(){}})},rnd_num:function(){function o(o,t){return parseInt(Math.random()*(t-o))+o}function t(o,t){for(var n=0;n<o.length;n++)if(o[n]==t)return!0;return!1}function n(){var n=index.photo_num_arr.length;if(0!=n)if(12>n){console.log(index.photo_num_arr);for(var i=0;n>i;i++)e.push(index.photo_num_arr[i]);index.load_end=!1,index.photo_num_arr=[],$(".loading").hide()}else for(;e.length<12;){n=index.photo_num_arr.length;var r=o(1,n+1)-1;t(e,index.photo_num_arr[r])||(e.push(index.photo_num_arr[r]),index.photo_num_arr.splice(r,1))}}var e=[];return n(),e.join(",")},get_photo_list:function(){var o=index.rnd_num();$.ajax({url:"/a/gallery/collection/photolist",type:"POST",dataType:"json",data:{id_list:o},success:function(o){function t(o,t){return parseInt(Math.random()*(t-o))+o}if(0==o.error_id){var n=o.result.photo_list.sort(function(){return.5-Math.random()}),e="",i=0;index.now_num++;for(var r=0;r<n.length;r++)i=t(1,9)-1,e+='<div class="photos-list" data-code="'+n[r].photo_id+'" style="background-color:'+index.color_arr[i]+';"><a href="'+index.is_has_photo(n[r].photo_path,n[r].photo_id)+'"><img height="'+index.now_height+'" class="photo_img'+index.now_num+'" src="'+index.is_photo_url(n[r].photo_path)+'" style="opacity:0;" /><div class="photog_count"><span class="photo_author">'+n[r].author_name+"</span></div></a></div>";photo_box.append(e),tmp_arr_pos=[];for(var a=document.querySelectorAll(".photo_img"+index.now_num),r=0;r<a.length;r++)tmp_arr_pos.push(index.get_pos(a[r]).top)}1==index.now_num&&$(".photo_img1").animate({opacity:1},600,"linear"),index.b_load=!0},error:function(){}})},get_pos:function(o){for(var t=0,n=0;o;)t+=o.offsetLeft,n+=o.offsetTop,o=o.offsetParent;return{left:t,top:n}},get_img_h:function(){var o=$('<div class="photos-list"><img src="/static/phone/images/photo.jpg"><div class="photog_count"><span class="photo_author"></span></div></div>').appendTo(".photos-main"),t=o.find("img").get(0).scrollWidth;return o.remove(),t},is_photo_url:function(o){var t="";return t=""!=o?"http://image.paiwo.co/"+o+"@!280x280":"/static/images/pic-deleted.png"},is_has_photo:function(o,t){var n="";return n=""!=o?"/m/photos/"+t:"javascript:;"}};!function(){index.now_height=index.get_img_h(),index.get_photo_count();for(var o=1;o<=index.photo_count;o++)index.photo_num_arr.push(o);index.get_photo_list()}(),window.addEventListener("load",function(){$(".photo_img1").animate({opacity:1},600,"linear")},!1),window.addEventListener("scroll",function(){var o=photo_box[0].scrollHeight,t=photo_box[0].offsetTop,n=o+t,e=document.documentElement.clientHeight,i=document.documentElement.scrollTop||document.body.scrollTop,r=i+e;r>n-100&&index.b_load&&index.load_end&&(loading.style.display="block",index.get_photo_list(),index.b_load=!1);for(var a=0;a<tmp_arr_pos.length;a++)r>tmp_arr_pos[a]+60&&$(".photo_img"+index.now_num).eq(a).animate({opacity:1},400,"linear")},!1),window.addEventListener("resize",function(){index.now_height=index.get_img_h()},!1);
$(function(){$(".column").tap(function(){$(".nav").animate({"-webkit-transform":"translate3d(0,100%,0)",transform:"translate3d(0,100%,0)",opacity:"1"},"cubic-bezier(0.1,0.57,0.1,1)",800,function(){$(".top-bar").css("display","none")})}),$(".shrink").tap(function(){$(".top-bar").css("display","block"),$(".nav").animate({"-webkit-transform":"translate3d(0,0,0)",transform:"translate3d(0,0,0)",opacity:"0"},"cubic-bezier(0.1,0.57,0.1,1)",800)})});
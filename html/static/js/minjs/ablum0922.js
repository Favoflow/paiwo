function showTags(o){for(var e="",t=0;t<o.length&&6>t;t++)0!=o[t].tag_count&&(e+="<li>"+o[t].tag_word+"</li>");return 0==e.length?void $(".content_title_tipbox sup").hide():void $(".title_tipbox_ul").html(e)}function isSelf(){1==host.is_self?($(".stuido_header_editicon").show(),$(".title_photo_delete").show()):($(".title_photo_edit").hide(),$(".title_photo_delete").hide(),$(".stuido_header_editicon").hide())}function filterChar(o){var e=0,t="";if(o.length<5)return o;for(var a=0;a<o.length;a++)if(e+=o.charCodeAt(a)>255?14:7.5,t+=o[a],e>=154)return t+="..";return t}function isLike(o){return 1==o?"photo_fixbox_liked":"photo_fixbox_like"}function isLike2(o){return 1==o?"display: inline;":""}function showMessage(o){clearTimeout(setM),$(".message-box").html(o).animate({top:0},400,function(){setM=setTimeout(hideMessage,1500)})}function hideMessage(){$(".message-box").animate({top:"-27px"},400)}function get_album_id(){var o=window.location.href,e=o.lastIndexOf("/")+1,t=o.lastIndexOf("#");if(-1!=o.lastIndexOf("?")){var a=o.lastIndexOf("?");album_id=-1!=o.lastIndexOf("#")?o.substring(e,t):o.substring(e,a)}else album_id=-1!=o.lastIndexOf("#")?o.substring(e,t):o.substring(e);return album_id}function get_album_status(){var o=window.location.href,e=o.lastIndexOf("#")+1;if(-1!=o.lastIndexOf("?")){{o.lastIndexOf("?")}album_status=o.substring(-1!=o.lastIndexOf("#")?e:e)}else album_status=o.substring(-1!=o.lastIndexOf("#")?e:e);return album_status}function showInnerPic(o,e){var e=e||!1;select_del=o,photo_flag=1,base.ajax({data:{method:"paiwo.content.album.get",album_id:o},success:function(o){function t(){var e=o.response.tags;if(e.length){for(var t="",a=0;a<e.length;a++)t+="<li>"+o.response.tags[a]+"</li>";var i='<sup>“</sup><ul class="title_tipbox_ul">'+t+"</ul><sup>”</sup>";$("#album_tags_list").html(i)}else $("#album_tags_list").html("")}if(0==o.error_id){is_winsrcoll=!1;{document.body}album_cover_path=o.response.cover_path,album_album_name=o.response.album_name,album_author_name=o.response.author_name,album_album_id=o.response.album_id,$("#bigpic").remove(),$(".black_bac").hide(),album_info=o.response;var a=$(".album_comment_tab_copyright");switch(a.find("span").hide(),o.response.cc_protocol){case 1:a.find(".t1").show();break;case 2:a.find(".t2").show();break;case 3:a.find(".t3").show();break;case 4:a.find(".t4").show();break;case 5:a.find(".t5").show();break;case 6:a.find(".t6").show();break;case 7:a.find(".t7").show();break;case 8:a.find(".t8").show();break;default:a.html("")}in_album=o.response,in_album.is_self?($(".pocket-edite").attr("href","/album/edit#/"+in_album.album_id).show(),$(".pocket-delet").show()):($(".pocket-edite").hide(),$(".pocket-delet").hide()),album_list_tmp=o.response.photo_list;var i=$.tmpl(normal_tm,o.response.photo_list);$(".photo_section_normal").append(i),getSec(),sec_flag&&$(".photo_section_free li").css("opacity",1),getThird(),$(".title_photo_ava img").attr("src",base.showAvatar(in_album.author_avatar)),$(".title_photo_ava").attr({href:"/"+in_album.author_domain,title:album_info.author_name}),$(".photo_name").attr({href:"/"+in_album.author_domain}),$(".photo_name").html(in_album.author_name),e||(album.hide(),photo.hide(),intro.hide()),photo.fadeIn(400),$("#p-name").html(o.response.album_name),t(),$("#album-desc").html(o.response.album_desc)}else if(105008==o.error_id){showMessage("该相册已经被作者删除");var n=window.location.pathname;window.history.replaceState("","",n)}},error:function(o){}})}function getSec(){for(var o=album_list_tmp,e=o.length,t=[],a=($(".photo_section_free").find("li"),0);e>a;a++){t[0]=o[a];var i=$.tmpl(free_tm,t);$(".photo_section_free").append(i[0]);var n=new Image;n.addEventListener("load",function(){sec_flag=!0,waterfall()}),$(".photo_section_free li").eq(a).css("opacity",1),n.src="http://image.paiwo.co/"+t[0].photo_path+base.retinaPixel.w280}}function getThird(){for(var o=album_list_tmp,e=[],t=o.length>8?8:o.length,a=0;t>a;a++){var i=$.tmpl(full_tm,o);e[a]=i[0],o.shift()}$(".photo_section_full").append(e),e=[]}function getPos(o){for(var e=0;o;)e+=o.offsetTop,o=o.offsetParent;return e}function waterfall(){for(var o=23,e=$(".photo_section_free")[0],t=$(".photo_section_free li"),a=t[0].offsetWidth+o,i=parseInt(e.offsetWidth/a),n=[],s=0;s<t.length;s++){var l=t[s].offsetHeight;if(i>s){n[s]=l,t[s].style.top="0px",t[s].style.left=s*a+"px";var r=Math.max.apply(null,n);$(".photo_section_free").css("height",r)}else{var c=Math.min.apply(null,n),h=getminkey(n,c);n[h]+=l+o,t[s].style.top=c+o+"px",t[s].style.left=h*a+"px";var r=Math.max.apply(null,n);$(".photo_section_free").css("height",r)}}}function getminkey(o,e){for(var t in o)if(o[t]==e)return t}function setSeo(o,e,t,a){$("title").html(o+"｜拍我网");for(var i="",n="",s=0;s<e.length;s++)i+=e[s].tag_word+" ";for(var s=0;s<t.length;s++)n+=allArea[t[s]]+" ";$('meta[name="keywords"]').attr("content",o+" paiwo 拍我 拍我网 摄影 摄影师 "+i+" "+n),$('meta[name="description"]').attr("content",o+"｜拍我网 (专业的人像摄影服务平台) "+a)}function deleteAlbum(){base.ajax({data:{method:"paiwo.content.album.delete",album_id:select_del},success:function(o){0==o.error_id&&(window.location.href="/"+album_info.author_domain)},error:function(o){}})}function doLike(o){base.ajax({data:{method:"paiwo.user.like.add",content_id:o,content_type:1},success:function(o){0==o.error_id&&(like_num+=1,$(".tab_left_likes span").html(like_num))},error:function(o){slideMessage("网络错误")}})}function unLike(o){base.ajax({data:{method:"paiwo.user.like.delete",content_id:o,content_type:1},success:function(o){0==o.error_id&&(like_num-=1,$(".tab_left_likes span").html(like_num))},error:function(o){slideMessage("网络错误")}})}function unAddPhoto(o){$.ajax({url:"/a/photo/favorite/unfavorite",type:"POST",dataType:"json",data:{photo_id:o},success:function(e){$(".photo_fixbox_dinged[data="+o+"]").removeClass().addClass("photo_fixbox_ding"),favourite_num-=1,$(".tab_left_dings span").html(favourite_num)}})}function uploadfile(o){if(null!=o){var e="http://paiwo.oss-cn-hangzhou.aliyuncs.com",t=e,a=new FormData,i=!1;if($.ajax({async:!1,type:"POST",url:"/a/photographer/banner/uploadurl/get",dataType:"json",success:function(o){a.append("Signature",o.response.signature),a.append("policy",o.response.policy),a.append("OSSAccessKeyId",o.response.key_id),a.append("key",o.response.object_key),a.append("success_action_status",201),i=!0},error:function(){i=!1}}),i){a.append("file",o);var n=new XMLHttpRequest;n.open("post",t,!1),n.onload=function(){var o=$(n.response).find("Key").html();big_back=o},n.send(a)}else $(".banner_loading").css("width","0%"),showMessage("网络错误..")}$.ajax({async:!1,type:"POST",url:"/a/photographer/style/put",dataType:"json",data:{banner_photo:big_back},success:function(o){if(0==o.error_id){var e=$(".banner_loading"),t="http://image.paiwo.co/"+big_back+"@!banner",a=new Image;a.src=t,a.onload=function(){$(".banner_bg").fadeOut(400),e.animate({width:"100%"},200,"swing",function(){e.css("width","0%"),$(".header-back-up").fadeOut(400),$(".header-back-img").addClass("header-back-select"),$(".banner_bg").css("background-image","url("+t+")").fadeIn(400),$(".header-back-img").css("background-image","url("+t+")").fadeIn(400)})}}},error:function(){$(".banner_loading").css("width","0%"),showMessage("网络错误")}})}function init(){host.name=location.pathname.slice(1),showInnerPic(get_album_id(),!0)}function is_hash(){var o=window.location.hash;if(""!=o){o.replace(/[^0-9]/g,"")}}function getPhotoId(){var o=window.location.href,e=o.lastIndexOf("/")+1,t=o.lastIndexOf("#"),a=null;if(-1!=o.lastIndexOf("?")){{o.lastIndexOf("?")}a=o.substring(e,t)}else a=o.substring(e,t);return a}var normal_tm='<li data="${photo_id}"><img src="http://image.paiwo.co/${photo_path}'+base.retinaPixel[280]+'" /><a class="inner_liked_img" style="${isLike2(is_like)}"></a><div class="photo_fixbox"><a class="photo_name" target="_blank"></a><button class="${isLike(is_like)}" path="${photo_path}" data="${photo_id}"></button></div></li>',free_tm='<li data="${photo_id}" style="opacity:0"><img src="http://image.paiwo.co/${photo_path}'+base.retinaPixel.w280+'" /><a class="inner_liked_img" style="${isLike2(is_like)}"></a><div class="photo_fixbox"><a class="photo_name" target="_blank"></a><button class="${isLike(is_like)}" path="${photo_path}" data="${photo_id}"></button></div></li>',full_tm='<li data="${photo_id}"><img src="http://image.paiwo.co/${photo_path}'+base.retinaPixel["1d5"]+'" /><a class="inner_liked_img" style="${isLike2(is_like)}"></a><div class="photo_fixbox"><a class="photo_like_a"><button class="${isLike(is_like)}" path="${photo_path}" data="${photo_id}"></button></a></div></li>',info_tm='<li class="personal_w"><span>个性域名/</span><p>paiwo.co/${user_host}</p></li><li><span>性别/</span><p>${showGen(gender)}</p></li><li><span>生日/</span><p>${showbir(birthday)}</p></li>',self_tm='<li class="self_li"><a class="content_album_up" href="javascript:;"><i></i><p>上传相册</p></a></li>',allArea={"00-00-00-00":"全球","01-00-00-00":"海外","02-00-00-00":"国内","01-01-00-00":"日本","01-02-00-00":"韩国","01-03-00-00":"长滩岛","01-04-00-00":"沙巴","01-05-00-00":"马尔代夫","01-06-00-00":"尼泊尔","01-07-00-00":"斯里兰卡","01-08-00-00":"普吉岛","01-09-00-00":"巴厘岛","01-10-00-00":"美国","01-11-00-00":"阿根廷","01-12-00-00":"巴西","01-13-00-00":"玻利维亚","01-14-00-00":"澳大利亚","01-15-00-00":"大溪地","01-16-00-00":"斐济","01-17-00-00":"新西兰","01-18-00-00":"法国","01-19-00-00":"瑞士","01-20-00-00":"西班牙","01-21-00-00":"意大利","01-22-00-00":"英国","01-23-00-00":"希腊","01-24-00-00":"土耳其","01-25-00-00":"荷兰","01-26-00-00":"肯尼亚","01-27-00-00":"马达加斯加","01-28-00-00":"毛里求斯","01-29-00-00":"塞舌尔","01-30-00-00":"其他","02-01-00-00":"北京全境","02-02-00-00":"上海全境","02-03-00-00":"天津全境","02-04-00-00":"重庆全境","02-05-00-00":"浙江全境","02-06-00-00":"江苏全境","02-07-00-00":"四川全境","02-08-00-00":"云南全境","02-09-00-00":"海南全境","02-10-00-00":"西藏全境","02-11-00-00":"青海全境","02-12-00-00":"新疆全境","02-13-00-00":"广东全境","02-14-00-00":"广西全境","02-15-00-00":"福建全境","02-16-00-00":"江西全境","02-17-00-00":"湖南全境","02-18-00-00":"湖北全境","02-19-00-00":"安徽全境","02-20-00-00":"山东全境","02-21-00-00":"河北全境","02-22-00-00":"河南全境","02-23-00-00":"山西全境","02-24-00-00":"陕西全境","02-25-00-00":"黑龙江全境","02-26-00-00":"吉林全境","02-27-00-00":"辽宁全境","02-28-00-00":"内蒙古全境","02-29-00-00":"甘肃全境","02-30-00-00":"贵州全境","02-31-00-00":"宁夏全境","02-32-00-00":"台湾全境","02-33-00-00":"香港","02-34-00-00":"澳门","02-01-01-00":"东城","02-01-02-00":"西城","02-01-03-00":"海淀","02-01-04-00":"朝阳","02-01-05-00":"丰台","02-01-06-00":"石景山","02-01-07-00":"门头沟","02-01-08-00":"房山","02-01-09-00":"通州","02-01-10-00":"顺义","02-01-11-00":"昌平","02-01-12-00":"大兴","02-01-13-00":"怀柔","02-01-14-00":"平谷","02-01-15-00":"密云","02-01-16-00":"延庆","02-02-01-00":"黄埔","02-02-02-00":"徐汇","02-02-03-00":"长宁","02-02-04-00":"静安","02-02-05-00":"普陀","02-02-06-00":"闸北","02-02-07-00":"虹口","02-02-08-00":"杨浦","02-02-09-00":"闵行","02-02-10-00":"宝山","02-02-11-00":"嘉定","02-02-12-00":"浦东","02-02-13-00":"金山","02-02-14-00":"松江","02-02-15-00":"青浦","02-02-16-00":"奉贤","02-02-17-00":"崇明","02-03-01-00":"和平","02-03-02-00":"河东","02-03-03-00":"河西","02-03-04-00":"南开","02-03-05-00":"河北","02-03-06-00":"红桥","02-03-07-00":"东丽","02-03-08-00":"西青","02-03-09-00":"津南","02-03-10-00":"北辰","02-03-11-00":"滨海","02-03-12-00":"武清","02-03-13-00":"宝坻","02-03-14-00":"宁河","02-03-15-00":"静海","02-04-01-00":"渝中","02-04-02-00":"大渡口","02-04-03-00":"江北","02-04-04-00":"沙坪坝","02-04-05-00":"九龙坡","02-04-06-00":"南岸","02-04-07-00":"北碚","02-04-08-00":"渝北","02-04-09-00":"巴南","02-04-10-00":"涪陵","02-04-11-00":"江津","02-04-12-00":"合川","02-04-13-00":"永川","02-04-14-00":"长寿","02-04-15-00":"南川 ","02-04-16-00":"綦江","02-04-17-00":"大足","02-04-18-00":"潼南","02-04-19-00":"铜梁","02-04-20-00":"荣昌","02-04-21-00":"璧山","02-04-22-00":"渝东北","02-04-23-00":"渝东南","02-05-01-00":"杭州","02-05-02-00":"宁波","02-05-03-00":"温州","02-05-04-00":"嘉兴","02-05-05-00":"湖州","02-05-06-00":"绍兴","02-05-07-00":"金华","02-05-08-00":"衢州","02-05-09-00":"舟山","02-05-10-00":"台州","02-05-11-00":"丽水","02-06-01-00":"南京","02-06-02-00":"无锡","02-06-03-00":"徐州","02-06-04-00":"常州","02-06-05-00":"苏州","02-06-06-00":"南通","02-06-07-00":"连云港","02-06-08-00":"淮安","02-06-09-00":"盐城","02-06-10-00":"扬州","02-06-11-00":"镇江","02-06-12-00":"泰州","02-06-13-00":"宿迁","02-07-01-00":"成都","02-07-02-00":"自贡","02-07-03-00":"攀枝花","02-07-04-00":"泸州","02-07-05-00":"德阳","02-07-06-00":"绵阳","02-07-07-00":"广元","02-07-08-00":"遂宁","02-07-09-00":"内江","02-07-10-00":"乐山","02-07-11-00":"南充","02-07-12-00":"眉山","02-07-13-00":"宜宾","02-07-14-00":"广安","02-07-15-00":"达州","02-07-16-00":"雅安","02-07-17-00":"巴中","02-07-18-00":"资阳","02-07-19-00":"阿坝","02-07-20-00":"甘孜","02-07-21-00":"凉山","02-08-01-00":"昆明","02-08-02-00":"曲靖","02-08-03-00":"玉溪","02-08-04-00":"保山","02-08-05-00":"昭通","02-08-06-00":"丽江","02-08-07-00":"思茅","02-08-08-00":"临沧","02-08-09-00":"楚雄","02-08-10-00":"红河","02-08-11-00":"文山","02-08-12-00":"西双版纳","02-08-13-00":"大理","02-08-14-00":"德宏","02-08-15-00":"怒江","02-08-16-00":"迪庆","02-09-01-00":"海口","02-09-02-00":"三亚","02-09-03-00":"三沙","02-09-04-00":"五指山","02-09-05-00":"琼海","02-09-06-00":"儋州","02-09-07-00":"文昌","02-09-08-00":"万宁","02-09-09-00":"东方","02-09-10-00":"定安","02-09-11-00":"屯昌","02-09-12-00":"澄迈","02-09-13-00":"临高","02-09-14-00":"白沙","02-09-15-00":"昌江","02-09-16-00":"乐东","02-09-17-00":"陵水","02-09-18-00":"保亭","02-09-19-00":"琼中","02-09-20-00":"洋浦","02-09-01-00":"海口","02-09-02-00":"三亚","02-09-03-00":"三沙","02-09-04-00":"五指山","02-09-05-00":"琼海","02-09-06-00":"儋州","02-09-07-00":"文昌","02-09-08-00":"万宁","02-09-09-00":"东方","02-09-10-00":"定安","02-09-11-00":"屯昌","02-09-12-00":"澄迈","02-09-13-00":"临高","02-09-14-00":"白沙","02-09-15-00":"昌江","02-09-16-00":"乐东","02-09-17-00":"陵水","02-09-18-00":"保亭","02-09-19-00":"琼中","02-09-20-00":"洋浦","02-10-01-00":"拉萨","02-10-02-00":"昌都","02-10-03-00":"山南","02-10-04-00":"日喀则","02-10-05-00":"那曲","02-10-06-00":"阿里","02-10-07-00":"林芝","02-11-01-00":"西宁","02-11-02-00":"海东","02-11-03-00":"海北州","02-11-04-00":"黄南州","02-11-05-00":"海南州","02-11-06-00":"果洛州","02-11-07-00":"玉树州","02-11-08-00":"海西州","02-11-09-00":"青海湖","02-11-10-00":"祁连山","02-12-01-00":"乌鲁木齐","02-12-02-00":"克拉玛依","02-12-03-00":"吐鲁番","02-12-04-00":"哈密","02-12-05-00":"昌吉州","02-12-06-00":"博尔塔拉","02-12-07-00":"巴音郭楞","02-12-08-00":"阿克苏","02-12-09-00":"克孜勒苏","02-12-10-00":"喀什","02-12-11-00":"和田","02-12-12-00":"伊犁","02-12-13-00":"塔城","02-12-14-00":"阿勒泰","02-12-15-00":"石河子","02-12-16-00":"阿拉尔","02-12-17-00":"图木舒克","02-12-18-00":"五家渠","02-12-19-00":"北屯市","02-12-20-00":"铁门关市","02-12-21-00":"双河市","02-13-01-00":"广州","02-13-02-00":"韶关","02-13-03-00":"深圳 ","02-13-04-00":"珠海","02-13-05-00":"汕头","02-13-06-00":"佛山","02-13-07-00":"江门","02-13-08-00":"湛江","02-13-09-00":"茂名","02-13-10-00":"肇庆","02-13-11-00":"惠州","02-13-12-00":"梅州","02-13-13-00":"汕尾","02-13-14-00":"河源","02-13-15-00":"阳江","02-13-16-00":"清远","02-13-17-00":"东莞","02-13-18-00":"中山","02-13-19-00":"潮州","02-13-20-00":"揭阳","02-13-21-00":"云浮","02-14-01-00":"南宁","02-14-02-00":"柳州","02-14-03-00":"桂林","02-14-04-00":"梧州","02-14-05-00":"北海","02-14-06-00":"防城港","02-14-07-00":"钦州","02-14-08-00":"贵港","02-14-09-00":"玉林","02-14-10-00":"百色","02-14-11-00":"贺州","02-14-12-00":"河池","02-14-13-00":"来宾","02-14-14-00":"崇左","02-15-01-00":"福州","02-15-02-00":"厦门","02-15-03-00":"莆田 ","02-15-04-00":"三明","02-15-05-00":"泉州","02-15-06-00":"漳州","02-15-07-00":"南平","02-15-08-00":"龙岩","02-15-09-00":"宁德","02-16-01-00":"南昌","02-16-02-00":"景德镇","02-16-03-00":"萍乡","02-16-04-00":"九江","02-16-05-00":"新余","02-16-06-00":"鹰潭","02-16-07-00":"赣州","02-16-08-00":"吉安","02-16-09-00":"宜春","02-16-10-00":"抚州","02-16-11-00":"上饶","02-17-01-00":"长沙","02-17-02-00":"株洲","02-17-03-00":"湘潭","02-17-04-00":"衡阳","02-17-05-00":"邵阳","02-17-06-00":"岳阳","02-17-07-00":"常德","02-17-08-00":"张家界","02-17-09-00":"益阳","02-17-10-00":"郴州","02-17-11-00":"永州","02-17-12-00":"怀化","02-17-13-00":"娄底","02-17-14-00":"湘西","02-18-01-00":"武汉","02-18-02-00":"黄石","02-18-03-00":"十堰","02-18-04-00":"宜昌","02-18-05-00":"襄樊","02-18-06-00":"鄂州","02-18-07-00":"荆门","02-18-08-00":"孝感","02-18-09-00":"荆州","02-18-10-00":"黄冈","02-18-11-00":"咸宁","02-18-12-00":"随州","02-18-13-00":"恩施","02-18-14-00":"仙桃","02-18-15-00":"潜江","02-18-16-00":"天门","02-18-17-00":"神农架","02-19-01-00":"合肥","02-19-02-00":"芜湖","02-19-03-00":"蚌埠","02-19-04-00":"淮南","02-19-05-00":"马鞍山","02-19-06-00":"淮北","02-19-07-00":"铜陵","02-19-08-00":"安庆","02-19-09-00":"黄山","02-19-10-00":"滁州","02-19-11-00":"阜阳","02-19-12-00":"宿州","02-19-13-00":"六安","02-19-14-00":"亳州","02-19-15-00":"池州","02-19-16-00":"宣城","02-20-01-00":"济南","02-20-02-00":"青岛","02-20-03-00":"淄博","02-20-04-00":"枣庄","02-20-05-00":"东营","02-20-06-00":"烟台","02-20-07-00":"潍坊","02-20-08-00":"济宁","02-20-09-00":"泰安","02-20-10-00":"威海","02-20-11-00":"日照","02-20-12-00":"莱芜","02-20-13-00":"临沂","02-20-14-00":"德州","02-20-15-00":"聊城","02-20-16-00":"滨州","02-20-17-00":"菏泽","02-21-01-00":"石家庄","02-21-02-00":"唐山","02-21-03-00":"秦皇岛","02-21-04-00":"邯郸 ","02-21-05-00":"邢台","02-21-06-00":"保定","02-21-07-00":"张家口","02-21-08-00":"承德","02-21-09-00":"沧州","02-21-10-00":"廊坊","02-21-11-00":"衡水","02-22-01-00":"郑州","02-22-02-00":"开封","02-22-03-00":"洛阳","02-22-04-00":"平顶山","02-22-05-00":"安阳","02-22-06-00":"鹤壁","02-22-07-00":"新乡","02-22-08-00":"焦作","02-22-09-00":"济源","02-22-10-00":"濮阳","02-22-11-00":"许昌","02-22-12-00":"漯河","02-22-13-00":"三门峡","02-22-14-00":"南阳","02-22-15-00":"商丘","02-22-16-00":"信阳","02-22-17-00":"周口","02-22-18-00":"驻马店","02-23-01-00":"太原","02-23-02-00":"大同","02-23-03-00":"阳泉","02-23-04-00":"长治","02-23-05-00":"晋城","02-23-06-00":"朔州","02-23-07-00":"晋中","02-23-08-00":"运城","02-23-09-00":"忻州","02-23-10-00":"临汾","02-23-11-00":"吕梁","02-24-01-00":"西安","02-24-02-00":"铜川","02-24-03-00":"宝鸡","02-24-04-00":"咸阳","02-24-05-00":"渭南","02-24-06-00":"延安","02-24-07-00":"汉中","02-24-08-00":"榆林","02-24-09-00":"安康","02-24-10-00":"商洛","02-24-11-00":"杨凌","02-25-01-00":"哈尔滨","02-25-02-00":"齐齐哈尔","02-25-03-00":"鸡西","02-25-04-00":"鹤岗","02-25-05-00":"双鸭山","02-25-06-00":"大庆","02-25-07-00":"伊春","02-25-08-00":"佳木斯","02-25-09-00":"七台河","02-25-10-00":"牡丹江","02-25-11-00":"黑河","02-25-12-00":"绥化","02-25-13-00":"大兴安岭","02-26-01-00":"长春","02-26-02-00":"吉林","02-26-03-00":"四平","02-26-04-00":"辽源","02-26-05-00":"通化","02-26-06-00":"白山","02-26-07-00":"松原","02-26-08-00":"白城","02-26-09-00":"延边","02-26-10-00":"长白山","02-26-11-00":"梅河口","02-26-12-00":"公主岭","02-27-01-00":"沈阳","02-27-02-00":"大连","02-27-03-00":"鞍山","02-27-04-00":"抚顺","02-27-05-00":"本溪","02-27-06-00":"丹东","02-27-07-00":"锦州","02-27-08-00":"营口","02-27-09-00":"阜新","02-27-10-00":"辽阳","02-27-11-00":"盘锦","02-27-12-00":"铁岭","02-27-13-00":"朝阳","02-27-14-00":"葫芦岛","02-28-01-00":"呼和浩特","02-28-02-00":"大连","02-28-03-00":"乌海","02-28-04-00":"赤峰","02-28-05-00":"通辽","02-28-06-00":"鄂尔多斯","02-28-07-00":"呼伦贝尔","02-28-08-00":"巴彦淖尔","02-28-09-00":"乌兰察布","02-28-10-00":"兴安","02-28-11-00":"锡林郭勒","02-28-12-00":"阿拉善","02-29-01-00":"兰州","02-29-02-00":"嘉峪关","02-29-03-00":"金昌","02-29-04-00":"白银","02-29-05-00":"天水","02-29-06-00":"武威","02-29-07-00":"张掖","02-29-08-00":"平凉","02-29-09-00":"酒泉","02-29-10-00":"庆阳","02-29-11-00":"定西","02-29-12-00":"陇南","02-29-13-00":"临夏","02-29-14-00":"甘南","02-30-01-00":"贵阳","02-30-02-00":"六盘水","02-30-03-00":"遵义","02-30-04-00":"安顺","02-30-05-00":"铜仁","02-30-06-00":"黔西南","02-30-07-00":"毕节","02-30-08-00":"黔东南","02-30-09-00":"黔南","02-31-01-00":"银川","02-31-02-00":"石嘴山","02-31-03-00":"吴忠","02-31-04-00":"固原","02-31-05-00":"中卫","02-32-01-00":"台北","02-32-02-00":"新北","02-32-03-00":"台中","02-32-04-00":"台南","02-32-05-00":"高雄","02-05-04-01":"西塘","02-05-04-02":"乌镇","02-05-09-01":"东极岛","02-05-05-01":"南浔","02-05-03-01":"雁荡山","02-06-02-01":"太湖","02-06-05-01":"周庄","02-07-10-01":"峨眉山","02-07-20-01":"稻城亚丁","02-07-20-02":"海螺沟","02-07-20-03":"康定","02-08-16-01":"香格里拉","02-08-16-02":"雨崩","02-08-04-01":"腾冲","02-08-10-01":"元阳","02-08-11-01":"普者黑","02-10-01-01":"纳木措","02-10-07-01":"墨脱","02-10-04-01":"珠峰","02-11-01-01":"青海湖","02-11-01-02":"祁连山","02-11-06-01":"年保玉则","02-12-14-01":"喀纳斯","02-12-14-02":"禾木","02-14-05-01":"涠洲岛","02-14-03-01":"阳朔","02-14-03-02":"龙脊梯田","02-15-02-01":"鼓浪屿","02-15-07-01":"武夷山","02-15-09-01":"霞浦","02-16-11-01":"婺源","02-17-14-01":"凤凰","02-18-03-01":"武当山","02-19-09-01":"宏村","02-19-16-01":"徽杭古道","02-20-09-01":"泰山","02-20-08-01":"曲阜","02-28-12-01":"额济纳","02-28-10-01":"阿尔山","02-28-07-01":"海拉尔"},setM,host={},scroll_flag=!1,sec_flag=!1,alert_body=$("#delete_alert"),select_del=null,in_album,now_url=window.location.href,is_winsrcoll=!1,state_object={title:"album",url:"/album"},album_list={},like_num=0,favourite_num=0,album_list_tmp=[],album_cover_path="",album_album_name="",album_author_name="",album_album_id="";window.addEventListener("scroll",function(){if($(".photo-arrange-full").hasClass("photo-full-cur")){if(scroll_flag=!0){var o=document.documentElement.clientHeight+(document.documentElement.scrollTop||document.body.scrollTop),e=$(".photo_section_full")[0].scrollHeight+getPos($(".photo_section_full")[0]);o>e&&getThird()}}else scroll_flag=!1});var big_back;paiwoPhoto.on("dolikeOut",function(o){var e=$("li[data="+o+"]");e.find(".photo_fixbox_like").removeClass().addClass("photo_fixbox_liked"),e.find(".inner_liked_img").show()}),paiwoPhoto.on("unlikeOut",function(o){var e=$("li[data="+o+"]");e.find(".photo_fixbox_liked").removeClass().addClass("photo_fixbox_like"),e.find(".inner_liked_img").hide()}),paiwoPhoto.on("unfavoriteOut",function(o){$(".photo_fixbox_dinged[data="+o+"]").removeClass().addClass("photo_fixbox_ding")}),paiwoPhoto.on("dofavoriteOut",function(o){$(".photo_fixbox_ding[data="+o+"]").removeClass().addClass("photo_fixbox_dinged")});var select_path,select_id=0,store=window.store||{},bigpic=window.bigpic||{},photo_flag=0,myflag=0,s_main=$(".stuido_mian"),head_main=$(".stuido_header_textbox"),a=$("#photos"),b=$("#intro"),c=$("#service"),intro=$(".photog_introduction"),servi=$(".photog_service"),album=$(".content_albumbox"),photo=$(".content_photobox"),big_pic_url,is_ie=!1;try{var now_url=window.location.href;history.replaceState({title:"index"},"",now_url),is_ie=!1}catch(e){is_ie=!0}jQuery(function(o){function e(o,e){var t="http://paiwo.co/album/"+album_album_id,a="",o=o+a+" "+t+"（分享自 @拍我 - 最具格调的自由摄影师平台）"||"",e="http://image.paiwo.co/"+album_cover_path+"@!1d5"||"",i="http://service.weibo.com/share/share.php?title="+o+"&appkey=2197733404&pic="+e+"&ralateUid=";window.open(i,"_blank","height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes")}function t(o,e,t){var a="http://paiwo.co/album/"+album_album_id,e=e+"（分享自 @拍我）",t=t||"",i="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title="+encodeURIComponent(o)+"&summary="+encodeURIComponent(e)+"&desc=&url="+encodeURIComponent(a)+"&pics="+t;window.open(i,"_blank","height=525,width=700,top=100,left=400,resizable=yes,scrollbars=yes")}head_main.on("click",".cieclebox_message",function(e){0==is_login?loginInside.show():(o("#top_message").trigger("click"),PWS.addTalk(host.id))}),o(".content_photobox_title").on("click",".tab_share_weibo",function(){var o="http://image.paiwo.co/"+album_cover_path+"@!1d5",t="分享影集「"+album_album_name+"」,摄影师『"+album_author_name+"』作品";e(t,o)}),o(".content_photobox_title").on("click",".tab_share_qzone",function(){var o="http://image.paiwo.co/"+album_cover_path+"@!1d5",e="分享影集「"+album_album_name+'」,摄影师"『'+album_author_name+"』作品";t("拍我网摄影作品分享",e,o)}),o(".content_photobox_title").on("click",".tab_share_wechat",function(){var e=o(".wechat_box"),t="http://paiwo.co/album/"+album_album_id,a=e.find("img");a.attr("src",""),a.attr("src","/a/qrcode/make?share_url="+t+"?"+(new Date).getTime()),e.css({visibility:"visible"}).addClass("active")}),o(".photo-section ul").on("click",".photo_fixbox_like",function(e){if(0==is_login)return loginInside.show(),!1;var t=this.getAttribute("data");doLike(t);var a=o(".photo_fixbox_like[data="+t+"]");a.removeClass().addClass("photo_fixbox_liked"),a.parent().siblings("a").show(),e.stopPropagation()}),o(".photo-section ul").on("click",".photo_fixbox_liked",function(e){var t=this.getAttribute("data");unLike(t);var a=o(".photo_fixbox_liked[data="+t+"]");a.removeClass().addClass("photo_fixbox_like"),a.parent().siblings("a").hide(),e.stopPropagation()}),o(".photo-section ul").on("click","img",function(o){var e=this.parentNode.getAttribute("data");try{history.pushState({title:"show"},"","/photos/"+e)}catch(o){}paiwoPhoto.init(e),paiwoPhoto.trg("showpic"),paiwoPhoto.tool.scrollShow()}),window.onscroll=function(){is_winsrcoll&&(document.documentElement.scrollTop=document.body.scrollTop=0)},init()}),history.pushState&&window.addEventListener("popstate",function(o){{var e=window.location.href,t=document.getElementsByTagName("body")[0],a=paiwoPhoto.tool.scrollbarwidth;host.name}if(/\/album\//.test(e)){var i=window.location.hash;/normal/.test(i)?($(".photo-arrange-normal").addClass("photo-normal-cur"),$(".photo-arrange-free").removeClass("photo-free-cur"),$(".photo-arrange-full").removeClass("photo-full-cur"),$(".photo_section_normal").css("display","block"),$(".photo_section_free,.photo_section_full").css("display","none"),window.location.hash="normal",store.set("photo_section","normal")):/free/.test(i)?($(".photo-arrange-free").addClass("photo-free-cur"),$(".photo-arrange-normal").removeClass("photo-normal-cur"),$(".photo-arrange-full").removeClass("photo-full-cur"),$(".photo_section_free").css("display","block"),$(".photo_section_normal,.photo_section_full").css("display","none"),waterfall(),window.location.hash="free",store.set("photo_section","free")):/full/.test(i)&&($(".photo-arrange-full").addClass("photo-full-cur"),$(".photo-arrange-free").removeClass("photo-free-cur"),$(".photo-arrange-normal").removeClass("photo-normal-cur"),$(".photo_section_full").css("display","block"),$(".photo_section_free,.photo_section_normal").css("display","none"),window.location.hash="full",store.set("photo_section","full")),$(".black_bac").hide(),t.style.overflow="auto",t.style.paddingRight="0px"}else if(/\/photos\//.test(e)){var n=getPhotoId();paiwoPhoto.init(n),$(".black_bac").show(),paiwoPhoto.trg("showpic"),t.style.overflow="hidden",t.style.paddingRight=a+"px"}else $(".black_bac").hide(),photo.hide(),album.fadeIn(400),t.style.overflow="auto",t.style.paddingRight="0px"}),$(".banner_bg").addClass("img_scale"),$(".title_photo_edit").on("mouseenter",function(){$(this).find("i").addClass("title_photo_edit-ihover")}),$(".title_photo_edit").on("mouseleave",function(){$(this).find("i").removeClass("title_photo_edit-ihover")}),$(".title_photo_delete").on("mouseenter",function(){$(this).find("i").addClass("title_photo_delete-ihover")}),$(".title_photo_delete").on("mouseleave",function(){$(this).find("i").removeClass("title_photo_delete-ihover")}),$(".photo-arrange-normal").click(function(){$(this).addClass("photo-normal-cur"),$(".photo-arrange-free").removeClass("photo-free-cur"),$(".photo-arrange-full").removeClass("photo-full-cur"),$(".photo_section_normal").css("display","block"),$(".photo_section_free,.photo_section_full").css("display","none"),window.location.hash="normal",store.set("photo_section","normal")}),$(".photo-arrange-free").click(function(){$(this).addClass("photo-free-cur"),$(".photo-arrange-normal").removeClass("photo-normal-cur"),$(".photo-arrange-full").removeClass("photo-full-cur"),$(".photo_section_free").css("display","block"),$(".photo_section_normal,.photo_section_full").css("display","none"),window.location.hash="free",store.set("photo_section","free")}),$(".photo-arrange-full").click(function(){$(this).addClass("photo-full-cur"),$(".photo-arrange-free").removeClass("photo-free-cur"),$(".photo-arrange-normal").removeClass("photo-normal-cur"),$(".photo_section_full").css("display","block"),$(".photo_section_free,.photo_section_normal").css("display","none"),window.location.hash="full",store.set("photo_section","full")}),$(".photo-section ul").on("mouseenter","li",function(){"36px"==$(this).find(".photo_fixbox").css("height")&&$(this).find(".photo_fixbox").stop().animate({bottom:0},100,"linear")}),$(".photo-section ul").on("mouseleave","li",function(){"36px"==$(this).find(".photo_fixbox").css("height")&&$(this).find(".photo_fixbox").stop().animate({bottom:-36},100,"linear")}),$(".message_close").click(function(){$(".top-tab").css("display","block")}),$(".pocket-delet").on("click",function(){$("#delete_alert").show()}),$("#delete_alert").on("click",".firm-del",function(){deleteAlbum()}),$("#delete_alert").on("click",".cancel-del,.del-close",function(){$("#delete_alert").hide()}),window.addEventListener("scroll",function(){var o=document.documentElement.scrollTop||document.body.scrollTop;0==o?$("#go_top").fadeOut():$("#go_top").fadeIn()},!1),$("#go_top").on("click",function(){$("html,body").stop().animate({scrollTop:0},200)}),photo.on("click",".photo_name",function(){window.open(this.getAttribute("href"))}),window.addEventListener("scroll",function(){var o=document.documentElement.scrollTop||document.body.scrollTop;0==o?$(".pocket-go-top").fadeOut():$(".pocket-go-top").fadeIn()},!1),$(".pocket-go-top").on("click",function(){$("html,body").stop().animate({scrollTop:0},200)}),$(".photo_section_full").on("contextmenu","li",function(){return!1});
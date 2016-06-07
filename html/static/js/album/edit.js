var pic = {
	count:0,  //上传图片计数
	delete_photo_list:[],
	album_id:0,
	type_up:false,
	type_edit:true
 };
//计数DOM
var now_count = $('#now_count'); 

if (!String.prototype.format){
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number){
            return typeof args[number] != 'undefined'
                ? args[number] : match;
        });
    };
}


function allow_init(){

	var allow_type = store.get('allowType');
	var allow_input = $('.input-allow-input');
	switch(allow_type){
		case '01':
			allow_input.html('<span><i class="input-allow_select_i6"></i></span><p>不使用原创授权</p>').attr('data','01');
			break;
		case '02':
			allow_input.html('<span><i class="input-allow_select_i4"></i></span><p>版权所有，禁止转载</p>').attr('data','02');
			break;
		case '03':
			allow_input.html('<span><i class="input-allow_select_i3"></i><i class="input-allow_select_i1"></i><i class="input-allow_select_i5"></i></span><p>署名-非商业使用-禁止演绎</p>').attr('data','03');
			break;
		case '04':
			allow_input.html('<span><i class="input-allow_select_i3"></i><i class="input-allow_select_i1"></i><i class="input-allow_select_i2"></i></span><p>署名-非商业使用-相同方式共享</p>').attr('data','04');
			break;
		case '05':
			allow_input.html('<span><i class="input-allow_select_i3"></i><i class="input-allow_select_i1"></i></span><p>署名-非商业性使用</p>').attr('data','05');
			break;
		case '06':
			allow_input.html('<span><i class="input-allow_select_i3"></i><i class="input-allow_select_i5"></i></span><p>署名-禁止演绎</p>').attr('data','06');
			break;
		case '07':
			allow_input.html('<span><i class="input-allow_select_i3"></i><i class="input-allow_select_i2"></i></span><p>署名-相同方式共享</p>').attr('data','07');
			break;
		case '08':
			allow_input.html('<span><i class="input-allow_select_i3"></i></span><p>署名</p>').attr('data','08');
			break;
		default:
				allow_input.html('<span><i class="input-allow_select_i3"></i></span><p>署名</p>').attr('data','08');
	}
}
		
allow_init();

var file_list_num = 0;
var init_success = false;
var album_id = 0;
var allow_status = 1;
var delete_photo_list = [];


function init_param(){
    file_list_num = 0;
    init_success = false;
    album_id = 0;
    allow_status = 1;
    delete_photo_list = [];
}

function refresh(result){
    init_param();
//    if (result.is_self == 0){
//        window.location.href = '/gallery';
//        init_success = false;
//        return false;
//    }else{
        pic.album_id = result.album_id;
        file_list_num = result.photo_list.length;
        allow_status = result.cc_protocol;
		  var image_template = '<div class="select-file" data-code="{2}" data-file="{1}" data-o="flag">'+
		      '<img src="http://image.paiwo.co/{0}@!280x280">'+
			  '<i class="select-file-i"></i>'+
		      '<div class="photo_fixbox">'+
			  	'<span class="set_cover span-left">设为封面</span><i></i><span class="delete_pic">删除照片</span>'+
			  '</div>'+
			  '</div>';
        var tag_template = '<span>{0}</span>';

        var image_html = '';
        var tag_html = '';

        $.each(result.photo_list, function (n, value) {
            image_html += image_template.format(value.photo_path, value.photo_path, value.photo_id);
        });
    
        $.each(result.tags, function (n, value) {
            tag_html += tag_template.format(value);
        });
    
        $('#photobox').html(image_html);
        $('#tags').html(tag_html);
        $('#input_title').val(result.album_name);
        $('#input_desc').val(result.album_desc);
    
        var $allow = $('.input-allow_select').find('li');
        for (var i=0; i<$allow.length; i++){
            var value = $allow.eq(i);
            var cc_data = value.attr('data');
            if (cc_data == ('0' + result.cc_protocol)){
                $('.input-allow-input').html(value.html());
                break;
            }
        }
//    }
}

function init_edit_album() {
    var album_id = window.location.hash.split('/')[1];
    if (album_id){
        
//        $.ajax({
//            async: false,
//            type: "POST",
//            url: "/a/album/photo/list",
//            dataType: 'json',
//            data: {
//                is_edit: 1,
//                album_id: album_id
//            },
//            success: success,
//            error: error
//        });
        
         base.ajax({

                data:{
                    'method': 'paiwo.content.edit_album.get',
                    'album_id': album_id
                },

                success:success,

                error:error

            });
                
    }
    else{
        slideMessage("非法相册");
        init_success = false;
    }

    function success(data) {
        if (data.error_id == 0) {
			pic.count = data.response.photo_list.length;
			now_count.html(pic.count);
            refresh(data.response);
            init_success = true;
            if(data.response.tags.length!=0){
                $('#input_tag').attr('placeholder','');
            }
//			var allow_tag = data.response.auto_tag;
			
            var photoList = data.response.photo_list;
            for(var i=0;i<photoList.length;i++){
                if(photoList[i].is_cover){
                    var old_cover_path = photoList[i].photo_path;
                }
            }
            
            
            
//			if(allow_tag==1){  //允许托管
//				$('#is_tag').show();
//				is_tag_allow = true;
//			}else{  //不允许托管
//				$('#is_tag').hide();
//				is_tag_allow = false;
//			}
            
			
			if(old_cover_path!=''){  //封面地址不为空
				var _list =  $('#photobox').children();
				for(var i=0;i<_list.length;i++){
					var _path = _list[i].getAttribute('data-file');
					if(_path==old_cover_path){
						_list[i].getElementsByClassName('select-file-i')[0].style.display = 'block';
						album_cover_path = old_cover_path;
					}
				}
                
			}else{  //封面地址为空
                $('#photobox').children()[0].getElementsByClassName('select-file-i')[0].style.display = 'block';
                album_cover_path = $('#photobox').children()[0].getAttribute('data-file');
            }
			
        }else{
            init_success = false;
            slideMessage("获取相册图片列表失败" + data.error_code);
        }

    }
    function error() {
        init_success = false;
        slideMessage("网络错误");
    }

}


	$("#common_tag").on('click', 'span',common_tag_click);
	$("#input_tag_on").on('click', input_tag_click);
	$("#tags").on('click', 'span',delete_tag_click);

	function keyevent(event){
		var actId = document.activeElement.id;
        
		if (event.keyCode ==8){
			if ($("#input_tag").val().length == 0) {
				$("#tags span:last-child").remove();
			}
			else{
				return true;
			}
            
            if($('#tags').children().length==0){
                $('#input_tag').attr('placeholder','在此直接输入标签，使用空格或回车分隔');
            }
            
		}
        
//		if(( event.keyCode==32 || event.keyCode == 13 || event.keyCode == 186 || event.keyCode == 188)){
//			var $_input_tag = $("#input_tag");
//			if ($_input_tag.val().length > 0)
//			{
//                var strLen =  getStrLen($_input_tag.val());
//                $('#input_tag').attr('placeholder','');
//                if(strLen <= 24){
//                    var in_val = $_input_tag.val().replace(/ /g, '');
//                    $("#tags").append('<span>' + in_val + '</span>\n');
//                    var $_input_tag = $("#input_tag");
//                    $_input_tag.focus();
//                    $_input_tag.val("");
//                    return false;
//                }else{
//                    slideMessage('不得超过24个字符');
//                    return false;
//                }
//			}
//			else
//			{
//				$_input_tag.val("");
//				return false;	
//			}
//		}
        
	}





    //	document.onkeydown = keyevent;
    $('#input_tag').on('keydown',keyevent);

    $('#input_tag').on('keyup',function(event){
        
        if(( event.keyCode==32 || event.keyCode == 13 )){
			var $_input_tag = $("#input_tag");
			if ($_input_tag.val().length > 0)
			{
                var strLen =  getStrLen($_input_tag.val());
                $('#input_tag').attr('placeholder','');
                if(strLen <= 24){
                    var in_val = $_input_tag.val().replace(/ /g, '');
                    $("#tags").append('<span>' + in_val + '</span>\n');
                    var $_input_tag = $("#input_tag");
                    $_input_tag.focus();
                    $_input_tag.val("");
                    return false;
                }else{
                    slideMessage('不得超过24个字符');
                    return false;
                }
			}
			else
			{
				$_input_tag.val("");
				return false;	
			}
		}
    });



	function common_tag_click(){
		$("#tags").append('<span>' + $(this).html() + '</span>\n');
        
        //判断当前标签数量
        var tagLength = $('#tags').children();
        console.log(tagLength);
        if(tagLength==0){
            $('#input_tag').attr('placeholder','在此直接输入标签，使用空格或回车分隔');
        }else{
            $('#input_tag').attr('placeholder','');
        }
        
	}

	function input_tag_click(){
		var $_input_tag = $("#input_tag");
		var s = $_input_tag.val();
		var reg = new RegExp(" ", "g");
		s = s.replace(reg, "");
		if(s == ""){
			$_input_tag.val("");
		}
		else{
			$("#input_tag_list").append('<span>' + s + '</span>\n');
			$_input_tag.val("");
		}
	}

	function delete_tag_click(){
		$(this).remove();
		$(this).next().remove();
	}


	function getStrLen(str){
		var res=0;
		var reg=/[\u4e00-\u9fa5]/;
		for(var i=0; i<str.length; i++){
			if(reg.test(str.charAt(i))){
				res+=2;
				break;
			}else{
				res++;
			}
		}
		return res;
	}

		
		//点击许可下拉
var sel_allow_box = $('#allow_select_box'); //许可下拉父级
var b_sel_allow_box = false; //是否为开启状态
var triangle = $('.input-allow .select-arrow'); //三角
var allow_btn = $('.input-allow-input'); //许可下拉按钮
//$('.tab_select_box').stop().animate({'opacity':1,'height':320},200,'linear');
allow_btn.on('click',function(ev){
	if(b_sel_allow_box){
		sel_allow_box.stop().animate({'opacity':0,'height':0},300,'linear');
		b_sel_allow_box = false;
		triangle.removeClass('select-arrow-active');
	}else{
		sel_allow_box.stop().animate({'opacity':1,'height':362},300,'linear');
		b_sel_allow_box = true;
		triangle.addClass('select-arrow-active');
	}
	ev.stopPropagation();
});


//点击许可下拉选项
sel_allow_box.on('click','li',function(){
	var _val = $(this).html();
	var _type = $(this).attr('data');
	allow_btn.html(_val).attr('data',_type);
	store.set('allowType',_type);

});

//底部选项
$('#photobox').on('mouseenter','.select-file',function(){
  $(this).find('.photo_fixbox').stop().animate({ bottom: 5+'px'},100);
});
$('#photobox').on('mouseleave','.select-file',function(){
  $(this).find('.photo_fixbox').stop().animate({ bottom: -30+'px'},100);
});


//设为封面
var photo_box = $('#photobox');
var album_cover_path = '';
photo_box.on('click','.set_cover',function(){
	photo_box.find('.select-file-i').hide();
	$(this).parents('.select-file').find('.select-file-i').stop().fadeIn(100);
	album_cover_path = $(this).parents('.select-file').attr('data-file');
    
});



//删除照片
photo_box.on('click','.delete_pic',function(){
	var _type = $(this).parents('.select-file').find('.select-file-i').css('display');
	if(_type=='block' || _type=='inline'){
		flag = true;
	}else{
        flag = false;
    }
	pic.now_id && uploader.removeFile(pic.now_id);
	var _this = $(this).parents('.select-file');
	if(_this.attr('data-file')){
		if(_this.attr('data-o')=='flag'){
			pic.delete_photo_list.push({'photo_id':_this.attr('data-code')});
		}
		
	}else{
		uploader.removeFile(pic.now_id);
	}
    
	_this.remove();
    pic.count--;
    up_ok(pic.count);
    now_count.html(pic.count);
    
	if(flag){
		if($('#photobox').children()!=0){
			$('#photobox').children().eq(0).find('.select-file-i').show();
            album_cover_path = $('#photobox').children().eq(0).attr('data-file');
			//console.log($('#photobox').children()[0]);
		}
	}
});


//统计是否超过限定36张函数
function up_ok(num){
	if(num<=36){
		now_count.css('color','#b6b3aa');
	}else{
		now_count.css('color','#ff475c');
	}
}


//是否允许托管
var is_tag_allow = true;
$('.checkbox').on('click',function(){
	var _this = $(this).find('i');
	if(is_tag_allow){
		_this.hide();
		is_tag_allow = false;

	}else{
		_this.show();
		is_tag_allow = true;
	}
	return false;
});


//收起下拉菜单
$('#main_box').on('click',function(ev){
	sel_allow_box.stop().animate({'opacity':0,'height':0},300,'linear');
	b_sel_allow_box = false;
	triangle.removeClass('select-arrow-active');
	ev.stopPropagation();
});
		
	
$('#edit_submit').on('click',function(){
			 var request_params = {};
			request_params["new_photo_list"] = [];
            request_params["old_photo_list"] = [];
			request_params['tag_list'] = [];
			
//			//console.log(uploader.total.queued );
			var submit = {
                    count:pic.count,  //上传总张数
                    b_up:false,//是否正在上传
                    b_count:false, //是否超过数量上限
                    b_tag:false, //是否要求托管
                    b_tit:false, //是否填写标题
                    b_desc:false //是否填写描述
			   };
			
			
			//判断是否正在上传
//			uploader.total.queued
			var queued = uploader.total.queued;
			if(queued>0){
				slideMessage('图片正在上传中...');
				submit.b_up = false;
				 return;	
			}else if(queued==0){
				submit.b_up = true;	
			}
			
			
			//检测上传总张数
			var num = $('#photobox').children().length;
			now_count.html(num);
			if(num<=36 && num>0){
				submit.b_count = true;
			}else if(num==0){
				slideMessage('请添加照片');
				submit.b_count = false;
				return;
			}else{
				slideMessage('专辑内图片数量不得超过36张');
				submit.b_count = false;
				return;
			}
			
			
			//检测是否要求标签托管
			var _tag = $('#is_tag').css('display');
			var tag_count = $('#tags').children().length;
			if(is_tag_allow){
				var tag_lists = $('#tags').children();
				for(var i=0;i<tag_lists.length;i++){
					request_params['tag_list'].push(tag_lists[i].innerHTML);
				}
				request_params['auto_tag'] = 1;
				submit.b_tag = true;
			}else if(is_tag_allow ==false && tag_count>0){
				//存tag
				var tag_lists = $('#tags').children();
				for(var i=0;i<tag_lists.length;i++){
					request_params['tag_list'].push(tag_lists[i].innerHTML);
				}
				request_params['auto_tag'] = 0;
				submit.b_tag =true;
			}else if(is_tag_allow == false){
				submit.b_tag = false;
				slideMessage('请填写标签');
				return;
			}
			
			//检测标题是否为空
			var _title = $('#input_title').val();  //标题
			if(_title!=''){
				var str_len = getStrLen(_title);
				if(str_len<=60){
					submit.b_tit =  true;
				}else{
					slideMessage('标题不能超过30个字');
					submit.b_tit = false;
					return;
				}
				
			}else{
				slideMessage('标题不能为空');
				submit.b_tit = false;
				return;
			}
			
			
			
			if(submit.b_up && submit.b_count && submit.b_tag && submit.b_tit ){
				//各种图片处理
				var photo_lists =$('#photobox').children();
				request_params['cover_path'] = '';
                
//                AddPhoto
//                 required bytes photo_path = 1;
//                    required int32 sequence_id = 2;
//                    required bool is_cover = 3;
//                
//                message OldPhoto{
//                    required bytes photo_id = 1;
//                    required bytes photo_path = 2;
//                    required int32 sequence_id = 3;
//                    required bool is_cover = 4;
//                }
//                
				for(var i=0;i<photo_lists.length;i++){
					var _old = photo_lists[i].getAttribute('data-o'),
				        _cover = photo_lists[i].getElementsByClassName('select-file-i')[0],
                        isCover = 0;
                    if(photo_lists[i].getAttribute('data-file')==album_cover_path){
                        isCover = 1;
                    }else{
                        isCover = 0;
                    }
                    
					if(_old){
						var _id = photo_lists[i].getAttribute('data-code'),
                            old_path = photo_lists[i].getAttribute('data-file');
						request_params["old_photo_list"].push({
                            'photo_id':_id,
                            'photo_path':old_path,
                            'sequence_id':0,
                            'is_cover':isCover
                        });
					}else{
						var _path = photo_lists[i].getAttribute('data-file');
						if(_path){
							var tmp = {};
							tmp['photo_path'] = _path;
                            tmp['sequence_id'] = 0;
                            tmp['is_cover'] = isCover;
							request_params['new_photo_list'].push(tmp);
						}else{
							slideMessage('有图片上传失败');
							return;
						}
					}
					
//                    console.log(1);
                    
					//设置封面path
//					if(_cover.style.display=='inline'){
//						request_params['cover_path'] = photo_lists[i].getAttribute('data-file');
//                        console.log(request_params['cover_path']);
//					}
					
				}
				
				//已删除图片
				request_params["delete_photo_list"] = pic.delete_photo_list;
                
				//专辑id
				request_params["album_id"] = pic.album_id;
				
				//专辑名
				request_params["album_name"] = _title;
				
				//专辑描述
				request_params["album_desc"] = $('#input_desc').val();
				
				//cc协议
				request_params["cc_protocol"] = $('.input-allow-input').attr('data');
				
				//封面path
				request_params['cover_path'] = album_cover_path;
				
//				console.log(request_params['cover_path']);
                
//				 $.ajax({
//					async: false,
//					type : "POST",
//					url : "/a/album/edit",
//					dataType : 'json',
//					data: {
//						body: JSON.stringify(request_params)
//					},
//					success : function(data) {
//						if(data.error_id == 0)
//						{
//							window.location.href= "/" + data.result.user_host + "#/album/" + data.result.album_id
//						}
//						else {
//							slideMessage("上传错误");
//						}
//					},
//					error : function(data) {
//						slideMessage("网络错误");
//					}
//				});
                
//                message AddPhoto{
//                    required bytes photo_path = 1;
//                    required int32 sequence_id = 2;
//                    required bool is_cover = 3;
//                }
//                
//                message DeletePhoto{
//                    required bytes photo_id = 1;
//                }
//                
//                message OldPhoto{
//                    required bytes photo_id = 1;
//                    required bytes photo_path = 2;
//                    required int32 sequence_id = 3;
//                    required bool is_cover = 4;
//                }
//                
//                required uint64 user_id = 1;
//                required uint64 album_id = 2;
//                required bytes album_name = 3;
//                required bytes album_desc = 4;
//                required int32 cc_protocol = 5;
//                repeated bytes tags = 6;
//                repeated AddPhoto add_photo_list = 7;
//                repeated DeletePhoto delete_photo_list = 8;
//                repeated OldPhoto old_photo_list = 9;
                
                console.log(request_params);
                
                base.ajax({

                        data:{
                            'method': 'paiwo.content.album.edit',
                            'album_id': pic.album_id,
                            'album_name': request_params["album_name"],
                            'album_desc': request_params["album_desc"],
                            'cc_protocol': request_params["cc_protocol"],
                            'tags': request_params['tag_list'],
                            'old_photo_list': request_params["old_photo_list"],
                            'delete_photo_list': request_params["delete_photo_list"],
                            'add_photo_list': request_params['new_photo_list']
                        },

                        success:function(data){
                            if(data.error_id == 0){
                                window.location.href= "/album/" + data.response.album_id;
                            }
                            else {
                                slideMessage("上传错误");
                            }
                        },

                        error:function(data){
                //            slideMessage('网络错误');
                        }

                });
                
                
			}
			
		});

	$('#edit_cancel').on('click', function(){
		var jump_url = $(".tab-icon_mybrowse").attr('href');
		if (jump_url){
			window.location.href = jump_url;
		}
		else{
			window.location.href = '/album/'+window.location.hash.split('/')[1];
		}
	});
	window.onhashchange = init_edit_album;
	init_edit_album();

//上部信息提示
var mes = $('.setting_succeed');
var setM= null;
function showMessage(str){
    slideMessage(str);
}
function slideMessage(str){
  clearTimeout(setM);
	mes.html(str).animate({top: 0}, 400, function(){
    setM = setTimeout(hideMessage, 1800);
    
    });
}
function hideMessage(){
	mes.animate({top: '-40px'}, 400);
}

	//uploader.init();

$('.qusetion-hover').mouseenter(function(){
	$('.list-qusetion-hover').show();
});
$('.qusetion-hover').mouseleave(function(){
	$('.list-qusetion-hover').hide();
});


//换标签
var tagSpan = 0;
$('.tags-type span').click(function(){
	var tagIndex = $('.tags-type span').index($(this));
	if(tagSpan!=tagIndex){
		tagSpan = tagIndex;	
		$('.tags-rela div').fadeOut(100);
		for(var i=0;i<$('.tags-rela').length;i++){
			$('.tags-rela').eq(i).find('div').eq(tagIndex).fadeIn(100);
		}
	}	
});
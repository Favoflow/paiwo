var pic = {
	count:0,  //上传图片计数
	now_id:null, //当前上传图片
	pre_obj:null,
	type_up:true,
	type_edit:false
 };

//计数DOM
var now_count = $('#now_count'); 
var setM;

//显示顶部信息
var setM;
function showMessage(content){
	clearTimeout(setM);
    $('.message-box').html(content).animate({top: 0}, 400,function(){
		setM = setTimeout(hideMessage, 1500);
	});
}
function hideMessage(){
	$('.message-box').animate({top: '-52px'}, 400)
}



//许可初始化
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
	
	
	$("#common_tag").on('click', 'span',common_tag_click);
	$("#input_tag_on").on('click', input_tag_click);
	$("#tags").on('click', 'span',delete_tag_click);

	function keyevent(event){
        
        
//         alert(event.keyCode);
        
//        console.log(event);
        
		var actId = document.activeElement.id;
        
		if ( event.keyCode ==8){
            
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
//            
//            console.log('in');
//            
//			var $_input_tag = $("#input_tag");
//			if ($_input_tag.val().length > 0){
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
//			}else{
//				$_input_tag.val("");
//				return false;	
//			}
//		}
        
        
	}

    $('#input_tag').on('keydown',keyevent);
    
    $('#input_tag').on('keyup',function(event){
        
       if(( event.keyCode==32 || event.keyCode == 13)){
            
            console.log('in');
            
			var $_input_tag = $("#input_tag");
			if ($_input_tag.val().length > 0){
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
			}else{
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
        
        if(!$(this).hasClass('active')){
            $(this).remove();
		    $(this).next().remove();
        }
        
	}


	function getStrLen(str){
		var res=0;
		var reg=/[\u4e00-\u9fa5]/;
		for(var i=0; i<str.length; i++){
			if(reg.test(str.charAt(i))){
				res+=2;
			}else{
				res++;
			}
		}
		return res;
	}
		
		
		$('#album_submit').on('click',function(){
			 var request_params = {};
			request_params['photo_list'] = [];
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
				//图片路径
				var photo_lists =$('#photobox').children();
//				//console.log(photo_lists[1].getAttribute('data-file'));
				request_params['cover_path'] = '';
				for(var i=0;i<photo_lists.length;i++){
					var _path = photo_lists[i].getAttribute('data-file'),
					    _cover = photo_lists[i].getElementsByClassName('select-file-i')[0];
                    var tmp = {};
                    //设置封面path
					if(_cover.style.display=='inline'){
						request_params['cover_path'] = photo_lists[i].getAttribute('data-file');
                        tmp['is_cover'] = 1;
					}else{
                        tmp['is_cover'] = 0;
                    }
                    
					if(_path){
						tmp['photo_path'] = _path;
                        tmp['sequence_id'] = 0;
						request_params['photo_list'].push(tmp);
					}else{
						slideMessage('有图片上传失败');
						return;
					}
					
					
					
				}
				
				//专辑名
				request_params["album_name"] = _title;
				
				//专辑描述
				request_params["album_desc"] =  $('#input_desc').val();
				
				//cc协议
				request_params["cc_protocol"] = $('.input-allow-input').attr('data');
				
                //封面路径
//				request_params['cover_path'] = album_cover_path;
                
				console.log(request_params);         
                  base.ajax({

                        data:{
                            'method': 'paiwo.content.album.add',
                            'album_name':request_params["album_name"],
                            'album_desc':request_params["album_desc"],
                            'cc_protocol':request_params["cc_protocol"],
                            'tags':request_params['tag_list'],
                            'photo_list':request_params['photo_list']
                        },

                        success:function(data){
                            if(data.error_id == 0){
                                
//                                var tag = store.get('activity_tag');
//                                if(tag){
//                                    store.set('activity_upload',1);
//                                    store.remove('activity_tag');
//                                    window.location.href= "/activity/campus_contest";
//                                }else{
//                                    window.location.href= "/album/" + data.response.album_id; 
//                                }
                                
                                var tags = $('#tags').find('span').hasClass('active');
                                if(tags){  //有参赛标签
                                    window.location.href= "/activity/campus_contest";
                                }else{
                                    window.location.href= "/album/" + data.response.album_id; 
                                }
                                
                               
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
		
		
		
$('#album_cancel').on('click', function(){
    var jump_url = $(".tab-icon_mybrowse").attr('href');
    if (jump_url){
        window.location.href = jump_url;
    }
    else{
        window.location.href = '/'+top_data.user_domain;
    }
});

/*删除图标显示效果*/
$('.select-file').live('mouseenter',function(){
    $(this).find('.pic_delete').show();
});

$('.select-file').live('mouseleave',function(){
    $(this).find('.pic_delete').hide();
});


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

//设置为相册的封面
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
	var _this = $(this).parents('.select-file');
	if(_this.attr('data-file')){
		
	}else{
		uploader.removeFile(_this.attr('id'));
	}
    
   
	_this.remove();
     pic.count--;
     up_ok(pic.count);
     now_count.html(pic.count);
    
	if(flag){
		if($('#photobox').children()!=0){
			$('#photobox').children().eq(0).find('.select-file-i').show();
            album_cover_path = $('#photobox').children().eq(0).attr('data-file');
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

//收起下拉菜单
$('#main_box').on('click',function(ev){
	sel_allow_box.stop().animate({'opacity':0,'height':0},300,'linear');
	b_sel_allow_box = false;
	triangle.removeClass('select-arrow-active');
	ev.stopPropagation();
});

//问号
$('.qusetion-hover').on('mouseenter',function(){
    $('.list-qusetion-hover').show();
});

$('.qusetion-hover').on('mouseleave',function(){
     $('.list-qusetion-hover').hide();
});


//添加默认标签
function sigmaInit(){
	var sigmatab = store.get('sigmaTab');
	if(sigmatab){
		$('#tags').append('<span>'+sigmatab+'</span>');
		store.remove('sigmaTab');
	}
    
    var tag = store.get('activity_tag');
    if(tag=='campus'){
        $('#tags').append('<span class="active">华东高校摄影大赛</span>');
		store.remove('activity_tag');
    }
}

sigmaInit();





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
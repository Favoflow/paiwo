var pic = {
	count:0,  //上传图片计数
	now_id:null, //当前上传图片
	pre_obj:null,
	type_up:true,
	type_edit:false,
    photoCount:0, //队列总数
    uploadList: null,
    uploading:false,
    removePicId:null
 },
    createBox = $('#create-select-box .setProject-main-box'),  //上传图片父级
    selectBox = $('#create-select-box'),
    bottomTab = $('.bottom-tab'),
    saveSelectBox = $('#save-select-box');
//canvas进度条
function draw(obj,per){
	if(obj){
	var context = obj.getContext('2d');
		var W = obj.width;
		var H = obj.height;
		context.clearRect(0,0,W,H);
		context.font="Bold 14px Microsoft YaHei";
		context.fillStyle = '#fff';
		if(per==100){
			context.beginPath();
			context.lineWidth = 3;
			context.strokeStyle = '#fafafa';
			context.arc(100,100,30,0*Math.PI,2*Math.PI,false);
			context.fillText('100%',82,105);
			context.stroke();
			return;
		}else if(per==0){
			context.beginPath();
			context.lineWidth = 3;
			context.strokeStyle = '#fafafa';
			context.fillText('0%',96,105);
			context.stroke();
			return;
		}else{
			var deg = per/100*2-0.5;
			context.beginPath();
			context.lineWidth = 3;
			context.strokeStyle = '#fafafa';
			context.arc(100,100,30,1.5*Math.PI,deg*Math.PI,false);
			context.fillText(per+'%',88,105);
			context.stroke();
			return;
		}
	}
}


//创建一个虚拟的地址
function getFileUrl(file){
    var url = null;
     if(window.createObjectURL != undefined){
            url = window.createObjectURL(file);
     }else if(window.URL != undefined){	
            url = window.URL.createObjectURL(file);
      }else if(window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
      }
      return url;  
}

function getProId(){
    var str = null;
    if(typeof selectCreate !='undefined'){
        str = selectCreate.getProId();
    }else{
        str = selectInner.getProId().projectId;
    }
    return str;
}

var uploader = new plupload.Uploader({
	runtimes : 'html5',
	browse_button : 'photo-add',
	container: 'setProject-main',
	url : 'http://paiwo.oss-cn-hangzhou.aliyuncs.com',
	flash_swf_url : '/static/js/plupload/Moxie.swf',
	silverlight_xap_url : '/static/js/plupload/Moxie.xap',
	filters : {
		max_file_size : '20mb',
		mime_types: [
			{title : "Image files", extensions : "jpg,jpeg,png,tiff,tif"}
		]
	},
	init: {
		PostInit: function(up, files) {
            
            
		},
		FilesAdded: function(up, files) {
            
			pic.photoCount += files.length;
            console.log(files);
            pic.uploadList = files;
//            console.log(pic.photoCount);
            bottomTab.find('.create-submit').addClass('forbid');
            bottomTab.find('.upload-btn').hide();
//            console.log(pic.count+' | '+pic.photoCount);
            bottomTab.find('.switch-btn').html('<span class="loading" style="width:'+parseInt(pic.count/pic.photoCount*100)+'%;"></span><i class="hover">已上传<i class="count">'+pic.count+'</i>张/共<i></i>'+pic.photoCount+'张</i>').show();
//            bottomTab.find('.switch-btn .loading').css('width',Math.ceil(pic.count/pic.photoCount*100)+'%');
//             bottomTab.find('.switch-btn .loading').css('width','100%');
//            createBox.find('#photo-add').hide();
            
			//单次上传总个数
			var review_file_list = [];
			plupload.each(files, function(file) {
//                console.log(file);
				//获取blob
               var $_file_list = $('#create-select-box .setProject-main-box li:last');
//                console.log($_file_list);
//                var $_file_list = $('.setProject-main-box');
				review_file_list.push(file);
               var now_html = '<li class="setProject" id="'+ file.id +'" data-load="1">'+
                  '<div class="setProject-img-box">'+
                    '<div class="shadow"></div>'+
                    '<img src="">'+
                    '<p class="delete-btn"><i></i>删除照片</p>'+
                    '<canvas class="canvas"></canvas>'+
                  '</div>'+
                  '<h4>'+file.name+'</h4>'+
                '</li>';
				
				$_file_list.before(now_html);
//                $_file_list.append(now_html);
				var photo_id_tmp = document.querySelector('#'+ file.id);
				var canvas_tmp = photo_id_tmp.querySelector('.canvas');
				draw(canvas_tmp,0);
				
			});
			for(var _o=0;_o<review_file_list.length;_o++){
				var _file = review_file_list[_o];
				var file_id = _file.id;
			}
            uploader.start();
            pic.uploading = true;
		},
        
		BeforeUpload:function(up, file){
            var flag = false,
                _id =  getProId(),
                _data = {
                    'method':'paiwo.cloud.select.photo.upload.get'
                };
            
            
            $.ajax({
                async: false,
                type : "POST",
                url : "/rest",
                dataType : 'json',
                data:{
                    data:JSON.stringify(_data)
                },
                success : function(data) {
//                    console.log(data);
                if(data.error_id == 0){
                    var _result = data.response;
                    uploader.setOption("multipart_params",{"Cache-Control": 'max-age=25920000', "policy": _result.policy ,"Signature":_result.signature, "OSSAccessKeyId":_result.key_id, "key":_result.object_key , "success_action_status":201});
                }else{
                    uploader.stop();
                }
                },
                error : function(data) {
                    uploader.stop();
                }
            });
            
		},
		
		UploadProgress: function(up, file) {
//			//console.log(file);
			$('#'+file.id).find('.canvas').remove();
				pic.now_id = file.id;
            var $_file_image = $('#' + file.id);
			$_file_image.find('canvas').remove();
            var _z = '<canvas id="canvas'+file.id+'"></canvas>';
			$_file_image.find('.setProject-img-box').append(_z); 
			var canvas = document.getElementById('canvas'+file.id);
			draw(canvas,file.percent);
            
//            pic.count++;
//            bottomTab.find('.switch-btn .count').html(pic.count);
//            console.log(pic.count/pic.photoCount);
//            bottomTab.find('.switch-btn .loading').css('width',Math.ceil(pic.count/pic.photoCount*100)+'%');
           
			
        },
		
		FileUploaded: function(up, file, res){
            
			var $_file_image = $('#' + file.id);
			if(pic.removePicId == file.id)return;
            $_file_image.removeAttr('data-load');
            var obj = $(res.response).find("Key").text();
			$_file_image.find('.shadow').remove();
			$_file_image.find('canvas').remove();
			$_file_image.attr('data-file',obj);
            var imgurl = "http://image.paiwo.co/" + obj + "@!280x280";
			$_file_image.find('img').attr('src',imgurl);
            
            
			
			//总数计数
			pic.count++;
            bottomTab.find('.switch-btn .count').html(pic.count);
//            console.log(pic.count/pic.photoCount);
            bottomTab.find('.switch-btn .loading').css('width',Math.ceil(pic.count/pic.photoCount*100)+'%');
            if(pic.count==pic.photoCount){
//                pic.count = pic.photoCount = createBox.find('.setProject').length;
                bottomTab.find('.create-submit').removeClass('forbid');
                bottomTab.find('.switch-btn').hide();
                bottomTab.find('.upload-btn').show();
//                createBox.find('#photo-add').show();
                pic.uploading = false;
            }
//            var num = 0;
//            
//            for(var i=0;i<pic.uploadList.length;i++){
//                if(pic.uploadList[i].percent == 100){
//                    num++;
//                }
//            }
//            pic.count = num;
//        
//            bottomTab.find('.switch-btn .count').html(num);
//            console.log(num/pic.photoCount);
//            bottomTab.find('.switch-btn .loading').css('width',Math.ceil(num/pic.photoCount*100)+'%');
//            if(num==pic.photoCount){
//                bottomTab.find('.create-submit').removeClass('forbid');
//                bottomTab.find('.switch-btn').hide();
//                bottomTab.find('.upload-btn').show();
//            }
            
            
            
        },
        
		Error: function(up, err) {
			//上传失败报错
			if(err.code==-500){
				$('#error_info').show();
				return;
			}
			var err_photo = $('#'+err.file.id);
            if(err.code == -200){
				slideMessage(err.file.name+'上传失败');
				err_photo.find('canvas').hide();
				err_photo.find('.shadow').html('上传失败');
			}else if(err.code == -600){
				slideMessage('上传图片必须小于20M');
			}if(err.code==-601){
				slideMessage('上传图片只支持jpg,jpeg,png,tiff格式');
			}
			
			var s =err; 
			console.log(JSON.stringify(s));
//            alert(s);
        }
        
	}
});
uploader.init();


//移入图片显示删除
createBox.on('mouseenter','.setProject',function(){
    $(this).find('.delete-btn').stop().animate({ bottom: 0},100);
});

createBox.on('mouseleave','.setProject',function(){
    $(this).find('.delete-btn').stop().animate({ bottom: -30},100);
});




//提示信息
selectBox.on('mouseenter','.question',function(){
    $('.list-qusetion-hover').show();
});


selectBox.on('mouseleave','.question',function(){
    $('.list-qusetion-hover').hide();
});





/*************************************上传、编辑公用****************************************************/

//底部上传按钮
bottomTab.on('click','.upload-btn',function(){
    $('#photo-add').trigger('click');
});

var hoverTm= '';

//上传队列移入
bottomTab.on('mouseenter','.switch-btn',function(){
    if(pic.count==pic.photoCount)return;
    var $this = $(this);
    hoverTm = $this.html();
//    console.log(hoverTm);
    $this.find('.hover').html('停止上传');
    
});

//上传队列移出
bottomTab.on('mouseleave','.switch-btn',function(){
    if(pic.count==pic.photoCount)return;
    $(this).html(hoverTm);
});


//点击停止
bottomTab.on('click','.switch-btn',function(){
    var num = 0;
    if(pic.count==pic.photoCount)return;
//    uploader.stop();
    
    bottomTab.find('.upload-btn').show();
    bottomTab.find('.switch-btn').hide();
    bottomTab.find('.create-submit').removeClass('forbid');
//    createBox.find('#photo-add').show();
    createBox.find('.setProject').each(function(index,ele){
        if(!$(this).attr('data-file')){
            uploader.removeFile($(this).attr('id'));
            $(this).remove();
            pic.count--;
            pic.photoCount--;
            
        }
    });
    pic.count = pic.photoCount = createBox.find('.setProject').length;
;    
});










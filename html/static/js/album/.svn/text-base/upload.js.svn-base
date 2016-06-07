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


//var file_list_num = 0;
var uploader = new plupload.Uploader({
	runtimes : 'html5',
	browse_button : 'select_file',
	container: 'father_select_file',
    drop_element: ['photobox', 'father_select_file'],
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
            var $_error_info = $("#error_info");
            var $_select_file = $('#select_file');
            var $_father_select_file = $('#father_select_file');
//            $_error_info.addClass("hide");
		},
		FilesAdded: function(up, files) {
            
            console.log(files);
            //总数计数
			pic.count+=files.length;
			up_ok(pic.count);
			now_count.html(pic.count);
			
			//单次上传总个数
			var review_file_list = [];
			plupload.each(files, function(file) {
				//获取blob
				var $_file_list = $('#photobox');
				var flag = false;
				if($_file_list.children().size()==0){
					flag = true;
				}
				review_file_list.push(file);
                var _z = '<span class="pic_shadow"></span><canvas class="canvas" width="200" height="200"></canvas><img src="" width="190" height="190" /><div style=" background:#3DB6E3; display:inline-block;height:12px; width:0%"></div>';
                var now_html = '<div class = "select-file" id="' + file.id + '">'+ _z + '<i class="select-file-i"></i><div class="photo_fixbox"><span class="set_cover span-left">设为封面</span><i></i><span class="delete_pic">删除照片</span></div></div>';
				
				$_file_list.append(now_html);
				if(flag){
					$('#'+ file.id).find('.select-file-i').show();
				}
				var photo_id_tmp = document.querySelector('#'+ file.id);
				var canvas_tmp = photo_id_tmp.querySelector('.canvas');
				draw(canvas_tmp,0);
				
			});
			for(var _o=0;_o<review_file_list.length;_o++){
				var _file = review_file_list[_o];
				var file_id = _file.id;
			}
            uploader.start();
		},
		BeforeUpload:function(up, file){
            var res = {};
            var flag = false;
            $.ajax({
                async: false,
                type : "POST",
                url : "/a/album/photo/uploadurl/get",
                dataType : 'json',
                success : function(data) {
                    res = data;
                    flag = true;
                },
                error : function(data) {
                    res = data;
                }
            });
            if (flag == true ){
                uploader.setOption("multipart_params",{"Cache-Control": 'max-age=25920000', "policy": res.response.policy ,"Signature":res.response.signature, "OSSAccessKeyId":res.response.key_id, "key":res.response.object_key , "success_action_status":201});
            }
            else{
                uploader.stop();
            }
		},
		
		UploadProgress: function(up, file) {
//			//console.log(file);
			$('#'+file.id).find('.canvas').remove();
				pic.now_id = file.id;
            var $_file_image = $('#' + file.id);
			$_file_image.find('canvas').remove();
            var _z = '<canvas id="canvas'+file.id+'" width="200" height="200"></canvas>';
			$_file_image.append(_z); 
			var canvas = document.getElementById('canvas'+file.id);
			draw(canvas,file.percent);
			
        },
		
		FileUploaded: function(up, file, res){
//			//console.log(file);
			
			var $_file_image = $('#' + file.id);
			
            var obj = $(res.response).find("Key").text();
			$_file_image.find('img').removeClass('active');
			$_file_image.find('.pic_shadow').remove();
			$_file_image.find('canvas').remove();
			$_file_image.attr('data-file',obj);
            var imgurl = "http://image.paiwo.co/" + obj + "@!280x280";
			$_file_image.find('img').attr('src',imgurl);
			if(pic.type_up && uploader.total.uploaded==1){
				$_file_image.find('.select-file-i').show();
			}
            
			
			//总数计数
//			pic.count++;
//			up_ok(pic.count);
//			now_count.html(pic.count);
        },
		Error: function(up, err) {
			//上传失败报错
			if(err.code==-500){
				$('#error_info').show();
				return;
			}
			var err_photo = $('#'+err.file.id);
            if(err.code == -200){
				showMessage(err.file.name+'上传失败');
				err_photo.find('canvas').hide();
				err_photo.find('.pic_shadow').html('上传失败');
			}else if(err.code == -600){
				showMessage('上传图片必须小于20M');
			}if(err.code==-601){
				showMessage('上传图片只支持jpg,jpeg,png,tiff格式');
			}
			
			var s =err; 
			//console.log(JSON.stringify(s));
        }
	}
});
uploader.init();


//改变顺序拖拽
var photoBox = $('#photobox'),
    photoList = photoBox.children();
 
















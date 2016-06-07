 
var myts;  //加 class
var pocket = {};    
    pocket.tool= {};
   
    pocket.bindNode = function(){
        this.main = $('.pocket-content');       //pocket 视窗
        this.vmain = $('.pocket-vir-content');      //pocket 虚拟视窗
        this.files = $('#pocketFiels');
        this.t = {};                                //dom操作的时候的缓存对象
    }
    pocket.alterView = function(){
    $('.pocket-vir-content').css({top:-50000,left:-2000});
        
        
        $('.pocket-content').on('selectstart', function(e){
            
            //禁止图片被选中
           e.preventDefault(); 
        });
    }
    
    pocket.bindEvent = function(){
        var main  = this.main,
            vmain = this.vamin,
                t = this.t;
                myts = t;
        $('#addImg').on('click', function(){
            
            myindex = 0;
            $('#pocketFiels').trigger('click');
        });
        $('#hidediv').on('change', '#pocketFiels', function(){
              if(first){
              first == false;
              $('.text-add').hide();
           }
           //添加图片
            for(var i =0; i<this.files.length; i++){
                if(pocket.tool.checkFile(this.files[i])){
                    pocket.tool.addFile(this.files[i],myindex);
                }
            }
            
            $('#hidediv').prepend('<input type="file" multiple id="pocketFiels" accept="image/jpg,image/png,image/jpeg">');
             $(this).remove();
        });
        
        

       
       $('#addText').on('click', function(e){
           
           //添加文本
           myindex = 0;
           pocket.tool.addText(myindex);
           
           
       });
       
        main.on('click', '.a-flag', function(e){
            e.stopPropagation();
        });
        
        
        
        
        
        
        main.on('click','.pocket-text', function(e){
            
            //图片click事件
            var t = $(this);
            
            if(t.hasClass('pocket-text-select')){
                //blur
                
               //pocket.tool.clearAllFocus();                
                
                
            }else{
                //focus
                pocket.tool.clearAllFocus();
                t.addClass('pocket-text-select');
                showLabel(t.position().left,t.position().top,t.width());
                showAddLabel(t.position().top, t.height());
            }
            
            e.stopPropagation();


                 
            
            
        });

       
        
        
        

        main.on('selectstart','.pocket-text', function(e){e.stopPropagation();});
        main.on('click', '.p-r', function(e){e.stopPropagation();});
        main.on('click', '.p-b', function(e){e.stopPropagation();});
        main.on('click', '.p-rb', function(e){e.stopPropagation();});
        
        
        
        
        
        
        main.on('input', '.pocket-text', function(){
            if(this.scrollHeight != this.sc){
                this.sc = this.scrollHeight;
                this.box.height(this.sc);
                pocket.tool.updatePosition();
            } 
            
        });
        main.on('paste', '.pocket-text', function(){
            
            setTimeout(clearStyle.bind(this),300);
            
        });
        
       
       main.on('mousedown', '.p-r', function(e){
            t.flag = true;
            t.type = 'width';
            t.target = $(this);
            t.target_box = t.target.parent();
            t.w = t.target_box.width();
            t.h = t.target_box.height();
            t.ol = t.target_box.offset().left;
            t.ot = t.target_box.offset().top;
            t.target_img = t.target_box.find('img');
            t.target_box.attr('draggable', 'false');
           
           
            t.r = t.target_box.find('.p-r');
            t.b = t.target_box.find('.p-b').hide();
            t.rb = t.target_box.find('.p-rb').hide();
           
           
            t.target_box.find('.add-flag').hide();
            t.target_box.find('.del-flag').hide();
           

           e.stopPropagation();
       });
        
        
        

        main.on('mousedown', '.p-b', function(e){
            t.flag = true;
            t.type = 'height';
            t.target = $(this);
            t.target_box = t.target.parent();
            t.w = t.target_box.width();
            t.h = t.target_box.height();
            t.ol = t.target_box.offset().left;
            t.ot = t.target_box.offset().top;
            t.target_img = t.target_box.find('img');
            t.target_box.attr('draggable', 'false');
            t.b = t.target_box.find('.p-b');
            t.r = t.target_box.find('.p-r').hide();
            t.rb = t.target_box.find('.p-rb').hide();
            
            
            t.target_box.find('.add-flag').hide();
            t.target_box.find('.del-flag').hide();
             e.stopPropagation();
       });
    
       main.on('mousedown', '.p-rb', function(e){
            t.flag = true;
            t.type = 'rb';
            t.target = $(this);
            t.target_box = t.target.parent();
            t.w = t.target_box.width();
            t.h = t.target_box.height();
            t.ol = t.target_box.offset().left;
            t.ot = t.target_box.offset().top;
            t.target_img = t.target_box.find('img');
            t.target_box.attr('draggable', 'false');
           
            t.b = t.target_box.find('.p-b').hide();
            t.r = t.target_box.find('.p-r').hide();
            t.rb = t.target_box.find('.p-rb');
           
            t.target_box.find('.add-flag').hide();
            t.target_box.find('.del-flag').hide();
            e.stopPropagation();
       });
        
        
       $(document).on('mousemove', function(e){
            if(t.flag){
                if(t.type == 'width'){
                    var w = t.target_box.width();
                        if(w>900 ||w< 280){
                            return false;
                            }
                         var x = e.pageX - t.ol -10;
                          t.target.css({left:x-5})
                          t.target_box.width(x);
                       
                    
                }else if(t.type == 'height'){
                    var h = t.target_box.height();
                    
                    
                     if(h>1440 ||h< 280){
                         return false;
                     }
                    var y = e.pageY - t.ot -5;
                    t.target.css({top: y});
                    t.target_box.height(y);

                    
                }else{
                    var h = t.target_box.height();
                    var w = t.target_box.width();

                     if(h<1450 && h>280){
                        var y = e.pageY - t.ot -5;
                        t.target.css({top: y});
                        t.target_box.height(y);

                     }
                    
                    if(w<901&&w >280){
                         var x = e.pageX - t.ol -10;
                          t.target.css({left:x-5});
                          t.target_box.width(x);
                    }
                    
                }   
            }
            
            
            
        });
        
        
        
        
        
        
        $(document).on('mouseup', function(e){
            if(t.flag){
                
            
             t.target_box.attr('draggable', 'true');
             t.flag = false;
                     if(t.type == 'width'){
                         pocket.tool.changeSize(t.type,t.target_box.width());  //改变边框长宽

                     }else if(t.type == 'height'){

                         pocket.tool.changeSize(t.type,t.target_box.height()); 

                     }else{

                         pocket.tool.changeSize(t.type,t.target_box.width(),t.target_box.height()); 

                     }
              //t.target_box.addClass('select');      
            }
        });    
        
        
        
        main.on('dragstart', '.p-blo', function(e){
              e.originalEvent.dataTransfer.setData("movename",this.box.index());
        });
        main.on('dragover', '.p-blo', function(e){e.preventDefault();});
        main.on('dragenter', '.p-blo', function(e){e.preventDefault();});
        
        
        
        
        
        main.on('drop', '.p-blo', function(e){
            var t = e.originalEvent.dataTransfer.getData("movename");
            var x = this.box.index();   
            if(t!=x){
              pocket.tool.swap(t, x);
              pocket.tool.updatePosition();
            }
        });
        
        main.on('click', '.p-blo', function(e){
            //$('.p-blo').not('.text-wrap').removeClass('select');
            
            var t = $(this);
            if(t.hasClass('select')){
                pocket.tool.clearAllFocus();  
            }else{
                pocket.tool.clearAllFocus();
                t.addClass('select');
                pocket.t.target_box = $(this);
                pocket.tool.upBorder();
                t.find('.p-r,.p-b,.p-rb').fadeIn(400);   
            }
            e.stopPropagation();
        });
        

            
        
        main.on('click', '.b-img', function(e){
            //图片    添加图片    
            myindex = $(this).parents('.p-blo')[0].box.index()+1;
            $('#pocketFiels').trigger('click');
            e.stopPropagation();
        });
        
         main.on('click', '.b-text', function(e){
            //图片    添加文本
            
             myindex = $(this).parents('.p-blo')[0].box.index()+1;
             pocket.tool.addText(myindex);
            
            
            e.stopPropagation();
        });
        
        
        main.on('click', '.a-text', function(e){
            //文本框    添加文本
            if(first){
              myindex = 0;
            }else{
              myindex  = $('.pocket-text-select')[0].box.index()+1;
            }
             pocket.tool.addText(myindex);
            e.stopPropagation();
        });
        
        
         main.on('click', '.a-img', function(e){
            //文本框    添加图片
            if(first){
              myindex = 0;
            }else{
              myindex  = $('.pocket-text-select')[0].box.index()+1;
            }
              $('#pocketFiels').trigger('click');
            e.stopPropagation();
        });
        
    /*************文本编辑区*****************/    
        main.on('click', '.font-1,.font-2', function(e){
            var t = $(this);

            if(t.hasClass('edit-select')){
                return;
            }
            var x = $('.pocket-text-select');            
            if(t.hasClass('font-1')){
                $('.font-1').addClass('text-edit-select');
                $('.font-2').removeClass('text-edit-select');
                x.removeClass('text-font');
            }else{
                $('.font-2').addClass('text-edit-select');
                $('.font-1').removeClass('text-edit-select');
                x.addClass('text-font');
            }
            
            e.stopPropagation();
        });
        
        
        main.on('click', '.align-left,.align-center,.align-right', function(e){
            var t = $(this);
            if(t.hasClass('edit-select')){
                return;
            }
            var x = $('.pocket-text-select');            
            
            $('.a-edit-align i').removeClass('text-edit-select');
            t.addClass('text-edit-select');
            x.removeClass('text-center');
            x.removeClass('text-right');
            if(t.hasClass('align-right')){
                x.addClass('text-right');
            }else if(t.hasClass('align-center')){
                x.addClass('text-center');
            }else{

            }
                
            e.stopPropagation();
        });
        
        
        
        
        main.on('click', '.a-delete', function(e){

            pocket.tool.deleteTarget($('.pocket-text-select'));
            e.stopPropagation();
        });
        
        
        
        
        
        
        main.on('click', '.del-flag-one', function(e){
            //删除图片
             var target = $(this).parents('.p-blo');
             pocket.tool.deleteTarget(target);

            e.stopPropagation();
        });
        
        main.on('click', '.del-flag-two', function(e){
            //还原
                recovery(this);    
            e.stopPropagation();
        });
    
        main.on('click', function(e){
            
            //失去焦点事件
           if(first){
            return;
           }
           pocket.tool.clearAllFocus();
           e.stopPropagation(); 
        });
        
        $('#ok').on('click', function(e){   
            
            if(m.count!=0){
                showMessage('还有照片没上传完');
                return;
            }
            if(m.sendData.cover_photo == ''){
                showMessage('请上传封面');
                return;
            }
            
            if($('.main-title').val().trim().length ==0){
                showMessage('请填写主标题');
                return;
            }
            pocket.tool.setData();
            pocket.tool.release();
            window.onbeforeunload = null;
        });
        
        $('#addCov, .stuido_header_editicon').on('click', function(e){
            
            $('#cover').trigger('click');
            
        });
        $('#cover').on('change', function(){
            if(!pocket.tool.checkFile(this.files[0])){
                return;
            }
            //封面
             var file = this.files[0];
             m.count ++;
             m.max++;
            var form = new FormData();
            var url = URL.createObjectURL(file);
            
            
            
            var img = new Image();
            img.src = url;
            img.onload = function(){
                $('.cover-status').css('background-image','url('+url+')');
                $('.cover-bac').hide();
                $('.cover-status').show();
            }
            
            
            
            

         $.ajax({
            async: false,
            type: "POST",
            url: "/a/user/avatar/uploadurl/get",
            dataType: 'json',
            success: function(data) {
                form.append("Signature", data.response.signature);
                form.append("policy", data.response.policy);
                form.append("OSSAccessKeyId", data.response.key_id);
                form.append("key", data.response.object_key);
                form.append("success_action_status", 201);
                form.append("file", file);
            }
        });
        
            var xhr = new XMLHttpRequest();
            xhr.onload = function(){
                m.count--;
                var obj = $(xhr.response).find("Key").html();
                m.sendData.cover_photo = obj;
            }
            xhr.open('POST','http://paiwo.oss-cn-hangzhou.aliyuncs.com');
            xhr.send(form); 
            $('.pocket-content').show();    

        });
        
}
    
    
    window.onbeforeunload = function(){
        
        return "未发布内容会被清空";
    }
    

    
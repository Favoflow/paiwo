 

pocket.init = function(){
        /*
         *初始化函数
         *1.初始化虚拟视图的位置
         *2.绑事件
         *3.绑定一些常用节点
         */
        this.alterView();
        this.bindNode();
        this.bindEvent();
    }
 
    pocket.tool.checkFile = function(file){
       var ta = file.type.split('/'); 
       var type = ta[ta.length -1].toLocaleLowerCase();
        if(type != 'jpg' && type != 'jpeg' && type != 'png'){

            return false;
        }
        
      if(file.size > 20146650){
        return false;
      }
        
        return true;
    
    }
    
    
 
 

    pocket.tool.addFile = function(file, index){
        var url = URL.createObjectURL(file);
        var img = new Image();
        img.onload = function(){
            var wrap = $('<div class="p-blo"></div>');
            var imgw = $('<div class="p-img-wrap"></div>');
            img.k = img.width/img.height; // 照片比例
            
            pocket.tool.setLevel(img.width, img.height, $(img));
            
            pocket.tool.addVblock(wrap, img, index);
            var width = wrap[0].box.width(),
                height = wrap[0].box.height();
            
            var left = wrap[0].box.position().left;
            var top = wrap[0].box.position().top;
            wrap.attr('draggable', 'true');
            

            
            wrap.css({
                width: width,
                height: height
            });

            img.className = 'p-img';
            img.setAttribute('draggable', 'false');
            imgw.html(img);
            wrap.append(imgw);
            
        
                
            
            wrap.append('<i class="p-r"></i><i class="p-b"></i><i class="p-rb"></i>');
            wrap.append('<span class="add-flag"><span class="a-flag">添加..</span><i class="b-img"></i><i class="b-text"></i></span>');
            wrap.append('<div class="del-flag"><i class="del-flag-one"></i><i class="del-flag-two">还原</i></div>');
            
            
            
            wrap.find('.p-r').css({left:width-4,top:height/2-4});
            wrap.find('.p-b').css({left:width/2-3,top:height-4});
            wrap.find('.p-rb').css({left:width-7,top:height-4});
            
            
            wrap.find('.add-flag').css({left:920 - left ,top: height});
            wrap.find('.del-flag').css({left: (width-80)/2 , top: -52});
            
            
            pocket.main.append(wrap);
            URL.revokeObjectURL(url);
            pocket.tool.uploadFile(file, wrap);
            
        }
        img.src = url;
    }
    
    
    pocket.tool.addText = function(index){
        if(first){
            first = false;
            $('.text-add').hide();
        }
        
        
        var wrap = $('<div class="pocket-text" contenteditable="true">文本</div>');
            wrap[0].sc = 30 ;
        
            pocket.tool.addVblock(wrap,index);
            pocket.main.append(wrap);
    }
    
    pocket.tool.addVblock = function(target, img, index){
        if(target.hasClass('pocket-text')){
            //文本
              var vblock = $('<div class="p-vir-blo"></div>');
                vblock.css({width: 880, height: 30});
            
                if(img == 0){
                    pocket.vmain.append(vblock);
                }else{
                    pocket.vmain.find('.p-vir-blo').eq(img-1).after(vblock);
                }

        }else{
        //图片
            var w, h;
            var k = img.width/img.height;
            
            if(k>1){
                h = pocket.tool.getValue('height', img.height);
                w = pocket.tool.getValue('width', h*k);
                var left = -(h*k - w)/2;
                $(img).css({left: left, top: 0});
                
            }else{
                w = pocket.tool.getValue('width', img.width);
                h = pocket.tool.getValue('height', w/k);
                var top = -(w/k - h)/2;
                $(img).css({left: 0, top: top});
            }
                 
            
            var vblock = $('<div class="p-vir-blo"></div>');
                vblock.css({width: w, height: h});

             if(index == 0){
                    pocket.vmain.append(vblock);
                }else{
                    pocket.vmain.find('.p-vir-blo').eq(index-1).after(vblock);
                }
            
        
        }
           target[0].box = vblock; //建立索引
            
            var top = vblock.position().top;
            var left = vblock.position().left;

            target.css({
                top: top,
                left: left
            });
        
        
        
        pocket.tool.updatePosition();
        pocket.main.height(pocket.vmain.height());
        
    }
    
    pocket.tool.swap = function(oldp, newp){

        if(oldp>newp){
            var t = oldp;
            oldp = newp;
            newp = t;
        }
        if(newp - oldp == 1){
            $('.p-vir-blo').eq(oldp).before($('.p-vir-blo').eq(newp));
            return ;
        }
           var ox = $('.p-vir-blo').eq(oldp);
           var nx = $('.p-vir-blo').eq(newp);
           var tx = $('.p-vir-blo').eq(newp-1);
        ox.after(nx);
        tx.after(ox);

    }
    
    pocket.tool.updatePosition = function(){
        
        //块的位置
        $('.p-blo,.pocket-text').each(function(){
            var left = this.box.position().left;
            var top = this.box.position().top;
            $(this).html();
            $(this).stop(true).animate({
                left:left,
                top:top
            }); 
        });
        
        pocket.main.height(pocket.vmain.height());//改变大小
    }
    
    pocket.tool.upBorder = function(){
    //修正边
        var target = pocket.t.target_box;
        var x = target.position().left;
        var y = target.position().top;
        var width = target.width();
        var height = target.height();
        
        
        target.find('.p-r').css({'top': height/2-5, 'left': width-5}).show();
        target.find('.p-b').css({'left': width/2-6, 'top': height-5}).show();
        target.find('.p-rb').css({left:width-8,top:height-8}).show();
        
        target.find('.add-flag').css({top:height+7,left:920-x}).show();
        target.find('.del-flag').css({left: (width-80)/2 , top: -52}).show();
        
        
//        target[0].box.width(width);
//        target[0].box.height(height);
    }
    

    pocket.tool.setLevel = function(width, height, img){
        
        //根据照片的比例，实际w,h 返回 最终的width, height区间
        var k = width/height;
        var w, h;
        //-(i - o)/2;
        
        if(k>1){
           h = pocket.tool.getValue('height', height);            
           img.height(h+4);
        }else{
           w = pocket.tool.getValue('width', width);
            img.width(w);

        }
    }
    pocket.tool.setData = function(){
        $('.pocket-text').each(function(){
            
            //文本
            var t = $(this);
            
            if(t.hasClass('text-font')){
                this.box.addClass('text-font');
            }
            if(t.hasClass('text-center')){
                this.box.addClass('text-center');
            }else if(t.hasClass('text-right')){
                this.box.addClass('text-right');
            }
            
            
            
            this.box.html(clearXss(t.html()));
            
            
            
        });
        
        
        
        
        
        m.sendData.pocket_content = $('.pocket-vir-content').html();
        m.sendData.pocket_title = $('.main-title').val();
        m.sendData.pocket_second_title= $('.second-title').val();
    }
    pocket.tool.uploadFile = function(file, wrap){
        m.count ++;
        m.max++;
        var form = new FormData();
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
            var obj = $(xhr.response).find("Key").html();
            wrap[0].box.attr('src', obj);
            m.count--;
        }
        xhr.open('POST','http://paiwo.oss-cn-hangzhou.aliyuncs.com');
        xhr.send(form);
        
    }
    
    pocket.tool.changeSize = function(type,value1, value2){
        var w, h;
        if(type == 'width'){
            w = pocket.tool.getValue('width', value1);
            pocket.t.target_box[0].box.width(w); //改变虚拟长宽  
                pocket.t.r.hide();
                pocket.t.b.hide();
            pocket.t.target_box.animate({
                width: w
            }, function(){
                pocket.tool.upBorder();
                pocket.tool.updatePosition();
                pocket.tool.changeImage();
                pocket.tool.imageCenter();
                
                myts.target_box.addClass('select');  
            });
            
        }else if(type == 'height'){
            
            h = pocket.tool.getValue('height', value1);
             pocket.t.target_box[0].box.height(h); //改变虚拟长宽  
                pocket.t.r.hide();
                pocket.t.b.hide();
            pocket.t.target_box.animate({
                    height: h
            }, function(){
                pocket.tool.upBorder();
                pocket.tool.updatePosition();
                pocket.tool.changeImage();
                pocket.tool.imageCenter();
                
                myts.target_box.addClass('select');  
            });
                 
        }else{
             w = pocket.tool.getValue('width', value1);
             h = pocket.tool.getValue('height', value2);
             pocket.t.target_box[0].box.css({width: w, height: h});
        
               
            pocket.t.target_box.animate({
                    height: h,
                    width: w
            }, function(){
                pocket.tool.upBorder();
                pocket.tool.updatePosition();
                pocket.tool.changeImage();
                pocket.tool.imageCenter();
                
                myts.target_box.addClass('select');     
            });
                 
            }
        }
    
        pocket.tool.getValue = function(type, value){
            
            var xx = 290;
            if(type == 'width'){
                if (value > 750){
                xx = 890;
                }else if(value > 525){
                    xx = 590;
                }else if(value >375){
                    xx = 440;
                }else{
                    xx = 290;
                }
                
            }else if(type == 'height'){
                if (value > 750){
                xx = 890;
                }else if(value > 525){
                    xx = 590;
                }else if(value >375){
                    xx = 440;
                }else{
                    xx = 290;
                }
                
            }
            return xx;
            
        }    
    
    
    
        pocket.tool.changeImage = function(){
          var _out = pocket.t.target_box,
              _in = pocket.t.target_img;
        
        
          var owidth = _out.width();
          var oheight = _out.height();
          var iwidth = _in.width();
          var iheight = _in.height();

          var k1 = owidth/oheight;
          var k2 = _in[0].naturalWidth/_in[0].naturalHeight;  
          if(k1>k2){
              var h = _out.width()/k2;
              _in.height(h);
              _in.width(_out.width());
              
              

              pocket.tool.imageCenter('height', oheight, h);
          }else{
              var w = k2*_out.height();
              _in.width(w);
              _in.height(_out.height());
              pocket.tool.imageCenter('width', owidth, w);
          }
        
    }
    
    pocket.tool.imageCenter = function(type, o ,i){
        /*
         *o是外部的
         *i是内部的
         */
        
         if(type == 'height'){
              var top = -(i - o)/2;
             pocket.t.target_img.css({left:0});     
             pocket.t.target_img.animate({top:top});
          }else{
              var left = -(i - o)/2;
              pocket.t.target_img.css({top:0});
              pocket.t.target_img.animate({left:left});
          }   
    }
    
    pocket.tool.clearAllFocus = function(){
        $('.pocket-text-select').removeClass('pocket-text-select');
        $('.text-del').hide();
        $('.select').removeClass('select');
        $('.p-r,.p-b,.p-rb').hide();
        $('.add-flag').hide(); //
        $('.del-flag').hide();
        $('.text-add').hide();//文本添加标签
    }
    
    pocket.tool.deleteTarget = function(target){
        
        //删除节点
        pocket.tool.clearAllFocus();
        target[0].box.remove();
        target.fadeOut(400,function(){
            $(this).remove();
            pocket.tool.updatePosition();
            m.max -- ; 
            if($('.p-vir-blo').length == 0){
                first = true;
                $('.text-add').css('top', 0).show();
                pocket.main.height(0);
            }
            
        });
        
        
        
    }
    
    pocket.tool.release = function(){
        
        $.ajax({
             url: '/rest',
             type: 'POST',
             async: false,
             data:  {
                   data:JSON.stringify(m.sendData)
                    },
             dataType: 'json',
             success: function(data){
                 if(data.error_id == 0){
                    window.location.href = '/pocket/'+data.response.pocket_id;      
                     
                 }else{
 
                 }
                 
             }
        });    
        
    }
    pocket.tool.photoCount = function(){
        if(m.max>36){
            
            $('.pocket-num i').html(m.max - 36);
            return false;
        }
        $('.pocket-num i').html(0);
        return true;
    }
    

    
var myindex = 0;
var m = {};
m.count = 0;
m.sendData = {};
m.sendData.cover_photo = '';
m.sendData.pocket_title = '主标题';
m.sendData.pocket_second_title = '附标题';
m.sendData.pocket_content = '';
 m.sendData.method = 'paiwo.content.pocket.add';

pocket.init();

function showLabel(left, top, width){
    checkTextStatus();
    var l = left + width/2-120;
    var t = top-40;
    $('.text-del').css({left:l, top: t}).fadeIn(400);    
}

function checkTextStatus(){
    //检测文本状态 调节编辑栏状态
    var t = $('.pocket-text-select');
    $('.text-del i').removeClass('text-edit-select');
    if(t.hasClass('text-font')){
        $('.font-2').addClass('text-edit-select');
    }else{
        $('.font-1').addClass('text-edit-select');
    }
    
    
    if(t.hasClass('text-center')){
        $('.align-center').addClass('text-edit-select');
    }else if(t.hasClass('text-right')){
        $('.align-right').addClass('text-edit-select');
    }else{
        $('.align-left').addClass('text-edit-select');
    }
    
}

function recovery(bt){
    //还原照片
    
     var target = $(bt).parents('.p-blo');
     var img = target.find('img');
     var w = img[0].naturalWidth;
     var h = img[0].naturalHeight;
     var k = w/h;
     var th = 890/k;
     //target.find('.p-r,.p-b,.p-rb').hide();

    if(w>890){
        img.css({width: 890, height:"",left:"", top:""});
        target.animate({width:890, height:th},function(){
         pocket.tool.updatePosition();
        });
        target[0].box.css({width:890, height:th});
    }else{
        img.css({width: "", height:"", left:"", top:""});
        target.animate({width:w, height:h}, function(){
         pocket.tool.updatePosition();
        });
        target[0].box.css({width:w, height:h});
    }
    pocket.tool.clearAllFocus();
}


function showAddLabel(top,height){
     $('.text-add').css('top', top+height).fadeIn(400);
}
var first = true;
m.max = 0;

function showMessage(str){
    clearTimeout(showMessage.setM);
    $('.setting_succeed').html(str).animate({top: 0}, 400, function(){
        showMessage.setM = setTimeout(hideMessage, 1800);
    
    });
}
showMessage.setM = null;

function hideMessage(){
    $('.setting_succeed').animate({top:-40},400);
}

function clearStyle(){
    var r =  / style="[^"]+"/ig;
    var r2 = / &lt;img&gt;[\s\S]*&lt;\/img&gt;/ig
    var text = this.innerHTML.replace(r, '').replace(r2, '');
    this.innerHTML = text;
}

function clearXss(value){
    var a = /&lt;script&gt;[\s\S]*&lt;\/script&gt;/g;
    var b = /&lt;a&gt;[\s\S]*&lt;\/a&gt;/g
    
    return String(value)
        .replace(a, '')
        .replace(b, '');
}
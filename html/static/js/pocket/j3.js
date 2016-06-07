var pocketData;
var url_pocket = window.location.pathname.split('/')[2];
 m.sendData.method = 'paiwo.content.pocket.edit';

function getSoucer(){
        /*
         *  获取数据源
         *
         *
         */
    
        if(!$.isNumeric(url_pocket)){
            window.location.href = '/'; 
        }
        $.ajax({
             url: '/rest',
             type: 'POST',
             async: false,
             data:  {
                   data:JSON.stringify({pocket_id: url_pocket, method: 'paiwo.content.pocket.get'})
                    },
             dataType: 'json',
             success: function(data){
                 if(data.error_id == 0){
                    pocketData = data.response;
                    if(pocketData.is_self == 0){
                         window.location.href = '/';
                    }else{
                       
                         m.sendData.pocket_id = pocketData.pocket_id;
                    }
                     
                     
                 }else{
                     window.location.href = '/';
                 }
             }
          });    
}

function mergeData(){
    
    /*
     *  合并数据
     *  合并到m.sendData里面
     *  
     */
    m.sendData.cover_photo = pocketData.pocket_cover_photo;
    m.sendData.pocket_title = pocketData.pocket_title
    m.sendData.pocket_second_title = pocketData.pocket_second_title;
    m.sendData.pocket_content = pocketData.pocket_content;
    
    pocketData.pocket_cover_photo = 'http://image.paiwo.co/'+ pocketData.pocket_cover_photo;
}
getSoucer();
mergeData();


function insertData(){
    /*
     *   1.封面照片
     *   2.主副标题
     *   3.content内容处理
     */
            var img = new Image();
            img.className = 'cover-big-img';
            img.src = pocketData.pocket_cover_photo;
            img.onload = function(){
                   $('.cover-status').css('background-image','url('+pocketData.pocket_cover_photo+')');
            }
            $('.main-title').val(pocketData.pocket_title);
            $('.second-title').val(pocketData.pocket_second_title);
                
                var t = $('.pocket-vir-content');
                var txt = t.html(pocketData.pocket_content);
                var html = t.text();
                 t.html(html);
                $('.pocket-content').height(t.height());
                inArea();
}

function inArea(){
    /*
     *  循环虚拟dom 插入到content
     *
     *
     */
    var data = $(); //jQuery 空集合
    
    if($('.p-vir-blo').length != 0){
        first = false;
        $('.text-add').hide();
    }
    
    $('.p-vir-blo').each(function(i, target){
            var t = $(this);
            var out;
            var img;
        
            if(t.attr('src')){
                //图片
                out = $('<div class="p-blo" draggable="true"/>');
                out.css(t.position());
                out.css({
                    width : t.width(),
                    height: t.height()
                });
                
                addimageflag(out);
                imageChange(out, 'http://image.paiwo.co/'+t.attr('src'));
                out[0].box = t;
                data = data.add(out);
                
                
            }else{
                //文本
                out = $('<div contenteditable="true"/>');
                out[0].className = 'pocket-text '+ this.className;
                out.removeClass('p-vir-blo');
                out.html(t.html());
                out.css(t.position());
                out.css({
                    width : t.width()
                });
                out[0].box = t;
                data = data.add(out);
            }
        

     });
    $('.pocket-content').append(data);
}

function addimageflag(out){
    var tm = '<div class="p-img-wrap"></div>'+
                '<i class="p-r"></i>'+
                '<i class="p-b"></i>'+
                '<i class="p-rb"></i>'+
            '<span class="add-flag"><span class="a-flag">添加..</span><i class="b-img"></i><i class="b-text"></i></span>'+
                '<div class="del-flag"><i class="del-flag-one"></i><i class="del-flag-two">还原</i></div>';
    
    out.html(tm);
}
function imageChange(out, url){
    var img = new Image();
        img.className = 'p-img';
        img.draggable = 'false';
    var ow = out.width(),
        oh = out.height();
    
    img.onload = function(){
   

          var k1 = ow/oh;
          var k2 = img.naturalWidth/img.naturalHeight;  
          if(k1>k2){
              var h = ow/k2;
              img.style.height = h +'px';
               img.style.width = ow +'px';
              
            var top = -(h - oh)/2;
             $(img).css({left:0,top: top});     

          }else{
              var w = k2*oh;
              img.style.width = w +'px';
              img.style.height = oh +'px';
              var left = -(w - ow)/2;
               $(img).css({left: left, top: 0});   
          }
            out.find('.p-img-wrap').html(img);
        
        
    }
    img.src = url;
    
}




insertData();



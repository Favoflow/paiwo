function setFirst(){
//    $('.information_ul_nametext').attr('placeholder', ruser.info.user_name);  
    if(ruser.info.gender == 1){
        $('.radio').eq(0).find('a').html('<i></i>');
    }
    if(ruser.info.gender == 2){
        $('.radio').eq(1).find('a').html('<i></i>');
    }
}


function checkName(val){
        if(!val){
            //空
            $('#f_next').removeClass('setting-next-allow');
            return false;
        }
        var count = 0;
        var reg = /[A-Za-z0-9_]/;   //大小写字符
        var reg2 = /[\u4e00-\u9fa5]/;
        for(var i =0; i<val.length; i++){
            if(reg2.test(val[i])){
                count+=2;   
            }else if(reg.test(val[i])){
                count+=1;
            }else{
                //非法字符
             $('#f_next').removeClass('setting-next-allow');
                return false;
            }
        }

      if( count > 23 || count < 4 ){  
          //长度
            $('#f_next').removeClass('setting-next-allow');
          return false;
      }
        return true;
}    


function checkStatus(){
    //检测名字和性别
    var val = nameInput.val().trim();
    
    if(!checkName(val)){
        $('.error-name').html('昵称不合法').show();
        $('.error-i').show();
         $('#f_next').removeClass('setting-next-allow');
        return false;
    }
    
    if(!checkExist(val)){
        $('.error-name').html('昵称已经存在').show();
        $('.error-i').show();
        $('#f_next').removeClass('setting-next-allow');
        return false;
    }
    
        $('.error-name').html('').hide();
        $('.error-i').hide();
    

    if(r_gender!=0){
        $('#f_next').addClass('setting-next-allow');
        return true;
    }
        
    
    
    
    $('#f_next').removeClass('setting-next-allow');
    return false;
}

function checkExist(val){
    var flag= false;
     $.ajax({
            url: '/rest',
            type: 'POST',
            dataType: 'json',
            async: false,
            data:{
                data:JSON.stringify({
                'method': 'paiwo.user.name.check',
                'user_name': val
                })
            },
            success:function(data){
                if(data.error_id==0){
                   flag = data.response.is_exist;
                }
            }
            
        });
    
    if(flag){
        $('.error-name').html('昵称已存在').show();
        $('.error-i').show()
    }
    
    return !flag;
}


//显示头像大图
function culShowHead(){
    

    var width = headimg.width;
    var height = headimg.height;
    var k = width/height;
    if(width<120&&height<120){
            head_k = 1;
    }else{
        if(k>1){
            head_k = 120/width;
            headimg.width = 120;
            headimg.height = height*head_k;

        }else{
            head_k = 120/height;
            headimg.height = 120;
            headimg.width = width*head_k;
        }
    }
    

    if(jcrop!=null){
        jcrop.destroy();
    }
    
    $('.reg-upava-r').html(headimg);
    
    document.getElementById('pre_head').style.cssText = '';
    document.getElementById('pre_head').src = headimg.src;
    
    
    $('#select_head').Jcrop({aspectRatio:1,
              onChange: updatePreview,
              onSelect: updatePreview},
              function(){
                 var bounds = this.getBounds();
                  boundx = bounds[0];
                  boundy = bounds[1];
                  jcrop = this;

             });
    jcrop.animateTo([2,2,100,100]);
}


var jcrop = null;
var boundx;
var boundy;
var headimg; 
var head_k;
var tar = $('#pre_head');


function updatePreview(c){
        if (parseInt(c.w) > 0){
        var rx = 94 / c.w;
        var ry = 94 / c.h;

        tar.css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + Math.round(rx * c.x) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
      }
}
  

function create_head(file){
    url = window.URL.createObjectURL(file);
    headimg = new Image();
    headimg.src = url;    
    headimg.id = 'select_head';
    headimg.onload = culShowHead;
}
    
function clearHead(){
    if(jcrop!=null){
       jcrop.destroy();
       jcrop = null;
    }
    $('#bigpic').attr('src', "");
}


function saveData(){
        $.ajax({
         url: '/rest',
         type: 'POST',
         dataType: 'json',
         data:{
                data:JSON.stringify(ruser.info)
            },
        success: function(data){

        } 
        });
}

function uploadHead(){
    
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
            }
        });
    
    var file = document.getElementById('tar-file').files[0];
    form.append("file", file);
    var xhr = new XMLHttpRequest();
    xhr.open('post',"http://paiwo.oss-cn-hangzhou.aliyuncs.com");
    xhr.onload = function(){
        var url = $(xhr.response).find("Key").html();
        cuteHead(url);
    }
    xhr.send(form);

};



function cuteHead(head_path){
    
    
    var head_size  = jcrop.tellSelect();
    head_size.x = Math.round(head_size.x/head_k);
    head_size.y = Math.round(head_size.y/head_k);
    head_size.w = Math.round(head_size.w/head_k);
    head_size.h = Math.round(head_size.h/head_k);
    
    $.ajax({
            url: '/rest',
            type: 'POST',
            dataType: 'json',
            async: false,
            data:{
                data:JSON.stringify({
                     method: 'paiwo.user.avatar.cut',
                     photo_path: head_path,
                     x: head_size.x,
                     y: head_size.y,
                     w: head_size.w,
                     h: head_size.h
                })
            },
            success:function(data){
                if(data.error_id==0){
                  ruser.info.user_avatar = data.response.photo_path;
                  saveData();
                }
            }     
          });
}
var rec;
var curpage = 0;
function getRec(){
    $.ajax({
            url: '/rest',
            type: 'POST',
            dataType: 'json',
            data:{
                data:JSON.stringify({
                     method: 'paiwo.feed.get_recommend_user'
                })
            },
            success:function(data){
               rec = data.response.user_list.slice(0,60).sort(function(){return Math.random()>.5 ? -1 : 1;});
                rec.forEach(function(data){
                    data.flag = 0;
                });
                
               showRec(0)
            }     
          });
}

function follow(id){
        $.ajax({
            url: '/rest',
            type: 'POST',
            dataType: 'json',
            data:{
                data:JSON.stringify({
                     method: 'paiwo.user.follow.follow',
                     follow_id: id
                })
            }    
          });
}
function unfollow(id){
       $.ajax({
            url: '/rest',
            type: 'POST',
            dataType: 'json',
            data:{
                data:JSON.stringify({
                     method: 'paiwo.user.follow.un_follow',
                     follow_id: id
                })
            }    
          });
    
}
var rec_tm = '<div class="setting-rec-list">'+
                '<div class="setting-rec-top clearfix">'+
                    '<a class="setting-rec-ava">'+
                        '<img src="http://image.paiwo.co/${user_avatar}">'+
                        '<span>${user_name}</span>'+
                    '</a>'+
                    '{{html fhelp(flag)}}'+
                '</div>'+
                '<ul class="setting-rec-alb clearfix">'+
                    '{{each photo_list }}'+
                    '<li><img src="http://image.paiwo.co/${$value}'+base.retinaPixel['80']+'"></li>'+
                    '{{/each}}'+    
                '</ul>'+
            '</div>';

function showRec(page){
    var index = page*6;
    var data = rec.slice(index,index+6);
    var t = $.tmpl(rec_tm,data);
    $('.setting-rec-main').html(t);
}

function fhelp(flag){
    var tm = '';
    if(flag == 0){
        tm =  '<a class="setting-rec-care setting-care-not">'+
                        '<i>+</i>'+
                        '<span>关注</span>'+
                    '</a>';
    }else{
       tm =   '<a class="setting-rec-care setting-care-yes">'+
                        '<i></i>'+
                        '<span>已关注</span>'+
                    '</a>';
    }
    
    return tm;
}













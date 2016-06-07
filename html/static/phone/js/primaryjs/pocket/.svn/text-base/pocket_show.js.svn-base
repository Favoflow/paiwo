var base = {
    
    ajax:function(json){
        
        $.ajax({
            url: '/rest',
            type: 'POST',
            dataType: 'json',
            async: json.async?json.async:false,
            data: {
                data:JSON.stringify(json.data)
            },

            success: function(data){
                json.success && json.success(data);
            },

            error: function(data){
                json.error && json.error(data);
            }

        });
        
    },
    
    parseDom:function(str){
        var div = document.createElement("div");
            div.innerHTML = str;
            return div.childNodes[0].textContent;
    },
    
    showAvatar:function(avatar){
        
        var avatar = avatar.toString();
        if(avatar=='0' || avatar==''){  //头像为空
            return '/static/images/user_head.gif';
        }else{
            return  'http://image.paiwo.co/'+avatar;
        }
        
    }
    
    
    
};





var pocketShow = {
    
    
    init:function(){
        
        var ar = window.location.pathname.split('/');
        pocketShow.id = ar[ar.length-1];
        if(/^[0-9]*$/.test(pocketShow.id)){
            pocketShow.getPocket(pocketShow.id);
        }else{   
            window.location.href = '/404';
        }
        
    },
    
    getPocket:function(id){
        
        
         base.ajax({
            
            data:{
                'method': 'paiwo.content.pocket.get',
                'pocket_id': id
            },
            
            success:function(data){
                if(data.error_id==0){                    
                    var response = data.response,
                        bannerDom = document.querySelector('.banner-module'),
                        authDom = document.querySelector('.auth-box'),
                        authAvatar = authDom.getElementsByTagName('img')[0],
                        authNick = authDom.querySelector('.auth-nick a'),
                        authLink = authDom.querySelector('.auth-avatar-link'),
                        contModule = document.querySelector('.content-box'),
                        authFocus = document.querySelector('.auth-focus'), 
                        authSms = document.querySelector('.auth-sms'), 
                        friendsShareImg = document.querySelector('.friends-share-img'),
                        contDom = null,
                        bannerTm = '';
                    
                    $('.friends-share-img').attr('src','http://image.paiwo.co/'+response.pocket_cover_photo+'@!300x300');
                  
                    
                    //title
                    document.title = response.author_name+' - '+response.pocket_title;
                    
                    
                    //wechat封面
                    friendsShareImg.setAttribute('src','http://image.paiwo.co/'+response.pocket_cover_photo+'@!banner');
                    
                    //banner
                    bannerTm = '<span class="banner-shadow"></span>'+ 
                        '<div class="banner-img" style="background-image:url(http://image.paiwo.co/'+response.pocket_cover_photo+'@!banner);"></div>'+
                               '<div class="banner-title">'+
                                   '<h3>'+response.pocket_title+'</h3>'+
                                   '<p>'+response.pocket_second_title+'</p>'+
                               '</div>'+
                               '<a class="banner-share" data-id="'+response.pocket_id+'" style="display:none;"></a>';
                    
                    bannerDom.innerHTML = bannerTm;
                    
                    //auth-info
                    authAvatar.src = base.showAvatar(response.author_avatar);
                    authLink.setAttribute('href','/'+response.author_domain);
                    authNick.innerHTML = response.author_name;
                    authNick.setAttribute('href','/'+response.author_domain);
                    authFocus.setAttribute('auth-id',response.author_id);
                    authSms.setAttribute('auth-id',response.author_id);
                    
                    //content
                    contModule.innerHTML = base.parseDom(response.pocket_content);
                    
                    //content-pic
                    contDom = $('.content-module .p-vir-blo');
                    for(var i=0;i<contDom.length;i++){
//                        console.log(1);
                        var node = contDom[i],
                            infoJson =  pocketShow.clacImg(node.style.width,node.style.height,node.getAttribute('src'));
                        
                        console.log(infoJson.height);
                            //改变宽高
//                            console.log(infoJson);
//                        if(infoJson.height=='auto'){
//                            console.log('in');
//                            node.style.width = infoJson.width+'px';
//                            node.style.height = 'auto';
//                        }else{
                            node.style.width = infoJson.width+'px';
                            node.style.height = infoJson.height+'px';
//                        }
                            
                        
                        
                        if(contDom[i].getAttribute('src')){  //图片
                            
                            var imgSrc = 'http://image.paiwo.co/'+node.getAttribute('src')+'@1d5'; 
                            
//                            node.style.margin = '8px 5px 8px 5px';
                            node.className = 'p-vir-blo img-part';
                            pocketShow.changeImg(node,infoJson,imgSrc);
                            
                            
                        }else{  //文字
                            
                            node.className = 'p-vir-blo te-part';
                            node.style.height = 'auto';
//                            node.style.margin = '16px 5px 16px 5px';
                            
                        }
                        
                        
                        
                        
                    }
                    
                    
                    
                   
                }
            },
            
            error:function(data){
                
            }
            
        });
        
    },
    
    
    clacImg:function(width,height){
        
//        console.log(width,height);
        
        var contentWidth =  document.documentElement.clientWidth - 50,
            width = parseInt(width)/2,
            height = parseInt(height)/2,
            imgW = 0,
            imgH = 0;
        
//        console.log(width,height,isImg);
        
//        if(isImg){ //是图片 
            imgW = parseInt(contentWidth*width/450);
            imgH = parseInt(imgW*height/width);
//        }else{  //是文字
//            imgW = parseInt(contentWidth*width/450);
//            imgH = 'auto';
//        }
           
            
        return {'width':imgW,'height':imgH};
        
    },
    
    changeImg:function(node,json,url){
         var oImg = new Image(),
             imgScale = 0,
             domScale = json.width/json.height;
        
           
        
            oImg.src = url;

            oImg.onload = function(){

//                console.log('in');
//                console.log(oImg.width,oImg.height);

                imgScale = oImg.width/oImg.height;

//                console.log(domScale,imgScale);

                if(imgScale>domScale){ //长图
                    var ileft = - (json.height*imgScale - json.width)/2;
                        oImg.style.height = json.height+'px';
                        oImg.style.left = ileft+'px';
                }else{
                    var itop = - (json.width/imgScale - json.height)/2;
                        oImg.style.width = json.width+'px';
                        oImg.style.top = itop+'px';
                }
                
              
            };
        node.appendChild(oImg);
           
    }
    
};


//wx.onMenuShareTimeline({
//    title: '111', // 分享标题
//    link: '', // 分享链接
//    imgUrl: 'http://duopaizhao.com/static/images/home_images/gallery66.jpg', // 分享图标
//    success: function () { 
//        // 用户确认分享后执行的回调函数
//        console.log('ding');
//    },
//    cancel: function () { 
//        // 用户取消分享后执行的回调函数
//    }
//});



    // 分享js
    var img_src = $('.friends-share-img').attr('src');
    var jm_config = {
        imageUrl: img_src,
        WeixinSuccessUrl: "http://a.jiemian.com/mobile/index.php?m=article&a=share&aid=361862&type=weixin"
    }
    var article_id = 361862;


//初始化
pocketShow.init();

window.onresize = function(){
    pocketShow.init();
};

//关注
$('.auth-focus').on('tap',function(){
    var auth_id = this.getAttribute('auth-id'),
        $this = $(this);
    if($this.hasClass('add-status')){   //已加关注
        $this.removeClass('add-status');
    }else{
        $this.addClass('add-status');
    }
});

//私信
$('.auth-sms').on('tap',function(){
    var auth_id = this.getAttribute('auth-id');
});


//分享
$('.banner-share').on('tap',function(){
    var pocket_id = this.getAttribute('data-id');
});


//单独大图
$('.p-vir-blo').on('tap',function(){
   var _url = $(this).attr('src')    
   window.location.href = "http://image.paiwo.co/"+_url; 
});








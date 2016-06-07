var bir = {
    year: $('#year a'),
    month: $('#month a'),
    day: $('#day a'),
    province: $('#province a'),
    place: $('#place a')
};
var photo_g = {
    host: document.getElementById('host_domain'),
    qq: document.getElementById('qq_domain'),
    phone: document.getElementById('phone_domain'),
    wechat: document.getElementById('wechat_domain'),
    desc: document.getElementById('desc_domain')
};

var reg = {
    pwd: /^[0-9a-zA-Z\,\.]{6,15}$/,
    host: /^([0-9]|[a-z]){5,30}$/,
    email: /^\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
};
var is_foreign = 0; //地区选择
var ar = [];        //储存地区选择的数据
var bind_status = 0;//绑定社交账号类型
var unbind_type = 0;//解绑

function showfavorite(data){
    
    var tm = '';
    for(var i =0; i<5; i++){
        if(i==0){
            if(data[i] == undefined || data[i] == ''){
                if(data[i] == undefined){
                    tm+= '<dt class="coll-cover-dt-none"></dt>';
                }else{
                    tm += '<dt><img src="/static/images/pic-deleted.png"></dt>';
                }
            }else{
                tm+= '<dt><img src="http://image.paiwo.co/'+data[i]+base.retinaPixel['280']+'"></dt>';
            }
        }else if(data[i] == undefined || data[i] == ''){
            if(data[i] == undefined){
              tm+='<dd class="coll-cover-img-none"></dd>';  
            }else{
              tm += '<dd><img src="/static/images/pic-deleted.png"></dd>';
            }
        }else{
              tm+='<dd><img src="http://image.paiwo.co/'+data[i] +base.retinaPixel['80']+'"></dd>';
        }
    }
    return tm;
    
}

function initHead(){
    var t = $('#user_head');
    if(top_data.avatar!= 0){
        t.attr('src', 'http://image.paiwo.co/'+top_data.avatar);
    }
    $('#user_name').html(top_data.nick_name);
    if(top_data.is_photographer == 1){
        t.parent().attr('href', '/'+top_data.user_host);
        $('#user_name').on('click',function(){
           window.open('/'+top_data.user_host); 
        });
    }else{
//        t.on('click', function(){
//            showMessage('请先认证成为摄影师');
//        });
//        $('#user_name').on('click',function(){
//          showMessage('请先认证成为摄影师');
//        });
        
        t.on('click', function(){
            $('#change_head').trigger('click');
        });
        
    }
    if(top_data.gender == 0){
        $('.photo-male').hide();
    }else if(top_data.gender == 2){
        $('.photo-male').removeClass().addClass('photo-female');
    }
}

var setM = null;
function showMessage(content){
    clearTimeout(setM);
    mes.html(content).animate({top:0}, 400, function(){
            setM = setTimeout(hideMessage, 1800);
    
    });
}

function hideMessage(){
    mes.animate({top:'-40px'},400);
}

function showPartColl(){
    p_set.hide();
    p_ai.hide();
    p_like.hide();
    p_order.hide();
    p_receive.hide();
    p_ao.fadeIn(300);
    head_coll.addClass('person-tab-cur');
    head_like.removeClass('person-tab-cur');
    order_start.removeClass('person-tab-cur');
    order_receive.removeClass('person-tab-cur');
    head_set.removeClass('person-tab-cur');
    collo_s = 1;
    colli_s = 0;
    b_s = 0;
}

function showPartLike(){
    p_set.hide();
    p_ai.hide();
    p_ao.hide();
    p_order.hide();
    p_receive.hide();
    p_like.fadeIn(300);
    head_like.addClass('person-tab-cur');
    head_coll.removeClass('person-tab-cur');
    head_set.removeClass('person-tab-cur');
    order_start.removeClass('person-tab-cur');
    order_receive.removeClass('person-tab-cur');
    collo_s = 0;
    colli_s = 0;
    b_s = 1;
}

function showPartSet(){
    p_ai.hide();
    p_ao.hide();
    p_like.hide();
    p_order.hide();
    p_receive.hide();
    p_set.fadeIn(300);
    head_like.removeClass('person-tab-cur');
    head_coll.removeClass('person-tab-cur');
    order_start.removeClass('person-tab-cur');
    order_receive.removeClass('person-tab-cur');
    head_set.addClass('person-tab-cur');
    collo_s = 0;
    colli_s = 0;
    b_s = 0;
}


function showPartOrder(){
    p_ai.hide();
    p_ao.hide();
    p_like.hide();
    p_set.hide();
    p_receive.hide();
    p_order.fadeIn(300);
    order_start.addClass('person-tab-cur');
    order_receive.removeClass('person-tab-cur');
    head_like.removeClass('person-tab-cur');
    head_coll.removeClass('person-tab-cur');
    head_set.removeClass('person-tab-cur');
    collo_s = 0;
    colli_s = 0;
    b_s = 0;
}

function showPartRece(){
    p_ai.hide();
    p_ao.hide();
    p_like.hide();
    p_set.hide();
    p_order.hide();
    p_receive.fadeIn(300);
    order_receive.addClass('person-tab-cur');
    $('.person-order-tab .order-start').removeClass('person-tab-cur');
    head_like.removeClass('person-tab-cur');
    head_coll.removeClass('person-tab-cur');
    head_set.removeClass('person-tab-cur');
    collo_s = 0;
    colli_s = 0;
    b_s = 0;
}

function filterChars(str){
    var count = 0;
	var tm = '';
	if(str.length<6){
		return str;	
	}
	for(var i = 0; i<str.length; i++){
		if(str.charCodeAt(i)>255){
			count+=14;
		}else{
			count+=7.5;
		}
		tm+=str[i];
		if(count >=84){
			return tm+='..';	
		}	
	}	
	return tm;	
}

function CheckMore(){
    
    if(b_s == 1){
        if(pCount.c > page_no.c* 12){
            return true;
        }else{
            return false;
        }
//        return true;
    }else if(collo_s == 1){
        if(pCount.a > page_no.a* 7){
            return true;    
        }else{
            return false;
        }
    }else if(colli_s == 1){
        if(pCount.b > page_no.b* 8){
            return true;
        }else{
            return false;
        }
    
    }else{
        if(pCount.d > page_no.d* 24){
            return true;
        }else{
            return false;
        }
    }
}

function judeHash(){
    
    if(store.has('center')){
        var t = store.get('center');
        
        if(t == 1){
            showPartLike(); //进入喜欢
        }else if(t == 2){
            showPartColl();//进入收藏
        }else if(t == 3){
            showPartOrder();//进入订单
        }else if(t == 4){
            showPartSet();//进入设置
        }
    
    }
}

function showImg(data){
    if(data == ''){
        return 'src=/static/images/pic-deleted.png';
    }else{
        return 'src=http://image.paiwo.co/'+data+ base.retinaPixel['280'];
    }
}

function updateNum(num){
    var t = $('.coll-inner-title h5');
    var str = t.html();
    var nnum;
  
    str = Number(str);
      console.log(str,num);
    nnum = str - num;
    
   t.html(nnum);
}


//头像部分
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

var headimg = null;
var head_path = null;
var head_size = null;
var head_k = 1;
function onloadPic(url){
  headimg = new Image();
    headimg.id = 'bigpic';
    headimg.src = url;
    if(headimg.complete){
        culShowHead(headimg);
    }else{
        headimg.onload = culShowHead;
    }
}

var jcrop = null;
var a_p = document.getElementById('a_p');
var b_p = document.getElementById('b_p');
var c_p = document.getElementById('c_p');

var boundx;
var boundy;
function clearHead(){
    if(jcrop!=null){
       jcrop.destroy();
       jcrop = null;
    }
    
    document.getElementById('bigpic').src = '';
    
    a_p.src = '';
    b_p.src = '';
    c_p.src = '';
}

//显示头像大图
function culShowHead(){

    var width = headimg.width;
    var height = headimg.height;
    var k = width/height;
    if(width<244&&height<244){
        head_k = 1;
    }else{
        if(k>1){
             head_k = 244/width;
             headimg.width = 244;
            headimg.height = height*head_k;

        }else{
            head_k = 244/height;
            headimg.height = 244;
            headimg.width = width*head_k;
        }
    }

    $('.headimg_photobox_left').html(headimg);

    if(jcrop!=null){
        jcrop.destroy();
    }

    $('#bigpic').Jcrop({aspectRatio:1,
              onChange: updatePreview,
              onSelect: updatePreview},
              function(){
                 var bounds = this.getBounds();
                  boundx = bounds[0];
                  boundy = bounds[1];
                  jcrop = this;

             });
    jcrop.animateTo([2,2,170,170]);

    a_p.style.cssText = "";
    a_p.src = headimg.src;
    
    b_p.style.cssText = "";
    b_p.src = headimg.src;

    c_p.style.cssText = "";
    c_p.src = headimg.src;
}

//实时显示预览图
function updatePreview(c){

    if (parseInt(c.w) > 0){
        var rx = 120 / c.w;
        var ry = 120 / c.h;
        var rx2 = 60 / c.w; 
        var ry2 = 60 / c.h;
        var rx3 = 30 / c.w;
        var ry3 = 30 / c.h;


        $(a_p).css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + Math.round(rx * c.x) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'
        });

         $(b_p).css({
          width: Math.round(rx2 * boundx) + 'px',
          height: Math.round(ry2 * boundy) + 'px',
          marginLeft: '-' + Math.round(rx2 * c.x) + 'px',
          marginTop: '-' + Math.round(ry2 * c.y) + 'px'
        });

          $(c_p).css({
          width: Math.round(rx3* boundx) + 'px',
          height: Math.round(ry3 * boundy) + 'px',
          marginLeft: '-' + Math.round(rx3 * c.x) + 'px',
          marginTop: '-' + Math.round(ry3 * c.y) + 'px'
        });
      }
}

//显示性别
function showGender(){
    if(user.gender == '0'){
        return;
    }else if(user.gender == '1'){
        $('#chose_man a').html('<i></i>');
    }else if(user.gender=='2'){
        $('#chose_female a').html('<i></i>');
    }else if(user.gender=='3'){
        $('#chose_secret a').html('<i></i>');
    }
}
//显示头像
function showHead(){
    if(user.user_avatar !=''){
        $('#user_head').attr('src','http://image.paiwo.co/'+user.user_avatar);
    }else{
        $('#user_head').attr('src','/static/images/user_head.gif');
    }
}

//显示生日
function showBirthday(){
    if(user.birthday.length>9){
        var data = user.birthday.split('-');
            var year = data[0];
            var month = parseInt(data[1]);
            var day = parseInt(data[2]);
            bir.year.text(year);
            bir.month.text(month);
            bir.day.text(day);
            showDay(year, month);
    }

}

//居住地显示省份
function showAddress(){
    var name;
    var tm ='';
    var x = allArea2['province']['02-00-00'];

    for(name in x){
        tm +='<dd data="'+name+'">'+x[name]+'</dd>';
    }

    $('#province dl').html(tm);
}


//居住地显示城市
function showLivePlace(data){
    var d = allArea2['city'][data];
    var name ='';
    var tm = '';

    for(name in d){
        tm += '<dd data="'+name+'">'+d[name]+'</dd>';
    }
    $('#place dl').html(tm);
}

//显示所在地区
function showLocation(){
    var address = user.address;
    
    if(address=='00-00-00')return;
    if(address){
        var pro_add = address.substring(0,5)+'-00';  //省份编号
        var pro = allArea2['province']['02-00-00'][pro_add]; //省份名称
        var city_arr = allArea2['city'][pro_add];  //城市集合
        if(address=='02-33-00' || address=='02-34-00'){
            bir.province.html(pro);
            bir.province.attr('data',pro_add);
            $('#place').hide();
        }else if(address=='0-0-0'){
            bir.province.attr('data','');
            bir.province.html('请选择');
            bir.place.attr('data','');
            bir.place.html('请选择');
        }else if(address!=''){
            bir.province.html(pro);
            bir.province.attr('data',pro_add);
            bir.place.show();
            bir.place.html(city_arr[address]);
            bir.place.attr('data',address);
            showLivePlace(pro_add);
        }
    }
}

//显示摄影师相关的信息
function showPhotogdata(){
    
    photo_g.host.value = user.user_domain;
    photo_g.qq.value = user.qq;
    photo_g.phone.value = auth_info.phone;
    photo_g.wechat.value = user.weixin;
    photo_g.desc.value = user.user_desc;
    
   

}

//function newshowSer(){
//    ar = [];
//    var i ;
//    var tm ='';
//    for(i = 0 ; i<user_g.service_list.length; i++){
//        tm +='<span data="'+user_g.service_list[i]+'">'+paiPlace(user_g.service_list[i])+'</span>';
//        ar.push(user_g.service_list[i]);
//    }
//    flag1 = 0;
//    $('.topbar').html(tm);
//    area_check();
//
//}

function showYearandMonth(){
    var tm1 = '';
    var tm2 = '';
    //var i = 2014;
    //修改后可以显示当前年份
    var date = new Date();
    var i = date.getFullYear();
    for(;i>1930;i--){
            tm1+='<dd>'+i+'</dd>';
    }
    $('#year').find('dl').html(tm1);
    i = 1 ;

    for(;i<13;i++){
        tm2+='<dd>'+i+'</dd>';
    }
   $('#month').find('dl').html(tm2);

}

function showDay(year, month){
    var max = (new Date(year,month, 0)).getDate();
    var i=1;
    var tm='';
    for(;i<max+1;i++){
        tm +='<dd>'+i+'</dd>';
    }

    $('#day').find('dl').html(tm);
}

var mes = $('.setting_succeed');
//上部信息提示
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

function initPerson(){
    $('.information_ul_nametext').val(user.user_name);
    showGender();
    showYearandMonth();
    showHead();
    showBirthday();
    showAddress();
    showLocation();
}

//显示邮箱如果已经绑定,显示修改密码，否显示绑定
function showEmail(){
    
    if(auth_info.email_state == 0 && auth_info.email!=''){  //未绑定,邮箱未激活
        $('.login-setting ul').append(active_mail_tm.replace(/\${email}/,auth_info.email));
    }else if(auth_info.email_state == 0 && auth_info.email==''){  //已绑定,邮箱未激活
        $('.login-setting ul').append(unbind_tm);
    }else{  //已激活
        $('.login-setting ul').append(bind_tm.replace(/\${email}/,auth_info.email));
    }
    
}



//以下是显示地区选择的模块
function showArea(name, id){

    var data = allArea3['province'][id];
    var tm = '';
    if(is_select(id)){
      tm+='<a class="b-select-all b-select" data="'+id+'">'+name+'全境</a>';

    }else{
      tm+='<a class="b-select-all" data="'+id+'">'+name+'全境</a>';

    }
    for(i in data){
      if(is_select(i)){
        tm+='<span data="'+i+'" class="b-select">'+data[i]+'</span>';
      }else{
        tm+='<span data="'+i+'">'+data[i]+'</span>';
      }
    } 
    $('.shen').html(tm);

    if(is_foreign == 1){
      $('.shen span').css('width','80px');
    }
}
function showPlace(name, id){

    var data = allArea3['city'][id];
    var tm = '';
    if(is_select(id)){
      tm+='<a class="c-select-all c-select" data="'+id+'" >'+name+'全境</a>';

    }else{
      tm+='<a class="c-select-all" data="'+id+'" >'+name+'全境</a>';

    }
    for(i in data){
        //console.log(i);
      if(is_select(i)){
        tm+='<span data="'+i+'" class="c-select">'+data[i]+'</span>';
      }else{
        tm+='<span data="'+i+'">'+data[i]+'</span>';
      }
    } 
    $('.shi').html(tm);


}


function showTakePlace(name, id){

    var data = allArea3['city'][id];
    var tm = '';
    if(is_select(id)){
      tm+='<a class="c-select-all c-select" data="'+id+'" >'+name+'全境</a>';

    }else{
      tm+='<a class="c-select-all" data="'+id+'" >'+name+'全境</a>';

    }
    for(i in data){
      var _dis = allArea3['district'][i];
//            //console.log(allArea3['district']['02-14-05-00']);
//            //console.log(_dis);
      if(is_select(i)){
        tm+='<span data="'+i+'" class="c-select">'+data[i]+'</span>';
        if(_dis){
            for(var j in _dis){
                tm+='<span data="'+j+'" class="c-select">'+_dis[j]+'</span>';
            }
        }
      }else{
        tm+='<span data="'+i+'">'+data[i]+'</span>';
        if(_dis){
            //console.log(_dis);
            for(var j in _dis){
                tm+='<span data="'+j+'">'+_dis[j]+'</span>';
            }
        }
        
      }
    } 
    $('.shi').html(tm);


}

function addService(name, id){
    var tm = '<span data="'+id+'">'+name+'</span>';

    ar.push(id);

    $('.topbar').append(tm);
    area_check();

 }
 function newshowSer(){
     //console.log(user_g.service_list);
    ar = [];
    var i ;
    var tm ='';
    for(i = 0 ; i<user_g.service_list.length; i++){
        tm +='<span data="'+user_g.service_list[i]+'">'+paiPlace(user_g.service_list[i])+'</span>';
        ar.push(user_g.service_list[i]);
    }
    flag1 = 0;
    $('.topbar').html(tm);
    area_check();

 }

function paiPlace(data){
    if(data.substr(3) == '00-00-00'){
        return allArea3.area[data]+'全境';
    }
    if(data.substr(6) == '00-00'){
        return allArea3.province[data.substr(0,2)+'-00-00-00'][data];
    }
    if(data.substr(9) == '00'){
        return allArea3.city[data.substr(0,5)+'-00-00'][data];  
    }else{
        return allArea3['district'][data.substr(0,8)+'-00'][data];  
    }
}

function removeId(id){
        for(var i = 0; i<ar.length ; i++){
          if(ar[i] == id){
              ar = ar.del(i);
          }
        }
        if(id.substr(3) == '00-00-00'){
           $('.b-select-all').removeClass('b-select');
           $('.c-select-all').removeClass('c-select');
           return;
        }
        if(is_foreign ==1){
            $('.b-select[data =' +id+']').removeClass('b-select');
        }else{
         $('.c-select[data =' +id+']').removeClass('c-select');
       }
        var num = $('.topbar span').length;
        if(num<4){
          return;
        }
        if(flag1 == num -3){
          $('.topbar span').eq(flag1-1).show();
          flag1--;
        }

        area_check();

     }


    function clearArea(){
      //海外
      var reg1 = /^01/;
      //境内
      var reg2 = /^02/;
      if(is_foreign == 1){
        $('.shen span').removeClass('b-select');
        for(var i = 0; i<ar.length ; i++){
          if(reg1.test(ar[i])){
            ar = ar.del(i);
            i--;
          }
        }

       }else{
         $('.shen span').removeClass('b-select');
         $('.shi span').removeClass('c-select');
        for(var i = 0, n = ar.length; i<n ; i++){
          if(reg2.test(ar[i])){
            ar = ar.del(i);
            i--;
          }
        }

       }
    }

    function clearPlace(id){
      var reg = new RegExp('^'+id.substr(0,5));
      $('.shi span').removeClass('c-select');
        for(var i = 0; i<ar.length ; i++){
          if(reg.test(ar[i])){
            ar = ar.del(i);
            i--;
          }
        }
    }

    function clearSelect(id, type){
      if(type == 'area'){
          var reg = new RegExp('^'+id.substr(0,2));
          $('.topbar span').each(function(index ,el){
            if(reg.test($(this).attr('data'))){
              $(this).fadeOut(400,function(){
                this.remove();
              })
            }

          });

      }else{
         var reg = new RegExp('^'+id.substr(0,5));
          $('.topbar span').each(function(index ,el){
            if(reg.test($(this).attr('data'))){
              $(this).fadeOut(400,function(){
                this.remove();
              })
            }

          });
      }
    }
     //检测是否已经选过了
     function is_select(id){
        for (var i = 0; i < ar.length; i++) {
            if(id == ar[i])
              return true;
        }
        return false
     }
     //删除指定位置数组元素
     Array.prototype.del=function(n) {　

      　if(n<0)
      　　return this;
      　else
      　　return this.slice(0,n).concat(this.slice(n+1,this.length));
     }

     //点击保存了之后，更新
     function updatePlace(){
        var tm = '';
        $('.topbar span').each(function(index, el) {
            tm+='<li class="service_list_area_two">'+this.innerHTML+'</li>';
        });
        user_g.service_list = ar;
        $('.service_list').html(tm);
        photogSend();
        area_length();
     }

     var flag = 0;
     function cul(type){

        var num = $('.service_list_area_two').length;

        if(type == 'pre'){
            if(flag == 0){
                return;
            }
            flag--;
            $('.service_list_area_two').eq(flag).show();
        }else{
            if(flag == num -4){
                return;
            }
            $('.service_list_area_two').eq(flag).hide();
            flag++;
        }

     }

     var flag1 = 0;
     function cul2(type){

      var th = $('.topbar span');
      var num = th.length;
      if(type =='pre'){
        if(flag1 == 0){
          return;
        }
        th.eq(--flag1).show();

      }else{
        if(flag1 == num-4){
          return;
        }
        th.eq(flag1++).hide();

      }
     }


     function area_check(){
        if($('.topbar span').length>4){
            $('.in-pre').show();
            $('.in-next').show();

        }else{

          $('.in-pre').hide();
          $('.in-next').hide();
        }
     }


    //显示相关的错误
    function showError(id,content){
        var s = document.getElementById(id);
        s.innerHTML = content;
        s.style.display="block";
        s.previousElementSibling.style.display ='block';
    }


    //隐藏相关的错误
    function hideError(id){

        var s = document.getElementById(id);
        s.style.display="none";
        s.previousElementSibling.style.display ='none';

    }


  var market_view = (function(){
	
  //拍摄地区选择
//  var hotPhotog_html = '<li class="yue-photog-libox">'+
//                  '<div class="photog-libox-head">'+
//                  '{{if !cover_path}}'+
//                    '<img style="width:280px;height:260px"">'+                
//                   '{{else}}'+
//                      '<img src="http://image.paiwo.co/${cover_path}'+base.retinaPixel['w280h200']+'">'+
//                    '{{/if}}'+
//                    '<span></span>'+
//                    '<div class="footPhotog-bacpic">'+
//                      '<figure class="figure">'+
//                        '<img data-code="${photographer_domain}" class="header_textbox_headimg" width="65" height="65" src="${market_view.HotPhotogImg(photographer_avatar)}">'+
//                        '<figcaption><a data-code="${photographer_domain}">${photographer_name}</a></figcaption>'+
//                        '<p class="clearfix">'+
//                          '{{html market_view.hotPhotogPlace(photographer_location)}}'+
//                        '</p>'+
//                      '</figure>'+
//                    '</div>'+
//                   '</div>'+
//                   '<button class="yue-button" data-code="${photographer_id}"><i class="yue-button-i"></i>联系TA</button>'+
//                 '</li>';

//  var recentOrder_html = '<li data-code="${order_id}">'+
//                    '<div class="aut-ul-left-left">'+
//                    '<img id="recent_order_headimg" src="${market_view.recentOrderTypeImg(photograph_type)}">'+
//                      '<span class="ul-left-black"><i class="${market_view.recentOrderTypeSpan(photograph_type)}"></i></span>'+
//                      '<div class="ul-left-text">'+
//                        '<p>{{html market_view.recentOrderType(photograph_type)}}</p>'+
//                      '</div>'+
//                    '</div>'+
//                    '<div class="aut-ul-left-mid">'+
//                      '<div class="left-mid-time">拍摄时间：'+
//                        '{{html market_view.recentOrderTime(photograph_date)}}'+
//                      '</div>'+
//                      '<div class="left-mid-place">拍摄地点：'+
//                      '{{html market_view.recentDemPlace(photograph_location)}}'+
//                      '</div>'+
//                     '<div class="left-mid-con"><u>来自</u><img id="order_img_href" data-code="${customer_domain}" src="${market_view.recentOrderImg(customer_avatar)}"><span id="order_name_href" data-code="${customer_domain}">${customer_name}</span></div>'+
//                    '</div>'+
//                    '<div class="aut-ul-left-right">'+
//                      '<div class="left-mid-time">大致预算：<span><i>￥</i>${market_view.recentOrderPrice(photograph_price)}</span></div>'+
//                    '</div>'+
//                  '</li>';
      
      
      
var recentOrder_html = '<li data-code="${order_id}">'+
            '<div class="aut-ul-left-left">'+
              '<img id="recent_order_headimg" src="${market_view.recentOrderTypeImg(photograph_type)}">'+
              '<span class="ul-left-black"><i class="${market_view.recentOrderTypeSpan(photograph_type)}"></i></span>'+
              '<div class="ul-left-text">'+  
                '<p>{{html market_view.recentOrderType(photograph_type)}}</p>'+
              '</div>'+
            '</div>'+
            '<div class="aut-ul-left-mid">'+
              '<div class="left-mid-time">拍摄时间：'+
                '{{html market_view.recentOrderTime(photograph_date)}}'+
                '</div>'+
              '<div class="left-mid-place">拍摄地点：'+
                '{{html market_view.recentDemPlace(photograph_location)}}'+
                '</div>'+
              '<div class="left-mid-con">'+
                '<span style="">已有<i>&nbsp;${offer_count}&nbsp;</i>名摄影师接受你的订单</span>'+
              '</div>'+
            '</div>'+
            '<div class="aut-ul-left-right">'+
              '<div class="left-mid-time">大致预算：<span><i>￥</i>${market_view.recentOrderPrice(photograph_price)}</span></div>'+
              '<div class="left-mid-status">{{html market_view.showState(order_state,photograph_date)}}</div>'+
            '</div>'+
          '</li>';
      
//            
//var recentOffer_html = '<li data-code="${order_id}">'+
//        '<div class="aut-ul-left-left">'+
//          '<img id="recent_order_headimg" src="${market_view.recentOrderTypeImg(photograph_type)}">'+
//          '<span class="ul-left-black"><i></i></span>'+
//          '<div class="ul-left-text">'+  
//            '<p>{{html market_view.recentOrderType(photograph_type)}}</p>'+
//          '</div>'+
//        '</div>'+
//        '<div class="aut-ul-left-mid">'+
//          '<div class="left-mid-time">拍摄时间：'+
//          '{{html market_view.recentOrderTime(photograph_date)}}'+
//          '</div>'+
//          '<div class="left-mid-place">拍摄地点：'+
//            '{{html market_view.recentDemPlace(photograph_location)}}'+
//          '</div>'+
//          '<div class="left-mid-con" data-code="${customer_id})">'+
//            '<u>来自</u>'+
//            '<img src="${market_view.recentOrderImg(customer_avatar)}">'+
//            '<span>${customer_name}</span>'+
//            '<a><i class="yue-button-i"></i>联系TA</a>'+
//          '</div>'+
//        '</div>'+
//        '<div class="aut-ul-left-right">'+
//          '<div class="left-mid-time">大致预算：<span><i>￥</i>${market_view.recentOrderPrice(photograph_price)</span></div>'+
//          '<div class="left-mid-status">{{html market_view.showState(order_state)}}</div>'+
//        '</div>'+
//      '</li>';
      
      
    var recentOffer_html = '<li data-code="${order_id}">'+
            '<div class="aut-ul-left-left">'+
              '<img id="recent_order_headimg" src="${market_view.recentOrderTypeImg(photograph_type)}"/>'+
              '<span class="ul-left-black"><i class="${market_view.recentOrderTypeSpan(photograph_type)}"></i></span>'+
              '<div class="ul-left-text">'+  
                '<p>{{html market_view.recentOrderType(photograph_type)}}</p>'+
              '</div>'+
            '</div>'+
            '<div class="aut-ul-left-mid">'+
              '<div class="left-mid-time">拍摄时间：'+
              '{{html market_view.recentOrderTime(photograph_date)}}'+
              '</div>'+
              '<div class="left-mid-place">拍摄地点：'+
               '{{html market_view.recentDemPlace(photograph_location)}}'+
              '</div>'+
              '<div class="left-mid-con" data="${customer_id}">'+
                '<u>来自</u>'+
                '<img src="${market_view.recentOrderImg(customer_avatar)}">'+
                '<span>${customer_name}</span>'+
                '<a><i class="yue-button-i"></i>联系TA</a>'+
              '</div>'+
            '</div>'+
            '<div class="aut-ul-left-right">'+
              '<div class="left-mid-time">大致预算：<span><i>￥</i>${market_view.recentOrderPrice(photograph_price)}</span></div>'+
              '<div class="left-mid-status">{{html market_view.showState(order_state)}}</div>'+
            '</div>'+
          '</li>';
      

      
      
 var recentDem_html = '<li data-code="${order_id}">'+
                    '<p class="ul-right-li-head">'+
                      '{{html market_view.recentDemTime(photograph_date)}}'+
                    '</p>'+
                    '<p class="ul-right-li-mid">{{html market_view.recentOrderType(photograph_type)}}</p>'+
                    '<p class="ul-right-li-foot">{{html market_view.recentDemPlace(photograph_location)}}<span class="money"><i>￥</i>{{html market_view.recentOrderPrice(photograph_price)}}</span></p>'+
                  '</li>';


  var type_html = ['','人像摄影','婚纱摄影','婚礼跟拍','家庭儿童','旅行跟拍','商业服务','其他'];


  // //显示热门摄影师+最新订单地区
  function hotPhotogPlace(data){
      
      if(data='')return;
        if(data == '0-0-0'|| data =='00-00-00'){
            return '未知';
        }
        else if( data == ''){
            return '';
        }      
             data = data+'-00';
        var  num1 = data.substring(0,5), 
        prov_code = num1+'-00-00',
        $pro_json = allArea['province']['02-00-00-00'],
             prov = '',
             city = '';
        if( prov_code == '02-33-00-00' || prov_code =='02-34-00-00') {
            prov = allArea['02-00-00-00'][prov_code]; 
            return '<span>中国</span><span>'+prov+'</span>';
        }
        else {
            for(var i in $pro_json){
                if( prov_code == i)
                    prov = $pro_json[i];               
            }
            city = allArea['city'][prov_code][data];          
            return '<span>'+prov+'</span><span>'+city+'</span>';
       }
          
  }

  //热门摄影师头像显示
  function HotPhotogImg(data){
    if (data == '0') {
      Other_photog_img = '/static/images/user_head.gif';
    }
    else {
      Other_photog_img = 'http://image.paiwo.co/'+data;
    }
    return Other_photog_img;
  }

  //最新需求订单地区显示
  function recentDemPlace(data){
        if(data=='')return;
        if(data == '0-0-0'){
            return '未知';
        }      
        var  num1 = data.substring(0,5),
             num2 = data.substring(0,2),
        prov_code = num1+'-00-00',
        $pro_json = allArea['province']['02-00-00-00'],
             prov = '',
             city = '';
        if( num2 == '01') {
          return '<span>'+allArea['province']['01-00-00-00'][data]+'</span>';
        }
        else {  
          if( prov_code == '02-33-00-00' || prov_code =='02-34-00-00') {
              prov = allArea['02-00-00-00'][prov_code]; 
              return '<span>中国</span><span>'+prov+'</span>';
          }
          else {
              for(var i in $pro_json){
                  if( prov_code == i)
                      prov = $pro_json[i];               
              }
              city = allArea['city'][prov_code][data];          
              return '<span>'+prov+'</span><span>'+city+'</span>';
          }
        }
  }
 
  //最新订单拍摄类型
  function recentOrderType(data){
    orderType = '';
    orderType = type_html[data];  
      return orderType;
  }

  //最近需求时间月+日
  function recentDemTime(data){
    DemTime = '';
    DemTime = '<span>'+data[0].slice(5,7)+'/'+data[0].slice(8,10)+' - '+data[1].slice(5,7)+' / '+data[1].slice(8,10)+'</span>';
      return DemTime;
  }

  //最新订单价格
  function recentOrderPrice(data){
  	orderPrice = '';
  	orderPrice = data[0]+'-'+data[1];
  	  return orderPrice;
  }

  //显示热门摄影师
//  function showHotPhotog(data){	
//    var hotPhotogs = $.tmpl(hotPhotog_html,data);
//    hotPhotogs.slice(4,12).hide();
//    $('.hot-phg-ul').html(hotPhotogs);		
//  }

  //显示推荐摄影师
//  function showOrderPhotog(data){	
//    var hotPhotogs = $.tmpl(hotPhotog_html,data);      
//    hotPhotogs.slice(8,12).hide();
//    $('#order_creat_photoglist').html(hotPhotogs);		
//  }
//      aut-ul-left-offer
      
      
  //订单状态
  function showState(data,date){
      var tm = '';
    if(data==1){
        if(date){
            var later_date = date[1].split('-');
            var orderDate = new Date(),
                nowDate = new Date();
            orderDate.setFullYear(later_date[0],later_date[1]-1,later_date[2]);
            
            if((nowDate.getTime() - orderDate.getTime())<0){  //未过期
                tm = '<i class="left-mid-ing"></i><span>接单中</span>';
            }else{  //已过期
                tm = '<i class="left-mid-end"></i><span>已过期</span>';
            }
            
        }else{
           tm = '<i class="left-mid-ing"></i><span>接单中</span>';
        }
       
        
    }else if(data==2){
        tm = '<i class="left-mid-end"></i><span>已关闭</span>';
    }
      return tm;
  }
      
      
 //显示接收订单
  function showRecentOffer(data){
      
      var tm = '';
      
      for(var i=0;i<data.length;i++){
        tm+='<li data-code="'+data[i].order_id+'">'+
            '<div class="aut-ul-left-left">'+
              '<img id="recent_order_headimg" src="'+market_view.recentOrderTypeImg(data[i].photograph_type)+'">'+
              '<span class="ul-left-black"><i  class="'+market_view.recentOrderTypeSpan(data[i].photograph_type)+'"></i></span>'+
              '<div class="ul-left-text">'+  
                '<p>'+market_view.recentOrderType(data[i].photograph_type)+'</p>'+
              '</div>'+
            '</div>'+
            '<div class="aut-ul-left-mid">'+
              '<div class="left-mid-time">拍摄时间：'+
                market_view.recentOrderTime(data[i].photograph_date)+
                '</div>'+
              '<div class="left-mid-place">拍摄地点：'+
                market_view.recentDemPlace(data[i].photograph_location)+
                '</div>'+
              '<div class="left-mid-con" data-code="'+data[i].customer_id+'">'+
                '<u>来自</u>'+
                '<img class="pg-domain" src="'+market_view.recentOrderImg(data[i].customer_avatar)+'">'+
                '<span class="pg-domain" style="display:inline-block;">'+data[i].customer_name+'</span>'+
                '<a data-code="'+data[i].customer_id+'" class="contact"><i class="yue-button-i"></i>联系TA</a>'+
              '</div>'+
            '</div>'+
            '<div class="aut-ul-left-right">'+
              '<div class="left-mid-time">大致预算：<span><i>￥</i>'+market_view.recentOrderPrice(data[i].photograph_price)+'</span></div>'+
              '<div class="left-mid-status">'+market_view.showState(data[i].order_state,data[i].photograph_date)+'</div>'+
            '</div>'+
          '</li>';
      }
      
      $('#aut-ul-left-offer').append(tm);
      if(tm.length == 0){
        $('#aut-ul-left-offer .studio-none').show();
      }else{
        $('#aut-ul-left-offer .studio-none').hide();
      }
  }

  //显示发起订单
  function showRecentOrder(data){
      
      
  	var tm = $.tmpl(recentOrder_html,data);
      
      
      
      $('#aut-ul-left-self').append(tm);
      if(tm.length == 0){
        $('#aut-ul-left-self .studio-none').show();
      }else{
        $('#aut-ul-left-self .studio-none').hide();
      }
  }

      
      
  //最新订单头像显示
  function recentOrderImg(data){
    recentOrder_img = '';
    if(data == 0 || data=='')
      recentOrder_img = '/static/images/user_head.gif';
    else {
      recentOrder_img = 'http://image.paiwo.co/'+data;
    }
      return recentOrder_img;
  }

      //最新订单拍摄时间
      function recentOrderTime(data){
        if(data.length==0)return;
        var    orderTime = '';
        order_time_start = data[0].substring(0,4)+'/'+data[0].substring(5,7)+'/'+data[0].substring(8,10),
         order_end_start = data[1].substring(0,4)+'/'+data[1].substring(5,7)+'/'+data[1].substring(8,10);
         
           return '<span>'+order_time_start+'-'+order_end_start+'</span>';   
      }
      //最新订单拍摄类型图片显示
      function recentOrderTypeSpan(data){
          var order_i_class = '';
          switch (data){
            case 0:
              order_i_class = 'ul-left-black-i-all';
              break;
            case 1:
              order_i_class = 'ul-left-black-i-people';
              break;
            case 2:
              order_i_class = 'ul-left-black-i-wed';
              break;
            case 3:
              order_i_class = 'ul-left-black-i-wedding';
              break;
            case 4:
              order_i_class = 'ul-left-black-i-kid';
              break;
            case 5:
              order_i_class = 'ul-left-black-i-travel';
              break;
            case 6:
              order_i_class = 'ul-left-black-i-biz';
              break;
            case 7:
              order_i_class = 'ul-left-black-i-other';
              break;
          }
          return order_i_class;
      }

      //根据拍摄类型显示图标
      function recentOrderTypeImg(data){
          order_img_src = '';
          switch (data){
              case 1:
                  order_img_src = 'http://image.paiwo.co/10763/album/7716f090d2d36d5802a8dcae80e5b848@!280x280';
                  break;
              case 2:
                  order_img_src = 'http://image.paiwo.co/10970/album/0be8bca6db89a50d362b79901e3ffee4@!280x280';
                  break;
              case 3:
                  order_img_src = 'http://image.paiwo.co/10903/album/d5d6070e9008012264d21c6bb367e82a@!280x280';
                  break;
              case 4:
                  order_img_src = 'http://image.paiwo.co/11058/album/bd532d6afcea6b59305a97f74ea11212@!280x280';
                  break;
              case 5:
                  order_img_src = 'http://image.paiwo.co/10696/album/996cffd52115bd897815010e7396cd9d@!280x280';
                  break;
              case 6:
                  order_img_src = 'http://image.paiwo.co/10742/album/e87d7e5f8f7c6a01a1eeab4702ae4e8d@!280x280';
                  break;
              case 7:
                  order_img_src = 'http://image.paiwo.co/10605/album/eea79f86978670389df4c5bc7a7fa727@!280x280';
                  break;
          }
          return order_img_src;
      }

  //显示最近需求
  function showRecentDem(data){
  	var RecentDem_html = $.tmpl(recentDem_html,data)
  	$('.aut-ul-right').children().eq(-1).after(RecentDem_html);
  }

  return {
    showState: showState,
    HotPhotogImg: HotPhotogImg,
    showRecentOffer:showRecentOffer,
    showRecentOrder: showRecentOrder,
    showRecentDem: showRecentDem,
    hotPhotogPlace: hotPhotogPlace,
    recentDemPlace: recentDemPlace,
    recentOrderType: recentOrderType,
    recentOrderTime: recentOrderTime,
    recentOrderPrice: recentOrderPrice,
    recentDemTime: recentDemTime,
    recentOrderImg: recentOrderImg,
    recentOrderTypeImg: recentOrderTypeImg,
    recentOrderTypeSpan: recentOrderTypeSpan
  }

})();

//'<a href="${author_domain}" target="_blank"><span>by.</span>${author_name}</a>'+

function isMyDomainPhoto(domain,author){
   if(top_data.user_domain==domain){
       return '<a href="'+domain+'"><span>by.</span>'+author+'</a>';
    }else{
       return '<a href="'+domain+'" target="_blank"><span>by.</span>'+author+'</a>';
    }
}

//发送验证邮箱
function send_email(){
     
        $.ajax({
            type: "POST",
            
            url: "/a/register/email/send",
            
            success:function(data){
                $('#active_mail_btn').html('已发送');
            },
            
            error:function(data){
                
            }
            
        });
     
}

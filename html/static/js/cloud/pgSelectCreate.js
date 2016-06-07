var inputNum = $('.input_num'); //顾客可选精修张数输入框
var selectCreate = {
    
    isCustomer: false,  //是否允许加修照片
    
    isOpen:true,  //向顾客申请公开展示其精修照片的授权
    
    numCount: inputNum.val(),
    
    getProId:function(){
        var url = window.location.href,
		    arrUrl = url.split('/');
		return arrUrl[5];
    }
    
};

selectBox.find('.price').attr('disabled','disabled');
//页面初始化调用
//cloud.init(function(){
////   selectBox.find('.back-link').attr('href','/p/projects/'+selectCreate.getProId());
//   
////   bottomTab.find('.switch-btn');
//    var oScript = document.createElement('script');
//    oScript.src = '/static/js/cloud/paiwoMessage.js';
//    document.body.appendChild(oScript);
//});


//是否公开
selectBox.on('click','.is-open',function(){
    var _switch = $(this).find('.switch');
    if(selectCreate.isOpen){
       _switch.hide();
    }else{
        _switch.show();
    }
    selectCreate.isOpen = !selectCreate.isOpen;
    
});


//是否允许顾客可选精修
selectBox.on('click','.is-allow-customer',function(){
    if(selectCreate.isCustomer){  //不允许加修
        $(this).find('i').hide();
        selectBox.find('.price').attr('disabled','disabled');
    }else{   //允许加修
        $(this).find('i').show();
        selectBox.find('.price').removeAttr('disabled');
    }
    selectCreate.isCustomer = !selectCreate.isCustomer;
    
});




//顾客可选精修张数减少按钮
selectBox.on('click','.select_lbtn',function(){
    selectCreate.numCount =  Math.ceil(inputNum.val());
    selectCreate.numCount--;
    if(isNaN(selectCreate.numCount)){
        inputNum.val(0);
        return;
    }
    if(selectCreate.numCount<=0)selectCreate.numCount=0;
    inputNum.val(selectCreate.numCount);
});


//顾客可选精修张数增加按钮
selectBox.on('click','.select_rbtn',function(){
     selectCreate.numCount =  Math.floor(inputNum.val());
     selectCreate.numCount++;
    console.log(typeof selectCreate.numCount=='NaN');
    
     if(isNaN(selectCreate.numCount)){
        inputNum.val(0);
        return;
     }
     inputNum.val(selectCreate.numCount);
});

//检测顾客可选精修张数类型
inputNum.on('blur',function(){
    var _val = $(this).val();
    if(_val==''){
        slideMessage('请填写顾客可选精修张数');
        return;
    }
    
    if(!/^[0-9]*$/.test(_val)){
//        inputNum.val('0');
        slideMessage('顾客可选精修张数必须为整数');
        return;
    }
});


//参考单价
$('.setProject-middle .price').on('blur',function(){
    var _price = $(this).val().trim();
    if(!/^[0-9]*$/.test(_price)){
        slideMessage('参考单价最多为整数数字');
        return;
    }
    
    if(_price>9999){
        slideMessage('参考单价不能超过9999元/张');
        return;
    }
    
    
});


//点击删除
createBox.on('click','.delete-btn',function(){
    var $this = $(this);
    
//    if(pic.uploading){
//        console.log(this.parentNode.parentNode.getAttribute('id'));
        var _id = this.parentNode.parentNode.getAttribute('id'),
            isLine = false;
//        if(_id==pic.now_id){  //删除当前正在上传
//            pic.photoCount--;
//            uploader.removeFile(this.parentNode.parentNode.getAttribute('id'));
//        }else{   //删除队列
            
            
//            for(var i=0;i<pic.uploadList.length;i++){
//                if(pic.uploadList[i].id==_id && pic.uploadList[i].status==2){  //在上传队列
//                    isLine = true;    
//                }
//            }
//            
//            if(isLine){ //已在上传队列
////                pic.count--;
//                pic.photoCount--;
//                
//                console.log(this.parentNode.parentNode.getAttribute('id'));
//                pic.removePicId = this.parentNode.parentNode.getAttribute('id');
//                
//                uploader.removeFile(this.parentNode.parentNode.getAttribute('id'));
//                
//            }else{    //未在上传队列,已经上传完毕
//                pic.count--;
//                pic.photoCount--;
//            }
            
            
//        }
        console.log($this.parents('.setProject').attr('data-load'));
    
        if($this.parents('.setProject').attr('data-load')){  //正在上传
            pic.photoCount--;
            uploader.removeFile(this.parentNode.parentNode.getAttribute('id'));
        }else{  //以上传完毕
            pic.count--; 
            pic.photoCount--;
        }
        
        $this.parents('.setProject').remove();
        
//    }else{
//        $this.parents('.setProject').remove();
//        pic.count--;
//        pic.photoCount--;
//    }
//    
    console.log('del');
    
    bottomTab.find('.switch-btn').html('<span class="loading"></span><i class="hover">已上传<i class="count">'+pic.count+'</i>张/共<i></i>'+pic.photoCount+'张</i>');
    
    if(pic.count==pic.photoCount){
        bottomTab.find('.upload-btn').show();
        bottomTab.find('.switch-btn').hide();
        bottomTab.find('.create-submit').removeClass('forbid');
    //        createBox.find('#photo-add').show();
        pic.uploading = false;
        
    }
});



//创建按钮
$('.create-submit').on('click',function(){
    
    if(bottomTab.find('.create-submit').hasClass('forbid'))return;
    
    //获取表单数据
    var _name = selectBox.find('.name').val().trim(),  //名称
        _remarks = selectBox.find('.remarks').val().trim(), //备注
        _count = selectBox.find('.input_num').val().trim(), //精修张数
        _price = selectBox.find('.price').val().trim(),  //精修单价
        _id = selectCreate.getProId(),  //项目id
        _extra = 0,  //是否允许加修照片
        _publish = 0;  //向顾客申请公开展示其精修照片的授权
    
    if(_name==''){
        slideMessage('请输入选片夹名');
        return;
    }
    
    if(_price=='')_price = 0;
    if(_count==''){
        slideMessage('请填写顾客可选精修张数');
        return;
    }
    
    if(!/^[0-9]*$/.test(_count) && _count!==''){
        slideMessage('顾客可选精修张数必须为整数');
        return;
    }
    
    if(!/^[0-9]*$/.test(_price)){
        slideMessage('参考单价最多为整数数字');
        return;
    }
    
    if(_price>9999){
        slideMessage('参考单价不能超过9999元/张');
        return;
    }
    //验证照片数量
//    if(createBox.find('.setProject').length==0){
//        slideMessage('请上传照片');
//        return;
//    }
    
    _extra = selectCreate.isCustomer?1:0;
    
    _publish = selectCreate.isOpen?1:0;
    
    //获取图片信息
    var nodeList = $('#setProject-main').find('.setProject'),
        photoList = [],
        photo_path = null,
        photo_name = null;
    for(var i=0;i<nodeList.length;i++){
        photo_path = nodeList[i].getAttribute('data-file');
        photo_name = nodeList[i].getElementsByTagName('h4')[0].innerHTML;
        photoList.push({'photo_path':photo_path,'photo_name':photo_name});
    }

//    console.log(_id +' | '+_name + ' | '+_remarks+' | '+_count+' | '+_extra+' | '+_price+' | '+_publish+' | '+photoList);
    
    cloud.ajax({
            
             data:{
                'method': 'paiwo.cloud.select.select.create',
                'select_name': _name,
                'select_remark': _remarks,
                'choice_count':_count,
                'allow_extra':_extra,
                'extra_price':_price,
                'auth_publish':_publish,
                'photo_list':photoList
            },
            
            success:function(data){
                console.log(data.response);
                if(data.error_id==0){
                    var _data = data.response;
                    window.location.href = '/p/selects/'+_data.select_id;
                }else{
                    slideMessage('网络错误');
                }
                    
            },
            
            error:function(data){
                console.log(data);
                slideMessage('网络错误');
            }
            
    });
    
});

//返回保存提示
selectBox.on('click','.back-link',function(){
    $('.alert_body').fadeIn();
    saveSelectBox.fadeIn();
    return;
});



//提示
saveSelectBox.on('click','.submit',function(){
    window.location.href = '/p/selects/';
});


saveSelectBox.on('click','.cancel',function(){
    $('.alert_body').fadeOut();
    saveSelectBox.fadeOut();
});

saveSelectBox.on('click','.message_close',function(){
    $('.alert_body').fadeOut();
    saveSelectBox.fadeOut();
});













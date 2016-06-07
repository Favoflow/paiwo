var mainInfo = $('.main-info'),  // 展示模块
    customerSend = $('.send-customer-box'),  //底部提交客户
    saveSubmit = $('.save-submit'), //底部保存按钮
    uploadBox = $('#setProject-main'),
    inputNum = $('.input_num'), //顾客可选精修张数输入框
    telPhoneBox = $('#online-telephone'),  //填写验证手机号码
    telSendBox = $('#telephone-send'),  //提交客户
    selectedInfo = $('#selected-info'),  //选片夹详情
    bottomTab = $('.bottom-tab'),  //底布
    detailtab = $('.bottom-tab-detail'),  //
    delSelect = $('#del-select-box'),
    subCustomerBox = $('.on-subCustomer'), //详情列表
    pgUploadBox = subCustomerBox.find('.pg-upload'),  //待精修父级
    singleUploadBox = $('.single-upload'),  //单张上传
    alertBody = $('#alert_box'),  //总弹窗
    detailPicBox = $('#detail-pic-box'),  //照片详情
    photoVersionBox = $('.photo-version-box'),
    commentBox = $('.add-dem-right'),
    centerButton = $('.bottom-tab-center-buttons'),
    leavetimer = null,
    leavetimer2 = null;
    

var selectInner = {
    
    delPhotoList : [],
    
    numCount: inputNum.val(),
    
    pointShow:true,
    
    init:function(){
   
//        'method': 'paiwo.cloud.select.select.get',
        var _id = selectInner.getProId();
        cloud.ajax({
            
            data:{
                'method': 'paiwo.cloud.select.select.get',
                'select_id': _id.selectId
            },
            
            success:function(data){
                
                if(data.error_id==0){
                    var _data = data.response,
                        _select = _data.photo_select,  
                        baseList = _select.base_photo_list,
                        selectTm = '',
                        decorateTmpl = $.tmpl(selectInner.decorateTm,_select.decorate_photo_list);
//                    console.log(decorateTmpl);
                    
                    //全局数据
                    selectInner['data'] = _data;
                    selectInner.state = _select.select_state;
                    
                    //tips状态
//                    selectInner.putTips(_select.select_state);

                    if(_select.allow_extra==1){ //允许加修
                        selectInner['isCustomer'] = true;
                        selectBox.find('.is-allow-customer i').show();
                        selectBox.find('.price').removeAttr('disabled');
                    }else{   //不允许加修
                        selectInner['isCustomer'] = false;
                        selectBox.find('.is-allow-customer i').hide();
                        selectBox.find('.price').attr('disabled','disabled');
                    }
                    
                    if(_select.auth_code==1){
                        selectInner['isOpen'] = true;
                        selectBox.find('.is-open i').show();
                    }else{
                        selectInner['isOpen'] = false;
                        selectBox.find('.is-open i').hide();
                    }
                    
                    
                    //项目名称
                    mainInfo.find('.project-name').html(_data.project_name);
                    mainInfo.find('.select-name').html(_select.select_name);
                    mainInfo.find('.count').html(_select.base_photo_count+'张照片');
                    mainInfo.find('.time').html('更新于 '+_select.create_time.split(' ')[0].split('-').join('/'));
//                    $('.project-name-link').attr('href','/p/projects/'+_data.project_id);
                    
                    
                    
                    
                    //上传进度
                    pic.count = pic.photoCount = baseList.length;
//                    console.log(pic.photoCount);
                    
                    //备注
                    if(_select.select_remark==''){
                        subCustomerBox.find('.list-qusetion-hover').html('<i></i>无备注');
                    }else{
                        subCustomerBox.find('.list-qusetion-hover').html('<i></i>'+_select.select_remark);
                    }
                   
                    
                    //客户信息
                    if(_select.customer_name!=''){
                       subCustomerBox.find('.avatar').attr('src','http://image.paiwo.co/'+_select.customer_avatar).show();
                        subCustomerBox.find('.user').html(_select.customer_name).show();
                        subCustomerBox.find('.avatar').show();
                        subCustomerBox.find('.user').parent().show();
                    }else{
                        subCustomerBox.find('.avatar').hide();
                        subCustomerBox.find('.user').parent().hide();
                    }
                    

                   
                    
                    //待精修部分
//                    pgUploadBox.find('.setProject-main-box').html(decorateTmpl);
                    pgUploadBox.find('.count').html(_select.decorate_photo_list.length+'张照片');
                    bottomTab.find('.single-upload-tab .phg-select-all').html('待精修照片 '+_select.decorate_photo_list.length);
                    
                    //待精修照片数据
                    selectInner.selectedTmp = [];
                    selectInner.baseTmp = [];
                    
                    for(var i=0;i<_select.decorate_photo_list.length;i++){
                        selectInner.selectedTmp.push(_select.decorate_photo_list[i].photo_id);
                    }
                    
                    
                    for(var i=0;i<baseList.length;i++){
                            selectTm +='<div data-code="'+baseList[i].photo_id+'" data-file="'+baseList[i].photo_path+'" class="base-photo"><img src="http://image.paiwo.co/'+baseList[i].photo_path+'@!280x280" /></div>';
                        }
                    
                    if(_select.select_state==1){
                         $('#send-to-customer').show();
                         $('#edit-btn').show();
                        subCustomerBox.find('.subCustomer-middle-radius').hide();
                        if(selectTm==''){
                            mainInfo.find('.subCustomer-main-box').html('<p style="text-align:center;margin-left:-80px;">选片夹还未上传任何照片，点击编辑来上传照片吧！</p>');
                        }else{
                            mainInfo.find('.subCustomer-main-box').html(selectTm);
                        }
                        
                        
//                        
                    }else if(_select.select_state==2){
                        $('#selected-info').show();
                        $('#edit-btn').hide();
                        selectedInfo.find('.phone-show').html(_select.phone);
                        selectedInfo.find('.link').html(_select.short_url);
//                        detailtab.find('.code').html(data.short_url.split('/')[3]);
                        selectedInfo.show();
                        subCustomerBox.find('.subCustomer-middle-radius').hide();
                        mainInfo.find('.subCustomer-main-box').html(selectTm);
                        
                    }else if(_select.select_state==3){
                        var cusBandInfo = $('#cus-band-info');
                        cusBandInfo.find('.binded_head-img').html('<img src="http://image.paiwo.co/'+_select.customer_avatar+'" />'+_select.customer_name);
                        cusBandInfo.find('.phone-show').html(_select.phone);
                        cusBandInfo.find('.links').html(_select.short_url);
                        cusBandInfo.show();
                        subCustomerBox.find('.decorate-style').hide();
                        mainInfo.find('.subCustomer-main-box').html(selectTm);
                        
                        
                    }else if(_select.select_state==4 || _select.select_state==5 || _select.select_state==10){  //摄影师精修中
                        var decorateList = _select.decorate_photo_list,
                            decorateTmpl = '',
                            baseTmpl = '',
                            cusDecorated = 0,
                            decorateJson = {},
                            baseJson = {},
                            tmpJson = {},
                            decorateCount = 0,
                            decorated = 0,
                            decorating = 0;
                        
//                        customerSend.find('.list-tips').addClass('hover-info');
                        subCustomerBox.find('.subCustomer-middle').show();
                        
                        //翻页数组
                        selectInner.selectedTmp = [];
                        selectInner.selectedFlag = false;
                        
                        
                        
                        //更新原片版本
                        decorateList.sort(function(a,b){
                           return a['decorate_photo_verison'] - b['decorate_photo_verison'];
                        });
                        
                        for(var i=0;i<baseList.length;i++){
                            baseJson[baseList[i].photo_id] = [];
                            baseJson[baseList[i].photo_id][0] = baseList[i].photo_name;
                            baseJson[baseList[i].photo_id][1] = baseList[i].photo_path;
                        }
                        
                        console.log(baseJson);
                        
                        for(var i=0;i<decorateList.length;i++){
                            decorateJson[decorateList[i].base_photo_id] = [];
                            decorateJson[decorateList[i].base_photo_id][0] = decorateList[i].decorate_photo_name;
                            decorateJson[decorateList[i].base_photo_id][1] = decorateList[i].decorate_photo_path;
                            decorateJson[decorateList[i].base_photo_id][2] = decorateList[i].decorate_photo_state;
                            decorateJson[decorateList[i].base_photo_id][3] = decorateList[i].decorate_photo_verison;
                            if(decorateList[i].decorate_photo_verison==0){
                                cusDecorated++;
                            }
                        }
                        
                       //精修
                       for(var name in decorateJson){
                            decorateTmpl+= '<li class="setProject" data-code="'+name+'">'+
                             '<img src="http://image.paiwo.co/'+decorateJson[name][1]+'@!280x280">'+
                             '<h4 title="'+decorateJson[name][0]+'">'+decorateJson[name][0]+'</h4>'+
                             selectInner.decorateTmStyle(decorateJson[name][2])+
                           '</li>';
                            decorateCount++;
                            selectInner.selectedTmp.push(name);
                        }
                        
                        
                        console.log(decorateCount-_select.choice_count);
                        
                        
                        
                        console.log(decorateJson);
                        
                        //原片替换
                        for(var name in decorateJson){
                           baseJson[name] = decorateJson[name];
                            if(decorateJson[name][2]==4 || decorateJson[name][2]==5 || decorateJson[name][2]==10){
                                decorated++;
                            }else if(decorateJson[name][2]==3){
                                decorating++;
                            }
                        }
                        
                        console.log(baseJson);
                        
                        for(var name in baseJson){
                            baseTmpl+='<div class="decorate-photo" data-code="'+name+'" data-file="'+baseJson[name][1]+'"  style="cursor:pointer;"><img src="http://image.paiwo.co/'+baseJson[name][1]+'@!280x280" />'+selectInner.baseState(baseJson[name][2])+'</div>';  
                            selectInner.baseTmp.push(name);
                        }
                        
                        
                        pgUploadBox.find('.setProject-main-box').html(decorateTmpl);
                        
                        mainInfo.find('.subCustomer-main-box').html(baseTmpl);
                        
                        bottomTab.find('.single-upload-tab .phg-select-all').html('待精修照片 '+(decorateCount-decorated));
                        
//                        console.log(decorated - _select.choice_count);
                        if(_select.allow_extra==1 && decorateCount > _select.choice_count){
                            bottomTab.find('.decorate-ing').html('<span style="width:'+Math.ceil(decorated/decorateCount*100)+'%;"></span>已精修<i>'+decorated+'</i>张/需精修<i>'+decorateCount+'</i>张<u style="color:#fff;">额外费用¥<i>'+(decorateCount - _select.choice_count)*_select.extra_price+'</i></u>').show();
                        }else{
                             bottomTab.find('.decorate-ing').html('<span style="width:'+Math.ceil(decorated/decorateCount*100)+'%;"></span>已精修<i>'+decorated+'</i>张/需精修<i>'+decorateCount+'</i>张').show();
                        }
                        
                        selectInner.decorating = decorating;
                        
                        if(_select.select_state==10){
                            var cusComplete = $('#cus-complete');
                           
                            cusComplete.find('.binded_head-img').html('<img src="http://image.paiwo.co/'+_select.customer_avatar+'" />'+_select.customer_name+'<i></i>');
                            cusComplete.find('.create-time').html(_select.create_time.split(' ')[0]);
                            cusComplete.find('.complete-time').html(_select.modify_time.split(' ')[0]);
                            cusComplete.find('.binded_head-img i').attr('data-code',_select.customer_id);
                            cusComplete.find('.base-count').html(_select.base_photo_count+'张');
                            cusComplete.find('.select-count').html(_select.choice_count+'张');
                            cusComplete.find('.pg-select-count').html(decorated+'张');
                            cusComplete.find('.select-all').html(cusDecorated+'张');
                            
                            if(_select.allow_extra==1){
                                cusComplete.find('.del-complet-detail-span .add-count').html((cusDecorated - _select.choice_count)+'张');
                                cusComplete.find('.del-complet-detail-span').show();
                            }
                            
                           
                            if(_select.allow_extra==0){ //不允许加修
                                cusComplete.find('.extra-price').html('(不允许加修)');
                                cusComplete.find('.total').html('(不允许加修)');
                            }else{  //允许加修
                                cusComplete.find('.extra-price').html(_select.extra_price+'元/张');
                                
                                if(_select.choice_count==0){  //不允许精修
                                     cusComplete.find('.total').html((decorated - _select.choice_count)*_select.extra_price+'元');
                                }else{   //可精修
                                    if(_select.choice_count>decorated){
                                        cusComplete.find('.total').html('0元');
                                    }else{
                                        cusComplete.find('.total').html((decorated - _select.choice_count)*_select.extra_price+'元');
                                    }
                                }
                                
                                
                                
                            }
                            
//                            cusComplete.find('.')
                            cusComplete.show();
//                            pgUploadBox.find('.setProject .upload').hide();
                        }
                        
                        
                    }
                    //选片夹状态
                    selectInner.selectState(_select.choice_count,_select.allow_extra,_select.select_state);
                    
                    
                }else if(data.error_id==401){
                    window.location.href = '/c';
                }else if(data.error_id==200001){
                    window.location.href = '/p';
                }else{
                    slideMessage('网络错误');
                }
                    
            },
            
            error:function(data){
                slideMessage('网络错误');
            }
            
        });
    },

    
    getProId:function(){
        var url = window.location.href,
		    arrUrl = url.split('/');
		return {'selectId':arrUrl[5]};
    },
    
    putInfo:function(){   //编辑展示
        var _data = selectInner.data,
            _select = _data.photo_select,
            baseList = _select.base_photo_list,
            tm ='';
        console.log(_data);
        $('#setProject-main').find('.setProject').remove();
        //创建模块
        selectBox.find('.name').val(_select.select_name);
        selectBox.find('.input_num').val(_select.choice_count);
        selectBox.find('.price').val(_select.extra_price);
        
        selectBox.find('.remarks').val(_select.select_remark);
        
        for(var i=0;i<baseList.length;i++){
            tm += '<li class="setProject" data-old="'+baseList[i].photo_id+'" data-file="'+baseList[i].photo_path+'">'+
        '<div class="setProject-img-box">'+
            '<img src="http://image.paiwo.co/'+baseList[i].photo_path+'@!280x280">'+
            '<p class="delete-btn" style="bottom: -30px;"><i></i>删除照片</p>'+
        '</div>'+
        '<h4 title="'+baseList[i].photo_name+'">'+baseList[i].photo_name+'</h4>'+
        '</li>';
        }
//        uploadBox.append(tm);
        createBox.find('li:last').before(tm);
        
    },
    
    
    baseState:function(state){
        var str = '';
        if(state==3){
            str = '<u class="on-addDemand-mainbox-tip">需精修</u>';
        }else if(state==4){
            str = '<u class="on-addDemand-mainbox-tip">已精修</u>';
        }
        return str;
    },
    
    selectState:function(choice,extra,state){   //选片夹状态条初始化
        
//        console.log(choice+' | '+extra+' | '+state);
        
//        selectInner.decorating = decorating
        
        var str = '',
            listTips = '',
            showTips = '',
            talkTips = '';
        if(choice==0 && extra==0){ //不允许精修，也不允许加修
            if(state==1){ //未发送给顾客
               str = '<li class="demandfix-pass pass-one pass-line-cur"><i class="pass-line-li-i"></i><p>已创建</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
                listTips = '请确保照片已经上传完毕,提交后将再无法修改';
            }else if(state==2){ //已发送
                str = '<li class="demandfix-pass pass-one"><i></i><p style="width:60px;">已创建</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">待顾客收片</p></li>';
                listTips = '请待顾客选择提交需精修照片';
            }else if(state==3){  //顾客已接收
                 str = '<li class="demandfix-pass pass-one"><i></i><p style="width:60px;">已创建</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">待顾客收片</p></li>';
                listTips = '请待顾客选择提交需精修照片';
            }else if(state==4){  //精修中
                 str = '<li class="demandfix-pass pass-one"><i></i><p style="width:60px;">已创建</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">待顾客收片</p></li>';
                listTips = '请待顾客选择提交需精修照片';
            }else if(state==5){
                str = '<li class="demandfix-pass pass-one"><i></i><p style="width:60px;">已创建</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">待顾客收片</p></li>';
                listTips = '请待顾客选择提交需精修照片';
            }else if(state==10){
                str = '<li class="demandfix-pass pass-one"><i></i><p>已创建</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p>已收片</p></li>';
                listTips = '上传新版本精修片、额外精修片不计入“已经修”数量';
                customerSend.find('.cus-recive-uploading').hide();
            }
        }else if(choice==0 && extra==1){   //不允许精修,允许加修
          if(state==1){ //未发送给顾客
               str = '<li class="demandfix-pass pass-one pass-line-cur"><i class="pass-line-li-i"></i><p>已创建</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>精修</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
                listTips = '请确保照片已经上传完毕,提交后将再无法修改';
            }else if(state==2){ //已发送
               str = '<li class="demandfix-pass pass-one pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">待顾客绑定</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>精修</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
                listTips = '请将链接发送给顾客用于绑定本选片夹';
            }else if(state==3){  //顾客已接收
                str = '<li class="demandfix-pass pass-one pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">顾客选片中</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>精修</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
                listTips = '请待顾客选择提交需精修照片';
            }else if(state==4 && selectInner.decorating==0){  //待收片
                str = '<li class="demandfix-pass pass-one"><i></i><p style="width:60px;">顾客选片中</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>修片中</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">待顾客收片</p></li>';
                listTips = '已提交给顾客';
            }else if(state==4){  //精修中
                str = '<li class="demandfix-pass pass-one"><i></i><p style="width:60px;">顾客选片中</p></li>'+
                     '<li class="demandfix-pass pass-two pass-line-cur"><i class="pass-line-li-i"></i><p>修片中</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
                listTips = '顾客已挑选好照片，等待你修片';
                talkTips = '点击原片查看客户后期希望你怎么修';
            }else if(state==10){
                str = '<li class="demandfix-pass pass-one"><i></i><p>已创建</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>修片中</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p>已收片</p></li>';
                listTips = '上传新版本精修片、额外精修片不计入“已经修”数量';
                showTips = '客户已全部收片';
                talkTips = '客户已全部收片';
                customerSend.find('.cus-recive-uploading').hide();
            }
            
        }else if(choice!=0){  //同意加修
//            console.log('in');
            if(state==1){ //未发送给顾客
               str = '<li class="demandfix-pass pass-one pass-line-cur"><i class="pass-line-li-i"></i><p>已创建</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>精修</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
               listTips = '请确保照片已经上传完毕,提交后将再无法修改';
            }else if(state==2){ //已发送
                str = '<li class="demandfix-pass pass-one pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">待顾客绑定</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>精修</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
                listTips = '请将链接发送给顾客用于绑定本选片夹';
            }else if(state==3){  //顾客已接收
                str = '<li class="demandfix-pass pass-one pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">顾客选片中</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>精修</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
                listTips = '请待顾客选择提交需精修照片';
            }else if(state==4 && selectInner.decorating==0){ //待收片
                str = '<li class="demandfix-pass pass-one"><i></i><p style="width:60px;">顾客选片中</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>修片中</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">待顾客收片</p></li>';
                listTips = '已提交给顾客';
            }else if(state==4){  //精修中
                str = '<li class="demandfix-pass pass-one"><i></i><p style="width:60px;">顾客选片中</p></li>'+
                     '<li class="demandfix-pass pass-two pass-line-cur"><i class="pass-line-li-i"></i><p>修片中</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
                listTips = '顾客已挑选好照片，等待你修片';
                talkTips = '点击原片查看客户后期希望你怎么修';
            }else if(state==10){
                str = '<li class="demandfix-pass pass-one"><i></i><p>已创建</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>修片中</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p>已收片</p></li>';
                listTips = '上传新版本精修片、额外精修片不计入“已经修”数量';
                showTips = '客户已全部收片';
                talkTips = '客户已全部收片';
                customerSend.find('.cus-recive-uploading').hide();
            }
        }
        
//        console.log(str +' | '+tips);
        
        customerSend.find('.pass-line').html(str);
        customerSend.find('.list-tips .type-info').html(listTips);
        customerSend.find('.talk-tips').html(talkTips);
        
    },
    
    decorateTm: '<li class="setProject" data-code="${base_photo_id}">'+
                 '<img src="http://image.paiwo.co/${decorate_photo_path}@!280x280">'+
                 '<h4 title="${decorate_photo_name}">${decorate_photo_name}</h4>'+
                 '{{html selectInner.decorateTmStyle(decorate_photo_state)}}'+
               '</li>',
    
    
    decorateTmStyle:function(state){
//        上传精修片
        if(state==3){
            return '<button class="delete-project upload">上传精修片</button>';
        }else if(state==4){
            return '';
        }else if(state==5){
            return '';
        }else if(state==10){
            return '';
        }
    },
    showPic:function(index){  //精修详情
        //init
        $('#point-box .point').html('');
        $('#point-box').find('img').remove();
        photoVersionBox.html('');
        commentBox.find('.detail-point').html('');
        
        //标记点初始化
//        if(cusSelectInner.pointShow){
//            pointBox.find('.point i').show();
//        }else{
//            pointBox.find('.point i').hide();
//        }
        
        if($('.add-dem-left').hasClass('active')){
            commentBox.show();
        }
        
        cloud.ajax({

             data:{
                'method': 'paiwo.cloud.select.photo.get',
                'select_id': selectInner.getProId().selectId,
                'photo_id': index
            },
            
            success:function(data){
//                console.log(data);
                if(data.error_id==0){
                     var _data = data.response,
                            tagList = _data.tag_list,
                            photoList = _data.photo_list,
                            posJson = null,
                            _x = null,
                            _y = null;
//                        detailPicBox.find('.main-pic').attr({'src':'http://image.paiwo.co/'+_data.photo_path+'@!1d5','width':860});
//                    commentBox.show();
                     $('#point-box').append('<img class="photo-version0" width="860" src="http://image.paiwo.co/'+_data.photo_path+'@!1d5" />');
                     photoVersionBox.append('<li class="pass-one pass-line-cur" data-index="0"><p>原片</p><i></i></li>');
                    
                        //标记点相关
                        for(var i=0;i<tagList.length;i++){
                            posJson = unescape(tagList[i].tag_coordinate);
                            posJson = JSON.parse(posJson);
//                            console.log(posJson);
                            _x = posJson['posX'];
                            _y = posJson['posY'];
                            //评论
                            commentBox.find('.detail-point').append('<li data-pos="'+_x+'-'+_y+'" data-code="'+tagList[i].tag_id+'">'+tagList[i].tag_desc+'<span class="reply">回复</span>'+selectInner.replyInit(tagList[i].tag_reply)+'</li>');
                            //标记
                            $('#point-box .point').append('<i data-pos="'+_x+'-'+_y+'" data-code="'+tagList[i].tag_id+'" style="top: '+_y+'px; left: '+_x+'px;"></i>');
                        }
                    
                     //版本相关
                     if(photoList.length>1){  //有版本更新
                         for(var i=1;i<photoList.length;i++){
                             photoList[i].photo_name;
                             photoList[i].verison;
                              $('#point-box').append('<img class="photo-version'+i+'" src="http://image.paiwo.co/'+photoList[i].photo_path+'@!1d5" width="860" style="display:none;"/>');
                              photoVersionBox.append('<li class="pass-one" data-index="'+i+'"><p>版本'+i+'</p><i></i></li>');
                             
                         }
                         
                         //显示最新版本
                        $('#point-box img').hide();
                        $('.photo-version'+(photoList.length-1)).show();
                        $('.photo-version-box li').removeClass('pass-line-cur');
                        $('.photo-version-box li[data-index="'+(photoList.length-1)+'"]').addClass('pass-line-cur');
                         
                         
                        $('#detail-pic-box .pass-line li').css('text-align','');
                        detailPicBox.find('.dem-big-pic-line').css('border','1px dashed #b6b3aa');
                         
                     }else{   //未有版本更新
                         
//                         $('.photo-version-box').append();
                         $('#detail-pic-box .pass-line li').css('text-align','center');
                         detailPicBox.find('.dem-big-pic-line').css('border','none');
                     }
                    //动态调整版本位置
                    $('#detail-pic-box .dem-big-pic-line').css('margin-left',-photoList.length*50/2);
                    
                    //底部上传新版本
                    if(selectInner.state==4 || selectInner.state==10){
                        bottomTab.find('.single-upload-tab .establish').hide();
                        for(var i=0;i<selectInner.selectedTmp.length;i++){            
                           if(selectInner.selectedTmp[i]==index){
                                bottomTab.find('.single-upload-tab .establish').show();
                                break;
                           }  
                        }
                        
                       
                    }
                    
                    
                    
                }else if(data.error_id==401){
                    window.location.href = '/c';
                }else{
                    slideMessage('网络错误');
                }
                    
            },
            
            error:function(data){
                slideMessage('网络错误');
            }
            
    });
    },
    
    replyInit:function(content){
        var str = '';
        if(content==''){
            str = '<dl style="display:none;"><dt>回复:</dt><dd><textarea class="reply-txt"></textarea><button class="save-reply">提交</button></dd></dl>';
        }else{
            str = '<dl><dt>回复:</dt><dd>'+content+'</dd></dl>';
        }
        return str;
    }
    
    
};


//页面初始化调用
//cloud.init(function(){
    selectInner.init();
//    var oScript = document.createElement('script');
//    oScript.src = '/static/js/cloud/paiwoMessage.js';
//    document.body.appendChild(oScript);
//});


//hover显示备注
subCustomerBox.on('mouseenter','.title_tip',function(){
    $(this).find('.list-qusetion-hover').show();
});

subCustomerBox.on('mouseleave','.title_tip',function(){
    $(this).find('.list-qusetion-hover').hide();
});

subCustomerBox.find('.list-qusetion-hover').on('mouseenter',function(){
    $(this).show();
});

subCustomerBox.find('.list-qusetion-hover').on('mouseleave',function(){
    $(this).hide();
});



//点击编辑按钮
$('#edit-btn').on('click',function(){
    mainInfo.hide();
    customerSend.hide();
    selectBox.fadeIn(400,function(){
        selectInner.putInfo();
//        selectBox.find('.price').attr('disabled','disabled');
    });
//    saveSubmit.fadeIn(400);
    bottomTab.find('.upload-btn').fadeIn();
    bottomTab.find('.save-submit').fadeIn();
});

//返回按钮
//$('#create-select-box').on('click','.back',function(){
//    
//});


//返回保存提示
selectBox.on('click','.back',function(){
    alertBody.fadeIn();
    saveSelectBox.fadeIn();
    return;
});


//提示
saveSelectBox.on('click','.submit',function(){
//    window.location.href = '/p/projects/'+selectCreate.getProId();
    mainInfo.fadeIn(400);
    customerSend.fadeIn(400);
    selectBox.hide();
    bottomTab.find('.upload-btn').hide();
    bottomTab.find('.save-submit').hide();
    alertBody.hide();
    saveSelectBox.hide();
});


saveSelectBox.on('click','.cancel',function(){
    alertBody.fadeOut();
    saveSelectBox.fadeOut();
});

//是否允许加修照片
selectBox.on('click','.is-allow-customer',function(){
    
    if(selectInner.isCustomer){
        $(this).find('i').hide();
        selectBox.find('.price').attr('disabled','disabled');
    }else{
        $(this).find('i').show();
        selectBox.find('.price').removeAttr('disabled');
    }
    selectInner.isCustomer = !selectInner.isCustomer;
    
});


//向顾客申请公开展示其精修照片的授权
selectBox.on('click','.is-open',function(){
    var _switch = $(this).find('.switch');
    if(selectInner.isOpen){
       _switch.hide();
    }else{
       _switch.show();
    }
    selectInner.isOpen = !selectInner.isOpen;
});


//删除图片
selectBox.on('click','.delete-btn',function(){
    var _parent = $(this).parents('.setProject');
    if(pic.uploading){
        var _id = this.parentNode.parentNode.getAttribute('id');
            for(var i=0;i<pic.uploadList.length;i++){
                if(pic.uploadList[i].id==_id){  //在上传队列
                    uploader.removeFile(this.parentNode.parentNode.getAttribute('id'));
                }else{  //已上传完成
                    if(_parent.attr('data-old')){
                        selectInner.delPhotoList.push({'photo_id':_parent.attr('data-old')});
                    }
                    pic.count--;
                }
            }
        pic.photoCount--;
        $(this).parents('.setProject').remove();
        
    }else{
        if(_parent.attr('data-old')){
            selectInner.delPhotoList.push({'photo_id':_parent.attr('data-old')});
        }
        $(this).parents('.setProject').remove();
        pic.count--;
        pic.photoCount--;
    }
    
    console.log('del');
     bottomTab.find('.switch-btn').html('<span class="loading" style="width:'+parseInt(pic.count/pic.photoCount*100)+'%;"></span><i class="hover">已上传<i class="count">'+pic.count+'</i>张/共<i></i>'+pic.photoCount+'张</i>');
    if(pic.count==pic.photoCount){
        bottomTab.find('.upload-btn').show();
        bottomTab.find('.switch-btn').hide();
        bottomTab.find('.create-submit').removeClass('forbid');
        createBox.find('#photo-add').show();
        pic.uploading = false;
    }
});



//提交客户输入框
$('#send-to-customer').on('click',function(){
    if(subCustomerBox.find('.subCustomer-main-box').find('div').length==0){
        slideMessage('提交顾客照片不能为空');
        return;
    }
    alertBody.fadeIn();
    telPhoneBox.fadeIn();
    
});

//失焦验证
$('#phone-num').on('blur',function(){
    var _phone = $(this).val().trim();
    if(_phone.indexOf('-')!=0){
        var arrTmp = _phone.split('-');
        _phone = arrTmp.join('');
    }

    if(!/^[0-9]*$/.test(_phone)){
        slideMessage('请输入正确的手机号码格式');
    }
});

//手机格式
$('#phone-num').on('keyup',function(ev){
    var _val = $(this).val().trim(),
        strLen = _val.length,
        str = '';
    
    if(ev.keyCode==8)return;
    
    if(strLen==4){
        str = _val.substring(0,3)+'-'+_val[3];  
        $(this).val(str);
    }else if(strLen==9){
        str = _val.substring(0,8)+'-'+_val[8];
        $(this).val(str);
    }
    
});




//$('#phone-num').on('keydown',function(ev){
//    var _val = $(this).val().trim();
//    if(ev.keyCode==8 && _val[_val.length-1]=='-'){
//        $(this).val(val.substring(1,_val.length-1));
//        return;
//    }
//});


//提交给顾客,输入客户手机下一步
$('#phone-next').on('click',function(){
    var _phone = $('#phone-num').val().trim(),
        _id = selectInner.getProId();
    
    if(_phone==''){
        slideMessage('手机号码不能为空！');
        return;
    }
    
    if(_phone.indexOf('-')!=0){
        var arrTmp = _phone.split('-');
        _phone = arrTmp.join('');
    }
    
    if(!/^1\d{10}$/.test(_phone)){
        slideMessage('手机格式不正确');
        return;
    }
    
    cloud.ajax({

             data:{
                'method': 'paiwo.cloud.select.customer.select.send',
                'select_id': _id.selectId,
                'phone': _phone
            },
            
            success:function(data){
                console.log(data);
                if(data.error_id==0){
                    var _data = data.response;
//                    alert('ok!');
                    telPhoneBox.fadeOut();
                    detailtab.find('.phone-show').html(_phone);
                    telSendBox.find('.link').html(_data.short_url);
                    telSendBox.find('.code').html(_data.short_url.split('/')[3]);
                    telSendBox.fadeIn(200);
                    selectedInfo.find('.link').html(_data.short_url);
                    $('#edit-btn').hide();
                    
                    $('#send-to-customer').hide();
                    $('#selected-info').show();
                    
                    selectInner.init();
                }else if(data.error_id==401){
                    window.location.href = '/c';
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

telSendBox.on('click','.submit',function(){
    telSendBox.fadeOut();
    alertBody.fadeOut();
});


//顾客可选精修张数减少按钮
selectBox.on('click','.select_lbtn',function(){
    selectInner.numCount =  Math.ceil(inputNum.val());
    selectInner.numCount--;
    if(isNaN(selectInner.numCount)){
       inputNum.val(0);
       return;
     }
    if(selectInner.numCount<=0)selectInner.numCount=0;
    inputNum.val(selectInner.numCount);
});


//顾客可选精修张数增加按钮
selectBox.on('click','.select_rbtn',function(){
     selectInner.numCount =  Math.ceil(inputNum.val());
     selectInner.numCount++;
     if(isNaN(selectInner.numCount)){
        inputNum.val(0);
        return;
     }
     inputNum.val(selectInner.numCount);
    
});

//点击关闭
$('.message_close').on('click',function(){
    alertBody.fadeOut();
    telPhoneBox.fadeOut();
});


//删除选片夹
$('.del-select').on('click',function(){
    alertBody.fadeIn();
    delSelect.fadeIn(); 
});

//message_close
delSelect.on('click','.message_close',function(){
     alertBody.fadeOut();
     delSelect.fadeOut();
});

//还是算了
delSelect.on('click','.cancel',function(){
    alertBody.fadeOut();
    delSelect.fadeOut();
});

//确认删除
delSelect.on('click','.submit',function(){
    var _id = selectInner.getProId();  //项目id
//    alert(1);
    cloud.ajax({

             data:{
                'method': 'paiwo.cloud.select.select.delete',
                'select_id': _id.selectId
            },
            
            success:function(data){
                console.log(data.response);
                if(data.error_id==0){
//                    window.location.reload();
                    alertBody.fadeOut();
                    delSelect.fadeOut(); 
                    window.location.href = '/p/selects';
                }else if(data.error_id==401){
                    window.location.href = '/c';
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



//保存
$('.save-submit').on('click',function(){
    
    if(bottomTab.find('.create-submit').hasClass('forbid'))return;
    
    //获取表单数据
    var _name = selectBox.find('.name').val().trim(),  //名称
        _remarks = selectBox.find('.remarks').val().trim(), //备注
        _count = selectBox.find('.input_num').val().trim(), //精修张数
        _price = selectBox.find('.price').val().trim(),  //精修单价
        _id = selectInner.getProId(),  //项目id
        _extra = 0,  //是否允许加修照片
        _publish = 0;  //向顾客申请公开展示其精修照片的授权
    
    if(_name==''){
        slideMessage('请输入选片夹名');
        return;
    }
    
    if(_price=='')_price = 0;
    
    if(!/^[0-9]*$/.test(_count)){
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
    //验证照片不能为空
//    if(createBox.find('.setProject').length==0){
//        slideMessage('请上传照片');
//        return;
//    }
    
    _extra = selectInner.isCustomer?1:0;
    
    _publish = selectInner.isOpen?1:0;
    
    //获取图片信息
    var nodeList = $('#setProject-main').find('.setProject'),
        oldPhotoList = [],
        addPhotoList = [],
        photo_path = null,
        photo_name = null;
    for(var i=0;i<nodeList.length;i++){
        if(nodeList[i].getAttribute('data-old')){
            oldPhotoList.push({'photo_id':nodeList[i].getAttribute('data-old')});
        }else{
            addPhotoList.push({'photo_path':nodeList[i].getAttribute('data-file'),'photo_name':nodeList[i].getElementsByTagName('h4')[0].innerHTML});
        }
        
    }

//    console.log(_id.projectId +' | '+_name + ' | '+_remarks+' | '+_count+' | '+_extra+' | '+_price+' | '+_publish+' | '+selectInner.delPhotoList +' | ' +oldPhotoList +' | ' +addPhotoList);

    
    cloud.ajax({
            
             data:{
                'method': 'paiwo.cloud.select.select.edit',
                'select_id': _id.selectId,
                'select_name': _name,
                'select_remark': _remarks,
                'choice_count':_count,
                'allow_extra':_extra,
                'extra_price':_price,
                'auth_publish':_publish,
                'old_photo_list':oldPhotoList,
                'add_photo_list':addPhotoList,
                'delete_photo_list':selectInner.delPhotoList
            },
            
            success:function(data){
                console.log(data.response);
                if(data.error_id==0){
                    window.location.reload();
                }else if(data.error_id==401){
                    window.location.href = '/c';
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


//复制链接
  var clip = new ZeroClipboard($("#copy-link")[0]),
      cLink = new ZeroClipboard($('#c_text')[0]);

  clip.on("ready", function(){
//    debugstr("Flash movie loaded and ready.");

    this.on("aftercopy", function(event) {
//      debugstr("Copied text to clipboard: " + event.data["text/plain"]);
        $('#copy-link').css({'color':'#ff475c','border-color':'#ff475c'});
        slideMessage('复制成功');
    });
  });

  clip.on("error", function(event){
//    $(".demo-area").hide();
//    debugstr('error[name="' + event.name + '"]: ' + event.message);
    ZeroClipboard.destroy();
  });

 cLink.on("ready", function(){
     
    this.on("aftercopy", function(event) {
        console.log(event);
        selectedInfo.find('.copy-link').show();
    });
     
  });

//顾客详情



//选片夹详情
bottomTab.on('mouseenter','.hover-info',function(ev){
    clearTimeout(leavetimer2);
    var selectDetail = $(this).find('.bottom-tab-detail');
    selectDetail.show();
    
});


bottomTab.on('mouseleave','.hover-info',function(){
    var selectDetail = $(this).find('.bottom-tab-detail');       
    leavetimer = setTimeout(function(){
        selectDetail.hide();
    },300);
    
});

$('.bottom-tab-detail').on('mouseenter',function(ev){
    clearTimeout(leavetimer);
    $(this).show();
    
});

$('.bottom-tab-detail').on('mouseleave',function(){
    var $this = $(this);
    leavetimer2 = setTimeout(function(){
         $this.hide();
    },300);
   
});


//更改信息出现输入框
bottomTab.on('click','#edit-info',function(){
    var _val =  customerSend.find('.phone-show').html();
    console.log(_val);
    
    //显示输入框
    customerSend.find('.phone-input').val(_val).show();
    
    //隐藏显示
    customerSend.find('.phone-show').hide();
    customerSend.find('.bottom-tab-detail-button').show();
    customerSend.find('#edit-info').hide();
    customerSend.find('#save-info').show();
    customerSend.find('#cancel-info').show();
    customerSend.find('.bottom-tab-detail-pp').show();
    customerSend.find('.link-code-box').hide();
    
});

//更改信息保存
customerSend.on('click','#save-info',function(){
    var _phone = customerSend.find('.phone-input').val(),
        _id = selectInner.getProId();
    if(_phone==''){
        slideMessage('请输入电话号码');
        return;
    }
    
    
     cloud.ajax({

             data:{
                'method': 'paiwo.cloud.select.customer.select.send',
                'select_id': _id.selectId,
                'phone': _phone
            },
            
            success:function(data){
                console.log(data);
                if(data.error_id==0){
                    
                    customerSend.find('.phone-input').hide();
                    customerSend.find('.phone-show').show();
                    customerSend.find('#edit-info').show();
                    customerSend.find('#save-info').hide();
                    customerSend.find('#cancel-info').hide();
                    customerSend.find('.link-code-box').show();
//                    _phone
//                    data.response.short_url
                    customerSend.find('.phone-show').html(_phone);
                    customerSend.find('.link').html(data.response.short_url); 
                    customerSend.find('.link-code-box').show();
                    customerSend.find('.bottom-tab-detail-pp').hide();
                }else if(data.error_id==401){
                    window.location.href = '/c';
                }else{
                    slideMessage('网络错误');
                }
                    
            },
            
            error:function(data){
                slideMessage('网络错误');
            }
            
    });
    
    
});

//失焦验证
customerSend.on('blur','.phone-input',function(){
    var _phone = $(this).val();
    if(!/^[0-9]*$/.test(_phone)){
        slideMessage('请输入正确的手机号码格式');
        return;
    }
});


//检测参考单价类型
selectBox.on('blur','.price',function(){
    var _val = $(this).val();
    if(!/^[0-9]*$/.test(_val) && _val!=''){
        slideMessage('参考单价最多为整数数字');
        return;
    }
    
    if(_val>9999){
        slideMessage('参考单价不能超过9999元/张');
        return;
    }
});

//更改信息取消
customerSend.on('click','#cancel-info',function(){
    
    customerSend.find('.phone-input').hide();
    customerSend.find('.phone-show').show();
    customerSend.find('#edit-info').show();
    customerSend.find('#save-info').hide();
    customerSend.find('#cancel-info').hide();
    customerSend.find('.bottom-tab-detail-pp').hide();
    customerSend.find('.link-code-box').show();
    
});



/****************************************顾客精修返回************************************************/
//记录当前滚动条
selectInner.scrollWidth = base.scrollbarwidth();


//待精修片
$('.decorate-style').on('click',function(){
//    subCustomerBox.hide();\
    var nowScroll = null,
        pos = parseInt(centerButton.css('right'));
    $('.subCustomer-middle-radius div').removeClass('radio-cur');
    $(this).addClass('radio-cur');
    $('.subCustomer-middle-radius').find('i').hide();
    $(this).find('i').show();
    mainInfo.find('.original-photo').hide();
    pgUploadBox.fadeIn();
    
    nowScroll = base.scrollbarwidth();
    
//    console.log(pos,selectInner.scrollWidth);
    
    //防止抖动
    if(nowScroll!=selectInner.scrollWidth){
        $('html').css('padding-right',selectInner.scrollWidth);
        customerSend.css('padding-right',selectInner.scrollWidth);
        if(pos>-20){
            centerButton.css('right',pos-nowScroll);
        }else if(pos<=-20){
            centerButton.css('right',pos+selectInner.scrollWidth);
        }
        selectInner.scrollWidth = nowScroll;
        
    }
    
});


//点击原片
$('.original-style').on('click',function(){
    var nowScroll = null,
        pos = parseInt(centerButton.css('right'));
    $('.subCustomer-middle-radius div').removeClass('radio-cur');
    $(this).addClass('radio-cur');
    $('.subCustomer-middle-radius').find('i').hide();
    $(this).find('i').show();
    pgUploadBox.hide();
    mainInfo.find('.subCustomer-main-box').fadeIn();
    
    nowScroll = base.scrollbarwidth();
    
//    console.log(pos,selectInner.scrollWidth);
    
    //防止抖动
    if(nowScroll!=selectInner.scrollWidth){
        $('html').css('padding-right',selectInner.scrollWidth);
        customerSend.css('padding-right',selectInner.scrollWidth);
        if(pos>-20){
            centerButton.css('right',pos-nowScroll);
        }else if(pos<=-20){
            centerButton.css('right',pos+selectInner.scrollWidth);
        }
        selectInner.scrollWidth = nowScroll;
        
    }
    
});

//返回选片夹详情
//pgUploadBox.on('click','.back',function(ev){
//    pgUploadBox.hide();
//    subCustomerBox.fadeIn();
//    $('#point-box .point').hide();
//    cloud.showScroll();
//    ev.stopPropagation();
//});

//显示照片精修大图
pgUploadBox.on('click','.setProject img',function(){
    
    detailPicBox.fadeIn();
    
    //初始化
    $('#point-box .point').html('');
    detailPicBox.find('.detail-point').html('');
    selectInner.selectedIndex = $(this).parent().index();
    bottomTab.find('.send-customer-box').hide();
    bottomTab.find('.single-upload-tab').fadeIn();
    
    var code = this.parentNode.getAttribute('data-code');
    console.log(code);
    selectInner.uploadImgId = code;
    
    
    cloud.hideScroll();
    
    selectInner.showPic(code);
    selectInner.selectedFlag = true;
    
    return false;
    
});


//点击所有照片大图
mainInfo.find('.original-photo').on('click','.decorate-photo',function(){
    
     detailPicBox.fadeIn();
    
    //初始化
    $('#point-box .point').html('');
    detailPicBox.find('.detail-point').html('');
    selectInner.baseIndex = $(this).index();
    console.log(selectInner.baseIndex);
//    console.log($(this).index());
    
    bottomTab.find('.send-customer-box').hide();
    
 
    
    var code = this.getAttribute('data-code');
//    console.log(code);
    selectInner.uploadImgId = code;
    
    
   cloud.hideScroll();
   bottomTab.find('.single-upload-tab').show();
   bottomTab.find('.single-upload-tab .establish').hide();
    
   
  
    
    
    selectInner.showPic(code);
    selectInner.selectedFlag = false;
    
    return false;
});


//关闭大图详情
detailPicBox.on('click','.back',function(ev){
    alertBody.fadeOut();
    detailPicBox.fadeOut(function(){
        detailPicBox.find('.main-pic').attr('src','');
        cloud.showScroll();
//        $('.add-dem-left,.add-dem-right').removeClass('active');
    });
    commentBox.hide();
    bottomTab.find('.single-upload-tab').hide();
    bottomTab.find('.send-customer-box').fadeIn();
    ev.stopPropagation();
});








//上一张
detailPicBox.on('click','.mouse-left',function(){
    
//   selectInner.baseIndex
    if(selectInner.selectedFlag){  //点击精选
         selectInner.selectedIndex--;
        if(selectInner.selectedIndex<=0)selectInner.selectedIndex = 0;
        selectInner.uploadImgId = selectInner.selectedTmp[selectInner.selectedIndex];
        selectInner.showPic(selectInner.uploadImgId);
    }else{  //点击所有
         selectInner.baseIndex--;
        if(selectInner.baseIndex<=0)selectInner.baseIndex = 0;
        selectInner.uploadImgId = selectInner.baseTmp[selectInner.baseIndex];
        selectInner.showPic(selectInner.uploadImgId);
    }
});

//下一张
detailPicBox.on('click','.mouse-right',function(){
    
if(selectInner.selectedFlag){  //点击精选
    selectInner.selectedIndex++;   
    if(selectInner.selectedIndex==selectInner.selectedTmp.length)selectInner.selectedIndex=selectInner.selectedTmp.length-1;
    selectInner.uploadImgId = selectInner.selectedTmp[selectInner.selectedIndex];
    selectInner.showPic(selectInner.uploadImgId);
}else{
    selectInner.baseIndex++;   
    if(selectInner.baseIndex==selectInner.baseTmp.length)selectInner.baseIndex=selectInner.baseTmp.length-1;
    selectInner.uploadImgId = selectInner.baseTmp[selectInner.baseIndex];
    selectInner.showPic(selectInner.uploadImgId);
    
//    console.log(selectInner.baseTmp[selectInner.baseIndex]);
}
    
});


//切换照片版本
photoVersionBox.on('click','li',function(ev){
    
    var verIndex = this.getAttribute('data-index');
    photoVersionBox.find('li').removeClass('pass-line-cur');
    photoVersionBox.find('li')[verIndex].className = 'pass-one pass-line-cur';
    
    detailPicBox.find('img').hide();
    detailPicBox.find('.photo-version'+verIndex).show();
    ev.stopPropagation();
    
    
});




//点击大图查看精修细节
//detailPicBox.on('click','#point-box img',function(){
////    console.log(this);
//    
//    setTimeout(function(){
//        detailPicBox.find('.point').show();
//        commentBox.show();
//    },500);
//    $('.add-dem-left').show().addClass('active');
//});


//标记点
commentBox.on('mouseenter','.detail-point li',function(){
    var posCode = $(this).attr('data-pos');
    
    detailPicBox.find('.point i').css('background-color','#fff');
    
    detailPicBox.find('.point i').each(function(index,ele){
        if($(this).attr('data-pos')==posCode){
            $(this).css('background-color','#f7485e')
        }
    });
    
});


//显示标记
commentBox.on('click','#show-point',function(){
    
    if(selectInner.pointShow){
        detailPicBox.find('.point i').hide();
        $(this).find('i').hide();
    }else{
        detailPicBox.find('.point i').show();
        $(this).find('i').show();
    }
    
    selectInner.pointShow = !selectInner.pointShow;
});

//评论回复
commentBox.on('click','.reply',function(ev){
    var $this = $(this),
        replyDl = $this.parent().find('dl');
    console.log(replyDl[0].style.display);
    if(replyDl.hasClass('block')){
       replyDl.removeClass('block').hide();
    }else{
       replyDl.addClass('block').show(); 
    }
    ev.stopPropagation();
});

//评论提交
commentBox.on('click','.save-reply',function(){
    var $this = $(this),
        replyTxt = $this.parent().find('.reply-txt').val().trim(),
        tagId = $this.parents('li').attr('data-code');

    cloud.ajax({

             data:{
                'method': 'paiwo.cloud.select.photo.decorate.tag.reply',
                'select_id': selectInner.getProId().selectId,
                'photo_id': selectInner.selectedTmp[selectInner.selectedIndex],
                'tag_id': tagId,
                'tag_reply': replyTxt
            },

            success:function(data){
//                console.log(data);
                if(data.error_id==0){
//                   $this.parent().html();
                }

            },

            error:function(data){

            }

    });
    
});

/***********************************上传单张精修****************************************************/

//单张上传精修片按钮
pgUploadBox.on('click','.setProject .upload',function(ev){
    
    var code = this.parentNode.getAttribute('data-code');
    console.log(code);
    selectInner.uploadImgId = code;
    
    alertBody.fadeIn();
    singleUploadBox.find('.alert-bulk-picBox').find('i').show();
    singleUploadBox.find('.alert-bulk-picBox').find('.upload').show();
    singleUploadBox.find('.main-single-img').attr('src','').hide();
    singleUploadBox.fadeIn();
    
    ev.stopPropagation();
});

//大图内单张精修上传
bottomTab.on('click','.single-upload-tab .establish',function(ev){
    
//    console.log('111');

//    selectInner.uploadImgId = selectInner.baseTmp[selectInner.baseIndex];
    
    alertBody.fadeIn();
    singleUploadBox.find('.alert-bulk-picBox').find('i').show();
    singleUploadBox.find('.alert-bulk-picBox').find('.upload').show();
    singleUploadBox.find('.alert-bulk-picBox').find('.loading').hide();
    singleUploadBox.find('.main-single-img').attr('src','').hide();
    singleUploadBox.fadeIn();
    
    
    
    ev.stopPropagation();
});

//关闭单张上传精修
singleUploadBox.on('click','.message_close',function(ev){
//    console.log('opop');
    alertBody.fadeOut();
    singleUploadBox.fadeOut();
    ev.stopPropagation();
});


//单张上传精修确认提交顾客
singleUploadBox.on('click','.submit',function(){
    
        cloud.ajax({

             data:{
                'method': 'paiwo.cloud.select.photo.decorate.photo.upload',
                'select_id': selectInner.getProId().selectId,
                'base_photo_id': selectInner.uploadImgId, 
                'decorate_photo_path': selectInner.imgUrl,
                'decorate_photo_name': selectInner.uploadImgName
            },

            success:function(data){
//                console.log(data);
                if(data.error_id==0){
                    alertBody.fadeOut();
                    singleUploadBox.fadeOut();
                    selectInner.init();
                    selectInner.showPic(selectInner.uploadImgId);
                }else{
                    
                }

            },

            error:function(data){

            }

    });
    
});


//上传
singleUploadBox.on('click','.alert-bulk-picBox',function(){
   $('#single-upload-btn').trigger('click');
});

//上传hover
singleUploadBox.on('mouseenter','.alert-bulk-picBox',function(){
    $(this).find('i').removeClass('alert-bulk-picBox-i').addClass('alert-bulk-picBox-ihover');
});

pgUploadBox.on('mouseleave','.alert-bulk-picBox',function(){
    $(this).find('i').removeClass('alert-bulk-picBox-ihover').addClass('alert-bulk-picBox-i');
});


function uploadfile(fileObj){

    
        if (fileObj != null){
            var base_url = "http://paiwo.oss-cn-hangzhou.aliyuncs.com";
            var FileController = base_url;
            var form = new FormData();
            var flag = false;
            
           console.log('in');
           
           //出现loading
//           singleUploadBox.find('.alert-bulk-picBox').find('i').hide();
//           singleUploadBox.find('.alert-bulk-picBox').find('.upload').hide();
//           singleUploadBox.find('.alert-bulk-picBox').find('.loading').show();
            
            $.ajax({
                async: false,
                type : "POST",
                url : "/rest",
                dataType : 'json',
                data:{
                    data:JSON.stringify({
                        'method':'paiwo.cloud.select.photo.upload.get',
                        'project_id': selectInner.getProId().projectId
                    })
                },
                success : function(data) {
                    console.log(data);
                    if(data.error_id == 0){
                       form.append("Signature", data.response.signature);
                       form.append("policy", data.response. policy);
                       form.append("OSSAccessKeyId", data.response.key_id);
                       form.append("key", data.response.object_key);
                       form.append("success_action_status", 201);
                       flag = true;
                    }else{
                       flag = false;
                    }
                },
                error : function(data) {
                    flag = false;
                }
            });
            
            
            if(flag){
                form.append("file", fileObj);
                var xhr = new XMLHttpRequest();
                xhr.open("post", FileController, false);
                //上传进度
           
                
//                xhr.upload.onprogress = function(ev){
//                    console.log(ev);
//                };
                
                xhr.onload = function () {
                      var obj = $(xhr.response).find("Key").html();
                      selectInner.imgUrl = obj;
//                      
                      singleUploadBox.find('.alert-bulk-picBox').find('i').hide();
                      singleUploadBox.find('.alert-bulk-picBox').find('.upload').hide();
//                      singleUploadBox.find('.alert-bulk-picBox').find('.loading').hide();
                    
                     var oImg = new Image();
                     oImg.onload = function(){
                         console.log('load');
                         singleUploadBox.find('.alert-bulk-picBox').find('.loading').hide();
                         singleUploadBox.find('.main-single-img').attr('src',this.src).fadeIn(200);
                     };
                     oImg.src = 'http://image.paiwo.co/'+obj+'@!280x280';
                };
                
                xhr.send(form);    
                
            }else{
                slideMessage('网络错误..');
            }
            
            
        }

}





//上传功能
singleUploadBox.on('change','#single-upload-btn',function(){
    
    var file = this.files[0],
        $this = $(this);
       
		
//        console.log(file.name +' | '+file);
    
        selectInner.uploadImgName = file.name;
    
		if(file.size>31000000){
		    slideMessage('请上传小于30M的文件');
			return;
		}
    
    
		var name = file.name.split('.');
		var fix = name[name.length-1];
		fix = fix.toLowerCase();
		if(fix=='jpg'||fix == 'png'||fix == 'bmp'||fix == 'jpeg'){

            singleUploadBox.find('.alert-bulk-picBox').find('i').hide();
            singleUploadBox.find('.alert-bulk-picBox').find('.upload').hide();
            singleUploadBox.find('.alert-bulk-picBox').find('.loading').show();
            
            setTimeout(function(){
                uploadfile(file);
                $this.remove();
                singleUploadBox.append('<input type="file" id="single-upload-btn" style="display:none;">');
            },200);
            
		    return;
		}else{
            slideMessage('请上传jpg,png,bmp,jpeg格式的文件');
        }
		 
});


$('#cus-complete .binded_head-img i').on('click',function(){
    $('#top_message').trigger('click');
    PWS.addTalk(this.getAttribute('data-code'));
});












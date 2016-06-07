var cusSelectBox = $('#customer-select-box'),
    showSelectList = cusSelectBox.find('.on-addDemand-mainbox'),
    detailPic = $('#detail-pic-box'),
    pointBox = $('#point-box'),
    textArea = $('.textarea'),
    bottomTab = $('.bottom-tab'),
    subPgBox = $('#sub-pg-box'),
    joinPhotoBox = $('.alter-picExceed'),
    botCusRequire = $('.bottom-tab-cneter-2'),
    selDetailBox = $('#selected-detail-pic-box'),  //精修状态大图显示
    selectList = $('#customer-select-list'),  //精修片列表
    commentBox = $('.add-dem-right'), //精修点
    detailPoint = commentBox.find('.detail-point'),
    centerButton = $('.bottom-tab-center-buttons'),
    singleDownload = $('.single-download');
 
var cusSelectInner = {
    
    nowId:null,
    
    index:0,
    
    isPoint:false,
    
    pointShow:true,
    
    photoListArr:null,  //照片列表
    
    
    init:function(){
        
         cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.customer.select.get',
                    'select_id': cusSelectInner.getProId()
                },

                success:function(data){
//                    console.log(data.response);
                    if(data.error_id==0){  
//                        $.tmpl(photo_info_tm,load_img_arr[i]);
                        var _data = data.response,
                            _select = _data.photo_select,
                            basePhoto = $.tmpl(cusSelectInner.basePhotoTm,_data.base_photo_list),
                            decoratePhoto =null;
//                        console.log(basePhoto);
                        
                        //修片张数
                        cusSelectInner.pgSelect = _select.choice_count;
                        
                        //状态
                        cusSelectInner.stateNum = _select.select_state;
                        
                        //摄影师id
                        $('.message-link').attr('data-code',_select.photographer_id);
                        
                        
//                        detailPic.find('.point').hide();
                        
                        if(_select.select_state==2){    //尚未绑定状态
                            
                        }else if(_select.select_state==3){  //顾客已接收
                            
                            //加入精修列表 
                            cusSelectInner.selectCount = _data.decorate_cart_photo_list.length;
                            cusSelectInner.isExtra = _select.allow_extra;
                            cusSelectInner.choice_count = _select.choice_count;
                            cusSelectInner.extra_price = _select.extra_price;
                            
                            //当允许修片数量为零，且不可加修时不显示tab照片切换,进度条
//                            if(_select.choice_count==0 && _select.allow_extra==0){
//                                cusSelectBox.find('.subCustomer-middle-radius').hide(); //tab
//                                bottomTab.find('.cus-recive-uploading').hide();  //上传进度
//                                botCusRequire.find('.allrecive-submit').show();  //全部收片 
//                            }else{
//                                cusSelectBox.find('.subCustomer-middle-radius').show();
//                                bottomTab.find('.cus-recive-uploading').show();
//                            }
                           
                            
                            //提交按钮
                            if(cusSelectInner.selectCount>0 && _select.allow_extra==1){
                                bottomTab.find('.cus-submit').show();
                            }else{
                                bottomTab.find('.cus-submit').hide();
                            }
                            
                            
                            
                            //精修id数组
                            cusSelectInner.decorateTmpArr = [];
                            for(var i=0;i<_data.decorate_cart_photo_list.length;i++){
                                cusSelectInner.decorateTmpArr.push(_data.decorate_cart_photo_list[i].photo_id);    
                            }
                            
                            cusSelectInner.baseTmp = [];
                            for(var i=0;i<_data.base_photo_list.length;i++){
                                cusSelectInner.baseTmp.push(_data.base_photo_list[i].photo_id);
                            }
                            
                            
//                            console.log(cusSelectInner.decorateTmpArr);
                            
                            decoratePhoto = $.tmpl(cusSelectInner.decorateTm,_data.decorate_cart_photo_list);
                            cusSelectBox.find('.decorate-selected-box').html(decoratePhoto);
                            
                             //购物车
//                            subPgBox.find('.demandfix-picbox-ul').html(decoratePhoto);
                            
                            //上传进度
//                            _data.base_photo_list.length;
                            
                            //已选精修照片
                            subPgBox.find('.count').html(decoratePhoto.length);
                            bottomTab.find('.demandfix-buttom .count').html(decoratePhoto.length);
                            cusSelectInner.selectedCount = decoratePhoto.length;  

                            //修片价格
                            cusSelectInner.pgPrice = _select.extra_price;
                            joinPhotoBox.find('.price').html(_select.extra_price);
                            
                            //底部精修进度条
                            if(_data.decorate_cart_photo_list.length>_select.choice_count){  //超出摄影师精修张数
                                bottomTab.find('.cus-recive-uploading').html('<span style="width:100%;"></span>需精修'+_data.decorate_cart_photo_list.length+'张/服务含'+_select.choice_count+'张<u style="color:#fff;">额外费用¥<i>'+(_data.decorate_cart_photo_list.length-_select.choice_count)*_select.extra_price+'</i></u>');
                            }else{
                                bottomTab.find('.cus-recive-uploading').html('<span style="width:'+Math.ceil(_data.decorate_cart_photo_list.length/_select.choice_count*100)+'%;"></span>需精修'+_data.decorate_cart_photo_list.length+'张/服务含'+_select.choice_count+'张');
                            }
                            
                            
//                            _select.choice_count,_select.allow_extra
                              
                            cusSelectBox.find('.original-selected-box').html(basePhoto);
                            
//                            cusSelectBox.find('.decorate-style').hide();
                            
                            
                        }else if(_select.select_state==4 || _select.select_state==5 || _select.select_state==10){  //正在修片中
                        cusSelectBox.find('.subCustomer-middle-radius').show();
                        cusSelectInner.decorateTmpArr = [];
                            
                        var decorateList = _data.decorate_photo_list,
                            baseList = _data.base_photo_list,
                            decorateTmpl = '',
                            baseTmpl = '',
                            cusDecorated = 0,
                            decorateJson = {},
                            baseJson = {},
                            tmpJson = {},
                            decorateCount = 0,
                            decorated = 0,
                            decorating = 0;
;                            
                        
                        //翻页数组
                        
                        bottomTab.find('.cus-submit').remove();
                        
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
                            decorateTmpl+= '<li data-code="'+name+'"><img src="http://image.paiwo.co/'+decorateJson[name][1]+'@!280x280" />'+cusSelectInner.decoratingState(decorateJson[name][2]);
                            decorateCount++;
                            cusSelectInner.decorateTmpArr.push(name);
                          
                        }
                        
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
                            
//                            console.log(cusDecorated);
                        
//                        console.log(baseJson);
//                        console.log(decorateJson);
                            
                        cusSelectInner.allPhotoTmp = [];
                        
                        for(var name in baseJson){
                            baseTmpl+='<li class="decorate-photo" data-code="'+name+'" data-path="'+baseJson[name][1]+'">'+
                                '<img src="http://image.paiwo.co/'+baseJson[name][1]+'@!280x280" />'+
                                cusSelectInner.baseState(baseJson[name][2])+
                           '</li>'
                            cusSelectInner.allPhotoTmp.push(name);
                        }
                            
                        cusSelectBox.find('.original-selected-box').html(baseTmpl);    
                        cusSelectBox.find('.decorate-selected-box').html(decorateTmpl);
                            
                        bottomTab.find('.cus-recive-uploading').html('<span style="width:'+parseInt(decorated/decorateCount*100)+'%;"></span>已精修<i>'+decorated+'</i>张/修片中<i>'+decorating+'</i>张');
                            
//                        console.log(decorated);
                       
                        cusSelectInner.decorating = decorating;
                            
                            
                        if(_select.select_state==10){
                            
                            var cusComplete = $('#cus-complete');
                            cusComplete.show();
                            cusComplete.find('.binded_head-img').html('<img src="http://image.paiwo.co/'+_select.photographer_avatar+'"  />'+_select.photographer_name+'<i></i>');
                            cusComplete.find('.create-time').html(_select.create_time.split(' ')[0]);
                            cusComplete.find('.binded_head-img i').attr('data-code',_select.photographer_id);
                            cusComplete.find('.complete-time').html(_select.modify_time.split(' ')[0]);
                            cusComplete.find('.base-count').html(_select.base_photo_count+'张');
                            cusComplete.find('.select-count').html(_select.choice_count+'张');
                            cusComplete.find('.pg-select-count').html(decorated+'张');
                            cusComplete.find('.select-all').html(cusDecorated+'张');
                            
                            if(_select.allow_extra==1){
                                if((cusDecorated - _select.choice_count)<0){
                                    cusComplete.find('.del-complet-detail-span .add-count').html('0张');
                                }else{
                                     cusComplete.find('.del-complet-detail-span .add-count').html((cusDecorated - _select.choice_count)+'张');
                                }
                               
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
                        }
                            
                           
                    }
                        
                        //照片状态
                        cusSelectInner.photoState(_data.decorate_cart_photo_list);
                        cusSelectInner.selectState(_select.choice_count,_select.allow_extra,_select.select_state);

                        //选片夹信息
                        cusSelectInner.photoListArr = _data.base_photo_list;
                        
                        cusSelectBox.find('.avatar').attr('src','http://image.paiwo.co/'+_select.photographer_avatar);
                        cusSelectBox.find('.avatar-link').attr('href','http://paiwo.co/'+_select.photographer_domain);
                        cusSelectBox.find('.nick-name').html(_select.photographer_name);
                        cusSelectBox.find('.select-name').html(_select.select_name);
                        cusSelectBox.find('.count').html(_select.base_photo_count+'张照片');
                        cusSelectBox.find('.time').html('更新于 '+_select.modify_time.split(' ')[0].split('-').join('/'));
                        
                    }else if(data.error_id==200001){
                        window.location.href = '/c';
                    }else{
                        slideMessage('网络错误');
                    }

                },

                error:function(data){
//                    console.log(data);
                    slideMessage('网络错误');
                }

        });
        
    },
    
    getProId:function(){
        var url = window.location.href,
		    index = url.lastIndexOf('/')+1,
            host_name = null;
		if(url.lastIndexOf('?')!=-1){
			var end = url.lastIndexOf('?');
			host_name = url.substring(index,end);
		}else{
			host_name = url.substring(index);
		}
		return host_name;
    }, 
    
    pointJson:{
        
    },
    
    picState:function(state,picUrl){  //大图状态
        
//        console.log(state);
        
        if(state==1){  //未加入精修
            
           cusSelectInner.isPoint = false;
           $('.join-aicon').find('span').removeClass('cancel-join').html('<z></z>加入精修');
           $('.join-aicon').find('z').show();
           $('.join-aicon').show();
           $('.add-dem-right').hide();
           $('.add-dem-left').removeClass('active');
            
           //状态丝带
           detailPic.find('.img-style').removeClass('add-dem-left-fixing').hide();
            
        }else if(state==2){  //已加精修购物车

              var oImg = new Image(),
                  timer = null;
            
//            detailPic.find('.add-dem-left-fixing').fadeIn();
//            cusSelectInner.isPoint = true;
////            $('.join-aicon').find('span').html('取消精修');
////            $('.join-aicon').find('z').hide();
//            $('.join-aicon').hide();
//            $('.add-dem-right').show();
//            $('.add-dem-left').addClass('active');
            
//            flagPos

            
            cusSelectInner.isPoint = true;
        
            $('.join-aicon').html('<span class="cancel-join">取消精修</span>').show();
            
            //获取照片丝带位置
            oImg.src = 'http://image.paiwo.co/'+ picUrl+'@!1d5';
             function check(){
//                 console.log('in');
                if(oImg.width>0){
                    clearInterval(timer);
                    var  showPic = detailPic.find('.main-pic'),
                    flagPos = showPic.position().left + oImg.width;
//                    console.log(showPic.position().left,oImg.width);
                    detailPic.find('.img-style').css('left',flagPos-202).addClass('add-dem-left-fixing').show();
                }
            }

            timer = setInterval(check,40);
            
            //状态丝带
//            detailPic.find('.img-style').addClass('add-dem-left-fixing').show();
            
            
            
            
            
        }
    },
    
    basePhotoTm:'<li data-code="${photo_id}" data-path="${photo_path}">'+
                    '<img src="http://image.paiwo.co/${photo_path}@!280x280" />'+
                    '<u class="on-addDemand-mainbox-tip">加入精修</u>'+
                    '<b class="state" style="display:none;"></b>'+
    	       '</li >',
    
    decorateTm:'<li data-code="${photo_id}">'+
                '<img src="http://image.paiwo.co/${photo_path}@!280x280">'+
                '<p style="display:none;"><i>修片中...</i></p>'+
                '<b class="decorate-selected-give" style="display:none;"></b>'+
               '</li>',
    
    decoratingTm:'<li data-code="${photo_id}"><img src="http://image.paiwo.co/${photo_path}@!280x280" />'+
                 '<p style="display:${cusSelectInner.decoratingState(photo_state)};"><i>修片中...</i></p></li>',
    
    selectedTm:'<li data-code="${photo_id}" data-path="${photo_path}">'+
            '<img src="http://image.paiwo.co/${photo_path}@!280x280">'+
            '<p class="delete-select">取消精修'+
            '</p></li>',
    decorateCartTm:'<li data-code="${photo_id}" data-path="${photo_path}">'+
                    '<img src="http://image.paiwo.co/${photo_path}@!280x280" />'+
                    '<u class="on-addDemand-mainbox-tip">加入精修</u>'+
                    '<b class=""></b>'+
    	           '</li>',
    
    
    decoratingState:function(state){
        var str = '';
        if(state==0){
            
        }else if(state==1){
            
        }else if(state==2){
            
        }else if(state==3){ //精修中
            str = '<p style="display:block;"><i>修片中...</i></p></li>';
        }else if(state==4){  //已有新版本
            str = '<b class="decorate-selected-fixed"></b></li>';
        }else if(state==10){  //确认收片
            str = '';
        }
        return str;
    },
    
    baseState:function(state){
        var str = '';
        if(state==3){
            str = '<b class="state on-addDemand-fixding"></b>';
        }else if(state==4){
            str = '<b class="state on-addDemand-fixed"></b>';
        }
        return str;
    },
    
    
    showPic:function(id){
        
        //init
        $('#point-box .point').html('');
        detailPoint.html('');
        
        //标记点初始化
        if(cusSelectInner.pointShow){
            pointBox.find('.point i').show();
        }else{
            pointBox.find('.point i').hide();
        }
        
        cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.photo.get',
                    'select_id': cusSelectInner.getProId(),   
                    'photo_id': id
                },

                success:function(data){
//                    console.log(data.response);
                    if(data.error_id==0){  
                        var _data = data.response,
                            tagList = _data.tag_list,
                            posJson = null,
                            _x = null,
                            _y = null;
                        detailPic.find('.main-pic').attr({'src':'http://image.paiwo.co/'+_data.photo_path+'@!1d5','data-file':_data.photo_path});
                    
                        
                        cusSelectInner.picState(_data.photo_state,_data.photo_path);
                       
                        for(var i=0;i<tagList.length;i++){
                            posJson = unescape(tagList[i].tag_coordinate);
                            posJson = JSON.parse(posJson);
//                            console.log(posJson);
                            _x = posJson['posX'];
                            _y = posJson['posY'];
                            //评论
                            detailPoint.append('<li data-pos="'+_x+'-'+_y+'" data-code="'+tagList[i].tag_id+'">'+tagList[i].tag_desc+'<i></i></li>');
                            //标记
                            $('#point-box .point').append('<i data-pos="'+_x+'-'+_y+'" data-code="'+tagList[i].tag_id+'" style="top: '+_y+'px; left: '+_x+'px;"></i>');
                        }
                        
                    }else{
                        slideMessage('网络错误');
                    }

                },

                error:function(data){
//                    console.log(data);
                    slideMessage('网络错误');
                }

        });
    },
    
    showSelectedPic:function(id){
         //init
        selDetailBox.find('#points-box .point').html('');
        selDetailBox.find('.photo-version-box').html('');
        selDetailBox.find('#points-box img').remove();
//        detailPoint.html('');
        
        //标记点初始化
        if(cusSelectInner.pointShow){
            pointBox.find('.point i').show();
        }else{
            pointBox.find('.point i').hide();
        }
        
        
        cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.photo.get',
                    'select_id': cusSelectInner.getProId(),   
                    'photo_id': id
                },

                success:function(data){
//                    console.log(data.response);
                    if(data.error_id==0){  
                        var _data = data.response,
                            tagList = _data.tag_list,
                            photoList = _data.photo_list,
                            posJson = null,
                            _x = null,
                            _y = null;
                        
//                        console.log(_data.state);
                        cusSelectInner.photoGetList = photoList;
                        //照片状态
//                        if(_data.state==10){
//                            bottomTab.find('.single-confirm').hide();
//                        }else{
//                            bottomTab.find('.single-confirm').show();
//                        }
                        
                selDetailBox.find('#points-box').append('<img class="photo-version0" width="860" src="http://image.paiwo.co/'+_data.photo_path+'@!1d5" data-file="'+_data.photo_path+'"/>');
                     selDetailBox.find('.photo-version-box').append('<li class="pass-one pass-line-cur" data-index="0"><p>原片</p><i></i></li>');
//                        selDetailBox.find('.main-pic').attr('src','http://image.paiwo.co/'+_data.photo_path+'@!1d5');
                        cusSelectInner.picState(_data.picState);
                        
                        for(var i=0;i<tagList.length;i++){
                            posJson = unescape(tagList[i].tag_coordinate);
                            posJson = JSON.parse(posJson);
//                            console.log(posJson);
                            _x = posJson['posX'];
                            _y = posJson['posY'];
                            //评论
                            selDetailBox.find('.detail-point').append('<li data-pos="'+_x+'-'+_y+'" data-code="'+tagList[i].tag_id+'">'+tagList[i].tag_desc+'<i></i></li>');
                            //标记
                            selDetailBox.find('#points-box .point').append('<i data-pos="'+_x+'-'+_y+'" data-code="'+tagList[i].tag_id+'" style="top: '+_y+'px; left: '+_x+'px;"></i>');
                        }
                        
                    //版本相关
                    if(photoList.length>1){  //有版本更新
                         for(var i=1;i<photoList.length;i++){
                        selDetailBox.find('#points-box').append('<img class="photo-version'+i+'" src="http://image.paiwo.co/'+photoList[i].photo_path+'@!1d5" width="860" data-file="'+photoList[i].photo_path+'" style="display:none;"/>');
                        selDetailBox.find('.photo-version-box').append('<li class="pass-one" data-index="'+i+'"><p>版本'+i+'</p><i></i></li>');
                             
                         }
                        $('#selected-detail-pic-box .pass-line li').css('text-align','');
                        selDetailBox.find('.dem-big-pic-line').css('border','1px dashed #b6b3aa');
                    }else{
                        $('#selected-detail-pic-box .pass-line li').css('text-align','center');
                        selDetailBox.find('.dem-big-pic-line').css('border','none');
                    }
                        
                    //动态调整版本位置
                    $('#selected-detail-pic-box .dem-big-pic-line').css('margin-left',-photoList.length*50/2);
                    
                    //显示最新版本
                    selDetailBox.find('img').hide();
                    if(photoList.length==0){
                        selDetailBox.find('.photo-version0').show();
                    }else{
                    selDetailBox.find('.photo-version'+(photoList.length-1)).show();
                    selDetailBox.find('.photo-version-box li').removeClass('pass-line-cur');
                    selDetailBox.find('.photo-version-box li[data-index="'+(photoList.length-1)+'"]').addClass('pass-line-cur');
                    }
                    
                         
                    }else{
                        slideMessage('网络错误');
                    }
                    
                    

                },

                error:function(data){
                    slideMessage('网络错误');
                }

        });
    },
    
    isContinue:false,
    
    joinActive:function(){   //加入精修
        
        cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.photo.decorate.add',
                    'select_id': cusSelectInner.getProId(),   
                    'photo_id': cusSelectInner.nowId
                },

                success:function(data){
                   
                    if(data.error_id==0){  
                        
                        $('.alert_main_body_box').fadeOut();
                        $('.alter-picExceed').fadeOut();
                        
                        cusSelectInner.isPoint = true;
//                        $('.join-aicon').hide(400,function(){
//                            pointBox.find('i').fadeIn(400);
//                        });
//                        $('.add-dem-left').show().addClass('active');
                        
                        
                        cusSelectInner.selectedCount++;
                        
//                        console.log(cusSelectInner.selectedCount);
                        $('.join-aicon').html('<span class="cancel-join">取消精修</span>').show();
                        subPgBox.find('.count').html(cusSelectInner.selectedCount);
                        bottomTab.find('.demandfix-buttom .count').html(cusSelectInner.selectedCount);
                        
                        cusSelectInner.init();
                        
                    }else{
                        slideMessage('网络错误');
                    }

                },

                error:function(data){
//                    console.log(data);
                    slideMessage('网络错误');
                }

        });
    },
    
    removeActive:function(){
    
    },
    
    photoState:function(decorat){
         for(var i=0;i<decorat.length;i++){
             cusSelectBox.find('.original-selected-box li[data-code="'+decorat[i].photo_id+'"] .on-addDemand-mainbox-tip').html('取消精修');
//             on-addDemand-needfix
             cusSelectBox.find('.original-selected-box li[data-code="'+decorat[i].photo_id+'"] .state').addClass('on-addDemand-needfix').show();
         }
         
             
       
        
        
    },
    
    selectedList:function(){  
        
        cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.customer.select.get',
                    'select_id': cusSelectInner.getProId()
                },

                success:function(data){
//                    console.log(data.response);
                    if(data.error_id==0){  
                        var _data = data.response,
                            _select = _data.photo_select,
                            asePhoto = $.tmpl(cusSelectInner.selectedTm,_data.decorate_cart_photo_list),
                            num = _data.decorate_cart_photo_list.length - _select.choice_count;
                        
                        selectList.find('.on-addDemand-mainbox').html(asePhoto);
                        
                        if(num>0){
                            bottomTab.find('.send-pg-select .count').html(num);
                            bottomTab.find('.send-pg-select .price').html('¥ '+num*_select.extra_price);
                            bottomTab.find('.send-pg-select .exre-span').show();
                        }else{
                            bottomTab.find('.send-pg-select .exre-span').hide();
                        }
                        
                        
                    }else if(data.error_id==200001){
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
    
    
    sendToPg:function(){
        
//        cloud.ajax({
//
//                 data:{
//                    'method': 'paiwo.cloud.select.photo.decorate.commit',
//                    'select_id': cusSelectInner.getProId()
//                },
//
//                success:function(data){
//                    console.log(data.response);
//                    if(data.error_id==0){  
//                        var _data = data.response;
//                        console.log('333');
//                        bottomTab.find('.send-pg-select').fadeOut();
//                    }else{
//                        slideMessage('网络错误');
//                    }
//
//                },
//
//                error:function(data){
//                    console.log(data);
//                    slideMessage('网络错误');
//                }
//
//        });
    },
    
    
    selectState:function(choice,extra,state){  //整个选片夹状态
        
//        console.log(choice,extra,state);
        
        var str = '',
            listTips = '',
            showTips = '';
        if(choice==0 && extra==0){
            if(state==3){  //顾客已接收
               listTips = '所有照片都上传好了！';
               showTips = '所有照片都上传好了！';
//               botCusRequire.find('.bottom-tab-i').remove();
//                 botCusRequire.find('.allrecive-submit').show();
            }else if(state==4){  //精修中
               listTips = '所有照片都上传好了！';
               showTips = '所有照片都上传好了！';
            }else if(state==5){
               listTips = '所有照片都上传好了！';
               showTips = '所有照片都上传好了！';
            }else if(state==10){
               listTips = '已全部收片';
               showTips = '已全部收片';
//                botCusRequire.find('.cus-recive-uploading').hide();
//                botCusRequire.find('.allrecive-submit').hide();
            }
            showSelectList.find('li .on-addDemand-mainbox-tip').remove();
            pointBox.find('.join-aicon').remove();
            botCusRequire.find('.pass-line').hide();
            $('.download-pic-btn').remove();
            detailPic.find('.add-dem-left').append('<a class="download-pic-btn" href="javascript:;" style="display:block;"><span class="dl">下载图片</span></a>');
        }else if(choice==0 && extra==1){   //不允许精修,允许加修
            
           if(state==3){  //顾客已接收
               str = '<li class="demandfix-pass pass-one pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">选片中</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>精修</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
               listTips = '请选择希望摄影师进行后期修片的照片';
               showTips = '请选择希望摄影师进行后期修片的照片';
               
               botCusRequire.find('.cus-recive-uploading').show();
               //添加下载按钮
//               botCusRequire.find('.allrecive-submit').show();
            }else if(state==4 && cusSelectInner.decorating==0){ //待收片
                str = '<li class="demandfix-pass pass-one"><i></i><p>选片中</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p style="width:72px;margin-left:-10px;">摄影师修片中</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p>收片中</p></li>';
                listTips = '所有想要的照片都修好了！';
                showTips= '摄影师已完成全部修片';
                botCusRequire.find('.cus-recive-uploading').show();
//                botCusRequire.find('.allrecive-submit').show();
            }else if(state==4){  //精修中
                str = '<li class="demandfix-pass pass-one"><i></i><p>选片中</p></li>'+
                     '<li class="demandfix-pass pass-two pass-line-cur"><i class="pass-line-li-i"></i><p style="width:72px;margin-left:-10px;">摄影师修片中</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
                listTips = '摄影师还未完成你想要的照片的修片工作,请耐心等待';
                showTips = '切换照片版本比较照片，点击下载可按各级分辨率下载';
                botCusRequire.find('.cus-recive-uploading').show();
            }else if(state==10){
                str = '<li class="demandfix-pass pass-one"><i></i><p>选片中</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p style="width:72px;margin-left:-10px;">摄影师修片中</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p style="width:90px;margin-left:-10px;">已全部收片</p></li>';
                listTips = '已全部收片';
                showTips = '已全部收片';
//                botCusRequire.find('.cus-recive-uploading').hide();
//                botCusRequire.find('.allrecive-submit').hide();
            }
            
        }else if(choice!=0){  //同意精修,同意加修
            if(state==3){  //顾客已接收
                str = '<li class="demandfix-pass pass-one pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">选片中</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p>精修</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
                listTips = '请选择希望摄影师进行后期修片的照片';
//                showTips = '点击图片告诉摄影师后期你想怎么修';
                showTips = '请选择希望摄影师进行后期修片的照片';                 
                botCusRequire.find('.cus-recive-uploading').show();
                botCusRequire.find('.cus-submit').show();
//                botCusRequire.find('.allrecive-submit').addClass('forbid').show();
            }else if(state==4 && cusSelectInner.decorating==0){  //待收片
                str = '<li class="demandfix-pass pass-one"><i></i><p>选片中</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p style="width:72px;margin-left:-10px;">摄影师修片中</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p style="width:60px;">收片中</p></li>';
                listTips = '所有想要的照片都修好了！';
                showTips = '摄影师已完成全部修片';
                botCusRequire.find('.cus-recive-uploading').show();
//                botCusRequire.find('.allrecive-submit').show();
            }else if(state==4){  //精修中
                str = '<li class="demandfix-pass pass-one"><i></i><p>选片中</p></li>'+
                     '<li class="demandfix-pass pass-two pass-line-cur"><i class="pass-line-li-i"></i><p style="width:72px;margin-left:-10px;">摄影师修片中</p></li>'+
                     '<li class="pass-three"><i></i><p>收片</p></li>';
                listTips = '摄影师还未完成你想要的照片的修片工作,请耐心等待';
                showTips = '切换照片版本比较照片，点击下载可按各级分辨率下载';
                botCusRequire.find('.cus-recive-uploading').show();
//                botCusRequire.find('.allrecive-submit').addClass('forbid').show();
            }else if(state==10){
                str = '<li class="demandfix-pass pass-one"><i></i><p>选片中</p></li>'+
                     '<li class="demandfix-pass pass-two"><i></i><p style="width:72px;margin-left:-10px;">摄影师修片中</p></li>'+
                     '<li class="pass-three pass-line-cur"><i class="pass-line-li-i"></i><p style="width:90px;margin-left:-10px;">已全部收片</p></li>';
                listTips = '已全部收片';
                showTips = '已全部收片';
                
            }
        }
       
        
        botCusRequire.find('.pass-line').html(str);
        botCusRequire.find('.list-tips').html(listTips);
        botCusRequire.find('.show-tips').html(showTips);
        
    }
    
    
};



//原片移入显示加修
cusSelectBox.on('mouseenter','.original-selected-box li',function(){
    $(this).find('.on-addDemand-mainbox-tip').stop().animate({ bottom: 0},100);
});

cusSelectBox.on('mouseleave','.original-selected-box li',function(){
    $(this).find('.on-addDemand-mainbox-tip').stop().animate({ bottom: -20},100);
});


//移入出现加入精修
cusSelectBox.on('click','.original-selected-box .on-addDemand-mainbox-tip',function(ev){
   
//    console.log($(this));
   var $this = $(this),
       photoId = $this.parent().attr('data-code');
       cusSelectInner.nowId= photoId;

     ev.stopPropagation();
   if($this.parent().find('.state').hasClass('on-addDemand-needfix')){   //取消精修

       cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.photo.decorate.cancel',
                    'select_id': cusSelectInner.getProId(),
                    'photo_id': photoId
                },

                success:function(data){
//                    console.log(data.response);
                    if(data.error_id==0){  
                       $this.html('加入精修'); 
                       $this.parent().find('.state').removeClass('on-addDemand-needfix').fadeOut(200);
                       cusSelectInner.init();
                    }else{
                        slideMessage('网络错误');
                    }

                },

                error:function(data){
                    slideMessage('网络错误');
                }

        });
       
   }else{   //加入精修
       
       
        var count = cusSelectInner.selectedCount;
            count++;
       
        if(!cusSelectInner.isContinue && count>cusSelectInner.pgSelect && cusSelectInner.isExtra==0){
            slideMessage('精修数量超出摄影师要求');
            return;
        }
       
        if(!cusSelectInner.isContinue && count>cusSelectInner.pgSelect){
            $('.alert_main_body_box').fadeIn();
            $('.alter-picExceed').fadeIn();
            return;
        }
       
       cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.photo.decorate.add',
                    'select_id': cusSelectInner.getProId(),   
                    'photo_id': photoId
                },

                success:function(data){
//                    console.log(data.response);
                    if(data.error_id==0){  
                        
//                        console.log('join');
                        
                        $this.html('取消精修'); 
       $this.parent().find('.state').addClass('on-addDemand-needfix').fadeIn(200);
                        cusSelectInner.init();
                    }else{
                        slideMessage('网络错误');
                    }
                    
                    

                },

                error:function(data){
                    slideMessage('网络错误');
                }

        });
   }
    
});


//原片点击进入大图
cusSelectBox.on('click','.original-selected-box li',function(ev){
    
    ev.stopPropagation();
    cusSelectInner.baseShowPic = true;
    
    var _id = $(this).attr('data-code'),
        scrolWidth = base.scrollbarwidth();
        cusSelectInner.baseIndex = $(this).index();
    
    
    //tips输出
    botCusRequire.find('.list-tips').hide();
    botCusRequire.find('.show-tips').show();
    
//    if(cusSelectInner.stateNum==3 && ){
//        
//    }
    
    
    if(cusSelectInner.stateNum==4 || cusSelectInner.stateNum==5 || cusSelectInner.stateNum==10){
        return;
    }else{
         //init
        cusSelectInner.nowId = _id;  //当前操作id
        bottomTab.css('margin-left',-scrolWidth);
//        bottomTab.find('.pass-line').fadeOut();
        bottomTab.find('.demandfix-buttom').fadeOut();
        cusSelectInner.index = $(this).index();

        cusSelectInner.showPic(_id);

        detailPic.fadeIn(400);
    }
    

    cloud.hideScroll();
    
    
});


//精修点击进入大图
cusSelectBox.on('click','.decorate-selected-box li',function(ev){
    
    ev.stopPropagation();
    cusSelectInner.baseShowPic = false;
    
    
    var count = cusSelectInner.selectedCount;
        count++;

    if(!cusSelectInner.isContinue && count>cusSelectInner.pgSelect && cusSelectInner.isExtra==0){
        slideMessage('精修数量超出摄影师要求');
        return;
    }
    
    var _id = $(this).attr('data-code'),
        scrolWidth = base.scrollbarwidth();
        cusSelectInner.baseSelectIndex = $(this).index();
    
    if(cusSelectInner.stateNum==4){
        return;
    }else{
         //init
        
//        cusSelectInner.decorateTmpArr
        
        cusSelectInner.nowId = _id;  //当前操作id
        bottomTab.css('margin-left',-scrolWidth);
//        bottomTab.find('.pass-line').fadeOut();
        bottomTab.find('.demandfix-buttom').fadeOut();
//        cusSelectInner.index = $(this).index();

        cusSelectInner.showPic(_id);
        detailPic.fadeIn(400);
        
        
    }
    
    cloud.hideScroll();
    
});



//大图内取消精修
detailPic.on('click','.img-style',function(){
//    alert(1);
//    $(this).stop().animate({'margin-left':-120,'opacity':0},400);
    var $this = $(this);
    cloud.ajax({
             data:{
                'method': 'paiwo.cloud.select.photo.decorate.cancel',
                'select_id': cusSelectInner.getProId(),
                'photo_id': cusSelectInner.nowId
            },

            success:function(data){
                
                if(data.error_id==0){  
                  $this.stop().animate({'margin-left':-120,'opacity':0},400);
                  detailPic.find('.add-dem-left').removeClass('active');
                  commentBox.fadeOut();
                  $('.join-aicon').fadeIn();
                  cusSelectInner.init();
                }else{
                  slideMessage('网络错误');
                }

            },

            error:function(data){
                slideMessage('网络错误');
            }

        });
});



//关闭大图返回按钮
detailPic.on('click','.back',function(){
    
    cusSelectInner.init();
    cusSelectInner.isPoint = false;
    detailPic.find('.main-pic').attr('src','');
    detailPic.hide();
    cloud.showScroll();
    detailPic.find('.point i').hide();
    $('.add-dem-left').removeClass('active');
    $('.add-dem-right').hide();
    $('.join-aicon').show();
    bottomTab.css('margin-left',0);
    //bottomTab.find('.pass-line').fadeIn();
    bottomTab.find('.demandfix-buttom').fadeIn();
    detailPic.find('.img-style').removeClass('add-dem-left-fixing').hide();
    detailPic.find('.point').hide();
    
    //tips
    botCusRequire.find('.list-tips').show();
    botCusRequire.find('.show-tips').hide();
    
});


//返回顾客选片夹
selectList.on('click','.back',function(){
    
//    console.log('qwdqwdqwd');
    
    selectList.hide();
    cusSelectBox.fadeIn();
    $('.send-pg-select').hide();
    $('.bottom-tab-cneter-2').fadeIn();
    cusSelectInner.init();
    
    
});

//图片切换
detailPic.on('clik','.mouse-left',function(){
    
     cusSelectInner.index--;
    if(cusSelectInner.index<=0)cusSelectInner.index=0;
    cusSelectInner.nowId = cusSelectInner.photoListArr[cusSelectInner.index].photo_id;
    cusSelectInner.showPic(cusSelectInner.nowId);
});

detailPic.on('clik','.mouse-right',function(){
    
    cusSelectInner.index++;         if(cusSelectInner.index==cusSelectInner.photoListArr.length)cusSelectInner.index=cusSelectInner.photoListArr.length-1;
     cusSelectInner.nowId = cusSelectInner.photoListArr[cusSelectInner.index].photo_id;
     cusSelectInner.showPic(cusSelectInner.nowId);
});


//任性添加
joinPhotoBox.on('click','.submit',function(ev){
    ev.stopPropagation();
//    cusSelectInner.isContinue = true;
    cusSelectInner.joinActive();
//    setTimeout(function(){
//            commentBox.show();
//    },400);
});


joinPhotoBox.on('click','.alter-picExceed-sub,.message_close',function(ev){
    ev.stopPropagation();
    if(cusSelectInner.isExtra==1 && cusSelectInner.extra_price>0){
        $('.alert_main_body_box').fadeOut();
        joinPhotoBox.fadeOut();
    }
    
});

//不再提示任性添加
joinPhotoBox.on('click','.checkbox',function(){
    var $this = $(this).find('i');
    if($this.is(":hidden")){
        $this.show();
        cusSelectInner.isContinue = true;
    }else{
        $this.hide();
        cusSelectInner.isContinue = false;
    }
});


//大图内加入精修按钮
detailPic.on('click','.join-aicon',function(ev){
    
    var count = cusSelectInner.selectedCount;
        count++;
    
    if(!cusSelectInner.isContinue && count>cusSelectInner.pgSelect && cusSelectInner.isExtra==0 && !cusSelectInner.isPoint){
        slideMessage('精修数量超出摄影师要求');
        return;
    }
       
    if(!cusSelectInner.isContinue && count>cusSelectInner.pgSelect && !cusSelectInner.isPoint){
        $('.alert_main_body_box').fadeIn();
        $('.alter-picExceed').fadeIn();
        return;
    }
    
    if(!cusSelectInner.isPoint){  //加入精修
        cusSelectInner.joinActive();
        cusSelectInner.isPoint = true;
        
    }else{ //取消精修
        
        cusSelectInner.isPoint = false;
        
        cloud.ajax({
             data:{
                'method': 'paiwo.cloud.select.photo.decorate.cancel',
                'select_id': cusSelectInner.getProId(),
                'photo_id': cusSelectInner.nowId
            },

            success:function(data){
                
                if(data.error_id==0){  
                  $('.join-aicon').html('<z></z><span>加入精修</span>');
                  detailPic.find('.img-style').hide();
                  cusSelectInner.init();
                }else{
                  slideMessage('网络错误');
                }

            },

            error:function(data){
                slideMessage('网络错误');
            }

        });
    }
    
//    $(this).hide(400,function(){
//        pointBox.find('i').fadeIn(400);
//        commentBox.fadeIn();
//    });
    
   
});

//打点
detailPic.on('click','.point',function(ev){
    
//     console.log('ppp');
    
//    console.log(ev.offsetX+' | '+ev.offsetY);
    if(cusSelectInner.isPoint){
        
//        console.log('www');
        
        pointBox.find('.point i').css('background-color','#fff');
        
        var _id = cusSelectInner.nowId,
            mainPic = detailPic.find('.main-pic'),
            _x = ev.offsetX - 5,
            _y = ev.offsetY - 5,
            minX = mainPic.position().left,
            maxX = mainPic.position().left + mainPic[0].offsetWidth;
        
        
        if(_x>=minX && _x<=maxX){
            var oI = document.createElement('i');
            oI.style.top = _y +'px';
            oI.style.left = _x + 'px';
            oI.setAttribute('data-pos',_x+'-'+_y);
            oI.style.backgroundColor = '#f7485e';
            cusSelectInner.pointJson['posX'] = _x;
            cusSelectInner.pointJson['posY'] = _y;
            
//            console.log(cusSelectInner.pointJson);

            $('#point-box .point').append(oI);
            textArea.focus();
        }
        
        
    }
    
    
    

});


//取消精修点
commentBox.on('click','.detail-point i',function(){
    var node = $(this).parent(),
        tagId = node.attr('data-code'),
        tagPos = node.attr('data-pos');
    
//    console.log(tagId);
    
    cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.photo.decorate.tag.delete',
                    'select_id': cusSelectInner.getProId(),
                    'photo_id': cusSelectInner.nowId,
                    'tag_id':tagId
                },

                success:function(data){
//                    console.log(data.response);
                    if(data.error_id==0){  //比配成功
                        
                        node.remove();
                        detailPic.find('.point i[data-pos="'+tagPos+'"]').remove();
                    }else{
                        slideMessage('网络错误');
                    }

                },

                error:function(data){
//                    console.log(data);
                    slideMessage('网络错误');
                }

        });
});


//标记保存
commentBox.on('click','.save',function(){
    var _id = cusSelectInner.nowId,
        text = textArea.val().trim(),
        json = JSON.stringify(cusSelectInner.pointJson);
        json = escape(json);
        
        if(text==''){
            slideMessage('内容不能为空');
            return;
        }
    
     
            cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.photo.decorate.tag.add',
                    'select_id': cusSelectInner.getProId(),
                    'photo_id': _id,
                    'tag_desc':text,
                    'tag_coordinate':json
                },

                success:function(data){
//                    console.log(data.response);
                    if(data.error_id==0){  //比配成功
                        var _data = data.response;
                        detailPoint.append('<li data-pos="'+cusSelectInner.pointJson['posX']+'-'+cusSelectInner.pointJson['posY']+'" data-code="'+_data.tag_id+'">'+text+'<i></i></li>');
                        textArea.val('');
                        
                    
                    }else{
                        slideMessage('网络错误');
                    }

                },

                error:function(data){
//                    console.log(data);
                    slideMessage('网络错误');
                }

        });
});





//var subPgTimer = null,
//    subPgTimer2 = null;
//
////出现购物车
//bottomTab.on('mouseenter','.submit-pg',function(){
//    clearTimeout(subPgTimer2);
//    subPgBox.show();
//    
//});
//
//bottomTab.on('mouseleave','.submit-pg',function(){
//
//    subPgTimer = setTimeout(function(){
//         subPgBox.hide();
//    },300);
//    
//});
//
//
//subPgBox.on('mouseenter',function(){
//    clearTimeout(subPgTimer);
//    subPgBox.show();
//});
//
//
//subPgBox.on('mouseleave',function(){
//    
//    setTimeout(function(){
//        subPgBox.hide();
//    },300);
//    
//});

//查看全部精修照片
//subPgBox.on('click','.more',function(){
//    cusSelectBox.hide();
//    cusSelectInner.selectedList();
//    selectList.fadeIn();
//    $('.bottom-tab-cneter-2').hide();
//    $('.send-pg-select').fadeIn();
//});




////显示取消精修
//selectList.on('mouseenter','.on-addDemand-mainbox li',function(){
//    $(this).find('.delete-select').stop().animate({ bottom: 0},100);
//});
//
//selectList.on('mouseleave','.on-addDemand-mainbox li',function(){
//    $(this).find('.delete-select').stop().animate({ bottom: -36},100);
//});
//
////取消精修
//selectList.on('click','.delete-select',function(){
//    var $this = $(this),
//        photoId = $this.parent().attr('data-code');
//    
//     cloud.ajax({
//
//                 data:{
//                    'method': 'paiwo.cloud.select.photo.decorate.cancel',
//                    'select_id': cusSelectInner.getProId(),
//                    'photo_id': photoId
//                },
//
//                success:function(data){
//                    console.log(data.response);
//                    if(data.error_id==0){  
//                        var _data = data.response;
////                        $this.parent().remove();
//                        cusSelectInner.selectedList();
//                    }else{
//                        slideMessage('网络错误');
//                    }
//
//                },
//
//                error:function(data){
//                    slideMessage('网络错误');
//                }
//
//        });
//    
//    
//});



//绑定之后, 提交给摄影师
bottomTab.on('click','.cus-submit',function(){
    
    //当允许修片数量>0或允许加修时，加入精修照片=0时，按钮禁用
    if(cusSelectInner.choice_count>0 && cusSelectInner.isExtra==1 && cusSelectInner.selectCount==0){
        slideMessage('请选择精修照片');
        return;   
    }
    
    $('.alert_main_body_box').fadeIn();
    $('#send-to-pg').fadeIn();
    
    
});


$('#send-to-pg').on('click','.submit',function(){
//    cusSelectInner.sendToPg();
     cloud.ajax({

                 data:{
                    'method': 'paiwo.cloud.select.photo.decorate.commit',
                    'select_id': cusSelectInner.getProId()
                },

                success:function(data){
//                    console.log(data.response);
                    if(data.error_id==0){  
                        $('.alert_main_body_box').fadeOut();
                        $('#send-to-pg').fadeOut();
//                        slideMessage('提交成功');
                        window.location.reload();
                    }else{
                        slideMessage(data.error_code);
                    }

                },

                error:function(data){
//                    console.log(data);
                    slideMessage('网络错误');
                }

        });
});

$('#send-to-pg').on('click','.message_close',function(){
//    cusSelectInner.sendToPg();
    $('.alert_main_body_box').fadeOut();
    $('#send-to-pg').fadeOut();
});

//精修列表提交摄影师
//bottomTab.on('click','.send-pg-select .establish',function(){
//    cusSelectInner.sendToPg();
//})


//全部收片弹窗
//bottomTab.on('click','.allrecive-submit',function(){
////    if($(this).hasClass('forbid'))return;
//    $('.alert_main_body_box').fadeIn();
//    $('#cus-final').fadeIn();
//});


//全部收片确认
$('#cus-final').on('click','.submit',function(){
    
     cloud.ajax({

             data:{
                'method': 'paiwo.cloud.select.select.decorate.complete',
                'select_id': cusSelectInner.getProId()
            },

            success:function(data){
                console.log(data);
                if(data.error_id==0){
                    $('#cus-final').fadeOut();
                    $('.alert_main_body_box').fadeOut();
//                    slideMessage('完成收片');
//                    cusSelectInner.init();
                    window.location.reload();
                }else{
                    slideMessage(data.error_code);  
                }

            },

            error:function(data){

            }

    });
});


//取消收片弹窗
$('#cus-final').on('click','.message_close',function(){
    $('.alert_main_body_box').fadeOut();
    $('#cus-final').fadeOut();
});



//移入评论标记点
commentBox.on('mouseenter','.detail-point li',function(){
    var posCode = $(this).attr('data-pos');
    
    detailPic.find('.point i').css('background-color','#fff');
    
    detailPic.find('.point i').each(function(index,ele){
        if($(this).attr('data-pos')==posCode){
            $(this).css('background-color','#f7485e');
        }
    });
    
});

//移入图片标记点
detailPic.on('mouseenter','.point i',function(){
    var posCode = $(this).attr('data-pos');
    
    detailPic.find('.point i').css('background-color','#fff');
    $(this).css('background-color','#f7485e');
    commentBox.find('.detail-point li').css('color','#b6b3aa');
    commentBox.find('.detail-point li[data-pos="'+posCode+'"]').css('color','#f7485e');
});

//detailPic.on('mouseleave','.point i',function(){
//    detailPic.find('.point i').css('background-color','#fff');
//    commentBox.find('.detail-point li').css('color','#b6b3aa');
//});


//显示标记
commentBox.on('click','#show-point',function(){
    
    if(cusSelectInner.pointShow){
        detailPic.find('.point i').hide();
        $(this).find('i').hide();
    }else{
        detailPic.find('.point i').show();
        $(this).find('i').show();
    }
    
    cusSelectInner.pointShow = !cusSelectInner.pointShow;
});


//上一张
detailPic.on('click','.mouse-left',function(){

    if(cusSelectInner.baseShowPic){  //原图大图
        cusSelectInner.baseIndex--;
        if(cusSelectInner.baseIndex<=0)cusSelectInner.baseIndex=0;
        cusSelectInner.nowId = cusSelectInner.baseTmp[cusSelectInner.baseIndex];
        cusSelectInner.showPic(cusSelectInner.nowId);
    }else{  //精修大图
         cusSelectInner.baseSelectIndex--;
        if(cusSelectInner.baseSelectIndex<=0)cusSelectInner.baseSelectIndex=0;
        cusSelectInner.nowId = cusSelectInner.decorateTmpArr[cusSelectInner.baseSelectIndex];
        cusSelectInner.showPic(cusSelectInner.nowId);
    }
    
    
});

//下一张
detailPic.on('click','.mouse-right',function(){
        
if(cusSelectInner.baseShowPic){
     cusSelectInner.baseIndex++;
if(cusSelectInner.baseIndex==cusSelectInner.baseTmp.length)cusSelectInner.baseIndex=cusSelectInner.baseTmp.length -1;
     cusSelectInner.nowId = cusSelectInner.baseTmp[cusSelectInner.baseIndex];
     cusSelectInner.showPic(cusSelectInner.nowId);
}else{
         cusSelectInner.baseSelectIndex++;
if(cusSelectInner.baseSelectIndex==cusSelectInner.decorateTmpArr.length)cusSelectInner.baseSelectIndex=cusSelectInner.decorateTmpArr.length -1;
     cusSelectInner.nowId = cusSelectInner.decorateTmpArr[cusSelectInner.baseSelectIndex];
     cusSelectInner.showPic(cusSelectInner.nowId);
}
 
});



//页面初始化调用
//cloud.init(function(){
    cusSelectInner.init();
//});


//精修、原片切换
cusSelectInner.scrollWidth = base.scrollbarwidth();

cusSelectBox.on('click','.subCustomer-middle-radius div',function(){
    
    var $this = $(this),
        nowScroll = null,
        pos = parseInt(centerButton.css('right'));
    
    cusSelectBox.find('.original-selected-box').hide();
    cusSelectBox.find('.decorate-selected-box').hide();
    cusSelectBox.find('.subCustomer-middle-radius div').removeClass('radio-cur');
    
    if($this.hasClass('original-style')){  //原片
        cusSelectBox.find('.original-selected-box').fadeIn();
//        bottomTab.find('.bottom-tab-cneter-2 .complete-selected').hide();
    }else if($this.hasClass('decorate-style')){  //精修照片
        
        cusSelectBox.find('.decorate-selected-box').fadeIn();
//        bottomTab.find('.bottom-tab-cneter-2 .complete-selected').fadeIn();
    }
    
    nowScroll = base.scrollbarwidth();
    
    if(nowScroll!=cusSelectInner.scrollWidth){
        $('html').css('padding-right',cusSelectInner.scrollWidth);
        botCusRequire.css('padding-right',cusSelectInner.scrollWidth);
        if(pos>-20){
            centerButton.css('right',pos-nowScroll);
        }else if(pos<=-20){
            centerButton.css('right',pos+cusSelectInner.scrollWidth);
        }
        cusSelectInner.scrollWidth = nowScroll;
        
    }
    
    $this.addClass('radio-cur');
});

//cusSelectInner.stateNum



/*********************************************精修状态*********************************************************/
//精修照片大图
cusSelectBox.on('click','.decorate-selected-box li',function(){
    var _id = this.getAttribute('data-code'),
        scrolWidth = base.scrollbarwidth();
    if(cusSelectInner.stateNum==4){
        cusSelectInner.basePic = false;
        cusSelectInner.nowId = _id;  //当前操作id
        bottomTab.css('margin-left',-scrolWidth);
//        bottomTab.find('.pass-line').fadeOut();
        bottomTab.find('.demandfix-buttom').fadeOut();
        cusSelectInner.selectedIndex = $(this).index();  //精修片序号
        cusSelectInner.showSelectedPic(_id);
        selDetailBox.fadeIn(400);
        cloud.hideScroll();
    }else{
        return;
    }
});


//点击所有照片大图
showSelectList.on('click','.decorate-photo',function(){
//     console.log('showpic');
    var _id = this.getAttribute('data-code'),
        scrolWidth = base.scrollbarwidth();
        cusSelectInner.basePic = true;
        cusSelectInner.nowId = _id;  //当前操作id
        bottomTab.css('margin-left',-scrolWidth);
//        bottomTab.find('.pass-line').fadeOut();
        bottomTab.find('.demandfix-buttom').fadeOut();
        cusSelectInner.allPhotoIndex = $(this).index();  //精修片序号
        cusSelectInner.showSelectedPic(_id);
        selDetailBox.fadeIn(400);
        cloud.hideScroll();
});

//返回
selDetailBox.on('click','.back',function(){
    selDetailBox.hide();
    selDetailBox.find('img').attr('src','');
    cloud.showScroll();

    selDetailBox.find('.point i').hide();
//    $('.add-dem-left,.add-dem-right').removeClass('active');
    bottomTab.css('margin-left',0);
//    bottomTab.find('.pass-line').fadeIn();
    bottomTab.find('.demandfix-buttom').fadeIn();
    bottomTab.find('.demandfix-left-a').hide(); 
    bottomTab.find('.demandfix-right-a').hide();
//    bottomTab.find('.bottom-tab-cneter-2 .complete-selected').fadeIn();
//    bottomTab.find('.bottom-tab-cneter-2 .single-confirm').hide();
    
    //tips
    botCusRequire.find('.list-tips').show();
    botCusRequire.find('.show-tips').hide();
    
    
    
});

//cusSelectBox.allPhotoTmp

//精修上一张
selDetailBox.on('click','.mouse-left',function(){
    
    if(cusSelectInner.basePic){  //点击所有图片大图
         cusSelectInner.allPhotoIndex--;
        if(cusSelectInner.allPhotoIndex<=0)cusSelectInner.allPhotoIndex=0;
        cusSelectInner.showSelectedPic(cusSelectInner.allPhotoTmp[cusSelectInner.allPhotoIndex]);
    }else{   //点击精修
         cusSelectInner.selectedIndex--;
        if(cusSelectInner.selectedIndex<=0)cusSelectInner.selectedIndex=0;
        cusSelectInner.showSelectedPic(cusSelectInner.decorateTmpArr[cusSelectInner.selectedIndex]);
    }
   
    
    
});

//精修下一张
selDetailBox.on('click','.mouse-right',function(){
    
    if(cusSelectInner.basePic){   //点击所有图片大图
         cusSelectInner.allPhotoIndex++; if(cusSelectInner.allPhotoIndex==cusSelectInner.allPhotoTmp.length)cusSelectInner.allPhotoIndex=cusSelectInner.allPhotoTmp.length -1;
     cusSelectInner.showSelectedPic(cusSelectInner.allPhotoTmp[cusSelectInner.allPhotoIndex]);
    }else{     //点击精修
        
         cusSelectInner.selectedIndex++; if(cusSelectInner.selectedIndex==cusSelectInner.decorateTmpArr.length)cusSelectInner.selectedIndex=cusSelectInner.decorateTmpArr.length -1;
     cusSelectInner.showSelectedPic(cusSelectInner.decorateTmpArr[cusSelectInner.selectedIndex]);
    }
    


});
    
//版本切换
selDetailBox.on('click','.photo-version-box li',function(){
    var index = this.getAttribute('data-index'),
        parentNode = $(this).parent();
    parentNode.find('li').removeClass('pass-line-cur');
    $(this).addClass('pass-line-cur');
    selDetailBox.find('#points-box img').hide();
    selDetailBox.find('#points-box img[class="photo-version'+index+'"]').show();
});


//私信
$('.message-link').on('click',function(){
    $('#top_message').trigger('click');
    PWS.addTalk(this.getAttribute('data-code'));
});

$('#cus-complete .binded_head-img i').on('click',function(){
    $('#top_message').trigger('click');
    PWS.addTalk(this.getAttribute('data-code'));
});


var leavetimer = null,
    leavetimer2 = null;

//选片夹详情
bottomTab.on('mouseenter','.detail-info',function(ev){
    clearTimeout(leavetimer2);
    var selectDetail = $('#cus-complete .bottom-tab-detail');
    selectDetail.show();
    
});


bottomTab.on('mouseleave','.detail-info',function(){
    var selectDetail = $('#cus-complete .bottom-tab-detail');       
    leavetimer = setTimeout(function(){
        selectDetail.hide();
    },300);
    
});

$('#cus-complete .bottom-tab-detail').on('mouseenter',function(ev){
    clearTimeout(leavetimer);
    $(this).show();
    
});

$('#cus-complete .bottom-tab-detail').on('mouseleave',function(){
    
    var $this = $(this);
    leavetimer2 = setTimeout(function(){
         $this.hide();
    },300);
   
});

/****************************下载照片**************************************************/


//打开下载窗口
detailPic.on('click','.download-pic-btn',function(){
    $('.alert_main_body_box').fadeIn(200);
    singleDownload.fadeIn(200);
});


selDetailBox.on('click','.download-pic-btn',function(){
    $('.alert_main_body_box').fadeIn(200);
    singleDownload.fadeIn(200);
});

//关闭下载窗口
singleDownload.on('click','.message_close',function(){
    singleDownload.find('.download-checkbox i').hide();
    $('.link-address').attr('href','javascript:;');
    $('.alert_main_body_box').fadeOut(200);
    singleDownload.fadeOut(200);
});

//选择照片清晰度
singleDownload.on('click','.alter-download-com',function(){
      var photoTypeChoose = $(this).find('a'); 
      singleDownload.find('.download-checkbox i').hide();
      singleDownload.find('.download-checkbox a').removeClass('choose');
      photoTypeChoose.find('i').show();
      photoTypeChoose.addClass('choose');
    
    var photoType = singleDownload.find('.choose'),
        version = selDetailBox.find('.dem-big-pic-line .pass-line-cur').attr('data-index'),
        path = null;
    
    if(selDetailBox.find('.photo-version'+version).attr('data-file')){ 
        path = selDetailBox.find('.photo-version'+version).attr('data-file');
    }else{  //不可精修不可加修状态
        path = detailPic.find('.main-pic').attr('data-file');
    }
        
//        console.log(path);
    if(photoType.hasClass('phone-size')){ //普通照片
       path = 'http://image.paiwo.co/'+path+'@!1d5';
//       console.log('phone-size');
        
    }else if(photoType.hasClass('pc-size')){ //高清照片
       path = 'http://image.paiwo.co/'+path+'@!1d10';
//       console.log('pc-size');
        
    }else if(photoType.hasClass('print-size')){ //冲印照片
       path = 'http://image.paiwo.co/'+path;
//       console.log('print-size');
    }
    $('.link-address').attr('href',path);
});

//确认下载
singleDownload.on('click','.submit',function(){
    var link = $('.link-address').attr('href');
    if(link=='javascript:;'){
        slideMessage('请选择照片分辨率');
        return;
    }
    
});








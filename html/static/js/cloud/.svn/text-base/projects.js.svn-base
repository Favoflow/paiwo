
var projectMain = $('.project-main-box'),
    shadowBox = $('.alert_body'),
    color_list = $('.color-choose li'),
    editPro = $('.edit_project'),
    projectCount = $('.project-count'),
    delPro = $('.online-del-pro');

//方法们的命名空间
var projects = {
    
    count: 0,
    
    nowNode : null,
    
    nowId : 0,
    
    nowName : '',
    
    nowColor : '',
    
    init:function(){
        cloud.ajax({
            
             data:{
                'method': 'paiwo.cloud.select.projects.get',
                'color_flag': 0,
                'page_no': 1,
                'page_size': 20
            },
            
            success:function(data){
                console.log(data.response);
                if(data.error_id==0){
                    var _data = data.response,
                        proList = _data.project_list,
                        proTm = '';
                    projects.count = _data.count;
//                    console.log(data);
                    
                    //是否首次
                    if(_data.is_first==1){
                        $('.alert_body').fadeIn().find('.first_project').fadeIn();
                    }
                    
                    
                    console.log(proList);
                    for(var i=proList.length-1;i>=0;i--){
//                        console.log(proList[i].color_flag);
                        proTm += '<li data-code="'+proList[i].project_id+'">'+
                                '<a class="edit_btn"></a>'+
                                '<i class="'+projects.putColor(proList[i].color_flag)+'" style="'+projects.hideColorTag(proList[i].color_flag)+'"></i>'+
                                '<h4>'+proList[i].project_name+'</h4>'+
                                '<p><i class="count">'+proList[i].select_count+'</i>选片夹</p>'+
                                '<span>更新于 '+proList[i].create_time.split(' ')[0]+'</span>'+
                              '</li>';
                    }
                    projectMain.html(proTm);
                    projectCount.html(_data.count+'个');
                    
                }else{
                    slideMessage('网络错误');
                }
                    
            },
            
            error:function(data){
                console.log(data);
                slideMessage('网络错误');
            }
            
        });
    },
    
    chooseColor: function(color){
        var nowColor = 10;
        //项目夹颜色
        switch(color){
            case 'red':
                nowColor = 1;
                break;
            case 'cyan':
                nowColor = 2;
                break;
            case 'green':
                nowColor = 3;
                break;
            case 'orange':
                nowColor = 4;
                break;
            case 'purple':
                nowColor = 5;
                break;
        }
        
        return nowColor;
        
    },
    
    putColor: function(color){
        var _color = '';
        //项目夹颜色
        switch(color){
            case 1:
                _color = 'red';
                break;
            case 2:
                _color = 'cyan';
                break;
            case 3:
                _color = 'green';
                break;
            case 4:
                _color = 'orange';
                break;
            case 5:
                _color = 'purple';
                break;
            case 10:
                _color = ''
                break;
        }
        
        return _color;
        
    },
    
    hideColorTag:function(num){
        if(num==10){
            return 'display:none;';
        }
        return '';
    },
    
    projectTm:'<li>'+
            '<i class="orange"></i>'+
            '<h4>纸哥</h4>'+
            '<p><i>3</i>选片夹</p>'+
            '<span>更新于 2015/3/2</span>'+
          '</li>',
    
    protectTm:'<li>'+
                '<a class="edit_btn"></a>'+
                '<i class="blue"></i>'+
                '<h4>${project_name}</h4>'+
                '<p><i>${select_count}</i>选片夹</p>'+
                '<span>更新于 2015/3/2</span>'+
              '</li>'
    
    
}



//页面初始化调用
cloud.init(function(){
    projects.init();
});




//关闭创建选框
$('.message_close').on('click',function(){
  	$(this).parents('.project_box').fadeOut().parent('.alert_body').fadeOut();
});


//颜色选择
$('.color-choose').on('click', 'li', function(){
    var _this = $(this);
    if(!_this.hasClass('active')){
         color_list.removeClass('active');
        _this.addClass('active');
    }else{
        color_list.removeClass('active');
    }
    
});

//首次创建、新项目创建
$('.first_project .submit,.new_project .submit').on('click',function(ev){
    ev.stopPropagation();
    var proName = $(this).parents('.alert_delete_box').find('input').val(),
        color_index = 10;
    
    var flag = {
        
        proName :false
    
    };
    
    color_list.each(function(index,ele){
        if($(this).hasClass('active')){
            color_index = index%5+1;
        }
    });
    
    console.log(color_index);
    
    if(proName==''){
        slideMessage('请填写项目名称');
        flag.proName = false;
        return;
    }else{
        flag.proName = true;
    }
    
    
    
    if(flag.proName){
        
//        console.log(proName + '|' + color_index);
        
        cloud.ajax({
            
            data:{
                'method': 'paiwo.cloud.select.project.create',
                'project_name': proName,
                'color_flag': color_index
            },
            
            success:function(data){
                
                console.log(data);
                if(data.error_id==0){
                    $('.project_box').fadeOut().parent('.alert_body').fadeOut();
                    $('.project_box').find('input').val('');
                    color_list.removeClass('active');  
                    projects.init();
                }
                
            },
            
            error:function(data){
                console.log(data);
            }
            
        });
        
        
        
    }
    
});



//点击添加新项目
$('.create_new_pro').on('click',function(){
    shadowBox.fadeIn();
    $('.new_project').fadeIn();
});

//项目列表
projectMain.on('mouseenter','li',function(){
    $(this).find('.edit_btn').show();
});

projectMain.on('mouseleave','li',function(){
    $(this).find('.edit_btn').hide();
});

//项目编辑按钮
projectMain.on('click','.edit_btn',function(ev){
    
     ev.stopPropagation();
    //获取当前选择、名字、颜色
    var nowNode = $(this).parent(),
        selectCount = nowNode.find('.count').html();
    
    selectCount==0?editPro.find('.delete-project').show():editPro.find('.delete-project').hide();
    projects.nowName = nowNode.find('h4').html();
    projects.nowId = nowNode.attr('data-code');
    projects.nowColor = projects.chooseColor(nowNode.find('i').attr('class'));
    projects.nowNode = nowNode;

    
    //编辑弹窗显示
    shadowBox.fadeIn();
    editPro.fadeIn();
    
    //信息填入
    editPro.find('input').val(projects.nowName);
    editPro.find('.color-choose').find('li').removeClass('active');
    $(editPro.find('.color-choose').children()[projects.nowColor-1]).addClass('active');
    
   
});


//项目删除确认弹窗
editPro.on('click','.delete-project',function(){
    
    editPro.hide();
    delPro.show();

});


//关闭二次确认弹窗
$('.del-pro-close').on('click',function(){
    
    delPro.hide();
    editPro.show();
    
});


//删除项目按钮
$('#delete-project').on('click',function(ev){
    ev.stopPropagation();
    console.log(projects.nowId);
    
     cloud.ajax({

         data:{
            'method': 'paiwo.cloud.select.project.delete',
            'project_id': parseInt(projects.nowId)
        },

        success:function(data){
            console.log(data);
            if(data.error_id==0){
                 $('.project_box').fadeOut().parent('.alert_body').fadeOut();
                 projects.count-=1
                 projectCount.html(projects.count + '个');
                 projects.nowNode.remove();
                 delPro.fadeOut();
                 slideMessage('成功删除项目');
            }else{
                slideMessage('网络错误111');
            }

        },

        error:function(data){
            slideMessage('网络错误222');
            console.log(data);
        }

    });
    
});

//编辑项目提交
editPro.on('click','.submit',function(){
    var proName = $(this).parents('.alert_delete_box').find('input').val(),
         color_index = 10;
    
    color_list.each(function(index,ele){
        if($(this).hasClass('active')){
            color_index = index%5+1;
        }
    });
        
     if(proName==''){
         slideMessage('请填写项目名称');
         return;
     }
    
     cloud.ajax({
            
             data:{
                'method': 'paiwo.cloud.select.project.edit',
                'project_id': parseInt(projects.nowId),
                'project_name': proName,
                'color_flag': color_index
            },
            
            success:function(data){
                console.log(data);
                if(data.error_id==0){
                    $('.project_box').fadeOut().parent('.alert_body').fadeOut();
                    projects.init();
                }else{
                    slideMessage('网络错误');
                }
                    
            },
            
            error:function(data){
                slideMessage('网络错误');
//                console.log(data);
            }
            
        });
});


//点击进入选片夹列表
projectMain.on('click','li',function(){
    var projectId = $(this).attr('data-code');
    window.location.href = 'http://cloud.paiwo.co/p/projects/'+projectId;
});



//cloud.init(function(){
//    projects.init();
//});














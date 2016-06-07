var createSelect = $('.create-select'),  //title栏
    selsctBox = $('.innerProject-main-box'), //选片夹父级
    load_flag = true,
    list_page = 1;
var selectList = {
    
    init:function(page_no){  //初始化
        
        var projectId = selectList.getProId();
        
        cloud.ajax({
            
            data:{
                'method': 'paiwo.cloud.select.select_list.get',
                'page_no': page_no,
                'page_size': 50,
                'order_by':0
            },
            
            success:function(data){
//                console.log(data.response);
                console.log(data.response);
                if(data.error_id==0){
                    var _data = data.response,
                        _List = _data.select_list,
                        selectTm = '';
//                    $('.select-head .project-name').html(_data.project_name) //项目名称
                    $('.select-head .select-count').html(_data.select_count+'个选片夹'); //选片夹数量
                    
                    //选片夹列表
                    if(_List.length==0){  //如果为空
                        selsctBox.html(selectList.addSelectTm);
                    }else{
                        for(var i=0;i<_List.length;i++){
                           selectTm +=  '<li data-code="'+_List[i].select_id+'" class="select-li">'+
                              '<span class="innerProject-span">'+selectList.putState(_List[i].select_state)+'</span>'+
                              '<h4 class="no-portrait">'+_List[i].select_name+'</h4>'+
                              '<span>创建于 '+_List[i].create_time+'</span>'+
                              '<dl>'+
                                '<dd class="innerProject-img-none"><img src="'+selectList.isImgNone(_List[i].thumbnail_photos[0])+'" /></dd>'+
                                '<dd class="innerProject-img-none"><img src="'+selectList.isImgNone(_List[i].thumbnail_photos[1])+'" /></dd>'+
                                '<dd class="innerProject-img-none"><img src="'+selectList.isImgNone(_List[i].thumbnail_photos[2])+'" /></dd>'+
                              '</dl>'+
                            '</li>';

                        }

                        selsctBox.html(selectTm);
                    }
                    
                    
                    if(_data.page_no*_data.page_size<=_List.length){
                        load_flag = true;
                    }else{
                        load_flag = false;
                    }
                 
                    
                    
                }else if(data.error_id==401){
//                    console.log('link...');
                    window.location.href = '/c';
                }else{
//                    slideMessage('网络错误');
                    slideMessage(data.error_code);
                }
                    
            },
            
            error:function(data){
                console.log(data);
                slideMessage('网络错误');
            }
            
        });
    },
    
    isImgNone:function(obj){
        var str = '';
        if(obj)str = 'http://image.paiwo.co/' + obj+'@!280x280';
        return str;
    },
    
    putState:function(type){  //选片夹状态
        var str = '';
        switch(type){
            case 1:   //已创建 
                str = '已创建';
                break;
            case 2:   //已发送,等待顾客接受
                str = '待顾客绑定';
                break;
            case 3:   //已接受,等待顾客提交精修需求
                str = '顾客选片中';
                break;
            case 4:   //已提交精修需求,等待摄影师精修
                str = '修片中';
                break;
            case 5:   //已提交所有精修照片,等待顾客收片
                str = '待客户收片';
                break;
            case 10:  //已收片
                str = '顾客已全部收片';
                break;
        }
        return str; 
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
    
    
    
    addSelectTm: '<li class="icon-li create-select">'+	         
                    '<span class="innerProject-span">欢迎</span>'+
                    '<b class="icon-li-sel"></b>'+
                    '<u>创建你的第一个选片夹</u>'+
                '</li>'+
             '<li class="icon-li go-market">'+
                '<span class="innerProject-span">欢迎</span>'+
                '<b class="icon-li-market"></b>'+
                '<u>去拍我集市找顾客！</u>'+
             '</li>'
    
    
    
    
    
};

//进入项目
selsctBox.on('click','.select-li',function(){
    var selectId = $(this).attr('data-code');
    window.location.href = '/p/selects/'+selectId;
});


//创建选片夹
selsctBox.on('click','.create-select',function(){
    window.location.href = '/p/create_select';
});
 


//页面初始化调用
selectList.init(list_page); 
4
//新建选片夹
createSelect.on('click',function(){
    window.location.href = '/p/create_select';
});


//滚动加载
$(window).on('scroll',function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
        winH = document.documentElement.clientHeight,
        bodyH = document.body.scrollHeight;
            
        if(scrollTop+winH+400>bodyH && load_flag){
            load_flag = false;
            selectList.init(list_page++);
                
        }
});


//点击去集市
selsctBox.on('click','.go-market',function(){
    window.open('http://paiwo.co/market');
});






























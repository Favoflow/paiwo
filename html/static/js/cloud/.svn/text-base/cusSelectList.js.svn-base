var createSelect = $('.create-select'),  //title栏
    selsctBox = $('.innerProject-main-box'); //选片夹父级

//paiwo.cloud.select.customer.select.list.get



var cusSelectList = {
    
    init:function(){  //初始化
        
        var projectId = cusSelectList.getProId();
        
        cloud.ajax({
            
             data:{
                'method': 'paiwo.cloud.select.customer.select.list.get'
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
                        selsctBox.html(cusSelectList.addSelectTm);
                    }else{
                        for(var i=0;i<_List.length;i++){
                           selectTm +=  '<li data-code="'+_List[i].select_id+'" class="select-li">'+
                              '<span class="innerProject-span">'+cusSelectList.putState(_List[i].select_state)+'</span>'+
                              '<h4 class="no-portrait">'+_List[i].select_name+'</h4>'+
                              '<span>创建于 '+_List[i].create_time+'</span>'+
                              '<dl>'+
                                cusSelectList.isImgNone(_List[i].thumbnail_photos)+
                              '</dl>'+
                            '</li>';

                        }
                            
                        selsctBox.html(selectTm);
                    }
                 
                }else if(data.error_id==999){
//                    slideMessage('未登录');
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
    
    isImgNone:function(arr){
        var str = '';
        for(var i=0;i<arr.length;i++){
            str+='<dd class="innerProject-img-none"><img src="http://image.paiwo.co/'+arr[i].photo_path+'@!280x280" /></dd>'
        }
        
        return str;
    },
    
    putState:function(type){  //选片夹状态
        var str = '';
        switch(type){
//            case 1:   //已创建 
//                str = '已创建';
//                break;
//            case 2:   //已发送,等待顾客接受
//                str = '待顾客绑定';
//                break;
            case 3:   //已接受,等待顾客提交精修需求
                str = '已绑定';
                break;
            case 4:   //已提交精修需求,等待摄影师精修
                str = '待修片';
                break;
            case 5:   //已提交所有精修照片,等待顾客收片
                str = '待收片';
                break;
            case 10:  //已收片
                str = '已收片';
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
    
    
    
    addSelectTm: '<li class="icon-li go-market">'+
                '<span class="innerProject-span">欢迎</span>'+
                '<b class="icon-li-market"></b>'+
                '<u>去拍我集市找摄影师！</u>'+
             '</li>',
    
    putCover:function(data){
        
    }
    
    
    
    
    
};

//进入项目
selsctBox.on('click','.select-li',function(){
    var selectId = $(this).attr('data-code');
    window.location.href = '/c/selects/'+selectId;
});


//进入集市
selsctBox.on('click','.go-market',function(){
    window.open('http://paiwo.co/market');
    
});

//绑定选片夹
//selsctBox.on('click','.create-select',function(){
//    window.location.href = '/p/create_select';
//});
 


//页面初始化调用
//cloud.init(function(){
//   /static/js/cloud/paiwoMessage.js
//    var oScript = document.createElement('script');
//    oScript.src = '/static/js/cloud/paiwoMessage.js';
//    document.body.appendChild(oScript);
//});

cusSelectList.init(); 
//新建选片夹
createSelect.on('click',function(){
    window.location.href = '/p/create_select';
});




































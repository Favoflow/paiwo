
//获取某地热门摄影师
(function getRecPg(){
	$.ajax({
		url: '/rest',
		type: 'POST',
		dataType: 'json',
		async: false,
		data: {
	        data:JSON.stringify({
	        	'method': 'paiwo.market.location_hot_photographer.get',
	        	'location_code': '02-00-00-00'
	        })
	     },
		success: function(data){
			if(data.error_id == 0){
				pg_list = [];
				for(var i=0;i<4;i++){
					pg_list[i]=data.response.photographer_list[i]
				}
				var tm = $.tmpl(hometm.bazzar_tm,pg_list);
				$('.index-bazzar-phers ul').html(tm);
			}	
		}
	});
})();

var pagazineMod = $('.index-pagazine'); //拍格志


//活动列表获取
function get_activity_list(){
    
    base.ajax({
            data:{
                'method': 'paiwo.activity.activity_list.get',
                'page_no': 1,
                'page_size': 4
            },
            success:function(data){
                if(data.error_id==0){
                    var response = data.response,
                        listInfo = response.activity_list,
                        putListTm = '';
                    
                        putListTm = $.tmpl(hometm.activity_tm,listInfo);
                    
                        
                        $('.index-events ul').html(putListTm);
                    
                        
                        
                }
            },
            error:function(data){
                slideMessage('网络错误');
            }
        });
    
}

get_activity_list();


//获取拍格志
function getPagazine(){
    
//    console.log('in');

    base.ajax({
        data:{
            'method': 'paiwo.content.dynamic_list.get',
            'host_domain': 'pagazine',
            'page_no': 1,
            'page_size': 4
        },
        success:function(data){
            if(data.error_id==0){
                var response = data.response,
                     dynamicList = response.content_list;
    
//                   var dynamicList = [
//                
//                        {
//                        'content_author_domain': "",
//                        'content_author_id': 0,
//                        'content_author_name': "",
//                        'content_desc': "咔嚓！摄影师母亲让女儿变身童话人物",
//                        'content_id': 121413,
//                        'content_title': "咔嚓！摄影师母亲让女儿变身童话人物",
//                        'content_type': 2,
//                        'content_user_avatar': "",
//                        'content_user_domain': "pagazine",
//                        'content_user_id': 100357,
//                        'content_user_name': "拍格志",
//                        'create_time': "2015-07-13 13:20:14",
//                        'is_delete': false,
//                        'is_like': false,
//                        'is_recommend': false,
//                        'photo_count': 0,
//                        'photo_list':[{
//                            'is_cover': true,
//                            'photo_id': 0,
//                            'photo_path': "100357/avatar/f1022a015b12bb01ba0fd448be1418ca"
//                        }]
//                        
//                        
//                        
//                    },
//                       
//                        {
//                            'content_author_domain': "",
//                            'content_author_id': 0,
//                            'content_author_name': "",
//                            'content_desc': "",
//                            'content_id': 121115,
//                            'content_title': "风靡全球的“FollowMeTo”夫妻分享蜜月照",
//                            'content_type': 2,
//                            'content_user_avatar': "",
//                            'content_user_domain': "pagazine",
//                            'content_user_id': 100357,
//                            'content_user_name': "拍格志",
//                            'create_time': "2015-07-13 14:50:33",
//                            'is_delete': false,
//                            'is_like': false,
//                            'is_recommend': false,
//                            'photo_count': 0,
//                            'photo_list':[{
//                                'is_cover': true,
//                                'photo_id': 0,
//                                'photo_path': "100357/avatar/3256160008d54b18c28ceac196c19680"
//                            }]
//                    },
//                        
//                     
//                    {
//                        
//                        'content_author_domain': "",
//                        'content_author_id': 0,
//                        'content_author_name': "",
//                        'content_desc': "爱自拍的幻想家@japaul",
//                        'content_id': 120963,
//                        'content_title': "德塔红蜘蛛Spyder5屏幕颜色校色仪",
//                        'content_type': 2,
//                        'content_user_avatar': "",
//                        'content_user_domain': "pagazine",
//                        'content_user_id': 100357,
//                        'content_user_name': "拍格志",
//                        'create_time': "2015-07-13 11:04:40",
//                        'is_delete': false,
//                        'is_like': false,
//                        'is_recommend': false,
//                        'photo_count': 0,
//                        'photo_list':[{
//                            'is_cover': true,
//                            'photo_id': 0,
//                            'photo_path': "100357/avatar/36ffd76553accecd9df9fdae89872372"
//                        }]
//                    },
//                        
//                    {
//                        'content_author_domain': "",
//                        'content_author_id': 0,
//                        'content_author_name': "",
//                        'content_desc': "@佐小夕",
//                        'content_id': 120916,
//                        'content_title': "一对找寻人与自然连接点的摄影师夫妇",
//                        'content_type': 2,
//                        'content_user_avatar': "",
//                        'content_user_domain': "pagazine",
//                        'content_user_id': 100357,
//                        'content_user_name': "拍格志",
//                        'create_time': "2015-07-13 10:34:12",
//                        'is_delete': false,
//                        'is_like': false,
//                        'is_recommend': false,
//                        'photo_count': 0,
//                        'photo_list':[{
//                            'is_cover': true,
//                            'photo_id': 0,
//                            'photo_path': "100357/avatar/7625a7c8ea7536e307899c9fbecfef57"
//                        }]
//                    }
//                
//                                  
//                ];
                
                
                // console.log(dynamicList[0].photo_list);
                
//                $('.pagazine-bigpic').css('background-image','url(http://image.paiwo.co/'+dynamicList[0].photo_list[0].photo_path+'@!1d5)');
                for(var i=0;i<dynamicList.length;i++){
                    if(dynamicList[i].content_id==123985){
                        dynamicList.splice(i,1);
                        break;
                    }
                }
    
//                console.log(dynamicList);
                for(var i=0;i<3;i++){

//                            console.log('in');
                    pagazineMod.find('.index-pagazine-list .pagazine-list').eq(i).css('background-image','url(http://image.paiwo.co/'+dynamicList[i].photo_list[0].photo_path+'@!1d5)');
                    pagazineMod.find('.index-pagazine-list .pagazine-list-tit').eq(i).html(dynamicList[i].content_title);
                    pagazineMod.find('.index-pagazine-list a').eq(i).attr('href','/pocket/'+dynamicList[i].content_id);
                        
                }
                
                

            }
        },
        error:function(data){
            slideMessage('网络错误');
        }
    });


}

getPagazine();


//获取摄影师列表
base.ajax({
    data:{
        'method': 'paiwo.photographer.list.get'
    },
    success:function(data){
        if(data.error_id==0){
            var data_list_popu = data.response.photographer_list.slice(0,15),
                data_list_acti = data.response.photographer_list.slice(15,30),
                data_list_file = data.response.photographer_list.slice(30,45),
               phers_html_popu = '',
               phers_html_acti = '',
               phers_html_file = '';
               phers_html_popu = $.tmpl(hometm.photog_tm,RandomFive(data_list_popu,5));
               phers_html_acti = $.tmpl(hometm.photog_tm,RandomFive(data_list_acti,5));
               phers_html_file = $.tmpl(hometm.photog_tm,RandomFive(data_list_file,5));
               $('#most_popu_ul,#most_popu2_ul').html(phers_html_popu);
               $('#most_acti_ul').html(phers_html_acti);
               $('#most_file_ul').html(phers_html_file);
        }
    },
    error:function(data){
        slideMessage('网络错误');
    }
});

//关注摄影师
function doFollow(id){
        
    base.ajax({
        
        data:{
            'method': 'paiwo.user.follow.follow',
            'follow_id': id
        },

        success:function(data){
            if(data.error_id == 0){                
                if(data.response.follow_state == 2){
                    $('.photog_add[data='+id+']').removeClass().addClass('photog_added_2').html('<i></i>已关注');
                }
                else if(data.response.follow_state == 4){
                     $('.photog_add[data='+id+']').removeClass().addClass('photog_added_4').html('<i></i>互相关注');
                }
                // showMessage('添加关注 '+name+' 摄影师');
            }else{
                showMessage('网络错误..');      
            }
          
          },

        error:function(data){
            slideMessage('网络错误');
        }
            
    });
    
    
    
    
}

//取消关注摄影师
function unFollow(id){
    
    base.ajax({    
        data:{
            'method': 'paiwo.user.follow.un_follow',
            'follow_id': id
        },
        success:function(data){
            if(data.error_id == 0){
                $('.photog_added_2[data='+id+']').removeClass().addClass('photog_add').html('+ 关注');
                $('.photog_added_4[data='+id+']').removeClass().addClass('photog_add').html('+ 关注');
            }
          },
        error:function(data){
            slideMessage('网络错误');
        }            
    });
}

//随机获取5位摄影师
function RandomFive(arr,num){
    var copy_arr = new Array(),
      return_arr = new Array();

    for( var index in arr){
        copy_arr.push(arr[index]);
    }

    for( var i=0; i<num;i++){
        if(copy_arr.length>0){
            var copy_arr_index = Math.floor(Math.random()*copy_arr.length);
            return_arr[i] = copy_arr[copy_arr_index];
            copy_arr.splice(copy_arr_index,1);
        }else {
            return;
        }
    }
    return  return_arr;
}



























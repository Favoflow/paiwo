
//关注摄影师
function doFollow(target){
    var id = target.getAttribute('data');     
    base.ajax({
        
        data:{
            'method': 'paiwo.user.follow.follow',
            'follow_id': id
        },

        success:function(data){
            if(data.error_id == 0){
                var name = target.getAttribute('xs');
                if(data.response.follow_state == 2){
                    $(target).removeClass().addClass('photog_added_2').html('<i></i>已关注');
                }
                else if(data.response.follow_state == 4){
                    $(target).removeClass().addClass('photog_added_4').html('<i></i>互相关注');
                }
                $(target).attr('st',data.response.follow_state);
                $(target).css({textAlign: 'left'});
                // showMessage('添加关注 '+name+' 摄影师');
            }else{
                $(target).css({textAlign: 'center'});
                if(data.error_id == 40002 ){
                    showMessage('不能关注自己..');
                    return;
                }
                
                showMessage('网络错误..');      
            }
          
          },

        error:function(data){
            slideMessage('网络错误');
        }
            
    });
}

//取消关注摄影师
function unFollow(target){
    var id = target.getAttribute('data');

    base.ajax({
        
        data:{
            'method': 'paiwo.user.follow.un_follow',
            'follow_id': id
        },
        success:function(data){
            if(data.error_id == 0){
                var name = target.getAttribute('xs');
                $(target).removeClass().addClass('photog_add').html('+ 关注');
                $(target).attr('st',data.response.follow_state);
                // showMessage('取消关注 '+name+' 摄影师');
            }
            else{
                
            }
          },
        error:function(data){
            slideMessage('网络错误');
        }
            
    });
}

//点赞
function doLike(target){
    var id = target.attr('data');
    var path = target.attr('path');

    base.ajax({
        
        data:{
            'method': 'paiwo.user.like.add',
            'content_id': id,
            'content_type': 1
        },

        success:function(data){
            if(data.error_id == 0){               
                target.find('.photo_liked').show();
                target.find('.photo_fixbox_like').last().removeClass().addClass('photo_fixbox_liked');               
                var t = $('.photo_block[data='+id+']');
                t.find('.photo_liked').show();
                t.find('.photo_fixbox_like').last().removeClass().addClass('photo_fixbox_liked');
            }
        }, 

        error:function(data){
            slideMessage('网络错误');
        }
            
    });
}
// //取消赞
function unLike(target){
    var id = target.attr('data');

    base.ajax({
    
        data:{
            'method': 'paiwo.user.like.delete',
            'content_id': id,
            'content_type': 1
        },

        success:function(data){
            if(data.error_id == 0){
            target.find('.photo_liked').hide();
            target.find('.photo_fixbox_liked').last().removeClass().addClass('photo_fixbox_like');               
            var t = $('.photo_block[data='+id+']');
            t.find('.photo_liked').hide();
            t.find('.photo_fixbox_liked').last().removeClass().addClass('photo_fixbox_like');
            }
        },

        error:function(data){
            slideMessage('网络错误');
        }
            
    });
}

// //取消收藏
// function unCollect(photo_id){
//       $.ajax({
// 		url: '/a/photo/favorite/unfavorite',
// 		type: 'POST',
// 		dataType: 'json',
// 		data: {photo_id: photo_id},
// 		success:function(data){
// $('.photo_block[data='+photo_id+']').find('.photo_fixbox_dinged').removeClass().addClass('photo_fixbox_ding');
// 		}
// 	});	

// }
// //获取收藏夹
// function getCollect(){
//     		$.ajax({
// 			url: '/a/photo/favorite/name/list',
// 			type: 'POST',
// 			dataType: 'json',
// 			success: function(data){
//                 if(data.error_id == 0 ){
//                     var t = data.result.favorite_list;
//                     if(t.length == 0){
//                         return;
//                     }
//                     var tm = '';
                    
//                     for(var i = 0; i<t.length ; i++){
//                         tm +='<li data="'+t[i].favorite_id +'">'+t[i].favorite_name+'</li>';
//                     }
                   
//                     $('.store_album_select').append(tm);
//                 }
//             }});

// }

// //增加收藏夹
// function addCollect(name){
//     $.ajax({
// 		url: '/a/photo/favorite/add',
// 		type: 'POST',
// 		dataType: 'json',
// 		data: {favorite_name : name},
// 		success:function(data){
//             var tm = '<li data="'+data.result.favorite_id+'">'+data.result.favorite_name+'</li>';
            
// 			$('.store_album_select').append(tm).hide();
            
// 			collect.faid = data.result.favorite_id;
            
// 			$('.store_album_input').html(data.result.favorite_name);
            
// 		}
// 	});  
// }



//搜索
function doSearch(tags){

    base.ajax({

        data:{
            'method': 'paiwo.search.photo.get',
            'tags': tags,
            'page_no': 1,
            'page_size': 12
        },
        success:function(data){
            if(data.error_id == 0){
                photo_count = data.response.count;
                $('#sear_photo_num').html(photo_count);
                var my = $.tmpl(tm.photos, data.response.photo_list.slice(0,9));
                var my2 = $.tmpl(tm.photos, data.response.photo_list);
                $('#dbpul').html(my2);
                $('#dapul').html(my);
                if(data.response.photo_list.length == 0){
                    $('.search-none').eq(0).show();
                    $('#noneb').show();
                    getSomePhoto();
                }
            }
            else{
                $('.search-none').eq(0).show();
                $('#noneb').show();
                getSomePhoto();
            }
          },
        error:function(data){
            slideMessage('网络错误');
        }
            
    });
}

function searchPhotog(tags){

    base.ajax({
    
        data:{
            'method': 'paiwo.search.user.get',
            'tags': tags,
            'page_no': 1,
            'page_size': 12
        },
        success:function(data){
            if(data.error_id == 0){
                photog_count = data.response.count;
                $('#sear_photog_num').html(photog_count);
                var my = $.tmpl(tm.photographers, data.response.user_list.slice(0,6));
                var my2 = $.tmpl(tm.photog_detail, data.response.user_list);
                $('#dcpgul').html(my2);
                $('#dapgul').html(my);
                if(data.response.user_list.length == 0){
                    $('.search-none').show();
                    $('#nonec').show();
                    getSomePhotog();
                }
            }else{
                $('.search-none').eq(1).show();
                $('#nonec').show();
                getSomePhotog();
            }
        },

        error:function(data){
            slideMessage('网络错误');
        }           
    });
}


//加载更多
function showMore(){
    if(sa == 1){
        $('.search_photo').trigger('click');
    }else if(sb == 1){
        pageTwo(++page_no_b);
    }else if(sc == 1){
        pageThree(++page_no_c);
    }else{
        return;
    }

}

//搜索照片
function pageTwo(page_no){

      base.ajax({

        data:{
            'method': 'paiwo.search.photo.get',
            'page_no': page_no,
            'page_size': 12,
            'tags': tags
        },
       success:function(data){
            if(data.error_id == 0){                
                var my = $.tmpl(tm.photos, data.response.photo_list );
                $('#dbpul').append(my);
                checkMore();
            }
            else{
                
            }
          },

        error:function(data){
            slideMessage('网络错误');
        }
            
    });
}

//搜索摄影师
function pageThree(page_no){

    base.ajax({
    
        data:{
            'method': 'paiwo.search.user.get',
            'tags': tags,
            'page_no': page_no,
            'page_size': 24 
        },
        success:function(data){
           if(data.error_id == 0){
                var my = $.tmpl(tm.photog_detail, data.response.user_list);
                $('#dcpgul').append(my);
                checkMore();
            }
            else{
                
            }
        },

        error:function(data){
            slideMessage('网络错误');
        }           
    });
}


function getSomePhoto(){
     var tags = ['美女','黑白','人像','少女','制服','和服'];

    tags.sort(function(){ return 0.5 - Math.random()});

    base.ajax({

        data:{
            'method': 'paiwo.search.photo.get',
            'page_no': 1,
            'page_size': 12,
            'tags': [tags[0]]
        },
       success:function(data){
            if(data.error_id == 0){
                data.response.photo_list.sort(function(){ return 0.5 - Math.random()});
                var my = $.tmpl(tm.photos, data.response.photo_list.slice(0,9));
                var my2 = $.tmpl(tm.photos, data.response.photo_list);
                $('#dbpul').html(my2);
                $('#dapul').html(my);
            }else{
                
            }
          },

        error:function(data){
            slideMessage('网络错误');
        }
            
    });
}

function getSomePhotog(){
   var tags = ['小清新','美女','黑白','人像','少女','制服','和服','写真'];
    tags.sort(function(){ return 0.5 - Math.random()});

    base.ajax({
    
        data:{
            'method': 'paiwo.search.user.get',
            'tags': [tags[0]],
            'page_no': 1,
            'page_size': 12
        },
        success:function(data){
           if(data.error_id == 0){
                data.response.user_list.sort(function(){ return 0.5 - Math.random()});
                var my = $.tmpl(tm.photog_detail, data.response.user_list);
                var my2 = $.tmpl(tm.photographers, data.response.user_list.slice(0,6));
                $('#dapgul').append(my2);
                $('#dcpgul').append(my);
//                $('.search_showall2').hide();                
            }
            else{
                
            }
        },

        error:function(data){
            slideMessage('网络错误');
        }           
    });
}


//搜索活动
function getActivity(tags){
    
    base.ajax({
    
        data:{
            'method': 'paiwo.search.activity.get',
            'tags': tags
        },
        
        success:function(data){
           if(data.error_id == 0){
               var response = data.response,
                   avtivityTm = '';
               if(response.activity_count!=0){  
                   avtivityTm =  $.tmpl(tm.activity,response);
                   $('.mix_section_activity').append(avtivityTm).show();
               }
                  
            }
            else{
                slideMessage('网络错误');
            }
        },

        error:function(data){
            slideMessage('网络错误');
        }           
    });
    
}


//活动状态
function put_avtivity_state(state){
    if(state==1){  //活动进行中
        return '进行中...';
    }else if(state==2){ //活动即将开始
        return '即将开始';
    }else if(state==3){  //活动已结束
        return '已结束';
    }else{
        return '';
    }
}


paiwoPhoto.on('dolikeOut', function(id){
   var t = $('.photo_block[data='+id+']');
    t.find('.photo_liked').show();
    t.find('.photo_fixbox_like').removeClass().addClass('photo_fixbox_liked');
});

paiwoPhoto.on('unlikeOut', function(id){
    var t = $('.photo_block[data='+id+']');
    t.find('.photo_liked').hide();
    t.find('.photo_fixbox_liked').removeClass().addClass('photo_fixbox_like');
});

$('#dapgul,#dcpgul').on('mouseenter','.photog_added_2,.photog_added_4',function(){
    $(this).html('取消').css({textAlign: 'center'});
});
$('#dapgul,#dcpgul').on('mouseleave','.photog_added_2',function(){
    $(this).html('<i></i>已关注').css({textAlign: 'left'});
});
$('#dapgul,#dcpgul').on('mouseleave','.photog_added_4',function(){
    $(this).html('<i></i>互相关注');
});



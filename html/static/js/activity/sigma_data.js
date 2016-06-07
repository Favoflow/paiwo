//点赞
function doLike(target){
    var id = target.attr('data');
    
//    var path = target.attr('path');
//    
//    $.ajax({
//        url: '/a/photo/like/dolike',
//        type: 'POST',
//        dataType: 'json',
//        data: {photo_id: id,
//           photo_path: path},
//        success:function(data){
//            if(data.error_id == 0){
//                
//                target.find('.photo_liked').show();
//                target.find('.photo_fixbox_like').last().removeClass().addClass('photo_fixbox_liked');
//                
//                // var t = $('.photo_block[data='+id+']');
//                // t.find('.photo_liked').show();
//                // t.find('.photo_fixbox_like').last().removeClass().addClass('photo_fixbox_liked');
//            }
//        } 
//    });
    
    
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
            }
        }, 

        error:function(data){
            slideMessage('网络错误');
        }
            
    });
    
    
}

//取消赞
function unLike(target){
    var id = target.attr('data');
    
//    $.ajax({
//        url: '/a/photo/like/unlike',
//        type: 'POST',
//        dataType: 'json',
//        data: {photo_id: id},
//        success:function(data){
//            if(data.error_id == 0){
//            target.find('.photo_liked').hide();
//            target.find('.photo_fixbox_liked').last().removeClass().addClass('photo_fixbox_like');
//                
//            // var t = $('.photo_block[data='+id+']');
//            // t.find('.photo_liked').hide();
//            // t.find('.photo_fixbox_liked').last().removeClass().addClass('photo_fixbox_like');
//            }
//        }
//    });
    
    
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
            }
        },

        error:function(data){
            slideMessage('网络错误');
        }
            
    });
    
}

////取消收藏
//function unCollect(photo_id){
//      $.ajax({
//        url: '/a/photo/favorite/unfavorite',
//        type: 'POST',
//        dataType: 'json',
//        data: {photo_id: photo_id},
//        success:function(data){
//$('.photo_block[data='+photo_id+']').find('.photo_fixbox_dinged').removeClass().addClass('photo_fixbox_ding');
//        }
//    }); 
//
//}


////获取收藏夹
//function getCollect(){
//            $.ajax({
//            url: '/a/photo/favorite/name/list',
//            type: 'POST',
//            dataType: 'json',
//            success: function(data){
//                if(data.error_id == 0 ){
//                    var t = data.result.favorite_list;
//                    if(t.length == 0){
//                        return;
//                    }
//                    var tm = '';
//                    
//                    for(var i = 0; i<t.length ; i++){
//                        tm +='<li data="'+t[i].favorite_id +'">'+t[i].favorite_name+'</li>';
//                    }
//                    
//                    $('.store_album_select').append(tm);
//                }
//            }});
//
//}




////增加收藏夹
//function addCollect(name){
//    $.ajax({
//        url: '/a/photo/favorite/add',
//        type: 'POST',
//        dataType: 'json',
//        data: {favorite_name : name},
//        success:function(data){
//            var tm = '<li data="'+data.result.favorite_id+'">'+data.result.favorite_name+'</li>';
//            
//            $('.store_album_select').append(tm).hide();
//            
//            collect.faid = data.result.favorite_id;
//            
//            $('.store_album_input').html(data.result.favorite_name);
//            
//        }
//    });  
//    
//}



//搜索照片
var pg_no =1;
function pageTwo(){
    
    
//     $.ajax({
//          url:'/a/search/photo',
//          type:'POST',
//          dataType:'json',
//          async:false,
//          data:{page_no: pg_no,
//               page_size: 12,
//                tag_list: '适马Art杭州,适马Art首期试用'
//               },
//          success:function(data){
//            if(data.error_id == 0){
//                photo_count = data.result.count;
//                var my = $.tmpl(tm.photos, data.result.photo_list );
//                $('#dbpul').append(my);
//                checkMore();
//            }else{
//                
//            }
//          },
//        error:function(){
//            showMessage('网络错误..');  
//        }
//    });
    
    base.ajax({

        data:{
            'method': 'paiwo.search.photo.get',
            'tags': ['适马Art杭州','适马Art首期试用'],
            'page_no': pg_no,
            'page_size': 12
        },
        success:function(data){
            if(data.error_id == 0){
                photo_count = data.response.count;
                var my = $.tmpl(tm.photos, data.response.photo_list);
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

paiwoPhoto.on('unfavoriteOut', function(id){
    $('.photo_block[data='+id+']').find('.photo_fixbox_dinged').removeClass().addClass('photo_fixbox_ding');
    
});

paiwoPhoto.on('dofavoriteOut', function(id){
    $('.photo_block[data='+id+']').find('.photo_fixbox_ding').removeClass().addClass('photo_fixbox_dinged');

});
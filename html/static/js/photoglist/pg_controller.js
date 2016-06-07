//内页
//点击下方的评论按钮
$('.share-box').on('click','#send_reply',function(event) {
    event.preventDefault();
})

//点击每个评论方面的“回复”按钮
$('.black_bac').on('click', '.content_list_resend', function(event) {
    event.preventDefault();
});
//按下“评论”文本框中的左侧的回复的用户名
$('.black_bac').on('click','#red_reply',function(event) {
    event.preventDefault();
})

jQuery(function($){




});

//初始化
function init(){

}

//获取评论
function getComment(){
    $.ajax({
        url: '/a/photo/comment/get',
        type: 'POST',
        dataType: 'json',
        async:false,
        data: {photo_id: s_pic.id,
            page_no: page_num,
            page_size: 4   //获取评论数
        },
        success: function(data){
            if(data.error_id==0){
                if(data.result.comment_list.length!=0){
                    var comment_list = data.result.comment_list;
                    for(var i=comment_list .length-1;i>=0;i--){
                        var str = '<li><div class="content_list_resend" data="'+comment_list[i].comment_user.user_id+'"><p>回复</p></div><div class="content_list_headimg"><a class="content_list_headimg_a">'+
                            '<img src="http://image.paiwo.co/'+comment_list[i].comment_user.avatar+'" width="60" height="60"></a></div>'+
                            '<dl><dt><a class="snick">'+comment_list[i].comment_user.nick_name+'</a><span>'+comment_list[i].comment_time+'</span></dt>'+
                            s_pic.showComments.help(comment_list[i].comment_text,comment_list[i].reply_user)+
                            '</dl></li>';
                        $('.comment_content_list').append(str);
                        set_comment();
                    }
                }else{
                    is_add = true;
                }
            }
        }
    });
}

//添加评论
function addComment(){

}

//点击内页的"评论"按钮
$('.share-box').on('click','#send_reply',function(event) {
    var input_text = $('.share-box #reply_text').val();
    console.log('input_text:' + input_text);
    if(input_text.length <= 0) {
        return ;
    }
    var day = new Date();
    var img_name = '1.jpg',
        use_name = 'tes_user',
        comment_time = day.getFullYear(),
        comment_content = 'test_commet';
    var item =
        '<li><div class="content_list_resend"><p>回复</p></div>' +
        '<div class="content_list_headimg">'  +
        '<a class="content_list_headimg_a">' +
        '<img src="' + img_name + '" width="60" height="60"></a>' +
        '</div><dl><dt><a class="snick">' + use_name +
        '</a><span>' + comment_time + '</span></dt>' +
        '<dd>' + comment_content + '</dd></dl></li>';

    $('.share-box .comment_content_list').prepend(item);
    $('.share-box #reply_text').val('');
    //发给后台有评论请求
    $.ajax({
        url: '/a/photo/comment/add',
        type: 'POST',
        dataType: 'json',
        async:false,
        data: {
            photo_id: s_pic.id, //评论接口可以改成固定的id
            reply_user_id: s_pic.reply_id,
            comment_text: content
        },
        success: function send_reply(data) {
            if (data.error_id == 0) {
                var text_value = document.getElementById('reply_text').value;
                if (text_value != '') {
                    s_pic.showmyreply(text_value, data.result);
                }
                document.getElementById('reply_text').value = '';
                s_pic.reply_id = '0';
                set_comment();
            }
        }
    });
    event.preventDefault();
})

//评论滚动条高度变化
function set_comment(){
    var comment_list = getByClass(document,'comment_content_list')[0];
    var comment_list_h = getByClass(document,'comment_content_list')[0].scrollHeight;
    var comment_box = getByClass(document,'comment_content_box')[0];
    var comment_box_h = getByClass(document,'comment_content_box')[0].offsetHeight;
    var bar_range_h = getByClass(document,'content_list_bar_range')[0].offsetHeight;
    var bar_range = getByClass(document,'content_list_bar_range')[0];
    var list_bar = getByClass(document,'content_list_bar')[0];
    bar_range.style.display = 'none';

    if(comment_list.children.length<=3 && comment_list.children.length>0){
        var comment_box_h_now = parseInt($('.comment_content_box').css('height'));
        comment_box_h_now+=90;
        comment_box.style.height = comment_box_h_now +'px';
    }
    if(comment_list_h > 270){
        bar_range.style.display = 'block';
        var scale = (comment_box_h/comment_list_h).toFixed(2);
        var list_bar_h = Math.floor(270*scale);
        if(list_bar_h<18)list_bar_h=18;
        list_bar.style.height = list_bar_h +'px';
    } else {
        bar_range.style.display = 'none';
    }
}


function getByClass(oParent,sClass){
    if(oParent.getElementsByClassName){
        return oParent.getElementsByClassName(sClass);
    }else{
        var arr=[];
        var reg=new RegExp('\\b'+sClass+'\\b');
        var aEle=oParent.getElementsByTagName('*');
        for(var i=0; i<aEle.length; i++){
            if(reg.test(aEle[i].className)){
                arr.push(aEle[i]);
            }
        }
        return arr;
    }
}
//点击评论上的回复按钮
$('.photo_comment_content').on('click','.content_list_resend',function(event) {
    var id = $(this).attr('data');
    var name = $(this).parent().find('.snick').html();
//    s_pic.reply_id = id;
    $('#red_reply').html('@'+name).show();
    console.log('here is called');
    event.preventDefault();
});



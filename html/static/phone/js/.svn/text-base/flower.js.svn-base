var box = document.querySelector('.box');
var ph = {

  ph_no : 1,
  
  ph_size : 4,

  box_pos : 0,

  //获取摄影师列表
  get_pg_list:function(){
    $.ajax({
      url: '/a/album/list',
      type : 'POST',
      dataType : 'json',
      async : false,
      data : {
        user_host:'vicin',
        photographer_id:10823,
        page_no:ph.ph_no,
        page_size:ph.ph_size
      },
      success:function(data){
          if(data.error_id==0){
            var album_list = data.result.album_list;
            var album_tm = '';
            for(var i=0;i<album_list.length;i++){
               album_tm += '<li>'+
               '<img src="http://image.paiwo.co/'+album_list[i].cover_path+'">'+
               '</li>';
             };
             $('.box').append(album_tm);
        }
      },
      error:function(data){

      }
    });
  },

  //获取图片位置
  getPos:function(obj){
    var t = 0;
    while(obj){
      t+=obj.offsetTop;
      obj=obj.offsetParent;
    }
    return t;
  }
};

(function(){
  ph.get_pg_list();
  ph.box_pos = ph.getPos(box);  
})();


window.onload=window.onscroll=window.onresize=function(){
  //页面当前的实际高度
  var scrollBottom = document.documentElement.clientHeight + (document.documentElement.scrollTop||document.body.scrollTop);
  var boxScroll = box.scrollHeight + ph.box_pos; 
  if(scrollBottom>boxScroll-120){
    ph.ph_no++;
    ph.get_pg_list();
  }
};
//iframe跨域
var mainFrame = document.getElementById('main_frame').contentWindow;

//云选片公用
var cloud = {
    
    target: null,
    
    ajax:function(json){
        $.ajax({
            url: 'http://cloud.paiwo.co/rest',
            type: 'POST',
            dataType: 'json',
            async: false,
            data: json.data,

            success: function(data){
                json.success && json.success(data);
            },

            error: function(data){
                json.error && json.error(data);
            }

        });
    },
    
    crossAjax:function(str,fn){
        var str = JSON.stringify(str);
        mainFrame.postMessage(str, 'http://paiwo.co/rest');
        window.addEventListener("message", function(ev){
             console.log(ev);
             if(event.origin == 'http://paiwo.co'){
                  console.log(JSON.parse(ev.data));
                  var _data = JSON.parse(ev.data);
                  fn && fn (_data);
             }
        }, false);
    }
};

//摄影师
var pgProject = {
    
//    http://cloud.paiwo.co/rest
   
};


//初始化
(function(){
//    window.onload = function(){
        var initStr = {
                url:'/a/user/top/get',
                data:''
        };
//        console.log(initStr);
        cloud.crossAjax(initStr,function(data){
            console.log(data);
        });
//    };
    
})();

var a = new Date().getTime();
//跨域监听

function abc(ev){
    console.log(ev);
     
}










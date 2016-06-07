var proxyDomain = document.domain;
var proxy = {
    
        crossMain:function(str){
            if(typeof str!='string'){
                var str = JSON.stringify(str);
            }
            window.top && window.top.postMessage(str, 'http://cloud.'+proxyDomain+'/');
        }
    
};

    //跨域监听    
    function showMessage(ev){
//            clearInterval(timer);
//            console.log(ev);
            if(ev.origin == 'http://cloud.'+proxyDomain){     
                 //发送来源 
                 var _data = JSON.parse(ev.data);
                 $.ajax({
                      url: _data.url,
                      type: 'POST',
                      dataType: 'json',
                      async: true,
                      data:_data.data,

                      success:function(data){
                          proxy.crossMain(data);
//                            console.log(data);
                      },

                      error:function(data){
                          proxy.crossMain(data);
                      }
                 });  

             }
    }

window.addEventListener("message", showMessage, false);


//var timer = setInterval(function(){

//proxy.crossMain('ready');

//console.log('234');

//},1);

//proxy.crossMain('ready');
//console.log(window.parent);







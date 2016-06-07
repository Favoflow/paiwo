//fastclick防止点穿
$(function() {
    FastClick.attach(document.body);
});

var base = {
    
     ajax:function(json){  //ajax
            
        $.ajax({
            url: '/rest',
            type: 'POST',
            dataType: 'json',
            async: json.async?json.async:false,
            data: {
                data:JSON.stringify(json.data)
            },

            success: function(data){
                json.success && json.success(data);
            },

            error: function(data){
                json.error && json.error(data);
            }

        });
         
    },
    
    parseDom:function(str){   //html转义
        var div = document.createElement("div");
            div.innerHTML = str;
            return div.childNodes[0].textContent;
    },
    
    renderTime:function(data){
        /*
         * 默认为时间戳
         * l为时间戳位 10或者13位
         * 当l为0的时候 表示各式为2015-07-09 11:17:21
         */

//         if(l == 0){
//            timestamp = new Date().getTime();
//            l == 13;
//         }
//         timestamp = (l == 10) ? timestamp*1000 : timestamp;

        var oDate = new Date(),
            dataArr = data.split(' '),
            oYear = dataArr[0].split('-'),
            oHour = dataArr[1].split(':');
            oDate.setFullYear(oYear[0],oYear[1]-1,oYear[2]);
            oDate.setHours(oHour[0],oHour[1],oHour[2],0);

        var oMs = oDate.getTime();

        var nDate = new Date(),
            nMs = nDate.getTime();
        var dMs = nMs-oMs,
            odate = [oDate.getFullYear(),oDate.getMonth(),oDate.getDate()],
            ndate = [nDate.getFullYear(),nDate.getMonth(),nDate.getDate()];
        if(dMs<60000){                     //1分钟内
            return '刚刚';
        }else if(dMs>=60000&&dMs<3600000){ //1小时内
            var t = parseInt(dMs/60000);
            return t+'分钟前';
        }else if(dMs>=3600000&&dMs<21600000){//6小时内
            var t = parseInt(dMs/3600000)
            return t+'小时前';
        }else if(dMs>=21600000&&odate==ndate){
            return '今天'+oDate.getHours()+':'+oDate.getMinutes();
        }else if(dMs>=21600000&&odate[0]==ndate[0]&&odate[1]==ndate[1]&&ndate[2]-odate[2]==1){
            return '昨天'+oDate.getHours()+':'+oDate.getMinutes();
        }else {
            var month = oDate.getMonth()+1;
            return oDate.getFullYear()+'/'+month+'/'+oDate.getDate();
        }
    },
    
    showAvatar:function(avatar){
        
        var avatar = avatar.toString();
        if(avatar=='0' || avatar==''){  //头像为空
            return '/static/images/user_head.gif';
        }else{
            return  'http://image.paiwo.co/'+avatar;
        }
        
    }
    
    
};

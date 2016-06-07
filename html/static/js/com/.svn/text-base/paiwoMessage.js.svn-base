/*
*拍我网私信聊天js
*
*
*/

if(window.WebSocket){

//支持WebSocket
var PWSocket = (function(){
    
        function PWSocket(url){
            return new PWSocket.prototype.init(url);
        }
    
        PWSocket.prototype = {
            init: function(url){
               
                this.ws = null;
                this.data = {};
                this.curlist = {}; 
                this.hislist = {};
                this.session = null;
                var t = this;  //t变量
                
                if(is_login == 0 ||typeof is_login == undefined){
                    return;
                }
                
                if (this.ws == null){
					this.ws = new WebSocket(url);
                }else{
                    return;
                }
                
                
                this.ws.onopen = function(){
                    t.send('init', {});
                };

                setInterval(function(){
                    t.send('ping', {});
                },60000);

                this.ws.onmessage = function(evt){
                        var data = JSON.parse(evt.data);
                        var type = data.res;
                        
                        if(t.data[type]!=undefined){
                            t.data[type].call(t, data);
                        }
                }
                 this.ws.onclose = function(evt){
                };
                
                return this;
            },
            
            reConnec: function(url){
                var t = this;
                this.ws = new WebSocket(PWSocket.socketURL);
                this.ws.onopen = function(){
                    t.send('init', {});
                };
                this.ws.onmessage = function(evt){
                        var data = JSON.parse(evt.data);
                        var type = data.res;
                        if(t.data[type]!=undefined){
                            t.data[type].call(t, data);
                        }
                } 
            },
            
            getHistory: function(page_no, page_size){
                
                //获取历史纪录
                var msg = {session_id : this.session ,page_no: page_no, page_size: page_size};         
                this.send('history', msg);
            },
            
            addTalk: function(user_id ){
                
                //增加会话
                if(user_id == 'dynamic'|| user_id == 'notice'|| user_id == 'feed'){
                    var msg = {user_id : '' ,session_type: user_id};   
                }else{
                    var msg = {user_id : user_id ,session_type: ''};
                }
                this.send('add', msg);
            },
            
            sendMessage: function(message){
                
                //发送信息
                if(this.ws.readyState == 1){
                 var msg = {session_id : this.session , message : message };
                 this.send('send', msg);
                 this.read();
                }else{
                    PWS.reConnec();
                    //showMessage('你已经断开连接,请刷新页面');    
                }
            },
            closeSession: function(session_id ){
                
                //关闭会话
                var msg = {session_id : session_id };
                this.send('close', msg);
            },
            read: function(){
                
                //阅读信息
                var msg = {session_id : this.session };
                this.send('read', msg);
            },
            send: function(type, msg){
                
                //发送信息
                var data = {req: type, msg: msg};
                this.ws.send(JSON.stringify(data));
            },
            on: function(type, fn){
                
                //绑定事件t
                if(!this.data[type]){
                    this.data[type] = fn;
                }
            }

        };
    
    
        //调整init实例的原型
        PWSocket.prototype.init.prototype = PWSocket.prototype;
    
        return PWSocket;    

})();

var paiwo = {
    
    pushSession: function(session, data){
        
        //合并数据
        for(var i =0; i<data.length; i++){
            session[data[i].session_id] = 1;
        }
    },
    
    topMessage: function(elm){
        
        //让未读消息 数字加1 并置顶
        var t = elm.find('.span-fontsize');
        var num = parseInt(t.html());
            num++;
        if(num>99){
            num = '99+';
        }
        t.html(num);
        
        elm.find('i').show();
        elm.remove();
        $('#cur_list').prepend(elm);    
    },
    
    addToList: function(session_id, user_id, type){
        
        //增加到联系人列表
           var s = {
                session_id: session_id,
                user_id: user_id,
                unread_count: 0,
                length: 1
            };
        paiwo.merge([s]);
        
        if(type == 'cur'){
            $('#cur_list').prepend($.tmpl(paiwo.contact, s));
            PWS.curlist[session_id] = 1;
        }else{
            $('#his_list').prepend($.tmpl(paiwo.history, s));
            PWS.hislist[session_id] = 1;
        }
    },

    merge: function(soucer){
        //合并js数据
        var a = [];
        for(var i =0; i<soucer.length; i++){
            a.push(soucer[i].user_id);
        }
        
         $.ajax({
          url:'/a/message/user/init',
		  type:'POST',
		  dataType:'json',
          async:false,
		  data:{user_list: a.join(',')},
          success: function(data){
             if(data.error_id == 0){
                     for(var i =0;i<soucer.length; i++){     
                        soucer[i].avatar = data.response.user_list[soucer[i].user_id].avatar; 
                        soucer[i].nick_name = data.response.user_list[soucer[i].user_id].user_name;
                        soucer[i].user_host = data.response.user_list[soucer[i].user_id].domain;
                     }
             } 

          }
        });   
    },
    hasNew: function(data){

        //检测是否有信息未读   新通知
        var ia = data.system_dynamic.unread_count+data.system_dynamic.unread_count+data.system_feed.unread_count;
        
        if(ia>0&&window.location.pathname != '/notice'){
            $('#new_notice i').html(ia);
            $('#new_notice').show();
            $('.tab-notice-box').show();
            $('#top_notice').find('i').show();
        }
        
            
        
            
        
        //新私信
        
        var ib = 0;
        for(var i = 0; i<data.current_session.length; i++){
            ib+=data.current_session[i].unread_count;
        }
        if(ib>0){
            $('#new_message i').html(ib);
            $('#new_message').show();
            $('.tab-notice-box').show();
            $('#top_message').find('i').show();
            $('#new_message a').on('click', function(){
                    $('#top_message').trigger('click');
                    $('.tab-notice-box').hide();
            });
        }
        
    },
    contact : '<li sid="${session_id}" uid="${user_id }" class="curlist_block" host="${user_host}">'+
            '<b class="message_list_li_close"></b>'+
            '<a class="message_content_list_headimg">'+
                '{{if avatar == 0}}'+
              '<img src="/static/images/user_head.gif" width="32" height="32">'+
                '{{else}}'+
            '<img src="http://image.paiwo.co/${avatar}" width="32" height="32">'+
            '{{/if}}'+
            '</a>'+
            '<a class="connect_person">${nick_name}</a>'+
               '{{if unread_count == 0}}'+
                '<i style="display:none"><span class="span-fontsize">${unread_count}</span></i>'+
                '{{else  unread_count > 99}}'+
                '<i><span class="span-fontsize">99+</span></i>'+ 
                '{{else}}'+
            '<i><span class="span-fontsize">${unread_count}</span></i>'+
                '{{/if}}'+
            '</li>',
    
    history :'<li sid="${session_id}" uid="${user_id }" class="hislist_block" host="${user_host}">'+
            '<b class="message_list_li_close"></b>'+
            '<a class="message_content_list_headimg">'+
              '{{if avatar == 0}}'+
              '<img src="/static/images/user_head.gif" width="32" height="32">'+
                '{{else}}'+
            '<img src="http://image.paiwo.co/${avatar}" width="32" height="32">'+
            '{{/if}}'+
            '</a>'+
            '<a class="connect_person">${nick_name}</a>'+
          '</li>',
    
    notice :'<li class="curlist_block" sid="notice">'+
            '<b class="message_list_li_close"></b>'+
            '<a class="system_headimg system_head">'+
              '<img src="/static/images/svg-icon/systemMessage.svg" width="32" height="32">'+
            '</a>'+            
            '<a class="connect_person">系统通知</a>'+
            '<i style="display:none"><span class="span-fontsize">2</span></i>'+        
            '</li>',
    
    dynamic : '<li class="curlist_block" sid="dynamic">'+
                '<b class="message_list_li_close"></b>'+
                '<a class="system_headimg system_head">'+
                  '<img src="/static/images/svg-icon/tongzhi.svg" width="32" height="32">'+
                '</a>'+            
                '<a class="connect_person">动态</a>'+
                '<i style="display:none"><span class="span-fontsize"></span></i>'+        
                '</li>',
    
          feed: '<li class="curlist_block" sid="feed">'+
                '<b class="message_list_li_close"></b>'+
                '<a class="system_headimg system_head">'+
                  '<img src="/static/images/svg-icon/xinxianshi.svg" width="32" height="32">'+
                '</a>'+            
                '<a class="connect_person">新鲜事</a>'+
                '<i style="display:none"><span class="span-fontsize"></span></i>'+        
                '</li>',
    
    hisdynamic: '<li class="hislist_block" uid="dynamic">'+
                '<b class="message_list_li_close"></b>'+
                '<a class="system_headimg system_head">'+
                  '<img src="/static/images/svg-icon/tongzhi.svg" width="32" height="32">'+
                '</a>'+            
                '<a class="connect_person">动态</a>'+
                '<i style="display:none"><span class="span-fontsize"></span></i>'+        
                '</li>',
       hisfeed: '<li class="hislist_block" uid="feed">'+
                '<b class="message_list_li_close"></b>'+
                '<a class="system_headimg system_head">'+
                  '<img src="/static/images/svg-icon/xinxianshi.svg" width="32" height="32">'+
                '</a>'+            
                '<a class="connect_person">新鲜事</a>'+
                '<i style="display:none"><span class="span-fontsize"></span></i>'+        
                '</li>',
       hisnotice:'<li class="hislist_block" uid="notice">'+
                '<b class="message_list_li_close"></b>'+
                '<a class="system_headimg system_head">'+
                  '<img src="/static/images/svg-icon/systemMessage.svg" width="32" height="32">'+
                '</a>'+            
                '<a class="connect_person">系统通知</a>'+
                '<i style="display:none"><span class="span-fontsize">2</span></i>'+        
                '</li>',
    
    //动态通知的内容
    dynamicContent :'<li class="clearfix">'+
                    '<p class="system-p box_inner_receive">'+
                    '<i class="select-arrow"></i>'+
                    '<a class="system_inform_head message_content_list_headimg" host="${user_host}">'+
                    '<img src="http://image.paiwo.co/${avatar}" width="32" height="32"></a>'+
                    '<a class="system_inform_person connect_person" href="/${user_host}" target="_blank">${nick_name}</a>'+
                    '<span>${paiwo.SysTime(timeStamp)}</span>'+
                    '<u class="inform_content">${actions}</u>'+
                    '{{if photo_path }}'+    
                    '<div class="system-receive" data="${photo_id}" album="${albumid_id}" host="${user_host}">'+
                '<a><img width="78" height="80" src="http://image.paiwo.co/${photo_path}@!80x80"></a>'+
                '<span><i class="${paiwo.showIcon(action)}"></i></span>'+
              '</div>'+
                '{{/if}}'+
            '</p>'+ 
          '</li>',
    //新鲜事的内容
    feedContent: '<li class="clearfix">'+
                    '<p class="system-p box_inner_receive">'+
                    '<i class="select-arrow"></i>'+
                    '<a class="system_inform_head message_content_list_headimg">'+
                    '<img src="http://image.paiwo.co/${avatar}" width="32" height="32"></a>'+
                    '<a class="system_inform_person connect_person">${nick_name}</a>'+
                    '<span>${paiwo.SysTime(timeStamp)}</span>'+
                    '<u class="inform_content">${actions}</u>'+
                    '<div class="system-receive" data="${photo_id}" album="${album_id}">'+
                '<a><img width="78" height="80" src="http://image.paiwo.co/${photo_path}@!80x80"></a>'+
              '</div>'+
            '</p>'+ 
          '</li>',
    
    flag: true,//历史纪录和历史信息页书
    page: 1,
    stamp_last: 0,
    stamp_now: 0,
    getStrLen: function(str){
        var res=0;
        var reg=/[\u4e00-\u9fa5]/;
        for(var i=0; i<str.length; i++){
            if(reg.test(str.charAt(i))){
                res+=2;
            }else{
                res++;
            }
        }
        return res;
    
    },
   
    checkScroll: function(){
        
         //判断什么时候加滚动条
        if($('.curlist_block').length >8){
            $('#cur_list').css('overflow-y', 'scroll');
        }else{
            $('#cur_list').css('overflow-y', 'hidden');
        }
        
        if($('.hislist_block').length >8){
            $('#his_list').css('overflow-y', 'scroll');
        }else{
            $('#his_list').css('overflow-y', 'hidden');
        }
    },
    
    scrollbarwidth: function() {
        if(document.documentElement.clientHeight < document.body.scrollHeight){
        var parent = $('<div style="width:50px;height:50px;overflow:auto"><div></div></div>').appendTo('body'),
						child = parent.children(),
						scrollbarwidth = child.innerWidth() - child.height(99).innerWidth();
                        parent.remove();
				return scrollbarwidth;
			}
         return 0;
    },
    messageSequence: function(){
        
        //联系人排序
         $('.hislist_block').each(function(ele, index){
            if($(this).find('.span-fontsize').html()!=0){
                $(this).remove();
                $('#his_list').prepend(this);
            }
        });
    },
    showTime: function(timestamp){
        
        //参数为13位的时间戳 输出为格式过的时间
            var now = new Date(),
                diff =  now.getTime()- timestamp,
                last = new Date(timestamp),
                lastm = '0'+last.getMinutes();
            if(diff<-2000){
                return '';
            }    
            if(diff < 86400000){
                if(now.getDate()!= last.getDate()){
                    return '昨天 '+last.getHours()+':'+lastm.slice(-2);
                }
                return last.getHours()+':'+lastm.slice(-2);
            }else if(diff < 172800000){
                if(Math.abs(now.getDay()-last.getDay()) == 2||Math.abs(now.getDay()-last.getDay()) == 5){
                    var s = last.getMonth()+1+'-'+last.getDate()+' ' + last.getHours()+':'+lastm.slice(-2);
                    return last.getFullYear()+'-'+s;
                }
                return '昨天 '+last.getHours()+':'+lastm.slice(-2);
            }else{
                if(last.getFullYear() == now.getFullYear()){
                    return last.getMonth()+1+'-'+last.getDate()+' ' + last.getHours()+':'+lastm.slice(-2);
                }else{
                    var s = last.getMonth()+1+'-'+last.getDate()+' ' + last.getHours()+':'+lastm.slice(-2);
                    return last.getFullYear()+'-'+s;
                    
                }
            }
    },
    
    formatMessage: function(data){
        
        //格式化信息，url 空格等
        var reg = /[a-zA-z]+:\/\/[^\s]+/g;
        if(reg.test(data)){
         data = data.replace(reg,function(data){
                return '<a target="_blank" href="'+data+'">'+data+'</a>';
         }); 
            
        }else{
            data = data.replace(/\n/g, '<br>');
            data = data.replace(/ /g,'&nbsp;');   
        } 
        return data;
    },
    
    showSysMessage: function(notice, dynamic, feed){
           
        //显示动态和系统通知列表
        if(notice.current == 1){
            var num = dynamic.unread_count;
            var tm = $(paiwo.notice);
            if(num != 0){
                num = num>99 ? '99+': num;
                tm.find('i').show().html('<span class="span-fontsize">'+num+'</span>');
            }
            $('#cur_list').prepend(tm);
        }
        
        if(dynamic.current == 1){
            var num = dynamic.unread_count;
            var tm = $(paiwo.dynamic);
            if(num != 0){
                num = num>99 ? '99+': num;
                tm.find('i').show().html('<span class="span-fontsize">'+num+'</span>');
            }
            $('#cur_list').prepend(tm);
        }
        
        if(feed.current == 1){
            var num = feed.unread_count;
            var tm = $(paiwo.feed);
            if(num != 0){
                num = num>99 ? '99+': num;
                tm.find('i').show().html('<span class="span-fontsize">'+num+'</span>');
            }
            $('#cur_list').prepend(tm);
        }
        paiwo.messageSequence();
        $('#his_list').prepend(paiwo.hisdynamic);
        $('#his_list').prepend(paiwo.hisfeed);
        $('#his_list').prepend(paiwo.hisnotice);
    
    },
    showDynamic: function(object){
        //格式化显示动态
        var data = [];
        var t;
        object.reverse();
        
   
        
        for(var i =0; i<object.length; i++){
            t = JSON.parse(object[i].message);
            data[i] = t;
            data[i].timeStamp = object[i].date;
            if(data[i].action == 'like'){
                data[i].actions = '赞了你的照片!';
            }else if(data[i].action == 'favorite'){
                data[i].actions = '收藏了你的照片!';
            }else if(data[i].action == 'photo_comment'){
                data[i].actions = '评论了你的照片!';
            }else if(data[i].action == 'follow'){
                data[i].actions = '关注了你';
            }else if(data[i].action == 'new_album'){
                data[i].actions = '上传了新的相册';
            }else{
//                console.log('未知的动作');
            }
        }
        
             var tm = $.tmpl(paiwo.dynamicContent, data);
        
        
        
            if(paiwo.page == 1){
                $('#system_info').html(tm).show();
                var t2 = document.getElementById('system_info');
                t2.scrollTop = t2.scrollHeight;
                
            }else{
                $('#system_info').prepend(tm).show();
            }
        
        if(object.length ==0){
            paiwo.flag = false;
        }
        
         $('.sysloading').hide();   
        
         
        
    },
    
    showNotice: function(object){
        var tm = '',t;
        
        for(var i = 0; i<object.length; i++){
            t = JSON.parse(object[i].message);
            if(t.action == 'editor_like'){
                t.msg = t.msg.replace('{0}', top_data.user_name);
            }
            tm += '<li class="clearfix"><p class="box_inner_receive">'+paiwo.formatMessage(t.msg)+'<i class="select-arrow"></i></p></li>';
        }
        
        if(paiwo.page == 1){
                $('#system_info').html(tm).show();
                var t2 = document.getElementById('system_info');
                t2.scrollTop = t2.scrollHeight;
            
                
            }else{
                $('#system_info').prepend(tm).show();
            }
        
         if(object.length ==0){
            paiwo.flag = false;
        }
        
         $('.sysloading').hide(); 
        
    },
    SysTime: function(timestamp){
        var d = new Date(timestamp*1000);
        return d.getMonth()+1 + '-' + d.getDate();
    },
    showIcon: function(data){
        if(data == 'like'){
            return 'system-receive-like';
        }else if(data == 'favorite'){
            return 'system-receive-store';
        }else{
            return 'system-receive-retext';
        }
    },
    checkRed: function(){
        
        //检测红点
        if($('i:visible','.curlist_block').length>0){
        
        }else{
            $('#top_message').find('i').hide();
        }
        
    },
    Tocur: function(data){
        
        //历史添加到当前
        var id = data.msg.session_id;
        
        
        
        if ($('.curlist_block[sid='+id+']').length>0){
            $('.curlist_block[sid='+id+']').trigger('click');
        } else {
            
            if(id == 'dynamic'){
               var tm = $(paiwo.dynamic); 

            }else if(id == 'feed'){
               var tm = $(paiwo.feed);

            }else if(id == 'notice'){
                var tm = $(paiwo.notice);
                
            }else{
//                console.log('未知的图标');
                return;
            }    
            
            
            $('#cur_list').prepend(tm);
            tm.trigger('click');
        }
     
    }
    
}

if(location.hostname.indexOf('duopaizhao') == -1){
    PWSocket.socketURL = 'ws://message.paiwo.co/message';
}else{
    PWSocket.socketURL = 'ws://message.duopaizhao.com/message';
}

var PWS = PWSocket(PWSocket.socketURL);
   
//初始化    
PWS.on('init', function(data){
     
    if(is_login == 0){return;}
    paiwo.hasNew(data.msg);
    if(data.msg.current_session.length != 0){
        paiwo.merge(data.msg.current_session);
    }
    
    if(data.msg.history_session.length != 0){
        paiwo.merge(data.msg.history_session.reverse());
    }
    var tm1 = $.tmpl(paiwo.contact, data.msg.current_session);
    var tm2 = $.tmpl(paiwo.history, data.msg.history_session);
    $('#cur_list').html(tm1);
    $('#his_list').html(tm2);
   
    paiwo.pushSession(this.curlist, data.msg.current_session);
    paiwo.pushSession(this.hislist, data.msg.history_session);
    
    
//    paiwo.showSysMessage(data.msg.system_notice, data.msg.system_dynamic, data.msg.system_feed);
    paiwo.checkScroll(); 

    
    
    
});

//历史记录        
PWS.on('history', function(data){
    if(this.session == 'dynamic'|| this.session == 'feed'){
        $('.blank-box').hide();
        $('.talk_box_inner_box').hide();
        $('#system_info').show();
        paiwo.showDynamic(data.msg.message_list);

        
    }else if(this.session == 'notice'){
        $('.blank-box').hide();
        $('.talk_box_inner_box').hide();
        $('#system_info').show();
        paiwo.showNotice(data.msg.message_list);
        
    }else if(this.session == data.msg.session_id){
        $('#system_info').hide();
        $('.blank-box').hide();
        $('.talk_box_inner_box').show();
        if(data.page_no == 1){
            paiwo.stamp_last = Date.now()/1000;
        }
        historyData(data.msg.message_list);
    }
});

function historyData(data){
    var tm = '' ;
    for(var i = 0; i<data.length; i++){

        if(data[i].is_self == 0){
        tm ='<li class="clearfix"><p class="box_inner_receive">'+paiwo.formatMessage(data[i].message)+'<i class="select-arrow"></i></p></li>'+tm;
            
        }else{
        tm = '<li class="clearfix"><p class="box_inner_send">'+paiwo.formatMessage(data[i].message)+'<i class="select-arrow"></i></p></li>'+tm;
        }
        
    if(paiwo.stamp_last-data[i].date>60){

            tm = '<li class="history-time"><span class="connect_time"><h6>'+paiwo.showTime(data[i].date *1000)+'</h6></span></li>'+tm;
    }else{

        if(i == 0 && data[i+1] && (data[i].date - data[i+1].date>60)){
            tm = '<li class="history-time"><span class="connect_time"><h6>'+paiwo.showTime(data[i].date *1000)+'</h6></span></li>'+tm;
        }
    
     }
    
    
        
    paiwo.stamp_last = data[i].date;
        
        
        
        
    }
    
    
    if(data.length == 0){
        paiwo.flag = false;
        if($('#direct_contact .clearfix').length !=0){
        //tm = '<li class="history-time"><span class="connect_time"><h6>'+paiwo.showTime(paiwo.stamp_last *1000)+'</h6></span></li>';
        }
    }
    
    
    if(paiwo.page == 1){
        $('#direct_contact').html(tm);
        var t = document.getElementById('direct_contact');
        t.scrollTop = t.scrollHeight;
        if(data.length == 0){
            paiwo.stamp_now = Date.now()/1000;
        }else{
            paiwo.stamp_now =  data[0].date;
        }
    
        
    }else{
        $('#direct_contact').prepend(tm);
    }
    $('#mylo').hide();
    
}
//添加会话
PWS.on('add', function(data){

    if(data.msg.session_id == 'dynamic'|| data.msg.session_id == 'feed'|| data.msg.session_id == 'notice'){
        
        paiwo.Tocur(data);
        return;
    }
    this.session = data.msg.session_id;
    var s = {
            session_id: data.msg.session_id,
            user_id: data.msg.to_user,
            unread_count: 0
        };
    var session_id = data.msg.session_id;
    var user_id = data.msg.to_user;
    
    //在历史里
    if(this.hislist[this.session] == 1){
        //在历史里
        
        if(this.curlist[this.session] != 1){

            paiwo.addToList(session_id, user_id, 'cur');
            $('#cur_head').trigger('click');
            $('.curlist_block[sid='+session_id+']').trigger('click');
           
        }else{
            var t = $('.curlist_block[sid='+data.msg.session_id+']');
            t.remove();
            $('#cur_list').prepend(t);
            t.trigger('click');
        }  
    }else{
         //不存在就直接出现在顶部
        paiwo.addToList(session_id, user_id, 'cur');
        paiwo.addToList(session_id, user_id, 'his');
        $('#cur_head').trigger('click');
        $('.curlist_block[sid='+session_id+']').trigger('click');
    }
        
    paiwo.checkScroll();
});

//接受信息
PWS.on('send', function(data){
    var tm = '';
    //属于当前会话
    if(data.msg.session_id == this.session){
        if(data.msg.datetime -paiwo.stamp_now >60 ){
            tm += '<li class="history-time"><span class="connect_time"><h6>'+paiwo.showTime(data.msg.datetime*1000)+'</h6></span></li>';
        }
        if(data.msg.is_self == 0){
            tm +='<li class="clearfix"><p class="box_inner_receive">'+paiwo.formatMessage(data.msg.message)+'<i class="select-arrow"></i></p></li>';
        }else{
            tm+='<li class="clearfix"><p class="box_inner_send">'+paiwo.formatMessage(data.msg.message)+'<i class="select-arrow"></i></p></li>';
        }
        paiwo.stamp_now = data.msg.datetime;
       $('#direct_contact').append(tm);  
        var t = document.getElementById('direct_contact');
        t.scrollTop = t.scrollHeight;    
      }else{
          
          $('#top_message').find('i').show();
          
          
            if(this.hislist[data.msg.session_id] == 1){
                //存在联系人,先删除 再置顶
                if(this.curlist[data.msg.session_id] != 1){
                    paiwo.addToList(data.msg.session_id, data.msg.from_user, 'cur');
                }
                    paiwo.topMessage($('.curlist_block[sid='+data.msg.session_id+']'));
            }else{
                //直接出现在顶部
                paiwo.addToList(data.msg.session_id, data.msg.from_user, 'cur');
                paiwo.topMessage($('.curlist_block[sid='+data.msg.session_id+']'));
                paiwo.addToList(data.msg.session_id, data.msg.from_user, 'his');
            }
    }
    
    paiwo.checkScroll();
    
    
});

    
//动态   
PWS.on('sys_dynamic', function(data){
    if(this.session == 'dynamic'){
        //是在当前里面的
        var tm = '';
        var u = JSON.parse(data.msg.message);
        u.timeStamp = data.msg.datetime;
        if(u.action == 'like'){
            u.actions = '赞了你的照片!';
        }else if(u.action == 'favorite'){
            u.actions = '收藏了你的照片!';
        }else if(u.action == 'photo_comment'){
            u.actions = '评论了你的照片!';
        }else if(u.action == 'follow'){
            u.actions = '关注了你';
        }else if(u.action == 'new_album'){
            u.actions = '上传了新相册'; 
        }else{
//           console.log('未知的行为');
        }
        tm = $.tmpl(paiwo.dynamicContent, u);

        $('#system_info').append(tm);
        var t2 = document.getElementById('system_info');
            t2.scrollTop = t2.scrollHeight;
        PWS.read();
    }else{
        
        //if curlist has
        var t = $('.curlist_block[sid=dynamic]');
        if(t.length>0){
            var num = t.find('.span-fontsize').html();
            
            num = num == 99?  '99+': ++num;
            t.find('.span-fontsize').html(num);
            t.find('i').show();
            t.remove();
            $('#cur_list').prepend(t);
        }else{
            var s = $(paiwo.dynamic);
            s.find('i').show().html('<span class="span-fontsize">'+1+'</span>');
            $('#cur_list').prepend(s);
        }
        $('#top_notice').find('i').show();
        
        
    }
    
});

//新鲜事
PWS.on('sys_feed', function(data){
    if(this.session == 'feed'){
        //是在当前里面的
        var tm = '';
        var u = JSON.parse(data.msg.message);
        u.timeStamp = data.msg.datetime;
        if(u.action == 'like'){
            u.actions = '赞了你的照片!';
        }else if(u.action == 'favorite'){
            u.actions = '收藏了你的照片!';
        }else if(u.action == 'photo_comment'){
            u.actions = '评论了你的照片!';
        }else if(u.action == 'follow'){
            u.actions = '关注了你';
        }else if(u.action == 'new_album'){
            u.actions = '上传了新相册'; 
        }else{
//           console.log('未知的行为');
        }
        tm = $.tmpl(paiwo.dynamicContent, u);

        $('#system_info').append(tm);
        var t2 = document.getElementById('system_info');
            t2.scrollTop = t2.scrollHeight;
        PWS.read();
    }else{
        
        //if curlist has
        var t = $('.curlist_block[sid=feed]');
        if(t.length>0){
            var num = t.find('.span-fontsize').html();
            
            num = num == 99?  '99+': ++num;
            t.find('.span-fontsize').html(num);
            t.find('i').show();
            t.remove();
            $('#cur_list').prepend(t);
        }else{
            var s = $(paiwo.feed);
            s.find('i').show().html('<span class="span-fontsize">'+1+'</span>');
            $('#cur_list').prepend(s);
        }
        $('#top_notice').find('i').show();
        
        
    }
    
});
    
//通知
PWS.on('sys_notice', function(data){
    if(this.session == 'notice'){

        var tm = ''
         t = JSON.parse(data.msg.message);
            if(t.action == 'editor_like'){
                t.msg = t.msg.replace('{0}', top_data.user_name);
            }
            tm = '<li class="clearfix"><p class="box_inner_receive">'+paiwo.formatMessage(t.msg)+'<i class="select-arrow"></i></p></li>';

        $('#system_info').append(tm);
        var t2 = document.getElementById('system_info');
            t2.scrollTop = t2.scrollHeight;
        
        
        PWS.read();
        
        
    }else{
        //if curlist has
        var t = $('.curlist_block[sid=notice]');
        if(t.length>0){
            var num = t.find('.span-fontsize').html();
            
            num = num == 99?  '99+': ++num;
            t.find('.span-fontsize').html(num);
            t.find('i').show();
            t.remove();
            $('#cur_list').prepend(t);
        }else{
            var s = $(paiwo.feed);
            s.find('i').show().html('<span class="span-fontsize">'+1+'</span>');
            $('#cur_list').prepend(s);
        }
        $('#top_notice').find('i').show();
        
    }
    
});    
    
//系统通知    
    

/*********************************句柄分界线**********************************/
(function(){    
$('#top_message').on('click',function(e){
        e.stopPropagation();
		$('.message_module').css('display','block');
		$('.message_shadow').fadeIn(100);
        $('#paiwoMessage').fadeIn(100);
        var width = paiwo.scrollbarwidth();
        $('body').css({'overflow':'hidden','margin-right':width});
    
        $('#go_top').hide();
    
    
        var t = $('.top-tab-con');
        if(width!=0){
            $('.top-tab').css('padding-right',width);
            $('.top-tab').css('left',-width);
        }
});

	
//点击shadow
$('.message_shadow').on('click',function(e){
    e.stopPropagation();
    $('#system_info').hide();
    $('.message_shadow').fadeOut(100);
	$('#paiwoMessage').fadeOut(100,function(){
		$('.message_module').css('display','none');
	});
    $('.talk_box_inner_box').hide();
    $('.blank-box').show();
    $('.message_list_cur').removeClass('message_list_cur');
    $('#message_talk_head').hide();
    PWS.session = null;
    $('body').css({'margin-right':'0px','overflow-y':'auto'});
    
    
    
    $('.top-tab')[0].style.cssText = ''; 
    $('.top-tab').show();//兼容个人主页
    
//    $('.tab_searchbox')[0].style.cssText = '';
    $('#fixed-top-box').css('margin-left','-595px');
    $('#go_top').hide();
});
	

//错误处理
PWS.on('error', function(data){
    if(data.msg.code == 120){
        showMessage('不能给自己发送信息');
    }else if(data.msg.code == 101){
         PWS.ws.close();
    }else{
        this.ws.close();
    }  
});

//关闭当前会话
PWS.on('close', function(data){
    var session = data.msg.session_id;
    $('.curlist_block[sid='+session+']').remove();
    PWS.curlist[session] = 0;
    if(this.session == session){
        $('.talk_box_inner_box').hide();
        $('.blank-box').show();
        this.session = null;
        $('#message_talk_head').hide();
        $('#system_info').hide();
    }
    
    paiwo.checkScroll();
    paiwo.checkRed();

});


var paiwo_main = $('.my_message_box');
var paiwo_main2 = $('#msg_del_box');
    
//点击当前联系人
paiwo_main.on('click', '.curlist_block', function(e){
    if(PWS.ws.readyState != 1){
        //showMessage('网络已断开,请刷新页面');
        PWS.reConnec();
        return;
    }
    
    e.stopPropagation();
    
    var t = $(this);
    if(t.hasClass('message_list_cur')){
        return;
    }
    paiwo.page = 1;
    paiwo.flag = true;
    $('.message_list_cur').removeClass('message_list_cur');
    t.addClass('message_list_cur');
    t.find('i').hide();
    t.find('.span-fontsize').html(0);

    PWS.session = this.getAttribute('sid');
    paiwo.stamp_last = Date.now()/1000;// 获取当前时间戳
    PWS.getHistory(paiwo.page, 20); 
    var name = t.find('.connect_person').html();
    var url = t.find('img').attr('src');
    var me = $('#message_talk_head');
    me.find('img').attr('src', url);
    me.find('h4').html(name);
    me.attr('host', this.getAttribute('host'));
    me.show();
    paiwo.checkRed();

});
    
paiwo_main.on('click', '#message_talk_head img', function(){
    var host = $(this).parent().attr('host');
    if(host == "" || host == undefined){
        if(host == ""){
            showMessage('非摄影师用户');
        }
        return false;
    }else{
        window.open('/'+host);
    }

});
paiwo_main.on('click', '#message_talk_head h4', function(){
    var host = $(this).parent().attr('host');
    if(host == "" || host == undefined){
        
         if(host == ""){
            showMessage('非摄影师用户');
        }
        return false;
    }else{
        window.open('/'+host);
    }

});
    
//点击历史列表里联系人
paiwo_main.on('click', '.hislist_block', function(e){
    if(PWS.ws.readyState != 1){
        PWS.reConnec();        
    }
    
     e.stopPropagation();
    $('#cur_head').trigger('click');
    var id = this.getAttribute('uid');
    PWS.addTalk(id);
    $('#cur_list').css('overflow-y','auto');
});


paiwo_main.on('keydown', '#message_send', function(e){
    if(PWS.ws.readyState != 1 && e.keyCode == 13){
        PWS.reConnec();
    }
    if(e.keyCode == 13){
               var val = this.value;
                if(val == ''){
                this.value = '';
                return false;
                }
    }

});


paiwo_main.on('keyup', '#message_send', function(e){
    var keycode = e.keyCode;
    
    if(keycode == 13 && PWS.ws.readyState == 1){
        if(e.altKey||e.shiftKey){
            return true;
        }
        var val  = this.value;
        if(val == ''){
            this.value = '';
            return false;
        }
        if(paiwo.getStrLen(val)>1 && paiwo.getStrLen(val)<=400){
            
            PWS.sendMessage(val);
            this.value = '';
            
        }else if(paiwo.getStrLen(val)>400){
			showMessage('输入不能超过200汉字');
		}
    }

});

//聊天滚动向上拉
$('#direct_contact').on('mousewheel DOMMouseScroll',function(){
     
    if(this.scrollTop <150){
        
          if(PWS.ws.readyState != 1){
           // showMessage('网络已断开,请刷新页面');
              PWS.reConnec();
        }
        
            if (paiwo.flag){
                    $('#mylo').show();
                   PWS.getHistory(++paiwo.page, 20); 
            }
    }
});

//动态滚动向上拉
$('#system_info').on('mousewheel DOMMouseScroll',function(){
     

     if(this.scrollTop <150){
         
          if(PWS.ws.readyState != 1){
           // showMessage('网络已断开,请刷新页面');
              PWS.reConnec();
          }
        if (paiwo.flag){
                $('.sysloading').show();
               PWS.getHistory(++paiwo.page, 10); 

        }
    }
    
    
});




paiwo_main.on('mouseenter', '.curlist_block', function(){
    $(this).find('.message_list_li_close').show();
});

paiwo_main.on('mouseleave', '.curlist_block', function(){
    $(this).find('.message_list_li_close').hide();
});


//关闭当前联系人
paiwo_main.on('click', '.message_list_li_close', function(e){
      if(PWS.ws.readyState != 1){
          PWS.reConnec()
    }
    e.stopPropagation();
    var session = $(this).parents('.curlist_block').attr('sid');
    paiwo_main2.attr('sid', session).fadeIn(100);

     
});

paiwo_main2.on('click', '#msg_del_y', function(){
    var session = $(this).parents('#msg_del_box').attr('sid');
    PWS.closeSession(session);
     paiwo_main2.fadeOut(100);
});

paiwo_main2.on('click', '#msg_del_n,#msg_del_n2', function(){
    paiwo_main2.fadeOut(100);
});


paiwo_main.on('click', '#cur_head', function(e){
      if(PWS.ws.readyState != 1){
          PWS.reConnec();
        }
        e.stopPropagation();
        var t = $(this);
        if(!t.hasClass('head_title_cur')){
            t.addClass('head_title_cur');
            $('#his_head').removeClass('head_title_cur');
            $('#message_hr').animate({left: 2},100);
            $('#his_list').hide();
            $('#cur_list').show();
        }

});

paiwo_main.on('click', '#his_head', function(e){
      if(PWS.ws.readyState != 1){
          PWS.reConnec()        
    }
    e.stopPropagation();
    var t = $(this);
    if(!t.hasClass('head_title_cur')){
        t.addClass('head_title_cur');
        $('#cur_head').removeClass('head_title_cur');
        $('#message_hr').animate({left: 122},100);
       
         $('#cur_list').hide();
         $('#his_list').show();
    }
    
});


paiwo_main.on('click', '.message_close', function(e){
    e.stopPropagation();
    $('#system_info').hide();
    $('.message_shadow').fadeOut(100);
	$('#paiwoMessage').fadeOut(100,function(){
		$('.message_module').css('display','none');
	});
    $('.talk_box_inner_box').hide();
    $('.blank-box').show();
    $('.message_list_cur').removeClass('message_list_cur');
    $('#message_talk_head').hide();
    PWS.session = null;
    $('body').css({'margin-right':'0px','overflow-y':'auto'});
//    $('.top-tab')[0].style.cssText = ''; 
    
    $('.top-tab').css('padding-right',0); 
    $('.top-tab').css('left',0);
    $('.top-tab').show();
    $('#go_top').fadeIn(200);
    
});
    
paiwo_main.on('click', '.system-receive', function(){
    var id = this.getAttribute('data');
    if(id){
        window.open('/photos/'+id);
    }else{
        window.open('/'+this.getAttribute('host')+'#/album/'+ this.getAttribute('album'));
    }
});

//在动态里面点击头像进入主页    
paiwo_main.on('click', '.system_inform_head', function(){
    var host = this.getAttribute('host');
    if(host){
        window.open('/'+host);
    }
    
});    
    
})();

    
    
    
}else{
	//不支持WebSocket
	$('#top_message').on('click',function(ev){
		showMessage('该浏览器暂不支持私信功能，请升级');
		ev.stopPropagation();
        
	});
}


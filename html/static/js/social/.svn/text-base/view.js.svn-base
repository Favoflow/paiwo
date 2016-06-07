/*
    publish_album=1, 发布相册
    publish_pocket=2, 发布图文
    join_activity=3, 参加活动
    join_group=4, 加入组织
    recommend_photo=5, 推荐相片
    recommend_pocket=6, 推荐图文
    recommend_activity=7, 推荐活动
    recommend_group=8, 推荐组织



*/


var p_album = '<div class="social-flow-list" data="${album_id}" ctype="${content_type}">'+
						'<a class="social-flow-ava" target="_blank" href="${user_domain}">'+
                    '<img src="${user_avatar}"></a>'+
						'<h3 class="social-flow-tit clearfix">'+
							'<a target="_blank" href="${user_domain}"><span>${user_name}</span></a>'+
							'<p>发布了影集</p>'+
							'<a href="album/${album_id}" target="_blank">${album_name}</a>'+
							'<i>${base.renderTime(feed_time, 10)}</i>'+
						'</h3>'+
						'<div class="social-flow-area social-flow-album">'+
							'<a class="clearfix">'+
								'<div class="flow-album-cover" data="${cover_photo_id}">'+
									'<img data="100198" src="${cover_photo}'+base.retinaPixel['a560']+'" >'+
									'<h4><i></i><span>${photo_count}</span></h4>'+
								'</div>'+
								'<ul class="flow-album-img">'+
                                    '{{html s_help.smallphotos(photo_list)}}'+
								'</ul>'+
							'</a>'+
						'</div>'+
					'</div>';


var p_pocket = 	'<div class="social-flow-list pocket-part" data="${pocket_id}"  ctype="${content_type}">'+
						'<a class="social-flow-ava" target="_blank" href="${user_domain}">'+
                        '<img src="${user_avatar}"></a>'+
						'<h3 class="social-flow-tit clearfix">'+
							'<a target="_blank" href="${user_domain}"><span>${user_name}</span></a>'+
							'<p>发布了图文</p>'+
							'<i>${base.renderTime(feed_time, 10)}</i>'+
						'</h3>'+
						'<div class="social-flow-area">'+
							'<a class="social-flow-pocket">'+
								'<i class="social-pocket-logo"></i>'+
								'<div class="social-flow-shadow">'+
									'<span style="cursor: pointer;"></span>'+
'<div class="social-flow-img" style="background-image:url(http://image.paiwo.co/${cover_photo}@!1d5)"></div>'+
								'</div>'+
								'<div class="social-pocket-tit">'+
									'<h3>${pocket_title}</h3>'+
									'<p>${pocket_second_title}</p>'+
								'</div>'+
							'</a>'+
							'<div class="social-button">'+
								'<a class="tab_buttons_left ${s_help.like(is_like)}"><i></i>喜欢</a>'+
								'<a class="tab_buttons_right ${s_help.rec(is_recommend)}"><i></i>推荐</a>'+
							'</div>'+
						'</div>'+
					'</div>';


var j_activity = 	'<div class="social-flow-list">'+
						'<a class="social-flow-ava" target="_blank" href="${user_domain}">'+
                        '<img src="${user_avatar}"></a>'+
						'<h3 class="social-flow-tit clearfix">'+
							'<a target="_blank" href="${user_domain}"><span>${user_name}</span></a>'+
							'<p>参加了活动！</p>'+
							'<i>${base.renderTime(feed_time, 10)}</i>'+
						'</h3>'+
						'<div class="social-flow-area">'+
							'<div class="social-flow-active clearfix">'+
								'<div class="social-active-img"></div>'+
								'<div class="social-active-detail">'+
									'<h3>适马摄影装逼大赛</h3>'+
									'<p class="social-active-time">'+
									   '<span>活动时间：</span>'+
										'<i>6-23</i>'+
									'</p>'+
									'<span class="social-active-cond"><i></i>即将开始</span>'+
									'<button class="submit social-look">去看看</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';


var r_photo = '<div class="social-flow-list re-photo-f" data="${photo_id}"  ctype="${content_type}">'+
						'<a class="social-flow-ava" target="_blank" href="${user_domain}">'+
                        '<img src="${user_avatar}"></a>'+
						'<h3 class="social-flow-tit clearfix">'+
						'<a target="_blank" href="${user_domain}"><span>${user_name}</span></a>'+
							'<p>推荐了照片</p>'+
							'<i>${base.renderTime(feed_time, 10)}</i>'+
						'</h3>'+
						'<div class="social-flow-area re-photo">'+
							'<a><img src="http://image.paiwo.co/${photo_path}'+base.retinaPixel[600]+'" width="600" height="600" style="cursor: pointer;"></a>'+
						'</div>'+
						'<div class="social-button">'+
							'<a class="tab_buttons_left ${s_help.like(is_like)}"><i></i>喜欢</a>'+
                            '<a class="tab_buttons_right ${s_help.rec(is_recommend)}"><i></i>推荐</a>'+
							'<p class="social-rec-author">'+
								'<i>作者 . </i>'+
								'<a target="_blank" href="${content_author_domain}">${content_author_name}</a>'+
							'</p>'+
						'</div>'+
					'</div>';

var r_pocket = '<div class="social-flow-list pocket-part" data="${pocket_id}" ctype="${content_type}">'+
						'<a class="social-flow-ava" target="_blank" href="${user_domain}">'+
                        '<img src="${user_avatar}"></a>'+
						'<h3 class="social-flow-tit clearfix">'+
						'<a target="_blank" href="${user_domain}"><span>${user_name}</span></a>'+
							'<p>推荐了图文</p>'+
							'<i>${base.renderTime(feed_time, 10)}</i>'+
						'</h3>'+
						'<div class="social-flow-area">'+
							'<a class="social-flow-pocket">'+
								'<i class="social-pocket-logo"></i>'+
								'<div class="social-flow-shadow" style="cursor: pointer;">'+
									'<span></span>'+
									'<div class="social-flow-img" style="background-image:url(http://image.paiwo.co/${cover_photo}@!1d5)"></div>'+
								'</div>'+
								'<div class="social-pocket-tit">'+
									'<h3>${pocket_title}</h3>'+
									'<p>${pocket_second_title}</p>'+
								'</div>'+
							'</a>'+
							'<div class="social-button">'+
                            '<a class="tab_buttons_left ${s_help.like(is_like)}"><i></i>喜欢</a>'+
                            '<a class="tab_buttons_right ${s_help.rec(is_recommend)}"><i></i>推荐</a>'+
								'<p class="social-rec-author">'+
									'<i>作者 . </i>'+
								'<a target="_blank" href="${content_author_domain}">${content_author_name}</a>'+
								'</p>'+
							'</div>'+
						'</div>'+
					'</div>';

var delete_content = '<div class="social-flow-list del-con" ctype="${content_type}" otype="${type}">'+
                        '<a class="social-flow-ava" target="_blank" href="${user_domain}">'+
                            '<img src="${user_avatar}"></a>'+
                        '<h3 class="social-flow-tit clearfix">'+
							'<a target="_blank" href="${user_domain}"><span>${user_name}</span></a>'+
							'<p>${action}</p>'+
							'<i>${base.renderTime(feed_time, 10)} </i>'+
						'</h3>'+
                      '<div class="social-flow-area">'+
                   '<img src="/static/images/cute_bac/delete.png" width="300" height="300" class="delete-img">'+
                        '<div class="delete-text">原内容已被删除</div>'+
                            '</div>'+
                           '<div class="social-button">'+
                            '{{if action == "推荐了图文"||action == "推荐了照片"}}'+
							'<a class="tab_buttons_left ${s_help.like(is_like)}"><i></i>喜欢</a>'+
                            '<a class="tab_buttons_right ${s_help.rec(is_recommend)}"><i></i>推荐</a>'+
                            '{{/if}}'+
						'</div>'+
                    '</div>';


var template_ar = [delete_content, p_album, p_pocket, j_activity, '', r_photo, r_pocket, '', ''];


var rec_photogs = '<li>'+
				 '<a class="social-interest-ava" target="_blank" href="${user_domain}">'+
								'<img src="http://image.paiwo.co/${user_avatar}">'+
//								'<i></i>'+
							'</a>'+
							'<div class="social-interest-r">'+
								'<a class="social-interest-name" target="_blank" href="${user_domain}">${user_name}</a>'+
								'<a class="social-interest-add" data="${user_id}">+ 关注</a>'+
							'</div>'+
						'</li>';

var s_help = {};

s_help.smallphotos = function(data){
    data.splice(0,1);
    var tm = '';
    var length = data.length>4? 4:data.length;
    
    for(var i =0; i<length; i++){
        var path = 'http://image.paiwo.co/'+ data[i].photo_path +'@!280x280';
        data[i].photo_path 
        tm +='<li data="'+data[i].photo_id+'"><img src="'+path+'"></li>';
    }
    return tm;
}
s_help.like = function(is){
   return is ? ' liked-btn' : 'like-btn'; 
}

s_help.rec = function(is){
   return is ? 'recd-btn' : 'rec-btn';   
}




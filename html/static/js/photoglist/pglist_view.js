var photog_tm  ='<li>'+
		        '<a class="search_pg_head_img" target="_blank" href="${user_host}">'+
				'{{if avatar == 0}}'+
				   '<img src="static/images/user_head.gif" width="60" height="60">'+
				'{{else}}'+
					'<img src="http://image.paiwo.co/${avatar}" width="60" height="60">'+
				'{{/if}}'+
				'</a>'+
		        '<dl>'+
		          '<dt><a target="_blank" href="${user_host}">${filterChar(nick_name)}</a>'+
					'{{if gender == 1}}'+
						'<i class="photog-male"></i>'+
					'{{else}}'+
					'<i class="photog-fmale"></i>'+
					'{{/if}}'+
					'</dt>'+
		          '<dd>相册<span>${album_count}</span></dd>'+
		        '</dl>'+
			'{{if is_follow ==1}}'+
		       '<a class="photog_added" data="${userid}" xs="${nick_name}">'+
				  '<i>已关注</i></a>'+
			     '{{else}}'+
				'<a class="photog_add" data="${userid}" xs="${nick_name}">'+
                 '<i></i></a>'+
				'{{/if}}'+
		      '</li>';

 
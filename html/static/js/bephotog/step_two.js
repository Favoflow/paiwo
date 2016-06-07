	var res = [];//存放服务器地区
window.onload = function(){
	var aBtn = document.getElementById('search_left_dl').children;  //全球、海外、国内
	var aProvBox = document.getElementById('location_search_middle').children; //省份模块
	var aCityBox = document.getElementById('location_search_right').children;  //城市列表
	var aCityBtn = document.getElementById('all_china').getElementsByTagName('dd'); //省份按钮
	var lBox = document.getElementById('location_search_left');   //左模块
	var cBox = document.getElementById('location_search_middle'); //中模块
	var rBox = document.getElementById('location_search_right');  //右模块
	var aDisCity = document.getElementById('location_search_right').getElementsByTagName('dd'); //国内城市
	var lBtn = document.getElementById('l_btn');  //左移动
	var rBtn = document.getElementById('r_btn');  //右移动
	
	var sPoint = document.getElementById('contPon');//圆点父级
	var aOversea = document.getElementById('overseas').children;  //海外地区
	var allChina = document.getElementById('all_china').children[0]; //中国全境
	var oHk = document.getElementById('hk');  //香港
	var oTw = document.getElementById('tw'); //台湾
	var allProv = document.getElementById('location_search_right').getElementsByTagName('dt'); //全境选择
	var oEarth = document.getElementById('earth');  //全球
	var twoBtn = document.getElementById('next_step_two'); //提交按钮
    var twoBtnAc = document.getElementById('next_step_two_ac');
	var b1Flag = false;
	var b2Flag = false;
	var b3Flag = false;
	var bFirst = false;
	var lMove = false;
	var rMove = false;
	var bAddMove = false;
	var clearNum = 0; //清除省内城市圆点个数
	
	var reg1 = /[\u4e00-\u9fa5]/g;  //汉字检测
	var tmp = [];
	
	
	//运动模块
	function getStyle(obj, name)
	{
		return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
	}

	function move(obj, json, options)
	{
		options=options||{};
		options.type=options.type||'ease-out';
		options.time=options.time||400;

		var start={};
		var dis={};

		for(var name in json)
		{
			if(name=='opacity')
			{
				start[name]=parseFloat(getStyle(obj, name));
			}
			else
			{
				start[name]=parseInt(getStyle(obj, name));
			}
			dis[name]=json[name]-start[name];
		}

		var count=Math.round(options.time/30);
		var n=0;

		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			n++;

			for(var name in json)
			{
				switch(options.type)
				{
					case 'linear':
						var cur=start[name]+dis[name]*n/count;
						break;
					case 'ease-in':
						var a=n/count;
						var cur=start[name]+dis[name]*a*a*a;
						break;
					case 'ease-out':
						var a=1-n/count;
						var cur=start[name]+dis[name]*(1-a*a*a);
						break;
				}

				if(name=='opacity')
				{
					obj.style.opacity=cur;
					obj.style.filter='alpha(opacity:'+cur*100+')';
				}
				else
				{
					obj.style[name]=cur+'px';
				}
			}

			if(n==count)
			{
				clearInterval(obj.timer);

				options.fn && options.fn();
			}
		}, 30);
}
	
	
	
	
	
	
	//hover变色

	
	for(var i=0;i<aOversea.length;i++){
		aOversea[i].onmouseover = function(){
			if(this.className=='active')return;
			this.style.color = '#414141';
		};
		
		aOversea[i].onmouseout = function(){
			if(this.className=='active')return;
			this.style.color = '#b7b0b0';
		};
	}
	
	for(var i =0;i<aDisCity.length;i++){
		aDisCity[i].onmouseover = function(){
			if(this.className=='active')return;
			this.style.color = '#414141';
		};
		
		aDisCity[i].onmouseout = function(){
			if(this.className=='active')return;
			this.style.color = '#b7b0b0';
		};
	}
	
	for(var i=0;i<aCityBtn.length;i++){
		aCityBtn[i].onmouseover = function(){
			if(this.className=='active')return;
			this.style.color = '#414141';
		};
		
		aCityBtn[i].onmouseout = function(){
			if(this.className=='active')return;
			this.style.color = '#b7b0b0';
		};
	}
	
	//海外模块
	function provTab(b1Flag){
		for(var i=0;i<aProvBox.length;i++){
			aProvBox[i].style.display = 'none';
		}
		if(b1Flag){
			aProvBox[0].style.display = 'block';
		}
		
	}
	aBtn[1].onclick = function(){
		aBtn[1].style.color = '#414141';
		aBtn[2].style.color = '#b7b0b0';
		rBox.style.display = 'none';
		if(!b1Flag){
			move(lBox,{left:153},{fn:function(){
				cBox.style.display = 'block';
				aProvBox[0].style.display = 'block';
				move(cBox,{opacity:1});
				b1Flag = true;
				b2Flag = true;
			}});
		}
		provTab(b1Flag);
	};
	
	//国内模块
	function provTab2(b2Flag){
		for(var i=0;i<aProvBox.length;i++){
				aProvBox[i].style.display = 'none';
		}
		if(b2Flag){
			aProvBox[1].style.display = 'block';
		}
	}
	
	aBtn[2].onclick = function(){
		aBtn[1].style.color = '#b7b0b0';
		aBtn[2].style.color = '#414141';
		if(!b2Flag){
			move(lBox,{left:153},{fn:function(){
				cBox.style.display = 'block';
				aProvBox[1].style.display = 'block';
				move(cBox,{opacity:1});
				b1Flag = true;
				b2Flag = true;
			}});
		}
		provTab2(b2Flag);
	};
	
	for(var i=0;i<aCityBtn.length-2;i++){
		(function(index){
			aCityBtn[i].onclick = function(){
				for(var i=0;i<aCityBox.length;i++){
					aCityBox[i].style.display = 'none';
				}
				aCityBox[i].className = 'active';
				aCityBox[index].style.display = 'block';
			};
		})(i);
	}
	
	//省份选择
	function cityTab(index){
		for(var i=0;i<aCityBox.length;i++){
			aCityBox[i].style.display = 'none';
			aCityBtn[i].style.color = '#b7b0b0';
			aCityBtn[index].className = '';
		}
		aCityBtn[index].className = 'active';
		aCityBtn[index].style.color = '#414141';
		if(b3Flag){
			aCityBox[index].style.display = 'block';
			aCityBox[index].style.opacity = 1;
		}
	}
	
	for(var i=0;i<aCityBtn.length-2;i++){
		(function(index){
			aCityBtn[i].onclick = function(){
				rBox.style.display = 'block';
				if(!b3Flag){	
					move(lBox,{left:13});
					move(cBox,{left:150},{fn:function(){
						rBox.style.display = 'block';
						aCityBox[index].style.display = 'block';
						move(aCityBox[index],{opacity:1},{fn:function(){
							cBox.style.opacity = 1;
							b3Flag = true;
						}})
					}});
				}
				
				cityTab(index);
			};
		})(i);
	}
	
	
	
	
	//判断点击内容
	function content(obj){
		var str = obj.innerHTML;
		var n = str.match(reg1);
		return n.join('');
	}
	//圆点添加函数
	function addPoint(obj){
		obj.style.color = '#414141';
		var str = obj.innerHTML;
		var n = str.match(reg1);
		var m = str.match(reg1).length;
		var area = n.join('');
		var nData = obj.getAttribute('data');
		
		if(obj.className == 'active'){
			return;
		}else{
			obj.className = 'active';
			
			add(obj);
			for(var i=0;i<tmp.length;i++){
				if(tmp[i]==0){
					tmp.splice(i,1);
				}
			}
			tmp.push(obj);
//			//console.log(tmp);
		}
		 	
		
		//添加
		function add(){
			if(!bFirst){
					sPoint.innerHTML = '';
			}
			switch(m){
				case 2:
					sPoint.innerHTML+='<li class="location_choose_two" data="'+nData+'">'
					+'<div class="big_circle_div">'
					+'<span>'+ n.join('')+'</span>'
					+'<div class="smal_circle_two smal_circle_div"><i class="smal_circle"></i></div>'
					+'</div>'
					+'<p><a href="javascript:;">删除</a></p>'
					+'</li>';
					bFirst = true;
					break;

				case 3:
					 sPoint.innerHTML+='<li class="location_choose_three" data="'+nData+'">'
					 +'<div class="big_circle_div">'
					 +'<span>'+n.join('')+'</span>'
					 +'<div class="smal_circle_two smal_circle_div">'
					 +'<i class="smal_circle"></i></div>'
					 +'</div>'
					 +'<p><a href="javascript:;">删除</a></p>'
					 +'</li>';
					 bFirst = true;
					 break;

				case 4:
					sPoint.innerHTML+='<li class="location_choose_four" data="'+nData+'">'
					 +'<div class="big_circle_div">'
					 +'<span>'+n.join('')+'</span>'
					+'<div class="smal_circle_two smal_circle_div"><i class="smal_circle"></i></div>'
					+'</div>'
					+'<p><a href="javascript:;">删除</a></p>'
					+'</li>';
					bFirst = true;
					break;

				case 5:
				    sPoint.innerHTML+='<li class="location_choose_five" data="'+nData+'">'
					+'<div class="big_circle_div">'
					+'<span>'+n.join('')+'</span>'
					+'<div class="smal_circle_two smal_circle_div"><i class="smal_circle"></i></div>'
					+'</div>'
					+'<p><a href="javascript:;">删除</a></p>'
					+'</li>';
					bFirst = true;
					break;
			} 
			
			
			if((/全境/).test(content(obj)))return;
				
			if(sPoint.children.length>5){
				var l = sPoint.offsetLeft;
				if(!bAddMove){
					bAddMove = true;
					move(sPoint,{left:(l-112)},{time:300,type:'linear',fn:function(){
						bAddMove = false;
					}});
				}
			}
			
			
			
		}
			
				
	}
	
	
	//各种操作
	function make(obj){
		var aPointBox = document.getElementById('contPon').children;  //圆点
				//圆点删除显示
				for(var i=0;i<aPointBox.length;i++){
					(function(index){
						aPointBox[index].onmouseover = function(){
							this.children[1].style.display = 'block';
						};
						aPointBox[index].onmouseout = function(){
							this.children[1].style.display = 'none';
						};
					})(i);
				}
				
				
				//点击删除
				var aPoint = document.getElementById('contPon').getElementsByTagName('p'); //删除按钮
				
				for(var i=0;i<aPoint.length;i++){
					(function(index){
						aPoint[index].onclick = function(){
							if(tmp[index]){
								tmp[index].style.color = '#b7b0b0';
								tmp[index].className = '';
								tmp.splice(index,1,0);
							}
							
							obj.className = '';
							if(obj.getAttribute('data')=='02-00-00-00'){ //中国全境
								for(var i=0;i<aDisCity.length;i++){
									aDisCity[i].className = '';
									aDisCity[i].style.color = '#b7b0b0';
								}
								for(var i=0;i<allProv.length;i++){
									allProv[i].className = '';
									allProv[i].style.color = '#b7b0b0';
								}
								oHk.className = '';
								oHk.style.color = '#b7b0b0';
								oTw.className = '';
								oTw.style.color = '#b7b0b0';
								
							}else if((/全境/).test(content(obj))){
								var len = obj.parentNode.children.length;
								for(var i=1;i<len;i++){
									obj.parentNode.children[i].className = '';
									obj.parentNode.children[i].style.color = '#b7b0b0';
								}	
								
							}else if((/全球/).test(content(obj))){
								for(var i=0;i<aDisCity.length;i++){
									aDisCity[i].className = '';
									aDisCity[i].style.color ='#b7b0b0';
									
								}
								for(var i=0;i<allProv.length;i++){
									allProv[i].className = '';
									allProv[i].style.color = '#b7b0b0';
								}
								for(var i=0;i<aOversea.length;i++){
									aOversea[i].className = '';
									aOversea[i].style.color ='#b7b0b0';
								}
								allChina.className = '';
								allChina.style.color = '#b7b0b0';
								oHk.className = '';
								oHk.style.color = '#b7b0b0';
								oTw.className = '';
								oTw.style.color = '#b7b0b0';
							}
							
							this.parentNode.parentNode.removeChild(this.parentNode);
						
							howLen();
							
							
						};
						
					})(i);
				}
				
				//圆点超过5个左右按钮显示
				
				function howLen(){
					if(sPoint.children.length>5){
						lBtn.style.display = 'block';
						rBtn.style.display = 'block';
						sPoint.style.width = 112*(sPoint.children.length) + 'px';
						sPoint.style.left = 0 +'px';
//						sPoint.style.left = 0;
						

					}else if(sPoint.children.length==0){
						twoBtn.style.backgroundColor = '#dbd5d5';
						twoBtn.style.borderColor ='#b7b0b0';
                        twoBtnAc.style.backgroundColor = '#dbd5d5';
						twoBtnAc.style.borderColor ='#b7b0b0';
						sPoint.innerHTML = '<li class="gray_circel_div">'
						+'<div class="gray_circel"></div>'
      					+'</li>';
						sPoint.style.width = '560px';
						sPoint.style.left = 0;
						bFirst = false;
					}else{
						twoBtn.style.backgroundColor = '#414141';
						twoBtn.style.borderColor ='#414141';
                        twoBtnAc.style.backgroundColor = '#414141';
						twoBtnAc.style.borderColor ='#414141';
						lBtn.style.display = 'none';
						rBtn.style.display = 'none';
						sPoint.style.width = '560px';
						sPoint.style.left = 0;
					}
				}
				howLen();
				lBtn.onclick = function(){
					var l = sPoint.offsetLeft;
					if(l>=0)l=0+'px';
					l+=112;
					if(!lMove){
						lMove = true;
						move(sPoint,{left:l},{type:'linear',time:500,fn:function(){
							lMove = false;
						}});
					}
					
   					
				};
				
				rBtn.onclick = function(){
					var l = sPoint.offsetLeft;
					if(l<=-(sPoint.children.length-5)*112)l=-(sPoint.children.length-5)*112+'px';
					l-=112;
					if(!rMove){
						rMove = true;
						move(sPoint,{left:l},{type:'linear',time:500,fn:function(){
							rMove = false;
						}});
					}
					
			
				};
	}
	
	
	
	
	//右侧点击添加
	for(var i=0;i<aDisCity.length;i++){
		(function(index){
			aDisCity[i].onclick = function(){
				if(oEarth.id=='earth' && oEarth.className=='active'){
					return;
				}else if(allChina.className=='active'){
					return;
				}else if(this.className =='active'){
					return;
				}
				if(this.parentNode.children[0].className=='active')return;
				addPoint(this);
				make(this);
			};
		})(i);
	}


	
	
	
	
	//海外地区添加
	for(var i=0;i<aOversea.length;i++){
		aOversea[i].onclick = function(){
			if(oEarth.className=='active'){
				return;
			}
			addPoint(this);
			make(this);
		};
	}
	
	
	//中国全境添加
	allChina.onclick = function(){
		if(oEarth.className=='active'){
			return;
		}else if(this.className =='active'){
			return;
		}
		
		
		if(sPoint.children[0].getAttribute('data')){
			for(var i=0;i<sPoint.children.length;i++){
				if(sPoint.children[i].getAttribute('data').substring(0,2)=='02'){
					sPoint.removeChild(sPoint.children[i]); 
					i--;
				}
			}
			for(var i=0;i<tmp.length;i++){
				if(tmp[i]){
					if(tmp[i].getAttribute('data').substring(0,2)=='02'){
						tmp.splice(i,1); 
					}
				}
			}
		}
		
		addPoint(this);
		make(this);
	};
	
	//香港、台湾添加
	oHk.onclick = function(){
		if(oEarth.className=='active'){
			return;
		}else if(allChina.className=='active'){
			return;
		}
		this.style.color = '#414141';
		addPoint(this);
		make(this);
	};
	
	oTw.onclick = function(){
		if(oEarth.className=='active'){
			return;
		}else if(allChina.className=='active'){
			return;
		}
		addPoint(this);
		make(this);
	};
	
	
	
	//全省添加
	for(var i=0;i<allProv.length;i++){
		
		allProv[i].onclick = function(){
			if(oEarth.className=='active'){
				return;
			}else if(allChina.className=='active'){
				return;
			}else if(this.className=='active'){
				return;
			}
			this.style.color = '#414141';
			var len = this.parentNode.children.length;
			for(var i=1;i<len;i++){
				this.parentNode.children[i].className = 'active';
			}
			//添加全省，过滤城市
			var provNum = this.getAttribute('data').substring(0,5);
			//筛选圆点信息
			function dataSwitch(num){
				
				if(sPoint.children[0].getAttribute('data')){
					for(var i=0;i<sPoint.children.length;i++){
						if(sPoint.children[i].getAttribute('data').substring(0,5)==num){
							sPoint.removeChild(sPoint.children[i]); 
							sPoint.style.left = 0+'px';  //删除多个拉到开始位置
							i--;
						}

					}

				
					for(var i=0;i<tmp.length;i++){
						if(tmp[i]){
							if(tmp[i].getAttribute('data').substring(0,5)==num){
								tmp[i].style.color = '#b7b0b0';
								tmp.splice(i,1); 
								i--;
							}
						}
					}
				}
				
			}
			
			switch(provNum){
				case '02-01':   //北京
					dataSwitch(provNum);
					break;
				case '02-02':   //上海
					dataSwitch(provNum);
					break;
				case '02-03':   //天津
					dataSwitch(provNum);
					break;
				case '02-04':   //重庆
					dataSwitch(provNum);
					break;
				case '02-05':   //浙江
					dataSwitch(provNum);
					break;
				case '02-06':   //江苏
					dataSwitch(provNum);
					break;
				case '02-07':   //四川
					dataSwitch(provNum);
					break;
				case '02-08':   //云南
					dataSwitch(provNum); 
					break;
				case '02-09':   //海南
					dataSwitch(provNum); 
					break;
				case '02-10':   //西藏
					dataSwitch(provNum);
					break;
				case '02-11':   //青海
					dataSwitch(provNum);
					break;
				case '02-12':   //新疆
					dataSwitch(provNum); 
					break;
				case '02-13':   //广东
					dataSwitch(provNum); 
					break;
				case '02-14':   //广西
					dataSwitch(provNum);
					break;
				case '02-15':   //福建
					dataSwitch(provNum);
					break;
				case '02-16':   //江西
					dataSwitch(provNum);
					break;
				case '02-17':   //湖南
					dataSwitch(provNum);
					break;
				case '02-18':   //湖北
					dataSwitch(provNum);
					break;
				case '02-19':   //安徽
					dataSwitch(provNum);
					break;
				case '02-20':   //山东
					dataSwitch(provNum);
					break;
				case '02-21':   //河北
					dataSwitch(provNum);
					break;
				case '02-22':   //河南
					dataSwitch(provNum);
					break;
				case '02-23':   //山西
					dataSwitch(provNum);
					break;
				case '02-24':   //陕西
					dataSwitch(provNum);
					break;
				case '02-25':   //黑龙江
					dataSwitch(provNum);
					break;
				case '02-26':   //吉林
					dataSwitch(provNum);
					break;
				case '02-27':   //辽宁
					dataSwitch(provNum);
					break;
				case '02-28':   //内蒙古
					dataSwitch(provNum);
					break;
				case '02-29':   //甘肃
					dataSwitch(provNum);
					break;
				case '02-30':   //贵州
					dataSwitch(provNum);
					break;
				case '02-31':   //宁夏
					dataSwitch(provNum);
					break;
				case '02-32':   //台湾
					dataSwitch(provNum);
					break;
			}
			
			addPoint(this);
			make(this);
			
		};
	}
	
	//全球添加
	oEarth.onclick = function(){
		aBtn[1].style.color = '#b7b0b0';
		aBtn[2].style.color = '#b7b0b0';
		for(var i=0;i<sPoint.children.length;i++){
			sPoint.removeChild(sPoint.children[i]); 
			i--;
		}

		for(var i=0;i<tmp.length;i++){
			tmp.splice(i,1); 
		}
		
		addPoint(this);
		make(this);
	};
	//提交数据

	twoBtn.onclick = function(){
		res = [];
		if(sPoint.children[0].getAttribute('data')){
			twoBtn.style.backgroundColor = '#414141';
			for(var i=0;i<sPoint.children.length;i++){
				var cityNum = sPoint.children[i].getAttribute('data');
				res.push(cityNum);
			}
			
          $('#show-content').html(last_tm);
		  $('.step_four_box').fadeIn('400');
          to_jump();
   		  threesubmit();
	  }

	};
    
    twoBtnAc.onclick = function(){
		res = [];
		if(sPoint.children[0].getAttribute('data')){
			twoBtnAc.style.backgroundColor = '#414141';
			for(var i=0;i<sPoint.children.length;i++){
				var cityNum = sPoint.children[i].getAttribute('data');
				res.push(cityNum);
			}
            
            
            console.log('twoBtnAc - in');
            
            
			activity_be_pg();
//		  navi_change(2);
////		  $('#show-content').html(four_tm);
////          $('#show-content').html(last_tm);
////          to_jump();
//		  $('.step_four_box').fadeIn('400');
//          to_jump();
//   		  threesubmit();
	  }

	};
	
	
};
var slider = {
	touch:('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    slider:document.getElementById('slider'),
	start:function(event){
		console.log(1);
		var touch = event.targetTouches[0];
		startPos = {
			x:touch.pageX,
			y:touch.pageY
		};
		isNext = 0;//用于判断是否是垂直滚动
		this.slider.addEventListener('touchmove',this,false);
		this.slider.addEventListener('touchmend',this,false);
	},
	move:function(event){
		var touch = event.targetTouches[0];
		endPos = {
			x:touch.pageX-startPos.x,
			y:touch.pageY-startPos.y
		};
		isNext = endPos.x<endPos.y?1:0 //1为纵向滑动，0为横向滑动
	},
	end:function(event){
		if(isNext == 1){//垂直滚动
			if(endPos.y>20){
				console.log('滚动');
			}
		}else{
			console.log('水平');
		}
		this.slider.removeEventListener('touchmove',this,false);
		this.slider.removeEventListener('touchend',this,false);
	},
	init:function(){
        if(!!this.touch){
        	this.slider.addEventListener('touchstart'); 
        }    //addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
    }
};
slider.init();
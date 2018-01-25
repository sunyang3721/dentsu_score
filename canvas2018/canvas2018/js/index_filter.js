var text_bg_list = [];
//
//
//var loadArr = ['images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg','images/5.jpg','images/6.jpg','images/7.jpg','images/df1.png','images/df2.png','images/df3.png','images/df4.png','images/df5.png','images/df6.png','images/df7.png','images/df8.png','images/df9.png','images/df10.png','images/df11.png','images/df12.png','images/df3.png','images/demo.jpg','images/demo2.jpg'];
//
//
//
//imgLoader ({
//	img : loadArr,
//	onloading : function ( jd ) {
//		document.getElementById('loading_jd').style.width =jd+'%';	
//	}	,
//	callback: function () {
//		fadeOut ($id('loading_warp'));	
//	}
//});


var text_bg_index = 0;
var TEXTOBJ ;
var isChanged = false,isDeviceInIt = false;

var text_bg_data=[],BGCUNT =0;

for ( var i=0; i<text_bg_list.length; i++ ) {
	(function (k) {
		var oImg = new Image ();
		oImg.onload = function (){
			text_bg_data.push (oImg);	
			BGCUNT ++;
			
			if  ( BGCUNT == text_bg_list.length ) {
				//fadeOut ($id('loading_warp'));
			}
		}	
		oImg.src = text_bg_list [k];
	}) (i);   
}

var show_now = 0;
var back_now = 1;

var PAGES = $class('page');

function showPages ( front , back , fn ) {
	show (PAGES[back]);
	fadeOut (PAGES[front],function () {
		PAGES[front].style.opacity = 1;  
		PAGES[back].style.zIndex = 5;
			PAGES[front].style.zIndex = 2; 
		fn && fn();
	} ); 
}


var myFillter ;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var Radius =40;
var TouchLength =1;
var sTimer = null;
var REDRAW = true;

var brush = document.getElementById('brush');

var WARP =$c('filter_main');

var minScale = 0.1,maxScale = 0.25,_listeners;


var brushs = $class('btn2');

for ( var i=0; i<brushs.length ; i++ ) {
	brushs[i].index = i;
	brushs[i].onclick = function (){
		if ( this.index == 0 )  return;

		if ( this.index == 1 ) {
			maxScale = 0.12; 	
		}
		if ( this.index == 2 ) {
			maxScale = 0.38;	
		}	
		if ( this.index == 3 ) {
			maxScale = 0.55;  	
		}	
		for ( var j=0; j<brushs.length; j++ ) {
			if ( /hover/.test (brushs[j].className)) {
				removeClass (brushs[j],'hover');	
			}	
		}	
		this.className +=' hover';
	}  
}




function windowToCanvas( c,x, y) {
   
   var scrollT= document.body.scrollTop||document.documentElement.scrollTop;
   var scrollL= document.body.scrollLeft||document.documentElement.scrollLeft;;
   var st = isPC () ? scrollT : 0 ;
   return { x: x-c.offsetLeft+scrollL-20 ,
			y: y-c.offsetTop+st-20
		  };
}

  
var canvas2 = document.getElementById('piccanvas2'),
control =document.getElementById('control'),
context2 = canvas2.getContext('2d');
var drawCanvas = document.getElementById('piccanvas3');
var drawContext= drawCanvas.getContext ('2d');

var drawCanvas4 = document.getElementById('piccanvas4');
var drawContext4= drawCanvas.getContext ('2d');

var isPointDown = 0;
var old_now =0;now_now= 0,undo_now =0;

var unDoCacheData_even = null;  //濂囨暟
var unDoCacheData_odd = null; // 鍋舵暟
var isBacked = 0;

context2.fillStyle='#fff';
context2.fillRect(0,0,context2.canvas.width,context2.canvas.height);

_initUpLoad ('pic_file',function ( data ) {
	showPages (0 ,1);
	var oImg = new Image ();
	oImg.onload= function () {
		Zepto("#piccanvas").editCanvas({
			control: "control", 
			element: "piccanvas", 
			width:599, 
			image: oImg, 
			commit: "next", 
			callback: function ( canvas ) {
				
				var cacheCanvas  = new canvasContext(599,433);
				var cacheContext = cacheCanvas.getContext('2d');
				cacheContext.clearRect(0,0,cacheContext.canvas.width,cacheContext.canvas.height );	
				cacheContext.save();
				//cacheContext.globalAlpha=0.6;  
				cacheContext.drawImage (canvas,0,0);  	
				cacheContext.restore();
				
					
				callBacks ( cacheCanvas  );
				show ($id('tonext3'));
			}
		});	
	}  
	oImg.src= data; 
});

_initUpLoad ('pic_file2',function ( data ) {
	showPages (0 ,1);
	var oImg = new Image ();
	oImg.onload= function () {
		Zepto("#piccanvas").editCanvas({
			control: "control", 
			element: "piccanvas", 
			width:640, 
			image: oImg, 
			commit: "next", 
			callback: function ( canvas ) {
				
				var cacheCanvas  = new canvasContext(599,433);
				var cacheContext = cacheCanvas.getContext('2d');
				cacheContext.clearRect(0,0,cacheContext.canvas.width,cacheContext.canvas.height );	
				cacheContext.save();
				//cacheContext.globalAlpha=0.6;  
				cacheContext.drawImage (canvas,0,0);  	
				cacheContext.restore();
				
					
				callBacks ( cacheCanvas  );
				show ($id('tonext3'));
			}
		});	
	}  
	oImg.src= data; 
});





var CACVAS3,CACVAS_CACHE,CANVAS_CACHE_DATA;


function destoryEvent () {
	_listeners.forEach(function(e) {
		control.removeEventListener(e[0], e[1], false);
	});	 
}

function callBacks ( canvas  ) {
	hide ($id('tonext'));
	hide ($c('step1'));
	hide ($c('p5_1_1'));
	show ($id('tonext2'));
	show ($c('p5_1_2'));
	//show (drawCanvas4);
	
	canvas2.style.display='block';
	drawContext.canvas.style.display ='block'; 
	drawContext.clearRect(0,0,drawContext.canvas.width,drawContext.canvas.height );	
 
	drawContext.drawImage (canvas,0,0);  

	var cacheCanvas  = new canvasContext(599,433);
	var cacheContext = cacheCanvas.getContext('2d');
	cacheContext.drawImage (drawContext.canvas,0,0);
	CACVAS3  =  cacheCanvas;
	var cacheData = cacheContext.getImageData (0,0,cacheCanvas.width,cacheCanvas.height);
	//	document.getElementById('im').src = cacheCanvas.toDataURL ('image/png');

	myFillter = new _liuLiang.fillter ();
	myFillter.useCache = false;
	myFillter.noise = 50;

	myFillter.apply ('ziranguang',drawContext,CACVAS3,cacheData,function () {
		unDoCacheData_odd = drawContext.getImageData (0,0,drawContext.canvas.width,drawContext.canvas.height);	
	});


	control.addEventListener('mousedown',touchStartFn,false);
	control.addEventListener('mousemove',touchMoveFn,false);
	control.addEventListener('mouseup',touchEndFn,false);
	control.addEventListener('touchstart',touchStartFn,false);
	control.addEventListener('touchmove',touchMoveFn,false);
	control.addEventListener('touchend',touchEndFn,false);
		 _listeners = [
	                ['mousedown', touchStartFn],
					['mousemove', touchMoveFn],
	                ['mouseup', touchEndFn],
	                ['touchstart', touchStartFn],
					['touchmove', touchMoveFn],
	                ['touchend', touchEndFn]
	            ]

	function touchStartFn( e ) {
		isPointDown = 1;	
		touchMoveFn ( e );
	}
	function touchEndFn ( e ) {
		TouchLength = 10;	
		isPointDown = 0;
		undo_now++;	
		undo_now % 2 ? 
		unDoCacheData_even = drawContext.getImageData(0,0,drawContext.canvas.width,drawContext.canvas.height) : 
		unDoCacheData_odd = drawContext.getImageData(0,0,drawContext.canvas.width,drawContext.canvas.height);
		isBacked = 0;
		removeClass ( $c('btn_undo'),'unclickble' );	
	};
	function touchMoveFn ( e ) {
		if ( !isPointDown  || !REDRAW ) return ;
		var e = window.event  || e;
		if ('ontouchstart' in window ) {
			isPointDown = 1;
			if ( e.touches.length == 1) {
				TouchLength = 1;
				var pos =	windowToCanvas (WARP,e.touches[0].pageX,e.touches[0].pageY); 
				
			}  else {
				TouchLength = 10;	
			}
			
		} else {
			TouchLength = 1;
			var pos = 	windowToCanvas (WARP,e.clientX,e.clientY); 	
		}
		if ( TouchLength == 1 ) {
			
			sTimer=setTimeout (function () {
				var spot = new Hotspot(drawContext.canvas, brush, 'source-over', true, function () {});
				spot.start({
					x: pos.x,
					y: pos.y
				}, minScale, maxScale);
			},35) ;
		} else {
			clearTimeout (sTimer);	
		}
	};

}

var SHAKE_THRESHOLD = 433;
var lastUpdate = 0;
var x, y, z, last_x, last_y, last_z;
function deviceMotionHandler(eventData) { 

	if ( !isDeviceInIt ) return;
	var acceleration = eventData.accelerationIncludingGravity;
	var curTime = new Date().getTime();
	if ((curTime - lastUpdate) > 100) {
		var diffTime = (curTime - lastUpdate);
		lastUpdate = curTime;
		x = acceleration.x;
		y = acceleration.y;
		z = acceleration.z;
		var speed = Math.abs(x+y+z-last_x-last_y-last_z) / diffTime * 10000;
		
		if (speed > SHAKE_THRESHOLD && !isChanged ) {
			
			text_bg_index = text_bg_index >= text_bg_list.length-1 ? 0 : text_bg_index + 1;
			isChanged = true ;
			makeFinlyImg  ( text_bg_data[text_bg_index] ,true  );
		}
		last_x = x;
		last_y = y;
		last_z = z;
	} 
} 
//$c('btnstart').onclick = function () {
//	//text_bg_data text_bg_index;
//	tracking("http://t.l.qq.com/ping?t=m&cpid=641010950&url=http%3A//app_minisite_click_monitor/button6410109506&ref");
//	window.location.href="index.html?page=2";
//}




function shareDone(){
	if(!isRedraw){
		hide ($c('p5_3'));
		show ($c('p5_4'));
	}	
}

var cacheCanvas_main  = new canvasContext(599,433);
var cacheContext_main = cacheCanvas_main.getContext('2d');
var isHasCache = false;

function makeFinlyImg ( img ) {
	if ( !isHasCache ) {
		cacheContext_main.clearRect (0,0,cacheCanvas_main.width,cacheCanvas_main.height );
		cacheContext_main.drawImage (drawCanvas,0,0);	
		isHasCache = true;	
	}
	
	var newFillter = new _liuLiang.fillter ();
	newFillter.useCache = true;

	newFillter.apply ('touming',drawContext,cacheCanvas_main,cacheContext_main.getImageData (0,0,cacheCanvas_main.width,cacheCanvas_main.height),function () {

			var cacheCanvas2  = new canvasContext(599,433);
			var cacheContext2 = cacheCanvas2.getContext('2d');
			cacheContext2.drawImage (img,0,0);
			cacheContext2.drawImage (drawCanvas,0,0);
			
			uploadData = cacheCanvas2.toDataURL ('image/png');
			document.getElementById('img_finly').src = uploadData;
			setTimeout(function() {isChanged = false;} ,200 );	
			
	});
	
}


var tsTimer = null;
var tsTimerCunt = 0;

function  tsShow() {
	tsTimer = setInterval (function () {
		tsTimerCunt ++;
		var s = tsTimerCunt%2 ===0 ? 10 : -125;
		Move ($c('ts'),.5, { marginTop : s});	
	} ,4000);	
}
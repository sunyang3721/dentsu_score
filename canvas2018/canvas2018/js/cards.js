function cavasInit(){

	//jquery
/*
 * $(selector).action()
 * http://blog.csdn.net/u014607184/article/details/51746384
 */
//当前是否在画
var draw = true;
var canvas;
//声明绘图开始的坐标
var ctx;
//画笔颜色
var color = "#fff";
//画笔粗细
var startX;
var weight = 5;
var startY;

var imgs;
var head_title;
var erweima;
var saowo;
var logos;
var red_head_title;
var endX;
var endY;

var offleft;
var offtop;
//页面加载结束之后会调用的方法
$(document).ready(function(){
	//同步像素
	setPixel();
	//监听绘图的方法
	readyToDraw();
	//设置颜色按钮
	setColors();
	//调用weight监听
	setWeight();
	//调用菜单事件
	setCaidan();
});

function setPixel(){
	canvas = document.getElementById("canvas");
	offleft = parseInt(sw/2) - parseInt(130);
	offtop = parseInt(sh/2) - parseInt(260);
	ctx = canvas.getContext("2d");
	//ctx.globalAlpha = '0.5';

	imgs = new Image();
	imgs.src = './canvas2018/assets/dog.png';
	imgs.onload = function(){
		ctx.drawImage(imgs,offleft,offtop,300,261);
	}
	
	// canvas.width = window.innerWidth;
	
	// canvas.height = window.innerHeight;
}

function readyToDraw(){
	//为canvas添加监听
	$(canvas).bind("touchstart touchmove touchend",function(event){
		$('.header').hide(); //触摸时 自动隐藏菜单
		
		//判断事件类型
		switch(event.type){
			case "touchstart":
			$('.top-caidan,.range,.tools').hide();
			startX = event.originalEvent.targetTouches[0].clientX;
			startY = event.originalEvent.targetTouches[0].clientY;
			if(!draw){
				ctx.clearRect(startX-10,startY-10,30,30);
			}
			break;
			case "touchmove":
			imgs = new Image();
			imgs.src = './canvas2018/assets/dog.png';
			imgs.onload = function(){
				ctx.drawImage(imgs,offleft,offtop,300,261);
			}
			endX = event.originalEvent.targetTouches[0].clientX;
			endY = event.originalEvent.targetTouches[0].clientY;
			if(draw == 5){
			    ctx.beginPath();
			    ctx.lineCap = "round";
				ctx.lineJoin = "round";
			    ctx.moveTo(startX,startY);
			    ctx.lineTo(endX,endY);
			    ctx.lineWidth = weight;
			    ctx.strokeStyle = color;
			    ctx.closePath();
			    ctx.stroke();
			    startX = endX;
			    startY = endY;
			}else if(draw == 4){
				ctx.beginPath();
				ctx.lineCap = "butt";
				ctx.lineJoin = "bevel";
			    ctx.moveTo(startX,startY);
			    ctx.lineTo(endX,endY);
			    ctx.lineWidth = weight;
			    ctx.strokeStyle = color;
			    ctx.closePath();
			    ctx.stroke();
			    startX = endX;
			    startY = endY;
			}else if(draw == 3){
				imgs = new Image();
				imgs.src = './canvas2018/assets/dog.png';
				imgs.onload = function(){
					ctx.drawImage(imgs,offleft,offtop,300,261);
				}
				ctx.clearRect(endX-10,endY-10,30,30);
			}else{
				ctx.beginPath();
			    ctx.lineCap = "round";
				ctx.lineJoin = "round";
			    ctx.moveTo(startX,startY);
			    ctx.lineTo(endX,endY);
			    ctx.lineWidth = weight;
			    ctx.strokeStyle = color;
			    ctx.closePath();
			    ctx.stroke();
			    startX = endX;
			    startY = endY;
			}
			break;
			case "touchend":
			$('.top-caidan,.range,.tools').fadeIn();
			//console.log(ctx);
			break;
		}
	})
}
//让颜色按钮好使的方法
function setColors(){
	$('.colorBtn').on('click',function(){
		$('.colorBtn').css('border','4px solid rgba(0,0,0,0)');
		$(this).css('border','4px solid #fff');
		color = $(this).children().css('background-color');
	})


	// $(".red").click(function(){
	// 	color = "red";
	// })
	// $(".yellow").click(function(){
	// 	color = "yellow";
	// })
	// $(".blue").click(function(){
	// 	color = "blue";
	// })
	// $(".green").click(function(){
	// 	color = "green";
	// })
	// $(".black").click(function(){
	// 	color = "black";
	// })
	// $(".purple").click(function(){
	// 	color = "purple";
	// })
	$('.penBtn').on('click',function(){
		$('.penBtn').css('border','4px solid rgba(0,0,0,0)').children().css('border-radius','0');
		$(this).css('border','4px solid #fff').children().css('border-radius','100%');
		draw = $(this).index();

	})

}

function setWeight(){
	//监听滑动条的值
	$(".weight").bind("input proptyChange",function(){
		weight = this.value;
	});
	$('.add').bind('click',function(){
		var num = $('.weight').val();
		weight = parseInt(num) + 5;
		$('.weight').val(weight);
	});
	$('.jian').bind('click',function(){
		var num = $('.weight').val();
		weight = parseInt(num) - 5;
		$('.weight').val(weight);
	})
}

function setCaidan(){
	//菜单事件
	$('.top-right-caidan').on('click',function(){
		$('.header').show();
	});
	//切换底色
	$('.bgcolors').on('click',function(){
		$('.selectColorDiv').fadeIn();
		$('.hiddenBox').hide();
		draw = 5;
		color = '#fff';
	});
	//清空重画
	$('.clearall').on('click',function(){
		$('.header').fadeOut();
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
		imgs = new Image();
		imgs.src = './canvas2018/assets/dog.png';
		imgs.onload = function(){
			ctx.drawImage(imgs,offleft,offtop,300,261);
		}
	});
	//生成贺卡
	$('.outcard').on('click',function(){
		var topname = $('.top-input').val();
		var bottomname = $('.bottom-input').val();
		if(topname =='你的名字' || !topname){
			alert('请填写名字');
			return false;
		}else{
			ctx.globalCompositeOperation = "destination-over";  //顺序不能乱

			//背景填充
			var bgcolor_canvas = $('#canvas').css('background-color');
			ctx.save();
			ctx.fillStyle = bgcolor_canvas;
			ctx.fillRect(0,0,sw,sh);
			ctx.restore();
			ctx.globalCompositeOperation = "source-over";
			if(bgcolor_canvas == '#ea2e23' || bgcolor_canvas == 'rgb(234, 46, 35)' || bgcolor_canvas == 'rgb(255, 152, 145)'){
				head_title = new Image();
				// head_title.src = $('.head_title').attr('src');
				head_title.src = './canvas2018/assets/head_title.png';
				var headbili = 500/47;
				var contheight = parseInt(sh/headbili);
				head_title.onload = function(){
					ctx.drawImage(head_title,0,10,sw,contheight);
				}
			}else{
				red_head_title = new Image();
				red_head_title.src = './canvas2018/assets/red_head_title.png';
				var headbili = 500/47;
				var contheight = parseInt(sh/headbili);
				red_head_title.onload = function(){
					ctx.drawImage(red_head_title,0,10,sw,contheight);
				}
			}

			erweima = new Image();
			erweima.src = './canvas2018/assets/erweima.png';
			var imgbottom = sh - 175;
			erweima.onload = function(){
				ctx.drawImage(erweima,25,imgbottom,150,150);
			}
			saowo = new Image();
			saowo.src = './canvas2018/assets/saowo.png';
			var imgsaowo = sh - 68;
			saowo.onload = function(){
				ctx.drawImage(saowo,200,imgsaowo,200,43);
			}

			logos = new Image();
			logos.src = './canvas2018/assets/logos.png';
			var imglogos = sh - 100;
			var imgrightlogos = sw - 225;
			logos.onload = function(){
				ctx.drawImage(logos,imgrightlogos,imglogos,200,75);
			}

			ctx.font = "bold 38px Arial";
			ctx.fillStyle = "#fff";
			var txtwidth = parseInt(sw/2);
			ctx.fillText('来自 '+topname+' 的祝福',30,contheight+50);
			//ctx.fillText('FROM:'+bottomname,txtwidth-10,sh-50);

		    //绘制线段 TO
			// ctx.beginPath();
		 //    ctx.moveTo(80,contheight+60);
		 //    ctx.lineTo(300,contheight+60);
		 //    ctx.lineWidth = 3;
		 //    ctx.strokeStyle = "#fff";
		 //    ctx.stroke();

		    //绘制线段 FROM
		    // ctx.beginPath();
		    // ctx.moveTo(txtwidth+110,sh-40);
		    // ctx.lineTo(txtwidth+300,sh-40);
		    // ctx.lineWidth = 3;
		    // ctx.strokeStyle = "#fff";
		    // ctx.stroke();

		}

		$('.header').hide();
		$('.top-caidan,.range,.tools').hide();
		$('.loading').show();
		//开始倒计时
		var c = 6;
		setInterval(function(){
			c=c-1;
			$('.loading p').html('正在制作中，还有'+c+'秒');
			if(c < 0){
				$('.loading p').html('您的网络不稳定,请耐心等待');
				c = 10;
				postData();
			};
		},1000);
		//生成贺卡
		 setTimeout(function(){
		 	var cutnum = sh/sw;
			var images = Canvas2Image.saveAsPNG(canvas,true,600,parseInt(600*cutnum));  //生成图片并设置比例大小
			$('#canvasImage').append(images);
			var data = $('#canvasImage img').attr('src');
			$.ajax({ 
			url:'./canvas2018/saveCard.php', 
			type:'post', 
			dataType:'json', 
			data:{pic:data},
			error: function(){ 
				//alert('Error'); 
			}, 
			success: function(msg){ //成功 
				//console.log(msg);
				window.location.href = msg['address'];
				//console.log( "Data Saved: " + msg );
				//activityLink=msg.address;
				//msgData=msg.pic; 
				//successGo();
			} 
			}); 
		 },5000);
	});
	function postData(){
		var cutnum = sh/sw;
		var images = Canvas2Image.saveAsPNG(canvas,true,500,parseInt(500*cutnum));  //生成图片并设置比例大小
		$('#canvasImage').append(images);
		var data = $('#canvasImage img').attr('src');
		$.ajax({ 
		url:'./canvas2018/saveCard.php', 
		type:'post', 
		dataType:'json', 
		data:{pic:data},
		error: function(){ 
			//alert('Error'); 
		}, 
		success: function(msg){ //成功 
			window.location.href = msg['address'];
			//console.log( "Data Saved: " + msg );
			//activityLink=msg.address;
			//msgData=msg.pic; 
			//successGo();
		} 
		}); 
	}
}

}
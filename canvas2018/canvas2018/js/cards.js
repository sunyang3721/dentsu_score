function cavasInit(){

	//jquery
/*
 * $(selector).action()
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
	//ctx.globalCompositeOperation = "destination-over";
	imgs = new Image();
	imgs.src = './canvas2018/assets/dog.png';
	imgs.onload = function(){
		ctx.drawImage(imgs,offleft,offtop,300,261);
		// var patt = ctx.createPattern(imgs,"repeat");	
		// ctx.fillStyle = patt;
		// ctx.strokeStyle="#fff"; 
		// ctx.fillRect(600, 100, 200,200);
  //       ctx.strokeRect(600, 100, 200,200);
	}
	// canvas.width = window.innerWidth;
	
	// canvas.height = window.innerHeight;
}

function readyToDraw(){
	//为canvas添加监听
	$(canvas).bind("touchstart touchmove touchend",function(event){
		$('.header').hide();

		// ctx.rect(250,250,300,300);
		// ctx.fillStyle = '#fff';
		// ctx.fill();
		
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
				//ctx.globalCompositeOperation = "destination-over";
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
				//ctx.globalCompositeOperation = "source-over";
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
			//$(".era").removeClass("show").addClass("hidden");
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
	// $(".eraser").click(function(){
	// 	draw = !draw;
	// 	if(draw){
	// 		$(".eraser").html("橡皮擦");
	// 	}else{
	// 		$(".eraser").html("画笔");
	// 	}
	// })
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
		if(topname =='他的名字' || bottomname == '你的名字' || !topname || !bottomname){
			alert('请填写名字');
			return false;
		}else{
			ctx.font = "bold 30px Arial";
			ctx.fillStyle = "#fff";
			ctx.textAlign = "left";
			ctx.fillText(topname,30,200);
		}

		var cutnum = sh/sw;
		var images = Canvas2Image.saveAsPNG(canvas,true,500,parseInt(500*cutnum));
		$('#canvasImage').append(images);
		postData();
	});
	function postData(){
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
			console.log(msg);
			//console.log( "Data Saved: " + msg );
			//activityLink=msg.address;
			//msgData=msg.pic; 
			//successGo();
		} 
		}); 
	}
}

}
var isDraw=0;//0~不能 1~能
var photoContainer;
var photoDOM;
var imageLoader;
var userSelectImg;
var tempImg;

var textContainer;
var textDOM;
var inputMsg;
var screenshot;
var tx;
var isRotation=0;
var activityLink="http://www.beijing-dentsu.com.cn/happynewyear2015.html";

var isLoad=0;
var isFirst=0;
var teContainer;

/*
* jwl1978_cn@sina.com
* v1.0
*/
function initTools()
{
	photoContainer = new createjs.Container();
	mc.tools.addImg.addChild(photoContainer);
	
	photoContainer.x=0;//mc.tools.btn_photo.x;
	photoContainer.y=0;
	
	photoDOM= new createjs.DOMElement("loadImg");
	photoContainer.addChild(photoDOM);
	//photoContainer.visible=false;
	//====
	textContainer = new createjs.Container();
	mc.tools.addChild(textContainer);
	textContainer.x=73;
	textContainer.y=6;
	
	textDOM= new createjs.DOMElement("inputMsg");//inputMsg
	textContainer.addChild(textDOM);
	
	inputMsg = document.getElementById('inputMsg');
    //inputMsg.addEventListener('change', handleBtn_photo, false);
	//====
	//var imageLoader = document.getElementById('imageLoader');
    //imageLoader.addEventListener('change', handleBtn_photo, false);
	//isiPhone(); 
	var imageLoader = document.getElementById('imageLoader');
	if(isiPhone()==true){
		gb.makeThumb.initInput($('#imageLoader'), {width: 640}, function (dataUrl_) {
			isLoad=1;
			userSelectImg=null;
			userSelectImg = new Image();
			userSelectImg.src=dataUrl_;
			userSelectImg.onload = userLoaded;
		});
	}else{
		imageLoader.addEventListener('change', handleBtn_photo, false);
	}
	
	imageLoader.onmouseover = function(){
		mc.tools.btn_photo.gotoAndStop(1);
	}
	imageLoader.onmouseout = function(){
		mc.tools.btn_photo.gotoAndStop(0);
	}
	
	
	//mc.tools.btn_photo.addEventListener("mouseover", handleBtn_photoOver);
	//mc.tools.btn_photo.addEventListener("mouseout", handleBtn_photoOut);
	
	mc.tools.btn_draw.addEventListener("click", handleBtn_draw);
	mc.tools.btn_draw.addEventListener("mouseover", handleBtn_drawOver);
	mc.tools.btn_draw.addEventListener("mouseout", handleBtn_drawOut);
	
	mc.tools.btn_rotation.addEventListener("click", handleBtn_rotation);
	mc.tools.btn_del.addEventListener("click", handleBtn_del);
	mc.tools.btn_post.addEventListener("click", handleBtn_post);
	mc.tools.btn_share.addEventListener("click", handleBtn_share);
	
}

function isiPhone(){
    return ((navigator.platform.indexOf("iPhone") != -1) ||(navigator.platform.indexOf("iPod") != -1));
}

function handleBtn_drawOver(event) 
{
	if(isDraw==0){
		mc.tools.btn_draw.gotoAndStop(1);
	}
}
function handleBtn_drawOut(event) 
{
	if(isDraw==0){
		mc.tools.btn_draw.gotoAndStop(0);
	}
}


function handleBtn_photoOver(event) 
{
	//photoContainer.visible=true;
}
function handleBtn_photoOut(event) 
{
	//photoContainer.visible=false;
}

function checkEnter(e)
{
	text.text =inputMsg.value;
	/*
    var et=e||window.event;
    var keycode=et.charCode||et.keyCode;   
    if(keycode==13)
    {
		 if(window.event)
           window.event.returnValue = false;
         else
           e.preventDefault();//for firefox
    }
	*/
}

function userLoaded() {
	mc.tools.btn_photo.gotoAndStop(0);
	if(isFirst>0){
		//mc.diy.photo.userPhoto.gotoAndStop(1);
		//mc.diy.photo.userPhoto.gotoAndStop(0);
		teContainer.removeChild(tempImg);
		mc.diy.photo.userPhoto.removeChild(teContainer);
		//tempImg=userSelectImg=null;
	}else{
		isFirst++;
	}
	var sn=640/userSelectImg.width;
	
	//alert(userSelectImg.width+":"+sn+":k");
	tempImg = new createjs.Bitmap(userSelectImg);
	
	teContainer=new createjs.Container();
	teContainer.addChild(tempImg);// tempImg.cacheCanvas

	mc.diy.photo.userPhoto.addChild(teContainer);
	
	teContainer.regX=userSelectImg.width/2;
	teContainer.regY=userSelectImg.height/2;
	teContainer.scaleX=teContainer.scaleY=sn;
	
	//mc.diy.photo.userPhoto.addChild(tempImg);
	//tempImg.regX=userSelectImg.width/2;
	//tempImg.regY=userSelectImg.height/2;
	//tempImg.x=0;/-1*(userSelectImg.width*sn)/2;
	//tempImg.y=0;//-1*(userSelectImg.height*sn)/2;
	//tempImg.scaleX=tempImg.scaleY=sn;
	//tempImg.x=320-userSelectImg.width*sn;
	//tempImg.y=174-userSelectImg.height*sn;
	mc.diy.photo.userPhoto.alpha=0;
	createjs.Tween.get(mc.diy.photo.userPhoto).to({alpha:1}, 200, createjs.Ease.cubicIn).call(loadOk);
	//stage.update();
}

function loadOk()
{
	isLoad=0;
}

function handleBtn_post(e)
{
	//leftLine.visible=rightLine.visible=false;
	mc.diy.alert2.visible=false;
	mc.rect_bottom.visible=mc.rect_top.visible=mc.rect_left.visible=mc.rect_right.visible=mc.tools.visible=mc.toolsBg.visible=false;
	tx=mc.rect_top.x;
	createjs.Tween.get(mc.rect_top).to({x:3200}, 100, createjs.Ease.cubicIn).call(cutImg);
}

function cutImg()
{
	isDraw=0;
	mc.tools.btn_draw.gotoAndStop(0);
	
	screenshot=Canvas2Image.saveAsPNG(canvas,true);//convertToImage.convertToPNG(canvas);
	/*
	var win = window.open();
	$(win.document.body).html(screenshot);
	*/
	postData();
	//successGo();
}

function successGo()
{
	mc.diy.alert2.gotoAndStop(0);
	mc.diy.alert2.alpha=0;
	mc.diy.alert2.visible=true;
	createjs.Tween.get(mc.diy.alert2).to({alpha:1}, 500, createjs.Ease.cubicIn).call(backTools);
	mc.diy.alert2.btn_diy.addEventListener("click", copyToClipBoard);
}

function backTools()
{
	mc.rect_top.x=tx;
	mc.rect_bottom.visible=mc.rect_top.visible=mc.rect_left.visible=mc.rect_right.visible=mc.tools.visible=mc.toolsBg.visible=true;
}

function copyToClipBoard()
{
	var clipBoardContent=activityLink;//"http://www.renren.com";
	/*
	if (window.clipboardData) {
        window.clipboardData.clearData();
	}
	
	window.clipboardData.setData("Text",clipBoardContent);
    alert("复制成功！");
	*/
	//location.reload();
	window.open(clipBoardContent, '_blank');
	
	createjs.Tween.get(mc.diy.alert2).to({alpha:0,visible:false}, 500, createjs.Ease.cubicIn);
}

function postData()
{
	canvas.parentNode.appendChild(screenshot);
	screenshot.id = "canvasimage";    
	data = $('#canvasimage').attr('src');
	canvas.parentNode.removeChild(screenshot);
	
	$.ajax({ 
	url:'http://www.beijing-dentsu.com.cn/happynewyear2015/happynewyear2015/saveCard.php', 
	type:'post', 
	dataType:'json', 
	data:{pic:data},
	error: function(){ 
		//alert('Error'); 
	}, 
	success: function(msg){ //成功 
		//console.log( "Data Saved: " + msg );
		activityLink=msg.address;
		//msgData=msg.pic; 
		successGo();
	} 
	}); 
}

function handleBtn_photo(e) 
{
	userSelectImg=null;
	var reader = new FileReader();
    reader.onload = function(event){
		isLoad=1;
        userSelectImg = new Image();
        userSelectImg.onload = userLoaded;
        userSelectImg.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);    
}
function handleBtn_draw(event) 
{
	if(isDraw==1){
		isDraw=0;
		mc.tools.btn_draw.gotoAndStop(0);
	}else{
		isDraw=1;
		mc.tools.btn_draw.gotoAndStop(1);
	}
}

function handleBtn_rotation(event) 
{
	if(isRotation==0&&isLoad==0){
		isRotation=1;
		var obj=mc.diy.photo.userPhoto;
		var temp=mc.diy.photo.userPhoto.rotation+90;
		createjs.Tween.get(mc.diy.photo.userPhoto).to({rotation:temp}, 200, createjs.Ease.sineOut).call(backRotation);
	}
}

function backRotation()
{
	isRotation=0;
}

function handleBtn_del(event) 
{
	mc.diy.removeChild(text);
	text.text="";
	text.set({x: 320, y: 400});//(stage.canvas.height/2)-10
	text.textAlign = "center";
	mc.diy.addChild(text);
	
	wrapper.updateCache(0);
	inputMsg.value="";//text.text=
	mc.diy.photo.userPhoto.removeChild(tempImg);
}

function handleBtn_share(event)
{
	mc.share.visible=true;
	createjs.Tween.get(mc.share).to({alpha:1}, 600, createjs.Ease.sineOut);
}

function addShare1()
{
	addClose();
	mc.share.btn_weibo.addEventListener("click", handleBtn_weibo);
}
function addShare2()
{
	addClose();
	mc.share.share2.btn_weixin.addEventListener("click", handleBtn_weixin);
	mc.share.share2.btn_weibo.addEventListener("click", handleBtn_weibo);
}
function addClose()
{
	mc.share.btn_close.addEventListener("click", handleBtn_close);
}

function handleBtn_weibo(event)
{
	createjs.Tween.get(mc.share).to({alpha:0}, 600, createjs.Ease.sineOut).call(shareOut1);
	shareActivity(2);
}
function handleBtn_weixin(event)
{
	mc.share.gotoAndPlay(1);
}

function shareOut1()
{
	mc.diy.alert1.visible=false;
	mc.diy.alert1.gotoAndStop(1);
	mc.diy.alert1.alpha=0;
	mc.diy.alert1.visible=true;
	createjs.Tween.get(mc.diy.alert1).to({alpha:1}, 600, createjs.Ease.sineOut).call(shareOk);
}
function shareOk()
{
	createjs.Tween.get(mc.diy.alert1).wait(1000).to({alpha:0}, 600, createjs.Ease.sineOut).call(shareAlpha);
}
function shareAlpha()
{
	mc.diy.alert1.visible=false;
}

function handleBtn_close()
{
	createjs.Tween.get(mc.share).to({alpha:0}, 600, createjs.Ease.sineOut).call(shareOut2);
}
function shareOut2()
{
	mc.share.visible=false;
}
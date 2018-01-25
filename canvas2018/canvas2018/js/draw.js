var wrapper;
var lastPoint;
var drawing;
var color2="#FF0000";//白
var text;

/*
* jwl1978_cn@sina.com
* v1.0
*/
function initDraw()
{
	text = new createjs.Text("", "bold 40px Arial", "#FF0000");
	text.set({x: 320, y: 400});//(stage.canvas.height/2)-10
	text.textAlign = "center";
	
	wrapper = new createjs.Container();
	wrapper.hitArea = new createjs.Shape(new createjs.Graphics().f("#000").dr(0,0,640,850));//mc.x,mc.y,sw,sh
	wrapper.cache(0,0,640,850);
	mc.diy.photo.addChild(wrapper);
	mc.diy.photo.addChild(text);

	drawing = new createjs.Shape();
	wrapper.addChild(drawing);
		
	lastPoint = new createjs.Point();
	wrapper.addEventListener("mousedown",handleMouseDown); 
	
	text.addEventListener("mousedown", function(evt) {
		var o = evt.target;
		o.parent.addChild(o);
		o.offset = {x:o.x-evt.stageX, y:o.y-evt.stageY};
	});
			
	text.addEventListener("pressmove", function(evt) {
		var o = evt.target;
		o.x = evt.stageX+ o.offset.x;
		o.y = evt.stageY+ o.offset.y;
	});
}

function handleMouseDown(event) {
	text.text =inputMsg.value;
	document.getElementById("imageLoader").focus(); 
	var mousePoint=wrapper.globalToLocal(event.stageX,event.stageY);
	
	lastPoint.x = mousePoint.x;
	lastPoint.y = mousePoint.y;
	
	if(isDraw==1){
		event.addEventListener("mousemove",handleMouseMove);
	}
}
function handleMouseMove(event) {
	var mousePoint=wrapper.globalToLocal(event.stageX,event.stageY);
	
	drawing.graphics.setStrokeStyle(4,'round','round').beginStroke(color2);
	drawing.graphics.moveTo(lastPoint.x, lastPoint.y);        
	drawing.graphics.lineTo(mousePoint.x,mousePoint.y);

	lastPoint.x = mousePoint.x;
	lastPoint.y = mousePoint.y;

	wrapper.updateCache(1);
	drawing.graphics.clear();
}
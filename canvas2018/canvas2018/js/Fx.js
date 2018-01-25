
/**
* 2014-5-16
* @liu liang
**/

//$$ => _$$

function canvasContext ( w , h ) {
	this.canvas = document.createElement('canvas');  
	this.canvas.width=w;
	this.canvas.height=h;
	return this.canvas;
}


function isPC(){var userAgentInfo=navigator.userAgent;var Agents=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod");var flag=true;for(var v=0;v<Agents.length;v++){if(userAgentInfo.indexOf(Agents[v])>0){flag=false;break}};return flag};var Move=function($target,$duration,$vars){var ease,end,on,delay,vars=$vars,target=$target,speed=$duration;if(!target){return false};if(vars.ease){ease=vars.ease;delete vars.ease}else{ease=Tween.Linear};if(vars.end){end=vars.end;delete vars.end};if(vars.on){on=vars.on;delete vars.on};if(vars.delay){delay=vars.delay;delete vars.delay};var ifstop=false;var attrArr=[];var curArr=[];var initArr=[];var easeVarsX;var easeVarsY;for(var at in vars){attrArr.push(at);curArr.push(vars[at]);var ato=0;var pos;switch(at){case"opacity":ato=parseInt(parseFloat(getStyle(target,'opacity'))*100);if(isNaN(ato)){ato=100};break;case"backgroundPosition":pos=getStyle(target,'backgroundPosition').split(" "),ato=[parseInt(pos[0]),parseInt(pos[1])];break;default:ato=parseInt(getStyle(target,at));break};initArr.push(ato)};if(delay){if(target.delay){clearTimeout(target.delay)};target.delay=setTimeout(run,delay*1000)}else{run()};function run(){var s=(new Date()).getTime()/1000;for(var attr in vars){(function(){var t=(new Date()).getTime()/1000-s;for(var i=0,j=attrArr.length;i<j;i++){if(attrArr[i]=='backgroundPosition'){easeVarsX=ease(t,initArr[i][0],curArr[i][0]-initArr[i][0],speed);easeVarsY=ease(t,initArr[i][1],curArr[i][1]-initArr[i][1],speed);target.style["backgroundPosition"]=(easeVarsX+"px "+easeVarsY+"px")}else{var isPercent=/%$/.test(curArr[i]);var easeVars=ease(t,initArr[i],parseInt(curArr[i])-initArr[i],speed);if(attrArr[i]=='opacity'){target.style["opacity"]=easeVars/100;target.style["filter"]="alpha(opacity:"+easeVars+")";target.alpha=easeVars}else{try{target.style[attrArr[i]]=attrArr[i]=="zIndex"?Math.ceil(easeVars):easeVars+(isPercent?"%":"px")}catch(e){}}}};if(target.timer){clearTimeout(target.timer)};if(t<speed){target.timer=setTimeout(arguments.callee,10);if(on){on()}}else{if(!ifstop){for(var i=0,j=attrArr.length;i<j;i++){if(attrArr[i]=='backgroundPosition'){target.style["backgroundPosition"]=curArr[i][0]+"px"+curArr[i][1]+"px"}else{if(attrArr[i]=='opacity'){target.style["opacity"]=curArr[i]/100;target.style["filter"]="alpha(opacity:"+curArr[i]+")";target.alpha=curArr[i]}else{target.style[attrArr[i]]=attrArr[i]=="zIndex"?curArr[i]:/%$/.test(curArr[i])?curArr[i]:curArr[i]+"px"}}};ifstop=true;clearTimeout(target.timer);if(end){end()}}}})()}};function getStyle(ta,at){return ta.currentStyle?ta.currentStyle[at]:getComputedStyle(ta,false)[at]}};var _liuLiang ={};
var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return-c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/ 2) < 1) return c /2*t*t+b;return-c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/ 2) < 1) return c /2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/ 2) < 1) return c /2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/ 2) < 1) return c /2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/ 2) < 1) return c /2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/ 2) < 1) return - c /2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(!a||a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(!a||a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(!a||a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/ 2) < 1) return c /2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},easeInOut:function(t,b,c,d){if(t<d/2)return Tween.Bounce.easeIn(t*2,0,c,d)*.5+b;else return Tween.Bounce.easeOut(t*2-d,0,c,d)*.5+c*.5+b}}};
var _$$={}||_$$;_$$={pz:function(a,b){var l1=a.offsetLeft,r1=a.offsetLeft+a.offsetWidth,t1=a.offsetTop,b1=a.offsetTop+a.offsetHeight;var l2=b.offsetLeft,r2=b.offsetLeft+b.offsetWidth,t2=b.offsetTop,b2=b.offsetTop+b.offsetHeight;if(l2>r1||b2<t1||t2>b1||r2<l1){return false}else{return true}},id:function(ID){return document.getElementById(ID)},getClass:function(oFather,sClass){var arr=[],aEle=oFather.getElementsByTagName('*'),re=new RegExp('\\b'+sClass+'\\b','i'),i=0;for(i=0;i<aEle.length;i++){if(re.test(aEle[i].className)){arr.push(aEle[i])}};return arr},tag:function(Parent,Ele){return Parent.getElementsByTagName(Ele)},css:function(obj,json){if(obj.length){for(var i=0;i<obj.length;i++){_$$.css(obj[i],json)}}else{for(attr in json){obj.style[attr]=json[attr]}}},getStyle:function(obj,attr){return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr]},addEvent:function(obj,e,fn){if(obj.attachEvent){obj.attachEvent('on'+e,fn)}else{obj.addEventListener(e,fn)}},delEvent:function(obj,e,fn){if(obj.detachEvent){obj.detachEvent('on'+e,fn)}else{obj.removeEventListener(e,fn)}},btnX:function(obj,fn){var _this=obj;_$$.addEvent(obj,'click',function(){_$$.css(_this.parentNode,{display:'none'});if(fn)fn()})},nextSib:function(t){var n=t.nextSibling;if(n.nodeType!=1){n=n.nextSibling};return n},insertAfter:function(newChild,target){var oParent=target.parentNode;if(oParent.lastChild==target){oParent.appendChild(newChild)}else{oParent.insertBefore(newChild,this.nextSib(target))}},getSize:function(){return{w:document.documentElement.clientWidth,h:document.documentElement.clientHeight}},setCookie:function(name,value,days){var oDate=new Date();oDate.setDate(oDate.getDate()+days);document.cookie=name+'='+value+';expires='+oDate},getCookie:function(name){var arr=document.cookie.split('; ');var i=0;for(i=0;i<arr.length;i++){var arr2=arr[i].split('=');if(arr2[0]==name){return arr2[1]}};return''},removeCookie:function(name,value,days){this.setCookie(name,value,-1)},atr:function(obj,a,b){if(arguments.length==3){obj.setAttribute(a,b)}else{return obj.getAttribute(a)}}};eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('6 P=(h(){6 4=(h(){6 g={};6 N={a:e.C.a,i:e.C.i};6 t=e.K.Y;6 s=e.l;6 j=w;6 I=h(f){m f.18==X?t.y(f)>-1:t.R(f)};6 v=h(b,f,p){7(b&&f)g[b]={f:f,p:p}};6 x=h(b){7(g[b])Q g[b]};6 8=h(){7(j!=w)m j;S(6 b T g){7(I(g[b].f)){j=g[b].p;V}}7(j==w)j=N;m j};m{v:v,x:x,8:8,s:s}})();6 z=h(q){6 3,9,u,B,d,c,o;o=K.1b.16();A=o.y(\'W\')>-1||o.y(\'17\')>-1;9=e.9;9<1.5?2:9;7(e.l==0||e.l==F){7(4.s!=0){7(4.8().a<4.8().i){3=4.8().a}k{3=4.8().i}}k{3=4.8().a}}k{7(4.s!=0){7(4.8().a>4.8().i){3=4.8().a}k{3=4.8().i}}k{3=4.8().i}}7(9==2&&(3==D||3==14||3==13||3==r)){3*=2};7(9==1.5&&(3==D)){3*=2;9=2};7(9==1.5&&(3==r)){9=2};u=q/3*9*Z;B=A?\'a=\'+q+\'10, M-L=H\':\'12-11=\'+u+\', a=\'+q+\', M-L=H\';d=G.19(\'d\');c=G.15(\'U\');c.b=\'c\';c.O=\'c\';c.E=B;7(A&&e.l!=0&&e.l!=F){c.E=\'a=r\';d.n>0&&d[d.n-1].J(c)}k{d.n>0&&d[d.n-1].J(c)}};m{4:4,z:z}})();6 1a=r;',62,74,'|||deviceWidth|regulateScreen||var|if|cal|devicePixelRatio|width|name|viewport|head|window|key|cache|function|height|_|else|orientation|return|length|ua|size|uiWidth|640||ver|targetDensitydpi|add|null|del|indexOf|adapt|isiOS|initialContent|screen|320|content|180|document|no|check|appendChild|navigator|scalable|user|defSize|id|adaptUILayout|delete|test|for|in|meta|break|ipad|String|appVersion|160|px|densitydpi|target|592|360|createElement|toLowerCase|iphone|constructor|getElementsByTagName|_initViewportWidth|userAgent'.split('|'),0,{}));if(!isPC()){adaptUILayout.adapt(_initViewportWidth)};
function setCss(obj,oAttr){var sAttr="";var arr=["Webkit","Moz","O","ms",""];for(sAttr in oAttr){if(sAttr.charAt(0)=="$"){for(var i=0;i<arr.length;i++){obj.style[arr[i]+sAttr.substring(1)]=oAttr[sAttr]}}else if(sAttr=="rotate"){obj.rotate=oAttr[sAttr];var a=Math.cos(obj.rotate/180*Math.PI);var b=Math.sin(obj.rotate/180*Math.PI);var c=-Math.sin(obj.rotate/180*Math.PI);var d=Math.cos(obj.rotate/180*Math.PI);for(var i=0;i<arr.length;i++){obj.style[arr[i]+"Transform"]="matrix("+a+","+b+","+c+","+d+","+0+","+0+")"};obj.style.filter="progid:DXImageTransform.Microsoft.Matrix( M11="+a+", M12="+c+", M21="+b+", M22="+d+",SizingMethod='auto expand')"}else{var value=oAttr[sAttr];switch(sAttr){case'width':case'height':case'paddingLeft':case'paddingTop':case'paddingRight':case'paddingBottom':value=Math.max(value,0);case'left':case'top':case'marginLeft':case'marginTop':case'marginRight':case'marginBottom':obj.style[sAttr]=value+'px';break;case'opacity':if(value<0){value=0};obj.style.filter="alpha(opacity:"+value+")";obj.style.opacity=value/100;break;default:obj.style[sAttr]=value}}}};function $ele(b,e){var g=[];var d=0;e||(e=document);if(e instanceof Array){for(d=0;d<e.length;d++){g=g.concat($ele(b,e[d]))}}else{if(typeof b=="object"){if(b instanceof Array){return b}else{return[b]}}else{if(/,/.test(b)){var a=b.split(/,+/);for(d=0;d<a.length;d++){g=g.concat($ele(a[d],e))}}else{if(/[ >]/.test(b)){var c=[];var f=[];var a=b.split(/[ >]+/);f=[e];for(d=0;d<a.length;d++){c=f;f=[];for(j=0;j<c.length;j++){f=f.concat($ele(a[d],c[j]))}};g=f}else{switch(b.charAt(0)){case"#":return[document.getElementById(b.substring(1))][0];case".":return _$$.getClass(e,b.substring(1));default:return[].append(e.getElementsByTagName(b))}}}}};return g};
function dragThis(objEv,objMove,fnMoveCallBack,fnUpCallBack){var disX=0,disY=0,disX2=0,disY2=0;objEv.onmousedown=function(ev){var oEvent=ev||event;disX2=(document.documentElement.scrollLeft||document.body.scrollLeft)+objMove.offsetLeft;disX=(document.documentElement.scrollLeft||document.body.scrollLeft)+oEvent.clientX-objMove.offsetLeft;disY=(document.documentElement.scrollTop||document.body.scrollTop)+oEvent.clientY-objMove.offsetTop;disY2=(document.documentElement.scrollTop||document.body.scrollTop)+objMove.offsetTop;if(objEv.setCapture){objEv.onmousemove=fnMove;objEv.onmouseup=fnUp;objEv.setCapture()}else{document.onmousemove=fnMove;document.onmouseup=fnUp;return false}};function fnMove(ev){var oEvent=ev||event;var l=(document.documentElement.scrollLeft||document.body.scrollLeft)+oEvent.clientX-disX;var t=(document.documentElement.scrollTop||document.body.scrollTop)+oEvent.clientY-disY;fnMoveCallBack(l,t)};function fnUp(ev){var oEvent=ev||event;if(fnUpCallBack){var l=(document.documentElement.scrollLeft||document.body.scrollLeft)+oEvent.clientX-disX;var t=(document.documentElement.scrollTop||document.body.scrollTop)+oEvent.clientY-disY;fnUpCallBack(l,t,disX2,disY2)};this.onmousemove=null;this.onmouseup=null;if(this.releaseCapture)this.releaseCapture()}};function addClass(e,c){if(new RegExp("(^|\\s)"+c+"(\\s|$)").test(e.className)){return};e.className+=(e.className?" ":"")+c};function removeClass(e,c){e.className=!c?"":e.className.replace(new RegExp("(^|\\s)"+c+"(\\s|$)")," ").replace(/^\s\s*/,'').replace(/\s\s*$/,'')};function imgLoader(opt){var loaded=0,defUrl=' '||opt.defaults,loadPath=opt.img,bar=opt.bar,loadingGif=opt.loading,callback=opt.callback,onload=opt.onloading;var oJd=0,barWidth=0;var fnBeOnce=true;if(bar&&loadPath instanceof Array){var h='<div style="width:300px; height:30px; position:relative; border:1px solid #ccc;overflow:hidden;background:#70c7d1;"><div id="imgLoader_bar_Jdnum" style=" width:100%; height:100%; position:absolute; z-index:999999; left:0; top:0; line-height:30px; font-family:Arial, Helvetica, sans-serif; text-align:center;color:#fff">正在加载...0%</div><div id="imgLoader_bar_Jdcolor" style="width:0px; height:100%; background:#ea67a2; text-align:center; position:absolute; left:0; top:0;"></div></div>';var oD=document.createElement('div');oD.id='imgLoader_bar_press';oD.style.position='absolute';oD.style.width='300px';oD.style.height='30px';oD.innerHTML=h;oD.style.left='50%';oD.style.top='50%';oD.style.marginLeft='-150px';oD.style.zIndex=5;document.body.appendChild(oD);var jq=document.getElementById('imgLoader_bar_Jdnum');var c=document.getElementById('imgLoader_bar_Jdcolor');var prossMain=document.getElementById('imgLoader_bar_press')};if(loadPath instanceof Array){var l=loadPath.length;var oScl=100/l;var oWidthScl=300/l;if(loadingGif)loadingGif.style.display='block';function doLoad(num){loaded+=1;oJd+=oScl;onload&&onload(oJd);var jdScl=loaded/l;if(bar){c.style.width=300*jdScl+'px';jq.innerHTML='正在加载...'+parseInt(oJd)+'%'};if(loaded>=loadPath.length||parseInt(oJd)>=97){if(fnBeOnce){if(bar){document.body.removeChild(prossMain)};if(loadingGif)loadingGif.style.display='none';callback(loaded);fnBeOnce=false}}};for(var i=0,j=loadPath.length;i<j;i++){(function(num){var oImg=new Image();oImg.onreadystatechange=function(){if(oImg.readyState=='complete'){doLoad(num);oImg.onload=oImg.onerror=oImg.onreadystatechange=null}};oImg.onload=oImg.onerror=function(){doLoad(num);oImg.onload=oImg.onerror=oImg.onreadystatechange=null};oImg.src=defUrl+loadPath[num]})(i)}}else{var oImg=new Image();if(loadingGif)loadingGif.style.display='block';oImg.onreadystatechange=function(){if(oImg.readyState=='complete'){callback();if(loadingGif)loadingGif.style.display='none';oImg.onload=oImg.onreadystatechange=null}};oImg.onload=function(){callback();if(loadingGif)loadingGif.style.display='none';oImg.onload=oImg.onreadystatechange=null};oImg.src=defUrl+loadPath}}
 //Linear
 //Quad
 //Cubic
 //Quart
 //Quint
 //Sine
 //Expo: // 33猛
 //Circ
 //Elastic
 //Back
 //Bounce
Array.prototype.append = function(c) {
    for (var b = 0, a = c.length; b < a; b++) {
        this.push(c[b])
    }
    return this
};
function isHit(a,b,overlap) {		
	var overlap = !overlap? 0 :overlap;
	var l1=a.offsetLeft+overlap,
		r1=a.offsetLeft+a.offsetWidth-overlap,
		t1=a.offsetTop+overlap,
		b1=a.offsetTop+a.offsetHeight-overlap;
		
	var l2=b.offsetLeft+overlap,
		r2=b.offsetLeft+b.offsetWidth-overlap,
		t2=b.offsetTop+overlap,
		b2=b.offsetTop+b.offsetHeight-overlap;
		
	 return !( l2>r1||b2<t1||t2>b1||r2<l1 ) ;
	
};
function getData(type,url, data, fn, loading, fn2) {
	if (loading) show(loading);

	$.ajax({
		type: type,
		url: url,
		data: data,
		/*cache: true,*/
		/*dataType:"jsonp",*/
		success: function(a) {
			if (fn) fn(a);
			if (loading)  hide(loading);
		},
		error: function(b) {
			if (fn2) fn2(b);
		}
	});
 };
function show(obj) {
	if ( obj instanceof Array ) {
		for ( var i=0; i<obj.length; i++ ) {
			obj[i].style.display = 'block';	
		}	
	}else {
		obj.style.display = 'block';	
	}
	
}
function hide( obj ) {
	if ( obj instanceof Array ) for (var i = 0; i < obj.length; i++) {
		obj[i].style.display = 'none';
	} else {
		obj.style.display = 'none';
	}
}
function setCss3 (c, a, b) {
    c.style["Webkit" + a.charAt(0).toUpperCase() + a.substring(1)] = b;
    c.style["Moz" + a.charAt(0).toUpperCase() + a.substring(1)] = b;
    c.style["ms" + a.charAt(0).toUpperCase() + a.substring(1)] = b;
    c.style["O" + a.charAt(0).toUpperCase() + a.substring(1)] = b;
    c.style[a] = b
	};
	
/*
 　	0 字母顺序（默认）
 　　1 大小 比较适合数字数组排序
 　　2 拼音 适合中文数组
 　　3 乱序 有些时候要故意打乱顺序
 　　4 时间
 * */
function sortBy($type, $str) {
	var str = $str.concat();
	switch ($type) {
		case 0:
			str.sort();
			break;
		case 1:
			str.sort(function(a, b) {
				return a - b;
			});
			break;
		case 2:
			str.sort(function(a, b) {
				return a.localeCompare(b)
			});
			break;
		case 3:
			str.sort(function() {
				return Math.random() > 0.5 ? -1 : 1;
			});
			break;
		case 4:
			str.sort(function(a, b) {
				return parseInt(a[0].replace(/\-/g, ""), 10) - parseInt(b[0].replace(/\-/g, ""), 10)
			});
			break;  
		default:
			str.sort();
	}
	return str;
};

function getRandomColor() {
	var str = "0123456789abcdef";
	var s = "#";
	for ( j = 0; j < 6; j++) {
		s = s + str.charAt(Math.random() * str.length);
	}
	return s;
};
function getRandomNum(Min,Max)
{   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
};

function Browser() {
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	( s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : ( s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : ( s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : ( s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : ( s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	return Sys;
};
	
function loadPages ( json ) {		
	var pageType=json.type||1,
		pageNow=json.pageNow,
		pageLength=json.pageLength||10;
	var dataArr=null;		
	var arr=[];
	if ( pageType==1 ) {
		dataArr=json.data;
		var allLength=dataArr.length-(pageNow*pageLength-pageLength);
		var allPage=Math.ceil(dataArr.length/pageLength);		
		if ( pageNow<1|| pageNow>allPage )	return;
		if ( allLength < pageLength ) {
			for ( var i=0; i < allLength; i++ ) {
				arr.push(dataArr[i+pageNow*pageLength-pageLength]);	
			} 	
		} else {
			for ( var i=0; i<pageLength; i++ ) {
				arr.push(dataArr[i+pageNow*pageLength-pageLength]);	
			} 	
		}		
	} 			
	return arr;					
};


function Scroll_To(n, fnEnd)
{
	var timer=null;
	var bySys=true;
	_$$.addEvent(window, 'scroll', fn);	
	function fn()
	{
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;		
		if(!bySys)
		{
			clearInterval(timer);
			if(fnEnd)fnEnd(false);
			
			_$$.delEvent(window, 'scroll', fn);
		}
		bySys=false;
	}
	
	timer=setInterval(function (){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		
		var speed=(n-scrollTop)/4;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);		
		scrollTop+=speed;		
		bySys=true;
		
		document.documentElement.scrollTop=scrollTop;
		document.body.scrollTop=scrollTop;
		
		if(scrollTop==n)
		{
			clearInterval(timer);
			if(fnEnd)fnEnd(true);
			_$$.delEvent(window, 'scroll', fn);
		}
	}, 25);
};

function mouseScroll(c, b) {
    _$$.addEvent(c, "mousewheel", a);
    _$$.addEvent(c, "DOMMouseScroll" , a);
    function a(f) {
        var e = f || event;
        var d;
        if (e.wheelDelta) {
            d = e.wheelDelta < 0
        } else {
            d = e.detail > 0
        }
        b(d);
        if (e.preventDefault) {
            e.preventDefault()
        }
        return false
    }
};
Array.prototype.remove=function (w)
{
	var n=this.indexOf(w);
	if(n!=-1)this.splice(n,1);
};
function sprintf(format)
{
	var _arguments=arguments;
	
	return format.replace(/%\d+/g, function (str){
		return _arguments[parseInt(str.substring(1))];
	});
}
function json2url(json)
{
	var a=[];
	for(var i in json)
	{
		var v=json[i]+'';
		v=v.replace(/\n/g, '<br/>');
		v=encodeURIComponent(v);
		a.push(i+'='+v);
	}
	return a.join('&');
}
function ajax(url, opt)
{
	opt			=opt||{};
	opt.data	=opt.data||{};
	opt.data.t	=opt.data.t||new Date().getTime();
	opt.method	=opt.method||'get';
	
	var oAjax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
	
	if(opt.method=='post')
	{
		oAjax.open('POST', url, true);
		oAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		oAjax.send(opt.data?json2url(opt.data):null);
	}
	else
	{
		url+='?'+json2url(opt.data);
		oAjax.open('GET', url, true);
		oAjax.send();
	}
	
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)
		{
			if(oAjax.status==200)
			{
				opt.fnSucc && opt.fnSucc(oAjax.responseText);
			}
			else
			{
				opt.fnFaild && opt.fnFaild(oAjax.status);
			}
		}
	};
}	

//获取URL参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
};
//获取time
//alert(getTime("2013-02-03 10:10:10"));
//alert(getTime("2013-02-03"));
//alert(getTime("2013-02"));
//alert(getTime("2013"));
function GetTime(day){      
 re = /(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/.exec(day);
 return new Date(re[1],(re[2]||1)-1,re[3]||1,re[4]||0,re[5]||0,re[6]||0).getTime();
};
function makeLengthTwo( num ) { return num<10?'0'+num:num}
//倒计时
function countDown ( time ) {
	var time= time/1000,
	 	nowTime= parseInt(new Date().getTime()/1000),
		l=time-nowTime;		
	if ( nowTime >= time ) return {d:'00',h:'00',m:'00',s:'00',overTime:true};
	
	return  {d:makeLengthTwo(parseInt(l/86400)),h:makeLengthTwo(parseInt(l%86400/3600)),m:makeLengthTwo(parseInt(l%3600/60)),s:makeLengthTwo(l%60),overTime:false}
}

function colorToRgba ( color )  {
	if ( color.match( /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i ) ) {
		  var value = color.slice( color.indexOf('#') + 1 ),
			  isShortNotation = (value.length === 3),
			  r = isShortNotation ? (value.charAt(0) + value.charAt(0)) : value.substring(0, 2),
			  g = isShortNotation ? (value.charAt(1) + value.charAt(1)) : value.substring(2, 4),
			  b = isShortNotation ? (value.charAt(2) + value.charAt(2)) : value.substring(4, 6);
		  return [parseInt(r, 16),parseInt(g, 16),parseInt(b, 16),255];
	}
	return 'rgba(0,0,0,255)';
}	
	 
//获取字符串真实长度
function getTextRealLength(str){
	return  Math.ceil(String(str).replace(/[^\x00-\xff]/g,'cc').length/2);
};

//navigator.userAgent.indexOf('IE 8')>0||navigator.userAgent.indexOf('IE 7')>0||navigator.userAgent.indexOf('IE 6')>0?true:false;
function isIe678 () {
	var IE = eval('"v"=="\v"');
	return 	IE;
};
//IP
function isIP(value){
  return /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i.test(value);
};
//URL
function isURL(value){
  return /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(value);
};
//Chinese
function isChinese(value){
  return /^[\u4E00-\u9FA3]{1,}$/.test(value);
};
//身份证
function isIDCard(value){
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
};
//手机
function isPhoneNum(value){
   return /^0?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/.test(value);
};
//电话
function isTel(value) {
	return /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(value);	
};
//Email
function isEmail(value){
   return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
}
//数字
function isNum(value){
   return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
};
//日期
function isDate(value){
   return !/Invalid|NaN/.test(new Date(value).toString());
};
//匹配字母和下划线开头，允许n-m字节，允许字母数字下划线
function isAccountValid(value,m,n){
   var _n = n-1, _m = m-1;
   return new RegExp("^[a-zA-Z_][a-zA-Z0-9_]{"+_n+","+_m+"}$").test(value);
};
var eventStr = ((navigator.userAgent.indexOf('Windows NT') > -1) || (navigator.userAgent.indexOf('Macintosh') > -1)) ? 'mousedown' : 'touchstart';
var eventEnd = ((navigator.userAgent.indexOf('Windows NT') > -1) || (navigator.userAgent.indexOf('Macintosh') > -1)) ? 'mouseup' : 'touchend';
var eventMove = ((navigator.userAgent.indexOf('Windows NT') > -1) || (navigator.userAgent.indexOf('Macintosh') > -1)) ? 'mousemove' : 'touchmove';	
function $id (id) { return document.getElementById(id)} 
function $c (c) { return document.getElementsByClassName(c)[0];}
function $class (c) { return document.getElementsByClassName(c);}  
function fadeIn ( obj ,fn ) {obj.style.opacity=0;obj.style.display='block';Move (obj,.5,{opacity:100,ease:Tween.Quad.easeOut,end : function () {if( fn ) fn();} })};
function fadeOut ( obj,fn ) {Move (obj,.4,{opacity:0,ease:Tween.Quad.easeOut,end:function () {obj.style.display='none';if( fn ) fn();} })};
/*  
var myDate = new Date();
myDate.getYear(); //获取当前年份(2位)
myDate.getFullYear(); //获取完整的年份(4位,1970-????)
myDate.getMonth(); //获取当前月份(0-11,0代表1月)
myDate.getDate(); //获取当前日(1-31)
myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours(); //获取当前小时数(0-23)
myDate.getMinutes(); //获取当前分钟数(0-59)
myDate.getSeconds(); //获取当前秒数(0-59)
myDate.getMilliseconds(); //获取当前毫秒数(0-999)
myDate.toLocaleDateString(); //获取当前日期
var mytime=myDate.toLocaleTimeString(); //获取当前时间
myDate.toLocaleString( ); //获取日期与时间
*/

function tracking(str){
	var img = new Image();
	img.src = str;
}

// var winheight = parseInt(document.body.clientHeight);
// alert(winheight);
// if(winheight > 960 && winheight <1008){
// 	$c('page').style.height = winheight;
// 	$id('warps').style.height = winheight;

// }

// var winheight = parseInt(document.body.clientHeight);
// alert(winheight);
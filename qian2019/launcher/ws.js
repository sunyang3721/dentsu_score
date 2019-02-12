/**
 * author : lijin<k.vip@foxmail.com>
 * Date : 2015-11-10
 * Desd : 
 **/

 (function(){
    var JS_MSG_72 = JS_MSG_72 || '' ;
	var JS_MSG_73 = JS_MSG_73 || '' ;
 	if(typeof WebSocket === 'undefined') {
 		alert(JS_MSG_72);
 		return false;
 	}

 	_potato = function() {
 	};

 	_potato.prototype = {
 		'init' : function(wsHost) {
 			var self = this;

 			this.chatStatus = 1;
 			this.chatDuration = 1000;

 			this.wsHost = this.wsHost || wsHost;

 			this.ws = new WebSocket(this.wsHost);
 			this.ws.binaryType = "arraybuffer";
 			this.ws.onopen = function(event){
 				self.onopen(event);
 			};
 			this.ws.onmessage = function(event){
 				self.onmessage(event);
 			};
 			this.ws.onerror = function(event) {
 				self.onerror(event);
 			};
 			this.ws.onclose = function(event){
 				self.onclose(event);
 			};

 			this.loop();

 			return true;
 		},
 		'loop' : function() {
 			var self = this;
 			setInterval(function(){
 				if (self.ws.readyState == WebSocket.OPEN) {
 					self.ws.send(1);
 				} else {
 					self.ws.close();
 				}
 			}, 3000);
 			setInterval(function(){
 				self.chatStatus = 1;
 			}, self.chatDuration);
 		},
 		'login' : function(UserId, UserName, GameID) {

 		},
 		'wsHandler' : function(type, handler) {
 			if (typeof handler === 'function') {
 				switch(type) {
 					case 'ws_message_handler':
 						this.wsMessageHandler = handler;
 						break;
 					case 'ws_close_handler':
 						this.wsCloseHandler = handler;
 						break;
 					case 'ws_error_handler':
 						this.wsErrorHandler = handler;
 						break;
 					case 'ws_open_handler':
 						this.wsOpenHandler = handler;
 						break;
 					default :
 						console.log('unkonw ws_handler');
 						break;	
 				}
 			}
 			else {
 				console.log('ws_message_handler init error');
 			}
 			return this;
 		},
 		'onopen' : function(event) {
 			console.log('服务器连接成功');
 			console.log(event);
 			this.wsOpenHandler && this.wsOpenHandler(event);
 		},
 		'onclose' : function(event) {
 			console.log('服务器连接断开');
 			console.log(event);
 			try{
 				this.wsCloseHandler && this.wsCloseHandler(event);
 			}
 			catch(e){
 				console.log(e);
 			}
 		},
 		'onmessage' : function(event) {
 			if( event.data === '1' || this.ws.readyState !== WebSocket.OPEN) {
 				return;
 			}
 			if(typeof event.data == 'object'){
 				var aDataArray = new Uint16Array( event.data );
 				//console.log(event.data);
 				//console.log(aDataArray);
 				var data = String.fromCharCode.apply(null, aDataArray);
 				//console.log(data);

 			}
 			else {
 				var data = event.data;
 			}

 			this.wsMessageHandler && this.wsMessageHandler(data);
 		},
 		'onerror' : function (event) {
 			console.log('服务器连接失败');
 			console.log(event);
 			this.wsErrorHandler && this.wsErrorHandler(event);
 		},
 		'sendToServer' : function(data) {
			if(!this.ws || this.ws.readyState !== WebSocket.OPEN) {
				console.log('服务器连接超时');
				return;
			}
			if(this.chatStatus === 0) {
				alert(JS_MSG_73);
				return;
			}
			this.chatStatus = 0;
			var txt = JSON.stringify(data);
			var b = new Uint16Array(txt.length);
			for(var i=0;i<txt.length;i++) {
				b[i] = txt.charCodeAt(i);
			}
			//console.log(b.buffer.byteLength);
			this.ws.send(b.buffer);
		},
		sendChat : function(target, msg) {
			var data = {
				'action' : 'chat',
				'target' : target,
				'msg' : msg
			};
			this.sendToServer(data);
		}
 	};

 	window.potato = new _potato();

 })();
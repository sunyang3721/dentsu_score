// JavaScript Document
var JS_MSG_1 = JS_MSG_1 || '' ;
var JS_MSG_2 = JS_MSG_2 || '' ;
var JS_MSG_3 = JS_MSG_3 || '' ;
var JS_MSG_4 = JS_MSG_4 || '' ;
var JS_MSG_6 = JS_MSG_6 || '' ;
var JS_MSG_7 = JS_MSG_7 || '' ;
var JS_MSG_8 = JS_MSG_8 || '' ;
var JS_MSG_9 = JS_MSG_9 || '' ;
var JS_MSG_10 = JS_MSG_10 || '' ;
var JS_MSG_12 = JS_MSG_12 || '' ;
var JS_MSG_13 = JS_MSG_13 || '' ;
var JS_MSG_14 = JS_MSG_14 || '' ;
var JS_MSG_59 = JS_MSG_59 || '' ;
var JS_MSG_60 = JS_MSG_60 || '' ;
var JS_MSG_61 = JS_MSG_61 || '' ;
var JS_MSG_62 = JS_MSG_62 || '' ;
var JS_MSG_63 = JS_MSG_63 || '' ;
var JS_MSG_64 = JS_MSG_64 || '' ;
var JS_MSG_65 = JS_MSG_65 || '' ;
var JS_MSG_66 = JS_MSG_66 || '' ;
var JS_MSG_67 = JS_MSG_67 || '' ;
var CPS_YOUKE = CPS_YOUKE || false ;
var HIDEFANHUI = HIDEFANHUI || false;

window.ISLOADING=false;
window.iosdownload = window.iosdownload || window.location.href;
window.appdownload = window.appdownload || window.location.href;
$(document).ready(function(e) {
    window.onscroll = function(){
		$(".denglu").css("height", $(document).height()+"");
		$(".aa").css("height", $(document).height()+"");	
		$(".exit1").css("height", $(document).height()+"")
	};
});
function isMobile(){
	return navigator.userAgent.match(/android|iphone|ipad|ipod|blackberry|meego|symbianos|windowsphone|ucbrowser/i);
}
function IOSplay68(){
	return navigator.userAgent.match(/IOSplay68/i);
}
function APPplay68(){
	return navigator.userAgent.match(/Play68/);
}
function isIOS() {
	return navigator.userAgent.match(/iphone|ipad|ipod|ios/i);
}
function isAndroid() {
	return navigator.userAgent.match(/android/i);
}	
if(typeof window.webkit === "object"){
  window.iosplay68=true;
}else{
  window.iosplay68=false;
}

$(function(){
	
	
	//password、
	$(".possword1_3 li").click(function(){
    $(".possword1_3 li").find("img").attr("src","/resources/images/mima/batton_shuzikuang.png");
	//$(this).find("img").attr("src","/resources/images/mima/batton_shuzikuang_1.png");
	})
	$(document).ready(function(e) {
    window.onscroll = function(){
		$(".aa").css("height", $(document).height()+"");	
	};
   });
	 //获取字符串长度
		 function getBytesCount(str) 
			{ 
			var bytesCount = 0; 
			if (str != null) 
			{ 
			for (var i = 0; i < str.length; i++) 
			{ 
			var c = str.charAt(i); 
			if (/^[\u0000-\u00ff]$/.test(c)) 
			{ 
			bytesCount += 1; 
			} 
			else 
			{ 
			bytesCount += 2; 
			} 
			} 
			} 
			return bytesCount; 
			}
	
  
    



	//登陆页面
	// $(".denglu4 .input .text").click(function(){
//		 $(this).css({color:"#72452d"}).attr("value","");
//		 
//		
//		 }).blur( function(){
//			 $(this).css({color:"#a3775f"}).attr("value","请输入6-12位字母数字");
//	 });
//	 

		$(".denglu2 li").eq(0).click(function(){
		
			   // if ($(this).find("img").attr("src") == "/resources/images/dl/batton_fanhui.png"){ 
					// $(this).find("img").attr("src","/resources/images/dl/batton_fanhui_1.png") 
					//}else{
		     	//$(this).find("img").attr("src","/resources/images/dl/batton_fanhui.png") 
				// }
		})
		
		$(".denglu2 li").eq(1).click(function(){
				//	 $(this).find("img").attr("src","/resources/images/dl/batton_zhuce_1.png") 
		})
	   
	   $(".denglu3 li").eq(0).click(function(){
				//	 $(this).find("img").attr("src","/resources/images/dl/batton_weixin_1.png") 
		})
		
		$(".denglu3 li").eq(1).click(function(){
				//	 $(this).find("img").attr("src","/resources/images/dl/batton_qq_1.png") 
		})
		
		$(".denglu3 li").eq(2).click(function(){
				//	 $(this).find("img").attr("src","/resources/images/dl/batton_weibo_1.png") 
		})
		
		$(".denglu5 li").eq(0).click(function(){
				//	 $(this).find("img").attr("src","/resources/images/dl/batton_denglu_1.png") 
		})

	 
	 
	 //注册页面
	//  $(".shuru1_a input").click(function(){
//		 $(this).css({color:"#61605f"}).attr("value","");
//		 }).blur( function(){
//			 $(this).css({color:"#939292"}).attr("value","请输入");
//			 })
//     $(".shuru1_b").click(function(){
//		 shanchu();
//		 })
//	
//	function shanchu(){
//			  document.getElementById('text').focus();
//		 }
//		 



		
	 //name	 
	var name=document.documentElement.clientHeight;
	$(".name").height(name);
	

$(window).resize(function() {
	var name=document.documentElement.clientHeight;
    $(".name").height(name);
    });
		$(".namel_1_a").click(function(){
		//	$(this).find("img").attr("src","/resources/images/batton_fanhui_1.png")
			})
		
		$(".name3 li").click(function(){
		//	$(this).find("img").attr("src","/resources/images/psback/batton_queding_1.png")
			})
			
	    $(".name2 li").click(function(){
		//	$(this).find("img").attr("src","/resources/images/psback/batton_chongxinfasong_1.png")
			})
		
		/* $(".name2 .text").click(function(){
		 $(this).css({color:"#61605f"}).attr("value","");
		 }).blur( function(){
			 $(this).css({color:"#939292"}).attr("value","请输入2-12位由中文字母数字_组合");
	       });	*/
   
    //psback
    $(".psbackl_1_a").click(function(){
		//	$(this).find("img").attr("src","/resources/images/batton_fanhui_1.png")
			})
		
		$(".psback3 li").click(function(){
		//	$(this).find("img").attr("src","/resources/images/psback/batton_fasongyanzhengma_1.png")
			})
			
	    $(".psback2 li").click(function(){
		///	$(this).find("img").attr("src","/resources/images/psback/batton_chongxinfasong_1.png")
			})
			
			
	      $(".psback2 .text").click(function(){
		  $(this).css({color:"#61605f"}).attr("value","");
		  }).blur( function(){
			 $(this).css({color:"#939292"}).attr("value",JS_MSG_59);
	       });	
		   
		 //psback2   
		$(".fhuil_1_a").click(function(){
			//$(this).find("img").attr("src","/resources/images/batton_fanhui_1.png")
			})
		
		$(".fhui3 li").click(function(){
		//	$(this).find("img").attr("src","/resources/images/psback/batton_fasongyanzhengma_1.png")
			})
			
	    $(".fhui2 li").click(function(){
		//	$(this).find("img").attr("src","/resources/images/psback/batton_chongxinfasong_1.png")
			})
		  
		  $(".fhui input").focus(
				function(){
					$(this).css({color:"#5a5855"}).attr("value","")
					}).blur(function(){
				$(this).css("color","#6a5350").attr("value",JS_MSG_59);
				})
		   
	//shouji

		$(".shoujil_1_a").click(function(){
			//$(this).find("img").attr("src","/resources/images/batton_fanhui_1.png")
			})
		
		$(".shouji3 li").click(function(){
		//	$(this).find("img").attr("src","/resources/images/psback/batton_fasongyanzhengma_1.png")
			})
			
	    $(".shouji2 li").click(function(){
		//	$(this).find("img").attr("src","/resources/images/psback/batton_chongxinfasong_1.png")
			})
			
			
		$(".shouji2 .text").click(function(){
		  $(this).css({color:"#61605f"}).attr("value","");
		  }).blur( function(){
			 $(this).css({color:"#939292"}).attr("value",JS_MSG_59);
	     });	
		   
	//tc
	 $(".anniu").click(function(){
		// $(this).find("img").attr("src","/resources/images/psback/batton_queding_1.png")
		 
		 })		

    //公共的js
	 $(".bottom1_e").click( function(event){
		
		    menu1();
			event.stopPropagation();
			$(".game-h").addClass("hide");
			$(".fnr_2").find("img").attr("src","/resources/images/batton_fenlei.png") ;
		
		 });
		 
	
			function menu1() {
				 $(".guany").toggleClass("hide");
				 if ($(".gengd").find("img").attr("src") == "/resources/images/batton_gengduo.png"){
					$(".gengd").find("img").attr("src","/resources/images/batton_gengduo_1.png") 
					
					}else{
						
					$(".gengd").find("img").attr("src","/resources/images/batton_gengduo.png") 
				  }
			 }
		 $(".bottom1_a").click( function(){
		  //  $(this).find("img").attr("src","/resources/images/batton_youxi_1.png");
		 });
		 
		  $(".bottom1_b").click( function(){
		  //  $(this).find("img").attr("src","/resources/images/batton_sousuo_1.png");
		 });
		 
		  $(".bottom1_c").click( function(){
		  //  $(this).find("img").attr("src","/resources/images/batton_chengjiu_1.png");
		 });
		 
		  $(".bottom1_d").click( function(){
		  //  $(this).find("img").attr("src","/resources/images/batton_geren_1.png");
		 });
		
	     //隐藏站长统计
	     $("#cnzz_stat_icon_1253112090").hide();
		 $("#cnzz_stat_icon_1254712307").hide();
			
         //更多分享点击
		$("#show_share").click(function(){
			if(window.Play68app){
			  //安卓APP应用分享
              window.Play68app.WXShare('www.play68.com',SHARE_TITLE,SHARE_DESC,"http://play68.com/resources/images/logo.png");
             // GAME_ICON = "http://play68.com/resources/images/logo.png";
             // GAME_URL = "www.play68.com";
			 
			}else{
			  show_share();
				}
		});
		//炫耀分享
		$("#show_share2").click(function(){
			if(window.Play68app){
				//安卓APP应用分享
              window.Play68app.WXShare('www.play68.com',SHARE_TITLE,SHARE_DESC,"http://play68.com/resources/images/logo.png");
			 // GAME_ICON = "http://play68.com/resources/images/logo.png";
             // GAME_URL = "www.play68.com";
			}else{
			  show_share();
				}
		});
			//元宵分享
		$("#show_share_3").click(function(){
			if(window.Play68app){
				//安卓APP应用分享
				SHARE_DESC=JS_MSG_60;
                SHARE_TITLE=JS_MSG_61;
              window.Play68app.WXShare('http://www.play68.com/?r=personal/yxhuodong',SHARE_TITLE,SHARE_DESC,"http://play.play68.com/cdm2/icon.png");
			
			}else{
			  show_share();
				}
		});
		
		
		
		
       //登录页面特效
	 
	 
	 
	 
	var _loginUi = function(){};
	_loginUi.prototype = {
	  	//登录用户名验证
      	loginFun : function() {
		    var self = this;
			self.name = $('#txtName').val();
			if ( /^[a-zA-Z0-9_]{6,12}$/.test(self.name) ){
				self.validName(function(ret){
					if( ret == 'ok' ){
						self.login();
					}else{
						$('#txtName').val(JS_MSG_1).css('color','red');
					}
				});
			}
			else{
			    $('#txtName').val(JS_MSG_2).css('color','red');
			};
		},
      	//注册用户名验证
	   	registerFun : function() {
		    var self = this;
			self.name = $('#txtName').val();
			if ( /^[a-zA-Z0-9_]{6,12}$/.test(self.name) ){
				self.validName(function(ret){
					if( ret == 'ok' ){
						setTimeout(function(){self.setFlowTips(JS_MSG_3);},500);
						$("#txtName").val(self.name);
						
					}else if(ret == 'not_found'){	
						self.register();
					}
				});
			} else{
					setTimeout(function(){self.setFlowTips(JS_MSG_4);},500);
					$("#txtName").val(self.name);
			};
		},
		

		
      //AJAX验证用户名
       	validName : function(callback) {
		var self = this;
		if (ISLOADING) return;
		 showLoading();
		$.ajax({
			url: '/?r=login/validname',
			type:'POST',
			data: {username:this.name},
			success: function(ret) {
				hideLoading();
				callback(ret);
			 },
			error: function(XHR, ErrorMsg) {
				//self.setTips('系统错误，请稍后再试');
			}
		  });
	     },
		 
        //显示登录页面
		show : function(){
			if(this.isLogin()){
				showLoading();
				window.location.href = "/?r=Personal/personal";
				return;
			}
			if( $(".login").length == 0 ){
				this.initUI("loginui");
			}
			$(".login").show();	
		},
		//隐藏登录页面
		hide : function(){
			$(".login").hide();
			$('.login').detach();//清空login
			$(".bottom .userbtn").attr('src','/resources/images/batton_geren.png');
		},
		//获取密码
		getPwd : function() {
			return $("#txtPwd").val();
		},
		//判断登录
		isLogin : function() {
			var isLogin = false;
			if (ISLOADING) return;
			showLoading(); 
			$.ajax({
			    type: "POST",
			    url: "/?r=Login/islogin",
			    async: false,
			    success: function(ret){
					hideLoading();  
					isLogin = ret == '1';
			    }
			});
			return isLogin;
		},
		//登录
		login : function() {
			var self = this;
			if (ISLOADING) return;
			showLoading();
			if($("#txtPwd").val()==''){
				hideLoading();
				setTimeout(function(){self.setFlowTips(JS_MSG_6);},500);
				return;
			}
			
			$.ajax({
				url:'/?r=login/login',
				type:'post',
				data: {username:self.name, pwd:self.getPwd()},
				success: function(ret){
					hideLoading();
					//console.log(ret);
					if(ret == 'ok'){
						setTimeout(function(){self.hidepwd();},500);
						setTimeout(function(){self.setFlowTips(JS_MSG_7);},500);
						setTimeout(function(){window.location.href = "/?r=Personal/personal";},800);	
					}else if(ret=='not_found'){
						$("#txtPwd").val('');
						setTimeout(function(){self.setFlowTips(JS_MSG_8);},500);
						 return;
					}else if(ret=='restricted'){
						setTimeout(function(){self.setFlowTips(JS_MSG_29);},500);
						 return;
					}
				},
				dataType:''}
			);
		},
	    //注册
		register : function() {	
			var self = this;
			var pwd1 = $("#txtPwd").val();
			var pwd2 = $("#txtPwd").val();
			if(/^[a-zA-Z0-9_]{6,12}$/.test(pwd1) && /^[a-zA-Z0-9_]{6,12}$/.test(pwd2)){
		
				if(pwd1==''){
					  self.setFlowTips(JS_MSG_6);
					  return;
				}
				if(pwd2==''){
					  self.setFlowTips(JS_MSG_9);
					  return;
				}
				if(pwd1 != pwd2){
					 self.setFlowTips(JS_MSG_10);
					 $("#txtPwd").val('');
					 $("#txtPwd").val('');
					 return;
				}
				
				if (pwd1 != "" && pwd2 === pwd1) {
					$(".mm p").text('');
					if (ISLOADING) return;
					showLoading();
					$.ajax({
						url: '/?r=login/register',
						type: 'POST',
						data: {username:this.name, pwd:pwd1},
						success: function(ret){
							//console.log(ret);
							 hideLoading();
							if(ret == 'error') {
								return;
							}
							if(ret=='ok'){
								setTimeout(function(){self.hidepwd();},500);
								setTimeout(function(){self.setFlowTips(JS_MSG_12);},500);
								setTimeout(function(){window.location.href = "/?r=Personal/personal";},800);
							}
						},
						dataType:''
					});
				}
				else {
								setTimeout(function(){self.setFlowTips(JS_MSG_10);},500);
					
					
				}
			}else{
				self.setFlowTips(JS_MSG_13);
				$("#txtPwd").val('');
			    $("#txtPwd").val('');
				return;	
			}
		},
	    //修改密码
		updatepwd : function(){
    
			var self = this;
			self.name=$("#user_name").text();
			self.id=getCookie('play68_user_id');
			//self.name=$("#username_hide").val();
			self.pwd=$("#txtRegPwd").val();
			self.pwd1 = $("#txtRegPwd1").val();
			self.pwd2 = $("#txtRegPwd2").val();
			if(/^[a-zA-Z0-9_]{6,12}$/.test(self.pwd1) && /^[a-zA-Z0-9_]{6,12}$/.test(self.pwd2)){
			
				if(self.pwd1==''){
					  self.setFlowTips(JS_MSG_62);
					  return;
				}
				if(self.pwd2==''){
					  self.setFlowTips(JS_MSG_9);
					  return;
				}
				if(self.pwd1 != self.pwd2){
					 self.setFlowTips(JS_MSG_10);
					 $("#txtRegPwd1").val('');
					 $("#txtRegPwd2").val('');
					 return;
				}
				if (ISLOADING) return;
				showLoading();
				$.ajax({
					url:'/?r=login/getpwd',
					type:'POST',
					data: {username:self.name, pwd:self.pwd, pwd1:self.pwd1, pwd2:self.pwd2},
					success: function(ret){
						hideLoading();
						if(ret =='errorpass'){
							self.setFlowTips(JS_MSG_63);
							$("#txtRegPwd").val('');
							
						}else if(ret =='update_ok'){
							self.setFlowTips(JS_MSG_64);
							self.hidepassword();
						}	
					},
					dataType:''}
				);
			}else{
				self.setFlowTips(JS_MSG_13);
				$("#txtRegPwd1").val('');
			    $("#txtRegPwd2").val('');
				return;	
			}	
		},
		
		//隐藏修改密码框
		hidepassword:function(){
			$(".password").hide();
			
		},
		
	//用户昵称验证
	validnickName : function(callback) {
		var self = this;
		self.id=getCookie('play68_user_id');
		
		showLoading();
		$.ajax({
			url: '/?r=login/validnickname',
			type:'POST',
			data: {username:this.name},
			success: function(ret) {
				hideLoading();
				callback(ret);
			},
			dataType:''
		 });
		},
		//验证更改昵称
	    changenickname : function() {
			
			var self=this;
			self.name = $('.shuru .text').val();
			if ( /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,6}$|^[_a-zA-Z0-9]{4,12}$/.test(self.name) ) {
				self.validnickName(function(ret){
					
					if( ret == 'ok' ){
						hideLoading();
						$('.errormsg').text(JS_MSG_65).css('color','red');
					}else if(ret =='not_found'){
					
					    self.updatenickname();
					
					}
				});
			}
			else{
				     hideLoading();
				    $('.errormsg').text(JS_MSG_66).css('color','red');
				  
			    }
		},
	     
		//最终修改昵称
		updatenickname : function() {

			
		var self = this;
		self.username=$("#user").text();
		self.name=$('.shuru .text').val();
		var nickname=$(".txtName").val();
		if (ISLOADING) return;
		showLoading(); 
		$.ajax({
			url: '/?r=login/updatenickname',
			type:'POST',
			data: {username:self.username,nickname:self.name,user_id:self.id},
			dataType:"",
			success: function(ret) {
				 hideLoading();
				if(ret == 'ok') {
					self.setFlowTips(JS_MSG_67);	 
      setTimeout(function(){window.location.href = "/?r=Personal/personal";},500)
							
			
					
				}else{
					$('.errormsg').text(JS_MSG_68).css('color','red');
					return;
					
				}
			}
		});
	},
		 
		 
		 
	    //退出
	    logout:function(){
	     var self=this;
		 self.loginout();
		 self.hideloginout();
		 
		 },
		  
		  
		loginout:function(){ 
	    	var self = this;
		if (ISLOADING) return;	
		showLoading();
		$.ajax({
			url:'/?r=login/loginout',
			type:'post',
			data: '',
			success: function(ret){
				hideLoading();
				if(ret == 'ok'){
					self.setFlowTips(JS_MSG_14);
					//$(".bottom .userbtn").attr('src','/resources/images/batton_geren.png');
					setTimeout(function(){
					  window.location.href='/';
					},2000)
				}else{
					return;
				}
			  },
			
			dataType:''}
		  );
		},
	    //显示修改密码框
		showupdatepwd:function(){
			var self=this;
			if( $(".password").length == 0 ){
				this.personalUI('updatepass');
			}
			//self.showpwd('updatepwd');
			
		},
		
		//显示退出框
		showlonginout:function(){
			if( $(".exit").length == 0 ){
				this.personalUI('loginout');
			}
			$(".exit").show();
			
		},
		//隐藏退出框
		hideloginout:function(){
			$(".exit").hide();
			
		},
		
		//隐藏密码框
		hidepwd:function(){
			var self=this;
			this.tmpPwd=null;
            $(".possword").hide();
			$(".mm p").text(JS_MSG_6);
		},
		//显示注册框
		showzhuce : function(){
			if( $(".zhuce").length == 0 ){
				this.initUI('zhuce');
			}
			$(".login").hide();	
			$(".zhuce").show();
		},
		//隐藏注册框
		hidezhuce:function(){
		
            $(".zhuce").hide();

		},
		//信息提示框
		setFlowTips : function(msg) {
		if( !this.fTips ){
			this.fTips = $("<div class='login_flow_box'></div>").appendTo($(document.body));		
		}
		this.fTips.html(msg).show();
		var self = this;
		setTimeout(function(){self.fTips.html('').hide()}, 2000);
	},	
	    setFlowTipsByTime : function(msg,time) {
		if( !this.fTips ){
			this.fTips = $("<div class='login_flow_box'></div>").appendTo($(document.body));		
		}
		this.fTips.html(msg).show();
		var self = this;
		setTimeout(function(){self.fTips.html('').hide()}, time);
	},	
	    //显示banner下载框
	    pcdown : function(){
			
			if( $(".out_pcdown").length == 0 ){
				this.PcDownUI("pcdown");
			}
			$(".out_pcdown").show();		
		},
	    //显示IE8以下下载框
	    erweima : function(){
			
			if( $(".erweima").length == 0 ){
				this.PcDownUI("erweima");
			}
			$(".erweima").show();		
		},
		
        //公共页面弹出框初始化
		initUI : function(Action, callback){
			if (ISLOADING) return;
			showLoading();
			var cpsList = /&cps=([^&]*)/i.exec(location.href);
			var cps = '';
			if(cpsList && cpsList.length == 2) {
				cps = cpsList[0];
			}
			$.ajax({
				url:"/?r=login/loginui&action="+Action+"&uri="+escape(window.location.href)+cps,
				dataType: "html",
				success: function(Data){
					hideLoading();
					$(".nav").before(Data);
					if(typeof callback == "function")
						callback();
				}
			});
		 	
		},
		//加载个人页面弹出框初始
	  	personalUI : function(Action, callback){
			if (ISLOADING) return;
			showLoading();
			$.ajax({
				url:"/?r=login/loginui&action="+Action,
				dataType: "html",
				success: function(Data){
					hideLoading();
					$(".personal").before(Data);
					if(typeof callback == "function")
						callback();
				}
			});
			
		 	
		},
		//banner下载弹出框初始化
		PcDownUI : function(Action,callback){
//			if (ISLOADING) return;
			showLoading();
			$.ajax({
				url:"/?r=login/loginui&action="+Action,
				dataType: "html",
				success: function(Data){
					hideLoading();
					$(".nav").before(Data);
					if(typeof callback == "function")
						callback();
				}

			});
		 	
		},
		
		//抽奖调用
		 actlz : function(){
			
			if( $(".shengj").length == 0 ){
				this.ActlzUI("shengj");
			}
			$(".shengj").show();		
		},
		//抽奖调用2
		 actlz2 : function(){
			
			if( $(".shengj").length == 0 ){
				this.ActlzUI("shengj2");
			}
			$(".shengj").show();		
		},
		//抽奖调用3
		 actlz3 : function(){
			
			if( $(".shengj").length == 0 ){
				this.ActlzUI("shengj3");
			}
			$(".shengj").show();		
		},
		//抽奖调用4
		 actlz4 : function(){
			
			if( $(".shengj").length == 0 ){
				this.ActlzUI("shengj4");
			}
			$(".shengj").show();		
		},
		//抽奖框初始化
		ActlzUI : function(Action,callback){
			if (ISLOADING) return;
			showLoading();
			$.ajax({
				url:"/?r=login/loginui&action="+Action,
				dataType: "html",
				success: function(Data){
					hideLoading();
					$(".nav").before(Data);
					if(typeof callback == "function")
						callback();
				}
			});
		 	
		}		
		
		
		
	};
	window.LoginUi = new _loginUi();

	//获取经验，升级特效
 var _getExpUi=function(){}
 	_getExpUi.prototype = {

 		show : function(){

 		}
 	}

})


		
//公共返回函数
function trunIndex(){
	if(document.referrer){
		window.location.href=document.referrer;
	 }else{
		window.location.href='/';
     }
}
//游戏页面调用方法
function playgame(link,id,name,code){
	if(name == '0烧脑大合集'){
		_czc.push(["_trackEvent","专题","0烧脑大合集","","",""]);
		setTimeout(function(){
		   window.location.href='/?r=search/search2/search/0烧脑合集';
		},200);
		hideLoading();
		return;
	}
	if(name == '虐心大合集'){
		_czc.push(["_trackEvent","专题","虐心大合集","","",""]);
		setTimeout(function(){
		   window.location.href='/?r=search/search2/search/虐心合集';
		},200);
		hideLoading();
		return;
	}
	if(code == '' || code == 'undefined'){
       
   	}else{
      link='/play/'+code;
   	}

   	//if(isWeixin() && code!='wyft' && code!='superhero' && window.location.hostname == "www.play68.com" && !/^ly_/i.test(code)){
   	//	var hostAarr = [
		//	".g.szxiaoya.com",
		//	".g.szszdhb.com",
		//	".g.boao-hz.com",
		//	".g.66shundai.com",
		//	".g.my3dshare.com",
		//	".g.qinziyy.com",
		//	".g.zh100fen.com",
		//	".g.hytc0754.com",
		//	".g.gzlingxin.com"
	   //	];
	   //	var n = Math.round(Math.random()*10000) % hostAarr.length;
	   //	var rand = Math.floor(Math.random() * 10000000000);
	   //	var url = "http://" + rand + hostAarr[n] + link;
	   //	window.location.href = url;
   	//}
   	//else {
   	//	window.location.href = link;
   	//}
   	window.location.href = link;
}

//获取字符串的个数

function getBytesCount(str){ 
	var bytesCount = 0; 
	if (str != null){ 
	for (var i = 0; i < str.length; i++){ 
	    var c = str.charAt(i); 
	  if (/^[\u0000-\u00ff]$/.test(c)){ 
	    bytesCount += 1; 
	  }else{ 
	    bytesCount += 2; 
		  } 
		} 
	  } 
	return bytesCount; 
  }

//获取搜索文本内容
function getSearchText(){
	var searchs=$('.text1').val().trim();
	
	
	window.location.href='/?r=Search/search2/search/'+searchs;
	
	}

    //除游戏面与成就页分享外的分享语句
	//GAME_URL='www.play68.com';
	GAME_ICON='http://'+window.location.hostname+'/resources/images/logo.png';
	SHARE_DESC="最好玩的小游戏就在68微游戏";
	SHARE_TITLE='68微游戏数百款游戏即点即玩，还不赶紧任性一下~';
		
	//图片预加载
var navImgUrls = ['/resources/images/mima/batton_guanbi_1.png','/resources/images/mima/batton_guanbi.png','/resources/images/choujiang/zhongjiang_2.png','/resources/images/choujiang/zhongjiang_3.png','/resources/images/loding.png','/resources/images/xijie/loading.png'];
var _loadImgs = [];
    function preLoadImage(index,imgLength){
           // console.log('预加载图片代码启动');
            var img  =  new Image();//生成一个img对象

			img.src = navImgUrls[index];//img对象的src属性指向当前被循环到的url
            img.onload = function(){//监听img的onload函数
                _loadImgs[index] = img;//img加载结束以后把这个img对象替代这个url字符型，这样你就不用再另起一个数组存放这个img对象了
              //  console.log('第'+index+'个img被预加载');
                index++;//index加1，表示要开始加载下一张图片
				
                if(index < imgLength){//如果没有超过数组长度的话，继续加载下一张图片
                    preLoadImage(index,imgLength);

                }
				
            }
			
    }
 preLoadImage(0,navImgUrls.length);
 
 //加载提示
 function showLoading() {
	 
	 if(!APPplay68()){
	    window.ISLOADING=true;
		var img = $("<img id='loading' src='/resources/images/loding.png' style='width:64px;height:64px;'/>");
		var h = (document.documentElement.clientHeight-64)/2;
		var w = (document.documentElement.clientWidth-64)/2;
		img.css("position","fixed")
			.css("top",h)
			.css("left",w)
			.css("z-index","9999999")
			.appendTo($(document.body));
		var an = 0;
		window.loadTimer = setInterval(function(){
			img.css("transform", "rotate("+an+"deg)");
			an += 15;
		}, 40);
	 }
}
function hideLoading(){
	if(!APPplay68()){
		window.ISLOADING=false;
		$('#loading').remove();
		clearInterval(window.loadTimer);
	}
}
 
 //搜索获取焦点时隐藏底部失去焦点的时候显示
 $(document).ready(function(e){
	if( /android|iphone|ipod|ipad|blackberry|meego|symbianos|windowsphone|ucbrowser/i.test(navigator.userAgent) ){
	 $(".text1").focus(function(){
		        
              $(".bottom").hide();
            }).blur(function(){
			
               $(".bottom").show();
            });

     }
	
	})
//反馈页获取焦点时隐藏底部失去焦点的时候显示
 $(document).ready(function(e){
	if( /android|iphone|ipod|ipad|blackberry|meego|symbianos|windowsphone|ucbrowser/i.test(navigator.userAgent) ){
	 $("#textarea").focus(function(){
		        
              $(".bottom").hide();
            }).blur(function(){
			
               $(".bottom").show();
            });

     }
	
	})
//加载loading
$(document).ready(function(e) {
	if( /android|iphone|ipod|ipad|blackberry|meego|symbianos|windowsphone|ucbrowser/i.test(navigator.userAgent) ){
			if( /android|blackberry|meego|symbianos|windowsphone|ucbrowser/i.test(navigator.userAgent)  ){
				 
					 $('a').click(function(){
						 if($('.anddown').attr("href")== window.appdownload || $('.anddown').attr("href")=='http://a.app.qq.com/o/simple.jsp?pkgname=com.play68' || $('.anddown').attr("href")=='http://shang.qq.com/wpa/qunwpa?idkey=db4c2638a22a9ab95357feb006365228ca41d42f3de53fa65ebaa6f84c5216df' || $('.anddown').attr("href")=='http://a.app.qq.com/o/simple.jsp?pkgname=com.play68&f=wx' || $('.anddown').attr("href")== window.iosdownload){
						
						 }
						 else{ 
						  showLoading();
						 }
					  });
				
			}else{
					$('a').click(function(){
						if(IOSplay68() || window.iosplay68){
						
						}else{
						   showLoading();
						}
					});
			}
	}else{
		            $('a').click(function(){
		                  showLoading();
				});
	}
	
})
//获取cookie值
function getCookie(name) {    
 var nameEQ = name + "=";    
 var ca = document.cookie.split(';');    //把cookie分割成组    
 for(var i=0;i < ca.length;i++) {    
 var c = ca[i];                      //取得字符串    
 while (c.charAt(0)==' ') {          //判断一下字符串有没有前导空格    
 c = c.substring(1,c.length);      //有的话，从第二位开始取    
 }    
 if (c.indexOf(nameEQ) == 0) {       //如果含有我们要的name    
 return unescape(c.substring(nameEQ.length,c.length));    //解码并截取我们要值    
 }    
 }    
 return false;    
}   


function getmessage(flag){
   var flag = flag || 0;
   $.ajax({
   type: "POST",
   url: "index.php?r=Mymessage/check_mess",
   data: "",
   success: function(msg){
    
    if(msg == 1){
      if (flag) {
		  $("#message").html('<span class="hongdian" style="position:absolute; top:0; right:0%"></span>');
      } else {
    	  $("#mess").html(" <span class='hongdian' style='position:absolute; top:0; right:30%'></span>");
    	  $("#message").html(" <span class='hongdian' style='position:absolute; top:0; right:30%'></span>");
      }
     }
   }
   });
}

function go_back(){
  window.location.href=document.referrer;	
}
/**
 * 聊天消息列表，检查是否有未读消息
 */
function checkWebMsg(flag){
	   var flag = flag || 0;
	   $.ajax({
	   type: "POST",
	   url: "/?r=Mymessage/checkWebMsg",
	   data: "",
	   dataType:'json',
	   success: function(data){
	    if(data.errcode == 0){
	      if (flag) {
	    	  if (flag == 2) {
	    		  $("#message").html('<span class="hongdian" style="position:absolute; top:0; right:0%"></span>');
	    	  } else {
	    		  $("#message").html('<span class="hongdian" style="position:absolute; top:0; right:30%"></span>'); 
	    	  }
	      } else {
	    	  $("#mess").html(" <span class='hongdian' style='position:absolute; top:0; right:30%'></span>");
	    	  $("#message").html(" <span class='hongdian' style='position:absolute; top:0; right:30%'></span>");
	      }
	     }
	   }
	   });
}
/**
 * 聊天消息列表，更新UI消息模版
 */
function updateUItpl(from_id,headimg,nickname,time,msg,className,is_kefu) {
	var is_kefu = is_kefu || 0;
	var kefuStr = is_kefu ? '<i style="width:22%; display:inline-block;"><img src="/resources/images/liaotian/kefu.png"></i>' : '';
	var name = className || 'content';
	var onclick = name == 'content' ? 'goTalk' : 'goTalkForMenu';
	var str = '<div class="'+name+'" id="contenta_'+from_id+'" data-headimg="'+headimg+'" data-nickname="'+nickname+'" data-fromid="'+from_id+'" data-time="'+time+'" onclick="'+onclick+'('+from_id+',1);">'+
	'<div class="content1">'+
	'<img src="'+headimg+'" width="91" height="91">'+
	'<span style="position:absolute; top:20%; left:95%;" class="hongdian"></span>'+
	'</div>'+
	'<div class="content2">'+
	'<a>'+
	'<p>'+
	'<span class="name_1">'+nickname+kefuStr+'</span>'+
	'<span class="shijian">'+time+'</span>'+
	'</p>'+
	'<p>'+msg+'</p>'+
	'</a>'+
	'</div>'+
	'<p class="clear"></p>'+
	'</div>';
	return str;
}
/**
 * 聊天消息列表，格式化时间
 */
function updateUIForTime(t) {
	var time = t  || 0;
	time = time * 1000;
	var myDate = new Date(time);
	var day = myDate.getDate(); //从 Date 对象返回一个月中的某一天 (1 ~ 31)。
	var mon = myDate.getMonth() //从 Date 对象返回月份 (0 ~ 11)。
	var h = myDate.getHours();//获取当前小时数(0-23)
	var m = myDate.getMinutes();//获取当前分钟数(0-59)
	day = day < 10 ? '0'+day : day;
	mon = mon+1;
	mon = mon < 10 ? '0'+mon : mon;
	h = h < 10 ? '0'+h : h;
	m = m < 10 ? '0'+m : m;
	var str = mon+'-'+day+' '+h+':'+m;
	return str;
}
/**
 * 吐司提示层
 */
function toast(text,time){
	var showTime = time || 1000;
	var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	$("<p/>").appendTo('body').addClass("tancheng_time").height(h);
	$("<span/>").appendTo('.tancheng_time').text(text);
	setTimeout(function() {
		$(".tancheng_time").remove();
	},showTime);
		
}
/**
 * 聊天页 格式化时间
 */
function formatTime() {
	var myDate = new Date();
	var h = myDate.getHours();//获取当前小时数(0-23)
	var m = myDate.getMinutes();//获取当前分钟数(0-59)
	var str = '';
	if (m < 10) {
		m = '0'+m;
	}
	if (h <= 12) {
		h = h < 10 ? '0'+h : h;
		str = '上午 '+h+':'+m;
	} else if (h > 12 && h <= 19) {
		str = '下午 '+h+':'+m;
	} else {
		str = '晚上 '+h+':'+m;
	}
	return str;
}
/**
 * 跳转到聊天页
 * @param friendid
 */
function goTalk(friendid,is_messageList) {
	 var fid = friendid || 0;
	 var is_messageList = is_messageList || 0;
	 window.location.href="/?r=mymessage/talk/id/"+fid+"/is_messageList/"+is_messageList+'#new_xinx';
}
/**
 * 排行榜中的列表页跳转到聊天页
 * @param friendid
 */
function goTalkForMenu(friendid,is_messageList) {
	 var fid = friendid || 0;
	 var is_messageList = is_messageList || 0;
	 showLoading();
	 $.ajax({
			url: '/?r=mymessage/talk',
			type:'POST',
			data: {flag:1,id:fid,is_messageList:is_messageList},
			success: function(data) {
				$('.empty').html(data);
				$(".footer .content1").hide();
				$('.footer .myliaotian').css('display','block');
			},
			complete: function() {
				hideLoading();
			}
	});	
};
function isURL(str) {
	var re = /(http:\/\/|https:\/\/)?(www\.)?((?:[A-Za-z0-9]+\.)+)([A-Za-z0-9_]+)(\/[A-Za-z0-9]+\?[A-Za-z0-9]+\=[A-Za-z0-9_]+|\/[A-Za-z0-9_]+\/[A-Za-z0-9_]+)?/;
	var result = re.test(str);
	return result;
}
function replaceURL(str) {
	var re = /【(.*)】/;
	return str.replace(re,"<a href='$1'>$1</a>");
	
}
//
// $(function(){
// 	var d = $('.nav .top:has(img[src$="bg_biaoti.png"])');
// 	if(d.length>0){
// 		d.remove();
// 	}
// 	console.log(d);
// });
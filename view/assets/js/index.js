$(function() {

	$('.icon-box').click(function() {
		$('.left-tab').css('left', '-340px');
		$('.mask').fadeOut();
	})

	//搜索自动提示 事件
	$('#keywork').keyup(function() {
		$('.fluid_soso').fadeOut(200);
		var keywork = $(this).val();
		//console.log(keywork);
		if (!keywork) {
			$('.search-auto').hide();
		} else {
			$('.search-auto').show();
			//用ajax来实现输出 ul li
			//$.ajax();
		}
	})
	//自动提示关键词 按键上下事件 跟上面ajax内有相关关联
	//-----------start----------
	key_down = 0;
	$(document).keydown(function(event) {
		switch (event.keyCode) {
		case 40:
			num = $('.search-auto li').size() - 1;
			$('.search-auto li').css('background-color', '#fff').eq(key_down).css('background-color', '#f7f7f7');
			var text = $('.search-auto li').eq(key_down).attr('data-key');
			$('.form-control').val(text);
			if (key_down < num) {
				key_down++;
				key_up = key_down - 1;
			} else {
				key_down = 0;
			}
			//console.log('下'+key_down+'上'+key_up);
			break;
		case 38:
			if (key_up >= 1) {
				key_up--;
				key_down = key_up + 1
			} else {
				key_up = num;
			}
			$('.search-auto li').css('background-color', '#fff').eq(key_up).css('background-color', '#f7f7f7');
			var text = $('.search-auto li').eq(key_down).attr('data-key');
			$('.form-control').val(text);
			//console.log('下'+key_down+'上'+key_up);
			break;
		case 27:
			key_down = 0;
			$('.search-auto').remove();
			break;
		case 13:
			key_down = 0;
			$('.search-auto').remove();
			break;
		};
	});
	//--------------end--------------

	//触发输出到input内
	$('.search-auto li').click(function() {
		var text = $(this).attr('data-key');  //获取关键字
		$('.form-control').val(text); // 传值到搜索表单里
		$('.search-auto').hide();  //隐藏自动提示
	})


	//展开检索更多条件
	$('#dropdown').click(function() {
		$('.search-auto').hide();
		$('.fluid_soso').toggle();
		
	})
	//美化滚动条
	$('.scrollbar-rail').scrollbar({
		//disableBodyScroll:true,
	});

	//部门检索触发
	select('#bumen dl dd');
	//作品分类触发
	select('#fenlei dl dd');
	//广告主触发
	select('#guanggao dl dd');
	//品牌触发
	select('#pinpai dl dd');
	//创建日期
	select('#adddate dl dd');
	//我的作品
	select('#myhome dl dd');


	//检索hover 封装
	function select(id){
		$(id).click(function(){
			$(id).removeClass('selected');
			$(this).addClass('selected');
			if(id == '#bumen dl dd'){
				$('#fenlei dl dd').removeClass('selected').eq(0).addClass('selected');
				$('#guanggao dl dd').removeClass('selected').eq(0).addClass('selected');
				$('#pinpai dl dd').removeClass('selected').eq(0).addClass('selected');
				$('#adddate dl dd').removeClass('selected').eq(0).addClass('selected');
				$('#myhome dl dd').removeClass('selected').eq(0).addClass('selected');
			}			
		});
	}

	// //检索 我的作品 触发执行
	// $('#myhome dl dd').click(function(){
	// 	var i = $(this).index();
	// 	if(i == ''){
	// 		$('.soso-type').val('0');
	// 		return false;
	// 	}
	// 	$('.soso-type').val(i);
	// });

	$('#soso-list').click(function(){
		var posts = $('#from-get').serialize();
		var key = $('#keywork').val();
		//console.log(posts);
		window.open('./search.html?'+posts+'&keyword='+key);
	})


	// 多选标签功能
	$('#select-tag ul li span').click(function(){
		var color_bg = $(this).css('background-color');
		console.log(color_bg);
		if(color_bg == "rgb(150, 150, 150)"){
			$(this).css({"background-color":"#5cb85c"});
		}else{
			$(this).css({"background-color":"#969696"});
		}

	});
	//上传作品文件
	function upload_list(){
		var uploader = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4', //顺序不可随便调
		browse_button : 'pickfiles', // 选择文件
		container: document.getElementById('container'), // DOM 容器
		url : './upload.php',
		flash_swf_url : './Moxie.swf', //解决不同的低版本浏览器达到兼容的问题
		silverlight_xap_url : './Moxie.xap',
		
		filters : {
			max_file_size : '10mb', //最大容量
			mime_types: [
				{title : "Image files", extensions : "jpg,png,mp4,mp3"}   //允许上传格式
			]
		},

		init: {  //初始化
			//执行完成后触发
			PostInit: function() {
				document.getElementById('filelist').innerHTML = '';
			},

			FilesAdded: function(up, files) {
				document.getElementById('error').innerHTML = '';
				plupload.each(files, function(file,i) {
					//console.log(files[i].type);
					//document.getElementById('filelist').innerHTML += '<div class="img-thumbnail" id="' + file.id + '"> <b></b></div>';
					if(files[i].type == 'video/mp4'){
						$('#filelist').prepend('<div class="img-thumbnail" id="' + file.id + '"> <b></b></div>');
						$('#'+files[i].id).prepend('<i class="glyphicon glyphicon-remove delete-img"></i><img src="./assets/img/uplay.jpg" /><br/>');
					}else{
						previewImage(files[i],function(imgsrc){
							$('#filelist').append('<div class="img-thumbnail" id="' + file.id + '"> <b></b></div>');
							$('#'+files[i].id).prepend('<i class="glyphicon glyphicon-remove delete-img"></i><img src="'+ imgsrc +'" /><br/>');
						})
					}
				});
				//清除上传图片
				$('.delete-img').click(function(){
					var id = $(this).parent().attr('id');
					console.log(id);
					$('#'+id).remove();
					 for (var i in uploader.files) {
	                    if (uploader.files[i].id === id) {
	                        uploader.files.splice(i, 1);
	                    }
	                }
					console.log(uploader.files);
				});
				uploader.start();  //选择完成文件后 立马触发上传
			},
			UploadProgress: function(up, file) {
				//$('.delete-img').remove(); //关闭图标
				document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
				document.getElementById('error').innerHTML = '正在上传中....';
			},
			FileUploaded : function(up,file,cak){
				// console.log(file);  上传完成一张图片触发
				$('#'+file['id']+' b').remove(); //上传100%之后 清除遮罩
				$('#'+file['id']).css('border','1px solid #1CFD01');
				document.getElementById('error').innerHTML = '';
			},
			UploadComplete: function(up,file){
				if(file == ''){
					layer.msg('没有文件可上传', {icon: 0});
				}else{
					layer.msg('上传文件全部完成', {icon: 1});
				}
			},
			Error: function(up, err) {
				document.getElementById('error').innerHTML = err.message;
			}
		}
	});
	uploader.init();
	}
	upload_list(); //初次打开首页 立即实例化上传作品模块


	//上传之前预览作品图片
	function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
		if(!file || !/image\//.test(file.type)) return; //确保文件是图片
		if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
			var fr = new mOxie.FileReader();
			fr.onload = function(){
				callback(fr.result);
				fr.destroy();
				fr = null;
			}
			fr.readAsDataURL(file.getSource());
		}else{
			var preloader = new mOxie.Image();
			preloader.onload = function() {
				preloader.downsize( 100, 100 );//先压缩一下要预览的图片,宽100，高100
				var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
				callback && callback(imgsrc); //callback传入的参数为预览图片的url
				preloader.destroy();
				preloader = null;
			};
			preloader.load( file.getSource() );
		}	
	}

	//裁剪图片
	$("#clipArea").photoClip({
		width: 300,
		height: 300,
		file: "#file",
		view: "#view",
		ok: "#clipBtn",
		loadStart: function() {
			console.log("照片读取中");
		},
		loadComplete: function() {
			$('#clipArea').css({"position":'static',"display":'block'});
			$('#clipBtn').css("display","block");
			console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {
			$('#clipArea,#clipBtn').hide();
			$('#view').show();
			console.log(dataURL);
		}
	});
})
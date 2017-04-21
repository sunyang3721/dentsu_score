$(function() {
	//判断登陆
	function check_login(){
		$.ajaxSetup({   
		   contentType:"application/x-www-form-urlencoded;charset=utf-8",   
		   complete:function(XMLHttpRequest,textStatus){ 
		     var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
		         if(sessionstatus=="timeout"){ 
		        	//alert("登录超时,请重新登录！");
					//如果超时就处理 ，指定要跳转的页面  
					window.location.replace("./userLoginCheck.do");   
					//location.reload();
		        }   
		      }   
		 })
	}

	// $('.icon-box').click(function() {
	// 	$('.left-tab').css('left', '-340px');
	// 	$('.mask').fadeOut();
	// })

	//搜索自动提示 事件 待补充
	// $('#keywork').keyup(function() {
	// 	$('.fluid_soso').fadeOut(200);
	// 	var keywork = $(this).val();
	// 	//console.log(keywork);
	// 	if (!keywork) {
	// 		$('.search-auto').hide();
	// 	} else {
	// 		$('.search-auto').show();
	// 		//用ajax来实现输出 ul li
	// 		//$.ajax();
	// 	}
	// })
	//自动提示关键词 按键上下事件 跟上面ajax内有相关关联
	//-----------start----------
	key_down = 0;
	// $(document).keydown(function(event) {
	// 	switch (event.keyCode) {
	// 	case 40:
	// 		num = $('.search-auto li').size() - 1;
	// 		$('.search-auto li').css('background-color', '#fff').eq(key_down).css('background-color', '#f7f7f7');
	// 		var text = $('.search-auto li').eq(key_down).attr('data-key');
	// 		$('.form-control').val(text);
	// 		if (key_down < num) {
	// 			key_down++;
	// 			key_up = key_down - 1;
	// 		} else {
	// 			key_down = 0;
	// 		}
	// 		//console.log('下'+key_down+'上'+key_up);
	// 		break;
	// 	case 38:
	// 		if (key_up >= 1) {
	// 			key_up--;
	// 			key_down = key_up + 1
	// 		} else {
	// 			key_up = num;
	// 		}
	// 		$('.search-auto li').css('background-color', '#fff').eq(key_up).css('background-color', '#f7f7f7');
	// 		var text = $('.search-auto li').eq(key_down).attr('data-key');
	// 		$('.form-control').val(text);
	// 		//console.log('下'+key_down+'上'+key_up);
	// 		break;
	// 	case 27:
	// 		key_down = 0;
	// 		$('.search-auto').remove();
	// 		break;
	// 	case 13:
	// 		key_down = 0;
	// 		$('.search-auto').remove();
	// 		break;
	// 	};
	// });
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


	//创建日期
	select('#adddate dl dd');
	//我的作品
	select('#myhome dl dd');

	//检索hover 封装
	function select(id){
		$(id).click(function(){
			$(id).removeClass('selected');
			$(this).addClass('selected');		
		});
	}

	//部门 广告主 品牌 联动  -----新增作品
	mediy();
	function mediy(){
		$.ajax({
			url:'initUploadSelectList.do',
			dataType:'json',
			type:'post',
			data:{},
			success:function(data){
				$.each(data['awardInfoList'],function(key,value){
					$('#awardId').append('<option value ='+value['m_awardId']+'>'+value['m_awardName']+'</option>');
				})
				$('#awardId').selectpicker('refresh');
				//遍历部门关联
				$.each(data['departmentList'],function(key,value){
					$('#departmment').append('<option value ='+value['m_departmentId']+'>'+value['m_departmentName']+'</option>');
				});
				$('#departmment').selectpicker('refresh');
				//选择部门事件触发
				$('#departmment').on('changed.bs.select',function(){
					var m_departmentId = $(this).val(); //部门 id

					// 修复bug  选择完品牌之后 切换部门  品牌就一直存在
					$('#brandsInfo').empty().append('<option value="">请选择品牌</option>');
					$('#brandsInfo').selectpicker('refresh'); //刷新品牌select

					$.ajax({
						url:'selectAdvertiserList.do',  //获取广告主列表
						dataType:'json',
						type:'post',
						data:{departId:m_departmentId},
						success:function(datas){
							$('#advertiser').empty().append('<option value="">请选择广告主</option>');
							$.each(datas['advertiserList'],function(key,value){
								//遍历广告主列表
								$('#advertiser').append('<option value='+value['m_advertiserId']+'>'+value['m_advertiserName']+'</option>');
							});
							$('#advertiser').selectpicker('refresh'); //广告主刷新
							$('#advertiser').on('changed.bs.select',function(){
								var m_advertiserId = $(this).selectpicker('val'); //获取广告主的值
								if(m_advertiserId == ''){  //不可初始化品牌
									$('#brandsInfo').empty().append('<option value="">没有该广告主的品牌信息</option>');
									$('#brandsInfo').selectpicker('refresh');
									return false;
								}
								$.ajax({
									url:'selectBrandsList.do',
									dataType:'json',
									type:'post',
									data:{advertId:m_advertiserId,departId:m_departmentId},
									success:function(brdata){
										$('#brandsInfo').empty();
										if(brdata.status == '200'){
											//alert('ss');
											$.each(brdata['brandsInfoList'],function(key,value){
												$('#brandsInfo').append('<option value='+value['m_brandId']+'>'+value['m_brandName']+'</option>');
											});
										}else{
											$('#brandsInfo').append('<option value="">没有该广告主的品牌信息</option>');
										}
										$('#brandsInfo').selectpicker('refresh'); //刷新品牌select
									}
								})								
							})
						}
					});
				})
				//遍历标签功能
				$.each(data['worksLabelList'],function(key,value){
					$('#select-tag').append(function(){
						var html = '<p>'+value['m_labelName']+'</p>';
							html +='<ul class="list-inline">';
							$.each(value['worksLabelList'],function(k,v){
								html += '<li><span  data-id='+v['m_labelCode']+'>'+v['m_labelName']+'</span></li>';
							});
							html += '</ul>';
						return html;

					})
				});
				//多选标签功能
				$('#select-tag ul li span').click(function(){
					var color_bg = $(this).css('background-color');
					if(color_bg == "rgb(150, 150, 150)"){
						$(this).css({"background-color":"#5cb85c"});
						$(this).addClass('select_label');
					}else{
						$(this).css({"background-color":"#969696"});
						$(this).removeClass('select_label');
					}

				});
				//----------------------
			}
		});
		
		$('#uploadForm').submit(function(){
			// 部分浏览器不支持也不兼容 暂时放放
			// var formdata = new FormData();
			// formdata.append("worksFile", file_array['file']); 
			//console.log(file_array['file']);
			check_login();
			var worksName	   = $('#worksName').val(); //作品名称
			if(!worksName){
				$('#error').show().text('作品名称不能为空!');
				return false;
			}
			if(worksName.length >= 30){
				$('#error').show().text('作品名称太长了,不可超过15字');
				return false;
			}
			var m_departmentId = $('#departmment').val(); //部门 m_departmentId
			if(!m_departmentId){
				$('#error').show().text('请选择所属部门');
				return false;
			}
			var worksimage     = $('#view').css('background-image');
			if(worksimage == 'none'){
				$('#error').show().text('请上传封面图片');
				return false;
			}
			var hiddenFile = $('#hiddenFile').val(); //批量上传作品
			if(!hiddenFile){
				$('#error').show().text('至少上传一个以上的作品');
				return false;
			}
			//var base = worksimage.substr(worksimage.indexOf(",", 1) + 1);
			var base = worksimage.split(",");
			var thumb_base = base[1].substr(0,base[1].indexOf(')'));
			var m_labelCode	   = new Array();  //标签数组
			$('#select-tag .select_label').each(function(key){
				var id = $(this).attr('data-id');
				m_labelCode.push(id);
			});
			//验证通过之后执行 
			$('#error').hide(); //隐藏错误提示
			$('.loadingtext').show(); 
			$('.btn-dis').attr('disabled','disabled'); //禁止重复提交
			//检验
			var option = {
					data:{
						labelList:m_labelCode.join(","),
						worksImage:thumb_base,
						resetForm: true  //成功提交后，重置所有表单元素的值 
					},
					dataType:'json',
					success:function(data){
						if(data.status == "200"){
							$('loadingtext').hide();
							alert('上传完成,提交成功');
							window.open('view/search.html?&myWorksFlag=0');
							window.location.reload() ; //刷新
						}
					}
				}
			$(this).ajaxSubmit(option);
			return false;
			
		})
	}

	//选择作品
	$('#pickfiles').click(function(){
		return $('#hiddenFile').click();
	});
	$('#hiddenFile').change(function(){
		var k = $(this).val();
		var m = $(this).get(0).files;
		$('#pickfiles b').text(' '+m.length+'个文件');
		//console.log(m.length);
	});

	//上传作品文件  待处理
	function upload_list(){
		var uploader = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',
		browse_button : 'pickfiles', // 选择文件
		//file_data_name: 'worksFile',
		container: document.getElementById('container'), // ... or DOM Element itself
		url : '#',
		flash_swf_url : './Moxie.swf',
		silverlight_xap_url : './Moxie.xap',
		
		filters : {
			max_file_size : '10mb',
			mime_types: [
				{title : "Image files", extensions : "jpg,png,mp4,mp3",}
				//{title : "Zip files", extensions : "zip"}
			],
			prevent_duplicates : true //不允许选取重复文件
		},

		init: {  //初始化
			//执行完成后触发
			PostInit: function() {
				document.getElementById('filelist').innerHTML = '';
				$('#pickfiles').change(function(){
					var path = $(this).val();
					console.log(path);
				})
				// document.getElementById('form_submit').onclick = function() {
				// 	uploader.start(); //开始上传 触发
				// 	return false;
				// };
			},

			FilesAdded: function(up, files) {

				document.getElementById('error').innerHTML = '';
				plupload.each(files, function(file,i) {
					//console.log(files[i].type);
					document.getElementById('filelist').innerHTML += '<div class="img-thumbnail" id="' + file.id + '"><i class="glyphicon glyphicon-remove delete-img"></i><b></b></div>';
					if(files[i].type == 'video/mp4'){
						$('#'+files[i].id).prepend('<img src="./view/assets/img/uplay.jpg" /><br/>');
					}
					previewImage(files[i],function(imgsrc){
					$('#'+files[i].id).prepend('<img src="'+ imgsrc +'" /><br/>');
				})
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
					//console.log(uploader.files);
				});
				file_array = new Array();
				file_array['file'] = uploader.files
				//uploader.start();  //选择完成文件后 立马触发上传
			},
			// UploadProgress: function(up, file) {
			// 	return false;
			// 	$('.delete-img').remove(); //关闭图标
			// 	document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
			// 	document.getElementById('error').innerHTML = '正在上传中....';
			// },
			// FileUploaded : function(up,file,cak){
			// 	return false;
			// 	// console.log(file);  上传完成一张图片触发
			// 	$('#'+file['id']+' b').remove();
			// 	$('#'+file['id']).css('border','1px solid #1CFD01');
			// 	document.getElementById('error').innerHTML = '';
			// },
			// UploadComplete: function(up,file){
			// 	return false;
			// 	if(file == ''){
			// 		layer.msg('没有文件可上传', {icon: 0});
			// 	}else{
			// 		layer.msg('上传文件全部完成', {icon: 1});
			// 	}
			// },
			Error: function(up, err) {
				document.getElementById('error').innerHTML = err.message;
			}
		}
	});
	uploader.init();
	uploader.bind('FilesAdded',function(up,files){
		//console.log(up);
	})
	}
	//upload_list(); //初次打开首页 立即实例化上传作品模块


	//上传之前预览封面图片
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
			//console.log("照片读取中");
			$('#view').hide();
		},
		loadComplete: function() {
			$('#clipArea').css({"position":'static',"display":'block'});
			$('#clipBtn').css("display","block");
			//console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {
			$('#clipArea,#clipBtn').hide();
			$('#view').show();
			//console.log(dataURL);
		}
	});
})

$(function() {
	// 用来判断是否登陆，如果没有登陆就ture  否则false
	$('#login_show').modal({
		'show': false
	})
	ajaxpost(1);
	//左侧菜单
	$('.left-nav').click(function() {
		$('.left-tab').css('left', '-5px');
		$('.mask').fadeIn().click(function() {
			$('.left-tab').css('left', '-340px');
			$(this).fadeOut();
		});
	})
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

	//New pictures tab
	$('.newlist').click(function() {
		$('#view').val('0');
		clear_list();
		ajaxpost(1);
	})

	//Hot pictures tab
	$('.hotlist').click(function() {
		$('#view').val('1');
		clear_list();
		ajaxpost(1);
	})

	//列表 缩略图 视图输出
	function ajaxpost(page){
		var keywork = $('#keywork').val();  // 搜索关键字 默认是空的 
		var view = $('#view').val();  // 0 为 new 排序  1 为 hot 排序
		var type = $('#type').val();  // 0 为 列表显示  1 为 缩略图显示
		loading_page('正在加载中，请稍等......');
		$.ajax('http://www.beijing-dentsu.com.cn/thinkphp/Dentsucn/Index/lists',{
			type:'get',
			dataType:'json',
			data:{page:page,order:view},
			success:function(data){
				switch(type){
					case '0' :
					list_view(data);
					break;
					case '1' :
					list_img(data);
					break;
				}
				$('.detailview').click(function(){
					var id = $(this).attr('data-id');  //注意在列表加上data-id属性
					$('.show-start').attr('data-id',id); //克隆
					//作品描述 用对应的id 加载
					$.ajax('http://www.beijing-dentsu.com.cn/thinkphp/Dentsucn/Index/work',{
						type:'get',
						dataType:'json',
						data:{id:id},
						success:function(data){
							//测试传值 可去掉
							console.log(data);
						}
					})
				})
			}
		});
	}

	//列表视图输出
	function list_view(data){
		var user = $('#user').val();  // 0 为 不限 ，1 为 我的上传，2 为 我的收藏 
		if(data.status){
			switch(user){
				case '0':
				var html = "";
				    html += "<li class='list-img frist-height'><\/li>\n";
				    html += "<li class='list-title frist-height'>标题<\/li>\n";
				    html += "<li class='list-pinpai frist-height'>品牌<\/li>\n";
				    html += "<li class='list-guanggao frist-height'>广告主<\/li>\n";
				    html += "<li class='list-fenlei frist-height'>作品标签<\/li>\n";
				    html += "<li class='list-user frist-height'>上传者<\/li>\n";
				    html += "<li class='list-date frist-height'>上传日期<\/li>\n";
				$('.ajax-newlist').append(html);
				$.each(data['data'],function(key,value){
						var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
						var strVar = "<ul class='list-inline' data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['id']+">";
						    strVar += "<li class='list-img'>";
						    strVar += "	<img src="+img+" alt="+value['title']+" class=\"img-responsive img-rounded detailview\"  data-id="+value['id']+">";
						    strVar += "<\/li>";
						    strVar += "<li class='list-title'>";
						    strVar += "	<p class=\"detailview\"  data-id="+value['id']+">"+value['title']+"<\/p>";
						    strVar += "<p class='text-muted'><i class='glyphicon glyphicon-star'><\/i> 20 <\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-pinpai'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += '电通数码';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-guanggao'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += '北京电通广告有限公司';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-fenlei'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += '产品设计';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-user'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += 'yang.sun@dentsu.com.cn';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += '2017-03-13';
						    strVar += "<\/li>";
						    strVar += "<div class=\"clearfix\">";
						    strVar += "<\/div>";
						    strVar += '</ul>';
					$('.ajax-newlist').append(strVar);
				});
				break;
				case '1':
				var html = "";
				    html += "<li class='list-img frist-height'><\/li>\n";
				    html += "<li class='list-title frist-height'>标题<\/li>\n";
				    html += "<li class='list-pinpai frist-height'>品牌<\/li>\n";
				    html += "<li class='list-guanggao frist-height'>广告主<\/li>\n";
				    html += "<li class='list-fenlei frist-height'>作品标签<\/li>\n";
				    html += "<li class='list-user frist-height'>上传者<\/li>\n";
				    html += "<li class='list-date frist-height'>上传日期<\/li>\n";
				$('.ajax-newlist').append(html);
				$.each(data['data'],function(key,value){
						var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
						var strVar = "<ul class=\"list-inline del"+value['id']+"\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['id']+">";
						    strVar += "<li class='list-img'>";
						    strVar += "	<img src="+img+" alt="+value['title']+" class=\"img-responsive img-rounded detailview\" >";
						    strVar += "<\/li>";
						    strVar += "<li class='list-title'>";
						    strVar += "	<p class=\"detailview\">"+value['title']+"<\/p>";
						    strVar += "<p class='text-muted'><i class='glyphicon glyphicon-star'><\/i> 20 <\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-pinpai'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += '电通数码';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-guanggao'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += '北京电通广告有限公司';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-fenlei'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += '产品设计';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-user'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += 'yang.sun@dentsu.com.cn';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += '2017-03-13';
						    strVar += "<\/li>";
						    strVar += "<div class=\"clearfix\">";
						    strVar += "<\/div>";
						    strVar += '</ul>';
						    strVar += "	<p class=\"text text-muted btn-post del"+value['id']+"\">";
						    strVar += '<span class="update btn-xs btn-primary btn" data-toggle=\"modal\" data-target=\"#user-update\" data-id='+value['id']+'>修改</span> <span class="del btn-xs btn-danger btn" data-id='+value['id']+'>删除</span>';
						    strVar += "	<\/p>";
					$('.ajax-newlist').append(strVar);
				});
				//删除
				$('.del').click(function(){
					var id = $(this).attr('data-id');
					//询问框
					layer.confirm('删除之后不可恢复，确定删除？', {
					  btn: ['确定','取消'] //按钮
					}, function(){
						//进行相应操作之后 执行下面
						$('.del'+id).fadeOut('300');
					  	layer.msg('删除成功', {icon: 1});
					});
				})
				//修改
				$('.update').click(function(){
					var id = $(this).attr('data-id');
					$.ajax('http://www.beijing-dentsu.com.cn/thinkphp/Dentsucn/Index/work',{
						type:'get',
						dataType:'json',
						data:{id:id},
						success:function(data){
							//测试传值 可去掉
							console.log(data);
						}
					})
				})
				break;
				case '2':  //我的收藏
				var html = "";
				    html += "<li class='list-img frist-height'><\/li>\n";
				    html += "<li class='list-title frist-height'>标题<\/li>\n";
				    html += "<li class='list-pinpai frist-height'>品牌<\/li>\n";
				    html += "<li class='list-guanggao frist-height'>广告主<\/li>\n";
				    html += "<li class='list-fenlei frist-height'>作品标签<\/li>\n";
				    html += "<li class='list-user frist-height'>上传者<\/li>\n";
				    html += "<li class='list-date frist-height'>上传日期<\/li>\n";
				$('.ajax-newlist').append(html);
				$.each(data['data'],function(key,value){
						var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
						var strVar = "<ul class=\"list-inline start"+value['id']+"\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['id']+">";
						    strVar += "<li class='list-img'>";
						    strVar += "	<img src="+img+" alt="+value['title']+" class=\"img-responsive img-rounded detailview\" >";
						    strVar += "<\/li>";
						    strVar += "<li class='list-title'>";
						    strVar += "	<p class=\"detailview\">"+value['title']+"<\/p>";
						    //strVar += "<p class='text-muted'><i class='glyphicon glyphicon-star'><\/i> 20 <\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-pinpai'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += '电通数码';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-guanggao'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += '北京电通广告有限公司';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-fenlei'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += '产品设计';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-user'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += 'yang.sun@dentsu.com.cn';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += '2017-03-13';
						    strVar += "<\/li>";
						    strVar += "<div class=\"clearfix\">";
						    strVar += "<\/div>";
						    strVar += '</ul>';
						    strVar += "	<p class=\"text-muted start"+value['id']+"\">";
						    strVar += '<span class="start btn-xs btn-post btn-danger btn" data-id='+value['id']+'>取消收藏</span>';
						    strVar += "	<\/p>";
					$('.ajax-newlist').append(strVar);
				});
				//取消收藏
				$('.start').click(function(){
					var id = $(this).attr('data-id');
					//询问框
					layer.confirm('确定取消收藏？', {
					  btn: ['确定','取消'] //按钮
					}, function(){
						//进行相应操作之后 执行下面
						$('.start'+id).fadeOut('300');
					  	layer.msg('取消成功', {icon: 1});
					});
				})
				break;
			}
			
			loading_page();
		}else{
			$('.loading_list').hide();
			alert('没有更多数据了');
		}
	}

	//缩略图视图输出
	function list_img(data){
		var user = $('#user').val();  // 0 为 默认 ，1 为 我的上传，2 为 我的收藏
		if(data.status){
			switch(user){
				case '0':
				$.each(data['data'],function(key,value){
					var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
					var strVar = "";
					    strVar += "<div class=\"col-xs-3\">";
					    strVar += "	<div class=\"thumbnail\">";
					    //strVar += "		<img src="+value['thumbnail']+" alt="+value['title']+" class='img-responsive'>";
					    strVar += "		<img src="+img+" alt="+value['title']+" class='img-responsive'>";
					    strVar += "		<div class=\"caption thumbnail-title detailview\" data-toggle=\"modal\" data-id="+value['id']+" data-target=\"#show-id\">";
					    strVar += "			<p class=\"text text-center\">";
					    strVar +=  			value['title'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-user\"><\/i> sunyang";
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-time\"><\/i> "+value['postdate'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-heart\"><\/i> "+value['cid'];
					    strVar += "			<\/p>";
					    strVar += "		<\/div>";
					    strVar += "	<\/div>";
					    strVar += "<\/div>";
					$('.ajax-hotlist').append(strVar);
				})
				break;
				case '1':
				$.each(data['data'],function(key,value){
					var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
					var strVar = "";
					    strVar += "<div class=\"col-xs-3 del-"+value['id']+" \">";
					    strVar += "	<div class=\"thumbnail\">";
					    //strVar += "		<img src="+value['thumbnail']+" alt="+value['title']+">";
					    strVar += "		<img src="+img+" alt="+value['title']+">";
					    strVar += "		<div class=\"caption thumbnail-title detailview\" data-toggle=\"modal\" data-id="+value['id']+" data-target=\"#show-id\">";
					    strVar += "			<p class=\"text text-center\">";
					    strVar +=  			value['title'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-user\"><\/i> sunyang";
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-time\"><\/i> "+value['postdate'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-heart\"><\/i> "+value['cid'];
					    strVar += "			<\/p>";
					    strVar += "		<\/div>";
					    strVar += "	<\/div>";
					    strVar += "			<p class=\"text text-center img-button \">";
					    strVar += '<span class="btn-primary btn update" data-toggle="modal" data-target="#user-update">编辑</span> <span class="btn-danger btn del-event" del='+value['id']+' >删除</span>';
					    strVar += "			<\/p>";
					    strVar += "<\/div>";
					$('.ajax-hotlist').append(strVar);
				})
				
				//修改作品
				$('.update').click(function(){
					//  user-update
				})
				//删除作品
				$('.del-event').click(function(){
					var id = $(this).attr('del');
					//询问框
					layer.confirm('删除不可恢复，确定删除？', {
					  btn: ['确定','取消'] //按钮
					}, function(){
						//进行相应操作之后 执行下面
						$('.del-'+id).fadeOut('300');
					  	layer.msg('删除成功', {icon: 1});
					});
				})
				break;
				case '2':
				$.each(data['data'],function(key,value){
					var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
					var strVar = "";
					    strVar += "<div class=\"col-xs-3 start-"+value['id']+" \">";
					    strVar += "	<div class=\"thumbnail\">";
					   // strVar += "		<img src="+value['thumbnail']+" alt="+value['title']+">";
					    strVar += "		<img src="+img+" alt="+value['title']+">";
					    strVar += "		<div class=\"caption thumbnail-title detailview\" data-toggle=\"modal\" data-id="+value['id']+" data-target=\"#show-id\">";
					    strVar += "			<p class=\"text text-center\">";
					    strVar +=  			value['title'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-user\"><\/i> yang.sun@dentsu.com.cn";
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-time\"><\/i> "+value['postdate'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-heart\"><\/i> "+value['cid'];
					    strVar += "			<\/p>";
					    strVar += "		<\/div>";
					    strVar += "	<\/div>";
					    strVar += "			<p class=\"text text-center img-button \">";
					    strVar += ' <span class="btn-danger btn start-event" start='+value['id']+' >取消收藏</span>';
					    strVar += "			<\/p>";
					    strVar += "<\/div>";
					$('.ajax-hotlist').append(strVar);
				})

				//取消收藏
				$('.start-event').click(function(){
					var id = $(this).attr('start');
					//询问框
					layer.confirm('确定取消收藏？', {
					  btn: ['确定','取消'] //按钮
					}, function(){
						//进行相应操作之后 执行下面
						$('.start-'+id).fadeOut('300');
					  	layer.msg('取消成功', {icon: 1});
					});
				})
				break;
			}
			
			loading_page();
		}else{
			$('.loading_list').hide();
			alert('没有更多数据了');
		}
	}

	//切换缩略图
	$('#large').click(function() {
		$('.list-tab').removeClass('active_tab');
		$(this).addClass('active_tab');
		
		$('#type').val('1');
		clear_list();
		ajaxpost(1);
	});

	//切换列表
	$('#list').click(function() {
		$('.list-tab').removeClass('active_tab');
		$(this).addClass('active_tab');

		$('#type').val('0');
		clear_list();
		ajaxpost(1);
	})

	//收藏触发按钮
	$('.show-start').click(function(){
		var id = $(this).attr('data-id');  //注意在列表加上data-id属性
		console.log(id);
		layer.msg('收藏成功'+id, {icon: 1});
	});

	//加载更多事件触发
	$('.loading_list').click(function(){
		var page = $('#page').val();
		ajaxpost(page);
		page++;
		$('#page').val(page);
	})
	// 初始化必须清空数据再继续加载，否则出现重复数据
	function clear_list(){
		$('#page').val('2'); //分页初始化
		$('.ajax-newlist,.ajax-hotlist').empty(); //初始化list
	}
	//分页加载loading状态
	function loading_page(text){
		if(text){
			$('.loading_list').removeClass('btn-primary').addClass('btn-default').show().text(text);
		}else{
			$('.loading_list').removeClass('btn-default').addClass('btn-primary').show().text('加载更多');
		}
	}
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
		if(id == '#myhome dl dd'){
			$(id).click(function(){
				var i = $(this).index();
					switch(i){
						case 0:  //不限
						$('#user').val(0);
						break;
						case 1:  //我的上传
						$('#user').val(1);
						break;
						case 2:  //我的收藏
						$('#user').val(2);
						break;
					}
				clear_list();  //清空数据并重新加载，避免重复
				ajaxpost(1);
			})
		}
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
			if(id == '#myhome dl dd'){
				//需求变更 暂时注释下
				// $('#bumen dl dd').removeClass('selected').eq(0).addClass('selected');
				// $('#fenlei dl dd').removeClass('selected').eq(0).addClass('selected');
				// $('#guanggao dl dd').removeClass('selected').eq(0).addClass('selected');
				// $('#pinpai dl dd').removeClass('selected').eq(0).addClass('selected');
				// $('#adddate dl dd').removeClass('selected').eq(0).addClass('selected');
			}
		});
	}

	//轮播 幻灯片
	function gallery(data){
		switch(data){
			case '1':  //图片类型
				var html =  '<img alt="Preview Image 4"  src="images/thumbs/thumb4.jpg" data-image="images/big/image4.jpg" data-description="Preview Image 4 Description">';
			break;
			case '2': //视频类型
				var html = '';
			break;
			case '3': //音频视频
				var html = '';
			break;
		}
		$('#gallery').append(html);
		$('#show-id').on('hidden.bs.modal', function (e) {
		 // $('#gallery').html('').hide();  //关闭之后 清空视频和音频，防止恶意加载流量
		})

	}
	gallery('1');
	jQuery("#gallery").unitegallery();


	//上传作品文件
	function upload_list(){
		var uploader = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',
		browse_button : 'pickfiles', // 选择文件
		container: document.getElementById('container'), // ... or DOM Element itself
		url : './upload.php',
		flash_swf_url : './Moxie.swf',
		silverlight_xap_url : './Moxie.xap',
		
		filters : {
			max_file_size : '10mb',
			mime_types: [
				{title : "Image files", extensions : "jpg,png,mp4,mp3"}
				//{title : "Zip files", extensions : "zip"}
			]
		},

		init: {  //初始化
			//执行完成后触发
			PostInit: function() {
				document.getElementById('filelist').innerHTML = '';

				//因需求更改 要求上传按钮 与 保存按钮合并一块  下面不再使用
				// document.getElementById('uploadfiles').onclick = function() {
				// 	uploader.start();  //开始上传 触发
				// 	return false;
				// };
			},

			FilesAdded: function(up, files) {
				document.getElementById('error').innerHTML = '';
				plupload.each(files, function(file,i) {
					//console.log(files[i].type);
					document.getElementById('filelist').innerHTML += '<div class="img-thumbnail" id="' + file.id + '"><i class="glyphicon glyphicon-remove delete-img"></i><b></b></div>';
					if(files[i].type == 'video/mp4'){
						$('#'+files[i].id).prepend('<img src="./assets/img/play.jpg" /><br/>');
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
				$('#'+file['id']+' b').remove();
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


	//上传封面
	// $(".a-upload").on("change","input[type='file']",function(){
	//     var filePath=$(this).val();
	//     if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1){
	//         var arr=filePath.split('\\');
	//         var fileName=arr[arr.length-1];
	//         $(".showFileName").html(fileName); //显示图片名称
	//     }else{
	//         alert('图片类型有误！');
	//         return false 
	//     }
	// })

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
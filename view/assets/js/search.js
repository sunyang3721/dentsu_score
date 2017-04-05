$(function() {

	ajaxpost(1);
	
	//屏蔽右键
	function stop(){
		return false;
	}
	document.oncontextmenu=stop;
	$('.icon-box').click(function() {
		$('.left-tab').css('left', '-340px');
		$('.mask').fadeOut();
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
				    html += "<li class='list-user frist-height'>创作者<\/li>\n";
				    html += "<li class='list-date frist-height'>上传日期<\/li>\n";
				$('.ajax-newlist').append(html);
				$.each(data['data'],function(key,value){
						var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
						var strVar = "<ul class='list-inline' data-id="+value['id']+">";
						    strVar += "<li class='list-img'>";
						    strVar += "	<img src="+img+" alt="+value['title']+" class=\"img-responsive img-rounded detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['id']+">";
						    strVar += "<\/li>";
						    strVar += "<li class='list-title'>";
						    strVar += "	<p class=\"detailview\" data-toggle=\"modal\" data-target=\"#show-id\"   data-id="+value['id']+">"+value['title']+"<\/p>";
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
				    html += "<li class='list-user frist-height'>创作者<\/li>\n";
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
				    html += "<li class='list-user frist-height'>创作者<\/li>\n";
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



})
$(function() {
	//判断登陆
		$.ajaxSetup({   
		   contentType:"application/x-www-form-urlencoded;charset=utf-8",   
		   complete:function(XMLHttpRequest,textStatus){ 
		     var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
		         if(sessionstatus=="timeout"){ 
					//如果超时就处理 ，指定要跳转的页面  
					window.location.replace("../userLoginCheck.do");   
		        }   
		      }   
		 })
	$.ajax({
		url:'../findUserInfo.do',
		dataType:'json',
		success:function(data){
			$('#usermail').text(data['userInfo']['m_userEmail']);
		}
	})
	numloadCount = 20; //每页显示20条 全局定义
	ajaxpost(1);
	$('title').append(function(){
		var keyword = getQueryString("inputKeyWord");
		if(keyword == ''){
			return '所有结果';
		}else{
			return '"'+keyword+'"结果';
		}
	});
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
		var url = '../queryWorksInfoList.do';
		var param = location.search;
		var view = $('#view').val();  // 0 为 new 排序  1 为 hot 排序
		var type = $('#type').val();  // 0 为 列表显示  1 为 缩略图显示
		loading_page('正在加载中，请稍等......');
		$.ajax(url+param,{
			type:'post',
			dataType:'json',
			data:{pageNum:page,orderFlag:view,loadCount:numloadCount},
			success:function(data){
				switch(type){
					case '0' :
					if(page == '1'){
						var html = "";
						    html += "<li class='list-img frist-height'><\/li>\n";
						    html += "<li class='list-title frist-height'>标题<\/li>\n";
						    html += "<li class='list-pinpai frist-height'>品牌<\/li>\n";
						    html += "<li class='list-guanggao frist-height'>广告主<\/li>\n";
						    html += "<li class='list-fenlei frist-height'>作品标签<\/li>\n";
						    // html += "<li class='list-user frist-height'>创作团队<\/li>\n";
						    html += "<li class='list-date frist-height'>上传日期<\/li>\n";
						$('.ajax-newlist').append(html);
					}
					list_view(data);
					break;
					case '1' :
					list_img(data);
					break;
				}
				info_view();
			}
		});
	}

	//列表视图输出
	function list_view(data){
		// console.log(data);
		var user = getQueryString("myWorksFlag");  // 空为 不限 ，0 为 我的上传，1 为 我的收藏
		var keyword = getQueryString("inputKeyWord"); //关键字; 
		if(data.status=='200'){
			switch(user){
				case '' :  //默认
				$.each(data['worksInfoList'],function(key,value){
						//var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
						var img = value['t_worksImagePath'];
						var strVar = "<ul class='list-inline del"+value['t_worksId']+"' data-id="+value['t_worksId']+">";
						    strVar += "<li class='list-img'>";
						    strVar += "	<img src="+img+" alt="+value['t_worksName']+" class=\"img-responsive img-rounded detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">";
						    strVar += "<\/li>";
						    strVar += "<li class='list-title'>";
						    strVar += "	<p class=\"detailview\" data-toggle=\"modal\" data-target=\"#show-id\"   data-id="+value['t_worksId']+">"+value['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>')+"<\/p>";
						    strVar += "<p class='text-muted'><i class='glyphicon glyphicon-star'><\/i> "+value['collectionNum']+" <\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-pinpai'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['m_brandName']?value['m_brandName']:'未填写';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-guanggao'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['m_advertiserName'];
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-fenlei'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['worksLabel']?value['worksLabel']:'<i>未填写</i>';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    // strVar += "<li class='list-user'>";
						    // strVar += "	<p class=\"text-muted\">";
						    // strVar += value['t_worksCreater'].replace(/[\r\n]/g,"<br/>");
						    // strVar += "	<\/p>";
						    // strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += value['t_createTimeStr'];
						    strVar += "<\/li>";
						    strVar += "<div class=\"clearfix\">";
						    strVar += "<\/div>";
						    strVar += '</ul>';
						    // start 修改按钮
						    strVar += "	<p class=\"text text-muted btn-post del"+value['t_worksId']+"\">";
						    if(value['editLimit'] == 1){
						    	strVar += '<span class="update btn-xs btn-primary btn" data-toggle=\"modal\" data-target=\"#user-update\" data-id='+value['t_worksId']+'>编辑</span>' 
						    };
						    if(value['deleteLimit'] == 1){
						    	strVar += ' <span class="del btn-xs btn-danger btn" data-id='+value['t_worksId']+'>删除</span>';
						    };
						    strVar += "	<\/p>";
						    // end
					$('.ajax-newlist').append(strVar);
				});
				update_view();
				del_view();
				break;
				case '0': //我的上传
				$.each(data['worksInfoList'],function(key,value){
						//var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
						var img = value['t_worksImagePath'];
						var strVar = "<ul class=\"list-inline del"+value['t_worksId']+"\"  data-id="+value['t_worksId']+">";
						    strVar += "<li class='list-img'>";
						    strVar += "	<img src="+img+" alt="+value['t_worksName']+" class=\"img-responsive img-rounded detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">";
						    strVar += "<\/li>";
						    strVar += "<li class='list-title'>";
						    strVar += "	<p class=\"detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">"+value['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>')+"<\/p>";
						    strVar += "<p class='text-muted'><i class='glyphicon glyphicon-star'><\/i> "+value['collectionNum']+" <\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-pinpai'>";
						    strVar += "	<p class=\"text-muted\">";
						     strVar += value['m_brandName']?value['m_brandName']:'未填写';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-guanggao'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['m_advertiserName'];
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-fenlei'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['worksLabel']?value['worksLabel']:'<i>未填写</i>';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    // strVar += "<li class='list-user'>";
						    // strVar += "	<p class=\"text-muted\">";
						    // strVar += value['t_worksCreater'];
						    // strVar += "	<\/p>";
						    // strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += value['t_createTimeStr'];
						    strVar += "<\/li>";
						    strVar += "<div class=\"clearfix\">";
						    strVar += "<\/div>";
						    strVar += '</ul>';
						    // start 修改按钮
						    strVar += "	<p class=\"text text-muted btn-post del"+value['t_worksId']+"\">";
						    if(value['editLimit'] == 1){
						    	strVar += '<span class="update btn-xs btn-primary btn" data-toggle=\"modal\" data-target=\"#user-update\" data-id='+value['t_worksId']+'>编辑</span>' 
						    };
						    if(value['deleteLimit'] == 1){
						    	strVar += ' <span class="del btn-xs btn-danger btn" data-id='+value['t_worksId']+'>删除</span>';
						    };
						    strVar += "	<\/p>";
						    // end
					$('.ajax-newlist').append(strVar);
				});
				update_view();
				del_view();
				
				break;
				case '1':  //我的收藏
				$.each(data['worksInfoList'],function(key,value){
						//var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
						var img = value['t_worksImagePath'];
						var strVar = "<ul class=\"list-inline start"+value['t_worksId']+"\" data-id="+value['t_worksId']+">";
						    strVar += "<li class='list-img'>";
						    strVar += "	<img src="+img+" alt="+value['t_worksName']+" class=\"img-responsive img-rounded detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">";
						    strVar += "<\/li>";
						    strVar += "<li class='list-title'>";
						    strVar += "	<p class=\"detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">"+value['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>')+"<\/p>";
						    //strVar += "<p class='text-muted'><i class='glyphicon glyphicon-star'><\/i> 20 <\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-pinpai'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['m_brandName']?value['m_brandName']:'未填写';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-guanggao'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['m_advertiserName'];
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-fenlei'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['worksLabel']?value['worksLabel']:'<i>未填写</i>';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    // strVar += "<li class='list-user'>";
						    // strVar += "	<p class=\"text-muted\">";
						    // strVar += value['t_worksCreater'];
						    // strVar += "	<\/p>";
						    // strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += value['t_createTimeStr'];
						    strVar += "<\/li>";
						    strVar += "<div class=\"clearfix\">";
						    strVar += "<\/div>";
						    strVar += '</ul>';
						    strVar += "	<p class=\"text-muted start"+value['t_worksId']+"\">";
						    strVar += '<span class="start btn-xs btn-post btn-danger btn" data-id='+value['t_worksId']+'>取消收藏</span>';
						    strVar += "	<\/p>";
					$('.ajax-newlist').append(strVar);
				});
				//取消收藏   未完成待修改
				$('.start').click(function(){
					var id = $(this).attr('data-id');
					//询问框
					layer.confirm('确定取消收藏？', {
					  btn: ['确定','取消'] //按钮
					}, function(){
						$.ajax({
							url:'../collectWorksInfo.do',
							dataType:'json',
							type:'post',
							data:{worksId:id,collectionFlag:1},
							success:function(data){
								//进行相应操作之后 执行下面
								$('.start'+id).fadeOut('300');
							  	layer.msg('取消成功', {icon: 1});
							}
						})
					});
				})
				break;
			}
			//判断数据是所有时，加载更多按钮隐藏
			var numLength = data['worksInfoList'].length;
			if(numloadCount > numLength){
				$('.loading_list').hide();
				//layer.msg('已全部加载完成', {icon: 1});
			}else{
				loading_page();
			}
			
		}else{
			$('.loading_list').hide();
			layer.msg('已全部加载完成', {icon: 1});
		}
	}

	//缩略图视图输出
	function list_img(data){
		var user = getQueryString("myWorksFlag");  // 空为 不限 ，0 为 我的上传，1 为 我的收藏 
		var keyword = getQueryString("inputKeyWord"); //关键字; 
		if(data.status == '200'){
			switch(user){
				case '':
				$.each(data['worksInfoList'],function(key,value){
					//var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
					var img = value['t_worksImagePath'];
					var strVar = "";
					    strVar += "<div class=\"col-xs-3 del"+value['t_worksId']+" \">";
					    strVar += "	<div class=\"thumbnail\">";
					    //strVar += "		<img src="+value['thumbnail']+" alt="+value['t_worksName']+" class='img-responsive'>";
					    strVar += "		<img src="+img+" alt="+value['t_worksName']+" class='img-responsive'>";
					    strVar += "		<div class=\"caption thumbnail-title detailview\" data-toggle=\"modal\" data-id="+value['t_worksId']+" data-target=\"#show-id\">";
					    strVar += "			<p class=\"text text-center\">";
					    strVar +=  			value['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>');
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					   // strVar += "				<i class=\"glyphicon glyphicon-user\"><\/i> "+value['t_worksCreater'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-time\"><\/i> "+value['t_createTimeStr'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-star\"><\/i> "+value['collectionNum'];
					    strVar += "			<\/p>";
					    strVar += "		<\/div>";
					    strVar += "	<\/div>";
					    // start  编辑按钮
					    if(value['editLimit'] == 1 || value['deleteLimit'] == 1){
					    	strVar += "			<p class=\"text text-center img-button \">";
					    }
					    if(value['editLimit'] == 1){
					    	strVar += '<span class="btn-primary btn update" data-toggle="modal" data-target="#user-update" data-id='+value['t_worksId']+'>编辑</span>';
					    };
					    if(value['deleteLimit'] == 1){
					    	strVar += ' <span class="btn-danger btn del" data-id='+value['t_worksId']+' >删除</span>';
					    }
					    if(value['editLimit'] == 1 || value['deleteLimit'] == 1){
					    	strVar += "<\/p>";
					    }
					    // end
					    strVar += "<\/div>";
					$('.ajax-hotlist').append(strVar);
				});
				update_view();
				del_view();
				break;
				case '0':
				$.each(data['worksInfoList'],function(key,value){
					//var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
					var img = value['t_worksImagePath'];
					var strVar = "";
					    strVar += "<div class=\"col-xs-3 del"+value['t_worksId']+" \">";
					    strVar += "	<div class=\"thumbnail\">";
					    //strVar += "		<img src="+value['thumbnail']+" alt="+value['t_worksName']+">";
					    strVar += "		<img src="+img+" alt="+value['t_worksName']+">";
					    strVar += "		<div class=\"caption thumbnail-title detailview\" data-toggle=\"modal\" data-id="+value['t_worksId']+" data-target=\"#show-id\">";
					    strVar += "			<p class=\"text text-center\">";
					    strVar +=  			value['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>');
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    //strVar += "				<i class=\"glyphicon glyphicon-user\"><\/i> "+value['t_worksCreater'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-time\"><\/i> "+value['t_createTimeStr'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-star\"><\/i> "+value['collectionNum'];
					    strVar += "			<\/p>";
					    strVar += "		<\/div>";
					    strVar += "	<\/div>";
					    // start  编辑按钮
					    if(value['editLimit'] == 1 || value['deleteLimit'] == 1){
					    	strVar += "			<p class=\"text text-center img-button \">";
					    }
					    if(value['editLimit'] == 1){
					    	strVar += '<span class="btn-primary btn update" data-toggle="modal" data-target="#user-update" data-id='+value['t_worksId']+'>编辑</span>';
					    };
					    if(value['deleteLimit'] == 1){
					    	strVar += ' <span class="btn-danger btn del" data-id='+value['t_worksId']+' >删除</span>';
					    }
					    if(value['editLimit'] == 1 || value['deleteLimit'] == 1){
					    	strVar += "<\/p>";
					    }
					    // end
					    strVar += "<\/div>";
					$('.ajax-hotlist').append(strVar);
				})
				update_view();
				del_view();
				break;
				case '1':
				$.each(data['worksInfoList'],function(key,value){
					var img = value['t_worksImagePath'];
					var strVar = "";
					    strVar += "<div class=\"col-xs-3 start-"+value['t_worksId']+" \">";
					    strVar += "	<div class=\"thumbnail\">";
					   // strVar += "		<img src="+value['thumbnail']+" alt="+value['t_worksName']+">";
					    strVar += "		<img src="+img+" alt="+value['t_worksName']+">";
					    strVar += "		<div class=\"caption thumbnail-title detailview\" data-toggle=\"modal\" data-id="+value['t_worksId']+" data-target=\"#show-id\">";
					    strVar += "			<p class=\"text text-center\">";
					    strVar +=  			value['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>');
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					   //strVar += "				<i class=\"glyphicon glyphicon-user\"><\/i> "+value['t_worksCreater'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-time\"><\/i> "+value['t_createTimeStr'];
					    strVar += "			<\/p>";
					    strVar += "			<p class=\"text text-center\">";
					    strVar += "				<i class=\"glyphicon glyphicon-star\"><\/i> "+value['collectionNum'];
					    strVar += "			<\/p>";
					    strVar += "		<\/div>";
					    strVar += "	<\/div>";
					    strVar += "			<p class=\"text text-center img-button \">";
					    strVar += ' <span class="btn-danger btn start-event" start='+value['t_worksId']+' >取消收藏</span>';
					    strVar += "			<\/p>";
					    strVar += "<\/div>";
					$('.ajax-hotlist').append(strVar);
				})

				//取消收藏  待补充
				$('.start-event').click(function(){
					//alert('352 待开发补充');
					var id = $(this).attr('start');
					//询问框
					layer.confirm('确定取消收藏？', {
					  btn: ['确定','取消'] //按钮
					}, function(){
						$.ajax({
							url:'../collectWorksInfo.do',
							dataType:'json',
							type:'post',
							data:{worksId:id,collectionFlag:1},
							success:function(data){
								//进行相应操作之后 执行下面
								$('.start'+id).fadeOut('300');
							  	layer.msg('取消成功', {icon: 1});
							}
						})
					});
				})
				break;
			}
			
			//判断数据是所有时，加载更多按钮隐藏
			var numLength = data['worksInfoList'].length;
			if(numloadCount > numLength){
				$('.loading_list').hide();
			}else{
				loading_page();
			}
		}else{
			$('.loading_list').hide();
			layer.msg('已全部加载完成', {icon: 1});
		}
	}
	// 查看作品页面
	function info_view(){
		$('.detailview').click(function(){
			var id = $(this).attr('data-id');  //注意在列表加上data-id属性
			$('.show-start').attr('data-id',id); //克隆收藏控件

			//作品描述 用对应的id 加载
			$.ajax('../selectWorksInfoById.do',{
				type:'post',
				dataType:'json',
				data:{worksId:id},
				success:function(data){
					var workinfo = data['worksInfo'];
					var chuangzuohtml = '<table class="pos"><tbody>';  //创作团队
					var gongsihtml = '<table class="pos"><tbody>'; //公司制作
					var reg = new RegExp(",","g");//g,表示全部替换。
					$.each(workinfo['tWorksCreatorInfoList'],function(key,value){
						if(value['m_positionType'] == 1){
							chuangzuohtml += '<tr><td>'+value['m_positionName']+'</td><td>'+value['t_worksCreator'].replace(reg,' / ')+'</td></tr>';
						}else{
							gongsihtml += '<tr><td>'+value['m_positionName']+'</td><td>'+value['t_worksCreator'].replace(reg,'<br/>')+'</td></tr>';
							$('.gongsi-dt').removeClass('hide');
						}
					});
						chuangzuohtml += '</tbody></table>';
						gongsihtml += '</tbody></table>';
						$('#chuangzuo-list').empty().append(chuangzuohtml);
						$('#gongsi-list').empty().append(gongsihtml);

					$('.worksinfo .workname').html(workinfo['t_worksName']); //作品名称
					$('.worksinfo .deparname').html(workinfo['m_departmentName']?workinfo['m_departmentName']:'<i>未填写</i>'); //所属部门
					$('.worksinfo .advername').html(workinfo['m_advertiserName']?workinfo['m_advertiserName']:'<i>未填写</i>'); //广告主
					$('.worksinfo .branname').html(workinfo['m_brandName']?workinfo['m_brandName']:'<i>未填写</i>'); //品牌
					$('.worksinfo .labels').html(workinfo['worksLabel']?workinfo['worksLabel']:'<i>未填写</i>');  //作品标签
					//var reCreater = workinfo['t_worksCreater'].replace(/\r\n/g,"<br>");
					//$('.worksinfo .wkcreater').html(reCreater?reCreater:'<i>未填写</i>'); //创作者
					var reDesp = workinfo['t_worksDesp'].replace(/\r\n/g,"<br>");
					$('.worksinfo .wkdesp').html(reDesp?reDesp:'<i>未填写</i>'); // 作品简介
					$('.worksinfo .createrTime').html(workinfo['t_createTimeStr']?workinfo['t_createTimeStr']:'<i>未填写</i>'); //发表时间
					$('.emptys').empty(); 
					if(workinfo['tWorksAwardInfoList'].length !== 0){
						var ad_html = '<dt class="emptys">获奖信息:</dt><dd class="emptys">';
						$.each(workinfo['tWorksAwardInfoList'],function(k,v){
							ad_html += v['m_adFestName']+' '+v['m_adFestYearName']+'年 '+v['m_adFestAwardName']+'<br/>';
						});
						ad_html += '</dd>';
						$('.worksinfo .createrTime').after(ad_html);
					}
					//轮播加载 -----start------
					var slideList = workinfo['tWorksPathInfoList'];
					$.each(slideList,function(k,v){
						if(v['t_worksType'] == 1){
							var geshi = type_work(v['t_worksPath']);
							var html = gallery(geshi,v);
							if(geshi == 'mp4'){
								$('#gallery').prepend(html);
							}else if(geshi == 'mp3'){
								var op = $('#gallery .oder_mp4').hasClass("oder_mp4");
								if(op){
									$('#gallery .oder_mp4:last').after(html);
								}else{
									$('#gallery').prepend(html);
								}
							}else{
								$('#gallery').append(html);
							}
						}
					});
					$("#gallery").unitegallery();
					$('#show-id').on('hidden.bs.modal', function (e) {
						$('#gallery').html('').hide();  //关闭之后 清空视频和音频，防止恶意加载流量
					})
					//轮播加载 ------end-------
					if(workinfo['collectionFlag'] == 1 ){
						$('.show-start').removeClass('btn-default').addClass('btn-primary').text('取消收藏');
					}else{
						$('.show-start').addClass('btn-default').removeClass('btn-primary').text('我要收藏');
					}
				}
			})
		})
	}
	//收藏触发按钮
	$('.show-start').click(function(){
		var id = $(this).attr('data-id');  //注意在列表加上data-id属性
		var class_btn = $(this).hasClass('btn-default');
		if(class_btn){
			$.ajax({
				url:'../collectWorksInfo.do',
				dataType:'json',
				type:'post',
				data:{worksId:id,collectionFlag:0},
				success:function(data){
					layer.msg('收藏成功', {icon: 1});
					$('.show-start').removeClass('btn-default').addClass('btn-primary').text('取消收藏');
				}
			})
		}else{
			$.ajax({
				url:'../collectWorksInfo.do',
				dataType:'json',
				type:'post',
				data:{worksId:id,collectionFlag:1},
				success:function(data){
					layer.msg('取消收藏成功', {icon: 1});
					$('.show-start').addClass('btn-default').removeClass('btn-primary').text('我要收藏');
				}
			})
		}
	});
	//轮播 幻灯片
	function gallery(type,dataFile){
		if(type == 'mp4'){
			var html_mp4 = '<img alt="" src="../view/assets/img/play.jpg" class="oder_mp4"  data-type="html5video"  data-image="../view/assets/img/play_bg.jpg"    data-videomp4="'+dataFile['t_worksPath']+'"  data-description="">';
			return html_mp4;
		}else if(type == 'mp3'){
			var html_mp3 = '<img alt="" src="../view/assets/img/music.jpg" class="oder_mp3"  data-type="html5video"  data-image="../view/assets/img/music.jpg"    data-videomp4="'+dataFile['t_worksPath']+'"  data-description="">';
			return html_mp3

		}else{
			var html = '<img alt="" class="oder_img"  src="'+dataFile['t_worksPath']+'" data-image="'+dataFile['t_worksPath']+'" data-description="">';
			return html;
		}
		
	}

	// 编辑展示页面
	function update_view(){
		//修改
		$('.update').click(function(){
			var id = $(this).attr('data-id');
			$('#works_id').val(id);
			$('#advertiser,#brandsInfo').empty(); //初始化广告主 初始化品牌
			$('#advertiser,#brandsInfo').selectpicker('refresh');
			$('.loadingtext').hide(); 
			$('#filelist').show(); //资源作品展示
			$('.btn-dis').removeAttr('disabled'); //开启提交状态
			$.ajax('../selectWorksInfoById.do',{
				type:'post',
				cache:false,
				dataType:'json',
				data:{worksId:id},
				success:function(data){
					var vinfo = data['worksInfo'];
					$('#user-update #up_worksName').val(vinfo['t_worksName']); //作品名称
					//$('#user-update #worksCreater').val(vinfo['t_worksCreater']); //创建者
					
					$('#user-update #worksDesp').val(vinfo['t_worksDesp']);  //作品简介

					$('#awardId').empty().append('<option value ='+vinfo['m_awardId']+'>'+vinfo['m_awardName']+'</option>');
					$.ajax({
						url:'../initUploadSelectList.do',
						type:'post',
						dataType:'json',
						success:function(awdata){
							//创作团队 内部
							var pos="";
							//制作公司 外部
							var bos="";
							$.each(awdata['creatorPositionList'],function(key,value){
								if(value['m_positionType'] == 1){
										pos += "<div class=\"form-inline\">";
										pos += "	<div class=\"form-group\">";
										pos += "		<label class=\"lab\" ><\/label>";
										pos += "		<input type=\"text\" class=\"form-control\" name="+value['m_positionId']+"  placeholder=\"请输入"+value['m_positionName']+"姓名\"> <strong>"+value['m_positionName']+"<\/strong>";
										pos += "	<\/div>";
										pos += "<\/div>";
								}else{
									bos += "<div class=\"form-inline\">";
									bos += "	<div class=\"form-group\">";
									bos += "		<label class=\"lab\" style=\"vertical-align:top\"><\/label>";
									bos += "		<textarea class=\"form-control\" rows=\"5\" style=\"width:50%;\"  placeholder=\"请输入公司名称\" name="+value['m_positionId']+"><\/textarea>";
									bos += "		<strong style=\"vertical-align:top\"> "+value['m_positionName']+"<\/strong>";
									bos += "	<\/div>";
									bos += "<\/div>";
								}
							});
							$('#chuangzuo-ajax').empty().append(pos);
							$('#chuangzuo-ajax .form-inline').eq(0).find('label').append('<b>*</b> 公司内 创作团队');
							$('#gongsi-ajax').empty().append(bos);
							$('#gongsi-ajax .form-inline').eq(0).find('label').append('公司外 制作公司');
							//赋值
							$.each(vinfo['tWorksCreatorInfoList'],function(key,value){
									$("[name="+value['m_positionId']+"]").val(value['t_worksCreator']);
								
							});


							$('.adList').empty();
							$.each(vinfo['tWorksAwardInfoList'],function(k,v){
								var adhtmls = '<li class="'+v['m_adFestId']+' ad_id_list"><ul class="list-inline adcheck">' 
											adhtmls += '<li data-id="'+v['m_adFestId']+'">'+v['m_adFestName']+'</li>';
											adhtmls += '<li data-id="'+v['m_adFestYearId']+'">'+v['m_adFestYearName']+'</li>';
											adhtmls += '<li data-id="'+v['m_adFestAwardId']+'">'+v['m_adFestAwardName']+'</li>';
											adhtmls += '<li data-id="'+v['m_adFestId']+'" class="adremove"><span class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-remove"></i> 删除</span></li>';
											adhtmls += '</li></ul>';
										$('.adList').append(adhtmls);
							});
							//删除
							$('.adremove').on('click',function(){
								var ad_id = $(this).attr('data-id');
								$('.'+ad_id).remove();
							})
							//广告节获奖
							$('.addAd').click(function(){
								var adhtml = "";
									    adhtml += "<div class=\"form-inline\">\n";
									    adhtml += "	<div class=\"form-group\">\n";
									    adhtml += "		<label class=\"lab\">广告节<\/label>\n";
									    adhtml += "		<select class=\"form-control selectpicker\" data-live-search=\"true\" id=\"adFestId\" name=\"adFestId\">\n";
									    adhtml += "			<option value=\"\">请选择广告节<\/option>\n";						    
									$.each(awdata['advertFestivalList'],function(key,value){
										 adhtml += "<option value="+value['m_adFestId']+"-"+value['m_adFestName'].replace(' ','+')+">"+value['m_adFestName']+"<\/option>\n";
									})
									adhtml += "		<\/select>\n";
								    adhtml += "	<\/div>\n";
								    adhtml += "<\/div>\n";
								    adhtml += "<div class=\"form-inline\">\n";
								    adhtml += "	<div class=\"form-group\">\n";
								    adhtml += "		<label class=\"lab\">广告节年份<\/label>\n";
								    adhtml += "		<select class=\"form-control selectpicker\" data-live-search=\"true\" id=\"adFestYearId\" name=\"adFestYearId\" >\n";
								    adhtml += "			<option value=\"\">请选择年份<\/option>\n";
								    adhtml += "		<\/select>\n";
								    adhtml += "	<\/div>\n";
								    adhtml += "<\/div>\n";
								    adhtml += "<div class=\"form-inline\">\n";
								    adhtml += "	<div class=\"form-group\">\n";
								    adhtml += "		<label class=\"lab\">奖项名称<\/label>\n";
								    adhtml += "		<select class=\"form-control selectpicker\" data-live-search=\"true\" id=\"adFestAwardId\" name=\"adFestAwardId\" >\n";
								    adhtml += "			<option value=\"\">请选择奖项名称<\/option>\n";
								    adhtml += "		<\/select>\n";
								    adhtml += "	<\/div>\n";
								    adhtml += "<\/div>\n";
								    adhtml += "<div class='text-center'><span class='btn btn-default btn-xs adquxiao'>取消</span><span class='btn btn-primary btn-xs adqueding'>确定</span></div>"
									$('#adFestId-show').empty().append(adhtml);
									$('#adFestId,#adFestYearId,#adFestAwardId').selectpicker('refresh'); //刷新

									//广告节触发事件
									$('#adFestId').on('changed.bs.select',function(){
										var m_adFestId = $(this).val().split("-",1).toString(); //分割并转字符串类型
										if(m_adFestId !== ''){
											$.ajax({
												url:'../selectAdvertFestivalYearAward.do',
												dataType:'json',
												type:'post',
												data:{adFestId:m_adFestId},
												success:function(advdata){
													if(advdata['status'] == 200){
														//广告年份激活
														var yearhtml = '';
														$.each(advdata['advertFestivalYearList'],function(key,value){
															yearhtml += '<option value="'+value['m_adFestYearId']+'-'+value['m_adFestYearName'].replace(' ','+')+'">'+value['m_adFestYearName']+'</option>';
														});
														$('#adFestYearId').empty().append(yearhtml);

														//广告奖项激活
														var awardhtml = '';
														$.each(advdata['advertFestivalAwardList'],function(key,value){
															awardhtml += '<option value="'+value['m_adFestAwardId']+'-'+value['m_adFestAwardName'].replace(' ','+')+'">'+value['m_adFestAwardName']+'</option>';
														});
														$('#adFestAwardId').empty().append(awardhtml);
													}else{
														$('#adFestYearId').empty().append('<option value="">没有对应的数据</option>');
														$('#adFestAwardId').empty().append('<option value="">没有对应的数据</option>');
													}
													$('#adFestId,#adFestYearId,#adFestAwardId').selectpicker('refresh'); //刷新
												}
											})
										}else{
											$('#adFestYearId').empty().append('<option value="">请选择年份</option>');
											$('#adFestAwardId').empty().append('<option value="">请选择奖项名称</option>');
										}
										$('#adFestId,#adFestYearId,#adFestAwardId').selectpicker('refresh'); //刷新
									});

									//广告节按钮 取消 确定
									$('.adquxiao').on('click',function(){
										$('#adFestId-show').empty();
									});
									$('.adqueding').on('click',function(){
										var adFestId = $('#adFestId').val();
										if(adFestId == ''){
											$('#error').show().text('请选择广告节');
											return false;
										}
										var adFestYearId = $('#adFestYearId').val();
										var adFestAwardId = $('#adFestAwardId').val();
										var adhtmls = '<li class="'+splits(adFestId,0)+' ad_id_list"><ul class="list-inline adcheck">' 
											adhtmls += '<li data-id="'+splits(adFestId,0)+'">'+splits(adFestId,1)+'</li>';
											adhtmls += '<li data-id="'+splits(adFestYearId,0)+'">'+splits(adFestYearId,1)+'</li>';
											adhtmls += '<li data-id="'+splits(adFestAwardId,0)+'">'+splits(adFestAwardId,1)+'</li>';
											adhtmls += '<li data-id="'+splits(adFestId,0)+'" class="adremove"><span class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-remove"></i> 删除</span></li>';
											adhtmls += '</li></ul>';
										$('.adList').append(adhtmls);
										$('#adFestId-show').empty();

										//删除
										$('.adremove').on('click',function(){
											var ad_id = $(this).attr('data-id');
											$('.'+ad_id).remove();
										})
									});
							});
							function splits(str,indexs){
								if(indexs == 0){
									return str.split('-')[0].toString();
								}
								if(indexs == 1){
									return str.split('-')[1].replace('+',' ').toString();
								}
							}

							//遍历部门  并选中部门状态 遍历部门关联
							$('#departmment').empty().append('<option value ='+vinfo['m_departmentId']+'>'+vinfo['m_departmentName']+'</option>')
							$.each(awdata['departmentList'],function(key,value){
								if(value['m_departmentId'] !== vinfo['m_departmentId']){	
									$('#departmment').append('<option value ='+value['m_departmentId']+'>'+value['m_departmentName']+'</option>');
								}
							});
							$('#departmment').selectpicker('refresh');

							//遍历标签功能
							$('#select-tag').empty();
							var labelarr = vinfo['tWorksAndLabelList'];
							var baohan = new Array();
							$.each(labelarr,function(key,value){
								baohan.push(value['m_labelCode']); //获取选中的标签生成数组
							});
							$.each(awdata['worksLabelList'],function(key,value){
								$('#select-tag').append(function(){
									var html = '<p>'+value['m_labelName']+'</p>';
										html +='<ul class="list-inline">';
										$.each(value['worksLabelList'],function(k,v){
											if(baohan.contains(v['m_labelCode'])){
												html += '<li><span class="select_label" style="background-color: rgb(92, 184, 92);"  data-id='+v['m_labelCode']+'>'+v['m_labelName']+'</span></li>';
											}else{
												html += '<li><span  data-id='+v['m_labelCode']+'>'+v['m_labelName']+'</span></li>';
											}
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
						}
					})
					
					
					//指定部门遍历广告主与品牌关联
					var m_departmentId = vinfo['m_departmentId']; //部门 id
					$.ajax({
						url:'../selectAdvertiserList.do',  //获取广告主列表
						dataType:'json',
						type:'post',
						data:{departId:m_departmentId},
						success:function(datas){
							//初始化 广告主 选中状态
							var adbaohan = new Array();
							$.each(datas['advertiserList'],function(key,value){
								adbaohan.push(value['m_advertiserId']);
							})
							if(adbaohan.contains(vinfo['m_advertiserId'])){
								$('#advertiser').append('<option value="'+vinfo['m_advertiserId']+'">'+vinfo['m_advertiserName']+'</option>');
							}else{
								$('#advertiser').append('<option value="">请选择广告主</option>');
							}
							//初始化 品牌 选择状态
							if(vinfo['m_brandName']){
								$('#brandsInfo').append('<option value="'+vinfo['m_brandId']+'">'+vinfo['m_brandName']+'</option>');
							}else{
								$('#brandsInfo').append('<option value="">请选择品牌</option>');
							}

							$.each(datas['advertiserList'],function(key,value){
								//遍历广告主列表
								if(value['m_advertiserId'] !== vinfo['m_advertiserId']){
									$('#advertiser').append('<option value='+value['m_advertiserId']+'>'+value['m_advertiserName']+'</option>');
								}
							});
							$('#advertiser').selectpicker('refresh'); 
							//品牌初始化 显示全部
							$.ajax({
								url:'../selectBrandsList.do',
								dataType:'json',
								type:'post',
								data:{advertId:vinfo['m_advertiserId'],departId:vinfo['m_departmentId']},
								success:function(brchushi){
									//console.log(brchushi);
									if(brchushi.status == '200'){
										$.each(brchushi['brandsInfoList'],function(key,value){
											$('#brandsInfo').append('<option value='+value['m_brandId']+'>'+value['m_brandName']+'</option>');
										});
									}else{
										$('#brandsInfo').append('<option value="">没有该广告主的品牌信息</option>');
									}
									$('#brandsInfo').selectpicker('refresh');
								}
							});

						}
					});
					
					//触发部门事件
					$('#departmment').on('changed.bs.select',function(){
						var bumen_id = $(this).selectpicker('val');
						$.ajax({
							url:'../selectAdvertiserList.do',
							dataType:'json',
							type:'post',
							data:{departId:bumen_id},
							success:function(bulist){
								//console.log(bulist['advertiserList']);
								$('#advertiser').empty().append('<option value="">请选择广告主</option>');
								$.each(bulist['advertiserList'],function(k,v){
									$('#advertiser').append('<option value="'+v['m_advertiserId']+'">'+v['m_advertiserName']+'</option>');
								});
								$('#advertiser').selectpicker('refresh'); //广告主刷新
								$('#brandsInfo').empty().append('<option value="">请选择品牌信息</option>');
								$('#brandsInfo').selectpicker('refresh');
							}
						})
					});

					//触发广告主事件
					$('#advertiser').on('changed.bs.select',function(){
						var m_advertiserId = $(this).selectpicker('val'); //获取广告主的值
						if(m_advertiserId == ''){  //不可初始化品牌
							$('#brandsInfo').empty().append('<option value="">没有该广告主的品牌信息</option>');
							$('#brandsInfo').selectpicker('refresh');
							return false;
						}
						$.ajax({
							url:'../selectBrandsList.do',
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
						});
					});


					// 封面图片显示
					$('#clipArea,#clipBtn').hide(); //初始化
					$('#view').css('background-image','').hide(); // 初始化
					$('#hiddenFile').val(''); //上传作品初始化
					$('#pickfiles b').text(''); // 作品数量初始化
					$('#filelist').empty(); //作品展示初始化
					var path_array = new Array();
					$.each(vinfo['tWorksPathInfoList'],function(key,value){
						//console.log(value['t_worksPath']);
						$('#thumb_img').show();
						if(value['t_worksType'] == 0){
							$('#thumb_img img').attr('src',value['t_worksPath']);
						}else{
							//console.log(type_work(value['t_worksPath']));
							//var path_id = value['t_worksPathId'];
							if(type_work(value['t_worksPath']) == 'mp4'){
								var html_mp4 = '<img data-toggle="tooltip" data-placement="top" title="单击删除视频" src="../view/assets/img/play.jpg" class="oder_mp4 path-id" data-id='+value['t_worksPathId']+' />';
								$('#filelist').prepend(html_mp4);
							}else if(type_work(value['t_worksPath']) == 'mp3'){
								var op = $('#filelist .oder_mp4').hasClass("oder_mp4");
								var html_mp3 = '<img data-toggle="tooltip" data-placement="top" title="单击删除音频" src="../view/assets/img/music.jpg" class="oder_mp3 path-id" data-id='+value['t_worksPathId']+' />';
								if(op){
									$('#filelist .oder_mp4:last').after(html_mp3);
								}else{
									$('#filelist').prepend(html_mp3);
								}
							}else{
								//console.log(value['t_worksPath']);  <i class="glyphicon glyphicon-remove delete-img"></i>
								var html = '<img src='+value['t_worksPath']+' data-toggle="tooltip" data-placement="top" title="单击删除图片" class="oder_img path-id" data-id='+value['t_worksPathId']+' />';
								$('#filelist').append(html);
							}
						}
					});
					$('[data-toggle="tooltip"]').tooltip();
					$('#filelist img').hover(function(){
						$(this).css('border','1px solid red');
					},function(){
						$(this).css('border','0px');
					});
					$('#filelist img').click(function(){
						$(this).hide();
						var id = $(this).attr('data-id');
						//console.log(id);
						path_array.push(id);
						$('#delFileParas').val(path_array.join(","));  //赋值 用来删除旧资源文件
						$('#delFileParas').attr('name','delFileParas');
					})		
					
				}
			})
		})
	}

	// 删除作品
	function del_view(){
		$('.del').click(function(){
			var del_id = $(this).attr('data-id');
			//询问框
			layer.confirm('删除之后不可恢复，确定删除？', {
			  btn: ['确定','取消'] //按钮
			}, function(){
				//进行相应操作之后 执行下面
				$.ajax({
					url:'../deleteWorksInfo.do',
					type:'post',
					dataType:'json',
					data:{worksId:del_id},
					success:function(data){
						//console.log(data);
						if(data.status == 200){
							$('.del'+del_id).fadeOut('300');
			  				layer.msg('删除成功', {icon: 1});
						}
					}
				})
				
			});
		})
	}
	//提交更新保存
	$('#uploadForm').submit(function(){
		var adArray = new Array();
		$('.adList .ad_id_list').each(function(){
			var adFestId = $(this).children().children().eq(0).attr('data-id');
			var adFestYearId = $(this).children().children().eq(1).attr('data-id');
			var adFestAwardId = $(this).children().children().eq(2).attr('data-id');
			for(var i = 0;i< $('.ad_id_list').length;i++){
				var adString = adFestId+';'+adFestYearId+';'+adFestAwardId;
			}
			adArray.push(adString);
		});
		var worksName	   = $('#up_worksName').val(); //作品名称
		if(!worksName){
			$('#error').show().text('作品名称不能为空!');
			return false;
		}
		if(worksName.length >= 30){
			$('#error').show().text('作品名称太长了,不可超过15字');
			return false;
		}
		//校验团队名单
		var ko = 0;
		$('#chuangzuo-ajax input').each(function(k,v){
			var cv = $(this).val();
			if(cv !== ''){
				ko = 1;
			}
		});
		if(ko == 0){
			$('#error').show().text('公司内部 创作团队必填其中一个');
			return false;
		}
		var sub_bumen = $('#departmment').val(); //部门 sub_bumen
		if(!sub_bumen){
			$('#error').show().text('请选择所属部门');
			return false;
		}
		var worksimage     = $('#view').css('background-image');
		if(worksimage == 'none'){
			var thumb_base = "";
		}else{
			var base = worksimage.substr(worksimage.indexOf(",", 1) + 1);
			var base = worksimage.split(",");
			var thumb_base = base[1].substr(0,base[1].indexOf(')'));
		}
		
		var m_labelCode	   = new Array();  //标签数组
		$('#select-tag .select_label').each(function(key){
			var tag_id = $(this).attr('data-id');
			m_labelCode.push(tag_id);
		});
		//验证通过之后执行 
		$('#error').hide(); //隐藏错误提示
		$('.loadingtext').show(); 
		$('.btn-dis').attr('disabled','disabled'); //禁止重复提交
		//检验
		var option = {
				data:{
					   labelList:m_labelCode.join(","),
					   worksAwardList:adArray.join(","),
					   worksImage:thumb_base
				},
				dataType:'json',
				success:function(data){
					if(data.status == "200"){
						$('loadingtext').hide();
						alert('上传完成,提交成功');

						window.location.reload() ;
					}
				}
			};
			 console.log(option);
		$(this).ajaxSubmit(option);
		return false;
	})

	//选择作品上传资源事件
	$('#pickfiles').click(function(){
		return $('#hiddenFile').click();
	});
	$('#hiddenFile').change(function(){
		var k = $(this).val();
		var m = $(this).get(0).files;
		$('#pickfiles b').text(' '+m.length+'个文件');
		//$('#filelist').hide();
		var file_name_attr = $('#hiddenFile').get(0).files;
		if(file_name_attr.length !== 0){
			$('#hiddenFile').attr('name','worksFile');
			var imglist = $('#hiddenFile').get(0).files;
			//console.log(imglist);
			//$('#delFileParas').attr('name','delFileParas');

		}else{
			$('#hiddenFile,#delFileParas').removeAttr('name');
		}

		//console.log(m.length);
	});
	//判断格式
	function type_work(pathName){
		var type = pathName.substring(pathName.lastIndexOf(".")+1,pathName.length);
		return type.toLowerCase();
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
			$('#thumb_img,#view').hide();
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

	//封装数组是否包含所在的标签
	Array.prototype.contains = function ( needle ) {
	  for (i in this) {
	    if (this[i] == needle) return true;
	  }
	  return false;
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

	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return decodeURIComponent(r[2]); return null; 
	} 

})
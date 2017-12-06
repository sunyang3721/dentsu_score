//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
//
$(function() {
		//判断登陆
		$.ajaxSetup({   
		   contentType:"application/x-www-form-urlencoded;charset=utf-8",   
		   complete:function(XMLHttpRequest,textStatus){ 
		     var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus，  
		         if(sessionstatus != "200"){ 
						layer.msg('登陆已过期,正在刷新重新登陆...', {icon: 0});
						setTimeout(function () {
							//如果超时就处理 ，指定要跳转的页面  
							window.location = "../userLogin.do";   
						}, 1000);
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
		if(keyword == '' || keyword == null){
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

	//New pictures tab
	$('.newlist').click(function() {
		$('#view').val('0');
		$('#publishsortFlag').val('0');
		$('#creatsortFlag').val('1');
		
		clear_list();
		ajaxpost(1);
	})

	//Hot pictures tab
	$('.hotlist').click(function() {
		$('#view').val('1');
		$('#publishsortFlag').val('0');
		$('#creatsortFlag').val('1');
		clear_list();
		ajaxpost(1);
	})

	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:07:22
	 * @description: 列表 缩略图 指定分页输出
	 */
	function ajaxpost(page){
		var url = '../queryWorksInfoList.do';
		var param = location.search;
		var view = $('#view').val();  //orderFlag 0 为 new 排序  1 为 hot 排序 2 为 上传日期 排序
		var sortFlag = 0; // 0为降序 1为升序
		if (view == 2) {
			sortFlag = $('#creatsortFlag').val();
		} else {
			sortFlag = $('#publishsortFlag').val();
		}
		var type = $('#type').val();  // 0 为 列表显示  1 为 缩略图显示
		loading_page('Loading......');
		$.ajax(url+param,{
			type:'post',
			dataType:'json',
			data:{pageNum:page,orderFlag:view,loadCount:numloadCount,sortFlag:sortFlag},
			success:function(data){
				stop = true; //无线滚动加载 锁定
				$('#conts').html('共检索出 <b>'+data['worksCnt']+'</b> 条结果')
				switch(type){
					case '0' :
					if(page == '1'){
						var orderTU,orderDU;
						if(view != 1){
							if(sortFlag == 1 && view == 0){
								orderTU = "<a href='#' id='publisDT' class='publisDT'>发布时间 <i class='glyphicon glyphicon-sort-by-attributes'></i></a>";
							}else if(sortFlag == 0 && view == 0){
								orderTU = "<a href='#' id='publisDT' class='publisDT'>发布时间 <i class='glyphicon glyphicon-sort-by-attributes-alt'></i></a>";
							}else{
								orderTU = "<a href='#' id='publisDT' class='publisDT'>发布时间</a>";
							}
							if(sortFlag == 1 && view == 2){
								orderDU = "<a href='#' id='createDT' class='createDT'>上传日期 <i class='glyphicon glyphicon-sort-by-attributes'></i></a>";
							}else if(sortFlag == 0 && view == 2){
								orderDU = "<a href='#' id='createDT' class='createDT'>上传日期 <i class='glyphicon glyphicon-sort-by-attributes-alt'></i></a>";
							}else{
								orderDU = "<a href='#' id='createDT' class='createDT'>上传日期</a>";
							}
						}else{
							orderTU = '发布时间';
							orderDU = '上传日期';
						}
						var html = "<ul id='noneHover'>";
						    html += "<li class='list-img frist-height'><\/li>\n";
						    html += "<li class='list-title frist-height'>标题<\/li>\n";
						    html += "<li class='list-pinpai frist-height'>品牌<\/li>\n";
						    html += "<li class='list-guanggao frist-height'>广告主<\/li>\n";
						    html += "<li class='list-fenlei frist-height'>作品标签<\/li>\n";
						    html += "<li class='list-user frist-height'>"+orderTU+"<\/li>\n";
						    html += "<li class='frist-height' style='width:10%'>"+orderDU+"<\/li>\n";
						    html += "</ul><div class='clearfix'></div>";
						$('.ajax-newlist').append(html);
						//发布时间排序
						$('#publisDT,.publisDT').on('click',function(){
							$('#view').val('0');
							var sortnum = $('#publishsortFlag').val();
							$('#creatsortFlag').val('1');
							if(sortnum == 0){
								$('#publishsortFlag').val('1');
							}else{
								$('#publishsortFlag').val('0');
							}
							clear_list();
							ajaxpost(1);
						});
						//上传日期排序
						$('#createDT,.createDT').on('click',function(){
							$('#view').val('2');
							var sortnum = $('#creatsortFlag').val();
							$('#publishsortFlag').val('1');
							if(sortnum == 0){
								$('#creatsortFlag').val('1');
							}else{
								$('#creatsortFlag').val('0');
							}
							clear_list();
							ajaxpost(1);
						})
					}
					list_view(data);
					break;
					case '1' :
					list_img(data);
					break;
				}
				info_view(); // 查看作品 this id click
			}
		});
	}

	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:08:12
	 * @description: 列表视图输出
	 */
	function list_view(data){
		// console.log(data);
		var user = getQueryString("myWorksFlag");  // 空为 不限 ，0 为 我的上传，1 为 我的收藏
		var keyword = getQueryString("inputKeyWord"); //关键字; 
		function checkLinshi(value,bool){
				var bool;
				if(value['m_advertiserId'] == 'a00001'){
					return bool?value['t_advertiserName'] || '未填写':value['t_brandName'] || '未填写';
				}else{
					return bool?value['m_advertiserName'] || '未填写':value['m_brandName'] || '未填写';
				}
			
		}
		if(data.status=='200'){
			switch(user){
				case '' :  //默认
				$.each(data['worksInfoList'],function(key,value){
						//var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
						var img = value['t_worksImagePath'];
						var strVar = "<ul class='list-inline del"+value['t_worksId']+"' data-id="+value['t_worksId']+">";
						    strVar += "<li class='list-img'>";
						    strVar += "	<img src="+img+" title ="+value['t_worksName']+" class=\"img-responsive img-rounded detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">";
						    strVar += "<\/li>";
						    strVar += "<li class='list-title'>";
						    strVar += "	<p class=\"detailview\" data-toggle=\"modal\" data-target=\"#show-id\"   data-id="+value['t_worksId']+">"+value['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>')+"<\/p>";
						    strVar += "<p class='text-muted'><i class='glyphicon glyphicon-star'><\/i> "+value['collectionNum']+" <\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-pinpai'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += checkLinshi(value,false);
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-guanggao'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += checkLinshi(value,true);
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-fenlei'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['worksLabel']?value['worksLabel']:'<i>未填写</i>';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += value['t_publishDateStr']?dateSplic(value['t_publishDateStr'],0)+'年'+dateSplic(value['t_publishDateStr'],1)+'月':'未填写';
						    strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += value['t_createTimeStr'];
						    strVar += "<\/li>";
						    strVar += "<div class=\"clearfix\">";
						    strVar += "<\/div>";
						    // start 修改按钮
						    strVar += "	<p class=\"text text-muted btn-post del"+value['t_worksId']+"\">";
						    if(value['editLimit'] == 1){
						    	strVar += '<span class="update btn-xs btn-primary btn" data-toggle=\"modal\" data-target=\"#user-update\" data-id='+value['t_worksId']+'><i class="glyphicon glyphicon-edit"></i> 编辑</span>' 
						    };
						    if(value['deleteLimit'] == 1){
						    	strVar += ' <span class="del btn-xs btn-danger btn" data-id='+value['t_worksId']+'><i class="glyphicon glyphicon-trash"></i> 删除</span>';
						    };
						    strVar += "	<\/p>";
						    // end
						    strVar += '</ul>';
					$('.ajax-newlist').append(strVar);
				});
				update_view();
				del_view();
				break;
				case '0': //我的上传
				$.each(data['worksInfoList'],function(key,value){
						//var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
						$('.show-start').hide();
						var img = value['t_worksImagePath'];
						var strVar = "<ul class=\"list-inline del"+value['t_worksId']+"\"  data-id="+value['t_worksId']+">";
						    strVar += "<li class='list-img'>";
						    strVar += "	<img src="+img+" title ="+value['t_worksName']+" class=\"img-responsive img-rounded detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">";
						    strVar += "<\/li>";
						    strVar += "<li class='list-title'>";
						    strVar += "	<p class=\"detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">"+value['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>')+"<\/p>";
						    strVar += "<p class='text-muted'><i class='glyphicon glyphicon-star'><\/i> "+value['collectionNum']+" <\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-pinpai'>";
						    strVar += "	<p class=\"text-muted\">";
						     strVar += checkLinshi(value,false);
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-guanggao'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += checkLinshi(value,true);
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-fenlei'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['worksLabel']?value['worksLabel']:'<i>未填写</i>';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += value['t_publishDateStr']?dateSplic(value['t_publishDateStr'],0)+'年'+dateSplic(value['t_publishDateStr'],1)+'月':'未填写';
						    strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += value['t_createTimeStr'];
						    strVar += "<\/li>";
						    strVar += "<div class=\"clearfix\">";
						    strVar += "<\/div>";
						    // start 修改按钮
						    strVar += "	<p class=\"text text-muted btn-post del"+value['t_worksId']+"\">";
						    if(value['editLimit'] == 1){
						    	strVar += '<span class="update btn-xs btn-primary btn" data-toggle=\"modal\" data-target=\"#user-update\" data-id='+value['t_worksId']+'><i class="glyphicon glyphicon-edit"></i> 编辑</span>' 
						    };
						    if(value['deleteLimit'] == 1){
						    	strVar += ' <span class="del btn-xs btn-danger btn" data-id='+value['t_worksId']+'><i class="glyphicon glyphicon-trash"></i> 删除</span>';
						    };
						    strVar += "	<\/p>";
						    // end
						    strVar += '</ul>';
						    
					$('.ajax-newlist').append(strVar);
				});
				update_view();
				del_view();
				
				break;
				case '1':  //我的收藏
				$.each(data['worksInfoList'],function(key,value){
						//var img = 'http://7xpq9h.com1.z0.glb.clouddn.com/'+key+'.jpg-dentsu';
						$('.show-start').hide();
						var img = value['t_worksImagePath'];
						var strVar = "<ul class=\"list-inline start"+value['t_worksId']+"\" data-id="+value['t_worksId']+">";
						    strVar += "<li class='list-img'>";
						    strVar += "	<img src="+img+" title ="+value['t_worksName']+" class=\"img-responsive img-rounded detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">";
						    strVar += "<\/li>";
						    strVar += "<li class='list-title'>";
						    strVar += "	<p class=\"detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">"+value['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>')+"<\/p>";
						    //strVar += "<p class='text-muted'><i class='glyphicon glyphicon-star'><\/i> 20 <\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-pinpai'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += checkLinshi(value,false);
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-guanggao'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += checkLinshi(value,true);
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-fenlei'>"
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['worksLabel']?value['worksLabel']:'<i>未填写</i>';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += value['t_publishDateStr']?dateSplic(value['t_publishDateStr'],0)+'年'+dateSplic(value['t_publishDateStr'],1)+'月':'未填写';
						    strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += value['t_createTimeStr'];
						    strVar += "<\/li>";
						    strVar += "<div class=\"clearfix\">";
						    strVar += "<\/div>";
						    strVar += "	<p class=\"text-muted style='width:26%;position:absolute;top:45px;left:8%;' start"+value['t_worksId']+"\">";
						    strVar += '<span class="start btn-xs btn-post btn-danger btn" data-id='+value['t_worksId']+'>取消收藏</span>';
						    strVar += "	<\/p>";
						    strVar += '</ul>';
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
			stop = false;
			layer.msg('已全部加载完成', {icon: 1});
		}
	}

	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:08:41
	 * @description: 缩略图视图列表输出
	 */
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
					    //strVar += "		<img src="+value['thumbnail']+" title ="+value['t_worksName']+" class='img-responsive'>";
					    strVar += "		<img src="+img+" title ="+value['t_worksName']+" class='img-responsive'>";
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
					    //strVar += "		<img src="+value['thumbnail']+" title ="+value['t_worksName']+">";
					    strVar += "		<img src="+img+" title ="+value['t_worksName']+">";
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
					   // strVar += "		<img src="+value['thumbnail']+" title ="+value['t_worksName']+">";
					    strVar += "		<img src="+img+" title ="+value['t_worksName']+">";
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
			stop = false;
			layer.msg('已全部加载完成', {icon: 1});
		}
	}

	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:08:57
	 * @description: 查看作品详情页
	 */
	function info_view(){
		$('.detailview').click(function(){
			var ty = $(this).hasClass('img-rounded');
			if(ty){
				$(this).parent().next().find('.detailview').css('color','#989898'); //已访问样式
			}else{
				$(this).css('color','#989898'); //已访问样式
			}
			var id = $(this).attr('data-id');  //注意在列表加上data-id属性
			$('.show-start').attr('data-id',id); //克隆收藏控件

			//作品描述 用对应的id 加载
			$.ajax('../selectWorksInfoById.do',{
				type:'post',
				dataType:'json',
				data:{worksId:id},
				success:function(data){
					var workinfo = data['worksInfo'];
					//console.log(workinfo);
					var chuangzuohtml = '<table class="pos"><tbody>';  //创作团队
					var gongsihtml = '<table class="pos"><tbody>'; //公司制作
					var reg = new RegExp("[,，|\r\n]","g");//g,表示全部替换。
					$('.gongsi-dt').addClass('hide');  //制作公司 默认隐藏
					$.each(workinfo['tWorksCreatorInfoList'],function(key,value){
						if(value['m_positionType'] == 1 || value['m_positionType'] == 3){
							var workslist = value['t_worksCreator'].replace(reg,'/');
							var worksarr = workslist.split('/');
							var htmltag = '' ;
							$.each(worksarr,function(k,v){
								if(k !== 0 ){
									htmltag +=' / ';
								}
								htmltag += '<a class="clicklink">'+v+'</a>';
							});
							chuangzuohtml += '<tr><td>'+value['m_positionName']+'</td><td>'+htmltag+'</td></tr>';
						}
						if(value['m_positionType'] == 2){
							var clicktorlink = '';
							var creatorlink = value['t_worksCreator'].replace(/CO\s*.\s*,\s*LTD/ig,';').replace(reg,'/').replace(/;/g,'CO., LTD');
							$.each(creatorlink.split('/'),function(k,v){
								clicktorlink += '<a class="clicklink">'+v+'</a><br/>';
							});
							gongsihtml += '<tr><td>'+value['m_positionName']+'</td><td>'+clicktorlink+'</td></tr>';
							$('.gongsi-dt').removeClass('hide');
						}
					});
						chuangzuohtml += '</tbody></table>';
						gongsihtml += '</tbody></table>';
						$('#chuangzuo-list').empty().append(chuangzuohtml);
						$('#gongsi-list').empty().append(gongsihtml);
						$('.clicklink').click(function(){
								var txt = $(this).text();
								tagLink(txt);
						});
					$('.worksinfo .workname').html(workinfo['t_worksName']); //作品名称
					$('.worksinfo .deparname').html(workinfo['m_departmentName']?workinfo['m_departmentName']:'<i>未填写</i>'); //所属部门

					if(workinfo['m_advertiserId'] == 'a00001'){
						$('.worksinfo .advername').html(workinfo['t_advertiserName']?workinfo['t_advertiserName']:'<i>未填写</i>'); //广告主临时 自定义
						$('.worksinfo .branname').html(workinfo['t_brandName']?workinfo['t_brandName']:'<i>未填写</i>'); //品牌临时 自定义
					}else{
						$('.worksinfo .advername').html(workinfo['m_advertiserName']?workinfo['m_advertiserName']:'<i>未填写</i>'); //广告主
						$('.worksinfo .branname').html(workinfo['m_brandName']?workinfo['m_brandName']:'<i>未填写</i>'); //品牌
					}
					$('.worksinfo .labels').html(workinfo['worksLabel']?workinfo['worksLabel']:'<i>未填写</i>');  //作品标签
					var reCreater = workinfo['m_userName'];
					$('.worksinfo .uploadname').html(reCreater); //上传者
					var reDesp = workinfo['t_worksDesp'].replace(/\r\n/g,"<br>");
					$('.worksinfo .wkdesp').html(reDesp?reDesp:'<i>未填写</i>'); // 作品简介
					$('.worksinfo .publishDate').html(workinfo['t_publishDateStr']?dateSplic(workinfo['t_publishDateStr'],'')+'年'+dateSplic(workinfo['t_publishDateStr'],1)+'月':'<i>未填写</i>'); //出街日期
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
						//console.log(v);
						if(v['t_worksType'] == 1){  
							var file_type = v['t_fileType'].toLocaleLowerCase();
							var html = gallery(file_type,v);
							$('#gallery').append(html);
							//console.log(html);
							// if(file_type == 'mp4'){
							// 	$('#gallery').prepend(html);
							// }else if(file_type == 'mp3'){
							// 	var op = $('#gallery .oder_mp4').hasClass("oder_mp4");
							// 	if(op){
							// 		$('#gallery .oder_mp4:last').after(html);
							// 	}else{
							// 		$('#gallery').prepend(html);
							// 	}
							// }else{
							// 	var imgtype = $('#gallery .oder_word').hasClass("oder_word");
							// 	if(imgtype){
							// 		$('#gallery .oder_word:first').before(html);
							// 	}else{
							// 		$('#gallery').append(html);
							// 	}
							// }
						}
					});
					var api;
					api = $("#gallery").unitegallery({
						//code
					});
					api.getItem(0);
					api.on("item_change",function(num, data){		//on item change, get item number and item data
						//console.log(data);
						$('.titlelink').remove(); //字幕标题
						if(data['type'] =='html5video'){
							$('.ug-zoompanel').hide();
						}else if(data['html']){
							$('.ug-zoompanel').hide();
							$('.ug-item-wrapper').after('<a class="titlelink" href="'+data['thumb']+'" target="_blank">'+data['title']+'</a>');
						}else{
							$('.ug-zoompanel').show();
							if(data['title'] == 'pdf' || data['title'] == 'doc' || data['title'] == 'docx' || data['title'] == 'ppt' || data['title'] == 'pptx' || data['title'] == 'xls' || data['title'] == 'xlsx' || data['title'] == 'csv'){
								if(data['thumb'] == ''){
									$('.ug-zoompanel').hide(); //转码未完成，隐藏左侧控制按钮
									$('.ug-item-wrapper').after('<div class="titlelink buttonClick"></div>');
									$('.buttonClick').on('click',function(){
										layer.msg('正在转码中，请稍候！');
									})
								}else{
									var swfUrl = './preview.html?name='+data['pathid']; //预览文档
									$('.glyphicon-eye-open').attr('data-src',swfUrl);
									$('.ug-item-wrapper').after('<a class="titlelink" href="'+swfUrl+'" target="_blank"></a>');
								}
							}else{
								var src = './imageview.html?url='+encodeURI(data['thumb']);
								$('.glyphicon-eye-open').attr('data-src',src); //查看原图url
								$('.ug-item-wrapper').after('<a class="titlelink" href="'+src+'" target="_blank"></a>');
							}
						}
					});


					$('#show-id').on('hidden.bs.modal', function (e) {
						$('#gallery').html('').hide();  //关闭之后 清空视频和音频，防止恶意加载流量
					});

					//轮播加载 ------end-------
					if(workinfo['collectionFlag'] == 1 ){
						$('.show-start').removeClass('btn-default').addClass('btn-primary').text('取消收藏');
					}else{
						$('.show-start').addClass('btn-default').removeClass('btn-primary').text('我要收藏');
					}
				}
			});
		});

		//业务团队内部人员标签增加跳转链接
		function tagLink(tag){
			window.open('search.html?inputKeyWord='+tag+'&myWorksFlag=');
		}
	}
	
	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:09:27
	 * @description: 出街日期格式化
	 */
	function dateSplic(data,key){
		if(data !==''){
			var text = data.split('-');
			if(key == ''){
				return text['0'];
			}else{
				return text[key];
			}
		}else{
			return ' 未知'
		}
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

	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:10:22
	 * @description: 轮播 幻灯片
	 */
	function gallery(type,dataFile){
		//console.log(dataFile);
		switch(type){
			case 'mp4':
				var imgs = dataFile['t_thumbnailPath']?dataFile['t_thumbnailPath']:"../view/assets/img/play_bg.jpg";
				var play = dataFile['t_thumbnailPath']?dataFile['t_thumbnailPath']:"../view/assets/img/play.jpg";
				var html = '<img title ="" src="'+play+'" class="oder_mp4"  data-type="html5video"  data-image="'+imgs+'"    data-videomp4="'+dataFile['t_worksPath']+'"  data-description="">';
				return html;
				break;
			case 'mp3':
				var html = '<img title ="" src="../view/assets/img/music.jpg" class="oder_mp3"  data-type="html5video"  data-image="../view/assets/img/music.jpg"    data-videomp4="'+dataFile['t_worksPath']+'"  data-description="">';
				return html;
				break;
			case 'jpg':
				var html = '<img class="oder_img"  src="'+dataFile['t_thumbnailPath']+'" data-image="'+dataFile['t_thumbnailPath']+'" data-title="" data-thumb="'+dataFile['t_worksPath']+'" data-description="图片类型">';
				return html;
			case 'png':
				var html = '<img class="oder_img"  src="'+dataFile['t_thumbnailPath']+'" data-image="'+dataFile['t_thumbnailPath']+'" data-title="" data-thumb="'+dataFile['t_worksPath']+'" data-description="图片类型">';
				return html;
			case 'jpeg':
				var html = '<img class="oder_img"  src="'+dataFile['t_thumbnailPath']+'" data-image="'+dataFile['t_thumbnailPath']+'" data-title="" data-thumb="'+dataFile['t_worksPath']+'" data-description="图片类型">';
				return html;
			case 'gif':
				var html = '<img class="oder_img"  src="'+dataFile['t_thumbnailPath']+'" data-image="'+dataFile['t_thumbnailPath']+'" data-title="" data-thumb="'+dataFile['t_worksPath']+'" data-description="图片类型">';
				return html;
			case 'doc':
				var imgs = dataFile['t_thumbnailPath']?dataFile['t_thumbnailPath']:'../view/assets/img/zhuanma_bg.jpg';
				var html = '<img class="oder_word"  src="'+imgs+'" data-image="'+imgs+'" data-title="'+dataFile['t_fileType']+'"  data-description="文档类型"  data-pathid="'+dataFile['t_worksPathId']+'" data-thumb="'+dataFile['t_worksPath']+'">';
				return html;
			case 'docx':
				var imgs = dataFile['t_thumbnailPath']?dataFile['t_thumbnailPath']:'../view/assets/img/zhuanma_bg.jpg';
				var html = '<img class="oder_word"  src="'+imgs+'" data-image="'+imgs+'" data-title="'+dataFile['t_fileType']+'"  data-description="文档类型"  data-pathid="'+dataFile['t_worksPathId']+'" data-thumb="'+dataFile['t_worksPath']+'">';
				return html;
			case 'xls':
				var imgs = dataFile['t_thumbnailPath']?dataFile['t_thumbnailPath']:'../view/assets/img/zhuanma_bg.jpg';
				var html = '<img class="oder_word"  src="'+imgs+'" data-image="'+imgs+'" data-title="'+dataFile['t_fileType']+'"  data-description="文档类型"  data-pathid="'+dataFile['t_worksPathId']+'" data-thumb="'+dataFile['t_worksPath']+'">';
				return html;
			case 'xlsx':
				var imgs = dataFile['t_thumbnailPath']?dataFile['t_thumbnailPath']:'../view/assets/img/zhuanma_bg.jpg';
				var html = '<img class="oder_word"  src="'+imgs+'" data-image="'+imgs+'" data-title="'+dataFile['t_fileType']+'"  data-description="文档类型"  data-pathid="'+dataFile['t_worksPathId']+'" data-thumb="'+dataFile['t_worksPath']+'">';
				return html;
			case 'ppt':
				var imgs = dataFile['t_thumbnailPath']?dataFile['t_thumbnailPath']:'../view/assets/img/zhuanma_bg.jpg';
				var html = '<img class="oder_word"  src="'+imgs+'" data-image="'+imgs+'" data-title="'+dataFile['t_fileType']+'"  data-description="文档类型"  data-pathid="'+dataFile['t_worksPathId']+'" data-thumb="'+dataFile['t_worksPath']+'">';
				return html;
			case 'pptx':
				var imgs = dataFile['t_thumbnailPath']?dataFile['t_thumbnailPath']:'../view/assets/img/zhuanma_bg.jpg';
				var html = '<img class="oder_word"  src="'+imgs+'" data-image="'+imgs+'" data-title="'+dataFile['t_fileType']+'"  data-description="文档类型"  data-pathid="'+dataFile['t_worksPathId']+'" data-thumb="'+dataFile['t_worksPath']+'">';
				return html;
			case 'pdf':
				var imgs = dataFile['t_thumbnailPath']?dataFile['t_thumbnailPath']:'../view/assets/img/zhuanma_bg.jpg';
				var html = '<img class="oder_word"  src="'+imgs+'" data-image="'+imgs+'" data-title="'+dataFile['t_fileType']+'"  data-description="文档类型"  data-pathid="'+dataFile['t_worksPathId']+'" data-thumb="'+dataFile['t_worksPath']+'">';
				return html;
			case 'html':
				var imgs = '../view/assets/img/html5.jpg';
				var html = '<img class="oder_html" data-html="1" src="'+imgs+'" data-image="'+imgs+'" data-title="'+dataFile['t_fileName']+'"  data-description="文档类型"  data-pathid="'+dataFile['t_worksPathId']+'" data-thumb="'+dataFile['t_worksPath']+'">';
				return html;
			default:
				//默认
				var html = '<img class="oder_img"  src="'+dataFile['t_thumbnailPath']+'" data-image="'+dataFile['t_thumbnailPath']+'" data-title="" data-thumb="'+dataFile['t_worksPath']+'" data-description="'+dataFile['t_worksPath']+'">';
				return html;
		}


		// if(dataFile['t_thumbnailPath'] == ''){
		// 	if(type == 'mp4'){
		// 		var html_mp4 = '<img title ="" src="../view/assets/img/play.jpg" class="oder_mp4"  data-type="html5video"  data-image="../view/assets/img/play_bg.jpg"    data-videomp4="'+dataFile['t_worksPath']+'"  data-description="">';
		// 		return html_mp4;
		// 	}else if(type == 'mp3'){
		// 		var html_mp3 = '<img title ="" src="../view/assets/img/music.jpg" class="oder_mp3"  data-type="html5video"  data-image="../view/assets/img/music.jpg"    data-videomp4="'+dataFile['t_worksPath']+'"  data-description="">';
		// 		return html_mp3

		// 	}else{
		// 		if(type == 'jpg' || type == 'png' || type == 'gif' || type == 'jpeg'){
		// 			var html = '<img title ="" class="oder_img"  src="../view/assets/img/zhuanma_bg.jpg" data-image="../view/assets/img/zhuanma_bg.jpg" data-thumb="" data-description="">';
		// 			return html;
		// 		}else{
		// 			var html = '<img title ="" class="oder_word"  src="../view/assets/img/zhuanma_bg.jpg" data-image="../view/assets/img/zhuanma_bg.jpg" data-thumb="" data-description="">';
		// 			return html;
		// 		}
				
		// 	}
		// }else{
		// 	if(type == 'mp4'){
		// 		//var html_mp4 = '<img title ="" src="'+dataFile['t_thumbnailPath']+'" class="oder_mp4"  data-type="html5video"  data-image="'+dataFile['t_thumbnailPath']+'"    data-videomp4="'+dataFile['t_worksPath']+'"  data-description="">';
		// 		//return html_mp4;
		// 	}else if(type == 'mp3'){
		// 		var html_mp3 = '<img title ="" src="../view/assets/img/music.jpg" class="oder_mp3"  data-type="html5video"  data-image="../view/assets/img/music.jpg"    data-videomp4="'+dataFile['t_worksPath']+'"  data-description="">';
		// 		return html_mp3

		// 	}else{
		// 		if(type == 'jpg' || type == 'png' || type == 'gif' || type == 'jpeg'){
		// 			var html = '<img class="oder_img"  src="'+dataFile['t_thumbnailPath']+'" data-image="'+dataFile['t_thumbnailPath']+'" data-link="caonima" data-title="图片。。。。。。" data-thumb="'+dataFile['t_worksPath']+'" data-description="fuck">';
		// 			return html;
		// 		}else{
		// 			var html = '<img class="oder_word"  src="'+dataFile['t_thumbnailPath']+'" data-image="'+dataFile['t_thumbnailPath']+'" data-title="'+dataFile['t_fileType']+'"  data-description="fuckaaaa"  data-pathid="'+dataFile['t_worksPathId']+'" data-thumb="'+dataFile['t_worksPath']+'">';
		// 			return html;
		// 		}
		// 	}
		// }
		
	}

	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:10:45
	 * @description: 编辑作品页面展示
	 */
	workLink(); //H5 作品链接方法调用
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
			$('.imgUpList').empty(); //初始化 图片预览清空
			$.ajax('../selectWorksInfoById.do',{
				type:'post',
				cache:false,
				dataType:'json',
				data:{worksId:id},
				success:function(data){
					var vinfo = data['worksInfo'];
					$('#user-update #up_worksName').val(vinfo['t_worksName']); //作品名称
					$('#publishDateYear').val(dateSplic(vinfo['t_publishDateStr'],0));
					$('#publishDateMoth').val(dateSplic(vinfo['t_publishDateStr'],1));
					$('#publishDateYear,#publishDateMoth').selectpicker('refresh');
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
								if(value['m_positionType'] == 1 || value['m_positionType'] == 3){
										pos += "<div class=\"form-inline\">";
										pos += "	<div class=\"form-group\">";
										pos += "		<label class=\"lab\" ><\/label>";
										pos += "		<input type=\"text\" class=\"form-control\" name="+value['m_positionId']+"  placeholder=\"请输入"+value['m_positionName']+"姓名\"> <strong>"+value['m_positionName']+"<\/strong>";
										pos += "	<\/div>";
										pos += "<\/div>";
								}
								if(value['m_positionType'] == 2){
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
							$('#chuangzuo-ajax .form-inline').eq(0).find('label').append('<b>*</b> 公司内 业务团队');
							$('#gongsi-ajax').empty().append(bos);
							$('#gongsi-ajax .form-inline').eq(0).find('label').append('公司外 制作公司');
							//赋值
							$.each(vinfo['tWorksCreatorInfoList'],function(key,value){
									$("[name="+value['m_positionId']+"]").val(value['t_worksCreator']);
								
							});

							// 表单全部trim
							$('#up_worksName,#chuangzuo-ajax input,#gongsi-ajax textarea,#worksDesp').blur(function(){
								var txt = $(this).val().trim();
								$(this).val(txt);
							});

							$('.adList').empty();
							$.each(vinfo['tWorksAwardInfoList'],function(k,v){
								var adhtmls = '<li class="'+v['m_adFestId']+' ad_id_list"><ul class="list-inline adcheck">' 
											adhtmls += '<li data-id="'+v['m_adFestId']+'">'+v['m_adFestName']+'</li>';
											adhtmls += '<li data-id="'+v['m_adFestYearId']+'">'+v['m_adFestYearName']+'</li>';
											adhtmls += '<li data-id="'+v['m_adFestAwardId']+'">'+v['m_adFestAwardName']+'</li>';
											adhtmls += '<li data-id="'+v['m_adFestId']+'" class="adremove"><span class="btn btn-xs btn-danger"><i class="glyphicon glyphicon-remove"></i></span></li>';
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
							if(vinfo['m_advertiserId'] == 'a00001'){
								$('.linshi_guanggao,.linshi_pinpai').removeClass('hide');
								$('.linshi_guanggao').val(vinfo['t_advertiserName']);
								$('.linshi_pinpai').val(vinfo['t_brandName']);
							}else{
								$('.linshi_guanggao,.linshi_pinpai').val('').addClass('hide');
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
											//console.log(vinfo);
											if(value['m_brandId'] !== vinfo['m_brandId']){
												$('#brandsInfo').append('<option value='+value['m_brandId']+'>'+value['m_brandName']+'</option>');
											}
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
						$('.linshi_guanggao,.linshi_pinpai').val('').addClass('hide');
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
						//console.log(m_advertiserId);
						if(m_advertiserId == ''){  //不可初始化品牌
							$('#brandsInfo').empty().append('<option value="">没有该广告主的品牌信息</option>');
							$('#brandsInfo').selectpicker('refresh');
							return false;
						}
						if(m_advertiserId == 'a00001'){
							$('.linshi_guanggao,.linshi_pinpai').removeClass('hide');
						}else{
							$('.linshi_guanggao,.linshi_pinpai').val('').addClass('hide');
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
					//图片预览提示hover
					var path_array = new Array();
					$('.workLink-show .worklinks').remove(); // H5链接 每次编辑清空
					$.each(vinfo['tWorksPathInfoList'],function(key,value){
						//console.log(value['t_worksPath']);
						$('#thumb_img').show();
						if(value['t_worksType'] == 0){
							$('#thumb_img img').attr('src',value['t_worksPath']); //封面图片显示
						}else if(value['t_worksType'] == 1){
							//console.log(value);
							var wordType = $('#filelist .oder_word').hasClass("oder_word");
							if(value['t_thumbnailPath'] !== ''){
								switch(value['t_fileType']){
									case 'mp4':
										var html_mp4 = '<img data-toggle="tooltip" data-placement="top" title="单击删除视频" src="'+value['t_thumbnailPath']+'" class="oder_mp4 path-id" data-id='+value['t_worksPathId']+' />';
										$('#filelist').prepend(html_mp4);
										break;
									case 'mp3':
										var op = $('#filelist .oder_mp4').hasClass("oder_mp4");
										var html_mp3 = '<img data-toggle="tooltip" data-placement="top" title="单击删除音频" src="'+value['t_thumbnailPath']+'" class="oder_mp3 path-id" data-id='+value['t_worksPathId']+' />';
										if(op){
											$('#filelist .oder_mp4:last').after(html_mp3);
										}else{
											$('#filelist').prepend(html_mp3);
										};
										break;
									case 'jpg':
										var html = '<img src='+value['t_thumbnailPath']+' data-toggle="tooltip" data-placement="top" title="单击删除图片" class="oder_img path-id" data-id='+value['t_worksPathId']+' />';
										if(wordType){
											$('#filelist .oder_word:first').before(html);
										}else{
											$('#filelist').append(html);
										}
										break;
									case 'png':
										var html = '<img src='+value['t_thumbnailPath']+' data-toggle="tooltip" data-placement="top" title="单击删除图片" class="oder_img path-id" data-id='+value['t_worksPathId']+' />';
										if(wordType){
											$('#filelist .oder_word:first').before(html);
										}else{
											$('#filelist').append(html);
										}
										break;
									case 'jpeg':
										var html = '<img src='+value['t_thumbnailPath']+' data-toggle="tooltip" data-placement="top" title="单击删除图片" class="oder_img path-id" data-id='+value['t_worksPathId']+' />';
										if(wordType){
											$('#filelist .oder_word:first').before(html);
										}else{
											$('#filelist').append(html);
										}
										break;
									case 'gif':
										var html = '<img src='+value['t_thumbnailPath']+' data-toggle="tooltip" data-placement="top" title="单击删除图片" class="oder_img path-id" data-id='+value['t_worksPathId']+' />';
										if(wordType){
											$('#filelist .oder_word:first').before(html);
										}else{
											$('#filelist').append(html);
										}
										break;
									default:
										var imgtype = $('#filelist .oder_img').hasClass("oder_img");
										var html_word = '<img src='+value['t_thumbnailPath']+' data-toggle="tooltip" data-placement="top" title="单击删除文档" class="oder_word path-id" data-id='+value['t_worksPathId']+' />';
										if(imgtype){
											$('#filelist .oder_img:last').after(html_word);
										}else{
											$('#filelist').append(html_word);
										}
									}
							}else{
								//转码中
								if(value['t_fileType'] == 'mp4'){
									var html_mp4 = '<img data-toggle="tooltip" data-placement="top" title="单击删除视频" src="../view/assets/img/play.jpg" class="oder_mp4 path-id" data-id='+value['t_worksPathId']+' />';
									$('#filelist').prepend(html_mp4);
								}else if(value['t_fileType'] == 'mp3'){
									var op = $('#filelist .oder_mp4').hasClass("oder_mp4");
									var html_mp3 = '<img data-toggle="tooltip" data-placement="top" title="单击删除音频" src="../view/assets/img/music.jpg" class="oder_mp3 path-id" data-id='+value['t_worksPathId']+' />';
									if(op){
										$('#filelist .oder_mp4:last').after(html_mp3);
									}else{
										$('#filelist').prepend(html_mp3);
									};
								}else{
									if(value['t_fileType'] == 'html'){ //是否为H5链接
										var strVar = "<div class=\"worklinks\" style=\"margin-top: 5px;margin-bottom:8px\">";
										    strVar += "<input type=\"hidden\" class=\"linkId\" value="+value['t_worksPathId']+" /><label class=\"lab\" style=\"width:50px;\">名称<\/label> <input type=\"text\" class=\"form-control linkname input-sm\" style=\"width:25%\" value="+value['t_fileName']+" placeholder=\"例如：电通官网\"/><label class=\"lab\" style=\"width:50px;\">网址<\/label> <input type=\"text\" class=\"form-control linkurl input-sm\" style=\"width:46%\" value="+value['t_worksPath']+" placeholder=\"例如：http://www.beijing-dentsu.com.cn\"/>\n";
										    strVar += "<span class=\"btn btn-danger btn-sm linkquxiaos\" data-id="+value['t_worksPathId']+"><i class=\"glyphicon glyphicon-remove\"></i><\/span>\n";
										    strVar += "</div>"
										$('.workLink-show').append(strVar);

										// var html = '<div  style="margin-bottom:10px;">';
										// 	//html += '<label class="lab" style="width:50px;">名称:</label> '+value['t_fileName'];
										// 	html += '<label class="lab" style="width:50px;">名称：</label><input type="text" class="form-control linkurl input-sm" style="width:25%" placeholder="例如：电通官网" value='+value['t_fileName']+'>';
										// 	//html += '<label class="lab" style="width:50px;">网址:</label> '+value['t_worksPath'];
										// 	html += '<label class="lab" style="width:50px;">网址：</label><input type="text" class="form-control linkurl input-sm" style="width:46%" placeholder="例如：http://www.beijing-dentsu.com.cn" value='+value['t_worksPath']+'>';
										// 	html += ' <span class="btn btn-danger btn-xs linkquxiao" data-id='+value['t_worksPathId']+'><i class="glyphicon glyphicon-remove"></i></span>';
										// $('.workLink-show').append(html);
									}else{
										var html = '<img src="../view/assets/img/zhuanma_edit.jpg" data-toggle="tooltip" data-placement="top" title="单击删除" class="oder_img path-id" data-id='+value['t_worksPathId']+' />';
										$('#filelist').append(html);
									}
								}
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
						path_array.push(id);
						$('#delFileParas').val(path_array.join(","));  //赋值 用来删除旧资源文件
						$('#delFileParas').attr('name','delFileParas');
					});
					$('.linkquxiaos').on('click',function(){
						$(this).parent().remove();
						var id = $(this).attr('data-id');
						path_array.push(id);
						$('#delFileParas').val(path_array.join(","));  //赋值 用来删除旧资源 H5链接
						$('#delFileParas').attr('name','delFileParas');
					});
					
				}
			})
		})
	}

	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:12:03
	 * @description: 删除作品 this指定 ID
	 */
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
	
	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:12:40
	 * @description: 提交更新保存
	 */
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
		var worksName	   = $('#up_worksName').val().trim(); //作品名称
		if(!worksName){
			$('#error').show().text('作品名称不能为空!');
			return false;
		};
		if(worksName.length >= 30){
			$('#error').show().text('作品名称太长了,不可超过15字');
			return false;
		};
		//H5链接
		var worklink = $('.workLink-show').children().hasClass('worklinks');
		var worksLink = new Array();
		if(worklink){
			$('.worklinks').each(function(){
				var linkId = $(this).find('.linkId').val();
				var linkUrl = $(this).find('.linkurl').val();
				var linkName = $(this).find('.linkname').val();
				if(linkUrl=='' || linkName=='' ){
					$(this).addClass('has-error');
					$('#error').show().text('H5作品名称或网址不能为空！');
					H5s = 0;
					//return false;
				}else{
					$(this).removeClass('has-error');
					var bo = {linkId:linkId,linkName:linkName,linkUrl:linkUrl};
					//console.log(bo);
					worksLink.push(bo);
				}
			});
		};
		var H5s;
		if(H5s == 0){
			H5s = 1;
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
			$('#error').show().text('公司内部 业务团队必填其中一个');
			return false;
		};

		var sub_bumen = $('#departmment').val(); //部门 sub_bumen
		if(!sub_bumen){
			$('#error').show().text('请选择所属部门');
			return false;
		};
		var worksimage     = $('#view').css('background-image');
		if(worksimage == 'none'){
			var thumb_base = "";
		}else{
			var base = worksimage.substr(worksimage.indexOf(",", 1) + 1);
			var base = worksimage.split(",");
			var thumb_base = base[1].substr(0,base[1].indexOf(')'));
		};
		
		var m_labelCode	   = new Array();  //标签数组
		$('#select-tag .select_label').each(function(key){
			var tag_id = $(this).attr('data-id');
			m_labelCode.push(tag_id);
		});
		var vertId = $('#advertiser').val();
		if(vertId == ''){
			$('#error').show().text('请选择广告主');
			return false;
		};
		var linshiGuanggao = $('.linshi_guanggao').val();  //临时性客户 自定义广告主
		// if(vertId == 'a00001' && linshiGuanggao == ''){
		// 	$('#error').show().text('请填写广告主');
		// 	return false;
		// }
		var linshiPinpai = $('.linshi_pinpai').val(); //获取临时性客户 品牌
		//出街时间
		var publishDateYear = $('#publishDateYear').val();
		var publishDateMoth = $('#publishDateMoth').val();
		var publishDate = "";
		if(publishDateYear == '' || publishDateMoth == ''){
			$('#error').show().text('请填写发布时间');
			return false;
		}else{
			var t_publishDate = $('#t_publishDate').val();
			if(publishDateYear == ''){
				publishDateYear = dateSplic(t_publishDate,0)
			}
			if(publishDateMoth == ''){
				publishDateMoth = dateSplic(t_publishDate,1);
			}
			publishDate = publishDateYear+'-'+publishDateMoth;
		};
		//验证通过之后执行 
		$('#error').hide(); //隐藏错误提示
		$('.loadingtext').show(); 
		$('.btn-dis').attr('disabled','disabled'); //禁止重复提交
		//检验
		var option = {
				data:{
					publishDate:publishDate,
					advertName:linshiGuanggao,
					brandName:linshiPinpai,
					worksName:worksName,
					labelList:m_labelCode.join(","),
					worksAwardList:adArray.join(","),
					worksImage:thumb_base,
					worksLink:worksLink
				},
				uploadProgress: function(event, position, total, percentComplete) {
			        $('.progress-bar').css('width',percentComplete+'%').text(percentComplete+'%');
					//console.log(event,percentComplete, position, total);
			    },
				dataType:'json',
				success:function(data){
					$('loadingtext').hide();
					$('.progress-bar').css('width','100%').text('100%');
					if(data.status == "200"){
						layer.alert('上传完成,提交成功!', {icon: 6,title:false,closeBtn:false,btn:['确定']},function(){
							window.location.reload() ; //刷新
						});	
					}
				}
			};
			 //console.log(option);
		$(this).ajaxSubmit(option);
		return false;
	})

	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-10 10:06:46
	 * @description: 新增作品内 作品链接功能 
	 */
	function workLink(){
		$('.addLink').on('click',function(){
			var strVar = "<div class=\"worklinks\" style=\"margin-top:5px;margin-bottom:8px\">";
			    strVar += "<input type=\"hidden\" class=\"linkId\" value=\"\" /><label class=\"lab\" style=\"width:50px;\">名称<\/label> <input type=\"text\" class=\"form-control linkname input-sm\" style=\"width:25%\" placeholder=\"例如：电通官网\"/><label class=\"lab\" style=\"width:50px;\">网址<\/label> <input type=\"text\" class=\"form-control linkurl input-sm\" style=\"width:46%\" placeholder=\"例如：http://www.beijing-dentsu.com.cn\"/>\n";
			    strVar += "<span class=\"btn btn-danger btn-sm linkquxiao\"><i class=\"glyphicon glyphicon-remove\"></i><\/span>\n";
			    strVar += "</div>"
			$('.workLink-show').append(strVar);
			$('.linkquxiao').on('click',function(){
				$(this).parent().remove();
			})
		})
	}
	
	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-10-24 15:55:20
	 * @description: 作品批量选择 input样式
	 */
	$('#pickfiles').click(function(){
		return $('#hiddenFile').click();
	});
	$('#hiddenFile').change(function(){
		var k = $(this).val();
		var m = $(this).get(0).files;
		$('#pickfiles b').text(' '+m.length+'个文件');
		//$('#filelist').hide();
		$('.imgUpList').empty();
	 	$.each(m,function(key,value){
	 		//console.log(value);
	 		$('.imgUpList').prepend('<li id="img'+key+'"><img src="../view/assets/img/loading.gif"></li>');
	 		switch(value['type']){
	 			case 'audio/mp3':
		 			$('#img'+key).html('<img src="../view/assets/img/music.jpg" width="80"/>');
		 			break;
	 			case 'audio/mpeg':
		 			$('#img'+key).html('<img src="../view/assets/img/music.jpg" width="80"/>');
		 			break;
		 		case 'video/mp4':
	 				$('#img'+key).html('<img src="../view/assets/img/play.jpg" width="80"/>');
	 				break;
	 			case 'application/vnd.ms-excel':
	 				$('#img'+key).html('<img src="../view/assets/img/xls.png" width="80"/>');
	 				break;
	 			case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
	 				$('#img'+key).html('<img src="../view/assets/img/xlsx.png" width="80"/>');
	 				break;
	 			case 'text/csv':
	 				$('#img'+key).html('<img src="../view/assets/img/csv.png" width="80"/>');
	 				break;
	 			case 'application/pdf':
	 				$('#img'+key).html('<img src="../view/assets/img/pdf.png" width="80"/>');
	 				break;
	 			case 'application/vnd.ms-powerpoint':
	 				$('#img'+key).html('<img src="../view/assets/img/ppt.png" width="80"/>');
	 				break;
	 			case 'application/msword':
	 				$('#img'+key).html('<img src="../view/assets/img/doc.png" width="80"/>');
	 				break;
	 			case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
	 				$('#img'+key).html('<img src="../view/assets/img/pptx.png" width="80"/>');
	 				break;
	 			case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
	 				$('#img'+key).html('<img src="../view/assets/img/docx.png" width="80"/>');
	 				break;
	 			default:
	 				var reader = new FileReader();  
		 			reader.readAsDataURL(value); 
		 			reader.onloadend = function(e){
							$('#img'+key).html('<img src='+this.result+' width="80"/>');
				    	}
	 			}
	 	});
		var file_name_attr = $('#hiddenFile').get(0).files;
		if(file_name_attr.length !== 0){
			$('#hiddenFile').attr('name','worksFile');
			var imglist = $('#hiddenFile').get(0).files;
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
			$('.clip_loading').removeClass('hide');
			$('#thumb_img,#view').hide();
			$('#view').hide();
		},
		loadComplete: function() {
			$('.clip_loading').addClass('hide');
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
		
		$('.ajax-newlist').hide();

		$('#type').val('1');
		clear_list();
		ajaxpost(1);
	});

	//切换列表
	$('#list').click(function() {
		$('.list-tab').removeClass('active_tab');
		$(this).addClass('active_tab');

		$('.ajax-newlist').show();

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

	var stop = true;//触发开关，防止多次调用事件
	$(window).scroll(function(){
		if($(this).scrollTop() + $(window).height() + 100 >= $(document).height() && $(this).scrollTop() > 200){
			if(stop == true){
				stop = false;
				var page = $('#page').val();
				ajaxpost(page);
				page++;
				$('#page').val(page);
			}
		}
	})
	
	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:13:20
	 * @description: 初始化必须清空数据再继续加载，否则出现重复数据
	 */
	function clear_list(){
		$('#page').val('2'); //分页初始化
		$('.ajax-newlist,.ajax-hotlist').empty(); //初始化list
	}
	
	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:13:44
	 * @description: 分页加载loading状态
	 */
	function loading_page(text){
		if(text){
			$('.loading_list').removeClass('btn-primary').addClass('btn-default').show().text(text);
		}else{
			$('.loading_list').removeClass('btn-default').addClass('btn-primary').show().text('加载更多');
		}
	}

	/**
	 * 
	 * @author:      Yang.Sun@dentsu.com.cn
	 * @dateTime:    2017-11-01 17:14:22
	 * @description: GET url获取
	 */
	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return decodeURIComponent(r[2]); return null; 
	} 

})
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
	         if(sessionstatus=="timeout"){ 
	        	//alert("登录超时,请重新登录！");
				//如果超时就处理 ，指定要跳转的页面  
				window.location = "../userLogin.do";   
				//location.reload();
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
		//var type = 0;  // 0 为 列表显示  1 为 缩略图显示
		loading_page('正在加载中，请稍等......');
		$.ajax(url+param,{
			type:'post',
			dataType:'json',
			data:{pageNum:page,orderFlag:view,loadCount:numloadCount},
			success:function(data){
				if(data['status'] == -1){
					layer.msg(data['rtnMsg'], {anim:6});
					return false;
				}
				switch(type){
					case '0' :
					if(page == '1'){
						var html = "<ul class='list-inline'>";
						    html += "<li class='list-img frist-height'><\/li>\n";
						    html += "<li class='list-title frist-height'>数据包名称<\/li>\n";
						    html += "<li class='list-pinpai frist-height'>数据类型<\/li>\n";
						    html += "<li class='list-guanggao frist-height'>数据标签<\/li>\n";
						    html += "<li class='list-fenlei frist-height'>广告主/品牌<\/li>\n";
						    html += "<li class='list-user frist-height'>更新日期<\/li>\n";
						    html += "<li class='list-date frist-height'>创建日期<\/li>\n";
						    html += "</ul><div class='clearfix'></div>";
						$('.ajax-newlist').append(html);
					}
					list_view(data);
					break;
					case '1' :
					list_img(data);
					break;
				}
				info_view(); //查看
			}
		});
	}

	//列表视图输出
	function list_view(data){
		var user = getQueryString("myWorksFlag");  // 空为 不限 ，0 为 我的上传，1 为 我的收藏
		var keyword = getQueryString("inputKeyWord"); //关键字; 
		if(data.status=='200'){
			switch(user){
				case '' :  //默认
				$.each(data['worksInfoList'],function(key,value){
					var strVar = list_html(keyword,value);
					$('.ajax-newlist').append(strVar);
				});
				$('.btn-start').click(function(){
					var start_id = $(this).attr('data-id');
					var class_btn = $(this).hasClass('start_ok');
					if(class_btn){
						$.ajax({
							url:'../collectWorksInfo.do',
							dataType:'json',
							type:'post',
							data:{worksId:start_id,collectionFlag:1},
							success:function(data){
								layer.msg('收藏取消成功', {icon: 1});
								$('#'+start_id).removeClass('start_ok').html('<i class="glyphicon glyphicon-star-empty"></i> 收藏');
							}
						});
					}else{	
						$.ajax({
							url:'../collectWorksInfo.do',
							dataType:'json',
							type:'post',
							data:{worksId:start_id,collectionFlag:0},
							success:function(data){
								layer.msg('收藏成功', {icon: 1});
								$('#'+start_id).addClass('start_ok').html('<i class="glyphicon glyphicon-star"></i> 取消收藏');
							}
						});
					}
					//console.log(start_id);
				})
				update_view();
				del_view();
				break;
				case '0': //我的上传
				$.each(data['worksInfoList'],function(key,value){
					var strVar = list_html(keyword,value);
					$('.ajax-newlist').append(strVar);
				});
				$('.btn-start').click(function(){
					var start_id = $(this).attr('data-id');
					var class_btn = $(this).hasClass('start_ok');
					if(class_btn){
						$.ajax({
							url:'../collectWorksInfo.do',
							dataType:'json',
							type:'post',
							data:{worksId:start_id,collectionFlag:1},
							success:function(data){
								layer.msg('收藏取消成功', {icon: 1});
								$('#'+start_id).removeClass('start_ok').text('收藏');
							}
						});
					}else{	
						$.ajax({
							url:'../collectWorksInfo.do',
							dataType:'json',
							type:'post',
							data:{worksId:start_id,collectionFlag:0},
							success:function(data){
								layer.msg('收藏成功', {icon: 1});
								$('#'+start_id).addClass('start_ok').text('取消收藏');
							}
						});
					}
					//console.log(start_id);
				})
				update_view();
				del_view();
				
				break;
				case '1':  //我的收藏
				$.each(data['worksInfoList'],function(key,value){
						var img = '../view/assets/img/file.png';
						//var img = value['t_worksImagePath'];
						if(value['worksAndLabelList'].length > 4){
							var labelall = '...';
						}
						var strVar = "<ul style='position:relative' class='list-inline start"+value['t_worksId']+"' data-id="+value['t_worksId']+">";
						    strVar += "<li class='list-img'>";
						    strVar += "	<img style='margin:20% 30%' src="+img+" alt="+value['t_worksName']+" class=\"img-responsive img-rounded detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">";
						    strVar += "<\/li>";
						    strVar += "<li class='list-title'>";
						    strVar += "	<p class=\"detailview\" data-toggle=\"modal\" data-target=\"#show-id\"   data-id="+value['t_worksId']+">"+value['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>')+"<\/p>";
						    strVar += "<p class='text-muted'><i class='glyphicon glyphicon-star'><\/i> "+value['collectionNum']+" <\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-pinpai'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += file_type(value['worksFileInfoList']);
						    //strVar += value['m_brandName']?value['m_brandName']:'未填写';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-guanggao'>"
						    strVar += "	<p class=\"text-muted\">";
						    $.each(value['worksAndLabelList'],function(key,values){
						    	if(key <= 3){
								 		strVar += '<span class="label label-success">'+values['m_labelName']+'</span><br/>';
						    		}
							});
							strVar += labelall || '';
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-fenlei'>"
						    strVar += "	<p class=\"text-muted\">";
						    var adver = value['m_advertiserName']?value['m_advertiserName'].replace(keyword,'<b style="color:red">'+keyword+'</b>'):'无';
						    var brand = value['m_brandName']?value['m_brandName'].replace(keyword,'<b style="color:red">'+keyword+'</b>'):'无';
						    strVar += adver+' / '+brand;
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-user'>";
						    strVar += "	<p class=\"text-muted\">";
						    strVar += value['t_updateTimeStr'];
						    strVar += "	<\/p>";
						    strVar += "<\/li>";
						    strVar += "<li class='list-date'>";
						    strVar += value['t_createTimeStr'];
						    strVar += "<\/li>";
						    strVar += "<div class=\"clearfix\">";
						    strVar += "<\/div>";
						    // start 修改按钮
						    strVar += "	<p class=\"text text-muted btn-post start"+value['t_worksId']+"\">";
						    strVar += ' <span class="start btn-xs btn-danger btn" data-id='+value['t_worksId']+'>取消收藏</span>';
						    strVar += "	<\/p>";
						    // end
						    strVar += '</ul>';
					$('.ajax-newlist').append(strVar);
				});
				//取消收藏   
				$('.start').click(function(){
					var id = $(this).attr('data-id');
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
	//列表输出html
	function list_html(keyword,value){
		if(value['worksAndLabelList'].length > 4){
			var labelall = '...';
		}
		if(value['worksFileInfoList'].length > 1){
			var img = '../view/assets/img/filelist.png';
		}else{
			var img = '../view/assets/img/file.png';
		}

		if(getQueryString('searchScope') == 2 && getQueryString('inputKeyWord') !==''){
		    	var borderNone = 'borderNone';
		 }
		//var img = value['t_worksImagePath'];
		var strVar = "<ul style='position:relative;border-top:1px solid #f1f1f1' class='list-inline del"+value['t_worksId']+"' data-id="+value['t_worksId']+">";
		    strVar += "<li class='list-img "+borderNone+"'>";
		    strVar += "	<img style='margin:20% 30%' src="+img+" alt="+value['t_worksName']+" class=\"img-responsive img-rounded detailview\" data-toggle=\"modal\" data-target=\"#show-id\"  data-id="+value['t_worksId']+">";
		    strVar += "<\/li>";
		    strVar += "<li class='list-title "+borderNone+"'>";
		    strVar += "	<p class=\"detailview\" data-toggle=\"modal\" data-target=\"#show-id\"   data-id="+value['t_worksId']+">"+value['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>')+"<\/p>";
		    strVar += "<p class='text-muted'><i class='glyphicon glyphicon-star'><\/i> "+value['collectionNum']+" <\/p>";
		    strVar += "<\/li>";
		    strVar += "<li class='list-pinpai "+borderNone+"'>";
		    strVar += "	<p class=\"text-muted\">";
		    strVar += file_type(value['worksFileInfoList']);
		    //strVar += value['m_brandName']?value['m_brandName']:'未填写';
		    strVar += "	<\/p>";
		    strVar += "<\/li>";
		    strVar += "<li class='list-guanggao "+borderNone+"'>"
		    strVar += "	<p class=\"text-muted\">";
		    $.each(value['worksAndLabelList'],function(key,values){
		    	if(key <= 3){
				 		strVar += '<span class="label label-success">'+values['m_labelName']+'</span><br/>';
		    		}
			});
			strVar += labelall || '';
		    //strVar += '<span class="label label-success">'+value['worksLabel']+'</span>';
		    strVar += "	<\/p>";
		    strVar += "<\/li>";
		    strVar += "<li class='list-fenlei "+borderNone+"'>";
		    strVar += "	<p class=\"text-muted\">";
		    var adver = value['m_advertiserName']?value['m_advertiserName'].replace(keyword,'<b style="color:red">'+keyword+'</b>'):'无';
		    var brand = value['m_brandName']?value['m_brandName'].replace(keyword,'<b style="color:red">'+keyword+'</b>'):'无';
		    strVar += adver+' / '+brand;
		    strVar += "	<\/p>";
		    strVar += "<\/li>";
		    strVar += "<li class='list-user "+borderNone+"'>";
		    strVar += "	<p class=\"text-muted\">";
		    strVar += value['t_updateTimeStr'];
		    strVar += "	<\/p>";
		    strVar += "<\/li>";
		    strVar += "<li class='list-date "+borderNone+"'>";
		    strVar += value['t_createTimeStr'];
		    strVar += "<\/li>";

		    if(getQueryString('searchScope') == 2 && getQueryString('inputKeyWord') !==''){
		    	$.each(value['worksFileInfoList'],function(fk,fvalue){
		    		strVar += "<li class='keword' style='width:100%;height:auto;border-bottom:none;'>";
				    strVar += "<div><p class='text-muted'>"+file_info_type(fvalue['t_fileType'])+" <b>"+fvalue['t_fileName']+"</b></p></div>";
				    strVar += "<div><p class='text-muted textareas'>..."+fvalue['content']+"...</p></div>";
				    strVar += "</li>";
		    	})
			}
		    
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
		    //console.log(value);
		    if(value['collectionFlag'] == 0){
		    	strVar += ' <span class="btn-xs btn-info btn btn-start" id='+value['t_worksId']+' data-id='+value['t_worksId']+'><i class="glyphicon glyphicon-star-empty"></i> 收藏</span>';
		    }else{
		    	strVar += ' <span class="btn-xs btn-info btn btn-start start_ok" id='+value['t_worksId']+' data-id='+value['t_worksId']+'><i class="glyphicon glyphicon-star"></i> 取消收藏</span>';
		    }
		    strVar += "	<\/p>";
		    // end
		    strVar += '</ul>';
		    return strVar;
	}
	//文件类型输出
	function file_type(data){
		var typearr = new Array();
		$.each(data,function(key,value){
			typearr[key] = value['t_fileType']; 
		});
		//console.log(typearr.unique(typearr)); //去掉重复值
		typearr.unique(typearr);
		var html_img = '';
		if(typearr.contains('docx') || typearr.contains('doc')){
			html_img += "<img src='../view/assets/img/doc.png'>";
		}
		if(typearr.contains('pdf')){
			html_img += "<img src='../view/assets/img/pdf.png'>";
		}
		if(typearr.contains('xls') || typearr.contains('xlsx')){
			html_img += "<img src='../view/assets/img/other.png'>";
		}
		if(typearr.contains('ppt') || typearr.contains('pptx')){
			html_img += "<img src='../view/assets/img/ppt.png'>";
		}
		if(typearr.contains('csv')){
			html_img += "<img src='../view/assets/img/csv.png'>";
		}
		return html_img;
	}
 	//单文件类型输出
 	function file_info_type(type){
 		var html_img = '';
		if(type == 'docx' || type == 'doc'){
			html_img += "<img src='../view/assets/img/doc.png'>";
		}
		if(type == 'pdf'){
			html_img += "<img src='../view/assets/img/pdf.png'>";
		}
		if(type == 'xls' || type == 'xlsx'){
			html_img += "<img src='../view/assets/img/other.png'>";
		}
		if(type == 'csv'){
			html_img += "<img src='../view/assets/img/csv.png'>";
		}
		if(type == 'ppt' || type == 'pptx'){
			html_img += "<img src='../view/assets/img/ppt.png'>";
		}
		return html_img;
 	}
	//去掉重复
	Array.prototype.unique = function(){
	      var newArr=[this[0]]; //数组结果
	      for(var i = 0, len = this.length; i < len; i++){ 
	           var repeat=false;  //设置重复参数
	           for(var j = 0, len2 = newArr.length; j < len2; j++){
	               if (this[i]==newArr[j]) {
	                    repeat=true; //若重复设置为true
	                     break;
	               }
	           }
	          //去重push数组
	             if (!repeat) {
	                     newArr.push(this[i]);
	            }
	     }
	    return newArr;
	};
	// 查看作品页面
	function info_view(){
		var keyword = getQueryString("inputKeyWord"); //关键字; 
		$('.detailview').click(function(){
			var id = $(this).attr('data-id');  //注意在列表加上data-id属性
			$('.show-start').attr('data-id',id); //克隆收藏控件

			//作品描述 用对应的id 加载
			$.ajax('../selectWorksInfoById.do',{
				type:'post',
				dataType:'json',
				data:{worksId:id},
				success:function(data){
					//console.log(data);
					var workinfo = data['worksInfo'];
					$('.worksinfo .workname').html(workinfo['t_worksName'].replace(keyword,'<b style="color:red">'+keyword+'</b>')); //作品名称
					$('.worksinfo .advername').html(workinfo['m_advertiserName']?workinfo['m_advertiserName'].replace(keyword,'<b style="color:red">'+keyword+'</b>'):'<i>未填写</i>'); //广告主
					$('.worksinfo .branname').html(workinfo['m_brandName']?workinfo['m_brandName'].replace(keyword,'<b style="color:red">'+keyword+'</b>'):'<i>未填写</i>'); //品牌
					$('.worksinfo .labels').html(workinfo['worksLabel']?workinfo['worksLabel']:'<i>未填写</i>');  //作品标签
					$('.worksinfo .wkdesp').html(workinfo['t_worksDesp']?workinfo['t_worksDesp'].replace(/\r\n/g,"<br>").replace(keyword,'<b style="color:red">'+keyword+'</b>'):'<i>未填写</i>'); // 作品简介
					$('.worksinfo .createrTime').html(workinfo['t_createTimeStr']?workinfo['t_createTimeStr']:'<i>未填写</i>'); //发表时间
					//标签
					$('.worksinfo .workslabel').empty();
					$.each(workinfo['worksAndLabelList'],function(key,value){
						var html_labe = '<span class="label label-success">'+value['m_labelName']+'</span>';
						$('.worksinfo .workslabel').append(html_labe);
					});
					//文件信息列表
					$('.worksinfo .file-list').empty();
					$.each(workinfo['worksFileInfoList'],function(key,value){
						if(workinfo['downloadLimit'] == 1){
							var downloadLimit = '<a href="'+value['t_filePath']+'" download="'+value['t_fileName']+'" target="_blank"> <i class="glyphicon glyphicon-save"></i>下载</a>';
						}else{
							var downloadLimit = '<span>[无权限下载]</span>';
						};
						if(workinfo['viewLimit'] == 1){
							var viewLimit = '<a href="./preview.html?name='+value['t_worksFileId']+'" target="_blank" ><i class="glyphicon glyphicon-eye-open"></i> 预览</a></li>';
						}else{
							var viewLimit = '<span>[无权限预览]</span>';
						}
						var html_list = '<li>'+value['t_fileName']+'&nbsp;&nbsp;&nbsp;&nbsp;'+downloadLimit+'&nbsp;&nbsp;'+viewLimit;
						$('.worksinfo .file-list').append(html_list);
					})
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
					$('#'+id).addClass('start_ok').html('<i class="glyphicon glyphicon-star"></i> 取消收藏');
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
					$('#'+id).removeClass('start_ok').html('<i class="glyphicon glyphicon-star-empty"></i> 收藏');
				}
			})
		}
	});

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
					//console.log(data);
					var vinfo = data['worksInfo'];
					$('#worksName').val(vinfo['t_worksName']); //数据包名称
					$('#worksDesp').val(vinfo['t_worksDesp']);  //作品简介
					$('#worksName,#worksDesp').blur(function(){
						var txt = $(this).val().trim();
						$(this).val(txt);
					});
					$.ajax({
						url:'../initUploadSelectList.do',
						type:'post',
						dataType:'json',
						success:function(awdata){
							//遍历标签功能
							$('#select-tag').empty();
							var labelarr = vinfo['worksAndLabelList'];
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
					
					$.ajax({
						url:'../initUploadSelectList.do',  //获取广告主列表
						dataType:'json',
						type:'post',
						data:{},
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
							$('#advertiser,#brandsInfo').selectpicker('refresh'); 
							//品牌初始化 显示全部
							$.ajax({
								url:'../selectBrandsList.do',
								dataType:'json',
								type:'post',
								data:{advertId:vinfo['m_advertiserId']},
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
							data:{advertId:m_advertiserId},
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

					$('#hiddenFile').val(''); //上传文件初始化
					$('#pickfiles b').text(''); // 数据包文件数量初始化
					//文件列表显示
					$('.file-list').empty();
					// console.log(vinfo);	
					$.each(vinfo['worksFileInfoList'],function(key,value){
						var file_list = '<li><span>'+value['t_fileName']+'</span> <span class="btn btn-xs file-remove" data-id='+value['t_worksFileId']+'><i class="glyphicon glyphicon-remove text-danger"></i></span></li>';
						$('.file-list').append(file_list);
					});
					var file_arr_id = new Array();
					$('.file-remove').click(function(){
						var file_id = $(this).attr('data-id');
						$(this).parent().fadeOut();
						file_arr_id.push(file_id);
						//console.log(file_arr_id.join(","));
						$('#delFileParas').val(file_arr_id.join(","));  //赋值 用来删除旧资源文件
					});
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
		var worksName	   = $('#worksName').val(); //作品名称
		if(!worksName){
			$('#error').show().text('数据包名称不能为空!');
			return false;
		}
		if(worksName.length >= 30){
			$('#error').show().text('数据包名称太长了,不可超过15字');
			return false;
		}

		
		var m_labelCode	   = new Array();  //标签数组
		$('#select-tag .select_label').each(function(key){
			var tag_id = $(this).attr('data-id');
			m_labelCode.push(tag_id);
		});
		if(m_labelCode == ''){
			$('#error').show().text('请选择数据标签');
			return false;
		}
		// if(m_labelCode.length > 5){
		// 	$('#error').show().text('不能超过5个标签');
		// 	return false;
		// }
		//验证通过之后执行 
		$('#error').hide(); //隐藏错误提示
		$('.loadingtext').show(); 
		$('.btn-dis').attr('disabled','disabled'); //禁止重复提交
		var wok_id = $('#works_id').val(); //作品id

		var wok_advertiser = $('#advertiser').val(); //广告主
		var wok_brandsInfo = $('#brandsInfo').val(); //品牌

		var wok_worksDesp = $('#worksDesp').val(); //作品简介
		//检验
		var option = {
				data:{
					labelList:m_labelCode.join(","),
				},
				dataType:'json',
				uploadProgress: function(event, position, total, percentComplete) {
			        $('.progress-bar').css('width',percentComplete+'%').text(percentComplete+'%');
					//console.log(event,percentComplete, position, total);
			    },
				success:function(data){
					$('loadingtext').hide();
					$('.progress-bar').css('width','100%').text('100%');
					if(data.status == "200"){
						layer.alert('上传完成,提交成功!', {icon: 6,title:false,closeBtn:false,btn:['确定']},function(){
							window.location.reload() ; //刷新
						});	
					}
					if(data.status == "-1" || data.status == "0"){
						alert(data['rtnMsg']);
					}
				}
			};
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
		$('#filelist').hide();
		var file_name_attr = $('#hiddenFile').get(0).files;
		if(file_name_attr.length !== 0){
			$('#hiddenFile').attr('name','worksFile');
			//var imglist = $('#hiddenFile').get(0).files;
			//console.log(imglist);
			$('#delFileParas').attr('name','delFileParas');

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
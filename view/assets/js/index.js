$(function() {
	$.ajax({
		url:'findUserInfo.do',
		dataType:'json',
		success:function(data){
			$('#usermail').text(data['userInfo']['m_userEmail']);
			if(data['userInfo']['uploadLimit'] == 1){
				$('.uploadAdd').removeClass('hide');
			}else{
				$('.uploadAdd').remove();
			}
		}
	})
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
	//回车键执行
	$('#keywork').keydown(function (event) {
	   //console.log(event.keyCode);
	   if(event.keyCode == 13){
	   		search_over();
	   }
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
				//创作团队 内部
				var pos="";
				//制作公司 外部
				var bos="";
				$.each(data['creatorPositionList'],function(key,value){
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
						bos += "		<textarea class=\"form-control\" rows=\"5\" style=\"width:50%;\" placeholder=\"请输入公司名称\" name="+value['m_positionId']+"><\/textarea>";
						bos += "		<strong style=\"vertical-align:top\"> "+value['m_positionName']+"<\/strong>";
						bos += "	<\/div>";
						bos += "<\/div>";
					}
				});
				$('#chuangzuo-ajax').empty().append(pos);
				$('#chuangzuo-ajax .form-inline').eq(0).find('label').append('<b>*</b> 公司内 创作团队');
				$('#gongsi-ajax').empty().append(bos);
				$('#gongsi-ajax .form-inline').eq(0).find('label').append('公司外 制作公司');
				//广告节获奖
				$('.addAd').click(function(){
					var adhtml = "";
						    adhtml += "<div class=\"form-inline\">\n";
						    adhtml += "	<div class=\"form-group\">\n";
						    adhtml += "		<label class=\"lab\">广告节<\/label>\n";
						    adhtml += "		<select class=\"form-control selectpicker\" data-live-search=\"true\" id=\"adFestId\" name=\"adFestId\">\n";
						    adhtml += "			<option value=\"\">请选择广告节<\/option>\n";						    
						$.each(data['advertFestivalList'],function(key,value){
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
									url:'selectAdvertFestivalYearAward.do',
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
				
				//遍历部门关联
				$.each(data['departmentList'],function(key,value){
					$('#departmment').append('<option value ='+value['m_departmentId']+'>'+value['m_departmentName']+'</option>');
				});
				$('#departmment').selectpicker('refresh');
				//选择部门事件触发
				$('#departmment').on('changed.bs.select',function(){
					var m_departmentId = $(this).selectpicker('val'); //部门 id

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
			// console.log(adArray);
			// return false;
			var worksName	   = $('#worksName').val(); //作品名称
			if(!worksName){
				$('#error').show().text('作品名称不能为空!');
				return false;
			}
			//校验团队名单
			var ko = 0;
			$('#chuangzuo-ajax input').each(function(k,v){
				var cv = $(this).val();
				if(cv !== ''){
					ko = 1;
				}
			})
			if(ko == 0){
				$('#error').show().text('公司内部 创作团队必填其中一个');
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
			var vertId = $('#advertiser').val();
			if(vertId == ''){
				$('#error').show().text('请选择广告主');
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
			// var ckCreater = $('#worksCreater').val();
			// if(Trim(ckCreater) == ''){
			// 	$('#error').show().text('请填写创作团队');
			// 	return false;
			// }
			var ckDesp = $('#worksDesp').val();
			if(Trim(ckDesp) == ''){
				$('#error').show().text('请填写作品简介');
				return false;
			}
			var base = worksimage.split(",");
			var thumb_base = base[1].substr(0,base[1].indexOf(')'));
			var m_labelCode	   = new Array();  //标签数组
			$('#select-tag .select_label').each(function(key){
				var id = $(this).attr('data-id');
				m_labelCode.push(id);
			});
			if(m_labelCode ==''){
				$('#error').show().text('请至少选择一个标签');
				return false;
			}
			//验证通过之后执行 
			$('#error').hide(); //隐藏错误提示
			$('.loadingtext').show(); 
			$('.btn-dis').attr('disabled','disabled'); //禁止重复提交
			//检验
			var option = {
					data:{
						labelList:m_labelCode.join(","),
						worksImage:thumb_base,
						worksAwardList:adArray.join(","),
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
	//清除前后空格
	 function Trim(str){ 
             return str.replace(/(^\s*)|(\s*$)/g, ""); 
     }
	//选择作品
	$('#pickfiles').click(function(){
		return $('#hiddenFile').click();
	});
	$('#hiddenFile').change(function(){
		var k = $(this).val();
		var m = $(this).get(0).files;
		$('#pickfiles b').text(' '+m.length+'个文件');
		// var reader = new FileReader();    
	 //    // Read the local file as a DataURL
	 //    reader.readAsDataURL(this.files[0]); 
	 //    reader.onloadend = function(e){

		// console.log(e.target.result);
	 //    }
	});

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

	url = 'http://10.69.136.88:8081/CreativeLib/';
	$.ajax({
		url:url+'initWorksSelectList.do',
		dataType:'json',
		type:'POST',
		beforeSend:function(){
			//请求前的处理
		},
		success:function(data){
			//部门
			$.each(data['departmentList'],function(key,value){
				$('#bumen dl').append('<dd class="departId" data-id="'+value['m_departmentId']+'">'+value['m_departmentName']+'</dd>');
			});
			//广告主默认显示
			$.each(data['advertiserList'],function(key,value){
				$('#guanggao dl').append('<dd class="guanggao_btn" data-id="'+value['m_advertiserId']+'">'+value['m_advertiserName']+'</dd>');
			});
			//广告主触发
			$('.guanggao_btn').click(function(){
				var id = $(this).attr('data-id');
				//对应所属广告主的品牌
				$('#pinpai dl').empty().append('<dd class="selected" data-id="">不限</dd>');
				$.each(data['brandsInfoList'],function(key,value){
					if(id == ''){
						var ids = $('#bumen .selected').attr('data-id');
						pinpai_api(ids,"");
						return false;
					}
					if(value['m_advertiserId'] == id){
						$('#pinpai dl').append('<dd data-id="'+value['m_brandId']+'">'+value['m_brandName']+'</dd>');
					}
				});
				//品牌触发
				select('#pinpai dl dd');
			});
			pinpai_api('','');
			//标签分类
			$.each(data['worksLabelList'],function(key,value){
				var num = value['worksLabelList'].length;
				for (var i = 0; num >= i; i++) {
					if(value['worksLabelList'][i] !== undefined){
						$('#fenlei dl').append('<dd data-id='+value['worksLabelList'][i]['m_labelId']+'>'+value['worksLabelList'][i]['m_labelName']+'</dd>')
					}
				}
			})
			//默认广告主触发
			select('#guanggao dl dd');
			//部门检索触发
			select('#bumen dl dd');
			//标签检索触发
			select('#fenlei dl dd');

			//---------------------------------------------------------------------------------
			//广告主关联部门触发
			$('.departId').click(function(){
				var id = $(this).attr('data-id');
				$.ajax({
					url:url+'selectAdvertiserList.do',
					dataType:'json',
					type:'POST',
					data:{departId:id},
					beforeSend:function(){
						//请求前的处理
					},
					success:function(brands){
						//广告主
						$('#guanggao dl').empty().append('<dd class="guanggao_btn selected" data-id="">不限</dd>');
						$.each(brands['advertiserList'],function(key,value){
							$('#guanggao dl').append('<dd class="guanggao_btn" data-id="'+value['m_advertiserId']+'">'+value['m_advertiserName']+'</dd>');
						});
						//广告主触发
						select('#guanggao dl dd');
						$('.guanggao_btn').click(function(){
							var id = $(this).attr('data-id');
							if(id == ''){
								var ids = $('#bumen .selected').attr('data-id');
								pinpai_api(ids,"");
								return false;
							}
							//对应所属广告主的品牌
							$('#pinpai dl').empty().append('<dd class="selected" data-id="">不限</dd>');
							$.each(data['brandsInfoList'],function(key,value){
								if(value['m_advertiserId'] == id){
									$('#pinpai dl').append('<dd data-id="'+value['m_brandId']+'">'+value['m_brandName']+'</dd>');
								}
							});
							//品牌触发
							select('#pinpai dl dd');
						})
					}
				})
			})
		},
		complete: function() {
	        //请求完成的处理
	    },
		error:function(){
			 //请求出错处理
			// alert('网络无响应，请检查刷新');
		}
	});
	// 日期格式化
	Date.prototype.Format = function(formatStr,AddDayCount){   
	    var str = formatStr;   
	    if(AddDayCount !== undefined){
	    	this.setDate(this.getDate()-AddDayCount);
	    }
	    console.log(AddDayCount);
	    var Week = ['日','一','二','三','四','五','六'];  
	  
	    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
	    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
	  
	    str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + (this.getMonth()+1));   
	    str=str.replace(/M/g,this.getMonth()+1);   
	  
	    str=str.replace(/w|W/g,Week[this.getDay()]);   
	  
	    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
	    str=str.replace(/d|D/g,this.getDate());   
	  
	    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
	    str=str.replace(/h|H/g,this.getHours());   
	    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
	    str=str.replace(/m/g,this.getMinutes());   
	  
	    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
	    str=str.replace(/s|S/g,this.getSeconds());   
	  
	    return str;   
	} 

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
				$('#pinpai dl').empty().append('<dd class="selected" data-id="0">不限</dd>');
				pinpai_api("","");
					
			}			
		});
	}

	//品牌列表
	//departId  部门的ID
	//  advertId 广告主的ID
	function pinpai_api(departId,advertId){
		$.ajax({
			url:url+"selectBrandsList.do",
			data:{departId:departId,advertId:advertId},
			dataType:'json',
			type:'POST',
			beforeSend:function(){
						//请求前的处理
			},
			success:function(data){
				$('#pinpai dl').empty().append('<dd class="selected" data-id="">不限</dd>');
				$.each(data['brandsInfoList'],function(key,value){
					$('#pinpai dl').append('<dd data-id='+value['m_brandId']+'>'+value['m_brandName']+'</dd>')
				});
				select('#pinpai dl dd');
			}
		})
	} 

	//开始进行搜索并跳转到页面
	function search_url(){
		var keyword = $('#keywork').val();
		var depart_id = $('#bumen dl .selected').attr('data-id');
		var advert_id = $('#guanggao dl .selected').attr('data-id'); 
		var brand_id = $('#pinpai dl .selected').attr('data-id');
		var label_list = $('#fenlei dl .selected').attr('data-id');
		var myworks = $('#myhome dl .selected').attr('data-id');
		var mydate = new Date();
		var publishDateEnd = $('#adddate dl .selected').attr('data-id');
		if(publishDateEnd !==''){
			var publishDateStart = mydate.Format('YYYY-M-D');
		}else{
			var publishDateStart = '';
		}
		window.open('./search.html?inputKeyWord='+keyword+'&departId='+depart_id+'&advertId='+advert_id+'&brandId='+brand_id+'&labelCodeList='+label_list+'&myWorksFlag='+myworks+'&publishDateStart='+publishDateStart+'&publishDateEnd='+publishDateEnd);
		
	}
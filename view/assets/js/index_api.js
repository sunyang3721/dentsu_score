	url = 'http://10.69.136.88:8081/';
	$.ajax({
		url:url+'CreativeLib/initWorksSelectList.do',
		dataType:'json',
		type:'POST',
		beforeSend:function(){
			//请求前的处理
		},
		success:function(data){
			//部门
			$.each(data['departmentList'],function(key,value){
				$('#bumen dl').append('<dd data-id="'+value['m_departmentId']+'">'+value['m_departmentName']+'</dd>');
			});
			//广告主
			$.each(data['advertiserList'],function(key,value){
				$('#guanggao dl').append('<dd class="guanggao_btn" data-id="'+value['m_advertiserId']+'">'+value['m_advertiserName']+'</dd>');
			});
			$('.guanggao_btn').click(function(){
				var id = $(this).attr('data-id');
				//对应所属广告主的品牌
				$('#pinpai dl').empty().append('<dd class="selected" data-id="0">不限</dd>');
				$.each(data['brandsInfoList'],function(key,value){
					if(value['m_advertiserId'] == id){
						$('#pinpai dl').append('<dd data-id="'+value['m_brandId']+'">'+value['m_brandName']+'</dd>');
					}
				});
				//品牌触发
				select('#pinpai dl dd');
			})
			//部门检索触发
			select('#bumen dl dd');
			//广告主触发
			select('#guanggao dl dd');
		},
		complete: function() {
	        //请求完成的处理
	    },
		error:function(){
			 //请求出错处理
			 alert('网络无响应，请检查刷新');
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
			if(id == '#bumen dl dd'){
				$('#fenlei dl dd').removeClass('selected').eq(0).addClass('selected');
				$('#guanggao dl dd').removeClass('selected').eq(0).addClass('selected');
				$('#pinpai dl dd').removeClass('selected').eq(0).addClass('selected');
				$('#adddate dl dd').removeClass('selected').eq(0).addClass('selected');
				$('#myhome dl dd').removeClass('selected').eq(0).addClass('selected');
				$('#pinpai dl').empty().append('<dd class="selected" data-id="0">不限</dd>');
			}			
		});
	}
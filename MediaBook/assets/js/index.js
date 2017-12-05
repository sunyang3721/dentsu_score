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
	select('.adddate li');
	//我的
	select('.myhome li');

	//检索hover 封装
	function select(id){
		$(id).click(function(){
			$(id).removeClass('selected');
			$(this).addClass('selected');		
		});
	}

	// 广告主 品牌 联动  -----新增作品
	mediy();
	function mediy(){
		$.ajax({
			url:'initUploadSelectList.do',
			dataType:'json',
			type:'post',
			data:{},
			success:function(data){
				//遍历广告主关联
				// $.each(data['advertiserList'],function(key,value){
				// 	$('#advertiser').append('<option value ='+value['m_advertiserId']+'>'+value['m_advertiserName']+'</option>');
				// });
				// $('#advertiser').selectpicker('refresh');
				//选择广告主事件触发
				// $('#advertiser').on('changed.bs.select',function(){
				// 	var m_advertiserId = $(this).selectpicker('val'); // 广告主id
				// 	$.ajax({
				// 		url:'selectBrandsList.do',
				// 		dataType:'json',
				// 		type:'post',
				// 		data:{advertId:m_advertiserId},
				// 		success:function(brdata){
				// 			$('#brandsInfo').empty();
				// 			if(brdata.status == '200'){
				// 				if(m_advertiserId == ''){
				// 					$('#brandsInfo').append('<option value="">没有该广告主的品牌信息</option>');
				// 				}else{
				// 					$.each(brdata['brandsInfoList'],function(key,value){
				// 						$('#brandsInfo').append('<option value='+value['m_brandId']+'>'+value['m_brandName']+'</option>');
				// 					});
				// 				}
				// 			}else{
				// 				$('#brandsInfo').append('<option value="">没有该广告主的品牌信息</option>');
				// 			}
				// 			$('#brandsInfo').selectpicker('refresh'); //刷新品牌select
				// 		}
				// 	})	
					
				// })
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
				$('.list-inline span').hover(function(){
				  $(this).css('border','1px solid #5CB85C');
				},function(){
				  $(this).css('border','1px solid #ccc');
				})
				//----------------------
				// 表单全部trim
				$('#worksName,#worksDesp').blur(function(){
					var txt = $(this).val().trim();
					$(this).val(txt);
				});
			}
		})
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
			var worksDesp = $('#worksDesp').val(); //数据包说明
			if(!worksDesp){
				$('#error').show().text('数据包说明不能为空!');
				return false;
			}

			var hiddenFile = $('#hiddenFile').val(); //批量上传作品
			if(!hiddenFile){
				$('#error').show().text('至少上传一个以上的文件');
				return false;
			}
						
			var m_labelCode	   = new Array();  //标签数组
			$('#select-tag .select_label').each(function(key){
				var id = $(this).attr('data-id');
				m_labelCode.push(id);
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
			//检验
			var option = {
					data:{
						labelList:m_labelCode.join(","),
						worksName:worksName,
						resetForm: true  //成功提交后，重置所有表单元素的值 
					},
					uploadProgress: function(event, position, total, percentComplete) {
				        $('.progress-bar').css('width',percentComplete+'%').text(percentComplete+'%');
				    },
					dataType:'json',
					success:function(data){
						$('loadingtext').hide();
						$('.progress-bar').css('width','100%').text('100%');
						if(data.status == "200"){
							layer.alert('上传完成,提交成功!', {icon: 6,title:false,closeBtn:false,btn:['确定']},function(){
								window.open('view/search.html?&myWorksFlag=0');
								window.location.reload() ; //刷新
							});	
						}
						if(data.status == "-1" || data.status == "0"){
							alert(data['rtnMsg']);
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

		//console.log(m);
		$('.wordUpList').empty();
		$.each(m,function(key,value){
			$('.wordUpList').append('<li>'+value['name']+'</li>');
		})
	});

	//粒子特效
	particlesJS('particles-js',{
	    "particles": {
	      "number": {
	        "value": 60,
	        "density": {
	          "enable": true,
	          "value_area": 400
	        }
	      },
	      "color": {
	        "value": "#0090f7"
	      },
	      "shape": {
	        "type": "circle",
	        "stroke": {
	          "width": 0,
	          "color": "#0090f7"
	        },
	        "polygon": {
	          "nb_sides": 5
	        },
	        "image": {
	          "src": "img/github.svg",
	          "width": 100,
	          "height": 100
	        }
	      },
	      "opacity": {
	        "value": 0.5,
	        "random": false,
	        "anim": {
	          "enable": false,
	          "speed": 1,
	          "opacity_min": 0.1,
	          "sync": false
	        }
	      },
	      "size": {
	        "value": 3,
	        "random": true,
	        "anim": {
	          "enable": false,
	          "speed": 40,
	          "size_min": 0.1,
	          "sync": false
	        }
	      },
	      "line_linked": {
	        "enable": true,
	        "distance": 150,
	        "color": "#0090f7",
	        "opacity": 0.4,
	        "width": 1
	      },
	      "move": {
	        "enable": true,
	        "speed": 0.5,
	        "direction": "right",
	        "random": true,
	        "straight": false,
	        "out_mode": "out",
	        "bounce": false,
	        "attract": {
	          "enable": true,
	          "rotateX": 600,
	          "rotateY": 1200
	        }
	      }
	    },
	    "interactivity": {
	      "detect_on": "canvas",
	      "events": {
	        "onhover": {
	          "enable": true,
	          "mode": "grab"
	        },
	        "onclick": {
	          "enable": false,
	          "mode": "push"
	        },
	        "resize": true
	      },
	      "modes": {
	        "grab": {
	          "distance": 167.83216783216784,
	          "line_linked": {
	            "opacity": 1
	          }
	        },
	        "bubble": {
	          "distance": 400,
	          "size": 40,
	          "duration": 2,
	          "opacity": 8,
	          "speed": 3
	        },
	        "repulse": {
	          "distance": 200,
	          "duration": 0.4
	        },
	        "push": {
	          "particles_nb": 4
	        },
	        "remove": {
	          "particles_nb": 2
	        }
	      }
	    },
	    "retina_detect": true
	  }

	);

})

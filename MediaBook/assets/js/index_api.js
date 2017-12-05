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
	$.ajax({
		url:'initWorksSelectList.do',
		dataType:'json',
		type:'POST',
		beforeSend:function(){
			//请求前的处理
		},
		success:function(data){
			//默认显示搜索总数量
			$('#keywork').attr('placeholder','Search form '+data['worksCnt']+' works');
			// $('[name=a]').click(function(){
			// 	var id = $(this).val();
			// 	if(id == 1){
			// 		$('#keywork').attr('placeholder','Search form '+data['worksCnt']+' works');
			// 	}else{
			// 		$('#keywork').attr('placeholder','Search for...');
			// 	}
			// })
			
			//数据标签 包括产品分类 用途 sunyang
			$.each(data['worksLabelList'],function(key,value){
				var html = '<ul class="list-unstyled"><li class="weight">'+value['m_labelName']+'</li><li>';
					html += '<ul class="list-inline checkselect '+value['m_labelCode']+'"><li class="selected" data-id="">全部</li>';
				$.each(value['worksLabelList'],function(k,v){
					html += '<li data-id='+v['m_labelCode']+'>'+v['m_labelName']+'</li>';
				});
					html += '</ul></li></ul>';
				$('#ver_soso').append(html);
				select_chebox('.'+value['m_labelCode']+' li');
			});
			$('.list-inline li').hover(function(){
			  $(this).css('border','1px solid #b70000');
			},function(){
			  $(this).css('border','1px solid #ccc');
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
	// function select(id){
	// 	$(id).click(function(){
	// 		$(id).removeClass('selected');
	// 		$(this).addClass('selected');
						
	// 	});
	// }

	//检索hover 多选 品牌 和标签 
	function select_chebox(id){
		$(id).click(function(){
			var key = $(this).index();
			if(key == 0){
				$(id).removeClass('selected');
				$(id).eq(0).addClass('selected');
			}else{
				$(id).eq(0).removeClass('selected');
				var classname = $(id).eq(key).hasClass('selected');
				if(classname){
					$(id).eq(key).removeClass('selected');
					var classnames_all = $(id).hasClass('selected');
					if(!classnames_all){
						$(id).eq(0).addClass('selected');
					}
				}else{
					$(id).eq(key).addClass('selected');
				}
			}
		})
	}
	
	//开始进行搜索并跳转到页面
	function search_url(){
		var selectbtn = $('#soso-list').hasClass('selectLimit');
		console.log(selectbtn);
		if(selectbtn){
			layer.msg('您没有权限查询功能',{anim:6});
			return false;
		}else{
			search_over();
		}
		
	}

	//查询结果通知
	function search_over(){
		$.ajax({
			url:'queryWorksInfoList.do?'+search_join(),
			dataType:'json',
			type:'post',
			success:function(data){
				if(data['status'] == "200"){
					//console.log(search_join());
					window.open('./view/search.html?'+search_join());
				}else{
					layer.msg('没有找到您想要的数据', {anim:6});
				}
			}
		})
	}
	//条件参数查询
	function search_join(){
		var keyword = $('#keywork').val(); //搜索关键字
		var searchScope = new Array();
		$('#radio-soso input:checked').each(function(key,value){
			searchScope.push($(this).val());
		})

		//多选标签数组选择结果
		var label_list = new Array();
		$('.checkselect .selected').each(function(key){
			var id = $(this).attr('data-id');
			if(id !== ''){
				label_list.push(id);
			}
		});

		var myworks = $('.myhome .selected').attr('data-id');
		var mydate = new Date();
		var publishDateStart = $('.adddate .selected').attr('data-id');
		if(publishDateStart !==''){
			var publishDateEnd = mydate.Format('YYYY-M-D');
		}else{
			var publishDateEnd = '';
		}

		var data_param = 'inputKeyWord='+encodeURIComponent(keyword)+'&searchScope='+searchScope+'&labelCodeList='+label_list+'&myWorksFlag='+myworks+'&publishDateStart='+publishDateStart+'&publishDateEnd='+publishDateEnd;
		return data_param;
	}
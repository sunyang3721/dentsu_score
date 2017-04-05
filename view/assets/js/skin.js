$(function(){
	var name = $.cookie('skin_name');
	switch (name){
		case 'skin01':
		index_bg('a1');
		break;

		case 'skin02':
		index_bg('a4');
		break;

		case 'skin03':
		index_bg('a3');
		break;

		case 'skin04':
		index_bg('a10');
		break;

		default:
		index_bg('a10');
	}
	$('#skin01').click(function(){
		index_bg('a1');
		$.cookie('skin_name','skin01');
	});
	$('#skin02').click(function(){
		index_bg('a4');
		$.cookie('skin_name','skin02');
	});
	$('#skin03').click(function(){
		index_bg('a3');
		$.cookie('skin_name','skin03');
	});
	$('#skin04').click(function(){
		index_bg('a10');
		$.cookie('skin_name','skin04');
	});
	function index_bg(path){
		var url = 'http://www.jq22.com/js/'+path+'.html';
		$('iframe').attr('src',url);
	}
})
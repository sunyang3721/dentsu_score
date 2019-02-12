<?php
	$get_name = $_GET['name'];
	$name = preg_replace("/(习近平)|(毛主席)|(奸)|(死)|(草)|(操)|(逼)|(傻)|(滚)|(垃圾)|(屁)|(大哥)|(爷)/",$str,$get_name);
	$fpr = fopen('./data.json',"r"); //读取本地文件
	while(!feof($fpr)){
	    $order = fgets($fpr,5000000);
	    $k = json_decode($order,true);
	    //var_dump($k);
	}
	if(!$k){  //文件是空的就补充,避免bug
		$k = array(
			'name'=>array('test'),
			'moeny'=>array('name'=>'test','nums'=>'0')
			);
		//{"name":["test","sunyang"],"moeny":{"0":{"name":"sunyang","nums":"0"}}}
	}
	//遍历名字
	foreach ($k['name'] as $key => $value) {
		if($value == $name){
			echo '409';  //判断是否有重复名
			exit;
		}
	}
	array_push($k['name'],$name); //名字
	array_push($k['moeny'],array('name'=>$name,'nums'=>'0')); //钱数
	array_multisort(array_column($k['moeny'],'nums'),SORT_DESC,$k['moeny']);

	//写入文件
	if($name){
		$fpw = fopen('./data.json',"w");
		if(!$fpw){
			echo 'error';
			exit;
		}else{
			fwrite($fpw,json_encode($k),strlen(json_encode($k)));
			flock($fpw,LOCK_UN);
			fclose($fpw);
			echo 'success';
		}
	}
?>
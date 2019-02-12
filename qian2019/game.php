<?php
	$name = $_GET['name'];
	$nums = $_GET['nums'];

	$fpr = fopen('./data.json',"r"); //读取本地文件
		while(!feof($fpr)){
		    $order = fgets($fpr,5000000);
		    $k = json_decode($order,true);
		    //var_dump($k);
		};

	if(!$name && !$nums){
		if($_GET['start']){
			echo $order; //显示排行列表;
		}
		exit;
	}
	//echo $name;
	$array = array();
	foreach ($k['moeny'] as $key => $value) {
		if($value['name'] == $name){
			$start = true;
			$moeny = $k['moeny'][$key];
			$id = $key;
		}
	}
	if(!$start){
		echo 'no';
		exit;
	}
	//var_dump($k['moeny']);
	if($moeny['nums'] < $nums){
		unset($k['moeny'][$id]);
		//array_splice($k['moeny'], $id); //删除数组元素 指定
		array_push($k['moeny'],array('name'=>$name,'nums'=>$nums)); //钱数
		array_multisort(array_column($k['moeny'],'nums'),SORT_DESC,$k['moeny']); //排序 高到低
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
	}
	exit;
	//echo $k['moeny']['10'];
	//echo  array_search($moeny,$k['moeny']);
	//exit;
	//echo json_encode(array('id'=>$id,'moeny' => $moeny));
	
?>
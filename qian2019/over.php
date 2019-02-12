<?php
	$name = $_GET['name'];
	$fpr = fopen('./data.json',"r"); //读取本地文件
		while(!feof($fpr)){
		    $order = fgets($fpr,5000000);
		    $k = json_decode($order,true);
		    //var_dump($k);
		};
	//echo $name;
	$array = array();
	foreach ($k['moeny'] as $key => $value) {
		if($value['name'] == $name){
			$moeny = $k['moeny'][$key];
			$id = $key+1;
		}
	}
	//echo $k['moeny']['10'];
	//echo  array_search($moeny,$k['moeny']);
	//exit;
	if($id && $moeny){
		echo json_encode(array('id'=>$id,'moeny' => $moeny));
	}else{
		echo '-1';
	}
	// arsort($k['moeny']);
	// var_dump($k['moeny']);
	// exit;
	// $num = count($k['moeny']);
	// for ($i=0; $i <= $num; $i++) { 

	// 	echo $k['moeny'][''][$i].'---';
	// };
?>
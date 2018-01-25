<?php
  $hostname="http://www.beijing-dentsu.com.cn/h5/canvas2018/canvas2018/";
  //for test
 // $hostname="http://card.koo7.com/";

  $file_num=rand(1,10000);


  $dirname="upload";


  $filename="happy_".$file_num;

  $filename_ext=$filename.".jpg";

  $file_path=$dirname."/".$filename_ext;

 //for test
  //$file_path=$filename_ext;
  $xmlstr = $GLOBALS[HTTP_RAW_POST_DATA]; 

  $base64_url=$_POST['pic'];

  $base64_body = substr(strstr($base64_url,','),1);

  $data= base64_decode($base64_body );

  file_put_contents($file_path,$data);



  if(!file_exists($file_path)) 
  { 
    $addr=array("success"=>0,"address"=>"");    
  }else{
      $file_path=$hostname.'preview.php?cards='.$filename;
      //for test
     // $file_path=$hostname.'/preview.php?cards='.$filename;

	  $addr=array("success"=>1,"address"=>$file_path);	  
  } 
  echo json_encode($addr);
 
?>
<?php
$hostname="http://www.beijing-dentsu.com.cn/h5/canvas2018/canvas2018/";
//$hostname="http://card.koo7.com/";

$cardName_orig=isset($_GET['cards'])?$_GET['cards']:"";

$imgDir="upload";
$cur_url=$hostname."preview.php?cards=".$cardName_orig;
if(empty($cardName_orig)){
    $cardName=$imgDir."/default.jpg";
}else{
    $cardName=$imgDir."/".$cardName_orig.".jpg";
}

//$cardName=$cardName_orig.".jpg";

$share_img=$hostname."share1.jpg";
$flag=true;
if(stripos($theusagt , "iPhone") !== false || stripos($theusagt , "iPod") !== false){
    $flag=false;
}else if(stripos($theusagt , "Mobile") !== false){
    $flag=false;
}
else if(stripos($theusagt , "Android") !== false){
    $flag=false;
}
else if(stripos($theusagt , "Windows Phone") !== false){
    $flag=false;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>祝您2018狗年快乐！</title>
    <!-- <link rel="icon" href="assets/logo.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="assets/logo.ico" type="image/x-icon"/> -->

<!--     <script src="js/easeljs-0.7.1.min.js"></script>
    <script src="js/tweenjs-0.5.1.min.js"></script>
    <script src="js/movieclip-0.7.1.min.js"></script> -->
    <script src="http://yx.xnimg.cn/minisite/common/js/jquery-1.7.1.min.js"></script>
</head>
<style type="text/css">
    body,img {
       margin:0;
       padding:0;
       border:0;
    }
    img{width:100%;}
</style>
<body>
<img src="<?php echo $hostname.$cardName; ?>" />

</body>
</html>

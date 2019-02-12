function dentsu_init() {
	updateShare(0);  //初始化
}

/*function dentsu_submitScore(score) {
	updateShareScore(score);
	 dentsu.shareFriend();
}*/

function updateShare(bestScore) {

	var descContent = "快来捡钱吧";
	
   if(bestScore ==0){
	    shareTitle = "运气太背，一毛钱也没有！ ";
	}else if(bestScore >0 && bestScore < 100){
		shareTitle = "运气太背，出门竟被钱砸到，只有"+bestScore+"元! ";
	}else if(bestScore >= 100&& bestScore < 150){
		shareTitle = "RP大爆发捡到"+bestScore+"元，今天不用坐公交了!";
	}else if(bestScore >= 150 && bestScore < 250){
		shareTitle = "区区"+bestScore+"元，手到擒来~!";
	}else if(bestScore >= 250 && bestScore < 400){
		shareTitle = "捡钱捡到手抽筋，轻轻一数，"+bestScore+"元~";
	}
	else {
		shareTitle = "财神爷附身，不小心捡到了"+bestScore+"元，真心不是故意的！！";
	}
	appid = '';
	dentsu.setShareInfo(shareTitle,descContent);
}

function updateShareScore(bestScore) {
	updateShare(bestScore) ;
}
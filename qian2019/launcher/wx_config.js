wx.config({
    debug: false,
    appId: 'wx7cded1329fe22064',
    timestamp: '1547101498',
    nonceStr: 'KNf9wBhVt4fHDAFI',
    signature: '3ce1bc0e2f2a2aa34bcbb967aeb7661706da2a9e',
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems'
    ]
});

var PLAY_URL = PLAY_URL || "";

var GAME_ICON = PLAY_URL+"icon.png";
//var GAME_URL = "www.play68.com";
var SHARE_TITLE = "最好玩的小游戏就在68微游戏";
var SHARE_DESC = "大量免费在线HTML5游戏，不用下载，款款精品，快来跟你朋友一起玩吧！";
if(/cps=aibili/.test(window.location.href)){
	var GAME_ICON = 'http://www.play68.com/resources/images/xiangq/batton_aibili.png';
}
var GAMEURL = GAMEURL || window.location.href;
var GAME_URL = GAME_URL || window.location.href;
var SHARE_URL = "http://www.play68.com";

function __setWxShareInfo(){
    SHARE_URL = GAME_URL || "http://www.play68.com";
    if(/^http:\/\/\d+\.g\.play68\.com/i.test(SHARE_URL)) {
        SHARE_URL = SHARE_URL.replace(/\d+\.g/i, parseInt(Math.random()*1000000)+'.g');
    }
    if(/^http:\/\/www.play68.com\/games\//i.test(SHARE_URL)) {
        SHARE_URL = SHARE_URL.replace(/www/i, parseInt(Math.random()*1000000)+'.g');
    }

    if(/\?/g.test(GAME_URL)){
        if(/from_sid/g.test(GAME_URL))
            SHARE_URL = SHARE_URL.replace(/from_sid=\w+/i, 'from_sid=154710149896460');
        else
            SHARE_URL += "&from_sid=154710149896460";
    }
    else {
        if(/from_sid/g.test(GAME_URL))
            SHARE_URL = SHARE_URL.replace(/from_sid=\w+/i, 'from_sid=154710149896460');
        else
            SHARE_URL += "?from_sid=154710149896460";
    }
    if(/from_sid/g.test(SHARE_URL)){
            SHARE_URL = SHARE_URL.replace(/from_sid=\w+/i, 'from_sid=154710149896460');
     }else{
            SHARE_URL += (SHARE_URL.indexOf('?')>0?'&':'?')+"from_sid=154710149896460";
     }
    //宝箱奖励
    SHARE_URL = SHARE_URL.replace(/&is_new=1/, '');

    if("string" === typeof SHARE_SPEC_PARAM){
        if(/ly_spec_param/g.test(SHARE_URL)) {
            SHARE_URL = SHARE_URL.replace(/ly_spec_param=.*?&?/i, 'ly_spec_param='+SHARE_SPEC_PARAM);
        }
        else {
            SHARE_URL += (SHARE_URL.indexOf('?')>0?'&':'?')+"ly_spec_param=" + SHARE_SPEC_PARAM;
        }
    }

    var __wxShareInfo = {
        title: SHARE_TITLE,
        desc: SHARE_DESC,
        link: SHARE_URL,
        imgUrl: GAME_ICON,
        type: '',
        dataUrl: '',
        success: function () {
            _succShare(1);
        },
        cancel: function () {
            _cancelShare(1);
        }
    };
    var __wxShareInfoTimeline={
	    title: SHARE_TITLE,
		desc: SHARE_DESC,
		link: GAMEURL,
		imgUrl: GAME_ICON, 
		type: '',
		dataUrl: '',
		success: function () {
			 _succShare(2);
		},
		cancel: function () {
			 _cancelShare(2);
		}

	};
    wx.onMenuShareAppMessage(__wxShareInfo);
    wx.onMenuShareTimeline(__wxShareInfoTimeline);
    // 分享QQ
    __wxShareInfo.success = function () {
        _succShare(3);
    };
    wx.onMenuShareQQ(__wxShareInfo);
    // 分享tx微博
    __wxShareInfo.success = function () {
        _succShare(4);
    };
    wx.onMenuShareWeibo(__wxShareInfo);
}
// 分享成功
var GAMENAME = GAMENAME || '';
var GAMEID = GAMEID || 0;
var SHARE_ACTIVITY = SHARE_ACTIVITY || 0;
var SHAREBOX = SHAREBOX || 0;
function _succShare(ShareType){
    if(/object/i.test(typeof _czc)){
        if(navigator.userAgent.match(/iphone|ipod|ios|ipad/i)){
            _czc.push(["_trackEvent","分享成功","IOS",GAMENAME,"",""]);
        }
        else if(navigator.userAgent.match(/android/i)){
            _czc.push(["_trackEvent","分享成功","ANDROID",GAMENAME,"",""]);
        }
        else{
            _czc.push(["_trackEvent","分享成功","其他设备",GAMENAME,"",""]);
        }
    }
  $(window).trigger('wxShareSuccess',[ShareType]);
  //分享活动
   if (SHARE_ACTIVITY && ShareType == 2) {
    	shareActivity();
   }
    _shareLog(ShareType);
    _shareBoxSuccess();
    if(typeof succShareCallback == "function") {
        succShareCallback();
    }
}
// 取消分享
function _cancelShare(cancelFlag){
	var cancelFlag = cancelFlag || 0;
    if(/object/i.test(typeof _czc)){
        if(navigator.userAgent.match(/iphone|ipod|ios|ipad/i)){
            _czc.push(["_trackEvent","取消分享","IOS",GAMENAME,"",""]);
        }
        else if(navigator.userAgent.match(/android/i)){
            _czc.push(["_trackEvent","取消分享","ANDROID",GAMENAME,"",""]);
        }
        else{
            _czc.push(["_trackEvent","取消分享","其他设备",GAMENAME,"",""]);
        }
    }
}

function _shareLog(ShareType){
    if(/(www|\d+\.g)\.play68\.com/i.test(location.hostname)){
        $.ajax({
            type : "GET",
            url : "/?r=site/sharelog&shareid=154710149896460&url="+SHARE_URL+"&type="+ShareType+"&gameid="+GAMEID,
            success : function() {}
        });
    }
}
function contains(str, val) {
  var arr = new Array();
  arr = str.split(',');
  var index = $.inArray(val+'',arr);
  return index == -1 ? false : true;
}
//宝箱奖励  分享有礼成功回调
function _shareBoxSuccess() {
    if (SHAREBOX) {
    	if (contains(SHAREBOX,GAMEID)) {
    	_czc.push(["_trackEvent","邀请功能（游戏内）","分享人数","","",""]);
    		$.ajax({
				url: '/index.php?r=Play/shareBox',
				type:'get',
				data: {gameid:GAMEID,shareid:'154710149896460'},
				success: function(data) {
					getReceiveBox(1);
					$('.w_laren .fenxiang').css('display','none');
				},
				complete: function() {
		   		}
		  });
    	}
    }
}
wx.ready(function(){
    wx.hideMenuItems({
        menuList: ['menuItem:share:timeline']
    }); 
    var shareChangeListen = {
        oldParam:{
            title: SHARE_TITLE || '',
            desc: SHARE_DESC || '',
            link: SHARE_URL || '',
            imgUrl: GAME_ICON || '',
        },
        run:function(){
            if( false
                || this.oldParam.title!=SHARE_TITLE
                || this.oldParam.desc!=SHARE_DESC 
                || this.oldParam.link!=SHARE_URL 
                || this.oldParam.imgUrl!=GAME_ICON
            ){
                this.oldParam.title=SHARE_TITLE
                this.oldParam.desc=SHARE_DESC 
                this.oldParam.link=SHARE_URL 
                this.oldParam.imgUrl=GAME_ICON 
                __setWxShareInfo();
            }
        }
    };
    __setWxShareInfo();
    setInterval(function(){shareChangeListen.run();},500);
});
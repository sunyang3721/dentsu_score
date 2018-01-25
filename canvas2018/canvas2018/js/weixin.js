/*
* jwl1978_cn@sina.com
* v1.0
*/
var dataForWeixin={
        appId:'gh_b49343bb8b1c',
        MsgImg:"http://www.beijing-dentsu.com.cn/happynewyear2015/happynewyear2015/assets/share.jpg",
        TLImg:"http://www.beijing-dentsu.com.cn/happynewyear2015/happynewyear2015/assets/share.jpg",
        link:'http://www.beijing-dentsu.com.cn/happynewyear2015.html',
        title:'2015羊年喜洋洋！',
        titlequan:'恭祝羊年喜洋洋，\n自制贺卡乐分享！',
        desc:'恭祝羊年喜洋洋，\n自制贺卡乐分享！',
        descquan:'恭祝羊年喜洋洋，\n自制贺卡乐分享！',
        callback:function(){

        }
};


(function(){
    var onBridgeReady=function(){
        //WeixinJSBridge.call('hideToolbar');
        // 发送给好友;
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
        WeixinJSBridge.invoke('sendAppMessage',{
        "appid":dataForWeixin.appId,
        "img_url":dataForWeixin.TLImg,
        "img_width":"120",
        "img_height":"120",
        "link":dataForWeixin.link,
        "desc":dataForWeixin.desc,
        "title":dataForWeixin.title
        }, function(res){(dataForWeixin.callback)();});
    });
                // 分享到朋友圈;
                WeixinJSBridge.on('menu:share:timeline', function(argv){
                    (dataForWeixin.callback)();
                    WeixinJSBridge.invoke('shareTimeline',{
                        "img_url":dataForWeixin.TLImg,
                        "img_width":"120",
                        "img_height":"120",
                        "link":dataForWeixin.link,
                        "desc":dataForWeixin.descquan,
                        "title":dataForWeixin.titlequan
                    },  function(res){});
                });
                // 分享到微博;
                WeixinJSBridge.on('menu:share:weibo', function(argv){
                    WeixinJSBridge.invoke('shareWeibo',{
                        "content":dataForWeixin.desc+" "+dataForWeixin.link,
                        "url":dataForWeixin.link,
                        "img_url":dataForWeixin.MsgImg,
                        "pic":dataForWeixin.MsgImg,
                        "img":dataForWeixin.MsgImg,
                        "desc":dataForWeixin.desc,
                        "title":dataForWeixin.title
                    }, function(res){(dataForWeixin.callback)();});
                });
                // 分享facebook;
                WeixinJSBridge.on('menu:share:facebook', function(argv){
                    (dataForWeixin.callback)();
                    WeixinJSBridge.invoke('shareFB',{
                        "img_url":dataForWeixin.TLImg,
                        "img_width":"120",
                        "img_height":"120",
                        "link":dataForWeixin.link,
                        "desc":dataForWeixin.desc,
                        "title":dataForWeixin.title
                    }, function(res){});
                });

            };

            if(document.addEventListener){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if(document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
            }

})();
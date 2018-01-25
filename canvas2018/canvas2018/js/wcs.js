var appId = 'wxbb0f47ed86a8aa4b';    
var shareTitle = "和北极熊一起分享可口可乐，这个冬天更畅爽，有图有真相！";
var shareDescription = "和北极熊一起分享可口可乐，这个冬天更畅爽，有图有真相！";    
var shareUrl = strPolarBearWebRoot+'/index.aspx';
var picUrl = strPolarBearPicRoot + '/share.jpg';

document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
  WeixinJSBridge.call('hideToolbar');
  WeixinJSBridge.on('menu:share:appmessage',
    function (argv) {
      WeixinJSBridge.invoke('sendAppMessage', {
        "appid": appId,
        "img_url": picUrl,
        "link": shareUrl,
        "desc": shareDescription,
        "title": shareTitle
      },
      function (res) {
      });
    });
  WeixinJSBridge.on('menu:share:timeline',
    function (argv) {
      WeixinJSBridge.invoke('shareTimeline', {
        "appid": appId,
        "img_url": picUrl,
        "link": shareUrl,
        "desc": shareDescription,
        "title": shareTitle
      },
      function (res) {
      });
    });
  WeixinJSBridge.on('menu:share:weibo',
    function (argv) {
      WeixinJSBridge.invoke('shareWeibo', {
                "img_url": picUrl,
                "content": shareDescription +shareTitle+shareUrl,
                "url": shareUrl,
                "title": shareTitle,
      },
      function (res) {
      });
    });
});

function shareWechatInit(title, desc, link, imgUrl) {
  WeixinJSBridge.invoke('shareTimeline', {
    "img_url": imgUrl,
    "link": link,
    "desc": desc,
    "title": title
  });
}

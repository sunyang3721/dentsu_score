var title = '2015羊年喜洋洋！';
var url = activityLink;
var pic = 'http://www.beijing-dentsu.com.cn/happynewyear2015/happynewyear2015/assets/share.jpg';
var content = '恭祝羊年喜洋洋，自制贺卡乐分享！';
/*
* jwl1978_cn@sina.com
* v1.0
*/
function shareActivity(id){	
	url = activityLink;
	switch (id) {						
		case 1:
			//人人
			pic = 'share_150.jpg';
			window.open('http://widget.renren.com/dialog/share?resourceUrl='
			        + encodeURIComponent(url) + '&srcUrl='
					+ encodeURIComponent(url) + '&title='
					+ encodeURIComponent(title) + '&pic='
					+ encodeURIComponent(pic) + '&description='
					+ encodeURIComponent(content) + '&charset=utf-8', '_blank');
			break;
		case 2:
			//新浪微博
			//pic = 'http://card.koo7.com/assets/share_400X400.jpg';
			window.open('http://v.t.sina.com.cn/share/share.php?title='
					+ encodeURIComponent(content) + '&pic='
					+ encodeURIComponent(pic) + '&url='
					+ encodeURIComponent(url), '_blank');
			break;			
		case 3:
			//豆瓣
			window.open('http://shuo.douban.com/!service/share?text='
					+ encodeURIComponent(content + url) + '&image='
					+ encodeURIComponent(pic) + '&href='
					+ encodeURIComponent(url) + '&name='
					+ encodeURIComponent(title), '_blank');
			break;			
		case 4:
			//腾讯微博
			pic = 'share_640X850.jpg';
			window.open('http://v.t.qq.com/share/share.php?title='
					+encodeURIComponent(content)+'&pic='
					+encodeURIComponent(pic)+'&url='
					+encodeURIComponent(url),'_blank');
			break;
		case 5:
			//开心
			window.open('http://www.kaixin001.com/rest/records.php?style=11&content='
					+ encodeURIComponent(content) + '&pic='
					+ encodeURIComponent(pic) + '&url='
					+ encodeURIComponent(url), '_blank');
			break;	
		case 6:			
			//QQ空间&朋友网
			window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'
					+'title=' + encodeURIComponent(title)
					+'&url=' + encodeURIComponent(url)
					+'&pics=' + encodeURIComponent(pic)
					+'&summary=' + encodeURIComponent(content),'_blank');
			break;
	}		
}
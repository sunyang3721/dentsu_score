var meiriq_loading = (function() {
    function meiriq_loading() {
        this.msgArr = ['设计小猪疯狂上色中…','工程小猪奋力敲出游戏代码…','产品小猪吃力搬运页面元素…','运营小猪撰写得分文案中...','小猪正在擦拭按钮…','游戏正在从空中赶来…','产品小猪吃力搬运页面元素…'];
        this.currentIndex = 0;
        this.onCreate();
    }
    meiriq_loading.prototype.onCreate = function() {
        var content;
        content = document.createElement('div');
        content.setAttribute('id', 'meiriq-loading');
        content.style.position = 'absolute';
        content.style.width = '100%';
        content.style.height = '100%';
        content.style.top = '0';
        content.style.textAlign = "center";
        content.style.bottom = '0';
        content.style.left = '0';
        content.style.right = '0';
        content.style.zIndex = 9999;
        content.style.backgroundColor = '#ffffff';
        content.innerHTML = '<img id="meiriq-loading-img" src="data:image/gif;base64,R0lGODlhoABQAPf/ANGOlWxpaaFtctnZ2dYNC9+Xnm1JTGFeXmNhYQkEBOFXWnNNUS0qKp2cnLV6gJUJCPj4+LJ4fhIMDEVCQurp6VY5PIlcYWoKCuyepiaKy9bW1vz8/CMcHDw5Oc3MzPr6+m6Svh4bG4VaXt3d3c6Mk0tISJCOjptobb69veSaou7t7ZaVlfLy8q11e2FCRXpzc9olJZORkRUREVk7Puufp3pSVkYuMfX19fb29j4pK8XExL6Bhw4JCZuXt9cZF10+QTQ2Nrm4uGlHSvDw8M2LkUwyNeDg4MLBwaZwdtszMyQhIXZ0dKakpHp4eN07O5dlauCYoLmasemeprW0tHRxcZFiZlVTU0mOxUI9PbgLCtHR0d5ERn1VWSEVFteRmYBWW9LS0pqZmYaEhCkmJsMMCqqoqIqIiIxeYyobHEhFRcmcrkErLa6srMGDiTckJTIhIqyqquXk5BgVFYaVupdmazUxMXhQVC8uLo2Li4iGhrGvr+Wbo7p+hNSQl6aYtFyQwaimpmhlZeZ0eeuZoIF/f15bW+qSmbKwsFBNTR0SEygDA1SPw4SCguKfqjqMyFtZWWZESEwFBYNYXGRDRrh9gzg0NONjZzsGBqOhoVwFBaRudDwnKZ5rcCyLytIMCqSiokoxNJNjaFpYWE40Np+enn17e3NwcOmgqS4eIEkwMhoQESQXGDgmJ2VDRgsGBggDAwcAABcOD3BtbeiepTY4OMeHjufm5uOaouidpeecpOKZodqUm1A1N+Tj49uUnIhbYIKAgNyVnI5fZP7+/vDv78SEi8qJkDMhI6hyd+Z5fmBAQ+uXn5RkadiTmsWFjNDPz8C/v8jHx+iIj+Rqb399fd5jZpY/QVhLS1hUVI9gZcOEi6tGSJVbYFI3OTMTEnVPU+jn59UODL17gJRjaJhma+bl5eRydsTDw9uYnrSzs2Y4O+Nna0gXGHhTVueAhuiFjN+aoXBLTzYjJcmIj8aGjREBAVNGRS1OateerB5nl8ONmMKbsAgEBOygqP///////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYzExYmIxNy1mM2I5LTQwMmEtYWMzOS01MmZkODU1NzkzNzQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTBCOEIxNTIxQjkxMTFFOUJEMDZFRjE5RTU3MzIzRjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTBCOEIxNTExQjkxMTFFOUJEMDZFRjE5RTU3MzIzRjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTVjNjgyM2UtYjcwYy00N2I2LTkxZjUtNzQwMTkzZTIzNTYwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmFjMTFiYjE3LWYzYjktNDAyYS1hYzM5LTUyZmQ4NTU3OTM3NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWE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" style="position:relative;margin-top:'+(window.innerHeight/2 - 80 - window.innerHeight/7)+'px;" /><p id="meiriq-loading-msg" style="font-weight:bold;color:#555555">设计狮疯狂上色中…</p><img src="./resource/assets/logo.png" style="width:100px;position:absolute;bottom:30px;left:'+(window.innerWidth/2 -50)+'px;" />';
        document.body.appendChild(content);

    };
    meiriq_loading.prototype.changeMsg = function(){
        var mp = document.getElementById('meiriq-loading-msg');
        if(mp){
            mp.innerHTML = this.msgArr[(this.currentIndex++)%7];
            var self = this;
            setTimeout(function(){
                self.changeMsg();
            },1000);
        }
    };
    meiriq_loading.prototype.setProgress = function(current, total) {
       
    };
    meiriq_loading.prototype.finish = function() {
        var elem;
        return (elem = document.getElementById('meiriq-loading')).parentNode.removeChild(elem);
    };
    return meiriq_loading;
})();

var loading = new meiriq_loading();
loading.changeMsg();

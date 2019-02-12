/**
 * <div class="history mask" id="history-wrap">
 *     <div>
 *         <div class="history-head">更多好游戏尽在68微游戏<i id="history-cancel" class="icon-cancel"></i>
 *     </div>
 *     <ol class="flex">
 *         <li class="flex-list"><a class="flex flex-v" href=""><img class="r5" src=""><span>大天使之剑H5</span></a></li>
 *     </ol>
 *     <div class="history-btn"><a href="javascript:;" id="history-exit" class="btn">仍要离开</a></div>
 *     <div class="history-check">
 *         <input id="history-checkbox" type="checkbox"><label for="history-checkbox">今日不再提示</label></div>
 *     </div>
 * </div>
 */
;(function () {
    $.getJSON('/', {key: 'history_pop', r: 'index/getUserCache'}, function (cache) {
        if (cache.code == 0) {
            $.getJSON('/', {id: 10, r: 'index/ad'}, function (res) {
                if (res.list && res.list.length > 0) {
                    luanch();
                    var i = 0;
                    $.each(res.list, function (id, one) {
                        i++;
                        if (i > 3) return false;
                        if (getParam(one.url, 'c') != getParam(window.location.search, 'c'))
                            $('<li class="flex-list"><a class="flex flex-v" href="' + one.url + '"><img src="' + one.image + '"><span>' + one.title + '</span></a></li>').appendTo($('#history-more-game'));
                        else i--;
                    });
                    $('<li class="flex-list"><a class="flex flex-v" href="/"><img src="resources/16/images/public/68icon.png"><span>更多游戏</span></a></li>').appendTo($('#history-more-game'));
                }
            });
        }
    });
    function getParam(url, name) {
        if (url && url.indexOf('?') != -1) {
            url = url.substr(url.indexOf('?') + 1)
        }
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = url.match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    function luanch() {
        $('body').append('' +
            '<div class="history mask" id="history-wrap">' +
            '<div>' +
            '<div class="history-head">更多好游戏尽在68微游戏<i id="history-cancel" class="icon-cancel"></i></div>' +
            '<ol id="history-more-game" class="flex">' +
            '</ol>' +
            '<div class="history-btn"><a href="javascript:;" id="history-exit" class="btn">仍要离开</a></div>' +
            '<div class="history-check">' +
            '<input id="history-checkbox" type="checkbox"><label for="history-checkbox">今日不再提示</label></div>' +
            '</div>' +
            '</div>' +
            '');
        if ("pushState" in window.history) {
            window.history.pushState({title: document.title, url: location.href}, document.title, location.href);
            window.addEventListener("popstate", function (e) {
                if (!e.state && window.click_share!=true) {
                    if ($('#history-wrap').is(":visible")) {
                        window.history.pushState({
                            title: document.title,
                            url: location.href
                        }, document.title, location.href);
                    }
                    $('#history-wrap').show();
                    $('#history-cancel').off().bind('click', function () {
                        window.history.pushState({
                            title: document.title,
                            url: location.href
                        }, document.title, location.href);
                        $('#history-wrap').hide();
                    });
                    $('#history-exit').off().bind('click', function () {
                        if(window.history.length<3 && isWeixin()){
                            wx.closeWindow();
                        }else{
                            window.history.back();
                        }
                    });
                    $("#history-checkbox").off().click(function () {
                        if ($(this).prop("checked")) {
                            $.getJSON('/', {
                                key: 'history_pop',
                                'value': '1',
                                t: getExpire(),
                                r: 'index/setUserCache'
                            }, function () {
                            });
                        } else {
                            $.getJSON('/', {key: 'history_pop', t: -1, r: 'index/setUserCache'}, function () {
                            });
                        }
                    })
                }
            });
        }
    }

    function getExpire() {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        var tomorrow_0 = today.getTime() / 1000 + (24 * 3600);
        var current_time = Math.round(new Date().getTime() / 1000);
        return tomorrow_0 - current_time;
    }
})();
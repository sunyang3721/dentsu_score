// 支付

function pay(itemid, itemname, price, count, spec, skey) {
    var data = {itemid: itemid, itemname: itemname, price: price, count: count, spec: spec, skey: skey};
    if (parseFloat(data.price) > 0) {
        data.price = parseFloat(data.price);
        data.count = parseInt(data.count);
        pay68(data, true);
    } else {
        LoginUi.setFlowTips(JS_MSG_41);
    }

}

function pay68(data, isInternal) {
    if (ISACTGAME) {//游戏内部支付
        var gameid = 0;
    } else {
        var gameid = GAMEID;
    }
    if (window.Play68app) { // 68app
        if (window.Play68app.pay) {
            data.price = parseFloat(data.price);
            data.count = parseInt(data.count);
            window.Play68app.pay(String(gameid), 1, String(data.itemid), data.itemname, data.price, data.count);
        }
        else {
            LoginUi.setFlowTips(JS_MSG_42);
        }
    }
    else {
        //现在所有端都能支付
        //if (/ios|ipad|ipod|iphone|android/i.test(navigator.userAgent) || GAMEID == '491') {
            if (isInternal) {
                var gameid = 0;
            }
            else {
                var gameid = GAMEID;
            }

            var wxplay = 0;
            var ua = navigator.userAgent.toLowerCase();
            if (location.pathname == "/g" && ua.match(/MicroMessenger/i) == "micromessenger") {
                wxplay = 1;
            }
            var cpsList = /&cps=([^&]*)/i.exec(location.href);
            var cps = '';
            if (cpsList && cpsList.length == 2) {
                cps = cpsList[0];
            }
            var skey = data.skey ? data.skey : '';
            var spec = data.spec ? data.spec : '';
            var url = "/?r=site/pay&gameid=" + gameid + "&serverid=1&itemid="
                + data.itemid + "&itemname=" + data.itemname
                + "&price=" + data.price + "&count=" + data.count + "&spec=" + spec
                + "&backurl=" + encodeURIComponent(window.location.href) + "&wxplay=" + wxplay + "&cps=" + cps + '&skey=' + skey;

            payUI(url);
    }
}

function payUI(url) {
    var pay = document.getElementsByClassName('pay')[0];
    if (pay) {
        document.body.removeChild(pay);
    }
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    pay = document.createElement("div");
    pay.className = 'pay';
    pay.style.position = 'absolute';
    pay.style.top = '0px';
    pay.style.width = '100%';
    pay.style.minHeight = h + 'px';
    pay.style.backgroundColor = 'rgba(0,0,0,0.75);';
    pay.style.zIndex = 88888888;

    var pay1 = document.createElement("div");
    pay1.className = 'pay1';
    pay1.style.position = 'relative';
    pay1.style.top = '0px';
    pay1.style.minHeight = '320px';
    pay1.style.maxWidth = '640px';
    pay1.style.width = '100%';
    pay1.style.margin = 'auto';
    pay1.style.zIndex = 9;

    var pay2 = document.createElement('div');
    pay2.className = 'pay2';
    pay2.style.position = 'relative';
    pay2.style.margin = 'auto';
    pay2.style.minWidth = '320px';
    pay2.style.maxHeight = '640px';
    pay2.style.width = '100%';

    var payFrame = document.createElement('iframe');
    payFrame.className = 'pay3';
    payFrame.style.minHeight = h + 'px';
    payFrame.style.minWidth = '320px';
    payFrame.style.maxWidth = '640px';
    payFrame.style.width = '100%';
    payFrame.style.border = '0 solid #eee';
    payFrame.src = url;

    pay.appendChild(pay1);
    pay1.appendChild(pay2);
    pay2.appendChild(payFrame);

    document.body.appendChild(pay);
}

function paysucc(data) {
    console.log('======= paysucc =======');
    console.log(data);
    LoginUi.setFlowTips(JS_MSG_44);
    $(".pay").hide();
    $(".pay iframe").attr('src', '');
    // 内部支付
    if (data.gameid == 0) {
        if (data.itemid == "1000001") {
            set_flower();
        }
        return;
    }
    else {
        var GameFrame_2 = document.getElementById('game_window');
        if (GameFrame_2 && typeof GameFrame_2.contentWindow.postMessage === 'function') {
            GameFrame_2.contentWindow.postMessage({op_type: 'fn', value: {fn: 'paysucc', args: []}}, '*');
        }
    }
}

function paycencel() {
    var pay = document.getElementsByClassName('pay')[0];
    if (pay) {
        document.body.removeChild(pay);
    }
}

// 微信支付
function weixinpay(data) {
    var gameid = data.gameid || 0;
    var serverid = data.serverid || 0;
    var itemid = data.itemid;
    var itemname = data.itemname || '';
    var price = data.price || 0;
    var count = data.count || 0;
    var spec = data.spec || '';
    var backurl = data.backurl || '';
    var sign = data.sign || '';

    var _payParams = null;
    var _pay = function () {
        if (_payParams == null) {
            alert(JS_MSG_113);
            return false;
        }
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            _payParams,
            function (res) {
                //WeixinJSBridge.log(res.err_msg);
                _payParams = null;
                if ('get_brand_wcpay_request:ok' == res.err_msg) {
                    paysucc({gameid: gameid, itemid: itemid});
                }
                else {
                    //paycencel();
                }
            });
    };
    $.ajax({
        url: '/api/weixinpay',
        data: {
            gameid: gameid,
            serverid: serverid,
            itemid: itemid,
            itemname: itemname,
            price: price,
            count: count,
            spec: spec,
            backurl: backurl,
            sign: sign,
            rsync: 1
        },
        success: function (data, status) {
            _payParams = JSON.parse(data);
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', _pay, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', _pay);
                    document.attachEvent('onWeixinJSBridgeReady', _pay);
                }
            } else {
                _pay();
            }
        },
        dataType: 'text'
    });
}

function wx_paynow(data) {
    if($(".login_flow_box").length == 0){
        $("<div class='login_flow_box'></div>").appendTo($(document.body));
    }
    $(".login_flow_box").html("<br><br><a style='color:#ffffff;' onclick='$(\".login_flow_box\").hide();' href='"+data.url+"'><img style='width:60px;height:auto;' src='/resources/images/coin/weixin.png'><br>点击微信图标进行支付</a><br><br>").show();
}

// 绑定事件
function addEvent(elm, evType, fn, useCapture) {
    if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);//DOM2.0
    }
    else if (elm.attachEvent) {
        elm.attachEvent('on' + evType, fn);//IE5+
    }
    else {
        elm['on' + evType] = fn;//DOM 0
    }
}

// 接受sdk回调
function onmessage(e) {
    var _fns = {
        'pay': function (args) {
            pay68(args);
        },
        'paycencel': function (args) {
            paycencel(args);
        },
        'alipaysucc': function (args) {
            paysucc(args);
        },
        'alipaycencel': function (args) {
            paycencel(args);
        },
        'goldpaysucc': function (args) {
            paysucc(args);
        },
        'weixinpay': function (args) {
            weixinpay(args);
        },
        'weixinpaysucc': function (args) {
            paysucc(args);
        },
        'weixinpaycencel': function (args) {
            paycencel(args);
        },
        'wx_paynow': function(args) {
            wx_paynow(args);
        },
        'wxqr_paysucc': function(args) {
            paysucc(args);
        }
    };
    console.log('pay event');
    switch (e.data.op_type) {
        case 'fn':
            try {
                (_fns[e.data.value.fn]).apply(window, e.data.value.args);
            }
            catch (ex) {
                console.log(ex);
            }
            break;
        default:
            console.log(e);
    }
}


addEvent(window, 'message', onmessage, false);


/**
 * Created by shizhan on 17/2/7.
 */
var EventUtil = {
    getEvent: function (e) {
        return e ? e : window.event;
    },
    getTarget: function (e) {
        return e.target || e.srcElement;
    },
    addHandler: function (e, type, handler) {
        if (e.addEventListener) {
            e.addEventListener(type, handler, false);
        } else if (e.attachEvent) {
            e.attachEvent("on" + type, handler);
        } else {
            e["on" + type] = handler;
        }
    }
};
var input = document.querySelector('input');
var re = document.getElementById('result');

function keyCheck(e) {
    e = EventUtil.getEvent(e);
    if (e.keyCode == 13) {
        check();
    }
}
function check() {

    var input_content = input.value.trim();

    if (input_content === '') {
        input.className = 'wrong';
        re.className = 'result_wrong';
        re.innerHTML = '名称不能为空';
    } else {
        var c_pattern = /[\@\¥\&\＊]/g;//d_pattern不能匹配的四个特殊中文字符

        var len = 0;
        for (var i = 0; i < input_content.length; i++) {
            if (input_content.charCodeAt(i) > 127 || input_content.search(c_pattern) != -1) {
                len += 2;
            } else {
                len++;
            }
        }

        if ((len > 0 && len < 4) || len > 16) {
            input.className = 'wrong';
            re.className = 'result_wrong';
            re.innerHTML = '名称长度限制在4～16个字符';
        }
        else {
            input.className = 'right';
            re.className = 'result_right';
            re.innerHTML = '名称格式正确';
        }
    }
}
function init() {
    var check_btn = document.getElementById('btn');
    EventUtil.addHandler(check_btn, 'click', check);
    EventUtil.addHandler(input, 'keyup', keyCheck);
}
init();
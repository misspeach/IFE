/**
 * Created by shizhan on 17/2/8.
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
var inputs,
    hintText = {
    name: {
        empty: '名称不能为空',
        wrong: '名称长度限制在4～16个字符',
        right: '名称格式正确'
    },
    pwd: {
        empty: '密码不能为空',
        wrong: '密码长度限制为8个字母数字字符',
        right: '密码格式正确'
    },
    pwd_a: {
        wrong: '两次密码输入不一致',
        right: '两次密码输入一致'
    },
    email: {
        empty: '邮件不能为空',
        wrong: '邮件格式错误',
        right: '邮件格式正确'
    },
    tel: {
        empty: '手机号码不能为空',
        wrong: '手机号码格式错误',
        right: '手机号码格式正确'
    }
}
function inputOnfocus() {
    var id = this.getAttribute('id');
    var tip = this.nextElementSibling;
    if (id == 'name')
        tip.innerHTML = '必填，长度为4～16个字符';
    else if (id == 'pwd')
        tip.innerHTML = '必填，长度为8个字符，包括字母和数字';
    else if (id == 'pwd_a')
        tip.innerHTML = '再次输入相同密码';
    else if (id == 'email')
        tip.innerHTML = '请输入电子邮箱地址';
    else if (id == 'tel') {
        tip.innerHTML = '请输入11位中国大陆手机号码';
    }
    this.className = '';
    tip.className = 'tip-focus';
}

function inputOnblur() {
    var id = this.getAttribute('id');
    check(id);
}
function check(id) {
    var result;
    var self = document.getElementById(id);
    var input_content = self.value.trim();
    var tip = self.nextElementSibling;

    if (id == 'name') {
        result = checkName(input_content);
    } else if (id == 'pwd') {
        result = checkPwd(input_content);
    } else if (id == 'pwd_a') {
        result = checkPwdAgain(input_content);
    } else if (id == 'email') {
        result = checkEmail(input_content);
    } else if (id == 'tel') {
        result = checkTel(input_content);
    }
    if (result == 'empty' || result == 'wrong') {
        tip.innerHTML = hintText[id][result];
        self.className = 'input-wrong';
        tip.className = 'tip-blur-wrong';
    } else if (result == 'right') {
        tip.innerHTML = hintText[id][result];
        self.className = 'input-right';
        tip.className = 'tip-blur-right';
    }
    return result;
}
function checkName(input_content) {
    var result;
    if (input_content === '') {
        result = 'empty';
    } else {
        var c_pattern = /[\@\¥\&\＊]/g;//d_pattern不能匹配的四个特殊中文字符
        var len = getInputLen(input_content, c_pattern);
        if ((len > 0 && len < 4) || len > 16) {
            result = 'wrong';
        }
        else {
            result = 'right';
        }
    }
    return result;
}
function checkPwd(input_content) {
    var result;
    if (input_content === '') {
        result = 'empty';
    } else {
        var c_pattern = /[^\da-zA-Z]/;//匹配非字母数字
        if (input_content.search(c_pattern) != -1)
            result = 'wrong';
        else {
            var len = getInputLen(input_content);
            if (len != 8) {
                result = 'wrong';
            }
            else {
                result = 'right';
            }
        }
    }
    return result;
}
function checkPwdAgain(input_content) {
    var result;
    var pwd = document.getElementById('pwd').value.trim();

    if (input_content !== pwd || input_content === '') {
        result = 'wrong';
    } else if (input_content !== '') {
        result = 'right';
    }
    return result;
}
function checkEmail(input_content) {
    var result;
    if (input_content === '') {
        result = 'empty';
    } else {
        var apos = input_content.indexOf('@');
        var dotpos = input_content.lastIndexOf('.');
        if (apos < 1 || dotpos - apos < 2)
            result = 'wrong';
        else
            result = 'right';
    }
    return result;
}
function checkTel(input_content) {
    var result;
    if (input_content === '') {
        result = 'empty';
    } else {
        if (input_content.search(/[^\d]/) != -1 || input_content.length != 11)
            result = 'wrong';
        else
            result = 'right';
    }
    return result;
}
function checkAll() {
    var res = [];
    for (var i = 0; i < inputs.length; i++) {
        res[i] = check(inputs[i].getAttribute('id'));
    }
    var result = res.every(function (v) {
        return v === 'right';
    });
    if (result)
        alert('提交成功！');
    else
        alert('提交失败！');
}
function getInputLen(input_content) {
    var c_pattern = '';
    if (arguments[1] != undefined)
        c_pattern = arguments[1];
    var len = 0;
    for (var i = 0; i < input_content.length; i++) {
        if (input_content.charCodeAt(i) >= 0 && input_content.charCodeAt(i) <= 127)//ASCII
            len += 1;
        else
            len += 2;
    }
    return len;
}
function init() {
    inputs = document.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
        EventUtil.addHandler(inputs[i], 'focus', inputOnfocus);
        EventUtil.addHandler(inputs[i], 'blur', inputOnblur);
    }
    var btn_check = document.getElementById('btn');
    EventUtil.addHandler(btn_check, 'click', checkAll);
}
init();
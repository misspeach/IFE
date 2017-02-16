/**
 * Created by shizhan on 17/2/14.
 */
var EventUtil = {
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
var validator = {
    'text': function () {
        var input_content = this.ipt.value;
        if (input_content === '') {
            this.wrong(0);
        } else {
            var c_pattern = /[\@\¥\&\＊]/g;//d_pattern不能匹配的四个特殊中文字符
            var len = getInputLen(input_content, c_pattern);
            if ((len > 0 && len < 4) || len > 16) {
                this.wrong(1);
            }
            else {
                this.right();
            }
        }
    },
    'number': function () {
        var input_content=this.ipt.value;
        if (input_content === '') {
            this.wrong(0);
        }else{
            if (/^\d*$/.test(input_content)) {
                this.right();
            }
            else {
                this.wrong(1);
            }
        }
    },
    'email': function () {
        var input_content = this.ipt.value;
        if (input_content === '') {
            this.wrong(0);
        } else {
            var apos = input_content.indexOf('@');
            var dotpos = input_content.lastIndexOf('.');
            if (apos < 1 || dotpos - apos < 2)
                this.wrong(1);
            else
                this.right();
        }
    },
    'password': function () {
        var input_content=this.ipt.value;
        if (input_content === '') {
            this.wrong(0);
        } else {
            var c_pattern = /[^\da-zA-Z]/;//匹配非字母数字
            if (input_content.search(c_pattern) != -1)
                this.wrong(1);
            else {
                var len = getInputLen(input_content);
                if (len != 8) {
                    this.wrong(1);
                }
                else {
                    this.right();
                }
            }
        }
    },
    'phone': function () {
        var input_content = this.ipt.value;
        if (input_content === '') {
            this.wrong(0);
        } else {
            if (input_content.search(/[^\d]/) != -1 || input_content.length != 11)
                this.wrong(1);
            else
                this.right();
        }
    }
};
var data_Process = new DataProcess(),
    formArray=[];
data_Process.init();
EventUtil.addHandler($('#add_form'), 'click', function () {
    var data = data_Process.getData();//按下添加按钮后获取表单配置data
    if (data != null) {

        var tr = document.createElement('tr');
        if (data.style == '样式一')
            tr.innerHTML = '<td>' + data.label + '</td><td><input type="' + data.type + '" id="' + data.input_id + '" class="input-show"/><div style="text-align: left" class="invisible" id="' + data.hint_id + '">' + data.rules + '</div></td>'
        else if (data.style == '样式二')
            tr.innerHTML = '<td>' + data.label + '</td><td><input type="' + data.type + '" id="' + data.input_id + '" class="input-show"/></td><td style="text-align: left" class="invisible" id="' + data.hint_id + '">' + data.rules + '</td>';
        $('#result').insertBefore(tr,$('#result').lastElementChild);
        formArray.push(new Form(data));
        $('#check').className='';
    }
});
EventUtil.addHandler($('#check'),'click',function () {
    for(var i=0;i<formArray.length;i++){
        formArray[i].validator();
    }
});
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
function $(selector) {
    return document.querySelector(selector);
}



/**
 * Created by shizhan on 17/2/15.
 */
function DataProcess() {
    this.id = 0;
}
DataProcess.prototype = {
    init: function () {
        this.addEvent();
    },
    //表单之间的事件绑定 选定了类型 相应的名称变化
    addEvent: function () {
        EventUtil.addHandler($('#rule'), 'change', this.corresponding.bind(this));
    },
    corresponding: function (e) {
        if (e.target.getAttribute('type') == 'radio') {
            $('#name').value = e.target.nextElementSibling.textContent;
            switch ($('#name').value) {
                case '文本':
                    $('#default-hint').textContent = '长度限制在4～16个字符';
                    break;
                case '邮箱':
                    console.log('');
                    $('#default-hint').textContent='如，hello@google.com';
                    break;
                case '密码':
                    $('#default-hint').textContent = '包括字母和数字在内的8个字符';
                    break;
                case '电话号码':
                    $('#default-hint').textContent = '请输入11位手机号码';
                    break;
                case '数字':
                    $('#default-hint').textContent='请输入合法数字';
                    break;
            }
        }
    },
    getData: function () {
        var data = {
            label: $('#name').value.trim(),
            type: '',
            style: $('#style').value.trim(),
            rules: $('#default-hint').textContent,
            fail_hint: [],
            success_hint: '',
            validator: function () {

            },
            input_id: 'form' + this.id,
            hint_id: 'hint' + this.id++
        };
        data = this.getInputType(data);
        data = this.getHintData(data);
        data.validator = validator[data.type];
        return data;
    },
    getInputType: function (data) {
        var radios = document.getElementsByName('inputType');
        var id = 'text';
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                id = radios[i].id;
            }
        }
        data.type = id;
        return data;
    },
    getHintData: function (data) {
        data.fail_hint = [
            data.label + '不能为空',
            data.label + '格式错误'
        ];
        data.success_hint = data.label + '格式正确';
        return data;
    }
};

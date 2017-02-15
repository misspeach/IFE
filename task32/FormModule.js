/**
 * Created by shizhan on 17/2/15.
 */
function Form(data) {
    this.data = data;
    this.ipt = $('#' + data.input_id);
    this.hint = $('#' + data.hint_id);
    this.validator = data.validator;
    this.init();
}
Form.prototype = {
    init: function () {//绑定操作
        EventUtil.addHandler(this.ipt, 'focus', this.default.bind(this));
        EventUtil.addHandler(this.ipt, 'blur', this.validator.bind(this));
        EventUtil.addHandler(this.ipt, 'change', this.validator.bind(this));
    },
    default: function () {
        this.ipt.style.border = '1px solid darkgray';
        this.hint.className = 'hint-focus';
    },
    right: function () {
        this.ipt.style.border = '1px solid green';
        this.hint.className = 'hint-blur-right';
        this.hint.innerHTML = this.data.success_hint;
    },
    wrong: function (i) {
        this.ipt.style.border = '1px solid red';
        this.hint.className = 'hint-blur-wrong';
        this.hint.innerHTML = this.data.fail_hint[i];
    }
};
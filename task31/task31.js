/**
 * Created by shizhan on 17/2/10.
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
var info = {'北京': ['北京大学', '清华大学', '中国人民大学'], '香港': ['香港大学', '香港中文大学', '香港理工大学'], '济南': ['山东大学', '中国海洋大学']};

function init() {
    var trs = document.getElementsByTagName('tr');
    var radios = document.getElementsByName('joinType');
    var select_city = document.getElementById('selCity');
    var select_univ = document.getElementById('selUniv');

    [].forEach.call(radios, function (v) {
        EventUtil.addHandler(v, 'click', function () {
            if (v.value == 'student') {
                trs[1].style.display = '';
                trs[2].style.display = 'none';

            } else if (v.value == 'non-student') {
                trs[1].style.display = 'none';
                trs[2].style.display = '';
            }
        });
    });
    EventUtil.addHandler(select_city, 'change', function (e) {
        var selectedOption = e.target.options[e.target.selectedIndex];
        var newUL = info[selectedOption.value].length;
        if (newUL < select_univ.options.length) {
            for (var i = 0; i < select_univ.options.length; i++) {
                if (i <= newUL - 1) {
                    select_univ.options[i].value = info[selectedOption.value][i];
                    select_univ.options[i].innerHTML = info[selectedOption.value][i];
                } else {
                    select_univ.remove(i);
                }
            }
        }
        else if (newUL > select_univ.options.length) {
            for (var i = 0; i < newUL; i++) {
                if (i <= select_univ.options.length - 1) {
                    select_univ.options[i].value = info[selectedOption.value][i];
                    select_univ.options[i].innerHTML = info[selectedOption.value][i];
                } else {
                    var newUniOption = new Option(info[selectedOption.value][i], info[selectedOption.value][i]);
                    select_univ.add(newUniOption, undefined);
                }
            }
        }
        else {
            for (var i = 0; i < select_univ.options.length; i++) {
                select_univ.options[i].value = info[selectedOption.value][i];
                select_univ.options[i].innerHTML = info[selectedOption.value][i];
            }
        }
    });
}
init();
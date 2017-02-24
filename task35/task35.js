/**
 * Created by shizhan on 17/2/22.
 */
function $(selector) {
    return document.querySelector(selector);
}
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
var chess = {
        chessDom: $('#chess'),
        direction: 'direct_top', //默认生成时 向上
        degree: 0
    },
    chessboard = $('#chessboard'),
    len = parseInt($('#direction').style.width),//格子的宽度
    b = 1,//边框宽度
    n,//棋盘规模
    rowNum = 1,//行数
    intros = [],//存放指令的数组
    Random = function (n, lowValue) {
        return Math.floor(Math.random() * n + lowValue);
    };
function executeIntros(intro, step, id) {
    switch (intro) {
        case 'GO':
            switch (chess.direction) {
                case 'direct_top':
                    goTop(step);
                    break;
                case 'direct_right':
                    goRight(step);
                    break;
                case 'direct_bottom':
                    goBottom(step);
                    break;
                case 'direct_left':
                    goLeft(step);
                    break;
            }
            break;
        case 'TUN LEF':
            chess.degree -= 90;
            Rotate();
            switch (chess.direction) {
                case 'direct_top':
                    chess.direction = 'direct_left';
                    break;
                case 'direct_right':
                    chess.direction = 'direct_top';
                    break;
                case 'direct_bottom':
                    chess.direction = 'direct_right';
                    break;
                case 'direct_left':
                    chess.direction = 'direct_bottom';
                    break;
            }
            break;
        case 'TUN RIG':
            chess.degree += 90;
            Rotate();
            switch (chess.direction) {
                case 'direct_top':
                    chess.direction = 'direct_right';
                    break;
                case 'direct_right':
                    chess.direction = 'direct_bottom';
                    break;
                case 'direct_bottom':
                    chess.direction = 'direct_left';
                    break;
                case 'direct_left':
                    chess.direction = 'direct_top';
                    break;
            }
            break;
        case 'TUN BAC':
            if (chess.direction == 'direct_top' || chess.direction == 'direct_left') {
                chess.degree += 180;
            }
            else {
                chess.degree -= 180;
            }
            Rotate();
            switch (chess.direction) {
                case 'direct_top':
                    chess.direction = 'direct_bottom';
                    break;
                case 'direct_right':
                    chess.direction = 'direct_left';
                    break;
                case 'direct_bottom':
                    chess.direction = 'direct_top';
                    break;
                case 'direct_left':
                    chess.direction = 'direct_right';
                    break;
            }
            break;
        case 'TRA LEF'://向屏幕的左侧移动一格，方向不变
            goLeft(step);
            break;
        case 'TRA TOP'://向屏幕的上方移动一格，方向不变
            goTop(step);
            break;
        case 'TRA RIG'://向屏幕的右侧移动一格，方向不变
            goRight(step);
            break;
        case 'TRA BOT'://向屏幕的下方移动一格，方向不变
            goBottom(step);
            break;
        case 'MOV LEF':
            if (chess.direction != 'direct_left') {
                if (chess.direction == 'direct_top') {
                    chess.degree -= 90;
                } else if (chess.direction == 'direct_right') {
                    chess.degree -= 180;
                } else if (chess.direction == 'direct_bottom') {
                    chess.degree += 90;//如果当前方向朝下并且当前转过的角度为＋180 会让棋子逆时针转到方向朝左
                }
                Rotate();
                chess.direction = 'direct_left';
            }
            goLeft(step);
            break;
        case 'MOV TOP':
            if (chess.direction != 'direct_top') {
                if (chess.direction == 'direct_left') {
                    chess.degree += 90;
                } else if (chess.direction == 'direct_right') {
                    chess.degree -= 90;
                } else if (chess.direction == 'direct_bottom') {
                    chess.degree += 180;
                }
                Rotate();
                chess.direction = 'direct_top';
            }
            goTop(step);
            break;
        case 'MOV RIG':
            if (chess.direction != 'direct_right') {
                if (chess.direction == 'direct_left') {
                    chess.degree += 180;
                } else if (chess.direction == 'direct_top') {
                    chess.degree += 90;
                } else if (chess.direction == 'direct_bottom') {
                    chess.degree -= 90;
                }
                Rotate();
                chess.direction = 'direct_right';
            }
            goRight(step);
            break;
        case 'MOV BOT':
            if (chess.direction != 'direct_bottom') {
                if (chess.direction == 'direct_left') {
                    chess.degree -= 90;
                } else if (chess.direction == 'direct_top') {
                    chess.degree += 180;
                } else if (chess.direction == 'direct_right') {
                    chess.degree += 90;
                }
                Rotate();
                chess.direction = 'direct_bottom';
            }
            goBottom(step);
            break;
        default:
            console.log('没有此指令');
            // alert('没有此指令');
            showError(id);
    }
}
function showError(id) {
    var that = $('#num').getElementsByTagName('div')[id];
    that.className = 'error';
}
function drawChessBoard() {
    var table = document.createElement('table');
    var str = '';
    for (var i = 0; i <= n; i++) {//row
        str += '<tr>';
        if (i != 0) {
            str += '<td class="right-b">' + i + '</td>';
        } else {
            str += '<td></td>';
        }
        for (var j = 1; j <= n; j++) {//col
            if (i == 0) {
                str += '<td class="bottom-b" style="vertical-align:bottom;">' + j + '</td>';
            } else if (i < n) {
                if (j < n)
                    str += '<td class="bottom-g right-g"></td>';
                else if (j == n) {
                    str += '<td class="bottom-g right-b"></td>';
                }
            }
            else if (i == n) {
                if (j < n)
                    str += '<td class="bottom-b right-g"></td>';
                else if (j == n)
                    str += '<td class="bottom-b right-b"></td>';
            }
        }
        str += '</tr>';
    }
    table.innerHTML = str;
    if (chessboard.childElementCount > 1) {
        chessboard.removeChild(chessboard.lastElementChild);
    }
    chessboard.appendChild(table);
    //设置棋子的初始位置
    chess.chessDom.className = 'chess-visible';
    chess.chessDom.style.left = Random(n, 1) * (len + b) + 'px';//棋子的随机位置 40是边长 1是边框宽度
    chess.chessDom.style.top = Random(n, 1) * (len + b) + 'px';
    chess.direction = 'direct_top';
}
function validateIntros() {
    intros = $('#txt').value.trim().split('\n');//会包含空指令 每条指令前后没有空白符
    var pattern = /^[a-zA-Z\s]+[\s]*[0-9]*$/;
    var step,
        intro,
        i = 0,
        timer = setInterval(function () {
            if (i < intros.length) {
                if (intros[i] != '') {
                    if (intros[i].match(pattern) == null) {
                        //标记错误的指令
                        showError(i);
                        // alert('指令格式有误');
                        console.log('指令格式有误');
                    } else {
                        intro = intros[i];
                        step = '1';
                        var pos = intros[i].search(/[0-9]+/);
                        if (pos != -1) {
                            step = intros[i].substring(pos);//提取指令中的步数
                            if (step >= n) {
                                showError(i);
                                // alert('步数超出棋盘规模');
                                console.log('步数超出棋盘规模');
                            }
                            intro = intros[i].substring(0, pos);
                        }
                        $('#num').getElementsByTagName('div')[i].className = 'number';
                        executeIntros(intro.trim().toUpperCase(), parseInt(step.trim()), i);
                    }
                }
                ++i;
            } else {
                clearInterval(timer);
            }
        }, 500);
}
function showInput(code) {
    var num = $('#num');
    if (code == 13) {
        if (num.innerHTML == '' || rowNum == 1) {//是第一行
            var str = '<div class="number">' + 1 + '</div><div class="number">' + 2 + '</div>';
            num.innerHTML = str;
            rowNum = 3;
        } else {
            var oldNum = num.innerHTML;
            num.innerHTML = oldNum + '<div class="number">' + rowNum + '</div>';
            rowNum++;
        }
    }
    else if (code == 8 || code == 46) {//按下了删除键 判断内容是否被删完 会出现删除不及时的问题 此处不能加太多操作
        var newVal = $('#txt').value;//按下还未抬起时内容不会变
        var oldVal = newVal.substring(0, newVal.length - 1);
        var newAry = newVal.match(/\n/g);
        var oldAry = oldVal.match(/\n/g);
        //第一行为空 或  正在第二行时 或 当前回车数大于旧回车数
        if (oldVal == '' || (newAry != null && oldAry == null) || ( newAry.length > oldAry.length)) {
            var oldNum = num.innerHTML;
            num.innerHTML = oldNum.substring(0, oldNum.lastIndexOf('<div'));
            rowNum--;
        }
    }
    else {//输入了字符
        if (num.innerHTML == '' || rowNum == 1) {
            rowNum = 1;
            num.innerHTML = '<div class="number">' + rowNum + '</div>';
            rowNum++;//生成下次的行标
        }
    }
}
function goBottom(step) {
    var top_pos = parseInt(chess.chessDom.style.top),
        i = 1;
    for (; i <= step && top_pos < (len + b) * n; i++) {
        top_pos = top_pos + (len + b);
    }
    chess.chessDom.style.top = top_pos + 'px';
    if (i <= step && top_pos == (len + b) * n)
        alert('已到达下边界！无法再向下移动');
}
function goTop(step) {
    var top_pos = parseInt(chess.chessDom.style.top),
        i = 1;
    for (; i <= step && top_pos > (len + b); i++) {
        top_pos -= (len + b);
    }
    chess.chessDom.style.top = top_pos + 'px';
    if (i <= step && top_pos == (len + b))
        alert('已到达上边界！无法再向上移动');
}
function goRight(step) {
    var left_pos = parseInt(chess.chessDom.style.left),
        i = 1;
    for (; i <= step && left_pos < (len + b) * n; i++) {
        left_pos = left_pos + (len + b);
    }
    chess.chessDom.style.left = left_pos + 'px';
    if (i <= step && left_pos == (len + b) * n)
        alert('已到达右边界！无法再向右移动');
}
function goLeft(step) {
    var left_pos = parseInt(chess.chessDom.style.left),
        i = 1;
    for (; i <= step && left_pos > len + b; i++) {
        left_pos -= (len + b);
    }
    chess.chessDom.style.left = left_pos + 'px';
    if (i <= step && left_pos == (len + b))
        alert('已到达左边界！无法再向左移动');
}
function Rotate() {
    var degree = Math.abs(chess.degree);
    if (degree == 360)
        chess.degree = 0;
    else if (degree > 180 && degree < 360) {
        chess.degree = chess.degree < 0 ? 360 + chess.degree : chess.degree - 360;
    } else {
        chess.degree %= 360;
    }
    chess.chessDom.style.transform = 'rotate(' + chess.degree + 'deg)';
}
function init() {
    EventUtil.addHandler($('#make'), 'click', function () {
        n = parseInt($('#size').value);
        drawChessBoard();
        $('#exe').disabled = false;
    });
    EventUtil.addHandler($('#exe'), 'click', function () {
        validateIntros();
    });
    EventUtil.addHandler($('#reset'), 'click', function () {
        $('#num').innerHTML = '';
        rowNum = 1;
        $('#txt').value = '';
        $('#txt').focus();//重新获得焦点
    });
    EventUtil.addHandler($('#txt'), 'scroll', function (e) {
        $('#num').scrollTop = e.target.scrollTop;
    });
    EventUtil.addHandler($('#txt'), 'keydown', function (e) {//按下的键影响文本的显示 keyup事件不能识别按住键不松的情况
        var code = e.keyCode;
        showInput(code);
    });
}
window.onload = function () {
    init();
    $('#txt').focus();
};
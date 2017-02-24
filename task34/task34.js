/**
 * Created by shizhan on 17/2/21.
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
    top_pos = 0,//棋子的纵坐标
    left_pos = 0,//棋子的横坐标
    n = parseInt($('#size').value),
    Random = function (n, lowValue) {
        return Math.floor(Math.random() * n + lowValue);
    };
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
function goTop() {
    if (top_pos == (len + b))
        alert('已到达上边界！无法向上移动');
    else {
        chess.chessDom.style.top = top_pos - (len + b) + 'px';
    }
}
function goRight() {
    if (left_pos == (len + b) * n)
        alert('已到达右边界！无法向右移动');
    else {
        chess.chessDom.style.left = left_pos + (len + b) + 'px';
    }
}
function goBottom() {
    if (top_pos == (len + b) * n)
        alert('已到达下边界！无法向下移动');
    else {
        chess.chessDom.style.top = top_pos + (len + b) + 'px';
    }
}
function goLeft() {
    if (left_pos == (len + b))
        alert('已到达左边界！无法向左移动');
    else {
        chess.chessDom.style.left = left_pos - (len + b) + 'px';
    }
}
function init() {
    EventUtil.addHandler($('#make'), 'click', function () {
        //绘制棋盘
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
    });
    EventUtil.addHandler($('#execute'), 'click', function (e) {
        var intro = e.target.textContent;
        top_pos = parseInt(chess.chessDom.style.top);//棋子的坐标
        left_pos = parseInt(chess.chessDom.style.left);
        switch (intro) {
            case 'GO':
                switch (chess.direction) {
                    case 'direct_top':
                        goTop();
                        break;
                    case 'direct_right':
                        goRight();
                        break;
                    case 'direct_bottom':
                        goBottom();
                        break;
                    case 'direct_left':
                        goLeft();
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
                goLeft();
                break;
            case 'TRA TOP'://向屏幕的上方移动一格，方向不变
                goTop();
                break;
            case 'TRA RIG'://向屏幕的右侧移动一格，方向不变
                goRight();
                break;
            case 'TRA BOT'://向屏幕的下方移动一格，方向不变
                goBottom();
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
                goLeft();
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
                goTop();
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
                goRight();
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
                goBottom();
                break;
        }
    });
}
init();
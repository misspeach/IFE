/**
 * Created by shizhan on 17/2/20.
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
function init() {

    EventUtil.addHandler($('#make'), 'click', function () {
        var n = parseInt($('#size').value);
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
        chess.chessDom.style.left = Random(n, 1) * 41 + 'px';//棋子的随机位置 40是边长 1是边框宽度
        chess.chessDom.style.top = Random(n, 1) * 41 + 'px';
        chess.direction = 'direct_top';
    });
    EventUtil.addHandler($('#execute'), 'click', function (e) {
        var n = parseInt($('#size').value);
        var intro = e.target.textContent;
        switch (intro) {
            case 'GO':
                var top_pos = parseInt(chess.chessDom.style.top);//转为数字
                var left_pos = parseInt(chess.chessDom.style.left);
                switch (chess.direction) {
                    case 'direct_top':
                        if (top_pos == 41)
                            alert('已到达上边界！');
                        else {
                            console.log(chess.chessDom);
                            chess.chessDom.style.top = top_pos - 41 + 'px';
                        }
                        break;
                    case 'direct_right':
                        if (left_pos == 41 * n)
                            alert('已到达右边界！');
                        else {
                            chess.chessDom.style.left = left_pos + 41 + 'px';
                        }
                        break;
                    case 'direct_bottom':
                        if (top_pos == 41 * n)
                            alert('已到达下边界！');
                        else {
                            chess.chessDom.style.top = top_pos + 41 + 'px';
                        }
                        break;
                    case 'direct_left':
                        if (left_pos == 41)
                            alert('已到达左边界！');
                        else {
                            chess.chessDom.style.left = left_pos - 41 + 'px';
                        }
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
        }
    });
}
init();
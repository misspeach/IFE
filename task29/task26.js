/**
 * Created by shizhan on 17/2/3.
 */
var SCREEN_WIDTH = 800,
    SCREEN_HEIGHT = 800,
    SCREEN_CENTER_X = SCREEN_WIDTH / 2,
    SCREEN_CENTER_Y = SCREEN_HEIGHT / 2,
    PLANET_RADIUS = 50;
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
function createOps(e) {
    var ops = e.target.parentNode;
    var newOp = document.createElement('div');
    var str = '对1号飞船下达指令： <button>开始飞行</button><button>停止飞行</button><button>销毁</button>';
    newOp.innerHTML = str;
    ops.insertBefore(newOp, ops.firstElementChild);
}

var anim = (function () {
    var canvas = document.getElementById('planet');
    //必须为画布设置宽高
    canvas.width = 800;
    canvas.height = 800;
    var ct = canvas.getContext('2d');


    function drawPlanet() {
        //径向渐变
        var gradient = ct.createRadialGradient(SCREEN_CENTER_X, SCREEN_CENTER_Y, 20, SCREEN_CENTER_X, SCREEN_CENTER_Y, 50);
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(1, 'blue');
        ct.fillStyle = gradient;
        //画星球
        ct.beginPath();
        ct.arc(SCREEN_CENTER_X, SCREEN_CENTER_Y, PLANET_RADIUS, 0, 2 * Math.PI, false);
        ct.fill();
    }

    function drawOrbit() {
        //画轨道
        ct.strokeStyle = '#fff';

        for (var i = 0; i < 4; i++) {
            ct.moveTo(100 + 50 * i, 100);
            ct.beginPath();
            ct.arc(SCREEN_CENTER_X, SCREEN_CENTER_Y, 100 + 50 * i, 0, 2 * Math.PI, false);
            ct.closePath();
            ct.stroke();
        }
        ct.save();//保存状态
    }

    function drawAirship() {
        ct.translate(SCREEN_CENTER_X, SCREEN_CENTER_Y);
        ct.rotate(-time * Math.PI / 180);
        var airship_obit = 100;//用来确定是哪个轨道的飞船
        ct.beginPath();
        ct.moveTo(airship_obit - 10, 20);
        ct.bezierCurveTo(airship_obit - 10, 30, airship_obit + 10, 30, airship_obit + 10, 20);
        ct.lineTo(airship_obit + 10, -20);
        ct.bezierCurveTo(airship_obit + 10, -30, airship_obit - 10, -30, airship_obit - 10, -20);
        ct.lineTo(airship_obit - 10, 20);
        ct.fillStyle = 'orange';//根据飞船的能力设置不同的颜色
        ct.fill();
        ct.restore();//返回到原点是0，0的上一个状态
    }

    var time = 0;

    function onDraw() {

        setInterval(function () {
            ct.clearRect(0, 0, 800, 800);
            drawPlanet();
            drawOrbit();
            if (time >= 360)
                time = 0;
            drawAirship();
            time += 1;
        }, 10);
    }

    return {
        onDraw: onDraw
    };
})();
function init() {
    anim.onDraw();
}
init();
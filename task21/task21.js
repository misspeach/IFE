/**
 * Created by shizhan on 17/1/12.
 */
var tagData = [];
var hobbyData = [];
var tagInp;
var res;
var resh;
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
var handler = function (e) {
    switch (e.type) {
        case "click":
            del(e);
            break;
        case "mouseover":
            show(e);
            break;
        case "mouseout":
            hide(e);
            break;
    }
};
function init() {
    tagInp = document.getElementById("tags");
    EventUtil.addHandler(tagInp, "keyup", inputChange);

    res = document.getElementById("tagResult");
    res.innerHTML = "";
    EventUtil.addHandler(res, "mouseover", handler);
    EventUtil.addHandler(res, "mouseout", handler);
    EventUtil.addHandler(res, "click", handler);


    resh = document.getElementById("hobbiesResult");
    resh.innerHTML = "";

    var conf = document.getElementById("confirm");
    EventUtil.addHandler(conf, "click", hobbies);
}
function render(tmp, cur, node) {
    for (var i = 0; i < tmp.length; i++) {
        if (cur.indexOf(tmp[i]) == -1) {
            cur.push(tmp[i]);
            node.innerHTML += "<div>" + tmp[i] + "</div>";
            if (cur.length > 10) {
                cur.shift();
                var index = node.innerHTML.indexOf("</div>") + 6;
                node.innerHTML = node.innerHTML.slice(index);
            }
        }
    }
}
function getInput(node) {
    var pattern = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;
    return node.value.split(pattern).filter(function (d) {
        return d != '';
    });
}
function hobbies() {
    var texta = document.getElementById("hobby");
    var tmpHobby = getInput(texta);
    render(tmpHobby, hobbyData, resh);
    texta.value = "";
}
function del(e) {
    var t = e.target;
    var btns = t.parentNode;
    btns.removeChild(t);
    tagData.splice(tagData.indexOf(t.firstChild.nodeValue.slice(2)), 1);
}
function hide(e) {
    var t = e.target;
    if (t.id !== 'tagResult') {
        t.firstChild.nodeValue = t.firstChild.nodeValue.slice(2);
        t.style.backgroundColor = "red";
    }
}
function show(e) {
    var t = e.target;
    if (t.id !== 'tagResult') {
        t.firstChild.nodeValue = "删除" + t.firstChild.nodeValue;
        t.style.backgroundColor = "blue";
    }
}
function inputChange(e) {
    var pattern = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;
    if (e.keyCode == 13 || pattern.test(tagInp.value.charAt(tagInp.value.length - 1)) == true) {
        if (e.keyCode == 13)
            tagInp.value += ",";
        var tmp = getInput(tagInp);
        render(tmp, tagData, res);
        tagInp.value = "";
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof oldonload != 'function') {
        window.onload = func;//页面加载完毕后才执行func，而不是把func的执行结果给window.onload
    } else {
        window.onload = function () {
            oldonload();
            func();
        };
    }
}

addLoadEvent(init);
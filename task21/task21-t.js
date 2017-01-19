/**
 * Created by shizhan on 17/1/15.
 */

var pattern = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;
var tagInp, hobbies, tagList, hobbyList, res, resh;
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
function del(e) {
    var t = e.target;
    var btns = t.parentNode;
    btns.removeChild(t);
    tagList.del(t);
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
function CreateList(inputNode) {
    this.node = inputNode;
    this.data = [];//存放实际数据的数组
    this.tmpDta = function () {
        return this.node.value.split(pattern).filter(function (d) {
            return d != '';
        });
    };
    this.push = function (node) {//node是显示结果的节点
        var tmp = this.tmpDta();
        for (var i = 0; i < tmp.length; i++) {
            if (this.data.indexOf(tmp[i]) == -1) {
                this.data.push(tmp[i]);
                node.innerHTML += "<div>" + tmp[i] + "</div>";
                if (this.data.length > 10) {
                    this.data.shift();
                    var index = node.innerHTML.indexOf("</div>") + 6;
                    node.innerHTML = node.innerHTML.slice(index);
                }
            }
        }
    };
    this.del=function (node) {
        this.data.splice(this.data.indexOf(node.firstChild.nodeValue.slice(2)), 1);
    }
}


function inputChange(e) {

    if (e.keyCode == 13 || pattern.test(tagInp.value.charAt(tagInp.value.length - 1)) == true) {
        tagList.push(res);
        // console.log("tag: " + tagList.data);
        tagInp.value = "";
    }
}
function hobbiesf() {
    if(hobbies.value!=""){
        hobbyList.push(resh);
        // console.log("hobby: " + hobbyList.data);
        hobbies.value = "";
    }
}
function init() {
    tagInp = document.getElementById("tags");
    hobbies = document.getElementById("hobby");
    tagList = new CreateList(tagInp);
    hobbyList = new CreateList(hobbies);

    EventUtil.addHandler(tagInp, "keyup", inputChange);//Input输入框绑定了监听方法

    res = document.getElementById("tagResult");
    res.innerHTML = "";
    EventUtil.addHandler(res, "mouseover", handler);
    EventUtil.addHandler(res, "mouseout", handler);
    EventUtil.addHandler(res, "click", handler);


    resh = document.getElementById("hobbiesResult");
    resh.innerHTML = "";

    var conf = document.getElementById("confirm");
    EventUtil.addHandler(conf, "click", hobbiesf);
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
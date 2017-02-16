/**
 * Created by shizhan on 16/12/6.
 */
var num = "";
var queue;
var cw;
function isEmpty() {
    if (queue.childNodes.length == 0) {
        return true;
    }
    else {
        return false;
    }
}
function opQueue(e) {
    var btn = e.target;
    if (btn.nodeName.toLowerCase() == "button") {
        var inp = document.getElementById("data");
        num = inp.value.replace(/\s/g, "");//去除空格
        var pat = /[0-9]+/g;
        if (num === "")
            alert("This number should not be null!");
        else {
            if (!pat.test(num)) {
                alert("Please enter a number!");
                inp.value = "";
            }
            else {
                var newBtn = document.createElement("div");
                newBtn.style.float = "left";//让元素的宽度自适应其内容,此时设置元素背景色才有效
                newBtn.style.backgroundColor = "#fa7a72";
                newBtn.style.marginLeft = "5px";
                newBtn.style.marginRight = "5px";
                newBtn.style.padding = "10px";
                newBtn.style.border = "1px solid black";
                var content = document.createTextNode(num);
                newBtn.appendChild(content);
                if (btn.id == "left-in") {
                    if (!isEmpty()) {
                        queue.insertBefore(newBtn, queue.firstChild);
                    }
                    else {
                        queue.appendChild(newBtn);
                    }
                }
                else if (btn.id == "right-in") {
                    queue.appendChild(newBtn);
                }
                if (btn.id == "left-out") {
                    if (isEmpty())
                        alert("The queue is empty!");
                    else {
                        alert("left out " + num);
                        queue.removeChild(queue.firstChild);
                    }
                }
                else if (btn.id == "right-out") {
                    if (isEmpty())
                        alert("The queue is empty!");
                    else {
                        alert("right out " + num);
                        queue.removeChild(queue.lastChild);
                    }
                }
            }
        }
    }
}
function delNum(e) {
    var t = e.target;
    if (t.nodeName.toLowerCase() == "div") {
        var btns = t.parentNode;
        btns.removeChild(t);
    }
}
function init() {
    var ops = document.getElementById("ops");
    ops.addEventListener("click", opQueue, false);
    queue = document.getElementById("queue");
    queue.addEventListener("click", delNum, false);
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
//init();
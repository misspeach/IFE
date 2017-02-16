/**
 * Created by shizhan on 16/12/14.
 */
var num = "";
var queue;
var cw;

function swap(e1, e2) {
    var tmpMarginTop = e1.style.marginTop;
    var tmpHeight = e1.style.height;
    e1.style.height = e2.style.height;
    e1.style.marginTop = e2.style.marginTop;
    e2.style.height = tmpHeight;
    e2.style.marginTop = tmpMarginTop;
}
function bubbleSort() {
    var divs = queue.getElementsByTagName("div");
    var n = divs.length;
    var i = 1, j = n - 1;
    var id = null;
    var flag=1;
    id = setInterval(function () {
        if (j >= i) {
            if (divs[j].style.marginTop > divs[j - 1].style.marginTop) {
                swap(divs[j], divs[j - 1]);
                flag = 0;
            }
            j--;
        }
        else {
            if (flag||i >= n) {
                clearInterval(id);
            }
            else {
                j = n - 1;
                i++;
            }
        }
    }, 100);
}
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
                if (parseInt(num) < 10 || parseInt(num) > 100) {
                    alert("Please re-enter a num at range of 10~100!");
                    return;
                }
                if (queue.childNodes.length > 60) {
                    alert("The queue is full!");
                    return;
                }
                cw = document.documentElement.clientWidth;
                var newBtn = document.createElement("div");
                newBtn.style.float = "left";//让元素的宽度自适应其内容,此时设置元素背景色才有效
                newBtn.style.height = num + "px";//与html中元素的style特性对应的一个JS中的style对象，这个对象包涵style特性中的样式，称为对象的属性
                newBtn.style.width = parseInt(cw / 90) + "px";
                newBtn.style.backgroundColor = "#fa7a72";
                newBtn.style.marginLeft = parseInt(cw / 180) + "px";//不能用newBtn.style.width直接进行算数运算
                newBtn.style.marginTop = 100 - num + "px";
                if (btn.id == "left-in") {
                    queue.insertBefore(newBtn, queue.firstChild);
                }
                else if (btn.id == "right-in") {
                    queue.appendChild(newBtn);
                }
                else if (btn.id == "left-out") {
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
    var sort = document.getElementById("bubbleSort");
    sort.onclick = bubbleSort;
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
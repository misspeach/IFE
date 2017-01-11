/**
 * Created by shizhan on 17/1/11.
 */
var nums = "";
var queue;
var search;
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
        var inp = document.getElementById("data");//textarea
        nums = inp.value.trim();//去除头尾空格

        if (nums === "")
            alert("The content should not be null!");
        else {
            var a = nums.split(/[\r\n\s\t\v\,\，\、\u3000]+/);
            //console.log(a);

            if (btn.id == "left-in") {
                for (var i = 0; i < a.length; i++) {
                    var newBtn = document.createElement("div");
                    newBtn.style.float = "left";//让元素的宽度自适应其内容,此时设置元素背景色才有效
                    newBtn.style.backgroundColor = "#fa7a72";
                    newBtn.style.marginLeft = "5px";
                    newBtn.style.marginRight = "5px";
                    newBtn.style.padding = "5px";
                    newBtn.style.border = "1px solid black";
                    newBtn.style.height = "35px";
                    newBtn.style.lineHeight = "35px";
                    var content = document.createTextNode(a[i]);
                    newBtn.appendChild(content);
                    if (i === 0) {
                        if (!isEmpty()) {
                            queue.insertBefore(newBtn, queue.firstChild);
                        }
                        else {
                            queue.appendChild(newBtn);
                        }
                    } else {
                        queue.insertBefore(newBtn, queue.firstChild);
                    }
                }

            }
        }
        if (btn.id == "right-in") {
            for (var i = 0; i < a.length; i++) {
                var newBtn = document.createElement("div");
                newBtn.style.float = "left";//让元素的宽度自适应其内容,此时设置元素背景色才有效
                newBtn.style.backgroundColor = "#fa7a72";
                newBtn.style.marginLeft = "5px";
                newBtn.style.marginRight = "5px";
                newBtn.style.padding = "5px";
                newBtn.style.border = "1px solid black";
                newBtn.style.height = "35px";
                newBtn.style.lineHeight = "35px";
                var content = document.createTextNode(a[i]);
                newBtn.appendChild(content);
                queue.appendChild(newBtn);
            }
        }
        if (btn.id == "left-out") {
            if (isEmpty())
                alert("The queue is empty!");
            else {
                queue.removeChild(queue.firstChild);
            }
        }
        else if (btn.id == "right-out") {
            if (isEmpty())
                alert("The queue is empty!");
            else {
                queue.removeChild(queue.lastChild);
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
function fuzzSearch() {
    var eles = queue.childNodes;
    var inp = document.getElementById("searchData").value.trim();
    var flag=0;
    for (var i = 0; i < eles.length; i++) {
        if (eles[i].nodeName.toLowerCase() === 'div' && eles[i].childNodes[0].nodeValue.indexOf(inp) !== -1) {
            flag=1;
            eles[i].style.backgroundColor = "#ccc";
        }
    }
    if(flag===0)
        alert("没有匹配的内容");
}
function init() {
    var ops = document.getElementById("ops");
    ops.addEventListener("click", opQueue, false);
    queue = document.getElementById("queue");
    queue.addEventListener("click", delNum, false);
    search = document.getElementById("searchBtn");
    search.onclick = fuzzSearch;
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
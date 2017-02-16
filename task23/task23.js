/**
 * Created by shizhan on 17/1/22.
 */
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
    switch (e.target.firstChild.nodeValue) {
        case "前序遍历":
            stack = [];//执行一次遍历后要清空缓存数据
            preOrder(root);
            animator();
            break;
        case "后序遍历":
            stack = [];//执行一次遍历后要清空缓存数据
            postOrder(root);
            animator();
            break;
    }
};
var root = null,
    stack = [],
    record = [];
function preOrder(node) {
    if (node !== null) {
        if (node.className !== 'first_txt') {
            stack.push(node);
            for (var i = 0; i < node.children.length; i++) {
                preOrder(node.children[i]);
            }
        }
    }
}
function postOrder(node) {
    if (node !== null) {
        if (node.className !== 'first_txt') {
            for (var i = 0; i < node.children.length; i++) {
                postOrder(node.children[i]);
            }
            stack.push(node);
        }
    }
}
function matching(currentNode, val) {
    if (currentNode.children[0].firstChild.nodeValue === val) {
        currentNode.children[0].style.backgroundColor = 'red';
        record.push(currentNode.children[0]);
        return 1;
    }
    else
        return 0;
}
function animator() {
    var flag = 0,
        i=0,
        timer;
    if (stack.length <= 0)
        preOrder(root);
    stack[i].style.backgroundColor = 'pink';
    var arg = arguments[0];
    if (arg !== undefined) {
        flag = matching(stack[i], arg);
    }
    timer = setInterval(function () {
        i++;
        if (i < stack.length) {
            stack[i - 1].style.backgroundColor = '';
            stack[i].style.backgroundColor = 'pink';
            if (arg !== undefined) {
                if(flag<matching(stack[i], arg))
                    flag = matching(stack[i], arg);
            }
        } else {
            clearInterval(timer);
            stack[i - 1].style.backgroundColor = '';
            if (arg !== undefined && flag === 0)
                alert("not found");
        }
    }, 500);
}
function contain() {
    for (var i = 0; i < record.length; i++) {
        record[i].style.backgroundColor = '';
    }
    var inp = this.previousSibling.value;
    animator(inp);
}
function init() {
    var ops = document.getElementById('ops');
    EventUtil.addHandler(ops, 'click', handler);
    root = document.getElementsByClassName('root')[0];
    var btn_search = document.getElementById('search');
    EventUtil.addHandler(btn_search, 'click', contain);
}
init();
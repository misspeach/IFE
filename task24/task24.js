/**
 * Created by shizhan on 17/1/23.
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
    record = [],
    picked = [];
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
function clearStyle() {
    var tmp = arguments[0];
    for (var i = 0; i < tmp.length; i++) {
        tmp[i].style.backgroundColor = '';
    }
    arguments[0].splice(0, arguments[0].length);
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
        i = 0,
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
                if (flag < matching(stack[i], arg))
                    flag = matching(stack[i], arg);
            }
        } else {
            clearInterval(timer);
            stack[i - 1].style.backgroundColor = '';
            if (arg !== undefined && flag === 0)
                alert("not found！");
        }
    }, 100);
}

function contain(e) {
    //清除之前匹配节点的样式
    if (record.length > 0)
        clearStyle(record);
    var inp = e.target.parentNode.children[0].value.trim();
    if (inp !== '')
        animator(inp);
    else {
        alert('请输入有效的查询内容！');
    }
}
function pickUp(e) {
    if (picked.length > 0)
        clearStyle(picked);
    if (e.target.className === 'box' || e.target.className === 'root') {
        e.target.style.backgroundColor = 'lightskyblue';
        picked.push(e.target);
    } else if (e.target.className === 'first_txt') {
        e.target.parentNode.style.backgroundColor = 'lightskyblue';
        picked.push(e.target.parentNode);
    }
}
function deleteNode() {
    var tmp = picked[0];
    if (tmp === undefined)
        alert('请先选择一个节点！');
    else
        tmp.parentNode.removeChild(tmp);//删除一个节点及其子节点
}
function addNode(e) {
    var inp = e.target.parentNode.children[0].value.trim();
    if (inp === '')
        alert('请输入有效内容！');
    else {
        var content = document.getElementById('content');
        if (content.childElementCount === 0) {
            var node = document.createElement('div');
            node.className = 'box';
            node.innerHTML = '<div class=\'first_txt\'>' + inp + '</div>';
            content.appendChild(node);
            EventUtil.addHandler(node, 'click', pickUp);
        } else {
            var tmp = picked[0];
            if (tmp === undefined)
                alert('请先选择一个节点！');
            else {
                var node = document.createElement('div');
                node.className = 'box';
                node.innerHTML = '<div class=\'first_txt\'>' + inp + '</div>';
                tmp.appendChild(node);
            }
            //picked.splice(0, 1);
        }
    }
}
function init() {
    var ops = document.getElementById('ops');
    EventUtil.addHandler(ops, 'click', handler);

    var btn_search = document.getElementById('search');
    EventUtil.addHandler(btn_search, 'click', contain);

    root = document.getElementsByClassName('box')[0];
    EventUtil.addHandler(root, 'click', pickUp);

    var del = document.getElementById('del');
    EventUtil.addHandler(del, 'click', deleteNode);

    var add = document.getElementById('add');
    EventUtil.addHandler(add, 'click', addNode);
}
init();
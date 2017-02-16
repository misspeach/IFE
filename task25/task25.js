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
var content = null,
    stack = [];
function renderNode(e) {
    if (e.target.nodeName.toLowerCase() === 'a') {
        var currentNode = e.target.parentNode.parentNode;
        var child = currentNode.children[1];
        var eleStyle = child.currentStyle ? child.currentStyle : getComputedStyle(child, null);
        if (eleStyle.display === 'none') {
            e.target.style.background = 'url(./task25_img/down_arow.png) no-repeat center';
            showNodes(currentNode);
        } else {
            e.target.style.background = 'url(./task25_img/right_arow.png) no-repeat center';
            hiddenNodes(currentNode);
        }
    } else if (e.target.className === 'add') {
        var inp = prompt("请输入要添加节点的内容");
        if (inp !== null) {//点击取消时返回null
            var newNode = document.createElement('div');
            newNode.className = 'box';
            newNode.innerHTML = '<div class=\"current\"><span class=\"text\">' + inp + '</span>' +
                '<span class=\"ops\"><span class=\"add\">add</span><span class=\"del\">delete</span></span></div>';
            var tmp = e.target.parentNode.parentNode.parentNode;//tmp box
            if (tmp.childElementCount == 1) {
                var innerH = '<a href=\"javascript:\" class=\"icon\">图标</a>' + tmp.children[0].innerHTML;
                tmp.children[0].innerHTML = innerH;
            }
            tmp.appendChild(newNode);
            if (tmp.children[1].style.display === 'block') {//当前为展开，需要重新刷新刚添加的节点
                showNodes(tmp);
            }
        }

    } else if (e.target.className === 'del') {
        var tmp = e.target.parentNode.parentNode.parentNode;
        var parent = tmp.parentNode;
        parent.removeChild(tmp);
        if (parent.childElementCount === 1) {
            var cur = parent.children[0];
            cur.removeChild(cur.children[0]);
        }
    }
}
function showNodes(currentNode) {
    for (var i = 1; i < currentNode.childElementCount; i++) {
        currentNode.children[i].style.display = 'block';
    }
}
function hiddenNodes(currentNode) {
    var length = currentNode.childElementCount;
    if (length === 1) {//该节点没有子节点
        currentNode.children[0].firstChild.style.display = 'none';
    } else {
        for (var i = 1; i < length; i++) {
            currentNode.children[i].style.display = 'none';
        }
    }
}
function preOrder(node) {
    if (node !== null) {
        if (node.className === 'root' || node.className === 'box') {
            for (var i = 0; i < node.children.length; i++) {
                preOrder(node.children[i]);
            }
        } else if (node.className === 'current') {
            stack.push(node);
        }
    }
}
function search(e) {
    stack=[];
    var inp = e.target.parentNode.children[0].value.trim();
    if (inp !== '') {
        for (var i = 0; i < content.childElementCount; i++) {
            preOrder(content.children[i]);
        }
        for (var j = 0; j < stack.length; j++) {//遍历当前的树 查找

            var target;//target是当前span class＝text
            if (stack[j].children[0].className === 'icon') {//节点个数超过一个 有箭头图标
                target = stack[j].children[1];
            } else {
                target = stack[j].children[0];
            }
            if (target.firstChild.nodeValue === inp)//有符合查询内容的节点
            {
                target.style.backgroundColor = 'pink';
                var node = target.parentNode.parentNode;//当前是box
                while (node !== content) {
                    if (node.childElementCount > 1 ) {
                        showNodes(node);
                    }
                    node = node.parentNode;
                }
            }
        }

    } else {
        alert('请输入有效的查询内容！');
    }
}
function init() {

    content = document.getElementById('content');
    EventUtil.addHandler(content, 'click', renderNode);

    var btn_search = document.getElementById('search');
    EventUtil.addHandler(btn_search, 'click', search);
}
init();